import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IMulticallable, IMulticallableInterface } from "../../../../../@ensdomains/ens-contracts/contracts/resolvers/IMulticallable";
export declare class IMulticallable__factory {
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
    static createInterface(): IMulticallableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IMulticallable;
}
//# sourceMappingURL=IMulticallable__factory.d.ts.map