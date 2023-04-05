import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Multicall, MulticallInterface } from "../../../contracts/utils/Multicall";
export declare class Multicall__factory {
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
    static createInterface(): MulticallInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Multicall;
}
//# sourceMappingURL=Multicall__factory.d.ts.map