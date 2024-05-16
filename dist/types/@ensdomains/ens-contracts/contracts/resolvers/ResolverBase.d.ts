import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../common";
export interface ResolverBaseInterface extends Interface {
    getFunction(nameOrSignature: "clearRecords" | "recordVersions" | "supportsInterface"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "VersionChanged"): EventFragment;
    encodeFunctionData(functionFragment: "clearRecords", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "recordVersions", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "clearRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "recordVersions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
}
export declare namespace VersionChangedEvent {
    type InputTuple = [node: BytesLike, newVersion: BigNumberish];
    type OutputTuple = [node: string, newVersion: bigint];
    interface OutputObject {
        node: string;
        newVersion: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface ResolverBase extends BaseContract {
    connect(runner?: ContractRunner | null): ResolverBase;
    waitForDeployment(): Promise<this>;
    interface: ResolverBaseInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    clearRecords: TypedContractMethod<[node: BytesLike], [void], "nonpayable">;
    recordVersions: TypedContractMethod<[arg0: BytesLike], [bigint], "view">;
    supportsInterface: TypedContractMethod<[
        interfaceID: BytesLike
    ], [
        boolean
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "clearRecords"): TypedContractMethod<[node: BytesLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "recordVersions"): TypedContractMethod<[arg0: BytesLike], [bigint], "view">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceID: BytesLike], [boolean], "view">;
    getEvent(key: "VersionChanged"): TypedContractEvent<VersionChangedEvent.InputTuple, VersionChangedEvent.OutputTuple, VersionChangedEvent.OutputObject>;
    filters: {
        "VersionChanged(bytes32,uint64)": TypedContractEvent<VersionChangedEvent.InputTuple, VersionChangedEvent.OutputTuple, VersionChangedEvent.OutputObject>;
        VersionChanged: TypedContractEvent<VersionChangedEvent.InputTuple, VersionChangedEvent.OutputTuple, VersionChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=ResolverBase.d.ts.map