"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IWorkerSmartAccount__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "ExecuteFailed",
        type: "error",
    },
    {
        inputs: [],
        name: "NotSelf",
        type: "error",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "target",
                        type: "address",
                    },
                    {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                    },
                    {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                    },
                ],
                internalType: "struct IWorkerSmartAccount.Call[]",
                name: "calls",
                type: "tuple[]",
            },
        ],
        name: "executeBatch",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "target",
                        type: "address",
                    },
                    {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                    },
                    {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                    },
                ],
                internalType: "struct IWorkerSmartAccount.Call[]",
                name: "calls",
                type: "tuple[]",
            },
        ],
        name: "executeBatchAndEnsureBalance",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
];
class IWorkerSmartAccount__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IWorkerSmartAccount__factory = IWorkerSmartAccount__factory;
IWorkerSmartAccount__factory.abi = _abi;
