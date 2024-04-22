import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { ICheckpointManager, ICheckpointManagerInterface } from "../../../../../contracts/@maticnetwork/pos-portal/RootChainManager.sol/ICheckpointManager";
declare type ICheckpointManagerConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ICheckpointManager__factory extends ContractFactory {
    constructor(...args: ICheckpointManagerConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ICheckpointManager & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ICheckpointManager__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5060c08061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806341539d4a14602d575b600080fd5b604760048036036020811015604157600080fd5b5035607b565b6040805195865260208601949094528484019290925260608401526001600160a01b03166080830152519081900360a00190f35b60006020819052908152604090208054600182015460028301546003840154600490940154929391929091906001600160a01b03168556fea164736f6c6343000606000a";
    static readonly abi: readonly [{
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
    }];
    static createInterface(): ICheckpointManagerInterface;
    static connect(address: string, runner?: ContractRunner | null): ICheckpointManager;
}
export {};
//# sourceMappingURL=ICheckpointManager__factory.d.ts.map