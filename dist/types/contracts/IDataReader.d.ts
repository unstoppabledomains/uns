import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface IDataReaderInterface extends utils.Interface {
    functions: {
        "getData(string[],uint256)": FunctionFragment;
        "getDataByHash(uint256[],uint256)": FunctionFragment;
        "getDataByHashForMany(uint256[],uint256[])": FunctionFragment;
        "getDataForMany(string[],uint256[])": FunctionFragment;
        "ownerOfForMany(uint256[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "getData" | "getDataByHash" | "getDataByHashForMany" | "getDataForMany" | "ownerOfForMany"): FunctionFragment;
    encodeFunctionData(functionFragment: "getData", values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getDataByHash", values: [PromiseOrValue<BigNumberish>[], PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getDataByHashForMany", values: [PromiseOrValue<BigNumberish>[], PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "getDataForMany", values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "ownerOfForMany", values: [PromiseOrValue<BigNumberish>[]]): string;
    decodeFunctionResult(functionFragment: "getData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDataByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDataByHashForMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDataForMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOfForMany", data: BytesLike): Result;
    events: {};
}
export interface IDataReader extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IDataReaderInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        getData(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            string,
            string,
            string[]
        ] & {
            resolver: string;
            owner: string;
            values: string[];
        }>;
        getDataByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            string,
            string,
            string[],
            string[]
        ] & {
            resolver: string;
            owner: string;
            keys: string[];
            values: string[];
        }>;
        getDataByHashForMany(keyHashes: PromiseOrValue<BigNumberish>[], tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[
            string[],
            string[],
            string[][],
            string[][]
        ] & {
            resolvers: string[];
            owners: string[];
            keys: string[][];
            values: string[][];
        }>;
        getDataForMany(keys: PromiseOrValue<string>[], tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[
            string[],
            string[],
            string[][]
        ] & {
            resolvers: string[];
            owners: string[];
            values: string[][];
        }>;
        ownerOfForMany(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[string[]] & {
            owners: string[];
        }>;
    };
    getData(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        string,
        string,
        string[]
    ] & {
        resolver: string;
        owner: string;
        values: string[];
    }>;
    getDataByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        string,
        string,
        string[],
        string[]
    ] & {
        resolver: string;
        owner: string;
        keys: string[];
        values: string[];
    }>;
    getDataByHashForMany(keyHashes: PromiseOrValue<BigNumberish>[], tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[
        string[],
        string[],
        string[][],
        string[][]
    ] & {
        resolvers: string[];
        owners: string[];
        keys: string[][];
        values: string[][];
    }>;
    getDataForMany(keys: PromiseOrValue<string>[], tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[
        string[],
        string[],
        string[][]
    ] & {
        resolvers: string[];
        owners: string[];
        values: string[][];
    }>;
    ownerOfForMany(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<string[]>;
    callStatic: {
        getData(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            string,
            string,
            string[]
        ] & {
            resolver: string;
            owner: string;
            values: string[];
        }>;
        getDataByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            string,
            string,
            string[],
            string[]
        ] & {
            resolver: string;
            owner: string;
            keys: string[];
            values: string[];
        }>;
        getDataByHashForMany(keyHashes: PromiseOrValue<BigNumberish>[], tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[
            string[],
            string[],
            string[][],
            string[][]
        ] & {
            resolvers: string[];
            owners: string[];
            keys: string[][];
            values: string[][];
        }>;
        getDataForMany(keys: PromiseOrValue<string>[], tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[
            string[],
            string[],
            string[][]
        ] & {
            resolvers: string[];
            owners: string[];
            values: string[][];
        }>;
        ownerOfForMany(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<string[]>;
    };
    filters: {};
    estimateGas: {
        getData(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getDataByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getDataByHashForMany(keyHashes: PromiseOrValue<BigNumberish>[], tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        getDataForMany(keys: PromiseOrValue<string>[], tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        ownerOfForMany(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getData(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getDataByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getDataByHashForMany(keyHashes: PromiseOrValue<BigNumberish>[], tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getDataForMany(keys: PromiseOrValue<string>[], tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ownerOfForMany(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IDataReader.d.ts.map