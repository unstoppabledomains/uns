import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../common";
export interface IRootChainManagerInterface extends Interface {
    getFunction(nameOrSignature: "cleanMapToken" | "depositEtherFor" | "depositFor" | "exit" | "mapToken" | "registerPredicate" | "remapToken"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "PredicateRegistered" | "TokenMapped"): EventFragment;
    encodeFunctionData(functionFragment: "cleanMapToken", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "depositEtherFor", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "depositFor", values: [AddressLike, AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "exit", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "mapToken", values: [AddressLike, AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "registerPredicate", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "remapToken", values: [AddressLike, AddressLike, BytesLike]): string;
    decodeFunctionResult(functionFragment: "cleanMapToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositEtherFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mapToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerPredicate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "remapToken", data: BytesLike): Result;
}
export declare namespace PredicateRegisteredEvent {
    type InputTuple = [
        tokenType: BytesLike,
        predicateAddress: AddressLike
    ];
    type OutputTuple = [tokenType: string, predicateAddress: string];
    interface OutputObject {
        tokenType: string;
        predicateAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TokenMappedEvent {
    type InputTuple = [
        rootToken: AddressLike,
        childToken: AddressLike,
        tokenType: BytesLike
    ];
    type OutputTuple = [
        rootToken: string,
        childToken: string,
        tokenType: string
    ];
    interface OutputObject {
        rootToken: string;
        childToken: string;
        tokenType: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IRootChainManager extends BaseContract {
    connect(runner?: ContractRunner | null): IRootChainManager;
    waitForDeployment(): Promise<this>;
    interface: IRootChainManagerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    cleanMapToken: TypedContractMethod<[
        rootToken: AddressLike,
        childToken: AddressLike
    ], [
        void
    ], "nonpayable">;
    depositEtherFor: TypedContractMethod<[user: AddressLike], [void], "payable">;
    depositFor: TypedContractMethod<[
        user: AddressLike,
        rootToken: AddressLike,
        depositData: BytesLike
    ], [
        void
    ], "nonpayable">;
    exit: TypedContractMethod<[inputData: BytesLike], [void], "nonpayable">;
    mapToken: TypedContractMethod<[
        rootToken: AddressLike,
        childToken: AddressLike,
        tokenType: BytesLike
    ], [
        void
    ], "nonpayable">;
    registerPredicate: TypedContractMethod<[
        tokenType: BytesLike,
        predicateAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
    remapToken: TypedContractMethod<[
        rootToken: AddressLike,
        childToken: AddressLike,
        tokenType: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "cleanMapToken"): TypedContractMethod<[
        rootToken: AddressLike,
        childToken: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "depositEtherFor"): TypedContractMethod<[user: AddressLike], [void], "payable">;
    getFunction(nameOrSignature: "depositFor"): TypedContractMethod<[
        user: AddressLike,
        rootToken: AddressLike,
        depositData: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "exit"): TypedContractMethod<[inputData: BytesLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "mapToken"): TypedContractMethod<[
        rootToken: AddressLike,
        childToken: AddressLike,
        tokenType: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "registerPredicate"): TypedContractMethod<[
        tokenType: BytesLike,
        predicateAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "remapToken"): TypedContractMethod<[
        rootToken: AddressLike,
        childToken: AddressLike,
        tokenType: BytesLike
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "PredicateRegistered"): TypedContractEvent<PredicateRegisteredEvent.InputTuple, PredicateRegisteredEvent.OutputTuple, PredicateRegisteredEvent.OutputObject>;
    getEvent(key: "TokenMapped"): TypedContractEvent<TokenMappedEvent.InputTuple, TokenMappedEvent.OutputTuple, TokenMappedEvent.OutputObject>;
    filters: {
        "PredicateRegistered(bytes32,address)": TypedContractEvent<PredicateRegisteredEvent.InputTuple, PredicateRegisteredEvent.OutputTuple, PredicateRegisteredEvent.OutputObject>;
        PredicateRegistered: TypedContractEvent<PredicateRegisteredEvent.InputTuple, PredicateRegisteredEvent.OutputTuple, PredicateRegisteredEvent.OutputObject>;
        "TokenMapped(address,address,bytes32)": TypedContractEvent<TokenMappedEvent.InputTuple, TokenMappedEvent.OutputTuple, TokenMappedEvent.OutputObject>;
        TokenMapped: TypedContractEvent<TokenMappedEvent.InputTuple, TokenMappedEvent.OutputTuple, TokenMappedEvent.OutputObject>;
    };
}
//# sourceMappingURL=IRootChainManager.d.ts.map