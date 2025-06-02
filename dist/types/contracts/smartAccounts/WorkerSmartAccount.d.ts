import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
export interface WorkerSmartAccountInterface extends Interface {
    getFunction(nameOrSignature: "executeBatch" | "executeBatchAndEnsureBalance" | "faucet"): FunctionFragment;
    encodeFunctionData(functionFragment: "executeBatch", values: [AddressLike[], BytesLike[], BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "executeBatchAndEnsureBalance", values: [AddressLike[], BytesLike[], BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "faucet", values?: undefined): string;
    decodeFunctionResult(functionFragment: "executeBatch", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeBatchAndEnsureBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "faucet", data: BytesLike): Result;
}
export interface WorkerSmartAccount extends BaseContract {
    connect(runner?: ContractRunner | null): WorkerSmartAccount;
    waitForDeployment(): Promise<this>;
    interface: WorkerSmartAccountInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    executeBatch: TypedContractMethod<[
        targets: AddressLike[],
        datas: BytesLike[],
        values: BigNumberish[]
    ], [
        void
    ], "payable">;
    executeBatchAndEnsureBalance: TypedContractMethod<[
        targets: AddressLike[],
        datas: BytesLike[],
        values: BigNumberish[]
    ], [
        void
    ], "payable">;
    faucet: TypedContractMethod<[], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "executeBatch"): TypedContractMethod<[
        targets: AddressLike[],
        datas: BytesLike[],
        values: BigNumberish[]
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "executeBatchAndEnsureBalance"): TypedContractMethod<[
        targets: AddressLike[],
        datas: BytesLike[],
        values: BigNumberish[]
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "faucet"): TypedContractMethod<[], [string], "view">;
    filters: {};
}
//# sourceMappingURL=WorkerSmartAccount.d.ts.map