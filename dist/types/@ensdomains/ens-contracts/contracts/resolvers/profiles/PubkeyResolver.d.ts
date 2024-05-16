import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../../common";
export interface PubkeyResolverInterface extends Interface {
    getFunction(nameOrSignature: "clearRecords" | "pubkey" | "recordVersions" | "setPubkey" | "supportsInterface"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "PubkeyChanged" | "VersionChanged"): EventFragment;
    encodeFunctionData(functionFragment: "clearRecords", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "pubkey", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "recordVersions", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "setPubkey", values: [BytesLike, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "clearRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pubkey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "recordVersions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPubkey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
}
export declare namespace PubkeyChangedEvent {
    type InputTuple = [node: BytesLike, x: BytesLike, y: BytesLike];
    type OutputTuple = [node: string, x: string, y: string];
    interface OutputObject {
        node: string;
        x: string;
        y: string;
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
export interface PubkeyResolver extends BaseContract {
    connect(runner?: ContractRunner | null): PubkeyResolver;
    waitForDeployment(): Promise<this>;
    interface: PubkeyResolverInterface;
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
    pubkey: TypedContractMethod<[
        node: BytesLike
    ], [
        [string, string] & {
            x: string;
            y: string;
        }
    ], "view">;
    recordVersions: TypedContractMethod<[arg0: BytesLike], [bigint], "view">;
    setPubkey: TypedContractMethod<[
        node: BytesLike,
        x: BytesLike,
        y: BytesLike
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceID: BytesLike
    ], [
        boolean
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "clearRecords"): TypedContractMethod<[node: BytesLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "pubkey"): TypedContractMethod<[
        node: BytesLike
    ], [
        [string, string] & {
            x: string;
            y: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "recordVersions"): TypedContractMethod<[arg0: BytesLike], [bigint], "view">;
    getFunction(nameOrSignature: "setPubkey"): TypedContractMethod<[
        node: BytesLike,
        x: BytesLike,
        y: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceID: BytesLike], [boolean], "view">;
    getEvent(key: "PubkeyChanged"): TypedContractEvent<PubkeyChangedEvent.InputTuple, PubkeyChangedEvent.OutputTuple, PubkeyChangedEvent.OutputObject>;
    getEvent(key: "VersionChanged"): TypedContractEvent<VersionChangedEvent.InputTuple, VersionChangedEvent.OutputTuple, VersionChangedEvent.OutputObject>;
    filters: {
        "PubkeyChanged(bytes32,bytes32,bytes32)": TypedContractEvent<PubkeyChangedEvent.InputTuple, PubkeyChangedEvent.OutputTuple, PubkeyChangedEvent.OutputObject>;
        PubkeyChanged: TypedContractEvent<PubkeyChangedEvent.InputTuple, PubkeyChangedEvent.OutputTuple, PubkeyChangedEvent.OutputObject>;
        "VersionChanged(bytes32,uint64)": TypedContractEvent<VersionChangedEvent.InputTuple, VersionChangedEvent.OutputTuple, VersionChangedEvent.OutputObject>;
        VersionChanged: TypedContractEvent<VersionChangedEvent.InputTuple, VersionChangedEvent.OutputTuple, VersionChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=PubkeyResolver.d.ts.map