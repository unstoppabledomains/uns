import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ContentHashResolver, ContentHashResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/ContentHashResolver";
export declare class ContentHashResolver__factory {
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
    static createInterface(): ContentHashResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ContentHashResolver;
}
//# sourceMappingURL=ContentHashResolver__factory.d.ts.map