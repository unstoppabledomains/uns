import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Pausable, PausableInterface } from "../../../contracts/utils/Pausable";
export declare class Pausable__factory {
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
        inputs: never[];
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
    static createInterface(): PausableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Pausable;
}
//# sourceMappingURL=Pausable__factory.d.ts.map