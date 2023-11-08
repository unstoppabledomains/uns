import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type { Owned, OwnedInterface } from "../../../../../contracts/@ens/dnssec/DNSSECImpl.sol/Owned";
declare type OwnedConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Owned__factory extends ContractFactory {
    constructor(...args: OwnedConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<Owned>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): Owned;
    connect(signer: Signer): Owned__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50600080546001600160a01b0319163317905560e9806100316000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806313af40351460375780638da5cb5b146048575b600080fd5b6046604236600460ae565b6076565b005b600054605a906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b6000546001600160a01b03163314608c57600080fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055565b60006020828403121560bf57600080fd5b81356001600160a01b038116811460d557600080fd5b939250505056fea164736f6c6343000811000a";
    static readonly abi: ({
        inputs: never[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
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
    })[];
    static createInterface(): OwnedInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Owned;
}
export {};
//# sourceMappingURL=Owned__factory.d.ts.map