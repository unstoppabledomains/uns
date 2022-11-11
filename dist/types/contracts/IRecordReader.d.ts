import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface IRecordReaderInterface extends utils.Interface {
    functions: {
        "get(string,uint256)": FunctionFragment;
        "getByHash(uint256,uint256)": FunctionFragment;
        "getMany(string[],uint256)": FunctionFragment;
        "getManyByHash(uint256[],uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "get" | "getByHash" | "getMany" | "getManyByHash"): FunctionFragment;
    encodeFunctionData(functionFragment: "get", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getByHash", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getMany", values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getManyByHash", values: [PromiseOrValue<BigNumberish>[], PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getManyByHash", data: BytesLike): Result;
    events: {};
}
export interface IRecordReader extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IRecordReaderInterface;
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
    };
    filters: {};
    estimateGas: {
        get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IRecordReader.d.ts.map