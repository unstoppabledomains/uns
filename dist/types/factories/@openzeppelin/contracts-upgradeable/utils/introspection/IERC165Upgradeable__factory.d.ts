import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC165Upgradeable, IERC165UpgradeableInterface } from "../../../../../@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable";
export declare class IERC165Upgradeable__factory {
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
    static createInterface(): IERC165UpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC165Upgradeable;
}
//# sourceMappingURL=IERC165Upgradeable__factory.d.ts.map