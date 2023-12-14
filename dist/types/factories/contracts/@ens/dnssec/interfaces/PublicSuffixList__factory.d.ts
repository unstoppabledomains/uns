import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { PublicSuffixList, PublicSuffixListInterface } from "../../../../../contracts/@ens/dnssec/interfaces/PublicSuffixList";
export declare class PublicSuffixList__factory {
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
    static createInterface(): PublicSuffixListInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): PublicSuffixList;
}
//# sourceMappingURL=PublicSuffixList__factory.d.ts.map