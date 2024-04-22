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
    static readonly bytecode = "0x608060405234801561001057600080fd5b506040516100e83803806100e883398101604081905261002f9161003e565b61003881600055565b50610057565b60006020828403121561005057600080fd5b5051919050565b6083806100656000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806350d25bcd146037578063e5c19b2d14604c575b600080fd5b60005460405190815260200160405180910390f35b605c6057366004605e565b600055565b005b600060208284031215606f57600080fd5b503591905056fea164736f6c6343000811000a";
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