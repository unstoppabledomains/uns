import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
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
export declare type OrderComponentsStruct = {
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
    counter: BigNumberish;
};
export declare type OrderComponentsStructOutput = [
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
    counter: bigint
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
    counter: bigint;
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
export declare type FulfillmentComponentStruct = {
    orderIndex: BigNumberish;
    itemIndex: BigNumberish;
};
export declare type FulfillmentComponentStructOutput = [
    orderIndex: bigint,
    itemIndex: bigint
] & {
    orderIndex: bigint;
    itemIndex: bigint;
};
export declare type ReceivedItemStruct = {
    itemType: BigNumberish;
    token: AddressLike;
    identifier: BigNumberish;
    amount: BigNumberish;
    recipient: AddressLike;
};
export declare type ReceivedItemStructOutput = [
    itemType: bigint,
    token: string,
    identifier: bigint,
    amount: bigint,
    recipient: string
] & {
    itemType: bigint;
    token: string;
    identifier: bigint;
    amount: bigint;
    recipient: string;
};
export declare type ExecutionStruct = {
    item: ReceivedItemStruct;
    offerer: AddressLike;
    conduitKey: BytesLike;
};
export declare type ExecutionStructOutput = [
    item: ReceivedItemStructOutput,
    offerer: string,
    conduitKey: string
] & {
    item: ReceivedItemStructOutput;
    offerer: string;
    conduitKey: string;
};
export declare type OrderStruct = {
    parameters: OrderParametersStruct;
    signature: BytesLike;
};
export declare type OrderStructOutput = [
    parameters: OrderParametersStructOutput,
    signature: string
] & {
    parameters: OrderParametersStructOutput;
    signature: string;
};
export declare type AdditionalRecipientStruct = {
    amount: BigNumberish;
    recipient: AddressLike;
};
export declare type AdditionalRecipientStructOutput = [
    amount: bigint,
    recipient: string
] & {
    amount: bigint;
    recipient: string;
};
export declare type BasicOrderParametersStruct = {
    considerationToken: AddressLike;
    considerationIdentifier: BigNumberish;
    considerationAmount: BigNumberish;
    offerer: AddressLike;
    zone: AddressLike;
    offerToken: AddressLike;
    offerIdentifier: BigNumberish;
    offerAmount: BigNumberish;
    basicOrderType: BigNumberish;
    startTime: BigNumberish;
    endTime: BigNumberish;
    zoneHash: BytesLike;
    salt: BigNumberish;
    offererConduitKey: BytesLike;
    fulfillerConduitKey: BytesLike;
    totalOriginalAdditionalRecipients: BigNumberish;
    additionalRecipients: AdditionalRecipientStruct[];
    signature: BytesLike;
};
export declare type BasicOrderParametersStructOutput = [
    considerationToken: string,
    considerationIdentifier: bigint,
    considerationAmount: bigint,
    offerer: string,
    zone: string,
    offerToken: string,
    offerIdentifier: bigint,
    offerAmount: bigint,
    basicOrderType: bigint,
    startTime: bigint,
    endTime: bigint,
    zoneHash: string,
    salt: bigint,
    offererConduitKey: string,
    fulfillerConduitKey: string,
    totalOriginalAdditionalRecipients: bigint,
    additionalRecipients: AdditionalRecipientStructOutput[],
    signature: string
] & {
    considerationToken: string;
    considerationIdentifier: bigint;
    considerationAmount: bigint;
    offerer: string;
    zone: string;
    offerToken: string;
    offerIdentifier: bigint;
    offerAmount: bigint;
    basicOrderType: bigint;
    startTime: bigint;
    endTime: bigint;
    zoneHash: string;
    salt: bigint;
    offererConduitKey: string;
    fulfillerConduitKey: string;
    totalOriginalAdditionalRecipients: bigint;
    additionalRecipients: AdditionalRecipientStructOutput[];
    signature: string;
};
export declare type FulfillmentStruct = {
    offerComponents: FulfillmentComponentStruct[];
    considerationComponents: FulfillmentComponentStruct[];
};
export declare type FulfillmentStructOutput = [
    offerComponents: FulfillmentComponentStructOutput[],
    considerationComponents: FulfillmentComponentStructOutput[]
] & {
    offerComponents: FulfillmentComponentStructOutput[];
    considerationComponents: FulfillmentComponentStructOutput[];
};
export interface ConsiderationInterfaceInterface extends Interface {
    getFunction(nameOrSignature: "cancel" | "fulfillAdvancedOrder" | "fulfillAvailableAdvancedOrders" | "fulfillAvailableOrders" | "fulfillBasicOrder" | "fulfillBasicOrder_efficient_6GL6yc" | "fulfillOrder" | "getContractOffererNonce" | "getCounter" | "getOrderHash" | "getOrderStatus" | "incrementCounter" | "information" | "matchAdvancedOrders" | "matchOrders" | "name" | "validate"): FunctionFragment;
    encodeFunctionData(functionFragment: "cancel", values: [OrderComponentsStruct[]]): string;
    encodeFunctionData(functionFragment: "fulfillAdvancedOrder", values: [
        AdvancedOrderStruct,
        CriteriaResolverStruct[],
        BytesLike,
        AddressLike
    ]): string;
    encodeFunctionData(functionFragment: "fulfillAvailableAdvancedOrders", values: [
        AdvancedOrderStruct[],
        CriteriaResolverStruct[],
        FulfillmentComponentStruct[][],
        FulfillmentComponentStruct[][],
        BytesLike,
        AddressLike,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "fulfillAvailableOrders", values: [
        OrderStruct[],
        FulfillmentComponentStruct[][],
        FulfillmentComponentStruct[][],
        BytesLike,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "fulfillBasicOrder", values: [BasicOrderParametersStruct]): string;
    encodeFunctionData(functionFragment: "fulfillBasicOrder_efficient_6GL6yc", values: [BasicOrderParametersStruct]): string;
    encodeFunctionData(functionFragment: "fulfillOrder", values: [OrderStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "getContractOffererNonce", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "getCounter", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "getOrderHash", values: [OrderComponentsStruct]): string;
    encodeFunctionData(functionFragment: "getOrderStatus", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "incrementCounter", values?: undefined): string;
    encodeFunctionData(functionFragment: "information", values?: undefined): string;
    encodeFunctionData(functionFragment: "matchAdvancedOrders", values: [
        AdvancedOrderStruct[],
        CriteriaResolverStruct[],
        FulfillmentStruct[],
        AddressLike
    ]): string;
    encodeFunctionData(functionFragment: "matchOrders", values: [OrderStruct[], FulfillmentStruct[]]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "validate", values: [OrderStruct[]]): string;
    decodeFunctionResult(functionFragment: "cancel", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fulfillAdvancedOrder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fulfillAvailableAdvancedOrders", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fulfillAvailableOrders", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fulfillBasicOrder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fulfillBasicOrder_efficient_6GL6yc", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fulfillOrder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getContractOffererNonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCounter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getOrderHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getOrderStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "incrementCounter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "information", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "matchAdvancedOrders", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "matchOrders", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "validate", data: BytesLike): Result;
}
export interface ConsiderationInterface extends BaseContract {
    connect(runner?: ContractRunner | null): ConsiderationInterface;
    waitForDeployment(): Promise<this>;
    interface: ConsiderationInterfaceInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    cancel: TypedContractMethod<[
        orders: OrderComponentsStruct[]
    ], [
        boolean
    ], "nonpayable">;
    fulfillAdvancedOrder: TypedContractMethod<[
        advancedOrder: AdvancedOrderStruct,
        criteriaResolvers: CriteriaResolverStruct[],
        fulfillerConduitKey: BytesLike,
        recipient: AddressLike
    ], [
        boolean
    ], "payable">;
    fulfillAvailableAdvancedOrders: TypedContractMethod<[
        advancedOrders: AdvancedOrderStruct[],
        criteriaResolvers: CriteriaResolverStruct[],
        offerFulfillments: FulfillmentComponentStruct[][],
        considerationFulfillments: FulfillmentComponentStruct[][],
        fulfillerConduitKey: BytesLike,
        recipient: AddressLike,
        maximumFulfilled: BigNumberish
    ], [
        [
            boolean[],
            ExecutionStructOutput[]
        ] & {
            availableOrders: boolean[];
            executions: ExecutionStructOutput[];
        }
    ], "payable">;
    fulfillAvailableOrders: TypedContractMethod<[
        orders: OrderStruct[],
        offerFulfillments: FulfillmentComponentStruct[][],
        considerationFulfillments: FulfillmentComponentStruct[][],
        fulfillerConduitKey: BytesLike,
        maximumFulfilled: BigNumberish
    ], [
        [
            boolean[],
            ExecutionStructOutput[]
        ] & {
            availableOrders: boolean[];
            executions: ExecutionStructOutput[];
        }
    ], "payable">;
    fulfillBasicOrder: TypedContractMethod<[
        parameters: BasicOrderParametersStruct
    ], [
        boolean
    ], "payable">;
    fulfillBasicOrder_efficient_6GL6yc: TypedContractMethod<[
        parameters: BasicOrderParametersStruct
    ], [
        boolean
    ], "payable">;
    fulfillOrder: TypedContractMethod<[
        order: OrderStruct,
        fulfillerConduitKey: BytesLike
    ], [
        boolean
    ], "payable">;
    getContractOffererNonce: TypedContractMethod<[
        contractOfferer: AddressLike
    ], [
        bigint
    ], "view">;
    getCounter: TypedContractMethod<[offerer: AddressLike], [bigint], "view">;
    getOrderHash: TypedContractMethod<[
        order: OrderComponentsStruct
    ], [
        string
    ], "view">;
    getOrderStatus: TypedContractMethod<[
        orderHash: BytesLike
    ], [
        [
            boolean,
            boolean,
            bigint,
            bigint
        ] & {
            isValidated: boolean;
            isCancelled: boolean;
            totalFilled: bigint;
            totalSize: bigint;
        }
    ], "view">;
    incrementCounter: TypedContractMethod<[], [bigint], "nonpayable">;
    information: TypedContractMethod<[
    ], [
        [
            string,
            string,
            string
        ] & {
            version: string;
            domainSeparator: string;
            conduitController: string;
        }
    ], "view">;
    matchAdvancedOrders: TypedContractMethod<[
        orders: AdvancedOrderStruct[],
        criteriaResolvers: CriteriaResolverStruct[],
        fulfillments: FulfillmentStruct[],
        recipient: AddressLike
    ], [
        ExecutionStructOutput[]
    ], "payable">;
    matchOrders: TypedContractMethod<[
        orders: OrderStruct[],
        fulfillments: FulfillmentStruct[]
    ], [
        ExecutionStructOutput[]
    ], "payable">;
    name: TypedContractMethod<[], [string], "view">;
    validate: TypedContractMethod<[
        orders: OrderStruct[]
    ], [
        boolean
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "cancel"): TypedContractMethod<[
        orders: OrderComponentsStruct[]
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "fulfillAdvancedOrder"): TypedContractMethod<[
        advancedOrder: AdvancedOrderStruct,
        criteriaResolvers: CriteriaResolverStruct[],
        fulfillerConduitKey: BytesLike,
        recipient: AddressLike
    ], [
        boolean
    ], "payable">;
    getFunction(nameOrSignature: "fulfillAvailableAdvancedOrders"): TypedContractMethod<[
        advancedOrders: AdvancedOrderStruct[],
        criteriaResolvers: CriteriaResolverStruct[],
        offerFulfillments: FulfillmentComponentStruct[][],
        considerationFulfillments: FulfillmentComponentStruct[][],
        fulfillerConduitKey: BytesLike,
        recipient: AddressLike,
        maximumFulfilled: BigNumberish
    ], [
        [
            boolean[],
            ExecutionStructOutput[]
        ] & {
            availableOrders: boolean[];
            executions: ExecutionStructOutput[];
        }
    ], "payable">;
    getFunction(nameOrSignature: "fulfillAvailableOrders"): TypedContractMethod<[
        orders: OrderStruct[],
        offerFulfillments: FulfillmentComponentStruct[][],
        considerationFulfillments: FulfillmentComponentStruct[][],
        fulfillerConduitKey: BytesLike,
        maximumFulfilled: BigNumberish
    ], [
        [
            boolean[],
            ExecutionStructOutput[]
        ] & {
            availableOrders: boolean[];
            executions: ExecutionStructOutput[];
        }
    ], "payable">;
    getFunction(nameOrSignature: "fulfillBasicOrder"): TypedContractMethod<[
        parameters: BasicOrderParametersStruct
    ], [
        boolean
    ], "payable">;
    getFunction(nameOrSignature: "fulfillBasicOrder_efficient_6GL6yc"): TypedContractMethod<[
        parameters: BasicOrderParametersStruct
    ], [
        boolean
    ], "payable">;
    getFunction(nameOrSignature: "fulfillOrder"): TypedContractMethod<[
        order: OrderStruct,
        fulfillerConduitKey: BytesLike
    ], [
        boolean
    ], "payable">;
    getFunction(nameOrSignature: "getContractOffererNonce"): TypedContractMethod<[contractOfferer: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "getCounter"): TypedContractMethod<[offerer: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "getOrderHash"): TypedContractMethod<[order: OrderComponentsStruct], [string], "view">;
    getFunction(nameOrSignature: "getOrderStatus"): TypedContractMethod<[
        orderHash: BytesLike
    ], [
        [
            boolean,
            boolean,
            bigint,
            bigint
        ] & {
            isValidated: boolean;
            isCancelled: boolean;
            totalFilled: bigint;
            totalSize: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "incrementCounter"): TypedContractMethod<[], [bigint], "nonpayable">;
    getFunction(nameOrSignature: "information"): TypedContractMethod<[
    ], [
        [
            string,
            string,
            string
        ] & {
            version: string;
            domainSeparator: string;
            conduitController: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "matchAdvancedOrders"): TypedContractMethod<[
        orders: AdvancedOrderStruct[],
        criteriaResolvers: CriteriaResolverStruct[],
        fulfillments: FulfillmentStruct[],
        recipient: AddressLike
    ], [
        ExecutionStructOutput[]
    ], "payable">;
    getFunction(nameOrSignature: "matchOrders"): TypedContractMethod<[
        orders: OrderStruct[],
        fulfillments: FulfillmentStruct[]
    ], [
        ExecutionStructOutput[]
    ], "payable">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "validate"): TypedContractMethod<[orders: OrderStruct[]], [boolean], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=ConsiderationInterface.d.ts.map