import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IRootChain, IRootChainInterface } from "../../../../../contracts/@maticnetwork/pos-portal/SimpleCheckpointManager.sol/IRootChain";
export declare class IRootChain__factory {
    static readonly abi: {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
    }[];
    static createInterface(): IRootChainInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IRootChain;
}
//# sourceMappingURL=IRootChain__factory.d.ts.map