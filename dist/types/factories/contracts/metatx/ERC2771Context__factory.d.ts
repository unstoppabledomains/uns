import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ERC2771Context, ERC2771ContextInterface } from "../../../contracts/metatx/ERC2771Context";
export declare class ERC2771Context__factory {
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
    static createInterface(): ERC2771ContextInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC2771Context;
}
//# sourceMappingURL=ERC2771Context__factory.d.ts.map