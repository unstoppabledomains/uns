"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ILTOCustody__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "InvalidBuyer",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidOrder",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidRecipient",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidSeller",
        type: "error",
    },
    {
        inputs: [],
        name: "LTOAlreadyInitiated",
        type: "error",
    },
    {
        inputs: [],
        name: "LTONotInitiated",
        type: "error",
    },
    {
        inputs: [],
        name: "OrderIsNotFulfilled",
        type: "error",
    },
    {
        inputs: [],
        name: "TokenAlreadyInLTO",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "ltoId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "buyer",
                type: "address",
            },
        ],
        name: "AssetBuyerChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "ltoId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "seller",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "buyer",
                type: "address",
            },
        ],
        name: "AssetDeposited",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "ltoId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "AssetReleased",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "ltoId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "seller",
                type: "address",
            },
        ],
        name: "AssetSellerChanged",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "ltoId",
                type: "uint256",
            },
        ],
        name: "cancel",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "ltoId",
                type: "uint256",
            },
        ],
        name: "complete",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "seller",
                type: "address",
            },
            {
                internalType: "address",
                name: "buyer",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "counter",
                type: "uint256",
            },
        ],
        name: "getLtoCustodyId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "seller",
                type: "address",
            },
            {
                internalType: "address",
                name: "buyer",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "initiateLTO",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "offerer",
                                type: "address",
                            },
                            {
                                internalType: "address",
                                name: "zone",
                                type: "address",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                ],
                                internalType: "struct OfferItem[]",
                                name: "offer",
                                type: "tuple[]",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "address payable",
                                        name: "recipient",
                                        type: "address",
                                    },
                                ],
                                internalType: "struct ConsiderationItem[]",
                                name: "consideration",
                                type: "tuple[]",
                            },
                            {
                                internalType: "enum OrderType",
                                name: "orderType",
                                type: "uint8",
                            },
                            {
                                internalType: "uint256",
                                name: "startTime",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "endTime",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "zoneHash",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "salt",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "conduitKey",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "totalOriginalConsiderationItems",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct OrderParameters",
                        name: "parameters",
                        type: "tuple",
                    },
                    {
                        internalType: "uint120",
                        name: "numerator",
                        type: "uint120",
                    },
                    {
                        internalType: "uint120",
                        name: "denominator",
                        type: "uint120",
                    },
                    {
                        internalType: "bytes",
                        name: "signature",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "extraData",
                        type: "bytes",
                    },
                ],
                internalType: "struct AdvancedOrder",
                name: "advancedOrder",
                type: "tuple",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "orderIndex",
                        type: "uint256",
                    },
                    {
                        internalType: "enum Side",
                        name: "side",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "index",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "identifier",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32[]",
                        name: "criteriaProof",
                        type: "bytes32[]",
                    },
                ],
                internalType: "struct CriteriaResolver[]",
                name: "criteriaResolvers",
                type: "tuple[]",
            },
            {
                internalType: "bytes32",
                name: "fulfillerConduitKey",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
        ],
        name: "initiateLTOFromOrder",
        outputs: [],
        stateMutability: "nonpayable",
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
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "setMany",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "ltoId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "buyer",
                type: "address",
            },
        ],
        name: "transferBuyer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "ltoId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "seller",
                type: "address",
            },
        ],
        name: "transferSeller",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class ILTOCustody__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.ILTOCustody__factory = ILTOCustody__factory;
ILTOCustody__factory.abi = _abi;
