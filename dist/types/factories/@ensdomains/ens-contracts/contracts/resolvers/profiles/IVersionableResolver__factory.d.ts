import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IVersionableResolver, IVersionableResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IVersionableResolver";
export declare class IVersionableResolver__factory {
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
    static createInterface(): IVersionableResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IVersionableResolver;
}
//# sourceMappingURL=IVersionableResolver__factory.d.ts.map