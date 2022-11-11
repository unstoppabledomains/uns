import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IURIPrefixController, IURIPrefixControllerInterface } from "../../../contracts/cns/IURIPrefixController";
export declare class IURIPrefixController__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IURIPrefixControllerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IURIPrefixController;
}
//# sourceMappingURL=IURIPrefixController__factory.d.ts.map