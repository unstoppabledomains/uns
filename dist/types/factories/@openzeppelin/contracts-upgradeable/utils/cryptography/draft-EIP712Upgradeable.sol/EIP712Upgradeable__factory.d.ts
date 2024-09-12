import { type ContractRunner } from "ethers";
import type { EIP712Upgradeable, EIP712UpgradeableInterface } from "../../../../../../@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol/EIP712Upgradeable";
export declare class EIP712Upgradeable__factory {
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
    static createInterface(): EIP712UpgradeableInterface;
    static connect(address: string, runner?: ContractRunner | null): EIP712Upgradeable;
}
//# sourceMappingURL=EIP712Upgradeable__factory.d.ts.map