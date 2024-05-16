import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../../common";
export interface IMulticallableInterface extends Interface {
    getFunction(nameOrSignature: "multicall" | "multicallWithNodeCheck"): FunctionFragment;
    encodeFunctionData(functionFragment: "multicall", values: [BytesLike[]]): string;
    encodeFunctionData(functionFragment: "multicallWithNodeCheck", values: [BytesLike, BytesLike[]]): string;
    decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "multicallWithNodeCheck", data: BytesLike): Result;
}
export interface IMulticallable extends BaseContract {
    connect(runner?: ContractRunner | null): IMulticallable;
    waitForDeployment(): Promise<this>;
    interface: IMulticallableInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    multicall: TypedContractMethod<[data: BytesLike[]], [string[]], "nonpayable">;
    multicallWithNodeCheck: TypedContractMethod<[
        arg0: BytesLike,
        data: BytesLike[]
    ], [
        string[]
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "multicall"): TypedContractMethod<[data: BytesLike[]], [string[]], "nonpayable">;
    getFunction(nameOrSignature: "multicallWithNodeCheck"): TypedContractMethod<[
        arg0: BytesLike,
        data: BytesLike[]
    ], [
        string[]
    ], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=IMulticallable.d.ts.map