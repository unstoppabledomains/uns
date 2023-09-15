import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC20Upgradeable, IERC20UpgradeableInterface } from "../../../../../@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable";
export declare class IERC20Upgradeable__factory {
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
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): IERC20UpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC20Upgradeable;
}
//# sourceMappingURL=IERC20Upgradeable__factory.d.ts.map