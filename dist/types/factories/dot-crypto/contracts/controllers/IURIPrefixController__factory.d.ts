import { type ContractRunner } from "ethers";
import type { IURIPrefixController, IURIPrefixControllerInterface } from "../../../../dot-crypto/contracts/controllers/IURIPrefixController";
export declare class IURIPrefixController__factory {
    static readonly abi: readonly [{
        readonly constant: false;
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "prefix";
            readonly type: "string";
        }];
        readonly name: "setTokenURIPrefix";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IURIPrefixControllerInterface;
    static connect(address: string, runner?: ContractRunner | null): IURIPrefixController;
}
//# sourceMappingURL=IURIPrefixController__factory.d.ts.map