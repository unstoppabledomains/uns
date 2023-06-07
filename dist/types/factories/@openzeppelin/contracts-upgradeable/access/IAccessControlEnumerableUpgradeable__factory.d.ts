import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IAccessControlEnumerableUpgradeable, IAccessControlEnumerableUpgradeableInterface } from "../../../../@openzeppelin/contracts-upgradeable/access/IAccessControlEnumerableUpgradeable";
export declare class IAccessControlEnumerableUpgradeable__factory {
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
    static createInterface(): IAccessControlEnumerableUpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IAccessControlEnumerableUpgradeable;
}
//# sourceMappingURL=IAccessControlEnumerableUpgradeable__factory.d.ts.map