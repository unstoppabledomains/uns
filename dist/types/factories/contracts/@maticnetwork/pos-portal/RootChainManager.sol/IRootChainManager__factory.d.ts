import { type ContractRunner } from "ethers";
import type { IRootChainManager, IRootChainManagerInterface } from "../../../../../contracts/@maticnetwork/pos-portal/RootChainManager.sol/IRootChainManager";
export declare class IRootChainManager__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "tokenType";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "predicateAddress";
            readonly type: "address";
        }];
        readonly name: "PredicateRegistered";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "rootToken";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "childToken";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "tokenType";
            readonly type: "bytes32";
        }];
        readonly name: "TokenMapped";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "rootToken";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "childToken";
            readonly type: "address";
        }];
        readonly name: "cleanMapToken";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "user";
            readonly type: "address";
        }];
        readonly name: "depositEtherFor";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "user";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "rootToken";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "depositData";
            readonly type: "bytes";
        }];
        readonly name: "depositFor";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "inputData";
            readonly type: "bytes";
        }];
        readonly name: "exit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "rootToken";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "childToken";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "tokenType";
            readonly type: "bytes32";
        }];
        readonly name: "mapToken";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "tokenType";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "predicateAddress";
            readonly type: "address";
        }];
        readonly name: "registerPredicate";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "rootToken";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "childToken";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "tokenType";
            readonly type: "bytes32";
        }];
        readonly name: "remapToken";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IRootChainManagerInterface;
    static connect(address: string, runner?: ContractRunner | null): IRootChainManager;
}
//# sourceMappingURL=IRootChainManager__factory.d.ts.map