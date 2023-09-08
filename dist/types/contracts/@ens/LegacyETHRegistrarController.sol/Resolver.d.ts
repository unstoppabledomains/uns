import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../common";
export interface ResolverInterface extends utils.Interface {
    functions: {
        "ABI(bytes32,uint256)": FunctionFragment;
        "addr(bytes32)": FunctionFragment;
        "addr(bytes32,uint256)": FunctionFragment;
        "content(bytes32)": FunctionFragment;
        "contenthash(bytes32)": FunctionFragment;
        "dnsrr(bytes32)": FunctionFragment;
        "interfaceImplementer(bytes32,bytes4)": FunctionFragment;
        "multihash(bytes32)": FunctionFragment;
        "name(bytes32)": FunctionFragment;
        "pubkey(bytes32)": FunctionFragment;
        "setABI(bytes32,uint256,bytes)": FunctionFragment;
        "setAddr(bytes32,uint256,bytes)": FunctionFragment;
        "setAddr(bytes32,address)": FunctionFragment;
        "setContent(bytes32,bytes32)": FunctionFragment;
        "setContenthash(bytes32,bytes)": FunctionFragment;
        "setDnsrr(bytes32,bytes)": FunctionFragment;
        "setInterface(bytes32,bytes4,address)": FunctionFragment;
        "setMultihash(bytes32,bytes)": FunctionFragment;
        "setName(bytes32,string)": FunctionFragment;
        "setPubkey(bytes32,bytes32,bytes32)": FunctionFragment;
        "setText(bytes32,string,string)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "text(bytes32,string)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "ABI" | "addr(bytes32)" | "addr(bytes32,uint256)" | "content" | "contenthash" | "dnsrr" | "interfaceImplementer" | "multihash" | "name" | "pubkey" | "setABI" | "setAddr(bytes32,uint256,bytes)" | "setAddr(bytes32,address)" | "setContent" | "setContenthash" | "setDnsrr" | "setInterface" | "setMultihash" | "setName" | "setPubkey" | "setText" | "supportsInterface" | "text"): FunctionFragment;
    encodeFunctionData(functionFragment: "ABI", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "addr(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "addr(bytes32,uint256)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "content", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "contenthash", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "dnsrr", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "interfaceImplementer", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "multihash", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "name", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "pubkey", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "setABI", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "setAddr(bytes32,uint256,bytes)", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "setAddr(bytes32,address)", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setContent", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "setContenthash", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "setDnsrr", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "setInterface", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "setMultihash", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "setName", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setPubkey", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "setText", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "text", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
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
    events: {
        "ABIChanged(bytes32,uint256)": EventFragment;
        "AddrChanged(bytes32,address)": EventFragment;
        "AddressChanged(bytes32,uint256,bytes)": EventFragment;
        "ContentChanged(bytes32,bytes32)": EventFragment;
        "ContenthashChanged(bytes32,bytes)": EventFragment;
        "NameChanged(bytes32,string)": EventFragment;
        "PubkeyChanged(bytes32,bytes32,bytes32)": EventFragment;
        "TextChanged(bytes32,string,string)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "ABIChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AddrChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AddressChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContentChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ContenthashChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NameChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PubkeyChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TextChanged"): EventFragment;
}
export interface ABIChangedEventObject {
    node: string;
    contentType: BigNumber;
}
export declare type ABIChangedEvent = TypedEvent<[
    string,
    BigNumber
], ABIChangedEventObject>;
export declare type ABIChangedEventFilter = TypedEventFilter<ABIChangedEvent>;
export interface AddrChangedEventObject {
    node: string;
    a: string;
}
export declare type AddrChangedEvent = TypedEvent<[
    string,
    string
], AddrChangedEventObject>;
export declare type AddrChangedEventFilter = TypedEventFilter<AddrChangedEvent>;
export interface AddressChangedEventObject {
    node: string;
    coinType: BigNumber;
    newAddress: string;
}
export declare type AddressChangedEvent = TypedEvent<[
    string,
    BigNumber,
    string
], AddressChangedEventObject>;
export declare type AddressChangedEventFilter = TypedEventFilter<AddressChangedEvent>;
export interface ContentChangedEventObject {
    node: string;
    hash: string;
}
export declare type ContentChangedEvent = TypedEvent<[
    string,
    string
], ContentChangedEventObject>;
export declare type ContentChangedEventFilter = TypedEventFilter<ContentChangedEvent>;
export interface ContenthashChangedEventObject {
    node: string;
    hash: string;
}
export declare type ContenthashChangedEvent = TypedEvent<[
    string,
    string
], ContenthashChangedEventObject>;
export declare type ContenthashChangedEventFilter = TypedEventFilter<ContenthashChangedEvent>;
export interface NameChangedEventObject {
    node: string;
    name: string;
}
export declare type NameChangedEvent = TypedEvent<[
    string,
    string
], NameChangedEventObject>;
export declare type NameChangedEventFilter = TypedEventFilter<NameChangedEvent>;
export interface PubkeyChangedEventObject {
    node: string;
    x: string;
    y: string;
}
export declare type PubkeyChangedEvent = TypedEvent<[
    string,
    string,
    string
], PubkeyChangedEventObject>;
export declare type PubkeyChangedEventFilter = TypedEventFilter<PubkeyChangedEvent>;
export interface TextChangedEventObject {
    node: string;
    indexedKey: string;
    key: string;
}
export declare type TextChangedEvent = TypedEvent<[
    string,
    string,
    string
], TextChangedEventObject>;
export declare type TextChangedEventFilter = TypedEventFilter<TextChangedEvent>;
export interface Resolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ResolverInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        ABI(node: PromiseOrValue<BytesLike>, contentTypes: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, string]>;
        "addr(bytes32)"(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        "addr(bytes32,uint256)"(node: PromiseOrValue<BytesLike>, coinType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        content(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        contenthash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        dnsrr(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        interfaceImplementer(node: PromiseOrValue<BytesLike>, interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        multihash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        name(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, string] & {
            x: string;
            y: string;
        }>;
        setABI(node: PromiseOrValue<BytesLike>, contentType: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setAddr(bytes32,uint256,bytes)"(node: PromiseOrValue<BytesLike>, coinType: PromiseOrValue<BigNumberish>, a: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setAddr(bytes32,address)"(node: PromiseOrValue<BytesLike>, addr: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setContent(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setContenthash(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setDnsrr(node: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setInterface(node: PromiseOrValue<BytesLike>, interfaceID: PromiseOrValue<BytesLike>, implementer: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setMultihash(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setName(node: PromiseOrValue<BytesLike>, _name: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setPubkey(node: PromiseOrValue<BytesLike>, x: PromiseOrValue<BytesLike>, y: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setText(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, value: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        text(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;
    };
    ABI(node: PromiseOrValue<BytesLike>, contentTypes: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, string]>;
    "addr(bytes32)"(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    "addr(bytes32,uint256)"(node: PromiseOrValue<BytesLike>, coinType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    content(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    contenthash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    dnsrr(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    interfaceImplementer(node: PromiseOrValue<BytesLike>, interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    multihash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    name(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, string] & {
        x: string;
        y: string;
    }>;
    setABI(node: PromiseOrValue<BytesLike>, contentType: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setAddr(bytes32,uint256,bytes)"(node: PromiseOrValue<BytesLike>, coinType: PromiseOrValue<BigNumberish>, a: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setAddr(bytes32,address)"(node: PromiseOrValue<BytesLike>, addr: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setContent(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setContenthash(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setDnsrr(node: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setInterface(node: PromiseOrValue<BytesLike>, interfaceID: PromiseOrValue<BytesLike>, implementer: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setMultihash(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setName(node: PromiseOrValue<BytesLike>, _name: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setPubkey(node: PromiseOrValue<BytesLike>, x: PromiseOrValue<BytesLike>, y: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setText(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, value: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    text(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        ABI(node: PromiseOrValue<BytesLike>, contentTypes: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, string]>;
        "addr(bytes32)"(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        "addr(bytes32,uint256)"(node: PromiseOrValue<BytesLike>, coinType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        content(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        contenthash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        dnsrr(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        interfaceImplementer(node: PromiseOrValue<BytesLike>, interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        multihash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        name(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, string] & {
            x: string;
            y: string;
        }>;
        setABI(node: PromiseOrValue<BytesLike>, contentType: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "setAddr(bytes32,uint256,bytes)"(node: PromiseOrValue<BytesLike>, coinType: PromiseOrValue<BigNumberish>, a: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "setAddr(bytes32,address)"(node: PromiseOrValue<BytesLike>, addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setContent(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        setContenthash(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        setDnsrr(node: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        setInterface(node: PromiseOrValue<BytesLike>, interfaceID: PromiseOrValue<BytesLike>, implementer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setMultihash(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        setName(node: PromiseOrValue<BytesLike>, _name: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setPubkey(node: PromiseOrValue<BytesLike>, x: PromiseOrValue<BytesLike>, y: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        setText(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, value: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        text(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "ABIChanged(bytes32,uint256)"(node?: PromiseOrValue<BytesLike> | null, contentType?: PromiseOrValue<BigNumberish> | null): ABIChangedEventFilter;
        ABIChanged(node?: PromiseOrValue<BytesLike> | null, contentType?: PromiseOrValue<BigNumberish> | null): ABIChangedEventFilter;
        "AddrChanged(bytes32,address)"(node?: PromiseOrValue<BytesLike> | null, a?: null): AddrChangedEventFilter;
        AddrChanged(node?: PromiseOrValue<BytesLike> | null, a?: null): AddrChangedEventFilter;
        "AddressChanged(bytes32,uint256,bytes)"(node?: PromiseOrValue<BytesLike> | null, coinType?: null, newAddress?: null): AddressChangedEventFilter;
        AddressChanged(node?: PromiseOrValue<BytesLike> | null, coinType?: null, newAddress?: null): AddressChangedEventFilter;
        "ContentChanged(bytes32,bytes32)"(node?: PromiseOrValue<BytesLike> | null, hash?: null): ContentChangedEventFilter;
        ContentChanged(node?: PromiseOrValue<BytesLike> | null, hash?: null): ContentChangedEventFilter;
        "ContenthashChanged(bytes32,bytes)"(node?: PromiseOrValue<BytesLike> | null, hash?: null): ContenthashChangedEventFilter;
        ContenthashChanged(node?: PromiseOrValue<BytesLike> | null, hash?: null): ContenthashChangedEventFilter;
        "NameChanged(bytes32,string)"(node?: PromiseOrValue<BytesLike> | null, name?: null): NameChangedEventFilter;
        NameChanged(node?: PromiseOrValue<BytesLike> | null, name?: null): NameChangedEventFilter;
        "PubkeyChanged(bytes32,bytes32,bytes32)"(node?: PromiseOrValue<BytesLike> | null, x?: null, y?: null): PubkeyChangedEventFilter;
        PubkeyChanged(node?: PromiseOrValue<BytesLike> | null, x?: null, y?: null): PubkeyChangedEventFilter;
        "TextChanged(bytes32,string,string)"(node?: PromiseOrValue<BytesLike> | null, indexedKey?: PromiseOrValue<string> | null, key?: null): TextChangedEventFilter;
        TextChanged(node?: PromiseOrValue<BytesLike> | null, indexedKey?: PromiseOrValue<string> | null, key?: null): TextChangedEventFilter;
    };
    estimateGas: {
        ABI(node: PromiseOrValue<BytesLike>, contentTypes: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "addr(bytes32)"(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        "addr(bytes32,uint256)"(node: PromiseOrValue<BytesLike>, coinType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        content(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        contenthash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        dnsrr(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        interfaceImplementer(node: PromiseOrValue<BytesLike>, interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        multihash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        name(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        setABI(node: PromiseOrValue<BytesLike>, contentType: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setAddr(bytes32,uint256,bytes)"(node: PromiseOrValue<BytesLike>, coinType: PromiseOrValue<BigNumberish>, a: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setAddr(bytes32,address)"(node: PromiseOrValue<BytesLike>, addr: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setContent(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setContenthash(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setDnsrr(node: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setInterface(node: PromiseOrValue<BytesLike>, interfaceID: PromiseOrValue<BytesLike>, implementer: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setMultihash(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setName(node: PromiseOrValue<BytesLike>, _name: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setPubkey(node: PromiseOrValue<BytesLike>, x: PromiseOrValue<BytesLike>, y: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setText(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, value: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        text(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        ABI(node: PromiseOrValue<BytesLike>, contentTypes: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "addr(bytes32)"(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "addr(bytes32,uint256)"(node: PromiseOrValue<BytesLike>, coinType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        content(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contenthash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        dnsrr(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        interfaceImplementer(node: PromiseOrValue<BytesLike>, interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        multihash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        name(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setABI(node: PromiseOrValue<BytesLike>, contentType: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setAddr(bytes32,uint256,bytes)"(node: PromiseOrValue<BytesLike>, coinType: PromiseOrValue<BigNumberish>, a: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setAddr(bytes32,address)"(node: PromiseOrValue<BytesLike>, addr: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setContent(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setContenthash(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setDnsrr(node: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setInterface(node: PromiseOrValue<BytesLike>, interfaceID: PromiseOrValue<BytesLike>, implementer: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setMultihash(node: PromiseOrValue<BytesLike>, hash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setName(node: PromiseOrValue<BytesLike>, _name: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setPubkey(node: PromiseOrValue<BytesLike>, x: PromiseOrValue<BytesLike>, y: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setText(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, value: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        text(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=Resolver.d.ts.map