import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface ResolverInterface extends utils.Interface {
    functions: {
        "get(string,uint256)": FunctionFragment;
        "getByHash(uint256,uint256)": FunctionFragment;
        "getMany(string[],uint256)": FunctionFragment;
        "getManyByHash(uint256[],uint256)": FunctionFragment;
        "hashToKey(uint256)": FunctionFragment;
        "hashesToKeys(uint256[])": FunctionFragment;
        "nonceOf(uint256)": FunctionFragment;
        "preconfigure(string[],string[],uint256)": FunctionFragment;
        "reconfigure(string[],string[],uint256)": FunctionFragment;
        "reconfigureFor(string[],string[],uint256,bytes)": FunctionFragment;
        "registry()": FunctionFragment;
        "reset(uint256)": FunctionFragment;
        "resetFor(uint256,bytes)": FunctionFragment;
        "set(string,string,uint256)": FunctionFragment;
        "setFor(string,string,uint256,bytes)": FunctionFragment;
        "setMany(string[],string[],uint256)": FunctionFragment;
        "setManyFor(string[],string[],uint256,bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "get" | "getByHash" | "getMany" | "getManyByHash" | "hashToKey" | "hashesToKeys" | "nonceOf" | "preconfigure" | "reconfigure" | "reconfigureFor" | "registry" | "reset" | "resetFor" | "set" | "setFor" | "setMany" | "setManyFor"): FunctionFragment;
    encodeFunctionData(functionFragment: "get", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getByHash", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getMany", values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getManyByHash", values: [PromiseOrValue<BigNumberish>[], PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "hashToKey", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "hashesToKeys", values: [PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "preconfigure", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "reconfigure", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "reconfigureFor", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "registry", values?: undefined): string;
    encodeFunctionData(functionFragment: "reset", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "resetFor", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "set", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "setFor", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "setMany", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "setManyFor", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getManyByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hashToKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hashesToKeys", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "preconfigure", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reconfigure", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reconfigureFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resetFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "set", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setManyFor", data: BytesLike): Result;
    events: {
        "NewKey(uint256,string,string)": EventFragment;
        "ResetRecords(uint256)": EventFragment;
        "Set(uint256,string,string,string,string)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "NewKey"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ResetRecords"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Set"): EventFragment;
}
export interface NewKeyEventObject {
    tokenId: BigNumber;
    keyIndex: string;
    key: string;
}
export declare type NewKeyEvent = TypedEvent<[
    BigNumber,
    string,
    string
], NewKeyEventObject>;
export declare type NewKeyEventFilter = TypedEventFilter<NewKeyEvent>;
export interface ResetRecordsEventObject {
    tokenId: BigNumber;
}
export declare type ResetRecordsEvent = TypedEvent<[
    BigNumber
], ResetRecordsEventObject>;
export declare type ResetRecordsEventFilter = TypedEventFilter<ResetRecordsEvent>;
export interface SetEventObject {
    tokenId: BigNumber;
    keyIndex: string;
    valueIndex: string;
    key: string;
    value: string;
}
export declare type SetEvent = TypedEvent<[
    BigNumber,
    string,
    string,
    string,
    string
], SetEventObject>;
export declare type SetEventFilter = TypedEventFilter<SetEvent>;
export interface Resolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ResolverInterface;
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
        get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string] & {
            key: string;
            value: string;
        }>;
        getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string[]]>;
        getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string[], string[]] & {
            keys: string[];
            values: string[];
        }>;
        hashToKey(keyHash: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        hashesToKeys(hashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[string[]]>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        preconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        reconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        reconfigureFor(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        registry(overrides?: CallOverrides): Promise<[string]>;
        reset(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        resetFor(tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        set(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setFor(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setManyFor(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string] & {
        key: string;
        value: string;
    }>;
    getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string[]>;
    getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string[], string[]] & {
        keys: string[];
        values: string[];
    }>;
    hashToKey(keyHash: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    hashesToKeys(hashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<string[]>;
    nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    preconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    reconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    reconfigureFor(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    registry(overrides?: CallOverrides): Promise<string>;
    reset(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    resetFor(tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    set(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setFor(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setManyFor(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string] & {
            key: string;
            value: string;
        }>;
        getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string[]>;
        getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string[], string[]] & {
            keys: string[];
            values: string[];
        }>;
        hashToKey(keyHash: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        hashesToKeys(hashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<string[]>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        preconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        reconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        reconfigureFor(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        registry(overrides?: CallOverrides): Promise<string>;
        reset(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        resetFor(tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        set(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setFor(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setManyFor(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "NewKey(uint256,string,string)"(tokenId?: PromiseOrValue<BigNumberish> | null, keyIndex?: PromiseOrValue<string> | null, key?: null): NewKeyEventFilter;
        NewKey(tokenId?: PromiseOrValue<BigNumberish> | null, keyIndex?: PromiseOrValue<string> | null, key?: null): NewKeyEventFilter;
        "ResetRecords(uint256)"(tokenId?: PromiseOrValue<BigNumberish> | null): ResetRecordsEventFilter;
        ResetRecords(tokenId?: PromiseOrValue<BigNumberish> | null): ResetRecordsEventFilter;
        "Set(uint256,string,string,string,string)"(tokenId?: PromiseOrValue<BigNumberish> | null, keyIndex?: PromiseOrValue<string> | null, valueIndex?: PromiseOrValue<string> | null, key?: null, value?: null): SetEventFilter;
        Set(tokenId?: PromiseOrValue<BigNumberish> | null, keyIndex?: PromiseOrValue<string> | null, valueIndex?: PromiseOrValue<string> | null, key?: null, value?: null): SetEventFilter;
    };
    estimateGas: {
        get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        hashToKey(keyHash: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        hashesToKeys(hashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        preconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        reconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        reconfigureFor(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        registry(overrides?: CallOverrides): Promise<BigNumber>;
        reset(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        resetFor(tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        set(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setFor(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setManyFor(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hashToKey(keyHash: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hashesToKeys(hashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        preconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        reconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        reconfigureFor(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        registry(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        reset(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        resetFor(tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        set(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setFor(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setManyFor(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=Resolver.d.ts.map