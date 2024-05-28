import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
export declare type SpentItemStruct = {
    itemType: BigNumberish;
    token: AddressLike;
    identifier: BigNumberish;
    amount: BigNumberish;
};
export declare type SpentItemStructOutput = [
    itemType: bigint,
    token: string,
    identifier: bigint,
    amount: bigint
] & {
    itemType: bigint;
    token: string;
    identifier: bigint;
    amount: bigint;
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
export interface ConsiderationInterface extends Interface {
    getFunction(nameOrSignature: "__activateTstore" | "cancel" | "fulfillAdvancedOrder" | "fulfillAvailableAdvancedOrders" | "fulfillAvailableOrders" | "fulfillBasicOrder" | "fulfillBasicOrder_efficient_6GL6yc" | "fulfillOrder" | "getContractOffererNonce" | "getCounter" | "getOrderHash" | "getOrderStatus" | "incrementCounter" | "information" | "matchAdvancedOrders" | "matchOrders" | "name" | "validate"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "CounterIncremented" | "OrderCancelled" | "OrderFulfilled" | "OrderValidated" | "OrdersMatched"): EventFragment;
    encodeFunctionData(functionFragment: "__activateTstore", values?: undefined): string;
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
    decodeFunctionResult(functionFragment: "__activateTstore", data: BytesLike): Result;
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
export declare namespace CounterIncrementedEvent {
    type InputTuple = [newCounter: BigNumberish, offerer: AddressLike];
    type OutputTuple = [newCounter: bigint, offerer: string];
    interface OutputObject {
        newCounter: bigint;
        offerer: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OrderCancelledEvent {
    type InputTuple = [
        orderHash: BytesLike,
        offerer: AddressLike,
        zone: AddressLike
    ];
    type OutputTuple = [orderHash: string, offerer: string, zone: string];
    interface OutputObject {
        orderHash: string;
        offerer: string;
        zone: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OrderFulfilledEvent {
    type InputTuple = [
        orderHash: BytesLike,
        offerer: AddressLike,
        zone: AddressLike,
        recipient: AddressLike,
        offer: SpentItemStruct[],
        consideration: ReceivedItemStruct[]
    ];
    type OutputTuple = [
        orderHash: string,
        offerer: string,
        zone: string,
        recipient: string,
        offer: SpentItemStructOutput[],
        consideration: ReceivedItemStructOutput[]
    ];
    interface OutputObject {
        orderHash: string;
        offerer: string;
        zone: string;
        recipient: string;
        offer: SpentItemStructOutput[];
        consideration: ReceivedItemStructOutput[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OrderValidatedEvent {
    type InputTuple = [
        orderHash: BytesLike,
        orderParameters: OrderParametersStruct
    ];
    type OutputTuple = [
        orderHash: string,
        orderParameters: OrderParametersStructOutput
    ];
    interface OutputObject {
        orderHash: string;
        orderParameters: OrderParametersStructOutput;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OrdersMatchedEvent {
    type InputTuple = [orderHashes: BytesLike[]];
    type OutputTuple = [orderHashes: string[]];
    interface OutputObject {
        orderHashes: string[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface Consideration extends BaseContract {
    connect(runner?: ContractRunner | null): Consideration;
    waitForDeployment(): Promise<this>;
    interface: ConsiderationInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    __activateTstore: TypedContractMethod<[], [void], "nonpayable">;
    cancel: TypedContractMethod<[
        orders: OrderComponentsStruct[]
    ], [
        boolean
    ], "nonpayable">;
    fulfillAdvancedOrder: TypedContractMethod<[
        arg0: AdvancedOrderStruct,
        arg1: CriteriaResolverStruct[],
        fulfillerConduitKey: BytesLike,
        recipient: AddressLike
    ], [
        boolean
    ], "payable">;
    fulfillAvailableAdvancedOrders: TypedContractMethod<[
        arg0: AdvancedOrderStruct[],
        arg1: CriteriaResolverStruct[],
        arg2: FulfillmentComponentStruct[][],
        arg3: FulfillmentComponentStruct[][],
        fulfillerConduitKey: BytesLike,
        recipient: AddressLike,
        maximumFulfilled: BigNumberish
    ], [
        [boolean[], ExecutionStructOutput[]]
    ], "payable">;
    fulfillAvailableOrders: TypedContractMethod<[
        arg0: OrderStruct[],
        arg1: FulfillmentComponentStruct[][],
        arg2: FulfillmentComponentStruct[][],
        fulfillerConduitKey: BytesLike,
        maximumFulfilled: BigNumberish
    ], [
        [boolean[], ExecutionStructOutput[]]
    ], "payable">;
    fulfillBasicOrder: TypedContractMethod<[
        arg0: BasicOrderParametersStruct
    ], [
        boolean
    ], "payable">;
    fulfillBasicOrder_efficient_6GL6yc: TypedContractMethod<[
        arg0: BasicOrderParametersStruct
    ], [
        boolean
    ], "payable">;
    fulfillOrder: TypedContractMethod<[
        arg0: OrderStruct,
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
        arg0: OrderComponentsStruct
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
        arg0: AdvancedOrderStruct[],
        arg1: CriteriaResolverStruct[],
        arg2: FulfillmentStruct[],
        recipient: AddressLike
    ], [
        ExecutionStructOutput[]
    ], "payable">;
    matchOrders: TypedContractMethod<[
        arg0: OrderStruct[],
        arg1: FulfillmentStruct[]
    ], [
        ExecutionStructOutput[]
    ], "payable">;
    name: TypedContractMethod<[], [string], "view">;
    validate: TypedContractMethod<[arg0: OrderStruct[]], [boolean], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "__activateTstore"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "cancel"): TypedContractMethod<[
        orders: OrderComponentsStruct[]
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "fulfillAdvancedOrder"): TypedContractMethod<[
        arg0: AdvancedOrderStruct,
        arg1: CriteriaResolverStruct[],
        fulfillerConduitKey: BytesLike,
        recipient: AddressLike
    ], [
        boolean
    ], "payable">;
    getFunction(nameOrSignature: "fulfillAvailableAdvancedOrders"): TypedContractMethod<[
        arg0: AdvancedOrderStruct[],
        arg1: CriteriaResolverStruct[],
        arg2: FulfillmentComponentStruct[][],
        arg3: FulfillmentComponentStruct[][],
        fulfillerConduitKey: BytesLike,
        recipient: AddressLike,
        maximumFulfilled: BigNumberish
    ], [
        [boolean[], ExecutionStructOutput[]]
    ], "payable">;
    getFunction(nameOrSignature: "fulfillAvailableOrders"): TypedContractMethod<[
        arg0: OrderStruct[],
        arg1: FulfillmentComponentStruct[][],
        arg2: FulfillmentComponentStruct[][],
        fulfillerConduitKey: BytesLike,
        maximumFulfilled: BigNumberish
    ], [
        [boolean[], ExecutionStructOutput[]]
    ], "payable">;
    getFunction(nameOrSignature: "fulfillBasicOrder"): TypedContractMethod<[
        arg0: BasicOrderParametersStruct
    ], [
        boolean
    ], "payable">;
    getFunction(nameOrSignature: "fulfillBasicOrder_efficient_6GL6yc"): TypedContractMethod<[
        arg0: BasicOrderParametersStruct
    ], [
        boolean
    ], "payable">;
    getFunction(nameOrSignature: "fulfillOrder"): TypedContractMethod<[
        arg0: OrderStruct,
        fulfillerConduitKey: BytesLike
    ], [
        boolean
    ], "payable">;
    getFunction(nameOrSignature: "getContractOffererNonce"): TypedContractMethod<[contractOfferer: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "getCounter"): TypedContractMethod<[offerer: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "getOrderHash"): TypedContractMethod<[arg0: OrderComponentsStruct], [string], "view">;
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
        arg0: AdvancedOrderStruct[],
        arg1: CriteriaResolverStruct[],
        arg2: FulfillmentStruct[],
        recipient: AddressLike
    ], [
        ExecutionStructOutput[]
    ], "payable">;
    getFunction(nameOrSignature: "matchOrders"): TypedContractMethod<[
        arg0: OrderStruct[],
        arg1: FulfillmentStruct[]
    ], [
        ExecutionStructOutput[]
    ], "payable">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "validate"): TypedContractMethod<[arg0: OrderStruct[]], [boolean], "nonpayable">;
    getEvent(key: "CounterIncremented"): TypedContractEvent<CounterIncrementedEvent.InputTuple, CounterIncrementedEvent.OutputTuple, CounterIncrementedEvent.OutputObject>;
    getEvent(key: "OrderCancelled"): TypedContractEvent<OrderCancelledEvent.InputTuple, OrderCancelledEvent.OutputTuple, OrderCancelledEvent.OutputObject>;
    getEvent(key: "OrderFulfilled"): TypedContractEvent<OrderFulfilledEvent.InputTuple, OrderFulfilledEvent.OutputTuple, OrderFulfilledEvent.OutputObject>;
    getEvent(key: "OrderValidated"): TypedContractEvent<OrderValidatedEvent.InputTuple, OrderValidatedEvent.OutputTuple, OrderValidatedEvent.OutputObject>;
    getEvent(key: "OrdersMatched"): TypedContractEvent<OrdersMatchedEvent.InputTuple, OrdersMatchedEvent.OutputTuple, OrdersMatchedEvent.OutputObject>;
    filters: {
        "CounterIncremented(uint256,address)": TypedContractEvent<CounterIncrementedEvent.InputTuple, CounterIncrementedEvent.OutputTuple, CounterIncrementedEvent.OutputObject>;
        CounterIncremented: TypedContractEvent<CounterIncrementedEvent.InputTuple, CounterIncrementedEvent.OutputTuple, CounterIncrementedEvent.OutputObject>;
        "OrderCancelled(bytes32,address,address)": TypedContractEvent<OrderCancelledEvent.InputTuple, OrderCancelledEvent.OutputTuple, OrderCancelledEvent.OutputObject>;
        OrderCancelled: TypedContractEvent<OrderCancelledEvent.InputTuple, OrderCancelledEvent.OutputTuple, OrderCancelledEvent.OutputObject>;
        "OrderFulfilled(bytes32,address,address,address,tuple[],tuple[])": TypedContractEvent<OrderFulfilledEvent.InputTuple, OrderFulfilledEvent.OutputTuple, OrderFulfilledEvent.OutputObject>;
        OrderFulfilled: TypedContractEvent<OrderFulfilledEvent.InputTuple, OrderFulfilledEvent.OutputTuple, OrderFulfilledEvent.OutputObject>;
        "OrderValidated(bytes32,tuple)": TypedContractEvent<OrderValidatedEvent.InputTuple, OrderValidatedEvent.OutputTuple, OrderValidatedEvent.OutputObject>;
        OrderValidated: TypedContractEvent<OrderValidatedEvent.InputTuple, OrderValidatedEvent.OutputTuple, OrderValidatedEvent.OutputObject>;
        "OrdersMatched(bytes32[])": TypedContractEvent<OrdersMatchedEvent.InputTuple, OrdersMatchedEvent.OutputTuple, OrdersMatchedEvent.OutputObject>;
        OrdersMatched: TypedContractEvent<OrdersMatchedEvent.InputTuple, OrdersMatchedEvent.OutputTuple, OrdersMatchedEvent.OutputObject>;
    };
}
//# sourceMappingURL=Consideration.d.ts.map