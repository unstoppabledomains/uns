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
export declare namespace ZilliqaRecover {
    type MintingTokenStruct = {
        zilOwner: AddressLike;
        label: string;
    };
    type MintingTokenStructOutput = [zilOwner: string, label: string] & {
        zilOwner: string;
        label: string;
    };
}
export interface ZilliqaRecoverInterface extends Interface {
    getFunction(nameOrSignature: "ZIL_NODE" | "claim" | "claimAll" | "ethAddress" | "execute" | "initialize" | "isOwnedBy" | "isTrustedForwarder" | "mint" | "mintAll" | "mintingManager" | "nonceOf" | "onERC721Received" | "registry" | "verify" | "zilAddress" | "znsOwnerOf"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized" | "ZnsTokenClaimed" | "ZnsTokenMinted"): EventFragment;
    encodeFunctionData(functionFragment: "ZIL_NODE", values?: undefined): string;
    encodeFunctionData(functionFragment: "claim", values: [BigNumberish, BytesLike, BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "claimAll", values: [BigNumberish[], BytesLike, BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "ethAddress", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "execute", values: [IForwarder.ForwardRequestStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "isOwnedBy", values: [AddressLike, BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "isTrustedForwarder", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "mint", values: [string, AddressLike]): string;
    encodeFunctionData(functionFragment: "mintAll", values: [ZilliqaRecover.MintingTokenStruct[]]): string;
    encodeFunctionData(functionFragment: "mintingManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "onERC721Received", values: [AddressLike, AddressLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "registry", values?: undefined): string;
    encodeFunctionData(functionFragment: "verify", values: [IForwarder.ForwardRequestStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "zilAddress", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "znsOwnerOf", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "ZIL_NODE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ethAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isOwnedBy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTrustedForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintingManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC721Received", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "zilAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "znsOwnerOf", data: BytesLike): Result;
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
export declare namespace ZnsTokenClaimedEvent {
    type InputTuple = [
        tokenId: BigNumberish,
        oldAddress: AddressLike,
        newAddress: AddressLike
    ];
    type OutputTuple = [
        tokenId: bigint,
        oldAddress: string,
        newAddress: string
    ];
    interface OutputObject {
        tokenId: bigint;
        oldAddress: string;
        newAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ZnsTokenMintedEvent {
    type InputTuple = [
        tokenId: BigNumberish,
        zilAddress: AddressLike,
        label: string
    ];
    type OutputTuple = [
        tokenId: bigint,
        zilAddress: string,
        label: string
    ];
    interface OutputObject {
        tokenId: bigint;
        zilAddress: string;
        label: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface ZilliqaRecover extends BaseContract {
    connect(runner?: ContractRunner | null): ZilliqaRecover;
    waitForDeployment(): Promise<this>;
    interface: ZilliqaRecoverInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    ZIL_NODE: TypedContractMethod<[], [bigint], "view">;
    claim: TypedContractMethod<[
        tokenId: BigNumberish,
        publicKeyX: BytesLike,
        publicKeyY: BytesLike,
        newOwnerAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
    claimAll: TypedContractMethod<[
        tokenIds: BigNumberish[],
        publicKeyX: BytesLike,
        publicKeyY: BytesLike,
        newOwnerAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
    ethAddress: TypedContractMethod<[
        publicKeyX: BytesLike,
        publicKeyY: BytesLike
    ], [
        string
    ], "view">;
    execute: TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        string
    ], "nonpayable">;
    initialize: TypedContractMethod<[
        registry_: AddressLike,
        mintingManager_: AddressLike
    ], [
        void
    ], "nonpayable">;
    isOwnedBy: TypedContractMethod<[
        _zilAddress: AddressLike,
        tokenIds: BigNumberish[]
    ], [
        boolean
    ], "view">;
    isTrustedForwarder: TypedContractMethod<[
        forwarder: AddressLike
    ], [
        boolean
    ], "view">;
    mint: TypedContractMethod<[
        label: string,
        zilOwner: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    mintAll: TypedContractMethod<[
        tokens: ZilliqaRecover.MintingTokenStruct[]
    ], [
        void
    ], "nonpayable">;
    mintingManager: TypedContractMethod<[], [string], "view">;
    nonceOf: TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    onERC721Received: TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike,
        tokenId: BigNumberish,
        arg3: BytesLike
    ], [
        string
    ], "view">;
    registry: TypedContractMethod<[], [string], "view">;
    verify: TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        boolean
    ], "view">;
    zilAddress: TypedContractMethod<[
        publicKeyX: BytesLike,
        publicKeyY: BytesLike
    ], [
        string
    ], "view">;
    znsOwnerOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "ZIL_NODE"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "claim"): TypedContractMethod<[
        tokenId: BigNumberish,
        publicKeyX: BytesLike,
        publicKeyY: BytesLike,
        newOwnerAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "claimAll"): TypedContractMethod<[
        tokenIds: BigNumberish[],
        publicKeyX: BytesLike,
        publicKeyY: BytesLike,
        newOwnerAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "ethAddress"): TypedContractMethod<[
        publicKeyX: BytesLike,
        publicKeyY: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "execute"): TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
        registry_: AddressLike,
        mintingManager_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "isOwnedBy"): TypedContractMethod<[
        _zilAddress: AddressLike,
        tokenIds: BigNumberish[]
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "isTrustedForwarder"): TypedContractMethod<[forwarder: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "mint"): TypedContractMethod<[
        label: string,
        zilOwner: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "mintAll"): TypedContractMethod<[
        tokens: ZilliqaRecover.MintingTokenStruct[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "mintingManager"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "nonceOf"): TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "onERC721Received"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike,
        tokenId: BigNumberish,
        arg3: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "registry"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "verify"): TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "zilAddress"): TypedContractMethod<[
        publicKeyX: BytesLike,
        publicKeyY: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "znsOwnerOf"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "ZnsTokenClaimed"): TypedContractEvent<ZnsTokenClaimedEvent.InputTuple, ZnsTokenClaimedEvent.OutputTuple, ZnsTokenClaimedEvent.OutputObject>;
    getEvent(key: "ZnsTokenMinted"): TypedContractEvent<ZnsTokenMintedEvent.InputTuple, ZnsTokenMintedEvent.OutputTuple, ZnsTokenMintedEvent.OutputObject>;
    filters: {
        "Initialized(uint8)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "ZnsTokenClaimed(uint256,address,address)": TypedContractEvent<ZnsTokenClaimedEvent.InputTuple, ZnsTokenClaimedEvent.OutputTuple, ZnsTokenClaimedEvent.OutputObject>;
        ZnsTokenClaimed: TypedContractEvent<ZnsTokenClaimedEvent.InputTuple, ZnsTokenClaimedEvent.OutputTuple, ZnsTokenClaimedEvent.OutputObject>;
        "ZnsTokenMinted(uint256,address,string)": TypedContractEvent<ZnsTokenMintedEvent.InputTuple, ZnsTokenMintedEvent.OutputTuple, ZnsTokenMintedEvent.OutputObject>;
        ZnsTokenMinted: TypedContractEvent<ZnsTokenMintedEvent.InputTuple, ZnsTokenMintedEvent.OutputTuple, ZnsTokenMintedEvent.OutputObject>;
    };
}
//# sourceMappingURL=ZilliqaRecover.d.ts.map