import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface IAddrResolverInterface extends utils.Interface {
    functions: {
        "addr(bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addr"): FunctionFragment;
    encodeFunctionData(functionFragment: "addr", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "addr", data: BytesLike): Result;
    events: {
        "AddrChanged(bytes32,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AddrChanged"): EventFragment;
}
export interface AddrChangedEventObject {
    node: string;
    a: string;
}
export declare type AddrChangedEvent = TypedEvent<[
    string,
    string
], AddrChangedEventObject>;
export declare type AddrChangedEventFilter = TypedEventFilter<AddrChangedEvent>;
export interface IAddrResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IAddrResolverInterface;
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
        addr(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
    };
    addr(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        addr(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "AddrChanged(bytes32,address)"(node?: PromiseOrValue<BytesLike> | null, a?: null): AddrChangedEventFilter;
        AddrChanged(node?: PromiseOrValue<BytesLike> | null, a?: null): AddrChangedEventFilter;
    };
    estimateGas: {
        addr(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        addr(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IAddrResolver.d.ts.map