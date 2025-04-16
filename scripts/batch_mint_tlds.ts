import { ethers, network, config as hardhatConfig } from 'hardhat';
import yargs from 'yargs';
import Safe from '@safe-global/protocol-kit';
import { OperationType } from '@safe-global/safe-core-sdk-types';
import { MetaTransactionData } from '@safe-global/types-kit';
import { unwrap } from '../src/utils';
import { getNetworkConfig } from '../src/config';
import { getSafeApiClient, getSafeSigner } from '../src/safe';

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

  const apiKit = getSafeApiClient();
  const safeSigner = await getSafeSigner();

  const protocolKitOwner = await Safe.init({
    provider: network.provider,
    safeAddress: multisigAddr,
    signer: await safeSigner.getAddress(),
  });

  const safeTransactionData: MetaTransactionData[] = tlds.map((tld) => {
    const callData = mintingManager.interface.encodeFunctionData('addTld', [tld, expirable]);

    return {
      operation: OperationType.Call,
      to: config.contracts.MintingManager.address,
      data: callData,
      value: '0',
    };
  });

  const safeTransaction = await protocolKitOwner.createTransaction({
    transactions: safeTransactionData,
  });

  const safeTxHash = await protocolKitOwner.getTransactionHash(safeTransaction);
  const signature = await protocolKitOwner.signHash(safeTxHash);

  await apiKit.proposeTransaction({
    safeAddress: multisigAddr,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress: await safeSigner.getAddress(),
    senderSignature: signature.data,
  });

  console.log('Proposal created!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
