import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { ERC2771ContextMock, ERC2771ContextMockInterface } from "../../../contracts/mocks/ERC2771ContextMock";
declare type ERC2771ContextMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC2771ContextMock__factory extends ContractFactory {
    constructor(...args: ERC2771ContextMockConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ERC2771ContextMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ERC2771ContextMock__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b5061051b8061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610060575f3560e01c8063572b6c0514610064578063c04062261461008c578063c4c2bfdc146100cb578063c4d66de8146100e1578063d737d0c7146100f6578063f4b06cd814610116575b5f80fd5b6100776100723660046103d0565b61012c565b60405190151581526020015b60405180910390f35b604080518082018252601781527f45524332373731436f6e746578744d6f636b3a2072756e0000000000000000006020820152905161008391906103fd565b6100d361015f565b604051610083929190610449565b6100f46100ef3660046103d0565b610171565b005b6100fe610283565b6040516001600160a01b039091168152602001610083565b61011e610291565b604051908152602001610083565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b365f61016961029a565b915091509091565b5f54610100900460ff161580801561018f57505f54600160ff909116105b806101a85750303b1580156101a857505f5460ff166001145b6102105760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b5f805460ff191660011790558015610231575f805461ff0019166101001790555b61023a826102cc565b801561027f575f805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5050565b5f61028c610306565b905090565b5f61028c61032a565b365f6102a53361012c565b156102c5575f80366102b8603482610477565b926101699392919061049c565b5f36610169565b5f54610100900460ff166102f25760405162461bcd60e51b8152600401610207906104c3565b6102fa610343565b6103038161036b565b50565b5f6103103361012c565b15610322575060331936013560601c90565b503390565b90565b5f6103343361012c565b156103275750601f1936013590565b5f54610100900460ff166103695760405162461bcd60e51b8152600401610207906104c3565b565b5f54610100900460ff166103915760405162461bcd60e51b8152600401610207906104c3565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b038316179055610303565b5f602082840312156103e0575f80fd5b81356001600160a01b03811681146103f6575f80fd5b9392505050565b5f602080835283518060208501525f5b818110156104295785810183015185820160400152820161040d565b505f604082860101526040601f19601f8301168501019250505092915050565b60208152816020820152818360408301375f818301604090810191909152601f909201601f19160101919050565b8181038181111561049657634e487b7160e01b5f52601160045260245ffd5b92915050565b5f80858511156104aa575f80fd5b838611156104b6575f80fd5b5050820193919092039150565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b60608201526080019056fea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint8";
            readonly name: "version";
            readonly type: "uint8";
        }];
        readonly name: "Initialized";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "forwarder";
            readonly type: "address";
        }];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "forwarder";
            readonly type: "address";
        }];
        readonly name: "isTrustedForwarder";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "msgData";
        readonly outputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "msgSender";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "msgToken";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "run";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }];
    static createInterface(): ERC2771ContextMockInterface;
    static connect(address: string, runner?: ContractRunner | null): ERC2771ContextMock;
}
export {};
//# sourceMappingURL=ERC2771ContextMock__factory.d.ts.map