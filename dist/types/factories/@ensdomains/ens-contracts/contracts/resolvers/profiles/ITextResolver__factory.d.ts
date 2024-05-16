import { type ContractRunner } from "ethers";
import type { ITextResolver, ITextResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/ITextResolver";
export declare class ITextResolver__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "string";
            readonly name: "indexedKey";
            readonly type: "string";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "key";
            readonly type: "string";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "value";
            readonly type: "string";
        }];
        readonly name: "TextChanged";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly internalType: "string";
            readonly name: "key";
            readonly type: "string";
        }];
        readonly name: "text";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): ITextResolverInterface;
    static connect(address: string, runner?: ContractRunner | null): ITextResolver;
}
//# sourceMappingURL=ITextResolver__factory.d.ts.map