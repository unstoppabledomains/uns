import path from 'path';
import fs from 'fs';
import { network, ethers } from 'hardhat';
import { BaseContract, EventLog, toBeHex } from 'ethers';
import { getNetworkConfig } from '../src/config';
import { unwrap } from '../src/utils';
import { UNSRegistry__factory } from '../types/factories/contracts';
import { CNSRegistry__factory } from '../types/factories/dot-crypto/contracts';

async function main () {
  console.log('Network:', network.name);

  const chainId: number = unwrap(network.config, 'chainId');
  const config = getNetworkConfig(chainId);
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

  const tokens = eventsUNS.concat(eventsCNS).map((t: EventLog) => {
    return toBeHex(t.args.tokenId, 32);
  });
  await save(chainId, { tokens: [...new Set(tokens)] });

  console.log('Blocklist complete!');
}

async function fetchEvents (
  contract: BaseContract,
  fromBlock: number,
  toBlock?: number,
  limit = 10000,
): Promise<Array<EventLog>> {
  if (!toBlock) {
    toBlock = await ethers.provider.getBlockNumber();
  }

  const maxBlock = fromBlock + limit;
  const _toBlock = Math.min(maxBlock, toBlock);

  console.log(`Fetching events blocks [${await contract.getAddress()}: ${fromBlock}-${_toBlock}]`);
  const transferFilter = contract.filters.Transfer('0x0000000000000000000000000000000000000000');
  try {
    const events = (await contract.queryFilter(transferFilter, fromBlock, _toBlock)) as EventLog[];
    return toBlock > maxBlock ? events.concat(await fetchEvents(contract, _toBlock)) : events;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
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
