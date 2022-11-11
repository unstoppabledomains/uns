import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { KeyStorage, KeyStorageInterface } from "../../contracts/KeyStorage";
export declare class KeyStorage__factory {
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
    static createInterface(): KeyStorageInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): KeyStorage;
}
//# sourceMappingURL=KeyStorage__factory.d.ts.map