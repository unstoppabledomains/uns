import { type ContractRunner } from "ethers";
import type { IDNSRegistrar, IDNSRegistrarInterface } from "../../../../../contracts/@ens/dnssec/interfaces/IDNSRegistrar";
export declare class IDNSRegistrar__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "name";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "proof";
            readonly type: "bytes";
        }];
        readonly name: "claim";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "name";
            readonly type: "bytes";
        }, {
            readonly components: readonly [{
                readonly internalType: "bytes";
                readonly name: "rrset";
                readonly type: "bytes";
            }, {
                readonly internalType: "bytes";
                readonly name: "sig";
                readonly type: "bytes";
            }];
            readonly internalType: "struct DNSSEC.RRSetWithSignature[]";
            readonly name: "input";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "bytes";
            readonly name: "proof";
            readonly type: "bytes";
        }];
        readonly name: "proveAndClaim";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "name";
            readonly type: "bytes";
        }, {
            readonly components: readonly [{
                readonly internalType: "bytes";
                readonly name: "rrset";
                readonly type: "bytes";
            }, {
                readonly internalType: "bytes";
                readonly name: "sig";
                readonly type: "bytes";
            }];
            readonly internalType: "struct DNSSEC.RRSetWithSignature[]";
            readonly name: "input";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "bytes";
            readonly name: "proof";
            readonly type: "bytes";
        }, {
            readonly internalType: "address";
            readonly name: "resolver";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "addr";
            readonly type: "address";
        }];
        readonly name: "proveAndClaimWithResolver";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IDNSRegistrarInterface;
    static connect(address: string, runner?: ContractRunner | null): IDNSRegistrar;
}
//# sourceMappingURL=IDNSRegistrar__factory.d.ts.map