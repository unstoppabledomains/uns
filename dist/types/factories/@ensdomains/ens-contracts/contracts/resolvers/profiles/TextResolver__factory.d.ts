import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { TextResolver, TextResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/TextResolver";
export declare class TextResolver__factory {
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
    static createInterface(): TextResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TextResolver;
}
//# sourceMappingURL=TextResolver__factory.d.ts.map