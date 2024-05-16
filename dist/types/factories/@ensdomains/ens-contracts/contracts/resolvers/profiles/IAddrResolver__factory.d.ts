import { type ContractRunner } from "ethers";
import type { IAddrResolver, IAddrResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IAddrResolver";
export declare class IAddrResolver__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "a";
            readonly type: "address";
        }];
        readonly name: "AddrChanged";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }];
        readonly name: "addr";
        readonly outputs: readonly [{
            readonly internalType: "address payable";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IAddrResolverInterface;
    static connect(address: string, runner?: ContractRunner | null): IAddrResolver;
}
//# sourceMappingURL=IAddrResolver__factory.d.ts.map