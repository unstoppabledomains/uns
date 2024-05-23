import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { TokenTransferrer, TokenTransferrerInterface } from "../../../../seaport-core/src/lib/TokenTransferrer";
declare type TokenTransferrerConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class TokenTransferrer__factory extends ContractFactory {
    constructor(...args: TokenTransferrerConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<TokenTransferrer & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): TokenTransferrer__factory;
    static readonly bytecode = "0x6080604052348015600e575f80fd5b50601580601a5f395ff3fe60806040525f80fdfea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "BadReturnValueFromERC20OnTransfer";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "identifiers";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "amounts";
            readonly type: "uint256[]";
        }];
        readonly name: "ERC1155BatchTransferGenericFailure";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "Invalid1155BatchTransferEncoding";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "InvalidERC721TransferAmount";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "MissingItemAmount";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "NoContract";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "identifier";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "TokenTransferGenericFailure";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "UnusedItemParameters";
        readonly type: "error";
    }];
    static createInterface(): TokenTransferrerInterface;
    static connect(address: string, runner?: ContractRunner | null): TokenTransferrer;
}
export {};
//# sourceMappingURL=TokenTransferrer__factory.d.ts.map