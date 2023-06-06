import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
export interface IMulticallableInterface extends utils.Interface {
    functions: {
        "multicall(bytes[])": FunctionFragment;
        "multicallWithNodeCheck(bytes32,bytes[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "multicall" | "multicallWithNodeCheck"): FunctionFragment;
    encodeFunctionData(functionFragment: "multicall", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "multicallWithNodeCheck", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>[]]): string;
    decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "multicallWithNodeCheck", data: BytesLike): Result;
    events: {};
}
export interface IMulticallable extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IMulticallableInterface;
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
        multicallWithNodeCheck(arg0: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    multicall(data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    multicallWithNodeCheck(arg0: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        multicall(data: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<string[]>;
        multicallWithNodeCheck(arg0: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<string[]>;
    };
    filters: {};
    estimateGas: {
        multicall(data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        multicallWithNodeCheck(arg0: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        multicall(data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        multicallWithNodeCheck(arg0: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IMulticallable.d.ts.map