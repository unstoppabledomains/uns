import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../common";
export interface MintableERC721PredicateInterface extends Interface {
    getFunction(nameOrSignature: "BATCH_LIMIT" | "DEFAULT_ADMIN_ROLE" | "MANAGER_ROLE" | "TOKEN_TYPE" | "TRANSFER_EVENT_SIG" | "TRANSFER_WITH_METADATA_EVENT_SIG" | "WITHDRAW_BATCH_EVENT_SIG" | "exitTokens" | "getRoleAdmin" | "getRoleMember" | "getRoleMemberCount" | "grantRole" | "hasRole" | "initialize" | "lockTokens" | "onERC721Received" | "renounceRole" | "revokeRole"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "LockedMintableERC721" | "LockedMintableERC721Batch" | "RoleAdminChanged" | "RoleGranted" | "RoleRevoked"): EventFragment;
    encodeFunctionData(functionFragment: "BATCH_LIMIT", values?: undefined): string;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "MANAGER_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "TOKEN_TYPE", values?: undefined): string;
    encodeFunctionData(functionFragment: "TRANSFER_EVENT_SIG", values?: undefined): string;
    encodeFunctionData(functionFragment: "TRANSFER_WITH_METADATA_EVENT_SIG", values?: undefined): string;
    encodeFunctionData(functionFragment: "WITHDRAW_BATCH_EVENT_SIG", values?: undefined): string;
    encodeFunctionData(functionFragment: "exitTokens", values: [AddressLike, AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getRoleMember", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getRoleMemberCount", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "lockTokens", values: [AddressLike, AddressLike, AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "onERC721Received", values: [AddressLike, AddressLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, AddressLike]): string;
    decodeFunctionResult(functionFragment: "BATCH_LIMIT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "MANAGER_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "TOKEN_TYPE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "TRANSFER_EVENT_SIG", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "TRANSFER_WITH_METADATA_EVENT_SIG", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "WITHDRAW_BATCH_EVENT_SIG", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exitTokens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleMember", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleMemberCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockTokens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC721Received", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
}
export declare namespace LockedMintableERC721Event {
    type InputTuple = [
        depositor: AddressLike,
        depositReceiver: AddressLike,
        rootToken: AddressLike,
        tokenId: BigNumberish
    ];
    type OutputTuple = [
        depositor: string,
        depositReceiver: string,
        rootToken: string,
        tokenId: bigint
    ];
    interface OutputObject {
        depositor: string;
        depositReceiver: string;
        rootToken: string;
        tokenId: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace LockedMintableERC721BatchEvent {
    type InputTuple = [
        depositor: AddressLike,
        depositReceiver: AddressLike,
        rootToken: AddressLike,
        tokenIds: BigNumberish[]
    ];
    type OutputTuple = [
        depositor: string,
        depositReceiver: string,
        rootToken: string,
        tokenIds: bigint[]
    ];
    interface OutputObject {
        depositor: string;
        depositReceiver: string;
        rootToken: string;
        tokenIds: bigint[];
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
export interface MintableERC721Predicate extends BaseContract {
    connect(runner?: ContractRunner | null): MintableERC721Predicate;
    waitForDeployment(): Promise<this>;
    interface: MintableERC721PredicateInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    BATCH_LIMIT: TypedContractMethod<[], [bigint], "view">;
    DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;
    MANAGER_ROLE: TypedContractMethod<[], [string], "view">;
    TOKEN_TYPE: TypedContractMethod<[], [string], "view">;
    TRANSFER_EVENT_SIG: TypedContractMethod<[], [string], "view">;
    TRANSFER_WITH_METADATA_EVENT_SIG: TypedContractMethod<[], [string], "view">;
    WITHDRAW_BATCH_EVENT_SIG: TypedContractMethod<[], [string], "view">;
    exitTokens: TypedContractMethod<[
        arg0: AddressLike,
        rootToken: AddressLike,
        log: BytesLike
    ], [
        void
    ], "nonpayable">;
    getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;
    getRoleMember: TypedContractMethod<[
        role: BytesLike,
        index: BigNumberish
    ], [
        string
    ], "view">;
    getRoleMemberCount: TypedContractMethod<[role: BytesLike], [bigint], "view">;
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
    initialize: TypedContractMethod<[_owner: AddressLike], [void], "nonpayable">;
    lockTokens: TypedContractMethod<[
        depositor: AddressLike,
        depositReceiver: AddressLike,
        rootToken: AddressLike,
        depositData: BytesLike
    ], [
        void
    ], "nonpayable">;
    onERC721Received: TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike,
        arg2: BigNumberish,
        arg3: BytesLike
    ], [
        string
    ], "nonpayable">;
    renounceRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    revokeRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "BATCH_LIMIT"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "MANAGER_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "TOKEN_TYPE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "TRANSFER_EVENT_SIG"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "TRANSFER_WITH_METADATA_EVENT_SIG"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "WITHDRAW_BATCH_EVENT_SIG"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "exitTokens"): TypedContractMethod<[
        arg0: AddressLike,
        rootToken: AddressLike,
        log: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "getRoleAdmin"): TypedContractMethod<[role: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "getRoleMember"): TypedContractMethod<[
        role: BytesLike,
        index: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "getRoleMemberCount"): TypedContractMethod<[role: BytesLike], [bigint], "view">;
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
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[_owner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "lockTokens"): TypedContractMethod<[
        depositor: AddressLike,
        depositReceiver: AddressLike,
        rootToken: AddressLike,
        depositData: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "onERC721Received"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike,
        arg2: BigNumberish,
        arg3: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "renounceRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "revokeRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "LockedMintableERC721"): TypedContractEvent<LockedMintableERC721Event.InputTuple, LockedMintableERC721Event.OutputTuple, LockedMintableERC721Event.OutputObject>;
    getEvent(key: "LockedMintableERC721Batch"): TypedContractEvent<LockedMintableERC721BatchEvent.InputTuple, LockedMintableERC721BatchEvent.OutputTuple, LockedMintableERC721BatchEvent.OutputObject>;
    getEvent(key: "RoleAdminChanged"): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
    getEvent(key: "RoleGranted"): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
    getEvent(key: "RoleRevoked"): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    filters: {
        "LockedMintableERC721(address,address,address,uint256)": TypedContractEvent<LockedMintableERC721Event.InputTuple, LockedMintableERC721Event.OutputTuple, LockedMintableERC721Event.OutputObject>;
        LockedMintableERC721: TypedContractEvent<LockedMintableERC721Event.InputTuple, LockedMintableERC721Event.OutputTuple, LockedMintableERC721Event.OutputObject>;
        "LockedMintableERC721Batch(address,address,address,uint256[])": TypedContractEvent<LockedMintableERC721BatchEvent.InputTuple, LockedMintableERC721BatchEvent.OutputTuple, LockedMintableERC721BatchEvent.OutputObject>;
        LockedMintableERC721Batch: TypedContractEvent<LockedMintableERC721BatchEvent.InputTuple, LockedMintableERC721BatchEvent.OutputTuple, LockedMintableERC721BatchEvent.OutputObject>;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        RoleAdminChanged: TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        "RoleGranted(bytes32,address,address)": TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        "RoleRevoked(bytes32,address,address)": TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    };
}
//# sourceMappingURL=MintableERC721Predicate.d.ts.map