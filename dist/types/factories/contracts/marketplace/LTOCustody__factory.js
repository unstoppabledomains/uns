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
        inputs: [],
        name: "ltoIdCounter",
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
                internalType: "uint256",
                name: "tokenId",
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
const _bytecode = "0x608060405234801561000f575f80fd5b50612ef98061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610213575f3560e01c80636ccbae5f1161011f578063a217fddf116100a9578063ca73f88911610079578063ca73f889146104f5578063cd42426014610508578063d547741f1461051c578063f2fde38b1461052f578063f538349714610542575f80fd5b8063a217fddf146104b5578063a4247400146104bc578063b6240e5b146104cf578063c642c9c9146104e2575f80fd5b80638da5cb5b116100ef5780638da5cb5b146103f957806391d148541461040a578063971d852f1461041d578063980a6748146104305780639efd1b13146104a2575f80fd5b80636ccbae5f146103c2578063715018a6146103d55780637b103999146103dd5780638456cb59146103f1575f80fd5b80633f4ba83a116101a05780634f724db0116101705780634f724db01461035557806354f2223814610375578063572b6c05146103885780635c975abb146103a457806367ce591f146103af575f80fd5b80633f4ba83a1461031d57806340e58ee51461032557806345e27b7214610338578063485cc95514610342575f80fd5b80631bf7e13e116101e65780631bf7e13e14610293578063248a9ca3146102b35780632b581695146102e45780632f2ff15d146102f757806336568abe1461030a575f80fd5b806301ffc9a7146102175780630ea6d2f31461023f5780630f1201cc1461026b57806311156dfc1461027e575b5f80fd5b61022a610225366004612152565b610555565b60405190151581526020015b60405180910390f35b61019254610253906001600160a01b031681565b6040516001600160a01b039091168152602001610236565b61022a610279366004612179565b61058b565b61029161028c3660046121d0565b6105c0565b005b6102a66102a1366004612243565b6106af565b6040516102369190612325565b6102d66102c1366004612179565b5f90815261012d602052604090206001015490565b604051908152602001610236565b6102916102f236600461235b565b610778565b6102916103053660046123a0565b610918565b6102916103183660046123a0565b610942565b6102916109d0565b610291610333366004612179565b6109e2565b6102d66101955481565b6102916103503660046123ce565b610a37565b6102d6610363366004612179565b6101946020525f908152604090205481565b6102916103833660046123fa565b610ba5565b61022a61039636600461248a565b6001600160a01b0316301490565b60975460ff1661022a565b6102916103bd36600461248a565b610d8b565b6102d66103d0366004612179565b610ddf565b610291610e38565b61019154610253906001600160a01b031681565b610291610e49565b60c9546001600160a01b0316610253565b61022a6104183660046123a0565b610e59565b61029161042b366004612179565b610e84565b61047561043e366004612179565b6101936020525f908152604090208054600182015460028301546003909301546001600160a01b0392831693919092169160ff1684565b604080516001600160a01b0395861681529490931660208501529183015215156060820152608001610236565b6102916104b03660046123a0565b610ed9565b6102d65f81565b61022a6104ca366004612243565b610fbd565b61022a6104dd36600461248a565b61100e565b6102916104f03660046123a0565b611026565b6102916105033660046123a0565b6111b1565b6102d65f80516020612ecd83398151915281565b61029161052a3660046123a0565b61128a565b61029161053d36600461248a565b6112af565b61029161055036600461248a565b611325565b5f6001600160e01b03198216637965db0b60e01b148061058557506301ffc9a760e01b6001600160e01b03198316145b92915050565b5f8181526101936020526040812060020154158015906105855750505f908152610193602052604090206003015460ff161590565b5f85815261019460205260409020546105d88161058b565b6105f557604051633f030d6d60e01b815260040160405180910390fd5b6105fd61137a565b5f82815261019360205260409020600101546001600160a01b03908116911614610639576040516282b42960e81b815260040160405180910390fd5b610641611388565b61019154604051636749599f60e11b81526001600160a01b039091169063ce92b33e9061067a9088908890889088908d9060040161256d565b5f604051808303815f87803b158015610691575f80fd5b505af11580156106a3573d5f803e3d5ffd5b50505050505050505050565b60605f5a90506106c0858585610fbd565b6106dd57604051638baa579f60e01b815260040160405180910390fd5b61076d6106ed602087018761248a565b3060408801358461070160608b018b6125a6565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b90819084018382808284375f920191909152506113ce92505050565b9150505b9392505050565b6002606554036107a35760405162461bcd60e51b815260040161079a906125e8565b60405180910390fd5b60026065556107b36104dd61137a565b6107cf576040516282b42960e81b815260040160405180910390fd5b6107d7611388565b6107e3848484846114ac565b610191546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e90602401602060405180830381865afa15801561082b573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061084f919061261f565b6001600160a01b0316146108c657610191546040516323b872dd60e01b81526001600160a01b03858116600483015230602483015260448201849052909116906323b872dd906064015f604051808303815f87803b1580156108af575f80fd5b505af11580156108c1573d5f803e3d5ffd5b505050505b604080516001600160a01b03808616825284166020820152829186917fd33e100d324477d0c48d17ab70e096443fc9dd28775952e65f3806b7253467d1910160405180910390a3505060016065555050565b5f82815261012d60205260409020600101546109338161161b565b61093d838361162c565b505050565b61094a61137a565b6001600160a01b0316816001600160a01b0316146109c25760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b606482015260840161079a565b6109cc82826116b3565b5050565b6109d8611738565b6109e06117b1565b565b6109ed6104dd61137a565b610a09576040516282b42960e81b815260040160405180910390fd5b610a11611388565b5f8181526101936020526040902054610a349082906001600160a01b0316611026565b50565b5f54610100900460ff1615808015610a5557505f54600160ff909116105b80610a6e5750303b158015610a6e57505f5460ff166001145b610ad15760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161079a565b5f805460ff191660011790558015610af2575f805461ff0019166101001790555b610afa611809565b610b0261182f565b610b0a611809565b610b12611865565b610b1a61189c565b610b226118c9565b610b2a611809565b61019180546001600160a01b038086166001600160a01b031992831617909255610192805492851692909116919091179055801561093d575f805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a1505050565b600260655403610bc75760405162461bcd60e51b815260040161079a906125e8565b6002606555610bd76104dd61137a565b610bf3576040516282b42960e81b815260040160405180910390fd5b610bfb611388565b5f805f610c0888856118fb565b925092509250610c1a898484846114ac565b610192546040516339eb2ac960e21b81525f916001600160a01b03169063e7acab2490610c53908c908c908c908c903090600401612944565b6020604051808303815f875af1158015610c6f573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610c939190612b1a565b9050801580610d155750610191546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa158015610ce5573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610d09919061261f565b6001600160a01b031614155b15610d335760405163098904ef60e41b815260040160405180910390fd5b604080516001600160a01b0380871682528516602082015283918c917fd33e100d324477d0c48d17ab70e096443fc9dd28775952e65f3806b7253467d1910160405180910390a3505060016065555050505050505050565b610d93611738565b610daa5f80516020612ecd833981519152826119f2565b6040516001600160a01b038216907eabe768b82800e7d5614169467c9ce6a18df23b00ea0c3536791f7c6ff5c0d0905f90a250565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a8381560208201529081018290525f90610e31906060016040516020818303038152906040528051906020012090565b5492915050565b610e40611738565b6109e05f6119fc565b610e51611738565b6109e0611a4d565b5f91825261012d602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610e8f6104dd61137a565b610eab576040516282b42960e81b815260040160405180910390fd5b610eb3611388565b5f8181526101936020526040902060010154610a349082906001600160a01b0316611026565b610ee46104dd61137a565b610f00576040516282b42960e81b815260040160405180910390fd5b610f08611388565b610f118261058b565b610f2e57604051633f030d6d60e01b815260040160405180910390fd5b6001600160a01b038116610f55576040516358ef870360e11b815260040160405180910390fd5b5f828152610193602090815260409182902060010180546001600160a01b0319166001600160a01b038516908117909155915191825283917ff92b34d7c01f8cf2b457fb33321c0392c514bf4b1f5edc9f78bfcedd16d4915e91015b60405180910390a25050565b5f611006610fca85612ba5565b3085858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f92019190915250611a8b92505050565b949350505050565b5f6105855f80516020612ecd83398151915283610e59565b6110316104dd61137a565b61104d576040516282b42960e81b815260040160405180910390fd5b60026065540361106f5760405162461bcd60e51b815260040161079a906125e8565b600260655561107c611388565b6110858261058b565b6110a257604051633f030d6d60e01b815260040160405180910390fd5b6001600160a01b0381166110c957604051634e46966960e11b815260040160405180910390fd5b5f8281526101936020908152604080832060038101805460ff1916600117905560020154808452610194909252808320929092556101915491516323b872dd60e01b81523060048201526001600160a01b03848116602483015260448201839052919291909116906323b872dd906064015f604051808303815f87803b158015611151575f80fd5b505af1158015611163573d5f803e3d5ffd5b50506040516001600160a01b03851681528392508591507f71f3f9a8aef7f77c5f9ddfd8c83f383ffa885f16dc7ab97046f9f70f4a4959e49060200160405180910390a35050600160655550565b6111bc6104dd61137a565b6111d8576040516282b42960e81b815260040160405180910390fd5b6111e0611388565b6111e98261058b565b61120657604051633f030d6d60e01b815260040160405180910390fd5b6001600160a01b03811661122d5760405163bab7ca3560e01b815260040160405180910390fd5b5f828152610193602090815260409182902080546001600160a01b0319166001600160a01b038516908117909155915191825283917fe3ece063b84a0e16e6080f268ec65ce9c2af3f48ad754f332a34c1eec29dcd939101610fb1565b5f82815261012d60205260409020600101546112a58161161b565b61093d83836116b3565b6112b7611738565b6001600160a01b03811661131c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161079a565b610a34816119fc565b61132d611738565b6113445f80516020612ecd8339815191528261128a565b6040516001600160a01b038216907f7ec703108af80ed3dd35e047e5ca6c6d465aa7adab3855dfdb91686333ed584a905f90a250565b5f611383611bc6565b905090565b60975460ff16156109e05760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015260640161079a565b60606113d985611be0565b5f80876001600160a01b0316866113f28b8a8989611c45565b6040516113ff9190612c61565b5f604051808303815f8787f1925050503d805f8114611439576040519150601f19603f3d011682016040523d82523d5f602084013e61143e565b606091505b50909250905061144f603f87612c90565b5a1161145d5761145d612caf565b61149d82826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c4544000000000000815250611c75565b925050505b9695505050505050565b6001600160a01b0383166114d35760405163bab7ca3560e01b815260040160405180910390fd5b6001600160a01b0382166114fa576040516358ef870360e11b815260040160405180910390fd5b835f0361151a57604051635f2508e160e01b815260040160405180910390fd5b6115238461058b565b156115415760405163154781ad60e01b815260040160405180910390fd5b5f81815261019460205260409020541561156e57604051634517741560e01b815260040160405180910390fd5b604080516080810182526001600160a01b03858116825284811660208084019182528385018681525f606086018181528b82526101938452878220965187546001600160a01b0319908116918816919091178855945160018801805490961696169590951790935551600285015591516003909301805460ff191693151593909317909255838252610194905290812085905561019580549161161083612cc3565b919050555050505050565b610a348161162761137a565b611cae565b6116368282610e59565b6109cc575f82815261012d602090815260408083206001600160a01b03851684529091529020805460ff1916600117905561166f61137a565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6116bd8282610e59565b156109cc575f82815261012d602090815260408083206001600160a01b03851684529091529020805460ff191690556116f461137a565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b61174061137a565b6001600160a01b031661175b60c9546001600160a01b031690565b6001600160a01b0316146109e05760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161079a565b6117b9611d12565b6097805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6117ec61137a565b6040516001600160a01b03909116815260200160405180910390a1565b5f54610100900460ff166109e05760405162461bcd60e51b815260040161079a90612cdb565b5f54610100900460ff166118555760405162461bcd60e51b815260040161079a90612cdb565b6109e061186061137a565b6119fc565b5f54610100900460ff1661188b5760405162461bcd60e51b815260040161079a90612cdb565b6109e05f61189761137a565b6119f2565b5f54610100900460ff166118c25760405162461bcd60e51b815260040161079a90612cdb565b6001606555565b5f54610100900460ff166118ef5760405162461bcd60e51b815260040161079a90612cdb565b6097805460ff19169055565b5f80806119088580612d26565b611916906040810190612d3b565b90506001036119d2573661192a8680612d26565b611938906040810190612d3b565b5f81811061194857611948612d7f565b60a002919091019150600290506119626020830183612d93565b60058111156119735761197361268c565b1480156119a35750610191546001600160a01b0316611998604083016020840161248a565b6001600160a01b0316145b156119d0576119b28680612d26565b6119c090602081019061248a565b93508492506040013590506119eb565b505b60405163af61069360e01b815260040160405180910390fd5b9250925092565b6109cc828261162c565b60c980546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b611a55611388565b6097805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586117ec61137a565b6040838101519051636ccbae5f60e01b815260048101919091525f9081903090636ccbae5f90602401602060405180830381865afa158015611acf573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611af39190612dac565b90505f611ba0866060015180519060200120868860200151604051602001611b409392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b90508186602001511480156114a2575085516114a2906001600160a01b03168286611d5b565b5f303303611bdb575060331936013560601c90565b503390565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a8381560208201529081018290525f90606001604051602081830303815290604052805190602001209050611c348190565b54611c40906001612dc3565b905550565b6060828585604051602001611c5c93929190612dd6565b6040516020818303038152906040529050949350505050565b60608315611c84575081610771565b825115611c945782518084602001fd5b8160405162461bcd60e51b815260040161079a9190612325565b611cb88282610e59565b6109cc57611cd0816001600160a01b03166014611e96565b611cdb836020611e96565b604051602001611cec929190612e14565b60408051601f198184030181529082905262461bcd60e51b825261079a91600401612325565b60975460ff166109e05760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015260640161079a565b5f805f611d68858561202b565b90925090505f816004811115611d8057611d8061268c565b148015611d9e5750856001600160a01b0316826001600160a01b0316145b15611dae57600192505050610771565b5f80876001600160a01b0316631626ba7e60e01b8888604051602401611dd5929190612e88565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051611e139190612c61565b5f60405180830381855afa9150503d805f8114611e4b576040519150601f19603f3d011682016040523d82523d5f602084013e611e50565b606091505b5091509150818015611e63575080516020145b8015611e8a57508051630b135d3f60e11b90611e889083016020908101908401612dac565b145b98975050505050505050565b60605f611ea4836002612ea0565b611eaf906002612dc3565b6001600160401b03811115611ec657611ec6612b39565b6040519080825280601f01601f191660200182016040528015611ef0576020820181803683370190505b509050600360fc1b815f81518110611f0a57611f0a612d7f565b60200101906001600160f81b03191690815f1a905350600f60fb1b81600181518110611f3857611f38612d7f565b60200101906001600160f81b03191690815f1a9053505f611f5a846002612ea0565b611f65906001612dc3565b90505b6001811115611fdc576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110611f9957611f99612d7f565b1a60f81b828281518110611faf57611faf612d7f565b60200101906001600160f81b03191690815f1a90535060049490941c93611fd581612eb7565b9050611f68565b5083156107715760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161079a565b5f80825160410361205f576020830151604084015160608501515f1a6120538782858561206d565b94509450505050612066565b505f905060025b9250929050565b5f807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156120a257505f90506003612149565b8460ff16601b141580156120ba57508460ff16601c14155b156120ca57505f90506004612149565b604080515f8082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa15801561211b573d5f803e3d5ffd5b5050604051601f1901519150506001600160a01b038116612143575f60019250925050612149565b91505f90505b94509492505050565b5f60208284031215612162575f80fd5b81356001600160e01b031981168114610771575f80fd5b5f60208284031215612189575f80fd5b5035919050565b5f8083601f8401126121a0575f80fd5b5081356001600160401b038111156121b6575f80fd5b6020830191508360208260051b8501011115612066575f80fd5b5f805f805f606086880312156121e4575f80fd5b8535945060208601356001600160401b0380821115612201575f80fd5b61220d89838a01612190565b90965094506040880135915080821115612225575f80fd5b5061223288828901612190565b969995985093965092949392505050565b5f805f60408486031215612255575f80fd5b83356001600160401b038082111561226b575f80fd5b908501906080828803121561227e575f80fd5b90935060208501359080821115612293575f80fd5b818601915086601f8301126122a6575f80fd5b8135818111156122b4575f80fd5b8760208285010111156122c5575f80fd5b6020830194508093505050509250925092565b5f5b838110156122f25781810151838201526020016122da565b50505f910152565b5f81518084526123118160208601602086016122d8565b601f01601f19169290920160200192915050565b602081525f61077160208301846122fa565b6001600160a01b0381168114610a34575f80fd5b803561235681612337565b919050565b5f805f806080858703121561236e575f80fd5b84359350602085013561238081612337565b9250604085013561239081612337565b9396929550929360600135925050565b5f80604083850312156123b1575f80fd5b8235915060208301356123c381612337565b809150509250929050565b5f80604083850312156123df575f80fd5b82356123ea81612337565b915060208301356123c381612337565b5f805f805f8060a0878903121561240f575f80fd5b8635955060208701356001600160401b038082111561242c575f80fd5b9088019060a0828b03121561243f575f80fd5b90955060408801359080821115612454575f80fd5b5061246189828a01612190565b90955093505060608701359150608087013561247c81612337565b809150509295509295509295565b5f6020828403121561249a575f80fd5b813561077181612337565b81835281816020850137505f828201602090810191909152601f909101601f19169091010190565b5f808335601e198436030181126124e2575f80fd5b83016020810192503590506001600160401b03811115612500575f80fd5b803603821315612066575f80fd5b5f838385526020808601955060208560051b830101845f5b8781101561256057848303601f1901895261254182886124cd565b61254c8582846124a5565b9a86019a9450505090830190600101612526565b5090979650505050505050565b606081525f61258060608301878961250e565b828103602084015261259381868861250e565b9150508260408301529695505050505050565b5f808335601e198436030181126125bb575f80fd5b8301803591506001600160401b038211156125d4575f80fd5b602001915036819003821315612066575f80fd5b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b5f6020828403121561262f575f80fd5b815161077181612337565b5f808335601e1984360301811261264f575f80fd5b83016020810192503590506001600160401b0381111561266d575f80fd5b60a081023603821315612066575f80fd5b803560068110612356575f80fd5b634e487b7160e01b5f52602160045260245ffd5b600681106126b0576126b061268c565b9052565b8183525f60208085019450825f5b85811015612726576126dc876126d78461267e565b6126a0565b828201356126e981612337565b6001600160a01b03168388015260408281013590880152606080830135908801526080808301359088015260a096870196909101906001016126c2565b509495945050505050565b5f808335601e19843603018112612746575f80fd5b83016020810192503590506001600160401b03811115612764575f80fd5b60c081023603821315612066575f80fd5b8183525f60208085019450825f5b8581101561272657612798876126d78461267e565b828201356127a581612337565b6001600160a01b039081168885015260408381013590890152606080840135908901526080808401359089015260a090838201356127e281612337565b169088015260c0968701969190910190600101612783565b803560058110612356575f80fd5b600581106126b0576126b061268c565b80356001600160781b0381168114612356575f80fd5b8183525f6001600160fb1b03831115612845575f80fd5b8260051b80836020870137939093016020019392505050565b8183526020808401935f91600585811b8301820185855b8881101561293657858303601f19018a52813536899003609e1901811261289a575f80fd5b88018035845260a086820135600281106128b2575f80fd5b85880152604082810135908601526060808301359086015260808083013536849003601e190181126128e2575f80fd5b9092018781019290356001600160401b038111156128fe575f80fd5b80881b360384131561290e575f80fd5b8282880152612920838801828661282e565b9d89019d96505050928601925050600101612875565b509098975050505050505050565b608081525f610120873561015e19893603018112612960575f80fd5b60a0608085015288016129858285016129788361234b565b6001600160a01b03169052565b6129916020820161234b565b6101406129a8818701836001600160a01b03169052565b6129b5604084018461263a565b6101608881015292506129cd610280880184836126b4565b9250506129dd6060840184612731565b87840361011f19016101808901526129f6848284612775565b93505050612a06608084016127fa565b612a146101a0880182612808565b5060a08301356101c087015260c08301356101e087015260e0830135610200870152610100808401356102208801528484013561024088015281840135610260880152612a6360208d01612818565b6001600160781b03811660a08901529450612a8060408d01612818565b6001600160781b03811660c08901529450612a9e60608d018d6124cd565b95509350607f199150818784030160e0880152612abc8386866124a5565b9450612acb60808d018d6124cd565b945092508187860301818801525050612ae58383836124a5565b925050508281036020840152612afc81878961285e565b9150508360408301526114a260608301846001600160a01b03169052565b5f60208284031215612b2a575f80fd5b81518015158114610771575f80fd5b634e487b7160e01b5f52604160045260245ffd5b604051608081016001600160401b0381118282101715612b6f57612b6f612b39565b60405290565b604051601f8201601f191681016001600160401b0381118282101715612b9d57612b9d612b39565b604052919050565b5f60808236031215612bb5575f80fd5b612bbd612b4d565b8235612bc881612337565b8152602083810135818301526040808501359083015260608401356001600160401b0380821115612bf7575f80fd5b9085019036601f830112612c09575f80fd5b813581811115612c1b57612c1b612b39565b612c2d601f8201601f19168501612b75565b91508082523684828501011115612c42575f80fd5b80848401858401375f9082019093019290925250606082015292915050565b5f8251612c728184602087016122d8565b9190910192915050565b634e487b7160e01b5f52601160045260245ffd5b5f82612caa57634e487b7160e01b5f52601260045260245ffd5b500490565b634e487b7160e01b5f52600160045260245ffd5b5f60018201612cd457612cd4612c7c565b5060010190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b5f823561015e19833603018112612c72575f80fd5b5f808335601e19843603018112612d50575f80fd5b8301803591506001600160401b03821115612d69575f80fd5b602001915060a081023603821315612066575f80fd5b634e487b7160e01b5f52603260045260245ffd5b5f60208284031215612da3575f80fd5b6107718261267e565b5f60208284031215612dbc575f80fd5b5051919050565b8082018082111561058557610585612c7c565b5f8451612de78184602089016122d8565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081525f8351612e4b8160178501602088016122d8565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351612e7c8160288401602088016122d8565b01602801949350505050565b828152604060208201525f61100660408301846122fa565b808202811582820484141761058557610585612c7c565b5f81612ec557612ec5612c7c565b505f19019056fee42a2a81871991b348b461cd4ff9825352fd011597c5280ce35326126d53efbca164736f6c6343000818000a";
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
