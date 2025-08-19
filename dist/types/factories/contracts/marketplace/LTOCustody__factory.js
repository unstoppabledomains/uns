"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LTOCustody__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "InvalidBuyer",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidLTOId",
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
        name: "addAdmin",
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
        name: "getLTOData",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getTokenLTO",
        outputs: [
            {
                internalType: "uint256",
                name: "ltoId",
                type: "uint256",
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
                internalType: "uint256",
                name: "ltoId",
                type: "uint256",
            },
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
                internalType: "uint256",
                name: "ltoId",
                type: "uint256",
            },
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
        name: "isAdmin",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
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
                internalType: "uint256",
                name: "ltoId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "releaseAsset",
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
        name: "removeAdmin",
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
        name: "removeCustodyAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceAdmin",
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
                internalType: "address",
                name: "newAdmin",
                type: "address",
            },
        ],
        name: "rotateAdmin",
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
                internalType: "uint256",
                name: "ltoId",
                type: "uint256",
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
        name: "setMany",
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
const _bytecode = "0x608060405234801561000f575f80fd5b506131a88061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610255575f3560e01c80637048027511610140578063a217fddf116100bf578063cd42426011610084578063cd42426014610594578063d547741f146105a8578063ec01fdca146105bb578063f2fde38b146105db578063f5383497146105ee578063f5a7406a14610601575f80fd5b8063a217fddf14610541578063a424740014610548578063b6240e5b1461055b578063c642c9c91461056e578063ca73f88914610581575f80fd5b80638da5cb5b116101055780638da5cb5b1461048557806391d1485414610496578063971d852f146104a9578063980a6748146104bc5780639efd1b131461052e575f80fd5b80637048027514610446578063715018a6146104595780637b103999146104615780638456cb59146104755780638bad0c0a1461047d575f80fd5b80632f2ff15d116101d75780634f724db01161019c5780634f724db0146103c657806354f22238146103e6578063572b6c05146103f95780635c975abb1461041557806367ce591f146104205780636ccbae5f14610433575f80fd5b80632f2ff15d1461037257806336568abe146103855780633f4ba83a1461039857806340e58ee5146103a0578063485cc955146103b3575f80fd5b80631bf7e13e1161021d5780631bf7e13e146102e8578063248a9ca31461030857806324d7806c146103395780632b5816951461034c5780632ccec6a01461035f575f80fd5b806301ffc9a7146102595780630ea6d2f3146102815780630f1201cc146102ad57806311156dfc146102c05780631785f53c146102d5575b5f80fd5b61026c6102673660046123bc565b61066c565b60405190151581526020015b60405180910390f35b61019254610295906001600160a01b031681565b6040516001600160a01b039091168152602001610278565b61026c6102bb3660046123e3565b6106a2565b6102d36102ce36600461243a565b6106d7565b005b6102d36102e33660046124d1565b6107c9565b6102fb6102f63660046124ec565b6107de565b60405161027891906125ce565b61032b6103163660046123e3565b5f90815261012d602052604090206001015490565b604051908152602001610278565b61026c6103473660046124d1565b6108a7565b6102d361035a3660046125e0565b6108b2565b6102d361036d3660046124d1565b610a52565b6102d3610380366004612625565b610a70565b6102d3610393366004612625565b610a9a565b6102d3610b28565b6102d36103ae3660046123e3565b610b3a565b6102d36103c1366004612653565b610b8c565b61032b6103d43660046123e3565b6101946020525f908152604090205481565b6102d36103f436600461267f565b610cfa565b61026c6104073660046124d1565b6001600160a01b0316301490565b60975460ff1661026c565b6102d361042e3660046124d1565b610ed8565b61032b6104413660046123e3565b610f2c565b6102d36104543660046124d1565b610f85565b6102d3610f97565b61019154610295906001600160a01b031681565b6102d3610fa8565b6102d3610fb8565b60c9546001600160a01b0316610295565b61026c6104a4366004612625565b610fc4565b6102d36104b73660046123e3565b610fef565b6105016104ca3660046123e3565b6101936020525f908152604090208054600182015460028301546003909301546001600160a01b0392831693919092169160ff1684565b604080516001600160a01b0395861681529490931660208501529183015215156060820152608001610278565b6102d361053c366004612625565b611044565b61032b5f81565b61026c6105563660046124ec565b611128565b61026c6105693660046124d1565b611179565b6102d361057c366004612625565b611191565b6102d361058f366004612625565b61131c565b61032b5f8051602061317c83398151915281565b6102d36105b6366004612625565b6113f5565b61032b6105c93660046123e3565b5f908152610194602052604090205490565b6102d36105e93660046124d1565b61141a565b6102d36105fc3660046124d1565b611490565b61050161060f3660046123e3565b5f9081526101936020908152604091829020825160808101845281546001600160a01b039081168083526001840154909116938201849052600283015494820185905260039092015460ff16151560609091018190529093919291565b5f6001600160e01b03198216637965db0b60e01b148061069c57506301ffc9a760e01b6001600160e01b03198316145b92915050565b5f81815261019360205260408120600201541580159061069c5750505f908152610193602052604090206003015460ff161590565b846106e1816106a2565b6106fe57604051633f030d6d60e01b815260040160405180910390fd5b6107066114e5565b5f82815261019360205260409020600101546001600160a01b03908116911614610742576040516282b42960e81b815260040160405180910390fd5b61074a6114f3565b610191545f878152610193602052604090819020600201549051636749599f60e11b81526001600160a01b039092169163ce92b33e916107949189918991899189916004016127d7565b5f604051808303815f87803b1580156107ab575f80fd5b505af11580156107bd573d5f803e3d5ffd5b50505050505050505050565b6107d1611539565b6107db5f826113f5565b50565b60605f5a90506107ef858585611128565b61080c57604051638baa579f60e01b815260040160405180910390fd5b61089c61081c60208701876124d1565b3060408801358461083060608b018b612810565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b90819084018382808284375f920191909152506115b292505050565b9150505b9392505050565b5f61069c8183610fc4565b6002606554036108dd5760405162461bcd60e51b81526004016108d490612852565b60405180910390fd5b60026065556108ed6105696114e5565b610909576040516282b42960e81b815260040160405180910390fd5b6109116114f3565b61091d84848484611690565b610191546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e90602401602060405180830381865afa158015610965573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906109899190612889565b6001600160a01b031614610a0057610191546040516323b872dd60e01b81526001600160a01b03858116600483015230602483015260448201849052909116906323b872dd906064015f604051808303815f87803b1580156109e9575f80fd5b505af11580156109fb573d5f803e3d5ffd5b505050505b604080516001600160a01b03808616825284166020820152829186917fd33e100d324477d0c48d17ab70e096443fc9dd28775952e65f3806b7253467d1910160405180910390a3505060016065555050565b610a5a611539565b610a645f826117e4565b6107db5f6103936114e5565b5f82815261012d6020526040902060010154610a8b816117ee565b610a9583836117ff565b505050565b610aa26114e5565b6001600160a01b0316816001600160a01b031614610b1a5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016108d4565b610b248282611886565b5050565b610b30611539565b610b3861190b565b565b610b456105696114e5565b610b61576040516282b42960e81b815260040160405180910390fd5b610b696114f3565b5f81815261019360205260409020546107db9082906001600160a01b0316611191565b5f54610100900460ff1615808015610baa57505f54600160ff909116105b80610bc35750303b158015610bc357505f5460ff166001145b610c265760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016108d4565b5f805460ff191660011790558015610c47575f805461ff0019166101001790555b610c4f611963565b610c57611989565b610c5f611963565b610c676119bf565b610c6f6119f6565b610c77611a23565b610c7f611963565b61019180546001600160a01b038086166001600160a01b0319928316179092556101928054928516929091169190911790558015610a95575f805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a1505050565b600260655403610d1c5760405162461bcd60e51b81526004016108d490612852565b6002606555610d2c6105696114e5565b610d48576040516282b42960e81b815260040160405180910390fd5b5f805f610d558885611a55565b925092509250610d6789848484611690565b610192546040516339eb2ac960e21b81525f916001600160a01b03169063e7acab2490610da0908c908c908c908c903090600401612bae565b6020604051808303815f875af1158015610dbc573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610de09190612d84565b9050801580610e625750610191546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa158015610e32573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610e569190612889565b6001600160a01b031614155b15610e805760405163098904ef60e41b815260040160405180910390fd5b604080516001600160a01b0380871682528516602082015283918c917fd33e100d324477d0c48d17ab70e096443fc9dd28775952e65f3806b7253467d1910160405180910390a3505060016065555050505050505050565b610ee0611539565b610ef75f8051602061317c833981519152826117e4565b6040516001600160a01b038216907eabe768b82800e7d5614169467c9ce6a18df23b00ea0c3536791f7c6ff5c0d0905f90a250565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a8381560208201529081018290525f90610f7e906060016040516020818303038152906040528051906020012090565b5492915050565b610f8d611539565b6107db5f826117e4565b610f9f611539565b610b385f611c66565b610fb0611539565b610b38611cb7565b610b385f6103936114e5565b5f91825261012d602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610ffa6105696114e5565b611016576040516282b42960e81b815260040160405180910390fd5b61101e6114f3565b5f81815261019360205260409020600101546107db9082906001600160a01b0316611191565b61104f6105696114e5565b61106b576040516282b42960e81b815260040160405180910390fd5b6110736114f3565b61107c826106a2565b61109957604051633f030d6d60e01b815260040160405180910390fd5b6001600160a01b0381166110c0576040516358ef870360e11b815260040160405180910390fd5b5f828152610193602090815260409182902060010180546001600160a01b0319166001600160a01b038516908117909155915191825283917ff92b34d7c01f8cf2b457fb33321c0392c514bf4b1f5edc9f78bfcedd16d4915e91015b60405180910390a25050565b5f61117161113585612e0f565b3085858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f92019190915250611cf592505050565b949350505050565b5f61069c5f8051602061317c83398151915283610fc4565b61119c6105696114e5565b6111b8576040516282b42960e81b815260040160405180910390fd5b6002606554036111da5760405162461bcd60e51b81526004016108d490612852565b60026065556111e76114f3565b6111f0826106a2565b61120d57604051633f030d6d60e01b815260040160405180910390fd5b6001600160a01b03811661123457604051634e46966960e11b815260040160405180910390fd5b5f8281526101936020908152604080832060038101805460ff1916600117905560020154808452610194909252808320929092556101915491516323b872dd60e01b81523060048201526001600160a01b03848116602483015260448201839052919291909116906323b872dd906064015f604051808303815f87803b1580156112bc575f80fd5b505af11580156112ce573d5f803e3d5ffd5b50506040516001600160a01b03851681528392508591507f71f3f9a8aef7f77c5f9ddfd8c83f383ffa885f16dc7ab97046f9f70f4a4959e49060200160405180910390a35050600160655550565b6113276105696114e5565b611343576040516282b42960e81b815260040160405180910390fd5b61134b6114f3565b611354826106a2565b61137157604051633f030d6d60e01b815260040160405180910390fd5b6001600160a01b0381166113985760405163bab7ca3560e01b815260040160405180910390fd5b5f828152610193602090815260409182902080546001600160a01b0319166001600160a01b038516908117909155915191825283917fe3ece063b84a0e16e6080f268ec65ce9c2af3f48ad754f332a34c1eec29dcd93910161111c565b5f82815261012d6020526040902060010154611410816117ee565b610a958383611886565b611422611539565b6001600160a01b0381166114875760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016108d4565b6107db81611c66565b611498611539565b6114af5f8051602061317c833981519152826113f5565b6040516001600160a01b038216907f7ec703108af80ed3dd35e047e5ca6c6d465aa7adab3855dfdb91686333ed584a905f90a250565b5f6114ee611e30565b905090565b60975460ff1615610b385760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016108d4565b6115416114e5565b6001600160a01b031661155c60c9546001600160a01b031690565b6001600160a01b031614610b385760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016108d4565b60606115bd85611e4a565b5f80876001600160a01b0316866115d68b8a8989611eaf565b6040516115e39190612ecb565b5f604051808303815f8787f1925050503d805f811461161d576040519150601f19603f3d011682016040523d82523d5f602084013e611622565b606091505b509092509050611633603f87612efa565b5a1161164157611641612f19565b61168182826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c4544000000000000815250611edf565b925050505b9695505050505050565b6001600160a01b0383166116b75760405163bab7ca3560e01b815260040160405180910390fd5b6001600160a01b0382166116de576040516358ef870360e11b815260040160405180910390fd5b835f036116fe57604051635f2508e160e01b815260040160405180910390fd5b611707846106a2565b156117255760405163154781ad60e01b815260040160405180910390fd5b5f81815261019460205260409020541561175257604051634517741560e01b815260040160405180910390fd5b604080516080810182526001600160a01b03948516815292841660208085019182528483018481525f606087018181528982526101938452858220975188546001600160a01b0319908116918b16919091178955945160018901805490961699169890981790935551600286015594516003909401805460ff1916941515949094179093559082526101949092522055565b610b2482826117ff565b6107db816117fa6114e5565b611f18565b6118098282610fc4565b610b24575f82815261012d602090815260408083206001600160a01b03851684529091529020805460ff191660011790556118426114e5565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6118908282610fc4565b15610b24575f82815261012d602090815260408083206001600160a01b03851684529091529020805460ff191690556118c76114e5565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b611913611f7c565b6097805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6119466114e5565b6040516001600160a01b03909116815260200160405180910390a1565b5f54610100900460ff16610b385760405162461bcd60e51b81526004016108d490612f2d565b5f54610100900460ff166119af5760405162461bcd60e51b81526004016108d490612f2d565b610b386119ba6114e5565b611c66565b5f54610100900460ff166119e55760405162461bcd60e51b81526004016108d490612f2d565b610b385f6119f16114e5565b6117e4565b5f54610100900460ff16611a1c5760405162461bcd60e51b81526004016108d490612f2d565b6001606555565b5f54610100900460ff16611a495760405162461bcd60e51b81526004016108d490612f2d565b6097805460ff19169055565b5f80806002611a648680612f78565b611a759060a0810190608001612f8d565b6004811115611a8657611a866128f6565b141580611aaa5750611a988580612f78565b611aa6906060810190612fa6565b1590505b80611acc5750611aba8580612f78565b611ac8906040810190612fea565b1590505b15611aea5760405163af61069360e01b815260040160405180910390fd5b36611af58680612f78565b611b03906040810190612fea565b5f818110611b1357611b1361302e565b60a00291909101915060029050611b2d6020830183613042565b6005811115611b3e57611b3e6128f6565b148015611b6e5750610191546001600160a01b0316611b6360408301602084016124d1565b6001600160a01b0316145b15611b9b57611b7d8680612f78565b611b8b9060208101906124d1565b9350849250604001359050611c5f565b36611ba68780612f78565b611bb4906060810190612fa6565b5f818110611bc457611bc461302e565b60c00291909101915060029050611bde6020830183613042565b6005811115611bef57611bef6128f6565b148015611c1f5750610191546001600160a01b0316611c1460408301602084016124d1565b6001600160a01b0316145b15611c4657611c3460c0820160a083016124d1565b9450859350604001359150611c5f9050565b60405163af61069360e01b815260040160405180910390fd5b9250925092565b60c980546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b611cbf6114f3565b6097805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586119466114e5565b6040838101519051636ccbae5f60e01b815260048101919091525f9081903090636ccbae5f90602401602060405180830381865afa158015611d39573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611d5d919061305b565b90505f611e0a866060015180519060200120868860200151604051602001611daa9392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b905081866020015114801561168657508551611686906001600160a01b03168286611fc5565b5f303303611e45575060331936013560601c90565b503390565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a8381560208201529081018290525f90606001604051602081830303815290604052805190602001209050611e9e8190565b54611eaa906001613072565b905550565b6060828585604051602001611ec693929190613085565b6040516020818303038152906040529050949350505050565b60608315611eee5750816108a0565b825115611efe5782518084602001fd5b8160405162461bcd60e51b81526004016108d491906125ce565b611f228282610fc4565b610b2457611f3a816001600160a01b03166014612100565b611f45836020612100565b604051602001611f569291906130c3565b60408051601f198184030181529082905262461bcd60e51b82526108d4916004016125ce565b60975460ff16610b385760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016108d4565b5f805f611fd28585612295565b90925090505f816004811115611fea57611fea6128f6565b1480156120085750856001600160a01b0316826001600160a01b0316145b15612018576001925050506108a0565b5f80876001600160a01b0316631626ba7e60e01b888860405160240161203f929190613137565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252905161207d9190612ecb565b5f60405180830381855afa9150503d805f81146120b5576040519150601f19603f3d011682016040523d82523d5f602084013e6120ba565b606091505b50915091508180156120cd575080516020145b80156120f457508051630b135d3f60e11b906120f2908301602090810190840161305b565b145b98975050505050505050565b60605f61210e83600261314f565b612119906002613072565b6001600160401b0381111561213057612130612da3565b6040519080825280601f01601f19166020018201604052801561215a576020820181803683370190505b509050600360fc1b815f815181106121745761217461302e565b60200101906001600160f81b03191690815f1a905350600f60fb1b816001815181106121a2576121a261302e565b60200101906001600160f81b03191690815f1a9053505f6121c484600261314f565b6121cf906001613072565b90505b6001811115612246576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106122035761220361302e565b1a60f81b8282815181106122195761221961302e565b60200101906001600160f81b03191690815f1a90535060049490941c9361223f81613166565b90506121d2565b5083156108a05760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016108d4565b5f8082516041036122c9576020830151604084015160608501515f1a6122bd878285856122d7565b945094505050506122d0565b505f905060025b9250929050565b5f807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561230c57505f905060036123b3565b8460ff16601b1415801561232457508460ff16601c14155b1561233457505f905060046123b3565b604080515f8082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015612385573d5f803e3d5ffd5b5050604051601f1901519150506001600160a01b0381166123ad575f600192509250506123b3565b91505f90505b94509492505050565b5f602082840312156123cc575f80fd5b81356001600160e01b0319811681146108a0575f80fd5b5f602082840312156123f3575f80fd5b5035919050565b5f8083601f84011261240a575f80fd5b5081356001600160401b03811115612420575f80fd5b6020830191508360208260051b85010111156122d0575f80fd5b5f805f805f6060868803121561244e575f80fd5b8535945060208601356001600160401b038082111561246b575f80fd5b61247789838a016123fa565b9096509450604088013591508082111561248f575f80fd5b5061249c888289016123fa565b969995985093965092949392505050565b6001600160a01b03811681146107db575f80fd5b80356124cc816124ad565b919050565b5f602082840312156124e1575f80fd5b81356108a0816124ad565b5f805f604084860312156124fe575f80fd5b83356001600160401b0380821115612514575f80fd5b9085019060808288031215612527575f80fd5b9093506020850135908082111561253c575f80fd5b818601915086601f83011261254f575f80fd5b81358181111561255d575f80fd5b87602082850101111561256e575f80fd5b6020830194508093505050509250925092565b5f5b8381101561259b578181015183820152602001612583565b50505f910152565b5f81518084526125ba816020860160208601612581565b601f01601f19169290920160200192915050565b602081525f6108a060208301846125a3565b5f805f80608085870312156125f3575f80fd5b843593506020850135612605816124ad565b92506040850135612615816124ad565b9396929550929360600135925050565b5f8060408385031215612636575f80fd5b823591506020830135612648816124ad565b809150509250929050565b5f8060408385031215612664575f80fd5b823561266f816124ad565b91506020830135612648816124ad565b5f805f805f8060a08789031215612694575f80fd5b8635955060208701356001600160401b03808211156126b1575f80fd5b9088019060a0828b0312156126c4575f80fd5b909550604088013590808211156126d9575f80fd5b506126e689828a016123fa565b909550935050606087013591506080870135612701816124ad565b809150509295509295509295565b81835281816020850137505f828201602090810191909152601f909101601f19169091010190565b5f808335601e1984360301811261274c575f80fd5b83016020810192503590506001600160401b0381111561276a575f80fd5b8036038213156122d0575f80fd5b5f838385526020808601955060208560051b830101845f5b878110156127ca57848303601f190189526127ab8288612737565b6127b685828461270f565b9a86019a9450505090830190600101612790565b5090979650505050505050565b606081525f6127ea606083018789612778565b82810360208401526127fd818688612778565b9150508260408301529695505050505050565b5f808335601e19843603018112612825575f80fd5b8301803591506001600160401b0382111561283e575f80fd5b6020019150368190038213156122d0575f80fd5b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b5f60208284031215612899575f80fd5b81516108a0816124ad565b5f808335601e198436030181126128b9575f80fd5b83016020810192503590506001600160401b038111156128d7575f80fd5b60a0810236038213156122d0575f80fd5b8035600681106124cc575f80fd5b634e487b7160e01b5f52602160045260245ffd5b6006811061291a5761291a6128f6565b9052565b8183525f60208085019450825f5b858110156129905761294687612941846128e8565b61290a565b82820135612953816124ad565b6001600160a01b03168388015260408281013590880152606080830135908801526080808301359088015260a0968701969091019060010161292c565b509495945050505050565b5f808335601e198436030181126129b0575f80fd5b83016020810192503590506001600160401b038111156129ce575f80fd5b60c0810236038213156122d0575f80fd5b8183525f60208085019450825f5b8581101561299057612a0287612941846128e8565b82820135612a0f816124ad565b6001600160a01b039081168885015260408381013590890152606080840135908901526080808401359089015260a09083820135612a4c816124ad565b169088015260c09687019691909101906001016129ed565b8035600581106124cc575f80fd5b6005811061291a5761291a6128f6565b80356001600160781b03811681146124cc575f80fd5b8183525f6001600160fb1b03831115612aaf575f80fd5b8260051b80836020870137939093016020019392505050565b8183526020808401935f91600585811b8301820185855b88811015612ba057858303601f19018a52813536899003609e19018112612b04575f80fd5b88018035845260a08682013560028110612b1c575f80fd5b85880152604082810135908601526060808301359086015260808083013536849003601e19018112612b4c575f80fd5b9092018781019290356001600160401b03811115612b68575f80fd5b80881b3603841315612b78575f80fd5b8282880152612b8a8388018286612a98565b9d89019d96505050928601925050600101612adf565b509098975050505050505050565b608081525f610120873561015e19893603018112612bca575f80fd5b60a060808501528801612bef828501612be2836124c1565b6001600160a01b03169052565b612bfb602082016124c1565b610140612c12818701836001600160a01b03169052565b612c1f60408401846128a4565b610160888101529250612c376102808801848361291e565b925050612c47606084018461299b565b87840361011f1901610180890152612c608482846129df565b93505050612c7060808401612a64565b612c7e6101a0880182612a72565b5060a08301356101c087015260c08301356101e087015260e0830135610200870152610100808401356102208801528484013561024088015281840135610260880152612ccd60208d01612a82565b6001600160781b03811660a08901529450612cea60408d01612a82565b6001600160781b03811660c08901529450612d0860608d018d612737565b95509350607f199150818784030160e0880152612d2683868661270f565b9450612d3560808d018d612737565b945092508187860301818801525050612d4f83838361270f565b925050508281036020840152612d66818789612ac8565b91505083604083015261168660608301846001600160a01b03169052565b5f60208284031215612d94575f80fd5b815180151581146108a0575f80fd5b634e487b7160e01b5f52604160045260245ffd5b604051608081016001600160401b0381118282101715612dd957612dd9612da3565b60405290565b604051601f8201601f191681016001600160401b0381118282101715612e0757612e07612da3565b604052919050565b5f60808236031215612e1f575f80fd5b612e27612db7565b8235612e32816124ad565b8152602083810135818301526040808501359083015260608401356001600160401b0380821115612e61575f80fd5b9085019036601f830112612e73575f80fd5b813581811115612e8557612e85612da3565b612e97601f8201601f19168501612ddf565b91508082523684828501011115612eac575f80fd5b80848401858401375f9082019093019290925250606082015292915050565b5f8251612edc818460208701612581565b9190910192915050565b634e487b7160e01b5f52601160045260245ffd5b5f82612f1457634e487b7160e01b5f52601260045260245ffd5b500490565b634e487b7160e01b5f52600160045260245ffd5b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b5f823561015e19833603018112612edc575f80fd5b5f60208284031215612f9d575f80fd5b6108a082612a64565b5f808335601e19843603018112612fbb575f80fd5b8301803591506001600160401b03821115612fd4575f80fd5b602001915060c0810236038213156122d0575f80fd5b5f808335601e19843603018112612fff575f80fd5b8301803591506001600160401b03821115613018575f80fd5b602001915060a0810236038213156122d0575f80fd5b634e487b7160e01b5f52603260045260245ffd5b5f60208284031215613052575f80fd5b6108a0826128e8565b5f6020828403121561306b575f80fd5b5051919050565b8082018082111561069c5761069c612ee6565b5f8451613096818460208901612581565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081525f83516130fa816017850160208801612581565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161312b816028840160208801612581565b01602801949350505050565b828152604060208201525f61117160408301846125a3565b808202811582820484141761069c5761069c612ee6565b5f8161317457613174612ee6565b505f19019056fee42a2a81871991b348b461cd4ff9825352fd011597c5280ce35326126d53efbca164736f6c6343000818000a";
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
