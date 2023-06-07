"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPubkeyResolver__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "x",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "y",
                type: "bytes32",
            },
        ],
        name: "PubkeyChanged",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "pubkey",
        outputs: [
            {
                internalType: "bytes32",
                name: "x",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "y",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IPubkeyResolver__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IPubkeyResolver__factory = IPubkeyResolver__factory;
IPubkeyResolver__factory.abi = _abi;
