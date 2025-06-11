"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISmartAccount__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "NotSelf",
        type: "error",
    },
];
class ISmartAccount__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.ISmartAccount__factory = ISmartAccount__factory;
ISmartAccount__factory.abi = _abi;
