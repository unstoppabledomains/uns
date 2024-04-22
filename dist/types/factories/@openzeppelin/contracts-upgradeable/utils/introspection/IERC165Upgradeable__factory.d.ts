import { type ContractRunner } from "ethers";
import type { IERC165Upgradeable, IERC165UpgradeableInterface } from "../../../../../@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable";
export declare class IERC165Upgradeable__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "interfaceId";
            readonly type: "bytes4";
        }];
        readonly name: "supportsInterface";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IERC165UpgradeableInterface;
    static connect(address: string, runner?: ContractRunner | null): IERC165Upgradeable;
}
//# sourceMappingURL=IERC165Upgradeable__factory.d.ts.map