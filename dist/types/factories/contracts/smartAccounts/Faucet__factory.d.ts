import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, BigNumberish, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { Faucet, FaucetInterface } from "../../../contracts/smartAccounts/Faucet";
declare type FaucetConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Faucet__factory extends ContractFactory {
    constructor(...args: FaucetConstructorParams);
    getDeployTransaction(_workerFundingAmount: BigNumberish, _workerBalanceThreshold: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(_workerFundingAmount: BigNumberish, _workerBalanceThreshold: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Faucet & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Faucet__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b506040516104b93803806104b983398101604081905261002e9161003b565b6001919091555f5561005d565b5f806040838503121561004c575f80fd5b505080516020909101519092909150565b61044f8061006a5f395ff3fe608060405260043610610078575f3560e01c8063919f4ca31161004a578063919f4ca3146100fb5780639e6c399214610139578063c2352bbb1461014d578063eee517061461016c57005b80631ebf770c1461008157806386cb61c2146100a05780638b6d5fb7146100b45780638f5bdbb9146100d357005b3661007f57005b005b34801561008c575f80fd5b5061007f61009b36600461037b565b61018b565b3480156100ab575f80fd5b5061007f6101b0565b3480156100bf575f80fd5b5061007f6100ce366004610392565b610249565b3480156100de575f80fd5b506100e860015481565b6040519081526020015b60405180910390f35b348015610106575f80fd5b50610129610115366004610401565b60026020525f908152604090205460ff1681565b60405190151581526020016100f2565b348015610144575f80fd5b506100e85f5481565b348015610158575f80fd5b5061007f61016736600461037b565b6102d2565b348015610177575f80fd5b5061007f610186366004610392565b6102f6565b3330146101ab576040516314e1dbf760e11b815260040160405180910390fd5b600155565b335f9081526002602052604090205460ff166101df5760405163738e2b6d60e11b815260040160405180910390fd5b6001546040515f9133918381818185875af1925050503d805f811461021f576040519150601f19603f3d011682016040523d82523d5f602084013e610224565b606091505b5050905080610246576040516312171d8360e31b815260040160405180910390fd5b50565b333014610269576040516314e1dbf760e11b815260040160405180910390fd5b5f5b818110156102cd575f60025f8585858181106102895761028961042e565b905060200201602081019061029e9190610401565b6001600160a01b0316815260208101919091526040015f20805460ff191691151591909117905560010161026b565b505050565b3330146102f2576040516314e1dbf760e11b815260040160405180910390fd5b5f55565b333014610316576040516314e1dbf760e11b815260040160405180910390fd5b5f5b818110156102cd57600160025f8585858181106103375761033761042e565b905060200201602081019061034c9190610401565b6001600160a01b0316815260208101919091526040015f20805460ff1916911515919091179055600101610318565b5f6020828403121561038b575f80fd5b5035919050565b5f80602083850312156103a3575f80fd5b823567ffffffffffffffff808211156103ba575f80fd5b818501915085601f8301126103cd575f80fd5b8135818111156103db575f80fd5b8660208260051b85010111156103ef575f80fd5b60209290920196919550909350505050565b5f60208284031215610411575f80fd5b81356001600160a01b0381168114610427575f80fd5b9392505050565b634e487b7160e01b5f52603260045260245ffdfea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_workerFundingAmount";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "_workerBalanceThreshold";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
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
        readonly inputs: readonly [];
        readonly name: "fundWorker";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
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