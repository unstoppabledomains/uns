"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRootChain__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "proposer",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "headerBlockId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "reward",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "start",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "end",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "root",
                type: "bytes32",
            },
        ],
        name: "NewHeaderBlock",
        type: "event",
    },
];
class IRootChain__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IRootChain__factory = IRootChain__factory;
IRootChain__factory.abi = _abi;
