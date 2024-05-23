import { type ContractRunner } from "ethers";
import type { SignatureVerificationErrors, SignatureVerificationErrorsInterface } from "../../../../seaport-types/src/interfaces/SignatureVerificationErrors";
export declare class SignatureVerificationErrors__factory {
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
    static createInterface(): SignatureVerificationErrorsInterface;
    static connect(address: string, runner?: ContractRunner | null): SignatureVerificationErrors;
}
//# sourceMappingURL=SignatureVerificationErrors__factory.d.ts.map