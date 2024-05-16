"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRootChainManager__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "tokenType",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "predicateAddress",
                type: "address",
            },
        ],
        name: "PredicateRegistered",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "rootToken",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "childToken",
                type: "address",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "tokenType",
                type: "bytes32",
            },
        ],
        name: "TokenMapped",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "rootToken",
                type: "address",
            },
            {
                internalType: "address",
                name: "childToken",
                type: "address",
            },
        ],
        name: "cleanMapToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
        ],
        name: "depositEtherFor",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
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
        name: "depositFor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "inputData",
                type: "bytes",
            },
        ],
        name: "exit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "rootToken",
                type: "address",
            },
            {
                internalType: "address",
                name: "childToken",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "tokenType",
                type: "bytes32",
            },
        ],
        name: "mapToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "tokenType",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "predicateAddress",
                type: "address",
            },
        ],
        name: "registerPredicate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "rootToken",
                type: "address",
            },
            {
                internalType: "address",
                name: "childToken",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "tokenType",
                type: "bytes32",
            },
        ],
        name: "remapToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IRootChainManager__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IRootChainManager__factory = IRootChainManager__factory;
IRootChainManager__factory.abi = _abi;
