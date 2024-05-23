import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { ZoneInteraction, ZoneInteractionInterface } from "../../../../seaport-core/src/lib/ZoneInteraction";
declare type ZoneInteractionConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ZoneInteraction__factory extends ContractFactory {
    constructor(...args: ZoneInteractionConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ZoneInteraction & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ZoneInteraction__factory;
    static readonly bytecode = "0x6080604052348015600e575f80fd5b50601580601a5f395ff3fe60806040525f80fdfea164736f6c6343000818000a";
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
    static createInterface(): ZoneInteractionInterface;
    static connect(address: string, runner?: ContractRunner | null): ZoneInteraction;
}
export {};
//# sourceMappingURL=ZoneInteraction__factory.d.ts.map