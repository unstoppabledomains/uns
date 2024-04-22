import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../common";
export interface RootChainManagerInterface extends Interface {
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE" | "DEPOSIT" | "ERC712_VERSION" | "ETHER_ADDRESS" | "MAPPER_ROLE" | "MAP_TOKEN" | "checkpointManagerAddress" | "childChainManagerAddress" | "childToRootToken" | "cleanMapToken" | "depositEtherFor" | "depositFor" | "executeMetaTransaction" | "exit" | "getChainId" | "getDomainSeperator" | "getNonce" | "getRoleAdmin" | "getRoleMember" | "getRoleMemberCount" | "grantRole" | "hasRole" | "initialize" | "initializeEIP712" | "mapToken" | "processedExits" | "registerPredicate" | "remapToken" | "renounceRole" | "revokeRole" | "rootToChildToken" | "setCheckpointManager" | "setChildChainManagerAddress" | "setStateSender" | "setupContractId" | "stateSenderAddress" | "tokenToType" | "typeToPredicate"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "MetaTransactionExecuted" | "PredicateRegistered" | "RoleAdminChanged" | "RoleGranted" | "RoleRevoked" | "TokenMapped"): EventFragment;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "DEPOSIT", values?: undefined): string;
    encodeFunctionData(functionFragment: "ERC712_VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "ETHER_ADDRESS", values?: undefined): string;
    encodeFunctionData(functionFragment: "MAPPER_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "MAP_TOKEN", values?: undefined): string;
    encodeFunctionData(functionFragment: "checkpointManagerAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "childChainManagerAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "childToRootToken", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "cleanMapToken", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "depositEtherFor", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "depositFor", values: [AddressLike, AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "executeMetaTransaction", values: [AddressLike, BytesLike, BytesLike, BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "exit", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getChainId", values?: undefined): string;
    encodeFunctionData(functionFragment: "getDomainSeperator", values?: undefined): string;
    encodeFunctionData(functionFragment: "getNonce", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getRoleMember", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getRoleMemberCount", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "initializeEIP712", values?: undefined): string;
    encodeFunctionData(functionFragment: "mapToken", values: [AddressLike, AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "processedExits", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "registerPredicate", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "remapToken", values: [AddressLike, AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "rootToChildToken", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setCheckpointManager", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setChildChainManagerAddress", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setStateSender", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setupContractId", values?: undefined): string;
    encodeFunctionData(functionFragment: "stateSenderAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenToType", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "typeToPredicate", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DEPOSIT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ERC712_VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ETHER_ADDRESS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "MAPPER_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "MAP_TOKEN", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "checkpointManagerAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "childChainManagerAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "childToRootToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cleanMapToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositEtherFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeMetaTransaction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChainId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDomainSeperator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getNonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleMember", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleMemberCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initializeEIP712", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mapToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "processedExits", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerPredicate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "remapToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rootToChildToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setCheckpointManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setChildChainManagerAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setStateSender", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setupContractId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stateSenderAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenToType", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeToPredicate", data: BytesLike): Result;
}
export declare namespace MetaTransactionExecutedEvent {
    type InputTuple = [
        userAddress: AddressLike,
        relayerAddress: AddressLike,
        functionSignature: BytesLike
    ];
    type OutputTuple = [
        userAddress: string,
        relayerAddress: string,
        functionSignature: string
    ];
    interface OutputObject {
        userAddress: string;
        relayerAddress: string;
        functionSignature: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace PredicateRegisteredEvent {
    type InputTuple = [
        tokenType: BytesLike,
        predicateAddress: AddressLike
    ];
    type OutputTuple = [tokenType: string, predicateAddress: string];
    interface OutputObject {
        tokenType: string;
        predicateAddress: string;
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
export declare namespace TokenMappedEvent {
    type InputTuple = [
        rootToken: AddressLike,
        childToken: AddressLike,
        tokenType: BytesLike
    ];
    type OutputTuple = [
        rootToken: string,
        childToken: string,
        tokenType: string
    ];
    interface OutputObject {
        rootToken: string;
        childToken: string;
        tokenType: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface RootChainManager extends BaseContract {
    connect(runner?: ContractRunner | null): RootChainManager;
    waitForDeployment(): Promise<this>;
    interface: RootChainManagerInterface;
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
    DEPOSIT: TypedContractMethod<[], [string], "view">;
    ERC712_VERSION: TypedContractMethod<[], [string], "view">;
    ETHER_ADDRESS: TypedContractMethod<[], [string], "view">;
    MAPPER_ROLE: TypedContractMethod<[], [string], "view">;
    MAP_TOKEN: TypedContractMethod<[], [string], "view">;
    checkpointManagerAddress: TypedContractMethod<[], [string], "view">;
    childChainManagerAddress: TypedContractMethod<[], [string], "view">;
    childToRootToken: TypedContractMethod<[arg0: AddressLike], [string], "view">;
    cleanMapToken: TypedContractMethod<[
        rootToken: AddressLike,
        childToken: AddressLike
    ], [
        void
    ], "nonpayable">;
    depositEtherFor: TypedContractMethod<[user: AddressLike], [void], "payable">;
    depositFor: TypedContractMethod<[
        user: AddressLike,
        rootToken: AddressLike,
        depositData: BytesLike
    ], [
        void
    ], "nonpayable">;
    executeMetaTransaction: TypedContractMethod<[
        userAddress: AddressLike,
        functionSignature: BytesLike,
        sigR: BytesLike,
        sigS: BytesLike,
        sigV: BigNumberish
    ], [
        string
    ], "payable">;
    exit: TypedContractMethod<[inputData: BytesLike], [void], "nonpayable">;
    getChainId: TypedContractMethod<[], [bigint], "view">;
    getDomainSeperator: TypedContractMethod<[], [string], "view">;
    getNonce: TypedContractMethod<[user: AddressLike], [bigint], "view">;
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
    initializeEIP712: TypedContractMethod<[], [void], "nonpayable">;
    mapToken: TypedContractMethod<[
        rootToken: AddressLike,
        childToken: AddressLike,
        tokenType: BytesLike
    ], [
        void
    ], "nonpayable">;
    processedExits: TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
    registerPredicate: TypedContractMethod<[
        tokenType: BytesLike,
        predicateAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
    remapToken: TypedContractMethod<[
        rootToken: AddressLike,
        childToken: AddressLike,
        tokenType: BytesLike
    ], [
        void
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
    rootToChildToken: TypedContractMethod<[arg0: AddressLike], [string], "view">;
    setCheckpointManager: TypedContractMethod<[
        newCheckpointManager: AddressLike
    ], [
        void
    ], "nonpayable">;
    setChildChainManagerAddress: TypedContractMethod<[
        newChildChainManager: AddressLike
    ], [
        void
    ], "nonpayable">;
    setStateSender: TypedContractMethod<[
        newStateSender: AddressLike
    ], [
        void
    ], "nonpayable">;
    setupContractId: TypedContractMethod<[], [void], "nonpayable">;
    stateSenderAddress: TypedContractMethod<[], [string], "view">;
    tokenToType: TypedContractMethod<[arg0: AddressLike], [string], "view">;
    typeToPredicate: TypedContractMethod<[arg0: BytesLike], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "DEPOSIT"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "ERC712_VERSION"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "ETHER_ADDRESS"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "MAPPER_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "MAP_TOKEN"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "checkpointManagerAddress"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "childChainManagerAddress"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "childToRootToken"): TypedContractMethod<[arg0: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "cleanMapToken"): TypedContractMethod<[
        rootToken: AddressLike,
        childToken: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "depositEtherFor"): TypedContractMethod<[user: AddressLike], [void], "payable">;
    getFunction(nameOrSignature: "depositFor"): TypedContractMethod<[
        user: AddressLike,
        rootToken: AddressLike,
        depositData: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "executeMetaTransaction"): TypedContractMethod<[
        userAddress: AddressLike,
        functionSignature: BytesLike,
        sigR: BytesLike,
        sigS: BytesLike,
        sigV: BigNumberish
    ], [
        string
    ], "payable">;
    getFunction(nameOrSignature: "exit"): TypedContractMethod<[inputData: BytesLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "getChainId"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getDomainSeperator"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "getNonce"): TypedContractMethod<[user: AddressLike], [bigint], "view">;
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
    getFunction(nameOrSignature: "initializeEIP712"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "mapToken"): TypedContractMethod<[
        rootToken: AddressLike,
        childToken: AddressLike,
        tokenType: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "processedExits"): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "registerPredicate"): TypedContractMethod<[
        tokenType: BytesLike,
        predicateAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "remapToken"): TypedContractMethod<[
        rootToken: AddressLike,
        childToken: AddressLike,
        tokenType: BytesLike
    ], [
        void
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
    getFunction(nameOrSignature: "rootToChildToken"): TypedContractMethod<[arg0: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "setCheckpointManager"): TypedContractMethod<[
        newCheckpointManager: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setChildChainManagerAddress"): TypedContractMethod<[
        newChildChainManager: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setStateSender"): TypedContractMethod<[newStateSender: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "setupContractId"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "stateSenderAddress"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "tokenToType"): TypedContractMethod<[arg0: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "typeToPredicate"): TypedContractMethod<[arg0: BytesLike], [string], "view">;
    getEvent(key: "MetaTransactionExecuted"): TypedContractEvent<MetaTransactionExecutedEvent.InputTuple, MetaTransactionExecutedEvent.OutputTuple, MetaTransactionExecutedEvent.OutputObject>;
    getEvent(key: "PredicateRegistered"): TypedContractEvent<PredicateRegisteredEvent.InputTuple, PredicateRegisteredEvent.OutputTuple, PredicateRegisteredEvent.OutputObject>;
    getEvent(key: "RoleAdminChanged"): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
    getEvent(key: "RoleGranted"): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
    getEvent(key: "RoleRevoked"): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    getEvent(key: "TokenMapped"): TypedContractEvent<TokenMappedEvent.InputTuple, TokenMappedEvent.OutputTuple, TokenMappedEvent.OutputObject>;
    filters: {
        "MetaTransactionExecuted(address,address,bytes)": TypedContractEvent<MetaTransactionExecutedEvent.InputTuple, MetaTransactionExecutedEvent.OutputTuple, MetaTransactionExecutedEvent.OutputObject>;
        MetaTransactionExecuted: TypedContractEvent<MetaTransactionExecutedEvent.InputTuple, MetaTransactionExecutedEvent.OutputTuple, MetaTransactionExecutedEvent.OutputObject>;
        "PredicateRegistered(bytes32,address)": TypedContractEvent<PredicateRegisteredEvent.InputTuple, PredicateRegisteredEvent.OutputTuple, PredicateRegisteredEvent.OutputObject>;
        PredicateRegistered: TypedContractEvent<PredicateRegisteredEvent.InputTuple, PredicateRegisteredEvent.OutputTuple, PredicateRegisteredEvent.OutputObject>;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        RoleAdminChanged: TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        "RoleGranted(bytes32,address,address)": TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        "RoleRevoked(bytes32,address,address)": TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        "TokenMapped(address,address,bytes32)": TypedContractEvent<TokenMappedEvent.InputTuple, TokenMappedEvent.OutputTuple, TokenMappedEvent.OutputObject>;
        TokenMapped: TypedContractEvent<TokenMappedEvent.InputTuple, TokenMappedEvent.OutputTuple, TokenMappedEvent.OutputObject>;
    };
}
//# sourceMappingURL=RootChainManager.d.ts.map