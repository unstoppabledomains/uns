import { ethers, network, config } from 'hardhat';
import path from 'path';
import fs from 'fs';
import {merge} from 'lodash';
import debug from 'debug';
import { Contract, ContractFactory, Transaction, Signer} from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { TransactionResponse } from "@ethersproject/abstract-provider";
import {Task, tasks} from './tasks';

const log = debug('UNS:deployer');

type DeployerOptions = {
  basePath: string;
  proxy: boolean;
}

type DeployerConfig = {
  contracts: {
    [k in ArtifactNames]: {
      address: string,
      legacyAddresses: string[],
      deploymentBlock: string,
      implementation: string,
      forwarder: string,
      transaction: TransactionResponse
    }
  }
}

export enum ArtifactNames {
  CNSRegistry = 'CNSRegistry',
  CNSRegistryForwarder = 'CNSRegistryForwarder',
  SignatureController = 'SignatureController',
  MintingController = 'MintingController',
  URIPrefixController = 'URIPrefixController',
  Resolver = 'Resolver',
  ResolverForwarder = 'ResolverForwarder',
  UNSRegistry = 'UNSRegistry',
  MintingManager = 'MintingManager',
  MintingManagerForwarder = 'MintingManagerForwarder',
  ProxyReader = 'contracts/ProxyReader.sol:ProxyReader',
  DummyStateSender = 'DummyStateSender',
  CheckpointManager = 'SimpleCheckpointManager',
  MintableERC721Predicate = 'MintableERC721Predicate',
  RootChainManager = 'RootChainManager',
}

type ArtifactsMap = {
  [k in ArtifactNames]: ContractFactory
}

const DEFAULT_OPTIONS: DeployerOptions = {
  basePath: './.deployer',
  proxy: true,
};

async function getArtifacts(): Promise<ArtifactsMap> {
  return {
    CNSRegistry: await ethers.getContractFactory('CNSRegistry'),
    CNSRegistryForwarder: await ethers.getContractFactory('CNSRegistryForwarder'),
    SignatureController: await ethers.getContractFactory('SignatureController'),
    MintingController: await ethers.getContractFactory('MintingController'),
    URIPrefixController: await ethers.getContractFactory('URIPrefixController'),
    Resolver: await ethers.getContractFactory('Resolver'),
    ResolverForwarder: await ethers.getContractFactory('ResolverForwarder'),
    UNSRegistry: await ethers.getContractFactory('UNSRegistry'),
    MintingManager: await ethers.getContractFactory('MintingManager'),
    MintingManagerForwarder: await ethers.getContractFactory('MintingManagerForwarder'),
    [ArtifactNames.ProxyReader]: await ethers.getContractFactory('contracts/ProxyReader.sol:ProxyReader'),
    DummyStateSender: await ethers.getContractFactory('DummyStateSender'),
    [ArtifactNames.CheckpointManager]: await ethers.getContractFactory('SimpleCheckpointManager'),
    MintableERC721Predicate: await ethers.getContractFactory('MintableERC721Predicate'),
    RootChainManager: await ethers.getContractFactory('RootChainManager'),
  };
}

export class Deployer {
  public options: DeployerOptions;    
  public artifacts: ArtifactsMap;
  public accounts: {owner: SignerWithAddress};
  public log: debug.Debugger;

  // TODO: add typings here
  public minters: any;
  private network: any;

  static async create (options?: DeployerOptions) {
    const [owner] = await ethers.getSigners();

    // Should re-use another type then
    const _unsConfig = config.uns;

    return new Deployer(
      options,
      await getArtifacts(),
      { owner },
      _unsConfig.minters[network.name],
    );
  }

  constructor (options: DeployerOptions, artifacts: ArtifactsMap, accounts: {owner: SignerWithAddress}, minters) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
    this.artifacts = artifacts;
    this.accounts = accounts;
    this.minters = minters;
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
      accounts: Object.values(accounts).filter(a => !!a).map(a => a.address),
      minters,
    });
  }

  // TODO: add proper typings for uns-config
  async execute (tags: string[], config?: any) {
    tags = tags || [];

    this.log('Execution started');
    // this.log(deployCNSTask);

    for (const task of tasks.sort((a: Task, b: Task) => a.priority - b.priority)) {
      if (!tags.some(t => task.tags.includes(t.toLowerCase()))) continue;

      this.log('Executing task', { tags: task.tags });

      const dependencies = task.ensureDependencies(this, config);
      await task.run(this, dependencies);
    }

    const _config = this.getNetworkConfig();
    this.log('Execution completed', JSON.stringify(_config));
    return _config;
  }

  getNetworkConfig () {
    const config = this.getDeployConfig();

    const emptyConfig = {
      address: '0x0000000000000000000000000000000000000000',
      legacyAddresses: [],
      deploymentBlock: '0x0',
    };

    const contracts = {};
    for (const [key, value] of Object.entries(config.contracts || {})) {
      contracts[key] = {
        ...emptyConfig,
        address: value.address,
        implementation: value.implementation,
        deploymentBlock: value.transaction &&
          ethers.BigNumber.from(value.transaction.blockNumber).toHexString(),
        forwarder: value.forwarder,
      };
    };

    return {
      networks: {
        [this.network.chainId]: {
          contracts,
        },
      },
    };
  }

  getDeployConfig(): DeployerConfig {
    const configPath = path.resolve(this.options.basePath, `${this.network.chainId}.json`);
    const file = fs.existsSync(configPath) ? fs.readFileSync(configPath).toString() : '{}';
    return JSON.parse(file.length ? file : '{}');
  }

  async saveContractConfig (name: string, contract: Contract, implAddress?: string, forwarder?: Contract) {
    const config = this.getDeployConfig();

    const _config = merge(config, {
      contracts: {
        [name]: {
          address: contract.address,
          implementation: implAddress,
          transaction: contract.deployTransaction && await contract.deployTransaction.wait(),
          forwarder: forwarder && forwarder.address,
        },
      },
    });

    this._saveConfig(_config);
  }

  async saveForwarderConfig (name: string, contract: Contract) {
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

  async _saveConfig (config: any) {
    const configPath = path.resolve(this.options.basePath, `${this.network.chainId}.json`);
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }
}
