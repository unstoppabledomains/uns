import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type { DummyStateSender, DummyStateSenderInterface } from "../../../../../contracts/@maticnetwork/pos-portal/DummyStateSender.sol/DummyStateSender";
declare type DummyStateSenderConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class DummyStateSender__factory extends ContractFactory {
    constructor(...args: DummyStateSenderConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<DummyStateSender>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): DummyStateSender;
    connect(signer: Signer): DummyStateSender__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610130806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806316f1983114610030575b600080fd5b6100b06004803603604081101561004657600080fd5b6001600160a01b03823516919081019060408101602082013564010000000081111561007157600080fd5b82018360208201111561008357600080fd5b803590602001918460018302840111640100000000831117156100a557600080fd5b5090925090506100b2565b005b826001600160a01b031660017f103fed9db65eac19c4d870f49ab7520fe03b99f1838e5996caf47e9e43308392848460405180806020018281038252848482818152602001925080828437600083820152604051601f909101601f19169092018290039550909350505050a350505056fea164736f6c6343000606000a";
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
        outputs: never[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): DummyStateSenderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): DummyStateSender;
}
export {};
//# sourceMappingURL=DummyStateSender__factory.d.ts.map