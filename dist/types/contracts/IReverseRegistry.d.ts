import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export interface IReverseRegistryInterface extends Interface {
    getFunction(nameOrSignature: "removeReverse" | "reverseNameOf" | "reverseOf" | "setReverse"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "RemoveReverse" | "SetReverse"): EventFragment;
    encodeFunctionData(functionFragment: "removeReverse", values?: undefined): string;
    encodeFunctionData(functionFragment: "reverseNameOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "reverseOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setReverse", values: [string[]]): string;
    decodeFunctionResult(functionFragment: "removeReverse", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reverseNameOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reverseOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setReverse", data: BytesLike): Result;
}
export declare namespace RemoveReverseEvent {
    type InputTuple = [addr: AddressLike];
    type OutputTuple = [addr: string];
    interface OutputObject {
        addr: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SetReverseEvent {
    type InputTuple = [addr: AddressLike, tokenId: BigNumberish];
    type OutputTuple = [addr: string, tokenId: bigint];
    interface OutputObject {
        addr: string;
        tokenId: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IReverseRegistry extends BaseContract {
    connect(runner?: ContractRunner | null): IReverseRegistry;
    waitForDeployment(): Promise<this>;
    interface: IReverseRegistryInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    removeReverse: TypedContractMethod<[], [void], "nonpayable">;
    reverseNameOf: TypedContractMethod<[addr: AddressLike], [string], "view">;
    reverseOf: TypedContractMethod<[addr: AddressLike], [bigint], "view">;
    setReverse: TypedContractMethod<[labels: string[]], [void], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "removeReverse"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "reverseNameOf"): TypedContractMethod<[addr: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "reverseOf"): TypedContractMethod<[addr: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "setReverse"): TypedContractMethod<[labels: string[]], [void], "nonpayable">;
    getEvent(key: "RemoveReverse"): TypedContractEvent<RemoveReverseEvent.InputTuple, RemoveReverseEvent.OutputTuple, RemoveReverseEvent.OutputObject>;
    getEvent(key: "SetReverse"): TypedContractEvent<SetReverseEvent.InputTuple, SetReverseEvent.OutputTuple, SetReverseEvent.OutputObject>;
    filters: {
        "RemoveReverse(address)": TypedContractEvent<RemoveReverseEvent.InputTuple, RemoveReverseEvent.OutputTuple, RemoveReverseEvent.OutputObject>;
        RemoveReverse: TypedContractEvent<RemoveReverseEvent.InputTuple, RemoveReverseEvent.OutputTuple, RemoveReverseEvent.OutputObject>;
        "SetReverse(address,uint256)": TypedContractEvent<SetReverseEvent.InputTuple, SetReverseEvent.OutputTuple, SetReverseEvent.OutputObject>;
        SetReverse: TypedContractEvent<SetReverseEvent.InputTuple, SetReverseEvent.OutputTuple, SetReverseEvent.OutputObject>;
    };
}
//# sourceMappingURL=IReverseRegistry.d.ts.map