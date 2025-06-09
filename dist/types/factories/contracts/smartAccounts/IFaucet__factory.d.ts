import { type ContractRunner } from "ethers";
import type { IFaucet, IFaucetInterface } from "../../../contracts/smartAccounts/IFaucet";
export declare class IFaucet__factory {
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
    }];
    static createInterface(): IFaucetInterface;
    static connect(address: string, runner?: ContractRunner | null): IFaucet;
}
//# sourceMappingURL=IFaucet__factory.d.ts.map