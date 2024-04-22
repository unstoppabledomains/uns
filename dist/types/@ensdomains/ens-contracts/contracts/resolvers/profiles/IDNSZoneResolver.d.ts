import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../../common";
export interface IDNSZoneResolverInterface extends Interface {
    getFunction(nameOrSignature: "zonehash"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "DNSZonehashChanged"): EventFragment;
    encodeFunctionData(functionFragment: "zonehash", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "zonehash", data: BytesLike): Result;
}
export declare namespace DNSZonehashChangedEvent {
    type InputTuple = [
        node: BytesLike,
        lastzonehash: BytesLike,
        zonehash: BytesLike
    ];
    type OutputTuple = [
        node: string,
        lastzonehash: string,
        zonehash: string
    ];
    interface OutputObject {
        node: string;
        lastzonehash: string;
        zonehash: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IDNSZoneResolver extends BaseContract {
    connect(runner?: ContractRunner | null): IDNSZoneResolver;
    waitForDeployment(): Promise<this>;
    interface: IDNSZoneResolverInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    zonehash: TypedContractMethod<[node: BytesLike], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "zonehash"): TypedContractMethod<[node: BytesLike], [string], "view">;
    getEvent(key: "DNSZonehashChanged"): TypedContractEvent<DNSZonehashChangedEvent.InputTuple, DNSZonehashChangedEvent.OutputTuple, DNSZonehashChangedEvent.OutputObject>;
    filters: {
        "DNSZonehashChanged(bytes32,bytes,bytes)": TypedContractEvent<DNSZonehashChangedEvent.InputTuple, DNSZonehashChangedEvent.OutputTuple, DNSZonehashChangedEvent.OutputObject>;
        DNSZonehashChanged: TypedContractEvent<DNSZonehashChangedEvent.InputTuple, DNSZonehashChangedEvent.OutputTuple, DNSZonehashChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=IDNSZoneResolver.d.ts.map