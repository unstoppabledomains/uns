import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IRegistryReader, IRegistryReaderInterface } from "../../contracts/IRegistryReader";
export declare class IRegistryReader__factory {
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
    static createInterface(): IRegistryReaderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IRegistryReader;
}
//# sourceMappingURL=IRegistryReader__factory.d.ts.map