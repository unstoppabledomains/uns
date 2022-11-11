import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { RecordStorage, RecordStorageInterface } from "../../contracts/RecordStorage";
export declare class RecordStorage__factory {
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
    static createInterface(): RecordStorageInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): RecordStorage;
}
//# sourceMappingURL=RecordStorage__factory.d.ts.map