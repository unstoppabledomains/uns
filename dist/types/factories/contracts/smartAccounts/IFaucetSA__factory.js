"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IFaucetSA__factory = void 0;
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
        inputs: [],
        name: "fundWorker",
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
class IFaucetSA__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IFaucetSA__factory = IFaucetSA__factory;
IFaucetSA__factory.abi = _abi;
