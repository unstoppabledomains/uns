import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
export interface FaucetInterface extends Interface {
    getFunction(nameOrSignature: "VERSION" | "addAuthorizedWorkers" | "authorizedWorkers" | "removeAuthorizedWorkers" | "requestFunding" | "setWorkerBalanceThreshold" | "setWorkerFundingAmount" | "workerBalanceThreshold" | "workerFundingAmount"): FunctionFragment;
    encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "addAuthorizedWorkers", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "authorizedWorkers", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "removeAuthorizedWorkers", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "requestFunding", values?: undefined): string;
    encodeFunctionData(functionFragment: "setWorkerBalanceThreshold", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setWorkerFundingAmount", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "workerBalanceThreshold", values?: undefined): string;
    encodeFunctionData(functionFragment: "workerFundingAmount", values?: undefined): string;
    decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addAuthorizedWorkers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "authorizedWorkers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeAuthorizedWorkers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "requestFunding", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWorkerBalanceThreshold", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWorkerFundingAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "workerBalanceThreshold", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "workerFundingAmount", data: BytesLike): Result;
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
    VERSION: TypedContractMethod<[], [string], "view">;
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
    removeAuthorizedWorkers: TypedContractMethod<[
        workers: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    requestFunding: TypedContractMethod<[], [void], "nonpayable">;
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
    workerBalanceThreshold: TypedContractMethod<[], [bigint], "view">;
    workerFundingAmount: TypedContractMethod<[], [bigint], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "VERSION"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "addAuthorizedWorkers"): TypedContractMethod<[workers: AddressLike[]], [void], "nonpayable">;
    getFunction(nameOrSignature: "authorizedWorkers"): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "removeAuthorizedWorkers"): TypedContractMethod<[workers: AddressLike[]], [void], "nonpayable">;
    getFunction(nameOrSignature: "requestFunding"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "setWorkerBalanceThreshold"): TypedContractMethod<[threshold: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setWorkerFundingAmount"): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "workerBalanceThreshold"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "workerFundingAmount"): TypedContractMethod<[], [bigint], "view">;
    filters: {};
}
//# sourceMappingURL=Faucet.d.ts.map