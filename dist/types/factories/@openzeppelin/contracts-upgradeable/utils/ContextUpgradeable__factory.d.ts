import { type ContractRunner } from "ethers";
import type { ContextUpgradeable, ContextUpgradeableInterface } from "../../../../@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable";
export declare class ContextUpgradeable__factory {
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
    static createInterface(): ContextUpgradeableInterface;
    static connect(address: string, runner?: ContractRunner | null): ContextUpgradeable;
}
//# sourceMappingURL=ContextUpgradeable__factory.d.ts.map