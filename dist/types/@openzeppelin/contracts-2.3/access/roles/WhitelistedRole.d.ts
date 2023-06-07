import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
export interface WhitelistedRoleInterface extends utils.Interface {
    functions: {
        "addWhitelistAdmin(address)": FunctionFragment;
        "addWhitelisted(address)": FunctionFragment;
        "isWhitelistAdmin(address)": FunctionFragment;
        "isWhitelisted(address)": FunctionFragment;
        "removeWhitelisted(address)": FunctionFragment;
        "renounceWhitelistAdmin()": FunctionFragment;
        "renounceWhitelisted()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addWhitelistAdmin" | "addWhitelisted" | "isWhitelistAdmin" | "isWhitelisted" | "removeWhitelisted" | "renounceWhitelistAdmin" | "renounceWhitelisted"): FunctionFragment;
    encodeFunctionData(functionFragment: "addWhitelistAdmin", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "addWhitelisted", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isWhitelistAdmin", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isWhitelisted", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "removeWhitelisted", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "renounceWhitelistAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceWhitelisted", values?: undefined): string;
    decodeFunctionResult(functionFragment: "addWhitelistAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addWhitelisted", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isWhitelistAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isWhitelisted", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeWhitelisted", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceWhitelistAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceWhitelisted", data: BytesLike): Result;
    events: {
        "WhitelistAdminAdded(address)": EventFragment;
        "WhitelistAdminRemoved(address)": EventFragment;
        "WhitelistedAdded(address)": EventFragment;
        "WhitelistedRemoved(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "WhitelistAdminAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WhitelistAdminRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WhitelistedAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WhitelistedRemoved"): EventFragment;
}
export interface WhitelistAdminAddedEventObject {
    account: string;
}
export declare type WhitelistAdminAddedEvent = TypedEvent<[
    string
], WhitelistAdminAddedEventObject>;
export declare type WhitelistAdminAddedEventFilter = TypedEventFilter<WhitelistAdminAddedEvent>;
export interface WhitelistAdminRemovedEventObject {
    account: string;
}
export declare type WhitelistAdminRemovedEvent = TypedEvent<[
    string
], WhitelistAdminRemovedEventObject>;
export declare type WhitelistAdminRemovedEventFilter = TypedEventFilter<WhitelistAdminRemovedEvent>;
export interface WhitelistedAddedEventObject {
    account: string;
}
export declare type WhitelistedAddedEvent = TypedEvent<[
    string
], WhitelistedAddedEventObject>;
export declare type WhitelistedAddedEventFilter = TypedEventFilter<WhitelistedAddedEvent>;
export interface WhitelistedRemovedEventObject {
    account: string;
}
export declare type WhitelistedRemovedEvent = TypedEvent<[
    string
], WhitelistedRemovedEventObject>;
export declare type WhitelistedRemovedEventFilter = TypedEventFilter<WhitelistedRemovedEvent>;
export interface WhitelistedRole extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: WhitelistedRoleInterface;
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
        addWhitelistAdmin(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        addWhitelisted(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isWhitelisted(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        removeWhitelisted(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceWhitelistAdmin(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceWhitelisted(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    addWhitelistAdmin(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addWhitelisted(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isWhitelisted(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    removeWhitelisted(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceWhitelistAdmin(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceWhitelisted(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        addWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        addWhitelisted(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        isWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isWhitelisted(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        removeWhitelisted(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        renounceWhitelistAdmin(overrides?: CallOverrides): Promise<void>;
        renounceWhitelisted(overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "WhitelistAdminAdded(address)"(account?: PromiseOrValue<string> | null): WhitelistAdminAddedEventFilter;
        WhitelistAdminAdded(account?: PromiseOrValue<string> | null): WhitelistAdminAddedEventFilter;
        "WhitelistAdminRemoved(address)"(account?: PromiseOrValue<string> | null): WhitelistAdminRemovedEventFilter;
        WhitelistAdminRemoved(account?: PromiseOrValue<string> | null): WhitelistAdminRemovedEventFilter;
        "WhitelistedAdded(address)"(account?: PromiseOrValue<string> | null): WhitelistedAddedEventFilter;
        WhitelistedAdded(account?: PromiseOrValue<string> | null): WhitelistedAddedEventFilter;
        "WhitelistedRemoved(address)"(account?: PromiseOrValue<string> | null): WhitelistedRemovedEventFilter;
        WhitelistedRemoved(account?: PromiseOrValue<string> | null): WhitelistedRemovedEventFilter;
    };
    estimateGas: {
        addWhitelistAdmin(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addWhitelisted(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isWhitelisted(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        removeWhitelisted(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceWhitelistAdmin(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceWhitelisted(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        addWhitelistAdmin(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addWhitelisted(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isWhitelisted(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        removeWhitelisted(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceWhitelistAdmin(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceWhitelisted(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=WhitelistedRole.d.ts.map