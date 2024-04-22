import { type ContractRunner } from "ethers";
import type { IStateSender, IStateSenderInterface } from "../../../../../contracts/@maticnetwork/pos-portal/RootChainManager.sol/IStateSender";
export declare class IStateSender__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "receiver";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "syncState";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IStateSenderInterface;
    static connect(address: string, runner?: ContractRunner | null): IStateSender;
}
//# sourceMappingURL=IStateSender__factory.d.ts.map