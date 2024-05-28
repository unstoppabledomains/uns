import { type ContractRunner } from "ethers";
import type { ConsiderationInterface, ConsiderationInterfaceInterface } from "../../../../seaport-types/src/interfaces/ConsiderationInterface";
export declare class ConsiderationInterface__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
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
                readonly name: "counter";
                readonly type: "uint256";
            }];
            readonly internalType: "struct OrderComponents[]";
            readonly name: "orders";
            readonly type: "tuple[]";
        }];
        readonly name: "cancel";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "cancelled";
            readonly type: "bool";
        }];
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
        readonly name: "fulfillAdvancedOrder";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "fulfilled";
            readonly type: "bool";
        }];
        readonly stateMutability: "payable";
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
            readonly internalType: "struct AdvancedOrder[]";
            readonly name: "advancedOrders";
            readonly type: "tuple[]";
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
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "orderIndex";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "itemIndex";
                readonly type: "uint256";
            }];
            readonly internalType: "struct FulfillmentComponent[][]";
            readonly name: "offerFulfillments";
            readonly type: "tuple[][]";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "orderIndex";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "itemIndex";
                readonly type: "uint256";
            }];
            readonly internalType: "struct FulfillmentComponent[][]";
            readonly name: "considerationFulfillments";
            readonly type: "tuple[][]";
        }, {
            readonly internalType: "bytes32";
            readonly name: "fulfillerConduitKey";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "maximumFulfilled";
            readonly type: "uint256";
        }];
        readonly name: "fulfillAvailableAdvancedOrders";
        readonly outputs: readonly [{
            readonly internalType: "bool[]";
            readonly name: "availableOrders";
            readonly type: "bool[]";
        }, {
            readonly components: readonly [{
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
                readonly internalType: "struct ReceivedItem";
                readonly name: "item";
                readonly type: "tuple";
            }, {
                readonly internalType: "address";
                readonly name: "offerer";
                readonly type: "address";
            }, {
                readonly internalType: "bytes32";
                readonly name: "conduitKey";
                readonly type: "bytes32";
            }];
            readonly internalType: "struct Execution[]";
            readonly name: "executions";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "payable";
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
                readonly internalType: "bytes";
                readonly name: "signature";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Order[]";
            readonly name: "orders";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "orderIndex";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "itemIndex";
                readonly type: "uint256";
            }];
            readonly internalType: "struct FulfillmentComponent[][]";
            readonly name: "offerFulfillments";
            readonly type: "tuple[][]";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "orderIndex";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "itemIndex";
                readonly type: "uint256";
            }];
            readonly internalType: "struct FulfillmentComponent[][]";
            readonly name: "considerationFulfillments";
            readonly type: "tuple[][]";
        }, {
            readonly internalType: "bytes32";
            readonly name: "fulfillerConduitKey";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "maximumFulfilled";
            readonly type: "uint256";
        }];
        readonly name: "fulfillAvailableOrders";
        readonly outputs: readonly [{
            readonly internalType: "bool[]";
            readonly name: "availableOrders";
            readonly type: "bool[]";
        }, {
            readonly components: readonly [{
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
                readonly internalType: "struct ReceivedItem";
                readonly name: "item";
                readonly type: "tuple";
            }, {
                readonly internalType: "address";
                readonly name: "offerer";
                readonly type: "address";
            }, {
                readonly internalType: "bytes32";
                readonly name: "conduitKey";
                readonly type: "bytes32";
            }];
            readonly internalType: "struct Execution[]";
            readonly name: "executions";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "considerationToken";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "considerationIdentifier";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "considerationAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "address payable";
                readonly name: "offerer";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "zone";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "offerToken";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "offerIdentifier";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "offerAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "enum BasicOrderType";
                readonly name: "basicOrderType";
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
                readonly name: "offererConduitKey";
                readonly type: "bytes32";
            }, {
                readonly internalType: "bytes32";
                readonly name: "fulfillerConduitKey";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "totalOriginalAdditionalRecipients";
                readonly type: "uint256";
            }, {
                readonly components: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "amount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address payable";
                    readonly name: "recipient";
                    readonly type: "address";
                }];
                readonly internalType: "struct AdditionalRecipient[]";
                readonly name: "additionalRecipients";
                readonly type: "tuple[]";
            }, {
                readonly internalType: "bytes";
                readonly name: "signature";
                readonly type: "bytes";
            }];
            readonly internalType: "struct BasicOrderParameters";
            readonly name: "parameters";
            readonly type: "tuple";
        }];
        readonly name: "fulfillBasicOrder";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "fulfilled";
            readonly type: "bool";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "considerationToken";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "considerationIdentifier";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "considerationAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "address payable";
                readonly name: "offerer";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "zone";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "offerToken";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "offerIdentifier";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "offerAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "enum BasicOrderType";
                readonly name: "basicOrderType";
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
                readonly name: "offererConduitKey";
                readonly type: "bytes32";
            }, {
                readonly internalType: "bytes32";
                readonly name: "fulfillerConduitKey";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "totalOriginalAdditionalRecipients";
                readonly type: "uint256";
            }, {
                readonly components: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "amount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address payable";
                    readonly name: "recipient";
                    readonly type: "address";
                }];
                readonly internalType: "struct AdditionalRecipient[]";
                readonly name: "additionalRecipients";
                readonly type: "tuple[]";
            }, {
                readonly internalType: "bytes";
                readonly name: "signature";
                readonly type: "bytes";
            }];
            readonly internalType: "struct BasicOrderParameters";
            readonly name: "parameters";
            readonly type: "tuple";
        }];
        readonly name: "fulfillBasicOrder_efficient_6GL6yc";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "fulfilled";
            readonly type: "bool";
        }];
        readonly stateMutability: "payable";
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
                readonly internalType: "bytes";
                readonly name: "signature";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Order";
            readonly name: "order";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes32";
            readonly name: "fulfillerConduitKey";
            readonly type: "bytes32";
        }];
        readonly name: "fulfillOrder";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "fulfilled";
            readonly type: "bool";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "contractOfferer";
            readonly type: "address";
        }];
        readonly name: "getContractOffererNonce";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "offerer";
            readonly type: "address";
        }];
        readonly name: "getCounter";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "counter";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
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
                readonly name: "counter";
                readonly type: "uint256";
            }];
            readonly internalType: "struct OrderComponents";
            readonly name: "order";
            readonly type: "tuple";
        }];
        readonly name: "getOrderHash";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "orderHash";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "orderHash";
            readonly type: "bytes32";
        }];
        readonly name: "getOrderStatus";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "isValidated";
            readonly type: "bool";
        }, {
            readonly internalType: "bool";
            readonly name: "isCancelled";
            readonly type: "bool";
        }, {
            readonly internalType: "uint256";
            readonly name: "totalFilled";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "totalSize";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "incrementCounter";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "newCounter";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "information";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "version";
            readonly type: "string";
        }, {
            readonly internalType: "bytes32";
            readonly name: "domainSeparator";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "conduitController";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
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
            readonly internalType: "struct AdvancedOrder[]";
            readonly name: "orders";
            readonly type: "tuple[]";
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
            readonly components: readonly [{
                readonly components: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "orderIndex";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "itemIndex";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct FulfillmentComponent[]";
                readonly name: "offerComponents";
                readonly type: "tuple[]";
            }, {
                readonly components: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "orderIndex";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "itemIndex";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct FulfillmentComponent[]";
                readonly name: "considerationComponents";
                readonly type: "tuple[]";
            }];
            readonly internalType: "struct Fulfillment[]";
            readonly name: "fulfillments";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }];
        readonly name: "matchAdvancedOrders";
        readonly outputs: readonly [{
            readonly components: readonly [{
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
                readonly internalType: "struct ReceivedItem";
                readonly name: "item";
                readonly type: "tuple";
            }, {
                readonly internalType: "address";
                readonly name: "offerer";
                readonly type: "address";
            }, {
                readonly internalType: "bytes32";
                readonly name: "conduitKey";
                readonly type: "bytes32";
            }];
            readonly internalType: "struct Execution[]";
            readonly name: "executions";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "payable";
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
                readonly internalType: "bytes";
                readonly name: "signature";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Order[]";
            readonly name: "orders";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly components: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "orderIndex";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "itemIndex";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct FulfillmentComponent[]";
                readonly name: "offerComponents";
                readonly type: "tuple[]";
            }, {
                readonly components: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "orderIndex";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "itemIndex";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct FulfillmentComponent[]";
                readonly name: "considerationComponents";
                readonly type: "tuple[]";
            }];
            readonly internalType: "struct Fulfillment[]";
            readonly name: "fulfillments";
            readonly type: "tuple[]";
        }];
        readonly name: "matchOrders";
        readonly outputs: readonly [{
            readonly components: readonly [{
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
                readonly internalType: "struct ReceivedItem";
                readonly name: "item";
                readonly type: "tuple";
            }, {
                readonly internalType: "address";
                readonly name: "offerer";
                readonly type: "address";
            }, {
                readonly internalType: "bytes32";
                readonly name: "conduitKey";
                readonly type: "bytes32";
            }];
            readonly internalType: "struct Execution[]";
            readonly name: "executions";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "name";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "contractName";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
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
                readonly internalType: "bytes";
                readonly name: "signature";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Order[]";
            readonly name: "orders";
            readonly type: "tuple[]";
        }];
        readonly name: "validate";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "validated";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ConsiderationInterfaceInterface;
    static connect(address: string, runner?: ContractRunner | null): ConsiderationInterface;
}
//# sourceMappingURL=ConsiderationInterface__factory.d.ts.map