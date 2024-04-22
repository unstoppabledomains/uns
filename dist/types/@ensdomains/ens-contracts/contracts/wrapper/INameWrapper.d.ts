import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../common";
export interface INameWrapperInterface extends Interface {
    getFunction(nameOrSignature: "allFusesBurned" | "approve" | "balanceOf" | "balanceOfBatch" | "canModifyName" | "ens" | "extendExpiry" | "getApproved" | "getData" | "isApprovedForAll" | "isWrapped(bytes32,bytes32)" | "isWrapped(bytes32)" | "metadataService" | "name" | "names" | "ownerOf" | "registerAndWrapETH2LD" | "registrar" | "renew" | "safeBatchTransferFrom" | "safeTransferFrom" | "setApprovalForAll" | "setChildFuses" | "setFuses" | "setMetadataService" | "setRecord" | "setResolver" | "setSubnodeOwner" | "setSubnodeRecord" | "setTTL" | "setUpgradeContract" | "supportsInterface" | "unwrap" | "unwrapETH2LD" | "upgrade" | "upgradeContract" | "uri" | "wrap" | "wrapETH2LD"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalForAll" | "ExpiryExtended" | "FusesSet" | "NameUnwrapped" | "NameWrapped" | "TransferBatch" | "TransferSingle" | "URI"): EventFragment;
    encodeFunctionData(functionFragment: "allFusesBurned", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "approve", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOfBatch", values: [AddressLike[], BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "canModifyName", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "ens", values?: undefined): string;
    encodeFunctionData(functionFragment: "extendExpiry", values: [BytesLike, BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getApproved", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getData", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "isWrapped(bytes32,bytes32)", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "isWrapped(bytes32)", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "metadataService", values?: undefined): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "names", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "registerAndWrapETH2LD", values: [string, AddressLike, BigNumberish, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "registrar", values?: undefined): string;
    encodeFunctionData(functionFragment: "renew", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "safeBatchTransferFrom", values: [
        AddressLike,
        AddressLike,
        BigNumberish[],
        BigNumberish[],
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom", values: [AddressLike, AddressLike, BigNumberish, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [AddressLike, boolean]): string;
    encodeFunctionData(functionFragment: "setChildFuses", values: [BytesLike, BytesLike, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setFuses", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setMetadataService", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setRecord", values: [BytesLike, AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setResolver", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "setSubnodeOwner", values: [BytesLike, string, AddressLike, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setSubnodeRecord", values: [
        BytesLike,
        string,
        AddressLike,
        AddressLike,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "setTTL", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setUpgradeContract", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "unwrap", values: [BytesLike, BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "unwrapETH2LD", values: [BytesLike, AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "upgrade", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "upgradeContract", values?: undefined): string;
    encodeFunctionData(functionFragment: "uri", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "wrap", values: [BytesLike, AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "wrapETH2LD", values: [string, AddressLike, BigNumberish, AddressLike]): string;
    decodeFunctionResult(functionFragment: "allFusesBurned", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOfBatch", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "canModifyName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "extendExpiry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getApproved", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isWrapped(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isWrapped(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "metadataService", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "names", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerAndWrapETH2LD", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registrar", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renew", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeBatchTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setChildFuses", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFuses", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMetadataService", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRecord", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSubnodeOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSubnodeRecord", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTTL", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUpgradeContract", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unwrap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unwrapETH2LD", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgrade", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeContract", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "uri", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrapETH2LD", data: BytesLike): Result;
}
export declare namespace ApprovalForAllEvent {
    type InputTuple = [
        account: AddressLike,
        operator: AddressLike,
        approved: boolean
    ];
    type OutputTuple = [
        account: string,
        operator: string,
        approved: boolean
    ];
    interface OutputObject {
        account: string;
        operator: string;
        approved: boolean;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ExpiryExtendedEvent {
    type InputTuple = [node: BytesLike, expiry: BigNumberish];
    type OutputTuple = [node: string, expiry: bigint];
    interface OutputObject {
        node: string;
        expiry: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace FusesSetEvent {
    type InputTuple = [node: BytesLike, fuses: BigNumberish];
    type OutputTuple = [node: string, fuses: bigint];
    interface OutputObject {
        node: string;
        fuses: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NameUnwrappedEvent {
    type InputTuple = [node: BytesLike, owner: AddressLike];
    type OutputTuple = [node: string, owner: string];
    interface OutputObject {
        node: string;
        owner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NameWrappedEvent {
    type InputTuple = [
        node: BytesLike,
        name: BytesLike,
        owner: AddressLike,
        fuses: BigNumberish,
        expiry: BigNumberish
    ];
    type OutputTuple = [
        node: string,
        name: string,
        owner: string,
        fuses: bigint,
        expiry: bigint
    ];
    interface OutputObject {
        node: string;
        name: string;
        owner: string;
        fuses: bigint;
        expiry: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TransferBatchEvent {
    type InputTuple = [
        operator: AddressLike,
        from: AddressLike,
        to: AddressLike,
        ids: BigNumberish[],
        values: BigNumberish[]
    ];
    type OutputTuple = [
        operator: string,
        from: string,
        to: string,
        ids: bigint[],
        values: bigint[]
    ];
    interface OutputObject {
        operator: string;
        from: string;
        to: string;
        ids: bigint[];
        values: bigint[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TransferSingleEvent {
    type InputTuple = [
        operator: AddressLike,
        from: AddressLike,
        to: AddressLike,
        id: BigNumberish,
        value: BigNumberish
    ];
    type OutputTuple = [
        operator: string,
        from: string,
        to: string,
        id: bigint,
        value: bigint
    ];
    interface OutputObject {
        operator: string;
        from: string;
        to: string;
        id: bigint;
        value: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace URIEvent {
    type InputTuple = [value: string, id: BigNumberish];
    type OutputTuple = [value: string, id: bigint];
    interface OutputObject {
        value: string;
        id: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface INameWrapper extends BaseContract {
    connect(runner?: ContractRunner | null): INameWrapper;
    waitForDeployment(): Promise<this>;
    interface: INameWrapperInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    allFusesBurned: TypedContractMethod<[
        node: BytesLike,
        fuseMask: BigNumberish
    ], [
        boolean
    ], "view">;
    approve: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    balanceOf: TypedContractMethod<[
        account: AddressLike,
        id: BigNumberish
    ], [
        bigint
    ], "view">;
    balanceOfBatch: TypedContractMethod<[
        accounts: AddressLike[],
        ids: BigNumberish[]
    ], [
        bigint[]
    ], "view">;
    canModifyName: TypedContractMethod<[
        node: BytesLike,
        addr: AddressLike
    ], [
        boolean
    ], "view">;
    ens: TypedContractMethod<[], [string], "view">;
    extendExpiry: TypedContractMethod<[
        node: BytesLike,
        labelhash: BytesLike,
        expiry: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    getApproved: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getData: TypedContractMethod<[
        id: BigNumberish
    ], [
        [string, bigint, bigint]
    ], "view">;
    isApprovedForAll: TypedContractMethod<[
        account: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], "view">;
    "isWrapped(bytes32,bytes32)": TypedContractMethod<[
        arg0: BytesLike,
        arg1: BytesLike
    ], [
        boolean
    ], "view">;
    "isWrapped(bytes32)": TypedContractMethod<[
        arg0: BytesLike
    ], [
        boolean
    ], "view">;
    metadataService: TypedContractMethod<[], [string], "view">;
    name: TypedContractMethod<[], [string], "view">;
    names: TypedContractMethod<[arg0: BytesLike], [string], "view">;
    ownerOf: TypedContractMethod<[id: BigNumberish], [string], "view">;
    registerAndWrapETH2LD: TypedContractMethod<[
        label: string,
        wrappedOwner: AddressLike,
        duration: BigNumberish,
        resolver: AddressLike,
        ownerControlledFuses: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    registrar: TypedContractMethod<[], [string], "view">;
    renew: TypedContractMethod<[
        labelHash: BigNumberish,
        duration: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    safeBatchTransferFrom: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        ids: BigNumberish[],
        amounts: BigNumberish[],
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    safeTransferFrom: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        id: BigNumberish,
        amount: BigNumberish,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    setApprovalForAll: TypedContractMethod<[
        operator: AddressLike,
        approved: boolean
    ], [
        void
    ], "nonpayable">;
    setChildFuses: TypedContractMethod<[
        parentNode: BytesLike,
        labelhash: BytesLike,
        fuses: BigNumberish,
        expiry: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setFuses: TypedContractMethod<[
        node: BytesLike,
        ownerControlledFuses: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    setMetadataService: TypedContractMethod<[
        _metadataService: AddressLike
    ], [
        void
    ], "nonpayable">;
    setRecord: TypedContractMethod<[
        node: BytesLike,
        owner: AddressLike,
        resolver: AddressLike,
        ttl: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setResolver: TypedContractMethod<[
        node: BytesLike,
        resolver: AddressLike
    ], [
        void
    ], "nonpayable">;
    setSubnodeOwner: TypedContractMethod<[
        node: BytesLike,
        label: string,
        newOwner: AddressLike,
        fuses: BigNumberish,
        expiry: BigNumberish
    ], [
        string
    ], "nonpayable">;
    setSubnodeRecord: TypedContractMethod<[
        node: BytesLike,
        label: string,
        owner: AddressLike,
        resolver: AddressLike,
        ttl: BigNumberish,
        fuses: BigNumberish,
        expiry: BigNumberish
    ], [
        string
    ], "nonpayable">;
    setTTL: TypedContractMethod<[
        node: BytesLike,
        ttl: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setUpgradeContract: TypedContractMethod<[
        _upgradeAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceID: BytesLike
    ], [
        boolean
    ], "view">;
    unwrap: TypedContractMethod<[
        node: BytesLike,
        label: BytesLike,
        owner: AddressLike
    ], [
        void
    ], "nonpayable">;
    unwrapETH2LD: TypedContractMethod<[
        label: BytesLike,
        newRegistrant: AddressLike,
        newController: AddressLike
    ], [
        void
    ], "nonpayable">;
    upgrade: TypedContractMethod<[
        name: BytesLike,
        extraData: BytesLike
    ], [
        void
    ], "nonpayable">;
    upgradeContract: TypedContractMethod<[], [string], "view">;
    uri: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    wrap: TypedContractMethod<[
        name: BytesLike,
        wrappedOwner: AddressLike,
        resolver: AddressLike
    ], [
        void
    ], "nonpayable">;
    wrapETH2LD: TypedContractMethod<[
        label: string,
        wrappedOwner: AddressLike,
        ownerControlledFuses: BigNumberish,
        resolver: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "allFusesBurned"): TypedContractMethod<[
        node: BytesLike,
        fuseMask: BigNumberish
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "approve"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[
        account: AddressLike,
        id: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "balanceOfBatch"): TypedContractMethod<[
        accounts: AddressLike[],
        ids: BigNumberish[]
    ], [
        bigint[]
    ], "view">;
    getFunction(nameOrSignature: "canModifyName"): TypedContractMethod<[
        node: BytesLike,
        addr: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "ens"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "extendExpiry"): TypedContractMethod<[
        node: BytesLike,
        labelhash: BytesLike,
        expiry: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "getApproved"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "getData"): TypedContractMethod<[
        id: BigNumberish
    ], [
        [string, bigint, bigint]
    ], "view">;
    getFunction(nameOrSignature: "isApprovedForAll"): TypedContractMethod<[
        account: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "isWrapped(bytes32,bytes32)"): TypedContractMethod<[arg0: BytesLike, arg1: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "isWrapped(bytes32)"): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "metadataService"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "names"): TypedContractMethod<[arg0: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "ownerOf"): TypedContractMethod<[id: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "registerAndWrapETH2LD"): TypedContractMethod<[
        label: string,
        wrappedOwner: AddressLike,
        duration: BigNumberish,
        resolver: AddressLike,
        ownerControlledFuses: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "registrar"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "renew"): TypedContractMethod<[
        labelHash: BigNumberish,
        duration: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeBatchTransferFrom"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        ids: BigNumberish[],
        amounts: BigNumberish[],
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeTransferFrom"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        id: BigNumberish,
        amount: BigNumberish,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setApprovalForAll"): TypedContractMethod<[
        operator: AddressLike,
        approved: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setChildFuses"): TypedContractMethod<[
        parentNode: BytesLike,
        labelhash: BytesLike,
        fuses: BigNumberish,
        expiry: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setFuses"): TypedContractMethod<[
        node: BytesLike,
        ownerControlledFuses: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "setMetadataService"): TypedContractMethod<[_metadataService: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "setRecord"): TypedContractMethod<[
        node: BytesLike,
        owner: AddressLike,
        resolver: AddressLike,
        ttl: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setResolver"): TypedContractMethod<[
        node: BytesLike,
        resolver: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setSubnodeOwner"): TypedContractMethod<[
        node: BytesLike,
        label: string,
        newOwner: AddressLike,
        fuses: BigNumberish,
        expiry: BigNumberish
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "setSubnodeRecord"): TypedContractMethod<[
        node: BytesLike,
        label: string,
        owner: AddressLike,
        resolver: AddressLike,
        ttl: BigNumberish,
        fuses: BigNumberish,
        expiry: BigNumberish
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "setTTL"): TypedContractMethod<[
        node: BytesLike,
        ttl: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setUpgradeContract"): TypedContractMethod<[_upgradeAddress: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceID: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "unwrap"): TypedContractMethod<[
        node: BytesLike,
        label: BytesLike,
        owner: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "unwrapETH2LD"): TypedContractMethod<[
        label: BytesLike,
        newRegistrant: AddressLike,
        newController: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "upgrade"): TypedContractMethod<[
        name: BytesLike,
        extraData: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "upgradeContract"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "uri"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "wrap"): TypedContractMethod<[
        name: BytesLike,
        wrappedOwner: AddressLike,
        resolver: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "wrapETH2LD"): TypedContractMethod<[
        label: string,
        wrappedOwner: AddressLike,
        ownerControlledFuses: BigNumberish,
        resolver: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    getEvent(key: "ApprovalForAll"): TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
    getEvent(key: "ExpiryExtended"): TypedContractEvent<ExpiryExtendedEvent.InputTuple, ExpiryExtendedEvent.OutputTuple, ExpiryExtendedEvent.OutputObject>;
    getEvent(key: "FusesSet"): TypedContractEvent<FusesSetEvent.InputTuple, FusesSetEvent.OutputTuple, FusesSetEvent.OutputObject>;
    getEvent(key: "NameUnwrapped"): TypedContractEvent<NameUnwrappedEvent.InputTuple, NameUnwrappedEvent.OutputTuple, NameUnwrappedEvent.OutputObject>;
    getEvent(key: "NameWrapped"): TypedContractEvent<NameWrappedEvent.InputTuple, NameWrappedEvent.OutputTuple, NameWrappedEvent.OutputObject>;
    getEvent(key: "TransferBatch"): TypedContractEvent<TransferBatchEvent.InputTuple, TransferBatchEvent.OutputTuple, TransferBatchEvent.OutputObject>;
    getEvent(key: "TransferSingle"): TypedContractEvent<TransferSingleEvent.InputTuple, TransferSingleEvent.OutputTuple, TransferSingleEvent.OutputObject>;
    getEvent(key: "URI"): TypedContractEvent<URIEvent.InputTuple, URIEvent.OutputTuple, URIEvent.OutputObject>;
    filters: {
        "ApprovalForAll(address,address,bool)": TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        ApprovalForAll: TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        "ExpiryExtended(bytes32,uint64)": TypedContractEvent<ExpiryExtendedEvent.InputTuple, ExpiryExtendedEvent.OutputTuple, ExpiryExtendedEvent.OutputObject>;
        ExpiryExtended: TypedContractEvent<ExpiryExtendedEvent.InputTuple, ExpiryExtendedEvent.OutputTuple, ExpiryExtendedEvent.OutputObject>;
        "FusesSet(bytes32,uint32)": TypedContractEvent<FusesSetEvent.InputTuple, FusesSetEvent.OutputTuple, FusesSetEvent.OutputObject>;
        FusesSet: TypedContractEvent<FusesSetEvent.InputTuple, FusesSetEvent.OutputTuple, FusesSetEvent.OutputObject>;
        "NameUnwrapped(bytes32,address)": TypedContractEvent<NameUnwrappedEvent.InputTuple, NameUnwrappedEvent.OutputTuple, NameUnwrappedEvent.OutputObject>;
        NameUnwrapped: TypedContractEvent<NameUnwrappedEvent.InputTuple, NameUnwrappedEvent.OutputTuple, NameUnwrappedEvent.OutputObject>;
        "NameWrapped(bytes32,bytes,address,uint32,uint64)": TypedContractEvent<NameWrappedEvent.InputTuple, NameWrappedEvent.OutputTuple, NameWrappedEvent.OutputObject>;
        NameWrapped: TypedContractEvent<NameWrappedEvent.InputTuple, NameWrappedEvent.OutputTuple, NameWrappedEvent.OutputObject>;
        "TransferBatch(address,address,address,uint256[],uint256[])": TypedContractEvent<TransferBatchEvent.InputTuple, TransferBatchEvent.OutputTuple, TransferBatchEvent.OutputObject>;
        TransferBatch: TypedContractEvent<TransferBatchEvent.InputTuple, TransferBatchEvent.OutputTuple, TransferBatchEvent.OutputObject>;
        "TransferSingle(address,address,address,uint256,uint256)": TypedContractEvent<TransferSingleEvent.InputTuple, TransferSingleEvent.OutputTuple, TransferSingleEvent.OutputObject>;
        TransferSingle: TypedContractEvent<TransferSingleEvent.InputTuple, TransferSingleEvent.OutputTuple, TransferSingleEvent.OutputObject>;
        "URI(string,uint256)": TypedContractEvent<URIEvent.InputTuple, URIEvent.OutputTuple, URIEvent.OutputObject>;
        URI: TypedContractEvent<URIEvent.InputTuple, URIEvent.OutputTuple, URIEvent.OutputObject>;
    };
}
//# sourceMappingURL=INameWrapper.d.ts.map