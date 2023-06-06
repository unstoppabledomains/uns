import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Resolver, ResolverInterface } from "../../../../../@ensdomains/ens-contracts/contracts/resolvers/Resolver";
export declare class Resolver__factory {
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
    static createInterface(): ResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Resolver;
}
//# sourceMappingURL=Resolver__factory.d.ts.map