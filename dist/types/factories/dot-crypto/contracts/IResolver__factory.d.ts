import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IResolver, IResolverInterface } from "../../../dot-crypto/contracts/IResolver";
export declare class IResolver__factory {
    static readonly abi: {
        constant: boolean;
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        payable: boolean;
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IResolver;
}
//# sourceMappingURL=IResolver__factory.d.ts.map