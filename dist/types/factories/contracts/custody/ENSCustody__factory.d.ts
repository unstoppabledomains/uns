import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { ENSCustody, ENSCustodyInterface } from "../../../contracts/custody/ENSCustody";
declare type ENSCustodyConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ENSCustody__factory extends ContractFactory {
    constructor(...args: ENSCustodyConstructorParams);
    deploy(controller: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ENSCustody>;
    getDeployTransaction(controller: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): ENSCustody;
    connect(signer: Signer): ENSCustody__factory;
    static readonly bytecode = "0x6080604052348015600f57600080fd5b50604051609f380380609f833981016040819052602a91604e565b600080546001600160a01b0319166001600160a01b0392909216919091179055607c565b600060208284031215605f57600080fd5b81516001600160a01b0381168114607557600080fd5b9392505050565b60168060896000396000f3fe6080604052600080fdfea164736f6c6343000811000a";
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): ENSCustodyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ENSCustody;
}
export {};
//# sourceMappingURL=ENSCustody__factory.d.ts.map