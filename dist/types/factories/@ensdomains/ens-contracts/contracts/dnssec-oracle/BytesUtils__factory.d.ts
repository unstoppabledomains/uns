import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type { BytesUtils, BytesUtilsInterface } from "../../../../../@ensdomains/ens-contracts/contracts/dnssec-oracle/BytesUtils";
declare type BytesUtilsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class BytesUtils__factory extends ContractFactory {
    constructor(...args: BytesUtilsConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<BytesUtils>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): BytesUtils;
    connect(signer: Signer): BytesUtils__factory;
    static readonly bytecode = "0x602d6037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea164736f6c6343000811000a";
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
    }[];
    static createInterface(): BytesUtilsInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): BytesUtils;
}
export {};
//# sourceMappingURL=BytesUtils__factory.d.ts.map