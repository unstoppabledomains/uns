import { type ContractRunner } from "ethers";
import type { ConduitInterface, ConduitInterfaceInterface } from "../../../../seaport-types/src/interfaces/ConduitInterface";
export declare class ConduitInterface__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "channel";
            readonly type: "address";
        }];
        readonly name: "ChannelClosed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "channel";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "isOpen";
            readonly type: "bool";
        }];
        readonly name: "ChannelStatusAlreadySet";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidController";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidItemType";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "channel";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "bool";
            readonly name: "open";
            readonly type: "bool";
        }];
        readonly name: "ChannelUpdated";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "enum ConduitItemType";
                readonly name: "itemType";
                readonly type: "uint8";
            }, {
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "from";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "to";
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
            readonly internalType: "struct ConduitTransfer[]";
            readonly name: "transfers";
            readonly type: "tuple[]";
        }];
        readonly name: "execute";
        readonly outputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "magicValue";
            readonly type: "bytes4";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "from";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "to";
                readonly type: "address";
            }, {
                readonly internalType: "uint256[]";
                readonly name: "ids";
                readonly type: "uint256[]";
            }, {
                readonly internalType: "uint256[]";
                readonly name: "amounts";
                readonly type: "uint256[]";
            }];
            readonly internalType: "struct ConduitBatch1155Transfer[]";
            readonly name: "batch1155Transfers";
            readonly type: "tuple[]";
        }];
        readonly name: "executeBatch1155";
        readonly outputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "magicValue";
            readonly type: "bytes4";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "enum ConduitItemType";
                readonly name: "itemType";
                readonly type: "uint8";
            }, {
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "from";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "to";
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
            readonly internalType: "struct ConduitTransfer[]";
            readonly name: "standardTransfers";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "from";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "to";
                readonly type: "address";
            }, {
                readonly internalType: "uint256[]";
                readonly name: "ids";
                readonly type: "uint256[]";
            }, {
                readonly internalType: "uint256[]";
                readonly name: "amounts";
                readonly type: "uint256[]";
            }];
            readonly internalType: "struct ConduitBatch1155Transfer[]";
            readonly name: "batch1155Transfers";
            readonly type: "tuple[]";
        }];
        readonly name: "executeWithBatch1155";
        readonly outputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "magicValue";
            readonly type: "bytes4";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "channel";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "isOpen";
            readonly type: "bool";
        }];
        readonly name: "updateChannel";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ConduitInterfaceInterface;
    static connect(address: string, runner?: ContractRunner | null): ConduitInterface;
}
//# sourceMappingURL=ConduitInterface__factory.d.ts.map