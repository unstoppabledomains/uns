import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type { Controllable, ControllableInterface } from "../../../../../@ensdomains/ens-contracts/contracts/wrapper/Controllable";
declare type ControllableConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Controllable__factory extends ContractFactory {
    constructor(...args: ControllableConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<Controllable>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): Controllable;
    connect(signer: Signer): Controllable__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061001a3361001f565b61006f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6103098061007e6000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c8063715018a61461005c5780638da5cb5b14610066578063da8c229e14610086578063e0dba60f146100b9578063f2fde38b146100cc575b600080fd5b6100646100df565b005b6000546040516001600160a01b0390911681526020015b60405180910390f35b6100a961009436600461029e565b60016020526000908152604090205460ff1681565b604051901515815260200161007d565b6100646100c73660046102c0565b6100f3565b6100646100da36600461029e565b61015a565b6100e76101d8565b6100f16000610232565b565b6100fb6101d8565b6001600160a01b038216600081815260016020908152604091829020805460ff191685151590811790915591519182527f4c97694570a07277810af7e5669ffd5f6a2d6b74b6e9a274b8b870fd5114cf87910160405180910390a25050565b6101626101d8565b6001600160a01b0381166101cc5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b6101d581610232565b50565b6000546001600160a01b031633146100f15760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101c3565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80356001600160a01b038116811461029957600080fd5b919050565b6000602082840312156102b057600080fd5b6102b982610282565b9392505050565b600080604083850312156102d357600080fd5b6102dc83610282565b9150602083013580151581146102f157600080fd5b80915050925092905056fea164736f6c6343000811000a";
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
    static createInterface(): ControllableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Controllable;
}
export {};
//# sourceMappingURL=Controllable__factory.d.ts.map