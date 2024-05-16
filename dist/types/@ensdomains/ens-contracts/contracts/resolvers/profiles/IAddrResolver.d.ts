import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../../common";
export interface IAddrResolverInterface extends Interface {
    getFunction(nameOrSignature: "addr"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AddrChanged"): EventFragment;
    encodeFunctionData(functionFragment: "addr", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "addr", data: BytesLike): Result;
}
export declare namespace AddrChangedEvent {
    type InputTuple = [node: BytesLike, a: AddressLike];
    type OutputTuple = [node: string, a: string];
    interface OutputObject {
        node: string;
        a: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IAddrResolver extends BaseContract {
    connect(runner?: ContractRunner | null): IAddrResolver;
    waitForDeployment(): Promise<this>;
    interface: IAddrResolverInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addr: TypedContractMethod<[node: BytesLike], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addr"): TypedContractMethod<[node: BytesLike], [string], "view">;
    getEvent(key: "AddrChanged"): TypedContractEvent<AddrChangedEvent.InputTuple, AddrChangedEvent.OutputTuple, AddrChangedEvent.OutputObject>;
    filters: {
        "AddrChanged(bytes32,address)": TypedContractEvent<AddrChangedEvent.InputTuple, AddrChangedEvent.OutputTuple, AddrChangedEvent.OutputObject>;
        AddrChanged: TypedContractEvent<AddrChangedEvent.InputTuple, AddrChangedEvent.OutputTuple, AddrChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=IAddrResolver.d.ts.map