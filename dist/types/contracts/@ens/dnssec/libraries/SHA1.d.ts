import type { BaseContract, BytesLike, FunctionFragment, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener } from "../../../../common";
export interface SHA1Interface extends Interface {
    getEvent(nameOrSignatureOrTopic: "Debug"): EventFragment;
}
export declare namespace DebugEvent {
    type InputTuple = [x: BytesLike];
    type OutputTuple = [x: string];
    interface OutputObject {
        x: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface SHA1 extends BaseContract {
    connect(runner?: ContractRunner | null): SHA1;
    waitForDeployment(): Promise<this>;
    interface: SHA1Interface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getEvent(key: "Debug"): TypedContractEvent<DebugEvent.InputTuple, DebugEvent.OutputTuple, DebugEvent.OutputObject>;
    filters: {
        "Debug(bytes32)": TypedContractEvent<DebugEvent.InputTuple, DebugEvent.OutputTuple, DebugEvent.OutputObject>;
        Debug: TypedContractEvent<DebugEvent.InputTuple, DebugEvent.OutputTuple, DebugEvent.OutputObject>;
    };
}
//# sourceMappingURL=SHA1.d.ts.map