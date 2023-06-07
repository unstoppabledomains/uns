import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IMetadataService, IMetadataServiceInterface } from "../../../../../@ensdomains/ens-contracts/contracts/wrapper/IMetadataService";
export declare class IMetadataService__factory {
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
    static createInterface(): IMetadataServiceInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IMetadataService;
}
//# sourceMappingURL=IMetadataService__factory.d.ts.map