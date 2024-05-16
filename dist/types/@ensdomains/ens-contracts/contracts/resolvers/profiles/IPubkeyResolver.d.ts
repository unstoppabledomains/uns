import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../../common";
export interface IPubkeyResolverInterface extends Interface {
    getFunction(nameOrSignature: "pubkey"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "PubkeyChanged"): EventFragment;
    encodeFunctionData(functionFragment: "pubkey", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "pubkey", data: BytesLike): Result;
}
export declare namespace PubkeyChangedEvent {
    type InputTuple = [node: BytesLike, x: BytesLike, y: BytesLike];
    type OutputTuple = [node: string, x: string, y: string];
    interface OutputObject {
        node: string;
        x: string;
        y: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IPubkeyResolver extends BaseContract {
    connect(runner?: ContractRunner | null): IPubkeyResolver;
    waitForDeployment(): Promise<this>;
    interface: IPubkeyResolverInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    pubkey: TypedContractMethod<[
        node: BytesLike
    ], [
        [string, string] & {
            x: string;
            y: string;
        }
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "pubkey"): TypedContractMethod<[
        node: BytesLike
    ], [
        [string, string] & {
            x: string;
            y: string;
        }
    ], "view">;
    getEvent(key: "PubkeyChanged"): TypedContractEvent<PubkeyChangedEvent.InputTuple, PubkeyChangedEvent.OutputTuple, PubkeyChangedEvent.OutputObject>;
    filters: {
        "PubkeyChanged(bytes32,bytes32,bytes32)": TypedContractEvent<PubkeyChangedEvent.InputTuple, PubkeyChangedEvent.OutputTuple, PubkeyChangedEvent.OutputObject>;
        PubkeyChanged: TypedContractEvent<PubkeyChangedEvent.InputTuple, PubkeyChangedEvent.OutputTuple, PubkeyChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=IPubkeyResolver.d.ts.map