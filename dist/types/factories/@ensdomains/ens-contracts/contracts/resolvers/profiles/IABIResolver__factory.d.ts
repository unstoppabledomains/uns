import { type ContractRunner } from "ethers";
import type { IABIResolver, IABIResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IABIResolver";
export declare class IABIResolver__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "contentType";
            readonly type: "uint256";
        }];
        readonly name: "ABIChanged";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "contentTypes";
            readonly type: "uint256";
        }];
        readonly name: "ABI";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IABIResolverInterface;
    static connect(address: string, runner?: ContractRunner | null): IABIResolver;
}
//# sourceMappingURL=IABIResolver__factory.d.ts.map