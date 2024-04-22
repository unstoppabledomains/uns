import { type ContractRunner } from "ethers";
import type { IVersionableResolver, IVersionableResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IVersionableResolver";
export declare class IVersionableResolver__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint64";
            readonly name: "newVersion";
            readonly type: "uint64";
        }];
        readonly name: "VersionChanged";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }];
        readonly name: "recordVersions";
        readonly outputs: readonly [{
            readonly internalType: "uint64";
            readonly name: "";
            readonly type: "uint64";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IVersionableResolverInterface;
    static connect(address: string, runner?: ContractRunner | null): IVersionableResolver;
}
//# sourceMappingURL=IVersionableResolver__factory.d.ts.map