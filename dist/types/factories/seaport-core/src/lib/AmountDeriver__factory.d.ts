import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { AmountDeriver, AmountDeriverInterface } from "../../../../seaport-core/src/lib/AmountDeriver";
declare type AmountDeriverConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class AmountDeriver__factory extends ContractFactory {
    constructor(...args: AmountDeriverConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<AmountDeriver & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): AmountDeriver__factory;
    static readonly bytecode = "0x6080604052348015600e575f80fd5b50601580601a5f395ff3fe60806040525f80fdfea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "InexactFraction";
        readonly type: "error";
    }];
    static createInterface(): AmountDeriverInterface;
    static connect(address: string, runner?: ContractRunner | null): AmountDeriver;
}
export {};
//# sourceMappingURL=AmountDeriver__factory.d.ts.map