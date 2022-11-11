import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface BlocklistInterface extends utils.Interface {
    functions: {
        "areBlocked(uint256[])": FunctionFragment;
        "isBlocked(uint256)": FunctionFragment;
        "isBlocklistDisabled()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "areBlocked" | "isBlocked" | "isBlocklistDisabled"): FunctionFragment;
    encodeFunctionData(functionFragment: "areBlocked", values: [PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "isBlocked", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "isBlocklistDisabled", values?: undefined): string;
    decodeFunctionResult(functionFragment: "areBlocked", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isBlocked", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isBlocklistDisabled", data: BytesLike): Result;
    events: {
        "Blocked(uint256)": EventFragment;
        "BlocklistDisabled(address)": EventFragment;
        "BlocklistEnabled(address)": EventFragment;
        "Initialized(uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Blocked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BlocklistDisabled"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BlocklistEnabled"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
}
export interface BlockedEventObject {
    tokenId: BigNumber;
}
export declare type BlockedEvent = TypedEvent<[BigNumber], BlockedEventObject>;
export declare type BlockedEventFilter = TypedEventFilter<BlockedEvent>;
export interface BlocklistDisabledEventObject {
    account: string;
}
export declare type BlocklistDisabledEvent = TypedEvent<[
    string
], BlocklistDisabledEventObject>;
export declare type BlocklistDisabledEventFilter = TypedEventFilter<BlocklistDisabledEvent>;
export interface BlocklistEnabledEventObject {
    account: string;
}
export declare type BlocklistEnabledEvent = TypedEvent<[
    string
], BlocklistEnabledEventObject>;
export declare type BlocklistEnabledEventFilter = TypedEventFilter<BlocklistEnabledEvent>;
export interface InitializedEventObject {
    version: number;
}
export declare type InitializedEvent = TypedEvent<[number], InitializedEventObject>;
export declare type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface Blocklist extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: BlocklistInterface;
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
        areBlocked(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[boolean[]] & {
            values: boolean[];
        }>;
        isBlocked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        isBlocklistDisabled(overrides?: CallOverrides): Promise<[boolean]>;
    };
    areBlocked(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<boolean[]>;
    isBlocked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    isBlocklistDisabled(overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        areBlocked(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<boolean[]>;
        isBlocked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        isBlocklistDisabled(overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "Blocked(uint256)"(tokenId?: null): BlockedEventFilter;
        Blocked(tokenId?: null): BlockedEventFilter;
        "BlocklistDisabled(address)"(account?: null): BlocklistDisabledEventFilter;
        BlocklistDisabled(account?: null): BlocklistDisabledEventFilter;
        "BlocklistEnabled(address)"(account?: null): BlocklistEnabledEventFilter;
        BlocklistEnabled(account?: null): BlocklistEnabledEventFilter;
        "Initialized(uint8)"(version?: null): InitializedEventFilter;
        Initialized(version?: null): InitializedEventFilter;
    };
    estimateGas: {
        areBlocked(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        isBlocked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        isBlocklistDisabled(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        areBlocked(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isBlocked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isBlocklistDisabled(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=Blocklist.d.ts.map