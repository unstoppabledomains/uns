import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IResolverReader, IResolverReaderInterface } from "../../../dot-crypto/contracts/IResolverReader";
export declare class IResolverReader__factory {
    static readonly abi: {
        constant: boolean;
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
        payable: boolean;
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IResolverReaderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IResolverReader;
}
//# sourceMappingURL=IResolverReader__factory.d.ts.map