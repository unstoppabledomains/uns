import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export interface IMintingManagerInterface extends Interface {
    getFunction(nameOrSignature: "addTld" | "buy" | "buyForErc20" | "issueExpirableWithRecords" | "issueWithRecords" | "removeTld" | "renew" | "revoke" | "setTokenURIPrefix" | "withdraw(address)" | "withdraw(address,address)"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AdminChanged" | "DomainPurchase" | "NewTld" | "RemoveTld" | "Upgraded" | "Withdrawal"): EventFragment;
    encodeFunctionData(functionFragment: "addTld", values: [string, boolean]): string;
    encodeFunctionData(functionFragment: "buy", values: [
        AddressLike,
        string[],
        string[],
        string[],
        BigNumberish,
        BigNumberish,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "buyForErc20", values: [
        AddressLike,
        string[],
        string[],
        string[],
        BigNumberish,
        AddressLike,
        BigNumberish,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "issueExpirableWithRecords", values: [AddressLike, string[], string[], string[], BigNumberish, boolean]): string;
    encodeFunctionData(functionFragment: "issueWithRecords", values: [AddressLike, string[], string[], string[], boolean]): string;
    encodeFunctionData(functionFragment: "removeTld", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "renew", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "revoke", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setTokenURIPrefix", values: [string]): string;
    encodeFunctionData(functionFragment: "withdraw(address)", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "withdraw(address,address)", values: [AddressLike, AddressLike]): string;
    decodeFunctionResult(functionFragment: "addTld", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "buyForErc20", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "issueExpirableWithRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "issueWithRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeTld", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renew", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revoke", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTokenURIPrefix", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw(address,address)", data: BytesLike): Result;
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
export declare namespace DomainPurchaseEvent {
    type InputTuple = [
        tokenId: BigNumberish,
        sender: AddressLike,
        owner: AddressLike,
        price: BigNumberish,
        token: AddressLike
    ];
    type OutputTuple = [
        tokenId: bigint,
        sender: string,
        owner: string,
        price: bigint,
        token: string
    ];
    interface OutputObject {
        tokenId: bigint;
        sender: string;
        owner: string;
        price: bigint;
        token: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NewTldEvent {
    type InputTuple = [tokenId: BigNumberish, tld: string];
    type OutputTuple = [tokenId: bigint, tld: string];
    interface OutputObject {
        tokenId: bigint;
        tld: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RemoveTldEvent {
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
export declare namespace WithdrawalEvent {
    type InputTuple = [
        recepient: AddressLike,
        value: BigNumberish,
        token: AddressLike
    ];
    type OutputTuple = [recepient: string, value: bigint, token: string];
    interface OutputObject {
        recepient: string;
        value: bigint;
        token: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IMintingManager extends BaseContract {
    connect(runner?: ContractRunner | null): IMintingManager;
    waitForDeployment(): Promise<this>;
    interface: IMintingManagerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addTld: TypedContractMethod<[
        tld: string,
        isExpirable: boolean
    ], [
        void
    ], "nonpayable">;
    buy: TypedContractMethod<[
        owner: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        price: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "payable">;
    buyForErc20: TypedContractMethod<[
        owner: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        token: AddressLike,
        price: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    issueExpirableWithRecords: TypedContractMethod<[
        to: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        withReverse: boolean
    ], [
        void
    ], "nonpayable">;
    issueWithRecords: TypedContractMethod<[
        to: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        withReverse: boolean
    ], [
        void
    ], "nonpayable">;
    removeTld: TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    renew: TypedContractMethod<[
        expiry: BigNumberish,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    revoke: TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    setTokenURIPrefix: TypedContractMethod<[
        prefix: string
    ], [
        void
    ], "nonpayable">;
    "withdraw(address)": TypedContractMethod<[
        recepient: AddressLike
    ], [
        void
    ], "nonpayable">;
    "withdraw(address,address)": TypedContractMethod<[
        token: AddressLike,
        recepient: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addTld"): TypedContractMethod<[
        tld: string,
        isExpirable: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "buy"): TypedContractMethod<[
        owner: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        price: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "buyForErc20"): TypedContractMethod<[
        owner: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        token: AddressLike,
        price: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "issueExpirableWithRecords"): TypedContractMethod<[
        to: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        expiry: BigNumberish,
        withReverse: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "issueWithRecords"): TypedContractMethod<[
        to: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        withReverse: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "removeTld"): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "renew"): TypedContractMethod<[
        expiry: BigNumberish,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "revoke"): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setTokenURIPrefix"): TypedContractMethod<[prefix: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "withdraw(address)"): TypedContractMethod<[recepient: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "withdraw(address,address)"): TypedContractMethod<[
        token: AddressLike,
        recepient: AddressLike
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "AdminChanged"): TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
    getEvent(key: "DomainPurchase"): TypedContractEvent<DomainPurchaseEvent.InputTuple, DomainPurchaseEvent.OutputTuple, DomainPurchaseEvent.OutputObject>;
    getEvent(key: "NewTld"): TypedContractEvent<NewTldEvent.InputTuple, NewTldEvent.OutputTuple, NewTldEvent.OutputObject>;
    getEvent(key: "RemoveTld"): TypedContractEvent<RemoveTldEvent.InputTuple, RemoveTldEvent.OutputTuple, RemoveTldEvent.OutputObject>;
    getEvent(key: "Upgraded"): TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
    getEvent(key: "Withdrawal"): TypedContractEvent<WithdrawalEvent.InputTuple, WithdrawalEvent.OutputTuple, WithdrawalEvent.OutputObject>;
    filters: {
        "AdminChanged(address,address)": TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
        AdminChanged: TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
        "DomainPurchase(uint256,address,address,uint256,address)": TypedContractEvent<DomainPurchaseEvent.InputTuple, DomainPurchaseEvent.OutputTuple, DomainPurchaseEvent.OutputObject>;
        DomainPurchase: TypedContractEvent<DomainPurchaseEvent.InputTuple, DomainPurchaseEvent.OutputTuple, DomainPurchaseEvent.OutputObject>;
        "NewTld(uint256,string)": TypedContractEvent<NewTldEvent.InputTuple, NewTldEvent.OutputTuple, NewTldEvent.OutputObject>;
        NewTld: TypedContractEvent<NewTldEvent.InputTuple, NewTldEvent.OutputTuple, NewTldEvent.OutputObject>;
        "RemoveTld(uint256)": TypedContractEvent<RemoveTldEvent.InputTuple, RemoveTldEvent.OutputTuple, RemoveTldEvent.OutputObject>;
        RemoveTld: TypedContractEvent<RemoveTldEvent.InputTuple, RemoveTldEvent.OutputTuple, RemoveTldEvent.OutputObject>;
        "Upgraded(address)": TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
        Upgraded: TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
        "Withdrawal(address,uint256,address)": TypedContractEvent<WithdrawalEvent.InputTuple, WithdrawalEvent.OutputTuple, WithdrawalEvent.OutputObject>;
        Withdrawal: TypedContractEvent<WithdrawalEvent.InputTuple, WithdrawalEvent.OutputTuple, WithdrawalEvent.OutputObject>;
    };
}
//# sourceMappingURL=IMintingManager.d.ts.map