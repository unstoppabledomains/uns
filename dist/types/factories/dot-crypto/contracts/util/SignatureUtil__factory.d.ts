import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type { SignatureUtil, SignatureUtilInterface } from "../../../../dot-crypto/contracts/util/SignatureUtil";
declare type SignatureUtilConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class SignatureUtil__factory extends ContractFactory {
    constructor(...args: SignatureUtilConstructorParams);
    deploy(registry: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<SignatureUtil>;
    getDeployTransaction(registry: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): SignatureUtil;
    connect(signer: Signer): SignatureUtil__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5060405161013d38038061013d8339818101604052602081101561003357600080fd5b5051600180546001600160a01b0319166001600160a01b0390921691909117905560db806100626000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80636ccbae5f1460375780637b103999146063575b600080fd5b605160048036036020811015604b57600080fd5b50356085565b60408051918252519081900360200190f35b60696097565b604080516001600160a01b039092168252519081900360200190f35b60009081526020819052604090205490565b6001546001600160a01b03169056fea265627a7a723158209ce28ed4bcc27cb55d265eaa0611259b785b62de333c7977452c1130d6df0bbc64736f6c634300050c0032";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        constant?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        constant: boolean;
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): SignatureUtilInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): SignatureUtil;
}
export {};
//# sourceMappingURL=SignatureUtil__factory.d.ts.map