import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { ERC721ReceiverMock, ERC721ReceiverMockInterface } from "../../../contracts/mocks/ERC721ReceiverMock";
declare type ERC721ReceiverMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC721ReceiverMock__factory extends ContractFactory {
    constructor(...args: ERC721ReceiverMockConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ERC721ReceiverMock>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): ERC721ReceiverMock;
    connect(signer: Signer): ERC721ReceiverMock__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061017f806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063150b7a0214610030575b600080fd5b61004e61003e366004610087565b630a85bd0160e11b949350505050565b6040516001600160e01b0319909116815260200160405180910390f35b80356001600160a01b038116811461008257600080fd5b919050565b6000806000806080858703121561009c578384fd5b6100a58561006b565b93506100b36020860161006b565b925060408501359150606085013567ffffffffffffffff808211156100d6578283fd5b818701915087601f8301126100e9578283fd5b8135818111156100fb576100fb61015c565b604051601f8201601f19908116603f011681019083821181831017156101235761012361015c565b816040528281528a602084870101111561013b578586fd5b82602086016020830137918201602001949094529598949750929550505050565b634e487b7160e01b600052604160045260246000fdfea164736f6c6343000804000a";
    static readonly abi: {
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
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): ERC721ReceiverMockInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC721ReceiverMock;
}
export {};
//# sourceMappingURL=ERC721ReceiverMock__factory.d.ts.map