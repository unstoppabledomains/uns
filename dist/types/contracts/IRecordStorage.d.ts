import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export interface IRecordStorageInterface extends Interface {
    getFunction(nameOrSignature: "get" | "getByHash" | "getMany" | "getManyByHash" | "reconfigure" | "reset" | "set" | "setByHash" | "setMany" | "setManyByHash"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "NewKey" | "ResetRecords" | "Set"): EventFragment;
    encodeFunctionData(functionFragment: "get", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getByHash", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getMany", values: [string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "getManyByHash", values: [BigNumberish[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "reconfigure", values: [string[], string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "reset", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "set", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setByHash", values: [BigNumberish, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setMany", values: [string[], string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "setManyByHash", values: [BigNumberish[], string[], BigNumberish]): string;
    decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getManyByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reconfigure", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "set", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setManyByHash", data: BytesLike): Result;
}
export declare namespace NewKeyEvent {
    type InputTuple = [
        tokenId: BigNumberish,
        keyIndex: string,
        key: string
    ];
    type OutputTuple = [tokenId: bigint, keyIndex: string, key: string];
    interface OutputObject {
        tokenId: bigint;
        keyIndex: string;
        key: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ResetRecordsEvent {
    type InputTuple = [tokenId: BigNumberish];
    type OutputTuple = [tokenId: bigint];
    interface OutputObject {
        tokenId: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SetEvent {
    type InputTuple = [
        tokenId: BigNumberish,
        keyIndex: string,
        valueIndex: string,
        key: string,
        value: string
    ];
    type OutputTuple = [
        tokenId: bigint,
        keyIndex: string,
        valueIndex: string,
        key: string,
        value: string
    ];
    interface OutputObject {
        tokenId: bigint;
        keyIndex: string;
        valueIndex: string;
        key: string;
        value: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IRecordStorage extends BaseContract {
    connect(runner?: ContractRunner | null): IRecordStorage;
    waitForDeployment(): Promise<this>;
    interface: IRecordStorageInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    get: TypedContractMethod<[
        key: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getByHash: TypedContractMethod<[
        keyHash: BigNumberish,
        tokenId: BigNumberish
    ], [
        [string, string] & {
            key: string;
            value: string;
        }
    ], "view">;
    getMany: TypedContractMethod<[
        keys: string[],
        tokenId: BigNumberish
    ], [
        string[]
    ], "view">;
    getManyByHash: TypedContractMethod<[
        keyHashes: BigNumberish[],
        tokenId: BigNumberish
    ], [
        [string[], string[]] & {
            keys: string[];
            values: string[];
        }
    ], "view">;
    reconfigure: TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    reset: TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    set: TypedContractMethod<[
        key: string,
        value: string,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setByHash: TypedContractMethod<[
        keyHash: BigNumberish,
        value: string,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setMany: TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setManyByHash: TypedContractMethod<[
        keyHashes: BigNumberish[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "get"): TypedContractMethod<[
        key: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "getByHash"): TypedContractMethod<[
        keyHash: BigNumberish,
        tokenId: BigNumberish
    ], [
        [string, string] & {
            key: string;
            value: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "getMany"): TypedContractMethod<[
        keys: string[],
        tokenId: BigNumberish
    ], [
        string[]
    ], "view">;
    getFunction(nameOrSignature: "getManyByHash"): TypedContractMethod<[
        keyHashes: BigNumberish[],
        tokenId: BigNumberish
    ], [
        [string[], string[]] & {
            keys: string[];
            values: string[];
        }
    ], "view">;
    getFunction(nameOrSignature: "reconfigure"): TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "reset"): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "set"): TypedContractMethod<[
        key: string,
        value: string,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setByHash"): TypedContractMethod<[
        keyHash: BigNumberish,
        value: string,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setMany"): TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setManyByHash"): TypedContractMethod<[
        keyHashes: BigNumberish[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "NewKey"): TypedContractEvent<NewKeyEvent.InputTuple, NewKeyEvent.OutputTuple, NewKeyEvent.OutputObject>;
    getEvent(key: "ResetRecords"): TypedContractEvent<ResetRecordsEvent.InputTuple, ResetRecordsEvent.OutputTuple, ResetRecordsEvent.OutputObject>;
    getEvent(key: "Set"): TypedContractEvent<SetEvent.InputTuple, SetEvent.OutputTuple, SetEvent.OutputObject>;
    filters: {
        "NewKey(uint256,string,string)": TypedContractEvent<NewKeyEvent.InputTuple, NewKeyEvent.OutputTuple, NewKeyEvent.OutputObject>;
        NewKey: TypedContractEvent<NewKeyEvent.InputTuple, NewKeyEvent.OutputTuple, NewKeyEvent.OutputObject>;
        "ResetRecords(uint256)": TypedContractEvent<ResetRecordsEvent.InputTuple, ResetRecordsEvent.OutputTuple, ResetRecordsEvent.OutputObject>;
        ResetRecords: TypedContractEvent<ResetRecordsEvent.InputTuple, ResetRecordsEvent.OutputTuple, ResetRecordsEvent.OutputObject>;
        "Set(uint256,string,string,string,string)": TypedContractEvent<SetEvent.InputTuple, SetEvent.OutputTuple, SetEvent.OutputObject>;
        Set: TypedContractEvent<SetEvent.InputTuple, SetEvent.OutputTuple, SetEvent.OutputObject>;
    };
}
//# sourceMappingURL=IRecordStorage.d.ts.map