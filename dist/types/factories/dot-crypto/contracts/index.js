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
exports.Resolver__factory = exports.IResolverReader__factory = exports.IResolver__factory = exports.IRegistryReader__factory = exports.ICNSRegistry__factory = exports.CNSRegistry__factory = exports.util = exports.controllers = void 0;
exports.controllers = __importStar(require("./controllers"));
exports.util = __importStar(require("./util"));
var CNSRegistry__factory_1 = require("./CNSRegistry__factory");
Object.defineProperty(exports, "CNSRegistry__factory", { enumerable: true, get: function () { return CNSRegistry__factory_1.CNSRegistry__factory; } });
var ICNSRegistry__factory_1 = require("./ICNSRegistry__factory");
Object.defineProperty(exports, "ICNSRegistry__factory", { enumerable: true, get: function () { return ICNSRegistry__factory_1.ICNSRegistry__factory; } });
var IRegistryReader__factory_1 = require("./IRegistryReader__factory");
Object.defineProperty(exports, "IRegistryReader__factory", { enumerable: true, get: function () { return IRegistryReader__factory_1.IRegistryReader__factory; } });
var IResolver__factory_1 = require("./IResolver__factory");
Object.defineProperty(exports, "IResolver__factory", { enumerable: true, get: function () { return IResolver__factory_1.IResolver__factory; } });
var IResolverReader__factory_1 = require("./IResolverReader__factory");
Object.defineProperty(exports, "IResolverReader__factory", { enumerable: true, get: function () { return IResolverReader__factory_1.IResolverReader__factory; } });
var Resolver__factory_1 = require("./Resolver__factory");
Object.defineProperty(exports, "Resolver__factory", { enumerable: true, get: function () { return Resolver__factory_1.Resolver__factory; } });
