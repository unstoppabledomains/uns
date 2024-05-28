import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
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
export interface ISeaportProxyBuyerInterface extends Interface {
    getFunction(nameOrSignature: "approve" | "fulfillAdvancedOrder" | "pause" | "unpause" | "withdraw"): FunctionFragment;
    encodeFunctionData(functionFragment: "approve", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "fulfillAdvancedOrder", values: [
        AdvancedOrderStruct,
        CriteriaResolverStruct[],
        BytesLike,
        AddressLike
    ]): string;
    encodeFunctionData(functionFragment: "pause", values?: undefined): string;
    encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdraw", values: [AddressLike, AddressLike, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fulfillAdvancedOrder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}
export interface ISeaportProxyBuyer extends BaseContract {
    connect(runner?: ContractRunner | null): ISeaportProxyBuyer;
    waitForDeployment(): Promise<this>;
    interface: ISeaportProxyBuyerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    approve: TypedContractMethod<[token: AddressLike], [void], "nonpayable">;
    fulfillAdvancedOrder: TypedContractMethod<[
        advancedOrder: AdvancedOrderStruct,
        criteriaResolvers: CriteriaResolverStruct[],
        fulfillerConduitKey: BytesLike,
        recipient: AddressLike
    ], [
        boolean
    ], "nonpayable">;
    pause: TypedContractMethod<[], [void], "nonpayable">;
    unpause: TypedContractMethod<[], [void], "nonpayable">;
    withdraw: TypedContractMethod<[
        token: AddressLike,
        recipient: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "approve"): TypedContractMethod<[token: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "fulfillAdvancedOrder"): TypedContractMethod<[
        advancedOrder: AdvancedOrderStruct,
        criteriaResolvers: CriteriaResolverStruct[],
        fulfillerConduitKey: BytesLike,
        recipient: AddressLike
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "pause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "unpause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "withdraw"): TypedContractMethod<[
        token: AddressLike,
        recipient: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=ISeaportProxyBuyer.d.ts.map