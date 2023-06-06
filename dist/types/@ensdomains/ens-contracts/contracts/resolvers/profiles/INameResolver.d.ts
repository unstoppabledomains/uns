import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface INameResolverInterface extends utils.Interface {
    functions: {
        "name(bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "name"): FunctionFragment;
    encodeFunctionData(functionFragment: "name", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    events: {
        "NameChanged(bytes32,string)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "NameChanged"): EventFragment;
}
export interface NameChangedEventObject {
    node: string;
    name: string;
}
export declare type NameChangedEvent = TypedEvent<[
    string,
    string
], NameChangedEventObject>;
export declare type NameChangedEventFilter = TypedEventFilter<NameChangedEvent>;
export interface INameResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: INameResolverInterface;
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
        name(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
    };
    name(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        name(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "NameChanged(bytes32,string)"(node?: PromiseOrValue<BytesLike> | null, name?: null): NameChangedEventFilter;
        NameChanged(node?: PromiseOrValue<BytesLike> | null, name?: null): NameChangedEventFilter;
    };
    estimateGas: {
        name(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        name(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=INameResolver.d.ts.map