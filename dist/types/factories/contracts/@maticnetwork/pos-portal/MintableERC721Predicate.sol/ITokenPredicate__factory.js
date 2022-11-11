"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITokenPredicate__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "address",
                name: "rootToken",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "logRLPList",
                type: "bytes",
            },
        ],
        name: "exitTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "depositor",
                type: "address",
            },
            {
                internalType: "address",
                name: "depositReceiver",
                type: "address",
            },
            {
                internalType: "address",
                name: "rootToken",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "depositData",
                type: "bytes",
            },
        ],
        name: "lockTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class ITokenPredicate__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ITokenPredicate__factory = ITokenPredicate__factory;
ITokenPredicate__factory.abi = _abi;
