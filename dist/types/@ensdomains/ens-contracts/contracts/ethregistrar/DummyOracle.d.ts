import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
export interface DummyOracleInterface extends utils.Interface {
    functions: {
        "latestAnswer()": FunctionFragment;
        "set(int256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "latestAnswer" | "set"): FunctionFragment;
    encodeFunctionData(functionFragment: "latestAnswer", values?: undefined): string;
    encodeFunctionData(functionFragment: "set", values: [PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "latestAnswer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "set", data: BytesLike): Result;
    events: {};
}
export interface DummyOracle extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: DummyOracleInterface;
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
        latestAnswer(overrides?: CallOverrides): Promise<[BigNumber]>;
        set(_value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    latestAnswer(overrides?: CallOverrides): Promise<BigNumber>;
    set(_value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        latestAnswer(overrides?: CallOverrides): Promise<BigNumber>;
        set(_value: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        latestAnswer(overrides?: CallOverrides): Promise<BigNumber>;
        set(_value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        latestAnswer(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        set(_value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=DummyOracle.d.ts.map