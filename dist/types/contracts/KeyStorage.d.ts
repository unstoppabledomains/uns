import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface KeyStorageInterface extends utils.Interface {
    functions: {
        "addKey(string)": FunctionFragment;
        "getKey(uint256)": FunctionFragment;
        "getKeys(uint256[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addKey" | "getKey" | "getKeys"): FunctionFragment;
    encodeFunctionData(functionFragment: "addKey", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getKey", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getKeys", values: [PromiseOrValue<BigNumberish>[]]): string;
    decodeFunctionResult(functionFragment: "addKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getKeys", data: BytesLike): Result;
    events: {};
}
export interface KeyStorage extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: KeyStorageInterface;
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
        addKey(key: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getKey(keyHash: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        getKeys(hashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[string[]] & {
            values: string[];
        }>;
    };
    addKey(key: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getKey(keyHash: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    getKeys(hashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<string[]>;
    callStatic: {
        addKey(key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        getKey(keyHash: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getKeys(hashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<string[]>;
    };
    filters: {};
    estimateGas: {
        addKey(key: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getKey(keyHash: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getKeys(hashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        addKey(key: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getKey(keyHash: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getKeys(hashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=KeyStorage.d.ts.map