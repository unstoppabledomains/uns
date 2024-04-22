import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../../common";
export interface RootChainManagerStorageInterface extends Interface {
    getFunction(nameOrSignature: "childChainManagerAddress" | "childToRootToken" | "processedExits" | "rootToChildToken" | "tokenToType" | "typeToPredicate"): FunctionFragment;
    encodeFunctionData(functionFragment: "childChainManagerAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "childToRootToken", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "processedExits", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "rootToChildToken", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "tokenToType", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "typeToPredicate", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "childChainManagerAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "childToRootToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "processedExits", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rootToChildToken", data: BytesLike): Result;
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
    childChainManagerAddress: TypedContractMethod<[], [string], "view">;
    childToRootToken: TypedContractMethod<[arg0: AddressLike], [string], "view">;
    processedExits: TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
    rootToChildToken: TypedContractMethod<[arg0: AddressLike], [string], "view">;
    tokenToType: TypedContractMethod<[arg0: AddressLike], [string], "view">;
    typeToPredicate: TypedContractMethod<[arg0: BytesLike], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "childChainManagerAddress"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "childToRootToken"): TypedContractMethod<[arg0: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "processedExits"): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "rootToChildToken"): TypedContractMethod<[arg0: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "tokenToType"): TypedContractMethod<[arg0: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "typeToPredicate"): TypedContractMethod<[arg0: BytesLike], [string], "view">;
    filters: {};
}
//# sourceMappingURL=RootChainManagerStorage.d.ts.map