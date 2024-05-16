import { type ContractRunner } from "ethers";
import type { RootChainManagerStorage, RootChainManagerStorageInterface } from "../../../contracts/@maticnetwork/RootChainManagerStorage";
export declare class RootChainManagerStorage__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "tokenToType";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly name: "typeToPredicate";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): RootChainManagerStorageInterface;
    static connect(address: string, runner?: ContractRunner | null): RootChainManagerStorage;
}
//# sourceMappingURL=RootChainManagerStorage__factory.d.ts.map