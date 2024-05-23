"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seaport__factory = void 0;
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
const _bytecode = "0x61020060405234801562000011575f80fd5b506040516200618b3803806200618b83398101604081905262000034916200031b565b808080808080808080806200004862000179565b610120526101005260e05260c081905260a082815246610140819052604080515f9485526020879052948152606091825230608090815292842085825293909152939052610160526001600160a01b038316610180819052630a96ad3960e01b825282519092630a96ad3992600480820193918290030181865afa158015620000d3573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190620000f991906200034a565b506101a052505f90506200010c620002a0565b90506001600160a01b0381166200013657604051632aea588760e01b815260040160405180910390fd5b5f6200014282620002b9565b8015156101c0526001600160a01b0383166101e0529050806200016857600163929eee14555b5050505050505050505050620003e8565b5f8080808080620001a460408051808201909152600781526614d9585c1bdc9d60ca1b602082015290565b8051906020012095506040518060400160405280600381526020016218971b60e91b8152508051906020012094505f6040518060a00160405280606a815260200162006121606a913990505f6040518060c001604052806084815260200162005f776084913990505f60405180610100016040528060d481526020016200604d60d49139905060405180608001604052806052815260200162005ffb6052913980519060200120965082805190602001209550818051906020012094505f81838560405160200162000279939291906200039c565b60405160208183030381529060405290508080519060200120945050505050909192939495565b5f696002601e613d5c3d52f35f52600a60165ff0905090565b5f816001600160a01b0316600a5a620002d39190620003c8565b6040515f8181818686fa925050503d805f81146200030d576040519150601f19603f3d011682016040523d82523d5f602084013e62000312565b606091505b50909392505050565b5f602082840312156200032c575f80fd5b81516001600160a01b038116811462000343575f80fd5b9392505050565b5f80604083850312156200035c575f80fd5b505080516020909101519092909150565b5f81515f5b818110156200038e576020818501810151868301520162000372565b505f93019283525090919050565b5f620003bf620003b8620003b184886200036d565b866200036d565b846200036d565b95945050505050565b5f82620003e357634e487b7160e01b5f52601260045260245ffd5b500490565b60805160a05160c05160e05161010051610120516101405161016051610180516101a0516101c0516101e051615ad3620004a45f395f61047601525f818161036d0152818161042b01528181611a6001528181611ab301526124cd01525f61306901525f81816112ae015261303901525f612f1301525f612e5b01525f8181610c1e015261164901525f8181610bad015261149201525f8181610b4701526115db01525f612e8b01525f612ed401525f612eb00152615ad35ff3fe608060405260043610610103575f3560e01c8063a900866b11610092578063f07ec37311610062578063f07ec373146102f7578063f2d12b1214610316578063f47b774014610329578063fb0f3ee114610116578063fd9f1e101461034c575f80fd5b8063a900866b1461028a578063b3a34c4c146102be578063e7acab24146102d1578063ed98a574146102e4575f80fd5b80637423eb3c116100d85780637423eb3c146101f757806379df72bd1461020b57806387201b411461022a578063881477321461024b578063a81744041461026a575f80fd5b801561011657806306fdde031461013e57806346423aa71461015f5780635b34b966146101d5575f80fd5b366101125761011061036b565b005b5f80fd5b610129610124366004615115565b6103f9565b60405190151581526020015b60405180910390f35b348015610149575f80fd5b50610152610408565b604051610135919061518f565b34801561016a575f80fd5b506101b36101793660046151a1565b5f9081526001602052604090205460ff808216926101008304909116916001600160781b03620100008204811692600160881b9092041690565b6040805194151585529215156020850152918301526060820152608001610135565b3480156101e0575f80fd5b506101e9610417565b604051908152602001610135565b348015610202575f80fd5b50610110610420565b348015610216575f80fd5b506101e96102253660046151b8565b6104c1565b61023d61023836600461524c565b6104f8565b6040516101359291906153f0565b348015610256575f80fd5b5061012961026536600461543f565b610571565b61027d61027836600461547d565b61058f565b60405161013591906154e3565b348015610295575f80fd5b506101e96102a43660046154f5565b6001600160a01b03165f9081526002602052604090205490565b6101296102cc36600461550e565b61062a565b6101296102df366004615553565b6106a3565b61023d6102f23660046155d7565b6106e1565b348015610302575f80fd5b506101e96103113660046154f5565b610784565b61027d610324366004615677565b6107a1565b348015610334575f80fd5b5061033d6107ea565b60405161013593929190615719565b348015610357575f80fd5b5061012961036636600461543f565b610801565b7f000000000000000000000000000000000000000000000000000000000000000080156103b357600263929eee145c146103b05763a61be9f05f52346020526024601cfd5b50565b63929eee1454806103e057600263929eee145c146103dc5763a61be9f05f52346020526024601cfd5b5050565b600381146103dc5763a61be9f05f52346020526024601cfd5b5f61040261080c565b92915050565b60606104126109c0565b905090565b5f6104126109d8565b63929eee14546001147f000000000000000000000000000000000000000000000000000000000000000080610453575080155b1561047157604051630f45b98b60e41b815260040160405180910390fd5b61049a7f0000000000000000000000000000000000000000000000000000000000000000610a45565b6104b7576040516370a4078f60e01b815260040160405180910390fd5b5f63929eee145550565b5f806104cd6004610aa3565b90506104f16104e282610ab35b63ffffffff16565b610140830135610b30565b3590565b9392505050565b60608061055d61051361050b6004610aa3565b610c746104da565b61052a61052260046020610cdc565b610cfa6104da565b61054161053960046040610cdc565b610d526104da565b61055061053960046060610cdc565b89338a15028a0189610daa565b915091509b509b9950505050505050505050565b5f6104f161058a6105826004610aa3565b610de46104da565b610e3c565b606061061f6105a96105a16004610aa3565b610f5d6104da565b604080515f8082526020820190925290610601565b6105ee6040805160a081019091525f808252602082019081526020015f81526020015f8152602001606081525090565b8152602001906001900390816105be5790505b5061061961061160046020610cdc565b610fb56104da565b3361100d565b90505b949350505050565b5f6104f161064361063b6004610aa3565b61104b6104da565b604080515f808252602082019092529061069b565b6106886040805160a081019091525f808252602082019081526020015f81526020015f8152602001606081525090565b8152602001906001900390816106585790505b5084336110c1565b5f6106d76106bc6106b46004610aa3565b6112406104da565b6106cb61052260046020610cdc565b853386150286016110c1565b9695505050505050565b6060806107736106f46105a16004610aa3565b604080515f808252602082019092529061074c565b6107396040805160a081019091525f808252602082019081526020015f81526020015f8152602001606081525090565b8152602001906001900390816107095790505b5061075c61053960046020610cdc565b61076b61053960046040610cdc565b883389610daa565b915091509850989650505050505050565b6001600160a01b0381165f90815260208190526040812054610402565b60606107dc6107b361050b6004610aa3565b6107c261052260046020610cdc565b6107d161061160046040610cdc565b33861502860161100d565b90505b979650505050505050565b60605f806107f661129c565b925092509250909192565b5f6104f183836112e8565b5f61012435600281901c90600316600182118334158214806108315761083134611423565b506003841160a0810260240135906502030203010160d01b861a905f630101020360d01b881a6108648882898888611434565b9096509150506101c4600583901b01355f87600581111561088757610887615329565b036108bc5760443560243517156108a557636ab37ce75f526004601cfd5b6108af8482611751565b6108b7611809565b61099d565b6040805160208082528183019092525f9160208201818036833701905050905060028a60058111156108f0576108f0615329565b036109135761090e60c4356084353360e435610104355b8787611889565b610988565b60038a600581111561092757610927615329565b036109455761090e60c4356084353360e435610104355b87876118d4565b60048a600581111561095957610959615329565b036109735761090e60243533608435604435606435610907565b6109886024353360843560443560643561093e565b610992848261190a565b61099b816119c4565b505b6109a88689846119e8565b6109b0611a5e565b6001995050505050505050505090565b6060602080526707536561706f727460475260606020f35b5f6109e1611ab1565b600143034060801c335f525f60205260405f208054820192508281555050336001600160a01b03167f721c20121297512b72821b97f5326877ea8ecf4bb9948fea5bfcb6453074d37f82604051610a3a91815260200190565b60405180910390a290565b5f816001600160a01b0316600a5a610a5d9190615773565b6040515f8181818686fa925050503d805f8114610a95576040519150601f19603f3d011682016040523d82523d5f602084013e610a9a565b606091505b50909392505050565b5f813563ffffffff168201610402565b5f610ac661016060408051918201905290565b9050610ad58282610140611b28565b610af2610aeb610ae6846040610cdc565b611b31565b6040830152565b5f610b06610b01846060610cdc565b611b84565b9050610b13816060840152565b610b26610b1e825190565b610140840152565b50919050565b0190565b610140820151604080519084015180515f939284927f000000000000000000000000000000000000000000000000000000000000000092602090910190845b81811015610b9c578251601f1901805186825260c082208652905260209384019390920191600101610b6f565b508060051b6040512094505050505f7f0000000000000000000000000000000000000000000000000000000000000000915060405160206060890151015f5b86811015610c08578151601f1901805186825260e082208552905260209283019290910190600101610bdb565b505060408051600587901b9020601f198a0180517f00000000000000000000000000000000000000000000000000000000000000008252928b01805197815260608c018051938152610140909c019a8b5261018082209390915295909552939097525050925250919050565b5f8063ffffffff8335169050600581901b610c986020820160408051918201905290565b828152925060208381019085015f5b83811015610cd257610cca610cc4610cbf8484610cdc565b611240565b82850152565b602001610ca7565b5050505050919050565b5f6104f163ffffffff610cf46104ed8686610b2c8516565b16840190565b5f8063ffffffff8335169050600581901b610d1e6020820160408051918201905290565b828152925060208381019085015f5b83811015610cd257610d4a610cc4610d458484610cdc565b611bc7565b602001610d2d565b5f8063ffffffff8335169050600581901b610d766020820160408051918201905290565b828152925060208381019085015f5b83811015610cd257610da2610cc4610d9d8484610cdc565b611c09565b602001610d85565b60608036155f80610dbe8c8c85898b611c4c565b91509150610dd18c8b8b8b8b8787612029565b9450945050505097509795505050505050565b5f8063ffffffff8335169050600581901b610e086020820160408051918201905290565b828152925060208381019085015f5b83811015610cd257610e34610cc4610e2f8484610cdc565b61215b565b602001610e17565b5f610e45611ab1565b5f805f80855190505f5b81811015610f50575f878281518110610e6a57610e6a615792565b60209081029190910101518051909150600481608001516004811115610e9257610e92615329565b03610e9e575050610f48565b80519450610eab8161219e565b5f8181526001602052604081209850909650610ecd90879089903615156121d7565b50865460ff16610f455780610140015181606001515114610ef057610ef0612265565b610eff85878460200151612272565b865460ff191660011787556040517ff280791efe782edcf06ce15c8f4dff17601db3b88eb3805a0db7d77faf757f0490610f3c9088908490615895565b60405180910390a15b50505b600101610e4f565b5060019695505050505050565b5f8063ffffffff8335169050600581901b610f816020820160408051918201905290565b828152925060208381019085015f5b83811015610cd257610fad610cc4610fa88484610cdc565b61104b565b602001610f90565b5f8063ffffffff8335169050600581901b610fd96020820160408051918201905290565b828152925060208381019085015f5b83811015610cd257611005610cc46110008484610cdc565b61230e565b602001610fe8565b60605f36151590505f806110258888858b5189611c4c565b9150915061103282612341565b61103f8887848885612380565b98975050505050505050565b5f61105e61020060408051918201905290565b60a0810180825290915061107a61107484610aa3565b82612453565b61108660016020840152565b61109260016040840152565b6110af6110a86110a3856020610cdc565b612489565b6060840152565b610b266110ba6124b1565b6080840152565b835160808101515f91906110e860048260048111156110e2576110e2615329565b146124cb565b5f80806110f78a36151561256c565b60408051600180825281830190925293965091945092505f9190816020015b61111e615027565b8152602001906001900390816111165790505090508a815f8151811061114657611146615792565b602002602001018190525061115b818b612764565b6111678684848b6128dd565b6040805160018082528183019092525f91602080830190803683375091925050503615156004878181111561119e5761119e615329565b146111c1576111af8d83885f6129dd565b6111bb86868684612a2f565b506111d3565b6111d0888e6080015183612b33565b95505b6111de888c8c612c03565b85825f815181106111f1576111f1615792565b6020026020010181815250506112088d8388612d26565b61122586895f01518a602001518d8c604001518d60600151612df3565b61122d611a5e565b5060019c9b505050505050505050505050565b5f61125361020060408051918201905290565b905061126760208381019083016040611b28565b60a0810180825261127a61107484610aa3565b61128b6110a86110a3856060610cdc565b610b266110ba6110a3856080610cdc565b60605f805f6112a9612e58565b90505f7f0000000000000000000000000000000000000000000000000000000000000000905060605f5281602052806040526303312e3660635260a05ff35b5f6112f1611ab1565b5f8083815b81811015611408573687878381811061131157611311615792565b90506020028101906113239190615977565b90505f61133360208301836154f5565b90505f61134660408401602085016154f5565b90505f61135960a0850160808601615996565b905081331483331417156004821417871796505f61138d61138261137a8790565b610ab36104da565b866101400135610b30565b5f8181526001602052604090819020805461ffff19166101001781559051909a509091506001600160a01b0380851691908616907f6bacc01dbe442496068f7d234edd811f1a5f833243e0aec824f86ab861f3c90d906113f09085815260200190565b60405180910390a385600101955050505050506112f6565b5050801561141857611418612f35565b506001949350505050565b63a61be9f05f52806020526024601cfd5b5f8061143f5f6124cb565b611447612f42565b426101643511154261014435111715611475576321ccfeb75f5261014435602052610164356040526044601cfd5b610204356102643510156114905763466aa6165f526004601cfd5b7f0000000000000000000000000000000000000000000000000000000000000000608081905260a08790526060602460c037604060646101203760e060802061016052610264356102043560051b6102a0016001820181526020810190508881526080602460208301376101608860a0528760c0525f60e0525f6102043593505f5b84811015611566578060400261028401602081610100376040816101203760208101358317925060208401935060e0608020845260a0850194508b85528a6020860152604081606087013750600101611512565b6001850160051b610160206060526102643594505b848110156115b6578060400261028401925060a0840193508a845289602085015260408360608601376020830135919091179060010161157b565b506001600160a01b038111156115d3576339f3e3fd5f526004601cfd5b50505050505f7f00000000000000000000000000000000000000000000000000000000000000009050806080528360a052606060c460c0376020610104610120375060c06080205f9081526020812060e05260843590611647826001600160a01b03165f9081526020819052604090205490565b7f000000000000000000000000000000000000000000000000000000000000000060808190529091506040608460a03760605161010052896101205260a061014461014037816101e05261018060802094505050506102043560051b61018001828152336020820152608060408201526101206060820152600160808201528360a0820152606060c460c083013760a061026435026101e00160a4356084357f9d9af8e38d66c62e2c12f0225249fd9d721c54b83f48d9352c97c6cacdcb6f318385a35f60605260608101820160405250505f61172383612f8d565b905061172f8389612fde565b7101000000000000000000000000000001000182559150509550959350505050565b60c43560843560e4356101043584156117b9575f6040519050632671a55160e11b815260206004820152600160248201528660448201528460648201528360848201523360a48201528260c48201528160e48201526117b38682610104613033565b50611801565b60028660058111156117cd576117cd615329565b036117f457806001146117e3576117e3816130ea565b6117ef848433856130fb565b611801565b61180184843385856131b0565b505050505050565b346064356084356102643560061b5f80805b8381101561185a5761028481013592506102a481013591508683111561184357611843613287565b82870396506118528284613294565b60400161181b565b508585111561186b5761186b613287565b6118758486613294565b848611156118015761180133868803613294565b61189381836132ca565b816118ba57826001146118a9576118a9836130ea565b6118b5878787876130fb565b6118cb565b6118cb828260028a8a8a8a8a6132e8565b50505050505050565b6118dd83613367565b6118e781836132ca565b816118f9576118b587878787876131b0565b6118cb828260038a8a8a8a8a6132e8565b5f805f805f861561192f57505060843592503391505060c4356101043560e435611944565b50339350506084359150506024356064356044355b801561195257611952613379565b50600586901b6101e403356102643560061b5f80805b838110156119a95761028481013592506102a481013591508a156119935761199083876159b4565b95505b6119a1878a8486898f613386565b604001611968565b506119b886898988888e613386565b50505050505050505050565b60408151146119d05750565b5f6119dc826020015190565b90506103dc81836133bb565b611a048260a4355b331415600182116004909210919091161690565b15611a5957805f611a13825190565b9050608081901c63ffffffff8216611a3484826317b1f94282526001905250565b601c840163fb5014fc6060529350611a5060a4358886856133df565b5f6060526118cb565b505050565b7f00000000000000000000000000000000000000000000000000000000000000008015611a8f575f63929eee145d50565b63929eee145480611aa5575f63929eee145d5050565b50600163929eee145550565b7f00000000000000000000000000000000000000000000000000000000000000008015611af05763929eee145c156103b057637fa8a9875f526004601cfd5b63929eee145480611b135763929eee145c156103dc57637fa8a9875f526004601cfd5b600181146103dc57637fa8a9875f526004601cfd5b80838337505050565b5f63ffffffff8235166040519150808252602082018160051b81018060a084026020870183378293505b81841015611b745780845260209093019260a001611b5b565b60405250919392505050565b9052565b5f63ffffffff8235166040519150808252602082018160051b81018060c084026020870183378293505b81841015611b745780845260209093019260c001611bae565b5f611bd960a060408051918201905290565b9050611be782826080611b28565b611c04611bfd611bf8846080610cdc565b613427565b6080830152565b919050565b5f63ffffffff8235166040519150808252602082018160051b8101808360061b6020870183378293505b81841015611b7457808452602090930192604001611c33565b60605f611c5960016124cb565b86515f90600160e61b82351690806001600160401b03811115611c7e57611c7e61574b565b604051908082528060200260200182016040528015611ca7578160200160208202803683370190505b50945060010160051b91505f60205b83811015611ea8575f611ccc8c83613cce6104da565b90505f805f611cdb848e61256c565b6001600160781b0382166020880152919450925090505f829003611d025750505050611ea0565b6001600160781b0381166040808601919091528a8601849052845160a081015160c0820151608083015192909301518051600184119d909d179c600490931099509092915f5b81811015611dea575f838281518110611d6357611d63615792565b602002602001015190508b8151108d179c505f611d858989846080015161345e565b90508160800151826060015103611da25760608201819052611db7565b611db18989846060015161345e565b60608301525b5f611dd08360600151838a8a611dcb361590565b61349a565b606084018190526080909301929092525050600101611d48565b5087516060015180515f5b81811015611e94575f838281518110611e1057611e10615792565b602002602001015190505f611e2a8b8b846080015161345e565b90508160800151826060015103611e475760608201819052611e5c565b611e568b8b846060015161345e565b60608301525b5f611e718360600151838c8c611dcb36151590565b6060840181905260a0840180516080909501949094529092525050600101611df5565b50505050505050505050505b602001611cb6565b50506001600160e61b018103611ec057611ec06134ed565b50611ecb8888612764565b5f8060205b8381101561200e578581015192508215612006575f611ef28c83613cce6104da565b9050885f03611f0d575f878301819052602090910152612006565b60048151608001516004811115611f2657611f26615329565b14611fa957611f3f8188866001600587901c038e6134fa565b611f55575f878301819052602090910152612006565b602080820151604083015183516080810151930151611f8e9388936001600160781b039081169316913314156001909111168e17612a2f565b611fa4575f878301819052602090910152612006565b611fd4565b611fbb815f015182608001518c612b33565b878301819052935083611fd4575f602090910152612006565b886001900398505f815f01519050611fff85825f015183602001518c85604001518660600151612df3565b6001935050505b602001611ed0565b508061201c5761201c613555565b5050509550959350505050565b85518551606091829161203c81836159c7565b6001600160401b038111156120535761205361574b565b60405190808252806020026020018201604052801561208c57816020015b61207961505a565b8152602001906001900390816120715790505b5092505f5b828110156120e4576120bf8c5f8d84815181106120b0576120b0615792565b60200260200101518c8c613562565b8482815181106120d1576120d1615792565b6020908102919091010152600101612091565b505f5b8181101561213d576121168c60018c848151811061210757612107615792565b60200260200101518c5f613562565b848483018151811061212a5761212a615792565b60209081029190910101526001016120e7565b5061214b8b84888a896135b1565b9350505097509795505050505050565b5f61216c6040808051918201905290565b905061218661218261217d84610aa3565b61389a565b8252565b611c046121976110a3846020610cdc565b6020830152565b5f6121b38260600151518361014001516138b9565b81516001600160a01b03165f90815260208190526040902054610402908390610b30565b82545f90610100900460ff16156121fe5781156121f7576121f7856138c9565b505f610622565b83546201000090046001600160781b0316801561225957831561222957612224866138da565b612259565b8454600160881b90046001600160781b0316811061225957821561225057612250866138eb565b5f915050610622565b50600195945050505050565b632165628a5f526004601cfd5b33831480156122815750505050565b5f61228a612e58565b61190160f01b5f9081526002828152602287815260428320908390528651939450929190601f601d840116106102e260621984011016156122f4576122cf86886138fc565b61190160f01b5f908152600286905260228281526042822091905290975090506122f7565b50815b612304888285858a613992565b5050505050505050565b5f61231f6040808051918201905290565b9050612330612182610d9d84610aa3565b611c04612197610d9d846020610cdc565b80518060051b6040019050602082038051602082527f4b9f2d36e1b4c93de62cc077b00b1a91d84b6c31b4a14e012718dcca230689e78383a190525050565b8351606090806001600160401b0381111561239d5761239d61574b565b6040519080825280602002602001820160405280156123d657816020015b6123c361505a565b8152602001906001900390816123bb5790505b5091505f5b81811015612439575f8782815181106123f6576123f6615792565b6020026020010151905061241389825f0151836020015185613adb565b84838151811061242557612425615792565b6020908102919091010152506001016123db565b5061244787838787876135b1565b50505b95945050505050565b6124608282610160611b28565b612471610aeb610ae6846040610cdc565b6103dc612482610b01846060610cdc565b6060830152565b6040518135601f0163ffffffe01660200180838337913563ffffffff16815290810160405290565b5f6124c3602060408051918201905290565b5f8152905090565b7f000000000000000000000000000000000000000000000000000000000000000080156125185763929eee145c1561250a57637fa8a9875f526004601cfd5b8160010163929eee145d5050565b63929eee14548061254a5763929eee145c1561253b57637fa8a9875f526004601cfd5b8260010163929eee145d505050565b6001811461255f57637fa8a9875f526004601cfd5b505060020163929eee1455565b5f805f80855f015190506125898160a001518260c0015187613c80565b61259c57505f925082915081905061275d565b602086015160408701516001600160781b0391821694501691505f6004826080015160048111156125cf576125cf615329565b036125fc57600183850218905080156125ea576125ea613ca3565b506001935083925082915061275d9050565b50818311831517801561261157612611613ca3565b608082015160011615848411161561262b5761262b613cb0565b6126348261219e565b5f81815260016020526040812091965061265290879083908a6121d7565b61266557505f935083925061275d915050565b805460ff1661268057612680835f0151878a60600151612272565b8054608881901c8061269457869150612757565b6001600160781b038260101c169150600186036126b8578181039650809550612757565b8086036126d357908601858103868211029096039590612757565b80860296810291909502810186810387821102918290039695919003906001600160781b0386111561275757612717565b5f5b8215610b2657908290069190612706565b61272a6127248784612704565b88612704565b8015019687900496909504946001600160781b0386111561275757634e487b715f5260116020526024601cfd5b50505050505b9250925092565b805182515f5b82811015612853575f84828151811061278557612785615792565b602002602001015190505f815f015190508381106127aa576127aa8260200151613cbd565b5f8782815181106127bd576127bd615792565b6020026020010151905080602001516001600160781b03165f036127e35750505061284b565b80516040808201519085015163bfb3f8ce5f8760200151600181111561280b5761280b615329565b14612827575f61281c856060613cce565b9350636088d7de9150505b8251821061283857805f526004601cfd5b612843838389613cd9565b505050505050505b60010161276a565b505f5b818110156128d6575f85828151811061287157612871615792565b6020026020010151905080602001516001600160781b03165f0361289557506128ce565b8051608081015160608201516128b29085908363a8930e9a613d8c565b6128ca8483604001518363d69293326104da613d8c90565b5050505b600101612856565b5050505050565b60a084015160c08501516040860151515f805b8281101561295a575f8960400151828151811061290f5761290f615792565b602002602001015190505f815f01519050801584179350505f612946826060015183608001518c8c8b8b612941361590565b613df3565b6060830152506080018690526001016128f0565b5060808801516004811082168015612974576129746134ed565b505050506060860151515f5b81811015612304575f8860600151828151811061299f5761299f615792565b602002602001015190505f6129c4826060015183608001518b8b8a8a61294136151590565b60608301525060a0810151608090910152600101612980565b8351608081015160208201513314156001821160049092109190911616156128d6575f80612a12858489608001518988613e2e565b63fb5014fc6060529092509050611a5083602001518684846133df565b5f848152600160205260408120805482908290608881901c80612a5457889150612adc565b6001600160781b038260101c169150808803612a7857908801878111935090612adc565b97880297808802979190910288018781119350906001600160781b038083119089111715612adc57612aaa8883612704565b8015019788900497909104906001600160781b038083119089111715612adc57634e487b715f5260116020526024601cfd5b508215612b15578515612b09576040516310fda3e160e01b8152600481018a905260240160405180910390fd5b5f945050505050610622565b8660881b8160101b1760011782556001945050505050949350505050565b5f83610140015184606001515114612b4d57612b4d612265565b83515f8080612b5c8888613fac565b915091505f8082845f885af16001600160a01b0385165f908152600260205260409020805460018101909155606086901b189550925082612bbb578515612bae57612ba5614056565b612bae8561409d565b505f93506104f192505050565b505050505f805f612bd8876040015188606001516104da6140ae90565b925092509250825f14612bee57612bee8461409d565b60408701919091526060860152509392505050565b6040805160208082528183019092525f916020820181803683375050506040850151519091505f5b81811015612c7b575f86604001518281518110612c4a57612c4a615792565b60200260200101519050846080820152612c7281885f0151896101200151876104da61432790565b50600101612c2b565b50506060840151515f90815b81811015612d09575f87606001518281518110612ca657612ca6615792565b602002602001015190505f6005811115612cc257612cc2615329565b81516005811115612cd557612cd5615329565b03612cf1574793508381606001511115612cf157612cf1613287565b612d00813389886143276104da565b50600101612c87565b5050612d14826119c4565b504780156128d6576128d63382613294565b8251608081015160208201515f92839283928392916004811060019091111633909114151615612d8857612d69612d6361010083015190565b5190565b8861441c565b9093509150612d7a60208201612d5f565b945063fb5014fc9350612dd4565b600481608001516004811115612da057612da0615329565b0361230457805194505f8560601b9050612dc187838b608001518b8561445d565b639397928596509094509250612dd49050565b612dde6060859052565b612dea858785856133df565b5f606052612304565b60608290506060829050856001600160a01b0316876001600160a01b03167f9d9af8e38d66c62e2c12f0225249fd9d721c54b83f48d9352c97c6cacdcb6f318a888686604051612e469493929190615a13565b60405180910390a35050505050505050565b5f7f00000000000000000000000000000000000000000000000000000000000000004614612f10575060408051608080517f00000000000000000000000000000000000000000000000000000000000000005f9081527f00000000000000000000000000000000000000000000000000000000000000006020527f0000000000000000000000000000000000000000000000000000000000000000855246606090815230845260a08220949095529093529190915290565b507f000000000000000000000000000000000000000000000000000000000000000090565b63fed398fc5f526004601cfd5b600435602014610224356102401416610244356102606102643560061b01141660186101243510600160a01b60843560a4351760c4356024351717101616806103b0576103b0614528565b5f8181526001602081905260409091209060843590612fb290849084903615156121d7565b50815460ff16610b2657610b268184612fd9602463ffffffff6102443516016124896104da565b612272565b5f612feb8260a4356119f0565b15610402575f805f612ffc86614535565b63fb5014fc6060529194509250905061301c60a43587601c8601856133df565b5f60605260209190910160801b1781529392505050565b604080517f000000000000000000000000000000000000000000000000000000000000000060ff60a01b175f90815260208690527f000000000000000000000000000000000000000000000000000000000000000083526055600b20919092526001600160a01b031690505f805f805260205f85875f875af191505f519050816130c8576130bf614056565b6130c8836145ed565b6001600160e01b03198116632671a55160e11b146118015761180186846145fe565b6369f958275f52806020526024601cfd5b833b61311257635f15d6725f52836020526024601cfd5b6040516323b872dd60e01b5f528360045282602452816044525f8060645f80895af1806131a2573d1561318057601f3d0160051c8260051c8160030281831115613169578183036003028280028480020360091c01015b5a60208201101561317c573d5f803e3d5ffd5b5050505b63f486bc875f5285602052846040528360605282608052600160a05260a4601cfd5b5060405250505f6060525050565b843b6131c757635f15d6725f52846020526024601cfd5b60405160805160a05160c051637921219560e11b5f528760045286602452856044528460645260a06084525f60a4525f8060c45f808d5af18061326c573d1561324b57601f3d0160051c8560051c8160030281831115613234578183036003028280028480020360091c01015b5a602082011015613247573d5f803e3d5ffd5b5050505b63f486bc875f52896020528860405287606052866080528560a05260a4601cfd5b5060809290925260a05260c05260405250505f606052505050565b638ffff9805f526004601cfd5b61329d81613367565b5f805f805f85875af1905080611a59576132b5614056565b63bc806b965f5282602052816040526044601cfd5b5f6132d6836020015190565b9050818114611a5957611a59836119c4565b5f60208851036133225750604080885260208089018a9052632671a55160e11b918901919091526044880152600160648801819052613331565b50606487018051600101908190525b603c60c082028901038781528660208201528560408201528460608201528360808201528260a082015250505050505050505050565b806103b0576391b3e5145f526004601cfd5b636ab37ce75f526004601cfd5b61338f83613367565b61339981836132ca565b816133aa576117ef86868686614613565b611801828260018989895f8a6132e8565b6064810151604082019060c0026044016133d6848383613033565b50506020905250565b5f806001600160e01b03198451165f805260205f85875f8b5af15f51909350149050816134185761340e614056565b846080526024607cfd5b8061180157846080526024607cfd5b5f8063ffffffff83351690506001810160051b61344a8160408051918201905290565b9250613457848483611b28565b5050919050565b5f82840361346d5750806104f1565b82848309156134835763c63cf0895f526004601cfd5b5f61348e8584615aaf565b93909304949350505050565b5f8486146134e357838303428590038082035f6134b7838a615aaf565b6134c1838c615aaf565b6134cb91906159c7565b9050858487830304018115150294505050505061244a565b5092949350505050565b6312d3f5a35f526004601cfd5b8451608081015160208201515f92916004811060019091111633909114151615610f50575f8061353187848b608001518b8a613e2e565b9150915061354b836020015188848463fb5014fc8a614707565b935050505061244a565b63d5da9a1b5f526004601cfd5b61356a61505a565b83515f0361357b5761357b85614774565b5f85600181111561358e5761358e615329565b036135a45761359f86858385614785565b61244a565b61244a86858333876148f5565b84516060905f816001600160401b038111156135cf576135cf61574b565b6040519080825280602002602001820160405280156135f8578160200160208202803683370190505b506040805160208082528183019092529192505f9190602082018180368337505089519192505060010160051b60205b81811015613687575f61363e8b83613cce6104da565b8051606081015191925090801561367c57478111825115161561366857638ffff9805f526004601cfd5b61367c828460200151856040015189614327565b505050602001613628565b50505f5b838110156137f3575f8a82815181106136a6576136a6615792565b6020026020010151905080602001516001600160781b03165f036136ed575f8483815181106136d7576136d7615792565b91151560209283029190910190910152506137eb565b600184838151811061370157613701615792565b911515602092830291909101909101528051604081015180515f5b81811015613786575f83828151811061373757613737615792565b6020026020010151905080606001515f1461377357608081018051908e9052855161012087015161376d9184918c6143276104da565b60808201525b608081015160609091015260010161371c565b505050606081015180515f5b818110156137e5575f8382815181106137ad576137ad615792565b602002602001015190505f81606001519050805f146137d1576137d1888483614a2c565b5060a0810151606090910152600101613792565b50505050505b60010161368b565b506137fd816119c4565b47801561380e5761380e3382613294565b8515613884575f5b848110156138825783818151811061383057613830615792565b60200260200101511561387a5761387a8b828151811061385257613852615792565b60200260200101518a8b848151811061386d5761386d615792565b6020026020010151612d26565b600101613816565b505b61388c611a5e565b509098975050505050505050565b5f6138ad61016060408051918201905290565b9050611c048282612453565b808210156103dc576103dc614a45565b631a5155745f52806020526024601cfd5b63ee9e0e635f52806020526024601cfd5b6310fda3e15f52806020526024601cfd5b5f805f84516001811660410380820360051c9250808752806020018701915050805160e81c6003820191506001811660051b868152825160208218525060015b838110156139685760405f2082821c60051b60209081169182529384018051919094185260010161393c565b50505060405f2091505f61397b82614a52565b5f9081526020939093525050604090209392505050565b5f805f528151602083038051826041035f600182116139f557604087015160608801515f1a83156139d657601b8260ff1c0190506001600160ff1b03821660408a01525b88528a855260205f60808760015afa508385528588526040880152505f515b8a148a1515169450849050613abe57858552604082526044850380516040870351630b135d3f60e11b835289604089035260205f60648b01858f5afa96508615613ab257630b135d3f60e11b5f5114613ab2578b3b15613a5c57634f7fb80d5f526004601cfd5b6001866041031115613a7557638baa579f5f526004601cfd5b64010100000060608901515f1a1a15604187141615613aa557631f003d0a5f5260608801515f1a6020526024601cfd5b63815e1d645f526004601cfd5b8385529152603f198601525b5050508061180157613ace614056565b634f7fb80d5f526004601cfd5b613ae361505a565b8251158451151715613afc576398e9db6e5f526004601cfd5b613b0461505a565b613b118685835f806148f5565b805160608101515f03613b2657509050610622565b613b368787858460800151614785565b82516040828101519082015160208085015190840151855185511891181791181715613b6d5763bced929d5f52846020526024601cfd5b806060015182606001511115613bf4575f865f81518110613b9057613b90615792565b60200260200101519050816060015183606001510389825f015181518110613bba57613bba615792565b60200260200101515f015160600151826020015181518110613bde57613bde615792565b6020026020010151606001818152505050613c75565b5f875f81518110613c0757613c07615792565b60200260200101519050826060015182606001510389825f015181518110613c3157613c31615792565b60200260200101515f015160400151826020015181518110613c5557613c55615792565b602002602001015160600181815250508260600151826060018181525050505b505050949350505050565b428084111590831116818015613c94575080155b156104f1576104f18484614e61565b635a052b325f526004601cfd5b63a11b63ff5f526004601cfd5b63133c37c65f52806020526024601cfd5b5f6104f18284015190565b5f838381518110613cec57613cec615792565b602002602001015190505f815f01519050613d078160031090565b613d1357613d13614e76565b60408201518015613d3657613d318460600151828660800151614e83565b613d49565b60808401515115613d4957613d49614ecd565b6004821460030383816005811115613d6357613d63615329565b90816005811115613d7657613d76615329565b9052505050606090920151604090910152505050565b82515f5b81811015611801575f858281518110613dab57613dab615792565b60209081029190910101518051604082015191925090600382116004881415821515171615613de557855f5288602052836040526044601cfd5b505050806001019050613d90565b5f868803613e0d57613e0686868961345e565b90506107df565b6107dc613e1b87878b61345e565b613e2688888b61345e565b86868661349a565b5f805f613e39614eda565b6301e4d72a815260208082015260408101898152336060830152601c820194509091508751604082015287613e79613e7260a083015190565b60e0840152565b613e8f613e8760c083015190565b610100840152565b613ea5613e9d60e083015190565b610120840152565b610140613eb3816060850152565b5f613ebf604084015190565b90505f613ece82848701614ee4565b928301929050613edf836080870152565b5f613eeb606086015190565b90505f613efa82868901614f4a565b948501949050613f0b8560a0890152565b5f613f188e878a01614faf565b959095019450613f298560c0890152565b8685015f613f378e83614fce565b602497019687019a50613f539050613f4e8c8c0190565b614ffe565b8060408b901b60808b901b17178f610100018181525050613f7d8c82611b8090919063ffffffff16565b60058c8e51613f8c91906159b4565b613f97911b8b6159b4565b99505050505050505050509550959350505050565b5f8083613fb7614eda565b639891976581523360208201908152608060408301819052601c9092019450905f613fe3604085015190565b90505f613ff282848601614ee4565b928301929050614003836040860152565b5f61400f606087015190565b90505f61401e82868801614ee4565b94850194905061402f856060880152565b895f61403d82898901614faf565b9a9d96909a016004019b50949950505050505050505050565b3d1561409b57601f3d0160051c60405160051c8160030281831115614088578183036003028280028480020360091c01015b5a602082011015611a59573d5f803e3d5ffd5b565b63939792855f52806020526024601cfd5b60603d105f8080808080866141205760405f803e5f51935060205192503d60208501113d60208501118082179850505086614120576020845f3e5f51915060208360203e60205190508160071b60208501018160a0026020850101803d10823d101761ffff8486171117985050505f80525b86614152575f8061413584602088018d61415b565b9250975061414783602087018c61423b565b929092179850909550505b5050505061275d565b5f806040519150825160c08602602001830160405285835260208660010160051b8085018360010160051b8701614199858b81811090829003020190565b60010160051b8a861196505b808510156141f957828589015260808a843e6060830151955085608084015260608201518681116141d685856142e2565b17881797505060808a01995060a08301925060a0820191506020850194506141a5565b50505b8183101561422f578083870152608088823e6060810151608082015260808801975060a0810190506020830192506141fc565b50505050935093915050565b604051815180851190808603818710028101602060e08202850181016040528185526001928301600590811b87019390920190911b908185015b8282101561422f57808287015260a088823e60206060890160a083013e606081015160608501516142b26080840151608088015180159114171590565b818311176142c084886142e2565b60a09b909b019a179690961795505060c0938401936020929092019101614275565b5f81516040830151801560038311161561430457506040840151600119909101905b604085015181148551831460208701516020870151141616159250505092915050565b5f8451600581111561433b5761433b615329565b0361437857604084015160208501516001600160a01b0316171561436157614361613379565b61437384608001518560600151613294565b614416565b60018451600581111561438d5761438d615329565b036143be576040840151156143a4576143a4613379565b614373846020015184866080015187606001518686613386565b6002845160058111156143d3576143d3615329565b036143f7576143738460200151848660800151876040015188606001518787611889565b61441684602001518486608001518760400151886060015187876118d4565b50505050565b608082901c63ffffffff604084901c811690808516906144449084906317b1f94290611b8016565b601c830192506144548482614fce565b50509250929050565b5f80614467614eda565b63f4dd92ce815287841860a0820152601c8101925060200160a0808252875f614491604083015190565b90505f6144a082858701614ee4565b9384019390506144b1846020870152565b5f6144bd606085015190565b90505f6144cc82878901614f4a565b9586019590506144dd866040890152565b5f6144ea8d888a01614faf565b9687019690506144fb8760608a0152565b5f6145088d898b01614fce565b905080880197508760040199505050505050505050509550959350505050565b6339f3e3fd5f526004601cfd5b6301e4d72a6102043560051b6080019081525f808260208082015260408101858152336060830152601c919091019061456f608435610aeb565b61458061014460e083016060611b28565b61014061458e816060840152565b61459c60a082016080840152565b61016060a06102643581029290920101906145b8908290840152565b6145c25f82840152565b6020016145d08160c0840152565b5f9181019182526020820196909652939560449095019492505050565b63d13d53d45f52806020526024601cfd5b631cf99b265f5281602052806040526044601cfd5b6040516323b872dd60e01b5f5283600452826024528160445260205f60645f80895af1803d15601f3d1160015f51141617163d151581166146f85780873b1515166146f857806146e757816146ca573d156146a957601f3d0160051c8360051c8160030281831115614692578183036003028280028480020360091c01015b5a6020820110156146a5573d5f803e3d5ffd5b5050505b63f486bc875f528660205285604052846060525f6080528360a05260a4601cfd5b63988919235f52866020528560405284606052836080526084601cfd5b635f15d6725f52866020526024601cfd5b505060405250505f6060525050565b5f805f6001600160e01b03198751165f805260205f888a5f8e5af15f5190935014905081614753578361473e575f925050506106d7565b614746614056565b845f52876020526024601cfd5b8061476557845f52876020526024601cfd5b50600198975050505050505050565b63375c24c15f52806020526024601cfd5b5f805f85865160051b87015b808210156148a2576020820191508851825151106147b1576147b16148d6565b81515160051b60208a01015180516020845101515f6040830151602085015115815184101517156147e6575050505050614791565b8260051b60208201015191505060608101935083518901915083511589831060011b17881797508198505f84528a51935086156001811461484f5760608220881860408d01516101208601511860208e015186511817171561484a5761484a6148d6565b614898565b8151855260208201516020860152604082015160408601528a6080860152835160208d015261012084015160408d015260608520975060208d0192508683181561489857865183525b5050505050614791565b5050508160608551015280156148cf57600181036148c7576391b3e5145f526004601cfd5b6148cf6148e3565b5050614416565b637fda72795f526004601cfd5b634e487b715f5260116020526024601cfd5b5f805f86875160051b88015b808210156149f7576020820191508151518a518110614922576149226148d6565b8060051b60208c01015190506020835101515f606083510151602084015115815184101517156149555750505050614901565b8260051b60208201015191505060608101925082518801915082511588831060011b17871796508197505f83528a5192508515600181146149a75760a0822087146149a2576149a26148d6565b6149ee565b815184526020820151602085015260408201516040850152608082015160808501528a60208d01528960408d015260a08220965060208d019250858318156149ee57855183525b50505050614901565b50508551606001839052508015614a255760018103614a1d576391b3e5145f526004601cfd5b614a256148e3565b50506128d6565b63a5f542085f528260205281604052806060526064601cfd5b63466aa6165f526004601cfd5b5f614e58565b5f6009821015614bb1576005821015614b0e576003821015614ac1577f832c58a5b611aadcfa6a082ac9d04bace53d8278387f10040347b7e98eb5b30260018314027fbf8e29b89f29ed9b529c154a63038ffca562f8d7cd1e2545dda53a1b582dde3018610402565b7ff3e8417a785f980bdaf134fa0274a6bf891eeb8195cd94b09d2aa651046e28bc60038314027fa02eb7ff164c884e5e2c336dc85f81c6a93329d8e9adf214b32729b894de2af118610402565b6007821015614b64577f25d02425402d882d211a7ab774c0ed6eca048c4d03d9af40132475744753b2a360058314027f1c19f71958cdd8f081b4c31f7caf5c010b29d12950be2fa1c95070dc47e30b5518610402565b7fb58d772fb09b426b9dece637f61ca9065f2b994f1464b51e9207f55f7c8f594860078314027f7ff98d9d4e55d876c5cfac10b43c04039522f3ddfb0ea9bfe70c68cfb5c7cc1418610402565b6011821015614d0957600d821015614c6657600b821015614c19577f6f0ec38c21f6f583ab7f3c5413c773ffd5344c34fde1d390958e438bf667448f60098314027fd1d97d1ef5eaa37a4ee5fbf234e6f6d64eb511eb562221cd7edfbdde0848da0518610402565b7f32f4e7485d6485f9f6c255929b9905c62ba919758bbe231f231eaeecf33d810c600b8314027fbb98d87cc12922b83759626c5f07d72266da9702d19ffad6a514c73a89002f5f18610402565b600f821015614cbc577f8df51df98847160517f5b1186b4bc3f418d98b8a7f17f1292f392d79d600d79e600d8314027f6b5b04cbae4fcb1a9d78e7b2dfc51a36933d023cf6e347e03d517b472a85259018610402565b7fcc4886e37eedd9aacd6c1c2c9247197a621a71282e87a7cbc673f3736d9aa141600f8314027f1da3eed3ecef6ebaa6e5023c057ec2c75150693fd0dac5c90f4a142f9879fde818610402565b6015821015614db5576013821015614d68577f2d7a3ed6dab270fdb8e054b2ad525f0ce2a8b89cc76c17f0965434740f673a5560118314027fc3939feff011e53ab8c35ca3370aad54c5df1fc2938cd62543174fa6e7d8587718610402565b7f54b3212a178782f104e0d514b41a9a5c4ca9c980bf6597c3cecbf280917e202a60138314027f5a4f867d3d458dabecad65f6201ceeaba0096df2d0c491cc32e6ea4e6435001718610402565b6017821015614e0b577fbb40bf8cea3a5a716e2b6eb08bbdac8ec159f82f380783db3c56904f15a43d0460158314027f3bd8cff538aba49a9c374c806d277181e9651624b3e31111bc0624574f8bca1d18610402565b7f403be09941a31d05cfc2f896505811353d45d38743288b016630cce39435476a60178314027f1d51df90cba8de7637ca3e8fe1e3511d1dc2f23487d05dbdecb781860c21ac1c18610402565b61040282614a58565b6321ccfeb75f5281602052806040526044601cfd5b6394eb6af65f526004601cfd5b5f835f5260205f2060208301835160051b81015b80821015614ebe57815180841160051b93845260209384185260405f209290910190614e97565b50508314905080614416576144165b6309bde3395f526004601cfd5b5f61041260405190565b5f825180835260208401602084018260051b82015b80831015614f375782518051835260208101516020840152604081015160408401526060810151606084015250602083019250608082019150614ef9565b5050508060071b60200191505092915050565b5f80614f54845190565b8084529050602084810190600583901b860181019085015b82821115614f9c575f614f7e84615008565b9050614f8c818360a0615011565b506020929092019160a001614f6c565b60a0840260200194505050505092915050565b5f63ffffffe0603f614fbf855190565b01169050610402838383615011565b5f80614fd8845190565b8084529050600581901b614ff3602086810190860183615011565b602001949350505050565b6103b06040829052565b5f610402825190565b8082828560045afa80153d151715614416575f80fd5b6040518060a0016040528061503a61509c565b81525f602082018190526040820152606080820181905260809091015290565b60408051610100810182525f606082018181526080830182905260a0830182905260c0830182905260e083018290528252602082018190529181019190915290565b6040518061016001604052805f6001600160a01b031681526020015f6001600160a01b0316815260200160608152602001606081526020015f60048111156150e6576150e6615329565b81525f6020820181905260408201819052606082018190526080820181905260a0820181905260c09091015290565b5f60208284031215615125575f80fd5b81356001600160401b0381111561513a575f80fd5b820161024081850312156104f1575f80fd5b5f81518084525f5b8181101561517057602081850181015186830182015201615154565b505f602082860101526020601f19601f83011685010191505092915050565b602081525f6104f1602083018461514c565b5f602082840312156151b1575f80fd5b5035919050565b5f602082840312156151c8575f80fd5b81356001600160401b038111156151dd575f80fd5b820161016081850312156104f1575f80fd5b5f8083601f8401126151ff575f80fd5b5081356001600160401b03811115615215575f80fd5b6020830191508360208260051b850101111561522f575f80fd5b9250929050565b80356001600160a01b0381168114611c04575f80fd5b5f805f805f805f805f805f60e08c8e031215615266575f80fd5b6001600160401b03808d35111561527b575f80fd5b6152888e8e358f016151ef565b909c509a5060208d013581101561529d575f80fd5b6152ad8e60208f01358f016151ef565b909a50985060408d01358110156152c2575f80fd5b6152d28e60408f01358f016151ef565b909850965060608d01358110156152e7575f80fd5b506152f88d60608e01358e016151ef565b909550935060808c0135925061531060a08d01615236565b915060c08c013590509295989b509295989b9093969950565b634e487b7160e01b5f52602160045260245ffd5b60068110611b8057611b80615329565b61535882825161533d565b6020818101516001600160a01b0390811691840191909152604080830151908401526060808301519084015260809182015116910152565b5f815180845260208085019450602084015f5b838110156153e55781516153b888825161534d565b808401516001600160a01b031660a08901526040015160c088015260e090960195908201906001016153a3565b509495945050505050565b604080825283519082018190525f906020906060840190828701845b8281101561542a57815115158452928401929084019060010161540c565b50505083810360208501526106d78186615390565b5f8060208385031215615450575f80fd5b82356001600160401b03811115615465575f80fd5b615471858286016151ef565b90969095509350505050565b5f805f8060408587031215615490575f80fd5b84356001600160401b03808211156154a6575f80fd5b6154b2888389016151ef565b909650945060208701359150808211156154ca575f80fd5b506154d7878288016151ef565b95989497509550505050565b602081525f6104f16020830184615390565b5f60208284031215615505575f80fd5b6104f182615236565b5f806040838503121561551f575f80fd5b82356001600160401b03811115615534575f80fd5b830160408186031215615545575f80fd5b946020939093013593505050565b5f805f805f60808688031215615567575f80fd5b85356001600160401b038082111561557d575f80fd5b9087019060a0828a031215615590575f80fd5b909550602087013590808211156155a5575f80fd5b506155b2888289016151ef565b909550935050604086013591506155cb60608701615236565b90509295509295909350565b5f805f805f805f8060a0898b0312156155ee575f80fd5b88356001600160401b0380821115615604575f80fd5b6156108c838d016151ef565b909a50985060208b0135915080821115615628575f80fd5b6156348c838d016151ef565b909850965060408b013591508082111561564c575f80fd5b506156598b828c016151ef565b999c989b509699959896976060870135966080013595509350505050565b5f805f805f805f6080888a03121561568d575f80fd5b87356001600160401b03808211156156a3575f80fd5b6156af8b838c016151ef565b909950975060208a01359150808211156156c7575f80fd5b6156d38b838c016151ef565b909750955060408a01359150808211156156eb575f80fd5b506156f88a828b016151ef565b909450925061570b905060608901615236565b905092959891949750929550565b606081525f61572b606083018661514c565b6020830194909452506001600160a01b0391909116604090910152919050565b634e487b7160e01b5f52604160045260245ffd5b634e487b7160e01b5f52601160045260245ffd5b5f8261578d57634e487b7160e01b5f52601260045260245ffd5b500490565b634e487b7160e01b5f52603260045260245ffd5b5f815180845260208085019450602084015f5b838110156153e55781516157ce88825161533d565b838101516001600160a01b03168885015260408082015190890152606080820151908901526080908101519088015260a090960195908201906001016157b9565b5f815180845260208085019450602084015f5b838110156153e557815161583788825161533d565b808401516001600160a01b0390811689860152604080830151908a0152606080830151908a0152608080830151908a015260a091820151169088015260c09096019590820190600101615822565b60058110611b8057611b80615329565b828152604060208201526158b56040820183516001600160a01b03169052565b5f60208301516158d060608401826001600160a01b03169052565b5060408301516101608060808501526158ed6101a08501836157a6565b91506060850151603f198584030160a086015261590a838261580f565b925050608085015161591f60c0860182615885565b5060a085015160e085015260c0850151610100818187015260e0870151915061012082818801528188015192506101409150828288015280880151848801525080870151610180870152505050809150509392505050565b5f823561015e1983360301811261598c575f80fd5b9190910192915050565b5f602082840312156159a6575f80fd5b8135600581106104f1575f80fd5b818103818111156104025761040261575f565b808201808211156104025761040261575f565b5f815180845260208085019450602084015f5b838110156153e557615a0087835161534d565b60a09690960195908201906001016159ed565b5f6080808301878452602060018060a01b03808916602087015260406080604088015283895180865260a08901915060208b0195505f5b81811015615a8b578651615a5f84825161533d565b808701518616848801528481015185850152606090810151908401529585019591870191600101615a4a565b50508781036060890152615a9f818a6159da565b9c9b505050505050505050505050565b80820281158282048414176104025761040261575f56fea164736f6c6343000818000a436f6e73696465726174696f6e4974656d2875696e7438206974656d547970652c6164647265737320746f6b656e2c75696e74323536206964656e7469666965724f7243726974657269612c75696e74323536207374617274416d6f756e742c75696e7432353620656e64416d6f756e742c6164647265737320726563697069656e7429454950373132446f6d61696e28737472696e67206e616d652c737472696e672076657273696f6e2c75696e7432353620636861696e49642c6164647265737320766572696679696e67436f6e7472616374294f72646572436f6d706f6e656e74732861646472657373206f6666657265722c61646472657373207a6f6e652c4f666665724974656d5b5d206f666665722c436f6e73696465726174696f6e4974656d5b5d20636f6e73696465726174696f6e2c75696e7438206f72646572547970652c75696e7432353620737461727454696d652c75696e7432353620656e6454696d652c62797465733332207a6f6e65486173682c75696e743235362073616c742c6279746573333220636f6e647569744b65792c75696e7432353620636f756e746572294f666665724974656d2875696e7438206974656d547970652c6164647265737320746f6b656e2c75696e74323536206964656e7469666965724f7243726974657269612c75696e74323536207374617274416d6f756e742c75696e7432353620656e64416d6f756e7429";
const isSuperArgs = (xs) => xs.length > 1;
class Seaport__factory extends ethers_1.ContractFactory {
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
exports.Seaport__factory = Seaport__factory;
Seaport__factory.bytecode = _bytecode;
Seaport__factory.abi = _abi;
