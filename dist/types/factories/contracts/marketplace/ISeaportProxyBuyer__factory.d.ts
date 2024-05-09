import { type ContractRunner } from "ethers";
import type { ISeaportProxyBuyer, ISeaportProxyBuyerInterface } from "../../../contracts/marketplace/ISeaportProxyBuyer";
export declare class ISeaportProxyBuyer__factory {
    static readonly abi: readonly [{
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
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ISeaportProxyBuyerInterface;
    static connect(address: string, runner?: ContractRunner | null): ISeaportProxyBuyer;
}
//# sourceMappingURL=ISeaportProxyBuyer__factory.d.ts.map