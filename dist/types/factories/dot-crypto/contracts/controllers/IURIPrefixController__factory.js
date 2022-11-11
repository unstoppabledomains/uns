"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IURIPrefixController__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: false,
        inputs: [
            {
                internalType: "string",
                name: "prefix",
                type: "string",
            },
        ],
        name: "setTokenURIPrefix",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IURIPrefixController__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IURIPrefixController__factory = IURIPrefixController__factory;
IURIPrefixController__factory.abi = _abi;
