import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../common";
export interface IBaseRegistrarInterface extends Interface {
    getFunction(nameOrSignature: "addController" | "approve" | "available" | "balanceOf" | "getApproved" | "isApprovedForAll" | "nameExpires" | "ownerOf" | "reclaim" | "register" | "removeController" | "renew" | "safeTransferFrom(address,address,uint256)" | "safeTransferFrom(address,address,uint256,bytes)" | "setApprovalForAll" | "setResolver" | "supportsInterface" | "transferFrom"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Approval" | "ApprovalForAll" | "ControllerAdded" | "ControllerRemoved" | "NameMigrated" | "NameRegistered" | "NameRenewed" | "Transfer"): EventFragment;
    encodeFunctionData(functionFragment: "addController", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "approve", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "available", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "getApproved", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "nameExpires", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "reclaim", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "register", values: [BigNumberish, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "removeController", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "renew", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256)", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", values: [AddressLike, AddressLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [AddressLike, boolean]): string;
    encodeFunctionData(functionFragment: "setResolver", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [AddressLike, AddressLike, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "addController", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "available", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getApproved", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nameExpires", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reclaim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeController", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renew", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
}
export declare namespace ApprovalEvent {
    type InputTuple = [
        owner: AddressLike,
        approved: AddressLike,
        tokenId: BigNumberish
    ];
    type OutputTuple = [owner: string, approved: string, tokenId: bigint];
    interface OutputObject {
        owner: string;
        approved: string;
        tokenId: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ApprovalForAllEvent {
    type InputTuple = [
        owner: AddressLike,
        operator: AddressLike,
        approved: boolean
    ];
    type OutputTuple = [
        owner: string,
        operator: string,
        approved: boolean
    ];
    interface OutputObject {
        owner: string;
        operator: string;
        approved: boolean;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ControllerAddedEvent {
    type InputTuple = [controller: AddressLike];
    type OutputTuple = [controller: string];
    interface OutputObject {
        controller: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ControllerRemovedEvent {
    type InputTuple = [controller: AddressLike];
    type OutputTuple = [controller: string];
    interface OutputObject {
        controller: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NameMigratedEvent {
    type InputTuple = [
        id: BigNumberish,
        owner: AddressLike,
        expires: BigNumberish
    ];
    type OutputTuple = [id: bigint, owner: string, expires: bigint];
    interface OutputObject {
        id: bigint;
        owner: string;
        expires: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NameRegisteredEvent {
    type InputTuple = [
        id: BigNumberish,
        owner: AddressLike,
        expires: BigNumberish
    ];
    type OutputTuple = [id: bigint, owner: string, expires: bigint];
    interface OutputObject {
        id: bigint;
        owner: string;
        expires: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NameRenewedEvent {
    type InputTuple = [id: BigNumberish, expires: BigNumberish];
    type OutputTuple = [id: bigint, expires: bigint];
    interface OutputObject {
        id: bigint;
        expires: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TransferEvent {
    type InputTuple = [
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ];
    type OutputTuple = [from: string, to: string, tokenId: bigint];
    interface OutputObject {
        from: string;
        to: string;
        tokenId: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IBaseRegistrar extends BaseContract {
    connect(runner?: ContractRunner | null): IBaseRegistrar;
    waitForDeployment(): Promise<this>;
    interface: IBaseRegistrarInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addController: TypedContractMethod<[
        controller: AddressLike
    ], [
        void
    ], "nonpayable">;
    approve: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    available: TypedContractMethod<[id: BigNumberish], [boolean], "view">;
    balanceOf: TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    getApproved: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    isApprovedForAll: TypedContractMethod<[
        owner: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], "view">;
    nameExpires: TypedContractMethod<[id: BigNumberish], [bigint], "view">;
    ownerOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    reclaim: TypedContractMethod<[
        id: BigNumberish,
        owner: AddressLike
    ], [
        void
    ], "nonpayable">;
    register: TypedContractMethod<[
        id: BigNumberish,
        owner: AddressLike,
        duration: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    removeController: TypedContractMethod<[
        controller: AddressLike
    ], [
        void
    ], "nonpayable">;
    renew: TypedContractMethod<[
        id: BigNumberish,
        duration: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    "safeTransferFrom(address,address,uint256)": TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    "safeTransferFrom(address,address,uint256,bytes)": TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    setApprovalForAll: TypedContractMethod<[
        operator: AddressLike,
        approved: boolean
    ], [
        void
    ], "nonpayable">;
    setResolver: TypedContractMethod<[
        resolver: AddressLike
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    transferFrom: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addController"): TypedContractMethod<[controller: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "approve"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "available"): TypedContractMethod<[id: BigNumberish], [boolean], "view">;
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "getApproved"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "isApprovedForAll"): TypedContractMethod<[
        owner: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "nameExpires"): TypedContractMethod<[id: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "ownerOf"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "reclaim"): TypedContractMethod<[
        id: BigNumberish,
        owner: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "register"): TypedContractMethod<[
        id: BigNumberish,
        owner: AddressLike,
        duration: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "removeController"): TypedContractMethod<[controller: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "renew"): TypedContractMethod<[
        id: BigNumberish,
        duration: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeTransferFrom(address,address,uint256)"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeTransferFrom(address,address,uint256,bytes)"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setApprovalForAll"): TypedContractMethod<[
        operator: AddressLike,
        approved: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setResolver"): TypedContractMethod<[resolver: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
    getEvent(key: "ApprovalForAll"): TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
    getEvent(key: "ControllerAdded"): TypedContractEvent<ControllerAddedEvent.InputTuple, ControllerAddedEvent.OutputTuple, ControllerAddedEvent.OutputObject>;
    getEvent(key: "ControllerRemoved"): TypedContractEvent<ControllerRemovedEvent.InputTuple, ControllerRemovedEvent.OutputTuple, ControllerRemovedEvent.OutputObject>;
    getEvent(key: "NameMigrated"): TypedContractEvent<NameMigratedEvent.InputTuple, NameMigratedEvent.OutputTuple, NameMigratedEvent.OutputObject>;
    getEvent(key: "NameRegistered"): TypedContractEvent<NameRegisteredEvent.InputTuple, NameRegisteredEvent.OutputTuple, NameRegisteredEvent.OutputObject>;
    getEvent(key: "NameRenewed"): TypedContractEvent<NameRenewedEvent.InputTuple, NameRenewedEvent.OutputTuple, NameRenewedEvent.OutputObject>;
    getEvent(key: "Transfer"): TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    filters: {
        "Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        Approval: TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        "ApprovalForAll(address,address,bool)": TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        ApprovalForAll: TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        "ControllerAdded(address)": TypedContractEvent<ControllerAddedEvent.InputTuple, ControllerAddedEvent.OutputTuple, ControllerAddedEvent.OutputObject>;
        ControllerAdded: TypedContractEvent<ControllerAddedEvent.InputTuple, ControllerAddedEvent.OutputTuple, ControllerAddedEvent.OutputObject>;
        "ControllerRemoved(address)": TypedContractEvent<ControllerRemovedEvent.InputTuple, ControllerRemovedEvent.OutputTuple, ControllerRemovedEvent.OutputObject>;
        ControllerRemoved: TypedContractEvent<ControllerRemovedEvent.InputTuple, ControllerRemovedEvent.OutputTuple, ControllerRemovedEvent.OutputObject>;
        "NameMigrated(uint256,address,uint256)": TypedContractEvent<NameMigratedEvent.InputTuple, NameMigratedEvent.OutputTuple, NameMigratedEvent.OutputObject>;
        NameMigrated: TypedContractEvent<NameMigratedEvent.InputTuple, NameMigratedEvent.OutputTuple, NameMigratedEvent.OutputObject>;
        "NameRegistered(uint256,address,uint256)": TypedContractEvent<NameRegisteredEvent.InputTuple, NameRegisteredEvent.OutputTuple, NameRegisteredEvent.OutputObject>;
        NameRegistered: TypedContractEvent<NameRegisteredEvent.InputTuple, NameRegisteredEvent.OutputTuple, NameRegisteredEvent.OutputObject>;
        "NameRenewed(uint256,uint256)": TypedContractEvent<NameRenewedEvent.InputTuple, NameRenewedEvent.OutputTuple, NameRenewedEvent.OutputObject>;
        NameRenewed: TypedContractEvent<NameRenewedEvent.InputTuple, NameRenewedEvent.OutputTuple, NameRenewedEvent.OutputObject>;
        "Transfer(address,address,uint256)": TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
        Transfer: TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    };
}
//# sourceMappingURL=IBaseRegistrar.d.ts.map