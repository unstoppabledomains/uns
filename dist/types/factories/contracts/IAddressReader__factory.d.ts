import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IAddressReader, IAddressReaderInterface } from "../../contracts/IAddressReader";
export declare class IAddressReader__factory {
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
    static createInterface(): IAddressReaderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IAddressReader;
}
//# sourceMappingURL=IAddressReader__factory.d.ts.map