"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IETHRegistrarController__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        name: "available",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "commit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "bytes[]",
                name: "",
                type: "bytes[]",
            },
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
            {
                internalType: "uint16",
                name: "",
                type: "uint16",
            },
        ],
        name: "makeCommitment",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "bytes[]",
                name: "",
                type: "bytes[]",
            },
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
            {
                internalType: "uint16",
                name: "",
                type: "uint16",
            },
        ],
        name: "register",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "renew",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "rentPrice",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "base",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "premium",
                        type: "uint256",
                    },
                ],
                internalType: "struct IPriceOracle.Price",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IETHRegistrarController__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IETHRegistrarController__factory = IETHRegistrarController__factory;
IETHRegistrarController__factory.abi = _abi;
