"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NSEC3Digest__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "bytes",
                name: "salt",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                internalType: "uint256",
                name: "iterations",
                type: "uint256",
            },
        ],
        name: "hash",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
];
class NSEC3Digest__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.NSEC3Digest__factory = NSEC3Digest__factory;
NSEC3Digest__factory.abi = _abi;
