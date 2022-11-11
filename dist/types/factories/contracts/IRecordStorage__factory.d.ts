import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IRecordStorage, IRecordStorageInterface } from "../../contracts/IRecordStorage";
export declare class IRecordStorage__factory {
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
    static createInterface(): IRecordStorageInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IRecordStorage;
}
//# sourceMappingURL=IRecordStorage__factory.d.ts.map