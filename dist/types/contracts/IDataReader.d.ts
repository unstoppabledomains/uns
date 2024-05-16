import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../common";
export interface IDataReaderInterface extends Interface {
    getFunction(nameOrSignature: "getData" | "getDataByHash" | "getDataByHashForMany" | "getDataForMany" | "ownerOfForMany"): FunctionFragment;
    encodeFunctionData(functionFragment: "getData", values: [string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "getDataByHash", values: [BigNumberish[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "getDataByHashForMany", values: [BigNumberish[], BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "getDataForMany", values: [string[], BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "ownerOfForMany", values: [BigNumberish[]]): string;
    decodeFunctionResult(functionFragment: "getData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDataByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDataByHashForMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDataForMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOfForMany", data: BytesLike): Result;
}
export interface IDataReader extends BaseContract {
    connect(runner?: ContractRunner | null): IDataReader;
    waitForDeployment(): Promise<this>;
    interface: IDataReaderInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    getData: TypedContractMethod<[
        keys: string[],
        tokenId: BigNumberish
    ], [
        [
            string,
            string,
            string[]
        ] & {
            resolver: string;
            owner: string;
            values: string[];
        }
    ], "view">;
    getDataByHash: TypedContractMethod<[
        keyHashes: BigNumberish[],
        tokenId: BigNumberish
    ], [
        [
            string,
            string,
            string[],
            string[]
        ] & {
            resolver: string;
            owner: string;
            keys: string[];
            values: string[];
        }
    ], "view">;
    getDataByHashForMany: TypedContractMethod<[
        keyHashes: BigNumberish[],
        tokenIds: BigNumberish[]
    ], [
        [
            string[],
            string[],
            string[][],
            string[][]
        ] & {
            resolvers: string[];
            owners: string[];
            keys: string[][];
            values: string[][];
        }
    ], "view">;
    getDataForMany: TypedContractMethod<[
        keys: string[],
        tokenIds: BigNumberish[]
    ], [
        [
            string[],
            string[],
            string[][]
        ] & {
            resolvers: string[];
            owners: string[];
            values: string[][];
        }
    ], "view">;
    ownerOfForMany: TypedContractMethod<[
        tokenIds: BigNumberish[]
    ], [
        string[]
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "getData"): TypedContractMethod<[
        keys: string[],
        tokenId: BigNumberish
    ], [
        [
            string,
            string,
            string[]
        ] & {
            resolver: string;
            owner: string;
            values: string[];
        }
    ], "view">;
    getFunction(nameOrSignature: "getDataByHash"): TypedContractMethod<[
        keyHashes: BigNumberish[],
        tokenId: BigNumberish
    ], [
        [
            string,
            string,
            string[],
            string[]
        ] & {
            resolver: string;
            owner: string;
            keys: string[];
            values: string[];
        }
    ], "view">;
    getFunction(nameOrSignature: "getDataByHashForMany"): TypedContractMethod<[
        keyHashes: BigNumberish[],
        tokenIds: BigNumberish[]
    ], [
        [
            string[],
            string[],
            string[][],
            string[][]
        ] & {
            resolvers: string[];
            owners: string[];
            keys: string[][];
            values: string[][];
        }
    ], "view">;
    getFunction(nameOrSignature: "getDataForMany"): TypedContractMethod<[
        keys: string[],
        tokenIds: BigNumberish[]
    ], [
        [
            string[],
            string[],
            string[][]
        ] & {
            resolvers: string[];
            owners: string[];
            values: string[][];
        }
    ], "view">;
    getFunction(nameOrSignature: "ownerOfForMany"): TypedContractMethod<[tokenIds: BigNumberish[]], [string[]], "view">;
    filters: {};
}
//# sourceMappingURL=IDataReader.d.ts.map