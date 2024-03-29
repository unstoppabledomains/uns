import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IBaseRegistrar, IBaseRegistrarInterface } from "../../../../../@ensdomains/ens-contracts/contracts/ethregistrar/IBaseRegistrar";
export declare class IBaseRegistrar__factory {
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
    static createInterface(): IBaseRegistrarInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IBaseRegistrar;
}
//# sourceMappingURL=IBaseRegistrar__factory.d.ts.map