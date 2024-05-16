import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../../common";
export interface ReverseRegistrarInterface extends Interface {
    getFunction(nameOrSignature: "claim" | "claimForAddr" | "claimWithResolver" | "controllers" | "defaultResolver" | "ens" | "node" | "owner" | "renounceOwnership" | "setController" | "setDefaultResolver" | "setName" | "setNameForAddr" | "transferOwnership"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "ControllerChanged" | "DefaultResolverChanged" | "OwnershipTransferred" | "ReverseClaimed"): EventFragment;
    encodeFunctionData(functionFragment: "claim", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "claimForAddr", values: [AddressLike, AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "claimWithResolver", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "controllers", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "defaultResolver", values?: undefined): string;
    encodeFunctionData(functionFragment: "ens", values?: undefined): string;
    encodeFunctionData(functionFragment: "node", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "setController", values: [AddressLike, boolean]): string;
    encodeFunctionData(functionFragment: "setDefaultResolver", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setName", values: [string]): string;
    encodeFunctionData(functionFragment: "setNameForAddr", values: [AddressLike, AddressLike, AddressLike, string]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimForAddr", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimWithResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "controllers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "defaultResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "node", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setController", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDefaultResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setNameForAddr", data: BytesLike): Result;
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
export declare namespace DefaultResolverChangedEvent {
    type InputTuple = [resolver: AddressLike];
    type OutputTuple = [resolver: string];
    interface OutputObject {
        resolver: string;
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
export declare namespace ReverseClaimedEvent {
    type InputTuple = [addr: AddressLike, node: BytesLike];
    type OutputTuple = [addr: string, node: string];
    interface OutputObject {
        addr: string;
        node: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface ReverseRegistrar extends BaseContract {
    connect(runner?: ContractRunner | null): ReverseRegistrar;
    waitForDeployment(): Promise<this>;
    interface: ReverseRegistrarInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    claim: TypedContractMethod<[owner: AddressLike], [string], "nonpayable">;
    claimForAddr: TypedContractMethod<[
        addr: AddressLike,
        owner: AddressLike,
        resolver: AddressLike
    ], [
        string
    ], "nonpayable">;
    claimWithResolver: TypedContractMethod<[
        owner: AddressLike,
        resolver: AddressLike
    ], [
        string
    ], "nonpayable">;
    controllers: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
    defaultResolver: TypedContractMethod<[], [string], "view">;
    ens: TypedContractMethod<[], [string], "view">;
    node: TypedContractMethod<[addr: AddressLike], [string], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    setController: TypedContractMethod<[
        controller: AddressLike,
        enabled: boolean
    ], [
        void
    ], "nonpayable">;
    setDefaultResolver: TypedContractMethod<[
        resolver: AddressLike
    ], [
        void
    ], "nonpayable">;
    setName: TypedContractMethod<[name: string], [string], "nonpayable">;
    setNameForAddr: TypedContractMethod<[
        addr: AddressLike,
        owner: AddressLike,
        resolver: AddressLike,
        name: string
    ], [
        string
    ], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "claim"): TypedContractMethod<[owner: AddressLike], [string], "nonpayable">;
    getFunction(nameOrSignature: "claimForAddr"): TypedContractMethod<[
        addr: AddressLike,
        owner: AddressLike,
        resolver: AddressLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "claimWithResolver"): TypedContractMethod<[
        owner: AddressLike,
        resolver: AddressLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "controllers"): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "defaultResolver"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "ens"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "node"): TypedContractMethod<[addr: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "setController"): TypedContractMethod<[
        controller: AddressLike,
        enabled: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setDefaultResolver"): TypedContractMethod<[resolver: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "setName"): TypedContractMethod<[name: string], [string], "nonpayable">;
    getFunction(nameOrSignature: "setNameForAddr"): TypedContractMethod<[
        addr: AddressLike,
        owner: AddressLike,
        resolver: AddressLike,
        name: string
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getEvent(key: "ControllerChanged"): TypedContractEvent<ControllerChangedEvent.InputTuple, ControllerChangedEvent.OutputTuple, ControllerChangedEvent.OutputObject>;
    getEvent(key: "DefaultResolverChanged"): TypedContractEvent<DefaultResolverChangedEvent.InputTuple, DefaultResolverChangedEvent.OutputTuple, DefaultResolverChangedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "ReverseClaimed"): TypedContractEvent<ReverseClaimedEvent.InputTuple, ReverseClaimedEvent.OutputTuple, ReverseClaimedEvent.OutputObject>;
    filters: {
        "ControllerChanged(address,bool)": TypedContractEvent<ControllerChangedEvent.InputTuple, ControllerChangedEvent.OutputTuple, ControllerChangedEvent.OutputObject>;
        ControllerChanged: TypedContractEvent<ControllerChangedEvent.InputTuple, ControllerChangedEvent.OutputTuple, ControllerChangedEvent.OutputObject>;
        "DefaultResolverChanged(address)": TypedContractEvent<DefaultResolverChangedEvent.InputTuple, DefaultResolverChangedEvent.OutputTuple, DefaultResolverChangedEvent.OutputObject>;
        DefaultResolverChanged: TypedContractEvent<DefaultResolverChangedEvent.InputTuple, DefaultResolverChangedEvent.OutputTuple, DefaultResolverChangedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "ReverseClaimed(address,bytes32)": TypedContractEvent<ReverseClaimedEvent.InputTuple, ReverseClaimedEvent.OutputTuple, ReverseClaimedEvent.OutputObject>;
        ReverseClaimed: TypedContractEvent<ReverseClaimedEvent.InputTuple, ReverseClaimedEvent.OutputTuple, ReverseClaimedEvent.OutputObject>;
    };
}
//# sourceMappingURL=ReverseRegistrar.d.ts.map