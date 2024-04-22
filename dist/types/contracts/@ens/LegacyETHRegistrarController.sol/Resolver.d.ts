import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
export interface ResolverInterface extends Interface {
    getFunction(nameOrSignature: "ABI" | "addr(bytes32)" | "addr(bytes32,uint256)" | "content" | "contenthash" | "dnsrr" | "interfaceImplementer" | "multihash" | "name" | "pubkey" | "setABI" | "setAddr(bytes32,uint256,bytes)" | "setAddr(bytes32,address)" | "setContent" | "setContenthash" | "setDnsrr" | "setInterface" | "setMultihash" | "setName" | "setPubkey" | "setText" | "supportsInterface" | "text"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "ABIChanged" | "AddrChanged" | "AddressChanged" | "ContentChanged" | "ContenthashChanged" | "NameChanged" | "PubkeyChanged" | "TextChanged"): EventFragment;
    encodeFunctionData(functionFragment: "ABI", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "addr(bytes32)", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "addr(bytes32,uint256)", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "content", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "contenthash", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "dnsrr", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "interfaceImplementer", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "multihash", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "name", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "pubkey", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "setABI", values: [BytesLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "setAddr(bytes32,uint256,bytes)", values: [BytesLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "setAddr(bytes32,address)", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "setContent", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "setContenthash", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "setDnsrr", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "setInterface", values: [BytesLike, BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "setMultihash", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "setName", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "setPubkey", values: [BytesLike, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "setText", values: [BytesLike, string, string]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "text", values: [BytesLike, string]): string;
    decodeFunctionResult(functionFragment: "ABI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addr(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addr(bytes32,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "content", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contenthash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "dnsrr", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "interfaceImplementer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "multihash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pubkey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setABI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setAddr(bytes32,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setAddr(bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setContent", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setContenthash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDnsrr", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMultihash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPubkey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setText", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "text", data: BytesLike): Result;
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
export declare namespace AddrChangedEvent {
    type InputTuple = [node: BytesLike, a: AddressLike];
    type OutputTuple = [node: string, a: string];
    interface OutputObject {
        node: string;
        a: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace AddressChangedEvent {
    type InputTuple = [
        node: BytesLike,
        coinType: BigNumberish,
        newAddress: BytesLike
    ];
    type OutputTuple = [
        node: string,
        coinType: bigint,
        newAddress: string
    ];
    interface OutputObject {
        node: string;
        coinType: bigint;
        newAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ContentChangedEvent {
    type InputTuple = [node: BytesLike, hash: BytesLike];
    type OutputTuple = [node: string, hash: string];
    interface OutputObject {
        node: string;
        hash: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ContenthashChangedEvent {
    type InputTuple = [node: BytesLike, hash: BytesLike];
    type OutputTuple = [node: string, hash: string];
    interface OutputObject {
        node: string;
        hash: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NameChangedEvent {
    type InputTuple = [node: BytesLike, name: string];
    type OutputTuple = [node: string, name: string];
    interface OutputObject {
        node: string;
        name: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
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
export declare namespace TextChangedEvent {
    type InputTuple = [node: BytesLike, indexedKey: string, key: string];
    type OutputTuple = [node: string, indexedKey: string, key: string];
    interface OutputObject {
        node: string;
        indexedKey: string;
        key: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface Resolver extends BaseContract {
    connect(runner?: ContractRunner | null): Resolver;
    waitForDeployment(): Promise<this>;
    interface: ResolverInterface;
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
    "addr(bytes32)": TypedContractMethod<[node: BytesLike], [string], "view">;
    "addr(bytes32,uint256)": TypedContractMethod<[
        node: BytesLike,
        coinType: BigNumberish
    ], [
        string
    ], "view">;
    content: TypedContractMethod<[node: BytesLike], [string], "view">;
    contenthash: TypedContractMethod<[node: BytesLike], [string], "view">;
    dnsrr: TypedContractMethod<[node: BytesLike], [string], "view">;
    interfaceImplementer: TypedContractMethod<[
        node: BytesLike,
        interfaceID: BytesLike
    ], [
        string
    ], "view">;
    multihash: TypedContractMethod<[node: BytesLike], [string], "view">;
    name: TypedContractMethod<[node: BytesLike], [string], "view">;
    pubkey: TypedContractMethod<[
        node: BytesLike
    ], [
        [string, string] & {
            x: string;
            y: string;
        }
    ], "view">;
    setABI: TypedContractMethod<[
        node: BytesLike,
        contentType: BigNumberish,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    "setAddr(bytes32,uint256,bytes)": TypedContractMethod<[
        node: BytesLike,
        coinType: BigNumberish,
        a: BytesLike
    ], [
        void
    ], "nonpayable">;
    "setAddr(bytes32,address)": TypedContractMethod<[
        node: BytesLike,
        addr: AddressLike
    ], [
        void
    ], "nonpayable">;
    setContent: TypedContractMethod<[
        node: BytesLike,
        hash: BytesLike
    ], [
        void
    ], "nonpayable">;
    setContenthash: TypedContractMethod<[
        node: BytesLike,
        hash: BytesLike
    ], [
        void
    ], "nonpayable">;
    setDnsrr: TypedContractMethod<[
        node: BytesLike,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    setInterface: TypedContractMethod<[
        node: BytesLike,
        interfaceID: BytesLike,
        implementer: AddressLike
    ], [
        void
    ], "nonpayable">;
    setMultihash: TypedContractMethod<[
        node: BytesLike,
        hash: BytesLike
    ], [
        void
    ], "nonpayable">;
    setName: TypedContractMethod<[
        node: BytesLike,
        _name: string
    ], [
        void
    ], "nonpayable">;
    setPubkey: TypedContractMethod<[
        node: BytesLike,
        x: BytesLike,
        y: BytesLike
    ], [
        void
    ], "nonpayable">;
    setText: TypedContractMethod<[
        node: BytesLike,
        key: string,
        value: string
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceID: BytesLike
    ], [
        boolean
    ], "view">;
    text: TypedContractMethod<[node: BytesLike, key: string], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "ABI"): TypedContractMethod<[
        node: BytesLike,
        contentTypes: BigNumberish
    ], [
        [bigint, string]
    ], "view">;
    getFunction(nameOrSignature: "addr(bytes32)"): TypedContractMethod<[node: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "addr(bytes32,uint256)"): TypedContractMethod<[
        node: BytesLike,
        coinType: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "content"): TypedContractMethod<[node: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "contenthash"): TypedContractMethod<[node: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "dnsrr"): TypedContractMethod<[node: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "interfaceImplementer"): TypedContractMethod<[
        node: BytesLike,
        interfaceID: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "multihash"): TypedContractMethod<[node: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[node: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "pubkey"): TypedContractMethod<[
        node: BytesLike
    ], [
        [string, string] & {
            x: string;
            y: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "setABI"): TypedContractMethod<[
        node: BytesLike,
        contentType: BigNumberish,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setAddr(bytes32,uint256,bytes)"): TypedContractMethod<[
        node: BytesLike,
        coinType: BigNumberish,
        a: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setAddr(bytes32,address)"): TypedContractMethod<[
        node: BytesLike,
        addr: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setContent"): TypedContractMethod<[
        node: BytesLike,
        hash: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setContenthash"): TypedContractMethod<[
        node: BytesLike,
        hash: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setDnsrr"): TypedContractMethod<[
        node: BytesLike,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setInterface"): TypedContractMethod<[
        node: BytesLike,
        interfaceID: BytesLike,
        implementer: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setMultihash"): TypedContractMethod<[
        node: BytesLike,
        hash: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setName"): TypedContractMethod<[
        node: BytesLike,
        _name: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setPubkey"): TypedContractMethod<[
        node: BytesLike,
        x: BytesLike,
        y: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setText"): TypedContractMethod<[
        node: BytesLike,
        key: string,
        value: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceID: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "text"): TypedContractMethod<[node: BytesLike, key: string], [string], "view">;
    getEvent(key: "ABIChanged"): TypedContractEvent<ABIChangedEvent.InputTuple, ABIChangedEvent.OutputTuple, ABIChangedEvent.OutputObject>;
    getEvent(key: "AddrChanged"): TypedContractEvent<AddrChangedEvent.InputTuple, AddrChangedEvent.OutputTuple, AddrChangedEvent.OutputObject>;
    getEvent(key: "AddressChanged"): TypedContractEvent<AddressChangedEvent.InputTuple, AddressChangedEvent.OutputTuple, AddressChangedEvent.OutputObject>;
    getEvent(key: "ContentChanged"): TypedContractEvent<ContentChangedEvent.InputTuple, ContentChangedEvent.OutputTuple, ContentChangedEvent.OutputObject>;
    getEvent(key: "ContenthashChanged"): TypedContractEvent<ContenthashChangedEvent.InputTuple, ContenthashChangedEvent.OutputTuple, ContenthashChangedEvent.OutputObject>;
    getEvent(key: "NameChanged"): TypedContractEvent<NameChangedEvent.InputTuple, NameChangedEvent.OutputTuple, NameChangedEvent.OutputObject>;
    getEvent(key: "PubkeyChanged"): TypedContractEvent<PubkeyChangedEvent.InputTuple, PubkeyChangedEvent.OutputTuple, PubkeyChangedEvent.OutputObject>;
    getEvent(key: "TextChanged"): TypedContractEvent<TextChangedEvent.InputTuple, TextChangedEvent.OutputTuple, TextChangedEvent.OutputObject>;
    filters: {
        "ABIChanged(bytes32,uint256)": TypedContractEvent<ABIChangedEvent.InputTuple, ABIChangedEvent.OutputTuple, ABIChangedEvent.OutputObject>;
        ABIChanged: TypedContractEvent<ABIChangedEvent.InputTuple, ABIChangedEvent.OutputTuple, ABIChangedEvent.OutputObject>;
        "AddrChanged(bytes32,address)": TypedContractEvent<AddrChangedEvent.InputTuple, AddrChangedEvent.OutputTuple, AddrChangedEvent.OutputObject>;
        AddrChanged: TypedContractEvent<AddrChangedEvent.InputTuple, AddrChangedEvent.OutputTuple, AddrChangedEvent.OutputObject>;
        "AddressChanged(bytes32,uint256,bytes)": TypedContractEvent<AddressChangedEvent.InputTuple, AddressChangedEvent.OutputTuple, AddressChangedEvent.OutputObject>;
        AddressChanged: TypedContractEvent<AddressChangedEvent.InputTuple, AddressChangedEvent.OutputTuple, AddressChangedEvent.OutputObject>;
        "ContentChanged(bytes32,bytes32)": TypedContractEvent<ContentChangedEvent.InputTuple, ContentChangedEvent.OutputTuple, ContentChangedEvent.OutputObject>;
        ContentChanged: TypedContractEvent<ContentChangedEvent.InputTuple, ContentChangedEvent.OutputTuple, ContentChangedEvent.OutputObject>;
        "ContenthashChanged(bytes32,bytes)": TypedContractEvent<ContenthashChangedEvent.InputTuple, ContenthashChangedEvent.OutputTuple, ContenthashChangedEvent.OutputObject>;
        ContenthashChanged: TypedContractEvent<ContenthashChangedEvent.InputTuple, ContenthashChangedEvent.OutputTuple, ContenthashChangedEvent.OutputObject>;
        "NameChanged(bytes32,string)": TypedContractEvent<NameChangedEvent.InputTuple, NameChangedEvent.OutputTuple, NameChangedEvent.OutputObject>;
        NameChanged: TypedContractEvent<NameChangedEvent.InputTuple, NameChangedEvent.OutputTuple, NameChangedEvent.OutputObject>;
        "PubkeyChanged(bytes32,bytes32,bytes32)": TypedContractEvent<PubkeyChangedEvent.InputTuple, PubkeyChangedEvent.OutputTuple, PubkeyChangedEvent.OutputObject>;
        PubkeyChanged: TypedContractEvent<PubkeyChangedEvent.InputTuple, PubkeyChangedEvent.OutputTuple, PubkeyChangedEvent.OutputObject>;
        "TextChanged(bytes32,string,string)": TypedContractEvent<TextChangedEvent.InputTuple, TextChangedEvent.OutputTuple, TextChangedEvent.OutputObject>;
        TextChanged: TypedContractEvent<TextChangedEvent.InputTuple, TextChangedEvent.OutputTuple, TextChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=Resolver.d.ts.map