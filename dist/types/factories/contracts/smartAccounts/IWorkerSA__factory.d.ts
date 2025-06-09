import { type ContractRunner } from "ethers";
import type { IWorkerSA, IWorkerSAInterface } from "../../../contracts/smartAccounts/IWorkerSA";
export declare class IWorkerSA__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "ExecuteFailed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotSelf";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "callIndex";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes";
            readonly name: "returnData";
            readonly type: "bytes";
        }];
        readonly name: "InternalCallFailed";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "data";
                readonly type: "bytes";
            }, {
                readonly internalType: "uint256";
                readonly name: "value";
                readonly type: "uint256";
            }];
            readonly internalType: "struct ISmartAccount.Call[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "bool";
            readonly name: "revertOnError";
            readonly type: "bool";
        }];
        readonly name: "executeBatch";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "data";
                readonly type: "bytes";
            }, {
                readonly internalType: "uint256";
                readonly name: "value";
                readonly type: "uint256";
            }];
            readonly internalType: "struct ISmartAccount.Call[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "bool";
            readonly name: "revertOnError";
            readonly type: "bool";
        }];
        readonly name: "executeBatchAndEnsureBalance";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }];
    static createInterface(): IWorkerSAInterface;
    static connect(address: string, runner?: ContractRunner | null): IWorkerSA;
}
//# sourceMappingURL=IWorkerSA__factory.d.ts.map