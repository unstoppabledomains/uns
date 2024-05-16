"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IURIPrefixController__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "prefix",
                type: "string",
            },
        ],
        name: "setTokenURIPrefix",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IURIPrefixController__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IURIPrefixController__factory = IURIPrefixController__factory;
IURIPrefixController__factory.abi = _abi;
