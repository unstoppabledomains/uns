"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IERC1155Upgradeable__factory = exports.IERC1155ReceiverUpgradeable__factory = exports.ERC1155Upgradeable__factory = exports.presets = exports.extensions = void 0;
exports.extensions = __importStar(require("./extensions"));
exports.presets = __importStar(require("./presets"));
var ERC1155Upgradeable__factory_1 = require("./ERC1155Upgradeable__factory");
Object.defineProperty(exports, "ERC1155Upgradeable__factory", { enumerable: true, get: function () { return ERC1155Upgradeable__factory_1.ERC1155Upgradeable__factory; } });
var IERC1155ReceiverUpgradeable__factory_1 = require("./IERC1155ReceiverUpgradeable__factory");
Object.defineProperty(exports, "IERC1155ReceiverUpgradeable__factory", { enumerable: true, get: function () { return IERC1155ReceiverUpgradeable__factory_1.IERC1155ReceiverUpgradeable__factory; } });
var IERC1155Upgradeable__factory_1 = require("./IERC1155Upgradeable__factory");
Object.defineProperty(exports, "IERC1155Upgradeable__factory", { enumerable: true, get: function () { return IERC1155Upgradeable__factory_1.IERC1155Upgradeable__factory; } });
