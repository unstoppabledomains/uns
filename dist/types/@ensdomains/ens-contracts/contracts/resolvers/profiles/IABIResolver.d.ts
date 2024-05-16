import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../../common";
export interface IABIResolverInterface extends Interface {
    getFunction(nameOrSignature: "ABI"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "ABIChanged"): EventFragment;
    encodeFunctionData(functionFragment: "ABI", values: [BytesLike, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "ABI", data: BytesLike): Result;
}
export declare namespace ABIChangedEvent {
    type InputTuple = [node: BytesLike, contentType: BigNumberish];
    type OutputTuple = [node: string, contentType: bigint];
    interface OutputObject {
        node: string;
        contentType: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IABIResolver extends BaseContract {
    connect(runner?: ContractRunner | null): IABIResolver;
    waitForDeployment(): Promise<this>;
    interface: IABIResolverInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    ABI: TypedContractMethod<[
        node: BytesLike,
        contentTypes: BigNumberish
    ], [
        [bigint, string]
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "ABI"): TypedContractMethod<[
        node: BytesLike,
        contentTypes: BigNumberish
    ], [
        [bigint, string]
    ], "view">;
    getEvent(key: "ABIChanged"): TypedContractEvent<ABIChangedEvent.InputTuple, ABIChangedEvent.OutputTuple, ABIChangedEvent.OutputObject>;
    filters: {
        "ABIChanged(bytes32,uint256)": TypedContractEvent<ABIChangedEvent.InputTuple, ABIChangedEvent.OutputTuple, ABIChangedEvent.OutputObject>;
        ABIChanged: TypedContractEvent<ABIChangedEvent.InputTuple, ABIChangedEvent.OutputTuple, ABIChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=IABIResolver.d.ts.map