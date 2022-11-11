import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC165, IERC165Interface } from "../../../../@openzeppelin/contracts/introspection/IERC165";
export declare class IERC165__factory {
    static readonly abi: {
        constant: boolean;
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
        payable: boolean;
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IERC165Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC165;
}
//# sourceMappingURL=IERC165__factory.d.ts.map