import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface ProxyReaderInterface extends utils.Interface {
    functions: {
        "NAME()": FunctionFragment;
        "VERSION()": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "exists(uint256)": FunctionFragment;
        "get(string,uint256)": FunctionFragment;
        "getApproved(uint256)": FunctionFragment;
        "getByHash(uint256,uint256)": FunctionFragment;
        "getData(string[],uint256)": FunctionFragment;
        "getDataByHash(uint256[],uint256)": FunctionFragment;
        "getDataByHashForMany(uint256[],uint256[])": FunctionFragment;
        "getDataForMany(string[],uint256[])": FunctionFragment;
        "getMany(string[],uint256)": FunctionFragment;
        "getManyByHash(uint256[],uint256)": FunctionFragment;
        "initialize(address,address)": FunctionFragment;
        "isApprovedForAll(address,address)": FunctionFragment;
        "isApprovedOrOwner(address,uint256)": FunctionFragment;
        "multicall(bytes[])": FunctionFragment;
        "namehash(string[])": FunctionFragment;
        "ownerOf(uint256)": FunctionFragment;
        "ownerOfForMany(uint256[])": FunctionFragment;
        "registryOf(uint256)": FunctionFragment;
        "resolverOf(uint256)": FunctionFragment;
        "reverseNameOf(address)": FunctionFragment;
        "reverseOf(address)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "tokenURI(uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "NAME" | "VERSION" | "balanceOf" | "exists" | "get" | "getApproved" | "getByHash" | "getData" | "getDataByHash" | "getDataByHashForMany" | "getDataForMany" | "getMany" | "getManyByHash" | "initialize" | "isApprovedForAll" | "isApprovedOrOwner" | "multicall" | "namehash" | "ownerOf" | "ownerOfForMany" | "registryOf" | "resolverOf" | "reverseNameOf" | "reverseOf" | "supportsInterface" | "tokenURI"): FunctionFragment;
    encodeFunctionData(functionFragment: "NAME", values?: undefined): string;
    encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "exists", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "get", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getApproved", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getByHash", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getData", values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getDataByHash", values: [PromiseOrValue<BigNumberish>[], PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getDataByHashForMany", values: [PromiseOrValue<BigNumberish>[], PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "getDataForMany", values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "getMany", values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getManyByHash", values: [PromiseOrValue<BigNumberish>[], PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "initialize", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isApprovedOrOwner", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "multicall", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "namehash", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "ownerOfForMany", values: [PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "registryOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "resolverOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "reverseNameOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "reverseOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "NAME", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exists", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getApproved", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDataByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDataByHashForMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDataForMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getManyByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedOrOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "namehash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOfForMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registryOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resolverOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reverseNameOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reverseOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    events: {
        "Initialized(uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
}
export interface InitializedEventObject {
    version: number;
}
export declare type InitializedEvent = TypedEvent<[number], InitializedEventObject>;
export declare type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface ProxyReader extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ProxyReaderInterface;
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
        NAME(overrides?: CallOverrides): Promise<[string]>;
        VERSION(overrides?: CallOverrides): Promise<[string]>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        exists(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string] & {
            value: string;
        }>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string] & {
            key: string;
            value: string;
        }>;
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
        getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string[]] & {
            values: string[];
        }>;
        getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string[], string[]] & {
            keys: string[];
            values: string[];
        }>;
        initialize(unsRegistry: PromiseOrValue<string>, cnsRegistry: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isApprovedOrOwner(spender: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        multicall(data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        namehash(labels: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<[BigNumber]>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        ownerOfForMany(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[string[]] & {
            owners: string[];
        }>;
        registryOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        resolverOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        reverseNameOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;
        reverseOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
    };
    NAME(overrides?: CallOverrides): Promise<string>;
    VERSION(overrides?: CallOverrides): Promise<string>;
    balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    exists(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string] & {
        key: string;
        value: string;
    }>;
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
    getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string[]>;
    getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string[], string[]] & {
        keys: string[];
        values: string[];
    }>;
    initialize(unsRegistry: PromiseOrValue<string>, cnsRegistry: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isApprovedOrOwner(spender: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    multicall(data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    namehash(labels: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<BigNumber>;
    ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    ownerOfForMany(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<string[]>;
    registryOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    resolverOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    reverseNameOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    reverseOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        NAME(overrides?: CallOverrides): Promise<string>;
        VERSION(overrides?: CallOverrides): Promise<string>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        exists(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string] & {
            key: string;
            value: string;
        }>;
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
        getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string[]>;
        getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string[], string[]] & {
            keys: string[];
            values: string[];
        }>;
        initialize(unsRegistry: PromiseOrValue<string>, cnsRegistry: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isApprovedOrOwner(spender: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        multicall(data: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<string[]>;
        namehash(labels: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<BigNumber>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        ownerOfForMany(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<string[]>;
        registryOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        resolverOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        reverseNameOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        reverseOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "Initialized(uint8)"(version?: null): InitializedEventFilter;
        Initialized(version?: null): InitializedEventFilter;
    };
    estimateGas: {
        NAME(overrides?: CallOverrides): Promise<BigNumber>;
        VERSION(overrides?: CallOverrides): Promise<BigNumber>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        exists(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getData(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getDataByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getDataByHashForMany(keyHashes: PromiseOrValue<BigNumberish>[], tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        getDataForMany(keys: PromiseOrValue<string>[], tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        initialize(unsRegistry: PromiseOrValue<string>, cnsRegistry: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isApprovedOrOwner(spender: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        multicall(data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        namehash(labels: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<BigNumber>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        ownerOfForMany(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        registryOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        resolverOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        reverseNameOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        reverseOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        NAME(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        exists(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getData(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getDataByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getDataByHashForMany(keyHashes: PromiseOrValue<BigNumberish>[], tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getDataForMany(keys: PromiseOrValue<string>[], tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(unsRegistry: PromiseOrValue<string>, cnsRegistry: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isApprovedOrOwner(spender: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        multicall(data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        namehash(labels: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ownerOfForMany(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        registryOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        resolverOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        reverseNameOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        reverseOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ProxyReader.d.ts.map