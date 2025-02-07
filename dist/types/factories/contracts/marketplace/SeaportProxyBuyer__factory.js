"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeaportProxyBuyer__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "InvalidForwardedToken",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidFulfiller",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidSignature",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidZone",
        type: "error",
    },
    {
        inputs: [],
        name: "OrderIsNotFulfiled",
        type: "error",
    },
    {
        inputs: [],
        name: "RecipientIsZeroAddress",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "version",
                type: "uint8",
            },
        ],
        name: "Initialized",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "Paused",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32",
            },
        ],
        name: "RoleAdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleRevoked",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "Unpaused",
        type: "event",
    },
    {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MINTER_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "NAME",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "VERSION",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "addMinter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "accounts",
                type: "address[]",
            },
        ],
        name: "addMinters",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "orderHash",
                        type: "bytes32",
                    },
                    {
                        internalType: "address",
                        name: "fulfiller",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "offerer",
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
                                name: "identifier",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "amount",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct SpentItem[]",
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
                                name: "identifier",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "amount",
                                type: "uint256",
                            },
                            {
                                internalType: "address payable",
                                name: "recipient",
                                type: "address",
                            },
                        ],
                        internalType: "struct ReceivedItem[]",
                        name: "consideration",
                        type: "tuple[]",
                    },
                    {
                        internalType: "bytes",
                        name: "extraData",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes32[]",
                        name: "orderHashes",
                        type: "bytes32[]",
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
                ],
                internalType: "struct ZoneParameters",
                name: "",
                type: "tuple",
            },
        ],
        name: "authorizeOrder",
        outputs: [
            {
                internalType: "bytes4",
                name: "authorizedOrderMagicValue",
                type: "bytes4",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "receiver",
                type: "address",
            },
        ],
        name: "closeMinter",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "from",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                    },
                ],
                internalType: "struct IForwarder.ForwardRequest",
                name: "req",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "execute",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
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
        name: "fulfillAdvancedOrder",
        outputs: [
            {
                internalType: "bool",
                name: "fulfilled",
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
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleAdmin",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "hasRole",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract ConsiderationInterface",
                name: "seaport",
                type: "address",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "isMinter",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "forwarder",
                type: "address",
            },
        ],
        name: "isTrustedForwarder",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "nonceOf",
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
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "paused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "removeMinter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "accounts",
                type: "address[]",
            },
        ],
        name: "removeMinters",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceMinter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "receiver",
                type: "address",
            },
        ],
        name: "rotateMinter",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "orderHash",
                        type: "bytes32",
                    },
                    {
                        internalType: "address",
                        name: "fulfiller",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "offerer",
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
                                name: "identifier",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "amount",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct SpentItem[]",
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
                                name: "identifier",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "amount",
                                type: "uint256",
                            },
                            {
                                internalType: "address payable",
                                name: "recipient",
                                type: "address",
                            },
                        ],
                        internalType: "struct ReceivedItem[]",
                        name: "consideration",
                        type: "tuple[]",
                    },
                    {
                        internalType: "bytes",
                        name: "extraData",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes32[]",
                        name: "orderHashes",
                        type: "bytes32[]",
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
                ],
                internalType: "struct ZoneParameters",
                name: "",
                type: "tuple",
            },
        ],
        name: "validateOrder",
        outputs: [
            {
                internalType: "bytes4",
                name: "validOrderMagicValue",
                type: "bytes4",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "from",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                    },
                ],
                internalType: "struct IForwarder.ForwardRequest",
                name: "req",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "verify",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801562000010575f80fd5b506200001b62000021565b620000e0565b5f54610100900460ff16156200008d5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b5f5460ff9081161015620000de575f805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b612f0280620000ee5f395ff3fe6080604052600436106101f1575f3560e01c80638456cb5911610108578063aa271e1a1161009d578063d9caed121161006d578063d9caed121461058d578063daea85c5146105ac578063e7acab24146105cb578063f2fde38b146105ea578063ffa1ad7414610609575f80fd5b8063aa271e1a14610510578063c4d66de81461052f578063d53913931461054e578063d547741f1461056e575f80fd5b806398650275116100d8578063986502751461048c578063a217fddf146104a0578063a3f4df7e146104b3578063a4247400146104f1575f80fd5b80638456cb59146104135780638da5cb5b1461042757806391d148541461044e578063983b2d561461046d575f80fd5b80633f4ba83a11610189578063634486da11610159578063634486da1461039b5780636ccbae5f146103ae578063715018a6146103cd57806371e2a657146103e157806381c81d3514610400575f80fd5b80633f4ba83a14610328578063572b6c051461033c5780635c975abb146103645780635fc1964f1461037c575f80fd5b8063248a9ca3116101c4578063248a9ca31461028d5780632f2ff15d146102c95780633092afd5146102ea57806336568abe14610309575f80fd5b806301e4d72a146101f557806301ffc9a71461023257806317b1f942146101f55780631bf7e13e14610261575b5f80fd5b348015610200575f80fd5b5061021461020f366004611ed8565b610639565b6040516001600160e01b031990911681526020015b60405180910390f35b34801561023d575f80fd5b5061025161024c366004611f0f565b61065b565b6040519015158152602001610229565b34801561026c575f80fd5b5061028061027b366004611f36565b610691565b6040516102299190612018565b348015610298575f80fd5b506102bb6102a736600461202a565b5f90815260fb602052604090206001015490565b604051908152602001610229565b3480156102d4575f80fd5b506102e86102e3366004612065565b61075a565b005b3480156102f5575f80fd5b506102e8610304366004612093565b610783565b348015610314575f80fd5b506102e8610323366004612065565b610797565b348015610333575f80fd5b506102e861082a565b348015610347575f80fd5b50610251610356366004612093565b6001600160a01b0316301490565b34801561036f575f80fd5b5061012d5460ff16610251565b348015610387575f80fd5b506102e861039636600461211a565b610844565b6102e86103a9366004612093565b610881565b3480156103b9575f80fd5b506102bb6103c836600461202a565b610941565b3480156103d8575f80fd5b506102e861099a565b3480156103ec575f80fd5b506102e86103fb36600461211a565b6109ab565b6102e861040e366004612093565b6109e8565b34801561041e575f80fd5b506102e8610a65565b348015610432575f80fd5b506097546040516001600160a01b039091168152602001610229565b348015610459575f80fd5b50610251610468366004612065565b610a7d565b348015610478575f80fd5b506102e8610487366004612093565b610aa7565b348015610497575f80fd5b506102e8610ab8565b3480156104ab575f80fd5b506102bb5f81565b3480156104be575f80fd5b506102806040518060400160405280601381526020017229b2b0b837b93a10283937bc3c90213abcb2b960691b81525081565b3480156104fc575f80fd5b5061025161050b366004611f36565b610ad1565b34801561051b575f80fd5b5061025161052a366004612093565b610b22565b34801561053a575f80fd5b506102e8610549366004612093565b610b3a565b348015610559575f80fd5b506102bb5f80516020612ed683398151915281565b348015610579575f80fd5b506102e8610588366004612065565b610c91565b348015610598575f80fd5b506102e86105a73660046121ba565b610cb5565b3480156105b7575f80fd5b506102e86105c6366004612093565b610d5f565b3480156105d6575f80fd5b506102516105e53660046121f8565b610e0c565b3480156105f5575f80fd5b506102e8610604366004612093565b61124c565b348015610614575f80fd5b5061028060405180604001604052806005815260200164181718971960d91b81525081565b5f610642611267565b60405163b7048cd360e01b815260040160405180910390fd5b5f6001600160e01b03198216637965db0b60e01b148061068b57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60605f5a90506106a2858585610ad1565b6106bf57604051638baa579f60e01b815260040160405180910390fd5b61074f6106cf6020870187612093565b306040880135846106e360608b018b6122aa565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b90819084018382808284375f920191909152506112ae92505050565b9150505b9392505050565b5f82815260fb60205260409020600101546107748161138c565b61077e838361139d565b505050565b61078b611423565b6107948161149c565b50565b61079f6114b3565b6001600160a01b0316816001600160a01b03161461081c5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b61082682826114c1565b5050565b610832611423565b61083a611545565b61084261158f565b565b61084c611423565b5f5b81518110156108265761087982828151811061086c5761086c6122ec565b602002602001015161149c565b60010161084e565b61088c61052a6114b3565b6108a85760405162461bcd60e51b815260040161081390612300565b6001600160a01b0381166108fe5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610813565b610907816115e8565b61090f610ab8565b6040516001600160a01b038216903480156108fc02915f818181858888f19350505050158015610826573d5f803e3d5ffd5b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a8381560208201529081018290525f90610993906060016040516020818303038152906040528051906020012090565b5492915050565b6109a2611423565b6108425f6115ff565b6109b3611423565b5f5b8151811015610826576109e08282815181106109d3576109d36122ec565b60200260200101516115e8565b6001016109b5565b6109f361052a6114b3565b610a0f5760405162461bcd60e51b815260040161081390612300565b6001600160a01b0381166109075760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610813565b610a6d611423565b610a75611267565b610842611650565b5f91825260fb602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610aaf611423565b610794816115e8565b6108425f80516020612ed68339815191526103236114b3565b5f610b1a610ade85612335565b3085858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525061168f92505050565b949350505050565b5f61068b5f80516020612ed683398151915283610a7d565b5f54610100900460ff1615808015610b5857505f54600160ff909116105b80610b715750303b158015610b7157505f5460ff166001145b610bd45760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610813565b5f805460ff191660011790558015610bf5575f805461ff0019166101001790555b61015f80546001600160a01b0319166001600160a01b038416179055610c196117ca565b610c216117f7565b610c296117f7565b610c316117f7565b610c3961181d565b610c41611853565b610c4961188a565b8015610826575f805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b5f82815260fb6020526040902060010154610cab8161138c565b61077e83836114c1565b610cbd611423565b600260335403610cdf5760405162461bcd60e51b8152600401610813906123f1565b600260335560405163a9059cbb60e01b81526001600160a01b0383811660048301526024820183905284169063a9059cbb906044016020604051808303815f875af1158015610d30573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610d549190612428565b505060016033555050565b610d67611423565b600260335403610d895760405162461bcd60e51b8152600401610813906123f1565b600260335561015f5460405163095ea7b360e01b81526001600160a01b0391821660048201525f1960248201529082169063095ea7b3906044016020604051808303815f875af1158015610ddf573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610e039190612428565b50506001603355565b5f610e1861052a6114b3565b610e345760405162461bcd60e51b815260040161081390612300565b600260335403610e565760405162461bcd60e51b8152600401610813906123f1565b6002603355610e63611267565b6001600160a01b038216610e8a576040516311d000e160e31b815260040160405180910390fd5b30610e958780612447565b610ea6906040810190602001612093565b6001600160a01b031614610ecd57604051639d3c586b60e01b815260040160405180910390fd5b61015f546040805161016081019091526111a5916001600160a01b0316906379df72bd9080610efc8b80612447565b610f0a906020810190612093565b6001600160a01b03168152602001610f228b80612447565b610f33906040810190602001612093565b6001600160a01b03168152602001610f4b8b80612447565b610f59906040810190612466565b808060200260200160405190810160405280939291908181526020015f905b82821015610fa457610f9560a083028601368190038101906124b8565b81526020019060010190610f78565b5050509183525050602001610fb98b80612447565b610fc7906060810190612535565b808060200260200160405190810160405280939291908181526020015f905b828210156110125761100360c08302860136819003810190612579565b81526020019060010190610fe6565b50505091835250506020016110278b80612447565b6110389060a0810190608001612614565b60048111156110495761104961262d565b81526020016110588b80612447565b60a00135815260200161106b8b80612447565b60c00135815260200161107e8b80612447565b60e0013581526020016110918b80612447565b610100013581526020016110a58b80612447565b6101200135815261015f546020909101906001600160a01b031663f07ec3736110ce8d80612447565b6110dc906020810190612093565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401602060405180830381865afa15801561111e573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906111429190612641565b8152506040518263ffffffff1660e01b81526004016111619190612766565b602060405180830381865afa15801561117c573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906111a09190612641565b6118bd565b61015f546040516339eb2ac960e21b81526001600160a01b039091169063e7acab24906111de9089908990899089908990600401612b53565b6020604051808303815f875af11580156111fa573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061121e9190612428565b90508061123e57604051636725093760e01b815260040160405180910390fd5b600160335595945050505050565b611254611423565b61125d816118d6565b6107945f8261194c565b61012d5460ff16156108425760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610813565b60606112b985611956565b5f80876001600160a01b0316866112d28b8a89896119bb565b6040516112df9190612d29565b5f604051808303815f8787f1925050503d805f8114611319576040519150601f19603f3d011682016040523d82523d5f602084013e61131e565b606091505b50909250905061132f603f87612d4e565b5a1161133d5761133d612d6d565b61137d82826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c45440000000000008152506119eb565b925050505b9695505050505050565b610794816113986114b3565b611a24565b6113a78282610a7d565b610826575f82815260fb602090815260408083206001600160a01b03851684529091529020805460ff191660011790556113df6114b3565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b61142b6114b3565b6001600160a01b03166114466097546001600160a01b031690565b6001600160a01b0316146108425760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610813565b6107945f80516020612ed683398151915282610c91565b5f6114bc611a88565b905090565b6114cb8282610a7d565b15610826575f82815260fb602090815260408083206001600160a01b03851684529091529020805460ff191690556115016114b3565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b61012d5460ff166108425760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610813565b611597611545565b61012d805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6115cb6114b3565b6040516001600160a01b03909116815260200160405180910390a1565b6107945f80516020612ed68339815191528261194c565b609780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b611658611267565b61012d805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586115cb6114b3565b6040838101519051636ccbae5f60e01b815260048101919091525f9081903090636ccbae5f90602401602060405180830381865afa1580156116d3573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906116f79190612641565b90505f6117a48660600151805190602001208688602001516040516020016117449392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b905081866020015114801561138257508551611382906001600160a01b03168286611aa5565b5f54610100900460ff166117f05760405162461bcd60e51b815260040161081390612d81565b6001603355565b5f54610100900460ff166108425760405162461bcd60e51b815260040161081390612d81565b5f54610100900460ff166118435760405162461bcd60e51b815260040161081390612d81565b61084261184e6114b3565b6115ff565b5f54610100900460ff166118795760405162461bcd60e51b815260040161081390612d81565b6108425f6118856114b3565b61194c565b5f54610100900460ff166118b05760405162461bcd60e51b815260040161081390612d81565b61012d805460ff19169055565b3033036118cd5761079481611be0565b61079481611956565b6118de611423565b6001600160a01b0381166119435760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610813565b610794816115ff565b610826828261139d565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a8381560208201529081018290525f906060016040516020818303038152906040528051906020012090506119aa8190565b546119b6906001612dcc565b905550565b60608285856040516020016119d293929190612ddf565b6040516020818303038152906040529050949350505050565b606083156119fa575081610753565b825115611a0a5782518084602001fd5b8160405162461bcd60e51b81526004016108139190612018565b611a2e8282610a7d565b61082657611a46816001600160a01b03166014611c0a565b611a51836020611c0a565b604051602001611a62929190612e1d565b60408051601f198184030181529082905262461bcd60e51b825261081391600401612018565b5f303303611a9d575060331936013560601c90565b503390565b90565b5f805f611ab28585611d9f565b90925090505f816004811115611aca57611aca61262d565b148015611ae85750856001600160a01b0316826001600160a01b0316145b15611af857600192505050610753565b5f80876001600160a01b0316631626ba7e60e01b8888604051602401611b1f929190612e91565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051611b5d9190612d29565b5f60405180830381855afa9150503d805f8114611b95576040519150601f19603f3d011682016040523d82523d5f602084013e611b9a565b606091505b5091509150818015611bad575080516020145b8015611bd457508051630b135d3f60e11b90611bd29083016020908101908401612641565b145b98975050505050505050565b611be8611de1565b811461079457604051635637b6af60e11b815260048101829052602401610813565b60605f611c18836002612ea9565b611c23906002612dcc565b6001600160401b03811115611c3a57611c3a6120ae565b6040519080825280601f01601f191660200182016040528015611c64576020820181803683370190505b509050600360fc1b815f81518110611c7e57611c7e6122ec565b60200101906001600160f81b03191690815f1a905350600f60fb1b81600181518110611cac57611cac6122ec565b60200101906001600160f81b03191690815f1a9053505f611cce846002612ea9565b611cd9906001612dcc565b90505b6001811115611d50576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110611d0d57611d0d6122ec565b1a60f81b828281518110611d2357611d236122ec565b60200101906001600160f81b03191690815f1a90535060049490941c93611d4981612ec0565b9050611cdc565b5083156107535760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610813565b5f808251604103611dd3576020830151604084015160608501515f1a611dc787828585611df3565b94509450505050611dda565b505f905060025b9250929050565b5f303303611aa25750601f1936013590565b5f807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115611e2857505f90506003611ecf565b8460ff16601b14158015611e4057508460ff16601c14155b15611e5057505f90506004611ecf565b604080515f8082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611ea1573d5f803e3d5ffd5b5050604051601f1901519150506001600160a01b038116611ec9575f60019250925050611ecf565b91505f90505b94509492505050565b5f60208284031215611ee8575f80fd5b81356001600160401b03811115611efd575f80fd5b82016101408185031215610753575f80fd5b5f60208284031215611f1f575f80fd5b81356001600160e01b031981168114610753575f80fd5b5f805f60408486031215611f48575f80fd5b83356001600160401b0380821115611f5e575f80fd5b9085019060808288031215611f71575f80fd5b90935060208501359080821115611f86575f80fd5b818601915086601f830112611f99575f80fd5b813581811115611fa7575f80fd5b876020828501011115611fb8575f80fd5b6020830194508093505050509250925092565b5f5b83811015611fe5578181015183820152602001611fcd565b50505f910152565b5f8151808452612004816020860160208601611fcb565b601f01601f19169290920160200192915050565b602081525f6107536020830184611fed565b5f6020828403121561203a575f80fd5b5035919050565b6001600160a01b0381168114610794575f80fd5b803561206081612041565b919050565b5f8060408385031215612076575f80fd5b82359150602083013561208881612041565b809150509250929050565b5f602082840312156120a3575f80fd5b813561075381612041565b634e487b7160e01b5f52604160045260245ffd5b604051608081016001600160401b03811182821017156120e4576120e46120ae565b60405290565b604051601f8201601f191681016001600160401b0381118282101715612112576121126120ae565b604052919050565b5f602080838503121561212b575f80fd5b82356001600160401b0380821115612141575f80fd5b818501915085601f830112612154575f80fd5b813581811115612166576121666120ae565b8060051b91506121778483016120ea565b8181529183018401918481019088841115612190575f80fd5b938501935b83851015611bd457843592506121aa83612041565b8282529385019390850190612195565b5f805f606084860312156121cc575f80fd5b83356121d781612041565b925060208401356121e781612041565b929592945050506040919091013590565b5f805f805f6080868803121561220c575f80fd5b85356001600160401b0380821115612222575f80fd5b9087019060a0828a031215612235575f80fd5b9095506020870135908082111561224a575f80fd5b818801915088601f83011261225d575f80fd5b81358181111561226b575f80fd5b8960208260051b850101111561227f575f80fd5b6020830196508095505050506040860135915061229e60608701612055565b90509295509295909350565b5f808335601e198436030181126122bf575f80fd5b8301803591506001600160401b038211156122d8575f80fd5b602001915036819003821315611dda575f80fd5b634e487b7160e01b5f52603260045260245ffd5b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b5f60808236031215612345575f80fd5b61234d6120c2565b823561235881612041565b8152602083810135818301526040808501359083015260608401356001600160401b0380821115612387575f80fd5b9085019036601f830112612399575f80fd5b8135818111156123ab576123ab6120ae565b6123bd601f8201601f191685016120ea565b915080825236848285010111156123d2575f80fd5b80848401858401375f9082019093019290925250606082015292915050565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b5f60208284031215612438575f80fd5b81518015158114610753575f80fd5b5f823561015e1983360301811261245c575f80fd5b9190910192915050565b5f808335601e1984360301811261247b575f80fd5b8301803591506001600160401b03821115612494575f80fd5b602001915060a081023603821315611dda575f80fd5b803560068110612060575f80fd5b5f60a082840312156124c8575f80fd5b60405160a081018181106001600160401b03821117156124ea576124ea6120ae565b6040526124f6836124aa565b8152602083013561250681612041565b806020830152506040830135604082015260608301356060820152608083013560808201528091505092915050565b5f808335601e1984360301811261254a575f80fd5b8301803591506001600160401b03821115612563575f80fd5b602001915060c081023603821315611dda575f80fd5b5f60c08284031215612589575f80fd5b60405160c081018181106001600160401b03821117156125ab576125ab6120ae565b6040526125b7836124aa565b815260208301356125c781612041565b8060208301525060408301356040820152606083013560608201526080830135608082015260a08301356125fa81612041565b60a08201529392505050565b803560058110612060575f80fd5b5f60208284031215612624575f80fd5b61075382612606565b634e487b7160e01b5f52602160045260245ffd5b5f60208284031215612651575f80fd5b5051919050565b600681106126685761266861262d565b9052565b5f815180845260208085019450602084015f5b838110156126d5578151612694888251612658565b838101516001600160a01b03168885015260408082015190890152606080820151908901526080908101519088015260a0909601959082019060010161267f565b509495945050505050565b5f815180845260208085019450602084015f5b838110156126d5578151612708888251612658565b808401516001600160a01b0390811689860152604080830151908a0152606080830151908a0152608080830151908a015260a091820151169088015260c090960195908201906001016126f3565b600581106126685761266861262d565b602081526127806020820183516001600160a01b03169052565b5f602083015161279b60408401826001600160a01b03169052565b5060408301516101608060608501526127b861018085018361266c565b91506060850151601f198584030160808601526127d583826126e0565b92505060808501516127ea60a0860182612756565b5060a085015160c085015260c085015160e085015260e0850151610100818187015280870151915050610120818187015280870151915050610140818187015280870151838701525050508091505092915050565b5f808335601e19843603018112612854575f80fd5b83016020810192503590506001600160401b03811115612872575f80fd5b60a081023603821315611dda575f80fd5b8183525f60208085019450825f5b858110156126d5576128ab876128a6846124aa565b612658565b828201356128b881612041565b6001600160a01b03168388015260408281013590880152606080830135908801526080808301359088015260a09687019690910190600101612891565b5f808335601e1984360301811261290a575f80fd5b83016020810192503590506001600160401b03811115612928575f80fd5b60c081023603821315611dda575f80fd5b8183525f60208085019450825f5b858110156126d55761295c876128a6846124aa565b8282013561296981612041565b6001600160a01b039081168885015260408381013590890152606080840135908901526080808401359089015260a090838201356129a681612041565b169088015260c0968701969190910190600101612947565b80356001600160781b0381168114612060575f80fd5b5f808335601e198436030181126129e9575f80fd5b83016020810192503590506001600160401b03811115612a07575f80fd5b803603821315611dda575f80fd5b81835281816020850137505f828201602090810191909152601f909101601f19169091010190565b8183525f6001600160fb1b03831115612a54575f80fd5b8260051b80836020870137939093016020019392505050565b8183526020808401935f91600585811b8301820185855b88811015612b4557858303601f19018a52813536899003609e19018112612aa9575f80fd5b88018035845260a08682013560028110612ac1575f80fd5b85880152604082810135908601526060808301359086015260808083013536849003601e19018112612af1575f80fd5b9092018781019290356001600160401b03811115612b0d575f80fd5b80881b3603841315612b1d575f80fd5b8282880152612b2f8388018286612a3d565b9d89019d96505050928601925050600101612a84565b509098975050505050505050565b608081525f610120873561015e19893603018112612b6f575f80fd5b60a060808501528801612b94828501612b8783612055565b6001600160a01b03169052565b612ba060208201612055565b610140612bb7818701836001600160a01b03169052565b612bc4604084018461283f565b610160888101529250612bdc61028088018483612883565b925050612bec60608401846128f5565b87840361011f1901610180890152612c05848284612939565b93505050612c1560808401612606565b612c236101a0880182612756565b5060a08301356101c087015260c08301356101e087015260e0830135610200870152610100808401356102208801528484013561024088015281840135610260880152612c7260208d016129be565b6001600160781b03811660a08901529450612c8f60408d016129be565b6001600160781b03811660c08901529450612cad60608d018d6129d4565b95509350607f199150818784030160e0880152612ccb838686612a15565b9450612cda60808d018d6129d4565b945092508187860301818801525050612cf4838383612a15565b925050508281036020840152612d0b818789612a6d565b91505083604083015261138260608301846001600160a01b03169052565b5f825161245c818460208701611fcb565b634e487b7160e01b5f52601160045260245ffd5b5f82612d6857634e487b7160e01b5f52601260045260245ffd5b500490565b634e487b7160e01b5f52600160045260245ffd5b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b8082018082111561068b5761068b612d3a565b5f8451612df0818460208901611fcb565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081525f8351612e54816017850160208801611fcb565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351612e85816028840160208801611fcb565b01602801949350505050565b828152604060208201525f610b1a6040830184611fed565b808202811582820484141761068b5761068b612d3a565b5f81612ece57612ece612d3a565b505f19019056fe9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class SeaportProxyBuyer__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    connect(runner) {
        return super.connect(runner);
    }
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.SeaportProxyBuyer__factory = SeaportProxyBuyer__factory;
SeaportProxyBuyer__factory.bytecode = _bytecode;
SeaportProxyBuyer__factory.abi = _abi;
