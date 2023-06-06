import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../../../../common";
export interface AggregatorInterfaceInterface extends utils.Interface {
    functions: {
        "latestAnswer()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "latestAnswer"): FunctionFragment;
    encodeFunctionData(functionFragment: "latestAnswer", values?: undefined): string;
    decodeFunctionResult(functionFragment: "latestAnswer", data: BytesLike): Result;
    events: {};
}
export interface AggregatorInterface extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: AggregatorInterfaceInterface;
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
    };
    latestAnswer(overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        latestAnswer(overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        latestAnswer(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        latestAnswer(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=AggregatorInterface.d.ts.map