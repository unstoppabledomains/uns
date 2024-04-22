import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
export interface LegacyENSRegistryInterface extends Interface {
    getFunction(nameOrSignature: "owner" | "resolver" | "setOwner" | "setResolver" | "setSubnodeOwner" | "setTTL" | "ttl"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "NewOwner" | "NewResolver" | "NewTTL" | "Transfer"): EventFragment;
    encodeFunctionData(functionFragment: "owner", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "resolver", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "setOwner", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "setResolver", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "setSubnodeOwner", values: [BytesLike, BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "setTTL", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "ttl", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSubnodeOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTTL", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ttl", data: BytesLike): Result;
}
export declare namespace NewOwnerEvent {
    type InputTuple = [
        node: BytesLike,
        label: BytesLike,
        owner: AddressLike
    ];
    type OutputTuple = [node: string, label: string, owner: string];
    interface OutputObject {
        node: string;
        label: string;
        owner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NewResolverEvent {
    type InputTuple = [node: BytesLike, resolver: AddressLike];
    type OutputTuple = [node: string, resolver: string];
    interface OutputObject {
        node: string;
        resolver: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NewTTLEvent {
    type InputTuple = [node: BytesLike, ttl: BigNumberish];
    type OutputTuple = [node: string, ttl: bigint];
    interface OutputObject {
        node: string;
        ttl: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TransferEvent {
    type InputTuple = [node: BytesLike, owner: AddressLike];
    type OutputTuple = [node: string, owner: string];
    interface OutputObject {
        node: string;
        owner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface LegacyENSRegistry extends BaseContract {
    connect(runner?: ContractRunner | null): LegacyENSRegistry;
    waitForDeployment(): Promise<this>;
    interface: LegacyENSRegistryInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    owner: TypedContractMethod<[node: BytesLike], [string], "view">;
    resolver: TypedContractMethod<[node: BytesLike], [string], "view">;
    setOwner: TypedContractMethod<[
        node: BytesLike,
        owner: AddressLike
    ], [
        void
    ], "nonpayable">;
    setResolver: TypedContractMethod<[
        node: BytesLike,
        resolver: AddressLike
    ], [
        void
    ], "nonpayable">;
    setSubnodeOwner: TypedContractMethod<[
        node: BytesLike,
        label: BytesLike,
        owner: AddressLike
    ], [
        void
    ], "nonpayable">;
    setTTL: TypedContractMethod<[
        node: BytesLike,
        ttl: BigNumberish
    ], [
        void
    ], "nonpayable">;
    ttl: TypedContractMethod<[node: BytesLike], [bigint], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[node: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "resolver"): TypedContractMethod<[node: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "setOwner"): TypedContractMethod<[
        node: BytesLike,
        owner: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setResolver"): TypedContractMethod<[
        node: BytesLike,
        resolver: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setSubnodeOwner"): TypedContractMethod<[
        node: BytesLike,
        label: BytesLike,
        owner: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setTTL"): TypedContractMethod<[
        node: BytesLike,
        ttl: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "ttl"): TypedContractMethod<[node: BytesLike], [bigint], "view">;
    getEvent(key: "NewOwner"): TypedContractEvent<NewOwnerEvent.InputTuple, NewOwnerEvent.OutputTuple, NewOwnerEvent.OutputObject>;
    getEvent(key: "NewResolver"): TypedContractEvent<NewResolverEvent.InputTuple, NewResolverEvent.OutputTuple, NewResolverEvent.OutputObject>;
    getEvent(key: "NewTTL"): TypedContractEvent<NewTTLEvent.InputTuple, NewTTLEvent.OutputTuple, NewTTLEvent.OutputObject>;
    getEvent(key: "Transfer"): TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    filters: {
        "NewOwner(bytes32,bytes32,address)": TypedContractEvent<NewOwnerEvent.InputTuple, NewOwnerEvent.OutputTuple, NewOwnerEvent.OutputObject>;
        NewOwner: TypedContractEvent<NewOwnerEvent.InputTuple, NewOwnerEvent.OutputTuple, NewOwnerEvent.OutputObject>;
        "NewResolver(bytes32,address)": TypedContractEvent<NewResolverEvent.InputTuple, NewResolverEvent.OutputTuple, NewResolverEvent.OutputObject>;
        NewResolver: TypedContractEvent<NewResolverEvent.InputTuple, NewResolverEvent.OutputTuple, NewResolverEvent.OutputObject>;
        "NewTTL(bytes32,uint64)": TypedContractEvent<NewTTLEvent.InputTuple, NewTTLEvent.OutputTuple, NewTTLEvent.OutputObject>;
        NewTTL: TypedContractEvent<NewTTLEvent.InputTuple, NewTTLEvent.OutputTuple, NewTTLEvent.OutputObject>;
        "Transfer(bytes32,address)": TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
        Transfer: TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    };
}
//# sourceMappingURL=LegacyENSRegistry.d.ts.map