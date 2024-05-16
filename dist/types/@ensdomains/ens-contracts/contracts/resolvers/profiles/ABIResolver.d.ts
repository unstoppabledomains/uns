import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../../common";
export interface ABIResolverInterface extends Interface {
    getFunction(nameOrSignature: "ABI" | "clearRecords" | "recordVersions" | "setABI" | "supportsInterface"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "ABIChanged" | "VersionChanged"): EventFragment;
    encodeFunctionData(functionFragment: "ABI", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "clearRecords", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "recordVersions", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "setABI", values: [BytesLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "ABI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "clearRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "recordVersions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setABI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
}
export declare namespace ABIChangedEvent {
    type InputTuple = [node: BytesLike, contentType: BigNumberish];
    type OutputTuple = [node: string, contentType: bigint];
    interface OutputObject {
        node: string;
        contentType: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
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
export interface ABIResolver extends BaseContract {
    connect(runner?: ContractRunner | null): ABIResolver;
    waitForDeployment(): Promise<this>;
    interface: ABIResolverInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    ABI: TypedContractMethod<[
        node: BytesLike,
        contentTypes: BigNumberish
    ], [
        [bigint, string]
    ], "view">;
    clearRecords: TypedContractMethod<[node: BytesLike], [void], "nonpayable">;
    recordVersions: TypedContractMethod<[arg0: BytesLike], [bigint], "view">;
    setABI: TypedContractMethod<[
        node: BytesLike,
        contentType: BigNumberish,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceID: BytesLike
    ], [
        boolean
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "ABI"): TypedContractMethod<[
        node: BytesLike,
        contentTypes: BigNumberish
    ], [
        [bigint, string]
    ], "view">;
    getFunction(nameOrSignature: "clearRecords"): TypedContractMethod<[node: BytesLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "recordVersions"): TypedContractMethod<[arg0: BytesLike], [bigint], "view">;
    getFunction(nameOrSignature: "setABI"): TypedContractMethod<[
        node: BytesLike,
        contentType: BigNumberish,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceID: BytesLike], [boolean], "view">;
    getEvent(key: "ABIChanged"): TypedContractEvent<ABIChangedEvent.InputTuple, ABIChangedEvent.OutputTuple, ABIChangedEvent.OutputObject>;
    getEvent(key: "VersionChanged"): TypedContractEvent<VersionChangedEvent.InputTuple, VersionChangedEvent.OutputTuple, VersionChangedEvent.OutputObject>;
    filters: {
        "ABIChanged(bytes32,uint256)": TypedContractEvent<ABIChangedEvent.InputTuple, ABIChangedEvent.OutputTuple, ABIChangedEvent.OutputObject>;
        ABIChanged: TypedContractEvent<ABIChangedEvent.InputTuple, ABIChangedEvent.OutputTuple, ABIChangedEvent.OutputObject>;
        "VersionChanged(bytes32,uint64)": TypedContractEvent<VersionChangedEvent.InputTuple, VersionChangedEvent.OutputTuple, VersionChangedEvent.OutputObject>;
        VersionChanged: TypedContractEvent<VersionChangedEvent.InputTuple, VersionChangedEvent.OutputTuple, VersionChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=ABIResolver.d.ts.map