import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface MintingManagerMockInterface extends utils.Interface {
    functions: {
        "DEFAULT_ADMIN_ROLE()": FunctionFragment;
        "MINTER_ROLE()": FunctionFragment;
        "NAME()": FunctionFragment;
        "VERSION()": FunctionFragment;
        "addMinter(address)": FunctionFragment;
        "addMinters(address[])": FunctionFragment;
        "addProxyReaders(address[])": FunctionFragment;
        "addTld(string,bool)": FunctionFragment;
        "buy(address,string[],string[],string[],uint64,uint256,bytes)": FunctionFragment;
        "buyForErc20(address,string[],string[],string[],uint64,address,uint256,bytes)": FunctionFragment;
        "claim(uint256,string)": FunctionFragment;
        "claimTo(address,uint256,string)": FunctionFragment;
        "claimToWithRecords(address,uint256,string,string[],string[])": FunctionFragment;
        "closeMinter(address)": FunctionFragment;
        "cnsMintingController()": FunctionFragment;
        "cnsResolver()": FunctionFragment;
        "cnsURIPrefixController()": FunctionFragment;
        "getRoleAdmin(bytes32)": FunctionFragment;
        "grantRole(bytes32,address)": FunctionFragment;
        "hasRole(bytes32,address)": FunctionFragment;
        "initialize(address,address,address,address,address,address)": FunctionFragment;
        "isBlocked(uint256)": FunctionFragment;
        "isMinter(address)": FunctionFragment;
        "isTrustedForwarder(address)": FunctionFragment;
        "issueExpirableWithRecords(address,string[],string[],string[],uint64,bool)": FunctionFragment;
        "issueWithRecords(address,string[],string[],string[],bool)": FunctionFragment;
        "owner()": FunctionFragment;
        "pause()": FunctionFragment;
        "paused()": FunctionFragment;
        "removeMinter(address)": FunctionFragment;
        "removeMinters(address[])": FunctionFragment;
        "removeTld(uint256)": FunctionFragment;
        "renew(uint64,uint256)": FunctionFragment;
        "renounceMinter()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "renounceRole(bytes32,address)": FunctionFragment;
        "revokeRole(bytes32,address)": FunctionFragment;
        "rotateMinter(address)": FunctionFragment;
        "setForwarder(address)": FunctionFragment;
        "setOperator(address)": FunctionFragment;
        "setTokenURIPrefix(string)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "unpause()": FunctionFragment;
        "unsOperator()": FunctionFragment;
        "unsRegistry()": FunctionFragment;
        "upgradeAll(uint256[])": FunctionFragment;
        "withdraw(address)": FunctionFragment;
        "withdraw(address,address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "DEFAULT_ADMIN_ROLE" | "MINTER_ROLE" | "NAME" | "VERSION" | "addMinter" | "addMinters" | "addProxyReaders" | "addTld" | "buy" | "buyForErc20" | "claim" | "claimTo" | "claimToWithRecords" | "closeMinter" | "cnsMintingController" | "cnsResolver" | "cnsURIPrefixController" | "getRoleAdmin" | "grantRole" | "hasRole" | "initialize" | "isBlocked" | "isMinter" | "isTrustedForwarder" | "issueExpirableWithRecords" | "issueWithRecords" | "owner" | "pause" | "paused" | "removeMinter" | "removeMinters" | "removeTld" | "renew" | "renounceMinter" | "renounceOwnership" | "renounceRole" | "revokeRole" | "rotateMinter" | "setForwarder" | "setOperator" | "setTokenURIPrefix" | "supportsInterface" | "transferOwnership" | "unpause" | "unsOperator" | "unsRegistry" | "upgradeAll" | "withdraw(address)" | "withdraw(address,address)"): FunctionFragment;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "MINTER_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "NAME", values?: undefined): string;
    encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "addMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "addMinters", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "addProxyReaders", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "addTld", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "buy", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "buyForErc20", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "claim", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "claimTo", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "claimToWithRecords", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[]
    ]): string;
    encodeFunctionData(functionFragment: "closeMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "cnsMintingController", values?: undefined): string;
    encodeFunctionData(functionFragment: "cnsResolver", values?: undefined): string;
    encodeFunctionData(functionFragment: "cnsURIPrefixController", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "initialize", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "isBlocked", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "isMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isTrustedForwarder", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "issueExpirableWithRecords", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "issueWithRecords", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "pause", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "removeMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "removeMinters", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "removeTld", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "renew", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "renounceMinter", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "rotateMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setForwarder", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setOperator", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setTokenURIPrefix", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
    encodeFunctionData(functionFragment: "unsOperator", values?: undefined): string;
    encodeFunctionData(functionFragment: "unsRegistry", values?: undefined): string;
    encodeFunctionData(functionFragment: "upgradeAll", values: [PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "withdraw(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "withdraw(address,address)", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "MINTER_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "NAME", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addMinters", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addProxyReaders", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addTld", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "buyForErc20", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimToWithRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "closeMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cnsMintingController", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cnsResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cnsURIPrefixController", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isBlocked", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTrustedForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "issueExpirableWithRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "issueWithRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeMinters", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeTld", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renew", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rotateMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOperator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTokenURIPrefix", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unsOperator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unsRegistry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw(address,address)", data: BytesLike): Result;
    events: {
        "AdminChanged(address,address)": EventFragment;
        "Blocked(uint256)": EventFragment;
        "BlocklistDisabled(address)": EventFragment;
        "BlocklistEnabled(address)": EventFragment;
        "DomainPurchase(uint256,address,address,uint256,address)": EventFragment;
        "Initialized(uint8)": EventFragment;
        "NewTld(uint256,string)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
        "Paused(address)": EventFragment;
        "RemoveTld(uint256)": EventFragment;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
        "RoleGranted(bytes32,address,address)": EventFragment;
        "RoleRevoked(bytes32,address,address)": EventFragment;
        "Unpaused(address)": EventFragment;
        "Upgraded(address)": EventFragment;
        "Withdrawal(address,uint256,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Blocked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BlocklistDisabled"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BlocklistEnabled"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DomainPurchase"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NewTld"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RemoveTld"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Withdrawal"): EventFragment;
}
export interface AdminChangedEventObject {
    previousAdmin: string;
    newAdmin: string;
}
export declare type AdminChangedEvent = TypedEvent<[
    string,
    string
], AdminChangedEventObject>;
export declare type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;
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
export interface DomainPurchaseEventObject {
    tokenId: BigNumber;
    sender: string;
    owner: string;
    price: BigNumber;
    token: string;
}
export declare type DomainPurchaseEvent = TypedEvent<[
    BigNumber,
    string,
    string,
    BigNumber,
    string
], DomainPurchaseEventObject>;
export declare type DomainPurchaseEventFilter = TypedEventFilter<DomainPurchaseEvent>;
export interface InitializedEventObject {
    version: number;
}
export declare type InitializedEvent = TypedEvent<[number], InitializedEventObject>;
export declare type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface NewTldEventObject {
    tokenId: BigNumber;
    tld: string;
}
export declare type NewTldEvent = TypedEvent<[BigNumber, string], NewTldEventObject>;
export declare type NewTldEventFilter = TypedEventFilter<NewTldEvent>;
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface PausedEventObject {
    account: string;
}
export declare type PausedEvent = TypedEvent<[string], PausedEventObject>;
export declare type PausedEventFilter = TypedEventFilter<PausedEvent>;
export interface RemoveTldEventObject {
    tokenId: BigNumber;
}
export declare type RemoveTldEvent = TypedEvent<[BigNumber], RemoveTldEventObject>;
export declare type RemoveTldEventFilter = TypedEventFilter<RemoveTldEvent>;
export interface RoleAdminChangedEventObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
}
export declare type RoleAdminChangedEvent = TypedEvent<[
    string,
    string,
    string
], RoleAdminChangedEventObject>;
export declare type RoleAdminChangedEventFilter = TypedEventFilter<RoleAdminChangedEvent>;
export interface RoleGrantedEventObject {
    role: string;
    account: string;
    sender: string;
}
export declare type RoleGrantedEvent = TypedEvent<[
    string,
    string,
    string
], RoleGrantedEventObject>;
export declare type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;
export interface RoleRevokedEventObject {
    role: string;
    account: string;
    sender: string;
}
export declare type RoleRevokedEvent = TypedEvent<[
    string,
    string,
    string
], RoleRevokedEventObject>;
export declare type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;
export interface UnpausedEventObject {
    account: string;
}
export declare type UnpausedEvent = TypedEvent<[string], UnpausedEventObject>;
export declare type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;
export interface UpgradedEventObject {
    implementation: string;
}
export declare type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;
export declare type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;
export interface WithdrawalEventObject {
    recepient: string;
    value: BigNumber;
    token: string;
}
export declare type WithdrawalEvent = TypedEvent<[
    string,
    BigNumber,
    string
], WithdrawalEventObject>;
export declare type WithdrawalEventFilter = TypedEventFilter<WithdrawalEvent>;
export interface MintingManagerMock extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: MintingManagerMockInterface;
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
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;
        MINTER_ROLE(overrides?: CallOverrides): Promise<[string]>;
        NAME(overrides?: CallOverrides): Promise<[string]>;
        VERSION(overrides?: CallOverrides): Promise<[string]>;
        addMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        addMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        addProxyReaders(addrs: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        addTld(tld: PromiseOrValue<string>, isExpirable: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        buy(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        buyForErc20(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        claim(tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        claimTo(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        claimToWithRecords(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        closeMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        cnsMintingController(overrides?: CallOverrides): Promise<[string]>;
        cnsResolver(overrides?: CallOverrides): Promise<[string]>;
        cnsURIPrefixController(overrides?: CallOverrides): Promise<[string]>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        initialize(unsRegistry_: PromiseOrValue<string>, cnsMintingController_: PromiseOrValue<string>, cnsURIPrefixController_: PromiseOrValue<string>, cnsResolver_: PromiseOrValue<string>, unsOperator_: PromiseOrValue<string>, forwarder: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isBlocked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        issueExpirableWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        issueWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        pause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        paused(overrides?: CallOverrides): Promise<[boolean]>;
        removeMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeTld(tld: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renew(expiry: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceMinter(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        rotateMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setForwarder(forwarder: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setOperator(operator: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        unpause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        unsOperator(overrides?: CallOverrides): Promise<[string]>;
        unsRegistry(overrides?: CallOverrides): Promise<[string]>;
        upgradeAll(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "withdraw(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "withdraw(address,address)"(token: PromiseOrValue<string>, recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    MINTER_ROLE(overrides?: CallOverrides): Promise<string>;
    NAME(overrides?: CallOverrides): Promise<string>;
    VERSION(overrides?: CallOverrides): Promise<string>;
    addMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addProxyReaders(addrs: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addTld(tld: PromiseOrValue<string>, isExpirable: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    buy(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    buyForErc20(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    claim(tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    claimTo(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    claimToWithRecords(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    closeMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    cnsMintingController(overrides?: CallOverrides): Promise<string>;
    cnsResolver(overrides?: CallOverrides): Promise<string>;
    cnsURIPrefixController(overrides?: CallOverrides): Promise<string>;
    getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    initialize(unsRegistry_: PromiseOrValue<string>, cnsMintingController_: PromiseOrValue<string>, cnsURIPrefixController_: PromiseOrValue<string>, cnsResolver_: PromiseOrValue<string>, unsOperator_: PromiseOrValue<string>, forwarder: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isBlocked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    issueExpirableWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    issueWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<string>;
    pause(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    paused(overrides?: CallOverrides): Promise<boolean>;
    removeMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeTld(tld: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renew(expiry: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceMinter(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    rotateMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setForwarder(forwarder: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setOperator(operator: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    unpause(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    unsOperator(overrides?: CallOverrides): Promise<string>;
    unsRegistry(overrides?: CallOverrides): Promise<string>;
    upgradeAll(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "withdraw(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "withdraw(address,address)"(token: PromiseOrValue<string>, recepient: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
        MINTER_ROLE(overrides?: CallOverrides): Promise<string>;
        NAME(overrides?: CallOverrides): Promise<string>;
        VERSION(overrides?: CallOverrides): Promise<string>;
        addMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        addMinters(accounts: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        addProxyReaders(addrs: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        addTld(tld: PromiseOrValue<string>, isExpirable: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        buy(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        buyForErc20(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        claim(tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        claimTo(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        claimToWithRecords(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        closeMinter(receiver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        cnsMintingController(overrides?: CallOverrides): Promise<string>;
        cnsResolver(overrides?: CallOverrides): Promise<string>;
        cnsURIPrefixController(overrides?: CallOverrides): Promise<string>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        initialize(unsRegistry_: PromiseOrValue<string>, cnsMintingController_: PromiseOrValue<string>, cnsURIPrefixController_: PromiseOrValue<string>, cnsResolver_: PromiseOrValue<string>, unsOperator_: PromiseOrValue<string>, forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        isBlocked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        issueExpirableWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, withReverse: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        issueWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        owner(overrides?: CallOverrides): Promise<string>;
        pause(overrides?: CallOverrides): Promise<void>;
        paused(overrides?: CallOverrides): Promise<boolean>;
        removeMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        removeMinters(accounts: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        removeTld(tld: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        renew(expiry: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        renounceMinter(overrides?: CallOverrides): Promise<void>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        rotateMinter(receiver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setOperator(operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        unpause(overrides?: CallOverrides): Promise<void>;
        unsOperator(overrides?: CallOverrides): Promise<string>;
        unsRegistry(overrides?: CallOverrides): Promise<string>;
        upgradeAll(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<void>;
        "withdraw(address)"(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "withdraw(address,address)"(token: PromiseOrValue<string>, recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "AdminChanged(address,address)"(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
        AdminChanged(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
        "Blocked(uint256)"(tokenId?: null): BlockedEventFilter;
        Blocked(tokenId?: null): BlockedEventFilter;
        "BlocklistDisabled(address)"(account?: null): BlocklistDisabledEventFilter;
        BlocklistDisabled(account?: null): BlocklistDisabledEventFilter;
        "BlocklistEnabled(address)"(account?: null): BlocklistEnabledEventFilter;
        BlocklistEnabled(account?: null): BlocklistEnabledEventFilter;
        "DomainPurchase(uint256,address,address,uint256,address)"(tokenId?: PromiseOrValue<BigNumberish> | null, sender?: PromiseOrValue<string> | null, owner?: PromiseOrValue<string> | null, price?: null, token?: null): DomainPurchaseEventFilter;
        DomainPurchase(tokenId?: PromiseOrValue<BigNumberish> | null, sender?: PromiseOrValue<string> | null, owner?: PromiseOrValue<string> | null, price?: null, token?: null): DomainPurchaseEventFilter;
        "Initialized(uint8)"(version?: null): InitializedEventFilter;
        Initialized(version?: null): InitializedEventFilter;
        "NewTld(uint256,string)"(tokenId?: PromiseOrValue<BigNumberish> | null, tld?: null): NewTldEventFilter;
        NewTld(tokenId?: PromiseOrValue<BigNumberish> | null, tld?: null): NewTldEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        "Paused(address)"(account?: null): PausedEventFilter;
        Paused(account?: null): PausedEventFilter;
        "RemoveTld(uint256)"(tokenId?: PromiseOrValue<BigNumberish> | null): RemoveTldEventFilter;
        RemoveTld(tokenId?: PromiseOrValue<BigNumberish> | null): RemoveTldEventFilter;
        "RoleAdminChanged(bytes32,bytes32,bytes32)"(role?: PromiseOrValue<BytesLike> | null, previousAdminRole?: PromiseOrValue<BytesLike> | null, newAdminRole?: PromiseOrValue<BytesLike> | null): RoleAdminChangedEventFilter;
        RoleAdminChanged(role?: PromiseOrValue<BytesLike> | null, previousAdminRole?: PromiseOrValue<BytesLike> | null, newAdminRole?: PromiseOrValue<BytesLike> | null): RoleAdminChangedEventFilter;
        "RoleGranted(bytes32,address,address)"(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleGrantedEventFilter;
        RoleGranted(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleGrantedEventFilter;
        "RoleRevoked(bytes32,address,address)"(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleRevokedEventFilter;
        RoleRevoked(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleRevokedEventFilter;
        "Unpaused(address)"(account?: null): UnpausedEventFilter;
        Unpaused(account?: null): UnpausedEventFilter;
        "Upgraded(address)"(implementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
        Upgraded(implementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
        "Withdrawal(address,uint256,address)"(recepient?: null, value?: null, token?: null): WithdrawalEventFilter;
        Withdrawal(recepient?: null, value?: null, token?: null): WithdrawalEventFilter;
    };
    estimateGas: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        MINTER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        NAME(overrides?: CallOverrides): Promise<BigNumber>;
        VERSION(overrides?: CallOverrides): Promise<BigNumber>;
        addMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addProxyReaders(addrs: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addTld(tld: PromiseOrValue<string>, isExpirable: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        buy(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        buyForErc20(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        claim(tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        claimTo(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        claimToWithRecords(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        closeMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        cnsMintingController(overrides?: CallOverrides): Promise<BigNumber>;
        cnsResolver(overrides?: CallOverrides): Promise<BigNumber>;
        cnsURIPrefixController(overrides?: CallOverrides): Promise<BigNumber>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        initialize(unsRegistry_: PromiseOrValue<string>, cnsMintingController_: PromiseOrValue<string>, cnsURIPrefixController_: PromiseOrValue<string>, cnsResolver_: PromiseOrValue<string>, unsOperator_: PromiseOrValue<string>, forwarder: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isBlocked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        issueExpirableWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        issueWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        pause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        paused(overrides?: CallOverrides): Promise<BigNumber>;
        removeMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeTld(tld: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renew(expiry: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceMinter(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        rotateMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setForwarder(forwarder: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setOperator(operator: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        unpause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        unsOperator(overrides?: CallOverrides): Promise<BigNumber>;
        unsRegistry(overrides?: CallOverrides): Promise<BigNumber>;
        upgradeAll(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "withdraw(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "withdraw(address,address)"(token: PromiseOrValue<string>, recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        MINTER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        NAME(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        addMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addProxyReaders(addrs: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addTld(tld: PromiseOrValue<string>, isExpirable: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        buy(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        buyForErc20(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        claim(tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        claimTo(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        claimToWithRecords(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        closeMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        cnsMintingController(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        cnsResolver(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        cnsURIPrefixController(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(unsRegistry_: PromiseOrValue<string>, cnsMintingController_: PromiseOrValue<string>, cnsURIPrefixController_: PromiseOrValue<string>, cnsResolver_: PromiseOrValue<string>, unsOperator_: PromiseOrValue<string>, forwarder: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isBlocked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        issueExpirableWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        issueWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        removeMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeTld(tld: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renew(expiry: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceMinter(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        rotateMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setForwarder(forwarder: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setOperator(operator: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        unpause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        unsOperator(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        unsRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        upgradeAll(tokenIds: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "withdraw(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "withdraw(address,address)"(token: PromiseOrValue<string>, recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=MintingManagerMock.d.ts.map