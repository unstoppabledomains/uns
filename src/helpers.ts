import {
  ContractAddressOrInstance,
  DeployProxyOptions,
  UpgradeProxyOptions,
} from '@openzeppelin/hardhat-upgrades/dist/utils';
import type { BaseContract, ContractFactory } from 'ethers';
import { network, upgrades } from 'hardhat';
import { DependenciesMap, ContractName, NsNetworkConfig } from './types';

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
