const { ethers, network, config: hhConfig } = require('hardhat');
const path = require('path');
const fs = require('fs');
const merge = require('lodash.merge');
const debug = require('debug');

const tasks = require('./tasks');

const log = debug('UNS:deployer');

const defaultOptions = {
  basePath: './.deployer',
  proxy: true,
};

async function _getArtifacts () {
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
    ProxyReader: await ethers.getContractFactory('contracts/ProxyReader.sol:ProxyReader'),
    DummyStateSender: await ethers.getContractFactory('DummyStateSender'),
    CheckpointManager: await ethers.getContractFactory('SimpleCheckpointManager'),
    MintableERC721Predicate: await ethers.getContractFactory('MintableERC721Predicate'),
    RootChainManager: await ethers.getContractFactory('RootChainManager'),
    DotCoinBurner: await ethers.getContractFactory('DotCoinBurner'),
  };
}

class Deployer {
  static async create (options) {
    const [owner] = await ethers.getSigners();
    const _unsConfig = hhConfig.uns;

    return new Deployer(
      options,
      await _getArtifacts(),
      { owner },
      _unsConfig.minters[network.name],
    );
  }

  constructor (options, artifacts, accounts, minters) {
    this.options = {
      ...defaultOptions,
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

  async execute (tags, config) {
    tags = tags || [];

    this.log('Execution started');
    for (const task of tasks.sort((a, b) => a.priority - b.priority)) {
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

  getDeployConfig () {
    const configPath = path.resolve(this.options.basePath, `${this.network.chainId}.json`);
    const file = fs.existsSync(configPath) ? fs.readFileSync(configPath) : '{}';
    return JSON.parse(file.length ? file : '{}');
  }

  async saveContractConfig (name, contract, implAddress, forwarder) {
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

  async saveForwarderConfig (name, contract) {
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

  async _saveConfig (config) {
    const configPath = path.resolve(this.options.basePath, `${this.network.chainId}.json`);
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }
}

module.exports = Deployer;
