import { type ContractRunner } from "ethers";
import type { KeyStorage, KeyStorageInterface } from "../../contracts/KeyStorage";
export declare class KeyStorage__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "key";
            readonly type: "string";
        }];
        readonly name: "addKey";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "keyHash";
            readonly type: "uint256";
        }];
        readonly name: "getKey";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256[]";
            readonly name: "hashes";
            readonly type: "uint256[]";
        }];
        readonly name: "getKeys";
        readonly outputs: readonly [{
            readonly internalType: "string[]";
            readonly name: "values";
            readonly type: "string[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): KeyStorageInterface;
    static connect(address: string, runner?: ContractRunner | null): KeyStorage;
}
//# sourceMappingURL=KeyStorage__factory.d.ts.map