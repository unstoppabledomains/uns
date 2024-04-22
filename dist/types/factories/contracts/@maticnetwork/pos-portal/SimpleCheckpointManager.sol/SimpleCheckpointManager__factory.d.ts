import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { SimpleCheckpointManager, SimpleCheckpointManagerInterface } from "../../../../../contracts/@maticnetwork/pos-portal/SimpleCheckpointManager.sol/SimpleCheckpointManager";
declare type SimpleCheckpointManagerConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class SimpleCheckpointManager__factory extends ContractFactory {
    constructor(...args: SimpleCheckpointManagerConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<SimpleCheckpointManager & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): SimpleCheckpointManager__factory;
    static readonly bytecode = "0x6080604052600060015534801561001557600080fd5b50610233806100256000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806341539d4a146100465780634d5505d314610097578063afa764d7146100b1575b600080fd5b6100636004803603602081101561005c57600080fd5b50356100dc565b6040805195865260208601949094528484019290925260608401526001600160a01b03166080830152519081900360a00190f35b61009f610114565b60408051918252519081900360200190f35b6100da600480360360608110156100c757600080fd5b508035906020810135906040013561011a565b005b60006020819052908152604090208054600182015460028301546003840154600490940154929391929091906001600160a01b031685565b60015481565b6101226101eb565b506040805160a0810182528481526020808201858152828401858152426060808601918252336080870181815260018054810180825560009081528089528a81208a518155975188830155955160028801559351600387015551600490950180546001600160a01b0319166001600160a01b0390961695909517909455905486518981529485018890528487018a905295519495919491937fba5de06d22af2685c6c7765f60067f7d2b08c2d29f53cdf14d67f6d1c9bfb527929081900390910190a450505050565b6040518060a001604052806000801916815260200160008152602001600081526020016000815260200160006001600160a01b03168152509056fea164736f6c6343000606000a";
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
    }, {
        readonly inputs: readonly [];
        readonly name: "currentCheckpointNumber";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "headerBlocks";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "root";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "start";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "end";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "createdAt";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "proposer";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "rootHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "start";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "end";
            readonly type: "uint256";
        }];
        readonly name: "setCheckpoint";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): SimpleCheckpointManagerInterface;
    static connect(address: string, runner?: ContractRunner | null): SimpleCheckpointManager;
}
export {};
//# sourceMappingURL=SimpleCheckpointManager__factory.d.ts.map