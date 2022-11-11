import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type { SimpleCheckpointManager, SimpleCheckpointManagerInterface } from "../../../../../contracts/@maticnetwork/pos-portal/SimpleCheckpointManager.sol/SimpleCheckpointManager";
declare type SimpleCheckpointManagerConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class SimpleCheckpointManager__factory extends ContractFactory {
    constructor(...args: SimpleCheckpointManagerConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<SimpleCheckpointManager>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): SimpleCheckpointManager;
    connect(signer: Signer): SimpleCheckpointManager__factory;
    static readonly bytecode = "0x6080604052600060015534801561001557600080fd5b50610233806100256000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806341539d4a146100465780634d5505d314610097578063afa764d7146100b1575b600080fd5b6100636004803603602081101561005c57600080fd5b50356100dc565b6040805195865260208601949094528484019290925260608401526001600160a01b03166080830152519081900360a00190f35b61009f610114565b60408051918252519081900360200190f35b6100da600480360360608110156100c757600080fd5b508035906020810135906040013561011a565b005b60006020819052908152604090208054600182015460028301546003840154600490940154929391929091906001600160a01b031685565b60015481565b6101226101eb565b506040805160a0810182528481526020808201858152828401858152426060808601918252336080870181815260018054810180825560009081528089528a81208a518155975188830155955160028801559351600387015551600490950180546001600160a01b0319166001600160a01b0390961695909517909455905486518981529485018890528487018a905295519495919491937fba5de06d22af2685c6c7765f60067f7d2b08c2d29f53cdf14d67f6d1c9bfb527929081900390910190a450505050565b6040518060a001604052806000801916815260200160008152602001600081526020016000815260200160006001600160a01b03168152509056fea164736f6c6343000606000a";
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
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
        anonymous?: undefined;
    })[];
    static createInterface(): SimpleCheckpointManagerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): SimpleCheckpointManager;
}
export {};
//# sourceMappingURL=SimpleCheckpointManager__factory.d.ts.map