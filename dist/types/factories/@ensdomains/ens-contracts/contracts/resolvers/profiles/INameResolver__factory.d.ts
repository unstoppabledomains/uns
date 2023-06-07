import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { INameResolver, INameResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/INameResolver";
export declare class INameResolver__factory {
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
    static createInterface(): INameResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): INameResolver;
}
//# sourceMappingURL=INameResolver__factory.d.ts.map