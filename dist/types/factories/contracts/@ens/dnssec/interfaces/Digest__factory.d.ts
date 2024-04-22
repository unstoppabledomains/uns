import { type ContractRunner } from "ethers";
import type { Digest, DigestInterface } from "../../../../../contracts/@ens/dnssec/interfaces/Digest";
export declare class Digest__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "hash";
            readonly type: "bytes";
        }];
        readonly name: "verify";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }];
    static createInterface(): DigestInterface;
    static connect(address: string, runner?: ContractRunner | null): Digest;
}
//# sourceMappingURL=Digest__factory.d.ts.map