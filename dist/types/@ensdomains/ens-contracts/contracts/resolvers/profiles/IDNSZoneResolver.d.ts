import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface IDNSZoneResolverInterface extends utils.Interface {
    functions: {
        "zonehash(bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "zonehash"): FunctionFragment;
    encodeFunctionData(functionFragment: "zonehash", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "zonehash", data: BytesLike): Result;
    events: {
        "DNSZonehashChanged(bytes32,bytes,bytes)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "DNSZonehashChanged"): EventFragment;
}
export interface DNSZonehashChangedEventObject {
    node: string;
    lastzonehash: string;
    zonehash: string;
}
export declare type DNSZonehashChangedEvent = TypedEvent<[
    string,
    string,
    string
], DNSZonehashChangedEventObject>;
export declare type DNSZonehashChangedEventFilter = TypedEventFilter<DNSZonehashChangedEvent>;
export interface IDNSZoneResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IDNSZoneResolverInterface;
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
        zonehash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
    };
    zonehash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        zonehash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "DNSZonehashChanged(bytes32,bytes,bytes)"(node?: PromiseOrValue<BytesLike> | null, lastzonehash?: null, zonehash?: null): DNSZonehashChangedEventFilter;
        DNSZonehashChanged(node?: PromiseOrValue<BytesLike> | null, lastzonehash?: null, zonehash?: null): DNSZonehashChangedEventFilter;
    };
    estimateGas: {
        zonehash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        zonehash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IDNSZoneResolver.d.ts.map