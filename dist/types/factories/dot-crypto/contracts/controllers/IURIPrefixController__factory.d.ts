import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IURIPrefixController, IURIPrefixControllerInterface } from "../../../../dot-crypto/contracts/controllers/IURIPrefixController";
export declare class IURIPrefixController__factory {
    static readonly abi: {
        constant: boolean;
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        payable: boolean;
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IURIPrefixControllerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IURIPrefixController;
}
//# sourceMappingURL=IURIPrefixController__factory.d.ts.map