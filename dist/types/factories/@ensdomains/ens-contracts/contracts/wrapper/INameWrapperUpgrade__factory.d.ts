import { type ContractRunner } from "ethers";
import type { INameWrapperUpgrade, INameWrapperUpgradeInterface } from "../../../../../@ensdomains/ens-contracts/contracts/wrapper/INameWrapperUpgrade";
export declare class INameWrapperUpgrade__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "name";
            readonly type: "bytes";
        }, {
            readonly internalType: "address";
            readonly name: "wrappedOwner";
            readonly type: "address";
        }, {
            readonly internalType: "uint32";
            readonly name: "fuses";
            readonly type: "uint32";
        }, {
            readonly internalType: "uint64";
            readonly name: "expiry";
            readonly type: "uint64";
        }, {
            readonly internalType: "address";
            readonly name: "approved";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "extraData";
            readonly type: "bytes";
        }];
        readonly name: "wrapFromUpgrade";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): INameWrapperUpgradeInterface;
    static connect(address: string, runner?: ContractRunner | null): INameWrapperUpgrade;
}
//# sourceMappingURL=INameWrapperUpgrade__factory.d.ts.map