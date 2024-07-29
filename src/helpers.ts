import {
  ContractAddressOrInstance,
  DeployProxyOptions,
  UpgradeProxyOptions,
} from '@openzeppelin/hardhat-upgrades/dist/utils';
import { BaseContract, ContractFactory, ethers } from 'ethers';
import { network, upgrades } from 'hardhat';
import { MintingManager } from '../types';
import { NetworkChainIds, TLD, TLDConfig } from '../test/helpers/constants';
import { ContractName, DependenciesMap, NsNetworkConfig } from './types';
import { NameService } from './config';

export const isSandbox = network.config.chainId === 1337 || network.config.chainId === 31337;
export const isTestnet = network.config.chainId === 80002 ||
  network.config.chainId === 11155111 ||
  network.config.chainId === 84532;

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
    .filter(([, tldConfig]) => applyfilterTldsByChainId(tldConfig));

  for (const [tldName, tldConfig] of tlds) {
    const correctTldName = tldName.toLowerCase();
    const mintTx = await mintingManager.connect(owner).addTld(correctTldName, tldConfig.expirable ?? false);
    await mintTx.wait();
  }
};

export function getExpirableTlds (): string[] {
  return Object.entries(TLD)
    .filter(([, tldConfig]) => tldConfig.expirable)
    .filter(([, tldConfig]) => applyfilterTldsByChainId(tldConfig))
    .map(([tld]) => tld);
}

function applyfilterTldsByChainId (tldConfig: TLDConfig): boolean {
  const chainId = network.config.chainId!;
  if (tldConfig.chainIds.length === 0) {
    return false;
  }
  if (isSandbox) {
    return true;
  }

  return tldConfig.chainIds
    .flatMap((n) => NetworkChainIds[n])
    .includes(chainId);
}
