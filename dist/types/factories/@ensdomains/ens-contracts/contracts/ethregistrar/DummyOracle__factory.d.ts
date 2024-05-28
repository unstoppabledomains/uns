import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, BigNumberish, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { DummyOracle, DummyOracleInterface } from "../../../../../@ensdomains/ens-contracts/contracts/ethregistrar/DummyOracle";
declare type DummyOracleConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class DummyOracle__factory extends ContractFactory {
    constructor(...args: DummyOracleConstructorParams);
    getDeployTransaction(_value: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(_value: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<DummyOracle & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): DummyOracle__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b506040516100db3803806100db83398101604081905261002e9161003c565b610036815f55565b50610053565b5f6020828403121561004c575f80fd5b5051919050565b607c8061005f5f395ff3fe6080604052348015600e575f80fd5b50600436106030575f3560e01c806350d25bcd146034578063e5c19b2d146048575b5f80fd5b5f5460405190815260200160405180910390f35b605760533660046059565b5f55565b005b5f602082840312156068575f80fd5b503591905056fea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "int256";
            readonly name: "_value";
            readonly type: "int256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "latestAnswer";
        readonly outputs: readonly [{
            readonly internalType: "int256";
            readonly name: "";
            readonly type: "int256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "int256";
            readonly name: "_value";
            readonly type: "int256";
        }];
        readonly name: "set";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): DummyOracleInterface;
    static connect(address: string, runner?: ContractRunner | null): DummyOracle;
}
export {};
//# sourceMappingURL=DummyOracle__factory.d.ts.map