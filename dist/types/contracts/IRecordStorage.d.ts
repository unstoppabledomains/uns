import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface IRecordStorageInterface extends utils.Interface {
    functions: {
        "get(string,uint256)": FunctionFragment;
        "getByHash(uint256,uint256)": FunctionFragment;
        "getMany(string[],uint256)": FunctionFragment;
        "getManyByHash(uint256[],uint256)": FunctionFragment;
        "reconfigure(string[],string[],uint256)": FunctionFragment;
        "reset(uint256)": FunctionFragment;
        "set(string,string,uint256)": FunctionFragment;
        "setByHash(uint256,string,uint256)": FunctionFragment;
        "setMany(string[],string[],uint256)": FunctionFragment;
        "setManyByHash(uint256[],string[],uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "get" | "getByHash" | "getMany" | "getManyByHash" | "reconfigure" | "reset" | "set" | "setByHash" | "setMany" | "setManyByHash"): FunctionFragment;
    encodeFunctionData(functionFragment: "get", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getByHash", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getMany", values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getManyByHash", values: [PromiseOrValue<BigNumberish>[], PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "reconfigure", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "reset", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "set", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "setByHash", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "setMany", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "setManyByHash", values: [
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>
    ]): string;
    decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getManyByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reconfigure", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "set", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setManyByHash", data: BytesLike): Result;
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
export interface IRecordStorage extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IRecordStorageInterface;
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
        reconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        reset(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        set(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setByHash(keyHash: PromiseOrValue<BigNumberish>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
    reconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    reset(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    set(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setByHash(keyHash: PromiseOrValue<BigNumberish>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
        reconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        reset(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        set(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setByHash(keyHash: PromiseOrValue<BigNumberish>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
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
        reconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        reset(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        set(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setByHash(keyHash: PromiseOrValue<BigNumberish>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        reconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        reset(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        set(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setByHash(keyHash: PromiseOrValue<BigNumberish>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IRecordStorage.d.ts.map