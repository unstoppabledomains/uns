import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../common";
export interface RootInterface extends Interface {
    getFunction(nameOrSignature: "controllers" | "ens" | "lock" | "locked" | "owner" | "renounceOwnership" | "setController" | "setResolver" | "setSubnodeOwner" | "supportsInterface" | "transferOwnership"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "ControllerChanged" | "OwnershipTransferred" | "TLDLocked"): EventFragment;
    encodeFunctionData(functionFragment: "controllers", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "ens", values?: undefined): string;
    encodeFunctionData(functionFragment: "lock", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "locked", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "setController", values: [AddressLike, boolean]): string;
    encodeFunctionData(functionFragment: "setResolver", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setSubnodeOwner", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "controllers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lock", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "locked", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setController", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSubnodeOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
}
export declare namespace ControllerChangedEvent {
    type InputTuple = [controller: AddressLike, enabled: boolean];
    type OutputTuple = [controller: string, enabled: boolean];
    interface OutputObject {
        controller: string;
        enabled: boolean;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OwnershipTransferredEvent {
    type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
    type OutputTuple = [previousOwner: string, newOwner: string];
    interface OutputObject {
        previousOwner: string;
        newOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TLDLockedEvent {
    type InputTuple = [label: BytesLike];
    type OutputTuple = [label: string];
    interface OutputObject {
        label: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface Root extends BaseContract {
    connect(runner?: ContractRunner | null): Root;
    waitForDeployment(): Promise<this>;
    interface: RootInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    controllers: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
    ens: TypedContractMethod<[], [string], "view">;
    lock: TypedContractMethod<[label: BytesLike], [void], "nonpayable">;
    locked: TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    setController: TypedContractMethod<[
        controller: AddressLike,
        enabled: boolean
    ], [
        void
    ], "nonpayable">;
    setResolver: TypedContractMethod<[
        resolver: AddressLike
    ], [
        void
    ], "nonpayable">;
    setSubnodeOwner: TypedContractMethod<[
        label: BytesLike,
        owner: AddressLike
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceID: BytesLike
    ], [
        boolean
    ], "view">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "controllers"): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "ens"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "lock"): TypedContractMethod<[label: BytesLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "locked"): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "setController"): TypedContractMethod<[
        controller: AddressLike,
        enabled: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setResolver"): TypedContractMethod<[resolver: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "setSubnodeOwner"): TypedContractMethod<[
        label: BytesLike,
        owner: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceID: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getEvent(key: "ControllerChanged"): TypedContractEvent<ControllerChangedEvent.InputTuple, ControllerChangedEvent.OutputTuple, ControllerChangedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "TLDLocked"): TypedContractEvent<TLDLockedEvent.InputTuple, TLDLockedEvent.OutputTuple, TLDLockedEvent.OutputObject>;
    filters: {
        "ControllerChanged(address,bool)": TypedContractEvent<ControllerChangedEvent.InputTuple, ControllerChangedEvent.OutputTuple, ControllerChangedEvent.OutputObject>;
        ControllerChanged: TypedContractEvent<ControllerChangedEvent.InputTuple, ControllerChangedEvent.OutputTuple, ControllerChangedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "TLDLocked(bytes32)": TypedContractEvent<TLDLockedEvent.InputTuple, TLDLockedEvent.OutputTuple, TLDLockedEvent.OutputObject>;
        TLDLocked: TypedContractEvent<TLDLockedEvent.InputTuple, TLDLockedEvent.OutputTuple, TLDLockedEvent.OutputObject>;
    };
}
//# sourceMappingURL=Root.d.ts.map