import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ReentrancyGuardUpgradeable, ReentrancyGuardUpgradeableInterface } from "../../../../@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable";
export declare class ReentrancyGuardUpgradeable__factory {
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
    static createInterface(): ReentrancyGuardUpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ReentrancyGuardUpgradeable;
}
//# sourceMappingURL=ReentrancyGuardUpgradeable__factory.d.ts.map