import { defender, ethers, network, upgrades } from 'hardhat';
import { Contract, keccak256, namehash, parseEther, parseUnits, AbiCoder } from 'ethers';
import { merge } from 'lodash';
import { getContractAddress } from '@openzeppelin/hardhat-upgrades/dist/utils';
import { ZERO_ADDRESS, ZERO_WORD } from '../test/helpers/constants';
import {
  ENSCustody,
  MintingManager,
  ProxyReader,
  SeaportProxyBuyer,
  UNSOperator,
  UNSRegistry,
  ZilliqaRecover,
} from '../types';
import { Deployer } from './deployer';
import { ArtifactName, DependenciesMap, EnsContractName, NsNetworkConfig, UnsContractName } from './types';
import verify from './verify';
import { notNullSha, unwrap, unwrapDependencies } from './utils';
import { deployProxy, ensureDeployed, ensureUpgradable, isSandbox, isTestnet, mintUnsTlds } from './helpers';

const abiCoder = new AbiCoder();

export type Task = {
  tags: string[];
  priority: number;
  run: (ctx: Deployer, dependencies: DependenciesMap, params?: Record<string, string>) => Promise<void>;
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => DependenciesMap;
};

export const deployCNSTask: Task = {
  tags: ['cns', 'full'],
  priority: 0,
  run: async (ctx: Deployer) => {
    const { owner } = ctx.accounts;
    // CNS Registry
    const cnsRegistry = await ethers.deployContract(ArtifactName.CNSRegistry, [], owner);
    await ctx.saveContractConfig(UnsContractName.CNSRegistry, cnsRegistry);
    await cnsRegistry.waitForDeployment();
    await verify(ctx, await cnsRegistry.getAddress(), []);

    // CNS Controllers
    const signatureController = await ethers.deployContract(
      ArtifactName.SignatureController,
      [await cnsRegistry.getAddress()],
      owner,
    );
    await ctx.saveContractConfig(UnsContractName.SignatureController, signatureController);
    await signatureController.waitForDeployment();
    await verify(ctx, await signatureController.getAddress(), [await cnsRegistry.getAddress()]);

    const mintingController = await ethers.deployContract(
      ArtifactName.MintingController,
      [await cnsRegistry.getAddress()],
      owner,
    );
    await ctx.saveContractConfig(UnsContractName.MintingController, mintingController);
    await mintingController.waitForDeployment();
    await verify(ctx, await mintingController.getAddress(), [await cnsRegistry.getAddress()]);

    const uriPrefixController = await ethers.deployContract(
      ArtifactName.URIPrefixController,
      [await cnsRegistry.getAddress()],
      owner,
    );
    await ctx.saveContractConfig(UnsContractName.URIPrefixController, uriPrefixController);
    await uriPrefixController.waitForDeployment();
    await verify(ctx, await uriPrefixController.getAddress(), [await cnsRegistry.getAddress()]);

    // Configuration
    await cnsRegistry.addController(await signatureController.getAddress());
    await cnsRegistry.addController(await mintingController.getAddress());
    await cnsRegistry.addController(await uriPrefixController.getAddress());

    // CNS Resolver
    const resolver = await ethers.deployContract(
      ArtifactName.Resolver,
      [await cnsRegistry.getAddress(), await mintingController.getAddress()],
      owner,
    );
    await ctx.saveContractConfig(UnsContractName.Resolver, resolver);
    await resolver.waitForDeployment();
    await verify(ctx, await resolver.getAddress(), [
      await cnsRegistry.getAddress(),
      await mintingController.getAddress(),
    ]);

    // Stub unsupported contracts
    await ctx.saveContractEmptyConfig(UnsContractName.WhitelistedMinter);
    await ctx.saveContractEmptyConfig(UnsContractName.DomainZoneController);
    await ctx.saveContractEmptyConfig(UnsContractName.TwitterValidationOperator);
    await ctx.saveContractEmptyConfig(UnsContractName.FreeMinter);
  },
  ensureDependencies: () => ({}),
};

export const deployCNSForwardersTask: Task = {
  tags: ['cns_forwarders', 'full'],
  priority: 5,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const { owner } = ctx.accounts;

    const [CNSRegistry, SignatureController, Resolver] = unwrapDependencies(dependencies, [
      UnsContractName.CNSRegistry,
      UnsContractName.SignatureController,
      UnsContractName.Resolver,
    ]);

    const cnsRegistryForwarder = await ethers.deployContract(
      ArtifactName.CNSRegistryForwarder,
      [SignatureController.address],
      owner,
    );

    await ctx.saveForwarderConfig(UnsContractName.CNSRegistry, cnsRegistryForwarder);
    await cnsRegistryForwarder.waitForDeployment();
    await verify(ctx, await cnsRegistryForwarder.getAddress(), [SignatureController.address]);

    const resolverForwarder = await ethers.deployContract(
      ArtifactName.ResolverForwarder,
      [CNSRegistry.address, Resolver.address],
      owner,
    );

    await ctx.saveForwarderConfig(UnsContractName.Resolver, resolverForwarder);
    await resolverForwarder.waitForDeployment();
    await verify(ctx, await resolverForwarder.getAddress(), [CNSRegistry.address, Resolver.address]);
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
        UnsContractName.CNSRegistry,
        UnsContractName.MintingController,
        UnsContractName.URIPrefixController,
        UnsContractName.Resolver,
        UnsContractName.RootChainManager,
      ],
    );

    let unsRegistry: UNSRegistry;
    let mintingManager: MintingManager;
    let unsOperator: UNSOperator;
    let proxyAdmin: Contract;

    let unsRegistryImpl: string;
    let mintingManagerImpl: string;
    let unsOperatorImpl: string;

    if (ctx.options.proxy) {
      unsRegistry = await deployProxy(await ethers.getContractFactory(ArtifactName.UNSRegistry, owner), [], {
        initializer: false,
        unsafeAllow: ['delegatecall'],
      });

      mintingManager = await deployProxy(await ethers.getContractFactory(ArtifactName.MintingManager, owner), [], {
        initializer: false,
      });

      unsOperator = await deployProxy(await ethers.getContractFactory(ArtifactName.UNSOperator, owner));

      proxyAdmin = await upgrades.admin.getInstance();
      await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

      unsRegistryImpl = await proxyAdmin.getProxyImplementation.staticCall(await unsRegistry.getAddress());
      await ctx.saveContractConfig(UnsContractName.UNSRegistry, unsRegistry, unsRegistryImpl, unsRegistry);
      await verify(ctx, unsRegistryImpl, []);

      mintingManagerImpl = await proxyAdmin.getProxyImplementation.staticCall(await mintingManager.getAddress());
      await ctx.saveContractConfig(UnsContractName.MintingManager, mintingManager, mintingManagerImpl);
      await verify(ctx, mintingManagerImpl, []);

      unsOperatorImpl = await proxyAdmin.getProxyImplementation.staticCall(await unsOperator.getAddress());
      await ctx.saveContractConfig(UnsContractName.UNSOperator, unsOperator, unsOperatorImpl);
      await verify(ctx, unsOperatorImpl, []);
    } else {
      unsRegistry = await ethers.deployContract(UnsContractName.UNSRegistry, owner);
      await ctx.saveContractConfig(UnsContractName.UNSRegistry, unsRegistry);
      await unsRegistry.waitForDeployment();
      await verify(ctx, await unsRegistry.getAddress(), []);

      mintingManager = await ethers.deployContract(UnsContractName.MintingManager, owner);
      await ctx.saveContractConfig(UnsContractName.MintingManager, mintingManager);
      await mintingManager.waitForDeployment();
      await verify(ctx, await mintingManager.getAddress(), []);

      unsOperator = await ethers.deployContract(UnsContractName.UNSOperator, owner);
      await ctx.saveContractConfig(UnsContractName.UNSOperator, unsOperator);
      await unsOperator.waitForDeployment();
      await verify(ctx, await unsOperator.getAddress(), []);
    }

    const registryInitTx = await unsRegistry
      .connect(owner)
      .initialize(await mintingManager.getAddress(), CNSRegistry.address, RootChainManager.address, ZERO_ADDRESS);
    await registryInitTx.wait();

    const forwarder = await ethers.deployContract(
      ArtifactName.MintingManagerForwarder,
      [await mintingManager.getAddress()],
      owner,
    );
    await ctx.saveForwarderConfig(UnsContractName.MintingManager, forwarder);
    await forwarder.waitForDeployment();
    await verify(ctx, await forwarder.getAddress(), [await mintingManager.getAddress()]);

    const mintingManagerInitTx = await mintingManager
      .connect(owner)
      .initialize(
        await unsRegistry.getAddress(),
        MintingController.address,
        URIPrefixController.address,
        Resolver.address,
        await unsOperator.getAddress(),
        await forwarder.getAddress(),
      );
    await mintingManagerInitTx.wait();

    if (ctx.minters?.length) {
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
      UnsContractName.UNSRegistry,
      UnsContractName.CNSRegistry,
      UnsContractName.MintingManager,
    ]);

    const proxyReader = await deployProxy<ProxyReader>(
      await ethers.getContractFactory(ArtifactName.ProxyReader, owner),
      [UNSRegistry.address, CNSRegistry.address],
      { unsafeAllow: ['delegatecall'] },
    );
    await proxyReader.waitForDeployment();

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

    const proxyReaderImpl = await proxyAdmin.getProxyImplementation.staticCall(await getContractAddress(proxyReader));
    await ctx.saveContractConfig(UnsContractName.ProxyReader, proxyReader, proxyReaderImpl);
    await verify(ctx, proxyReaderImpl, []);

    const mintingManager = await ethers.getContractAt(ArtifactName.MintingManager, MintingManager.address, owner);

    await mintingManager.addProxyReaders([await getContractAddress(proxyReader)]);
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
      UnsContractName.MintingController,
      UnsContractName.URIPrefixController,
      UnsContractName.MintingManager,
    ]);

    const mintingController = await ethers.getContractAt(
      ArtifactName.MintingController,
      MintingController.address,
      owner,
    );

    if (!(await mintingController.isMinter(MintingManager.address))) {
      await mintingController.addMinter(MintingManager.address);
    }

    const uriPrefixController = await ethers.getContractAt(
      ArtifactName.URIPrefixController,
      URIPrefixController.address,
      owner,
    );

    if (!(await uriPrefixController.isWhitelisted(MintingManager.address))) {
      await uriPrefixController.addWhitelisted(MintingManager.address);
    }

    // Set tokenURI prefix only for Sandbox
    if (isSandbox) {
      const mintingManager = await ethers.getContractAt(ArtifactName.MintingManager, MintingManager.address, owner);
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

    const forwarder = await ethers.deployContract(
      ArtifactName.MintingManagerForwarder,
      [MintingManager.address],
      owner,
    );

    const mintingManager = await ethers.getContractAt(ArtifactName.MintingManager, MintingManager.address, owner);

    await mintingManager.setForwarder(await forwarder.getAddress());
    await ctx.saveForwarderConfig(UnsContractName.MintingManager, forwarder);
    await forwarder.waitForDeployment();
    await verify(ctx, await forwarder.getAddress(), [MintingManager.address]);
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

    const unsOperator = await upgrades.deployProxy(
      await ethers.getContractFactory(ArtifactName.UNSOperator, owner),
      [],
    );
    await unsOperator.waitForDeployment();

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

    const unsOperatorImpl = await proxyAdmin.getProxyImplementation.staticCall(unsOperator.address);
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
      UnsContractName.UNSRegistry,
      UnsContractName.MintingManager,
    ]);

    const zilliqaRecover = await deployProxy<ZilliqaRecover>(
      await ethers.getContractFactory(ArtifactName.ZilliqaRecover, owner),
      [UNSRegistry.address, MintingManager.address],
    );

    if (isSandbox) {
      const mintingManager = await ethers.getContractAt(ArtifactName.MintingManager, MintingManager.address, owner);
      await mintingManager.addMinter(await zilliqaRecover.getAddress());
    }

    const proxyAdmin = await upgrades.admin.getInstance();
    const zilliqaRecoverImpl = await proxyAdmin.getProxyImplementation.staticCall(await zilliqaRecover.getAddress());

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

    const unsRegistry = await upgrades.upgradeProxy(
      UNSRegistry.address,
      await ethers.getContractFactory(ArtifactName.UNSRegistry),
    );
    await unsRegistry.waitForDeployment();

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

    const unsRegistryImpl = await proxyAdmin.getProxyImplementation.staticCall(unsRegistry.address);
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

    const mintingManager = await upgrades.upgradeProxy(
      MintingManager.address,
      await ethers.getContractFactory(ArtifactName.MintingManager),
    );
    await mintingManager.waitForDeployment();

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

    const mintingManagerImpl = await proxyAdmin.getProxyImplementation.staticCall(mintingManager.address);
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

    const proxyReader = await upgrades.upgradeProxy(
      ProxyReader.address,
      await ethers.getContractFactory(ArtifactName.ProxyReader),
      { unsafeAllow: ['delegatecall'] },
    );
    await proxyReader.waitForDeployment();

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

    const proxyReaderImpl = await proxyAdmin.getProxyImplementation.staticCall(proxyReader.address);

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

    const unsOperator = await upgrades.upgradeProxy(
      UNSOperator.address,
      await ethers.getContractFactory(ArtifactName.UNSOperator),
    );
    await unsOperator.waitForDeployment();

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

    const unsOperatorImpl = await proxyAdmin.getProxyImplementation.staticCall(unsOperator.address);

    await ctx.saveContractConfig(UnsContractName.UNSOperator, unsOperator, unsOperatorImpl);
    await verify(ctx, unsOperatorImpl, []);
  },
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    ensureUpgradable(config);
    return ensureDeployed(config, UnsContractName.UNSOperator);
  },
};

const mintUnsTldsTask: Task = {
  tags: ['min_uns_tlds', 'uns', 'full'],
  priority: 110,
  run: async (ctx: Deployer, dependencies: DependenciesMap, params?: Record<string, string>) => {
    const { owner } = ctx.accounts;
    if (!isSandbox) {
      throw new Error('This task is only available for sandbox');
    }

    const mintingManagerAddr =
      ctx.getNetworkConfig().networks[network.config.chainId!].contracts[UnsContractName.MintingManager].address;

    const mintingManager = await ethers.getContractAt(ArtifactName.MintingManager, mintingManagerAddr, owner);
    await mintUnsTlds(mintingManager, owner);
  },
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    return ensureDeployed(config, UnsContractName.MintingManager);
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

    if (!ctx.multisig) {
      throw new Error('Multisig address is not provided');
    }

    ctx.log('Preparing proposal...');
    const proposal = await defender.proposeUpgrade(
      UNSRegistry.address,
      await ethers.getContractFactory(ArtifactName.UNSRegistry),
      {
        title: `Propose UNSRegistry to v${version}`,
        multisig: ctx.multisig,
        unsafeAllow: ['delegatecall'],
      },
    );
    if (proposal.metadata?.newImplementationAddress) {
      await ctx.saveContractConfig(
        UnsContractName.UNSRegistry,
        await ethers.getContractAt(ArtifactName.UNSRegistry, UNSRegistry.address),
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

    if (!ctx.multisig) {
      throw new Error('Multisig address is not provided');
    }

    ctx.log('Preparing proposal...');
    const proposal = await defender.proposeUpgrade(
      MintingManager.address,
      await ethers.getContractFactory(ArtifactName.MintingManager),
      {
        title: `Propose MintingManager to v${version}`,
        multisig: ctx.multisig,
      },
    );

    if (proposal.metadata?.newImplementationAddress) {
      await ctx.saveContractConfig(
        UnsContractName.MintingManager,
        await ethers.getContractAt(ArtifactName.MintingManager, MintingManager.address),
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

    if (!ctx.multisig) {
      throw new Error('Multisig address is not provided');
    }

    ctx.log('Preparing proposal...');
    const proposal = await defender.proposeUpgrade(
      ProxyReader.address,
      await ethers.getContractFactory(ArtifactName.ProxyReader),
      {
        title: `Propose ProxyReader to v${version}`,
        multisig: ctx.multisig,
        unsafeAllow: ['delegatecall'],
      },
    );
    if (proposal.metadata?.newImplementationAddress) {
      await ctx.saveContractConfig(
        UnsContractName.ProxyReader,
        await ethers.getContractAt(ArtifactName.ProxyReader, ProxyReader.address),
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

    const stateSender = await ethers.deployContract(ArtifactName.DummyStateSender, [], owner);
    const checkpointManager = await ethers.deployContract(ArtifactName.CheckpointManager, [], owner);

    // deploy Predicate
    const predicate = await ethers.deployContract(ArtifactName.MintableERC721Predicate, [], owner);
    await predicate.initialize(owner.address);
    await ctx.saveContractConfig(UnsContractName.MintableERC721Predicate, predicate);

    // deploy RootChainManager
    const rootChainManager = await ethers.deployContract(ArtifactName.RootChainManager, [], owner);
    await rootChainManager.initialize(owner.address);
    await rootChainManager.setCheckpointManager(await checkpointManager.getAddress());
    await rootChainManager.setStateSender(await stateSender.getAddress());
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
      UnsContractName.UNSRegistry,
      UnsContractName.MintableERC721Predicate,
      UnsContractName.RootChainManager,
    ]);

    const rootChainManager = await ethers.getContractAt(
      ArtifactName.RootChainManager,
      RootChainManager.address,
      owner,
    );

    const tokenType = keccak256(UNSRegistry.address);
    await rootChainManager.registerPredicate(tokenType, MintableERC721Predicate.address);
    await rootChainManager.mapToken(UNSRegistry.address, UNSRegistry.address, tokenType);

    const predicate = await ethers.getContractAt(
      ArtifactName.MintableERC721Predicate,
      MintableERC721Predicate.address,
      owner,
    );
    await predicate.grantRole(await predicate.MANAGER_ROLE(), await rootChainManager.getAddress());
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

    const dotCoinBurner = await ethers.deployContract(ArtifactName.DotCoinBurner, [UNSRegistry.address], owner);
    await ctx.saveContractConfig(UnsContractName.DotCoinBurner, dotCoinBurner);
    await dotCoinBurner.waitForDeployment();
    await verify(ctx, await dotCoinBurner.getAddress(), [UNSRegistry.address]);
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

    const newImplementationAddr = (await upgrades.prepareUpgrade(
      ProxyReader.address,
      await ethers.getContractFactory(ArtifactName.ProxyReader),
      { unsafeAllow: ['delegatecall'] },
    )) as string;

    ctx.log('Deployed ProxyReader implementation: ', newImplementationAddr);

    if (!newImplementationAddr) {
      ctx.log('Implementation not deployed... Skipping');
      return;
    }
    const proxyReader = await ethers.getContractAt(ArtifactName.ProxyReader, ProxyReader.address);

    await ctx.saveContractConfig(UnsContractName.ProxyReader, proxyReader, newImplementationAddr);
    await verify(ctx, newImplementationAddr, []);

    const { owner } = ctx.accounts;
    const callData = proxyReader.interface.encodeFunctionData('setOwner(address)', [owner.address]);

    ctx.log(`setOwner encoded data(owner ${newImplementationAddr}): ${callData}`);
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

    const ens = await ethers.deployContract(ArtifactName.ENSRegistry, [], owner);
    await ctx.saveContractConfig(EnsContractName.ENSRegistry, ens);

    const baseRegistrar = await ethers.deployContract(
      ArtifactName.BaseRegistrarImplementation,
      [await ens.getAddress(), namehash('eth')],
      owner,
    );
    await ctx.saveContractConfig(EnsContractName.BaseRegistrarImplementation, baseRegistrar);

    const reverseRegistrar = await ethers.deployContract(
      ArtifactName.ReverseRegistrar,
      [await ens.getAddress()],
      owner,
    );
    await ctx.saveContractConfig(EnsContractName.ReverseRegistrar, reverseRegistrar);

    await ens.setSubnodeOwner(ZERO_WORD, notNullSha('reverse'), await owner.getAddress());
    await ens.setSubnodeOwner(namehash('reverse'), notNullSha('addr'), await reverseRegistrar.getAddress());

    const nameWrapper = await ethers.deployContract(
      ArtifactName.NameWrapper,
      [await ens.getAddress(), await baseRegistrar.getAddress(), await owner.getAddress()],
      owner,
    );
    await ctx.saveContractConfig(EnsContractName.NameWrapper, nameWrapper);

    await ens.setSubnodeOwner(ZERO_WORD, notNullSha('eth'), await baseRegistrar.getAddress());

    const dummyOracle = await ethers.deployContract(ArtifactName.DummyOracle, ['100000000'], owner);
    await ctx.saveContractConfig(EnsContractName.DummyOracle, dummyOracle);

    const priceOracle = await ethers.deployContract(
      ArtifactName.StablePriceOracle,
      [await dummyOracle.getAddress(), [0, 0, 4, 2, 1]],
      owner,
    );
    await ctx.saveContractConfig(EnsContractName.StablePriceOracle, priceOracle);

    const controller = await ethers.deployContract(ArtifactName.ETHRegistrarController, [
      await baseRegistrar.getAddress(),
      await priceOracle.getAddress(),
      600,
      86400,
      await reverseRegistrar.getAddress(),
      await nameWrapper.getAddress(),
      await ens.getAddress(),
    ]);
    await ctx.saveContractConfig(EnsContractName.ETHRegistrarController, controller);

    const legacyController = await ethers.deployContract(
      ArtifactName.LegacyETHRegistrarController,
      [await baseRegistrar.getAddress(), await priceOracle.getAddress(), 600, 86400],
      owner,
    );
    await ctx.saveContractConfig(EnsContractName.LegacyETHRegistrarController, legacyController);

    await nameWrapper.setController(await controller.getAddress(), true);
    await nameWrapper.setController(await legacyController.getAddress(), true);
    await baseRegistrar.addController(await nameWrapper.getAddress());
    await baseRegistrar.addController(await controller.getAddress());
    await baseRegistrar.addController(await legacyController.getAddress());
    await reverseRegistrar.setController(await controller.getAddress(), true);
    await reverseRegistrar.setController(await legacyController.getAddress(), true);

    const resolver = await ethers.deployContract(
      ArtifactName.PublicResolver,
      [
        await ens.getAddress(),
        await nameWrapper.getAddress(),
        await controller.getAddress(),
        await reverseRegistrar.getAddress(),
      ],
      owner,
    );

    await ctx.saveContractConfig(EnsContractName.PublicResolver, resolver);
    const legacyResolver = await ethers.deployContract(
      ArtifactName.PublicResolver,
      [
        await ens.getAddress(),
        await nameWrapper.getAddress(),
        await controller.getAddress(),
        await reverseRegistrar.getAddress(),
      ],
      owner,
    );
    await ctx.saveContractLegacyAddresses(EnsContractName.PublicResolver, [await legacyResolver.getAddress()]);
    await reverseRegistrar.setDefaultResolver(await resolver.getAddress());
    const legacyEnsRegistry = await ethers.deployContract(ArtifactName.LegacyENSRegistry, [], owner);
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
      [ArtifactName.RSASHA256Algorithm]: await ethers.deployContract(ArtifactName.RSASHA256Algorithm, [], owner),
      [ArtifactName.DummyAlgorithm]: await ethers.deployContract(ArtifactName.DummyAlgorithm, [], owner),
      [ArtifactName.SHA256Digest]: await ethers.deployContract(ArtifactName.SHA256Digest, [], owner),
      [ArtifactName.SHA1Digest]: await ethers.deployContract(ArtifactName.SHA1Digest, [], owner),
      [ArtifactName.SHA1NSEC3Digest]: await ethers.deployContract(ArtifactName.SHA1NSEC3Digest, [], owner),
    };
    const rootTrustAnchors =
      // eslint-disable-next-line max-len
      '0x00002b000100000e1000244a5c080249aac11d7b6f6446702e54a1607371607a1a41855200fd2ce1cdde32f24e8fb500002b000100000e1000244f660802e06d44b80b8f1d39a95c0b0d7c65d08458e880409bbc683457104237c7f8ec8d';
    const dnssecOracle = await ethers.deployContract(ArtifactName.DNSSECImpl, [rootTrustAnchors], owner);
    for (const [algorithm, id] of Object.entries(algorithmsIds)) {
      await dnssecOracle.setAlgorithm(id, await algorithmsAndDigests[algorithm].getAddress());
    }
    for (const [digest, id] of Object.entries(digestsIds)) {
      await dnssecOracle.setDigest(id, await algorithmsAndDigests[digest].getAddress());
    }
    for (const [nSecDigest, id] of Object.entries(nSecDigestsIds)) {
      await dnssecOracle.setNSEC3Digest(id, await algorithmsAndDigests[nSecDigest].getAddress());
    }
    await ctx.saveContractConfig(EnsContractName.DNSSECImpl, dnssecOracle);

    const tldPublicSuffixList = await ethers.deployContract(ArtifactName.TLDPublicSuffixList, [], owner);
    const dnsRegistrar = await ethers.deployContract(ArtifactName.DNSRegistrar, [
      await dnssecOracle.getAddress(),
      await tldPublicSuffixList.getAddress(),
      await ens.getAddress(),
    ]);
    const root = await ethers.deployContract(ArtifactName.Root, [await ens.getAddress()], owner);
    await ctx.saveContractConfig(EnsContractName.Root, root);
    await root.setController(await dnsRegistrar.getAddress(), true);
    await root.setController(await owner.getAddress(), true);
    await ens.setOwner(ZERO_WORD, await root.getAddress());
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
      EnsContractName.ETHRegistrarController,
      EnsContractName.NameWrapper,
      EnsContractName.BaseRegistrarImplementation,
    ]);

    const custody = await deployProxy<ENSCustody>(await ethers.getContractFactory(ArtifactName.ENSCustody, owner), [
      ETHRegistrarController.address,
      NameWrapper.address,
      BaseRegistrarImplementation.address,
    ]);
    await custody.waitForDeployment();

    const proxyAdmin = await upgrades.admin.getInstance();
    await ctx.saveContractConfig(UnsContractName.ProxyAdmin, proxyAdmin);

    const custodyImpl = await proxyAdmin.getProxyImplementation.staticCall(await custody.getAddress());
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

    if (!ctx.multisig) {
      throw new Error('Multisig address is not provided');
    }

    ctx.log('Preparing proposal...');
    const proposal = await defender.proposeUpgrade(
      ENSCustody.address,
      await ethers.getContractFactory(ArtifactName.ENSCustody),
      {
        title: `Propose ENSCustody to v${version}`,
        multisig: ctx.multisig,
      },
    );

    if (proposal.metadata?.newImplementationAddress) {
      await ctx.saveContractConfig(
        EnsContractName.ENSCustody,
        await ethers.getContractAt(ArtifactName.ENSCustody, ENSCustody.address),
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

    const [ENSCustody] = unwrapDependencies(dependencies, [EnsContractName.ENSCustody]);

    await owner.sendTransaction({ to: ENSCustody.address, value: parseEther('10') });
  },
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    return ensureDeployed(config, EnsContractName.ENSCustody);
  },
};

const deploySeaportTask: Task = {
  tags: ['seaport', 'full'],
  priority: 10,
  run: async (ctx: Deployer) => {
    const { owner } = ctx.accounts;

    if (!isSandbox) {
      throw new Error('This task is only available for sandbox');
    }

    const conduitController = await ethers.deployContract(ArtifactName.ConduitController, [], owner);
    const seaport = await ethers.deployContract(ArtifactName.Seaport, [await conduitController.getAddress()], owner);
    await seaport.waitForDeployment();
    await ctx.saveContractConfig(UnsContractName.Seaport, seaport);
  },
  ensureDependencies: () => ({}),
};

const deployUsdcMockTask: Task = {
  tags: ['usdc_mock', 'full'],
  priority: 10,
  run: async (ctx: Deployer) => {
    const { owner } = ctx.accounts;

    if (!isSandbox && !isTestnet) {
      throw new Error('This task is only available for sandbox or testnet');
    }

    const usdcMock = await ethers.deployContract(ArtifactName.USDC, [], owner);
    await usdcMock.waitForDeployment();
    await ctx.saveContractConfig(UnsContractName.USDC, usdcMock);
    await verify(ctx, await usdcMock.getAddress(), [], 'contracts/mocks/USDC.sol:USDC');
  },
  ensureDependencies: () => ({}),
};

const deploySeaportProxyBuyerTask: Task = {
  tags: ['seaport_proxy_buyer', 'full'],
  priority: 25,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const { owner } = ctx.accounts;
    const [Seaport] = unwrapDependencies(dependencies, [UnsContractName.Seaport]);
    const seaportProxyBuyer = await deployProxy<SeaportProxyBuyer>(
      await ethers.getContractFactory(ArtifactName.SeaportProxyBuyer, owner),
      [Seaport.address],
    );
    await seaportProxyBuyer.waitForDeployment();
    if (ctx.minters.length) {
      const chunkSize = 100;
      for (let i = 0, j = ctx.minters.length; i < j; i += chunkSize) {
        const array = ctx.minters.slice(i, i + chunkSize);

        ctx.log('Adding minters...', array);
        const addMintersTx = await seaportProxyBuyer.connect(owner).addMinters(array);
        await addMintersTx.wait();
        ctx.log(`Added ${array.length} minters`);
      }
    }
    const proxyAdmin = await upgrades.admin.getInstance();
    const seaportProxyBuyerImpl = await proxyAdmin.getProxyImplementation.staticCall(
      await seaportProxyBuyer.getAddress(),
    );
    await ctx.saveContractConfig(
      UnsContractName.SeaportProxyBuyer,
      seaportProxyBuyer,
      seaportProxyBuyerImpl,
      seaportProxyBuyer,
    );
    await verify(ctx, seaportProxyBuyerImpl, []);
  },
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    return ensureDeployed(config, UnsContractName.Seaport);
  },
};

const fundSeaportProxyBuyerTask: Task = {
  tags: ['fund_seaport_proxy_buyer', 'full'],
  priority: 30,
  run: async (ctx: Deployer, dependencies: DependenciesMap) => {
    const { owner } = ctx.accounts;

    if (!isSandbox && !isTestnet) {
      throw new Error('This task is only available for sandbox or testnet');
    }

    const [SeaportProxyBuyer, USDCMock] = unwrapDependencies(dependencies, [
      UnsContractName.SeaportProxyBuyer,
      UnsContractName.USDC,
    ]);
    const usdcMockContract = await ethers.getContractAt(UnsContractName.USDC, USDCMock.address, owner);
    await usdcMockContract.mint(SeaportProxyBuyer.address, parseUnits('1000000', 6)); // 1M USDC
    const seaportProxyBuyerContract = await ethers.getContractAt(
      UnsContractName.SeaportProxyBuyer,
      SeaportProxyBuyer.address,
      owner,
    );
    await seaportProxyBuyerContract.approve(USDCMock.address);
  },
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    return ensureDeployed(config, UnsContractName.SeaportProxyBuyer, UnsContractName.USDC);
  },
};

const proposeSeaportProxyBuyerTask: Task = {
  tags: ['propose_seaport_proxy_buyer'],
  priority: 30,
  run: async (ctx: Deployer, dependencies: DependenciesMap, params?: Record<string, string>) => {
    const SeaportProxyBuyer = unwrap(dependencies, ArtifactName.SeaportProxyBuyer);

    const version = params?.version;
    if (!version) {
      throw new Error('Version parameter is not provided');
    }

    if (!ctx.multisig) {
      throw new Error('Multisig address is not provided');
    }

    ctx.log('Preparing proposal...');
    const proposal = await defender.proposeUpgradeWithApproval(
      SeaportProxyBuyer.address,
      await ethers.getContractFactory(ArtifactName.SeaportProxyBuyer),
      {
        useDefenderDeploy: false,
      },
    );

    const receipt = await proposal.txResponse?.wait();

    console.log(receipt?.contractAddress);

    if (receipt?.contractAddress  )   {
      await ctx.saveContractConfig(
        UnsContractName.SeaportProxyBuyer,
            await ethers.getContractAt(ArtifactName.SeaportProxyBuyer,                         SeaportProxyBuyer.address),
        receipt.contractAddress,
      );
      await verify(ctx, receipt.contractAddress, []);
    }
    ctx.log('Upgrade proposal created at:', proposal.url);
  },
  ensureDependencies: (ctx: Deployer, config?: NsNetworkConfig) => {
    config = merge(ctx.getDeployConfig(), config);

    ensureUpgradable(config);
    return ensureDeployed(config, UnsContractName.SeaportProxyBuyer);
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
  deploySeaportTask,
  deploySeaportProxyBuyerTask,
  deployUsdcMockTask,
  fundSeaportProxyBuyerTask,
  mintUnsTldsTask,
  proposeSeaportProxyBuyerTask,
];
