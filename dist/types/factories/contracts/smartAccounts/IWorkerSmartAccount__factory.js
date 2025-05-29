"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IWorkerSmartAccount__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address[]",
                name: "targets",
                type: "address[]",
            },
            {
                internalType: "bytes[]",
                name: "datas",
                type: "bytes[]",
            },
            {
                internalType: "uint256[]",
                name: "values",
                type: "uint256[]",
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
                internalType: "address[]",
                name: "targets",
                type: "address[]",
            },
            {
                internalType: "bytes[]",
                name: "datas",
                type: "bytes[]",
            },
            {
                internalType: "uint256[]",
                name: "values",
                type: "uint256[]",
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
