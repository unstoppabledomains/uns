import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IRootChainManager, IRootChainManagerInterface } from "../../../contracts/@maticnetwork/IRootChainManager";
export declare class IRootChainManager__factory {
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
    static createInterface(): IRootChainManagerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IRootChainManager;
}
//# sourceMappingURL=IRootChainManager__factory.d.ts.map