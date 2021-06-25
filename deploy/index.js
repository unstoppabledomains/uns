const { ethers, upgrades, network, config: hhConfig } = require('hardhat');

async function deploy (opts) {
  opts = {
    artifacts: await _getArtifacts(),
    ...opts || {},
  };

  const cnsConfig = await deployCNS(opts);
  const unsConfig = await deployUNS(opts, cnsConfig);
  console.log('UNS', JSON.stringify(unsConfig));
  return unsConfig;
}

async function snapshot() {
  return await network.provider.request({
    method: 'evm_snapshot',
    params: [],
  });
}

async function revert(snapshotId) {
  return await network.provider.request({
    method: 'evm_revert',
    params: [snapshotId],
  });
}

async function deployCNS (opts) {
  const { CNSRegistry, SignatureController, MintingController, URIPrefixController, Resolver } = opts.artifacts;
  const [, cnsAdmin] = await ethers.getSigners();

  const registry = await CNSRegistry.connect(cnsAdmin).deploy();
  const signatureController = await SignatureController.connect(cnsAdmin).deploy(registry.address);
  const mintingController = await MintingController.connect(cnsAdmin).deploy(registry.address);
  const uriPrefixController = await URIPrefixController.connect(cnsAdmin).deploy(registry.address);

  await registry.connect(cnsAdmin).addController(signatureController.address);
  await registry.connect(cnsAdmin).addController(mintingController.address);
  await registry.connect(cnsAdmin).addController(uriPrefixController.address);

  const resolver = await Resolver.connect(cnsAdmin).deploy(registry.address, mintingController.address);

  return {
    networks: {
      [network.config.chainId]: {
        contracts: {
          CNSRegistry: { address: registry.address },
          SignatureController: { address: signatureController.address },
          MintingController: { address: mintingController.address },
          URIPrefixController: { address: uriPrefixController.address },
          Resolver: { address: resolver.address },
        },
      },
    },
  };
}

async function deployUNS (opts, config) {
  config = config || {};
  const _unsConfig = hhConfig.uns;

  const { UNSRegistry, MintingManager, ProxyReader, TwitterValidationOperator } = opts.artifacts;
  const _config = config.networks[network.config.chainId];
  if (!_config) {
    throw new Error(`Config not found for network ${network.config.chainId}`);
  }

  const { contracts } = _config;
  const [deployer] = await ethers.getSigners();

  let unsRegistry, mintingManager, unsRegistryImpl, mintingManagerImpl, proxyAdmin;
  if (opts.proxy) {
    unsRegistry = await upgrades.deployProxy(UNSRegistry, [], { initializer: false });
    mintingManager = await upgrades.deployProxy(MintingManager, [], { initializer: false });

    proxyAdmin = await upgrades.admin.getInstance();
    unsRegistryImpl = await proxyAdmin.callStatic.getProxyImplementation(unsRegistry.address);
    mintingManagerImpl = await proxyAdmin.callStatic.getProxyImplementation(mintingManager.address);
  } else {
    unsRegistry = await UNSRegistry.deploy();
    mintingManager = await MintingManager.deploy();
  }

  const registryInitTx = await unsRegistry.initialize(mintingManager.address);
  await registryInitTx.wait();

  const mintingManagerInitTx = await mintingManager.initialize(
    unsRegistry.address,
    contracts.MintingController.address,
    contracts.URIPrefixController.address,
    contracts.Resolver.address,
  );
  await mintingManagerInitTx.wait();

  const minters = _unsConfig.minters[network.name];
  if (minters.length) {
    await mintingManager.addMinters(minters);
  }

  const proxyReader = await ProxyReader.deploy(unsRegistry.address, contracts.CNSRegistry.address);

  let operator;
  const linkToken = _unsConfig.linkToken[network.name];
  if (linkToken.length) {
    operator = await TwitterValidationOperator.deploy(
      unsRegistry.address,
      contracts.CNSRegistry.address,
      linkToken,
      [deployer.address],
    );
  }

  const newConfig = {
    networks: {
      [network.config.chainId]: {
        contracts: {
          ...config.networks[network.config.chainId].contracts,
          UNSRegistry: {
            address: unsRegistry.address,
            implementation: unsRegistryImpl,
          },
          MintingManager: {
            address: mintingManager.address,
            implementation: mintingManagerImpl,
          },
          ProxyAdmin: { address: proxyAdmin && proxyAdmin.address },
          ProxyReader: { address: proxyReader.address },
          TwitterValidationOperator: { address: operator && operator.address },
        },
      },
    },
  };

  await _configCNS(opts, newConfig);
  return newConfig;
}

async function upgrade (opts, config) {
  opts = {
    artifacts: await _getArtifacts(),
    ...opts || {},
  };
  config = config || {};

  const { UNSRegistry, MintingManager } = opts.artifacts;
  const _config = config.networks[network.config.chainId];
  if (!_config) {
    throw new Error(`Config not found for network ${network.config.chainId}`);
  }

  const { contracts } = _config;
  if (!contracts.ProxyAdmin || !contracts.ProxyAdmin.address) {
    throw new Error('Current network configuration does not have ProxyAdmin');
  }

  const unsRegistry = await upgrades.upgradeProxy(contracts.UNSRegistry.address, UNSRegistry);
  const mintingManager = await upgrades.upgradeProxy(contracts.MintingManager.address, MintingManager);

  const proxyAdmin = await upgrades.admin.getInstance();
  const unsRegistryImpl = await proxyAdmin.callStatic.getProxyImplementation(unsRegistry.address);
  const mintingManagerImpl = await proxyAdmin.callStatic.getProxyImplementation(mintingManager.address);

  return {
    networks: {
      [network.config.chainId]: {
        contracts: {
          ...config.networks[network.config.chainId].contracts,
          UNSRegistry: {
            address: unsRegistry.address,
            implementation: unsRegistryImpl,
          },
          MintingManager: {
            address: mintingManager.address,
            implementation: mintingManagerImpl,
          },
        },
      },
    },
  };
}

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

async function _configCNS (opts, config) {
  const { MintingController, URIPrefixController } = opts.artifacts;
  const _config = config.networks[network.config.chainId];
  if (!_config) {
    throw new Error(`Config not found for network ${network.config.chainId}`);
  }

  const { contracts } = _config;
  const [, cnsAdmin] = await ethers.getSigners();

  const mintingController = await MintingController
    .attach(contracts.MintingController.address)
    .connect(cnsAdmin);
  if (!(await mintingController.isMinter(contracts.MintingManager.address))) {
    await mintingController.addMinter(contracts.MintingManager.address);
  }

  const uriPrefixController = await URIPrefixController
    .attach(contracts.URIPrefixController.address)
    .connect(cnsAdmin);
  if (!(await uriPrefixController.isWhitelisted(contracts.MintingManager.address))) {
    await uriPrefixController.addWhitelisted(contracts.MintingManager.address);
  }
}

module.exports = {
  deploy,
  upgrade,
  snapshot,
  revert
};
