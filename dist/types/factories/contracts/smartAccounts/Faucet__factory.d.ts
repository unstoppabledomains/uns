import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { Faucet, FaucetInterface } from "../../../contracts/smartAccounts/Faucet";
declare type FaucetConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Faucet__factory extends ContractFactory {
    constructor(...args: FaucetConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Faucet & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Faucet__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b506105428061001d5f395ff3fe608060405260043610610083575f3560e01c80639e6c3992116100555780639e6c399214610130578063af9b818714610144578063c2352bbb14610158578063eee5170614610177578063ffa1ad741461019657005b80631ebf770c1461008c5780638b6d5fb7146100ab5780638f5bdbb9146100ca578063919f4ca3146100f257005b3661008a57005b005b348015610097575f80fd5b5061008a6100a6366004610422565b6101d3565b3480156100b6575f80fd5b5061008a6100c5366004610439565b6101f8565b3480156100d5575f80fd5b506100df60015481565b6040519081526020015b60405180910390f35b3480156100fd575f80fd5b5061012061010c3660046104a8565b60026020525f908152604090205460ff1681565b60405190151581526020016100e9565b34801561013b575f80fd5b506100df5f5481565b34801561014f575f80fd5b5061008a610281565b348015610163575f80fd5b5061008a610172366004610422565b61031a565b348015610182575f80fd5b5061008a610191366004610439565b61033e565b3480156101a1575f80fd5b506101c6604051806040016040528060058152602001640312e312e360dc1b81525081565b6040516100e991906104d5565b3330146101f3576040516314e1dbf760e11b815260040160405180910390fd5b600155565b333014610218576040516314e1dbf760e11b815260040160405180910390fd5b5f5b8181101561027c575f60025f85858581811061023857610238610521565b905060200201602081019061024d91906104a8565b6001600160a01b0316815260208101919091526040015f20805460ff191691151591909117905560010161021a565b505050565b335f9081526002602052604090205460ff166102b05760405163738e2b6d60e11b815260040160405180910390fd5b6001546040515f9133918381818185875af1925050503d805f81146102f0576040519150601f19603f3d011682016040523d82523d5f602084013e6102f5565b606091505b5050905080610317576040516312171d8360e31b815260040160405180910390fd5b50565b33301461033a576040516314e1dbf760e11b815260040160405180910390fd5b5f55565b33301461035e576040516314e1dbf760e11b815260040160405180910390fd5b5f5b8181101561027c57600160025f85858581811061037f5761037f610521565b905060200201602081019061039491906104a8565b6001600160a01b0316815260208101919091526040015f20805460ff19169115159190911790558282828181106103cd576103cd610521565b90506020020160208101906103e291906104a8565b6001600160a01b03166108fc60015490811502906040515f60405180830381858888f19350505050158015610419573d5f803e3d5ffd5b50600101610360565b5f60208284031215610432575f80fd5b5035919050565b5f806020838503121561044a575f80fd5b823567ffffffffffffffff80821115610461575f80fd5b818501915085601f830112610474575f80fd5b813581811115610482575f80fd5b8660208260051b8501011115610496575f80fd5b60209290920196919550909350505050565b5f602082840312156104b8575f80fd5b81356001600160a01b03811681146104ce575f80fd5b9392505050565b5f602080835283518060208501525f5b81811015610501578581018301518582016040015282016104e5565b505f604082860101526040601f19601f8301168501019250505092915050565b634e487b7160e01b5f52603260045260245ffdfea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "NotAuthorizedWorker";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotSelf";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "TransferFailed";
        readonly type: "error";
    }, {
        readonly stateMutability: "payable";
        readonly type: "fallback";
    }, {
        readonly inputs: readonly [];
        readonly name: "VERSION";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
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
        readonly name: "requestFunding";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "threshold";
            readonly type: "uint256";
        }];
        readonly name: "setWorkerBalanceThreshold";
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
        readonly inputs: readonly [];
        readonly name: "workerBalanceThreshold";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
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