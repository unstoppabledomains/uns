import { type ContractRunner } from "ethers";
import type { IContentHashResolver, IContentHashResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IContentHashResolver";
export declare class IContentHashResolver__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes";
            readonly name: "hash";
            readonly type: "bytes";
        }];
        readonly name: "ContenthashChanged";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }];
        readonly name: "contenthash";
        readonly outputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IContentHashResolverInterface;
    static connect(address: string, runner?: ContractRunner | null): IContentHashResolver;
}
//# sourceMappingURL=IContentHashResolver__factory.d.ts.map