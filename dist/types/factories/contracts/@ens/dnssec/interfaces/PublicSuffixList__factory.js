"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicSuffixList__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "bytes",
                name: "name",
                type: "bytes",
            },
        ],
        name: "isPublicSuffix",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class PublicSuffixList__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.PublicSuffixList__factory = PublicSuffixList__factory;
PublicSuffixList__factory.abi = _abi;
