import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { NSEC3Digest, NSEC3DigestInterface } from "../../../../../contracts/@ens/dnssec/interfaces/NSEC3Digest";
export declare class NSEC3Digest__factory {
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
    static createInterface(): NSEC3DigestInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): NSEC3Digest;
}
//# sourceMappingURL=NSEC3Digest__factory.d.ts.map