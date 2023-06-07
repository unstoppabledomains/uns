import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ResolverBase, ResolverBaseInterface } from "../../../../../@ensdomains/ens-contracts/contracts/resolvers/ResolverBase";
export declare class ResolverBase__factory {
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
    static createInterface(): ResolverBaseInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ResolverBase;
}
//# sourceMappingURL=ResolverBase__factory.d.ts.map