import { type ContractRunner } from "ethers";
import type { Algorithm, AlgorithmInterface } from "../../../../../contracts/@ens/dnssec/interfaces/Algorithm";
export declare class Algorithm__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "key";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly name: "verify";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): AlgorithmInterface;
    static connect(address: string, runner?: ContractRunner | null): Algorithm;
}
//# sourceMappingURL=Algorithm__factory.d.ts.map