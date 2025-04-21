import fs from 'fs';
import path from 'path';
import { network } from 'hardhat';
import { parse } from 'csv-parse/sync';
import { unwrap } from '../src/utils';

type BlockchainFamiliesState = {
  networkFamilies: { [network: string]: string };
  legacyKeys: { [tokenKey: string]: string[] };
  latestSyncedBlock: number;
};

function readCsv () {
  const content = fs.readFileSync('./scripts/blockchain_families.csv');
  return parse(content) as string[][];
}

function getNetworkFamiliesFromCsv (csv: string[][]) {
  const result: { [network: string]: string } = {};

  for (const row of csv) {
    const [, family, network] = row;
    if (!result[network]) {
      result[network] = family;
    } else if (result[network] !== family) {
      throw new Error(`Network ${network} has conflicting families: ${result[network]} vs ${family}`);
    }
  }

  return result;
}

function getLegacyKeysFromCsv (csv: string[][]) {
  const result: { [tokenKey: string]: string[] } = {};

  for (const row of csv) {
    const [legacyKey, family, network, token] = row;
    const tokenKey = `token.${family}.${network}.${token}.address`;
    result[tokenKey] ||= [];
    result[tokenKey].push(legacyKey);
  }

  return result;
}

function readStateFile (chainId: number): BlockchainFamiliesState {
  const statePath = path.resolve('./scripts/', `${chainId}-blockchain-families-state.json`);
  try {
    return JSON.parse(fs.readFileSync(statePath).toString());
  } catch (err) {
    console.error(`Could not read state file for chain ${chainId}`);
    throw err;
  }
}

function compareNetworkFamilies (
  csvFamilies: { [network: string]: string },
  stateFamilies: { [network: string]: string },
) {
  const allNetworks = new Set([...Object.keys(csvFamilies), ...Object.keys(stateFamilies)]);
  const differences: { [type: string]: { network: string; csvFamily?: string; stateFamily?: string }[] } = {
    missingInState: [],
    missingInCsv: [],
    different: [],
  };

  allNetworks.forEach((network) => {
    const csvFamily = csvFamilies[network];
    const stateFamily = stateFamilies[network];

    if (!stateFamily && csvFamily) {
      differences.missingInState.push({ network, csvFamily });
    } else if (stateFamily && !csvFamily) {
      differences.missingInCsv.push({ network, stateFamily });
    } else if (stateFamily !== csvFamily) {
      differences.different.push({ network, csvFamily, stateFamily });
    }
  });

  return differences;
}

function compareLegacyKeys (csvKeys: { [tokenKey: string]: string[] }, stateKeys: { [tokenKey: string]: string[] }) {
  const allTokenKeys = new Set([...Object.keys(csvKeys), ...Object.keys(stateKeys)]);
  const differences: { [type: string]: { tokenKey: string; csvKeys?: string[]; stateKeys?: string[] }[] } = {
    missingInState: [],
    missingInCsv: [],
    different: [],
  };

  allTokenKeys.forEach((tokenKey) => {
    const csvLegacyKeys = csvKeys[tokenKey]?.sort() || [];
    const stateLegacyKeys = stateKeys[tokenKey]?.sort() || [];

    if (stateLegacyKeys.length === 0 && csvLegacyKeys.length > 0) {
      differences.missingInState.push({ tokenKey, csvKeys: csvLegacyKeys });
    } else if (csvLegacyKeys.length === 0 && stateLegacyKeys.length > 0) {
      differences.missingInCsv.push({ tokenKey, stateKeys: stateLegacyKeys });
    } else if (JSON.stringify(csvLegacyKeys) !== JSON.stringify(stateLegacyKeys)) {
      differences.different.push({ tokenKey, csvKeys: csvLegacyKeys, stateKeys: stateLegacyKeys });
    }
  });

  return differences;
}

function displayDifferences (
  networkDiffs: ReturnType<typeof compareNetworkFamilies>,
  legacyDiffs: ReturnType<typeof compareLegacyKeys>,
) {
  console.log('\n=== NETWORK FAMILIES DIFFERENCES ===');

  if (
    networkDiffs.missingInState.length === 0 &&
    networkDiffs.missingInCsv.length === 0 &&
    networkDiffs.different.length === 0
  ) {
    console.log('No differences in network families! ✅');
  } else {
    if (networkDiffs.missingInState.length > 0) {
      console.log('\nNetworks in CSV but missing in state:');
      networkDiffs.missingInState.forEach(({ network, csvFamily }) => {
        console.log(`  ${network}: ${csvFamily}`);
      });
    }

    if (networkDiffs.missingInCsv.length > 0) {
      console.log('\nNetworks in state but missing in CSV:');
      networkDiffs.missingInCsv.forEach(({ network, stateFamily }) => {
        console.log(`  ${network}: ${stateFamily}`);
      });
    }

    if (networkDiffs.different.length > 0) {
      console.log('\nNetworks with different families:');
      networkDiffs.different.forEach(({ network, csvFamily, stateFamily }) => {
        console.log(`  ${network}: CSV=${csvFamily}, State=${stateFamily}`);
      });
    }
  }

  console.log('\n=== LEGACY KEYS DIFFERENCES ===');

  if (
    legacyDiffs.missingInState.length === 0 &&
    legacyDiffs.missingInCsv.length === 0 &&
    legacyDiffs.different.length === 0
  ) {
    console.log('No differences in legacy keys! ✅');
  } else {
    if (legacyDiffs.missingInState.length > 0) {
      console.log('\nToken keys in CSV but missing in state:');
      legacyDiffs.missingInState.forEach(({ tokenKey, csvKeys }) => {
        console.log(`  ${tokenKey}:`);
        console.log(`    CSV: ${csvKeys?.join(', ')}`);
      });
    }

    if (legacyDiffs.missingInCsv.length > 0) {
      console.log('\nToken keys in state but missing in CSV:');
      legacyDiffs.missingInCsv.forEach(({ tokenKey, stateKeys }) => {
        console.log(`  ${tokenKey}:`);
        console.log(`    State: ${stateKeys?.join(', ')}`);
      });
    }

    if (legacyDiffs.different.length > 0) {
      console.log('\nToken keys with different legacy keys:');
      legacyDiffs.different.forEach(({ tokenKey, csvKeys, stateKeys }) => {
        console.log(`  ${tokenKey}:`);
        console.log(`    CSV:   ${csvKeys?.join(', ')}`);
        console.log(`    State: ${stateKeys?.join(', ')}`);
      });
    }
  }
}

async function main () {
  const chainId: number = unwrap(network.config, 'chainId');
  console.log('Network:', network.name, 'ChainID:', chainId);

  console.log('\nReading CSV file...');
  const csv = readCsv();
  const csvNetworkFamilies = getNetworkFamiliesFromCsv(csv);
  const csvLegacyKeys = getLegacyKeysFromCsv(csv);

  console.log('Reading state file...');
  const state = readStateFile(chainId);

  console.log('\nComparing data...');
  const networkDiffs = compareNetworkFamilies(csvNetworkFamilies, state.networkFamilies);
  const legacyDiffs = compareLegacyKeys(csvLegacyKeys, state.legacyKeys);

  displayDifferences(networkDiffs, legacyDiffs);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
