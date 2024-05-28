import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { SHA1, SHA1Interface } from "../../../../../contracts/@ens/dnssec/libraries/SHA1";
declare type SHA1ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class SHA1__factory extends ContractFactory {
    constructor(...args: SHA1ConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<SHA1 & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): SHA1__factory;
    static readonly bytecode = "0x602c6032600b8282823980515f1a607314602657634e487b7160e01b5f525f60045260245ffd5b305f52607381538281f3fe730000000000000000000000000000000000000000301460806040525f80fdfea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "x";
            readonly type: "bytes32";
        }];
        readonly name: "Debug";
        readonly type: "event";
    }];
    static createInterface(): SHA1Interface;
    static connect(address: string, runner?: ContractRunner | null): SHA1;
}
export {};
//# sourceMappingURL=SHA1__factory.d.ts.map