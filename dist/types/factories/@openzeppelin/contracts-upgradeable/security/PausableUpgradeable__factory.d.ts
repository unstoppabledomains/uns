import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { PausableUpgradeable, PausableUpgradeableInterface } from "../../../../@openzeppelin/contracts-upgradeable/security/PausableUpgradeable";
export declare class PausableUpgradeable__factory {
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
        inputs: never[];
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
    static createInterface(): PausableUpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): PausableUpgradeable;
}
//# sourceMappingURL=PausableUpgradeable__factory.d.ts.map