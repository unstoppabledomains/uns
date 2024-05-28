import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { DummyAlgorithm, DummyAlgorithmInterface } from "../../../../../contracts/@ens/dnssec/algorithms/DummyAlgorithm";
declare type DummyAlgorithmConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class DummyAlgorithm__factory extends ContractFactory {
    constructor(...args: DummyAlgorithmConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<DummyAlgorithm & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): DummyAlgorithm__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b506101408061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063de8f50a11461002d575b5f80fd5b61004761003b3660046100a0565b60019695505050505050565b604051901515815260200160405180910390f35b5f8083601f84011261006b575f80fd5b50813567ffffffffffffffff811115610082575f80fd5b602083019150836020828501011115610099575f80fd5b9250929050565b5f805f805f80606087890312156100b5575f80fd5b863567ffffffffffffffff808211156100cc575f80fd5b6100d88a838b0161005b565b909850965060208901359150808211156100f0575f80fd5b6100fc8a838b0161005b565b90965094506040890135915080821115610114575f80fd5b5061012189828a0161005b565b979a969950949750929593949250505056fea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly name: "verify";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): DummyAlgorithmInterface;
    static connect(address: string, runner?: ContractRunner | null): DummyAlgorithm;
}
export {};
//# sourceMappingURL=DummyAlgorithm__factory.d.ts.map