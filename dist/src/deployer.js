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
exports.Deployer = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const hardhat_1 = require("hardhat");
const lodash_1 = require("lodash");
const debug_1 = __importDefault(require("debug"));
const tasks_1 = require("./tasks");
const helpers_1 = require("./helpers");
const log = (0, debug_1.default)('UNS:deployer');
const DEFAULT_OPTIONS = {
    basePath: './.deployer',
    proxy: true,
};
function getArtifacts() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            CNSRegistry: yield hardhat_1.ethers.getContractFactory('CNSRegistry'),
            CNSRegistryForwarder: yield hardhat_1.ethers.getContractFactory('CNSRegistryForwarder'),
            SignatureController: yield hardhat_1.ethers.getContractFactory('SignatureController'),
            MintingController: yield hardhat_1.ethers.getContractFactory('MintingController'),
            URIPrefixController: yield hardhat_1.ethers.getContractFactory('URIPrefixController'),
            Resolver: yield hardhat_1.ethers.getContractFactory('Resolver'),
            ResolverForwarder: yield hardhat_1.ethers.getContractFactory('ResolverForwarder'),
            UNSRegistry: yield hardhat_1.ethers.getContractFactory('UNSRegistry'),
            MintingManager: yield hardhat_1.ethers.getContractFactory('MintingManager'),
            UNSOperator: yield hardhat_1.ethers.getContractFactory('UNSOperator'),
            MintingManagerForwarder: yield hardhat_1.ethers.getContractFactory('MintingManagerForwarder'),
            ProxyReader: yield hardhat_1.ethers.getContractFactory('contracts/ProxyReader.sol:ProxyReader'),
            DummyStateSender: yield hardhat_1.ethers.getContractFactory('DummyStateSender'),
            SimpleCheckpointManager: yield hardhat_1.ethers.getContractFactory('SimpleCheckpointManager'),
            MintableERC721Predicate: yield hardhat_1.ethers.getContractFactory('MintableERC721Predicate'),
            RootChainManager: yield hardhat_1.ethers.getContractFactory('RootChainManager'),
            DotCoinBurner: yield hardhat_1.ethers.getContractFactory('DotCoinBurner'),
        };
    });
}
class Deployer {
    constructor(options, artifacts, accounts, minters, multisig) {
        if (!multisig && hardhat_1.network.name !== 'sandbox') {
            throw new Error('Multisig address is not set');
        }
        this.options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        this.artifacts = artifacts;
        this.accounts = accounts;
        this.minters = minters;
        this.multisig = multisig;
        this.network = hardhat_1.network.config;
        this.log = log;
        debug_1.default.enable('UNS:deployer');
        const { basePath } = this.options;
        if (!fs_1.default.existsSync(basePath)) {
            fs_1.default.mkdirSync(basePath);
        }
        this.log('Initialized deployer', {
            options: this.options,
            artifacts: Object.keys(artifacts),
            accounts: Object.values(accounts)
                .filter((a) => !!a)
                .map((a) => a.address),
            minters,
        });
    }
    static create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const [owner] = yield hardhat_1.ethers.getSigners();
            const _unsConfig = hardhat_1.config.uns;
            return new Deployer(options !== null && options !== void 0 ? options : DEFAULT_OPTIONS, yield getArtifacts(), { owner }, _unsConfig.minters[hardhat_1.network.name], _unsConfig.multisig[hardhat_1.network.name]);
        });
    }
    execute(tags, config, params) {
        return __awaiter(this, void 0, void 0, function* () {
            tags = tags || [];
            this.log('Execution started');
            for (const task of tasks_1.tasks.sort((a, b) => a.priority - b.priority)) {
                if (!tags.some((t) => task.tags.includes(t.toLowerCase())))
                    continue;
                this.log('Executing task', { tags: task.tags, params });
                const dependencies = task.ensureDependencies(this, config);
                yield task.run(this, dependencies, params);
            }
            const _config = this.getNetworkConfig();
            this.log('Execution completed', JSON.stringify(_config));
            return _config;
        });
    }
    getNetworkConfig() {
        const config = this.getDeployConfig();
        const emptyConfig = {
            address: '0x0000000000000000000000000000000000000000',
            legacyAddresses: [],
            deploymentBlock: '0x0',
        };
        const contracts = {};
        for (const [key, value] of Object.entries(config.contracts || {})) {
            contracts[key] = Object.assign(Object.assign({}, emptyConfig), { address: value.address, implementation: value.implementation, deploymentBlock: value.transaction && hardhat_1.ethers.BigNumber.from(value.transaction.blockNumber).toHexString(), forwarder: value.forwarder });
        }
        return {
            networks: {
                [(0, helpers_1.unwrap)(this.network, 'chainId')]: {
                    contracts: contracts,
                },
            },
        };
    }
    getDeployConfig() {
        const configPath = path_1.default.resolve(this.options.basePath, `${this.network.chainId}.json`);
        const file = fs_1.default.existsSync(configPath) ? fs_1.default.readFileSync(configPath).toString() : '{}';
        return JSON.parse(file.length ? file : '{}');
    }
    saveContractConfig(name, contract, implAddress, forwarder) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.getDeployConfig();
            const _config = (0, lodash_1.merge)(config, {
                contracts: {
                    [name]: {
                        address: contract.address,
                        implementation: implAddress,
                        transaction: contract.deployTransaction && (yield contract.deployTransaction.wait()),
                        forwarder: forwarder && forwarder.address,
                    },
                },
            });
            this._saveConfig(_config);
        });
    }
    saveForwarderConfig(name, contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.getDeployConfig();
            const _config = (0, lodash_1.merge)(config, {
                contracts: {
                    [name]: Object.assign(Object.assign({}, ((config.contracts || {})[name] || {})), { forwarder: contract.address }),
                },
            });
            this._saveConfig(_config);
        });
    }
    _saveConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const configPath = path_1.default.resolve(this.options.basePath, `${this.network.chainId}.json`);
            fs_1.default.writeFileSync(configPath, JSON.stringify(config, null, 2));
        });
    }
}
exports.Deployer = Deployer;
