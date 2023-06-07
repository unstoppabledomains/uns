import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IENSCustody, IENSCustodyInterface } from "../../../contracts/custody/IENSCustody";
export declare class IENSCustody__factory {
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
    } | {
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        inputs?: undefined;
        name?: undefined;
        outputs?: undefined;
    })[];
    static createInterface(): IENSCustodyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IENSCustody;
}
//# sourceMappingURL=IENSCustody__factory.d.ts.map