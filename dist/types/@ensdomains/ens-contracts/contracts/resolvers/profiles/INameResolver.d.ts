import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../../common";
export interface INameResolverInterface extends Interface {
    getFunction(nameOrSignature: "name"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "NameChanged"): EventFragment;
    encodeFunctionData(functionFragment: "name", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
}
export declare namespace NameChangedEvent {
    type InputTuple = [node: BytesLike, name: string];
    type OutputTuple = [node: string, name: string];
    interface OutputObject {
        node: string;
        name: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface INameResolver extends BaseContract {
    connect(runner?: ContractRunner | null): INameResolver;
    waitForDeployment(): Promise<this>;
    interface: INameResolverInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    name: TypedContractMethod<[node: BytesLike], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[node: BytesLike], [string], "view">;
    getEvent(key: "NameChanged"): TypedContractEvent<NameChangedEvent.InputTuple, NameChangedEvent.OutputTuple, NameChangedEvent.OutputObject>;
    filters: {
        "NameChanged(bytes32,string)": TypedContractEvent<NameChangedEvent.InputTuple, NameChangedEvent.OutputTuple, NameChangedEvent.OutputObject>;
        NameChanged: TypedContractEvent<NameChangedEvent.InputTuple, NameChangedEvent.OutputTuple, NameChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=INameResolver.d.ts.map