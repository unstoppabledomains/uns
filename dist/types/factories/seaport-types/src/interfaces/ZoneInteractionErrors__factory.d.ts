import { type ContractRunner } from "ethers";
import type { ZoneInteractionErrors, ZoneInteractionErrorsInterface } from "../../../../seaport-types/src/interfaces/ZoneInteractionErrors";
export declare class ZoneInteractionErrors__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "orderHash";
            readonly type: "bytes32";
        }];
        readonly name: "InvalidContractOrder";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "orderHash";
            readonly type: "bytes32";
        }];
        readonly name: "InvalidRestrictedOrder";
        readonly type: "error";
    }];
    static createInterface(): ZoneInteractionErrorsInterface;
    static connect(address: string, runner?: ContractRunner | null): ZoneInteractionErrors;
}
//# sourceMappingURL=ZoneInteractionErrors__factory.d.ts.map