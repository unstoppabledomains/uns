import { type ContractRunner } from "ethers";
import type { IWorkerSmartAccount, IWorkerSmartAccountInterface } from "../../../contracts/smartAccounts/IWorkerSmartAccount";
export declare class IWorkerSmartAccount__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "targets";
            readonly type: "address[]";
        }, {
            readonly internalType: "bytes[]";
            readonly name: "datas";
            readonly type: "bytes[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "values";
            readonly type: "uint256[]";
        }];
        readonly name: "executeBatch";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "targets";
            readonly type: "address[]";
        }, {
            readonly internalType: "bytes[]";
            readonly name: "datas";
            readonly type: "bytes[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "values";
            readonly type: "uint256[]";
        }];
        readonly name: "executeBatchAndEnsureBalance";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }];
    static createInterface(): IWorkerSmartAccountInterface;
    static connect(address: string, runner?: ContractRunner | null): IWorkerSmartAccount;
}
//# sourceMappingURL=IWorkerSmartAccount__factory.d.ts.map