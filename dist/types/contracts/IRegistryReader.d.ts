import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../common";
export interface IRegistryReaderInterface extends Interface {
    getFunction(nameOrSignature: "balanceOf" | "exists" | "getApproved" | "isApprovedForAll" | "isApprovedOrOwner" | "namehash" | "ownerOf" | "resolverOf" | "reverseNameOf" | "reverseOf" | "tokenURI"): FunctionFragment;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "exists", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getApproved", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "isApprovedOrOwner", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "namehash", values: [string[]]): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "resolverOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "reverseNameOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "reverseOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exists", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getApproved", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedOrOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "namehash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resolverOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reverseNameOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reverseOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
}
export interface IRegistryReader extends BaseContract {
    connect(runner?: ContractRunner | null): IRegistryReader;
    waitForDeployment(): Promise<this>;
    interface: IRegistryReaderInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    balanceOf: TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    exists: TypedContractMethod<[tokenId: BigNumberish], [boolean], "view">;
    getApproved: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    isApprovedForAll: TypedContractMethod<[
        owner: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], "view">;
    isApprovedOrOwner: TypedContractMethod<[
        spender: AddressLike,
        tokenId: BigNumberish
    ], [
        boolean
    ], "view">;
    namehash: TypedContractMethod<[labels: string[]], [bigint], "view">;
    ownerOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    resolverOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    reverseNameOf: TypedContractMethod<[addr: AddressLike], [string], "view">;
    reverseOf: TypedContractMethod<[addr: AddressLike], [bigint], "view">;
    tokenURI: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "exists"): TypedContractMethod<[tokenId: BigNumberish], [boolean], "view">;
    getFunction(nameOrSignature: "getApproved"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "isApprovedForAll"): TypedContractMethod<[
        owner: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "isApprovedOrOwner"): TypedContractMethod<[
        spender: AddressLike,
        tokenId: BigNumberish
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "namehash"): TypedContractMethod<[labels: string[]], [bigint], "view">;
    getFunction(nameOrSignature: "ownerOf"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "resolverOf"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "reverseNameOf"): TypedContractMethod<[addr: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "reverseOf"): TypedContractMethod<[addr: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "tokenURI"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    filters: {};
}
//# sourceMappingURL=IRegistryReader.d.ts.map