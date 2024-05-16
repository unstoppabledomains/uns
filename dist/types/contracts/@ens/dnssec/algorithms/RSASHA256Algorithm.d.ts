import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../../common";
export interface RSASHA256AlgorithmInterface extends Interface {
    getFunction(nameOrSignature: "verify"): FunctionFragment;
    encodeFunctionData(functionFragment: "verify", values: [BytesLike, BytesLike, BytesLike]): string;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
}
export interface RSASHA256Algorithm extends BaseContract {
    connect(runner?: ContractRunner | null): RSASHA256Algorithm;
    waitForDeployment(): Promise<this>;
    interface: RSASHA256AlgorithmInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    verify: TypedContractMethod<[
        key: BytesLike,
        data: BytesLike,
        sig: BytesLike
    ], [
        boolean
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "verify"): TypedContractMethod<[
        key: BytesLike,
        data: BytesLike,
        sig: BytesLike
    ], [
        boolean
    ], "view">;
    filters: {};
}
//# sourceMappingURL=RSASHA256Algorithm.d.ts.map