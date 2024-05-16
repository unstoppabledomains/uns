import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../common";
export declare namespace IPriceOracle {
    type PriceStruct = {
        base: BigNumberish;
        premium: BigNumberish;
    };
    type PriceStructOutput = [base: bigint, premium: bigint] & {
        base: bigint;
        premium: bigint;
    };
}
export interface ETHRegistrarControllerInterface extends Interface {
    getFunction(nameOrSignature: "MIN_REGISTRATION_DURATION" | "available" | "commit" | "commitments" | "makeCommitment" | "maxCommitmentAge" | "minCommitmentAge" | "nameWrapper" | "owner" | "prices" | "recoverFunds" | "register" | "renew" | "renounceOwnership" | "rentPrice" | "reverseRegistrar" | "supportsInterface" | "transferOwnership" | "valid" | "withdraw"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "NameRegistered" | "NameRenewed" | "OwnershipTransferred"): EventFragment;
    encodeFunctionData(functionFragment: "MIN_REGISTRATION_DURATION", values?: undefined): string;
    encodeFunctionData(functionFragment: "available", values: [string]): string;
    encodeFunctionData(functionFragment: "commit", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "commitments", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "makeCommitment", values: [
        string,
        AddressLike,
        BigNumberish,
        BytesLike,
        AddressLike,
        BytesLike[],
        boolean,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "maxCommitmentAge", values?: undefined): string;
    encodeFunctionData(functionFragment: "minCommitmentAge", values?: undefined): string;
    encodeFunctionData(functionFragment: "nameWrapper", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "prices", values?: undefined): string;
    encodeFunctionData(functionFragment: "recoverFunds", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "register", values: [
        string,
        AddressLike,
        BigNumberish,
        BytesLike,
        AddressLike,
        BytesLike[],
        boolean,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "renew", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "rentPrice", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "reverseRegistrar", values?: undefined): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "valid", values: [string]): string;
    encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
    decodeFunctionResult(functionFragment: "MIN_REGISTRATION_DURATION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "available", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "commit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "commitments", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "makeCommitment", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "maxCommitmentAge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "minCommitmentAge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nameWrapper", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "prices", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "recoverFunds", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renew", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rentPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reverseRegistrar", data: BytesLike): Result;
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
        baseCost: BigNumberish,
        premium: BigNumberish,
        expires: BigNumberish
    ];
    type OutputTuple = [
        name: string,
        label: string,
        owner: string,
        baseCost: bigint,
        premium: bigint,
        expires: bigint
    ];
    interface OutputObject {
        name: string;
        label: string;
        owner: string;
        baseCost: bigint;
        premium: bigint;
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
export interface ETHRegistrarController extends BaseContract {
    connect(runner?: ContractRunner | null): ETHRegistrarController;
    waitForDeployment(): Promise<this>;
    interface: ETHRegistrarControllerInterface;
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
    makeCommitment: TypedContractMethod<[
        name: string,
        owner: AddressLike,
        duration: BigNumberish,
        secret: BytesLike,
        resolver: AddressLike,
        data: BytesLike[],
        reverseRecord: boolean,
        ownerControlledFuses: BigNumberish
    ], [
        string
    ], "view">;
    maxCommitmentAge: TypedContractMethod<[], [bigint], "view">;
    minCommitmentAge: TypedContractMethod<[], [bigint], "view">;
    nameWrapper: TypedContractMethod<[], [string], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    prices: TypedContractMethod<[], [string], "view">;
    recoverFunds: TypedContractMethod<[
        _token: AddressLike,
        _to: AddressLike,
        _amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    register: TypedContractMethod<[
        name: string,
        owner: AddressLike,
        duration: BigNumberish,
        secret: BytesLike,
        resolver: AddressLike,
        data: BytesLike[],
        reverseRecord: boolean,
        ownerControlledFuses: BigNumberish
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
        IPriceOracle.PriceStructOutput
    ], "view">;
    reverseRegistrar: TypedContractMethod<[], [string], "view">;
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
    getFunction(nameOrSignature: "makeCommitment"): TypedContractMethod<[
        name: string,
        owner: AddressLike,
        duration: BigNumberish,
        secret: BytesLike,
        resolver: AddressLike,
        data: BytesLike[],
        reverseRecord: boolean,
        ownerControlledFuses: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "maxCommitmentAge"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "minCommitmentAge"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "nameWrapper"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "prices"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "recoverFunds"): TypedContractMethod<[
        _token: AddressLike,
        _to: AddressLike,
        _amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "register"): TypedContractMethod<[
        name: string,
        owner: AddressLike,
        duration: BigNumberish,
        secret: BytesLike,
        resolver: AddressLike,
        data: BytesLike[],
        reverseRecord: boolean,
        ownerControlledFuses: BigNumberish
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
        IPriceOracle.PriceStructOutput
    ], "view">;
    getFunction(nameOrSignature: "reverseRegistrar"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceID: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "valid"): TypedContractMethod<[name: string], [boolean], "view">;
    getFunction(nameOrSignature: "withdraw"): TypedContractMethod<[], [void], "nonpayable">;
    getEvent(key: "NameRegistered"): TypedContractEvent<NameRegisteredEvent.InputTuple, NameRegisteredEvent.OutputTuple, NameRegisteredEvent.OutputObject>;
    getEvent(key: "NameRenewed"): TypedContractEvent<NameRenewedEvent.InputTuple, NameRenewedEvent.OutputTuple, NameRenewedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    filters: {
        "NameRegistered(string,bytes32,address,uint256,uint256,uint256)": TypedContractEvent<NameRegisteredEvent.InputTuple, NameRegisteredEvent.OutputTuple, NameRegisteredEvent.OutputObject>;
        NameRegistered: TypedContractEvent<NameRegisteredEvent.InputTuple, NameRegisteredEvent.OutputTuple, NameRegisteredEvent.OutputObject>;
        "NameRenewed(string,bytes32,uint256,uint256)": TypedContractEvent<NameRenewedEvent.InputTuple, NameRenewedEvent.OutputTuple, NameRenewedEvent.OutputObject>;
        NameRenewed: TypedContractEvent<NameRenewedEvent.InputTuple, NameRenewedEvent.OutputTuple, NameRenewedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    };
}
//# sourceMappingURL=ETHRegistrarController.d.ts.map