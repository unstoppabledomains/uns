import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface MintingManagerMockInterface extends Interface {
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE" | "MINTER_ROLE" | "NAME" | "VERSION" | "addMinter" | "addMinters" | "addProxyReaders" | "addTld" | "buy" | "buyForErc20" | "claim" | "claimTo" | "claimToWithRecords" | "closeMinter" | "cnsMintingController" | "cnsResolver" | "cnsURIPrefixController" | "getRoleAdmin" | "grantRole" | "hasRole" | "initialize" | "isBlocked" | "isMinter" | "isTrustedForwarder" | "issueExpirableWithRecords" | "issueWithRecords" | "owner" | "pause" | "paused" | "removeMinter" | "removeMinters" | "removeTld" | "renew" | "renounceMinter" | "renounceOwnership" | "renounceRole" | "revoke" | "revokeRole" | "rotateMinter" | "setForwarder" | "setOperator" | "setTokenURIPrefix" | "supportsInterface" | "transferOwnership" | "unpause" | "unsOperator" | "unsRegistry" | "upgradeAll" | "withdraw(address)" | "withdraw(address,address)"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AdminChanged" | "Blocked" | "BlocklistDisabled" | "BlocklistEnabled" | "DomainPurchase" | "Initialized" | "NewTld" | "OwnershipTransferred" | "Paused" | "RemoveTld" | "RoleAdminChanged" | "RoleGranted" | "RoleRevoked" | "Unpaused" | "Upgraded" | "Withdrawal"): EventFragment;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "MINTER_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "NAME", values?: undefined): string;
    encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "addMinter", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "addMinters", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "addProxyReaders", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "addTld", values: [string, boolean]): string;
    encodeFunctionData(functionFragment: "buy", values: [
        AddressLike,
        string[],
        string[],
        string[],
        BigNumberish,
        BigNumberish,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "buyForErc20", values: [
        AddressLike,
        string[],
        string[],
        string[],
        BigNumberish,
        AddressLike,
        BigNumberish,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "claim", values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "claimTo", values: [AddressLike, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "claimToWithRecords", values: [AddressLike, BigNumberish, string, string[], string[]]): string;
    encodeFunctionData(functionFragment: "closeMinter", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "cnsMintingController", values?: undefined): string;
    encodeFunctionData(functionFragment: "cnsResolver", values?: undefined): string;
    encodeFunctionData(functionFragment: "cnsURIPrefixController", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [
        AddressLike,
        AddressLike,
        AddressLike,
        AddressLike,
        AddressLike,
        AddressLike
    ]): string;
    encodeFunctionData(functionFragment: "isBlocked", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "isMinter", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "isTrustedForwarder", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "issueExpirableWithRecords", values: [AddressLike, string[], string[], string[], BigNumberish, boolean]): string;
    encodeFunctionData(functionFragment: "issueWithRecords", values: [AddressLike, string[], string[], string[], boolean]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "pause", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "removeMinter", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "removeMinters", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "removeTld", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "renew", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "renounceMinter", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "revoke", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "rotateMinter", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setForwarder", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setOperator", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setTokenURIPrefix", values: [string]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
    encodeFunctionData(functionFragment: "unsOperator", values?: undefined): string;
    encodeFunctionData(functionFragment: "unsRegistry", values?: undefined): string;
    encodeFunctionData(functionFragment: "upgradeAll", values: [BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "withdraw(address)", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "withdraw(address,address)", values: [AddressLike, AddressLike]): string;
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
    decodeFunctionResult(functionFragment: "revoke", data: BytesLike): Result;
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
}
export declare namespace AdminChangedEvent {
    type InputTuple = [previousAdmin: AddressLike, newAdmin: AddressLike];
    type OutputTuple = [previousAdmin: string, newAdmin: string];
    interface OutputObject {
        previousAdmin: string;
        newAdmin: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace BlockedEvent {
    type InputTuple = [tokenId: BigNumberish];
    type OutputTuple = [tokenId: bigint];
    interface OutputObject {
        tokenId: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace BlocklistDisabledEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace BlocklistEnabledEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace DomainPurchaseEvent {
    type InputTuple = [
        tokenId: BigNumberish,
        sender: AddressLike,
        owner: AddressLike,
        price: BigNumberish,
        token: AddressLike
    ];
    type OutputTuple = [
        tokenId: bigint,
        sender: string,
        owner: string,
        price: bigint,
        token: string
    ];
    interface OutputObject {
        tokenId: bigint;
        sender: string;
        owner: string;
        price: bigint;
        token: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace InitializedEvent {
    type InputTuple = [version: BigNumberish];
    type OutputTuple = [version: bigint];
    interface OutputObject {
        version: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NewTldEvent {
    type InputTuple = [tokenId: BigNumberish, tld: string];
    type OutputTuple = [tokenId: bigint, tld: string];
    interface OutputObject {
        tokenId: bigint;
        tld: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OwnershipTransferredEvent {
    type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
    type OutputTuple = [previousOwner: string, newOwner: string];
    interface OutputObject {
        previousOwner: string;
        newOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace PausedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RemoveTldEvent {
    type InputTuple = [tokenId: BigNumberish];
    type OutputTuple = [tokenId: bigint];
    interface OutputObject {
        tokenId: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleAdminChangedEvent {
    type InputTuple = [
        role: BytesLike,
        previousAdminRole: BytesLike,
        newAdminRole: BytesLike
    ];
    type OutputTuple = [
        role: string,
        previousAdminRole: string,
        newAdminRole: string
    ];
    interface OutputObject {
        role: string;
        previousAdminRole: string;
        newAdminRole: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleGrantedEvent {
    type InputTuple = [
        role: BytesLike,
        account: AddressLike,
        sender: AddressLike
    ];
    type OutputTuple = [role: string, account: string, sender: string];
    interface OutputObject {
        role: string;
        account: string;
        sender: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleRevokedEvent {
    type InputTuple = [
        role: BytesLike,
        account: AddressLike,
        sender: AddressLike
    ];
    type OutputTuple = [role: string, account: string, sender: string];
    interface OutputObject {
        role: string;
        account: string;
        sender: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace UnpausedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace UpgradedEvent {
    type InputTuple = [implementation: AddressLike];
    type OutputTuple = [implementation: string];
    interface OutputObject {
        implementation: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace WithdrawalEvent {
    type InputTuple = [
        recepient: AddressLike,
        value: BigNumberish,
        token: AddressLike
    ];
    type OutputTuple = [recepient: string, value: bigint, token: string];
    interface OutputObject {
        recepient: string;
        value: bigint;
        token: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface MintingManagerMock extends BaseContract {
    connect(runner?: ContractRunner | null): MintingManagerMock;
    waitForDeployment(): Promise<this>;
    interface: MintingManagerMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;
    MINTER_ROLE: TypedContractMethod<[], [string], "view">;
    NAME: TypedContractMethod<[], [string], "view">;
    VERSION: TypedContractMethod<[], [string], "view">;
    addMinter: TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    addMinters: TypedContractMethod<[
        accounts: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    addProxyReaders: TypedContractMethod<[
        addrs: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    addTld: TypedContractMethod<[
        tld: string,
        isExpirable: boolean
    ], [
        void
    ], "nonpayable">;
    buy: TypedContractMethod<[
        owner: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        price: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "payable">;
    buyForErc20: TypedContractMethod<[
        owner: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        token: AddressLike,
        price: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    claim: TypedContractMethod<[
        tld: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    claimTo: TypedContractMethod<[
        to: AddressLike,
        tld: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    claimToWithRecords: TypedContractMethod<[
        to: AddressLike,
        tld: BigNumberish,
        label: string,
        keys: string[],
        values: string[]
    ], [
        void
    ], "nonpayable">;
    closeMinter: TypedContractMethod<[receiver: AddressLike], [void], "payable">;
    cnsMintingController: TypedContractMethod<[], [string], "view">;
    cnsResolver: TypedContractMethod<[], [string], "view">;
    cnsURIPrefixController: TypedContractMethod<[], [string], "view">;
    getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;
    grantRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    hasRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    initialize: TypedContractMethod<[
        unsRegistry_: AddressLike,
        cnsMintingController_: AddressLike,
        cnsURIPrefixController_: AddressLike,
        cnsResolver_: AddressLike,
        unsOperator_: AddressLike,
        forwarder: AddressLike
    ], [
        void
    ], "nonpayable">;
    isBlocked: TypedContractMethod<[tokenId: BigNumberish], [boolean], "view">;
    isMinter: TypedContractMethod<[account: AddressLike], [boolean], "view">;
    isTrustedForwarder: TypedContractMethod<[
        forwarder: AddressLike
    ], [
        boolean
    ], "view">;
    issueExpirableWithRecords: TypedContractMethod<[
        to: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        withReverse: boolean
    ], [
        void
    ], "nonpayable">;
    issueWithRecords: TypedContractMethod<[
        to: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        withReverse: boolean
    ], [
        void
    ], "nonpayable">;
    owner: TypedContractMethod<[], [string], "view">;
    pause: TypedContractMethod<[], [void], "nonpayable">;
    paused: TypedContractMethod<[], [boolean], "view">;
    removeMinter: TypedContractMethod<[
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    removeMinters: TypedContractMethod<[
        accounts: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    removeTld: TypedContractMethod<[tld: BigNumberish], [void], "nonpayable">;
    renew: TypedContractMethod<[
        expiry: BigNumberish,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    renounceMinter: TypedContractMethod<[], [void], "nonpayable">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    renounceRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    revoke: TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    revokeRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    rotateMinter: TypedContractMethod<[receiver: AddressLike], [void], "payable">;
    setForwarder: TypedContractMethod<[
        forwarder: AddressLike
    ], [
        void
    ], "nonpayable">;
    setOperator: TypedContractMethod<[
        operator: AddressLike
    ], [
        void
    ], "nonpayable">;
    setTokenURIPrefix: TypedContractMethod<[
        prefix: string
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    unpause: TypedContractMethod<[], [void], "nonpayable">;
    unsOperator: TypedContractMethod<[], [string], "view">;
    unsRegistry: TypedContractMethod<[], [string], "view">;
    upgradeAll: TypedContractMethod<[
        tokenIds: BigNumberish[]
    ], [
        void
    ], "nonpayable">;
    "withdraw(address)": TypedContractMethod<[
        recepient: AddressLike
    ], [
        void
    ], "nonpayable">;
    "withdraw(address,address)": TypedContractMethod<[
        token: AddressLike,
        recepient: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "MINTER_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "NAME"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "VERSION"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "addMinter"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "addMinters"): TypedContractMethod<[accounts: AddressLike[]], [void], "nonpayable">;
    getFunction(nameOrSignature: "addProxyReaders"): TypedContractMethod<[addrs: AddressLike[]], [void], "nonpayable">;
    getFunction(nameOrSignature: "addTld"): TypedContractMethod<[
        tld: string,
        isExpirable: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "buy"): TypedContractMethod<[
        owner: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        price: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "buyForErc20"): TypedContractMethod<[
        owner: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        token: AddressLike,
        price: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "claim"): TypedContractMethod<[
        tld: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "claimTo"): TypedContractMethod<[
        to: AddressLike,
        tld: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "claimToWithRecords"): TypedContractMethod<[
        to: AddressLike,
        tld: BigNumberish,
        label: string,
        keys: string[],
        values: string[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "closeMinter"): TypedContractMethod<[receiver: AddressLike], [void], "payable">;
    getFunction(nameOrSignature: "cnsMintingController"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "cnsResolver"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "cnsURIPrefixController"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "getRoleAdmin"): TypedContractMethod<[role: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "grantRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "hasRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
        unsRegistry_: AddressLike,
        cnsMintingController_: AddressLike,
        cnsURIPrefixController_: AddressLike,
        cnsResolver_: AddressLike,
        unsOperator_: AddressLike,
        forwarder: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "isBlocked"): TypedContractMethod<[tokenId: BigNumberish], [boolean], "view">;
    getFunction(nameOrSignature: "isMinter"): TypedContractMethod<[account: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "isTrustedForwarder"): TypedContractMethod<[forwarder: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "issueExpirableWithRecords"): TypedContractMethod<[
        to: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        withReverse: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "issueWithRecords"): TypedContractMethod<[
        to: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        withReverse: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "pause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "paused"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "removeMinter"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "removeMinters"): TypedContractMethod<[accounts: AddressLike[]], [void], "nonpayable">;
    getFunction(nameOrSignature: "removeTld"): TypedContractMethod<[tld: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "renew"): TypedContractMethod<[
        expiry: BigNumberish,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "renounceMinter"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "renounceRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "revoke"): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "revokeRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "rotateMinter"): TypedContractMethod<[receiver: AddressLike], [void], "payable">;
    getFunction(nameOrSignature: "setForwarder"): TypedContractMethod<[forwarder: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "setOperator"): TypedContractMethod<[operator: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "setTokenURIPrefix"): TypedContractMethod<[prefix: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "unpause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "unsOperator"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "unsRegistry"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "upgradeAll"): TypedContractMethod<[tokenIds: BigNumberish[]], [void], "nonpayable">;
    getFunction(nameOrSignature: "withdraw(address)"): TypedContractMethod<[recepient: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "withdraw(address,address)"): TypedContractMethod<[
        token: AddressLike,
        recepient: AddressLike
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "AdminChanged"): TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
    getEvent(key: "Blocked"): TypedContractEvent<BlockedEvent.InputTuple, BlockedEvent.OutputTuple, BlockedEvent.OutputObject>;
    getEvent(key: "BlocklistDisabled"): TypedContractEvent<BlocklistDisabledEvent.InputTuple, BlocklistDisabledEvent.OutputTuple, BlocklistDisabledEvent.OutputObject>;
    getEvent(key: "BlocklistEnabled"): TypedContractEvent<BlocklistEnabledEvent.InputTuple, BlocklistEnabledEvent.OutputTuple, BlocklistEnabledEvent.OutputObject>;
    getEvent(key: "DomainPurchase"): TypedContractEvent<DomainPurchaseEvent.InputTuple, DomainPurchaseEvent.OutputTuple, DomainPurchaseEvent.OutputObject>;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "NewTld"): TypedContractEvent<NewTldEvent.InputTuple, NewTldEvent.OutputTuple, NewTldEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "Paused"): TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
    getEvent(key: "RemoveTld"): TypedContractEvent<RemoveTldEvent.InputTuple, RemoveTldEvent.OutputTuple, RemoveTldEvent.OutputObject>;
    getEvent(key: "RoleAdminChanged"): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
    getEvent(key: "RoleGranted"): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
    getEvent(key: "RoleRevoked"): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    getEvent(key: "Unpaused"): TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
    getEvent(key: "Upgraded"): TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
    getEvent(key: "Withdrawal"): TypedContractEvent<WithdrawalEvent.InputTuple, WithdrawalEvent.OutputTuple, WithdrawalEvent.OutputObject>;
    filters: {
        "AdminChanged(address,address)": TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
        AdminChanged: TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
        "Blocked(uint256)": TypedContractEvent<BlockedEvent.InputTuple, BlockedEvent.OutputTuple, BlockedEvent.OutputObject>;
        Blocked: TypedContractEvent<BlockedEvent.InputTuple, BlockedEvent.OutputTuple, BlockedEvent.OutputObject>;
        "BlocklistDisabled(address)": TypedContractEvent<BlocklistDisabledEvent.InputTuple, BlocklistDisabledEvent.OutputTuple, BlocklistDisabledEvent.OutputObject>;
        BlocklistDisabled: TypedContractEvent<BlocklistDisabledEvent.InputTuple, BlocklistDisabledEvent.OutputTuple, BlocklistDisabledEvent.OutputObject>;
        "BlocklistEnabled(address)": TypedContractEvent<BlocklistEnabledEvent.InputTuple, BlocklistEnabledEvent.OutputTuple, BlocklistEnabledEvent.OutputObject>;
        BlocklistEnabled: TypedContractEvent<BlocklistEnabledEvent.InputTuple, BlocklistEnabledEvent.OutputTuple, BlocklistEnabledEvent.OutputObject>;
        "DomainPurchase(uint256,address,address,uint256,address)": TypedContractEvent<DomainPurchaseEvent.InputTuple, DomainPurchaseEvent.OutputTuple, DomainPurchaseEvent.OutputObject>;
        DomainPurchase: TypedContractEvent<DomainPurchaseEvent.InputTuple, DomainPurchaseEvent.OutputTuple, DomainPurchaseEvent.OutputObject>;
        "Initialized(uint8)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "NewTld(uint256,string)": TypedContractEvent<NewTldEvent.InputTuple, NewTldEvent.OutputTuple, NewTldEvent.OutputObject>;
        NewTld: TypedContractEvent<NewTldEvent.InputTuple, NewTldEvent.OutputTuple, NewTldEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "Paused(address)": TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        Paused: TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        "RemoveTld(uint256)": TypedContractEvent<RemoveTldEvent.InputTuple, RemoveTldEvent.OutputTuple, RemoveTldEvent.OutputObject>;
        RemoveTld: TypedContractEvent<RemoveTldEvent.InputTuple, RemoveTldEvent.OutputTuple, RemoveTldEvent.OutputObject>;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        RoleAdminChanged: TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        "RoleGranted(bytes32,address,address)": TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        "RoleRevoked(bytes32,address,address)": TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        "Unpaused(address)": TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        Unpaused: TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        "Upgraded(address)": TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
        Upgraded: TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
        "Withdrawal(address,uint256,address)": TypedContractEvent<WithdrawalEvent.InputTuple, WithdrawalEvent.OutputTuple, WithdrawalEvent.OutputObject>;
        Withdrawal: TypedContractEvent<WithdrawalEvent.InputTuple, WithdrawalEvent.OutputTuple, WithdrawalEvent.OutputObject>;
    };
}
//# sourceMappingURL=MintingManagerMock.d.ts.map