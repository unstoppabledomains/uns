import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IRecordReader, IRecordReaderInterface } from "../../contracts/IRecordReader";
export declare class IRecordReader__factory {
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
    static createInterface(): IRecordReaderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IRecordReader;
}
//# sourceMappingURL=IRecordReader__factory.d.ts.map