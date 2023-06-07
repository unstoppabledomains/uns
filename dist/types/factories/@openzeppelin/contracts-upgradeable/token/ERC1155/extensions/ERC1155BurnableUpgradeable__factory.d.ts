import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ERC1155BurnableUpgradeable, ERC1155BurnableUpgradeableInterface } from "../../../../../../@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable";
export declare class ERC1155BurnableUpgradeable__factory {
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
    static createInterface(): ERC1155BurnableUpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC1155BurnableUpgradeable;
}
//# sourceMappingURL=ERC1155BurnableUpgradeable__factory.d.ts.map