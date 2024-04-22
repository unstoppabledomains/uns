import { type ContractRunner } from "ethers";
import type { IURIPrefixController, IURIPrefixControllerInterface } from "../../../contracts/cns/IURIPrefixController";
export declare class IURIPrefixController__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "prefix";
            readonly type: "string";
        }];
        readonly name: "setTokenURIPrefix";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IURIPrefixControllerInterface;
    static connect(address: string, runner?: ContractRunner | null): IURIPrefixController;
}
//# sourceMappingURL=IURIPrefixController__factory.d.ts.map