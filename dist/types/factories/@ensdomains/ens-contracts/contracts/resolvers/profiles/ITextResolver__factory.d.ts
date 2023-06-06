import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ITextResolver, ITextResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/ITextResolver";
export declare class ITextResolver__factory {
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
    static createInterface(): ITextResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ITextResolver;
}
//# sourceMappingURL=ITextResolver__factory.d.ts.map