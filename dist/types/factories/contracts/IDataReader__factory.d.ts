import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IDataReader, IDataReaderInterface } from "../../contracts/IDataReader";
export declare class IDataReader__factory {
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
    static createInterface(): IDataReaderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IDataReader;
}
//# sourceMappingURL=IDataReader__factory.d.ts.map