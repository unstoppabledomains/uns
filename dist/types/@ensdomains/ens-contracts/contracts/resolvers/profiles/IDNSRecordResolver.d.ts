import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface IDNSRecordResolverInterface extends utils.Interface {
    functions: {
        "dnsRecord(bytes32,bytes32,uint16)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "dnsRecord"): FunctionFragment;
    encodeFunctionData(functionFragment: "dnsRecord", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>
    ]): string;
    decodeFunctionResult(functionFragment: "dnsRecord", data: BytesLike): Result;
    events: {
        "DNSRecordChanged(bytes32,bytes,uint16,bytes)": EventFragment;
        "DNSRecordDeleted(bytes32,bytes,uint16)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "DNSRecordChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DNSRecordDeleted"): EventFragment;
}
export interface DNSRecordChangedEventObject {
    node: string;
    name: string;
    resource: number;
    record: string;
}
export declare type DNSRecordChangedEvent = TypedEvent<[
    string,
    string,
    number,
    string
], DNSRecordChangedEventObject>;
export declare type DNSRecordChangedEventFilter = TypedEventFilter<DNSRecordChangedEvent>;
export interface DNSRecordDeletedEventObject {
    node: string;
    name: string;
    resource: number;
}
export declare type DNSRecordDeletedEvent = TypedEvent<[
    string,
    string,
    number
], DNSRecordDeletedEventObject>;
export declare type DNSRecordDeletedEventFilter = TypedEventFilter<DNSRecordDeletedEvent>;
export interface IDNSRecordResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IDNSRecordResolverInterface;
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
        dnsRecord(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<BytesLike>, resource: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
    };
    dnsRecord(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<BytesLike>, resource: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        dnsRecord(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<BytesLike>, resource: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "DNSRecordChanged(bytes32,bytes,uint16,bytes)"(node?: PromiseOrValue<BytesLike> | null, name?: null, resource?: null, record?: null): DNSRecordChangedEventFilter;
        DNSRecordChanged(node?: PromiseOrValue<BytesLike> | null, name?: null, resource?: null, record?: null): DNSRecordChangedEventFilter;
        "DNSRecordDeleted(bytes32,bytes,uint16)"(node?: PromiseOrValue<BytesLike> | null, name?: null, resource?: null): DNSRecordDeletedEventFilter;
        DNSRecordDeleted(node?: PromiseOrValue<BytesLike> | null, name?: null, resource?: null): DNSRecordDeletedEventFilter;
    };
    estimateGas: {
        dnsRecord(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<BytesLike>, resource: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        dnsRecord(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<BytesLike>, resource: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IDNSRecordResolver.d.ts.map