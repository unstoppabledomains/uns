import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
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
export interface UNSRegistryInterface extends Interface {
    getFunction(nameOrSignature: "BATCH_LIMIT" | "NAME" | "VERSION" | "addKey" | "addProxyReader" | "approve" | "balanceOf" | "burn" | "deposit" | "depositToPolygon" | "execute" | "exists" | "expiryOf" | "get" | "getApproved" | "getByHash" | "getKey" | "getKeys" | "getMany" | "getManyByHash" | "initialize" | "isApprovedForAll" | "isApprovedOrOwner" | "isExpired" | "isTrustedForwarder" | "mint(address,uint256)" | "mint(address,uint256,bytes)" | "mintTLD" | "mintWithRecords" | "multicall" | "name" | "namehash" | "nonceOf" | "onERC721Received" | "ownerOf" | "reconfigure" | "removeReverse" | "reset" | "resolverOf" | "reverseNameOf" | "reverseOf" | "root" | "safeTransferFrom(address,address,uint256)" | "safeTransferFrom(address,address,uint256,bytes)" | "set" | "setApprovalForAll" | "setByHash" | "setExpiry" | "setMany" | "setManyByHash" | "setOwner" | "setReverse" | "setTokenURIPrefix" | "supportsInterface" | "symbol" | "tokenURI" | "transferFrom" | "unlock" | "unlockWithRecords" | "verify" | "withdrawFromPolygon"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AdminChanged" | "Approval" | "ApprovalForAll" | "Initialized" | "NewKey" | "NewURI" | "NewURIPrefix" | "RemoveReverse" | "ResetRecords" | "Set" | "SetExpiry" | "SetReverse" | "Transfer" | "Upgraded"): EventFragment;
    encodeFunctionData(functionFragment: "BATCH_LIMIT", values?: undefined): string;
    encodeFunctionData(functionFragment: "NAME", values?: undefined): string;
    encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "addKey", values: [string]): string;
    encodeFunctionData(functionFragment: "addProxyReader", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "approve", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "deposit", values: [AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "depositToPolygon", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "execute", values: [IForwarder.ForwardRequestStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "exists", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "expiryOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "get", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getApproved", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getByHash", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getKey", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getKeys", values: [BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "getMany", values: [string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "getManyByHash", values: [BigNumberish[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike, AddressLike, AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "isApprovedOrOwner", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "isExpired", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "isTrustedForwarder", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "mint(address,uint256)", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "mint(address,uint256,bytes)", values: [AddressLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "mintTLD", values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "mintWithRecords", values: [AddressLike, string[], string[], string[], boolean]): string;
    encodeFunctionData(functionFragment: "multicall", values: [BytesLike[]]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "namehash", values: [string[]]): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "onERC721Received", values: [AddressLike, AddressLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "reconfigure", values: [string[], string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "removeReverse", values?: undefined): string;
    encodeFunctionData(functionFragment: "reset", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "resolverOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "reverseNameOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "reverseOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "root", values?: undefined): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256)", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", values: [AddressLike, AddressLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "set", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [AddressLike, boolean]): string;
    encodeFunctionData(functionFragment: "setByHash", values: [BigNumberish, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setExpiry", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setMany", values: [string[], string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "setManyByHash", values: [BigNumberish[], string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "setOwner", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setReverse", values: [string[]]): string;
    encodeFunctionData(functionFragment: "setTokenURIPrefix", values: [string]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "unlock", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "unlockWithRecords", values: [AddressLike, string[], string[], string[], boolean]): string;
    encodeFunctionData(functionFragment: "verify", values: [IForwarder.ForwardRequestStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "withdrawFromPolygon", values: [BytesLike, BigNumberish, string[], string[]]): string;
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
    decodeFunctionResult(functionFragment: "expiryOf", data: BytesLike): Result;
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
    decodeFunctionResult(functionFragment: "isExpired", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTrustedForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint(address,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintTLD", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintWithRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
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
    decodeFunctionResult(functionFragment: "setExpiry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setManyByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setReverse", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTokenURIPrefix", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unlock", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unlockWithRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawFromPolygon", data: BytesLike): Result;
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
export declare namespace ApprovalEvent {
    type InputTuple = [
        owner: AddressLike,
        approved: AddressLike,
        tokenId: BigNumberish
    ];
    type OutputTuple = [owner: string, approved: string, tokenId: bigint];
    interface OutputObject {
        owner: string;
        approved: string;
        tokenId: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ApprovalForAllEvent {
    type InputTuple = [
        owner: AddressLike,
        operator: AddressLike,
        approved: boolean
    ];
    type OutputTuple = [
        owner: string,
        operator: string,
        approved: boolean
    ];
    interface OutputObject {
        owner: string;
        operator: string;
        approved: boolean;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
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
export declare namespace NewKeyEvent {
    type InputTuple = [
        tokenId: BigNumberish,
        keyIndex: string,
        key: string
    ];
    type OutputTuple = [tokenId: bigint, keyIndex: string, key: string];
    interface OutputObject {
        tokenId: bigint;
        keyIndex: string;
        key: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NewURIEvent {
    type InputTuple = [tokenId: BigNumberish, uri: string];
    type OutputTuple = [tokenId: bigint, uri: string];
    interface OutputObject {
        tokenId: bigint;
        uri: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NewURIPrefixEvent {
    type InputTuple = [prefix: string];
    type OutputTuple = [prefix: string];
    interface OutputObject {
        prefix: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RemoveReverseEvent {
    type InputTuple = [addr: AddressLike];
    type OutputTuple = [addr: string];
    interface OutputObject {
        addr: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ResetRecordsEvent {
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
export declare namespace SetEvent {
    type InputTuple = [
        tokenId: BigNumberish,
        keyIndex: string,
        valueIndex: string,
        key: string,
        value: string
    ];
    type OutputTuple = [
        tokenId: bigint,
        keyIndex: string,
        valueIndex: string,
        key: string,
        value: string
    ];
    interface OutputObject {
        tokenId: bigint;
        keyIndex: string;
        valueIndex: string;
        key: string;
        value: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SetExpiryEvent {
    type InputTuple = [tokenId: BigNumberish, expiry: BigNumberish];
    type OutputTuple = [tokenId: bigint, expiry: bigint];
    interface OutputObject {
        tokenId: bigint;
        expiry: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SetReverseEvent {
    type InputTuple = [addr: AddressLike, tokenId: BigNumberish];
    type OutputTuple = [addr: string, tokenId: bigint];
    interface OutputObject {
        addr: string;
        tokenId: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TransferEvent {
    type InputTuple = [
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ];
    type OutputTuple = [from: string, to: string, tokenId: bigint];
    interface OutputObject {
        from: string;
        to: string;
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
export interface UNSRegistry extends BaseContract {
    connect(runner?: ContractRunner | null): UNSRegistry;
    waitForDeployment(): Promise<this>;
    interface: UNSRegistryInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    BATCH_LIMIT: TypedContractMethod<[], [bigint], "view">;
    NAME: TypedContractMethod<[], [string], "view">;
    VERSION: TypedContractMethod<[], [string], "view">;
    addKey: TypedContractMethod<[key: string], [void], "nonpayable">;
    addProxyReader: TypedContractMethod<[
        addr: AddressLike
    ], [
        void
    ], "nonpayable">;
    approve: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    balanceOf: TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    burn: TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    deposit: TypedContractMethod<[
        user: AddressLike,
        depositData: BytesLike
    ], [
        void
    ], "nonpayable">;
    depositToPolygon: TypedContractMethod<[
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    execute: TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        string
    ], "nonpayable">;
    exists: TypedContractMethod<[tokenId: BigNumberish], [boolean], "view">;
    expiryOf: TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    get: TypedContractMethod<[
        key: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getApproved: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getByHash: TypedContractMethod<[
        keyHash: BigNumberish,
        tokenId: BigNumberish
    ], [
        [string, string] & {
            key: string;
            value: string;
        }
    ], "view">;
    getKey: TypedContractMethod<[keyHash: BigNumberish], [string], "view">;
    getKeys: TypedContractMethod<[hashes: BigNumberish[]], [string[]], "view">;
    getMany: TypedContractMethod<[
        keys: string[],
        tokenId: BigNumberish
    ], [
        string[]
    ], "view">;
    getManyByHash: TypedContractMethod<[
        keyHashes: BigNumberish[],
        tokenId: BigNumberish
    ], [
        [string[], string[]] & {
            keys: string[];
            values: string[];
        }
    ], "view">;
    initialize: TypedContractMethod<[
        mintingManager: AddressLike,
        cnsRegistry: AddressLike,
        rootChainManager: AddressLike,
        childChainManager: AddressLike
    ], [
        void
    ], "nonpayable">;
    isApprovedForAll: TypedContractMethod<[
        owner: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], "view">;
    isApprovedOrOwner: TypedContractMethod<[
        spender: AddressLike,
        tokenId: BigNumberish
    ], [
        boolean
    ], "view">;
    isExpired: TypedContractMethod<[tokenId: BigNumberish], [boolean], "view">;
    isTrustedForwarder: TypedContractMethod<[
        forwarder: AddressLike
    ], [
        boolean
    ], "view">;
    "mint(address,uint256)": TypedContractMethod<[
        user: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    "mint(address,uint256,bytes)": TypedContractMethod<[
        user: AddressLike,
        tokenId: BigNumberish,
        arg2: BytesLike
    ], [
        void
    ], "nonpayable">;
    mintTLD: TypedContractMethod<[
        tokenId: BigNumberish,
        uri: string
    ], [
        void
    ], "nonpayable">;
    mintWithRecords: TypedContractMethod<[
        to: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        withReverse: boolean
    ], [
        void
    ], "nonpayable">;
    multicall: TypedContractMethod<[data: BytesLike[]], [string[]], "nonpayable">;
    name: TypedContractMethod<[], [string], "view">;
    namehash: TypedContractMethod<[labels: string[]], [bigint], "view">;
    nonceOf: TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    onERC721Received: TypedContractMethod<[
        arg0: AddressLike,
        from: AddressLike,
        tokenId: BigNumberish,
        data: BytesLike
    ], [
        string
    ], "nonpayable">;
    ownerOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    reconfigure: TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    removeReverse: TypedContractMethod<[], [void], "nonpayable">;
    reset: TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    resolverOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    reverseNameOf: TypedContractMethod<[addr: AddressLike], [string], "view">;
    reverseOf: TypedContractMethod<[addr: AddressLike], [bigint], "view">;
    root: TypedContractMethod<[], [bigint], "view">;
    "safeTransferFrom(address,address,uint256)": TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    "safeTransferFrom(address,address,uint256,bytes)": TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    set: TypedContractMethod<[
        key: string,
        value: string,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setApprovalForAll: TypedContractMethod<[
        operator: AddressLike,
        approved: boolean
    ], [
        void
    ], "nonpayable">;
    setByHash: TypedContractMethod<[
        keyHash: BigNumberish,
        value: string,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setExpiry: TypedContractMethod<[
        expiry: BigNumberish,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setMany: TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setManyByHash: TypedContractMethod<[
        keyHashes: BigNumberish[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setOwner: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setReverse: TypedContractMethod<[labels: string[]], [void], "nonpayable">;
    setTokenURIPrefix: TypedContractMethod<[
        prefix: string
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    symbol: TypedContractMethod<[], [string], "view">;
    tokenURI: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    transferFrom: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    unlock: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    unlockWithRecords: TypedContractMethod<[
        to: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        withReverse: boolean
    ], [
        void
    ], "nonpayable">;
    verify: TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        boolean
    ], "view">;
    withdrawFromPolygon: TypedContractMethod<[
        inputData: BytesLike,
        tokenId: BigNumberish,
        keys: string[],
        values: string[]
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "BATCH_LIMIT"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "NAME"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "VERSION"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "addKey"): TypedContractMethod<[key: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "addProxyReader"): TypedContractMethod<[addr: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "approve"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "burn"): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "deposit"): TypedContractMethod<[
        user: AddressLike,
        depositData: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "depositToPolygon"): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "execute"): TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "exists"): TypedContractMethod<[tokenId: BigNumberish], [boolean], "view">;
    getFunction(nameOrSignature: "expiryOf"): TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "get"): TypedContractMethod<[
        key: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "getApproved"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "getByHash"): TypedContractMethod<[
        keyHash: BigNumberish,
        tokenId: BigNumberish
    ], [
        [string, string] & {
            key: string;
            value: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "getKey"): TypedContractMethod<[keyHash: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "getKeys"): TypedContractMethod<[hashes: BigNumberish[]], [string[]], "view">;
    getFunction(nameOrSignature: "getMany"): TypedContractMethod<[
        keys: string[],
        tokenId: BigNumberish
    ], [
        string[]
    ], "view">;
    getFunction(nameOrSignature: "getManyByHash"): TypedContractMethod<[
        keyHashes: BigNumberish[],
        tokenId: BigNumberish
    ], [
        [string[], string[]] & {
            keys: string[];
            values: string[];
        }
    ], "view">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
        mintingManager: AddressLike,
        cnsRegistry: AddressLike,
        rootChainManager: AddressLike,
        childChainManager: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "isApprovedForAll"): TypedContractMethod<[
        owner: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "isApprovedOrOwner"): TypedContractMethod<[
        spender: AddressLike,
        tokenId: BigNumberish
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "isExpired"): TypedContractMethod<[tokenId: BigNumberish], [boolean], "view">;
    getFunction(nameOrSignature: "isTrustedForwarder"): TypedContractMethod<[forwarder: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "mint(address,uint256)"): TypedContractMethod<[
        user: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "mint(address,uint256,bytes)"): TypedContractMethod<[
        user: AddressLike,
        tokenId: BigNumberish,
        arg2: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "mintTLD"): TypedContractMethod<[
        tokenId: BigNumberish,
        uri: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "mintWithRecords"): TypedContractMethod<[
        to: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        withReverse: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "multicall"): TypedContractMethod<[data: BytesLike[]], [string[]], "nonpayable">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "namehash"): TypedContractMethod<[labels: string[]], [bigint], "view">;
    getFunction(nameOrSignature: "nonceOf"): TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "onERC721Received"): TypedContractMethod<[
        arg0: AddressLike,
        from: AddressLike,
        tokenId: BigNumberish,
        data: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "ownerOf"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "reconfigure"): TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "removeReverse"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "reset"): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "resolverOf"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "reverseNameOf"): TypedContractMethod<[addr: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "reverseOf"): TypedContractMethod<[addr: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "root"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "safeTransferFrom(address,address,uint256)"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeTransferFrom(address,address,uint256,bytes)"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "set"): TypedContractMethod<[
        key: string,
        value: string,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setApprovalForAll"): TypedContractMethod<[
        operator: AddressLike,
        approved: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setByHash"): TypedContractMethod<[
        keyHash: BigNumberish,
        value: string,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setExpiry"): TypedContractMethod<[
        expiry: BigNumberish,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setMany"): TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setManyByHash"): TypedContractMethod<[
        keyHashes: BigNumberish[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setOwner"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setReverse"): TypedContractMethod<[labels: string[]], [void], "nonpayable">;
    getFunction(nameOrSignature: "setTokenURIPrefix"): TypedContractMethod<[prefix: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "symbol"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "tokenURI"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "unlock"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "unlockWithRecords"): TypedContractMethod<[
        to: AddressLike,
        labels: string[],
        keys: string[],
        values: string[],
        withReverse: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "verify"): TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "withdrawFromPolygon"): TypedContractMethod<[
        inputData: BytesLike,
        tokenId: BigNumberish,
        keys: string[],
        values: string[]
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "AdminChanged"): TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
    getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
    getEvent(key: "ApprovalForAll"): TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "NewKey"): TypedContractEvent<NewKeyEvent.InputTuple, NewKeyEvent.OutputTuple, NewKeyEvent.OutputObject>;
    getEvent(key: "NewURI"): TypedContractEvent<NewURIEvent.InputTuple, NewURIEvent.OutputTuple, NewURIEvent.OutputObject>;
    getEvent(key: "NewURIPrefix"): TypedContractEvent<NewURIPrefixEvent.InputTuple, NewURIPrefixEvent.OutputTuple, NewURIPrefixEvent.OutputObject>;
    getEvent(key: "RemoveReverse"): TypedContractEvent<RemoveReverseEvent.InputTuple, RemoveReverseEvent.OutputTuple, RemoveReverseEvent.OutputObject>;
    getEvent(key: "ResetRecords"): TypedContractEvent<ResetRecordsEvent.InputTuple, ResetRecordsEvent.OutputTuple, ResetRecordsEvent.OutputObject>;
    getEvent(key: "Set"): TypedContractEvent<SetEvent.InputTuple, SetEvent.OutputTuple, SetEvent.OutputObject>;
    getEvent(key: "SetExpiry"): TypedContractEvent<SetExpiryEvent.InputTuple, SetExpiryEvent.OutputTuple, SetExpiryEvent.OutputObject>;
    getEvent(key: "SetReverse"): TypedContractEvent<SetReverseEvent.InputTuple, SetReverseEvent.OutputTuple, SetReverseEvent.OutputObject>;
    getEvent(key: "Transfer"): TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    getEvent(key: "Upgraded"): TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
    filters: {
        "AdminChanged(address,address)": TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
        AdminChanged: TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
        "Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        Approval: TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        "ApprovalForAll(address,address,bool)": TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        ApprovalForAll: TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        "Initialized(uint8)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "NewKey(uint256,string,string)": TypedContractEvent<NewKeyEvent.InputTuple, NewKeyEvent.OutputTuple, NewKeyEvent.OutputObject>;
        NewKey: TypedContractEvent<NewKeyEvent.InputTuple, NewKeyEvent.OutputTuple, NewKeyEvent.OutputObject>;
        "NewURI(uint256,string)": TypedContractEvent<NewURIEvent.InputTuple, NewURIEvent.OutputTuple, NewURIEvent.OutputObject>;
        NewURI: TypedContractEvent<NewURIEvent.InputTuple, NewURIEvent.OutputTuple, NewURIEvent.OutputObject>;
        "NewURIPrefix(string)": TypedContractEvent<NewURIPrefixEvent.InputTuple, NewURIPrefixEvent.OutputTuple, NewURIPrefixEvent.OutputObject>;
        NewURIPrefix: TypedContractEvent<NewURIPrefixEvent.InputTuple, NewURIPrefixEvent.OutputTuple, NewURIPrefixEvent.OutputObject>;
        "RemoveReverse(address)": TypedContractEvent<RemoveReverseEvent.InputTuple, RemoveReverseEvent.OutputTuple, RemoveReverseEvent.OutputObject>;
        RemoveReverse: TypedContractEvent<RemoveReverseEvent.InputTuple, RemoveReverseEvent.OutputTuple, RemoveReverseEvent.OutputObject>;
        "ResetRecords(uint256)": TypedContractEvent<ResetRecordsEvent.InputTuple, ResetRecordsEvent.OutputTuple, ResetRecordsEvent.OutputObject>;
        ResetRecords: TypedContractEvent<ResetRecordsEvent.InputTuple, ResetRecordsEvent.OutputTuple, ResetRecordsEvent.OutputObject>;
        "Set(uint256,string,string,string,string)": TypedContractEvent<SetEvent.InputTuple, SetEvent.OutputTuple, SetEvent.OutputObject>;
        Set: TypedContractEvent<SetEvent.InputTuple, SetEvent.OutputTuple, SetEvent.OutputObject>;
        "SetExpiry(uint256,uint64)": TypedContractEvent<SetExpiryEvent.InputTuple, SetExpiryEvent.OutputTuple, SetExpiryEvent.OutputObject>;
        SetExpiry: TypedContractEvent<SetExpiryEvent.InputTuple, SetExpiryEvent.OutputTuple, SetExpiryEvent.OutputObject>;
        "SetReverse(address,uint256)": TypedContractEvent<SetReverseEvent.InputTuple, SetReverseEvent.OutputTuple, SetReverseEvent.OutputObject>;
        SetReverse: TypedContractEvent<SetReverseEvent.InputTuple, SetReverseEvent.OutputTuple, SetReverseEvent.OutputObject>;
        "Transfer(address,address,uint256)": TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
        Transfer: TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
        "Upgraded(address)": TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
        Upgraded: TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
    };
}
//# sourceMappingURL=UNSRegistry.d.ts.map