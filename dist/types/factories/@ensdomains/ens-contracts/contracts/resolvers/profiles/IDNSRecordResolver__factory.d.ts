import { type ContractRunner } from "ethers";
import type { IDNSRecordResolver, IDNSRecordResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IDNSRecordResolver";
export declare class IDNSRecordResolver__factory {
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
            readonly name: "name";
            readonly type: "bytes";
        }, {
            readonly indexed: false;
            readonly internalType: "uint16";
            readonly name: "resource";
            readonly type: "uint16";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes";
            readonly name: "record";
            readonly type: "bytes";
        }];
        readonly name: "DNSRecordChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes";
            readonly name: "name";
            readonly type: "bytes";
        }, {
            readonly indexed: false;
            readonly internalType: "uint16";
            readonly name: "resource";
            readonly type: "uint16";
        }];
        readonly name: "DNSRecordDeleted";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "name";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint16";
            readonly name: "resource";
            readonly type: "uint16";
        }];
        readonly name: "dnsRecord";
        readonly outputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IDNSRecordResolverInterface;
    static connect(address: string, runner?: ContractRunner | null): IDNSRecordResolver;
}
//# sourceMappingURL=IDNSRecordResolver__factory.d.ts.map