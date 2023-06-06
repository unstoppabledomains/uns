import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface IContentHashResolverInterface extends utils.Interface {
    functions: {
        "contenthash(bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "contenthash"): FunctionFragment;
    encodeFunctionData(functionFragment: "contenthash", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "contenthash", data: BytesLike): Result;
    events: {
        "ContenthashChanged(bytes32,bytes)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "ContenthashChanged"): EventFragment;
}
export interface ContenthashChangedEventObject {
    node: string;
    hash: string;
}
export declare type ContenthashChangedEvent = TypedEvent<[
    string,
    string
], ContenthashChangedEventObject>;
export declare type ContenthashChangedEventFilter = TypedEventFilter<ContenthashChangedEvent>;
export interface IContentHashResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IContentHashResolverInterface;
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
        contenthash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
    };
    contenthash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        contenthash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "ContenthashChanged(bytes32,bytes)"(node?: PromiseOrValue<BytesLike> | null, hash?: null): ContenthashChangedEventFilter;
        ContenthashChanged(node?: PromiseOrValue<BytesLike> | null, hash?: null): ContenthashChangedEventFilter;
    };
    estimateGas: {
        contenthash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        contenthash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IContentHashResolver.d.ts.map