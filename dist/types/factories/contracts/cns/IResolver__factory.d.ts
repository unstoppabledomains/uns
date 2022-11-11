import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IResolver, IResolverInterface } from "../../../contracts/cns/IResolver";
export declare class IResolver__factory {
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
    static createInterface(): IResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IResolver;
}
//# sourceMappingURL=IResolver__factory.d.ts.map