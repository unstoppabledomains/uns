import { type ContractRunner } from "ethers";
import type { ReentrancyGuardUpgradeable, ReentrancyGuardUpgradeableInterface } from "../../../../@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable";
export declare class ReentrancyGuardUpgradeable__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint8";
            readonly name: "version";
            readonly type: "uint8";
        }];
        readonly name: "Initialized";
        readonly type: "event";
    }];
    static createInterface(): ReentrancyGuardUpgradeableInterface;
    static connect(address: string, runner?: ContractRunner | null): ReentrancyGuardUpgradeable;
}
//# sourceMappingURL=ReentrancyGuardUpgradeable__factory.d.ts.map