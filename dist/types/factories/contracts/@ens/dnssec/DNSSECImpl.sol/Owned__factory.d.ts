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
    static readonly bytecode = "0x608060405234801561000f575f80fd5b505f80546001600160a01b0319163317905560df8061002d5f395ff3fe6080604052348015600e575f80fd5b50600436106030575f3560e01c806313af40351460345780638da5cb5b146045575b5f80fd5b6043603f36600460a7565b6072565b005b5f546056906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b5f546001600160a01b031633146086575f80fd5b5f80546001600160a01b0319166001600160a01b0392909216919091179055565b5f6020828403121560b6575f80fd5b81356001600160a01b038116811460cb575f80fd5b939250505056fea164736f6c6343000818000a";
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