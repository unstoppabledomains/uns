import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../../common";
export interface IReverseRegistrarInterface extends Interface {
    getFunction(nameOrSignature: "claim" | "claimForAddr" | "claimWithResolver" | "node" | "setDefaultResolver" | "setName" | "setNameForAddr"): FunctionFragment;
    encodeFunctionData(functionFragment: "claim", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "claimForAddr", values: [AddressLike, AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "claimWithResolver", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "node", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setDefaultResolver", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setName", values: [string]): string;
    encodeFunctionData(functionFragment: "setNameForAddr", values: [AddressLike, AddressLike, AddressLike, string]): string;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimForAddr", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimWithResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "node", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDefaultResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setNameForAddr", data: BytesLike): Result;
}
export interface IReverseRegistrar extends BaseContract {
    connect(runner?: ContractRunner | null): IReverseRegistrar;
    waitForDeployment(): Promise<this>;
    interface: IReverseRegistrarInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    claim: TypedContractMethod<[owner: AddressLike], [string], "nonpayable">;
    claimForAddr: TypedContractMethod<[
        addr: AddressLike,
        owner: AddressLike,
        resolver: AddressLike
    ], [
        string
    ], "nonpayable">;
    claimWithResolver: TypedContractMethod<[
        owner: AddressLike,
        resolver: AddressLike
    ], [
        string
    ], "nonpayable">;
    node: TypedContractMethod<[addr: AddressLike], [string], "view">;
    setDefaultResolver: TypedContractMethod<[
        resolver: AddressLike
    ], [
        void
    ], "nonpayable">;
    setName: TypedContractMethod<[name: string], [string], "nonpayable">;
    setNameForAddr: TypedContractMethod<[
        addr: AddressLike,
        owner: AddressLike,
        resolver: AddressLike,
        name: string
    ], [
        string
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "claim"): TypedContractMethod<[owner: AddressLike], [string], "nonpayable">;
    getFunction(nameOrSignature: "claimForAddr"): TypedContractMethod<[
        addr: AddressLike,
        owner: AddressLike,
        resolver: AddressLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "claimWithResolver"): TypedContractMethod<[
        owner: AddressLike,
        resolver: AddressLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "node"): TypedContractMethod<[addr: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "setDefaultResolver"): TypedContractMethod<[resolver: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "setName"): TypedContractMethod<[name: string], [string], "nonpayable">;
    getFunction(nameOrSignature: "setNameForAddr"): TypedContractMethod<[
        addr: AddressLike,
        owner: AddressLike,
        resolver: AddressLike,
        name: string
    ], [
        string
    ], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=IReverseRegistrar.d.ts.map