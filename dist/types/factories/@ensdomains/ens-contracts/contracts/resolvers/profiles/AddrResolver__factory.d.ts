import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { AddrResolver, AddrResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/AddrResolver";
export declare class AddrResolver__factory {
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
    static createInterface(): AddrResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): AddrResolver;
}
//# sourceMappingURL=AddrResolver__factory.d.ts.map