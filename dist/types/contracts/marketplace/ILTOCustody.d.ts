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
export interface ILTOCustodyInterface extends Interface {
    getFunction(nameOrSignature: "cancel" | "complete" | "getLtoCsutodyTokenCount" | "getLtoCsutodyTokenId" | "getLtoCustodyId" | "initiateLTO" | "initiateLTOFromOrder" | "revokeAsset" | "setRecords" | "transferBuyer" | "transferSeller"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AssetBuyerChanged" | "AssetDeposited" | "AssetReleased" | "AssetSellerChanged"): EventFragment;
    encodeFunctionData(functionFragment: "cancel", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "complete", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getLtoCsutodyTokenCount", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getLtoCsutodyTokenId", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getLtoCustodyId", values: [BigNumberish[], BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "initiateLTO", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "initiateLTOFromOrder", values: [
        AdvancedOrderStruct,
        CriteriaResolverStruct[],
        BytesLike,
        AddressLike
    ]): string;
    encodeFunctionData(functionFragment: "revokeAsset", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setRecords", values: [string[], string[], BigNumberish, boolean]): string;
    encodeFunctionData(functionFragment: "transferBuyer", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "transferSeller", values: [BigNumberish, AddressLike]): string;
    decodeFunctionResult(functionFragment: "cancel", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "complete", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLtoCsutodyTokenCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLtoCsutodyTokenId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLtoCustodyId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initiateLTO", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initiateLTOFromOrder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferBuyer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferSeller", data: BytesLike): Result;
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
export interface ILTOCustody extends BaseContract {
    connect(runner?: ContractRunner | null): ILTOCustody;
    waitForDeployment(): Promise<this>;
    interface: ILTOCustodyInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    cancel: TypedContractMethod<[ltoId: BigNumberish], [void], "nonpayable">;
    complete: TypedContractMethod<[ltoId: BigNumberish], [void], "nonpayable">;
    getLtoCsutodyTokenCount: TypedContractMethod<[
        ltoId: BigNumberish
    ], [
        bigint
    ], "view">;
    getLtoCsutodyTokenId: TypedContractMethod<[
        ltoId: BigNumberish,
        index: BigNumberish
    ], [
        bigint
    ], "view">;
    getLtoCustodyId: TypedContractMethod<[
        tokenIds: BigNumberish[],
        counters: BigNumberish[]
    ], [
        bigint
    ], "view">;
    initiateLTO: TypedContractMethod<[
        seller: AddressLike,
        buyer: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    initiateLTOFromOrder: TypedContractMethod<[
        advancedOrder: AdvancedOrderStruct,
        criteriaResolvers: CriteriaResolverStruct[],
        fulfillerConduitKey: BytesLike,
        recipient: AddressLike
    ], [
        void
    ], "nonpayable">;
    revokeAsset: TypedContractMethod<[
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setRecords: TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish,
        resetRecords: boolean
    ], [
        void
    ], "nonpayable">;
    transferBuyer: TypedContractMethod<[
        ltoId: BigNumberish,
        buyer: AddressLike
    ], [
        void
    ], "nonpayable">;
    transferSeller: TypedContractMethod<[
        ltoId: BigNumberish,
        seller: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "cancel"): TypedContractMethod<[ltoId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "complete"): TypedContractMethod<[ltoId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "getLtoCsutodyTokenCount"): TypedContractMethod<[ltoId: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "getLtoCsutodyTokenId"): TypedContractMethod<[
        ltoId: BigNumberish,
        index: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "getLtoCustodyId"): TypedContractMethod<[
        tokenIds: BigNumberish[],
        counters: BigNumberish[]
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "initiateLTO"): TypedContractMethod<[
        seller: AddressLike,
        buyer: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "initiateLTOFromOrder"): TypedContractMethod<[
        advancedOrder: AdvancedOrderStruct,
        criteriaResolvers: CriteriaResolverStruct[],
        fulfillerConduitKey: BytesLike,
        recipient: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "revokeAsset"): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setRecords"): TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish,
        resetRecords: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferBuyer"): TypedContractMethod<[
        ltoId: BigNumberish,
        buyer: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferSeller"): TypedContractMethod<[
        ltoId: BigNumberish,
        seller: AddressLike
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "AssetBuyerChanged"): TypedContractEvent<AssetBuyerChangedEvent.InputTuple, AssetBuyerChangedEvent.OutputTuple, AssetBuyerChangedEvent.OutputObject>;
    getEvent(key: "AssetDeposited"): TypedContractEvent<AssetDepositedEvent.InputTuple, AssetDepositedEvent.OutputTuple, AssetDepositedEvent.OutputObject>;
    getEvent(key: "AssetReleased"): TypedContractEvent<AssetReleasedEvent.InputTuple, AssetReleasedEvent.OutputTuple, AssetReleasedEvent.OutputObject>;
    getEvent(key: "AssetSellerChanged"): TypedContractEvent<AssetSellerChangedEvent.InputTuple, AssetSellerChangedEvent.OutputTuple, AssetSellerChangedEvent.OutputObject>;
    filters: {
        "AssetBuyerChanged(uint256,address)": TypedContractEvent<AssetBuyerChangedEvent.InputTuple, AssetBuyerChangedEvent.OutputTuple, AssetBuyerChangedEvent.OutputObject>;
        AssetBuyerChanged: TypedContractEvent<AssetBuyerChangedEvent.InputTuple, AssetBuyerChangedEvent.OutputTuple, AssetBuyerChangedEvent.OutputObject>;
        "AssetDeposited(uint256,uint256,address,address)": TypedContractEvent<AssetDepositedEvent.InputTuple, AssetDepositedEvent.OutputTuple, AssetDepositedEvent.OutputObject>;
        AssetDeposited: TypedContractEvent<AssetDepositedEvent.InputTuple, AssetDepositedEvent.OutputTuple, AssetDepositedEvent.OutputObject>;
        "AssetReleased(uint256,uint256,address)": TypedContractEvent<AssetReleasedEvent.InputTuple, AssetReleasedEvent.OutputTuple, AssetReleasedEvent.OutputObject>;
        AssetReleased: TypedContractEvent<AssetReleasedEvent.InputTuple, AssetReleasedEvent.OutputTuple, AssetReleasedEvent.OutputObject>;
        "AssetSellerChanged(uint256,address)": TypedContractEvent<AssetSellerChangedEvent.InputTuple, AssetSellerChangedEvent.OutputTuple, AssetSellerChangedEvent.OutputObject>;
        AssetSellerChanged: TypedContractEvent<AssetSellerChangedEvent.InputTuple, AssetSellerChangedEvent.OutputTuple, AssetSellerChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=ILTOCustody.d.ts.map