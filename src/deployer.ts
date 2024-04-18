import path from 'path';
import fs from 'fs';
import { ethers, network, config } from 'hardhat';
import { merge } from 'lodash';
import debug from 'debug';
import { BaseContract, toBeHex, ZeroAddress } from 'ethers';
import { NetworkConfig } from 'hardhat/types';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ArtifactName, NsConfig, NsNetworkConfig, ContractConfigMap, UnsContractName, ContractName } from './types';
import { Task, tasks } from './tasks';
import { unwrap } from './utils';

const log = debug('UNS:deployer');

type DeployerOptions = {
  basePath: string;
  proxy: boolean;
};

type DeployedContract = {
  address: string;
  legacyAddresses: string[];
  deploymentBlock: string;
  implementation: string;
  forwarder: string;
  transaction: TransactionResponse;
}

type DeployConfig = {
  contracts: {
    [k in ArtifactName]: DeployedContract;
  };
};

type AccountsMap = Record<string, SignerWithAddress>;

const DEFAULT_OPTIONS: DeployerOptions = {
  basePath: './.deployer',
  proxy: true,
};

export class Deployer {
  public options: DeployerOptions;
  public accounts: AccountsMap;
  public log: debug.Debugger;

  public minters: string[];
  public multisig: string | null;
  public network: NetworkConfig;

  static async create (options?: DeployerOptions): Promise<Deployer> {
    const [owner] = await ethers.getSigners();

    const _unsConfig = config.uns;

    return new Deployer(
      options ?? DEFAULT_OPTIONS,
      { owner },
      _unsConfig.minters[network.name],
      _unsConfig.multisig[network.name],
    );
  }

  constructor (
    options: DeployerOptions,
    accounts: AccountsMap,
    minters: string[],
    multisig: string,
  ) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
    this.accounts = accounts;
    this.minters = minters;
    this.multisig = multisig;
    this.network = network.config;

    this.log = log;
    debug.enable('UNS:deployer');

    const { basePath } = this.options;
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath);
    }

    this.log('Initialized deployer', {
      options: this.options,
      accounts: Object.values(accounts)
        .filter((a) => !!a)
        .map((a) => a.address),
      minters,
    });
  }

  async execute (tags: string[], config?: NsNetworkConfig, params?: Record<string, string>): Promise<NsConfig> {
    tags = tags || [];

    this.log('Execution started');

    for (const task of tasks.sort((a: Task, b: Task) => a.priority - b.priority)) {
      if (!tags.some((t) => task.tags.includes(t.toLowerCase()))) continue;

      this.log('Executing task', { tags: task.tags, params });

      const dependencies = task.ensureDependencies(this, config);

      await task.run(this, dependencies, params);
    }

    const _config = this.getNetworkConfig();
    this.log('Execution completed', JSON.stringify(_config));
    return _config;
  }

  getNetworkConfig (): NsConfig {
    const config = this.getDeployConfig();

    const emptyConfig = {
      address: '0x0000000000000000000000000000000000000000',
      deploymentBlock: '0x0',
    };

    const contracts = {};

    for (const [key, value] of Object.entries(config.contracts || {})) {
      contracts[key] = {
        ...emptyConfig,
        address: value.address,
        implementation: value.implementation,
        deploymentBlock: value.transaction && toBeHex(BigInt(value.transaction.blockNumber ?? 0)),
        forwarder: value.forwarder,
        legacyAddresses: value.legacyAddresses,
      };
    }

    return {
      networks: {
        [unwrap(this.network, 'chainId')]: {
          contracts: contracts as ContractConfigMap,
        },
      },
    };
  }

  getDeployConfig (): DeployConfig {
    const configPath = path.resolve(this.options.basePath, `${this.network.chainId}.json`);
    const file = fs.existsSync(configPath) ? fs.readFileSync(configPath).toString() : '{}';
    return JSON.parse(file.length ? file : '{}');
  }

  async saveContractConfig (
    name: ContractName,
    contract: BaseContract,
    implAddress?: string,
    forwarder?: BaseContract,
  ): Promise<void> {
    const config = this.getDeployConfig();

    const _config = merge(config, {
      contracts: {
        [name]: {
          address: await contract.getAddress(),
          implementation: implAddress,
          transaction: (await contract.deploymentTransaction()?.wait()),
          forwarder: forwarder && await forwarder.getAddress(),
        },
      },
    });

    this._saveConfig(_config);
  }

  async saveContractLegacyAddresses (
    name: ContractName,
    legacyAddresses: string[] = [],
  ): Promise<void> {
    const config = this.getDeployConfig();

    const _config = merge(config, {
      contracts: {
        [name]: {
          legacyAddresses,
        },
      },
    });

    this._saveConfig(_config);
  }

  async saveForwarderConfig (name: UnsContractName, contract: BaseContract): Promise<void> {
    const config = this.getDeployConfig();

    const _config = merge(config, {
      contracts: {
        [name]: {
          ...((config.contracts || {})[name] || {}),
          forwarder: await contract.getAddress(),
        },
      },
    });

    this._saveConfig(_config);
  }

  async saveContractEmptyConfig (name: UnsContractName) {
    const config = this.getDeployConfig();

    const _config = merge(config, {
      contracts: {
        [name]: {
          address: ZeroAddress,
        },
      },
    });

    this._saveConfig(_config);
  }

  async _saveConfig (config: unknown) {
    const configPath = path.resolve(this.options.basePath, `${this.network.chainId}.json`);
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }
}
