import { type ContractRunner } from "ethers";
import type { ITokenPredicate, ITokenPredicateInterface } from "../../../../../contracts/@maticnetwork/pos-portal/RootChainManager.sol/ITokenPredicate";
export declare class ITokenPredicate__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "rootToken";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "logRLPList";
            readonly type: "bytes";
        }];
        readonly name: "exitTokens";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "depositor";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "depositReceiver";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "rootToken";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "depositData";
            readonly type: "bytes";
        }];
        readonly name: "lockTokens";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ITokenPredicateInterface;
    static connect(address: string, runner?: ContractRunner | null): ITokenPredicate;
}
//# sourceMappingURL=ITokenPredicate__factory.d.ts.map