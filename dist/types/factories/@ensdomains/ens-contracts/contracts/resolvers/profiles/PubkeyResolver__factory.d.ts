import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { PubkeyResolver, PubkeyResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/PubkeyResolver";
export declare class PubkeyResolver__factory {
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
    static createInterface(): PubkeyResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): PubkeyResolver;
}
//# sourceMappingURL=PubkeyResolver__factory.d.ts.map