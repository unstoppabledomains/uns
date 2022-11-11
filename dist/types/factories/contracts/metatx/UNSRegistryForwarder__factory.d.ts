import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { UNSRegistryForwarder, UNSRegistryForwarderInterface } from "../../../contracts/metatx/UNSRegistryForwarder";
export declare class UNSRegistryForwarder__factory {
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
        inputs: ({
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        } | {
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        })[];
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
    static createInterface(): UNSRegistryForwarderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): UNSRegistryForwarder;
}
//# sourceMappingURL=UNSRegistryForwarder__factory.d.ts.map