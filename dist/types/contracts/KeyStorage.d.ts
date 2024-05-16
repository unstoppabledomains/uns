import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../common";
export interface KeyStorageInterface extends Interface {
    getFunction(nameOrSignature: "addKey" | "getKey" | "getKeys"): FunctionFragment;
    encodeFunctionData(functionFragment: "addKey", values: [string]): string;
    encodeFunctionData(functionFragment: "getKey", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getKeys", values: [BigNumberish[]]): string;
    decodeFunctionResult(functionFragment: "addKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getKeys", data: BytesLike): Result;
}
export interface KeyStorage extends BaseContract {
    connect(runner?: ContractRunner | null): KeyStorage;
    waitForDeployment(): Promise<this>;
    interface: KeyStorageInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addKey: TypedContractMethod<[key: string], [void], "nonpayable">;
    getKey: TypedContractMethod<[keyHash: BigNumberish], [string], "view">;
    getKeys: TypedContractMethod<[hashes: BigNumberish[]], [string[]], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addKey"): TypedContractMethod<[key: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "getKey"): TypedContractMethod<[keyHash: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "getKeys"): TypedContractMethod<[hashes: BigNumberish[]], [string[]], "view">;
    filters: {};
}
//# sourceMappingURL=KeyStorage.d.ts.map