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
exports.AnvilServer = void 0;
const child_process_1 = require("child_process");
const debug_1 = __importDefault(require("debug"));
const lodash_1 = __importDefault(require("lodash"));
const foundry_cli_1 = require("./foundry-cli");
const log = (0, debug_1.default)('UNS:sandbox');
const ANVIL_ARGUMENTS_MAP = {
    port: '--port',
    hostIpAddress: '--host',
    chainId: '--chain-id',
    hardfork: '--hardfork',
    gasPrice: '--gas-price',
    baseFeePerGas: '--block-base-fee-per-gas',
    gasLimit: '--gas-limit',
    mnemonic: '--mnemonic',
    hdPath: '--derivation-path',
    totalAccounts: '--accounts',
    defaultBalanceEther: '--balance',
    dumpStatePath: '--dump-state',
    loadStatePath: '--load-state',
    silent: '--silent',
    verbose: '-vvv',
};
const BLOCKS_TO_KEEP = 500;
class AnvilServer {
    constructor(anvil, options) {
        this._anvil = anvil;
        this.options = options;
    }
    static launch(options, inherit = false) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, foundry_cli_1.getAnvilCommand)();
            }
            catch (e) {
                yield (0, foundry_cli_1.installAnvil)();
            }
            if (!options.silent) {
                log('Launching anvil');
            }
            const anvilPath = (_a = options.anvilCliPath) !== null && _a !== void 0 ? _a : (yield (0, foundry_cli_1.getAnvilCommand)());
            const args = [];
            for (const [key, value] of Object.entries(options)) {
                if (!value) {
                    continue;
                }
                const arg = ANVIL_ARGUMENTS_MAP[key];
                if (arg) {
                    if (lodash_1.default.isBoolean(value) && value) {
                        args.push(arg);
                    }
                    else {
                        args.push(arg, value);
                    }
                }
            }
            args.push('--disable-default-create2-deployer');
            args.push('--prune-history', BLOCKS_TO_KEEP);
            args.push('--order', 'fifo');
            args.push('--transaction-block-keeper', BLOCKS_TO_KEEP);
            const opts = inherit ? { stdio: 'inherit' } : {};
            const anvil = (0, child_process_1.spawn)(anvilPath, args, opts);
            anvil.on('close', (code) => {
                log(`anvil child process exited with code ${code}`);
            });
            process.on('exit', function () {
                anvil.kill();
            });
            if (!inherit) {
                let serverReady = false;
                (_b = anvil.stdout) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
                    const output = data.toString();
                    if (output.includes('Listening')) {
                        serverReady = true;
                    }
                    if (!options.silent) {
                        log(`${data}`);
                    }
                });
                (_c = anvil.stderr) === null || _c === void 0 ? void 0 : _c.on('data', (data) => {
                    log(`${data}`);
                });
                const retries = 30;
                for (let i = 0; i < retries; i++) {
                    if (serverReady) {
                        if (!options.silent) {
                            log('anvil server ready');
                        }
                        break;
                    }
                    yield new Promise((resolve) => setTimeout(resolve, 100));
                }
            }
            return new AnvilServer(anvil, options);
        });
    }
    kill() {
        var _a;
        (_a = this._anvil) === null || _a === void 0 ? void 0 : _a.kill();
    }
}
exports.AnvilServer = AnvilServer;
