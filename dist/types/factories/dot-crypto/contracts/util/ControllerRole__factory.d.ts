import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { ControllerRole, ControllerRoleInterface } from "../../../../dot-crypto/contracts/util/ControllerRole";
declare type ControllerRoleConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ControllerRole__factory extends ContractFactory {
    constructor(...args: ControllerRoleConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ControllerRole & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ControllerRole__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610023336001600160e01b0361002816565b610168565b61004081600061004360201b6101e11790919060201c565b50565b61005682826001600160e01b036100e716565b156100c257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b60006001600160a01b038216610148576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806104516022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b6102da806101776000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806366ac3b6814610046578063a7fc7a0714610050578063b429afeb14610076575b600080fd5b61004e6100b0565b005b61004e6004803603602081101561006657600080fd5b50356001600160a01b03166100bb565b61009c6004803603602081101561008c57600080fd5b50356001600160a01b03166100d9565b604080519115158252519081900360200190f35b6100b9336100f1565b565b6100c4336100d9565b6100cd57600080fd5b6100d681610102565b50565b60006100eb818363ffffffff61011316565b92915050565b6100d660008263ffffffff61017a16565b6100d660008263ffffffff6101e116565b60006001600160a01b03821661015a5760405162461bcd60e51b81526004018080602001828103825260228152602001806102846022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b6101848282610113565b6101bf5760405162461bcd60e51b81526004018080602001828103825260218152602001806102636021913960400191505060405180910390fd5b6001600160a01b0316600090815260209190915260409020805460ff19169055565b6101eb8282610113565b1561023d576040805162461bcd60e51b815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff1916600117905556fe526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c65526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373a265627a7a723158203f5cad0be955d3ba0bdc521b5cecdcc2ff4d35429e8c84794fb194ccfc853b6664736f6c634300050c0032526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "addController";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "isController";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [];
        readonly name: "renounceController";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ControllerRoleInterface;
    static connect(address: string, runner?: ContractRunner | null): ControllerRole;
}
export {};
//# sourceMappingURL=ControllerRole__factory.d.ts.map