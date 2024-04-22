import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../common";
export declare namespace DNSSEC {
    type RRSetWithSignatureStruct = {
        rrset: BytesLike;
        sig: BytesLike;
    };
    type RRSetWithSignatureStructOutput = [rrset: string, sig: string] & {
        rrset: string;
        sig: string;
    };
}
export interface DNSSECImplInterface extends Interface {
    getFunction(nameOrSignature: "algorithms" | "anchors" | "deleteRRSet" | "deleteRRSetNSEC3" | "digests" | "nsec3Digests" | "owner" | "rrdata" | "setAlgorithm" | "setDigest" | "setNSEC3Digest" | "setOwner" | "submitRRSet" | "submitRRSets"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AlgorithmUpdated" | "DigestUpdated" | "Marker" | "NSEC3DigestUpdated" | "RRSetUpdated" | "Test"): EventFragment;
    encodeFunctionData(functionFragment: "algorithms", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "anchors", values?: undefined): string;
    encodeFunctionData(functionFragment: "deleteRRSet", values: [
        BigNumberish,
        BytesLike,
        DNSSEC.RRSetWithSignatureStruct,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "deleteRRSetNSEC3", values: [
        BigNumberish,
        BytesLike,
        DNSSEC.RRSetWithSignatureStruct,
        DNSSEC.RRSetWithSignatureStruct,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "digests", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "nsec3Digests", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "rrdata", values: [BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "setAlgorithm", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "setDigest", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "setNSEC3Digest", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "setOwner", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "submitRRSet", values: [DNSSEC.RRSetWithSignatureStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "submitRRSets", values: [DNSSEC.RRSetWithSignatureStruct[], BytesLike]): string;
    decodeFunctionResult(functionFragment: "algorithms", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "anchors", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deleteRRSet", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deleteRRSetNSEC3", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "digests", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nsec3Digests", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rrdata", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setAlgorithm", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDigest", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setNSEC3Digest", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitRRSet", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitRRSets", data: BytesLike): Result;
}
export declare namespace AlgorithmUpdatedEvent {
    type InputTuple = [id: BigNumberish, addr: AddressLike];
    type OutputTuple = [id: bigint, addr: string];
    interface OutputObject {
        id: bigint;
        addr: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace DigestUpdatedEvent {
    type InputTuple = [id: BigNumberish, addr: AddressLike];
    type OutputTuple = [id: bigint, addr: string];
    interface OutputObject {
        id: bigint;
        addr: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace MarkerEvent {
    type InputTuple = [];
    type OutputTuple = [];
    interface OutputObject {
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NSEC3DigestUpdatedEvent {
    type InputTuple = [id: BigNumberish, addr: AddressLike];
    type OutputTuple = [id: bigint, addr: string];
    interface OutputObject {
        id: bigint;
        addr: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RRSetUpdatedEvent {
    type InputTuple = [name: BytesLike, rrset: BytesLike];
    type OutputTuple = [name: string, rrset: string];
    interface OutputObject {
        name: string;
        rrset: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TestEvent {
    type InputTuple = [t: BigNumberish];
    type OutputTuple = [t: bigint];
    interface OutputObject {
        t: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface DNSSECImpl extends BaseContract {
    connect(runner?: ContractRunner | null): DNSSECImpl;
    waitForDeployment(): Promise<this>;
    interface: DNSSECImplInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    algorithms: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    anchors: TypedContractMethod<[], [string], "view">;
    deleteRRSet: TypedContractMethod<[
        deleteType: BigNumberish,
        deleteName: BytesLike,
        nsec: DNSSEC.RRSetWithSignatureStruct,
        proof: BytesLike
    ], [
        void
    ], "nonpayable">;
    deleteRRSetNSEC3: TypedContractMethod<[
        deleteType: BigNumberish,
        deleteName: BytesLike,
        closestEncloser: DNSSEC.RRSetWithSignatureStruct,
        nextClosest: DNSSEC.RRSetWithSignatureStruct,
        dnskey: BytesLike
    ], [
        void
    ], "nonpayable">;
    digests: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    nsec3Digests: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    rrdata: TypedContractMethod<[
        dnstype: BigNumberish,
        name: BytesLike
    ], [
        [bigint, bigint, string]
    ], "view">;
    setAlgorithm: TypedContractMethod<[
        id: BigNumberish,
        algo: AddressLike
    ], [
        void
    ], "nonpayable">;
    setDigest: TypedContractMethod<[
        id: BigNumberish,
        digest: AddressLike
    ], [
        void
    ], "nonpayable">;
    setNSEC3Digest: TypedContractMethod<[
        id: BigNumberish,
        digest: AddressLike
    ], [
        void
    ], "nonpayable">;
    setOwner: TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    submitRRSet: TypedContractMethod<[
        input: DNSSEC.RRSetWithSignatureStruct,
        proof: BytesLike
    ], [
        string
    ], "nonpayable">;
    submitRRSets: TypedContractMethod<[
        input: DNSSEC.RRSetWithSignatureStruct[],
        _proof: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "algorithms"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "anchors"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "deleteRRSet"): TypedContractMethod<[
        deleteType: BigNumberish,
        deleteName: BytesLike,
        nsec: DNSSEC.RRSetWithSignatureStruct,
        proof: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "deleteRRSetNSEC3"): TypedContractMethod<[
        deleteType: BigNumberish,
        deleteName: BytesLike,
        closestEncloser: DNSSEC.RRSetWithSignatureStruct,
        nextClosest: DNSSEC.RRSetWithSignatureStruct,
        dnskey: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "digests"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "nsec3Digests"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "rrdata"): TypedContractMethod<[
        dnstype: BigNumberish,
        name: BytesLike
    ], [
        [bigint, bigint, string]
    ], "view">;
    getFunction(nameOrSignature: "setAlgorithm"): TypedContractMethod<[
        id: BigNumberish,
        algo: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setDigest"): TypedContractMethod<[
        id: BigNumberish,
        digest: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setNSEC3Digest"): TypedContractMethod<[
        id: BigNumberish,
        digest: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setOwner"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "submitRRSet"): TypedContractMethod<[
        input: DNSSEC.RRSetWithSignatureStruct,
        proof: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "submitRRSets"): TypedContractMethod<[
        input: DNSSEC.RRSetWithSignatureStruct[],
        _proof: BytesLike
    ], [
        string
    ], "nonpayable">;
    getEvent(key: "AlgorithmUpdated"): TypedContractEvent<AlgorithmUpdatedEvent.InputTuple, AlgorithmUpdatedEvent.OutputTuple, AlgorithmUpdatedEvent.OutputObject>;
    getEvent(key: "DigestUpdated"): TypedContractEvent<DigestUpdatedEvent.InputTuple, DigestUpdatedEvent.OutputTuple, DigestUpdatedEvent.OutputObject>;
    getEvent(key: "Marker"): TypedContractEvent<MarkerEvent.InputTuple, MarkerEvent.OutputTuple, MarkerEvent.OutputObject>;
    getEvent(key: "NSEC3DigestUpdated"): TypedContractEvent<NSEC3DigestUpdatedEvent.InputTuple, NSEC3DigestUpdatedEvent.OutputTuple, NSEC3DigestUpdatedEvent.OutputObject>;
    getEvent(key: "RRSetUpdated"): TypedContractEvent<RRSetUpdatedEvent.InputTuple, RRSetUpdatedEvent.OutputTuple, RRSetUpdatedEvent.OutputObject>;
    getEvent(key: "Test"): TypedContractEvent<TestEvent.InputTuple, TestEvent.OutputTuple, TestEvent.OutputObject>;
    filters: {
        "AlgorithmUpdated(uint8,address)": TypedContractEvent<AlgorithmUpdatedEvent.InputTuple, AlgorithmUpdatedEvent.OutputTuple, AlgorithmUpdatedEvent.OutputObject>;
        AlgorithmUpdated: TypedContractEvent<AlgorithmUpdatedEvent.InputTuple, AlgorithmUpdatedEvent.OutputTuple, AlgorithmUpdatedEvent.OutputObject>;
        "DigestUpdated(uint8,address)": TypedContractEvent<DigestUpdatedEvent.InputTuple, DigestUpdatedEvent.OutputTuple, DigestUpdatedEvent.OutputObject>;
        DigestUpdated: TypedContractEvent<DigestUpdatedEvent.InputTuple, DigestUpdatedEvent.OutputTuple, DigestUpdatedEvent.OutputObject>;
        "Marker()": TypedContractEvent<MarkerEvent.InputTuple, MarkerEvent.OutputTuple, MarkerEvent.OutputObject>;
        Marker: TypedContractEvent<MarkerEvent.InputTuple, MarkerEvent.OutputTuple, MarkerEvent.OutputObject>;
        "NSEC3DigestUpdated(uint8,address)": TypedContractEvent<NSEC3DigestUpdatedEvent.InputTuple, NSEC3DigestUpdatedEvent.OutputTuple, NSEC3DigestUpdatedEvent.OutputObject>;
        NSEC3DigestUpdated: TypedContractEvent<NSEC3DigestUpdatedEvent.InputTuple, NSEC3DigestUpdatedEvent.OutputTuple, NSEC3DigestUpdatedEvent.OutputObject>;
        "RRSetUpdated(bytes,bytes)": TypedContractEvent<RRSetUpdatedEvent.InputTuple, RRSetUpdatedEvent.OutputTuple, RRSetUpdatedEvent.OutputObject>;
        RRSetUpdated: TypedContractEvent<RRSetUpdatedEvent.InputTuple, RRSetUpdatedEvent.OutputTuple, RRSetUpdatedEvent.OutputObject>;
        "Test(uint256)": TypedContractEvent<TestEvent.InputTuple, TestEvent.OutputTuple, TestEvent.OutputObject>;
        Test: TypedContractEvent<TestEvent.InputTuple, TestEvent.OutputTuple, TestEvent.OutputObject>;
    };
}
//# sourceMappingURL=DNSSECImpl.d.ts.map