import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IMintingManager, IMintingManagerInterface } from "../../contracts/IMintingManager";
export declare class IMintingManager__factory {
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
        outputs: never[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): IMintingManagerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IMintingManager;
}
//# sourceMappingURL=IMintingManager__factory.d.ts.map