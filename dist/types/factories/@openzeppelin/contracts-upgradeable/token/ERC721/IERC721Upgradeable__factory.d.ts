import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC721Upgradeable, IERC721UpgradeableInterface } from "../../../../../@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable";
export declare class IERC721Upgradeable__factory {
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
    static createInterface(): IERC721UpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC721Upgradeable;
}
//# sourceMappingURL=IERC721Upgradeable__factory.d.ts.map