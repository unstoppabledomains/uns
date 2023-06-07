import { Signer, ContractFactory, BigNumberish, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type { DummyOracle, DummyOracleInterface } from "../../../../../@ensdomains/ens-contracts/contracts/ethregistrar/DummyOracle";
declare type DummyOracleConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class DummyOracle__factory extends ContractFactory {
    constructor(...args: DummyOracleConstructorParams);
    deploy(_value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<DummyOracle>;
    getDeployTransaction(_value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): DummyOracle;
    connect(signer: Signer): DummyOracle__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b506040516100e83803806100e883398101604081905261002f9161003e565b61003881600055565b50610057565b60006020828403121561005057600080fd5b5051919050565b6083806100656000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806350d25bcd146037578063e5c19b2d14604c575b600080fd5b60005460405190815260200160405180910390f35b605c6057366004605e565b600055565b005b600060208284031215606f57600080fd5b503591905056fea164736f6c6343000811000a";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): DummyOracleInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): DummyOracle;
}
export {};
//# sourceMappingURL=DummyOracle__factory.d.ts.map