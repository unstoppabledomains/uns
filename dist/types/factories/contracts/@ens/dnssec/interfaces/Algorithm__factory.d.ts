import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Algorithm, AlgorithmInterface } from "../../../../../contracts/@ens/dnssec/interfaces/Algorithm";
export declare class Algorithm__factory {
    static readonly abi: {
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
    }[];
    static createInterface(): AlgorithmInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Algorithm;
}
//# sourceMappingURL=Algorithm__factory.d.ts.map