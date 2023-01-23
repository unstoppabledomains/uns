"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = exports.deployCNSForwardersTask = exports.deployCNSTask = void 0;
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const lodash_1 = require("lodash");
const constants_1 = require("../test/helpers/constants");
const types_1 = require("./types");
const verify_1 = __importDefault(require("./verify"));
const helpers_1 = require("./helpers");
exports.deployCNSTask = {
    tags: ['cns', 'full'],
    priority: 0,
    run: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const { owner } = ctx.accounts;
        const { CNSRegistry, SignatureController, MintingController, URIPrefixController, Resolver } = ctx.artifacts;
        const cnsRegistry = yield CNSRegistry.connect(owner).deploy();
        yield ctx.saveContractConfig(types_1.UnsContractName.CNSRegistry, cnsRegistry);
        yield cnsRegistry.deployTransaction.wait();
        yield (0, verify_1.default)(ctx, cnsRegistry.address, []);
        const signatureController = yield SignatureController.connect(owner).deploy(cnsRegistry.address);
        yield ctx.saveContractConfig(types_1.UnsContractName.SignatureController, signatureController);
        yield signatureController.deployTransaction.wait();
        yield (0, verify_1.default)(ctx, signatureController.address, [cnsRegistry.address]);
        const mintingController = yield MintingController.connect(owner).deploy(cnsRegistry.address);
        yield ctx.saveContractConfig(types_1.UnsContractName.MintingController, mintingController);
        yield mintingController.deployTransaction.wait();
        yield (0, verify_1.default)(ctx, mintingController.address, [cnsRegistry.address]);
        const uriPrefixController = yield URIPrefixController.connect(owner).deploy(cnsRegistry.address);
        yield ctx.saveContractConfig(types_1.UnsContractName.URIPrefixController, uriPrefixController);
        yield uriPrefixController.deployTransaction.wait();
        yield (0, verify_1.default)(ctx, uriPrefixController.address, [cnsRegistry.address]);
        yield cnsRegistry.connect(owner).addController(signatureController.address);
        yield cnsRegistry.connect(owner).addController(mintingController.address);
        yield cnsRegistry.connect(owner).addController(uriPrefixController.address);
        const resolver = yield Resolver.connect(owner).deploy(cnsRegistry.address, mintingController.address);
        yield ctx.saveContractConfig(types_1.UnsContractName.Resolver, resolver);
        yield resolver.deployTransaction.wait();
        yield (0, verify_1.default)(ctx, resolver.address, [cnsRegistry.address, mintingController.address]);
        yield ctx.saveContractConfig(types_1.UnsContractName.WhitelistedMinter, {
            address: '0x0000000000000000000000000000000000000000',
        });
        yield ctx.saveContractConfig(types_1.UnsContractName.DomainZoneController, {
            address: '0x0000000000000000000000000000000000000000',
        });
        yield ctx.saveContractConfig(types_1.UnsContractName.TwitterValidationOperator, {
            address: '0x0000000000000000000000000000000000000000',
        });
        yield ctx.saveContractConfig(types_1.UnsContractName.FreeMinter, {
            address: '0x0000000000000000000000000000000000000000',
        });
    }),
    ensureDependencies: () => ({}),
};
exports.deployCNSForwardersTask = {
    tags: ['cns_forwarders', 'full'],
    priority: 5,
    run: (ctx, dependencies) => __awaiter(void 0, void 0, void 0, function* () {
        const { owner } = ctx.accounts;
        const [CNSRegistry, SignatureController, Resolver] = (0, helpers_1.unwrapDependencies)(dependencies, [
            types_1.ArtifactName.CNSRegistry,
            types_1.ArtifactName.SignatureController,
            types_1.ArtifactName.Resolver,
        ]);
        const cnsRegistryForwarder = yield ctx.artifacts.CNSRegistryForwarder.connect(owner).deploy(SignatureController.address);
        yield ctx.saveForwarderConfig(types_1.UnsContractName.CNSRegistry, cnsRegistryForwarder);
        yield cnsRegistryForwarder.deployTransaction.wait();
        yield (0, verify_1.default)(ctx, cnsRegistryForwarder.address, [SignatureController.address]);
        const resolverForwarder = yield ctx.artifacts.ResolverForwarder.connect(owner).deploy(CNSRegistry.address, Resolver.address);
        yield ctx.saveForwarderConfig(types_1.UnsContractName.Resolver, resolverForwarder);
        yield resolverForwarder.deployTransaction.wait();
        yield (0, verify_1.default)(ctx, resolverForwarder.address, [CNSRegistry.address, Resolver.address]);
    }),
    ensureDependencies: (ctx, config) => {
        config = (0, lodash_1.merge)(ctx.getDeployConfig(), config);
        const { CNSRegistry, SignatureController, Resolver } = config.contracts;
        const dependencies = {
            CNSRegistry,
            SignatureController,
            Resolver,
        };
        for (const [key, value] of Object.entries(dependencies)) {
            if (!value || !value.address) {
                throw new Error(`${key} contract not found for network ${hardhat_1.network.config.chainId}`);
            }
        }
        return dependencies;
    },
};
const deployUNSTask = {
    tags: ['uns', 'full'],
    priority: 10,
    run: (ctx, dependencies) => __awaiter(void 0, void 0, void 0, function* () {
        const { owner } = ctx.accounts;
        const [CNSRegistry, MintingController, URIPrefixController, Resolver, RootChainManager] = (0, helpers_1.unwrapDependencies)(dependencies, [
            types_1.ArtifactName.CNSRegistry,
            types_1.ArtifactName.MintingController,
            types_1.ArtifactName.URIPrefixController,
            types_1.ArtifactName.Resolver,
            types_1.ArtifactName.RootChainManager,
        ]);
        let unsRegistry;
        let mintingManager;
        let unsOperator;
        let proxyAdmin;
        let unsRegistryImpl;
        let mintingManagerImpl;
        let unsOperatorImpl;
        if (ctx.options.proxy) {
            unsRegistry = yield hardhat_1.upgrades.deployProxy(ctx.artifacts.UNSRegistry.connect(owner), [], { initializer: false });
            yield unsRegistry.deployTransaction.wait();
            mintingManager = yield hardhat_1.upgrades.deployProxy(ctx.artifacts.MintingManager.connect(owner), [], {
                initializer: false,
            });
            yield mintingManager.deployTransaction.wait();
            unsOperator = yield hardhat_1.upgrades.deployProxy(ctx.artifacts.UNSOperator.connect(owner), []);
            yield unsOperator.deployTransaction.wait();
            proxyAdmin = yield hardhat_1.upgrades.admin.getInstance();
            yield ctx.saveContractConfig(types_1.UnsContractName.ProxyAdmin, proxyAdmin);
            unsRegistryImpl = yield proxyAdmin.callStatic.getProxyImplementation(unsRegistry.address);
            yield ctx.saveContractConfig(types_1.UnsContractName.UNSRegistry, unsRegistry, unsRegistryImpl, unsRegistry);
            yield (0, verify_1.default)(ctx, unsRegistryImpl, []);
            mintingManagerImpl = yield proxyAdmin.callStatic.getProxyImplementation(mintingManager.address);
            yield ctx.saveContractConfig(types_1.UnsContractName.MintingManager, mintingManager, mintingManagerImpl);
            yield (0, verify_1.default)(ctx, mintingManagerImpl, []);
            unsOperatorImpl = yield proxyAdmin.callStatic.getProxyImplementation(unsOperator.address);
            yield ctx.saveContractConfig(types_1.UnsContractName.UNSOperator, unsOperator, unsOperatorImpl);
            yield (0, verify_1.default)(ctx, unsOperatorImpl, []);
        }
        else {
            unsRegistry = yield ctx.artifacts.UNSRegistry.connect(owner).deploy();
            yield ctx.saveContractConfig(types_1.UnsContractName.UNSRegistry, unsRegistry);
            yield unsRegistry.deployTransaction.wait();
            yield (0, verify_1.default)(ctx, unsRegistry.address, []);
            mintingManager = yield ctx.artifacts.MintingManager.connect(owner).deploy();
            yield ctx.saveContractConfig(types_1.UnsContractName.MintingManager, mintingManager);
            yield mintingManager.deployTransaction.wait();
            yield (0, verify_1.default)(ctx, mintingManager.address, []);
            unsOperator = yield ctx.artifacts.UNSOperator.connect(owner).deploy();
            yield ctx.saveContractConfig(types_1.UnsContractName.UNSOperator, unsOperator);
            yield unsOperator.deployTransaction.wait();
            yield (0, verify_1.default)(ctx, unsOperator.address, []);
        }
        const registryInitTx = yield unsRegistry
            .connect(owner)
            .initialize(mintingManager.address, CNSRegistry.address, RootChainManager.address, constants_1.ZERO_ADDRESS);
        yield registryInitTx.wait();
        const forwarder = yield ctx.artifacts.MintingManagerForwarder.connect(owner).deploy(mintingManager.address);
        yield ctx.saveForwarderConfig(types_1.UnsContractName.MintingManager, forwarder);
        yield forwarder.deployTransaction.wait();
        yield (0, verify_1.default)(ctx, forwarder.address, [mintingManager.address]);
        const mintingManagerInitTx = yield mintingManager
            .connect(owner)
            .initialize(unsRegistry.address, MintingController.address, URIPrefixController.address, Resolver.address, unsOperator.address, forwarder.address);
        yield mintingManagerInitTx.wait();
        if (ctx.minters.length) {
            const chunkSize = 100;
            for (let i = 0, j = ctx.minters.length; i < j; i += chunkSize) {
                const array = ctx.minters.slice(i, i + chunkSize);
                ctx.log('Adding minters...', array);
                const addMintersTx = yield mintingManager.connect(owner).addMinters(array);
                yield addMintersTx.wait();
                ctx.log(`Added ${array.length} minters`);
            }
        }
    }),
    ensureDependencies: (ctx, config) => {
        config = (0, lodash_1.merge)(ctx.getDeployConfig(), config);
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
                throw new Error(`${key} contract not found for network ${hardhat_1.network.config.chainId}`);
            }
        }
        return dependencies;
    },
};
const deployUNSProxyReaderTask = {
    tags: ['uns', 'uns_proxy_reader', 'full'],
    priority: 15,
    run: (ctx, dependencies) => __awaiter(void 0, void 0, void 0, function* () {
        const { owner } = ctx.accounts;
        const [UNSRegistry, CNSRegistry, MintingManager] = (0, helpers_1.unwrapDependencies)(dependencies, [
            types_1.ArtifactName.UNSRegistry,
            types_1.ArtifactName.CNSRegistry,
            types_1.ArtifactName.MintingManager,
        ]);
        const proxyReader = yield hardhat_1.upgrades.deployProxy(ctx.artifacts.ProxyReader.connect(owner), [UNSRegistry.address, CNSRegistry.address], { unsafeAllow: ['delegatecall'] });
        yield proxyReader.deployTransaction.wait();
        const proxyAdmin = yield hardhat_1.upgrades.admin.getInstance();
        yield ctx.saveContractConfig(types_1.UnsContractName.ProxyReader, proxyAdmin);
        const proxyReaderImpl = yield proxyAdmin.callStatic.getProxyImplementation(proxyReader.address);
        yield ctx.saveContractConfig(types_1.UnsContractName.ProxyReader, proxyReader, proxyReaderImpl);
        yield (0, verify_1.default)(ctx, proxyReaderImpl, []);
        const mintingManager = ctx.artifacts.MintingManager.attach(MintingManager.address);
        yield mintingManager.connect(owner).addProxyReaders([proxyReader.address]);
    }),
    ensureDependencies: (ctx, config) => {
        config = (0, lodash_1.merge)(ctx.getDeployConfig(), config);
        const { CNSRegistry, UNSRegistry, MintingManager } = config.contracts || {};
        const dependencies = {
            CNSRegistry,
            UNSRegistry,
            MintingManager,
        };
        for (const [key, value] of Object.entries(dependencies)) {
            if (!value || !value.address) {
                throw new Error(`${key} contract not found for network ${hardhat_1.network.config.chainId}`);
            }
        }
        return dependencies;
    },
};
const configureCNSTask = {
    tags: ['uns_config_cns', 'full'],
    priority: 20,
    run: (ctx, dependencies) => __awaiter(void 0, void 0, void 0, function* () {
        const { owner } = ctx.accounts;
        const [MintingController, URIPrefixController, MintingManager] = (0, helpers_1.unwrapDependencies)(dependencies, [
            types_1.ArtifactName.MintingController,
            types_1.ArtifactName.URIPrefixController,
            types_1.ArtifactName.MintingManager,
        ]);
        const mintingController = ctx.artifacts.MintingController.attach(MintingController.address).connect(owner);
        if (!(yield mintingController.isMinter(MintingManager.address))) {
            yield mintingController.addMinter(MintingManager.address);
        }
        const uriPrefixController = ctx.artifacts.URIPrefixController.attach(URIPrefixController.address).connect(owner);
        if (!(yield uriPrefixController.isWhitelisted(MintingManager.address))) {
            yield uriPrefixController.addWhitelisted(MintingManager.address);
        }
        if (hardhat_1.network.config.chainId === 1337) {
            const mintingManager = ctx.artifacts.MintingManager.attach(MintingManager.address).connect(owner);
            yield mintingManager.setTokenURIPrefix('https://example.com/');
        }
    }),
    ensureDependencies: (ctx, config) => {
        config = (0, lodash_1.merge)(ctx.getDeployConfig(), config);
        const { MintingController, URIPrefixController, MintingManager } = config.contracts || {};
        const dependencies = {
            MintingController,
            URIPrefixController,
            MintingManager,
        };
        for (const [key, value] of Object.entries(dependencies)) {
            if (!value || !value.address) {
                throw new Error(`${key} contract not found for network ${hardhat_1.network.config.chainId}`);
            }
        }
        return dependencies;
    },
};
const deployMMForwarderTask = {
    tags: ['uns_mm_forwarder'],
    priority: 100,
    run: (ctx, dependencies) => __awaiter(void 0, void 0, void 0, function* () {
        const { owner } = ctx.accounts;
        const MintingManager = (0, helpers_1.unwrap)(dependencies, types_1.ArtifactName.MintingManager);
        const forwarder = yield ctx.artifacts.MintingManagerForwarder.connect(owner).deploy(MintingManager.address);
        const mintingManager = ctx.artifacts.MintingManager.attach(MintingManager.address).connect(owner);
        yield mintingManager.setForwarder(forwarder.address);
        yield ctx.saveForwarderConfig(types_1.UnsContractName.MintingManager, forwarder);
        yield forwarder.deployTransaction.wait();
        yield (0, verify_1.default)(ctx, forwarder.address, [MintingManager.address]);
    }),
    ensureDependencies: (ctx, config) => {
        config = (0, lodash_1.merge)(ctx.getDeployConfig(), config);
        const { MintingManager } = config.contracts || {};
        const dependencies = { MintingManager };
        for (const [key, value] of Object.entries(dependencies)) {
            if (!value || !value.address) {
                throw new Error(`${key} contract not found for network ${hardhat_1.network.config.chainId}`);
            }
        }
        return dependencies;
    },
};
const deployUNSOperatorTask = {
    tags: ['uns_operator'],
    priority: 100,
    run: (ctx, dependencies) => __awaiter(void 0, void 0, void 0, function* () {
        const { owner } = ctx.accounts;
        const MintingManager = (0, helpers_1.unwrap)(dependencies, types_1.ArtifactName.MintingManager);
        const unsOperator = yield hardhat_1.upgrades.deployProxy(ctx.artifacts.UNSOperator.connect(owner), []);
        yield unsOperator.deployTransaction.wait();
        const proxyAdmin = yield hardhat_1.upgrades.admin.getInstance();
        const unsOperatorImpl = yield proxyAdmin.callStatic.getProxyImplementation(unsOperator.address);
        yield ctx.saveContractConfig(types_1.UnsContractName.UNSOperator, unsOperator, unsOperatorImpl);
        yield (0, verify_1.default)(ctx, unsOperatorImpl, []);
        const mintingManager = ctx.artifacts.MintingManager.attach(MintingManager.address);
        const setOperatorTx = yield mintingManager.connect(owner).setOperator(unsOperator.address);
        yield setOperatorTx.wait();
    }),
    ensureDependencies: (ctx, config) => {
        config = (0, lodash_1.merge)(ctx.getDeployConfig(), config);
        const { MintingManager, ProxyAdmin } = config.contracts || {};
        const dependencies = {
            MintingManager,
            ProxyAdmin,
        };
        for (const [key, value] of Object.entries(dependencies)) {
            if (!value || !value.address) {
                throw new Error(`${key} contract not found for network ${hardhat_1.network.config.chainId}`);
            }
        }
        return dependencies;
    },
};
const upgradeUNSRegistryTask = {
    tags: ['upgrade_registry'],
    priority: 100,
    run: (ctx, dependencies) => __awaiter(void 0, void 0, void 0, function* () {
        const UNSRegistry = (0, helpers_1.unwrap)(dependencies, types_1.ArtifactName.UNSRegistry);
        const unsRegistry = yield hardhat_1.upgrades.upgradeProxy(UNSRegistry.address, ctx.artifacts.UNSRegistry);
        yield unsRegistry.deployTransaction.wait();
        const proxyAdmin = yield hardhat_1.upgrades.admin.getInstance();
        yield ctx.saveContractConfig(types_1.UnsContractName.ProxyAdmin, proxyAdmin);
        const unsRegistryImpl = yield proxyAdmin.callStatic.getProxyImplementation(unsRegistry.address);
        yield ctx.saveContractConfig(types_1.UnsContractName.UNSRegistry, unsRegistry, unsRegistryImpl, unsRegistry);
        yield (0, verify_1.default)(ctx, unsRegistryImpl, []);
    }),
    ensureDependencies: (ctx, config) => {
        config = (0, lodash_1.merge)(ctx.getDeployConfig(), config);
        const { UNSRegistry, ProxyAdmin } = config.contracts || {};
        if (!ProxyAdmin || !ProxyAdmin.address) {
            throw new Error('Current network configuration does not support upgrading');
        }
        const dependencies = { UNSRegistry };
        for (const [key, value] of Object.entries(dependencies)) {
            if (!value || !value.address) {
                throw new Error(`${key} contract not found for network ${hardhat_1.network.config.chainId}`);
            }
        }
        return dependencies;
    },
};
const upgradeMintingManagerTask = {
    tags: ['upgrade_minting_manager'],
    priority: 100,
    run: (ctx, dependencies) => __awaiter(void 0, void 0, void 0, function* () {
        const MintingManager = (0, helpers_1.unwrap)(dependencies, types_1.ArtifactName.MintingManager);
        const mintingManager = yield hardhat_1.upgrades.upgradeProxy(MintingManager.address, ctx.artifacts.MintingManager);
        yield mintingManager.deployTransaction.wait();
        const proxyAdmin = yield hardhat_1.upgrades.admin.getInstance();
        yield ctx.saveContractConfig(types_1.UnsContractName.ProxyAdmin, proxyAdmin);
        const mintingManagerImpl = yield proxyAdmin.callStatic.getProxyImplementation(mintingManager.address);
        yield ctx.saveContractConfig(types_1.UnsContractName.MintingManager, mintingManager, mintingManagerImpl);
        yield (0, verify_1.default)(ctx, mintingManagerImpl, []);
    }),
    ensureDependencies: (ctx, config) => {
        config = (0, lodash_1.merge)(ctx.getDeployConfig(), config);
        const { MintingManager, ProxyAdmin } = config.contracts || {};
        if (!ProxyAdmin || !ProxyAdmin.address) {
            throw new Error('Current network configuration does not support upgrading');
        }
        const dependencies = { MintingManager };
        for (const [key, value] of Object.entries(dependencies)) {
            if (!value || !value.address) {
                throw new Error(`${key} contract not found for network ${hardhat_1.network.config.chainId}`);
            }
        }
        return dependencies;
    },
};
const upgradeProxyReaderTask = {
    tags: ['upgrade_proxy_reader'],
    priority: 105,
    run: (ctx, dependencies) => __awaiter(void 0, void 0, void 0, function* () {
        const ProxyReader = (0, helpers_1.unwrap)(dependencies, types_1.ArtifactName.ProxyReader);
        const proxyReader = yield hardhat_1.upgrades.upgradeProxy(ProxyReader.address, ctx.artifacts.ProxyReader, {
            unsafeAllow: ['delegatecall'],
        });
        yield proxyReader.deployTransaction.wait();
        const proxyAdmin = yield hardhat_1.upgrades.admin.getInstance();
        yield ctx.saveContractConfig(types_1.UnsContractName.ProxyAdmin, proxyAdmin);
        const proxyReaderImpl = yield proxyAdmin.callStatic.getProxyImplementation(proxyReader.address);
        yield ctx.saveContractConfig(types_1.UnsContractName.ProxyReader, proxyReader, proxyReaderImpl);
        yield (0, verify_1.default)(ctx, proxyReaderImpl, []);
    }),
    ensureDependencies: (ctx, config) => {
        config = (0, lodash_1.merge)(ctx.getDeployConfig(), config);
        const { ProxyReader, ProxyAdmin } = config.contracts || {};
        if (!ProxyAdmin || !ProxyAdmin.address) {
            throw new Error('Current network configuration does not support upgrading');
        }
        const dependencies = { ProxyReader };
        for (const [key, value] of Object.entries(dependencies)) {
            if (!value || !value.address) {
                throw new Error(`${key} contract not found for network ${hardhat_1.network.config.chainId}`);
            }
        }
        return dependencies;
    },
};
const upgradeUNSOperatorTask = {
    tags: ['upgrade_uns_operator'],
    priority: 105,
    run: (ctx, dependencies) => __awaiter(void 0, void 0, void 0, function* () {
        const UNSOperator = (0, helpers_1.unwrap)(dependencies, types_1.ArtifactName.UNSOperator);
        const unsOperator = yield hardhat_1.upgrades.upgradeProxy(UNSOperator.address, ctx.artifacts.UNSOperator);
        yield unsOperator.deployTransaction.wait();
        const proxyAdmin = yield hardhat_1.upgrades.admin.getInstance();
        yield ctx.saveContractConfig(types_1.UnsContractName.ProxyAdmin, proxyAdmin);
        const unsOperatorImpl = yield proxyAdmin.callStatic.getProxyImplementation(unsOperator.address);
        yield ctx.saveContractConfig(types_1.UnsContractName.UNSOperator, unsOperator, unsOperatorImpl);
        yield (0, verify_1.default)(ctx, unsOperatorImpl, []);
    }),
    ensureDependencies: (ctx, config) => {
        config = (0, lodash_1.merge)(ctx.getDeployConfig(), config);
        const { UNSOperator, ProxyAdmin } = config.contracts || {};
        if (!ProxyAdmin || !ProxyAdmin.address) {
            throw new Error('Current network configuration does not support upgrading');
        }
        const dependencies = { UNSOperator };
        for (const [key, value] of Object.entries(dependencies)) {
            if (!value || !value.address) {
                throw new Error(`${key} contract not found for network ${hardhat_1.network.config.chainId}`);
            }
        }
        return dependencies;
    },
};
const proposeUNSRegistryTask = {
    tags: ['propose_registry'],
    priority: 110,
    run: (ctx, dependencies, params) => __awaiter(void 0, void 0, void 0, function* () {
        const UNSRegistry = (0, helpers_1.unwrap)(dependencies, types_1.ArtifactName.UNSRegistry);
        const version = params === null || params === void 0 ? void 0 : params.version;
        if (!version) {
            throw new Error('Version parameter is not provided');
        }
        ctx.log('Preparing proposal...');
        const proposal = yield hardhat_1.defender.proposeUpgrade(UNSRegistry.address, ctx.artifacts.UNSRegistry, {
            title: `Propose UNSRegistry to v${version}`,
            multisig: ctx.multisig,
        });
        ctx.log('Upgrade proposal created at:', proposal.url);
    }),
    ensureDependencies: (ctx, config) => {
        config = (0, lodash_1.merge)(ctx.getDeployConfig(), config);
        const { UNSRegistry, ProxyAdmin } = config.contracts || {};
        if (!ProxyAdmin || !ProxyAdmin.address) {
            throw new Error('Current network configuration does not support upgrading');
        }
        const dependencies = { UNSRegistry };
        for (const [key, value] of Object.entries(dependencies)) {
            if (!value || !value.address) {
                throw new Error(`${key} contract not found for network ${hardhat_1.network.config.chainId}`);
            }
        }
        return dependencies;
    },
};
const proposeMintingManagerTask = {
    tags: ['propose_minting_manager'],
    priority: 110,
    run: (ctx, dependencies, params) => __awaiter(void 0, void 0, void 0, function* () {
        const MintingManager = (0, helpers_1.unwrap)(dependencies, types_1.ArtifactName.MintingManager);
        const version = params === null || params === void 0 ? void 0 : params.version;
        if (!version) {
            throw new Error('Version parameter is not provided');
        }
        ctx.log('Preparing proposal...');
        const proposal = yield hardhat_1.defender.proposeUpgrade(MintingManager.address, ctx.artifacts.MintingManager, {
            title: `Propose MintingManager to v${version}`,
            multisig: ctx.multisig,
        });
        ctx.log('Proposal:', JSON.stringify(proposal));
        ctx.log('Upgrade proposal created at:', proposal.url);
    }),
    ensureDependencies: (ctx, config) => {
        config = (0, lodash_1.merge)(ctx.getDeployConfig(), config);
        const { MintingManager, ProxyAdmin } = config.contracts || {};
        if (!ProxyAdmin || !ProxyAdmin.address) {
            throw new Error('Current network configuration does not support upgrading');
        }
        const dependencies = { MintingManager };
        for (const [key, value] of Object.entries(dependencies)) {
            if (!value || !value.address) {
                throw new Error(`${key} contract not found for network ${hardhat_1.network.config.chainId}`);
            }
        }
        return dependencies;
    },
};
const proposeProxyReaderTask = {
    tags: ['propose_proxy_reader'],
    priority: 110,
    run: (ctx, dependencies, params) => __awaiter(void 0, void 0, void 0, function* () {
        const ProxyReader = (0, helpers_1.unwrap)(dependencies, types_1.ArtifactName.ProxyReader);
        const version = params === null || params === void 0 ? void 0 : params.version;
        if (!version) {
            throw new Error('Version parameter is not provided');
        }
        ctx.log('Preparing proposal...');
        const proposal = yield hardhat_1.defender.proposeUpgrade(ProxyReader.address, ctx.artifacts.ProxyReader, {
            title: `Propose ProxyReader to v${version}`,
            multisig: ctx.multisig,
        });
        ctx.log('Upgrade proposal created at:', proposal.url);
    }),
    ensureDependencies: (ctx, config) => {
        config = (0, lodash_1.merge)(ctx.getDeployConfig(), config);
        const { ProxyReader, ProxyAdmin } = config.contracts || {};
        if (!ProxyAdmin || !ProxyAdmin.address) {
            throw new Error('Current network configuration does not support upgrading');
        }
        const dependencies = { ProxyReader };
        for (const [key, value] of Object.entries(dependencies)) {
            if (!value || !value.address) {
                throw new Error(`${key} contract not found for network ${hardhat_1.network.config.chainId}`);
            }
        }
        return dependencies;
    },
};
const deployPolygonPosBridgeTask = {
    tags: ['polygon_pos_bridge', 'full'],
    priority: 6,
    run: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const { owner } = ctx.accounts;
        const stateSender = yield ctx.artifacts.DummyStateSender.connect(owner).deploy();
        const checkpointManager = yield ctx.artifacts[types_1.ArtifactName.CheckpointManager].connect(owner).deploy();
        const predicate = yield ctx.artifacts.MintableERC721Predicate.connect(owner).deploy();
        yield predicate.initialize(owner.address);
        yield ctx.saveContractConfig(types_1.UnsContractName.MintableERC721Predicate, predicate);
        const rootChainManager = yield ctx.artifacts.RootChainManager.connect(owner).deploy();
        yield rootChainManager.initialize(owner.address);
        yield rootChainManager.setCheckpointManager(checkpointManager.address);
        yield rootChainManager.setStateSender(stateSender.address);
        yield ctx.saveContractConfig(types_1.UnsContractName.RootChainManager, rootChainManager);
    }),
    ensureDependencies: () => ({}),
};
const configurePolygonPosBridgeTask = {
    tags: ['config_polygon_pos_bridge'],
    priority: 120,
    run: (ctx, dependencies) => __awaiter(void 0, void 0, void 0, function* () {
        const { owner } = ctx.accounts;
        const [UNSRegistry, MintableERC721Predicate, RootChainManager] = (0, helpers_1.unwrapDependencies)(dependencies, [
            types_1.ArtifactName.UNSRegistry,
            types_1.ArtifactName.MintableERC721Predicate,
            types_1.ArtifactName.RootChainManager,
        ]);
        const rootChainManager = ctx.artifacts.RootChainManager.attach(RootChainManager.address).connect(owner);
        const tokenType = ethers_1.utils.keccak256(UNSRegistry.address);
        yield rootChainManager.registerPredicate(tokenType, MintableERC721Predicate.address);
        yield rootChainManager.mapToken(UNSRegistry.address, UNSRegistry.address, tokenType);
        const predicate = ctx.artifacts.MintableERC721Predicate.attach(MintableERC721Predicate.address).connect(owner);
        yield predicate.grantRole(yield predicate.MANAGER_ROLE(), rootChainManager.address);
    }),
    ensureDependencies: (ctx, config) => {
        config = (0, lodash_1.merge)(ctx.getDeployConfig(), config);
        const { UNSRegistry, MintableERC721Predicate, RootChainManager } = config.contracts || {};
        const dependencies = {
            UNSRegistry,
            MintableERC721Predicate,
            RootChainManager,
        };
        for (const [key, value] of Object.entries(dependencies)) {
            if (!value || !value.address) {
                throw new Error(`${key} contract not found for network ${hardhat_1.network.config.chainId}`);
            }
        }
        return dependencies;
    },
};
const deployDotCoinBurnerTask = {
    tags: ['dot_coin_burner', 'full'],
    priority: 200,
    run: (ctx, dependencies) => __awaiter(void 0, void 0, void 0, function* () {
        const { owner } = ctx.accounts;
        const UNSRegistry = (0, helpers_1.unwrap)(dependencies, types_1.ArtifactName.UNSRegistry);
        const dotCoinBurner = yield ctx.artifacts.DotCoinBurner.connect(owner).deploy(UNSRegistry.address);
        yield ctx.saveContractConfig(types_1.UnsContractName.DotCoinBurner, dotCoinBurner);
        yield dotCoinBurner.deployTransaction.wait();
        yield (0, verify_1.default)(ctx, dotCoinBurner.address, [UNSRegistry.address]);
    }),
    ensureDependencies: (ctx, config) => {
        config = (0, lodash_1.merge)(ctx.getDeployConfig(), config);
        const { UNSRegistry } = config.contracts || {};
        const dependencies = {
            UNSRegistry,
        };
        for (const [key, value] of Object.entries(dependencies)) {
            if (!value || !value.address) {
                throw new Error(`${key} contract not found for network ${hardhat_1.network.config.chainId}`);
            }
        }
        return dependencies;
    },
};
exports.tasks = [
    exports.deployCNSTask,
    exports.deployCNSForwardersTask,
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
];
