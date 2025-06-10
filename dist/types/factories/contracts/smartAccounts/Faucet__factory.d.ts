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
    static readonly bytecode = "0x608060405234801561000f575f80fd5b5061044f8061001d5f395ff3fe608060405260043610610078575f3560e01c80639e6c39921161004a5780639e6c399214610125578063af9b818714610139578063c2352bbb1461014d578063eee517061461016c57005b80631ebf770c146100815780638b6d5fb7146100a05780638f5bdbb9146100bf578063919f4ca3146100e757005b3661007f57005b005b34801561008c575f80fd5b5061007f61009b36600461037b565b61018b565b3480156100ab575f80fd5b5061007f6100ba366004610392565b6101b0565b3480156100ca575f80fd5b506100d460015481565b6040519081526020015b60405180910390f35b3480156100f2575f80fd5b50610115610101366004610401565b60026020525f908152604090205460ff1681565b60405190151581526020016100de565b348015610130575f80fd5b506100d45f5481565b348015610144575f80fd5b5061007f610239565b348015610158575f80fd5b5061007f61016736600461037b565b6102d2565b348015610177575f80fd5b5061007f610186366004610392565b6102f6565b3330146101ab576040516314e1dbf760e11b815260040160405180910390fd5b600155565b3330146101d0576040516314e1dbf760e11b815260040160405180910390fd5b5f5b81811015610234575f60025f8585858181106101f0576101f061042e565b90506020020160208101906102059190610401565b6001600160a01b0316815260208101919091526040015f20805460ff19169115159190911790556001016101d2565b505050565b335f9081526002602052604090205460ff166102685760405163738e2b6d60e11b815260040160405180910390fd5b6001546040515f9133918381818185875af1925050503d805f81146102a8576040519150601f19603f3d011682016040523d82523d5f602084013e6102ad565b606091505b50509050806102cf576040516312171d8360e31b815260040160405180910390fd5b50565b3330146102f2576040516314e1dbf760e11b815260040160405180910390fd5b5f55565b333014610316576040516314e1dbf760e11b815260040160405180910390fd5b5f5b8181101561023457600160025f8585858181106103375761033761042e565b905060200201602081019061034c9190610401565b6001600160a01b0316815260208101919091526040015f20805460ff1916911515919091179055600101610318565b5f6020828403121561038b575f80fd5b5035919050565b5f80602083850312156103a3575f80fd5b823567ffffffffffffffff808211156103ba575f80fd5b818501915085601f8301126103cd575f80fd5b8135818111156103db575f80fd5b8660208260051b85010111156103ef575f80fd5b60209290920196919550909350505050565b5f60208284031215610411575f80fd5b81356001600160a01b0381168114610427575f80fd5b9392505050565b634e487b7160e01b5f52603260045260245ffdfea164736f6c6343000818000a";
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