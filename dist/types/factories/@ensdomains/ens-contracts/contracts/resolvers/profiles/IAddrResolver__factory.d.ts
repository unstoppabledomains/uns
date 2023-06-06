import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IAddrResolver, IAddrResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IAddrResolver";
export declare class IAddrResolver__factory {
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
    static createInterface(): IAddrResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IAddrResolver;
}
//# sourceMappingURL=IAddrResolver__factory.d.ts.map