import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface ITextResolverInterface extends utils.Interface {
    functions: {
        "text(bytes32,string)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "text"): FunctionFragment;
    encodeFunctionData(functionFragment: "text", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "text", data: BytesLike): Result;
    events: {
        "TextChanged(bytes32,string,string,string)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "TextChanged"): EventFragment;
}
export interface TextChangedEventObject {
    node: string;
    indexedKey: string;
    key: string;
    value: string;
}
export declare type TextChangedEvent = TypedEvent<[
    string,
    string,
    string,
    string
], TextChangedEventObject>;
export declare type TextChangedEventFilter = TypedEventFilter<TextChangedEvent>;
export interface ITextResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ITextResolverInterface;
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
        text(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;
    };
    text(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        text(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "TextChanged(bytes32,string,string,string)"(node?: PromiseOrValue<BytesLike> | null, indexedKey?: PromiseOrValue<string> | null, key?: null, value?: null): TextChangedEventFilter;
        TextChanged(node?: PromiseOrValue<BytesLike> | null, indexedKey?: PromiseOrValue<string> | null, key?: null, value?: null): TextChangedEventFilter;
    };
    estimateGas: {
        text(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        text(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ITextResolver.d.ts.map