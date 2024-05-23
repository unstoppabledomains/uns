import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { CounterManager, CounterManagerInterface } from "../../../../seaport-core/src/lib/CounterManager";
declare type CounterManagerConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class CounterManager__factory extends ContractFactory {
    constructor(...args: CounterManagerConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<CounterManager & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): CounterManager__factory;
    static readonly bytecode = "0x60c060405234801561000f575f80fd5b505f610019610076565b90506001600160a01b03811661004257604051632aea588760e01b815260040160405180910390fd5b5f61004c8261008f565b8015156080526001600160a01b03831660a05290508061006f57600163929eee14555b505061010c565b5f696002601e613d5c3d52f35f52600a60165ff0905090565b5f816001600160a01b0316600a5a6100a791906100ed565b6040515f8181818686fa925050503d805f81146100df576040519150601f19603f3d011682016040523d82523d5f602084013e6100e4565b606091505b50909392505050565b5f8261010757634e487b7160e01b5f52601260045260245ffd5b500490565b60805160a05161016261012b5f395f608d01525f604201526101625ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c80637423eb3c1461002d575b5f80fd5b610035610037565b005b63929eee14546001147f00000000000000000000000000000000000000000000000000000000000000008061006a575080155b1561008857604051630f45b98b60e41b815260040160405180910390fd5b6100b17f00000000000000000000000000000000000000000000000000000000000000006100d8565b6100ce576040516370a4078f60e01b815260040160405180910390fd5b5f63929eee145550565b5f816001600160a01b0316600a5a6100f09190610136565b6040515f8181818686fa925050503d805f8114610128576040519150601f19603f3d011682016040523d82523d5f602084013e61012d565b606091505b50909392505050565b5f8261015057634e487b7160e01b5f52601260045260245ffd5b50049056fea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "BadFraction";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "CannotCancelOrder";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ConsiderationLengthNotEqualToTotalOriginal";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "orderIndex";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "considerationIndex";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "shortfallAmount";
            readonly type: "uint256";
        }];
        readonly name: "ConsiderationNotMet";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InsufficientNativeTokensSupplied";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidBasicOrderParameterEncoding";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly name: "InvalidCallToConduit";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "conduitKey";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "conduit";
            readonly type: "address";
        }];
        readonly name: "InvalidConduit";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "InvalidMsgValue";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidNativeOfferItem";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "startTime";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "endTime";
            readonly type: "uint256";
        }];
        readonly name: "InvalidTime";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "MissingOriginalConsiderationItems";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "NativeTokenTransferGenericFailure";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NoReentrantCalls";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NoSpecifiedOrdersAvailable";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "orderHash";
            readonly type: "bytes32";
        }];
        readonly name: "OrderAlreadyFilled";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "orderHash";
            readonly type: "bytes32";
        }];
        readonly name: "OrderIsCancelled";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "orderHash";
            readonly type: "bytes32";
        }];
        readonly name: "OrderPartiallyFilled";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "PartialFillsNotEnabledForOrder";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "TStoreAlreadyActivated";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "TStoreNotSupported";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "TloadTestContractDeploymentFailed";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "newCounter";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "offerer";
            readonly type: "address";
        }];
        readonly name: "CounterIncremented";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "orderHash";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "offerer";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "zone";
            readonly type: "address";
        }];
        readonly name: "OrderCancelled";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "orderHash";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "offerer";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "zone";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly components: readonly [{
                readonly internalType: "enum ItemType";
                readonly name: "itemType";
                readonly type: "uint8";
            }, {
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "identifier";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }];
            readonly indexed: false;
            readonly internalType: "struct SpentItem[]";
            readonly name: "offer";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "enum ItemType";
                readonly name: "itemType";
                readonly type: "uint8";
            }, {
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "identifier";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "address payable";
                readonly name: "recipient";
                readonly type: "address";
            }];
            readonly indexed: false;
            readonly internalType: "struct ReceivedItem[]";
            readonly name: "consideration";
            readonly type: "tuple[]";
        }];
        readonly name: "OrderFulfilled";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "orderHash";
            readonly type: "bytes32";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "offerer";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "zone";
                readonly type: "address";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct OfferItem[]";
                readonly name: "offer";
                readonly type: "tuple[]";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address payable";
                    readonly name: "recipient";
                    readonly type: "address";
                }];
                readonly internalType: "struct ConsiderationItem[]";
                readonly name: "consideration";
                readonly type: "tuple[]";
            }, {
                readonly internalType: "enum OrderType";
                readonly name: "orderType";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint256";
                readonly name: "startTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "zoneHash";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "salt";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "conduitKey";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "totalOriginalConsiderationItems";
                readonly type: "uint256";
            }];
            readonly indexed: false;
            readonly internalType: "struct OrderParameters";
            readonly name: "orderParameters";
            readonly type: "tuple";
        }];
        readonly name: "OrderValidated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "bytes32[]";
            readonly name: "orderHashes";
            readonly type: "bytes32[]";
        }];
        readonly name: "OrdersMatched";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "__activateTstore";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): CounterManagerInterface;
    static connect(address: string, runner?: ContractRunner | null): CounterManager;
}
export {};
//# sourceMappingURL=CounterManager__factory.d.ts.map