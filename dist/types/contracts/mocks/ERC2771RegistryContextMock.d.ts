import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface ERC2771RegistryContextMockInterface extends utils.Interface {
    functions: {
        "execute(bytes)": FunctionFragment;
        "initialize()": FunctionFragment;
        "isTrustedForwarder(address)": FunctionFragment;
        "msgData()": FunctionFragment;
        "msgSender()": FunctionFragment;
        "msgToken()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "execute" | "initialize" | "isTrustedForwarder" | "msgData" | "msgSender" | "msgToken"): FunctionFragment;
    encodeFunctionData(functionFragment: "execute", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "initialize", values?: undefined): string;
    encodeFunctionData(functionFragment: "isTrustedForwarder", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "msgData", values?: undefined): string;
    encodeFunctionData(functionFragment: "msgSender", values?: undefined): string;
    encodeFunctionData(functionFragment: "msgToken", values?: undefined): string;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTrustedForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "msgData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "msgSender", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "msgToken", data: BytesLike): Result;
    events: {
        "Initialized(uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
}
export interface InitializedEventObject {
    version: number;
}
export declare type InitializedEvent = TypedEvent<[number], InitializedEventObject>;
export declare type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface ERC2771RegistryContextMock extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ERC2771RegistryContextMockInterface;
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
        execute(data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        initialize(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        msgData(overrides?: CallOverrides): Promise<[string]>;
        msgSender(overrides?: CallOverrides): Promise<[string]>;
        msgToken(overrides?: CallOverrides): Promise<[BigNumber]>;
    };
    execute(data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    initialize(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    msgData(overrides?: CallOverrides): Promise<string>;
    msgSender(overrides?: CallOverrides): Promise<string>;
    msgToken(overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        execute(data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean, string]>;
        initialize(overrides?: CallOverrides): Promise<void>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        msgData(overrides?: CallOverrides): Promise<string>;
        msgSender(overrides?: CallOverrides): Promise<string>;
        msgToken(overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {
        "Initialized(uint8)"(version?: null): InitializedEventFilter;
        Initialized(version?: null): InitializedEventFilter;
    };
    estimateGas: {
        execute(data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        initialize(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        msgData(overrides?: CallOverrides): Promise<BigNumber>;
        msgSender(overrides?: CallOverrides): Promise<BigNumber>;
        msgToken(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        execute(data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        initialize(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        msgData(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        msgSender(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        msgToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ERC2771RegistryContextMock.d.ts.map