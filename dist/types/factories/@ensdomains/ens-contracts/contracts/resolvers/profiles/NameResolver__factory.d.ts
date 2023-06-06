import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { NameResolver, NameResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/NameResolver";
export declare class NameResolver__factory {
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
    static createInterface(): NameResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): NameResolver;
}
//# sourceMappingURL=NameResolver__factory.d.ts.map