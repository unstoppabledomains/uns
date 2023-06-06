import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface DNSResolverInterface extends utils.Interface {
    functions: {
        "clearRecords(bytes32)": FunctionFragment;
        "dnsRecord(bytes32,bytes32,uint16)": FunctionFragment;
        "hasDNSRecords(bytes32,bytes32)": FunctionFragment;
        "recordVersions(bytes32)": FunctionFragment;
        "setDNSRecords(bytes32,bytes)": FunctionFragment;
        "setZonehash(bytes32,bytes)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "zonehash(bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "clearRecords" | "dnsRecord" | "hasDNSRecords" | "recordVersions" | "setDNSRecords" | "setZonehash" | "supportsInterface" | "zonehash"): FunctionFragment;
    encodeFunctionData(functionFragment: "clearRecords", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "dnsRecord", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "hasDNSRecords", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "recordVersions", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "setDNSRecords", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "setZonehash", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "zonehash", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "clearRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "dnsRecord", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasDNSRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "recordVersions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDNSRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setZonehash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "zonehash", data: BytesLike): Result;
    events: {
        "DNSRecordChanged(bytes32,bytes,uint16,bytes)": EventFragment;
        "DNSRecordDeleted(bytes32,bytes,uint16)": EventFragment;
        "DNSZonehashChanged(bytes32,bytes,bytes)": EventFragment;
        "VersionChanged(bytes32,uint64)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "DNSRecordChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DNSRecordDeleted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DNSZonehashChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VersionChanged"): EventFragment;
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
export interface VersionChangedEventObject {
    node: string;
    newVersion: BigNumber;
}
export declare type VersionChangedEvent = TypedEvent<[
    string,
    BigNumber
], VersionChangedEventObject>;
export declare type VersionChangedEventFilter = TypedEventFilter<VersionChangedEvent>;
export interface DNSResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: DNSResolverInterface;
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
        clearRecords(node: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        dnsRecord(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<BytesLike>, resource: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        hasDNSRecords(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        recordVersions(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[BigNumber]>;
        setDNSRecords(node: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setZonehash(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        zonehash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
    };
    clearRecords(node: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    dnsRecord(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<BytesLike>, resource: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    hasDNSRecords(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    recordVersions(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    setDNSRecords(node: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setZonehash(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    zonehash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        clearRecords(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        dnsRecord(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<BytesLike>, resource: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        hasDNSRecords(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        recordVersions(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        setDNSRecords(node: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        setZonehash(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        zonehash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "DNSRecordChanged(bytes32,bytes,uint16,bytes)"(node?: PromiseOrValue<BytesLike> | null, name?: null, resource?: null, record?: null): DNSRecordChangedEventFilter;
        DNSRecordChanged(node?: PromiseOrValue<BytesLike> | null, name?: null, resource?: null, record?: null): DNSRecordChangedEventFilter;
        "DNSRecordDeleted(bytes32,bytes,uint16)"(node?: PromiseOrValue<BytesLike> | null, name?: null, resource?: null): DNSRecordDeletedEventFilter;
        DNSRecordDeleted(node?: PromiseOrValue<BytesLike> | null, name?: null, resource?: null): DNSRecordDeletedEventFilter;
        "DNSZonehashChanged(bytes32,bytes,bytes)"(node?: PromiseOrValue<BytesLike> | null, lastzonehash?: null, zonehash?: null): DNSZonehashChangedEventFilter;
        DNSZonehashChanged(node?: PromiseOrValue<BytesLike> | null, lastzonehash?: null, zonehash?: null): DNSZonehashChangedEventFilter;
        "VersionChanged(bytes32,uint64)"(node?: PromiseOrValue<BytesLike> | null, newVersion?: null): VersionChangedEventFilter;
        VersionChanged(node?: PromiseOrValue<BytesLike> | null, newVersion?: null): VersionChangedEventFilter;
    };
    estimateGas: {
        clearRecords(node: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        dnsRecord(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<BytesLike>, resource: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        hasDNSRecords(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        recordVersions(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        setDNSRecords(node: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setZonehash(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        zonehash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        clearRecords(node: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        dnsRecord(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<BytesLike>, resource: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hasDNSRecords(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        recordVersions(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setDNSRecords(node: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setZonehash(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        zonehash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=DNSResolver.d.ts.map