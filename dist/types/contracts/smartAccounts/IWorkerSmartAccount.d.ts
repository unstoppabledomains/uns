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
export interface IWorkerSmartAccountInterface extends Interface {
    getFunction(nameOrSignature: "executeBatch" | "executeBatchAndEnsureBalance"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "InternalCallFailed"): EventFragment;
    encodeFunctionData(functionFragment: "executeBatch", values: [ISmartAccount.CallStruct[], boolean]): string;
    encodeFunctionData(functionFragment: "executeBatchAndEnsureBalance", values: [ISmartAccount.CallStruct[], boolean]): string;
    decodeFunctionResult(functionFragment: "executeBatch", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeBatchAndEnsureBalance", data: BytesLike): Result;
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
export interface IWorkerSmartAccount extends BaseContract {
    connect(runner?: ContractRunner | null): IWorkerSmartAccount;
    waitForDeployment(): Promise<this>;
    interface: IWorkerSmartAccountInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
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
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
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
    getEvent(key: "InternalCallFailed"): TypedContractEvent<InternalCallFailedEvent.InputTuple, InternalCallFailedEvent.OutputTuple, InternalCallFailedEvent.OutputObject>;
    filters: {
        "InternalCallFailed(uint256,bytes)": TypedContractEvent<InternalCallFailedEvent.InputTuple, InternalCallFailedEvent.OutputTuple, InternalCallFailedEvent.OutputObject>;
        InternalCallFailed: TypedContractEvent<InternalCallFailedEvent.InputTuple, InternalCallFailedEvent.OutputTuple, InternalCallFailedEvent.OutputObject>;
    };
}
//# sourceMappingURL=IWorkerSmartAccount.d.ts.map