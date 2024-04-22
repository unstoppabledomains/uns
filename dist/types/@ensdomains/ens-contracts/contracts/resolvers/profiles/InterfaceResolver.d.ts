import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../../common";
export interface InterfaceResolverInterface extends Interface {
    getFunction(nameOrSignature: "addr(bytes32)" | "addr(bytes32,uint256)" | "clearRecords" | "interfaceImplementer" | "recordVersions" | "setAddr(bytes32,uint256,bytes)" | "setAddr(bytes32,address)" | "setInterface" | "supportsInterface"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AddrChanged" | "AddressChanged" | "InterfaceChanged" | "VersionChanged"): EventFragment;
    encodeFunctionData(functionFragment: "addr(bytes32)", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "addr(bytes32,uint256)", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "clearRecords", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "interfaceImplementer", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "recordVersions", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "setAddr(bytes32,uint256,bytes)", values: [BytesLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "setAddr(bytes32,address)", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "setInterface", values: [BytesLike, BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "addr(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addr(bytes32,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "clearRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "interfaceImplementer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "recordVersions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setAddr(bytes32,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setAddr(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
}
export declare namespace AddrChangedEvent {
    type InputTuple = [node: BytesLike, a: AddressLike];
    type OutputTuple = [node: string, a: string];
    interface OutputObject {
        node: string;
        a: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace AddressChangedEvent {
    type InputTuple = [
        node: BytesLike,
        coinType: BigNumberish,
        newAddress: BytesLike
    ];
    type OutputTuple = [
        node: string,
        coinType: bigint,
        newAddress: string
    ];
    interface OutputObject {
        node: string;
        coinType: bigint;
        newAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace InterfaceChangedEvent {
    type InputTuple = [
        node: BytesLike,
        interfaceID: BytesLike,
        implementer: AddressLike
    ];
    type OutputTuple = [
        node: string,
        interfaceID: string,
        implementer: string
    ];
    interface OutputObject {
        node: string;
        interfaceID: string;
        implementer: string;
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
export interface InterfaceResolver extends BaseContract {
    connect(runner?: ContractRunner | null): InterfaceResolver;
    waitForDeployment(): Promise<this>;
    interface: InterfaceResolverInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    "addr(bytes32)": TypedContractMethod<[node: BytesLike], [string], "view">;
    "addr(bytes32,uint256)": TypedContractMethod<[
        node: BytesLike,
        coinType: BigNumberish
    ], [
        string
    ], "view">;
    clearRecords: TypedContractMethod<[node: BytesLike], [void], "nonpayable">;
    interfaceImplementer: TypedContractMethod<[
        node: BytesLike,
        interfaceID: BytesLike
    ], [
        string
    ], "view">;
    recordVersions: TypedContractMethod<[arg0: BytesLike], [bigint], "view">;
    "setAddr(bytes32,uint256,bytes)": TypedContractMethod<[
        node: BytesLike,
        coinType: BigNumberish,
        a: BytesLike
    ], [
        void
    ], "nonpayable">;
    "setAddr(bytes32,address)": TypedContractMethod<[
        node: BytesLike,
        a: AddressLike
    ], [
        void
    ], "nonpayable">;
    setInterface: TypedContractMethod<[
        node: BytesLike,
        interfaceID: BytesLike,
        implementer: AddressLike
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceID: BytesLike
    ], [
        boolean
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addr(bytes32)"): TypedContractMethod<[node: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "addr(bytes32,uint256)"): TypedContractMethod<[
        node: BytesLike,
        coinType: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "clearRecords"): TypedContractMethod<[node: BytesLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "interfaceImplementer"): TypedContractMethod<[
        node: BytesLike,
        interfaceID: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "recordVersions"): TypedContractMethod<[arg0: BytesLike], [bigint], "view">;
    getFunction(nameOrSignature: "setAddr(bytes32,uint256,bytes)"): TypedContractMethod<[
        node: BytesLike,
        coinType: BigNumberish,
        a: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setAddr(bytes32,address)"): TypedContractMethod<[
        node: BytesLike,
        a: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setInterface"): TypedContractMethod<[
        node: BytesLike,
        interfaceID: BytesLike,
        implementer: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceID: BytesLike], [boolean], "view">;
    getEvent(key: "AddrChanged"): TypedContractEvent<AddrChangedEvent.InputTuple, AddrChangedEvent.OutputTuple, AddrChangedEvent.OutputObject>;
    getEvent(key: "AddressChanged"): TypedContractEvent<AddressChangedEvent.InputTuple, AddressChangedEvent.OutputTuple, AddressChangedEvent.OutputObject>;
    getEvent(key: "InterfaceChanged"): TypedContractEvent<InterfaceChangedEvent.InputTuple, InterfaceChangedEvent.OutputTuple, InterfaceChangedEvent.OutputObject>;
    getEvent(key: "VersionChanged"): TypedContractEvent<VersionChangedEvent.InputTuple, VersionChangedEvent.OutputTuple, VersionChangedEvent.OutputObject>;
    filters: {
        "AddrChanged(bytes32,address)": TypedContractEvent<AddrChangedEvent.InputTuple, AddrChangedEvent.OutputTuple, AddrChangedEvent.OutputObject>;
        AddrChanged: TypedContractEvent<AddrChangedEvent.InputTuple, AddrChangedEvent.OutputTuple, AddrChangedEvent.OutputObject>;
        "AddressChanged(bytes32,uint256,bytes)": TypedContractEvent<AddressChangedEvent.InputTuple, AddressChangedEvent.OutputTuple, AddressChangedEvent.OutputObject>;
        AddressChanged: TypedContractEvent<AddressChangedEvent.InputTuple, AddressChangedEvent.OutputTuple, AddressChangedEvent.OutputObject>;
        "InterfaceChanged(bytes32,bytes4,address)": TypedContractEvent<InterfaceChangedEvent.InputTuple, InterfaceChangedEvent.OutputTuple, InterfaceChangedEvent.OutputObject>;
        InterfaceChanged: TypedContractEvent<InterfaceChangedEvent.InputTuple, InterfaceChangedEvent.OutputTuple, InterfaceChangedEvent.OutputObject>;
        "VersionChanged(bytes32,uint64)": TypedContractEvent<VersionChangedEvent.InputTuple, VersionChangedEvent.OutputTuple, VersionChangedEvent.OutputObject>;
        VersionChanged: TypedContractEvent<VersionChangedEvent.InputTuple, VersionChangedEvent.OutputTuple, VersionChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=InterfaceResolver.d.ts.map