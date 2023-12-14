import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type { DummyAlgorithm, DummyAlgorithmInterface } from "../../../../../contracts/@ens/dnssec/algorithms/DummyAlgorithm";
declare type DummyAlgorithmConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class DummyAlgorithm__factory extends ContractFactory {
    constructor(...args: DummyAlgorithmConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<DummyAlgorithm>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): DummyAlgorithm;
    connect(signer: Signer): DummyAlgorithm__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061014e806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063de8f50a114610030575b600080fd5b61004a61003e3660046100a7565b60019695505050505050565b604051901515815260200160405180910390f35b60008083601f84011261007057600080fd5b50813567ffffffffffffffff81111561008857600080fd5b6020830191508360208285010111156100a057600080fd5b9250929050565b600080600080600080606087890312156100c057600080fd5b863567ffffffffffffffff808211156100d857600080fd5b6100e48a838b0161005e565b909850965060208901359150808211156100fd57600080fd5b6101098a838b0161005e565b9096509450604089013591508082111561012257600080fd5b5061012f89828a0161005e565b979a969950949750929593949250505056fea164736f6c6343000811000a";
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
    static createInterface(): DummyAlgorithmInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): DummyAlgorithm;
}
export {};
//# sourceMappingURL=DummyAlgorithm__factory.d.ts.map