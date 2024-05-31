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
exports.installAnvil = exports.getAnvilCommand = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const FOUNDRY_VERSION = 'nightly-de33b6af53005037b463318d2628b5cfcaf39916';
function getAnvilCommand() {
    return __awaiter(this, void 0, void 0, function* () {
        const cmd = foundryAnvilBinPath();
        const commandExists = yield checkCommand(`${cmd} --version`);
        if (!commandExists) {
            throw new Error('Anvil not found');
        }
        return cmd;
    });
}
exports.getAnvilCommand = getAnvilCommand;
function installAnvil() {
    return __awaiter(this, void 0, void 0, function* () {
        const checkAnvilCommandCli = `${foundryAnvilBinPath()} --version`;
        if (!(yield checkCommand(checkAnvilCommandCli))) {
            if (!(yield runFoundryUp())) {
                throw new Error('Failed to install anvil');
            }
            if (!(yield checkCommand(checkAnvilCommandCli))) {
                throw new Error('Failed to install anvil');
            }
        }
    });
}
exports.installAnvil = installAnvil;
function checkCommand(cmd) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            const process = (0, child_process_1.exec)(cmd);
            process.on('exit', (code) => {
                resolve(code === 0);
            });
        });
    });
}
function runFoundryUp() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            (0, child_process_1.execSync)(`chmod +x ${foundryUpBinPath()}`);
            const p = (0, child_process_1.spawn)('/bin/bash', ['-c', foundryUpBinPath()], {
                stdio: 'inherit',
                env: Object.assign(Object.assign({}, process.env), { FOUNDRY_DIR: foundryDir(), FOUNDRYUP_VERSION: FOUNDRY_VERSION }),
            });
            p.on('exit', (code) => {
                resolve(code === 0);
            });
        });
    });
}
function foundryDir() {
    return path_1.default.join(__dirname, 'foundry');
}
function foundryBinDir() {
    return path_1.default.join(foundryDir(), 'bin');
}
function foundryAnvilBinPath() {
    return path_1.default.join(foundryBinDir(), 'anvil');
}
function foundryUpBinPath() {
    return path_1.default.join(foundryDir(), 'foundryup.sh');
}
