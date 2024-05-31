import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { SignatureVerification, SignatureVerificationInterface } from "../../../../seaport-core/src/lib/SignatureVerification";
declare type SignatureVerificationConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class SignatureVerification__factory extends ContractFactory {
    constructor(...args: SignatureVerificationConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<SignatureVerification & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): SignatureVerification__factory;
    static readonly bytecode = "0x6080604052348015600e575f80fd5b50601580601a5f395ff3fe60806040525f80fdfea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "BadContractSignature";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }];
        readonly name: "BadSignatureV";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidSignature";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidSigner";
        readonly type: "error";
    }];
    static createInterface(): SignatureVerificationInterface;
    static connect(address: string, runner?: ContractRunner | null): SignatureVerification;
}
export {};
//# sourceMappingURL=SignatureVerification__factory.d.ts.map