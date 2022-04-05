const { network } = require('hardhat');
const merge = require('lodash.merge');

const verify = require('./verify');

const deployResolverForwarderTaskV03 = {
  tags: ['upgrade_v03'],
  priority: 110,
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

const deployProxyReaderTaskV03 = {
  tags: ['upgrade_v03'],
  priority: 110,
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

module.exports = [
  deployResolverForwarderTaskV03,
  deployProxyReaderTaskV03,
];
