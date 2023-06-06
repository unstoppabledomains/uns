import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
export interface MulticallableInterface extends utils.Interface {
    functions: {
        "multicall(bytes[])": FunctionFragment;
        "multicallWithNodeCheck(bytes32,bytes[])": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "multicall" | "multicallWithNodeCheck" | "supportsInterface"): FunctionFragment;
    encodeFunctionData(functionFragment: "multicall", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "multicallWithNodeCheck", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "multicallWithNodeCheck", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    events: {};
}
export interface Multicallable extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: MulticallableInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        multicall(data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        multicallWithNodeCheck(nodehash: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    };
    multicall(data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    multicallWithNodeCheck(nodehash: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        multicall(data: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<string[]>;
        multicallWithNodeCheck(nodehash: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<string[]>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {};
    estimateGas: {
        multicall(data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        multicallWithNodeCheck(nodehash: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        multicall(data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        multicallWithNodeCheck(nodehash: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=Multicallable.d.ts.map