import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, BigNumberish, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { Faucet, FaucetInterface } from "../../../contracts/smartAccounts/Faucet";
declare type FaucetConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Faucet__factory extends ContractFactory {
    constructor(...args: FaucetConstructorParams);
    getDeployTransaction(_workerFundingAmount: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(_workerFundingAmount: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Faucet & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Faucet__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b5060405161076238038061076283398101604081905261002e9161008e565b6100373361003f565b6001556100a5565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b5f6020828403121561009e575f80fd5b5051919050565b6106b0806100b25f395ff3fe60806040526004361061009d575f3560e01c80638b6d5fb7116100625780638b6d5fb7146101245780638da5cb5b146101435780638f5bdbb91461016e578063919f4ca314610191578063eee51706146101cf578063f2fde38b146101ee575f80fd5b80631ebf770c146100a85780632e1a7d4d146100c9578063715018a6146100e8578063853828b6146100fc57806386cb61c214610110575f80fd5b366100a457005b5f80fd5b3480156100b3575f80fd5b506100c76100c23660046105dc565b61020d565b005b3480156100d4575f80fd5b506100c76100e33660046105dc565b61021a565b3480156100f3575f80fd5b506100c76102a5565b348015610107575f80fd5b506100c76102b8565b34801561011b575f80fd5b506100c76102ec565b34801561012f575f80fd5b506100c761013e3660046105f3565b6103e0565b34801561014e575f80fd5b505f546040516001600160a01b0390911681526020015b60405180910390f35b348015610179575f80fd5b5061018360015481565b604051908152602001610165565b34801561019c575f80fd5b506101bf6101ab366004610662565b60026020525f908152604090205460ff1681565b6040519015158152602001610165565b3480156101da575f80fd5b506100c76101e93660046105f3565b610451565b3480156101f9575f80fd5b506100c7610208366004610662565b6104be565b610215610534565b600155565b610222610534565b478111156102775760405162461bcd60e51b815260206004820152601c60248201527f4661756365743a20496e73756666696369656e742062616c616e63650000000060448201526064015b60405180910390fd5b604051339082156108fc029083905f818181858888f193505050501580156102a1573d5f803e3d5ffd5b5050565b6102ad610534565b6102b65f61058d565b565b6102c0610534565b60405133904780156108fc02915f818181858888f193505050501580156102e9573d5f803e3d5ffd5b50565b335f9081526002602052604090205460ff1661034a5760405162461bcd60e51b815260206004820181905260248201527f4661756365743a204e6f7420616e20617574686f72697a656420776f726b6572604482015260640161026e565b6001546040515f9133918381818185875af1925050503d805f811461038a576040519150601f19603f3d011682016040523d82523d5f602084013e61038f565b606091505b50509050806102e95760405162461bcd60e51b815260206004820152601760248201527f4661756365743a205472616e73666572206661696c6564000000000000000000604482015260640161026e565b6103e8610534565b5f5b8181101561044c575f60025f8585858181106104085761040861068f565b905060200201602081019061041d9190610662565b6001600160a01b0316815260208101919091526040015f20805460ff19169115159190911790556001016103ea565b505050565b610459610534565b5f5b8181101561044c57600160025f85858581811061047a5761047a61068f565b905060200201602081019061048f9190610662565b6001600160a01b0316815260208101919091526040015f20805460ff191691151591909117905560010161045b565b6104c6610534565b6001600160a01b03811661052b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161026e565b6102e98161058d565b5f546001600160a01b031633146102b65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161026e565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b5f602082840312156105ec575f80fd5b5035919050565b5f8060208385031215610604575f80fd5b823567ffffffffffffffff8082111561061b575f80fd5b818501915085601f83011261062e575f80fd5b81358181111561063c575f80fd5b8660208260051b8501011115610650575f80fd5b60209290920196919550909350505050565b5f60208284031215610672575f80fd5b81356001600160a01b0381168114610688575f80fd5b9392505050565b634e487b7160e01b5f52603260045260245ffdfea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_workerFundingAmount";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "previousOwner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "OwnershipTransferred";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "workers";
            readonly type: "address[]";
        }];
        readonly name: "addAuthorizedWorkers";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "authorizedWorkers";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "fundWorker";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
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
            readonly internalType: "address[]";
            readonly name: "workers";
            readonly type: "address[]";
        }];
        readonly name: "removeAuthorizedWorkers";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "renounceOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "setWorkerFundingAmount";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "transferOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "withdraw";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "withdrawAll";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "workerFundingAmount";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly stateMutability: "payable";
        readonly type: "receive";
    }];
    static createInterface(): FaucetInterface;
    static connect(address: string, runner?: ContractRunner | null): Faucet;
}
export {};
//# sourceMappingURL=Faucet__factory.d.ts.map