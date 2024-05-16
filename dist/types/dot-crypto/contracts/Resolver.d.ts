import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface ResolverInterface extends Interface {
    getFunction(nameOrSignature: "get" | "getByHash" | "getMany" | "getManyByHash" | "hashToKey" | "hashesToKeys" | "nonceOf" | "preconfigure" | "reconfigure" | "reconfigureFor" | "registry" | "reset" | "resetFor" | "set" | "setFor" | "setMany" | "setManyFor"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "NewKey" | "ResetRecords" | "Set"): EventFragment;
    encodeFunctionData(functionFragment: "get", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getByHash", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getMany", values: [string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "getManyByHash", values: [BigNumberish[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "hashToKey", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "hashesToKeys", values: [BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "preconfigure", values: [string[], string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "reconfigure", values: [string[], string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "reconfigureFor", values: [string[], string[], BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "registry", values?: undefined): string;
    encodeFunctionData(functionFragment: "reset", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "resetFor", values: [BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "set", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setFor", values: [string, string, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "setMany", values: [string[], string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "setManyFor", values: [string[], string[], BigNumberish, BytesLike]): string;
    decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getManyByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hashToKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hashesToKeys", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "preconfigure", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reconfigure", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reconfigureFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resetFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "set", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setManyFor", data: BytesLike): Result;
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
export interface Resolver extends BaseContract {
    connect(runner?: ContractRunner | null): Resolver;
    waitForDeployment(): Promise<this>;
    interface: ResolverInterface;
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
    hashToKey: TypedContractMethod<[keyHash: BigNumberish], [string], "view">;
    hashesToKeys: TypedContractMethod<[
        hashes: BigNumberish[]
    ], [
        string[]
    ], "view">;
    nonceOf: TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    preconfigure: TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    reconfigure: TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    reconfigureFor: TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    registry: TypedContractMethod<[], [string], "view">;
    reset: TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    resetFor: TypedContractMethod<[
        tokenId: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    set: TypedContractMethod<[
        key: string,
        value: string,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setFor: TypedContractMethod<[
        key: string,
        value: string,
        tokenId: BigNumberish,
        signature: BytesLike
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
    setManyFor: TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish,
        signature: BytesLike
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
    getFunction(nameOrSignature: "hashToKey"): TypedContractMethod<[keyHash: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "hashesToKeys"): TypedContractMethod<[hashes: BigNumberish[]], [string[]], "view">;
    getFunction(nameOrSignature: "nonceOf"): TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "preconfigure"): TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "reconfigure"): TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "reconfigureFor"): TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "registry"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "reset"): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "resetFor"): TypedContractMethod<[
        tokenId: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "set"): TypedContractMethod<[
        key: string,
        value: string,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setFor"): TypedContractMethod<[
        key: string,
        value: string,
        tokenId: BigNumberish,
        signature: BytesLike
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
    getFunction(nameOrSignature: "setManyFor"): TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish,
        signature: BytesLike
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
//# sourceMappingURL=Resolver.d.ts.map