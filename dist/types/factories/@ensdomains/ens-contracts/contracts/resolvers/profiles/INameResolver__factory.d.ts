import { type ContractRunner } from "ethers";
import type { INameResolver, INameResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/INameResolver";
export declare class INameResolver__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }];
        readonly name: "NameChanged";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }];
        readonly name: "name";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): INameResolverInterface;
    static connect(address: string, runner?: ContractRunner | null): INameResolver;
}
//# sourceMappingURL=INameResolver__factory.d.ts.map