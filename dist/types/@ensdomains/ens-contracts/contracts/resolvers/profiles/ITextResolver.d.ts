import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../../common";
export interface ITextResolverInterface extends Interface {
    getFunction(nameOrSignature: "text"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "TextChanged"): EventFragment;
    encodeFunctionData(functionFragment: "text", values: [BytesLike, string]): string;
    decodeFunctionResult(functionFragment: "text", data: BytesLike): Result;
}
export declare namespace TextChangedEvent {
    type InputTuple = [
        node: BytesLike,
        indexedKey: string,
        key: string,
        value: string
    ];
    type OutputTuple = [
        node: string,
        indexedKey: string,
        key: string,
        value: string
    ];
    interface OutputObject {
        node: string;
        indexedKey: string;
        key: string;
        value: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface ITextResolver extends BaseContract {
    connect(runner?: ContractRunner | null): ITextResolver;
    waitForDeployment(): Promise<this>;
    interface: ITextResolverInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    text: TypedContractMethod<[node: BytesLike, key: string], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "text"): TypedContractMethod<[node: BytesLike, key: string], [string], "view">;
    getEvent(key: "TextChanged"): TypedContractEvent<TextChangedEvent.InputTuple, TextChangedEvent.OutputTuple, TextChangedEvent.OutputObject>;
    filters: {
        "TextChanged(bytes32,string,string,string)": TypedContractEvent<TextChangedEvent.InputTuple, TextChangedEvent.OutputTuple, TextChangedEvent.OutputObject>;
        TextChanged: TypedContractEvent<TextChangedEvent.InputTuple, TextChangedEvent.OutputTuple, TextChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=ITextResolver.d.ts.map