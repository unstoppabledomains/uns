import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
export interface IFaucetSmartAccountInterface extends Interface {
    getFunction(nameOrSignature: "addAuthorizedWorkers" | "removeAuthorizedWorkers" | "requestFunding" | "setWorkerBalanceThreshold" | "setWorkerFundingAmount" | "workerBalanceThreshold"): FunctionFragment;
    encodeFunctionData(functionFragment: "addAuthorizedWorkers", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "removeAuthorizedWorkers", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "requestFunding", values?: undefined): string;
    encodeFunctionData(functionFragment: "setWorkerBalanceThreshold", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setWorkerFundingAmount", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "workerBalanceThreshold", values?: undefined): string;
    decodeFunctionResult(functionFragment: "addAuthorizedWorkers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeAuthorizedWorkers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "requestFunding", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWorkerBalanceThreshold", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWorkerFundingAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "workerBalanceThreshold", data: BytesLike): Result;
}
export interface IFaucetSmartAccount extends BaseContract {
    connect(runner?: ContractRunner | null): IFaucetSmartAccount;
    waitForDeployment(): Promise<this>;
    interface: IFaucetSmartAccountInterface;
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
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addAuthorizedWorkers"): TypedContractMethod<[workers: AddressLike[]], [void], "nonpayable">;
    getFunction(nameOrSignature: "removeAuthorizedWorkers"): TypedContractMethod<[workers: AddressLike[]], [void], "nonpayable">;
    getFunction(nameOrSignature: "requestFunding"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "setWorkerBalanceThreshold"): TypedContractMethod<[threshold: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setWorkerFundingAmount"): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "workerBalanceThreshold"): TypedContractMethod<[], [bigint], "view">;
    filters: {};
}
//# sourceMappingURL=IFaucetSmartAccount.d.ts.map