import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
export interface WhitelistAdminRoleInterface extends utils.Interface {
    functions: {
        "addWhitelistAdmin(address)": FunctionFragment;
        "isWhitelistAdmin(address)": FunctionFragment;
        "renounceWhitelistAdmin()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addWhitelistAdmin" | "isWhitelistAdmin" | "renounceWhitelistAdmin"): FunctionFragment;
    encodeFunctionData(functionFragment: "addWhitelistAdmin", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isWhitelistAdmin", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "renounceWhitelistAdmin", values?: undefined): string;
    decodeFunctionResult(functionFragment: "addWhitelistAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isWhitelistAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceWhitelistAdmin", data: BytesLike): Result;
    events: {
        "WhitelistAdminAdded(address)": EventFragment;
        "WhitelistAdminRemoved(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "WhitelistAdminAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WhitelistAdminRemoved"): EventFragment;
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
export interface WhitelistAdminRole extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: WhitelistAdminRoleInterface;
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
        isWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        renounceWhitelistAdmin(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    addWhitelistAdmin(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    renounceWhitelistAdmin(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        addWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        isWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        renounceWhitelistAdmin(overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "WhitelistAdminAdded(address)"(account?: PromiseOrValue<string> | null): WhitelistAdminAddedEventFilter;
        WhitelistAdminAdded(account?: PromiseOrValue<string> | null): WhitelistAdminAddedEventFilter;
        "WhitelistAdminRemoved(address)"(account?: PromiseOrValue<string> | null): WhitelistAdminRemovedEventFilter;
        WhitelistAdminRemoved(account?: PromiseOrValue<string> | null): WhitelistAdminRemovedEventFilter;
    };
    estimateGas: {
        addWhitelistAdmin(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        renounceWhitelistAdmin(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        addWhitelistAdmin(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceWhitelistAdmin(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=WhitelistAdminRole.d.ts.map