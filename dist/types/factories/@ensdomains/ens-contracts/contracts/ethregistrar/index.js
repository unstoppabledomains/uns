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
exports.IPriceOracle__factory = exports.IETHRegistrarController__factory = exports.IBaseRegistrar__factory = exports.ETHRegistrarController__factory = exports.DummyOracle__factory = exports.BaseRegistrarImplementation__factory = exports.stablePriceOracleSol = void 0;
exports.stablePriceOracleSol = __importStar(require("./StablePriceOracle.sol"));
var BaseRegistrarImplementation__factory_1 = require("./BaseRegistrarImplementation__factory");
Object.defineProperty(exports, "BaseRegistrarImplementation__factory", { enumerable: true, get: function () { return BaseRegistrarImplementation__factory_1.BaseRegistrarImplementation__factory; } });
var DummyOracle__factory_1 = require("./DummyOracle__factory");
Object.defineProperty(exports, "DummyOracle__factory", { enumerable: true, get: function () { return DummyOracle__factory_1.DummyOracle__factory; } });
var ETHRegistrarController__factory_1 = require("./ETHRegistrarController__factory");
Object.defineProperty(exports, "ETHRegistrarController__factory", { enumerable: true, get: function () { return ETHRegistrarController__factory_1.ETHRegistrarController__factory; } });
var IBaseRegistrar__factory_1 = require("./IBaseRegistrar__factory");
Object.defineProperty(exports, "IBaseRegistrar__factory", { enumerable: true, get: function () { return IBaseRegistrar__factory_1.IBaseRegistrar__factory; } });
var IETHRegistrarController__factory_1 = require("./IETHRegistrarController__factory");
Object.defineProperty(exports, "IETHRegistrarController__factory", { enumerable: true, get: function () { return IETHRegistrarController__factory_1.IETHRegistrarController__factory; } });
var IPriceOracle__factory_1 = require("./IPriceOracle__factory");
Object.defineProperty(exports, "IPriceOracle__factory", { enumerable: true, get: function () { return IPriceOracle__factory_1.IPriceOracle__factory; } });
