import { type ContractRunner } from "ethers";
import type { NSEC3Digest, NSEC3DigestInterface } from "../../../../../contracts/@ens/dnssec/interfaces/NSEC3Digest";
export declare class NSEC3Digest__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "salt";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint256";
            readonly name: "iterations";
            readonly type: "uint256";
        }];
        readonly name: "hash";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }];
    static createInterface(): NSEC3DigestInterface;
    static connect(address: string, runner?: ContractRunner | null): NSEC3Digest;
}
//# sourceMappingURL=NSEC3Digest__factory.d.ts.map