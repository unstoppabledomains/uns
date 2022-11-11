import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IUNSRegistry, IUNSRegistryInterface } from "../../contracts/IUNSRegistry";
export declare class IUNSRegistry__factory {
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
    static createInterface(): IUNSRegistryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IUNSRegistry;
}
//# sourceMappingURL=IUNSRegistry__factory.d.ts.map