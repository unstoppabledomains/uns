import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../../common";
export interface IContentHashResolverInterface extends Interface {
    getFunction(nameOrSignature: "contenthash"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "ContenthashChanged"): EventFragment;
    encodeFunctionData(functionFragment: "contenthash", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "contenthash", data: BytesLike): Result;
}
export declare namespace ContenthashChangedEvent {
    type InputTuple = [node: BytesLike, hash: BytesLike];
    type OutputTuple = [node: string, hash: string];
    interface OutputObject {
        node: string;
        hash: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IContentHashResolver extends BaseContract {
    connect(runner?: ContractRunner | null): IContentHashResolver;
    waitForDeployment(): Promise<this>;
    interface: IContentHashResolverInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    contenthash: TypedContractMethod<[node: BytesLike], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "contenthash"): TypedContractMethod<[node: BytesLike], [string], "view">;
    getEvent(key: "ContenthashChanged"): TypedContractEvent<ContenthashChangedEvent.InputTuple, ContenthashChangedEvent.OutputTuple, ContenthashChangedEvent.OutputObject>;
    filters: {
        "ContenthashChanged(bytes32,bytes)": TypedContractEvent<ContenthashChangedEvent.InputTuple, ContenthashChangedEvent.OutputTuple, ContenthashChangedEvent.OutputObject>;
        ContenthashChanged: TypedContractEvent<ContenthashChangedEvent.InputTuple, ContenthashChangedEvent.OutputTuple, ContenthashChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=IContentHashResolver.d.ts.map