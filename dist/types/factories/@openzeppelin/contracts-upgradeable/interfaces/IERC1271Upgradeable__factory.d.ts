import { type ContractRunner } from "ethers";
import type { IERC1271Upgradeable, IERC1271UpgradeableInterface } from "../../../../@openzeppelin/contracts-upgradeable/interfaces/IERC1271Upgradeable";
export declare class IERC1271Upgradeable__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "hash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly name: "isValidSignature";
        readonly outputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "magicValue";
            readonly type: "bytes4";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IERC1271UpgradeableInterface;
    static connect(address: string, runner?: ContractRunner | null): IERC1271Upgradeable;
}
//# sourceMappingURL=IERC1271Upgradeable__factory.d.ts.map