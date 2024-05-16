import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener } from "../../../../common";
export interface IRootChainInterface extends Interface {
    getEvent(nameOrSignatureOrTopic: "NewHeaderBlock"): EventFragment;
}
export declare namespace NewHeaderBlockEvent {
    type InputTuple = [
        proposer: AddressLike,
        headerBlockId: BigNumberish,
        reward: BigNumberish,
        start: BigNumberish,
        end: BigNumberish,
        root: BytesLike
    ];
    type OutputTuple = [
        proposer: string,
        headerBlockId: bigint,
        reward: bigint,
        start: bigint,
        end: bigint,
        root: string
    ];
    interface OutputObject {
        proposer: string;
        headerBlockId: bigint;
        reward: bigint;
        start: bigint;
        end: bigint;
        root: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IRootChain extends BaseContract {
    connect(runner?: ContractRunner | null): IRootChain;
    waitForDeployment(): Promise<this>;
    interface: IRootChainInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getEvent(key: "NewHeaderBlock"): TypedContractEvent<NewHeaderBlockEvent.InputTuple, NewHeaderBlockEvent.OutputTuple, NewHeaderBlockEvent.OutputObject>;
    filters: {
        "NewHeaderBlock(address,uint256,uint256,uint256,uint256,bytes32)": TypedContractEvent<NewHeaderBlockEvent.InputTuple, NewHeaderBlockEvent.OutputTuple, NewHeaderBlockEvent.OutputObject>;
        NewHeaderBlock: TypedContractEvent<NewHeaderBlockEvent.InputTuple, NewHeaderBlockEvent.OutputTuple, NewHeaderBlockEvent.OutputObject>;
    };
}
//# sourceMappingURL=IRootChain.d.ts.map