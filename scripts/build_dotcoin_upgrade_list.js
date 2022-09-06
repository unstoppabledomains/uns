const { ethers, network } = require('hardhat');
const { utils } = require('ethers');
const UnsConfig = require('./../uns-config.json');
const path = require('path');
const fs = require('fs');

const NEW_URI_EVENT_TOPIC = utils.id('NewURI(uint256,string)');

const normalizeTokenId = (bigNumber) => {
  return utils.hexZeroPad(
    bigNumber.toHexString(),
    32
  ).toLowerCase()
}

const INITIAL_DB = {
  tokens: {},
  latestSyncedL1Block: 1,
  latestSyncedL2Block: 1,
}

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
  }
}

function getContractsConfig(chainId) {
  return {
    ...UnsConfig.networks[chainId]?.contracts,
    additionalConfiguration: SCOPED_NETWORK_CONFIG[chainId]
  }
}

async function fetchLogs(contract, topics, fromBlock, toBlock, limit) {
  const maxBlock = fromBlock + limit;
  const _toBlock = Math.min(maxBlock, toBlock);

  console.log(`Fetching events blocks [${contract.address}: ${fromBlock}-${_toBlock}]`);

  try {
    const events = await contract.provider.getLogs({
      address: contract.address,
      topics,
      fromBlock,
      toBlock: _toBlock
    });

    return toBlock > maxBlock ? events.concat(await fetchLogs(contract, topics, _toBlock, toBlock, limit)) : events;
  } catch (err) {
    console.log('FAIL', err);

    if (err.message === 'query returned more than 10000 results') {
      console.log('Relimiting (1000 blocks)');
      return fetchLogs(contract, topics, fromBlock, toBlock, 1000);
    }

    throw err;
  }
}

function resolveStatePath(chainId) {
  return path.resolve('./.deployer/', SCOPED_NETWORK_CONFIG[chainId].stateFile);
}

function readState(chainId) {
  try {
    return JSON.parse(
      fs.readFileSync(
        resolveStatePath(chainId)
      )
    );
  } catch (err) {
    console.log(`Could not load current state for chainId: ${chainId}. Using initial`);
    return INITIAL_DB;
  }
}

function saveState(chainId, state) {
  fs.writeFileSync(
    resolveStatePath(chainId),
    JSON.stringify(state, null, 2)
  );
}

async function main() {
  const chainId = network.config.chainId;

  console.log('Network:', network.name + ' ChainID: ' + chainId);

  const contractsConfig = getContractsConfig(chainId);

  if (!contractsConfig) {
    throw new Error(`Config not found for network ${chainId}`);
  }

  if (!contractsConfig.UNSRegistry) {
    throw new Error('Current network configuration does not hase UNSRegistry');
  }

  const unsRegistryFactory = await ethers.getContractFactory('UNSRegistry');
  const unsRegistryContract = unsRegistryFactory.attach(contractsConfig.UNSRegistry.address);

  const currentState = readState(network.config.chainId);
  let newState = JSON.parse(JSON.stringify(currentState));

  const latestSyncedBlock = contractsConfig.additionalConfiguration.isL1 ? currentState.latestSyncedL1Block : currentState.latestSyncedL2Block;

  const fromBlock = Math.max(latestSyncedBlock, parseInt(contractsConfig.UNSRegistry.deploymentBlock));
  const toBlock = await unsRegistryContract.provider.getBlockNumber();

  console.log('Fetching events from ' + fromBlock + ' to ' + toBlock);

  const result = await fetchLogs(
    unsRegistryContract,
    [NEW_URI_EVENT_TOPIC],
    fromBlock,
    toBlock,
    contractsConfig.additionalConfiguration.fetchLimit
  );

  console.log(`Logs fetched. Found ${result.length} logs. Processing...`);
  
  const parsedLogs = result.map(log => unsRegistryContract.interface.parseLog(log));

  parsedLogs.forEach(({name, args}) => {
    if(name !== 'NewURI') {
      return;
    }

    const {uri, tokenId} = args;

    if(!uri.endsWith('.coin')) {
      return;
    }

    newState.tokens[normalizeTokenId(tokenId)] = {
      uri: uri
    }
  });

  if(contractsConfig.additionalConfiguration.isL1) {
    newState.latestSyncedL1Block = toBlock;
  } else if(contractsConfig.additionalConfiguration.isL2) {
    newState.latestSyncedL2Block = toBlock;
  }

  console.log('Logs processed. Writing... \n');

  saveState(network.config.chainId, newState);
  
  console.log('Completed');
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.log('ERR', err);
    process.exit(1);
  });
