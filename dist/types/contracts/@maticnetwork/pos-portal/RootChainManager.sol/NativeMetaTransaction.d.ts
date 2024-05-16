import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../common";
export interface NativeMetaTransactionInterface extends Interface {
    getFunction(nameOrSignature: "ERC712_VERSION" | "executeMetaTransaction" | "getChainId" | "getDomainSeperator" | "getNonce"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "MetaTransactionExecuted"): EventFragment;
    encodeFunctionData(functionFragment: "ERC712_VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "executeMetaTransaction", values: [AddressLike, BytesLike, BytesLike, BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getChainId", values?: undefined): string;
    encodeFunctionData(functionFragment: "getDomainSeperator", values?: undefined): string;
    encodeFunctionData(functionFragment: "getNonce", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "ERC712_VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeMetaTransaction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChainId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDomainSeperator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getNonce", data: BytesLike): Result;
}
export declare namespace MetaTransactionExecutedEvent {
    type InputTuple = [
        userAddress: AddressLike,
        relayerAddress: AddressLike,
        functionSignature: BytesLike
    ];
    type OutputTuple = [
        userAddress: string,
        relayerAddress: string,
        functionSignature: string
    ];
    interface OutputObject {
        userAddress: string;
        relayerAddress: string;
        functionSignature: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface NativeMetaTransaction extends BaseContract {
    connect(runner?: ContractRunner | null): NativeMetaTransaction;
    waitForDeployment(): Promise<this>;
    interface: NativeMetaTransactionInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    ERC712_VERSION: TypedContractMethod<[], [string], "view">;
    executeMetaTransaction: TypedContractMethod<[
        userAddress: AddressLike,
        functionSignature: BytesLike,
        sigR: BytesLike,
        sigS: BytesLike,
        sigV: BigNumberish
    ], [
        string
    ], "payable">;
    getChainId: TypedContractMethod<[], [bigint], "view">;
    getDomainSeperator: TypedContractMethod<[], [string], "view">;
    getNonce: TypedContractMethod<[user: AddressLike], [bigint], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "ERC712_VERSION"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "executeMetaTransaction"): TypedContractMethod<[
        userAddress: AddressLike,
        functionSignature: BytesLike,
        sigR: BytesLike,
        sigS: BytesLike,
        sigV: BigNumberish
    ], [
        string
    ], "payable">;
    getFunction(nameOrSignature: "getChainId"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getDomainSeperator"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "getNonce"): TypedContractMethod<[user: AddressLike], [bigint], "view">;
    getEvent(key: "MetaTransactionExecuted"): TypedContractEvent<MetaTransactionExecutedEvent.InputTuple, MetaTransactionExecutedEvent.OutputTuple, MetaTransactionExecutedEvent.OutputObject>;
    filters: {
        "MetaTransactionExecuted(address,address,bytes)": TypedContractEvent<MetaTransactionExecutedEvent.InputTuple, MetaTransactionExecutedEvent.OutputTuple, MetaTransactionExecutedEvent.OutputObject>;
        MetaTransactionExecuted: TypedContractEvent<MetaTransactionExecutedEvent.InputTuple, MetaTransactionExecutedEvent.OutputTuple, MetaTransactionExecutedEvent.OutputObject>;
    };
}
//# sourceMappingURL=NativeMetaTransaction.d.ts.map