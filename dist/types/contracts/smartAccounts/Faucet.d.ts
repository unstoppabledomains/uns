import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface FaucetInterface extends Interface {
    getFunction(nameOrSignature: "addAuthorizedWorkers" | "authorizedWorkers" | "fundWorker" | "initialize" | "owner" | "removeAuthorizedWorkers" | "renounceOwnership" | "setWorkerBalanceThreshold" | "setWorkerFundingAmount" | "transferOwnership" | "withdraw" | "withdrawAll" | "workerBalanceThreshold" | "workerFundingAmount"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized" | "OwnershipTransferred"): EventFragment;
    encodeFunctionData(functionFragment: "addAuthorizedWorkers", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "authorizedWorkers", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "fundWorker", values?: undefined): string;
    encodeFunctionData(functionFragment: "initialize", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "removeAuthorizedWorkers", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "setWorkerBalanceThreshold", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setWorkerFundingAmount", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "withdraw", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "withdrawAll", values?: undefined): string;
    encodeFunctionData(functionFragment: "workerBalanceThreshold", values?: undefined): string;
    encodeFunctionData(functionFragment: "workerFundingAmount", values?: undefined): string;
    decodeFunctionResult(functionFragment: "addAuthorizedWorkers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "authorizedWorkers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fundWorker", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeAuthorizedWorkers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWorkerBalanceThreshold", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWorkerFundingAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "workerBalanceThreshold", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "workerFundingAmount", data: BytesLike): Result;
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
export interface Faucet extends BaseContract {
    connect(runner?: ContractRunner | null): Faucet;
    waitForDeployment(): Promise<this>;
    interface: FaucetInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addAuthorizedWorkers: TypedContractMethod<[
        workers: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    authorizedWorkers: TypedContractMethod<[
        arg0: AddressLike
    ], [
        boolean
    ], "view">;
    fundWorker: TypedContractMethod<[], [void], "nonpayable">;
    initialize: TypedContractMethod<[
        _workerFundingAmount: BigNumberish,
        _workerBalanceThreshold: BigNumberish
    ], [
        void
    ], "nonpayable">;
    owner: TypedContractMethod<[], [string], "view">;
    removeAuthorizedWorkers: TypedContractMethod<[
        workers: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    setWorkerBalanceThreshold: TypedContractMethod<[
        threshold: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setWorkerFundingAmount: TypedContractMethod<[
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    withdraw: TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
    withdrawAll: TypedContractMethod<[], [void], "nonpayable">;
    workerBalanceThreshold: TypedContractMethod<[], [bigint], "view">;
    workerFundingAmount: TypedContractMethod<[], [bigint], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addAuthorizedWorkers"): TypedContractMethod<[workers: AddressLike[]], [void], "nonpayable">;
    getFunction(nameOrSignature: "authorizedWorkers"): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "fundWorker"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
        _workerFundingAmount: BigNumberish,
        _workerBalanceThreshold: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "removeAuthorizedWorkers"): TypedContractMethod<[workers: AddressLike[]], [void], "nonpayable">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "setWorkerBalanceThreshold"): TypedContractMethod<[threshold: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setWorkerFundingAmount"): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "withdraw"): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "withdrawAll"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "workerBalanceThreshold"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "workerFundingAmount"): TypedContractMethod<[], [bigint], "view">;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    filters: {
        "Initialized(uint8)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    };
}
//# sourceMappingURL=Faucet.d.ts.map