import { ethers, network } from 'hardhat';
import SafeApiKit, { SafeApiKitConfig } from '@safe-global/api-kit';
import { OperationType } from '@safe-global/safe-core-sdk-types';
import { config as hardhatConfig } from 'hardhat';
import Safe from '@safe-global/protocol-kit';
import { MetaTransactionData } from '@safe-global/types-kit';
import { Interface, isAddress } from 'ethers';
import { unwrap } from './utils';

const chainId = unwrap(network.config, 'chainId');

export const getSafeApiClient = (): SafeApiKit => {
  const txServiceUrl = hardhatConfig.safe?.txServiceUrls?.[chainId];

  const config: SafeApiKitConfig = { chainId: BigInt(chainId) };

  if (txServiceUrl) {
    config.txServiceUrl = txServiceUrl;
  }

  return new SafeApiKit(config);
};

export const generateUpgradeData = async (contractAddress: string, implementationAddress: string): Promise<string> => {
  const iface = new Interface(['function upgrade(address proxy, address implementation)']);

  return iface.encodeFunctionData('upgrade', [contractAddress, implementationAddress]);
};

export const getSafeSigner = async () => {
  if (process.env.USE_LEDGER) {
    const address = process.env.USE_LEDGER;

    if (!isAddress(address)) {
      throw new Error('Invalid address supplied to USE_LEDGER');
    }

    return ethers.getSigner(address);
  }

  const [coinbase] = await ethers.getSigners();
  return coinbase;
};

/**
 * Creates a Safe transaction proposal for upgrading a contract
 * @param contractAddress The address of the proxy contract to upgrade
 * @param implementationAddress The address of the new implementation
 * @param proxyAdminAddress The address of the proxy admin
 * @returns Information about the proposed transaction
 */
export const proposeContractUpgrade = async (
  contractAddress: string,
  implementationAddress: string,
  proxyAdminAddress: string,
): Promise<void> => {
  try {
    const apiKit = getSafeApiClient();
    const safeAddress = hardhatConfig.uns.multisig[network.name];

    const coinbase = await getSafeSigner();

    const protocolKitOwner = await Safe.init({
      provider: network.provider,
      safeAddress,
      signer: await coinbase.getAddress(),
    });

    const callData = await generateUpgradeData(contractAddress, implementationAddress);

    const safeTransactionData: MetaTransactionData = {
      operation: OperationType.Call,
      to: proxyAdminAddress,
      data: callData,
      value: '0',
    };

    const nonce = await apiKit.getNextNonce(safeAddress);
    const safeTransaction = await protocolKitOwner.createTransaction({
      transactions: [safeTransactionData],
      options: {
        nonce: parseInt(nonce, 10),
      },
    });

    const safeTxHash = await protocolKitOwner.getTransactionHash(safeTransaction);
    const signature = await protocolKitOwner.signHash(safeTxHash);

    await apiKit.proposeTransaction({
      safeAddress,
      safeTransactionData: safeTransaction.data,
      safeTxHash,
      senderAddress: await coinbase.getAddress(),
      senderSignature: signature.data,
    });
  } catch (error) {
    console.error('Error proposing upgrade transaction:', error);
    throw error;
  }
};
