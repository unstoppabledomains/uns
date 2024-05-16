import { type ContractRunner } from "ethers";
import type { IRootChain, IRootChainInterface } from "../../../../../contracts/@maticnetwork/pos-portal/SimpleCheckpointManager.sol/IRootChain";
export declare class IRootChain__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "proposer";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "headerBlockId";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "reward";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "start";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "end";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "root";
            readonly type: "bytes32";
        }];
        readonly name: "NewHeaderBlock";
        readonly type: "event";
    }];
    static createInterface(): IRootChainInterface;
    static connect(address: string, runner?: ContractRunner | null): IRootChain;
}
//# sourceMappingURL=IRootChain__factory.d.ts.map