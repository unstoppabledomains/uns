import { type ContractRunner } from "ethers";
import type { ReentrancyErrors, ReentrancyErrorsInterface } from "../../../../seaport-types/src/interfaces/ReentrancyErrors";
export declare class ReentrancyErrors__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "NoReentrantCalls";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "TStoreAlreadyActivated";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "TStoreNotSupported";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "TloadTestContractDeploymentFailed";
        readonly type: "error";
    }];
    static createInterface(): ReentrancyErrorsInterface;
    static connect(address: string, runner?: ContractRunner | null): ReentrancyErrors;
}
//# sourceMappingURL=ReentrancyErrors__factory.d.ts.map