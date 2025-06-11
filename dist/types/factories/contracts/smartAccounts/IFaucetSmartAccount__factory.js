"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IFaucetSmartAccount__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "NotAuthorizedWorker",
        type: "error",
    },
    {
        inputs: [],
        name: "NotSelf",
        type: "error",
    },
    {
        inputs: [],
        name: "TransferFailed",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "workers",
                type: "address[]",
            },
        ],
        name: "addAuthorizedWorkers",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "workers",
                type: "address[]",
            },
        ],
        name: "removeAuthorizedWorkers",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "requestFunding",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "threshold",
                type: "uint256",
            },
        ],
        name: "setWorkerBalanceThreshold",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "setWorkerFundingAmount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "workerBalanceThreshold",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IFaucetSmartAccount__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IFaucetSmartAccount__factory = IFaucetSmartAccount__factory;
IFaucetSmartAccount__factory.abi = _abi;
