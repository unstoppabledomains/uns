import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { Owned, OwnedInterface } from "../../../../../contracts/@ens/dnssec/DNSSECImpl.sol/Owned";
declare type OwnedConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Owned__factory extends ContractFactory {
    constructor(...args: OwnedConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Owned & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Owned__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50600080546001600160a01b0319163317905560e9806100316000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806313af40351460375780638da5cb5b146048575b600080fd5b6046604236600460ae565b6076565b005b600054605a906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b6000546001600160a01b03163314608c57600080fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055565b60006020828403121560bf57600080fd5b81356001600160a01b038116811460d557600080fd5b939250505056fea164736f6c6343000811000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "owner";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "setOwner";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): OwnedInterface;
    static connect(address: string, runner?: ContractRunner | null): Owned;
}
export {};
//# sourceMappingURL=Owned__factory.d.ts.map