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
    getFunction(nameOrSignature: "cancel" | "complete" | "getLTOData" | "initiateLTO" | "initiateLTOFromOrder" | "setMany" | "transferBuyer" | "transferSeller"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AssetBuyerChanged" | "AssetDeposited" | "AssetReleased" | "AssetSellerChanged"): EventFragment;
    encodeFunctionData(functionFragment: "cancel", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "complete", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getLTOData", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "initiateLTO", values: [BigNumberish, AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "initiateLTOFromOrder", values: [
        BigNumberish,
        AdvancedOrderStruct,
        CriteriaResolverStruct[],
        BytesLike,
        AddressLike
    ]): string;
    encodeFunctionData(functionFragment: "setMany", values: [BigNumberish, string[], string[]]): string;
    encodeFunctionData(functionFragment: "transferBuyer", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "transferSeller", values: [BigNumberish, AddressLike]): string;
    decodeFunctionResult(functionFragment: "cancel", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "complete", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLTOData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initiateLTO", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initiateLTOFromOrder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMany", data: BytesLike): Result;
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
    setMany: TypedContractMethod<[
        ltoId: BigNumberish,
        keys: string[],
        values: string[]
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
    getFunction(nameOrSignature: "setMany"): TypedContractMethod<[
        ltoId: BigNumberish,
        keys: string[],
        values: string[]
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