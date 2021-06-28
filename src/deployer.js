const { ethers, network, config: hhConfig, upgrades } = require('hardhat');
const path = require('path');
const fs = require('fs');
const merge = require('lodash.merge');

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
      this._deployCNSTask(),
      this._deployUNSTask(),
      this._configureCNSTask(),
      this._upgradeUNSTask(),
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

      const deps = task.ensureDependencies(config);
      await task.run(deps);
    }
    return this.config();
  }

  config () {
    const config = this._getNetworkConfig();

    const contracts = {};
    for (const [key, value] of Object.entries(config.contracts || {})) {
      contracts[key] = {
        address: value.address,
        implementation: value.implementation,
        deploymentBlock: value.transaction && value.transaction.blockNumber,
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

  _deployCNSTask () {
    return {
      tags: ['cns', 'full'],
      run: async () => {
        const { cnsDeployer } = this.accounts;
        const {
          CNSRegistry,
          SignatureController,
          MintingController,
          URIPrefixController,
          Resolver,
        } = this.artifacts;

        // CNS registry
        const cnsRegistry = await CNSRegistry.connect(cnsDeployer).deploy();
        await this._saveContractConfig('CNSRegistry', cnsRegistry);

        // CNS Controllers
        const signatureController = await SignatureController.connect(cnsDeployer).deploy(cnsRegistry.address);
        await this._saveContractConfig('SignatureController', signatureController);

        const mintingController = await MintingController.connect(cnsDeployer).deploy(cnsRegistry.address);
        await this._saveContractConfig('MintingController', mintingController);

        const uriPrefixController = await URIPrefixController.connect(cnsDeployer).deploy(cnsRegistry.address);
        await this._saveContractConfig('URIPrefixController', uriPrefixController);

        // Configuration
        await cnsRegistry.connect(cnsDeployer).addController(signatureController.address);
        await cnsRegistry.connect(cnsDeployer).addController(mintingController.address);
        await cnsRegistry.connect(cnsDeployer).addController(uriPrefixController.address);

        // CNS Resolver
        const resolver = await Resolver.connect(cnsDeployer).deploy(cnsRegistry.address, mintingController.address);
        await this._saveContractConfig('Resolver', resolver);
      },
      ensureDependencies: () => {

      },
    };
  }

  _deployUNSTask () {
    return {
      tags: ['uns', 'full'],
      run: async (dependencies) => {
        const { unsDeployer } = this.accounts;
        const {
          CNSRegistry,
          MintingController,
          URIPrefixController,
          Resolver,
        } = dependencies;

        let unsRegistry, mintingManager, unsRegistryImpl, mintingManagerImpl, proxyAdmin;
        if (this.options.proxy) {
          unsRegistry = await upgrades.deployProxy(this.artifacts.UNSRegistry, [], { initializer: false });
          mintingManager = await upgrades.deployProxy(this.artifacts.MintingManager, [], { initializer: false });

          proxyAdmin = await upgrades.admin.getInstance();
          await this._saveContractConfig('ProxyAdmin', proxyAdmin);

          unsRegistryImpl = await proxyAdmin.callStatic.getProxyImplementation(unsRegistry.address);
          await this._saveContractConfig('UNSRegistry', unsRegistry, unsRegistryImpl);

          mintingManagerImpl = await proxyAdmin.callStatic.getProxyImplementation(mintingManager.address);
          await this._saveContractConfig('MintingManager', mintingManager, mintingManagerImpl);
        } else {
          unsRegistry = await this.artifacts.UNSRegistry.connect(unsDeployer).deploy();
          await this._saveContractConfig('UNSRegistry', unsRegistry);

          mintingManager = await this.artifacts.MintingManager.connect(unsDeployer).deploy();
          await this._saveContractConfig('MintingManager', mintingManager);
        }

        const registryInitTx = await unsRegistry.connect(unsDeployer).initialize(mintingManager.address);
        await registryInitTx.wait();

        const mintingManagerInitTx = await mintingManager.connect(unsDeployer).initialize(
          unsRegistry.address,
          MintingController.address,
          URIPrefixController.address,
          Resolver.address,
        );
        await mintingManagerInitTx.wait();

        if (this.minters.length) {
          await mintingManager.connect(unsDeployer).addMinters(this.minters);
        }

        const proxyReader = await this.artifacts.ProxyReader
          .connect(unsDeployer)
          .deploy(unsRegistry.address, CNSRegistry.address);
        await this._saveContractConfig('ProxyReader', proxyReader);

        if (this.linkToken.length) {
          const operator = await this.artifacts.TwitterValidationOperator
            .connect(unsDeployer)
            .deploy(
              unsRegistry.address,
              CNSRegistry.address,
              this.linkToken,
              [unsDeployer.address],
            );
          await this._saveContractConfig('TwitterValidationOperator', operator);
        }
      },
      ensureDependencies: (config) => {
        config = merge(this._getNetworkConfig(), config);

        const {
          CNSRegistry,
          MintingController,
          URIPrefixController,
          Resolver,
        } = config.contracts || {};
        const deps = {
          CNSRegistry,
          MintingController,
          URIPrefixController,
          Resolver,
        };

        for (const [key, value] of Object.entries(deps)) {
          if (!value || !value.address) {
            throw new Error(`${key} contract not found for network ${network.config.chainId}`);
          }
        };

        return deps;
      },
    };
  }

  _configureCNSTask () {
    return {
      tags: ['uns', 'full'],
      run: async (dependencies) => {
        const { cnsDeployer } = this.accounts;
        const {
          MintingController,
          URIPrefixController,
          MintingManager,
        } = dependencies;

        const mintingController = await this.artifacts.MintingController
          .attach(MintingController.address)
          .connect(cnsDeployer);
        if (!(await mintingController.isMinter(MintingManager.address))) {
          await mintingController.addMinter(MintingManager.address);
        }

        const uriPrefixController = await this.artifacts.URIPrefixController
          .attach(URIPrefixController.address)
          .connect(cnsDeployer);
        if (!(await uriPrefixController.isWhitelisted(MintingManager.address))) {
          await uriPrefixController.addWhitelisted(MintingManager.address);
        }
      },
      ensureDependencies: (config) => {
        config = merge(this._getNetworkConfig(), config);

        const {
          MintingController,
          URIPrefixController,
          MintingManager,
        } = config.contracts || {};
        const deps = {
          MintingController,
          URIPrefixController,
          MintingManager,
        };

        for (const [key, value] of Object.entries(deps)) {
          if (!value || !value.address) {
            throw new Error(`${key} contract not found for network ${network.config.chainId}`);
          }
        };

        return deps;
      },
    };
  }

  _upgradeUNSTask () {
    return {
      tags: ['upgrade'],
      run: async (dependencies) => {
        const {
          UNSRegistry,
          MintingManager,
        } = dependencies;

        const unsRegistry = await upgrades.upgradeProxy(UNSRegistry.address, this.artifacts.UNSRegistry);
        const mintingManager = await upgrades.upgradeProxy(MintingManager.address, this.artifacts.MintingManager);

        const proxyAdmin = await upgrades.admin.getInstance();
        await this._saveContractConfig('ProxyAdmin', proxyAdmin);

        const unsRegistryImpl = await proxyAdmin.callStatic.getProxyImplementation(unsRegistry.address);
        await this._saveContractConfig('UNSRegistry', unsRegistry, unsRegistryImpl);

        const mintingManagerImpl = await proxyAdmin.callStatic.getProxyImplementation(mintingManager.address);
        await this._saveContractConfig('MintingManager', mintingManager, mintingManagerImpl);
      },
      ensureDependencies: (config) => {
        config = merge(this._getNetworkConfig(), config);

        const { UNSRegistry, MintingManager, ProxyAdmin } = config.contracts || {};
        if (!ProxyAdmin || !ProxyAdmin.address) {
          throw new Error('Current network configuration does not support upgrading');
        }

        const deps = { UNSRegistry, MintingManager };
        for (const [key, value] of Object.entries(deps)) {
          if (!value || !value.address) {
            throw new Error(`${key} contract not found for network ${network.config.chainId}`);
          }
        };

        return deps;
      },
    };
  }

  _getNetworkConfig () {
    const configPath = path.resolve(this.options.basePath, `${this.network.chainId}.json`);
    const file = fs.existsSync(configPath) ? fs.readFileSync(configPath) : '{}';
    return JSON.parse(file.length ? file : '{}');
  }

  async _saveContractConfig (name, contract, implAddress) {
    const config = this._getNetworkConfig();

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
