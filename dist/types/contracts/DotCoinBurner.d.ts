import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export interface DotCoinBurnerInterface extends Interface {
    getFunction(nameOrSignature: "burnAll"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "BatchCompleted"): EventFragment;
    encodeFunctionData(functionFragment: "burnAll", values: [BigNumberish[]]): string;
    decodeFunctionResult(functionFragment: "burnAll", data: BytesLike): Result;
}
export declare namespace BatchCompletedEvent {
    type InputTuple = [first: BigNumberish, last: BigNumberish];
    type OutputTuple = [first: bigint, last: bigint];
    interface OutputObject {
        first: bigint;
        last: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface DotCoinBurner extends BaseContract {
    connect(runner?: ContractRunner | null): DotCoinBurner;
    waitForDeployment(): Promise<this>;
    interface: DotCoinBurnerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    burnAll: TypedContractMethod<[
        labelHashes: BigNumberish[]
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "burnAll"): TypedContractMethod<[labelHashes: BigNumberish[]], [void], "nonpayable">;
    getEvent(key: "BatchCompleted"): TypedContractEvent<BatchCompletedEvent.InputTuple, BatchCompletedEvent.OutputTuple, BatchCompletedEvent.OutputObject>;
    filters: {
        "BatchCompleted(uint256,uint256)": TypedContractEvent<BatchCompletedEvent.InputTuple, BatchCompletedEvent.OutputTuple, BatchCompletedEvent.OutputObject>;
        BatchCompleted: TypedContractEvent<BatchCompletedEvent.InputTuple, BatchCompletedEvent.OutputTuple, BatchCompletedEvent.OutputObject>;
    };
}
//# sourceMappingURL=DotCoinBurner.d.ts.map