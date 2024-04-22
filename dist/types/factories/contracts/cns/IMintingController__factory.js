"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMintingController__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
        ],
        name: "mintSLD",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
        ],
        name: "mintSLDWithResolver",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
        ],
        name: "safeMintSLD",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeMintSLD",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeMintSLDWithResolver",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
        ],
        name: "safeMintSLDWithResolver",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IMintingController__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IMintingController__factory = IMintingController__factory;
IMintingController__factory.abi = _abi;
