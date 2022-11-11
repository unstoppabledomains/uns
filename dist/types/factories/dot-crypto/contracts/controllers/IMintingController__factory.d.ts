import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IMintingController, IMintingControllerInterface } from "../../../../dot-crypto/contracts/controllers/IMintingController";
export declare class IMintingController__factory {
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
    static createInterface(): IMintingControllerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IMintingController;
}
//# sourceMappingURL=IMintingController__factory.d.ts.map