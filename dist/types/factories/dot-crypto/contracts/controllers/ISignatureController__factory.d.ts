import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ISignatureController, ISignatureControllerInterface } from "../../../../dot-crypto/contracts/controllers/ISignatureController";
export declare class ISignatureController__factory {
    static readonly abi: {
        constant: boolean;
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): ISignatureControllerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ISignatureController;
}
//# sourceMappingURL=ISignatureController__factory.d.ts.map