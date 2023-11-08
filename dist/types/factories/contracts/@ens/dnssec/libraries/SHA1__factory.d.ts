import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type { SHA1, SHA1Interface } from "../../../../../contracts/@ens/dnssec/libraries/SHA1";
declare type SHA1ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class SHA1__factory extends ContractFactory {
    constructor(...args: SHA1ConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<SHA1>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): SHA1;
    connect(signer: Signer): SHA1__factory;
    static readonly bytecode = "0x602d6037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea164736f6c6343000811000a";
    static readonly abi: {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
    }[];
    static createInterface(): SHA1Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): SHA1;
}
export {};
//# sourceMappingURL=SHA1__factory.d.ts.map