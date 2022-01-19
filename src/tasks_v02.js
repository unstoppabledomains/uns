const { network } = require('hardhat');
const merge = require('lodash.merge');

const verify = require('./verify');

const deployResolverForwarderTaskV02 = {
  tags: ['upgrade_v02_l1'],
  priority: 90,
  run: async (ctx, dependencies) => {
    const { owner } = ctx.accounts;
    const { CNSRegistry, Resolver } = dependencies;

    console.log('## Deploying ResolverForwarder');
    const resolverForwarder = await ctx.artifacts.ResolverForwarder
      .connect(owner)
      .deploy(CNSRegistry.address, Resolver.address);
    await ctx.saveForwarderConfig('Resolver', resolverForwarder);
    await resolverForwarder.deployTransaction.wait();
    await verify(ctx, resolverForwarder.address, [CNSRegistry.address, Resolver.address]);
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const { CNSRegistry, Resolver } = config.contracts || {};
    const dependencies = { CNSRegistry, Resolver };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    };

    return dependencies;
  },
};

const deployProxyReaderTaskV02 = {
  tags: ['upgrade_v02_l1', 'upgrade_v02_l2'],
  priority: 90,
  run: async (ctx, dependencies) => {
    const { owner } = ctx.accounts;
    const { CNSRegistry, UNSRegistry } = dependencies;

    console.log('## Deploying ProxyReader');
    const proxyReader = await ctx.artifacts.ProxyReader
      .connect(owner)
      .deploy(UNSRegistry.address, CNSRegistry.address);
    await ctx.saveContractConfig('ProxyReader', proxyReader);
    await proxyReader.deployTransaction.wait();
    await verify(ctx, proxyReader.address, [UNSRegistry.address, CNSRegistry.address]);
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const { UNSRegistry, CNSRegistry } = config.contracts || {};
    const dependencies = { UNSRegistry, CNSRegistry };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    };

    return dependencies;
  },
};

const postUpgradeL1RegistryTaskV02 = {
  tags: ['upgrade_v02_l1'],
  priority: 110,
  run: async (ctx, { CNSRegistry, UNSRegistry }) => {
    if (![1, 5, 31337].includes(network.config.chainId)) {
      throw new Error(`Not supported cainId: ${network.config.chainId}`);
    }

    const { owner } = ctx.accounts;
    const unsRegistry = await ctx.artifacts.UNSRegistry
      .attach(UNSRegistry.address)
      .connect(owner);

    console.log('### setCNSRegistry', CNSRegistry.address);
    await unsRegistry.setCNSRegistry(CNSRegistry.address);

    let manager = '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74'; // Goerli RootChainManagerProxy
    if (network.config.chainId === 1) {
      manager = '0xA0c68C638235ee32657e8f720a23ceC1bFc77C77'; // Ethereum RootChainManagerProxy
    }
    console.log('### setRootChainManager', manager);
    await unsRegistry.setRootChainManager(manager);
  },
  ensureDependencies: (ctx, config) => {
    config = merge(ctx.getDeployConfig(), config);

    const { UNSRegistry, CNSRegistry } = config.contracts || {};
    const dependencies = { UNSRegistry, CNSRegistry };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    };

    return dependencies;
  },
};

const postUpgradeL2RegistryTaskV02 = {
  tags: ['upgrade_v02_l2'],
  priority: 110,
  run: async (ctx, { UNSRegistry }) => {
    if (![137, 31337, 80001].includes(network.config.chainId)) {
      throw new Error(`Not supported cainId: ${network.config.chainId}`);
    }

    const { owner } = ctx.accounts;
    const unsRegistry = await ctx.artifacts.UNSRegistry
      .attach(UNSRegistry.address)
      .connect(owner);

    let manager = '0xb5505a6d998549090530911180f38aC5130101c6'; // Mumbai ChildChainManagerProxy
    if (network.config.chainId === 137) {
      manager = '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa'; // Polygon ChildChainManagerProxy
    }
    console.log('### setChildChainManager', manager);
    await unsRegistry.setChildChainManager(manager);
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

module.exports = [
  deployResolverForwarderTaskV02,
  deployProxyReaderTaskV02,
  // postUpgradeL1RegistryTaskV02,
  // postUpgradeL2RegistryTaskV02,
];
