import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export interface IRegistrarCustodyInterface extends Interface {
    getFunction(nameOrSignature: "isValidSignature" | "revoke" | "setRecords" | "tokenizeDomain"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AdminChanged" | "DomainTokenized" | "Upgraded"): EventFragment;
    encodeFunctionData(functionFragment: "isValidSignature", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "revoke", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setRecords", values: [string[], string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "tokenizeDomain", values: [
        string[],
        string[],
        string[],
        BigNumberish,
        BigNumberish,
        AddressLike
    ]): string;
    decodeFunctionResult(functionFragment: "isValidSignature", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revoke", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenizeDomain", data: BytesLike): Result;
}
export declare namespace AdminChangedEvent {
    type InputTuple = [previousAdmin: AddressLike, newAdmin: AddressLike];
    type OutputTuple = [previousAdmin: string, newAdmin: string];
    interface OutputObject {
        previousAdmin: string;
        newAdmin: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace DomainTokenizedEvent {
    type InputTuple = [
        tokenId: BigNumberish,
        registrarId: BigNumberish,
        userDelegation: AddressLike
    ];
    type OutputTuple = [
        tokenId: bigint,
        registrarId: bigint,
        userDelegation: string
    ];
    interface OutputObject {
        tokenId: bigint;
        registrarId: bigint;
        userDelegation: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace UpgradedEvent {
    type InputTuple = [implementation: AddressLike];
    type OutputTuple = [implementation: string];
    interface OutputObject {
        implementation: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IRegistrarCustody extends BaseContract {
    connect(runner?: ContractRunner | null): IRegistrarCustody;
    waitForDeployment(): Promise<this>;
    interface: IRegistrarCustodyInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    isValidSignature: TypedContractMethod<[
        hash: BytesLike,
        signature: BytesLike
    ], [
        string
    ], "view">;
    revoke: TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    setRecords: TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    tokenizeDomain: TypedContractMethod<[
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        registrarId: BigNumberish,
        userDelegation: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "isValidSignature"): TypedContractMethod<[
        hash: BytesLike,
        signature: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "revoke"): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setRecords"): TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "tokenizeDomain"): TypedContractMethod<[
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        registrarId: BigNumberish,
        userDelegation: AddressLike
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "AdminChanged"): TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
    getEvent(key: "DomainTokenized"): TypedContractEvent<DomainTokenizedEvent.InputTuple, DomainTokenizedEvent.OutputTuple, DomainTokenizedEvent.OutputObject>;
    getEvent(key: "Upgraded"): TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
    filters: {
        "AdminChanged(address,address)": TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
        AdminChanged: TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
        "DomainTokenized(uint256,uint256,address)": TypedContractEvent<DomainTokenizedEvent.InputTuple, DomainTokenizedEvent.OutputTuple, DomainTokenizedEvent.OutputObject>;
        DomainTokenized: TypedContractEvent<DomainTokenizedEvent.InputTuple, DomainTokenizedEvent.OutputTuple, DomainTokenizedEvent.OutputObject>;
        "Upgraded(address)": TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
        Upgraded: TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
    };
}
//# sourceMappingURL=IRegistrarCustody.d.ts.map