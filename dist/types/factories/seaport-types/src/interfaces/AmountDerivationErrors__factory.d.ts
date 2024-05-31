import { type ContractRunner } from "ethers";
import type { AmountDerivationErrors, AmountDerivationErrorsInterface } from "../../../../seaport-types/src/interfaces/AmountDerivationErrors";
export declare class AmountDerivationErrors__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "InexactFraction";
        readonly type: "error";
    }];
    static createInterface(): AmountDerivationErrorsInterface;
    static connect(address: string, runner?: ContractRunner | null): AmountDerivationErrors;
}
//# sourceMappingURL=AmountDerivationErrors__factory.d.ts.map