import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export declare namespace ISmartAccount {
    type CallStruct = {
        target: AddressLike;
        data: BytesLike;
        value: BigNumberish;
    };
    type CallStructOutput = [
        target: string,
        data: string,
        value: bigint
    ] & {
        target: string;
        data: string;
        value: bigint;
    };
}
export interface WorkerInterface extends Interface {
    getFunction(nameOrSignature: "VERSION" | "executeBatch" | "executeBatchAndEnsureBalance" | "faucet"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "InternalCallFailed"): EventFragment;
    encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "executeBatch", values: [ISmartAccount.CallStruct[], boolean]): string;
    encodeFunctionData(functionFragment: "executeBatchAndEnsureBalance", values: [ISmartAccount.CallStruct[], boolean]): string;
    encodeFunctionData(functionFragment: "faucet", values?: undefined): string;
    decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeBatch", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeBatchAndEnsureBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "faucet", data: BytesLike): Result;
}
export declare namespace InternalCallFailedEvent {
    type InputTuple = [callIndex: BigNumberish, returnData: BytesLike];
    type OutputTuple = [callIndex: bigint, returnData: string];
    interface OutputObject {
        callIndex: bigint;
        returnData: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface Worker extends BaseContract {
    connect(runner?: ContractRunner | null): Worker;
    waitForDeployment(): Promise<this>;
    interface: WorkerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    VERSION: TypedContractMethod<[], [string], "view">;
    executeBatch: TypedContractMethod<[
        calls: ISmartAccount.CallStruct[],
        revertOnError: boolean
    ], [
        void
    ], "payable">;
    executeBatchAndEnsureBalance: TypedContractMethod<[
        calls: ISmartAccount.CallStruct[],
        revertOnError: boolean
    ], [
        void
    ], "payable">;
    faucet: TypedContractMethod<[], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "VERSION"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "executeBatch"): TypedContractMethod<[
        calls: ISmartAccount.CallStruct[],
        revertOnError: boolean
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "executeBatchAndEnsureBalance"): TypedContractMethod<[
        calls: ISmartAccount.CallStruct[],
        revertOnError: boolean
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "faucet"): TypedContractMethod<[], [string], "view">;
    getEvent(key: "InternalCallFailed"): TypedContractEvent<InternalCallFailedEvent.InputTuple, InternalCallFailedEvent.OutputTuple, InternalCallFailedEvent.OutputObject>;
    filters: {
        "InternalCallFailed(uint256,bytes)": TypedContractEvent<InternalCallFailedEvent.InputTuple, InternalCallFailedEvent.OutputTuple, InternalCallFailedEvent.OutputObject>;
        InternalCallFailed: TypedContractEvent<InternalCallFailedEvent.InputTuple, InternalCallFailedEvent.OutputTuple, InternalCallFailedEvent.OutputObject>;
    };
}
//# sourceMappingURL=Worker.d.ts.map