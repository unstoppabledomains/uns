import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ContextUpgradeable, ContextUpgradeableInterface } from "../../../../@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable";
export declare class ContextUpgradeable__factory {
    static readonly abi: {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
    }[];
    static createInterface(): ContextUpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ContextUpgradeable;
}
//# sourceMappingURL=ContextUpgradeable__factory.d.ts.map