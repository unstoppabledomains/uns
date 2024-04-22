import { type ContractRunner } from "ethers";
import type { IChildToken, IChildTokenInterface } from "../../../contracts/@maticnetwork/IChildToken";
export declare class IChildToken__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "user";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "depositData";
            readonly type: "bytes";
        }];
        readonly name: "deposit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IChildTokenInterface;
    static connect(address: string, runner?: ContractRunner | null): IChildToken;
}
//# sourceMappingURL=IChildToken__factory.d.ts.map