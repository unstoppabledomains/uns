const { ethers, network, config: hhConfig } = require('hardhat');
const path = require('path');
const fs = require('fs');
const merge = require('lodash.merge');

const { deployCNSTask, deployUNSTask, configureCNSTask, upgradeUNSTask } = require('./tasks');

const defaultOptions = {
  basePath: './.deployer',
  proxy: true,
};

async function _getArtifacts () {
  return {
    CNSRegistry: await ethers.getContractFactory('contracts/cns/CNSRegistry.sol:CNSRegistry'),
    SignatureController:
      await ethers.getContractFactory('dot-crypto/contracts/controllers/SignatureController.sol:SignatureController'),
    MintingController:
      await ethers.getContractFactory('dot-crypto/contracts/controllers/MintingController.sol:MintingController'),
    URIPrefixController:
      await ethers.getContractFactory('dot-crypto/contracts/controllers/URIPrefixController.sol:URIPrefixController'),
    WhitelistedMinter:
      await ethers.getContractFactory('dot-crypto/contracts/util/WhitelistedMinter.sol:WhitelistedMinter'),
    Resolver: await ethers.getContractFactory('dot-crypto/contracts/Resolver.sol:Resolver'),
    UNSRegistry: await ethers.getContractFactory('contracts/UNSRegistry.sol:UNSRegistry'),
    MintingManager: await ethers.getContractFactory('contracts/MintingManager.sol:MintingManager'),
    ProxyReader: await ethers.getContractFactory('contracts/ProxyReader.sol:ProxyReader'),
    TwitterValidationOperator:
      await ethers.getContractFactory('contracts/operators/TwitterValidationOperator.sol:TwitterValidationOperator'),
  };
}

class Deployer {
  constructor (options, artifacts, accounts, minters, linkToken) {
    this.options = {
      ...defaultOptions,
      ...options,
    };
    this.artifacts = artifacts;
    this.accounts = accounts;
    this.minters = minters;
    this.linkToken = linkToken;

    this.network = network.config;
    this.tasks = [
      deployCNSTask,
      deployUNSTask,
      configureCNSTask,
      upgradeUNSTask,
    ];

    const { basePath } = this.options;
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath);
    }
  }

  static async create (options) {
    const [unsDeployer, cnsDeployer] = await ethers.getSigners();
    const _unsConfig = hhConfig.uns;

    return new Deployer(
      options,
      await _getArtifacts(),
      { unsDeployer, cnsDeployer },
      _unsConfig.minters[network.name],
      _unsConfig.linkToken[network.name],
    );
  }

  async execute (tags, config) {
    tags = tags || [];
    for (const task of this.tasks) {
      if (!tags.some(t => task.tags.includes(t.toLowerCase()))) continue;

      const dependencies = task.ensureDependencies(this, config);
      await task.run(this, dependencies);
    }
    return this.getNetworkConfig();
  }

  getNetworkConfig () {
    const config = this.getDeployConfig();

    const contracts = {};
    for (const [key, value] of Object.entries(config.contracts || {})) {
      contracts[key] = {
        address: value.address,
        implementation: value.implementation,
        deploymentBlock: value.transaction &&
          ethers.BigNumber.from(value.transaction.blockNumber).toHexString(),
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

  async saveContractConfig (name, contract, implAddress) {
    const config = this.getDeployConfig();

    const _config = merge(config, {
      contracts: {
        [name]: {
          address: contract.address,
          implementation: implAddress,
          transaction: contract.deployTransaction && await contract.deployTransaction.wait(),
        },
      },
    });

    const configPath = path.resolve(this.options.basePath, `${this.network.chainId}.json`);
    fs.writeFileSync(configPath, JSON.stringify(_config, null, 2));
  }
}

module.exports = Deployer;
