import path from 'path';
import fs from 'fs';
import { ethers, network, config } from 'hardhat';
import { merge } from 'lodash';
import debug from 'debug';
import { Contract, ContractFactory } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { NetworkConfig } from 'hardhat/types';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { ArtifactName, NsConfig, NsNetworkConfig, ContractConfigMap, UnsContractName, ContractName } from './types';
import { Task, tasks } from './tasks';
import { unwrap } from './helpers';

const log = debug('UNS:deployer');

type DeployerOptions = {
  basePath: string;
  proxy: boolean;
};

type DeployConfig = {
  contracts: {
    [k in ArtifactName]: {
      address: string;
      legacyAddresses: string[];
      deploymentBlock: string;
      implementation: string;
      forwarder: string;
      transaction: TransactionResponse;
    };
  };
};

type AccountsMap = Record<string, SignerWithAddress>;

type ArtifactsMap = {
  [k in ArtifactName]: ContractFactory;
};

const DEFAULT_OPTIONS: DeployerOptions = {
  basePath: './.deployer',
  proxy: true,
};

async function getArtifacts (): Promise<ArtifactsMap> {
  return {
    CNSRegistry: await ethers.getContractFactory('CNSRegistry'),
    CNSRegistryForwarder: await ethers.getContractFactory('CNSRegistryForwarder'),
    SignatureController: await ethers.getContractFactory('SignatureController'),
    MintingController: await ethers.getContractFactory('MintingController'),
    URIPrefixController: await ethers.getContractFactory('URIPrefixController'),
    Resolver: await ethers.getContractFactory('dot-crypto/contracts/Resolver.sol:Resolver'),
    ResolverForwarder: await ethers.getContractFactory('ResolverForwarder'),
    UNSRegistry: await ethers.getContractFactory('UNSRegistry'),
    MintingManager: await ethers.getContractFactory('MintingManager'),
    UNSOperator: await ethers.getContractFactory('UNSOperator'),
    MintingManagerForwarder: await ethers.getContractFactory('MintingManagerForwarder'),
    ProxyReader: await ethers.getContractFactory('contracts/ProxyReader.sol:ProxyReader'),
    DummyStateSender: await ethers.getContractFactory('DummyStateSender'),
    SimpleCheckpointManager: await ethers.getContractFactory('SimpleCheckpointManager'),
    MintableERC721Predicate: await ethers.getContractFactory('MintableERC721Predicate'),
    RootChainManager: await ethers.getContractFactory('RootChainManager'),
    DotCoinBurner: await ethers.getContractFactory('DotCoinBurner'),

    ENSRegistry: await ethers.getContractFactory('ENSRegistry'),
    BaseRegistrarImplementation: await ethers.getContractFactory('BaseRegistrarImplementation'),
    ReverseRegistrar: await ethers.getContractFactory('ReverseRegistrar'),
    NameWrapper: await ethers.getContractFactory('NameWrapper'),
    DummyOracle: await ethers.getContractFactory('DummyOracle'),
    StablePriceOracle: await ethers.getContractFactory('StablePriceOracle'),
    ETHRegistrarController: await ethers.getContractFactory('ETHRegistrarController'),
    PublicResolver: await ethers.getContractFactory('PublicResolver'),
    ENSCustody: await ethers.getContractFactory('ENSCustody'),
  };
}

export class Deployer {
  public options: DeployerOptions;
  public artifacts: ArtifactsMap;
  public accounts: AccountsMap;
  public log: debug.Debugger;

  public minters: string[];
  public multisig: string;
  public network: NetworkConfig;

  static async create (options?: DeployerOptions): Promise<Deployer> {
    const [owner] = await ethers.getSigners();

    const _unsConfig = config.uns;

    return new Deployer(
      options ?? DEFAULT_OPTIONS,
      await getArtifacts(),
      { owner },
      _unsConfig.minters[network.name],
      _unsConfig.multisig[network.name],
    );
  }

  constructor (
    options: DeployerOptions,
    artifacts: ArtifactsMap,
    accounts: AccountsMap,
    minters: string[],
    multisig: string,
  ) {
    if (!multisig && network.name !== 'sandbox') {
      throw new Error('Multisig address is not set');
    }

    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
    this.artifacts = artifacts;
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
      artifacts: Object.keys(artifacts),
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
        deploymentBlock: value.transaction && ethers.BigNumber.from(value.transaction.blockNumber).toHexString(),
        forwarder: value.forwarder,
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
    contract: Contract,
    implAddress?: string,
    forwarder?: Contract,
  ): Promise<void> {
    const config = this.getDeployConfig();

    const _config = merge(config, {
      contracts: {
        [name]: {
          address: contract.address,
          implementation: implAddress,
          transaction: contract.deployTransaction && (await contract.deployTransaction.wait()),
          forwarder: forwarder && forwarder.address,
        },
      },
    });

    this._saveConfig(_config);
  }

  async saveForwarderConfig (name: UnsContractName, contract: Contract): Promise<void> {
    const config = this.getDeployConfig();

    const _config = merge(config, {
      contracts: {
        [name]: {
          ...((config.contracts || {})[name] || {}),
          forwarder: contract.address,
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
