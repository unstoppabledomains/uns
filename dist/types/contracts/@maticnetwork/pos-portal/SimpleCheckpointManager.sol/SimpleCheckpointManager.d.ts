import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../common";
export interface SimpleCheckpointManagerInterface extends Interface {
    getFunction(nameOrSignature: "currentCheckpointNumber" | "headerBlocks" | "setCheckpoint"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "NewHeaderBlock"): EventFragment;
    encodeFunctionData(functionFragment: "currentCheckpointNumber", values?: undefined): string;
    encodeFunctionData(functionFragment: "headerBlocks", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setCheckpoint", values: [BytesLike, BigNumberish, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "currentCheckpointNumber", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "headerBlocks", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setCheckpoint", data: BytesLike): Result;
}
export declare namespace NewHeaderBlockEvent {
    type InputTuple = [
        proposer: AddressLike,
        headerBlockId: BigNumberish,
        reward: BigNumberish,
        start: BigNumberish,
        end: BigNumberish,
        root: BytesLike
    ];
    type OutputTuple = [
        proposer: string,
        headerBlockId: bigint,
        reward: bigint,
        start: bigint,
        end: bigint,
        root: string
    ];
    interface OutputObject {
        proposer: string;
        headerBlockId: bigint;
        reward: bigint;
        start: bigint;
        end: bigint;
        root: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface SimpleCheckpointManager extends BaseContract {
    connect(runner?: ContractRunner | null): SimpleCheckpointManager;
    waitForDeployment(): Promise<this>;
    interface: SimpleCheckpointManagerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    currentCheckpointNumber: TypedContractMethod<[], [bigint], "view">;
    headerBlocks: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        [
            string,
            bigint,
            bigint,
            bigint,
            string
        ] & {
            root: string;
            start: bigint;
            end: bigint;
            createdAt: bigint;
            proposer: string;
        }
    ], "view">;
    setCheckpoint: TypedContractMethod<[
        rootHash: BytesLike,
        start: BigNumberish,
        end: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "currentCheckpointNumber"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "headerBlocks"): TypedContractMethod<[
        arg0: BigNumberish
    ], [
        [
            string,
            bigint,
            bigint,
            bigint,
            string
        ] & {
            root: string;
            start: bigint;
            end: bigint;
            createdAt: bigint;
            proposer: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "setCheckpoint"): TypedContractMethod<[
        rootHash: BytesLike,
        start: BigNumberish,
        end: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "NewHeaderBlock"): TypedContractEvent<NewHeaderBlockEvent.InputTuple, NewHeaderBlockEvent.OutputTuple, NewHeaderBlockEvent.OutputObject>;
    filters: {
        "NewHeaderBlock(address,uint256,uint256,uint256,uint256,bytes32)": TypedContractEvent<NewHeaderBlockEvent.InputTuple, NewHeaderBlockEvent.OutputTuple, NewHeaderBlockEvent.OutputObject>;
        NewHeaderBlock: TypedContractEvent<NewHeaderBlockEvent.InputTuple, NewHeaderBlockEvent.OutputTuple, NewHeaderBlockEvent.OutputObject>;
    };
}
//# sourceMappingURL=SimpleCheckpointManager.d.ts.map