import { type ContractRunner } from "ethers";
import type { ConsiderationEventsAndErrors, ConsiderationEventsAndErrorsInterface } from "../../../../seaport-types/src/interfaces/ConsiderationEventsAndErrors";
export declare class ConsiderationEventsAndErrors__factory {
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
    }];
    static createInterface(): ConsiderationEventsAndErrorsInterface;
    static connect(address: string, runner?: ContractRunner | null): ConsiderationEventsAndErrors;
}
//# sourceMappingURL=ConsiderationEventsAndErrors__factory.d.ts.map