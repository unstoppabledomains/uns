import { type ContractRunner } from "ethers";
import type { ISmartAccount, ISmartAccountInterface } from "../../../contracts/smartAccounts/ISmartAccount";
export declare class ISmartAccount__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "NotSelf";
        readonly type: "error";
    }];
    static createInterface(): ISmartAccountInterface;
    static connect(address: string, runner?: ContractRunner | null): ISmartAccount;
}
//# sourceMappingURL=ISmartAccount__factory.d.ts.map