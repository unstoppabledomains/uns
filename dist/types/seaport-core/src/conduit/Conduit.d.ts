import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
export declare type ConduitTransferStruct = {
    itemType: BigNumberish;
    token: AddressLike;
    from: AddressLike;
    to: AddressLike;
    identifier: BigNumberish;
    amount: BigNumberish;
};
export declare type ConduitTransferStructOutput = [
    itemType: bigint,
    token: string,
    from: string,
    to: string,
    identifier: bigint,
    amount: bigint
] & {
    itemType: bigint;
    token: string;
    from: string;
    to: string;
    identifier: bigint;
    amount: bigint;
};
export declare type ConduitBatch1155TransferStruct = {
    token: AddressLike;
    from: AddressLike;
    to: AddressLike;
    ids: BigNumberish[];
    amounts: BigNumberish[];
};
export declare type ConduitBatch1155TransferStructOutput = [
    token: string,
    from: string,
    to: string,
    ids: bigint[],
    amounts: bigint[]
] & {
    token: string;
    from: string;
    to: string;
    ids: bigint[];
    amounts: bigint[];
};
export interface ConduitInterface extends Interface {
    getFunction(nameOrSignature: "execute" | "executeBatch1155" | "executeWithBatch1155" | "updateChannel"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "ChannelUpdated"): EventFragment;
    encodeFunctionData(functionFragment: "execute", values: [ConduitTransferStruct[]]): string;
    encodeFunctionData(functionFragment: "executeBatch1155", values: [ConduitBatch1155TransferStruct[]]): string;
    encodeFunctionData(functionFragment: "executeWithBatch1155", values: [ConduitTransferStruct[], ConduitBatch1155TransferStruct[]]): string;
    encodeFunctionData(functionFragment: "updateChannel", values: [AddressLike, boolean]): string;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeBatch1155", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeWithBatch1155", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateChannel", data: BytesLike): Result;
}
export declare namespace ChannelUpdatedEvent {
    type InputTuple = [channel: AddressLike, open: boolean];
    type OutputTuple = [channel: string, open: boolean];
    interface OutputObject {
        channel: string;
        open: boolean;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface Conduit extends BaseContract {
    connect(runner?: ContractRunner | null): Conduit;
    waitForDeployment(): Promise<this>;
    interface: ConduitInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    execute: TypedContractMethod<[
        transfers: ConduitTransferStruct[]
    ], [
        string
    ], "nonpayable">;
    executeBatch1155: TypedContractMethod<[
        batchTransfers: ConduitBatch1155TransferStruct[]
    ], [
        string
    ], "nonpayable">;
    executeWithBatch1155: TypedContractMethod<[
        standardTransfers: ConduitTransferStruct[],
        batchTransfers: ConduitBatch1155TransferStruct[]
    ], [
        string
    ], "nonpayable">;
    updateChannel: TypedContractMethod<[
        channel: AddressLike,
        isOpen: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "execute"): TypedContractMethod<[
        transfers: ConduitTransferStruct[]
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "executeBatch1155"): TypedContractMethod<[
        batchTransfers: ConduitBatch1155TransferStruct[]
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "executeWithBatch1155"): TypedContractMethod<[
        standardTransfers: ConduitTransferStruct[],
        batchTransfers: ConduitBatch1155TransferStruct[]
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "updateChannel"): TypedContractMethod<[
        channel: AddressLike,
        isOpen: boolean
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "ChannelUpdated"): TypedContractEvent<ChannelUpdatedEvent.InputTuple, ChannelUpdatedEvent.OutputTuple, ChannelUpdatedEvent.OutputObject>;
    filters: {
        "ChannelUpdated(address,bool)": TypedContractEvent<ChannelUpdatedEvent.InputTuple, ChannelUpdatedEvent.OutputTuple, ChannelUpdatedEvent.OutputObject>;
        ChannelUpdated: TypedContractEvent<ChannelUpdatedEvent.InputTuple, ChannelUpdatedEvent.OutputTuple, ChannelUpdatedEvent.OutputObject>;
    };
}
//# sourceMappingURL=Conduit.d.ts.map