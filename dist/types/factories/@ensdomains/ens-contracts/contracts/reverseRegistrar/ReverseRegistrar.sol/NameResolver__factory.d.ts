import { type ContractRunner } from "ethers";
import type { NameResolver, NameResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/reverseRegistrar/ReverseRegistrar.sol/NameResolver";
export declare class NameResolver__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }];
        readonly name: "setName";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): NameResolverInterface;
    static connect(address: string, runner?: ContractRunner | null): NameResolver;
}
//# sourceMappingURL=NameResolver__factory.d.ts.map