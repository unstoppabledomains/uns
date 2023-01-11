import { network, upgrades, defender } from 'hardhat';
import { Contract, utils } from 'ethers';
import { merge } from 'lodash';
import { ZERO_ADDRESS } from '../test/helpers/constants';
import { Deployer } from './deployer';
import { ArtifactName, DependenciesMap, UnsContractName, UnsNetworkConfig } from './types';
import verify from './verify';
import { unwrap, unwrapDependencies } from './helpers';

export type Task = {
  tags: string[];
  priority: number;
  run: (ctx: Deployer, dependencies: DependenciesMap, params?: Record<string, string>) => Promise<void>;
  ensureDependencies: (ctx: Deployer, config?: UnsNetworkConfig) => DependenciesMap;
};

export const deployCNSTask: Task = {
  tags: ['cns', 'full'],
  priority: 0,
  run: async (ctx: Deployer) => {
    const { owner } = ctx.accounts;
    const { CNSRegistry, SignatureController, MintingController, URIPrefixController, Resolver } = ctx.artifacts;

    // CNS Registry
    const cnsRegistry = await CNSRegistry.connect(owner).deploy();
    await ctx.saveContractConfig(UnsContractName.CNSRegistry, cnsRegistry);
    await cnsRegistry.deployTransaction.wait();
    await verify(ctx, cnsRegistry.address, []);

    // CNS Controllers
    const signatureController = await SignatureController.connect(owner).deploy(cnsRegistry.address);
    await ctx.saveContractConfig(UnsContractName.SignatureController, signatureController);
    await signatureController.deployTransaction.wait();
    await verify(ctx, signatureController.address, [cnsRegistry.address]);

    const mintingController = await MintingController.connect(owner).deploy(cnsRegistry.address);
    await ctx.saveContractConfig(UnsContractName.MintingController, mintingController);
    await mintingController.deployTransaction.wait();
    await verify(ctx, mintingController.address, [cnsRegistry.address]);

    const uriPrefixController = await URIPrefixController.connect(owner).deploy(cnsRegistry.address);
    await ctx.saveContractConfig(UnsContractName.URIPrefixController, uriPrefixController);
    await uriPrefixController.deployTransaction.wait();
    await verify(ctx, uriPrefixController.address, [cnsRegistry.address]);

    // Configuration
    await cnsRegistry.connect(owner).addController(signatureController.address);
    await cnsRegistry.connect(owner).addController(mintingController.address);
    await cnsRegistry.connect(owner).addController(uriPrefixController.address);

    // CNS Resolver
    const resolver = await Resolver.connect(owner).deploy(cnsRegistry.address, mintingController.address);
    await ctx.saveContractConfig(UnsContractName.Resolver, resolver);
    await resolver.deployTransaction.wait();
    await verify(ctx, resolver.address, [cnsRegistry.address, mintingController.address]);

    // Stub unsupported contracts
    await ctx.saveContractConfig(UnsContractName.WhitelistedMinter, {
      address: '0x0000000000000000000000000000000000000000',
    } as Contract);
    await ctx.saveContractConfig(UnsContractName.DomainZoneController, {
      address: '0x0000000000000000000000000000000000000000',
    } as Contract);
    await ctx.saveContractConfig(UnsContractName.TwitterValidationOperator, {
      address: '0x0000000000000000000000000000000000000000',
    } as Contract);
    await ctx.saveContractConfig(UnsContractName.FreeMinter, {
      address: '0x0000000000000000000000000000000000000000',
    } as Contract);
  },
  ensureDependencies: () => ({}),
};

export const deployCNSForwardersTask: Task = {
  tags: ['cns_forwarders', 'full'],
  priority: 5,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const { owner } = ctx.accounts;

    const [CNSRegistry, SignatureController, Resolver] = unwrapDependencies(dependencies, [
      ArtifactName.CNSRegistry,
      ArtifactName.SignatureController,
      ArtifactName.Resolver,
    ]);

    const cnsRegistryForwarder = await ctx.artifacts.CNSRegistryForwarder.connect(owner).deploy(
      SignatureController.address,
    );
    await ctx.saveForwarderConfig(UnsContractName.CNSRegistry, cnsRegistryForwarder);
    await cnsRegistryForwarder.deployTransaction.wait();
    await verify(ctx, cnsRegistryForwarder.address, [SignatureController.address]);

    const resolverForwarder = await ctx.artifacts.ResolverForwarder.connect(owner).deploy(
      CNSRegistry.address,
      Resolver.address,
    );
    await ctx.saveForwarderConfig(UnsContractName.Resolver, resolverForwarder);
    await resolverForwarder.deployTransaction.wait();
    await verify(ctx, resolverForwarder.address, [CNSRegistry.address, Resolver.address]);
  },
  ensureDependencies: (ctx: Deployer, config?: UnsNetworkConfig): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { CNSRegistry, SignatureController, Resolver } = config.contracts;
    const dependencies = {
      CNSRegistry,
      SignatureController,
      Resolver,
    };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }

    return dependencies;
  },
};

const deployUNSTask = {
  tags: ['uns', 'full'],
  priority: 10,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const { owner } = ctx.accounts;
    const [CNSRegistry, MintingController, URIPrefixController, Resolver, RootChainManager] = unwrapDependencies(
      dependencies,
      [
        ArtifactName.CNSRegistry,
        ArtifactName.MintingController,
        ArtifactName.URIPrefixController,
        ArtifactName.Resolver,
        ArtifactName.RootChainManager,
      ],
    );

    let unsRegistry: Contract;
    let mintingManager: Contract;
    let proxyAdmin: Contract;
    let unsRegistryImpl: string;
    let mintingManagerImpl: string;

    if (ctx.options.proxy) {
      unsRegistry = await upgrades.deployProxy(ctx.artifacts.UNSRegistry.connect(owner), [], { initializer: false });
      await unsRegistry.deployTransaction.wait();

      mintingManager = await upgrades.deployProxy(ctx.artifacts.MintingManager.connect(owner), [], {
        initializer: false,
      });
      await mintingManager.deployTransaction.wait();

      proxyAdmin = await upgrades.admin.getInstance();
      await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

      unsRegistryImpl = await proxyAdmin.callStatic.getProxyImplementation(unsRegistry.address);
      await ctx.saveContractConfig(UnsContractName.UNSRegistry, unsRegistry, unsRegistryImpl, unsRegistry);
      await verify(ctx, unsRegistryImpl, []);

      mintingManagerImpl = await proxyAdmin.callStatic.getProxyImplementation(mintingManager.address);
      await ctx.saveContractConfig(UnsContractName.MintingManager, mintingManager, mintingManagerImpl);
      await verify(ctx, mintingManagerImpl, []);
    } else {
      unsRegistry = await ctx.artifacts.UNSRegistry.connect(owner).deploy();
      await ctx.saveContractConfig(UnsContractName.UNSRegistry, unsRegistry);
      await unsRegistry.deployTransaction.wait();
      await verify(ctx, unsRegistry.address, []);

      mintingManager = await ctx.artifacts.MintingManager.connect(owner).deploy();
      await ctx.saveContractConfig(UnsContractName.MintingManager, mintingManager);
      await mintingManager.deployTransaction.wait();
      await verify(ctx, mintingManager.address, []);
    }

    const registryInitTx = await unsRegistry
      .connect(owner)
      .initialize(mintingManager.address, CNSRegistry.address, RootChainManager.address, ZERO_ADDRESS);
    await registryInitTx.wait();

    const forwarder = await ctx.artifacts.MintingManagerForwarder.connect(owner).deploy(mintingManager.address);
    await ctx.saveForwarderConfig(UnsContractName.MintingManager, forwarder);
    await forwarder.deployTransaction.wait();
    await verify(ctx, forwarder.address, [mintingManager.address]);

    const mintingManagerInitTx = await mintingManager
      .connect(owner)
      .initialize(
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
  ensureDependencies: (ctx: Deployer, config?: UnsNetworkConfig): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { CNSRegistry, MintingController, URIPrefixController, Resolver, RootChainManager } = config.contracts || {};

    const dependencies = {
      CNSRegistry,
      RootChainManager,
      MintingController,
      URIPrefixController,
      Resolver,
    };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }

    return dependencies;
  },
};

const deployUNSProxyReaderTask: Task = {
  tags: ['uns', 'uns_proxy_reader', 'full'],
  priority: 15,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const { owner } = ctx.accounts;

    const [UNSRegistry, CNSRegistry, MintingManager] = unwrapDependencies(dependencies, [
      ArtifactName.UNSRegistry,
      ArtifactName.CNSRegistry,
      ArtifactName.MintingManager,
    ]);

    const proxyReader = await upgrades.deployProxy(
      ctx.artifacts.ProxyReader.connect(owner),
      [UNSRegistry.address, CNSRegistry.address],
      { unsafeAllow: ['delegatecall'] },
    );
    await proxyReader.deployTransaction.wait();

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig(UnsContractName.ProxyReader, proxyAdmin);

    const proxyReaderImpl = await proxyAdmin.callStatic.getProxyImplementation(proxyReader.address);
    await ctx.saveContractConfig(UnsContractName.ProxyReader, proxyReader, proxyReaderImpl);
    await verify(ctx, proxyReaderImpl, []);

    const mintingManager = ctx.artifacts.MintingManager.attach(MintingManager.address);

    await mintingManager.connect(owner).addProxyReaders([proxyReader.address]);
  },
  ensureDependencies: (ctx: Deployer, config?: UnsNetworkConfig): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { CNSRegistry, UNSRegistry, MintingManager } = config.contracts || {};

    const dependencies = {
      CNSRegistry,
      UNSRegistry,
      MintingManager,
    };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }

    return dependencies;
  },
};

const configureCNSTask = {
  tags: ['uns_config_cns', 'full'],
  priority: 20,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const { owner } = ctx.accounts;

    const [MintingController, URIPrefixController, MintingManager] = unwrapDependencies(dependencies, [
      ArtifactName.MintingController,
      ArtifactName.URIPrefixController,
      ArtifactName.MintingManager,
    ]);

    const mintingController = ctx.artifacts.MintingController.attach(MintingController.address).connect(owner);

    if (!(await mintingController.isMinter(MintingManager.address))) {
      await mintingController.addMinter(MintingManager.address);
    }

    const uriPrefixController = ctx.artifacts.URIPrefixController.attach(URIPrefixController.address).connect(owner);

    if (!(await uriPrefixController.isWhitelisted(MintingManager.address))) {
      await uriPrefixController.addWhitelisted(MintingManager.address);
    }

    // Set tokenURI prefix only for Sandbox
    if (network.config.chainId === 1337) {
      const mintingManager = ctx.artifacts.MintingManager.attach(MintingManager.address).connect(owner);
      await mintingManager.setTokenURIPrefix('https://example.com/');
    }
  },
  ensureDependencies: (ctx: Deployer, config?: UnsNetworkConfig): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { MintingController, URIPrefixController, MintingManager } = config.contracts || {};
    const dependencies = {
      MintingController,
      URIPrefixController,
      MintingManager,
    };
    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }

    return dependencies;
  },
};

const deployMMForwarderTask = {
  tags: ['uns_mm_forwarder'],
  priority: 100,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const { owner } = ctx.accounts;
    const MintingManager = unwrap(dependencies, ArtifactName.MintingManager);

    const forwarder = await ctx.artifacts.MintingManagerForwarder.connect(owner).deploy(MintingManager.address);

    const mintingManager = ctx.artifacts.MintingManager.attach(MintingManager.address).connect(owner);

    await mintingManager.setForwarder(forwarder.address);
    await ctx.saveForwarderConfig(UnsContractName.MintingManager, forwarder);
    await forwarder.deployTransaction.wait();
    await verify(ctx, forwarder.address, [MintingManager.address]);
  },
  ensureDependencies: (ctx: Deployer, config?: UnsNetworkConfig): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { MintingManager } = config.contracts || {};
    const dependencies = { MintingManager };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }

    return dependencies;
  },
};

const upgradeUNSRegistryTask: Task = {
  tags: ['upgrade_registry'],
  priority: 100,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const UNSRegistry = unwrap(dependencies, ArtifactName.UNSRegistry);

    const unsRegistry = await upgrades.upgradeProxy(UNSRegistry.address, ctx.artifacts.UNSRegistry);
    await unsRegistry.deployTransaction.wait();

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

    const unsRegistryImpl = await proxyAdmin.callStatic.getProxyImplementation(unsRegistry.address);
    await ctx.saveContractConfig(UnsContractName.UNSRegistry, unsRegistry, unsRegistryImpl, unsRegistry);
    await verify(ctx, unsRegistryImpl, []);
  },
  ensureDependencies: (ctx: Deployer, config?: UnsNetworkConfig) => {
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
    }

    return dependencies;
  },
};

const upgradeMintingManagerTask: Task = {
  tags: ['upgrade_minting_manager'],
  priority: 100,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const MintingManager = unwrap(dependencies, ArtifactName.MintingManager);

    const mintingManager = await upgrades.upgradeProxy(MintingManager.address, ctx.artifacts.MintingManager);
    await mintingManager.deployTransaction.wait();

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

    const mintingManagerImpl = await proxyAdmin.callStatic.getProxyImplementation(mintingManager.address);
    await ctx.saveContractConfig(UnsContractName.MintingManager, mintingManager, mintingManagerImpl);
    await verify(ctx, mintingManagerImpl, []);
  },
  ensureDependencies: (ctx: Deployer, config?: UnsNetworkConfig) => {
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
    }

    return dependencies;
  },
};

const upgradeProxyReaderTask: Task = {
  tags: ['upgrade_proxy_reader'],
  priority: 105,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const ProxyReader = unwrap(dependencies, ArtifactName.ProxyReader);

    const proxyReader = await upgrades.upgradeProxy(ProxyReader.address, ctx.artifacts.ProxyReader, {
      unsafeAllow: ['delegatecall'],
    });
    await proxyReader.deployTransaction.wait();

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

    const proxyReaderImpl = await proxyAdmin.callStatic.getProxyImplementation(proxyReader.address);

    await ctx.saveContractConfig(UnsContractName.ProxyReader, proxyReader, proxyReaderImpl);
    await verify(ctx, proxyReaderImpl, []);
  },
  ensureDependencies: (ctx: Deployer, config?: UnsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    const { ProxyReader, ProxyAdmin } = config.contracts || {};
    if (!ProxyAdmin || !ProxyAdmin.address) {
      throw new Error('Current network configuration does not support upgrading');
    }

    const dependencies = { ProxyReader };
    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }

    return dependencies;
  },
};

const proposeUNSRegistryTask: Task = {
  tags: ['propose_registry'],
  priority: 110,
  run: async (ctx: Deployer, dependencies: DependenciesMap, params?: Record<string, string>) => {
    const UNSRegistry = unwrap(dependencies, ArtifactName.UNSRegistry);

    const version = params?.version;
    if (!version) {
      throw new Error('Version parameter is not provided');
    }

    ctx.log('Preparing proposal...');
    const proposal = await defender.proposeUpgrade(UNSRegistry.address, ctx.artifacts.UNSRegistry, {
      title: `Propose UNSRegistry to V${version}`,
      multisig: ctx.multisig,
    });
    ctx.log('Upgrade proposal created at:', proposal.url);
  },
  ensureDependencies: (ctx: Deployer, config?: UnsNetworkConfig) => {
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
    }

    return dependencies;
  },
};

const proposeMintingManagerTask: Task = {
  tags: ['propose_minting_manager'],
  priority: 110,
  run: async (ctx: Deployer, dependencies: DependenciesMap, params?: Record<string, string>) => {
    const MintingManager = unwrap(dependencies, ArtifactName.MintingManager);

    const version = params?.version;
    if (!version) {
      throw new Error('Version parameter is not provided');
    }

    ctx.log('Preparing proposal...');
    const proposal = await defender.proposeUpgrade(MintingManager.address, ctx.artifacts.MintingManager, {
      title: `Propose MintingManager to V${version}`,
      multisig: ctx.multisig,
    });
    // TODO: update config and vefiry implementation
    ctx.log('Proposal:', JSON.stringify(proposal));
    ctx.log('Upgrade proposal created at:', proposal.url);
  },
  ensureDependencies: (ctx: Deployer, config?: UnsNetworkConfig) => {
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
    }

    return dependencies;
  },
};

const proposeProxyReaderTask: Task = {
  tags: ['propose_proxy_reader'],
  priority: 110,
  run: async (ctx: Deployer, dependencies: DependenciesMap, params?: Record<string, string>) => {
    const ProxyReader = unwrap(dependencies, ArtifactName.ProxyReader);

    const version = params?.version;
    if (!version) {
      throw new Error('Version parameter is not provided');
    }

    ctx.log('Preparing proposal...');
    const proposal = await defender.proposeUpgrade(ProxyReader.address, ctx.artifacts.ProxyReader, {
      title: `Propose ProxyReader to V${version}`,
      multisig: ctx.multisig,
    });
    ctx.log('Upgrade proposal created at:', proposal.url);
  },
  ensureDependencies: (ctx: Deployer, config?: UnsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    const { ProxyReader, ProxyAdmin } = config.contracts || {};
    if (!ProxyAdmin || !ProxyAdmin.address) {
      throw new Error('Current network configuration does not support upgrading');
    }

    const dependencies = { ProxyReader };
    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }

    return dependencies;
  },
};

/**
 * The task deploys Polygon POS Bridge contracts.
 * It is required for emulation of Bridge for test environments.
 */
const deployPolygonPosBridgeTask: Task = {
  tags: ['polygon_pos_bridge', 'full'],
  priority: 6,
  run: async (ctx: Deployer) => {
    const { owner } = ctx.accounts;

    const stateSender = await ctx.artifacts.DummyStateSender.connect(owner).deploy();
    const checkpointManager = await ctx.artifacts[ArtifactName.CheckpointManager].connect(owner).deploy();

    // deploy Predicate
    const predicate = await ctx.artifacts.MintableERC721Predicate.connect(owner).deploy();
    await predicate.initialize(owner.address);
    await ctx.saveContractConfig(UnsContractName.MintableERC721Predicate, predicate);

    // deploy RootChainManager
    const rootChainManager = await ctx.artifacts.RootChainManager.connect(owner).deploy();
    await rootChainManager.initialize(owner.address);
    await rootChainManager.setCheckpointManager(checkpointManager.address);
    await rootChainManager.setStateSender(stateSender.address);
    await ctx.saveContractConfig(UnsContractName.RootChainManager, rootChainManager);
  },
  ensureDependencies: () => ({}),
};

const configurePolygonPosBridgeTask: Task = {
  tags: ['config_polygon_pos_bridge'],
  priority: 120,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const { owner } = ctx.accounts;

    const [UNSRegistry, MintableERC721Predicate, RootChainManager] = unwrapDependencies(dependencies, [
      ArtifactName.UNSRegistry,
      ArtifactName.MintableERC721Predicate,
      ArtifactName.RootChainManager,
    ]);

    const rootChainManager = ctx.artifacts.RootChainManager.attach(RootChainManager.address).connect(owner);

    const tokenType = utils.keccak256(UNSRegistry.address);
    await rootChainManager.registerPredicate(tokenType, MintableERC721Predicate.address);
    await rootChainManager.mapToken(UNSRegistry.address, UNSRegistry.address, tokenType);

    const predicate = ctx.artifacts.MintableERC721Predicate.attach(MintableERC721Predicate.address).connect(owner);
    await predicate.grantRole(await predicate.MANAGER_ROLE(), rootChainManager.address);
  },
  ensureDependencies: (ctx: Deployer, config?: UnsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    const { UNSRegistry, MintableERC721Predicate, RootChainManager } = config.contracts || {};
    const dependencies = {
      UNSRegistry,
      MintableERC721Predicate,
      RootChainManager,
    };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }

    return dependencies;
  },
};

const deployDotCoinBurnerTask: Task = {
  tags: ['dot_coin_burner', 'full'],
  priority: 200,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const { owner } = ctx.accounts;
    const UNSRegistry = unwrap(dependencies, ArtifactName.UNSRegistry);

    const dotCoinBurner = await ctx.artifacts.DotCoinBurner.connect(owner).deploy(UNSRegistry.address);
    await ctx.saveContractConfig(UnsContractName.DotCoinBurner, dotCoinBurner);
    await dotCoinBurner.deployTransaction.wait();
    await verify(ctx, dotCoinBurner.address, [UNSRegistry.address]);
  },
  ensureDependencies: (ctx: Deployer, config?: UnsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    const { UNSRegistry } = config.contracts || {};
    const dependencies = {
      UNSRegistry,
    };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }

    return dependencies;
  },
};

export const tasks: Task[] = [
  deployCNSTask,
  deployCNSForwardersTask,
  deployUNSTask,
  deployUNSProxyReaderTask,
  configureCNSTask,
  deployMMForwarderTask,
  upgradeUNSRegistryTask,
  upgradeMintingManagerTask,
  upgradeProxyReaderTask,
  proposeUNSRegistryTask,
  proposeMintingManagerTask,
  proposeProxyReaderTask,
  deployPolygonPosBridgeTask,
  configurePolygonPosBridgeTask,
  deployDotCoinBurnerTask,
];
