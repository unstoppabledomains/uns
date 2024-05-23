import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { BytesUtils, BytesUtilsInterface } from "../../../../../@ensdomains/ens-contracts/contracts/dnssec-oracle/BytesUtils";
declare type BytesUtilsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class BytesUtils__factory extends ContractFactory {
    constructor(...args: BytesUtilsConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<BytesUtils & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): BytesUtils__factory;
    static readonly bytecode = "0x602c6032600b8282823980515f1a607314602657634e487b7160e01b5f525f60045260245ffd5b305f52607381538281f3fe730000000000000000000000000000000000000000301460806040525f80fdfea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "offset";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "length";
            readonly type: "uint256";
        }];
        readonly name: "OffsetOutOfBoundsError";
        readonly type: "error";
    }];
    static createInterface(): BytesUtilsInterface;
    static connect(address: string, runner?: ContractRunner | null): BytesUtils;
}
export {};
//# sourceMappingURL=BytesUtils__factory.d.ts.map