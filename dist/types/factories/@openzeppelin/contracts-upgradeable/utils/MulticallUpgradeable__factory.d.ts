import { type ContractRunner } from "ethers";
import type { MulticallUpgradeable, MulticallUpgradeableInterface } from "../../../../@openzeppelin/contracts-upgradeable/utils/MulticallUpgradeable";
export declare class MulticallUpgradeable__factory {
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
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes[]";
            readonly name: "data";
            readonly type: "bytes[]";
        }];
        readonly name: "multicall";
        readonly outputs: readonly [{
            readonly internalType: "bytes[]";
            readonly name: "results";
            readonly type: "bytes[]";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): MulticallUpgradeableInterface;
    static connect(address: string, runner?: ContractRunner | null): MulticallUpgradeable;
}
//# sourceMappingURL=MulticallUpgradeable__factory.d.ts.map