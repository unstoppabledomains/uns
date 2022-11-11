import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type { ICheckpointManager, ICheckpointManagerInterface } from "../../../../../contracts/@maticnetwork/pos-portal/RootChainManager.sol/ICheckpointManager";
declare type ICheckpointManagerConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ICheckpointManager__factory extends ContractFactory {
    constructor(...args: ICheckpointManagerConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ICheckpointManager>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): ICheckpointManager;
    connect(signer: Signer): ICheckpointManager__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5060c08061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806341539d4a14602d575b600080fd5b604760048036036020811015604157600080fd5b5035607b565b6040805195865260208601949094528484019290925260608401526001600160a01b03166080830152519081900360a00190f35b60006020819052908152604090208054600182015460028301546003840154600490940154929391929091906001600160a01b03168556fea164736f6c6343000606000a";
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): ICheckpointManagerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ICheckpointManager;
}
export {};
//# sourceMappingURL=ICheckpointManager__factory.d.ts.map