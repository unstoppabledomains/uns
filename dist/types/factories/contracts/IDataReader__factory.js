"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDataReader__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "string[]",
                name: "keys",
                type: "string[]",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getData",
        outputs: [
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "keyHashes",
                type: "uint256[]",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getDataByHash",
        outputs: [
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "string[]",
                name: "keys",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "keyHashes",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]",
            },
        ],
        name: "getDataByHashForMany",
        outputs: [
            {
                internalType: "address[]",
                name: "resolvers",
                type: "address[]",
            },
            {
                internalType: "address[]",
                name: "owners",
                type: "address[]",
            },
            {
                internalType: "string[][]",
                name: "keys",
                type: "string[][]",
            },
            {
                internalType: "string[][]",
                name: "values",
                type: "string[][]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string[]",
                name: "keys",
                type: "string[]",
            },
            {
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]",
            },
        ],
        name: "getDataForMany",
        outputs: [
            {
                internalType: "address[]",
                name: "resolvers",
                type: "address[]",
            },
            {
                internalType: "address[]",
                name: "owners",
                type: "address[]",
            },
            {
                internalType: "string[][]",
                name: "values",
                type: "string[][]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]",
            },
        ],
        name: "ownerOfForMany",
        outputs: [
            {
                internalType: "address[]",
                name: "owners",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IDataReader__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IDataReader__factory = IDataReader__factory;
IDataReader__factory.abi = _abi;
