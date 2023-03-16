import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export declare namespace IForwarder {
    type ForwardRequestStruct = {
        from: PromiseOrValue<string>;
        nonce: PromiseOrValue<BigNumberish>;
        tokenId: PromiseOrValue<BigNumberish>;
        data: PromiseOrValue<BytesLike>;
    };
    type ForwardRequestStructOutput = [
        string,
        BigNumber,
        BigNumber,
        string
    ] & {
        from: string;
        nonce: BigNumber;
        tokenId: BigNumber;
        data: string;
    };
}
export interface UNSRegistryInterface extends utils.Interface {
    functions: {
        "BATCH_LIMIT()": FunctionFragment;
        "NAME()": FunctionFragment;
        "VERSION()": FunctionFragment;
        "addKey(string)": FunctionFragment;
        "addProxyReader(address)": FunctionFragment;
        "approve(address,uint256)": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "burn(uint256)": FunctionFragment;
        "deposit(address,bytes)": FunctionFragment;
        "depositToPolygon(uint256)": FunctionFragment;
        "execute((address,uint256,uint256,bytes),bytes)": FunctionFragment;
        "exists(uint256)": FunctionFragment;
        "get(string,uint256)": FunctionFragment;
        "getApproved(uint256)": FunctionFragment;
        "getByHash(uint256,uint256)": FunctionFragment;
        "getKey(uint256)": FunctionFragment;
        "getKeys(uint256[])": FunctionFragment;
        "getMany(string[],uint256)": FunctionFragment;
        "getManyByHash(uint256[],uint256)": FunctionFragment;
        "initialize(address,address,address,address)": FunctionFragment;
        "isApprovedForAll(address,address)": FunctionFragment;
        "isApprovedOrOwner(address,uint256)": FunctionFragment;
        "isTrustedForwarder(address)": FunctionFragment;
        "mint(address,uint256)": FunctionFragment;
        "mint(address,uint256,bytes)": FunctionFragment;
        "mintTLD(uint256,string)": FunctionFragment;
        "mintWithRecords(address,string[],string[],string[],bool)": FunctionFragment;
        "name()": FunctionFragment;
        "namehash(string[])": FunctionFragment;
        "nonceOf(uint256)": FunctionFragment;
        "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
        "ownerOf(uint256)": FunctionFragment;
        "reconfigure(string[],string[],uint256)": FunctionFragment;
        "removeReverse()": FunctionFragment;
        "reset(uint256)": FunctionFragment;
        "resolverOf(uint256)": FunctionFragment;
        "reverseNameOf(address)": FunctionFragment;
        "reverseOf(address)": FunctionFragment;
        "root()": FunctionFragment;
        "safeTransferFrom(address,address,uint256)": FunctionFragment;
        "safeTransferFrom(address,address,uint256,bytes)": FunctionFragment;
        "set(string,string,uint256)": FunctionFragment;
        "setApprovalForAll(address,bool)": FunctionFragment;
        "setByHash(uint256,string,uint256)": FunctionFragment;
        "setMany(string[],string[],uint256)": FunctionFragment;
        "setManyByHash(uint256[],string[],uint256)": FunctionFragment;
        "setOwner(address,uint256)": FunctionFragment;
        "setReverse(string[])": FunctionFragment;
        "setTokenURIPrefix(string)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "symbol()": FunctionFragment;
        "tokenURI(uint256)": FunctionFragment;
        "transferFrom(address,address,uint256)": FunctionFragment;
        "unlockWithRecords(address,string[],string[],string[],bool)": FunctionFragment;
        "verify((address,uint256,uint256,bytes),bytes)": FunctionFragment;
        "withdrawFromPolygon(bytes,uint256,string[],string[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "BATCH_LIMIT" | "NAME" | "VERSION" | "addKey" | "addProxyReader" | "approve" | "balanceOf" | "burn" | "deposit" | "depositToPolygon" | "execute" | "exists" | "get" | "getApproved" | "getByHash" | "getKey" | "getKeys" | "getMany" | "getManyByHash" | "initialize" | "isApprovedForAll" | "isApprovedOrOwner" | "isTrustedForwarder" | "mint(address,uint256)" | "mint(address,uint256,bytes)" | "mintTLD" | "mintWithRecords" | "name" | "namehash" | "nonceOf" | "onERC721Received" | "ownerOf" | "reconfigure" | "removeReverse" | "reset" | "resolverOf" | "reverseNameOf" | "reverseOf" | "root" | "safeTransferFrom(address,address,uint256)" | "safeTransferFrom(address,address,uint256,bytes)" | "set" | "setApprovalForAll" | "setByHash" | "setMany" | "setManyByHash" | "setOwner" | "setReverse" | "setTokenURIPrefix" | "supportsInterface" | "symbol" | "tokenURI" | "transferFrom" | "unlockWithRecords" | "verify" | "withdrawFromPolygon"): FunctionFragment;
    encodeFunctionData(functionFragment: "BATCH_LIMIT", values?: undefined): string;
    encodeFunctionData(functionFragment: "NAME", values?: undefined): string;
    encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "addKey", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "addProxyReader", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "approve", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "burn", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "deposit", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "depositToPolygon", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "execute", values: [IForwarder.ForwardRequestStruct, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "exists", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "get", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getApproved", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getByHash", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getKey", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getKeys", values: [PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "getMany", values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getManyByHash", values: [PromiseOrValue<BigNumberish>[], PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "initialize", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isApprovedOrOwner", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "isTrustedForwarder", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "mint(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "mint(address,uint256,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "mintTLD", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "mintWithRecords", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "namehash", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "onERC721Received", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "reconfigure", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "removeReverse", values?: undefined): string;
    encodeFunctionData(functionFragment: "reset", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "resolverOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "reverseNameOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "reverseOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "root", values?: undefined): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "set", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setByHash", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "setMany", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "setManyByHash", values: [
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "setOwner", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setReverse", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "setTokenURIPrefix", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "unlockWithRecords", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "verify", values: [IForwarder.ForwardRequestStruct, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "withdrawFromPolygon", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[]
    ]): string;
    decodeFunctionResult(functionFragment: "BATCH_LIMIT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "NAME", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addProxyReader", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositToPolygon", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exists", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getApproved", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getKeys", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getManyByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedOrOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTrustedForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint(address,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintTLD", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintWithRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "namehash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC721Received", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reconfigure", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeReverse", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resolverOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reverseNameOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reverseOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "root", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "set", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setManyByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setReverse", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTokenURIPrefix", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unlockWithRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawFromPolygon", data: BytesLike): Result;
    events: {
        "AdminChanged(address,address)": EventFragment;
        "Approval(address,address,uint256)": EventFragment;
        "ApprovalForAll(address,address,bool)": EventFragment;
        "Initialized(uint8)": EventFragment;
        "NewKey(uint256,string,string)": EventFragment;
        "NewURI(uint256,string)": EventFragment;
        "NewURIPrefix(string)": EventFragment;
        "RemoveReverse(address)": EventFragment;
        "ResetRecords(uint256)": EventFragment;
        "Set(uint256,string,string,string,string)": EventFragment;
        "SetReverse(address,uint256)": EventFragment;
        "Transfer(address,address,uint256)": EventFragment;
        "Upgraded(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NewKey"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NewURI"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NewURIPrefix"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RemoveReverse"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ResetRecords"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Set"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetReverse"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
}
export interface AdminChangedEventObject {
    previousAdmin: string;
    newAdmin: string;
}
export declare type AdminChangedEvent = TypedEvent<[
    string,
    string
], AdminChangedEventObject>;
export declare type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;
export interface ApprovalEventObject {
    owner: string;
    approved: string;
    tokenId: BigNumber;
}
export declare type ApprovalEvent = TypedEvent<[
    string,
    string,
    BigNumber
], ApprovalEventObject>;
export declare type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
export interface ApprovalForAllEventObject {
    owner: string;
    operator: string;
    approved: boolean;
}
export declare type ApprovalForAllEvent = TypedEvent<[
    string,
    string,
    boolean
], ApprovalForAllEventObject>;
export declare type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;
export interface InitializedEventObject {
    version: number;
}
export declare type InitializedEvent = TypedEvent<[number], InitializedEventObject>;
export declare type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface NewKeyEventObject {
    tokenId: BigNumber;
    keyIndex: string;
    key: string;
}
export declare type NewKeyEvent = TypedEvent<[
    BigNumber,
    string,
    string
], NewKeyEventObject>;
export declare type NewKeyEventFilter = TypedEventFilter<NewKeyEvent>;
export interface NewURIEventObject {
    tokenId: BigNumber;
    uri: string;
}
export declare type NewURIEvent = TypedEvent<[BigNumber, string], NewURIEventObject>;
export declare type NewURIEventFilter = TypedEventFilter<NewURIEvent>;
export interface NewURIPrefixEventObject {
    prefix: string;
}
export declare type NewURIPrefixEvent = TypedEvent<[string], NewURIPrefixEventObject>;
export declare type NewURIPrefixEventFilter = TypedEventFilter<NewURIPrefixEvent>;
export interface RemoveReverseEventObject {
    addr: string;
}
export declare type RemoveReverseEvent = TypedEvent<[string], RemoveReverseEventObject>;
export declare type RemoveReverseEventFilter = TypedEventFilter<RemoveReverseEvent>;
export interface ResetRecordsEventObject {
    tokenId: BigNumber;
}
export declare type ResetRecordsEvent = TypedEvent<[
    BigNumber
], ResetRecordsEventObject>;
export declare type ResetRecordsEventFilter = TypedEventFilter<ResetRecordsEvent>;
export interface SetEventObject {
    tokenId: BigNumber;
    keyIndex: string;
    valueIndex: string;
    key: string;
    value: string;
}
export declare type SetEvent = TypedEvent<[
    BigNumber,
    string,
    string,
    string,
    string
], SetEventObject>;
export declare type SetEventFilter = TypedEventFilter<SetEvent>;
export interface SetReverseEventObject {
    addr: string;
    tokenId: BigNumber;
}
export declare type SetReverseEvent = TypedEvent<[
    string,
    BigNumber
], SetReverseEventObject>;
export declare type SetReverseEventFilter = TypedEventFilter<SetReverseEvent>;
export interface TransferEventObject {
    from: string;
    to: string;
    tokenId: BigNumber;
}
export declare type TransferEvent = TypedEvent<[
    string,
    string,
    BigNumber
], TransferEventObject>;
export declare type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface UpgradedEventObject {
    implementation: string;
}
export declare type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;
export declare type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;
export interface UNSRegistry extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: UNSRegistryInterface;
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
        BATCH_LIMIT(overrides?: CallOverrides): Promise<[BigNumber]>;
        NAME(overrides?: CallOverrides): Promise<[string]>;
        VERSION(overrides?: CallOverrides): Promise<[string]>;
        addKey(key: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        addProxyReader(addr: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        burn(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        deposit(user: PromiseOrValue<string>, depositData: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        depositToPolygon(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        exists(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string] & {
            value: string;
        }>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string] & {
            key: string;
            value: string;
        }>;
        getKey(keyHash: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        getKeys(hashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[string[]] & {
            values: string[];
        }>;
        getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string[]] & {
            values: string[];
        }>;
        getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string[], string[]] & {
            keys: string[];
            values: string[];
        }>;
        initialize(mintingManager: PromiseOrValue<string>, cnsRegistry: PromiseOrValue<string>, rootChainManager: PromiseOrValue<string>, childChainManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isApprovedOrOwner(spender: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "mint(address,uint256)"(user: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "mint(address,uint256,bytes)"(user: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        mintTLD(tokenId: PromiseOrValue<BigNumberish>, uri: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        mintWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        name(overrides?: CallOverrides): Promise<[string]>;
        namehash(labels: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<[BigNumber]>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        onERC721Received(arg0: PromiseOrValue<string>, from: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        reconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeReverse(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        reset(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        resolverOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        reverseNameOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string] & {
            reverseUri: string;
        }>;
        reverseOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber] & {
            reverse: BigNumber;
        }>;
        root(overrides?: CallOverrides): Promise<[BigNumber]>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        set(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setByHash(keyHash: PromiseOrValue<BigNumberish>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setOwner(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setReverse(labels: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        symbol(overrides?: CallOverrides): Promise<[string]>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        unlockWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        withdrawFromPolygon(inputData: PromiseOrValue<BytesLike>, tokenId: PromiseOrValue<BigNumberish>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    BATCH_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;
    NAME(overrides?: CallOverrides): Promise<string>;
    VERSION(overrides?: CallOverrides): Promise<string>;
    addKey(key: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addProxyReader(addr: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    burn(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    deposit(user: PromiseOrValue<string>, depositData: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    depositToPolygon(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    exists(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string] & {
        key: string;
        value: string;
    }>;
    getKey(keyHash: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    getKeys(hashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<string[]>;
    getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string[]>;
    getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string[], string[]] & {
        keys: string[];
        values: string[];
    }>;
    initialize(mintingManager: PromiseOrValue<string>, cnsRegistry: PromiseOrValue<string>, rootChainManager: PromiseOrValue<string>, childChainManager: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isApprovedOrOwner(spender: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "mint(address,uint256)"(user: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "mint(address,uint256,bytes)"(user: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    mintTLD(tokenId: PromiseOrValue<BigNumberish>, uri: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    mintWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<string>;
    namehash(labels: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<BigNumber>;
    nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    onERC721Received(arg0: PromiseOrValue<string>, from: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    reconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeReverse(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    reset(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    resolverOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    reverseNameOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    reverseOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    root(overrides?: CallOverrides): Promise<BigNumber>;
    "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    set(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setByHash(keyHash: PromiseOrValue<BigNumberish>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setOwner(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setReverse(labels: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    symbol(overrides?: CallOverrides): Promise<string>;
    tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    unlockWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    withdrawFromPolygon(inputData: PromiseOrValue<BytesLike>, tokenId: PromiseOrValue<BigNumberish>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        BATCH_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;
        NAME(overrides?: CallOverrides): Promise<string>;
        VERSION(overrides?: CallOverrides): Promise<string>;
        addKey(key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        addProxyReader(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        burn(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        deposit(user: PromiseOrValue<string>, depositData: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        depositToPolygon(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        exists(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string] & {
            key: string;
            value: string;
        }>;
        getKey(keyHash: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getKeys(hashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<string[]>;
        getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string[]>;
        getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string[], string[]] & {
            keys: string[];
            values: string[];
        }>;
        initialize(mintingManager: PromiseOrValue<string>, cnsRegistry: PromiseOrValue<string>, rootChainManager: PromiseOrValue<string>, childChainManager: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isApprovedOrOwner(spender: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "mint(address,uint256)"(user: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "mint(address,uint256,bytes)"(user: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        mintTLD(tokenId: PromiseOrValue<BigNumberish>, uri: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        mintWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        name(overrides?: CallOverrides): Promise<string>;
        namehash(labels: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<BigNumber>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        onERC721Received(arg0: PromiseOrValue<string>, from: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        reconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        removeReverse(overrides?: CallOverrides): Promise<void>;
        reset(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        resolverOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        reverseNameOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        reverseOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        root(overrides?: CallOverrides): Promise<BigNumber>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        set(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        setByHash(keyHash: PromiseOrValue<BigNumberish>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setOwner(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setReverse(labels: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        symbol(overrides?: CallOverrides): Promise<string>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        unlockWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        withdrawFromPolygon(inputData: PromiseOrValue<BytesLike>, tokenId: PromiseOrValue<BigNumberish>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "AdminChanged(address,address)"(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
        AdminChanged(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
        "Approval(address,address,uint256)"(owner?: PromiseOrValue<string> | null, approved?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): ApprovalEventFilter;
        Approval(owner?: PromiseOrValue<string> | null, approved?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): ApprovalEventFilter;
        "ApprovalForAll(address,address,bool)"(owner?: PromiseOrValue<string> | null, operator?: PromiseOrValue<string> | null, approved?: null): ApprovalForAllEventFilter;
        ApprovalForAll(owner?: PromiseOrValue<string> | null, operator?: PromiseOrValue<string> | null, approved?: null): ApprovalForAllEventFilter;
        "Initialized(uint8)"(version?: null): InitializedEventFilter;
        Initialized(version?: null): InitializedEventFilter;
        "NewKey(uint256,string,string)"(tokenId?: PromiseOrValue<BigNumberish> | null, keyIndex?: PromiseOrValue<string> | null, key?: null): NewKeyEventFilter;
        NewKey(tokenId?: PromiseOrValue<BigNumberish> | null, keyIndex?: PromiseOrValue<string> | null, key?: null): NewKeyEventFilter;
        "NewURI(uint256,string)"(tokenId?: PromiseOrValue<BigNumberish> | null, uri?: null): NewURIEventFilter;
        NewURI(tokenId?: PromiseOrValue<BigNumberish> | null, uri?: null): NewURIEventFilter;
        "NewURIPrefix(string)"(prefix?: null): NewURIPrefixEventFilter;
        NewURIPrefix(prefix?: null): NewURIPrefixEventFilter;
        "RemoveReverse(address)"(addr?: PromiseOrValue<string> | null): RemoveReverseEventFilter;
        RemoveReverse(addr?: PromiseOrValue<string> | null): RemoveReverseEventFilter;
        "ResetRecords(uint256)"(tokenId?: PromiseOrValue<BigNumberish> | null): ResetRecordsEventFilter;
        ResetRecords(tokenId?: PromiseOrValue<BigNumberish> | null): ResetRecordsEventFilter;
        "Set(uint256,string,string,string,string)"(tokenId?: PromiseOrValue<BigNumberish> | null, keyIndex?: PromiseOrValue<string> | null, valueIndex?: PromiseOrValue<string> | null, key?: null, value?: null): SetEventFilter;
        Set(tokenId?: PromiseOrValue<BigNumberish> | null, keyIndex?: PromiseOrValue<string> | null, valueIndex?: PromiseOrValue<string> | null, key?: null, value?: null): SetEventFilter;
        "SetReverse(address,uint256)"(addr?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): SetReverseEventFilter;
        SetReverse(addr?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): SetReverseEventFilter;
        "Transfer(address,address,uint256)"(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): TransferEventFilter;
        Transfer(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): TransferEventFilter;
        "Upgraded(address)"(implementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
        Upgraded(implementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
    };
    estimateGas: {
        BATCH_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;
        NAME(overrides?: CallOverrides): Promise<BigNumber>;
        VERSION(overrides?: CallOverrides): Promise<BigNumber>;
        addKey(key: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addProxyReader(addr: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        burn(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        deposit(user: PromiseOrValue<string>, depositData: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        depositToPolygon(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        exists(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getKey(keyHash: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getKeys(hashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        initialize(mintingManager: PromiseOrValue<string>, cnsRegistry: PromiseOrValue<string>, rootChainManager: PromiseOrValue<string>, childChainManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isApprovedOrOwner(spender: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "mint(address,uint256)"(user: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "mint(address,uint256,bytes)"(user: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        mintTLD(tokenId: PromiseOrValue<BigNumberish>, uri: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        mintWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        namehash(labels: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<BigNumber>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        onERC721Received(arg0: PromiseOrValue<string>, from: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        reconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeReverse(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        reset(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        resolverOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        reverseNameOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        reverseOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        root(overrides?: CallOverrides): Promise<BigNumber>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        set(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setByHash(keyHash: PromiseOrValue<BigNumberish>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setOwner(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setReverse(labels: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<BigNumber>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        unlockWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        withdrawFromPolygon(inputData: PromiseOrValue<BytesLike>, tokenId: PromiseOrValue<BigNumberish>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        BATCH_LIMIT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        NAME(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        addKey(key: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addProxyReader(addr: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        burn(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        deposit(user: PromiseOrValue<string>, depositData: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        depositToPolygon(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        exists(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        get(key: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getByHash(keyHash: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getKey(keyHash: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getKeys(hashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getMany(keys: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(mintingManager: PromiseOrValue<string>, cnsRegistry: PromiseOrValue<string>, rootChainManager: PromiseOrValue<string>, childChainManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isApprovedOrOwner(spender: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "mint(address,uint256)"(user: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "mint(address,uint256,bytes)"(user: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        mintTLD(tokenId: PromiseOrValue<BigNumberish>, uri: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        mintWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        namehash(labels: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        onERC721Received(arg0: PromiseOrValue<string>, from: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        reconfigure(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeReverse(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        reset(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        resolverOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        reverseNameOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        reverseOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        root(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        set(key: PromiseOrValue<string>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setByHash(keyHash: PromiseOrValue<BigNumberish>, value: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setMany(keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setManyByHash(keyHashes: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<string>[], tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setOwner(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setReverse(labels: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        unlockWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        withdrawFromPolygon(inputData: PromiseOrValue<BytesLike>, tokenId: PromiseOrValue<BigNumberish>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=UNSRegistry.d.ts.map