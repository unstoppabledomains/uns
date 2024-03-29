import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ENS, ENSInterface } from "../../../../../@ensdomains/ens-contracts/contracts/registry/ENS";
export declare class ENS__factory {
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
    static createInterface(): ENSInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ENS;
}
//# sourceMappingURL=ENS__factory.d.ts.map