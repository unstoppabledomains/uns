import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { TLDPublicSuffixList, TLDPublicSuffixListInterface } from "../../../../contracts/@ens/dnssec/TLDPublicSuffixList";
declare type TLDPublicSuffixListConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class TLDPublicSuffixList__factory extends ContractFactory {
    constructor(...args: TLDPublicSuffixListConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<TLDPublicSuffixList & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): TLDPublicSuffixList__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b506101d18061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c80634f89059e1461002d575b5f80fd5b61004061003b366004610125565b610054565b604051901515815260200160405180910390f35b5f806100985f85858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525092939250506101029050565b60ff1690505f811180156100f857506100f36100b5826001610191565b85858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525092939250506101029050565b60ff16155b9150505b92915050565b5f828281518110610115576101156101b0565b016020015160f81c905092915050565b5f8060208385031215610136575f80fd5b823567ffffffffffffffff8082111561014d575f80fd5b818501915085601f830112610160575f80fd5b81358181111561016e575f80fd5b86602082850101111561017f575f80fd5b60209290920196919550909350505050565b808201808211156100fc57634e487b7160e01b5f52601160045260245ffd5b634e487b7160e01b5f52603260045260245ffdfea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "name";
            readonly type: "bytes";
        }];
        readonly name: "isPublicSuffix";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): TLDPublicSuffixListInterface;
    static connect(address: string, runner?: ContractRunner | null): TLDPublicSuffixList;
}
export {};
//# sourceMappingURL=TLDPublicSuffixList__factory.d.ts.map