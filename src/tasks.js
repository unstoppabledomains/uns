const { network, upgrades, ethers } = require('hardhat');
const merge = require('lodash.merge');

const { ZERO_ADDRESS } = require('../test/helpers/constants');
const verify = require('./verify');

const { utils, BigNumber } = ethers;

const deployCNSTask = {
  tags: ['cns', 'full'],
  priority: 0,
  run: async (ctx) => {
    const { owner } = ctx.accounts;
    const {
      CNSRegistry,
      SignatureController,
      MintingController,
      URIPrefixController,
      Resolver,
    } = ctx.artifacts;

    // CNS registry
    const cnsRegistry = await CNSRegistry.connect(owner).deploy();
    await ctx.saveContractConfig('CNSRegistry', cnsRegistry);
    await cnsRegistry.deployTransaction.wait();
    await verify(ctx, cnsRegistry.address, []);

    // CNS Controllers
    const signatureController = await SignatureController.connect(owner).deploy(cnsRegistry.address);
    await ctx.saveContractConfig('SignatureController', signatureController);
    await signatureController.deployTransaction.wait();
    await verify(ctx, signatureController.address, [cnsRegistry.address]);

    const mintingController = await MintingController.connect(owner).deploy(cnsRegistry.address);
    await ctx.saveContractConfig('MintingController', mintingController);
    await mintingController.deployTransaction.wait();
    await verify(ctx, mintingController.address, [cnsRegistry.address]);

    const uriPrefixController = await URIPrefixController.connect(owner).deploy(cnsRegistry.address);
    await ctx.saveContractConfig('URIPrefixController', uriPrefixController);
    await uriPrefixController.deployTransaction.wait();
    await verify(ctx, uriPrefixController.address, [cnsRegistry.address]);

    // Configuration
    await cnsRegistry.connect(owner).addController(signatureController.address);
    await cnsRegistry.connect(owner).addController(mintingController.address);
    await cnsRegistry.connect(owner).addController(uriPrefixController.address);

    // CNS Resolver
    const resolver = await Resolver
      .connect(owner)
      .deploy(cnsRegistry.address, mintingController.address);
    await ctx.saveContractConfig('Resolver', resolver);
    await resolver.deployTransaction.wait();
    await verify(ctx, resolver.address, [cnsRegistry.address, mintingController.address]);

    // Stub unsupported contracts
    await ctx.saveContractConfig('WhitelistedMinter', {
      address: '0x0000000000000000000000000000000000000000',
    });
    await ctx.saveContractConfig('DomainZoneController', {
      address: '0x0000000000000000000000000000000000000000',
    });
    await ctx.saveContractConfig('TwitterValidationOperator', {
      address: '0x0000000000000000000000000000000000000000',
    });
    await ctx.saveContractConfig('FreeMinter', {
      address: '0x0000000000000000000000000000000000000000',
    });
  },
  ensureDependencies: () => {

  },
};

const deployCNSForwardersTask = {
  tags: ['cns_forwarders', 'full'],
  priority: 5,
  run: async (ctx, dependencies) => {
    const { owner } = ctx.accounts;
    const { CNSRegistry, SignatureController, Resolver } = dependencies;

    const cnsRegistryForwarder = await ctx.artifacts.CNSRegistryForwarder
      .connect(owner)
      .deploy(SignatureController.address);
    await ctx.saveForwarderConfig('CNSRegistry', cnsRegistryForwarder);
    await cnsRegistryForwarder.deployTransaction.wait();
    await verify(ctx, cnsRegistryForwarder.address, [SignatureController.address]);

    const resolverForwarder = await ctx.artifacts.ResolverForwarder
      .connect(owner)
      .deploy(CNSRegistry.address, Resolver.address);
    await ctx.saveForwarderConfig('Resolver', resolverForwarder);
    await resolverForwarder.deployTransaction.wait();
    await verify(ctx, resolverForwarder.address, [CNSRegistry.address, Resolver.address]);
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const {
      CNSRegistry,
      SignatureController,
      Resolver,
    } = config.contracts || {};
    const dependencies = {
      CNSRegistry,
      SignatureController,
      Resolver,
    };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    };

    return dependencies;
  },
};

const deployUNSTask = {
  tags: ['uns', 'full'],
  priority: 10,
  run: async (ctx, dependencies) => {
    const { owner } = ctx.accounts;
    const {
      MintingController,
      URIPrefixController,
      Resolver,
    } = dependencies;

    let unsRegistry, mintingManager, unsRegistryImpl, mintingManagerImpl, proxyAdmin;
    if (ctx.options.proxy) {
      unsRegistry = await upgrades.deployProxy(
        ctx.artifacts.UNSRegistry.connect(owner), [], { initializer: false });
      await unsRegistry.deployTransaction.wait();

      mintingManager = await upgrades.deployProxy(
        ctx.artifacts.MintingManager.connect(owner), [], { initializer: false });
      await mintingManager.deployTransaction.wait();

      proxyAdmin = await upgrades.admin.getInstance();
      await ctx.saveContractConfig('ProxyAdmin', proxyAdmin);

      unsRegistryImpl = await proxyAdmin.callStatic.getProxyImplementation(unsRegistry.address);
      await ctx.saveContractConfig('UNSRegistry', unsRegistry, unsRegistryImpl, unsRegistry);
      await verify(ctx, unsRegistryImpl, []);

      mintingManagerImpl = await proxyAdmin.callStatic.getProxyImplementation(mintingManager.address);
      await ctx.saveContractConfig('MintingManager', mintingManager, mintingManagerImpl);
      await verify(ctx, mintingManagerImpl, []);
    } else {
      unsRegistry = await ctx.artifacts.UNSRegistry.connect(owner).deploy();
      await ctx.saveContractConfig('UNSRegistry', unsRegistry);
      await unsRegistry.deployTransaction.wait();
      await verify(ctx, unsRegistry.address, []);

      mintingManager = await ctx.artifacts.MintingManager.connect(owner).deploy();
      await ctx.saveContractConfig('MintingManager', mintingManager);
      await mintingManager.deployTransaction.wait();
      await verify(ctx, mintingManager.address, []);
    }

    const registryInitTx = await unsRegistry.connect(owner).initialize(mintingManager.address);
    await registryInitTx.wait();

    const forwarder = await ctx.artifacts.MintingManagerForwarder
      .connect(owner)
      .deploy(mintingManager.address);
    await ctx.saveForwarderConfig('MintingManager', forwarder);
    await forwarder.deployTransaction.wait();
    await verify(ctx, forwarder.address, [mintingManager.address]);

    const mintingManagerInitTx = await mintingManager.connect(owner).initialize(
      unsRegistry.address,
      MintingController.address,
      URIPrefixController.address,
      Resolver.address,
      forwarder.address,
    );
    await mintingManagerInitTx.wait();

    if (ctx.minters.length) {
      const chunkSize = 100;
      for (let i = 0, j = ctx.minters.length; i < j; i += chunkSize) {
        const array = ctx.minters.slice(i, i + chunkSize);

        ctx.log('Adding minters...', array);
        const addMintersTx = await mintingManager.connect(owner).addMinters(array);
        await addMintersTx.wait();
        ctx.log(`Added ${array.length} minters`);
      }
    }
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const {
      CNSRegistry,
      MintingController,
      URIPrefixController,
      Resolver,
    } = config.contracts || {};
    const dependencies = {
      CNSRegistry,
      MintingController,
      URIPrefixController,
      Resolver,
    };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    };

    return dependencies;
  },
};

const deployUNSProxyReaderTask = {
  tags: ['uns', 'uns_proxy_reader', 'full'],
  priority: 15,
  run: async (ctx, dependencies) => {
    const { owner } = ctx.accounts;
    const {
      CNSRegistry,
      UNSRegistry,
      MintingManager,
    } = dependencies;

    const proxyReader = await ctx.artifacts.ProxyReader
      .connect(owner)
      .deploy(UNSRegistry.address, CNSRegistry.address);
    await ctx.saveContractConfig('ProxyReader', proxyReader);
    await proxyReader.deployTransaction.wait();
    await verify(ctx, proxyReader.address, [UNSRegistry.address, CNSRegistry.address]);

    const mintingManager = ctx.artifacts.MintingManager.attach(MintingManager.address);

    await mintingManager.connect(owner).addProxyReaders([proxyReader.address]);
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const {
      CNSRegistry,
      UNSRegistry,
      MintingManager,
    } = config.contracts || {};
    const dependencies = {
      CNSRegistry,
      UNSRegistry,
      MintingManager,
    };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    };

    return dependencies;
  },
};

const configureCNSTask = {
  tags: ['uns_config_cns', 'full'],
  priority: 20,
  run: async (ctx, {
    CNSRegistry,
    MintingController,
    URIPrefixController,
    UNSRegistry,
    MintingManager,
  }) => {
    const { owner } = ctx.accounts;

    const mintingController = await ctx.artifacts.MintingController
      .attach(MintingController.address)
      .connect(owner);
    if (!(await mintingController.isMinter(MintingManager.address))) {
      await mintingController.addMinter(MintingManager.address);
    }

    const uriPrefixController = await ctx.artifacts.URIPrefixController
      .attach(URIPrefixController.address)
      .connect(owner);
    if (!(await uriPrefixController.isWhitelisted(MintingManager.address))) {
      await uriPrefixController.addWhitelisted(MintingManager.address);
    }

    const unsRegistry = await ctx.artifacts.UNSRegistry
      .attach(UNSRegistry.address)
      .connect(owner);
    await unsRegistry.setCNSRegistry(CNSRegistry.address);

    // Set tokenURI prefix only for Sandbox
    if (network.config.chainId === 1337) {
      const mintingManager = await ctx.artifacts.MintingManager
        .attach(MintingManager.address)
        .connect(owner);
      await mintingManager.setTokenURIPrefix('https://example.com/');
    }
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const {
      CNSRegistry,
      MintingController,
      URIPrefixController,
      UNSRegistry,
      MintingManager,
    } = config.contracts || {};
    const dependencies = {
      CNSRegistry,
      MintingController,
      URIPrefixController,
      UNSRegistry,
      MintingManager,
    };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    };

    return dependencies;
  },
};

const deployMMForwarderTask = {
  tags: ['uns_mm_forwarder'],
  priority: 100,
  run: async (ctx, { MintingManager }) => {
    const { owner } = ctx.accounts;

    const forwarder = await ctx.artifacts.MintingManagerForwarder
      .connect(owner)
      .deploy(MintingManager.address);

    const mintingManager = await ctx.artifacts.MintingManager
      .attach(MintingManager.address)
      .connect(owner);
    await mintingManager.setForwarder(forwarder.address);
    await ctx.saveForwarderConfig('MintingManager', forwarder);
    await forwarder.deployTransaction.wait();
    await verify(ctx, forwarder.address, [MintingManager.address]);
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const { MintingManager } = config.contracts || {};
    const dependencies = { MintingManager };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    };

    return dependencies;
  },
};

const upgradeUNSRegistryTask = {
  tags: ['upgrade_registry'],
  priority: 100,
  run: async (ctx, { UNSRegistry }) => {
    const unsRegistry = await upgrades.upgradeProxy(
      UNSRegistry.address,
      ctx.artifacts.UNSRegistry,
    );
    await unsRegistry.deployTransaction.wait();

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig('ProxyAdmin', proxyAdmin);

    const unsRegistryImpl = await proxyAdmin.callStatic.getProxyImplementation(unsRegistry.address);
    await ctx.saveContractConfig('UNSRegistry', unsRegistry, unsRegistryImpl, unsRegistry);
    await verify(ctx, unsRegistryImpl, []);
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const { UNSRegistry, ProxyAdmin } = config.contracts || {};
    if (!ProxyAdmin || !ProxyAdmin.address) {
      throw new Error('Current network configuration does not support upgrading');
    }

    const dependencies = { UNSRegistry };
    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    };

    return dependencies;
  },
};

const upgradeMintingManagerTask = {
  tags: ['upgrade_minting_manager'],
  priority: 100,
  run: async (ctx, { MintingManager }) => {
    const mintingManager = await upgrades.upgradeProxy(
      MintingManager.address,
      ctx.artifacts.MintingManager,
      { unsafeAllowRenames: true },
    );
    await mintingManager.deployTransaction.wait();

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig('ProxyAdmin', proxyAdmin);

    const mintingManagerImpl = await proxyAdmin.callStatic.getProxyImplementation(mintingManager.address);
    await ctx.saveContractConfig('MintingManager', mintingManager, mintingManagerImpl);
    await verify(ctx, mintingManagerImpl, []);
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const { MintingManager, ProxyAdmin } = config.contracts || {};
    if (!ProxyAdmin || !ProxyAdmin.address) {
      throw new Error('Current network configuration does not support upgrading');
    }

    const dependencies = { MintingManager };
    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    };

    return dependencies;
  },
};

/**
 * The task configure CNS domain migration to UNS.
 * It is required for post-upgrade configuration.
 */
const configureCnsMigrationTask = {
  tags: ['uns_config_cns_migration'],
  priority: 100,
  run: async (ctx, {
    CNSRegistry,
    UNSRegistry,
  }) => {
    const { owner } = ctx.accounts;

    const unsRegistry = await ctx.artifacts.UNSRegistry
      .attach(UNSRegistry.address)
      .connect(owner);

    await unsRegistry.setCNSRegistry(CNSRegistry.address);
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const {
      CNSRegistry,
      UNSRegistry,
    } = config.contracts || {};
    const dependencies = {
      CNSRegistry,
      UNSRegistry,
    };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    };

    return dependencies;
  },
};

/**
 * The task deploys Polygon POS Bridge contracts.
 * It is required for emulation of Bridge for test environments.
 */
const deployPolygonPosBridgeTask = {
  tags: ['deploy_polygon_pos_bridge'],
  priority: 120,
  run: async (ctx, { UNSRegistry }) => {
    const { owner } = ctx.accounts;

    const stateSender = await ctx.artifacts.DummyStateSender.connect(owner).deploy();
    const checkpointManager = await ctx.artifacts.CheckpointManager.connect(owner).deploy();

    // deploy Predicate
    const predicate = await ctx.artifacts.MintableERC721Predicate.connect(owner).deploy();
    await predicate.initialize(owner.address);
    await ctx.saveContractConfig('MintableERC721Predicate', predicate);

    // deploy RootChainManager
    const rootChainManager = await ctx.artifacts.RootChainManager.connect(owner).deploy();
    await rootChainManager.initialize(owner.address);
    await rootChainManager.setCheckpointManager(checkpointManager.address);
    await rootChainManager.setStateSender(stateSender.address);

    const tokenType = utils.keccak256(UNSRegistry.address);
    await rootChainManager.registerPredicate(tokenType, predicate.address);
    await rootChainManager.mapToken(
      UNSRegistry.address,
      ZERO_ADDRESS,
      tokenType,
    );
    await predicate.grantRole(await predicate.MANAGER_ROLE(), rootChainManager.address);
    await ctx.saveContractConfig('RootChainManager', rootChainManager);
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const { UNSRegistry } = config.contracts || {};
    const dependencies = { UNSRegistry };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    };

    return dependencies;
  },
};

const configurePolygonPosBridgeTask = {
  tags: ['uns_config_polygon_pos_bridge'],
  priority: 140,
  run: async (ctx, {
    UNSRegistry,
    RootChainManager,
  }) => {
    const { owner } = ctx.accounts;

    const unsRegistry = await ctx.artifacts.UNSRegistry
      .attach(UNSRegistry.address)
      .connect(owner);

    await unsRegistry.setRootChainManager(RootChainManager.address);
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const {
      UNSRegistry,
      RootChainManager,
    } = config.contracts || {};
    const dependencies = {
      UNSRegistry,
      RootChainManager,
    };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    };

    return dependencies;
  },
};

const configureDotCoinTask = {
  tags: ['temp_configure_dotcoin'],
  priority: 110,
  run: async (ctx, { MintingManager, ProxyReader }) => {
    const { owner } = ctx.accounts;

    const mintingManager = await ctx.artifacts.MintingManager.attach(
      MintingManager.address,
    ).connect(owner);

    // remove .coin tld
    const coinTld = BigNumber.from(
      '0x7674e7282552c15f203b9c4a6025aeaf28176ef7f5451b280f9bada3f8bc98e2',
    );
    await mintingManager.removeTld(coinTld);

    // add all proxy readers
    const proxyReaders = [ProxyReader.address, ...ProxyReader.legacyAddresses];
    console.log('ProxyReaders', proxyReaders);
    await mintingManager.addProxyReaders(proxyReaders);
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const { MintingManager, ProxyReader } = config.contracts || {};
    const dependencies = { MintingManager, ProxyReader };
    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(
          `${key} contract not found for network ${network.config.chainId}`,
        );
      }
    }

    return dependencies;
  },
};

const configureReconfigureTldL1Task = {
  tags: ['temp_reconfigure_tld_l1'],
  priority: 115,
  run: async (ctx, { MintingManager }) => {
    const { owner } = ctx.accounts;

    const mintingManager = await ctx.artifacts.MintingManager.attach(
      MintingManager.address,
    ).connect(owner);

    // Burn TLD tokens
    const tldTokens = [
      BigNumber.from('0x7674e7282552c15f203b9c4a6025aeaf28176ef7f5451b280f9bada3f8bc98e2'), // .coin
      BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f'), // .crypto
      BigNumber.from('0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230'), // .wallet
      BigNumber.from('0x241e7e2b7fd7333b3c0c049b326316b811af0c01cfc0c7a90b466fda3a70fc2d'), // .x
      BigNumber.from('0xb75cf4f3d8bc3deb317ed5216d898899d5cc6a783f65f6768eb9bcb89428670d'), // .nft
      BigNumber.from('0x4118ebbd893ecbb9f5d7a817c7d8039c1bd991b56ea243e2ae84d0a1b2c950a7'), // .blockchain
      BigNumber.from('0x042fb01c1e43fb4a32f85b41c821e17d2faeac58cfc5fb23f80bc00c940f85e3'), // .bitcoin
      BigNumber.from('0x5c828ec285c0bf152a30a325b3963661a80cb87641d60920344caf04d4a0f31e'), // .888
      BigNumber.from('0xb5f2bbf81da581299d4ff7af60560c0ac854196f5227328d2d0c2bb0df33e553'), // .dao
      BigNumber.from('0xd81bbfcee722494b885e891546eeac23d0eedcd44038d7a2f6ef9ec2f9e0d239'), // .zil
      BigNumber.from('0xed9ce6b49a0e2c56c57c86795b131bd6df792312183994c3cf3de1516cfe92d6'), // .polygon
      BigNumber.from('0x92bba949890cd44a226a8ce54135cf86538cd6c5ca0ccf41877102fd718cc8aa'), // .unstoppable
    ];
    await mintingManager.burnTLDL1(tldTokens);
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    if (network.config.chainId !== 1 && network.config.chainId !== 5) {
      throw new Error('Current network configuration does not support burning TLD');
    }

    const { MintingManager } = config.contracts || {};
    const dependencies = { MintingManager };
    if (MintingManager.address) {
      throw new Error(
        `MintingManager contract not found for network ${network.config.chainId}`,
      );
    }

    return dependencies;
  },
};

const configureReconfigureTldL2Task = {
  tags: ['temp_reconfigure_tld_l2'],
  priority: 120,
  run: async (ctx, { MintingManager }) => {
    const { owner } = ctx.accounts;

    const mintingManager = await ctx.artifacts.MintingManager.attach(
      MintingManager.address,
    ).connect(owner);

    // Transfer TLD tokens ownership to MintingManager
    const tldTokens = [
      BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f'), // .crypto
      BigNumber.from('0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230'), // .wallet
      BigNumber.from('0x241e7e2b7fd7333b3c0c049b326316b811af0c01cfc0c7a90b466fda3a70fc2d'), // .x
      BigNumber.from('0xb75cf4f3d8bc3deb317ed5216d898899d5cc6a783f65f6768eb9bcb89428670d'), // .nft
      BigNumber.from('0x4118ebbd893ecbb9f5d7a817c7d8039c1bd991b56ea243e2ae84d0a1b2c950a7'), // .blockchain
      BigNumber.from('0x042fb01c1e43fb4a32f85b41c821e17d2faeac58cfc5fb23f80bc00c940f85e3'), // .bitcoin
      BigNumber.from('0x5c828ec285c0bf152a30a325b3963661a80cb87641d60920344caf04d4a0f31e'), // .888
      BigNumber.from('0xb5f2bbf81da581299d4ff7af60560c0ac854196f5227328d2d0c2bb0df33e553'), // .dao
      BigNumber.from('0xd81bbfcee722494b885e891546eeac23d0eedcd44038d7a2f6ef9ec2f9e0d239'), // .zil
      BigNumber.from('0xed9ce6b49a0e2c56c57c86795b131bd6df792312183994c3cf3de1516cfe92d6'), // .polygon
      BigNumber.from('0x92bba949890cd44a226a8ce54135cf86538cd6c5ca0ccf41877102fd718cc8aa'), // .unstoppable
    ];
    await mintingManager.moveTLDOwnershipL2(tldTokens);
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    if (network.config.chainId !== 137 && network.config.chainId !== 80001) {
      throw new Error('Current network configuration does not support moving TLD ownership');
    }

    const { MintingManager } = config.contracts || {};
    const dependencies = { MintingManager };
    if (MintingManager.address) {
      throw new Error(
        `MintingManager contract not found for network ${network.config.chainId}`,
      );
    }

    return dependencies;
  },
};

module.exports = [
  deployCNSTask,
  deployCNSForwardersTask,
  deployUNSTask,
  deployUNSProxyReaderTask,
  configureCNSTask,
  deployMMForwarderTask,
  upgradeUNSRegistryTask,
  upgradeMintingManagerTask,
  configureCnsMigrationTask,
  deployPolygonPosBridgeTask,
  configurePolygonPosBridgeTask,
  configureDotCoinTask,
  configureReconfigureTldL1Task,
  configureReconfigureTldL2Task,
];
