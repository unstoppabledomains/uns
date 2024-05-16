import { type ContractRunner } from "ethers";
import type { ERC165Upgradeable, ERC165UpgradeableInterface } from "../../../../../@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable";
export declare class ERC165Upgradeable__factory {
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
    static createInterface(): ERC165UpgradeableInterface;
    static connect(address: string, runner?: ContractRunner | null): ERC165Upgradeable;
}
//# sourceMappingURL=ERC165Upgradeable__factory.d.ts.map