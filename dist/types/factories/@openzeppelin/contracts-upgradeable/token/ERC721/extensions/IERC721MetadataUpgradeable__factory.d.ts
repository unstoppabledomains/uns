import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC721MetadataUpgradeable, IERC721MetadataUpgradeableInterface } from "../../../../../../@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable";
export declare class IERC721MetadataUpgradeable__factory {
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
    static createInterface(): IERC721MetadataUpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC721MetadataUpgradeable;
}
//# sourceMappingURL=IERC721MetadataUpgradeable__factory.d.ts.map