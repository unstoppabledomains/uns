import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
export interface LegacyETHRegistrarControllerInterface extends Interface {
    getFunction(nameOrSignature: "MIN_REGISTRATION_DURATION" | "available" | "commit" | "commitments" | "isOwner" | "makeCommitment" | "makeCommitmentWithConfig" | "maxCommitmentAge" | "minCommitmentAge" | "owner" | "register" | "registerWithConfig" | "renew" | "renounceOwnership" | "rentPrice" | "setCommitmentAges" | "setPriceOracle" | "supportsInterface" | "transferOwnership" | "valid" | "withdraw"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "NameRegistered" | "NameRenewed" | "NewPriceOracle" | "OwnershipTransferred"): EventFragment;
    encodeFunctionData(functionFragment: "MIN_REGISTRATION_DURATION", values?: undefined): string;
    encodeFunctionData(functionFragment: "available", values: [string]): string;
    encodeFunctionData(functionFragment: "commit", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "commitments", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "isOwner", values?: undefined): string;
    encodeFunctionData(functionFragment: "makeCommitment", values: [string, AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "makeCommitmentWithConfig", values: [string, AddressLike, BytesLike, AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "maxCommitmentAge", values?: undefined): string;
    encodeFunctionData(functionFragment: "minCommitmentAge", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "register", values: [string, AddressLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "registerWithConfig", values: [
        string,
        AddressLike,
        BigNumberish,
        BytesLike,
        AddressLike,
        AddressLike
    ]): string;
    encodeFunctionData(functionFragment: "renew", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "rentPrice", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setCommitmentAges", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setPriceOracle", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "valid", values: [string]): string;
    encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
    decodeFunctionResult(functionFragment: "MIN_REGISTRATION_DURATION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "available", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "commit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "commitments", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "makeCommitment", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "makeCommitmentWithConfig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "maxCommitmentAge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "minCommitmentAge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerWithConfig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renew", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rentPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setCommitmentAges", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPriceOracle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "valid", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}
export declare namespace NameRegisteredEvent {
    type InputTuple = [
        name: string,
        label: BytesLike,
        owner: AddressLike,
        cost: BigNumberish,
        expires: BigNumberish
    ];
    type OutputTuple = [
        name: string,
        label: string,
        owner: string,
        cost: bigint,
        expires: bigint
    ];
    interface OutputObject {
        name: string;
        label: string;
        owner: string;
        cost: bigint;
        expires: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NameRenewedEvent {
    type InputTuple = [
        name: string,
        label: BytesLike,
        cost: BigNumberish,
        expires: BigNumberish
    ];
    type OutputTuple = [
        name: string,
        label: string,
        cost: bigint,
        expires: bigint
    ];
    interface OutputObject {
        name: string;
        label: string;
        cost: bigint;
        expires: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NewPriceOracleEvent {
    type InputTuple = [oracle: AddressLike];
    type OutputTuple = [oracle: string];
    interface OutputObject {
        oracle: string;
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
export interface LegacyETHRegistrarController extends BaseContract {
    connect(runner?: ContractRunner | null): LegacyETHRegistrarController;
    waitForDeployment(): Promise<this>;
    interface: LegacyETHRegistrarControllerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    MIN_REGISTRATION_DURATION: TypedContractMethod<[], [bigint], "view">;
    available: TypedContractMethod<[name: string], [boolean], "view">;
    commit: TypedContractMethod<[commitment: BytesLike], [void], "nonpayable">;
    commitments: TypedContractMethod<[arg0: BytesLike], [bigint], "view">;
    isOwner: TypedContractMethod<[], [boolean], "view">;
    makeCommitment: TypedContractMethod<[
        name: string,
        owner: AddressLike,
        secret: BytesLike
    ], [
        string
    ], "view">;
    makeCommitmentWithConfig: TypedContractMethod<[
        name: string,
        owner: AddressLike,
        secret: BytesLike,
        resolver: AddressLike,
        addr: AddressLike
    ], [
        string
    ], "view">;
    maxCommitmentAge: TypedContractMethod<[], [bigint], "view">;
    minCommitmentAge: TypedContractMethod<[], [bigint], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    register: TypedContractMethod<[
        name: string,
        owner: AddressLike,
        duration: BigNumberish,
        secret: BytesLike
    ], [
        void
    ], "payable">;
    registerWithConfig: TypedContractMethod<[
        name: string,
        owner: AddressLike,
        duration: BigNumberish,
        secret: BytesLike,
        resolver: AddressLike,
        addr: AddressLike
    ], [
        void
    ], "payable">;
    renew: TypedContractMethod<[
        name: string,
        duration: BigNumberish
    ], [
        void
    ], "payable">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    rentPrice: TypedContractMethod<[
        name: string,
        duration: BigNumberish
    ], [
        bigint
    ], "view">;
    setCommitmentAges: TypedContractMethod<[
        _minCommitmentAge: BigNumberish,
        _maxCommitmentAge: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setPriceOracle: TypedContractMethod<[
        _prices: AddressLike
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
    valid: TypedContractMethod<[name: string], [boolean], "view">;
    withdraw: TypedContractMethod<[], [void], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "MIN_REGISTRATION_DURATION"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "available"): TypedContractMethod<[name: string], [boolean], "view">;
    getFunction(nameOrSignature: "commit"): TypedContractMethod<[commitment: BytesLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "commitments"): TypedContractMethod<[arg0: BytesLike], [bigint], "view">;
    getFunction(nameOrSignature: "isOwner"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "makeCommitment"): TypedContractMethod<[
        name: string,
        owner: AddressLike,
        secret: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "makeCommitmentWithConfig"): TypedContractMethod<[
        name: string,
        owner: AddressLike,
        secret: BytesLike,
        resolver: AddressLike,
        addr: AddressLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "maxCommitmentAge"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "minCommitmentAge"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "register"): TypedContractMethod<[
        name: string,
        owner: AddressLike,
        duration: BigNumberish,
        secret: BytesLike
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "registerWithConfig"): TypedContractMethod<[
        name: string,
        owner: AddressLike,
        duration: BigNumberish,
        secret: BytesLike,
        resolver: AddressLike,
        addr: AddressLike
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "renew"): TypedContractMethod<[
        name: string,
        duration: BigNumberish
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "rentPrice"): TypedContractMethod<[
        name: string,
        duration: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "setCommitmentAges"): TypedContractMethod<[
        _minCommitmentAge: BigNumberish,
        _maxCommitmentAge: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setPriceOracle"): TypedContractMethod<[_prices: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceID: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "valid"): TypedContractMethod<[name: string], [boolean], "view">;
    getFunction(nameOrSignature: "withdraw"): TypedContractMethod<[], [void], "nonpayable">;
    getEvent(key: "NameRegistered"): TypedContractEvent<NameRegisteredEvent.InputTuple, NameRegisteredEvent.OutputTuple, NameRegisteredEvent.OutputObject>;
    getEvent(key: "NameRenewed"): TypedContractEvent<NameRenewedEvent.InputTuple, NameRenewedEvent.OutputTuple, NameRenewedEvent.OutputObject>;
    getEvent(key: "NewPriceOracle"): TypedContractEvent<NewPriceOracleEvent.InputTuple, NewPriceOracleEvent.OutputTuple, NewPriceOracleEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    filters: {
        "NameRegistered(string,bytes32,address,uint256,uint256)": TypedContractEvent<NameRegisteredEvent.InputTuple, NameRegisteredEvent.OutputTuple, NameRegisteredEvent.OutputObject>;
        NameRegistered: TypedContractEvent<NameRegisteredEvent.InputTuple, NameRegisteredEvent.OutputTuple, NameRegisteredEvent.OutputObject>;
        "NameRenewed(string,bytes32,uint256,uint256)": TypedContractEvent<NameRenewedEvent.InputTuple, NameRenewedEvent.OutputTuple, NameRenewedEvent.OutputObject>;
        NameRenewed: TypedContractEvent<NameRenewedEvent.InputTuple, NameRenewedEvent.OutputTuple, NameRenewedEvent.OutputObject>;
        "NewPriceOracle(address)": TypedContractEvent<NewPriceOracleEvent.InputTuple, NewPriceOracleEvent.OutputTuple, NewPriceOracleEvent.OutputObject>;
        NewPriceOracle: TypedContractEvent<NewPriceOracleEvent.InputTuple, NewPriceOracleEvent.OutputTuple, NewPriceOracleEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    };
}
//# sourceMappingURL=LegacyETHRegistrarController.d.ts.map