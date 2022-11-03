import path from 'path';
import fs from 'fs';
import { network } from 'hardhat';
import { utils, BigNumber, Contract } from 'ethers';
import { Log } from '@ethersproject/abstract-provider';
import { readNetworkConfig } from '../src/config';
import { UNSRegistry__factory } from '../types/factories/contracts';
import { unwrap } from '../src/helpers';

const UnsConfig = readNetworkConfig();

const NEW_URI_EVENT_TOPIC = utils.id('NewURI(uint256,string)');

const normalizeTokenId = (bigNumber: BigNumber) => {
  return utils.hexZeroPad(bigNumber.toHexString(), 32).toLowerCase();
};

type State = {
  tokens: {
    [tokenId: string]: {
      uri: string;
    };
  };
  latestSyncedL1Block: number;
  latestSyncedL2Block: number;
};

const INITIAL_DB = {
  tokens: {},
  latestSyncedL1Block: 1,
  latestSyncedL2Block: 1,
};

const SCOPED_NETWORK_CONFIG = {
  1: {
    fetchLimit: 10000,
    isL1: true,
    stateFile: '1-137-dotcoin-upgrade-uris.json',
  },
  5: {
    fetchLimit: 10000,
    isL1: true,
    stateFile: '5-80001-dotcoin-upgrade-uris.json',
  },
  137: {
    fetchLimit: 3499,
    isL2: true,
    stateFile: '1-137-dotcoin-upgrade-uris.json',
  },
  80001: {
    fetchLimit: 3499,
    isL2: true,
    stateFile: '5-80001-dotcoin-upgrade-uris.json',
  },
};

function getContractsConfig (chainId: number) {
  return {
    ...UnsConfig.networks[chainId.toString()].contracts,
    additionalConfiguration: SCOPED_NETWORK_CONFIG[chainId],
  };
}

async function fetchLogs (
  contract: Contract,
  topics: string[],
  fromBlock: number,
  toBlock: number,
  limit: number,
): Promise<Array<Log>> {
  const maxBlock = fromBlock + limit;
  const _toBlock = Math.min(maxBlock, toBlock);

  console.log(
    `Fetching events blocks [${contract.address}: ${fromBlock}-${_toBlock}]`,
  );

  try {
    const events = await contract.provider.getLogs({
      address: contract.address,
      topics,
      fromBlock,
      toBlock: _toBlock,
    });

    return toBlock > maxBlock
      ? events.concat(
        await fetchLogs(contract, topics, _toBlock, toBlock, limit),
      )
      : events;
  } catch (err) {
    console.log('FAIL', err);

    if (err.message === 'query returned more than 10000 results') {
      console.log('Relimiting (1000 blocks)');
      return fetchLogs(contract, topics, fromBlock, toBlock, 1000);
    }

    throw err;
  }
}

function resolveStatePath (chainId: number) {
  return path.resolve('./.deployer/', SCOPED_NETWORK_CONFIG[chainId].stateFile);
}

function readState (chainId: number) {
  try {
    return JSON.parse(fs.readFileSync(resolveStatePath(chainId)).toString());
  } catch (err) {
    console.log(
      `Could not load current state for chainId: ${chainId}. Using initial`,
    );
    return INITIAL_DB;
  }
}

function saveState (chainId: number, state: State) {
  fs.writeFileSync(resolveStatePath(chainId), JSON.stringify(state, null, 2));
}

async function main () {
  const chainId: number = unwrap(network.config, 'chainId');

  console.log('Network:', network.name + ' ChainID: ' + chainId);

  const contractsConfig = getContractsConfig(chainId);

  if (!contractsConfig) {
    throw new Error(`Config not found for network ${chainId}`);
  }

  if (!contractsConfig.UNSRegistry) {
    throw new Error('Current network configuration does not hase UNSRegistry');
  }

  const unsRegistryContract = new UNSRegistry__factory().attach(
    contractsConfig.UNSRegistry.address,
  );

  const currentState = readState(chainId);
  const newState = JSON.parse(JSON.stringify(currentState));

  const latestSyncedBlock = contractsConfig.additionalConfiguration.isL1
    ? currentState.latestSyncedL1Block
    : currentState.latestSyncedL2Block;

  const fromBlock = Math.max(
    latestSyncedBlock,
    parseInt(contractsConfig.UNSRegistry.deploymentBlock),
  );
  const toBlock = await unsRegistryContract.provider.getBlockNumber();

  console.log('Fetching events from ' + fromBlock + ' to ' + toBlock);

  const result = await fetchLogs(
    unsRegistryContract,
    [NEW_URI_EVENT_TOPIC],
    fromBlock,
    toBlock,
    contractsConfig.additionalConfiguration.fetchLimit,
  );

  console.log(`Logs fetched. Found ${result.length} logs. Processing...`);

  const parsedLogs = result.map((log) =>
    unsRegistryContract.interface.parseLog(log),
  );

  parsedLogs.forEach(({ name, args }) => {
    if (name !== 'NewURI') {
      return;
    }

    const { uri, tokenId } = args;

    if (!uri.endsWith('.coin')) {
      return;
    }

    newState.tokens[normalizeTokenId(tokenId)] = {
      uri: uri,
    };
  });

  if (contractsConfig.additionalConfiguration.isL1) {
    newState.latestSyncedL1Block = toBlock;
  } else if (contractsConfig.additionalConfiguration.isL2) {
    newState.latestSyncedL2Block = toBlock;
  }

  console.log('Logs processed. Writing... \n');

  saveState(chainId, newState);

  console.log('Completed');
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log('ERR', err);
    process.exit(1);
  });
