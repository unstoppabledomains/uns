import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC1967, IERC1967Interface } from "../../contracts/IERC1967";
export declare class IERC1967__factory {
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
    static createInterface(): IERC1967Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC1967;
}
//# sourceMappingURL=IERC1967__factory.d.ts.map