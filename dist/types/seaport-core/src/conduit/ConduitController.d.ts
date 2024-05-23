import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
export interface ConduitControllerInterface extends Interface {
    getFunction(nameOrSignature: "acceptOwnership" | "cancelOwnershipTransfer" | "createConduit" | "getChannel" | "getChannelStatus" | "getChannels" | "getConduit" | "getConduitCodeHashes" | "getKey" | "getPotentialOwner" | "getTotalChannels" | "ownerOf" | "transferOwnership" | "updateChannel"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "NewConduit" | "OwnershipTransferred" | "PotentialOwnerUpdated"): EventFragment;
    encodeFunctionData(functionFragment: "acceptOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "cancelOwnershipTransfer", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "createConduit", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "getChannel", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getChannelStatus", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "getChannels", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "getConduit", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getConduitCodeHashes", values?: undefined): string;
    encodeFunctionData(functionFragment: "getKey", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "getPotentialOwner", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "getTotalChannels", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "updateChannel", values: [AddressLike, AddressLike, boolean]): string;
    decodeFunctionResult(functionFragment: "acceptOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelOwnershipTransfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createConduit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChannel", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChannelStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChannels", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getConduit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getConduitCodeHashes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPotentialOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTotalChannels", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateChannel", data: BytesLike): Result;
}
export declare namespace NewConduitEvent {
    type InputTuple = [conduit: AddressLike, conduitKey: BytesLike];
    type OutputTuple = [conduit: string, conduitKey: string];
    interface OutputObject {
        conduit: string;
        conduitKey: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OwnershipTransferredEvent {
    type InputTuple = [
        conduit: AddressLike,
        previousOwner: AddressLike,
        newOwner: AddressLike
    ];
    type OutputTuple = [
        conduit: string,
        previousOwner: string,
        newOwner: string
    ];
    interface OutputObject {
        conduit: string;
        previousOwner: string;
        newOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace PotentialOwnerUpdatedEvent {
    type InputTuple = [newPotentialOwner: AddressLike];
    type OutputTuple = [newPotentialOwner: string];
    interface OutputObject {
        newPotentialOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface ConduitController extends BaseContract {
    connect(runner?: ContractRunner | null): ConduitController;
    waitForDeployment(): Promise<this>;
    interface: ConduitControllerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    acceptOwnership: TypedContractMethod<[
        conduit: AddressLike
    ], [
        void
    ], "nonpayable">;
    cancelOwnershipTransfer: TypedContractMethod<[
        conduit: AddressLike
    ], [
        void
    ], "nonpayable">;
    createConduit: TypedContractMethod<[
        conduitKey: BytesLike,
        initialOwner: AddressLike
    ], [
        string
    ], "nonpayable">;
    getChannel: TypedContractMethod<[
        conduit: AddressLike,
        channelIndex: BigNumberish
    ], [
        string
    ], "view">;
    getChannelStatus: TypedContractMethod<[
        conduit: AddressLike,
        channel: AddressLike
    ], [
        boolean
    ], "view">;
    getChannels: TypedContractMethod<[conduit: AddressLike], [string[]], "view">;
    getConduit: TypedContractMethod<[
        conduitKey: BytesLike
    ], [
        [string, boolean] & {
            conduit: string;
            exists: boolean;
        }
    ], "view">;
    getConduitCodeHashes: TypedContractMethod<[
    ], [
        [string, string] & {
            creationCodeHash: string;
            runtimeCodeHash: string;
        }
    ], "view">;
    getKey: TypedContractMethod<[conduit: AddressLike], [string], "view">;
    getPotentialOwner: TypedContractMethod<[
        conduit: AddressLike
    ], [
        string
    ], "view">;
    getTotalChannels: TypedContractMethod<[
        conduit: AddressLike
    ], [
        bigint
    ], "view">;
    ownerOf: TypedContractMethod<[conduit: AddressLike], [string], "view">;
    transferOwnership: TypedContractMethod<[
        conduit: AddressLike,
        newPotentialOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    updateChannel: TypedContractMethod<[
        conduit: AddressLike,
        channel: AddressLike,
        isOpen: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "acceptOwnership"): TypedContractMethod<[conduit: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "cancelOwnershipTransfer"): TypedContractMethod<[conduit: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "createConduit"): TypedContractMethod<[
        conduitKey: BytesLike,
        initialOwner: AddressLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "getChannel"): TypedContractMethod<[
        conduit: AddressLike,
        channelIndex: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "getChannelStatus"): TypedContractMethod<[
        conduit: AddressLike,
        channel: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "getChannels"): TypedContractMethod<[conduit: AddressLike], [string[]], "view">;
    getFunction(nameOrSignature: "getConduit"): TypedContractMethod<[
        conduitKey: BytesLike
    ], [
        [string, boolean] & {
            conduit: string;
            exists: boolean;
        }
    ], "view">;
    getFunction(nameOrSignature: "getConduitCodeHashes"): TypedContractMethod<[
    ], [
        [string, string] & {
            creationCodeHash: string;
            runtimeCodeHash: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "getKey"): TypedContractMethod<[conduit: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "getPotentialOwner"): TypedContractMethod<[conduit: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "getTotalChannels"): TypedContractMethod<[conduit: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "ownerOf"): TypedContractMethod<[conduit: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[
        conduit: AddressLike,
        newPotentialOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "updateChannel"): TypedContractMethod<[
        conduit: AddressLike,
        channel: AddressLike,
        isOpen: boolean
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "NewConduit"): TypedContractEvent<NewConduitEvent.InputTuple, NewConduitEvent.OutputTuple, NewConduitEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "PotentialOwnerUpdated"): TypedContractEvent<PotentialOwnerUpdatedEvent.InputTuple, PotentialOwnerUpdatedEvent.OutputTuple, PotentialOwnerUpdatedEvent.OutputObject>;
    filters: {
        "NewConduit(address,bytes32)": TypedContractEvent<NewConduitEvent.InputTuple, NewConduitEvent.OutputTuple, NewConduitEvent.OutputObject>;
        NewConduit: TypedContractEvent<NewConduitEvent.InputTuple, NewConduitEvent.OutputTuple, NewConduitEvent.OutputObject>;
        "OwnershipTransferred(address,address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "PotentialOwnerUpdated(address)": TypedContractEvent<PotentialOwnerUpdatedEvent.InputTuple, PotentialOwnerUpdatedEvent.OutputTuple, PotentialOwnerUpdatedEvent.OutputObject>;
        PotentialOwnerUpdated: TypedContractEvent<PotentialOwnerUpdatedEvent.InputTuple, PotentialOwnerUpdatedEvent.OutputTuple, PotentialOwnerUpdatedEvent.OutputObject>;
    };
}
//# sourceMappingURL=ConduitController.d.ts.map