import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { SHA256Digest, SHA256DigestInterface } from "../../../../../contracts/@ens/dnssec/digests/SHA256Digest";
declare type SHA256DigestConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class SHA256Digest__factory extends ContractFactory {
    constructor(...args: SHA256DigestConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<SHA256Digest & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): SHA256Digest__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b5061026b8061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063f7e83aee1461002d575b5f80fd5b61004061003b3660046101ac565b610054565b604051901515815260200160405180910390f35b5f602082146100a95760405162461bcd60e51b815260206004820152601a60248201527f496e76616c6964207368613235362068617368206c656e677468000000000000604482015260640160405180910390fd5b6100eb5f84848080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525092939250506101459050565b600286866040516100fd929190610213565b602060405180830381855afa158015610118573d5f803e3d5ffd5b5050506040513d601f19601f8201168201806040525081019061013b9190610222565b1495945050505050565b81515f90610154836020610239565b111561015e575f80fd5b50016020015190565b5f8083601f840112610177575f80fd5b50813567ffffffffffffffff81111561018e575f80fd5b6020830191508360208285010111156101a5575f80fd5b9250929050565b5f805f80604085870312156101bf575f80fd5b843567ffffffffffffffff808211156101d6575f80fd5b6101e288838901610167565b909650945060208701359150808211156101fa575f80fd5b5061020787828801610167565b95989497509550505050565b818382375f9101908152919050565b5f60208284031215610232575f80fd5b5051919050565b8082018082111561025857634e487b7160e01b5f52601160045260245ffd5b9291505056fea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "hash";
            readonly type: "bytes";
        }];
        readonly name: "verify";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }];
    static createInterface(): SHA256DigestInterface;
    static connect(address: string, runner?: ContractRunner | null): SHA256Digest;
}
export {};
//# sourceMappingURL=SHA256Digest__factory.d.ts.map