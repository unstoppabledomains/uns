import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ERC1155PausableUpgradeable, ERC1155PausableUpgradeableInterface } from "../../../../../../@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155PausableUpgradeable";
export declare class ERC1155PausableUpgradeable__factory {
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
    static createInterface(): ERC1155PausableUpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC1155PausableUpgradeable;
}
//# sourceMappingURL=ERC1155PausableUpgradeable__factory.d.ts.map