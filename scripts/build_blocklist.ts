import path from 'path';
import fs from 'fs';
import { network } from 'hardhat';
import { Contract } from 'ethers';
import { Event } from '@ethersproject/contracts';
import { readNetworkConfig } from '../src/config';
import { UNSRegistry__factory } from '../types/factories/contracts';
import { CNSRegistry__factory } from '../types/factories/dot-crypto/contracts';

const UNSNetworkConfig = readNetworkConfig();

async function main () {
  console.log('Network:', network.name);

  const chainId: number = network.config.chainId!;
  const config = UNSNetworkConfig.networks[chainId];
  if (!config) {
    throw new Error(`Config not found for network ${network.config.chainId}`);
  }

  const { UNSRegistry, CNSRegistry } = config.contracts || {};
  if (!UNSRegistry || !UNSRegistry.address) {
    throw new Error('Current network configuration does not hase UNSRegistry');
  }
  if (!CNSRegistry || !CNSRegistry.address) {
    throw new Error('Current network configuration does not hase CNSRegistry');
  }

  const unsRegistry = new UNSRegistry__factory().attach(UNSRegistry.address);
  const eventsUNS = await fetchEvents(unsRegistry, parseInt(UNSRegistry.deploymentBlock, 16));

  const cnsRegistry = new CNSRegistry__factory().attach(CNSRegistry.address);
  const eventsCNS = await fetchEvents(cnsRegistry, parseInt(CNSRegistry.deploymentBlock, 16));

  const tokens = eventsUNS.concat(eventsCNS).map((t: Event) => {
    return (
      '0x' +
      t.args.tokenId
        .toHexString()
        .replace(/^(0x)?/, '')
        .padStart(64, '0')
    );
  });
  await save(chainId, { tokens: [...new Set(tokens)] });

  console.log('Blocklist complete!');
}

async function fetchEvents (
  contract: Contract,
  fromBlock: number,
  toBlock?: number,
  limit = 10000,
): Promise<Array<Event>> {
  if (!toBlock) {
    toBlock = await contract.provider.getBlockNumber();
  }

  const maxBlock = fromBlock + limit;
  const _toBlock = Math.min(maxBlock, toBlock);

  console.log(`Fetching events blocks [${contract.address}: ${fromBlock}-${_toBlock}]`);
  const transferFilter = contract.filters.Transfer('0x0000000000000000000000000000000000000000');
  try {
    const events = await contract.queryFilter(transferFilter, fromBlock, _toBlock);
    return toBlock > maxBlock ? events.concat(await fetchEvents(contract, _toBlock)) : events;
  } catch (err) {
    console.log('FAIL', err);

    if (err.message === 'query returned more than 10000 results') {
      console.log('Relimiting (1000 blocks)');
      return fetchEvents(contract, fromBlock, toBlock, 1000);
    }

    throw err;
  }
}

async function save (chainId: number, state: unknown) {
  const _path = path.resolve('./.deployer', `${chainId}.blocklist.json`);
  fs.writeFileSync(_path, JSON.stringify(state, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
