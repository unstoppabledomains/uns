import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
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
export interface UNSRegistryForwarderMockInterface extends Interface {
    getFunction(nameOrSignature: "execute" | "initialize" | "nonceOf" | "verify"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
    encodeFunctionData(functionFragment: "execute", values: [IForwarder.ForwardRequestStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "initialize", values?: undefined): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "verify", values: [IForwarder.ForwardRequestStruct, BytesLike]): string;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
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
export interface UNSRegistryForwarderMock extends BaseContract {
    connect(runner?: ContractRunner | null): UNSRegistryForwarderMock;
    waitForDeployment(): Promise<this>;
    interface: UNSRegistryForwarderMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    execute: TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        string
    ], "nonpayable">;
    initialize: TypedContractMethod<[], [void], "nonpayable">;
    nonceOf: TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    verify: TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        boolean
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "execute"): TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "nonceOf"): TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "verify"): TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        boolean
    ], "view">;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    filters: {
        "Initialized(uint8)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    };
}
//# sourceMappingURL=UNSRegistryForwarderMock.d.ts.map