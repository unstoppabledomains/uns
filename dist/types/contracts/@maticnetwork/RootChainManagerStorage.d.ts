import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
export interface RootChainManagerStorageInterface extends Interface {
    getFunction(nameOrSignature: "tokenToType" | "typeToPredicate"): FunctionFragment;
    encodeFunctionData(functionFragment: "tokenToType", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "typeToPredicate", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "tokenToType", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeToPredicate", data: BytesLike): Result;
}
export interface RootChainManagerStorage extends BaseContract {
    connect(runner?: ContractRunner | null): RootChainManagerStorage;
    waitForDeployment(): Promise<this>;
    interface: RootChainManagerStorageInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    tokenToType: TypedContractMethod<[arg0: AddressLike], [string], "view">;
    typeToPredicate: TypedContractMethod<[arg0: BytesLike], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "tokenToType"): TypedContractMethod<[arg0: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "typeToPredicate"): TypedContractMethod<[arg0: BytesLike], [string], "view">;
    filters: {};
}
//# sourceMappingURL=RootChainManagerStorage.d.ts.map