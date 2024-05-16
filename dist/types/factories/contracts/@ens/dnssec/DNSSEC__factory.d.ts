import { type ContractRunner } from "ethers";
import type { DNSSEC, DNSSECInterface } from "../../../../contracts/@ens/dnssec/DNSSEC";
export declare class DNSSEC__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint8";
            readonly name: "id";
            readonly type: "uint8";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "addr";
            readonly type: "address";
        }];
        readonly name: "AlgorithmUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint8";
            readonly name: "id";
            readonly type: "uint8";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "addr";
            readonly type: "address";
        }];
        readonly name: "DigestUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint8";
            readonly name: "id";
            readonly type: "uint8";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "addr";
            readonly type: "address";
        }];
        readonly name: "NSEC3DigestUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "bytes";
            readonly name: "name";
            readonly type: "bytes";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes";
            readonly name: "rrset";
            readonly type: "bytes";
        }];
        readonly name: "RRSetUpdated";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "anchors";
        readonly outputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "deleteType";
            readonly type: "uint16";
        }, {
            readonly internalType: "bytes";
            readonly name: "deleteName";
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
            readonly internalType: "struct DNSSEC.RRSetWithSignature";
            readonly name: "nsec";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes";
            readonly name: "proof";
            readonly type: "bytes";
        }];
        readonly name: "deleteRRSet";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "deleteType";
            readonly type: "uint16";
        }, {
            readonly internalType: "bytes";
            readonly name: "deleteName";
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
            readonly internalType: "struct DNSSEC.RRSetWithSignature";
            readonly name: "closestEncloser";
            readonly type: "tuple";
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
            readonly internalType: "struct DNSSEC.RRSetWithSignature";
            readonly name: "nextClosest";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes";
            readonly name: "dnskey";
            readonly type: "bytes";
        }];
        readonly name: "deleteRRSetNSEC3";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "dnstype";
            readonly type: "uint16";
        }, {
            readonly internalType: "bytes";
            readonly name: "name";
            readonly type: "bytes";
        }];
        readonly name: "rrdata";
        readonly outputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "";
            readonly type: "uint32";
        }, {
            readonly internalType: "uint32";
            readonly name: "";
            readonly type: "uint32";
        }, {
            readonly internalType: "bytes20";
            readonly name: "";
            readonly type: "bytes20";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "bytes";
                readonly name: "rrset";
                readonly type: "bytes";
            }, {
                readonly internalType: "bytes";
                readonly name: "sig";
                readonly type: "bytes";
            }];
            readonly internalType: "struct DNSSEC.RRSetWithSignature";
            readonly name: "input";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes";
            readonly name: "proof";
            readonly type: "bytes";
        }];
        readonly name: "submitRRSet";
        readonly outputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
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
        readonly name: "submitRRSets";
        readonly outputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): DNSSECInterface;
    static connect(address: string, runner?: ContractRunner | null): DNSSEC;
}
//# sourceMappingURL=DNSSEC__factory.d.ts.map