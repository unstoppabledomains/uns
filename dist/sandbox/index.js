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
exports.Sandbox = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const tar_1 = __importDefault(require("tar"));
const hdkey_1 = __importDefault(require("hdkey"));
const bip39_1 = require("bip39");
const secp256k1_1 = __importDefault(require("secp256k1"));
const keccak_1 = __importDefault(require("keccak"));
const debug_1 = __importDefault(require("debug"));
const helpers_1 = require("../src/helpers");
const ganache_service_1 = require("./ganache-service");
const log = (0, debug_1.default)('UNS:sandbox');
const DEFAULT_SERVER_CONFIG = {
    url: 'http://localhost:7545',
    gasPrice: 20000000000,
    gasLimit: 6721975,
    defaultBalanceEther: 1000,
    totalAccounts: 10,
    hardfork: 'london',
    allowUnlimitedContractSize: false,
    locked: false,
    hdPath: 'm/44\'/60\'/0\'/0/',
    keepAliveTimeout: 5000,
    mnemonic: 'mimic dune forward party defy island absorb insane deputy obvious brother immense',
    chainId: 1337,
    dbPath: './.sandbox',
    snapshotPath: path_1.default.join(__dirname, 'db.tgz'),
    vmErrorsOnRpcResponse: true,
    logger: { log: () => { } },
};
class Sandbox {
    constructor(service, options = {}) {
        this.ganacheService = service;
        this.options = options;
        this.provider = service.provider;
        this.snapshotId = undefined;
        this.version = '0.6';
        const accounts = this.getAccounts((0, helpers_1.unwrap)(this.options, 'network'));
        this.accounts || (this.accounts = {
            owner: accounts[0],
            minter: accounts[1],
            faucet: accounts[9],
        });
        accounts.forEach((account, index) => {
            this.accounts[index] = account;
        });
        log('Initialized sandbox', {
            options: this.options,
            accounts: this.accounts,
        });
    }
    static defaultNetworkOptions() {
        return {
            url: DEFAULT_SERVER_CONFIG.url,
            chainId: DEFAULT_SERVER_CONFIG.chainId,
            accounts: {
                mnemonic: DEFAULT_SERVER_CONFIG.mnemonic,
                path: DEFAULT_SERVER_CONFIG.hdPath,
                count: DEFAULT_SERVER_CONFIG.totalAccounts,
            },
        };
    }
    static start(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const sandbox = yield Sandbox.create(options);
            yield sandbox.start();
            return sandbox;
        });
    }
    static create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            options = Object.assign({ clean: true, extract: true, verbose: false }, options);
            const networkOptions = Object.assign(Object.assign({}, DEFAULT_SERVER_CONFIG), options.network);
            if (options.verbose) {
                debug_1.default.enable('UNS:sandbox*');
            }
            const { dbPath, snapshotPath } = networkOptions;
            if (options.clean) {
                if (fs_1.default.existsSync(dbPath)) {
                    fs_1.default.rmdirSync(dbPath, { recursive: true });
                }
                fs_1.default.mkdirSync(dbPath, { recursive: true });
                log(`Cleaned sandbox database. Path: ${dbPath}`);
            }
            if (options.extract) {
                yield tar_1.default.extract({ cwd: dbPath, file: snapshotPath });
                log(`Prepared sandbox database. [Source: ${snapshotPath}, TargetDir: ${dbPath}]`);
            }
            const service = new ganache_service_1.GanacheService(Object.assign({}, networkOptions));
            return new Sandbox(service, Object.assign(Object.assign({}, options), { network: networkOptions }));
        });
    }
    start(options = { noSnapshot: false }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ganacheService.startServer();
            log('Started sandbox');
            if (options.noSnapshot)
                return;
            this.snapshotId = yield this.snapshot();
            log('Created snapshot', this.snapshotId);
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ganacheService.stopServer();
                log('Stopped sandbox');
            }
            catch (e) {
                if (e.message.includes('Server is not running')) {
                    return;
                }
                throw e;
            }
        });
    }
    reset() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.snapshotId) {
                throw new Error('Snapshot not found. Most probably Sandbox has not been started.');
            }
            yield this.revert(this.snapshotId);
            log('Reverted snapshot', this.snapshotId);
            this.snapshotId = yield this.snapshot();
            log('Created snapshot', this.snapshotId);
        });
    }
    snapshot() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.provider.send('evm_snapshot');
        });
    }
    revert(snapshotId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.provider.send('evm_revert', [snapshotId]);
        });
    }
    getAccounts(options) {
        const { mnemonic, hdPath, totalAccounts } = options;
        const hdKey = hdkey_1.default.fromMasterSeed((0, bip39_1.mnemonicToSeedSync)(mnemonic));
        const accounts = Array(totalAccounts);
        for (let index = 0; index < totalAccounts; index++) {
            const acc = hdKey.derive(hdPath + index);
            accounts[index] = {
                privateKey: '0x' + acc.privateKey.toString('hex'),
                address: '0x' + this.uncompressedPublicKeyToAddress(acc.publicKey),
            };
        }
        return accounts;
    }
    uncompressedPublicKeyToAddress(uncompressedPublicKey) {
        var _a;
        const compresedPublicKey = secp256k1_1.default.publicKeyConvert(uncompressedPublicKey, false).slice(1);
        const hasher = (0, keccak_1.default)('keccak256');
        (_a = hasher['_state']) === null || _a === void 0 ? void 0 : _a.absorb(compresedPublicKey);
        return hasher.digest().subarray(-20).toString('hex');
    }
}
exports.Sandbox = Sandbox;
