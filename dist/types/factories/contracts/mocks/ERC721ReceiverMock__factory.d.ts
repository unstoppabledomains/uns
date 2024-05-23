import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { ERC721ReceiverMock, ERC721ReceiverMockInterface } from "../../../contracts/mocks/ERC721ReceiverMock";
declare type ERC721ReceiverMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC721ReceiverMock__factory extends ContractFactory {
    constructor(...args: ERC721ReceiverMockConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ERC721ReceiverMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ERC721ReceiverMock__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b506101798061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063150b7a021461002d575b5f80fd5b61004b61003b366004610097565b630a85bd0160e11b949350505050565b6040516001600160e01b0319909116815260200160405180910390f35b80356001600160a01b038116811461007e575f80fd5b919050565b634e487b7160e01b5f52604160045260245ffd5b5f805f80608085870312156100aa575f80fd5b6100b385610068565b93506100c160208601610068565b925060408501359150606085013567ffffffffffffffff808211156100e4575f80fd5b818701915087601f8301126100f7575f80fd5b81358181111561010957610109610083565b604051601f8201601f19908116603f0116810190838211818310171561013157610131610083565b816040528281528a6020848701011115610149575f80fd5b826020860160208301375f6020848301015280955050505050509295919450925056fea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly name: "onERC721Received";
        readonly outputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "";
            readonly type: "bytes4";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }];
    static createInterface(): ERC721ReceiverMockInterface;
    static connect(address: string, runner?: ContractRunner | null): ERC721ReceiverMock;
}
export {};
//# sourceMappingURL=ERC721ReceiverMock__factory.d.ts.map