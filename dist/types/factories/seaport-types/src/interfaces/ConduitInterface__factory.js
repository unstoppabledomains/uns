"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConduitInterface__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "channel",
                type: "address",
            },
        ],
        name: "ChannelClosed",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "channel",
                type: "address",
            },
            {
                internalType: "bool",
                name: "isOpen",
                type: "bool",
            },
        ],
        name: "ChannelStatusAlreadySet",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidController",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidItemType",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "channel",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "open",
                type: "bool",
            },
        ],
        name: "ChannelUpdated",
        type: "event",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "enum ConduitItemType",
                        name: "itemType",
                        type: "uint8",
                    },
                    {
                        internalType: "address",
                        name: "token",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "from",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "to",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "identifier",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                internalType: "struct ConduitTransfer[]",
                name: "transfers",
                type: "tuple[]",
            },
        ],
        name: "execute",
        outputs: [
            {
                internalType: "bytes4",
                name: "magicValue",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "token",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "from",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "to",
                        type: "address",
                    },
                    {
                        internalType: "uint256[]",
                        name: "ids",
                        type: "uint256[]",
                    },
                    {
                        internalType: "uint256[]",
                        name: "amounts",
                        type: "uint256[]",
                    },
                ],
                internalType: "struct ConduitBatch1155Transfer[]",
                name: "batch1155Transfers",
                type: "tuple[]",
            },
        ],
        name: "executeBatch1155",
        outputs: [
            {
                internalType: "bytes4",
                name: "magicValue",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "enum ConduitItemType",
                        name: "itemType",
                        type: "uint8",
                    },
                    {
                        internalType: "address",
                        name: "token",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "from",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "to",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "identifier",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                internalType: "struct ConduitTransfer[]",
                name: "standardTransfers",
                type: "tuple[]",
            },
            {
                components: [
                    {
                        internalType: "address",
                        name: "token",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "from",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "to",
                        type: "address",
                    },
                    {
                        internalType: "uint256[]",
                        name: "ids",
                        type: "uint256[]",
                    },
                    {
                        internalType: "uint256[]",
                        name: "amounts",
                        type: "uint256[]",
                    },
                ],
                internalType: "struct ConduitBatch1155Transfer[]",
                name: "batch1155Transfers",
                type: "tuple[]",
            },
        ],
        name: "executeWithBatch1155",
        outputs: [
            {
                internalType: "bytes4",
                name: "magicValue",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "channel",
                type: "address",
            },
            {
                internalType: "bool",
                name: "isOpen",
                type: "bool",
            },
        ],
        name: "updateChannel",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class ConduitInterface__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.ConduitInterface__factory = ConduitInterface__factory;
ConduitInterface__factory.abi = _abi;
