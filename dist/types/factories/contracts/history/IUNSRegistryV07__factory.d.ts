import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IUNSRegistryV07, IUNSRegistryV07Interface } from "../../../contracts/history/IUNSRegistryV07";
export declare class IUNSRegistryV07__factory {
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
    static createInterface(): IUNSRegistryV07Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IUNSRegistryV07;
}
//# sourceMappingURL=IUNSRegistryV07__factory.d.ts.map