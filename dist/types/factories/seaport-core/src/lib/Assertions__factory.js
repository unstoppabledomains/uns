"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assertions__factory = void 0;
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
        inputs: [],
        name: "CannotCancelOrder",
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
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "InvalidERC721TransferAmount",
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
];
const _bytecode = "0x610200604052348015610010575f80fd5b5060405161078f38038061078f83398101604081905261002f916102f5565b8080610039610158565b610120526101005260e05260c081905260a082815246610140819052604080515f9485526020879052948152606091825230608090815292842085825293909152939052610160526001600160a01b038316610180819052630a96ad3960e01b825282519092630a96ad3992600480820193918290030181865afa1580156100c3573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906100e79190610322565b506101a052505f90506100f861027e565b90506001600160a01b03811661012157604051632aea588760e01b815260040160405180910390fd5b5f61012b82610297565b8015156101c0526001600160a01b0383166101e05290508061015057600163929eee14555b5050506103b6565b5f808080808061018860408051808201909152600d81526c21b7b739b4b232b930ba34b7b760991b602082015290565b8051906020012095506040518060400160405280600381526020016218971b60e91b8152508051906020012094505f6040518060a00160405280606a8152602001610725606a913990505f6040518060c001604052806084815260200161057b6084913990505f60405180610100016040528060d4815260200161065160d4913990506040518060800160405280605281526020016105ff6052913980519060200120965082805190602001209550818051906020012094505f81838560405160200161025793929190610371565b60405160208183030381529060405290508080519060200120945050505050909192939495565b5f696002601e613d5c3d52f35f52600a60165ff0905090565b5f816001600160a01b0316600a5a6102af9190610397565b6040515f8181818686fa925050503d805f81146102e7576040519150601f19603f3d011682016040523d82523d5f602084013e6102ec565b606091505b50909392505050565b5f60208284031215610305575f80fd5b81516001600160a01b038116811461031b575f80fd5b9392505050565b5f8060408385031215610333575f80fd5b505080516020909101519092909150565b5f81515f5b818110156103635760208185018101518683015201610349565b505f93019283525090919050565b5f61038e6103886103828488610344565b86610344565b84610344565b95945050505050565b5f826103b157634e487b7160e01b5f52601260045260245ffd5b500490565b60805160a05160c05160e05161010051610120516101405161016051610180516101a0516101c0516101e0516101626104195f395f608d01525f604201525f50505f50505f50505f50505f50505f50505f50505f50505f50505f50506101625ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c80637423eb3c1461002d575b5f80fd5b610035610037565b005b63929eee14546001147f00000000000000000000000000000000000000000000000000000000000000008061006a575080155b1561008857604051630f45b98b60e41b815260040160405180910390fd5b6100b17f00000000000000000000000000000000000000000000000000000000000000006100d8565b6100ce576040516370a4078f60e01b815260040160405180910390fd5b5f63929eee145550565b5f816001600160a01b0316600a5a6100f09190610136565b6040515f8181818686fa925050503d805f8114610128576040519150601f19603f3d011682016040523d82523d5f602084013e61012d565b606091505b50909392505050565b5f8261015057634e487b7160e01b5f52601260045260245ffd5b50049056fea164736f6c6343000818000a436f6e73696465726174696f6e4974656d2875696e7438206974656d547970652c6164647265737320746f6b656e2c75696e74323536206964656e7469666965724f7243726974657269612c75696e74323536207374617274416d6f756e742c75696e7432353620656e64416d6f756e742c6164647265737320726563697069656e7429454950373132446f6d61696e28737472696e67206e616d652c737472696e672076657273696f6e2c75696e7432353620636861696e49642c6164647265737320766572696679696e67436f6e7472616374294f72646572436f6d706f6e656e74732861646472657373206f6666657265722c61646472657373207a6f6e652c4f666665724974656d5b5d206f666665722c436f6e73696465726174696f6e4974656d5b5d20636f6e73696465726174696f6e2c75696e7438206f72646572547970652c75696e7432353620737461727454696d652c75696e7432353620656e6454696d652c62797465733332207a6f6e65486173682c75696e743235362073616c742c6279746573333220636f6e647569744b65792c75696e7432353620636f756e746572294f666665724974656d2875696e7438206974656d547970652c6164647265737320746f6b656e2c75696e74323536206964656e7469666965724f7243726974657269612c75696e74323536207374617274416d6f756e742c75696e7432353620656e64416d6f756e7429";
const isSuperArgs = (xs) => xs.length > 1;
class Assertions__factory extends ethers_1.ContractFactory {
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
exports.Assertions__factory = Assertions__factory;
Assertions__factory.bytecode = _bytecode;
Assertions__factory.abi = _abi;
