import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export declare namespace IForwarder {
    type ForwardRequestStruct = {
        from: AddressLike;
        nonce: BigNumberish;
        tokenId: BigNumberish;
        data: BytesLike;
    };
    type ForwardRequestStructOutput = [
        from: string,
        nonce: bigint,
        tokenId: bigint,
        data: string
    ] & {
        from: string;
        nonce: bigint;
        tokenId: bigint;
        data: string;
    };
}
export interface RegistrarCustodyInterface extends Interface {
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE" | "NAME" | "VERSION" | "addAdmin" | "addRegistrar" | "execute" | "getRoleAdmin" | "grantRole" | "hasRole" | "initialize" | "isAdmin" | "isRegistrar" | "isTrustedForwarder" | "isValidSignature" | "mintingManager" | "nonceOf" | "owner" | "registrarDelegations" | "registrarRole" | "removeAdmin" | "removeRegistrar" | "renounceAdmin" | "renounceOwnership" | "renounceRole" | "revoke" | "revokeRole" | "rotateAdmin" | "setApprovalForAll" | "setRecords" | "supportsInterface" | "tokenizeDomain" | "transferOwnership" | "unsRegistry" | "userDelegations" | "verify"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AdminChanged" | "DomainTokenized" | "Initialized" | "OwnershipTransferred" | "RoleAdminChanged" | "RoleGranted" | "RoleRevoked" | "Upgraded"): EventFragment;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "NAME", values?: undefined): string;
    encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "addAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "addRegistrar", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "execute", values: [IForwarder.ForwardRequestStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "isAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "isRegistrar", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "isTrustedForwarder", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "isValidSignature", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "mintingManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "registrarDelegations", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "registrarRole", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "removeAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "removeRegistrar", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "renounceAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "revoke", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "rotateAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [AddressLike, boolean]): string;
    encodeFunctionData(functionFragment: "setRecords", values: [string[], string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "tokenizeDomain", values: [
        string[],
        string[],
        string[],
        BigNumberish,
        BigNumberish,
        AddressLike
    ]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "unsRegistry", values?: undefined): string;
    encodeFunctionData(functionFragment: "userDelegations", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "verify", values: [IForwarder.ForwardRequestStruct, BytesLike]): string;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "NAME", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addRegistrar", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isRegistrar", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTrustedForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isValidSignature", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintingManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registrarDelegations", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registrarRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeRegistrar", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revoke", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rotateAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenizeDomain", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unsRegistry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userDelegations", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
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
export declare namespace DomainTokenizedEvent {
    type InputTuple = [
        tokenId: BigNumberish,
        registrarId: BigNumberish,
        userDelegation: AddressLike
    ];
    type OutputTuple = [
        tokenId: bigint,
        registrarId: bigint,
        userDelegation: string
    ];
    interface OutputObject {
        tokenId: bigint;
        registrarId: bigint;
        userDelegation: string;
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
export interface RegistrarCustody extends BaseContract {
    connect(runner?: ContractRunner | null): RegistrarCustody;
    waitForDeployment(): Promise<this>;
    interface: RegistrarCustodyInterface;
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
    NAME: TypedContractMethod<[], [string], "view">;
    VERSION: TypedContractMethod<[], [string], "view">;
    addAdmin: TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    addRegistrar: TypedContractMethod<[
        registrarId: BigNumberish,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    execute: TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        string
    ], "nonpayable">;
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
        _unsRegistry: AddressLike,
        _mintingManager: AddressLike
    ], [
        void
    ], "nonpayable">;
    isAdmin: TypedContractMethod<[account: AddressLike], [boolean], "view">;
    isRegistrar: TypedContractMethod<[
        registrarId: BigNumberish,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    isTrustedForwarder: TypedContractMethod<[
        forwarder: AddressLike
    ], [
        boolean
    ], "view">;
    isValidSignature: TypedContractMethod<[
        hash: BytesLike,
        signature: BytesLike
    ], [
        string
    ], "view">;
    mintingManager: TypedContractMethod<[], [string], "view">;
    nonceOf: TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    registrarDelegations: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        bigint
    ], "view">;
    registrarRole: TypedContractMethod<[
        registrarId: BigNumberish
    ], [
        string
    ], "view">;
    removeAdmin: TypedContractMethod<[
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    removeRegistrar: TypedContractMethod<[
        registrarId: BigNumberish,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    renounceAdmin: TypedContractMethod<[], [void], "nonpayable">;
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
    rotateAdmin: TypedContractMethod<[
        newAdmin: AddressLike
    ], [
        void
    ], "nonpayable">;
    setApprovalForAll: TypedContractMethod<[
        operator: AddressLike,
        approved: boolean
    ], [
        void
    ], "nonpayable">;
    setRecords: TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    tokenizeDomain: TypedContractMethod<[
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        registrarId: BigNumberish,
        userDelegation: AddressLike
    ], [
        void
    ], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    unsRegistry: TypedContractMethod<[], [string], "view">;
    userDelegations: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    verify: TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        boolean
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "NAME"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "VERSION"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "addAdmin"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "addRegistrar"): TypedContractMethod<[
        registrarId: BigNumberish,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "execute"): TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        string
    ], "nonpayable">;
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
        _unsRegistry: AddressLike,
        _mintingManager: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "isAdmin"): TypedContractMethod<[account: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "isRegistrar"): TypedContractMethod<[
        registrarId: BigNumberish,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "isTrustedForwarder"): TypedContractMethod<[forwarder: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "isValidSignature"): TypedContractMethod<[
        hash: BytesLike,
        signature: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "mintingManager"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "nonceOf"): TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "registrarDelegations"): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "registrarRole"): TypedContractMethod<[registrarId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "removeAdmin"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "removeRegistrar"): TypedContractMethod<[
        registrarId: BigNumberish,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "renounceAdmin"): TypedContractMethod<[], [void], "nonpayable">;
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
    getFunction(nameOrSignature: "rotateAdmin"): TypedContractMethod<[newAdmin: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "setApprovalForAll"): TypedContractMethod<[
        operator: AddressLike,
        approved: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setRecords"): TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "tokenizeDomain"): TypedContractMethod<[
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        registrarId: BigNumberish,
        userDelegation: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "unsRegistry"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "userDelegations"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "verify"): TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        boolean
    ], "view">;
    getEvent(key: "AdminChanged"): TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
    getEvent(key: "DomainTokenized"): TypedContractEvent<DomainTokenizedEvent.InputTuple, DomainTokenizedEvent.OutputTuple, DomainTokenizedEvent.OutputObject>;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "RoleAdminChanged"): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
    getEvent(key: "RoleGranted"): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
    getEvent(key: "RoleRevoked"): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    getEvent(key: "Upgraded"): TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
    filters: {
        "AdminChanged(address,address)": TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
        AdminChanged: TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
        "DomainTokenized(uint256,uint256,address)": TypedContractEvent<DomainTokenizedEvent.InputTuple, DomainTokenizedEvent.OutputTuple, DomainTokenizedEvent.OutputObject>;
        DomainTokenized: TypedContractEvent<DomainTokenizedEvent.InputTuple, DomainTokenizedEvent.OutputTuple, DomainTokenizedEvent.OutputObject>;
        "Initialized(uint8)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        RoleAdminChanged: TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        "RoleGranted(bytes32,address,address)": TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        "RoleRevoked(bytes32,address,address)": TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        "Upgraded(address)": TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
        Upgraded: TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
    };
}
//# sourceMappingURL=RegistrarCustody.d.ts.map