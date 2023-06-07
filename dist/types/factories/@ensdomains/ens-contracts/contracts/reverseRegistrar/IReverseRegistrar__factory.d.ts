import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IReverseRegistrar, IReverseRegistrarInterface } from "../../../../../@ensdomains/ens-contracts/contracts/reverseRegistrar/IReverseRegistrar";
export declare class IReverseRegistrar__factory {
    static readonly abi: {
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
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IReverseRegistrarInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IReverseRegistrar;
}
//# sourceMappingURL=IReverseRegistrar__factory.d.ts.map