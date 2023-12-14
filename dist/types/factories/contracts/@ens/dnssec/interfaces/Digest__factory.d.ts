import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Digest, DigestInterface } from "../../../../../contracts/@ens/dnssec/interfaces/Digest";
export declare class Digest__factory {
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
    static createInterface(): DigestInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Digest;
}
//# sourceMappingURL=Digest__factory.d.ts.map