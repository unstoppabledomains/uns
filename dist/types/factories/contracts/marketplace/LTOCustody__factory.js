"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LTOCustody__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
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
        name: "InvalidSignature",
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
        inputs: [],
        name: "Unauthorized",
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
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "CustodyAdminAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "CustodyAdminRemoved",
        type: "event",
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
        name: "CUSTODY_ADMIN_ROLE",
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
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "addCustodyAdmin",
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
                internalType: "uint256",
                name: "ltoId",
                type: "uint256",
            },
        ],
        name: "getLtoCsutodyTokenCount",
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
        inputs: [
            {
                internalType: "uint256",
                name: "ltoId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "getLtoCsutodyTokenId",
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
        inputs: [
            {
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "counters",
                type: "uint256[]",
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
                internalType: "contract IUNSRegistry",
                name: "_registry",
                type: "address",
            },
            {
                internalType: "contract IMintingManager",
                name: "_mintingManager",
                type: "address",
            },
            {
                internalType: "contract SeaportProxyBuyer",
                name: "_seaportProxyBuyer",
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
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "isCustodyAdmin",
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
                name: "ltoId",
                type: "uint256",
            },
        ],
        name: "isLTOInitiated",
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
        name: "isTokenInLTOCustody",
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
                name: "",
                type: "uint256",
            },
        ],
        name: "ltoAssets",
        outputs: [
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
                internalType: "bool",
                name: "isFinalized",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "mintingManager",
        outputs: [
            {
                internalType: "contract IMintingManager",
                name: "",
                type: "address",
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
        inputs: [],
        name: "registry",
        outputs: [
            {
                internalType: "contract IUNSRegistry",
                name: "",
                type: "address",
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
        name: "removeCustodyAdmin",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "revokeAsset",
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
        inputs: [],
        name: "seaportProxyBuyer",
        outputs: [
            {
                internalType: "contract SeaportProxyBuyer",
                name: "",
                type: "address",
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
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "resetRecords",
                type: "bool",
            },
        ],
        name: "setRecords",
        outputs: [],
        stateMutability: "nonpayable",
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "tokenLTOs",
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
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "tokenLtoIdCounter",
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
];
const _bytecode = "0x608060405234801562000010575f80fd5b506200001b62000021565b620000e0565b5f54610100900460ff16156200008d5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b5f5460ff9081161015620000de575f805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b6133e980620000ee5f395ff3fe608060405234801561000f575f80fd5b506004361061024a575f3560e01c80637b10399911610140578063b6240e5b116100bf578063cd42426011610084578063cd42426014610586578063d547741f1461059a578063d8ed07af146105ad578063ecdb813d146105d0578063f2fde38b146105f0578063f538349714610603575f80fd5b8063b6240e5b14610527578063c0c53b8b1461053a578063c2ed6bc51461054d578063ca73f88914610560578063cc8473f914610573575f80fd5b8063980a674811610105578063980a6748146104805780639efd1b13146104e7578063a217fddf146104fa578063a424740014610501578063a850413014610514575f80fd5b80637b1039991461042d5780638456cb59146104415780638da5cb5b1461044957806391d148541461045a578063971d852f1461046d575f80fd5b806340e58ee5116101cc578063657d114411610191578063657d1144146103d957806366ad0b52146103ec57806367ce591f146103ff5780636ccbae5f14610412578063715018a614610425575f80fd5b806340e58ee51461036b5780634f724db01461037e578063572b6c051461039e57806358884432146103ba5780635c975abb146103ce575f80fd5b8063248a9ca311610212578063248a9ca3146102f75780632a6062f1146103285780632f2ff15d1461033b57806336568abe146103505780633f4ba83a14610363575f80fd5b806301ffc9a71461024e5780630ea6d2f3146102765780630f1201cc146102a25780631bf7e13e146102b557806321947212146102d5575b5f80fd5b61026161025c3660046124cc565b610616565b60405190151581526020015b60405180910390f35b6101925461028a906001600160a01b031681565b6040516001600160a01b03909116815260200161026d565b6102616102b03660046124f3565b61064c565b6102c86102c336600461250a565b610681565b60405161026d91906125ec565b6102616102e33660046124f3565b5f9081526101956020526040902054151590565b61031a6103053660046124f3565b5f90815261012d602052604090206001015490565b60405190815260200161026d565b61031a6103363660046125fe565b61074a565b61034e610349366004612642565b61077e565b005b61034e61035e366004612642565b6107a8565b61034e61083b565b61034e6103793660046124f3565b61084d565b61031a61038c3660046124f3565b6101956020525f908152604090205481565b6102616103ac366004612670565b6001600160a01b0316301490565b6101935461028a906001600160a01b031681565b60975460ff16610261565b61034e6103e73660046124f3565b610936565b61034e6103fa36600461268b565b6109f6565b61034e61040d366004612670565b610b92565b61031a6104203660046124f3565b610be6565b61034e610c3f565b6101915461028a906001600160a01b031681565b61034e610c50565b60c9546001600160a01b031661028a565b610261610468366004612642565b610c60565b61034e61047b3660046124f3565b610c8b565b6104bf61048e3660046124f3565b6101946020525f90815260409020805460018201546003909201546001600160a01b03918216929091169060ff1683565b604080516001600160a01b03948516815293909216602084015215159082015260600161026d565b61034e6104f5366004612642565b610d58565b61031a5f81565b61026161050f36600461250a565b610e3c565b61034e610522366004612716565b610e8d565b610261610535366004612670565b610fef565b61034e61054836600461279b565b611007565b61034e61055b3660046127e3565b611185565b61034e61056e366004612642565b6112cc565b61031a610581366004612953565b6113a5565b61031a5f805160206133bd83398151915281565b61034e6105a8366004612642565b6113d8565b61031a6105bb3660046124f3565b5f908152610194602052604090206002015490565b61031a6105de3660046124f3565b6101966020525f908152604090205481565b61034e6105fe366004612670565b6113fd565b61034e610611366004612670565b611476565b5f6001600160e01b03198216637965db0b60e01b148061064657506301ffc9a760e01b6001600160e01b03198316145b92915050565b5f8181526101946020526040812060020154158015906106465750505f908152610194602052604090206003015460ff161590565b60605f5a9050610692858585610e3c565b6106af57604051638baa579f60e01b815260040160405180910390fd5b61073f6106bf6020870187612670565b306040880135846106d360608b018b6129b2565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b90819084018382808284375f920191909152506114cb92505050565b9150505b9392505050565b5f8281526101946020526040812060020180548390811061076d5761076d6129f4565b905f5260205f200154905092915050565b5f82815261012d6020526040902060010154610799816115a9565b6107a383836115ba565b505050565b6107b0611641565b6001600160a01b0316816001600160a01b03161461082d5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b610837828261164f565b5050565b6108436116d4565b61084b61174d565b565b610858610535611641565b610874576040516282b42960e81b815260040160405180910390fd5b61087c6117a5565b6108858161064c565b6108a257604051633f030d6d60e01b815260040160405180910390fd5b5f5b5f8281526101946020526040902060020154811015610917575f82815261019460205260409020600201805461090f9190839081106108e5576108e56129f4565b5f9182526020808320909101548583526101949091526040909120546001600160a01b03166117eb565b6001016108a4565b505f90815261019460205260409020600301805460ff19166001179055565b610941610535611641565b61095d576040516282b42960e81b815260040160405180910390fd5b60026065540361097f5760405162461bcd60e51b815260040161082490612a08565b600260655561098c6117a5565b5f8181526101956020526040902054806109b957604051633f030d6d60e01b815260040160405180910390fd5b610193546109d19083906001600160a01b03166117eb565b5f90815261019460205260409020600301805460ff1916600190811790915560655550565b600260655403610a185760405162461bcd60e51b815260040161082490612a08565b6002606555610a28610535611641565b610a44576040516282b42960e81b815260040160405180910390fd5b610a4c6117a5565b5f610a5884848461193c565b610191546040516331a9108f60e11b81526004810185905291925030916001600160a01b0390911690636352211e90602401602060405180830381865afa158015610aa5573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610ac99190612a3f565b6001600160a01b031614610b4057610191546040516323b872dd60e01b81526001600160a01b03868116600483015230602483015260448201859052909116906323b872dd906064015f604051808303815f87803b158015610b29575f80fd5b505af1158015610b3b573d5f803e3d5ffd5b505050505b604080516001600160a01b03808716825285166020820152839183917fd33e100d324477d0c48d17ab70e096443fc9dd28775952e65f3806b7253467d1910160405180910390a3505060016065555050565b610b9a6116d4565b610bb15f805160206133bd83398151915282611b26565b6040516001600160a01b038216907eabe768b82800e7d5614169467c9ce6a18df23b00ea0c3536791f7c6ff5c0d0905f90a250565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a8381560208201529081018290525f90610c38906060016040516020818303038152906040528051906020012090565b5492915050565b610c476116d4565b61084b5f611b30565b610c586116d4565b61084b611b81565b5f91825261012d602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610c96610535611641565b610cb2576040516282b42960e81b815260040160405180910390fd5b610cba6117a5565b610cc38161064c565b610ce057604051633f030d6d60e01b815260040160405180910390fd5b5f5b5f8281526101946020526040902060020154811015610917575f828152610194602052604090206002018054610d50919083908110610d2357610d236129f4565b5f9182526020808320909101548583526101949091526040909120600101546001600160a01b03166117eb565b600101610ce2565b610d63610535611641565b610d7f576040516282b42960e81b815260040160405180910390fd5b610d876117a5565b610d908261064c565b610dad57604051633f030d6d60e01b815260040160405180910390fd5b6001600160a01b038116610dd4576040516358ef870360e11b815260040160405180910390fd5b5f828152610194602090815260409182902060010180546001600160a01b0319166001600160a01b038516908117909155915191825283917ff92b34d7c01f8cf2b457fb33321c0392c514bf4b1f5edc9f78bfcedd16d4915e91015b60405180910390a25050565b5f610e85610e4985612a5a565b3085858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f92019190915250611bbf92505050565b949350505050565b5f8281526101956020526040902054610ea58161064c565b610ec257604051633f030d6d60e01b815260040160405180910390fd5b610eca611641565b5f82815261019460205260409020600101546001600160a01b03908116911614610f06576040516282b42960e81b815260040160405180910390fd5b610f0e6117a5565b8115610f7f57610191546040516376094f7560e11b81526001600160a01b039091169063ec129eea90610f4d908a908a908a908a908a90600401612bde565b5f604051808303815f87803b158015610f64575f80fd5b505af1158015610f76573d5f803e3d5ffd5b50505050610fe6565b61019154604051636749599f60e11b81526001600160a01b039091169063ce92b33e90610fb8908a908a908a908a908a90600401612bde565b5f604051808303815f87803b158015610fcf575f80fd5b505af1158015610fe1573d5f803e3d5ffd5b505050505b50505050505050565b5f6106465f805160206133bd83398151915283610c60565b5f54610100900460ff161580801561102557505f54600160ff909116105b8061103e5750303b15801561103e57505f5460ff166001145b6110a15760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610824565b5f805460ff1916600117905580156110c2575f805461ff0019166101001790555b6110ca611cfa565b6110d2611d20565b6110da611cfa565b6110e2611d56565b6110ea611d8d565b6110f2611dba565b6110fa611cfa565b61019180546001600160a01b038087166001600160a01b0319928316179092556101938054868416908316179055610192805492851692909116919091179055801561117f575f805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050565b6002606554036111a75760405162461bcd60e51b815260040161082490612a08565b60026065556111b7610535611641565b6111d3576040516282b42960e81b815260040160405180910390fd5b6111db6117a5565b5f805f6111e88885611dec565b9250925092505f6111fa84848461193c565b610192546040516339eb2ac960e21b81529192506001600160a01b03169063e7acab2490611234908c908c908c908c903090600401612f21565b6020604051808303815f875af1158015611250573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061127491906130f7565b50604080516001600160a01b03808716825285166020820152839183917fd33e100d324477d0c48d17ab70e096443fc9dd28775952e65f3806b7253467d1910160405180910390a35050600160655550505050505050565b6112d7610535611641565b6112f3576040516282b42960e81b815260040160405180910390fd5b6112fb6117a5565b6113048261064c565b61132157604051633f030d6d60e01b815260040160405180910390fd5b6001600160a01b0381166113485760405163bab7ca3560e01b815260040160405180910390fd5b5f828152610194602090815260409182902080546001600160a01b0319166001600160a01b038516908117909155915191825283917fe3ece063b84a0e16e6080f268ec65ce9c2af3f48ad754f332a34c1eec29dcd939101610e30565b5f82826040516020016113b9929190613141565b60408051601f1981840301815291905280516020909101209392505050565b5f82815261012d60205260409020600101546113f3816115a9565b6107a3838361164f565b6114056116d4565b6001600160a01b03811661146a5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610824565b61147381611b30565b50565b61147e6116d4565b6114955f805160206133bd833981519152826113d8565b6040516001600160a01b038216907f7ec703108af80ed3dd35e047e5ca6c6d465aa7adab3855dfdb91686333ed584a905f90a250565b60606114d685611ee3565b5f80876001600160a01b0316866114ef8b8a8989611f48565b6040516114fc9190613165565b5f604051808303815f8787f1925050503d805f8114611536576040519150601f19603f3d011682016040523d82523d5f602084013e61153b565b606091505b50909250905061154c603f87613194565b5a1161155a5761155a6131b3565b61159a82826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c4544000000000000815250611f78565b925050505b9695505050505050565b611473816115b5611641565b611fb1565b6115c48282610c60565b610837575f82815261012d602090815260408083206001600160a01b03851684529091529020805460ff191660011790556115fd611641565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b5f61164a612015565b905090565b6116598282610c60565b15610837575f82815261012d602090815260408083206001600160a01b03851684529091529020805460ff19169055611690611641565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6116dc611641565b6001600160a01b03166116f760c9546001600160a01b031690565b6001600160a01b03161461084b5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610824565b61175561202f565b6097805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa611788611641565b6040516001600160a01b03909116815260200160405180910390a1565b60975460ff161561084b5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610824565b5f8281526101956020526040902054611802575050565b5f828152610195602052604080822080549290556101915490516331a9108f60e11b81526004810185905230916001600160a01b031690636352211e90602401602060405180830381865afa15801561185d573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906118819190612a3f565b6001600160a01b0316036107a357610191546040516323b872dd60e01b81523060048201526001600160a01b03848116602483015260448201869052909116906323b872dd906064015f604051808303815f87803b1580156118e1575f80fd5b505af11580156118f3573d5f803e3d5ffd5b50506040516001600160a01b03851681528592508391507f71f3f9a8aef7f77c5f9ddfd8c83f383ffa885f16dc7ab97046f9f70f4a4959e49060200160405180910390a3505050565b5f6001600160a01b0384166119645760405163bab7ca3560e01b815260040160405180910390fd5b6001600160a01b03831661198b576040516358ef870360e11b815260040160405180910390fd5b5f8281526101956020526040902054156119b857604051634517741560e01b815260040160405180910390fd5b6040805160018082528183019092525f916020808301908036833701905050905082815f815181106119ec576119ec6129f4565b60209081029190910101526040805160018082528183019092525f918160200160208202803683375050505f8581526101966020526040812054825192935091839190611a3b57611a3b6129f4565b6020026020010181815250505f611a5283836113a5565b604080516080810182526001600160a01b03808b16825289811660208084019182528385018981525f60608601819052878152610194835295909520845181549085166001600160a01b0319918216178255925160018201805491909516931692909217909255925180519495509193611ad2926002850192019061246f565b50606091909101516003909101805460ff19169115159190911790555f858152610195602090815260408083208490556101969091528120805491611b16836131c7565b9091555090979650505050505050565b61083782826115ba565b60c980546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b611b896117a5565b6097805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611788611641565b6040838101519051636ccbae5f60e01b815260048101919091525f9081903090636ccbae5f90602401602060405180830381865afa158015611c03573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611c2791906131df565b90505f611cd4866060015180519060200120868860200151604051602001611c749392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b905081866020015114801561159f5750855161159f906001600160a01b03168286612078565b5f54610100900460ff1661084b5760405162461bcd60e51b8152600401610824906131f6565b5f54610100900460ff16611d465760405162461bcd60e51b8152600401610824906131f6565b61084b611d51611641565b611b30565b5f54610100900460ff16611d7c5760405162461bcd60e51b8152600401610824906131f6565b61084b5f611d88611641565b611b26565b5f54610100900460ff16611db35760405162461bcd60e51b8152600401610824906131f6565b6001606555565b5f54610100900460ff16611de05760405162461bcd60e51b8152600401610824906131f6565b6097805460ff19169055565b5f8080611df98580613241565b611e07906040810190613256565b9050600103611ec35736611e1b8680613241565b611e29906040810190613256565b5f818110611e3957611e396129f4565b60a00291909101915060029050611e53602083018361329a565b6005811115611e6457611e64612c69565b148015611e945750610191546001600160a01b0316611e896040830160208401612670565b6001600160a01b0316145b15611ec157611ea38680613241565b611eb1906020810190612670565b9350849250604001359050611edc565b505b60405163af61069360e01b815260040160405180910390fd5b9250925092565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a8381560208201529081018290525f90606001604051602081830303815290604052805190602001209050611f378190565b54611f439060016132b3565b905550565b6060828585604051602001611f5f939291906132c6565b6040516020818303038152906040529050949350505050565b60608315611f87575081610743565b825115611f975782518084602001fd5b8160405162461bcd60e51b815260040161082491906125ec565b611fbb8282610c60565b61083757611fd3816001600160a01b031660146121b3565b611fde8360206121b3565b604051602001611fef929190613304565b60408051601f198184030181529082905262461bcd60e51b8252610824916004016125ec565b5f30330361202a575060331936013560601c90565b503390565b60975460ff1661084b5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610824565b5f805f6120858585612348565b90925090505f81600481111561209d5761209d612c69565b1480156120bb5750856001600160a01b0316826001600160a01b0316145b156120cb57600192505050610743565b5f80876001600160a01b0316631626ba7e60e01b88886040516024016120f2929190613378565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516121309190613165565b5f60405180830381855afa9150503d805f8114612168576040519150601f19603f3d011682016040523d82523d5f602084013e61216d565b606091505b5091509150818015612180575080516020145b80156121a757508051630b135d3f60e11b906121a590830160209081019084016131df565b145b98975050505050505050565b60605f6121c1836002613390565b6121cc9060026132b3565b6001600160401b038111156121e3576121e361286b565b6040519080825280601f01601f19166020018201604052801561220d576020820181803683370190505b509050600360fc1b815f81518110612227576122276129f4565b60200101906001600160f81b03191690815f1a905350600f60fb1b81600181518110612255576122556129f4565b60200101906001600160f81b03191690815f1a9053505f612277846002613390565b6122829060016132b3565b90505b60018111156122f9576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106122b6576122b66129f4565b1a60f81b8282815181106122cc576122cc6129f4565b60200101906001600160f81b03191690815f1a90535060049490941c936122f2816133a7565b9050612285565b5083156107435760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610824565b5f80825160410361237c576020830151604084015160608501515f1a6123708782858561238a565b94509450505050612383565b505f905060025b9250929050565b5f807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156123bf57505f90506003612466565b8460ff16601b141580156123d757508460ff16601c14155b156123e757505f90506004612466565b604080515f8082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015612438573d5f803e3d5ffd5b5050604051601f1901519150506001600160a01b038116612460575f60019250925050612466565b91505f90505b94509492505050565b828054828255905f5260205f209081019282156124a8579160200282015b828111156124a857825182559160200191906001019061248d565b506124b49291506124b8565b5090565b5b808211156124b4575f81556001016124b9565b5f602082840312156124dc575f80fd5b81356001600160e01b031981168114610743575f80fd5b5f60208284031215612503575f80fd5b5035919050565b5f805f6040848603121561251c575f80fd5b83356001600160401b0380821115612532575f80fd5b9085019060808288031215612545575f80fd5b9093506020850135908082111561255a575f80fd5b818601915086601f83011261256d575f80fd5b81358181111561257b575f80fd5b87602082850101111561258c575f80fd5b6020830194508093505050509250925092565b5f5b838110156125b95781810151838201526020016125a1565b50505f910152565b5f81518084526125d881602086016020860161259f565b601f01601f19169290920160200192915050565b602081525f61074360208301846125c1565b5f806040838503121561260f575f80fd5b50508035926020909101359150565b6001600160a01b0381168114611473575f80fd5b803561263d8161261e565b919050565b5f8060408385031215612653575f80fd5b8235915060208301356126658161261e565b809150509250929050565b5f60208284031215612680575f80fd5b81356107438161261e565b5f805f6060848603121561269d575f80fd5b83356126a88161261e565b925060208401356126b88161261e565b929592945050506040919091013590565b5f8083601f8401126126d9575f80fd5b5081356001600160401b038111156126ef575f80fd5b6020830191508360208260051b8501011115612383575f80fd5b8015158114611473575f80fd5b5f805f805f806080878903121561272b575f80fd5b86356001600160401b0380821115612741575f80fd5b61274d8a838b016126c9565b90985096506020890135915080821115612765575f80fd5b5061277289828a016126c9565b90955093505060408701359150606087013561278d81612709565b809150509295509295509295565b5f805f606084860312156127ad575f80fd5b83356127b88161261e565b925060208401356127c88161261e565b915060408401356127d88161261e565b809150509250925092565b5f805f805f608086880312156127f7575f80fd5b85356001600160401b038082111561280d575f80fd5b9087019060a0828a031215612820575f80fd5b90955060208701359080821115612835575f80fd5b50612842888289016126c9565b90955093505060408601359150606086013561285d8161261e565b809150509295509295909350565b634e487b7160e01b5f52604160045260245ffd5b604051608081016001600160401b03811182821017156128a1576128a161286b565b60405290565b604051601f8201601f191681016001600160401b03811182821017156128cf576128cf61286b565b604052919050565b5f82601f8301126128e6575f80fd5b813560206001600160401b038211156129015761290161286b565b8160051b6129108282016128a7565b9283528481018201928281019087851115612929575f80fd5b83870192505b848310156129485782358252918301919083019061292f565b979650505050505050565b5f8060408385031215612964575f80fd5b82356001600160401b038082111561297a575f80fd5b612986868387016128d7565b9350602085013591508082111561299b575f80fd5b506129a8858286016128d7565b9150509250929050565b5f808335601e198436030181126129c7575f80fd5b8301803591506001600160401b038211156129e0575f80fd5b602001915036819003821315612383575f80fd5b634e487b7160e01b5f52603260045260245ffd5b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b5f60208284031215612a4f575f80fd5b81516107438161261e565b5f60808236031215612a6a575f80fd5b612a7261287f565b8235612a7d8161261e565b8152602083810135818301526040808501359083015260608401356001600160401b0380821115612aac575f80fd5b9085019036601f830112612abe575f80fd5b813581811115612ad057612ad061286b565b612ae2601f8201601f191685016128a7565b91508082523684828501011115612af7575f80fd5b80848401858401375f9082019093019290925250606082015292915050565b81835281816020850137505f828201602090810191909152601f909101601f19169091010190565b5f808335601e19843603018112612b53575f80fd5b83016020810192503590506001600160401b03811115612b71575f80fd5b803603821315612383575f80fd5b5f838385526020808601955060208560051b830101845f5b87811015612bd157848303601f19018952612bb28288612b3e565b612bbd858284612b16565b9a86019a9450505090830190600101612b97565b5090979650505050505050565b606081525f612bf1606083018789612b7f565b8281036020840152612c04818688612b7f565b9150508260408301529695505050505050565b5f808335601e19843603018112612c2c575f80fd5b83016020810192503590506001600160401b03811115612c4a575f80fd5b60a081023603821315612383575f80fd5b80356006811061263d575f80fd5b634e487b7160e01b5f52602160045260245ffd5b60068110612c8d57612c8d612c69565b9052565b8183525f60208085019450825f5b85811015612d0357612cb987612cb484612c5b565b612c7d565b82820135612cc68161261e565b6001600160a01b03168388015260408281013590880152606080830135908801526080808301359088015260a09687019690910190600101612c9f565b509495945050505050565b5f808335601e19843603018112612d23575f80fd5b83016020810192503590506001600160401b03811115612d41575f80fd5b60c081023603821315612383575f80fd5b8183525f60208085019450825f5b85811015612d0357612d7587612cb484612c5b565b82820135612d828161261e565b6001600160a01b039081168885015260408381013590890152606080840135908901526080808401359089015260a09083820135612dbf8161261e565b169088015260c0968701969190910190600101612d60565b80356005811061263d575f80fd5b60058110612c8d57612c8d612c69565b80356001600160781b038116811461263d575f80fd5b8183525f6001600160fb1b03831115612e22575f80fd5b8260051b80836020870137939093016020019392505050565b8183526020808401935f91600585811b8301820185855b88811015612f1357858303601f19018a52813536899003609e19018112612e77575f80fd5b88018035845260a08682013560028110612e8f575f80fd5b85880152604082810135908601526060808301359086015260808083013536849003601e19018112612ebf575f80fd5b9092018781019290356001600160401b03811115612edb575f80fd5b80881b3603841315612eeb575f80fd5b8282880152612efd8388018286612e0b565b9d89019d96505050928601925050600101612e52565b509098975050505050505050565b608081525f610120873561015e19893603018112612f3d575f80fd5b60a060808501528801612f62828501612f5583612632565b6001600160a01b03169052565b612f6e60208201612632565b610140612f85818701836001600160a01b03169052565b612f926040840184612c17565b610160888101529250612faa61028088018483612c91565b925050612fba6060840184612d0e565b87840361011f1901610180890152612fd3848284612d52565b93505050612fe360808401612dd7565b612ff16101a0880182612de5565b5060a08301356101c087015260c08301356101e087015260e083013561020087015261010080840135610220880152848401356102408801528184013561026088015261304060208d01612df5565b6001600160781b03811660a0890152945061305d60408d01612df5565b6001600160781b03811660c0890152945061307b60608d018d612b3e565b95509350607f199150818784030160e0880152613099838686612b16565b94506130a860808d018d612b3e565b9450925081878603018188015250506130c2838383612b16565b9250505082810360208401526130d9818789612e3b565b91505083604083015261159f60608301846001600160a01b03169052565b5f60208284031215613107575f80fd5b815161074381612709565b5f815180845260208085019450602084015f5b83811015612d0357815187529582019590820190600101613125565b604081525f6131536040830185613112565b828103602084015261073f8185613112565b5f825161317681846020870161259f565b9190910192915050565b634e487b7160e01b5f52601160045260245ffd5b5f826131ae57634e487b7160e01b5f52601260045260245ffd5b500490565b634e487b7160e01b5f52600160045260245ffd5b5f600182016131d8576131d8613180565b5060010190565b5f602082840312156131ef575f80fd5b5051919050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b5f823561015e19833603018112613176575f80fd5b5f808335601e1984360301811261326b575f80fd5b8301803591506001600160401b03821115613284575f80fd5b602001915060a081023603821315612383575f80fd5b5f602082840312156132aa575f80fd5b61074382612c5b565b8082018082111561064657610646613180565b5f84516132d781846020890161259f565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081525f835161333b81601785016020880161259f565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161336c81602884016020880161259f565b01602801949350505050565b828152604060208201525f610e8560408301846125c1565b808202811582820484141761064657610646613180565b5f816133b5576133b5613180565b505f19019056fee42a2a81871991b348b461cd4ff9825352fd011597c5280ce35326126d53efbca164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class LTOCustody__factory extends ethers_1.ContractFactory {
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
exports.LTOCustody__factory = LTOCustody__factory;
LTOCustody__factory.bytecode = _bytecode;
LTOCustody__factory.abi = _abi;
