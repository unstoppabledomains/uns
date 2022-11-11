import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ERC2771RegistryContext, ERC2771RegistryContextInterface } from "../../../contracts/metatx/ERC2771RegistryContext";
export declare class ERC2771RegistryContext__factory {
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
    static createInterface(): ERC2771RegistryContextInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC2771RegistryContext;
}
//# sourceMappingURL=ERC2771RegistryContext__factory.d.ts.map