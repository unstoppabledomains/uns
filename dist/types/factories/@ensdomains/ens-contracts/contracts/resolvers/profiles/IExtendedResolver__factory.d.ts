import { type ContractRunner } from "ethers";
import type { IExtendedResolver, IExtendedResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IExtendedResolver";
export declare class IExtendedResolver__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "name";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "resolve";
        readonly outputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IExtendedResolverInterface;
    static connect(address: string, runner?: ContractRunner | null): IExtendedResolver;
}
//# sourceMappingURL=IExtendedResolver__factory.d.ts.map