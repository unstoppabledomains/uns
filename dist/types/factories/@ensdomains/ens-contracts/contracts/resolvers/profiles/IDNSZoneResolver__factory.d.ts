import { type ContractRunner } from "ethers";
import type { IDNSZoneResolver, IDNSZoneResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IDNSZoneResolver";
export declare class IDNSZoneResolver__factory {
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
            readonly name: "lastzonehash";
            readonly type: "bytes";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes";
            readonly name: "zonehash";
            readonly type: "bytes";
        }];
        readonly name: "DNSZonehashChanged";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }];
        readonly name: "zonehash";
        readonly outputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IDNSZoneResolverInterface;
    static connect(address: string, runner?: ContractRunner | null): IDNSZoneResolver;
}
//# sourceMappingURL=IDNSZoneResolver__factory.d.ts.map