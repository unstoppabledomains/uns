import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export declare type OfferItemStruct = {
    itemType: BigNumberish;
    token: AddressLike;
    identifierOrCriteria: BigNumberish;
    startAmount: BigNumberish;
    endAmount: BigNumberish;
};
export declare type OfferItemStructOutput = [
    itemType: bigint,
    token: string,
    identifierOrCriteria: bigint,
    startAmount: bigint,
    endAmount: bigint
] & {
    itemType: bigint;
    token: string;
    identifierOrCriteria: bigint;
    startAmount: bigint;
    endAmount: bigint;
};
export declare type ConsiderationItemStruct = {
    itemType: BigNumberish;
    token: AddressLike;
    identifierOrCriteria: BigNumberish;
    startAmount: BigNumberish;
    endAmount: BigNumberish;
    recipient: AddressLike;
};
export declare type ConsiderationItemStructOutput = [
    itemType: bigint,
    token: string,
    identifierOrCriteria: bigint,
    startAmount: bigint,
    endAmount: bigint,
    recipient: string
] & {
    itemType: bigint;
    token: string;
    identifierOrCriteria: bigint;
    startAmount: bigint;
    endAmount: bigint;
    recipient: string;
};
export declare type OrderParametersStruct = {
    offerer: AddressLike;
    zone: AddressLike;
    offer: OfferItemStruct[];
    consideration: ConsiderationItemStruct[];
    orderType: BigNumberish;
    startTime: BigNumberish;
    endTime: BigNumberish;
    zoneHash: BytesLike;
    salt: BigNumberish;
    conduitKey: BytesLike;
    totalOriginalConsiderationItems: BigNumberish;
};
export declare type OrderParametersStructOutput = [
    offerer: string,
    zone: string,
    offer: OfferItemStructOutput[],
    consideration: ConsiderationItemStructOutput[],
    orderType: bigint,
    startTime: bigint,
    endTime: bigint,
    zoneHash: string,
    salt: bigint,
    conduitKey: string,
    totalOriginalConsiderationItems: bigint
] & {
    offerer: string;
    zone: string;
    offer: OfferItemStructOutput[];
    consideration: ConsiderationItemStructOutput[];
    orderType: bigint;
    startTime: bigint;
    endTime: bigint;
    zoneHash: string;
    salt: bigint;
    conduitKey: string;
    totalOriginalConsiderationItems: bigint;
};
export declare type AdvancedOrderStruct = {
    parameters: OrderParametersStruct;
    numerator: BigNumberish;
    denominator: BigNumberish;
    signature: BytesLike;
    extraData: BytesLike;
};
export declare type AdvancedOrderStructOutput = [
    parameters: OrderParametersStructOutput,
    numerator: bigint,
    denominator: bigint,
    signature: string,
    extraData: string
] & {
    parameters: OrderParametersStructOutput;
    numerator: bigint;
    denominator: bigint;
    signature: string;
    extraData: string;
};
export declare type CriteriaResolverStruct = {
    orderIndex: BigNumberish;
    side: BigNumberish;
    index: BigNumberish;
    identifier: BigNumberish;
    criteriaProof: BytesLike[];
};
export declare type CriteriaResolverStructOutput = [
    orderIndex: bigint,
    side: bigint,
    index: bigint,
    identifier: bigint,
    criteriaProof: string[]
] & {
    orderIndex: bigint;
    side: bigint;
    index: bigint;
    identifier: bigint;
    criteriaProof: string[];
};
export declare namespace IForwarder {
    type ForwardRequestStruct = {
        from: AddressLike;
        nonce: BigNumberish;
        tokenId: BigNumberish;
        data: BytesLike;
    };
    type ForwardRequestStructOutput = [
        from: string,
        nonce: bigint,
        tokenId: bigint,
        data: string
    ] & {
        from: string;
        nonce: bigint;
        tokenId: bigint;
        data: string;
    };
}
export interface LTOCustodyInterface extends Interface {
    getFunction(nameOrSignature: "CUSTODY_ADMIN_ROLE" | "DEFAULT_ADMIN_ROLE" | "addAdmin" | "addCustodyAdmin" | "cancel" | "complete" | "execute" | "getLTOData" | "getRoleAdmin" | "getTokenLTO" | "grantRole" | "hasRole" | "initialize" | "initiateLTO" | "initiateLTOFromOrder" | "isAdmin" | "isCustodyAdmin" | "isLTOInitiated" | "isTrustedForwarder" | "ltoAssets" | "nonceOf" | "owner" | "pause" | "paused" | "registry" | "releaseAsset" | "removeAdmin" | "removeCustodyAdmin" | "renounceAdmin" | "renounceOwnership" | "renounceRole" | "revokeRole" | "rotateAdmin" | "seaportProxyBuyer" | "setMany" | "supportsInterface" | "tokenLTOs" | "transferBuyer" | "transferOwnership" | "transferSeller" | "unpause" | "verify"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AssetBuyerChanged" | "AssetDeposited" | "AssetReleased" | "AssetSellerChanged" | "CustodyAdminAdded" | "CustodyAdminRemoved" | "Initialized" | "OwnershipTransferred" | "Paused" | "RoleAdminChanged" | "RoleGranted" | "RoleRevoked" | "Unpaused"): EventFragment;
    encodeFunctionData(functionFragment: "CUSTODY_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "addAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "addCustodyAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "cancel", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "complete", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "execute", values: [IForwarder.ForwardRequestStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "getLTOData", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getTokenLTO", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "initiateLTO", values: [BigNumberish, AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "initiateLTOFromOrder", values: [
        BigNumberish,
        AdvancedOrderStruct,
        CriteriaResolverStruct[],
        BytesLike,
        AddressLike
    ]): string;
    encodeFunctionData(functionFragment: "isAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "isCustodyAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "isLTOInitiated", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "isTrustedForwarder", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "ltoAssets", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "pause", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "registry", values?: undefined): string;
    encodeFunctionData(functionFragment: "releaseAsset", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "removeAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "removeCustodyAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "renounceAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "rotateAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "seaportProxyBuyer", values?: undefined): string;
    encodeFunctionData(functionFragment: "setMany", values: [BigNumberish, string[], string[]]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "tokenLTOs", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferBuyer", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "transferSeller", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
    encodeFunctionData(functionFragment: "verify", values: [IForwarder.ForwardRequestStruct, BytesLike]): string;
    decodeFunctionResult(functionFragment: "CUSTODY_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addCustodyAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancel", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "complete", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLTOData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokenLTO", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initiateLTO", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initiateLTOFromOrder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isCustodyAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isLTOInitiated", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTrustedForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ltoAssets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "releaseAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeCustodyAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rotateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "seaportProxyBuyer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenLTOs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferBuyer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferSeller", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
}
export declare namespace AssetBuyerChangedEvent {
    type InputTuple = [ltoId: BigNumberish, buyer: AddressLike];
    type OutputTuple = [ltoId: bigint, buyer: string];
    interface OutputObject {
        ltoId: bigint;
        buyer: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace AssetDepositedEvent {
    type InputTuple = [
        ltoId: BigNumberish,
        tokenId: BigNumberish,
        seller: AddressLike,
        buyer: AddressLike
    ];
    type OutputTuple = [
        ltoId: bigint,
        tokenId: bigint,
        seller: string,
        buyer: string
    ];
    interface OutputObject {
        ltoId: bigint;
        tokenId: bigint;
        seller: string;
        buyer: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace AssetReleasedEvent {
    type InputTuple = [
        ltoId: BigNumberish,
        tokenId: BigNumberish,
        to: AddressLike
    ];
    type OutputTuple = [ltoId: bigint, tokenId: bigint, to: string];
    interface OutputObject {
        ltoId: bigint;
        tokenId: bigint;
        to: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace AssetSellerChangedEvent {
    type InputTuple = [ltoId: BigNumberish, seller: AddressLike];
    type OutputTuple = [ltoId: bigint, seller: string];
    interface OutputObject {
        ltoId: bigint;
        seller: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace CustodyAdminAddedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace CustodyAdminRemovedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace InitializedEvent {
    type InputTuple = [version: BigNumberish];
    type OutputTuple = [version: bigint];
    interface OutputObject {
        version: bigint;
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
export declare namespace PausedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleAdminChangedEvent {
    type InputTuple = [
        role: BytesLike,
        previousAdminRole: BytesLike,
        newAdminRole: BytesLike
    ];
    type OutputTuple = [
        role: string,
        previousAdminRole: string,
        newAdminRole: string
    ];
    interface OutputObject {
        role: string;
        previousAdminRole: string;
        newAdminRole: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleGrantedEvent {
    type InputTuple = [
        role: BytesLike,
        account: AddressLike,
        sender: AddressLike
    ];
    type OutputTuple = [role: string, account: string, sender: string];
    interface OutputObject {
        role: string;
        account: string;
        sender: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleRevokedEvent {
    type InputTuple = [
        role: BytesLike,
        account: AddressLike,
        sender: AddressLike
    ];
    type OutputTuple = [role: string, account: string, sender: string];
    interface OutputObject {
        role: string;
        account: string;
        sender: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace UnpausedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface LTOCustody extends BaseContract {
    connect(runner?: ContractRunner | null): LTOCustody;
    waitForDeployment(): Promise<this>;
    interface: LTOCustodyInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    CUSTODY_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;
    DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;
    addAdmin: TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    addCustodyAdmin: TypedContractMethod<[
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    cancel: TypedContractMethod<[ltoId: BigNumberish], [void], "nonpayable">;
    complete: TypedContractMethod<[ltoId: BigNumberish], [void], "nonpayable">;
    execute: TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        string
    ], "nonpayable">;
    getLTOData: TypedContractMethod<[
        ltoId: BigNumberish
    ], [
        [
            string,
            string,
            bigint,
            boolean
        ] & {
            seller: string;
            buyer: string;
            tokenId: bigint;
            isFinalized: boolean;
        }
    ], "view">;
    getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;
    getTokenLTO: TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    grantRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    hasRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    initialize: TypedContractMethod<[
        _registry: AddressLike,
        _seaportProxyBuyer: AddressLike
    ], [
        void
    ], "nonpayable">;
    initiateLTO: TypedContractMethod<[
        ltoId: BigNumberish,
        seller: AddressLike,
        buyer: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    initiateLTOFromOrder: TypedContractMethod<[
        ltoId: BigNumberish,
        advancedOrder: AdvancedOrderStruct,
        criteriaResolvers: CriteriaResolverStruct[],
        fulfillerConduitKey: BytesLike,
        recipient: AddressLike
    ], [
        void
    ], "nonpayable">;
    isAdmin: TypedContractMethod<[account: AddressLike], [boolean], "view">;
    isCustodyAdmin: TypedContractMethod<[
        account: AddressLike
    ], [
        boolean
    ], "view">;
    isLTOInitiated: TypedContractMethod<[ltoId: BigNumberish], [boolean], "view">;
    isTrustedForwarder: TypedContractMethod<[
        forwarder: AddressLike
    ], [
        boolean
    ], "view">;
    ltoAssets: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        [
            string,
            string,
            bigint,
            boolean
        ] & {
            seller: string;
            buyer: string;
            tokenId: bigint;
            isFinalized: boolean;
        }
    ], "view">;
    nonceOf: TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    pause: TypedContractMethod<[], [void], "nonpayable">;
    paused: TypedContractMethod<[], [boolean], "view">;
    registry: TypedContractMethod<[], [string], "view">;
    releaseAsset: TypedContractMethod<[
        ltoId: BigNumberish,
        to: AddressLike
    ], [
        void
    ], "nonpayable">;
    removeAdmin: TypedContractMethod<[
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    removeCustodyAdmin: TypedContractMethod<[
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    renounceAdmin: TypedContractMethod<[], [void], "nonpayable">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    renounceRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    revokeRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    rotateAdmin: TypedContractMethod<[
        newAdmin: AddressLike
    ], [
        void
    ], "nonpayable">;
    seaportProxyBuyer: TypedContractMethod<[], [string], "view">;
    setMany: TypedContractMethod<[
        ltoId: BigNumberish,
        keys: string[],
        values: string[]
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    tokenLTOs: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    transferBuyer: TypedContractMethod<[
        ltoId: BigNumberish,
        buyer: AddressLike
    ], [
        void
    ], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    transferSeller: TypedContractMethod<[
        ltoId: BigNumberish,
        seller: AddressLike
    ], [
        void
    ], "nonpayable">;
    unpause: TypedContractMethod<[], [void], "nonpayable">;
    verify: TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        boolean
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "CUSTODY_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "addAdmin"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "addCustodyAdmin"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "cancel"): TypedContractMethod<[ltoId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "complete"): TypedContractMethod<[ltoId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "execute"): TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "getLTOData"): TypedContractMethod<[
        ltoId: BigNumberish
    ], [
        [
            string,
            string,
            bigint,
            boolean
        ] & {
            seller: string;
            buyer: string;
            tokenId: bigint;
            isFinalized: boolean;
        }
    ], "view">;
    getFunction(nameOrSignature: "getRoleAdmin"): TypedContractMethod<[role: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "getTokenLTO"): TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "grantRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "hasRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
        _registry: AddressLike,
        _seaportProxyBuyer: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "initiateLTO"): TypedContractMethod<[
        ltoId: BigNumberish,
        seller: AddressLike,
        buyer: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "initiateLTOFromOrder"): TypedContractMethod<[
        ltoId: BigNumberish,
        advancedOrder: AdvancedOrderStruct,
        criteriaResolvers: CriteriaResolverStruct[],
        fulfillerConduitKey: BytesLike,
        recipient: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "isAdmin"): TypedContractMethod<[account: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "isCustodyAdmin"): TypedContractMethod<[account: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "isLTOInitiated"): TypedContractMethod<[ltoId: BigNumberish], [boolean], "view">;
    getFunction(nameOrSignature: "isTrustedForwarder"): TypedContractMethod<[forwarder: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "ltoAssets"): TypedContractMethod<[
        arg0: BigNumberish
    ], [
        [
            string,
            string,
            bigint,
            boolean
        ] & {
            seller: string;
            buyer: string;
            tokenId: bigint;
            isFinalized: boolean;
        }
    ], "view">;
    getFunction(nameOrSignature: "nonceOf"): TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "pause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "paused"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "registry"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "releaseAsset"): TypedContractMethod<[
        ltoId: BigNumberish,
        to: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "removeAdmin"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "removeCustodyAdmin"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "renounceAdmin"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "renounceRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "revokeRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "rotateAdmin"): TypedContractMethod<[newAdmin: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "seaportProxyBuyer"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "setMany"): TypedContractMethod<[
        ltoId: BigNumberish,
        keys: string[],
        values: string[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "tokenLTOs"): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "transferBuyer"): TypedContractMethod<[
        ltoId: BigNumberish,
        buyer: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "transferSeller"): TypedContractMethod<[
        ltoId: BigNumberish,
        seller: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "unpause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "verify"): TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        boolean
    ], "view">;
    getEvent(key: "AssetBuyerChanged"): TypedContractEvent<AssetBuyerChangedEvent.InputTuple, AssetBuyerChangedEvent.OutputTuple, AssetBuyerChangedEvent.OutputObject>;
    getEvent(key: "AssetDeposited"): TypedContractEvent<AssetDepositedEvent.InputTuple, AssetDepositedEvent.OutputTuple, AssetDepositedEvent.OutputObject>;
    getEvent(key: "AssetReleased"): TypedContractEvent<AssetReleasedEvent.InputTuple, AssetReleasedEvent.OutputTuple, AssetReleasedEvent.OutputObject>;
    getEvent(key: "AssetSellerChanged"): TypedContractEvent<AssetSellerChangedEvent.InputTuple, AssetSellerChangedEvent.OutputTuple, AssetSellerChangedEvent.OutputObject>;
    getEvent(key: "CustodyAdminAdded"): TypedContractEvent<CustodyAdminAddedEvent.InputTuple, CustodyAdminAddedEvent.OutputTuple, CustodyAdminAddedEvent.OutputObject>;
    getEvent(key: "CustodyAdminRemoved"): TypedContractEvent<CustodyAdminRemovedEvent.InputTuple, CustodyAdminRemovedEvent.OutputTuple, CustodyAdminRemovedEvent.OutputObject>;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "Paused"): TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
    getEvent(key: "RoleAdminChanged"): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
    getEvent(key: "RoleGranted"): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
    getEvent(key: "RoleRevoked"): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    getEvent(key: "Unpaused"): TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
    filters: {
        "AssetBuyerChanged(uint256,address)": TypedContractEvent<AssetBuyerChangedEvent.InputTuple, AssetBuyerChangedEvent.OutputTuple, AssetBuyerChangedEvent.OutputObject>;
        AssetBuyerChanged: TypedContractEvent<AssetBuyerChangedEvent.InputTuple, AssetBuyerChangedEvent.OutputTuple, AssetBuyerChangedEvent.OutputObject>;
        "AssetDeposited(uint256,uint256,address,address)": TypedContractEvent<AssetDepositedEvent.InputTuple, AssetDepositedEvent.OutputTuple, AssetDepositedEvent.OutputObject>;
        AssetDeposited: TypedContractEvent<AssetDepositedEvent.InputTuple, AssetDepositedEvent.OutputTuple, AssetDepositedEvent.OutputObject>;
        "AssetReleased(uint256,uint256,address)": TypedContractEvent<AssetReleasedEvent.InputTuple, AssetReleasedEvent.OutputTuple, AssetReleasedEvent.OutputObject>;
        AssetReleased: TypedContractEvent<AssetReleasedEvent.InputTuple, AssetReleasedEvent.OutputTuple, AssetReleasedEvent.OutputObject>;
        "AssetSellerChanged(uint256,address)": TypedContractEvent<AssetSellerChangedEvent.InputTuple, AssetSellerChangedEvent.OutputTuple, AssetSellerChangedEvent.OutputObject>;
        AssetSellerChanged: TypedContractEvent<AssetSellerChangedEvent.InputTuple, AssetSellerChangedEvent.OutputTuple, AssetSellerChangedEvent.OutputObject>;
        "CustodyAdminAdded(address)": TypedContractEvent<CustodyAdminAddedEvent.InputTuple, CustodyAdminAddedEvent.OutputTuple, CustodyAdminAddedEvent.OutputObject>;
        CustodyAdminAdded: TypedContractEvent<CustodyAdminAddedEvent.InputTuple, CustodyAdminAddedEvent.OutputTuple, CustodyAdminAddedEvent.OutputObject>;
        "CustodyAdminRemoved(address)": TypedContractEvent<CustodyAdminRemovedEvent.InputTuple, CustodyAdminRemovedEvent.OutputTuple, CustodyAdminRemovedEvent.OutputObject>;
        CustodyAdminRemoved: TypedContractEvent<CustodyAdminRemovedEvent.InputTuple, CustodyAdminRemovedEvent.OutputTuple, CustodyAdminRemovedEvent.OutputObject>;
        "Initialized(uint8)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "Paused(address)": TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        Paused: TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        RoleAdminChanged: TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        "RoleGranted(bytes32,address,address)": TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        "RoleRevoked(bytes32,address,address)": TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        "Unpaused(address)": TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        Unpaused: TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
    };
}
//# sourceMappingURL=LTOCustody.d.ts.map