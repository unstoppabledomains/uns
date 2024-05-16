import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface CNSRegistryInterface extends Interface {
    getFunction(nameOrSignature: "addController" | "approve" | "balanceOf" | "burn" | "burnChild" | "childIdOf" | "controlledBurn" | "controlledMintChild" | "controlledResolveTo" | "controlledSafeMintChild" | "controlledSafeTransferFrom" | "controlledSetTokenURIPrefix" | "controlledTransferFrom" | "getApproved" | "isApprovedForAll" | "isApprovedOrOwner" | "isController" | "mintChild" | "name" | "ownerOf" | "renounceController" | "resolveTo" | "resolverOf" | "root" | "safeMintChild(address,uint256,string)" | "safeMintChild(address,uint256,string,bytes)" | "safeTransferFrom(address,address,uint256)" | "safeTransferFrom(address,address,uint256,bytes)" | "safeTransferFromChild(address,address,uint256,string)" | "safeTransferFromChild(address,address,uint256,string,bytes)" | "setApprovalForAll" | "setOwner" | "supportsInterface" | "symbol" | "sync" | "tokenURI" | "transferFrom" | "transferFromChild"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Approval" | "ApprovalForAll" | "NewURI" | "NewURIPrefix" | "Resolve" | "Sync" | "Transfer"): EventFragment;
    encodeFunctionData(functionFragment: "addController", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "approve", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "burnChild", values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "childIdOf", values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "controlledBurn", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "controlledMintChild", values: [AddressLike, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "controlledResolveTo", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "controlledSafeMintChild", values: [AddressLike, BigNumberish, string, BytesLike]): string;
    encodeFunctionData(functionFragment: "controlledSafeTransferFrom", values: [AddressLike, AddressLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "controlledSetTokenURIPrefix", values: [string]): string;
    encodeFunctionData(functionFragment: "controlledTransferFrom", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getApproved", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "isApprovedOrOwner", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "isController", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "mintChild", values: [AddressLike, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "renounceController", values?: undefined): string;
    encodeFunctionData(functionFragment: "resolveTo", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "resolverOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "root", values?: undefined): string;
    encodeFunctionData(functionFragment: "safeMintChild(address,uint256,string)", values: [AddressLike, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "safeMintChild(address,uint256,string,bytes)", values: [AddressLike, BigNumberish, string, BytesLike]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256)", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", values: [AddressLike, AddressLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "safeTransferFromChild(address,address,uint256,string)", values: [AddressLike, AddressLike, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "safeTransferFromChild(address,address,uint256,string,bytes)", values: [AddressLike, AddressLike, BigNumberish, string, BytesLike]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [AddressLike, boolean]): string;
    encodeFunctionData(functionFragment: "setOwner", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "sync", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferFromChild", values: [AddressLike, AddressLike, BigNumberish, string]): string;
    decodeFunctionResult(functionFragment: "addController", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burnChild", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "childIdOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "controlledBurn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "controlledMintChild", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "controlledResolveTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "controlledSafeMintChild", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "controlledSafeTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "controlledSetTokenURIPrefix", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "controlledTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getApproved", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedOrOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isController", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintChild", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceController", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resolveTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resolverOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "root", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintChild(address,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintChild(address,uint256,string,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFromChild(address,address,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFromChild(address,address,uint256,string,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sync", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFromChild", data: BytesLike): Result;
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
export declare namespace ResolveEvent {
    type InputTuple = [tokenId: BigNumberish, to: AddressLike];
    type OutputTuple = [tokenId: bigint, to: string];
    interface OutputObject {
        tokenId: bigint;
        to: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SyncEvent {
    type InputTuple = [
        resolver: AddressLike,
        updateId: BigNumberish,
        tokenId: BigNumberish
    ];
    type OutputTuple = [
        resolver: string,
        updateId: bigint,
        tokenId: bigint
    ];
    interface OutputObject {
        resolver: string;
        updateId: bigint;
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
export interface CNSRegistry extends BaseContract {
    connect(runner?: ContractRunner | null): CNSRegistry;
    waitForDeployment(): Promise<this>;
    interface: CNSRegistryInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addController: TypedContractMethod<[
        account: AddressLike
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
    burnChild: TypedContractMethod<[
        tokenId: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    childIdOf: TypedContractMethod<[
        tokenId: BigNumberish,
        label: string
    ], [
        bigint
    ], "view">;
    controlledBurn: TypedContractMethod<[
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    controlledMintChild: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    controlledResolveTo: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    controlledSafeMintChild: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
    controlledSafeTransferFrom: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
    controlledSetTokenURIPrefix: TypedContractMethod<[
        prefix: string
    ], [
        void
    ], "nonpayable">;
    controlledTransferFrom: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getApproved: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
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
    isController: TypedContractMethod<[account: AddressLike], [boolean], "view">;
    mintChild: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    name: TypedContractMethod<[], [string], "view">;
    ownerOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    renounceController: TypedContractMethod<[], [void], "nonpayable">;
    resolveTo: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    resolverOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    root: TypedContractMethod<[], [bigint], "view">;
    "safeMintChild(address,uint256,string)": TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    "safeMintChild(address,uint256,string,bytes)": TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
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
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
    "safeTransferFromChild(address,address,uint256,string)": TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    "safeTransferFromChild(address,address,uint256,string,bytes)": TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
    setApprovalForAll: TypedContractMethod<[
        to: AddressLike,
        approved: boolean
    ], [
        void
    ], "nonpayable">;
    setOwner: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    symbol: TypedContractMethod<[], [string], "view">;
    sync: TypedContractMethod<[
        tokenId: BigNumberish,
        updateId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    tokenURI: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    transferFrom: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    transferFromChild: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addController"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "approve"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "burn"): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "burnChild"): TypedContractMethod<[
        tokenId: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "childIdOf"): TypedContractMethod<[
        tokenId: BigNumberish,
        label: string
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "controlledBurn"): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "controlledMintChild"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "controlledResolveTo"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "controlledSafeMintChild"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "controlledSafeTransferFrom"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "controlledSetTokenURIPrefix"): TypedContractMethod<[prefix: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "controlledTransferFrom"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "getApproved"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
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
    getFunction(nameOrSignature: "isController"): TypedContractMethod<[account: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "mintChild"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "ownerOf"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "renounceController"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "resolveTo"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "resolverOf"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "root"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "safeMintChild(address,uint256,string)"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeMintChild(address,uint256,string,bytes)"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
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
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeTransferFromChild(address,address,uint256,string)"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeTransferFromChild(address,address,uint256,string,bytes)"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setApprovalForAll"): TypedContractMethod<[
        to: AddressLike,
        approved: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setOwner"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "symbol"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "sync"): TypedContractMethod<[
        tokenId: BigNumberish,
        updateId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "tokenURI"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferFromChild"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        label: string
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
    getEvent(key: "ApprovalForAll"): TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
    getEvent(key: "NewURI"): TypedContractEvent<NewURIEvent.InputTuple, NewURIEvent.OutputTuple, NewURIEvent.OutputObject>;
    getEvent(key: "NewURIPrefix"): TypedContractEvent<NewURIPrefixEvent.InputTuple, NewURIPrefixEvent.OutputTuple, NewURIPrefixEvent.OutputObject>;
    getEvent(key: "Resolve"): TypedContractEvent<ResolveEvent.InputTuple, ResolveEvent.OutputTuple, ResolveEvent.OutputObject>;
    getEvent(key: "Sync"): TypedContractEvent<SyncEvent.InputTuple, SyncEvent.OutputTuple, SyncEvent.OutputObject>;
    getEvent(key: "Transfer"): TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    filters: {
        "Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        Approval: TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        "ApprovalForAll(address,address,bool)": TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        ApprovalForAll: TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        "NewURI(uint256,string)": TypedContractEvent<NewURIEvent.InputTuple, NewURIEvent.OutputTuple, NewURIEvent.OutputObject>;
        NewURI: TypedContractEvent<NewURIEvent.InputTuple, NewURIEvent.OutputTuple, NewURIEvent.OutputObject>;
        "NewURIPrefix(string)": TypedContractEvent<NewURIPrefixEvent.InputTuple, NewURIPrefixEvent.OutputTuple, NewURIPrefixEvent.OutputObject>;
        NewURIPrefix: TypedContractEvent<NewURIPrefixEvent.InputTuple, NewURIPrefixEvent.OutputTuple, NewURIPrefixEvent.OutputObject>;
        "Resolve(uint256,address)": TypedContractEvent<ResolveEvent.InputTuple, ResolveEvent.OutputTuple, ResolveEvent.OutputObject>;
        Resolve: TypedContractEvent<ResolveEvent.InputTuple, ResolveEvent.OutputTuple, ResolveEvent.OutputObject>;
        "Sync(address,uint256,uint256)": TypedContractEvent<SyncEvent.InputTuple, SyncEvent.OutputTuple, SyncEvent.OutputObject>;
        Sync: TypedContractEvent<SyncEvent.InputTuple, SyncEvent.OutputTuple, SyncEvent.OutputObject>;
        "Transfer(address,address,uint256)": TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
        Transfer: TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    };
}
//# sourceMappingURL=CNSRegistry.d.ts.map