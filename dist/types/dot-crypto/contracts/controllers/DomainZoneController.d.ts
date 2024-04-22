import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
export interface DomainZoneControllerInterface extends Interface {
    getFunction(nameOrSignature: "addWhitelistAdmin" | "addWhitelisted" | "bulkAddWhitelisted" | "bulkRemoveWhitelisted" | "isWhitelistAdmin" | "isWhitelisted" | "mintChild" | "removeWhitelisted" | "renounceWhitelistAdmin" | "renounceWhitelisted" | "resolveTo" | "setMany"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "MintChild" | "WhitelistAdminAdded" | "WhitelistAdminRemoved" | "WhitelistedAdded" | "WhitelistedRemoved"): EventFragment;
    encodeFunctionData(functionFragment: "addWhitelistAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "addWhitelisted", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "bulkAddWhitelisted", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "bulkRemoveWhitelisted", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "isWhitelistAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "isWhitelisted", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "mintChild", values: [AddressLike, BigNumberish, string, string[], string[]]): string;
    encodeFunctionData(functionFragment: "removeWhitelisted", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "renounceWhitelistAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceWhitelisted", values?: undefined): string;
    encodeFunctionData(functionFragment: "resolveTo", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setMany", values: [string[], string[], BigNumberish]): string;
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
}
export declare namespace MintChildEvent {
    type InputTuple = [
        tokenId: BigNumberish,
        parentTokenId: BigNumberish,
        label: string
    ];
    type OutputTuple = [
        tokenId: bigint,
        parentTokenId: bigint,
        label: string
    ];
    interface OutputObject {
        tokenId: bigint;
        parentTokenId: bigint;
        label: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace WhitelistAdminAddedEvent {
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
export declare namespace WhitelistAdminRemovedEvent {
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
export declare namespace WhitelistedAddedEvent {
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
export declare namespace WhitelistedRemovedEvent {
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
export interface DomainZoneController extends BaseContract {
    connect(runner?: ContractRunner | null): DomainZoneController;
    waitForDeployment(): Promise<this>;
    interface: DomainZoneControllerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addWhitelistAdmin: TypedContractMethod<[
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    addWhitelisted: TypedContractMethod<[
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    bulkAddWhitelisted: TypedContractMethod<[
        accounts: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    bulkRemoveWhitelisted: TypedContractMethod<[
        accounts: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    isWhitelistAdmin: TypedContractMethod<[
        account: AddressLike
    ], [
        boolean
    ], "view">;
    isWhitelisted: TypedContractMethod<[account: AddressLike], [boolean], "view">;
    mintChild: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        keys: string[],
        values: string[]
    ], [
        void
    ], "nonpayable">;
    removeWhitelisted: TypedContractMethod<[
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    renounceWhitelistAdmin: TypedContractMethod<[], [void], "nonpayable">;
    renounceWhitelisted: TypedContractMethod<[], [void], "nonpayable">;
    resolveTo: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setMany: TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addWhitelistAdmin"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "addWhitelisted"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "bulkAddWhitelisted"): TypedContractMethod<[accounts: AddressLike[]], [void], "nonpayable">;
    getFunction(nameOrSignature: "bulkRemoveWhitelisted"): TypedContractMethod<[accounts: AddressLike[]], [void], "nonpayable">;
    getFunction(nameOrSignature: "isWhitelistAdmin"): TypedContractMethod<[account: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "isWhitelisted"): TypedContractMethod<[account: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "mintChild"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        keys: string[],
        values: string[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "removeWhitelisted"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "renounceWhitelistAdmin"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "renounceWhitelisted"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "resolveTo"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setMany"): TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "MintChild"): TypedContractEvent<MintChildEvent.InputTuple, MintChildEvent.OutputTuple, MintChildEvent.OutputObject>;
    getEvent(key: "WhitelistAdminAdded"): TypedContractEvent<WhitelistAdminAddedEvent.InputTuple, WhitelistAdminAddedEvent.OutputTuple, WhitelistAdminAddedEvent.OutputObject>;
    getEvent(key: "WhitelistAdminRemoved"): TypedContractEvent<WhitelistAdminRemovedEvent.InputTuple, WhitelistAdminRemovedEvent.OutputTuple, WhitelistAdminRemovedEvent.OutputObject>;
    getEvent(key: "WhitelistedAdded"): TypedContractEvent<WhitelistedAddedEvent.InputTuple, WhitelistedAddedEvent.OutputTuple, WhitelistedAddedEvent.OutputObject>;
    getEvent(key: "WhitelistedRemoved"): TypedContractEvent<WhitelistedRemovedEvent.InputTuple, WhitelistedRemovedEvent.OutputTuple, WhitelistedRemovedEvent.OutputObject>;
    filters: {
        "MintChild(uint256,uint256,string)": TypedContractEvent<MintChildEvent.InputTuple, MintChildEvent.OutputTuple, MintChildEvent.OutputObject>;
        MintChild: TypedContractEvent<MintChildEvent.InputTuple, MintChildEvent.OutputTuple, MintChildEvent.OutputObject>;
        "WhitelistAdminAdded(address)": TypedContractEvent<WhitelistAdminAddedEvent.InputTuple, WhitelistAdminAddedEvent.OutputTuple, WhitelistAdminAddedEvent.OutputObject>;
        WhitelistAdminAdded: TypedContractEvent<WhitelistAdminAddedEvent.InputTuple, WhitelistAdminAddedEvent.OutputTuple, WhitelistAdminAddedEvent.OutputObject>;
        "WhitelistAdminRemoved(address)": TypedContractEvent<WhitelistAdminRemovedEvent.InputTuple, WhitelistAdminRemovedEvent.OutputTuple, WhitelistAdminRemovedEvent.OutputObject>;
        WhitelistAdminRemoved: TypedContractEvent<WhitelistAdminRemovedEvent.InputTuple, WhitelistAdminRemovedEvent.OutputTuple, WhitelistAdminRemovedEvent.OutputObject>;
        "WhitelistedAdded(address)": TypedContractEvent<WhitelistedAddedEvent.InputTuple, WhitelistedAddedEvent.OutputTuple, WhitelistedAddedEvent.OutputObject>;
        WhitelistedAdded: TypedContractEvent<WhitelistedAddedEvent.InputTuple, WhitelistedAddedEvent.OutputTuple, WhitelistedAddedEvent.OutputObject>;
        "WhitelistedRemoved(address)": TypedContractEvent<WhitelistedRemovedEvent.InputTuple, WhitelistedRemovedEvent.OutputTuple, WhitelistedRemovedEvent.OutputObject>;
        WhitelistedRemoved: TypedContractEvent<WhitelistedRemovedEvent.InputTuple, WhitelistedRemovedEvent.OutputTuple, WhitelistedRemovedEvent.OutputObject>;
    };
}
//# sourceMappingURL=DomainZoneController.d.ts.map