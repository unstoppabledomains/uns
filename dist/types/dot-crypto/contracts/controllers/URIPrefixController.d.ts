import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
export interface URIPrefixControllerInterface extends Interface {
    getFunction(nameOrSignature: "addWhitelistAdmin" | "addWhitelisted" | "isWhitelistAdmin" | "isWhitelisted" | "registry" | "removeWhitelisted" | "renounceWhitelistAdmin" | "renounceWhitelisted" | "setTokenURIPrefix"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "WhitelistAdminAdded" | "WhitelistAdminRemoved" | "WhitelistedAdded" | "WhitelistedRemoved"): EventFragment;
    encodeFunctionData(functionFragment: "addWhitelistAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "addWhitelisted", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "isWhitelistAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "isWhitelisted", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "registry", values?: undefined): string;
    encodeFunctionData(functionFragment: "removeWhitelisted", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "renounceWhitelistAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceWhitelisted", values?: undefined): string;
    encodeFunctionData(functionFragment: "setTokenURIPrefix", values: [string]): string;
    decodeFunctionResult(functionFragment: "addWhitelistAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addWhitelisted", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isWhitelistAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isWhitelisted", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeWhitelisted", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceWhitelistAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceWhitelisted", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTokenURIPrefix", data: BytesLike): Result;
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
export interface URIPrefixController extends BaseContract {
    connect(runner?: ContractRunner | null): URIPrefixController;
    waitForDeployment(): Promise<this>;
    interface: URIPrefixControllerInterface;
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
    isWhitelistAdmin: TypedContractMethod<[
        account: AddressLike
    ], [
        boolean
    ], "view">;
    isWhitelisted: TypedContractMethod<[account: AddressLike], [boolean], "view">;
    registry: TypedContractMethod<[], [string], "view">;
    removeWhitelisted: TypedContractMethod<[
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    renounceWhitelistAdmin: TypedContractMethod<[], [void], "nonpayable">;
    renounceWhitelisted: TypedContractMethod<[], [void], "nonpayable">;
    setTokenURIPrefix: TypedContractMethod<[
        prefix: string
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addWhitelistAdmin"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "addWhitelisted"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "isWhitelistAdmin"): TypedContractMethod<[account: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "isWhitelisted"): TypedContractMethod<[account: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "registry"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "removeWhitelisted"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "renounceWhitelistAdmin"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "renounceWhitelisted"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "setTokenURIPrefix"): TypedContractMethod<[prefix: string], [void], "nonpayable">;
    getEvent(key: "WhitelistAdminAdded"): TypedContractEvent<WhitelistAdminAddedEvent.InputTuple, WhitelistAdminAddedEvent.OutputTuple, WhitelistAdminAddedEvent.OutputObject>;
    getEvent(key: "WhitelistAdminRemoved"): TypedContractEvent<WhitelistAdminRemovedEvent.InputTuple, WhitelistAdminRemovedEvent.OutputTuple, WhitelistAdminRemovedEvent.OutputObject>;
    getEvent(key: "WhitelistedAdded"): TypedContractEvent<WhitelistedAddedEvent.InputTuple, WhitelistedAddedEvent.OutputTuple, WhitelistedAddedEvent.OutputObject>;
    getEvent(key: "WhitelistedRemoved"): TypedContractEvent<WhitelistedRemovedEvent.InputTuple, WhitelistedRemovedEvent.OutputTuple, WhitelistedRemovedEvent.OutputObject>;
    filters: {
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
//# sourceMappingURL=URIPrefixController.d.ts.map