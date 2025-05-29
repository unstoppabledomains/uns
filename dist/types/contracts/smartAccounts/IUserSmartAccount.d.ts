import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export declare namespace ISmartAccount {
    type CallStruct = {
        to: AddressLike;
        value: BigNumberish;
        data: BytesLike;
    };
    type CallStructOutput = [to: string, value: bigint, data: string] & {
        to: string;
        value: bigint;
        data: string;
    };
    type SplitSignatureStruct = {
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
    };
    type SplitSignatureStructOutput = [v: bigint, r: string, s: string] & {
        v: bigint;
        r: string;
        s: string;
    };
}
export interface IUserSmartAccountInterface extends Interface {
    getFunction(nameOrSignature: "execute((address,uint256,bytes)[])" | "execute((address,uint256,bytes)[],uint256,(uint8,bytes32,bytes32))" | "nonce"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "BatchExecuted" | "CallExecuted"): EventFragment;
    encodeFunctionData(functionFragment: "execute((address,uint256,bytes)[])", values: [ISmartAccount.CallStruct[]]): string;
    encodeFunctionData(functionFragment: "execute((address,uint256,bytes)[],uint256,(uint8,bytes32,bytes32))", values: [
        ISmartAccount.CallStruct[],
        BigNumberish,
        ISmartAccount.SplitSignatureStruct
    ]): string;
    encodeFunctionData(functionFragment: "nonce", values?: undefined): string;
    decodeFunctionResult(functionFragment: "execute((address,uint256,bytes)[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "execute((address,uint256,bytes)[],uint256,(uint8,bytes32,bytes32))", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
}
export declare namespace BatchExecutedEvent {
    type InputTuple = [
        nonce: BigNumberish,
        calls: ISmartAccount.CallStruct[]
    ];
    type OutputTuple = [
        nonce: bigint,
        calls: ISmartAccount.CallStructOutput[]
    ];
    interface OutputObject {
        nonce: bigint;
        calls: ISmartAccount.CallStructOutput[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace CallExecutedEvent {
    type InputTuple = [
        sender: AddressLike,
        to: AddressLike,
        value: BigNumberish,
        data: BytesLike
    ];
    type OutputTuple = [
        sender: string,
        to: string,
        value: bigint,
        data: string
    ];
    interface OutputObject {
        sender: string;
        to: string;
        value: bigint;
        data: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IUserSmartAccount extends BaseContract {
    connect(runner?: ContractRunner | null): IUserSmartAccount;
    waitForDeployment(): Promise<this>;
    interface: IUserSmartAccountInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    "execute((address,uint256,bytes)[])": TypedContractMethod<[
        calls: ISmartAccount.CallStruct[]
    ], [
        void
    ], "payable">;
    "execute((address,uint256,bytes)[],uint256,(uint8,bytes32,bytes32))": TypedContractMethod<[
        calls: ISmartAccount.CallStruct[],
        deadline: BigNumberish,
        signature: ISmartAccount.SplitSignatureStruct
    ], [
        void
    ], "payable">;
    nonce: TypedContractMethod<[], [bigint], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "execute((address,uint256,bytes)[])"): TypedContractMethod<[
        calls: ISmartAccount.CallStruct[]
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "execute((address,uint256,bytes)[],uint256,(uint8,bytes32,bytes32))"): TypedContractMethod<[
        calls: ISmartAccount.CallStruct[],
        deadline: BigNumberish,
        signature: ISmartAccount.SplitSignatureStruct
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "nonce"): TypedContractMethod<[], [bigint], "view">;
    getEvent(key: "BatchExecuted"): TypedContractEvent<BatchExecutedEvent.InputTuple, BatchExecutedEvent.OutputTuple, BatchExecutedEvent.OutputObject>;
    getEvent(key: "CallExecuted"): TypedContractEvent<CallExecutedEvent.InputTuple, CallExecutedEvent.OutputTuple, CallExecutedEvent.OutputObject>;
    filters: {
        "BatchExecuted(uint256,tuple[])": TypedContractEvent<BatchExecutedEvent.InputTuple, BatchExecutedEvent.OutputTuple, BatchExecutedEvent.OutputObject>;
        BatchExecuted: TypedContractEvent<BatchExecutedEvent.InputTuple, BatchExecutedEvent.OutputTuple, BatchExecutedEvent.OutputObject>;
        "CallExecuted(address,address,uint256,bytes)": TypedContractEvent<CallExecutedEvent.InputTuple, CallExecutedEvent.OutputTuple, CallExecutedEvent.OutputObject>;
        CallExecuted: TypedContractEvent<CallExecutedEvent.InputTuple, CallExecutedEvent.OutputTuple, CallExecutedEvent.OutputObject>;
    };
}
//# sourceMappingURL=IUserSmartAccount.d.ts.map