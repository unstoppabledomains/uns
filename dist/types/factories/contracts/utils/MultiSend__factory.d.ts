import { Signer, ContractFactory, PayableOverrides, BigNumberish } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { MultiSend, MultiSendInterface } from "../../../contracts/utils/MultiSend";
declare type MultiSendConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class MultiSend__factory extends ContractFactory {
    constructor(...args: MultiSendConstructorParams);
    deploy(accounts: PromiseOrValue<string>[], values: PromiseOrValue<BigNumberish>[], overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<MultiSend>;
    getDeployTransaction(accounts: PromiseOrValue<string>[], values: PromiseOrValue<BigNumberish>[], overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): MultiSend;
    connect(signer: Signer): MultiSend__factory;
    static readonly bytecode = "0x608060405260405161029338038061029383398101604081905261002291610184565b60005b82518110156100ac5782818151811061004057610040610255565b60200260200101516001600160a01b03166108fc83838151811061006657610066610255565b60200260200101519081150290604051600060405180830381858888f19350505050158015610099573d6000803e3d6000fd5b50806100a48161026b565b915050610025565b5033ff5b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b03811182821017156100ee576100ee6100b0565b604052919050565b60006001600160401b0382111561010f5761010f6100b0565b5060051b60200190565b600082601f83011261012a57600080fd5b8151602061013f61013a836100f6565b6100c6565b82815260059290921b8401810191818101908684111561015e57600080fd5b8286015b848110156101795780518352918301918301610162565b509695505050505050565b6000806040838503121561019757600080fd5b82516001600160401b03808211156101ae57600080fd5b818501915085601f8301126101c257600080fd5b815160206101d261013a836100f6565b82815260059290921b840181019181810190898411156101f157600080fd5b948201945b838610156102255785516001600160a01b03811681146102165760008081fd5b825294820194908201906101f6565b9188015191965090935050508082111561023e57600080fd5b5061024b85828601610119565b9150509250929050565b634e487b7160e01b600052603260045260246000fd5b60006001820161028b57634e487b7160e01b600052601160045260246000fd5b506001019056fe";
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): MultiSendInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MultiSend;
}
export {};
//# sourceMappingURL=MultiSend__factory.d.ts.map