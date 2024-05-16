import { type ContractRunner } from "ethers";
import type { IInterfaceResolver, IInterfaceResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IInterfaceResolver";
export declare class IInterfaceResolver__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes4";
            readonly name: "interfaceID";
            readonly type: "bytes4";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "implementer";
            readonly type: "address";
        }];
        readonly name: "InterfaceChanged";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes4";
            readonly name: "interfaceID";
            readonly type: "bytes4";
        }];
        readonly name: "interfaceImplementer";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IInterfaceResolverInterface;
    static connect(address: string, runner?: ContractRunner | null): IInterfaceResolver;
}
//# sourceMappingURL=IInterfaceResolver__factory.d.ts.map