import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IPubkeyResolver, IPubkeyResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IPubkeyResolver";
export declare class IPubkeyResolver__factory {
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
    static createInterface(): IPubkeyResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IPubkeyResolver;
}
//# sourceMappingURL=IPubkeyResolver__factory.d.ts.map