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
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610186806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063150b7a0214610030575b600080fd5b61004e61003e36600461009d565b630a85bd0160e11b949350505050565b6040516001600160e01b0319909116815260200160405180910390f35b80356001600160a01b038116811461008257600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600080600080608085870312156100b357600080fd5b6100bc8561006b565b93506100ca6020860161006b565b925060408501359150606085013567ffffffffffffffff808211156100ee57600080fd5b818701915087601f83011261010257600080fd5b81358181111561011457610114610087565b604051601f8201601f19908116603f0116810190838211818310171561013c5761013c610087565b816040528281528a602084870101111561015557600080fd5b8260208601602083013760006020848301015280955050505050509295919450925056fea164736f6c6343000811000a";
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