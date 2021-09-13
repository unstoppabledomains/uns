const { ethers, network } = require('hardhat');
const path = require('path');
const fs = require('fs');

const UNSNetworkConfig = require('./../uns-config.json');

const { BigNumber } = ethers;

async function main () {
  console.log('Network:', network.name);

  const config = UNSNetworkConfig.networks[network.config.chainId];
  if (!config) {
    throw new Error(`Config not found for network ${network.config.chainId}`);
  }

  const UNSRegistryArtifact = await ethers.getContractFactory('UNSRegistry');
  const CNSRegistryArtifact = await ethers.getContractFactory('CNSRegistry');

  const { UNSRegistry, CNSRegistry } = config.contracts || {};
  if (!UNSRegistry || !UNSRegistry.address) {
    throw new Error('Current network configuration does not hase UNSRegistry');
  }
  if (!CNSRegistry || !CNSRegistry.address) {
    throw new Error('Current network configuration does not hase CNSRegistry');
  }

  const unsRegistry = await UNSRegistryArtifact.attach(UNSRegistry.address);
  const eventsUNS = await fetchEvents(unsRegistry, UNSRegistry.deploymentBlock);

  const cnsRegistry = await CNSRegistryArtifact.attach(CNSRegistry.address);
  const eventsCNS = await fetchEvents(cnsRegistry, CNSRegistry.deploymentBlock);

  await save(network.config.chainId, eventsUNS.concat(eventsCNS).map(t => t.args.tokenId.toString()));

  console.log('Blocklist complete!');
}

async function fetchEvents (contract, fromBlock, toBlock, limit = 10000) {
  if (!toBlock) {
    toBlock = BigNumber.from(await contract.provider.getBlockNumber());
  }

  const maxBlock = BigNumber.from(fromBlock).add(limit);
  const isTail = BigNumber.from(toBlock).gt(maxBlock);
  const _toBlock = isTail ? maxBlock : toBlock;

  console.log(`Fetching events blocks[${fromBlock}-${_toBlock}]`);
  const transferFilter = contract.filters.Transfer('0x0000000000000000000000000000000000000000');
  try {
    const events = await contract.queryFilter(transferFilter, Number(fromBlock), Number(_toBlock));
    return isTail ? events.concat(await fetchEvents(contract, _toBlock.add(1))) : events;
  } catch (err) {
    console.log('FAIL', err);

    if (err.message === 'query returned more than 10000 results') {
      console.log('Relimiting (1000 blocks)');
      return fetchEvents(contract, fromBlock, toBlock, 1000);
    }

    throw err;
  }
}

async function save (chainId, list) {
  const _path = path.resolve('./.deployer', `${chainId}.blocklist.json`);
  fs.writeFileSync(_path, JSON.stringify(list, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
