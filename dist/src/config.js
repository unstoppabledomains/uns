"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeNetworkConfig = exports.getNetworkConfig = exports.getConfig = exports.NameService = void 0;
const fs_1 = __importDefault(require("fs"));
const lodash_1 = require("lodash");
var NameService;
(function (NameService) {
    NameService["UNS"] = "UNS";
    NameService["ENS"] = "ENS";
})(NameService = exports.NameService || (exports.NameService = {}));
const configPathMap = {
    UNS: './uns-config.json',
    ENS: './ens-config.json',
};
function getConfig(nameService = NameService.UNS) {
    const path = configPathMap[nameService];
    const file = fs_1.default.existsSync(path) ? fs_1.default.readFileSync(path).toString() : '{}';
    return JSON.parse(file.length ? file : '{}');
}
exports.getConfig = getConfig;
function getNetworkConfig(chainId, nameService = NameService.UNS) {
    const { networks } = getConfig(nameService);
    return networks[chainId];
}
exports.getNetworkConfig = getNetworkConfig;
function mergeNetworkConfig(config, nameService = NameService.UNS) {
    const _config = (0, lodash_1.merge)(getConfig(nameService), config);
    fs_1.default.writeFileSync(configPathMap[nameService], `${JSON.stringify(_config, null, 4)}\n`);
}
exports.mergeNetworkConfig = mergeNetworkConfig;
