import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { SignatureUtil, SignatureUtilInterface } from "../../../../dot-crypto/contracts/util/SignatureUtil";
declare type SignatureUtilConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class SignatureUtil__factory extends ContractFactory {
    constructor(...args: SignatureUtilConstructorParams);
    getDeployTransaction(registry: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(registry: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<SignatureUtil & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): SignatureUtil__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5060405161013d38038061013d8339818101604052602081101561003357600080fd5b5051600180546001600160a01b0319166001600160a01b0390921691909117905560db806100626000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80636ccbae5f1460375780637b103999146063575b600080fd5b605160048036036020811015604b57600080fd5b50356085565b60408051918252519081900360200190f35b60696097565b604080516001600160a01b039092168252519081900360200190f35b60009081526020819052604090205490565b6001546001600160a01b03169056fea265627a7a723158209ce28ed4bcc27cb55d265eaa0611259b785b62de333c7977452c1130d6df0bbc64736f6c634300050c0032";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "contract CNSRegistry";
            readonly name: "registry";
            readonly type: "address";
        }];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly constant: true;
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "nonceOf";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "registry";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): SignatureUtilInterface;
    static connect(address: string, runner?: ContractRunner | null): SignatureUtil;
}
export {};
//# sourceMappingURL=SignatureUtil__factory.d.ts.map