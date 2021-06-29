const { network, upgrades } = require('hardhat');
const merge = require('lodash.merge');

const deployCNSTask = {
  tags: ['cns', 'full'],
  run: async (ctx) => {
    const { cnsDeployer } = ctx.accounts;
    const {
      CNSRegistry,
      SignatureController,
      MintingController,
      URIPrefixController,
      WhitelistedMinter,
      Resolver,
    } = ctx.artifacts;

    // CNS registry
    const cnsRegistry = await CNSRegistry.connect(cnsDeployer).deploy();
    await ctx.saveContractConfig('CNSRegistry', cnsRegistry);

    // CNS Controllers
    const signatureController = await SignatureController.connect(cnsDeployer).deploy(cnsRegistry.address);
    await ctx.saveContractConfig('SignatureController', signatureController);

    const mintingController = await MintingController.connect(cnsDeployer).deploy(cnsRegistry.address);
    await ctx.saveContractConfig('MintingController', mintingController);

    const uriPrefixController = await URIPrefixController.connect(cnsDeployer).deploy(cnsRegistry.address);
    await ctx.saveContractConfig('URIPrefixController', uriPrefixController);

    // Configuration
    await cnsRegistry.connect(cnsDeployer).addController(signatureController.address);
    await cnsRegistry.connect(cnsDeployer).addController(mintingController.address);
    await cnsRegistry.connect(cnsDeployer).addController(uriPrefixController.address);

    const whitelistedMinter = await WhitelistedMinter
      .connect(cnsDeployer)
      .deploy(mintingController.address);
    await ctx.saveContractConfig('WhitelistedMinter', whitelistedMinter);

    await mintingController.connect(cnsDeployer).addMinter(whitelistedMinter.address);
    if (ctx.minters.length) {
      await whitelistedMinter.connect(cnsDeployer).bulkAddWhitelisted(ctx.minters);
    }

    // CNS Resolver
    const resolver = await Resolver
      .connect(cnsDeployer)
      .deploy(cnsRegistry.address, mintingController.address);
    await ctx.saveContractConfig('Resolver', resolver);

    // Stub unsupported contracts
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

const deployUNSTask = {
  tags: ['uns', 'full'],
  run: async (ctx, dependencies) => {
    const { unsDeployer } = ctx.accounts;
    const {
      CNSRegistry,
      MintingController,
      URIPrefixController,
      Resolver,
    } = dependencies;

    let unsRegistry, mintingManager, unsRegistryImpl, mintingManagerImpl, proxyAdmin;
    if (ctx.options.proxy) {
      unsRegistry = await upgrades.deployProxy(
        ctx.artifacts.UNSRegistry.connect(unsDeployer), [], { initializer: false });
      mintingManager = await upgrades.deployProxy(
        ctx.artifacts.MintingManager.connect(unsDeployer), [], { initializer: false });

      proxyAdmin = await upgrades.admin.getInstance();
      await ctx.saveContractConfig('ProxyAdmin', proxyAdmin);

      unsRegistryImpl = await proxyAdmin.callStatic.getProxyImplementation(unsRegistry.address);
      await ctx.saveContractConfig('UNSRegistry', unsRegistry, unsRegistryImpl);

      mintingManagerImpl = await proxyAdmin.callStatic.getProxyImplementation(mintingManager.address);
      await ctx.saveContractConfig('MintingManager', mintingManager, mintingManagerImpl);
    } else {
      unsRegistry = await ctx.artifacts.UNSRegistry.connect(unsDeployer).deploy();
      await ctx.saveContractConfig('UNSRegistry', unsRegistry);

      mintingManager = await ctx.artifacts.MintingManager.connect(unsDeployer).deploy();
      await ctx.saveContractConfig('MintingManager', mintingManager);
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

    if (ctx.minters.length) {
      await mintingManager.connect(unsDeployer).addMinters(ctx.minters);
    }

    const proxyReader = await ctx.artifacts.ProxyReader
      .connect(unsDeployer)
      .deploy(unsRegistry.address, CNSRegistry.address);
    await ctx.saveContractConfig('ProxyReader', proxyReader);

    if (ctx.linkToken.length) {
      const operator = await ctx.artifacts.TwitterValidationOperator
        .connect(unsDeployer)
        .deploy(
          unsRegistry.address,
          CNSRegistry.address,
          ctx.linkToken,
          [unsDeployer.address],
        );
      await ctx.saveContractConfig('TwitterValidationOperator', operator);
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

const configureCNSTask = {
  tags: ['uns', 'full'],
  run: async (ctx, { MintingController, URIPrefixController, MintingManager }) => {
    const { cnsDeployer } = ctx.accounts;

    const mintingController = await ctx.artifacts.MintingController
      .attach(MintingController.address)
      .connect(cnsDeployer);
    if (!(await mintingController.isMinter(MintingManager.address))) {
      await mintingController.addMinter(MintingManager.address);
    }

    const uriPrefixController = await ctx.artifacts.URIPrefixController
      .attach(URIPrefixController.address)
      .connect(cnsDeployer);
    if (!(await uriPrefixController.isWhitelisted(MintingManager.address))) {
      await uriPrefixController.addWhitelisted(MintingManager.address);
    }
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const {
      MintingController,
      URIPrefixController,
      MintingManager,
    } = config.contracts || {};
    const dependencies = {
      MintingController,
      URIPrefixController,
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

const upgradeUNSTask = {
  tags: ['upgrade'],
  run: async (ctx, { UNSRegistry, MintingManager }) => {
    const unsRegistry = await upgrades.upgradeProxy(UNSRegistry.address, ctx.artifacts.UNSRegistry);
    const mintingManager = await upgrades.upgradeProxy(MintingManager.address, ctx.artifacts.MintingManager);

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig('ProxyAdmin', proxyAdmin);

    const unsRegistryImpl = await proxyAdmin.callStatic.getProxyImplementation(unsRegistry.address);
    await ctx.saveContractConfig('UNSRegistry', unsRegistry, unsRegistryImpl);

    const mintingManagerImpl = await proxyAdmin.callStatic.getProxyImplementation(mintingManager.address);
    await ctx.saveContractConfig('MintingManager', mintingManager, mintingManagerImpl);
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const { UNSRegistry, MintingManager, ProxyAdmin } = config.contracts || {};
    if (!ProxyAdmin || !ProxyAdmin.address) {
      throw new Error('Current network configuration does not support upgrading');
    }

    const dependencies = { UNSRegistry, MintingManager };
    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    };

    return dependencies;
  },
};

module.exports = {
  deployCNSTask,
  deployUNSTask,
  configureCNSTask,
  upgradeUNSTask,
};
