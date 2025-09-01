import { type ContractRunner } from "ethers";
import type { ILTOCustody, ILTOCustodyInterface } from "../../../contracts/marketplace/ILTOCustody";
export declare class ILTOCustody__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "InvalidBuyer";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidOrder";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidRecipient";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidSeller";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "LTOAlreadyInitiated";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "LTONotInitiated";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OrderIsNotFulfilled";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "TokenAlreadyInLTO";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "ltoId";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "buyer";
            readonly type: "address";
        }];
        readonly name: "AssetBuyerChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "ltoId";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "seller";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "buyer";
            readonly type: "address";
        }];
        readonly name: "AssetDeposited";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "ltoId";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }];
        readonly name: "AssetReleased";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "ltoId";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "seller";
            readonly type: "address";
        }];
        readonly name: "AssetSellerChanged";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "ltoId";
            readonly type: "uint256";
        }];
        readonly name: "cancel";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "ltoId";
            readonly type: "uint256";
        }];
        readonly name: "complete";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "seller";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "buyer";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "counter";
            readonly type: "uint256";
        }];
        readonly name: "getLtoCustodyId";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "seller";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "buyer";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "initiateLTO";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
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
                readonly internalType: "struct OrderParameters";
                readonly name: "parameters";
                readonly type: "tuple";
            }, {
                readonly internalType: "uint120";
                readonly name: "numerator";
                readonly type: "uint120";
            }, {
                readonly internalType: "uint120";
                readonly name: "denominator";
                readonly type: "uint120";
            }, {
                readonly internalType: "bytes";
                readonly name: "signature";
                readonly type: "bytes";
            }, {
                readonly internalType: "bytes";
                readonly name: "extraData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct AdvancedOrder";
            readonly name: "advancedOrder";
            readonly type: "tuple";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "orderIndex";
                readonly type: "uint256";
            }, {
                readonly internalType: "enum Side";
                readonly name: "side";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint256";
                readonly name: "index";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "identifier";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32[]";
                readonly name: "criteriaProof";
                readonly type: "bytes32[]";
            }];
            readonly internalType: "struct CriteriaResolver[]";
            readonly name: "criteriaResolvers";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "bytes32";
            readonly name: "fulfillerConduitKey";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }];
        readonly name: "initiateLTOFromOrder";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "revokeAsset";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string[]";
            readonly name: "keys";
            readonly type: "string[]";
        }, {
            readonly internalType: "string[]";
            readonly name: "values";
            readonly type: "string[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "setRecords";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "ltoId";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "buyer";
            readonly type: "address";
        }];
        readonly name: "transferBuyer";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "ltoId";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "seller";
            readonly type: "address";
        }];
        readonly name: "transferSeller";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ILTOCustodyInterface;
    static connect(address: string, runner?: ContractRunner | null): ILTOCustody;
}
//# sourceMappingURL=ILTOCustody__factory.d.ts.map