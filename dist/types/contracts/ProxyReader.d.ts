import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export interface ProxyReaderInterface extends Interface {
    getFunction(nameOrSignature: "NAME" | "VERSION" | "addBlockchainNetworks(string[],string[])" | "addBlockchainNetworks(string[],string)" | "addLegacyRecords" | "balanceOf" | "exists" | "get" | "getAddress" | "getAddressKey" | "getAddressKeys" | "getApproved" | "getByHash" | "getData" | "getDataByHash" | "getDataByHashForMany" | "getDataForMany" | "getMany" | "getManyByHash" | "initialize" | "isApprovedForAll" | "isApprovedOrOwner" | "multicall" | "namehash" | "owner" | "ownerOf" | "ownerOfForMany" | "registryOf" | "renounceOwnership" | "resolverOf" | "reverseNameOf" | "reverseOf" | "setOwner" | "supportsInterface" | "tokenURI" | "transferOwnership"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized" | "OwnershipTransferred" | "SetLegacyRecords" | "SetNetworkFamily"): EventFragment;
    encodeFunctionData(functionFragment: "NAME", values?: undefined): string;
    encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "addBlockchainNetworks(string[],string[])", values: [string[], string[]]): string;
    encodeFunctionData(functionFragment: "addBlockchainNetworks(string[],string)", values: [string[], string]): string;
    encodeFunctionData(functionFragment: "addLegacyRecords", values: [string[], string[][]]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "exists", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "get", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getAddress", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getAddressKey", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getAddressKeys", values: [string, string]): string;
    encodeFunctionData(functionFragment: "getApproved", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getByHash", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getData", values: [string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "getDataByHash", values: [BigNumberish[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "getDataByHashForMany", values: [BigNumberish[], BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "getDataForMany", values: [string[], BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "getMany", values: [string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "getManyByHash", values: [BigNumberish[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "isApprovedOrOwner", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "multicall", values: [BytesLike[]]): string;
    encodeFunctionData(functionFragment: "namehash", values: [string[]]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "ownerOfForMany", values: [BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "registryOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "resolverOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "reverseNameOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "reverseOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setOwner", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "NAME", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addBlockchainNetworks(string[],string[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addBlockchainNetworks(string[],string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addLegacyRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exists", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAddressKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAddressKeys", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getApproved", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDataByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDataByHashForMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDataForMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getManyByHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedOrOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "namehash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOfForMany", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registryOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resolverOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reverseNameOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reverseOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
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
export declare namespace OwnershipTransferredEvent {
    type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
    type OutputTuple = [previousOwner: string, newOwner: string];
    interface OutputObject {
        previousOwner: string;
        newOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SetLegacyRecordsEvent {
    type InputTuple = [tokenKey: string];
    type OutputTuple = [tokenKey: string];
    interface OutputObject {
        tokenKey: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SetNetworkFamilyEvent {
    type InputTuple = [network: string];
    type OutputTuple = [network: string];
    interface OutputObject {
        network: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface ProxyReader extends BaseContract {
    connect(runner?: ContractRunner | null): ProxyReader;
    waitForDeployment(): Promise<this>;
    interface: ProxyReaderInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    NAME: TypedContractMethod<[], [string], "view">;
    VERSION: TypedContractMethod<[], [string], "view">;
    "addBlockchainNetworks(string[],string[])": TypedContractMethod<[
        networks: string[],
        families: string[]
    ], [
        void
    ], "nonpayable">;
    "addBlockchainNetworks(string[],string)": TypedContractMethod<[
        networks: string[],
        family: string
    ], [
        void
    ], "nonpayable">;
    addLegacyRecords: TypedContractMethod<[
        keys: string[],
        legacyKeys: string[][]
    ], [
        void
    ], "nonpayable">;
    balanceOf: TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    exists: TypedContractMethod<[tokenId: BigNumberish], [boolean], "view">;
    get: TypedContractMethod<[
        key: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getAddress: TypedContractMethod<[
        network: string,
        token: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getAddressKey: TypedContractMethod<[
        network: string,
        token: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getAddressKeys: TypedContractMethod<[
        network: string,
        token: string
    ], [
        string[]
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
    getData: TypedContractMethod<[
        keys: string[],
        tokenId: BigNumberish
    ], [
        [
            string,
            string,
            string[]
        ] & {
            resolver: string;
            owner: string;
            values: string[];
        }
    ], "view">;
    getDataByHash: TypedContractMethod<[
        keyHashes: BigNumberish[],
        tokenId: BigNumberish
    ], [
        [
            string,
            string,
            string[],
            string[]
        ] & {
            resolver: string;
            owner: string;
            keys: string[];
            values: string[];
        }
    ], "view">;
    getDataByHashForMany: TypedContractMethod<[
        keyHashes: BigNumberish[],
        tokenIds: BigNumberish[]
    ], [
        [
            string[],
            string[],
            string[][],
            string[][]
        ] & {
            resolvers: string[];
            owners: string[];
            keys: string[][];
            values: string[][];
        }
    ], "view">;
    getDataForMany: TypedContractMethod<[
        keys: string[],
        tokenIds: BigNumberish[]
    ], [
        [
            string[],
            string[],
            string[][]
        ] & {
            resolvers: string[];
            owners: string[];
            values: string[][];
        }
    ], "view">;
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
        unsRegistry: AddressLike,
        cnsRegistry: AddressLike
    ], [
        void
    ], "nonpayable">;
    isApprovedForAll: TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike
    ], [
        boolean
    ], "view">;
    isApprovedOrOwner: TypedContractMethod<[
        spender: AddressLike,
        tokenId: BigNumberish
    ], [
        boolean
    ], "view">;
    multicall: TypedContractMethod<[data: BytesLike[]], [string[]], "nonpayable">;
    namehash: TypedContractMethod<[labels: string[]], [bigint], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    ownerOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    ownerOfForMany: TypedContractMethod<[
        tokenIds: BigNumberish[]
    ], [
        string[]
    ], "view">;
    registryOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    resolverOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    reverseNameOf: TypedContractMethod<[addr: AddressLike], [string], "view">;
    reverseOf: TypedContractMethod<[addr: AddressLike], [bigint], "view">;
    setOwner: TypedContractMethod<[addr: AddressLike], [void], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    tokenURI: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "NAME"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "VERSION"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "addBlockchainNetworks(string[],string[])"): TypedContractMethod<[
        networks: string[],
        families: string[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "addBlockchainNetworks(string[],string)"): TypedContractMethod<[
        networks: string[],
        family: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "addLegacyRecords"): TypedContractMethod<[
        keys: string[],
        legacyKeys: string[][]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "exists"): TypedContractMethod<[tokenId: BigNumberish], [boolean], "view">;
    getFunction(nameOrSignature: "get"): TypedContractMethod<[
        key: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "getAddress"): TypedContractMethod<[
        network: string,
        token: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "getAddressKey"): TypedContractMethod<[
        network: string,
        token: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "getAddressKeys"): TypedContractMethod<[network: string, token: string], [string[]], "view">;
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
    getFunction(nameOrSignature: "getData"): TypedContractMethod<[
        keys: string[],
        tokenId: BigNumberish
    ], [
        [
            string,
            string,
            string[]
        ] & {
            resolver: string;
            owner: string;
            values: string[];
        }
    ], "view">;
    getFunction(nameOrSignature: "getDataByHash"): TypedContractMethod<[
        keyHashes: BigNumberish[],
        tokenId: BigNumberish
    ], [
        [
            string,
            string,
            string[],
            string[]
        ] & {
            resolver: string;
            owner: string;
            keys: string[];
            values: string[];
        }
    ], "view">;
    getFunction(nameOrSignature: "getDataByHashForMany"): TypedContractMethod<[
        keyHashes: BigNumberish[],
        tokenIds: BigNumberish[]
    ], [
        [
            string[],
            string[],
            string[][],
            string[][]
        ] & {
            resolvers: string[];
            owners: string[];
            keys: string[][];
            values: string[][];
        }
    ], "view">;
    getFunction(nameOrSignature: "getDataForMany"): TypedContractMethod<[
        keys: string[],
        tokenIds: BigNumberish[]
    ], [
        [
            string[],
            string[],
            string[][]
        ] & {
            resolvers: string[];
            owners: string[];
            values: string[][];
        }
    ], "view">;
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
        unsRegistry: AddressLike,
        cnsRegistry: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "isApprovedForAll"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "isApprovedOrOwner"): TypedContractMethod<[
        spender: AddressLike,
        tokenId: BigNumberish
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "multicall"): TypedContractMethod<[data: BytesLike[]], [string[]], "nonpayable">;
    getFunction(nameOrSignature: "namehash"): TypedContractMethod<[labels: string[]], [bigint], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "ownerOf"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "ownerOfForMany"): TypedContractMethod<[tokenIds: BigNumberish[]], [string[]], "view">;
    getFunction(nameOrSignature: "registryOf"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "resolverOf"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "reverseNameOf"): TypedContractMethod<[addr: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "reverseOf"): TypedContractMethod<[addr: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "setOwner"): TypedContractMethod<[addr: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "tokenURI"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "SetLegacyRecords"): TypedContractEvent<SetLegacyRecordsEvent.InputTuple, SetLegacyRecordsEvent.OutputTuple, SetLegacyRecordsEvent.OutputObject>;
    getEvent(key: "SetNetworkFamily"): TypedContractEvent<SetNetworkFamilyEvent.InputTuple, SetNetworkFamilyEvent.OutputTuple, SetNetworkFamilyEvent.OutputObject>;
    filters: {
        "Initialized(uint8)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "SetLegacyRecords(string)": TypedContractEvent<SetLegacyRecordsEvent.InputTuple, SetLegacyRecordsEvent.OutputTuple, SetLegacyRecordsEvent.OutputObject>;
        SetLegacyRecords: TypedContractEvent<SetLegacyRecordsEvent.InputTuple, SetLegacyRecordsEvent.OutputTuple, SetLegacyRecordsEvent.OutputObject>;
        "SetNetworkFamily(string)": TypedContractEvent<SetNetworkFamilyEvent.InputTuple, SetNetworkFamilyEvent.OutputTuple, SetNetworkFamilyEvent.OutputObject>;
        SetNetworkFamily: TypedContractEvent<SetNetworkFamilyEvent.InputTuple, SetNetworkFamilyEvent.OutputTuple, SetNetworkFamilyEvent.OutputObject>;
    };
}
//# sourceMappingURL=ProxyReader.d.ts.map