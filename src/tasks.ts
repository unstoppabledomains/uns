import { defender, network, upgrades } from 'hardhat';
import { Contract, utils } from 'ethers';
import { merge } from 'lodash';
import { namehash } from 'ethers/lib/utils';
import { ZERO_ADDRESS, ZERO_WORD } from '../test/helpers/constants';
import { Deployer } from './deployer';
import {
  ArtifactName,
  DependenciesMap,
  EnsContractName,
  UnsContractName,
  NsNetworkConfig,
  ContractName,
} from './types';
import verify from './verify';
import { notNullSha, unwrap, unwrapDependencies } from './helpers';

export type Task = {
  tags: string[];
  priority: number;
  run: (ctx: Deployer, dependencies: DependenciesMap, params?: Record<string, string>) => Promise<void>;
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => DependenciesMap;
};

const isSandbox = network.config.chainId === 1337;

const ensureDeployed = (config: NsNetworkConfig, ...contracts: ContractName[]): DependenciesMap => {
  return contracts
    .map((name) => {
      const contract = config.contracts[name];
      if (!contract?.address) {
        throw new Error(`${name} contract not found for network ${network.config.chainId}`);
      }
      return { [name]: contract };
    })
    .reduce((a, b) => ({ ...a, ...b }));
};

const ensureUpgradable = (config: NsNetworkConfig): void => {
  if (!config.contracts.ProxyAdmin?.address) {
    throw new Error('Current network configuration does not support upgrading');
  }
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

  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    return ensureDeployed(
      config,
      UnsContractName.CNSRegistry,
      UnsContractName.SignatureController,
      UnsContractName.Resolver,
    );
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
    let unsOperator: Contract;
    let proxyAdmin: Contract;

    let unsRegistryImpl: string;
    let mintingManagerImpl: string;
    let unsOperatorImpl: string;

    if (ctx.options.proxy) {
      unsRegistry = await upgrades.deployProxy(ctx.artifacts.UNSRegistry.connect(owner), [], {
        initializer: false,
        unsafeAllow: ['delegatecall'],
      });
      await unsRegistry.deployTransaction.wait();

      mintingManager = await upgrades.deployProxy(ctx.artifacts.MintingManager.connect(owner), [], {
        initializer: false,
      });
      await mintingManager.deployTransaction.wait();

      unsOperator = await upgrades.deployProxy(ctx.artifacts.UNSOperator.connect(owner), []);
      await unsOperator.deployTransaction.wait();

      proxyAdmin = await upgrades.admin.getInstance();
      await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

      unsRegistryImpl = await proxyAdmin.callStatic.getProxyImplementation(unsRegistry.address);
      await ctx.saveContractConfig(UnsContractName.UNSRegistry, unsRegistry, unsRegistryImpl, unsRegistry);
      await verify(ctx, unsRegistryImpl, []);

      mintingManagerImpl = await proxyAdmin.callStatic.getProxyImplementation(mintingManager.address);
      await ctx.saveContractConfig(UnsContractName.MintingManager, mintingManager, mintingManagerImpl);
      await verify(ctx, mintingManagerImpl, []);

      unsOperatorImpl = await proxyAdmin.callStatic.getProxyImplementation(unsOperator.address);
      await ctx.saveContractConfig(UnsContractName.UNSOperator, unsOperator, unsOperatorImpl);
      await verify(ctx, unsOperatorImpl, []);
    } else {
      unsRegistry = await ctx.artifacts.UNSRegistry.connect(owner).deploy();
      await ctx.saveContractConfig(UnsContractName.UNSRegistry, unsRegistry);
      await unsRegistry.deployTransaction.wait();
      await verify(ctx, unsRegistry.address, []);

      mintingManager = await ctx.artifacts.MintingManager.connect(owner).deploy();
      await ctx.saveContractConfig(UnsContractName.MintingManager, mintingManager);
      await mintingManager.deployTransaction.wait();
      await verify(ctx, mintingManager.address, []);

      unsOperator = await ctx.artifacts.UNSOperator.connect(owner).deploy();
      await ctx.saveContractConfig(UnsContractName.UNSOperator, unsOperator);
      await unsOperator.deployTransaction.wait();
      await verify(ctx, unsOperator.address, []);
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
        unsOperator.address,
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

  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    return ensureDeployed(
      config,
      UnsContractName.CNSRegistry,
      UnsContractName.RootChainManager,
      UnsContractName.MintingController,
      UnsContractName.URIPrefixController,
      UnsContractName.Resolver,
    );
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
    await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

    const proxyReaderImpl = await proxyAdmin.callStatic.getProxyImplementation(proxyReader.address);
    await ctx.saveContractConfig(UnsContractName.ProxyReader, proxyReader, proxyReaderImpl);
    await verify(ctx, proxyReaderImpl, []);

    const mintingManager = ctx.artifacts.MintingManager.attach(MintingManager.address);

    await mintingManager.connect(owner).addProxyReaders([proxyReader.address]);
  },

  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    return ensureDeployed(
      config,
      UnsContractName.CNSRegistry,
      UnsContractName.UNSRegistry,
      UnsContractName.MintingManager,
    );
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
    if (isSandbox) {
      const mintingManager = ctx.artifacts.MintingManager.attach(MintingManager.address).connect(owner);
      await mintingManager.setTokenURIPrefix('https://example.com/');
    }
  },

  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    return ensureDeployed(
      config,
      UnsContractName.MintingController,
      UnsContractName.URIPrefixController,
      UnsContractName.MintingManager,
    );
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

  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    return ensureDeployed(config, UnsContractName.MintingManager);
  },
};

const deployUNSOperatorTask: Task = {
  tags: ['uns_operator'],
  priority: 100,
  run: async (ctx: Deployer) => {
    const { owner } = ctx.accounts;

    const unsOperator = await upgrades.deployProxy(ctx.artifacts.UNSOperator.connect(owner), []);
    await unsOperator.deployTransaction.wait();

    const proxyAdmin = await upgrades.admin.getInstance();

    const unsOperatorImpl = await proxyAdmin.callStatic.getProxyImplementation(unsOperator.address);
    await ctx.saveContractConfig(UnsContractName.UNSOperator, unsOperator, unsOperatorImpl);
    await verify(ctx, unsOperatorImpl, []);
  },

  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    ensureUpgradable(config);

    return {};
  },
};

const deployZilliqaRecoverTask: Task = {
  tags: ['zilliqa_recover', 'full'],
  priority: 100,

  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const { owner } = ctx.accounts;
    const [UNSRegistry, MintingManager] = unwrapDependencies(dependencies, [
      ArtifactName.UNSRegistry,
      ArtifactName.MintingManager,
    ]);

    const zilliqaRecover = await upgrades.deployProxy(ctx.artifacts.ZilliqaRecover.connect(owner), [
      UNSRegistry?.address,
      MintingManager?.address,
    ]);
    await zilliqaRecover.deployTransaction.wait();
    if (isSandbox) {
      const mintingManager = await ctx.artifacts.MintingManager.attach(MintingManager.address).connect(owner);
      await mintingManager.functions.addMinter(zilliqaRecover.address);
    }
    const proxyAdmin = await upgrades.admin.getInstance();
    const zilliqaRecoverImpl = await proxyAdmin.callStatic.getProxyImplementation(zilliqaRecover.address);
    await ctx.saveContractConfig(UnsContractName.ZilliqaRecover, zilliqaRecover, zilliqaRecoverImpl, zilliqaRecover);
    await verify(ctx, zilliqaRecoverImpl, []);
  },

  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    return ensureDeployed(config, UnsContractName.UNSRegistry, UnsContractName.MintingManager);
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

  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    ensureUpgradable(config);
    return ensureDeployed(config, UnsContractName.UNSRegistry);
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

  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    ensureUpgradable(config);
    return ensureDeployed(config, UnsContractName.MintingManager);
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
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    ensureUpgradable(config);
    return ensureDeployed(config, UnsContractName.ProxyReader);
  },
};

const upgradeUNSOperatorTask: Task = {
  tags: ['upgrade_uns_operator'],
  priority: 105,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const UNSOperator = unwrap(dependencies, ArtifactName.UNSOperator);

    const unsOperator = await upgrades.upgradeProxy(UNSOperator.address, ctx.artifacts.UNSOperator);
    await unsOperator.deployTransaction.wait();

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

    const unsOperatorImpl = await proxyAdmin.callStatic.getProxyImplementation(unsOperator.address);

    await ctx.saveContractConfig(UnsContractName.UNSOperator, unsOperator, unsOperatorImpl);
    await verify(ctx, unsOperatorImpl, []);
  },
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    ensureUpgradable(config);
    return ensureDeployed(config, UnsContractName.UNSOperator);
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
      title: `Propose UNSRegistry to v${version}`,
      multisig: ctx.multisig,
      unsafeAllow: ['delegatecall'],
    });
    if (proposal.metadata?.newImplementationAddress) {
      await ctx.saveContractConfig(
        UnsContractName.UNSRegistry,
        ctx.artifacts.UNSRegistry.attach(UNSRegistry.address),
        proposal.metadata.newImplementationAddress,
      );
      await verify(ctx, proposal.metadata.newImplementationAddress, []);
    }
    ctx.log('Upgrade proposal created at:', proposal.url);
  },
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    ensureUpgradable(config);
    return ensureDeployed(config, UnsContractName.UNSRegistry);
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
      title: `Propose MintingManager to v${version}`,
      multisig: ctx.multisig,
    });
    if (proposal.metadata?.newImplementationAddress) {
      await ctx.saveContractConfig(
        UnsContractName.MintingManager,
        ctx.artifacts.MintingManager.attach(MintingManager.address),
        proposal.metadata.newImplementationAddress,
      );
      await verify(ctx, proposal.metadata.newImplementationAddress, []);
    }
    ctx.log('Upgrade proposal created at:', proposal.url);
  },
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    ensureUpgradable(config);
    return ensureDeployed(config, UnsContractName.MintingManager);
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
      title: `Propose ProxyReader to v${version}`,
      multisig: ctx.multisig,
      unsafeAllow: ['delegatecall'],
    });
    if (proposal.metadata?.newImplementationAddress) {
      await ctx.saveContractConfig(
        UnsContractName.ProxyReader,
        ctx.artifacts.ProxyReader.attach(ProxyReader.address),
        proposal.metadata.newImplementationAddress,
      );
      await verify(ctx, proposal.metadata.newImplementationAddress, []);
    }
    ctx.log('Upgrade proposal created at:', proposal.url);
  },
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    ensureUpgradable(config);
    return ensureDeployed(config, UnsContractName.ProxyReader);
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
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    return ensureDeployed(
      config,
      UnsContractName.UNSRegistry,
      UnsContractName.MintableERC721Predicate,
      UnsContractName.RootChainManager,
    );
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
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    return ensureDeployed(config, UnsContractName.UNSRegistry);
  },
};

const prepareProxyReaderTask: Task = {
  tags: ['prepare_proxy_reader'],
  priority: 210,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const ProxyReader = unwrap(dependencies, ArtifactName.ProxyReader);

    const newImplementationAddr = (await upgrades.prepareUpgrade(ProxyReader.address, ctx.artifacts.ProxyReader, {
      unsafeAllow: ['delegatecall'],
    })) as string;

    ctx.log('Deployed ProxyReader implementation: ', newImplementationAddr);

    if (newImplementationAddr) {
      await ctx.saveContractConfig(
        UnsContractName.ProxyReader,
        ctx.artifacts.ProxyReader.attach(ProxyReader.address),
        newImplementationAddr,
      );
      await verify(ctx, newImplementationAddr, []);
    }

    const { owner } = ctx.accounts;
    const callData = ctx.artifacts.ProxyReader.interface.encodeFunctionData('setOwner(address)', [owner.address]);

    console.log(`setOwner encoded data(owner ${newImplementationAddr}): ${callData}`);
  },
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    ensureUpgradable(config);
    return ensureDeployed(config, UnsContractName.ProxyReader);
  },
};

const deployENSTask = {
  tags: ['ens'],
  priority: 10,
  run: async (ctx: Deployer) => {
    const { owner } = ctx.accounts;

    const ens = await ctx.artifacts[ArtifactName.ENSRegistry].connect(owner).deploy();
    await ctx.saveContractConfig(EnsContractName.ENSRegistry, ens);

    const baseRegistrar = await ctx.artifacts[ArtifactName.BaseRegistrarImplementation]
      .connect(owner)
      .deploy(ens.address, namehash('eth'));
    await ctx.saveContractConfig(EnsContractName.BaseRegistrarImplementation, baseRegistrar);

    const reverseRegistrar = await ctx.artifacts[ArtifactName.ReverseRegistrar].connect(owner).deploy(ens.address);
    await ctx.saveContractConfig(EnsContractName.ReverseRegistrar, reverseRegistrar);

    await ens.setSubnodeOwner(ZERO_WORD, notNullSha('reverse'), await owner.getAddress());
    await ens.setSubnodeOwner(namehash('reverse'), notNullSha('addr'), reverseRegistrar.address);

    const nameWrapper = await ctx.artifacts[ArtifactName.NameWrapper]
      .connect(owner)
      .deploy(ens.address, baseRegistrar.address, await owner.getAddress());
    await ctx.saveContractConfig(EnsContractName.NameWrapper, nameWrapper);

    await ens.setSubnodeOwner(ZERO_WORD, notNullSha('eth'), baseRegistrar.address);

    const dummyOracle = await ctx.artifacts[ArtifactName.DummyOracle].connect(owner).deploy('100000000');
    await ctx.saveContractConfig(EnsContractName.DummyOracle, dummyOracle);

    const priceOracle = await ctx.artifacts[ArtifactName.StablePriceOracle]
      .connect(owner)
      .deploy(dummyOracle.address, [0, 0, 4, 2, 1]);
    await ctx.saveContractConfig(EnsContractName.StablePriceOracle, priceOracle);

    const controller = await ctx.artifacts[ArtifactName.ETHRegistrarController]
      .connect(owner)
      .deploy(
        baseRegistrar.address,
        priceOracle.address,
        600,
        86400,
        reverseRegistrar.address,
        nameWrapper.address,
        ens.address,
      );
    await ctx.saveContractConfig(EnsContractName.ETHRegistrarController, controller);

    const legacyController = await ctx.artifacts[ArtifactName.LegacyETHRegistrarController]
      .connect(owner)
      .deploy(baseRegistrar.address, priceOracle.address, 600, 86400);
    await ctx.saveContractConfig(EnsContractName.LegacyETHRegistrarController, legacyController);

    await nameWrapper.setController(controller.address, true);
    await nameWrapper.setController(legacyController.address, true);
    await baseRegistrar.addController(nameWrapper.address);
    await baseRegistrar.addController(controller.address);
    await baseRegistrar.addController(legacyController.address);
    await reverseRegistrar.setController(controller.address, true);
    await reverseRegistrar.setController(legacyController.address, true);
    const resolver = await ctx.artifacts[ArtifactName.PublicResolver]
      .connect(owner)
      .deploy(ens.address, nameWrapper.address, controller.address, reverseRegistrar.address);
    await ctx.saveContractConfig(EnsContractName.PublicResolver, resolver);
    const legacyResolver = await ctx.artifacts[ArtifactName.PublicResolver]
      .connect(owner)
      .deploy(ens.address, nameWrapper.address, controller.address, reverseRegistrar.address);
    await ctx.saveContractLegacyAddresses(EnsContractName.PublicResolver, [legacyResolver.address]);
    await reverseRegistrar.setDefaultResolver(resolver.address);
    const legacyEnsRegistry = await ctx.artifacts[ArtifactName.LegacyENSRegistry].connect(owner).deploy();
    await legacyEnsRegistry.setSubnodeOwner(ZERO_WORD, notNullSha('eth'), await owner.getAddress());
    await ctx.saveContractConfig(EnsContractName.LegacyENSRegistry, legacyEnsRegistry);

    const algorithmsIds = {
      [ArtifactName.RSASHA256Algorithm]: 8,
      [ArtifactName.DummyAlgorithm]: 0,
    };
    const digestsIds = {
      [ArtifactName.SHA256Digest]: 2,
      [ArtifactName.SHA1Digest]: 1,
    };
    const nSecDigestsIds = {
      [ArtifactName.SHA1NSEC3Digest]: 1,
    };
    const algorithmsAndDigests = {
      [ArtifactName.RSASHA256Algorithm]: await ctx.artifacts[ArtifactName.RSASHA256Algorithm].connect(owner).deploy(),
      [ArtifactName.DummyAlgorithm]: await ctx.artifacts[ArtifactName.DummyAlgorithm].connect(owner).deploy(),
      [ArtifactName.SHA256Digest]: await ctx.artifacts[ArtifactName.SHA256Digest].connect(owner).deploy(),
      [ArtifactName.SHA1Digest]: await ctx.artifacts[ArtifactName.SHA1Digest].connect(owner).deploy(),
      [ArtifactName.SHA1NSEC3Digest]: await ctx.artifacts[ArtifactName.SHA1NSEC3Digest].connect(owner).deploy(),
    };
    const rootTrustAnchors =
      // eslint-disable-next-line max-len
      '0x00002b000100000e1000244a5c080249aac11d7b6f6446702e54a1607371607a1a41855200fd2ce1cdde32f24e8fb500002b000100000e1000244f660802e06d44b80b8f1d39a95c0b0d7c65d08458e880409bbc683457104237c7f8ec8d';
    const dnssecOracle = await ctx.artifacts[ArtifactName.DNSSECImpl].connect(owner).deploy(rootTrustAnchors);
    for (const [algorithm, id] of Object.entries(algorithmsIds)) {
      await dnssecOracle.setAlgorithm(id, algorithmsAndDigests[algorithm].address);
    }
    for (const [digest, id] of Object.entries(digestsIds)) {
      await dnssecOracle.setDigest(id, algorithmsAndDigests[digest].address);
    }
    for (const [nSecDigest, id] of Object.entries(nSecDigestsIds)) {
      await dnssecOracle.setNSEC3Digest(id, algorithmsAndDigests[nSecDigest].address);
    }
    await ctx.saveContractConfig(EnsContractName.DNSSECImpl, dnssecOracle);

    const tldPublicSuffixList = await ctx.artifacts[ArtifactName.TLDPublicSuffixList].connect(owner).deploy();
    const dnsRegistrar = await ctx.artifacts[ArtifactName.DNSRegistrar]
      .connect(owner)
      .deploy(dnssecOracle.address, tldPublicSuffixList.address, ens.address);
    const root = await ctx.artifacts[ArtifactName.Root].connect(owner).deploy(ens.address);
    await ctx.saveContractConfig(EnsContractName.Root, root);
    await root.setController(dnsRegistrar.address, true);
    await root.setController(owner.address, true);
    await ens.setOwner(ZERO_WORD, root.address);
    await ctx.saveContractConfig(EnsContractName.DNSRegistrar, dnsRegistrar);
  },
  ensureDependencies: () => ({}),
};

const deployENSCustodyTask: Task = {
  tags: ['ens_custody'],
  priority: 20,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const { owner } = ctx.accounts;

    const [ETHRegistrarController, NameWrapper, BaseRegistrarImplementation] = unwrapDependencies(dependencies, [
      ArtifactName.ETHRegistrarController,
      ArtifactName.NameWrapper,
      ArtifactName.BaseRegistrarImplementation,
    ]);

    const custody = await upgrades.deployProxy(ctx.artifacts.ENSCustody.connect(owner), [
      ETHRegistrarController.address,
      NameWrapper.address,
      BaseRegistrarImplementation.address,
    ]);
    await custody.deployTransaction.wait();

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

    const custodyImpl = await proxyAdmin.callStatic.getProxyImplementation(custody.address);
    await ctx.saveContractConfig(EnsContractName.ENSCustody, custody, custodyImpl, custody);
    await verify(ctx, custodyImpl, []);

    if (ctx.minters.length) {
      const chunkSize = 100;
      for (let i = 0, j = ctx.minters.length; i < j; i += chunkSize) {
        const array = ctx.minters.slice(i, i + chunkSize);

        ctx.log('Adding minters...', array);
        const addMintersTx = await custody.connect(owner).addMinters(array);
        await addMintersTx.wait();
        ctx.log(`Added ${array.length} minters`);
      }
    }
  },
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    return ensureDeployed(
      config,
      EnsContractName.ETHRegistrarController,
      EnsContractName.NameWrapper,
      EnsContractName.BaseRegistrarImplementation,
    );
  },
};

const proposeENSCustodyTask: Task = {
  tags: ['propose_ens_custody'],
  priority: 30,
  run: async (ctx: Deployer, dependencies: DependenciesMap, params?: Record<string, string>) => {
    const ENSCustody = unwrap(dependencies, ArtifactName.ENSCustody);

    const version = params?.version;
    if (!version) {
      throw new Error('Version parameter is not provided');
    }

    ctx.log('Preparing proposal...');
    const proposal = await defender.proposeUpgrade(ENSCustody.address, ctx.artifacts.ENSCustody, {
      title: `Propose ENSCustody to v${version}`,
      multisig: ctx.multisig,
    });
    if (proposal.metadata?.newImplementationAddress) {
      await ctx.saveContractConfig(
        EnsContractName.ENSCustody,
        ctx.artifacts.ENSCustody.attach(ENSCustody.address),
        proposal.metadata.newImplementationAddress,
      );
      await verify(ctx, proposal.metadata.newImplementationAddress, []);
    }
    ctx.log('Upgrade proposal created at:', proposal.url);
  },
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    ensureUpgradable(config);
    return ensureDeployed(config, EnsContractName.ENSCustody);
  },
};

const fundENSCustodyTask: Task = {
  tags: ['fund_ens_custody'],
  priority: 25,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const { owner } = ctx.accounts;

    if (!isSandbox) {
      throw new Error('This task is only available for sandbox');
    }

    const [ENSCustody] = unwrapDependencies(dependencies, [ArtifactName.ENSCustody]);
    const custody = ctx.artifacts.MintingManager.attach(ENSCustody.address);

    await owner.sendTransaction({ to: custody.address, value: utils.parseEther('10') });
  },
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    return ensureDeployed(config, EnsContractName.ENSCustody);
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
  deployUNSOperatorTask,
  upgradeUNSOperatorTask,
  prepareProxyReaderTask,
  deployENSTask,
  deployENSCustodyTask,
  proposeENSCustodyTask,
  fundENSCustodyTask,
  deployZilliqaRecoverTask,
];
