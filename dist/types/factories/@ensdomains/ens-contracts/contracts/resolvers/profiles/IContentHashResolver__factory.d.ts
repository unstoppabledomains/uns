import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IContentHashResolver, IContentHashResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IContentHashResolver";
export declare class IContentHashResolver__factory {
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
    static createInterface(): IContentHashResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IContentHashResolver;
}
//# sourceMappingURL=IContentHashResolver__factory.d.ts.map