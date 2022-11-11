import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC721ReceiverUpgradeable, IERC721ReceiverUpgradeableInterface } from "../../../../../@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable";
export declare class IERC721ReceiverUpgradeable__factory {
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
    static createInterface(): IERC721ReceiverUpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC721ReceiverUpgradeable;
}
//# sourceMappingURL=IERC721ReceiverUpgradeable__factory.d.ts.map