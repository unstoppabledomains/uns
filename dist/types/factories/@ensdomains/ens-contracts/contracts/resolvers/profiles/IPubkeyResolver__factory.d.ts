import { type ContractRunner } from "ethers";
import type { IPubkeyResolver, IPubkeyResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IPubkeyResolver";
export declare class IPubkeyResolver__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "x";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "y";
            readonly type: "bytes32";
        }];
        readonly name: "PubkeyChanged";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }];
        readonly name: "pubkey";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "x";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "y";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IPubkeyResolverInterface;
    static connect(address: string, runner?: ContractRunner | null): IPubkeyResolver;
}
//# sourceMappingURL=IPubkeyResolver__factory.d.ts.map