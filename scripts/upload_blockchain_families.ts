import fs from 'fs';
import { ethers, network } from 'hardhat';
import { parse } from 'csv-parse/sync';
import { chunk, at } from 'lodash';
import { unwrap } from '../src/helpers';
import { getNetworkConfig } from '../src/config';
import { ProxyReader__factory } from '../types/factories/contracts';
import { ProxyReader } from '../types/contracts/ProxyReader';

const FILENAME = './scripts/blockchain_families.csv';

function readCsv () {
  const content = fs.readFileSync(FILENAME);

  return parse(content) as string[][];
}

function getNetworkFamiles (csv: string[][]) {
  const result = {};

  for(const row of csv) {
    const [, family, network, ,] = row;

    if(!result[network]) {
      result[network] = family;
    } else {
      if(result[network] !== family) {
        throw new Error(`Network ${network} can only have one family: ${result[network]} or ${network}`);
      }
    }
  }

  return result;
}

function getLegacyKeys (csv: string[][]) {
  const result = {};

  for(const row of csv) {
    const [legacyKey, family, network, token] = row;

    const tokenKey = `token.${family}.${network}.${token}.address`;

    result[tokenKey] ||= [];
    result[tokenKey].push(legacyKey);
  }

  return result;
}

async function uploadNetworkFamilies (proxyReader: ProxyReader) {
  const csv = readCsv();
  const familiesMap = getNetworkFamiles(csv);

  console.log('Filling blockchain networks mapping...');
  console.log('Found ' + Object.keys(familiesMap).length + ' networks');

  const tx = await proxyReader['addBlockchainNetworks(string[],string[])'](
    Object.keys(familiesMap),
    Object.values(familiesMap),
  );

  console.log(`TX hash: ${tx.hash}`);

  await tx.wait();
}

async function uploadLegacyKeys (proxyReader: ProxyReader) {
  const legacyKeys = getLegacyKeys(readCsv());
  const CHUNK_SIZE = 50;

  console.log(`Found ${Object.keys(legacyKeys).length} keys`);

  for(const keysChunk of chunk(Object.keys(legacyKeys), CHUNK_SIZE)) {
    console.log(`Uploading chunk of legacy keys with size ${CHUNK_SIZE}`);

    const tx = await proxyReader.addLegacyRecords(
      keysChunk,
      at(legacyKeys, keysChunk),
    );

    console.log(`TX hash: ${tx.hash}`);

    await tx.wait();
  }
}

async function main () {
  console.log('Network:', network.name);

  const [owner] = await ethers.getSigners();

  const chainId: number = unwrap(network.config, 'chainId');
  const config = getNetworkConfig(chainId);
  if (!config) {
    throw new Error(`Config not found for network ${network.config.chainId}`);
  }

  const { ProxyReader } = config.contracts || {};
  if (!ProxyReader || !ProxyReader.address) {
    throw new Error('Current network configuration does not have ProxyReader');
  }

  const proxyReader = new ProxyReader__factory().attach(ProxyReader.address).connect(owner);

  await uploadNetworkFamilies(proxyReader);
  await uploadLegacyKeys(proxyReader);

  console.log('Completed');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

