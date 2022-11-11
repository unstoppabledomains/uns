import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Blocklist, BlocklistInterface } from "../../../contracts/utils/Blocklist";
export declare class Blocklist__factory {
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
    static createInterface(): BlocklistInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Blocklist;
}
//# sourceMappingURL=Blocklist__factory.d.ts.map