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
exports.UNSRegistry__factory = exports.UNSOperator__factory = exports.RootRegistry__factory = exports.RecordStorage__factory = exports.ProxyReader__factory = exports.MintingManager__factory = exports.KeyStorage__factory = exports.IUNSRegistry__factory = exports.IRootRegistry__factory = exports.IReverseRegistry__factory = exports.IRegistryReader__factory = exports.IRecordStorage__factory = exports.IRecordReader__factory = exports.IMintingManager__factory = exports.IERC1967__factory = exports.IDataReader__factory = exports.IAddressReader__factory = exports.DotCoinBurner__factory = exports.ChildRegistry__factory = exports.utils = exports.roles = exports.mocks = exports.metatx = exports.history = exports.cns = exports.maticnetwork = void 0;
exports.maticnetwork = __importStar(require("./@maticnetwork"));
exports.cns = __importStar(require("./cns"));
exports.history = __importStar(require("./history"));
exports.metatx = __importStar(require("./metatx"));
exports.mocks = __importStar(require("./mocks"));
exports.roles = __importStar(require("./roles"));
exports.utils = __importStar(require("./utils"));
var ChildRegistry__factory_1 = require("./ChildRegistry__factory");
Object.defineProperty(exports, "ChildRegistry__factory", { enumerable: true, get: function () { return ChildRegistry__factory_1.ChildRegistry__factory; } });
var DotCoinBurner__factory_1 = require("./DotCoinBurner__factory");
Object.defineProperty(exports, "DotCoinBurner__factory", { enumerable: true, get: function () { return DotCoinBurner__factory_1.DotCoinBurner__factory; } });
var IAddressReader__factory_1 = require("./IAddressReader__factory");
Object.defineProperty(exports, "IAddressReader__factory", { enumerable: true, get: function () { return IAddressReader__factory_1.IAddressReader__factory; } });
var IDataReader__factory_1 = require("./IDataReader__factory");
Object.defineProperty(exports, "IDataReader__factory", { enumerable: true, get: function () { return IDataReader__factory_1.IDataReader__factory; } });
var IERC1967__factory_1 = require("./IERC1967__factory");
Object.defineProperty(exports, "IERC1967__factory", { enumerable: true, get: function () { return IERC1967__factory_1.IERC1967__factory; } });
var IMintingManager__factory_1 = require("./IMintingManager__factory");
Object.defineProperty(exports, "IMintingManager__factory", { enumerable: true, get: function () { return IMintingManager__factory_1.IMintingManager__factory; } });
var IRecordReader__factory_1 = require("./IRecordReader__factory");
Object.defineProperty(exports, "IRecordReader__factory", { enumerable: true, get: function () { return IRecordReader__factory_1.IRecordReader__factory; } });
var IRecordStorage__factory_1 = require("./IRecordStorage__factory");
Object.defineProperty(exports, "IRecordStorage__factory", { enumerable: true, get: function () { return IRecordStorage__factory_1.IRecordStorage__factory; } });
var IRegistryReader__factory_1 = require("./IRegistryReader__factory");
Object.defineProperty(exports, "IRegistryReader__factory", { enumerable: true, get: function () { return IRegistryReader__factory_1.IRegistryReader__factory; } });
var IReverseRegistry__factory_1 = require("./IReverseRegistry__factory");
Object.defineProperty(exports, "IReverseRegistry__factory", { enumerable: true, get: function () { return IReverseRegistry__factory_1.IReverseRegistry__factory; } });
var IRootRegistry__factory_1 = require("./IRootRegistry__factory");
Object.defineProperty(exports, "IRootRegistry__factory", { enumerable: true, get: function () { return IRootRegistry__factory_1.IRootRegistry__factory; } });
var IUNSRegistry__factory_1 = require("./IUNSRegistry__factory");
Object.defineProperty(exports, "IUNSRegistry__factory", { enumerable: true, get: function () { return IUNSRegistry__factory_1.IUNSRegistry__factory; } });
var KeyStorage__factory_1 = require("./KeyStorage__factory");
Object.defineProperty(exports, "KeyStorage__factory", { enumerable: true, get: function () { return KeyStorage__factory_1.KeyStorage__factory; } });
var MintingManager__factory_1 = require("./MintingManager__factory");
Object.defineProperty(exports, "MintingManager__factory", { enumerable: true, get: function () { return MintingManager__factory_1.MintingManager__factory; } });
var ProxyReader__factory_1 = require("./ProxyReader__factory");
Object.defineProperty(exports, "ProxyReader__factory", { enumerable: true, get: function () { return ProxyReader__factory_1.ProxyReader__factory; } });
var RecordStorage__factory_1 = require("./RecordStorage__factory");
Object.defineProperty(exports, "RecordStorage__factory", { enumerable: true, get: function () { return RecordStorage__factory_1.RecordStorage__factory; } });
var RootRegistry__factory_1 = require("./RootRegistry__factory");
Object.defineProperty(exports, "RootRegistry__factory", { enumerable: true, get: function () { return RootRegistry__factory_1.RootRegistry__factory; } });
var UNSOperator__factory_1 = require("./UNSOperator__factory");
Object.defineProperty(exports, "UNSOperator__factory", { enumerable: true, get: function () { return UNSOperator__factory_1.UNSOperator__factory; } });
var UNSRegistry__factory_1 = require("./UNSRegistry__factory");
Object.defineProperty(exports, "UNSRegistry__factory", { enumerable: true, get: function () { return UNSRegistry__factory_1.UNSRegistry__factory; } });
