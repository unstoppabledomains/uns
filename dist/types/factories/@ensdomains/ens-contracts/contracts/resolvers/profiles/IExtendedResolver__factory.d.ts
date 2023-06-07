import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IExtendedResolver, IExtendedResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IExtendedResolver";
export declare class IExtendedResolver__factory {
    static readonly abi: {
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
    }[];
    static createInterface(): IExtendedResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IExtendedResolver;
}
//# sourceMappingURL=IExtendedResolver__factory.d.ts.map