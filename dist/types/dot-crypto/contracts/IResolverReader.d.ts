import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
export interface IResolverReaderInterface extends Interface {
    getFunction(nameOrSignature: "get" | "getByHash" | "getMany" | "getManyByHash" | "nonceOf" | "registry"): FunctionFragment;
    encodeFunctionData(functionFragment: "get", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getByHash", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getMany", values: [string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "getManyByHash", values: [BigNumberish[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "registry", values?: undefined): string;
    decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getManyByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
}
export interface IResolverReader extends BaseContract {
    connect(runner?: ContractRunner | null): IResolverReader;
    waitForDeployment(): Promise<this>;
    interface: IResolverReaderInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    get: TypedContractMethod<[
        key: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getByHash: TypedContractMethod<[
        keyHash: BigNumberish,
        tokenId: BigNumberish
    ], [
        [string, string] & {
            key: string;
            value: string;
        }
    ], "view">;
    getMany: TypedContractMethod<[
        keys: string[],
        tokenId: BigNumberish
    ], [
        string[]
    ], "view">;
    getManyByHash: TypedContractMethod<[
        keyHashes: BigNumberish[],
        tokenId: BigNumberish
    ], [
        [string[], string[]] & {
            keys: string[];
            values: string[];
        }
    ], "view">;
    nonceOf: TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    registry: TypedContractMethod<[], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "get"): TypedContractMethod<[
        key: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "getByHash"): TypedContractMethod<[
        keyHash: BigNumberish,
        tokenId: BigNumberish
    ], [
        [string, string] & {
            key: string;
            value: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "getMany"): TypedContractMethod<[
        keys: string[],
        tokenId: BigNumberish
    ], [
        string[]
    ], "view">;
    getFunction(nameOrSignature: "getManyByHash"): TypedContractMethod<[
        keyHashes: BigNumberish[],
        tokenId: BigNumberish
    ], [
        [string[], string[]] & {
            keys: string[];
            values: string[];
        }
    ], "view">;
    getFunction(nameOrSignature: "nonceOf"): TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "registry"): TypedContractMethod<[], [string], "view">;
    filters: {};
}
//# sourceMappingURL=IResolverReader.d.ts.map