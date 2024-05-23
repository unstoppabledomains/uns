"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consideration__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "conduitController",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "BadContractSignature",
        type: "error",
    },
    {
        inputs: [],
        name: "BadFraction",
        type: "error",
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
                name: "amount",
                type: "uint256",
            },
        ],
        name: "BadReturnValueFromERC20OnTransfer",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "v",
                type: "uint8",
            },
        ],
        name: "BadSignatureV",
        type: "error",
    },
    {
        inputs: [],
        name: "CannotCancelOrder",
        type: "error",
    },
    {
        inputs: [],
        name: "ConsiderationCriteriaResolverOutOfRange",
        type: "error",
    },
    {
        inputs: [],
        name: "ConsiderationLengthNotEqualToTotalOriginal",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "orderIndex",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "considerationIndex",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "shortfallAmount",
                type: "uint256",
            },
        ],
        name: "ConsiderationNotMet",
        type: "error",
    },
    {
        inputs: [],
        name: "CriteriaNotEnabledForItem",
        type: "error",
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
                name: "identifiers",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
            },
        ],
        name: "ERC1155BatchTransferGenericFailure",
        type: "error",
    },
    {
        inputs: [],
        name: "InexactFraction",
        type: "error",
    },
    {
        inputs: [],
        name: "InsufficientNativeTokensSupplied",
        type: "error",
    },
    {
        inputs: [],
        name: "Invalid1155BatchTransferEncoding",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidBasicOrderParameterEncoding",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "conduit",
                type: "address",
            },
        ],
        name: "InvalidCallToConduit",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "conduitKey",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "conduit",
                type: "address",
            },
        ],
        name: "InvalidConduit",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "orderHash",
                type: "bytes32",
            },
        ],
        name: "InvalidContractOrder",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "InvalidERC721TransferAmount",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidFulfillmentComponentData",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "InvalidMsgValue",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidNativeOfferItem",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidProof",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "orderHash",
                type: "bytes32",
            },
        ],
        name: "InvalidRestrictedOrder",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidSignature",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidSigner",
        type: "error",
    },
    {
        inputs: [
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
        ],
        name: "InvalidTime",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "fulfillmentIndex",
                type: "uint256",
            },
        ],
        name: "MismatchedFulfillmentOfferAndConsiderationComponents",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "enum Side",
                name: "side",
                type: "uint8",
            },
        ],
        name: "MissingFulfillmentComponentOnAggregation",
        type: "error",
    },
    {
        inputs: [],
        name: "MissingItemAmount",
        type: "error",
    },
    {
        inputs: [],
        name: "MissingOriginalConsiderationItems",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "NativeTokenTransferGenericFailure",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "NoContract",
        type: "error",
    },
    {
        inputs: [],
        name: "NoReentrantCalls",
        type: "error",
    },
    {
        inputs: [],
        name: "NoSpecifiedOrdersAvailable",
        type: "error",
    },
    {
        inputs: [],
        name: "OfferAndConsiderationRequiredOnFulfillment",
        type: "error",
    },
    {
        inputs: [],
        name: "OfferCriteriaResolverOutOfRange",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "orderHash",
                type: "bytes32",
            },
        ],
        name: "OrderAlreadyFilled",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "enum Side",
                name: "side",
                type: "uint8",
            },
        ],
        name: "OrderCriteriaResolverOutOfRange",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "orderHash",
                type: "bytes32",
            },
        ],
        name: "OrderIsCancelled",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "orderHash",
                type: "bytes32",
            },
        ],
        name: "OrderPartiallyFilled",
        type: "error",
    },
    {
        inputs: [],
        name: "PartialFillsNotEnabledForOrder",
        type: "error",
    },
    {
        inputs: [],
        name: "TStoreAlreadyActivated",
        type: "error",
    },
    {
        inputs: [],
        name: "TStoreNotSupported",
        type: "error",
    },
    {
        inputs: [],
        name: "TloadTestContractDeploymentFailed",
        type: "error",
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
        name: "TokenTransferGenericFailure",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "orderIndex",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "considerationIndex",
                type: "uint256",
            },
        ],
        name: "UnresolvedConsiderationCriteria",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "orderIndex",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "offerIndex",
                type: "uint256",
            },
        ],
        name: "UnresolvedOfferCriteria",
        type: "error",
    },
    {
        inputs: [],
        name: "UnusedItemParameters",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "newCounter",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "offerer",
                type: "address",
            },
        ],
        name: "CounterIncremented",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "orderHash",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "offerer",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "zone",
                type: "address",
            },
        ],
        name: "OrderCancelled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "orderHash",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "offerer",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "zone",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "recipient",
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
                indexed: false,
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
                indexed: false,
                internalType: "struct ReceivedItem[]",
                name: "consideration",
                type: "tuple[]",
            },
        ],
        name: "OrderFulfilled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "orderHash",
                type: "bytes32",
            },
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
                indexed: false,
                internalType: "struct OrderParameters",
                name: "orderParameters",
                type: "tuple",
            },
        ],
        name: "OrderValidated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32[]",
                name: "orderHashes",
                type: "bytes32[]",
            },
        ],
        name: "OrdersMatched",
        type: "event",
    },
    {
        inputs: [],
        name: "__activateTstore",
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
                        name: "counter",
                        type: "uint256",
                    },
                ],
                internalType: "struct OrderComponents[]",
                name: "orders",
                type: "tuple[]",
            },
        ],
        name: "cancel",
        outputs: [
            {
                internalType: "bool",
                name: "cancelled",
                type: "bool",
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
                name: "",
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
                name: "",
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
        stateMutability: "payable",
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
                internalType: "struct AdvancedOrder[]",
                name: "",
                type: "tuple[]",
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
                name: "",
                type: "tuple[]",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "orderIndex",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "itemIndex",
                        type: "uint256",
                    },
                ],
                internalType: "struct FulfillmentComponent[][]",
                name: "",
                type: "tuple[][]",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "orderIndex",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "itemIndex",
                        type: "uint256",
                    },
                ],
                internalType: "struct FulfillmentComponent[][]",
                name: "",
                type: "tuple[][]",
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
            {
                internalType: "uint256",
                name: "maximumFulfilled",
                type: "uint256",
            },
        ],
        name: "fulfillAvailableAdvancedOrders",
        outputs: [
            {
                internalType: "bool[]",
                name: "",
                type: "bool[]",
            },
            {
                components: [
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
                        internalType: "struct ReceivedItem",
                        name: "item",
                        type: "tuple",
                    },
                    {
                        internalType: "address",
                        name: "offerer",
                        type: "address",
                    },
                    {
                        internalType: "bytes32",
                        name: "conduitKey",
                        type: "bytes32",
                    },
                ],
                internalType: "struct Execution[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "payable",
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
                        internalType: "bytes",
                        name: "signature",
                        type: "bytes",
                    },
                ],
                internalType: "struct Order[]",
                name: "",
                type: "tuple[]",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "orderIndex",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "itemIndex",
                        type: "uint256",
                    },
                ],
                internalType: "struct FulfillmentComponent[][]",
                name: "",
                type: "tuple[][]",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "orderIndex",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "itemIndex",
                        type: "uint256",
                    },
                ],
                internalType: "struct FulfillmentComponent[][]",
                name: "",
                type: "tuple[][]",
            },
            {
                internalType: "bytes32",
                name: "fulfillerConduitKey",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "maximumFulfilled",
                type: "uint256",
            },
        ],
        name: "fulfillAvailableOrders",
        outputs: [
            {
                internalType: "bool[]",
                name: "",
                type: "bool[]",
            },
            {
                components: [
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
                        internalType: "struct ReceivedItem",
                        name: "item",
                        type: "tuple",
                    },
                    {
                        internalType: "address",
                        name: "offerer",
                        type: "address",
                    },
                    {
                        internalType: "bytes32",
                        name: "conduitKey",
                        type: "bytes32",
                    },
                ],
                internalType: "struct Execution[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "considerationToken",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "considerationIdentifier",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "considerationAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "address payable",
                        name: "offerer",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "zone",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "offerToken",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "offerIdentifier",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "offerAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "enum BasicOrderType",
                        name: "basicOrderType",
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
                        name: "offererConduitKey",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32",
                        name: "fulfillerConduitKey",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint256",
                        name: "totalOriginalAdditionalRecipients",
                        type: "uint256",
                    },
                    {
                        components: [
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
                        internalType: "struct AdditionalRecipient[]",
                        name: "additionalRecipients",
                        type: "tuple[]",
                    },
                    {
                        internalType: "bytes",
                        name: "signature",
                        type: "bytes",
                    },
                ],
                internalType: "struct BasicOrderParameters",
                name: "",
                type: "tuple",
            },
        ],
        name: "fulfillBasicOrder",
        outputs: [
            {
                internalType: "bool",
                name: "fulfilled",
                type: "bool",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "considerationToken",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "considerationIdentifier",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "considerationAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "address payable",
                        name: "offerer",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "zone",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "offerToken",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "offerIdentifier",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "offerAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "enum BasicOrderType",
                        name: "basicOrderType",
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
                        name: "offererConduitKey",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32",
                        name: "fulfillerConduitKey",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint256",
                        name: "totalOriginalAdditionalRecipients",
                        type: "uint256",
                    },
                    {
                        components: [
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
                        internalType: "struct AdditionalRecipient[]",
                        name: "additionalRecipients",
                        type: "tuple[]",
                    },
                    {
                        internalType: "bytes",
                        name: "signature",
                        type: "bytes",
                    },
                ],
                internalType: "struct BasicOrderParameters",
                name: "",
                type: "tuple",
            },
        ],
        name: "fulfillBasicOrder_efficient_6GL6yc",
        outputs: [
            {
                internalType: "bool",
                name: "fulfilled",
                type: "bool",
            },
        ],
        stateMutability: "payable",
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
                        internalType: "bytes",
                        name: "signature",
                        type: "bytes",
                    },
                ],
                internalType: "struct Order",
                name: "",
                type: "tuple",
            },
            {
                internalType: "bytes32",
                name: "fulfillerConduitKey",
                type: "bytes32",
            },
        ],
        name: "fulfillOrder",
        outputs: [
            {
                internalType: "bool",
                name: "fulfilled",
                type: "bool",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "contractOfferer",
                type: "address",
            },
        ],
        name: "getContractOffererNonce",
        outputs: [
            {
                internalType: "uint256",
                name: "nonce",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "offerer",
                type: "address",
            },
        ],
        name: "getCounter",
        outputs: [
            {
                internalType: "uint256",
                name: "counter",
                type: "uint256",
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
                        name: "counter",
                        type: "uint256",
                    },
                ],
                internalType: "struct OrderComponents",
                name: "",
                type: "tuple",
            },
        ],
        name: "getOrderHash",
        outputs: [
            {
                internalType: "bytes32",
                name: "orderHash",
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
                name: "orderHash",
                type: "bytes32",
            },
        ],
        name: "getOrderStatus",
        outputs: [
            {
                internalType: "bool",
                name: "isValidated",
                type: "bool",
            },
            {
                internalType: "bool",
                name: "isCancelled",
                type: "bool",
            },
            {
                internalType: "uint256",
                name: "totalFilled",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "totalSize",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "incrementCounter",
        outputs: [
            {
                internalType: "uint256",
                name: "newCounter",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "information",
        outputs: [
            {
                internalType: "string",
                name: "version",
                type: "string",
            },
            {
                internalType: "bytes32",
                name: "domainSeparator",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "conduitController",
                type: "address",
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
                internalType: "struct AdvancedOrder[]",
                name: "",
                type: "tuple[]",
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
                name: "",
                type: "tuple[]",
            },
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "orderIndex",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "itemIndex",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct FulfillmentComponent[]",
                        name: "offerComponents",
                        type: "tuple[]",
                    },
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "orderIndex",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "itemIndex",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct FulfillmentComponent[]",
                        name: "considerationComponents",
                        type: "tuple[]",
                    },
                ],
                internalType: "struct Fulfillment[]",
                name: "",
                type: "tuple[]",
            },
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
        ],
        name: "matchAdvancedOrders",
        outputs: [
            {
                components: [
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
                        internalType: "struct ReceivedItem",
                        name: "item",
                        type: "tuple",
                    },
                    {
                        internalType: "address",
                        name: "offerer",
                        type: "address",
                    },
                    {
                        internalType: "bytes32",
                        name: "conduitKey",
                        type: "bytes32",
                    },
                ],
                internalType: "struct Execution[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "payable",
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
                        internalType: "bytes",
                        name: "signature",
                        type: "bytes",
                    },
                ],
                internalType: "struct Order[]",
                name: "",
                type: "tuple[]",
            },
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "orderIndex",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "itemIndex",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct FulfillmentComponent[]",
                        name: "offerComponents",
                        type: "tuple[]",
                    },
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "orderIndex",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "itemIndex",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct FulfillmentComponent[]",
                        name: "considerationComponents",
                        type: "tuple[]",
                    },
                ],
                internalType: "struct Fulfillment[]",
                name: "",
                type: "tuple[]",
            },
        ],
        name: "matchOrders",
        outputs: [
            {
                components: [
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
                        internalType: "struct ReceivedItem",
                        name: "item",
                        type: "tuple",
                    },
                    {
                        internalType: "address",
                        name: "offerer",
                        type: "address",
                    },
                    {
                        internalType: "bytes32",
                        name: "conduitKey",
                        type: "bytes32",
                    },
                ],
                internalType: "struct Execution[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "pure",
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
                        internalType: "bytes",
                        name: "signature",
                        type: "bytes",
                    },
                ],
                internalType: "struct Order[]",
                name: "",
                type: "tuple[]",
            },
        ],
        name: "validate",
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
        stateMutability: "payable",
        type: "receive",
    },
];
const _bytecode = "0x61020060405234801562000011575f80fd5b50604051620061953803806200619583398101604081905262000034916200031f565b8080808080808080806200004762000177565b610120526101005260e05260c081905260a082815246610140819052604080515f9485526020879052948152606091825230608090815292842085825293909152939052610160526001600160a01b038316610180819052630a96ad3960e01b825282519092630a96ad3992600480820193918290030181865afa158015620000d2573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190620000f891906200034e565b506101a052505f90506200010b620002a4565b90506001600160a01b0381166200013557604051632aea588760e01b815260040160405180910390fd5b5f6200014182620002bd565b8015156101c0526001600160a01b0383166101e0529050806200016757600163929eee14555b50505050505050505050620003ec565b5f8080808080620001a860408051808201909152600d81526c21b7b739b4b232b930ba34b7b760991b602082015290565b8051906020012095506040518060400160405280600381526020016218971b60e91b8152508051906020012094505f6040518060a00160405280606a81526020016200612b606a913990505f6040518060c001604052806084815260200162005f816084913990505f60405180610100016040528060d481526020016200605760d491399050604051806080016040528060528152602001620060056052913980519060200120965082805190602001209550818051906020012094505f8183856040516020016200027d93929190620003a0565b60405160208183030381529060405290508080519060200120945050505050909192939495565b5f696002601e613d5c3d52f35f52600a60165ff0905090565b5f816001600160a01b0316600a5a620002d79190620003cc565b6040515f8181818686fa925050503d805f811462000311576040519150601f19603f3d011682016040523d82523d5f602084013e62000316565b606091505b50909392505050565b5f6020828403121562000330575f80fd5b81516001600160a01b038116811462000347575f80fd5b9392505050565b5f806040838503121562000360575f80fd5b505080516020909101519092909150565b5f81515f5b8181101562000392576020818501810151868301520162000376565b505f93019283525090919050565b5f620003c3620003bc620003b5848862000371565b8662000371565b8462000371565b95945050505050565b5f82620003e757634e487b7160e01b5f52601260045260245ffd5b500490565b60805160a05160c05160e05161010051610120516101405161016051610180516101a0516101c0516101e051615ad9620004a85f395f61047601525f818161036d0152818161042b01528181611a6601528181611ab901526124d301525f61306f01525f81816112b4015261303f01525f612f1901525f612e6101525f8181610c24015261164f01525f8181610bb3015261149801525f8181610b4d01526115e101525f612e9101525f612eda01525f612eb60152615ad95ff3fe608060405260043610610103575f3560e01c8063a900866b11610092578063f07ec37311610062578063f07ec373146102f7578063f2d12b1214610316578063f47b774014610329578063fb0f3ee114610116578063fd9f1e101461034c575f80fd5b8063a900866b1461028a578063b3a34c4c146102be578063e7acab24146102d1578063ed98a574146102e4575f80fd5b80637423eb3c116100d85780637423eb3c146101f757806379df72bd1461020b57806387201b411461022a578063881477321461024b578063a81744041461026a575f80fd5b801561011657806306fdde031461013e57806346423aa71461015f5780635b34b966146101d5575f80fd5b366101125761011061036b565b005b5f80fd5b61012961012436600461511b565b6103f9565b60405190151581526020015b60405180910390f35b348015610149575f80fd5b50610152610408565b6040516101359190615195565b34801561016a575f80fd5b506101b36101793660046151a7565b5f9081526001602052604090205460ff808216926101008304909116916001600160781b03620100008204811692600160881b9092041690565b6040805194151585529215156020850152918301526060820152608001610135565b3480156101e0575f80fd5b506101e9610417565b604051908152602001610135565b348015610202575f80fd5b50610110610420565b348015610216575f80fd5b506101e96102253660046151be565b6104c1565b61023d610238366004615252565b6104f8565b6040516101359291906153f6565b348015610256575f80fd5b50610129610265366004615445565b610571565b61027d610278366004615483565b61058f565b60405161013591906154e9565b348015610295575f80fd5b506101e96102a43660046154fb565b6001600160a01b03165f9081526002602052604090205490565b6101296102cc366004615514565b61062a565b6101296102df366004615559565b6106a3565b61023d6102f23660046155dd565b6106e1565b348015610302575f80fd5b506101e96103113660046154fb565b610784565b61027d61032436600461567d565b6107a1565b348015610334575f80fd5b5061033d6107ea565b6040516101359392919061571f565b348015610357575f80fd5b50610129610366366004615445565b610801565b7f000000000000000000000000000000000000000000000000000000000000000080156103b357600263929eee145c146103b05763a61be9f05f52346020526024601cfd5b50565b63929eee1454806103e057600263929eee145c146103dc5763a61be9f05f52346020526024601cfd5b5050565b600381146103dc5763a61be9f05f52346020526024601cfd5b5f61040261080c565b92915050565b60606104126109c0565b905090565b5f6104126109de565b63929eee14546001147f000000000000000000000000000000000000000000000000000000000000000080610453575080155b1561047157604051630f45b98b60e41b815260040160405180910390fd5b61049a7f0000000000000000000000000000000000000000000000000000000000000000610a4b565b6104b7576040516370a4078f60e01b815260040160405180910390fd5b5f63929eee145550565b5f806104cd6004610aa9565b90506104f16104e282610ab95b63ffffffff16565b610140830135610b36565b3590565b9392505050565b60608061055d61051361050b6004610aa9565b610c7a6104da565b61052a61052260046020610ce2565b610d006104da565b61054161053960046040610ce2565b610d586104da565b61055061053960046060610ce2565b89338a15028a0189610db0565b915091509b509b9950505050505050505050565b5f6104f161058a6105826004610aa9565b610dea6104da565b610e42565b606061061f6105a96105a16004610aa9565b610f636104da565b604080515f8082526020820190925290610601565b6105ee6040805160a081019091525f808252602082019081526020015f81526020015f8152602001606081525090565b8152602001906001900390816105be5790505b5061061961061160046020610ce2565b610fbb6104da565b33611013565b90505b949350505050565b5f6104f161064361063b6004610aa9565b6110516104da565b604080515f808252602082019092529061069b565b6106886040805160a081019091525f808252602082019081526020015f81526020015f8152602001606081525090565b8152602001906001900390816106585790505b5084336110c7565b5f6106d76106bc6106b46004610aa9565b6112466104da565b6106cb61052260046020610ce2565b853386150286016110c7565b9695505050505050565b6060806107736106f46105a16004610aa9565b604080515f808252602082019092529061074c565b6107396040805160a081019091525f808252602082019081526020015f81526020015f8152602001606081525090565b8152602001906001900390816107095790505b5061075c61053960046020610ce2565b61076b61053960046040610ce2565b883389610db0565b915091509850989650505050505050565b6001600160a01b0381165f90815260208190526040812054610402565b60606107dc6107b361050b6004610aa9565b6107c261052260046020610ce2565b6107d161061160046040610ce2565b338615028601611013565b90505b979650505050505050565b60605f806107f66112a2565b925092509250909192565b5f6104f183836112ee565b5f61012435600281901c90600316600182118334158214806108315761083134611429565b506003841160a0810260240135906502030203010160d01b861a905f630101020360d01b881a610864888289888861143a565b9096509150506101c4600583901b01355f8760058111156108875761088761532f565b036108bc5760443560243517156108a557636ab37ce75f526004601cfd5b6108af8482611757565b6108b761180f565b61099d565b6040805160208082528183019092525f9160208201818036833701905050905060028a60058111156108f0576108f061532f565b036109135761090e60c4356084353360e435610104355b878761188f565b610988565b60038a60058111156109275761092761532f565b036109455761090e60c4356084353360e435610104355b87876118da565b60048a60058111156109595761095961532f565b036109735761090e60243533608435604435606435610907565b6109886024353360843560443560643561093e565b6109928482611910565b61099b816119ca565b505b6109a88689846119ee565b6109b0611a64565b6001995050505050505050505090565b6060602080526d0d436f6e73696465726174696f6e604d5260606020f35b5f6109e7611ab7565b600143034060801c335f525f60205260405f208054820192508281555050336001600160a01b03167f721c20121297512b72821b97f5326877ea8ecf4bb9948fea5bfcb6453074d37f82604051610a4091815260200190565b60405180910390a290565b5f816001600160a01b0316600a5a610a639190615779565b6040515f8181818686fa925050503d805f8114610a9b576040519150601f19603f3d011682016040523d82523d5f602084013e610aa0565b606091505b50909392505050565b5f813563ffffffff168201610402565b5f610acc61016060408051918201905290565b9050610adb8282610140611b2e565b610af8610af1610aec846040610ce2565b611b37565b6040830152565b5f610b0c610b07846060610ce2565b611b8a565b9050610b19816060840152565b610b2c610b24825190565b610140840152565b50919050565b0190565b610140820151604080519084015180515f939284927f000000000000000000000000000000000000000000000000000000000000000092602090910190845b81811015610ba2578251601f1901805186825260c082208652905260209384019390920191600101610b75565b508060051b6040512094505050505f7f0000000000000000000000000000000000000000000000000000000000000000915060405160206060890151015f5b86811015610c0e578151601f1901805186825260e082208552905260209283019290910190600101610be1565b505060408051600587901b9020601f198a0180517f00000000000000000000000000000000000000000000000000000000000000008252928b01805197815260608c018051938152610140909c019a8b5261018082209390915295909552939097525050925250919050565b5f8063ffffffff8335169050600581901b610c9e6020820160408051918201905290565b828152925060208381019085015f5b83811015610cd857610cd0610cca610cc58484610ce2565b611246565b82850152565b602001610cad565b5050505050919050565b5f6104f163ffffffff610cfa6104ed8686610b328516565b16840190565b5f8063ffffffff8335169050600581901b610d246020820160408051918201905290565b828152925060208381019085015f5b83811015610cd857610d50610cca610d4b8484610ce2565b611bcd565b602001610d33565b5f8063ffffffff8335169050600581901b610d7c6020820160408051918201905290565b828152925060208381019085015f5b83811015610cd857610da8610cca610da38484610ce2565b611c0f565b602001610d8b565b60608036155f80610dc48c8c85898b611c52565b91509150610dd78c8b8b8b8b878761202f565b9450945050505097509795505050505050565b5f8063ffffffff8335169050600581901b610e0e6020820160408051918201905290565b828152925060208381019085015f5b83811015610cd857610e3a610cca610e358484610ce2565b612161565b602001610e1d565b5f610e4b611ab7565b5f805f80855190505f5b81811015610f56575f878281518110610e7057610e70615798565b60209081029190910101518051909150600481608001516004811115610e9857610e9861532f565b03610ea4575050610f4e565b80519450610eb1816121a4565b5f8181526001602052604081209850909650610ed390879089903615156121dd565b50865460ff16610f4b5780610140015181606001515114610ef657610ef661226b565b610f0585878460200151612278565b865460ff191660011787556040517ff280791efe782edcf06ce15c8f4dff17601db3b88eb3805a0db7d77faf757f0490610f42908890849061589b565b60405180910390a15b50505b600101610e55565b5060019695505050505050565b5f8063ffffffff8335169050600581901b610f876020820160408051918201905290565b828152925060208381019085015f5b83811015610cd857610fb3610cca610fae8484610ce2565b611051565b602001610f96565b5f8063ffffffff8335169050600581901b610fdf6020820160408051918201905290565b828152925060208381019085015f5b83811015610cd85761100b610cca6110068484610ce2565b612314565b602001610fee565b60605f36151590505f8061102b8888858b5189611c52565b9150915061103882612347565b6110458887848885612386565b98975050505050505050565b5f61106461020060408051918201905290565b60a0810180825290915061108061107a84610aa9565b82612459565b61108c60016020840152565b61109860016040840152565b6110b56110ae6110a9856020610ce2565b61248f565b6060840152565b610b2c6110c06124b7565b6080840152565b835160808101515f91906110ee60048260048111156110e8576110e861532f565b146124d1565b5f80806110fd8a361515612572565b60408051600180825281830190925293965091945092505f9190816020015b61112461502d565b81526020019060019003908161111c5790505090508a815f8151811061114c5761114c615798565b6020026020010181905250611161818b61276a565b61116d8684848b6128e3565b6040805160018082528183019092525f9160208083019080368337509192505050361515600487818111156111a4576111a461532f565b146111c7576111b58d83885f6129e3565b6111c186868684612a35565b506111d9565b6111d6888e6080015183612b39565b95505b6111e4888c8c612c09565b85825f815181106111f7576111f7615798565b60200260200101818152505061120e8d8388612d2c565b61122b86895f01518a602001518d8c604001518d60600151612df9565b611233611a64565b5060019c9b505050505050505050505050565b5f61125961020060408051918201905290565b905061126d60208381019083016040611b2e565b60a0810180825261128061107a84610aa9565b6112916110ae6110a9856060610ce2565b610b2c6110c06110a9856080610ce2565b60605f805f6112af612e5e565b90505f7f0000000000000000000000000000000000000000000000000000000000000000905060605f5281602052806040526303312e3660635260a05ff35b5f6112f7611ab7565b5f8083815b8181101561140e573687878381811061131757611317615798565b9050602002810190611329919061597d565b90505f61133960208301836154fb565b90505f61134c60408401602085016154fb565b90505f61135f60a085016080860161599c565b905081331483331417156004821417871796505f6113936113886113808790565b610ab96104da565b866101400135610b36565b5f8181526001602052604090819020805461ffff19166101001781559051909a509091506001600160a01b0380851691908616907f6bacc01dbe442496068f7d234edd811f1a5f833243e0aec824f86ab861f3c90d906113f69085815260200190565b60405180910390a385600101955050505050506112fc565b5050801561141e5761141e612f3b565b506001949350505050565b63a61be9f05f52806020526024601cfd5b5f806114455f6124d1565b61144d612f48565b42610164351115426101443511171561147b576321ccfeb75f5261014435602052610164356040526044601cfd5b610204356102643510156114965763466aa6165f526004601cfd5b7f0000000000000000000000000000000000000000000000000000000000000000608081905260a08790526060602460c037604060646101203760e060802061016052610264356102043560051b6102a0016001820181526020810190508881526080602460208301376101608860a0528760c0525f60e0525f6102043593505f5b8481101561156c578060400261028401602081610100376040816101203760208101358317925060208401935060e0608020845260a0850194508b85528a6020860152604081606087013750600101611518565b6001850160051b610160206060526102643594505b848110156115bc578060400261028401925060a0840193508a8452896020850152604083606086013760208301359190911790600101611581565b506001600160a01b038111156115d9576339f3e3fd5f526004601cfd5b50505050505f7f00000000000000000000000000000000000000000000000000000000000000009050806080528360a052606060c460c0376020610104610120375060c06080205f9081526020812060e0526084359061164d826001600160a01b03165f9081526020819052604090205490565b7f000000000000000000000000000000000000000000000000000000000000000060808190529091506040608460a03760605161010052896101205260a061014461014037816101e05261018060802094505050506102043560051b61018001828152336020820152608060408201526101206060820152600160808201528360a0820152606060c460c083013760a061026435026101e00160a4356084357f9d9af8e38d66c62e2c12f0225249fd9d721c54b83f48d9352c97c6cacdcb6f318385a35f60605260608101820160405250505f61172983612f93565b90506117358389612fe4565b7101000000000000000000000000000001000182559150509550959350505050565b60c43560843560e4356101043584156117bf575f6040519050632671a55160e11b815260206004820152600160248201528660448201528460648201528360848201523360a48201528260c48201528160e48201526117b98682610104613039565b50611807565b60028660058111156117d3576117d361532f565b036117fa57806001146117e9576117e9816130f0565b6117f584843385613101565b611807565b61180784843385856131b6565b505050505050565b346064356084356102643560061b5f80805b838110156118605761028481013592506102a48101359150868311156118495761184961328d565b8287039650611858828461329a565b604001611821565b50858511156118715761187161328d565b61187b848661329a565b84861115611807576118073386880361329a565b61189981836132d0565b816118c057826001146118af576118af836130f0565b6118bb87878787613101565b6118d1565b6118d1828260028a8a8a8a8a6132ee565b50505050505050565b6118e38361336d565b6118ed81836132d0565b816118ff576118bb87878787876131b6565b6118d1828260038a8a8a8a8a6132ee565b5f805f805f861561193557505060843592503391505060c4356101043560e43561194a565b50339350506084359150506024356064356044355b80156119585761195861337f565b50600586901b6101e403356102643560061b5f80805b838110156119af5761028481013592506102a481013591508a156119995761199683876159ba565b95505b6119a7878a8486898f61338c565b60400161196e565b506119be86898988888e61338c565b50505050505050505050565b60408151146119d65750565b5f6119e2826020015190565b90506103dc81836133c1565b611a0a8260a4355b331415600182116004909210919091161690565b15611a5f57805f611a19825190565b9050608081901c63ffffffff8216611a3a84826317b1f94282526001905250565b601c840163fb5014fc6060529350611a5660a4358886856133e5565b5f6060526118d1565b505050565b7f00000000000000000000000000000000000000000000000000000000000000008015611a95575f63929eee145d50565b63929eee145480611aab575f63929eee145d5050565b50600163929eee145550565b7f00000000000000000000000000000000000000000000000000000000000000008015611af65763929eee145c156103b057637fa8a9875f526004601cfd5b63929eee145480611b195763929eee145c156103dc57637fa8a9875f526004601cfd5b600181146103dc57637fa8a9875f526004601cfd5b80838337505050565b5f63ffffffff8235166040519150808252602082018160051b81018060a084026020870183378293505b81841015611b7a5780845260209093019260a001611b61565b60405250919392505050565b9052565b5f63ffffffff8235166040519150808252602082018160051b81018060c084026020870183378293505b81841015611b7a5780845260209093019260c001611bb4565b5f611bdf60a060408051918201905290565b9050611bed82826080611b2e565b611c0a611c03611bfe846080610ce2565b61342d565b6080830152565b919050565b5f63ffffffff8235166040519150808252602082018160051b8101808360061b6020870183378293505b81841015611b7a57808452602090930192604001611c39565b60605f611c5f60016124d1565b86515f90600160e61b82351690806001600160401b03811115611c8457611c84615751565b604051908082528060200260200182016040528015611cad578160200160208202803683370190505b50945060010160051b91505f60205b83811015611eae575f611cd28c83613cd46104da565b90505f805f611ce1848e612572565b6001600160781b0382166020880152919450925090505f829003611d085750505050611ea6565b6001600160781b0381166040808601919091528a8601849052845160a081015160c0820151608083015192909301518051600184119d909d179c600490931099509092915f5b81811015611df0575f838281518110611d6957611d69615798565b602002602001015190508b8151108d179c505f611d8b89898460800151613464565b90508160800151826060015103611da85760608201819052611dbd565b611db789898460600151613464565b60608301525b5f611dd68360600151838a8a611dd1361590565b6134a0565b606084018190526080909301929092525050600101611d4e565b5087516060015180515f5b81811015611e9a575f838281518110611e1657611e16615798565b602002602001015190505f611e308b8b8460800151613464565b90508160800151826060015103611e4d5760608201819052611e62565b611e5c8b8b8460600151613464565b60608301525b5f611e778360600151838c8c611dd136151590565b6060840181905260a0840180516080909501949094529092525050600101611dfb565b50505050505050505050505b602001611cbc565b50506001600160e61b018103611ec657611ec66134f3565b50611ed1888861276a565b5f8060205b8381101561201457858101519250821561200c575f611ef88c83613cd46104da565b9050885f03611f13575f87830181905260209091015261200c565b60048151608001516004811115611f2c57611f2c61532f565b14611faf57611f458188866001600587901c038e613500565b611f5b575f87830181905260209091015261200c565b602080820151604083015183516080810151930151611f949388936001600160781b039081169316913314156001909111168e17612a35565b611faa575f87830181905260209091015261200c565b611fda565b611fc1815f015182608001518c612b39565b878301819052935083611fda575f60209091015261200c565b886001900398505f815f0151905061200585825f015183602001518c85604001518660600151612df9565b6001935050505b602001611ed6565b50806120225761202261355b565b5050509550959350505050565b85518551606091829161204281836159cd565b6001600160401b0381111561205957612059615751565b60405190808252806020026020018201604052801561209257816020015b61207f615060565b8152602001906001900390816120775790505b5092505f5b828110156120ea576120c58c5f8d84815181106120b6576120b6615798565b60200260200101518c8c613568565b8482815181106120d7576120d7615798565b6020908102919091010152600101612097565b505f5b818110156121435761211c8c60018c848151811061210d5761210d615798565b60200260200101518c5f613568565b848483018151811061213057612130615798565b60209081029190910101526001016120ed565b506121518b84888a896135b7565b9350505097509795505050505050565b5f6121726040808051918201905290565b905061218c61218861218384610aa9565b6138a0565b8252565b611c0a61219d6110a9846020610ce2565b6020830152565b5f6121b98260600151518361014001516138bf565b81516001600160a01b03165f90815260208190526040902054610402908390610b36565b82545f90610100900460ff16156122045781156121fd576121fd856138cf565b505f610622565b83546201000090046001600160781b0316801561225f57831561222f5761222a866138e0565b61225f565b8454600160881b90046001600160781b0316811061225f57821561225657612256866138f1565b5f915050610622565b50600195945050505050565b632165628a5f526004601cfd5b33831480156122875750505050565b5f612290612e5e565b61190160f01b5f9081526002828152602287815260428320908390528651939450929190601f601d840116106102e260621984011016156122fa576122d58688613902565b61190160f01b5f908152600286905260228281526042822091905290975090506122fd565b50815b61230a888285858a613998565b5050505050505050565b5f6123256040808051918201905290565b9050612336612188610da384610aa9565b611c0a61219d610da3846020610ce2565b80518060051b6040019050602082038051602082527f4b9f2d36e1b4c93de62cc077b00b1a91d84b6c31b4a14e012718dcca230689e78383a190525050565b8351606090806001600160401b038111156123a3576123a3615751565b6040519080825280602002602001820160405280156123dc57816020015b6123c9615060565b8152602001906001900390816123c15790505b5091505f5b8181101561243f575f8782815181106123fc576123fc615798565b6020026020010151905061241989825f0151836020015185613ae1565b84838151811061242b5761242b615798565b6020908102919091010152506001016123e1565b5061244d87838787876135b7565b50505b95945050505050565b6124668282610160611b2e565b612477610af1610aec846040610ce2565b6103dc612488610b07846060610ce2565b6060830152565b6040518135601f0163ffffffe01660200180838337913563ffffffff16815290810160405290565b5f6124c9602060408051918201905290565b5f8152905090565b7f0000000000000000000000000000000000000000000000000000000000000000801561251e5763929eee145c1561251057637fa8a9875f526004601cfd5b8160010163929eee145d5050565b63929eee1454806125505763929eee145c1561254157637fa8a9875f526004601cfd5b8260010163929eee145d505050565b6001811461256557637fa8a9875f526004601cfd5b505060020163929eee1455565b5f805f80855f0151905061258f8160a001518260c0015187613c86565b6125a257505f9250829150819050612763565b602086015160408701516001600160781b0391821694501691505f6004826080015160048111156125d5576125d561532f565b0361260257600183850218905080156125f0576125f0613ca9565b50600193508392508291506127639050565b50818311831517801561261757612617613ca9565b608082015160011615848411161561263157612631613cb6565b61263a826121a4565b5f81815260016020526040812091965061265890879083908a6121dd565b61266b57505f9350839250612763915050565b805460ff1661268657612686835f0151878a60600151612278565b8054608881901c8061269a5786915061275d565b6001600160781b038260101c169150600186036126be57818103965080955061275d565b8086036126d95790860185810386821102909603959061275d565b80860296810291909502810186810387821102918290039695919003906001600160781b0386111561275d5761271d565b5f5b8215610b2c5790829006919061270c565b61273061272a878461270a565b8861270a565b8015019687900496909504946001600160781b0386111561275d57634e487b715f5260116020526024601cfd5b50505050505b9250925092565b805182515f5b82811015612859575f84828151811061278b5761278b615798565b602002602001015190505f815f015190508381106127b0576127b08260200151613cc3565b5f8782815181106127c3576127c3615798565b6020026020010151905080602001516001600160781b03165f036127e957505050612851565b80516040808201519085015163bfb3f8ce5f876020015160018111156128115761281161532f565b1461282d575f612822856060613cd4565b9350636088d7de9150505b8251821061283e57805f526004601cfd5b612849838389613cdf565b505050505050505b600101612770565b505f5b818110156128dc575f85828151811061287757612877615798565b6020026020010151905080602001516001600160781b03165f0361289b57506128d4565b8051608081015160608201516128b89085908363a8930e9a613d92565b6128d08483604001518363d69293326104da613d9290565b5050505b60010161285c565b5050505050565b60a084015160c08501516040860151515f805b82811015612960575f8960400151828151811061291557612915615798565b602002602001015190505f815f01519050801584179350505f61294c826060015183608001518c8c8b8b612947361590565b613df9565b6060830152506080018690526001016128f6565b506080880151600481108216801561297a5761297a6134f3565b505050506060860151515f5b8181101561230a575f886060015182815181106129a5576129a5615798565b602002602001015190505f6129ca826060015183608001518b8b8a8a61294736151590565b60608301525060a0810151608090910152600101612986565b8351608081015160208201513314156001821160049092109190911616156128dc575f80612a18858489608001518988613e34565b63fb5014fc6060529092509050611a5683602001518684846133e5565b5f848152600160205260408120805482908290608881901c80612a5a57889150612ae2565b6001600160781b038260101c169150808803612a7e57908801878111935090612ae2565b97880297808802979190910288018781119350906001600160781b038083119089111715612ae257612ab0888361270a565b8015019788900497909104906001600160781b038083119089111715612ae257634e487b715f5260116020526024601cfd5b508215612b1b578515612b0f576040516310fda3e160e01b8152600481018a905260240160405180910390fd5b5f945050505050610622565b8660881b8160101b1760011782556001945050505050949350505050565b5f83610140015184606001515114612b5357612b5361226b565b83515f8080612b628888613fb2565b915091505f8082845f885af16001600160a01b0385165f908152600260205260409020805460018101909155606086901b189550925082612bc1578515612bb457612bab61405c565b612bb4856140a3565b505f93506104f192505050565b505050505f805f612bde876040015188606001516104da6140b490565b925092509250825f14612bf457612bf4846140a3565b60408701919091526060860152509392505050565b6040805160208082528183019092525f916020820181803683375050506040850151519091505f5b81811015612c81575f86604001518281518110612c5057612c50615798565b60200260200101519050846080820152612c7881885f0151896101200151876104da61432d90565b50600101612c31565b50506060840151515f90815b81811015612d0f575f87606001518281518110612cac57612cac615798565b602002602001015190505f6005811115612cc857612cc861532f565b81516005811115612cdb57612cdb61532f565b03612cf7574793508381606001511115612cf757612cf761328d565b612d068133898861432d6104da565b50600101612c8d565b5050612d1a826119ca565b504780156128dc576128dc338261329a565b8251608081015160208201515f92839283928392916004811060019091111633909114151615612d8e57612d6f612d6961010083015190565b5190565b88614422565b9093509150612d8060208201612d65565b945063fb5014fc9350612dda565b600481608001516004811115612da657612da661532f565b0361230a57805194505f8560601b9050612dc787838b608001518b85614463565b639397928596509094509250612dda9050565b612de46060859052565b612df0858785856133e5565b5f60605261230a565b60608290506060829050856001600160a01b0316876001600160a01b03167f9d9af8e38d66c62e2c12f0225249fd9d721c54b83f48d9352c97c6cacdcb6f318a888686604051612e4c9493929190615a19565b60405180910390a35050505050505050565b5f7f00000000000000000000000000000000000000000000000000000000000000004614612f16575060408051608080517f00000000000000000000000000000000000000000000000000000000000000005f9081527f00000000000000000000000000000000000000000000000000000000000000006020527f0000000000000000000000000000000000000000000000000000000000000000855246606090815230845260a08220949095529093529190915290565b507f000000000000000000000000000000000000000000000000000000000000000090565b63fed398fc5f526004601cfd5b600435602014610224356102401416610244356102606102643560061b01141660186101243510600160a01b60843560a4351760c4356024351717101616806103b0576103b061452e565b5f8181526001602081905260409091209060843590612fb890849084903615156121dd565b50815460ff16610b2c57610b2c8184612fdf602463ffffffff61024435160161248f6104da565b612278565b5f612ff18260a4356119f6565b15610402575f805f6130028661453b565b63fb5014fc6060529194509250905061302260a43587601c8601856133e5565b5f60605260209190910160801b1781529392505050565b604080517f000000000000000000000000000000000000000000000000000000000000000060ff60a01b175f90815260208690527f000000000000000000000000000000000000000000000000000000000000000083526055600b20919092526001600160a01b031690505f805f805260205f85875f875af191505f519050816130ce576130c561405c565b6130ce836145f3565b6001600160e01b03198116632671a55160e11b14611807576118078684614604565b6369f958275f52806020526024601cfd5b833b61311857635f15d6725f52836020526024601cfd5b6040516323b872dd60e01b5f528360045282602452816044525f8060645f80895af1806131a8573d1561318657601f3d0160051c8260051c816003028183111561316f578183036003028280028480020360091c01015b5a602082011015613182573d5f803e3d5ffd5b5050505b63f486bc875f5285602052846040528360605282608052600160a05260a4601cfd5b5060405250505f6060525050565b843b6131cd57635f15d6725f52846020526024601cfd5b60405160805160a05160c051637921219560e11b5f528760045286602452856044528460645260a06084525f60a4525f8060c45f808d5af180613272573d1561325157601f3d0160051c8560051c816003028183111561323a578183036003028280028480020360091c01015b5a60208201101561324d573d5f803e3d5ffd5b5050505b63f486bc875f52896020528860405287606052866080528560a05260a4601cfd5b5060809290925260a05260c05260405250505f606052505050565b638ffff9805f526004601cfd5b6132a38161336d565b5f805f805f85875af1905080611a5f576132bb61405c565b63bc806b965f5282602052816040526044601cfd5b5f6132dc836020015190565b9050818114611a5f57611a5f836119ca565b5f60208851036133285750604080885260208089018a9052632671a55160e11b918901919091526044880152600160648801819052613337565b50606487018051600101908190525b603c60c082028901038781528660208201528560408201528460608201528360808201528260a082015250505050505050505050565b806103b0576391b3e5145f526004601cfd5b636ab37ce75f526004601cfd5b6133958361336d565b61339f81836132d0565b816133b0576117f586868686614619565b611807828260018989895f8a6132ee565b6064810151604082019060c0026044016133dc848383613039565b50506020905250565b5f806001600160e01b03198451165f805260205f85875f8b5af15f519093501490508161341e5761341461405c565b846080526024607cfd5b8061180757846080526024607cfd5b5f8063ffffffff83351690506001810160051b6134508160408051918201905290565b925061345d848483611b2e565b5050919050565b5f8284036134735750806104f1565b82848309156134895763c63cf0895f526004601cfd5b5f6134948584615ab5565b93909304949350505050565b5f8486146134e957838303428590038082035f6134bd838a615ab5565b6134c7838c615ab5565b6134d191906159cd565b90508584878303040181151502945050505050612450565b5092949350505050565b6312d3f5a35f526004601cfd5b8451608081015160208201515f92916004811060019091111633909114151615610f56575f8061353787848b608001518b8a613e34565b91509150613551836020015188848463fb5014fc8a61470d565b9350505050612450565b63d5da9a1b5f526004601cfd5b613570615060565b83515f03613581576135818561477a565b5f8560018111156135945761359461532f565b036135aa576135a58685838561478b565b612450565b61245086858333876148fb565b84516060905f816001600160401b038111156135d5576135d5615751565b6040519080825280602002602001820160405280156135fe578160200160208202803683370190505b506040805160208082528183019092529192505f9190602082018180368337505089519192505060010160051b60205b8181101561368d575f6136448b83613cd46104da565b8051606081015191925090801561368257478111825115161561366e57638ffff9805f526004601cfd5b61368282846020015185604001518961432d565b50505060200161362e565b50505f5b838110156137f9575f8a82815181106136ac576136ac615798565b6020026020010151905080602001516001600160781b03165f036136f3575f8483815181106136dd576136dd615798565b91151560209283029190910190910152506137f1565b600184838151811061370757613707615798565b911515602092830291909101909101528051604081015180515f5b8181101561378c575f83828151811061373d5761373d615798565b6020026020010151905080606001515f1461377957608081018051908e905285516101208701516137739184918c61432d6104da565b60808201525b6080810151606090910152600101613722565b505050606081015180515f5b818110156137eb575f8382815181106137b3576137b3615798565b602002602001015190505f81606001519050805f146137d7576137d7888483614a32565b5060a0810151606090910152600101613798565b50505050505b600101613691565b50613803816119ca565b47801561381457613814338261329a565b851561388a575f5b848110156138885783818151811061383657613836615798565b602002602001015115613880576138808b828151811061385857613858615798565b60200260200101518a8b848151811061387357613873615798565b6020026020010151612d2c565b60010161381c565b505b613892611a64565b509098975050505050505050565b5f6138b361016060408051918201905290565b9050611c0a8282612459565b808210156103dc576103dc614a4b565b631a5155745f52806020526024601cfd5b63ee9e0e635f52806020526024601cfd5b6310fda3e15f52806020526024601cfd5b5f805f84516001811660410380820360051c9250808752806020018701915050805160e81c6003820191506001811660051b868152825160208218525060015b8381101561396e5760405f2082821c60051b602090811691825293840180519190941852600101613942565b50505060405f2091505f61398182614a58565b5f9081526020939093525050604090209392505050565b5f805f528151602083038051826041035f600182116139fb57604087015160608801515f1a83156139dc57601b8260ff1c0190506001600160ff1b03821660408a01525b88528a855260205f60808760015afa508385528588526040880152505f515b8a148a1515169450849050613ac457858552604082526044850380516040870351630b135d3f60e11b835289604089035260205f60648b01858f5afa96508615613ab857630b135d3f60e11b5f5114613ab8578b3b15613a6257634f7fb80d5f526004601cfd5b6001866041031115613a7b57638baa579f5f526004601cfd5b64010100000060608901515f1a1a15604187141615613aab57631f003d0a5f5260608801515f1a6020526024601cfd5b63815e1d645f526004601cfd5b8385529152603f198601525b5050508061180757613ad461405c565b634f7fb80d5f526004601cfd5b613ae9615060565b8251158451151715613b02576398e9db6e5f526004601cfd5b613b0a615060565b613b178685835f806148fb565b805160608101515f03613b2c57509050610622565b613b3c878785846080015161478b565b82516040828101519082015160208085015190840151855185511891181791181715613b735763bced929d5f52846020526024601cfd5b806060015182606001511115613bfa575f865f81518110613b9657613b96615798565b60200260200101519050816060015183606001510389825f015181518110613bc057613bc0615798565b60200260200101515f015160600151826020015181518110613be457613be4615798565b6020026020010151606001818152505050613c7b565b5f875f81518110613c0d57613c0d615798565b60200260200101519050826060015182606001510389825f015181518110613c3757613c37615798565b60200260200101515f015160400151826020015181518110613c5b57613c5b615798565b602002602001015160600181815250508260600151826060018181525050505b505050949350505050565b428084111590831116818015613c9a575080155b156104f1576104f18484614e67565b635a052b325f526004601cfd5b63a11b63ff5f526004601cfd5b63133c37c65f52806020526024601cfd5b5f6104f18284015190565b5f838381518110613cf257613cf2615798565b602002602001015190505f815f01519050613d0d8160031090565b613d1957613d19614e7c565b60408201518015613d3c57613d378460600151828660800151614e89565b613d4f565b60808401515115613d4f57613d4f614ed3565b6004821460030383816005811115613d6957613d6961532f565b90816005811115613d7c57613d7c61532f565b9052505050606090920151604090910152505050565b82515f5b81811015611807575f858281518110613db157613db1615798565b60209081029190910101518051604082015191925090600382116004881415821515171615613deb57855f5288602052836040526044601cfd5b505050806001019050613d96565b5f868803613e1357613e0c868689613464565b90506107df565b6107dc613e2187878b613464565b613e2c88888b613464565b8686866134a0565b5f805f613e3f614ee0565b6301e4d72a815260208082015260408101898152336060830152601c820194509091508751604082015287613e7f613e7860a083015190565b60e0840152565b613e95613e8d60c083015190565b610100840152565b613eab613ea360e083015190565b610120840152565b610140613eb9816060850152565b5f613ec5604084015190565b90505f613ed482848701614eea565b928301929050613ee5836080870152565b5f613ef1606086015190565b90505f613f0082868901614f50565b948501949050613f118560a0890152565b5f613f1e8e878a01614fb5565b959095019450613f2f8560c0890152565b8685015f613f3d8e83614fd4565b602497019687019a50613f599050613f548c8c0190565b615004565b8060408b901b60808b901b17178f610100018181525050613f838c82611b8690919063ffffffff16565b60058c8e51613f9291906159ba565b613f9d911b8b6159ba565b99505050505050505050509550959350505050565b5f8083613fbd614ee0565b639891976581523360208201908152608060408301819052601c9092019450905f613fe9604085015190565b90505f613ff882848601614eea565b928301929050614009836040860152565b5f614015606087015190565b90505f61402482868801614eea565b948501949050614035856060880152565b895f61404382898901614fb5565b9a9d96909a016004019b50949950505050505050505050565b3d156140a157601f3d0160051c60405160051c816003028183111561408e578183036003028280028480020360091c01015b5a602082011015611a5f573d5f803e3d5ffd5b565b63939792855f52806020526024601cfd5b60603d105f8080808080866141265760405f803e5f51935060205192503d60208501113d60208501118082179850505086614126576020845f3e5f51915060208360203e60205190508160071b60208501018160a0026020850101803d10823d101761ffff8486171117985050505f80525b86614158575f8061413b84602088018d614161565b9250975061414d83602087018c614241565b929092179850909550505b50505050612763565b5f806040519150825160c08602602001830160405285835260208660010160051b8085018360010160051b870161419f858b81811090829003020190565b60010160051b8a861196505b808510156141ff57828589015260808a843e6060830151955085608084015260608201518681116141dc85856142e8565b17881797505060808a01995060a08301925060a0820191506020850194506141ab565b50505b81831015614235578083870152608088823e6060810151608082015260808801975060a081019050602083019250614202565b50505050935093915050565b604051815180851190808603818710028101602060e08202850181016040528185526001928301600590811b87019390920190911b908185015b8282101561423557808287015260a088823e60206060890160a083013e606081015160608501516142b86080840151608088015180159114171590565b818311176142c684886142e8565b60a09b909b019a179690961795505060c093840193602092909201910161427b565b5f81516040830151801560038311161561430a57506040840151600119909101905b604085015181148551831460208701516020870151141616159250505092915050565b5f845160058111156143415761434161532f565b0361437e57604084015160208501516001600160a01b031617156143675761436761337f565b6143798460800151856060015161329a565b61441c565b6001845160058111156143935761439361532f565b036143c4576040840151156143aa576143aa61337f565b61437984602001518486608001518760600151868661338c565b6002845160058111156143d9576143d961532f565b036143fd57614379846020015184866080015187604001518860600151878761188f565b61441c84602001518486608001518760400151886060015187876118da565b50505050565b608082901c63ffffffff604084901c8116908085169061444a9084906317b1f94290611b8616565b601c8301925061445a8482614fd4565b50509250929050565b5f8061446d614ee0565b63f4dd92ce815287841860a0820152601c8101925060200160a0808252875f614497604083015190565b90505f6144a682858701614eea565b9384019390506144b7846020870152565b5f6144c3606085015190565b90505f6144d282878901614f50565b9586019590506144e3866040890152565b5f6144f08d888a01614fb5565b9687019690506145018760608a0152565b5f61450e8d898b01614fd4565b905080880197508760040199505050505050505050509550959350505050565b6339f3e3fd5f526004601cfd5b6301e4d72a6102043560051b6080019081525f808260208082015260408101858152336060830152601c9190910190614575608435610af1565b61458661014460e083016060611b2e565b610140614594816060840152565b6145a260a082016080840152565b61016060a06102643581029290920101906145be908290840152565b6145c85f82840152565b6020016145d68160c0840152565b5f9181019182526020820196909652939560449095019492505050565b63d13d53d45f52806020526024601cfd5b631cf99b265f5281602052806040526044601cfd5b6040516323b872dd60e01b5f5283600452826024528160445260205f60645f80895af1803d15601f3d1160015f51141617163d151581166146fe5780873b1515166146fe57806146ed57816146d0573d156146af57601f3d0160051c8360051c8160030281831115614698578183036003028280028480020360091c01015b5a6020820110156146ab573d5f803e3d5ffd5b5050505b63f486bc875f528660205285604052846060525f6080528360a05260a4601cfd5b63988919235f52866020528560405284606052836080526084601cfd5b635f15d6725f52866020526024601cfd5b505060405250505f6060525050565b5f805f6001600160e01b03198751165f805260205f888a5f8e5af15f51909350149050816147595783614744575f925050506106d7565b61474c61405c565b845f52876020526024601cfd5b8061476b57845f52876020526024601cfd5b50600198975050505050505050565b63375c24c15f52806020526024601cfd5b5f805f85865160051b87015b808210156148a8576020820191508851825151106147b7576147b76148dc565b81515160051b60208a01015180516020845101515f6040830151602085015115815184101517156147ec575050505050614797565b8260051b60208201015191505060608101935083518901915083511589831060011b17881797508198505f84528a5193508615600181146148555760608220881860408d01516101208601511860208e0151865118171715614850576148506148dc565b61489e565b8151855260208201516020860152604082015160408601528a6080860152835160208d015261012084015160408d015260608520975060208d0192508683181561489e57865183525b5050505050614797565b5050508160608551015280156148d557600181036148cd576391b3e5145f526004601cfd5b6148d56148e9565b505061441c565b637fda72795f526004601cfd5b634e487b715f5260116020526024601cfd5b5f805f86875160051b88015b808210156149fd576020820191508151518a518110614928576149286148dc565b8060051b60208c01015190506020835101515f6060835101516020840151158151841015171561495b5750505050614907565b8260051b60208201015191505060608101925082518801915082511588831060011b17871796508197505f83528a5192508515600181146149ad5760a0822087146149a8576149a86148dc565b6149f4565b815184526020820151602085015260408201516040850152608082015160808501528a60208d01528960408d015260a08220965060208d019250858318156149f457855183525b50505050614907565b50508551606001839052508015614a2b5760018103614a23576391b3e5145f526004601cfd5b614a2b6148e9565b50506128dc565b63a5f542085f528260205281604052806060526064601cfd5b63466aa6165f526004601cfd5b5f614e5e565b5f6009821015614bb7576005821015614b14576003821015614ac7577f832c58a5b611aadcfa6a082ac9d04bace53d8278387f10040347b7e98eb5b30260018314027fbf8e29b89f29ed9b529c154a63038ffca562f8d7cd1e2545dda53a1b582dde3018610402565b7ff3e8417a785f980bdaf134fa0274a6bf891eeb8195cd94b09d2aa651046e28bc60038314027fa02eb7ff164c884e5e2c336dc85f81c6a93329d8e9adf214b32729b894de2af118610402565b6007821015614b6a577f25d02425402d882d211a7ab774c0ed6eca048c4d03d9af40132475744753b2a360058314027f1c19f71958cdd8f081b4c31f7caf5c010b29d12950be2fa1c95070dc47e30b5518610402565b7fb58d772fb09b426b9dece637f61ca9065f2b994f1464b51e9207f55f7c8f594860078314027f7ff98d9d4e55d876c5cfac10b43c04039522f3ddfb0ea9bfe70c68cfb5c7cc1418610402565b6011821015614d0f57600d821015614c6c57600b821015614c1f577f6f0ec38c21f6f583ab7f3c5413c773ffd5344c34fde1d390958e438bf667448f60098314027fd1d97d1ef5eaa37a4ee5fbf234e6f6d64eb511eb562221cd7edfbdde0848da0518610402565b7f32f4e7485d6485f9f6c255929b9905c62ba919758bbe231f231eaeecf33d810c600b8314027fbb98d87cc12922b83759626c5f07d72266da9702d19ffad6a514c73a89002f5f18610402565b600f821015614cc2577f8df51df98847160517f5b1186b4bc3f418d98b8a7f17f1292f392d79d600d79e600d8314027f6b5b04cbae4fcb1a9d78e7b2dfc51a36933d023cf6e347e03d517b472a85259018610402565b7fcc4886e37eedd9aacd6c1c2c9247197a621a71282e87a7cbc673f3736d9aa141600f8314027f1da3eed3ecef6ebaa6e5023c057ec2c75150693fd0dac5c90f4a142f9879fde818610402565b6015821015614dbb576013821015614d6e577f2d7a3ed6dab270fdb8e054b2ad525f0ce2a8b89cc76c17f0965434740f673a5560118314027fc3939feff011e53ab8c35ca3370aad54c5df1fc2938cd62543174fa6e7d8587718610402565b7f54b3212a178782f104e0d514b41a9a5c4ca9c980bf6597c3cecbf280917e202a60138314027f5a4f867d3d458dabecad65f6201ceeaba0096df2d0c491cc32e6ea4e6435001718610402565b6017821015614e11577fbb40bf8cea3a5a716e2b6eb08bbdac8ec159f82f380783db3c56904f15a43d0460158314027f3bd8cff538aba49a9c374c806d277181e9651624b3e31111bc0624574f8bca1d18610402565b7f403be09941a31d05cfc2f896505811353d45d38743288b016630cce39435476a60178314027f1d51df90cba8de7637ca3e8fe1e3511d1dc2f23487d05dbdecb781860c21ac1c18610402565b61040282614a5e565b6321ccfeb75f5281602052806040526044601cfd5b6394eb6af65f526004601cfd5b5f835f5260205f2060208301835160051b81015b80821015614ec457815180841160051b93845260209384185260405f209290910190614e9d565b5050831490508061441c5761441c5b6309bde3395f526004601cfd5b5f61041260405190565b5f825180835260208401602084018260051b82015b80831015614f3d5782518051835260208101516020840152604081015160408401526060810151606084015250602083019250608082019150614eff565b5050508060071b60200191505092915050565b5f80614f5a845190565b8084529050602084810190600583901b860181019085015b82821115614fa2575f614f848461500e565b9050614f92818360a0615017565b506020929092019160a001614f72565b60a0840260200194505050505092915050565b5f63ffffffe0603f614fc5855190565b01169050610402838383615017565b5f80614fde845190565b8084529050600581901b614ff9602086810190860183615017565b602001949350505050565b6103b06040829052565b5f610402825190565b8082828560045afa80153d15171561441c575f80fd5b6040518060a001604052806150406150a2565b81525f602082018190526040820152606080820181905260809091015290565b60408051610100810182525f606082018181526080830182905260a0830182905260c0830182905260e083018290528252602082018190529181019190915290565b6040518061016001604052805f6001600160a01b031681526020015f6001600160a01b0316815260200160608152602001606081526020015f60048111156150ec576150ec61532f565b81525f6020820181905260408201819052606082018190526080820181905260a0820181905260c09091015290565b5f6020828403121561512b575f80fd5b81356001600160401b03811115615140575f80fd5b820161024081850312156104f1575f80fd5b5f81518084525f5b818110156151765760208185018101518683018201520161515a565b505f602082860101526020601f19601f83011685010191505092915050565b602081525f6104f16020830184615152565b5f602082840312156151b7575f80fd5b5035919050565b5f602082840312156151ce575f80fd5b81356001600160401b038111156151e3575f80fd5b820161016081850312156104f1575f80fd5b5f8083601f840112615205575f80fd5b5081356001600160401b0381111561521b575f80fd5b6020830191508360208260051b8501011115615235575f80fd5b9250929050565b80356001600160a01b0381168114611c0a575f80fd5b5f805f805f805f805f805f60e08c8e03121561526c575f80fd5b6001600160401b03808d351115615281575f80fd5b61528e8e8e358f016151f5565b909c509a5060208d01358110156152a3575f80fd5b6152b38e60208f01358f016151f5565b909a50985060408d01358110156152c8575f80fd5b6152d88e60408f01358f016151f5565b909850965060608d01358110156152ed575f80fd5b506152fe8d60608e01358e016151f5565b909550935060808c0135925061531660a08d0161523c565b915060c08c013590509295989b509295989b9093969950565b634e487b7160e01b5f52602160045260245ffd5b60068110611b8657611b8661532f565b61535e828251615343565b6020818101516001600160a01b0390811691840191909152604080830151908401526060808301519084015260809182015116910152565b5f815180845260208085019450602084015f5b838110156153eb5781516153be888251615353565b808401516001600160a01b031660a08901526040015160c088015260e090960195908201906001016153a9565b509495945050505050565b604080825283519082018190525f906020906060840190828701845b82811015615430578151151584529284019290840190600101615412565b50505083810360208501526106d78186615396565b5f8060208385031215615456575f80fd5b82356001600160401b0381111561546b575f80fd5b615477858286016151f5565b90969095509350505050565b5f805f8060408587031215615496575f80fd5b84356001600160401b03808211156154ac575f80fd5b6154b8888389016151f5565b909650945060208701359150808211156154d0575f80fd5b506154dd878288016151f5565b95989497509550505050565b602081525f6104f16020830184615396565b5f6020828403121561550b575f80fd5b6104f18261523c565b5f8060408385031215615525575f80fd5b82356001600160401b0381111561553a575f80fd5b83016040818603121561554b575f80fd5b946020939093013593505050565b5f805f805f6080868803121561556d575f80fd5b85356001600160401b0380821115615583575f80fd5b9087019060a0828a031215615596575f80fd5b909550602087013590808211156155ab575f80fd5b506155b8888289016151f5565b909550935050604086013591506155d16060870161523c565b90509295509295909350565b5f805f805f805f8060a0898b0312156155f4575f80fd5b88356001600160401b038082111561560a575f80fd5b6156168c838d016151f5565b909a50985060208b013591508082111561562e575f80fd5b61563a8c838d016151f5565b909850965060408b0135915080821115615652575f80fd5b5061565f8b828c016151f5565b999c989b509699959896976060870135966080013595509350505050565b5f805f805f805f6080888a031215615693575f80fd5b87356001600160401b03808211156156a9575f80fd5b6156b58b838c016151f5565b909950975060208a01359150808211156156cd575f80fd5b6156d98b838c016151f5565b909750955060408a01359150808211156156f1575f80fd5b506156fe8a828b016151f5565b909450925061571190506060890161523c565b905092959891949750929550565b606081525f6157316060830186615152565b6020830194909452506001600160a01b0391909116604090910152919050565b634e487b7160e01b5f52604160045260245ffd5b634e487b7160e01b5f52601160045260245ffd5b5f8261579357634e487b7160e01b5f52601260045260245ffd5b500490565b634e487b7160e01b5f52603260045260245ffd5b5f815180845260208085019450602084015f5b838110156153eb5781516157d4888251615343565b838101516001600160a01b03168885015260408082015190890152606080820151908901526080908101519088015260a090960195908201906001016157bf565b5f815180845260208085019450602084015f5b838110156153eb57815161583d888251615343565b808401516001600160a01b0390811689860152604080830151908a0152606080830151908a0152608080830151908a015260a091820151169088015260c09096019590820190600101615828565b60058110611b8657611b8661532f565b828152604060208201526158bb6040820183516001600160a01b03169052565b5f60208301516158d660608401826001600160a01b03169052565b5060408301516101608060808501526158f36101a08501836157ac565b91506060850151603f198584030160a08601526159108382615815565b925050608085015161592560c086018261588b565b5060a085015160e085015260c0850151610100818187015260e0870151915061012082818801528188015192506101409150828288015280880151848801525080870151610180870152505050809150509392505050565b5f823561015e19833603018112615992575f80fd5b9190910192915050565b5f602082840312156159ac575f80fd5b8135600581106104f1575f80fd5b8181038181111561040257610402615765565b8082018082111561040257610402615765565b5f815180845260208085019450602084015f5b838110156153eb57615a06878351615353565b60a09690960195908201906001016159f3565b5f6080808301878452602060018060a01b03808916602087015260406080604088015283895180865260a08901915060208b0195505f5b81811015615a91578651615a65848251615343565b808701518616848801528481015185850152606090810151908401529585019591870191600101615a50565b50508781036060890152615aa5818a6159e0565b9c9b505050505050505050505050565b80820281158282048414176104025761040261576556fea164736f6c6343000818000a436f6e73696465726174696f6e4974656d2875696e7438206974656d547970652c6164647265737320746f6b656e2c75696e74323536206964656e7469666965724f7243726974657269612c75696e74323536207374617274416d6f756e742c75696e7432353620656e64416d6f756e742c6164647265737320726563697069656e7429454950373132446f6d61696e28737472696e67206e616d652c737472696e672076657273696f6e2c75696e7432353620636861696e49642c6164647265737320766572696679696e67436f6e7472616374294f72646572436f6d706f6e656e74732861646472657373206f6666657265722c61646472657373207a6f6e652c4f666665724974656d5b5d206f666665722c436f6e73696465726174696f6e4974656d5b5d20636f6e73696465726174696f6e2c75696e7438206f72646572547970652c75696e7432353620737461727454696d652c75696e7432353620656e6454696d652c62797465733332207a6f6e65486173682c75696e743235362073616c742c6279746573333220636f6e647569744b65792c75696e7432353620636f756e746572294f666665724974656d2875696e7438206974656d547970652c6164647265737320746f6b656e2c75696e74323536206964656e7469666965724f7243726974657269612c75696e74323536207374617274416d6f756e742c75696e7432353620656e64416d6f756e7429";
const isSuperArgs = (xs) => xs.length > 1;
class Consideration__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(conduitController, overrides) {
        return super.getDeployTransaction(conduitController, overrides || {});
    }
    deploy(conduitController, overrides) {
        return super.deploy(conduitController, overrides || {});
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
exports.Consideration__factory = Consideration__factory;
Consideration__factory.bytecode = _bytecode;
Consideration__factory.abi = _abi;
