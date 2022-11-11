"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IStateSender__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "syncState",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IStateSender__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IStateSender__factory = IStateSender__factory;
IStateSender__factory.abi = _abi;
