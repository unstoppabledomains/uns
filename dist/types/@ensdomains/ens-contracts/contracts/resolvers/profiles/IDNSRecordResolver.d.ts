import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../../common";
export interface IDNSRecordResolverInterface extends Interface {
    getFunction(nameOrSignature: "dnsRecord"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "DNSRecordChanged" | "DNSRecordDeleted"): EventFragment;
    encodeFunctionData(functionFragment: "dnsRecord", values: [BytesLike, BytesLike, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "dnsRecord", data: BytesLike): Result;
}
export declare namespace DNSRecordChangedEvent {
    type InputTuple = [
        node: BytesLike,
        name: BytesLike,
        resource: BigNumberish,
        record: BytesLike
    ];
    type OutputTuple = [
        node: string,
        name: string,
        resource: bigint,
        record: string
    ];
    interface OutputObject {
        node: string;
        name: string;
        resource: bigint;
        record: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace DNSRecordDeletedEvent {
    type InputTuple = [
        node: BytesLike,
        name: BytesLike,
        resource: BigNumberish
    ];
    type OutputTuple = [node: string, name: string, resource: bigint];
    interface OutputObject {
        node: string;
        name: string;
        resource: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IDNSRecordResolver extends BaseContract {
    connect(runner?: ContractRunner | null): IDNSRecordResolver;
    waitForDeployment(): Promise<this>;
    interface: IDNSRecordResolverInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    dnsRecord: TypedContractMethod<[
        node: BytesLike,
        name: BytesLike,
        resource: BigNumberish
    ], [
        string
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "dnsRecord"): TypedContractMethod<[
        node: BytesLike,
        name: BytesLike,
        resource: BigNumberish
    ], [
        string
    ], "view">;
    getEvent(key: "DNSRecordChanged"): TypedContractEvent<DNSRecordChangedEvent.InputTuple, DNSRecordChangedEvent.OutputTuple, DNSRecordChangedEvent.OutputObject>;
    getEvent(key: "DNSRecordDeleted"): TypedContractEvent<DNSRecordDeletedEvent.InputTuple, DNSRecordDeletedEvent.OutputTuple, DNSRecordDeletedEvent.OutputObject>;
    filters: {
        "DNSRecordChanged(bytes32,bytes,uint16,bytes)": TypedContractEvent<DNSRecordChangedEvent.InputTuple, DNSRecordChangedEvent.OutputTuple, DNSRecordChangedEvent.OutputObject>;
        DNSRecordChanged: TypedContractEvent<DNSRecordChangedEvent.InputTuple, DNSRecordChangedEvent.OutputTuple, DNSRecordChangedEvent.OutputObject>;
        "DNSRecordDeleted(bytes32,bytes,uint16)": TypedContractEvent<DNSRecordDeletedEvent.InputTuple, DNSRecordDeletedEvent.OutputTuple, DNSRecordDeletedEvent.OutputObject>;
        DNSRecordDeleted: TypedContractEvent<DNSRecordDeletedEvent.InputTuple, DNSRecordDeletedEvent.OutputTuple, DNSRecordDeletedEvent.OutputObject>;
    };
}
//# sourceMappingURL=IDNSRecordResolver.d.ts.map