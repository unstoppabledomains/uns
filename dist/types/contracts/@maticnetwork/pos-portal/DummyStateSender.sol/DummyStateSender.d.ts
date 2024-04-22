import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../common";
export interface DummyStateSenderInterface extends Interface {
    getFunction(nameOrSignature: "syncState"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "StateSynced"): EventFragment;
    encodeFunctionData(functionFragment: "syncState", values: [AddressLike, BytesLike]): string;
    decodeFunctionResult(functionFragment: "syncState", data: BytesLike): Result;
}
export declare namespace StateSyncedEvent {
    type InputTuple = [
        id: BigNumberish,
        contractAddress: AddressLike,
        data: BytesLike
    ];
    type OutputTuple = [id: bigint, contractAddress: string, data: string];
    interface OutputObject {
        id: bigint;
        contractAddress: string;
        data: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface DummyStateSender extends BaseContract {
    connect(runner?: ContractRunner | null): DummyStateSender;
    waitForDeployment(): Promise<this>;
    interface: DummyStateSenderInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    syncState: TypedContractMethod<[
        receiver: AddressLike,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "syncState"): TypedContractMethod<[
        receiver: AddressLike,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "StateSynced"): TypedContractEvent<StateSyncedEvent.InputTuple, StateSyncedEvent.OutputTuple, StateSyncedEvent.OutputObject>;
    filters: {
        "StateSynced(uint256,address,bytes)": TypedContractEvent<StateSyncedEvent.InputTuple, StateSyncedEvent.OutputTuple, StateSyncedEvent.OutputObject>;
        StateSynced: TypedContractEvent<StateSyncedEvent.InputTuple, StateSyncedEvent.OutputTuple, StateSyncedEvent.OutputObject>;
    };
}
//# sourceMappingURL=DummyStateSender.d.ts.map