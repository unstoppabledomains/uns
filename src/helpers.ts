import {
  ContractAddressOrInstance,
  DeployProxyOptions,
  UpgradeProxyOptions,
} from '@openzeppelin/hardhat-upgrades/dist/utils';
import { BaseContract, ContractFactory, ethers } from 'ethers';
import { network, upgrades } from 'hardhat';
import { MintingManager } from '../types';
import { ContractName, DependenciesMap, NsNetworkConfig } from './types';
import { NameService } from './config';
import { NetworkChainIds, TLD, TLDConfig } from './tlds';

export const SANDBOX_NETWORK_IDS = [1337, 31337];
export const TESTNET_NETWORK_IDS = [80002, 11155111, 84532, 57054];

export const isSandbox = SANDBOX_NETWORK_IDS.includes(network.config.chainId ?? 0);
export const isTestnet = TESTNET_NETWORK_IDS.includes(network.config.chainId ?? 0);

export const ensureDeployed = (config: NsNetworkConfig, ...contracts: ContractName[]): DependenciesMap => {
  return contracts
    .map((name) => {
      const contract = config.contracts[name];
      if (!contract?.address) {
        throw new Error(`${name} contract not found for network ${network.config.chainId}`);
      }
      return { [name]: contract };
    })
    .reduce((a, b) => ({ ...a, ...b }));
};

export const ensureUpgradable = (config: NsNetworkConfig): void => {
  if (!config.contracts.ProxyAdmin?.address) {
    throw new Error('Current network configuration does not support upgrading');
  }
};

export const deployProxy = async <T extends BaseContract>(
  implFactory: ContractFactory,
  args?: unknown[],
  opts?: DeployProxyOptions,
): Promise<T> => {
  const proxy = await upgrades.deployProxy(implFactory, args, opts);

  await proxy.waitForDeployment();

  return proxy as unknown as T;
};

export const upgradeProxy = async <T extends BaseContract>(
  proxy: ContractAddressOrInstance,
  implFactory: ContractFactory,
  opts?: UpgradeProxyOptions,
): Promise<T> => {
  const upgraded = await upgrades.upgradeProxy(proxy, implFactory, opts);

  await upgraded.waitForDeployment();

  return proxy as unknown as T;
};

/**
 * Only used for ProxyReader, as ProxyReader has a `getAddress` contract function
 */
export const getContractAddress = async (contract: BaseContract): Promise<string> => {
  return contract.getAddress();
};

export const mintUnsTlds = async (mintingManager: MintingManager, owner: ethers.Signer) => {
  const tlds = Object.entries(TLD)
    .filter(([, config]) => config.nameServices.includes(NameService.UNS))
    .filter(([, tldConfig]) => filterTldsByChainId(tldConfig));

  for (const [tldName, tldConfig] of tlds) {
    const correctTldName = tldName.toLowerCase();
    const mintTx = await mintingManager.connect(owner).addTld(correctTldName, tldConfig.expirable ?? false);
    await mintTx.wait();
  }
};

export function getExpirableTlds (): string[] {
  return Object.entries(TLD)
    .filter(([, tldConfig]) => tldConfig.expirable)
    .filter(([, tldConfig]) => filterTldsByChainId(tldConfig))
    .map(([tld]) => tld);
}

function filterTldsByChainId (tldConfig: TLDConfig): boolean {
  const chainId = network.config.chainId!;
  if (tldConfig.networks.length === 0) {
    return false;
  }
  if (isSandbox) {
    return true;
  }

  return tldConfig.networks.flatMap((n) => NetworkChainIds[n]).includes(chainId);
}
