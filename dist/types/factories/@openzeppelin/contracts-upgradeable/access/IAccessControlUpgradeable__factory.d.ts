import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IAccessControlUpgradeable, IAccessControlUpgradeableInterface } from "../../../../@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable";
export declare class IAccessControlUpgradeable__factory {
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
    static createInterface(): IAccessControlUpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IAccessControlUpgradeable;
}
//# sourceMappingURL=IAccessControlUpgradeable__factory.d.ts.map