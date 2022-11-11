import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IReverseRegistry, IReverseRegistryInterface } from "../../contracts/IReverseRegistry";
export declare class IReverseRegistry__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
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
        anonymous?: undefined;
    })[];
    static createInterface(): IReverseRegistryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IReverseRegistry;
}
//# sourceMappingURL=IReverseRegistry__factory.d.ts.map