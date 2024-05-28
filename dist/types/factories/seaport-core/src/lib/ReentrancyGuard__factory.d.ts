import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { ReentrancyGuard, ReentrancyGuardInterface } from "../../../../seaport-core/src/lib/ReentrancyGuard";
declare type ReentrancyGuardConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ReentrancyGuard__factory extends ContractFactory {
    constructor(...args: ReentrancyGuardConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ReentrancyGuard & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ReentrancyGuard__factory;
    static readonly bytecode = "0x60c060405234801561000f575f80fd5b505f610019610076565b90506001600160a01b03811661004257604051632aea588760e01b815260040160405180910390fd5b5f61004c8261008f565b8015156080526001600160a01b03831660a05290508061006f57600163929eee14555b505061010c565b5f696002601e613d5c3d52f35f52600a60165ff0905090565b5f816001600160a01b0316600a5a6100a791906100ed565b6040515f8181818686fa925050503d805f81146100df576040519150601f19603f3d011682016040523d82523d5f602084013e6100e4565b606091505b50909392505050565b5f8261010757634e487b7160e01b5f52601260045260245ffd5b500490565b60805160a05161016261012b5f395f608d01525f604201526101625ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c80637423eb3c1461002d575b5f80fd5b610035610037565b005b63929eee14546001147f00000000000000000000000000000000000000000000000000000000000000008061006a575080155b1561008857604051630f45b98b60e41b815260040160405180910390fd5b6100b17f00000000000000000000000000000000000000000000000000000000000000006100d8565b6100ce576040516370a4078f60e01b815260040160405180910390fd5b5f63929eee145550565b5f816001600160a01b0316600a5a6100f09190610136565b6040515f8181818686fa925050503d805f8114610128576040519150601f19603f3d011682016040523d82523d5f602084013e61012d565b606091505b50909392505050565b5f8261015057634e487b7160e01b5f52601260045260245ffd5b50049056fea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "NoReentrantCalls";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "TStoreAlreadyActivated";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "TStoreNotSupported";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "TloadTestContractDeploymentFailed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "__activateTstore";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ReentrancyGuardInterface;
    static connect(address: string, runner?: ContractRunner | null): ReentrancyGuard;
}
export {};
//# sourceMappingURL=ReentrancyGuard__factory.d.ts.map