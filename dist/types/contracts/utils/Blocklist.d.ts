import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface BlocklistInterface extends Interface {
    getFunction(nameOrSignature: "isBlocked"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Blocked" | "BlocklistDisabled" | "BlocklistEnabled" | "Initialized"): EventFragment;
    encodeFunctionData(functionFragment: "isBlocked", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "isBlocked", data: BytesLike): Result;
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
export interface Blocklist extends BaseContract {
    connect(runner?: ContractRunner | null): Blocklist;
    waitForDeployment(): Promise<this>;
    interface: BlocklistInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    isBlocked: TypedContractMethod<[tokenId: BigNumberish], [boolean], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "isBlocked"): TypedContractMethod<[tokenId: BigNumberish], [boolean], "view">;
    getEvent(key: "Blocked"): TypedContractEvent<BlockedEvent.InputTuple, BlockedEvent.OutputTuple, BlockedEvent.OutputObject>;
    getEvent(key: "BlocklistDisabled"): TypedContractEvent<BlocklistDisabledEvent.InputTuple, BlocklistDisabledEvent.OutputTuple, BlocklistDisabledEvent.OutputObject>;
    getEvent(key: "BlocklistEnabled"): TypedContractEvent<BlocklistEnabledEvent.InputTuple, BlocklistEnabledEvent.OutputTuple, BlocklistEnabledEvent.OutputObject>;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    filters: {
        "Blocked(uint256)": TypedContractEvent<BlockedEvent.InputTuple, BlockedEvent.OutputTuple, BlockedEvent.OutputObject>;
        Blocked: TypedContractEvent<BlockedEvent.InputTuple, BlockedEvent.OutputTuple, BlockedEvent.OutputObject>;
        "BlocklistDisabled(address)": TypedContractEvent<BlocklistDisabledEvent.InputTuple, BlocklistDisabledEvent.OutputTuple, BlocklistDisabledEvent.OutputObject>;
        BlocklistDisabled: TypedContractEvent<BlocklistDisabledEvent.InputTuple, BlocklistDisabledEvent.OutputTuple, BlocklistDisabledEvent.OutputObject>;
        "BlocklistEnabled(address)": TypedContractEvent<BlocklistEnabledEvent.InputTuple, BlocklistEnabledEvent.OutputTuple, BlocklistEnabledEvent.OutputObject>;
        BlocklistEnabled: TypedContractEvent<BlocklistEnabledEvent.InputTuple, BlocklistEnabledEvent.OutputTuple, BlocklistEnabledEvent.OutputObject>;
        "Initialized(uint8)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    };
}
//# sourceMappingURL=Blocklist.d.ts.map