import { ethers, network, config as hardhatConfig } from 'hardhat';
import yargs from 'yargs';
import { getNetworkConfig } from '../src/config';
import { getProposalClient } from '../src/defender';
import { unwrap } from '../src/utils';

const DEFENDER_NETWORK_NAME_REMAPS = {
  polygon: 'matic',
};

const MAX_BATCH_SIZE = 100;

async function main () {
  console.log('Network:', network.name);

  const argv = yargs().env('').string('tlds').boolean('expirable').parseSync();

  const tlds = argv.tlds?.split(',').map((tld) => tld.trim());
  const expirable = argv.expirable ?? true;

  if (!tlds || !tlds.length) {
    throw new Error('TLDs not provided');
  }

  if (tlds.length > MAX_BATCH_SIZE) {
    throw new Error(`TLDs count exceeds ${MAX_BATCH_SIZE}`);
  }

  console.log('Creating a TLD proposal for: ');
  console.table(
    tlds.map(
      (tld) => ({
        TLD: tld,
        Expirable: expirable ? 'Yes' : 'No',
      }),
      ['TLD', 'Expirable'],
    ),
  );

  const chainId: number = unwrap(network.config, 'chainId');
  const config = getNetworkConfig(chainId);
  if (!config) {
    throw new Error(`Config not found for network ${chainId}`);
  }

  const multisigAddr = hardhatConfig.uns.multisig[network.name];

  if (!multisigAddr) {
    throw new Error(`Multisig address is not set for network ${network.name}`);
  }

  const mintingManager = await ethers.getContractAt('MintingManager', config.contracts.MintingManager.address);
  const addTldFunc = mintingManager.interface.getFunction('addTld');

  const defenderNetworkName = DEFENDER_NETWORK_NAME_REMAPS[network.name] ?? network.name;

  const response = await getProposalClient().create({
    proposal: {
      contract: tlds.map(() => ({
        name: 'MintingManager',
        address: config.contracts.MintingManager.address,
        network: defenderNetworkName,
      })),
      via: multisigAddr,
      viaType: 'Safe',
      title: 'Add TLDs',
      description: tlds.join(', '),
      type: 'batch',
      steps: tlds.map((tld) => ({
        contractId: [defenderNetworkName, config.contracts.MintingManager.address].join('-'),
        type: 'custom',
        targetFunction: {
          name: addTldFunc.name,
          inputs: addTldFunc.inputs.map((input) => ({
            name: input.name,
            type: input.type,
            baseType: input.baseType,
          })),
        },
        functionInputs: [tld, expirable],
      })),
      metadata: {},
    },
  });

  console.log('Proposal created: ', response.url);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
