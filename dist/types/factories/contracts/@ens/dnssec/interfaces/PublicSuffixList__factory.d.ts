import { type ContractRunner } from "ethers";
import type { PublicSuffixList, PublicSuffixListInterface } from "../../../../../contracts/@ens/dnssec/interfaces/PublicSuffixList";
export declare class PublicSuffixList__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "name";
            readonly type: "bytes";
        }];
        readonly name: "isPublicSuffix";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): PublicSuffixListInterface;
    static connect(address: string, runner?: ContractRunner | null): PublicSuffixList;
}
//# sourceMappingURL=PublicSuffixList__factory.d.ts.map