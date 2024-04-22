import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../common";
export interface WhitelistAdminRoleInterface extends Interface {
    getFunction(nameOrSignature: "addWhitelistAdmin" | "isWhitelistAdmin" | "renounceWhitelistAdmin"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "WhitelistAdminAdded" | "WhitelistAdminRemoved"): EventFragment;
    encodeFunctionData(functionFragment: "addWhitelistAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "isWhitelistAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "renounceWhitelistAdmin", values?: undefined): string;
    decodeFunctionResult(functionFragment: "addWhitelistAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isWhitelistAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceWhitelistAdmin", data: BytesLike): Result;
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
export interface WhitelistAdminRole extends BaseContract {
    connect(runner?: ContractRunner | null): WhitelistAdminRole;
    waitForDeployment(): Promise<this>;
    interface: WhitelistAdminRoleInterface;
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
    isWhitelistAdmin: TypedContractMethod<[
        account: AddressLike
    ], [
        boolean
    ], "view">;
    renounceWhitelistAdmin: TypedContractMethod<[], [void], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addWhitelistAdmin"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "isWhitelistAdmin"): TypedContractMethod<[account: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "renounceWhitelistAdmin"): TypedContractMethod<[], [void], "nonpayable">;
    getEvent(key: "WhitelistAdminAdded"): TypedContractEvent<WhitelistAdminAddedEvent.InputTuple, WhitelistAdminAddedEvent.OutputTuple, WhitelistAdminAddedEvent.OutputObject>;
    getEvent(key: "WhitelistAdminRemoved"): TypedContractEvent<WhitelistAdminRemovedEvent.InputTuple, WhitelistAdminRemovedEvent.OutputTuple, WhitelistAdminRemovedEvent.OutputObject>;
    filters: {
        "WhitelistAdminAdded(address)": TypedContractEvent<WhitelistAdminAddedEvent.InputTuple, WhitelistAdminAddedEvent.OutputTuple, WhitelistAdminAddedEvent.OutputObject>;
        WhitelistAdminAdded: TypedContractEvent<WhitelistAdminAddedEvent.InputTuple, WhitelistAdminAddedEvent.OutputTuple, WhitelistAdminAddedEvent.OutputObject>;
        "WhitelistAdminRemoved(address)": TypedContractEvent<WhitelistAdminRemovedEvent.InputTuple, WhitelistAdminRemovedEvent.OutputTuple, WhitelistAdminRemovedEvent.OutputObject>;
        WhitelistAdminRemoved: TypedContractEvent<WhitelistAdminRemovedEvent.InputTuple, WhitelistAdminRemovedEvent.OutputTuple, WhitelistAdminRemovedEvent.OutputObject>;
    };
}
//# sourceMappingURL=WhitelistAdminRole.d.ts.map