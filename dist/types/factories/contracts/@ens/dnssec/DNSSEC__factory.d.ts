import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { DNSSEC, DNSSECInterface } from "../../../../contracts/@ens/dnssec/DNSSEC";
export declare class DNSSEC__factory {
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
    static createInterface(): DNSSECInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): DNSSEC;
}
//# sourceMappingURL=DNSSEC__factory.d.ts.map