"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeNetworkConfig = exports.getNetworkConfig = exports.getConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const lodash_1 = require("lodash");
const configPath = './uns-config.json';
function getConfig() {
    const file = fs_1.default.existsSync(configPath) ? fs_1.default.readFileSync(configPath).toString() : '{}';
    return JSON.parse(file.length ? file : '{}');
}
exports.getConfig = getConfig;
function getNetworkConfig(chainId) {
    const { networks } = getConfig();
    return networks[chainId];
}
exports.getNetworkConfig = getNetworkConfig;
function mergeNetworkConfig(config) {
    const _config = (0, lodash_1.merge)(getConfig(), config);
    fs_1.default.writeFileSync(configPath, `${JSON.stringify(_config, null, 4)}\n`);
}
exports.mergeNetworkConfig = mergeNetworkConfig;
