import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../common";
export interface DomainZoneControllerInterface extends utils.Interface {
    functions: {
        "addWhitelistAdmin(address)": FunctionFragment;
        "addWhitelisted(address)": FunctionFragment;
        "bulkAddWhitelisted(address[])": FunctionFragment;
        "bulkRemoveWhitelisted(address[])": FunctionFragment;
        "isWhitelistAdmin(address)": FunctionFragment;
        "isWhitelisted(address)": FunctionFragment;
        "mintChild(address,uint256,string,string[],string[])": FunctionFragment;
        "removeWhitelisted(address)": FunctionFragment;
        "renounceWhitelistAdmin()": FunctionFragment;
        "renounceWhitelisted()": FunctionFragment;
        "resolveTo(address,uint256)": FunctionFragment;
        "setMany(string[],string[],uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addWhitelistAdmin" | "addWhitelisted" | "bulkAddWhitelisted" | "bulkRemoveWhitelisted" | "isWhitelistAdmin" | "isWhitelisted" | "mintChild" | "removeWhitelisted" | "renounceWhitelistAdmin" | "renounceWhitelisted" | "resolveTo" | "setMany"): FunctionFragment;
    encodeFunctionData(functionFragment: "addWhitelistAdmin", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "addWhitelisted", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "bulkAddWhitelisted", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "bulkRemoveWhitelisted", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "isWhitelistAdmin", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isWhitelisted", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "mintChild", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[]
    ]): string;
    encodeFunctionData(functionFragment: "removeWhitelisted", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "renounceWhitelistAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceWhitelisted", values?: undefined): string;
    encodeFunctionData(functionFragment: "resolveTo", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setMany", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>
    ]): string;
    decodeFunctionResult(functionFragment: "addWhitelistAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addWhitelisted", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bulkAddWhitelisted", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bulkRemoveWhitelisted", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isWhitelistAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isWhitelisted", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintChild", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeWhitelisted", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceWhitelistAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceWhitelisted", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resolveTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMany", data: BytesLike): Result;
    events: {
        "MintChild(uint256,uint256,string)": EventFragment;
        "WhitelistAdminAdded(address)": EventFragment;
        "WhitelistAdminRemoved(address)": EventFragment;
        "WhitelistedAdded(address)": EventFragment;
        "WhitelistedRemoved(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "MintChild"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WhitelistAdminAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WhitelistAdminRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WhitelistedAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WhitelistedRemoved"): EventFragment;
}
export interface MintChildEventObject {
    tokenId: BigNumber;
    parentTokenId: BigNumber;
    label: string;
}
export declare type MintChildEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    string
], MintChildEventObject>;
export declare type MintChildEventFilter = TypedEventFilter<MintChildEvent>;
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
export interface DomainZoneController extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: DomainZoneControllerInterface;
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
        bulkAddWhitelisted(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        bulkRemoveWhitelisted(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isWhitelisted(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        mintChild(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeWhitelisted(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceWhitelistAdmin(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceWhitelisted(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        resolveTo(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    addWhitelistAdmin(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addWhitelisted(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    bulkAddWhitelisted(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    bulkRemoveWhitelisted(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isWhitelisted(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    mintChild(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeWhitelisted(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceWhitelistAdmin(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceWhitelisted(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    resolveTo(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        addWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        addWhitelisted(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        bulkAddWhitelisted(accounts: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        bulkRemoveWhitelisted(accounts: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        isWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isWhitelisted(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        mintChild(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        removeWhitelisted(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        renounceWhitelistAdmin(overrides?: CallOverrides): Promise<void>;
        renounceWhitelisted(overrides?: CallOverrides): Promise<void>;
        resolveTo(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "MintChild(uint256,uint256,string)"(tokenId?: PromiseOrValue<BigNumberish> | null, parentTokenId?: PromiseOrValue<BigNumberish> | null, label?: null): MintChildEventFilter;
        MintChild(tokenId?: PromiseOrValue<BigNumberish> | null, parentTokenId?: PromiseOrValue<BigNumberish> | null, label?: null): MintChildEventFilter;
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
        bulkAddWhitelisted(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        bulkRemoveWhitelisted(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isWhitelisted(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        mintChild(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeWhitelisted(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceWhitelistAdmin(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceWhitelisted(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        resolveTo(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
        bulkAddWhitelisted(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        bulkRemoveWhitelisted(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isWhitelistAdmin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isWhitelisted(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mintChild(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeWhitelisted(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceWhitelistAdmin(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceWhitelisted(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        resolveTo(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=DomainZoneController.d.ts.map