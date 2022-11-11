import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { AccessControlUpgradeable, AccessControlUpgradeableInterface } from "../../../../@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable";
export declare class AccessControlUpgradeable__factory {
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
    static createInterface(): AccessControlUpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): AccessControlUpgradeable;
}
//# sourceMappingURL=AccessControlUpgradeable__factory.d.ts.map