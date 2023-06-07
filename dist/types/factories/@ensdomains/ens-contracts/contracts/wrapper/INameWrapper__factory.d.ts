import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { INameWrapper, INameWrapperInterface } from "../../../../../@ensdomains/ens-contracts/contracts/wrapper/INameWrapper";
export declare class INameWrapper__factory {
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
    static createInterface(): INameWrapperInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): INameWrapper;
}
//# sourceMappingURL=INameWrapper__factory.d.ts.map