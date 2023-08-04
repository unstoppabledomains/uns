import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { LegacyENS, LegacyENSInterface } from "../../../../contracts/@ens/LegacyENSRegistry.sol/LegacyENS";
export declare class LegacyENS__factory {
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
    static createInterface(): LegacyENSInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): LegacyENS;
}
//# sourceMappingURL=LegacyENS__factory.d.ts.map