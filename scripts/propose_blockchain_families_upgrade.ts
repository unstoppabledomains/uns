import fs from 'fs';
import path from 'path';
import { ethers, network, config as hardhatConfig } from 'hardhat';
import { Log, BaseContract } from 'ethers';
import pLimit from 'p-limit';
import pRetry from 'p-retry';
import csv from 'csv-parse/sync';
import { isEqual } from 'lodash';
import { unwrap } from '../src/utils';
import { ProxyReader__factory } from '../types/factories/contracts';
import { getNetworkConfig } from '../src/config';

const CONCURRENCY_LIMIT = 3;
const CHUNK_SIZE = 10000;
const RPC_RETRY_COUNT = 3;
const STATE_DIR = path.resolve('./scripts/schemaState');

if (!fs.existsSync(STATE_DIR)) {
  fs.mkdirSync(STATE_DIR, { recursive: true });
}

type BlockchainFamiliesState = {
  networkFamilies: { [network: string]: string };
  legacyKeys: { [tokenKey: string]: string[] };
  latestSyncedBlock: number;
};

type CsvEntry = {
  key: string;
  familyKey: string;
  networkName: string;
  mapTo: string[];
};

const INITIAL_STATE: BlockchainFamiliesState = {
  networkFamilies: {},
  legacyKeys: {},
  latestSyncedBlock: 0,
};

function resolveStatePath (chainId: number): string {
  return path.resolve(STATE_DIR, `${chainId}-blockchain-families-state.json`);
}

function readState (chainId: number): BlockchainFamiliesState {
  try {
    const state = JSON.parse(fs.readFileSync(resolveStatePath(chainId)).toString());
    console.log(`Loaded persisted state from block ${state.latestSyncedBlock}`);
    return state;
  } catch (err) {
    console.log(`Could not load current state for chainId: ${chainId}. Using initial state.`);
    return INITIAL_STATE;
  }
}

function saveState (chainId: number, state: BlockchainFamiliesState): void {
  fs.writeFileSync(resolveStatePath(chainId), JSON.stringify(state, null, 2));
  console.log(`State saved to ${resolveStatePath(chainId)} with latest block ${state.latestSyncedBlock}`);
}

async function fetchLogsChunk (
  contract: BaseContract,
  topics: Array<string | Array<string> | null>,
  fromBlock: number,
  toBlock: number,
): Promise<Array<Log>> {
  return pRetry(
    async () => {
      console.log(`Fetching events blocks [${await contract.getAddress()}: ${fromBlock}-${toBlock}]`);
      return await ethers.provider.getLogs({
        address: await contract.getAddress(),
        topics,
        fromBlock,
        toBlock,
      });
    },
    {
      retries: RPC_RETRY_COUNT,
      onFailedAttempt: (error) => {
        console.log(`Attempt failed for range [${fromBlock}-${toBlock}]: ${error.message}. Retrying...`);
      },
    },
  );
}

async function fetchLogs (
  contract: BaseContract,
  topics: Array<string | Array<string> | null>,
  fromBlock: number,
  toBlock: number,
): Promise<Array<Log>> {
  if (fromBlock > toBlock) {
    return [];
  }

  const chunks: Array<[number, number]> = [];
  let currentFromBlock = fromBlock;

  while (currentFromBlock <= toBlock) {
    const chunkToBlock = Math.min(currentFromBlock + CHUNK_SIZE - 1, toBlock);
    chunks.push([currentFromBlock, chunkToBlock]);
    currentFromBlock = chunkToBlock + 1;
  }

  console.log(`Splitting block range ${fromBlock}-${toBlock} into ${chunks.length} chunks`);

  const limit = pLimit(CONCURRENCY_LIMIT);
  const results = await Promise.all(
    chunks.map(([from, to]) =>
      limit(async () => {
        try {
          return await fetchLogsChunk(contract, topics, from, to);
        } catch (err: any) {
          if (err.message?.includes('query returned more than')) {
            const mid = Math.floor((from + to) / 2);
            console.log(`Splitting range [${from}-${to}] at ${mid}`);
            const [firstHalf, secondHalf] = await Promise.all([
              limit(() => fetchLogs(contract, topics, from, mid)),
              limit(() => fetchLogs(contract, topics, mid + 1, to)),
            ]);
            return [...firstHalf, ...secondHalf];
          }
          throw err;
        }
      }),
    ),
  );

  return results.flat();
}

async function getAddressKeysWithRetry (proxyReader: any, network: string, token: string): Promise<string[]> {
  return pRetry(async () => proxyReader.getAddressKeys(network, token), {
    retries: RPC_RETRY_COUNT,
    onFailedAttempt: (error) => {
      console.log(`Failed to get address keys for ${network}/${token}: ${error.message}. Retrying...`);
    },
  });
}

async function extractMappingsFromEvents (
  proxyReader: any,
  fromBlock: number,
): Promise<[Map<string, string>, Map<string, string[]>]> {
  const networkFamilies = new Map<string, string>();
  const legacyKeysMap = new Map<string, string[]>();
  const networks = new Set<string>();
  const tokenKeys = new Set<string>();

  const logs = await fetchLogs(
    proxyReader,
    [
      [
        proxyReader.interface.getEvent('SetNetworkFamily').topicHash,
        proxyReader.interface.getEvent('SetLegacyRecords').topicHash,
      ],
    ],
    fromBlock,
    await ethers.provider.getBlockNumber(),
  );

  for (const log of logs) {
    try {
      const parsedLog = proxyReader.interface.parseLog({
        topics: log.topics as string[],
        data: log.data,
      });

      if (!parsedLog) continue;

      if (parsedLog.name === 'SetNetworkFamily') {
        const network = parsedLog.args[0];
        networks.add(network);
        // If family is empty string, we'll remove it from the map later
        networkFamilies.set(network, parsedLog.args[1]);
      } else if (parsedLog.name === 'SetLegacyRecords') {
        const key = parsedLog.args[0];
        tokenKeys.add(key);
        // If legacy keys array is empty, we'll remove it from the map later
        legacyKeysMap.set(key, parsedLog.args[1]);
      }
    } catch (error) {
      console.error('Error parsing log:', error);
    }
  }

  console.log(`Found ${networks.size} networks and ${tokenKeys.size} token keys from events`);

  const limit = pLimit(CONCURRENCY_LIMIT);
  const processPromises = [
    ...Array.from(networks).map((network) =>
      limit(async () => {
        try {
          const keys = await getAddressKeysWithRetry(proxyReader, network, 'dummy');
          if (keys?.length > 0) {
            const parts = keys[0].split('.');
            if (parts.length >= 5) {
              networkFamilies.set(network, parts[1]);
              console.log(`Network: ${network}, Family: ${parts[1]}`);
            }
          } else {
            // If no keys found, remove the network
            networkFamilies.delete(network);
            console.log(`Removing network: ${network} (no keys found)`);
          }
        } catch (error) {
          console.error(`Error processing network ${network}:`, error);
        }
      }),
    ),
    ...Array.from(tokenKeys).map((tokenKey) =>
      limit(async () => {
        try {
          const [, network, token] = tokenKey.split('.');
          const keys = await getAddressKeysWithRetry(proxyReader, network, token);
          if (keys?.length > 0) {
            const legacyKeys = keys.slice(1, -2);
            if (legacyKeys.length > 0) {
              legacyKeysMap.set(keys[0], legacyKeys);
              console.log(`Token Key: ${tokenKey}, Legacy Keys: ${legacyKeys.join(', ')}`);
            } else {
              // If no legacy keys found, remove the key
              legacyKeysMap.delete(keys[0]);
              console.log(`Removing legacy key: ${keys[0]} (no legacy keys found)`);
            }
          }
        } catch (error) {
          console.error(`Error processing token key ${tokenKey}:`, error);
        }
      }),
    ),
  ];

  await Promise.all(processPromises);
  return [networkFamilies, legacyKeysMap];
}

function parseCsvFile (): CsvEntry[] {
  const csvContent = fs.readFileSync('./scripts/blockchain_families_latest.csv', 'utf-8');
  const records = csv.parse(csvContent, {
    columns: false,
    skipEmptyLines: true,
    delimiter: ',',
    quote: '"',
    escape: '"',
  });

  return records.slice(1).map((record: string[]) => {
    const mapTo = record[3]
      ? record[3]
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean)
      : [];

    return {
      key: record[0],
      familyKey: record[10],
      networkName: record[7],
      mapTo,
    };
  });
}

function compareStates (
  onChainState: BlockchainFamiliesState,
  csvEntries: CsvEntry[],
): {
  networksToAdd: { network: string; family: string }[];
  networksToUpdate: { network: string; family: string }[];
  networksToRemove: string[];
  legacyKeysToAdd: { key: string; legacyKeys: string[] }[];
  legacyKeysToUpdate: { key: string; legacyKeys: string[] }[];
  legacyKeysToRemove: string[];
} {
  const networksToAdd: { network: string; family: string }[] = [];
  const networksToUpdate: { network: string; family: string }[] = [];
  const networksToRemove: string[] = [];
  const legacyKeysToAdd: { key: string; legacyKeys: string[] }[] = [];
  const legacyKeysToUpdate: { key: string; legacyKeys: string[] }[] = [];
  const legacyKeysToRemove: string[] = [];

  const csvNetworks = new Set(csvEntries.map((entry) => entry.networkName));
  const csvKeys = new Set(csvEntries.map((entry) => entry.key));

  const uniqueNetworkEntries = new Map<string, CsvEntry>();
  for (const entry of csvEntries) {
    if (!uniqueNetworkEntries.has(entry.networkName)) {
      uniqueNetworkEntries.set(entry.networkName, entry);
    }
  }

  for (const entry of uniqueNetworkEntries.values()) {
    const currentFamily = onChainState.networkFamilies[entry.networkName];

    if (!currentFamily) {
      networksToAdd.push({ network: entry.networkName, family: entry.familyKey });
    } else if (currentFamily !== entry.familyKey) {
      networksToUpdate.push({ network: entry.networkName, family: entry.familyKey });
    }
  }

  for (const network of Object.keys(onChainState.networkFamilies)) {
    if (!csvNetworks.has(network)) {
      networksToRemove.push(network);
    }
  }

  for (const entry of csvEntries) {
    const currentLegacyKeys = onChainState.legacyKeys[entry.key];

    if (entry.mapTo.length === 0) {
      continue;
    }

    if (!currentLegacyKeys) {
      legacyKeysToAdd.push({ key: entry.key, legacyKeys: entry.mapTo });
    } else if (!isEqual([...currentLegacyKeys].sort(), [...entry.mapTo].sort())) {
      legacyKeysToUpdate.push({ key: entry.key, legacyKeys: entry.mapTo });
    }
  }

  for (const key of Object.keys(onChainState.legacyKeys)) {
    if (!csvKeys.has(key)) {
      legacyKeysToRemove.push(key);
    }
  }

  return {
    networksToAdd,
    networksToUpdate,
    networksToRemove,
    legacyKeysToAdd,
    legacyKeysToUpdate,
    legacyKeysToRemove,
  };
}

async function prepareUpgradeTransaction (
  proxyReader: BaseContract,
  multisigAddr: string,
  changes: {
    networksToAdd: { network: string; family: string }[];
    networksToUpdate: { network: string; family: string }[];
    networksToRemove: string[];
    legacyKeysToAdd: { key: string; legacyKeys: string[] }[];
    legacyKeysToUpdate: { key: string; legacyKeys: string[] }[];
    legacyKeysToRemove: string[];
  },
): Promise<void> {
  const {
    networksToAdd,
    networksToUpdate,
    networksToRemove,
    legacyKeysToAdd,
    legacyKeysToUpdate,
    legacyKeysToRemove,
  } = changes;

  const hasChanges =
    networksToAdd.length > 0 ||
    networksToUpdate.length > 0 ||
    networksToRemove.length > 0 ||
    legacyKeysToAdd.length > 0 ||
    legacyKeysToUpdate.length > 0 ||
    legacyKeysToRemove.length > 0;

  if (!hasChanges) {
    console.log('\nNo changes detected. Skipping transaction preparation.');
    return;
  }

  console.log('\n=== UPGRADE TRANSACTION PREPARATION ===');

  if (networksToAdd.length > 0) {
    console.log('\nNetworks to add:');
    networksToAdd.forEach(({ network, family }) => {
      console.log(`- ${family} -> ${network}`);
    });
  }

  if (networksToUpdate.length > 0) {
    console.log('\nNetworks to update:');
    networksToUpdate.forEach(({ network, family }) => {
      console.log(`- ${family} -> ${network}`);
    });
  }

  if (networksToRemove.length > 0) {
    console.log('\nNetworks to remove:');
    networksToRemove.forEach((network) => {
      console.log(`- ${network}`);
    });
  }

  if (legacyKeysToAdd.length > 0) {
    console.log('\nLegacy keys to add:');
    legacyKeysToAdd.forEach(({ key, legacyKeys }) => {
      console.log(`- ${key}: ${legacyKeys.join(', ')}`);
    });
  }

  if (legacyKeysToUpdate.length > 0) {
    console.log('\nLegacy keys to update:');
    legacyKeysToUpdate.forEach(({ key, legacyKeys }) => {
      console.log(`- ${key}: ${legacyKeys.join(', ')}`);
    });
  }

  if (legacyKeysToRemove.length > 0) {
    console.log('\nLegacy keys to remove:');
    legacyKeysToRemove.forEach((key) => {
      console.log(`- ${key}`);
    });
  }

  const networks = [...networksToAdd, ...networksToUpdate].map(({ network }) => network);
  const families = [...networksToAdd, ...networksToUpdate].map(({ family }) => family);

  for (const network of networksToRemove) {
    networks.push(network);
    families.push('');
  }

  const legacyKeys = [...legacyKeysToAdd, ...legacyKeysToUpdate].map(({ key }) => key);
  const legacyKeysArrays = [...legacyKeysToAdd, ...legacyKeysToUpdate].map(({ legacyKeys }) => legacyKeys);

  for (const key of legacyKeysToRemove) {
    legacyKeys.push(key);
    legacyKeysArrays.push([]);
  }

  const proxyReaderContract = await ethers.getContractAt('ProxyReader', await proxyReader.getAddress());
  console.log(await proxyReader.getAddress());
  console.log(
    proxyReaderContract.interface.encodeFunctionData('addBlockchainNetworks(string[],string[])', [networks, families]),
  );
  console.log('---');
  console.log(proxyReaderContract.interface.encodeFunctionData('addLegacyRecords', [legacyKeys, legacyKeysArrays]));
}

async function main () {
  const chainId: number = unwrap(network.config, 'chainId');
  console.log('Network:', network.name, 'ChainID:', chainId);

  const config = getNetworkConfig(chainId);
  if (!config?.contracts?.ProxyReader?.address) {
    throw new Error('ProxyReader contract configuration not found');
  }

  const multisigAddr = hardhatConfig.uns.multisig[network.name];
  if (!multisigAddr) {
    throw new Error(`Multisig address is not set for network ${network.name}`);
  }

  const proxyReader = ProxyReader__factory.connect(
    config.contracts.ProxyReader.address,
    (await ethers.getSigners())[0],
  );

  const currentState = readState(chainId);
  const newState: BlockchainFamiliesState = JSON.parse(JSON.stringify(currentState));

  console.log('Current persisted state:');
  console.log(`- Network Families: ${Object.keys(currentState.networkFamilies).length}`);
  console.log(`- Legacy Keys: ${Object.keys(currentState.legacyKeys).length}`);
  console.log(`- Last Synced Block: ${currentState.latestSyncedBlock}`);

  const fromBlock = Math.max(
    currentState.latestSyncedBlock + 1,
    parseInt(config.contracts.ProxyReader.deploymentBlock || '0'),
  );
  const toBlock = await ethers.provider.getBlockNumber();

  if (fromBlock > toBlock) {
    console.log('Already synced to the latest block. No new events to process.');
  } else {
    console.log(`Syncing from block ${fromBlock} to ${toBlock} (${toBlock - fromBlock + 1} blocks)`);
    const [networkFamilies, legacyKeys] = await extractMappingsFromEvents(proxyReader, fromBlock);

    networkFamilies.forEach((family, network) => {
      newState.networkFamilies[network] = family;
    });

    legacyKeys.forEach((keys, tokenKey) => {
      newState.legacyKeys[tokenKey] = keys;
    });

    newState.latestSyncedBlock = toBlock;
    saveState(chainId, newState);
  }

  console.log('\nParsing CSV file...');
  const csvEntries = parseCsvFile();
  console.log(`Found ${csvEntries.length} entries in CSV`);

  const changes = compareStates(newState, csvEntries);
  await prepareUpgradeTransaction(proxyReader, multisigAddr, changes);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
