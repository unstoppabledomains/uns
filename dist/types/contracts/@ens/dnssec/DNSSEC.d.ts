import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
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
export interface DNSSECInterface extends Interface {
    getFunction(nameOrSignature: "anchors" | "deleteRRSet" | "deleteRRSetNSEC3" | "rrdata" | "submitRRSet" | "submitRRSets"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AlgorithmUpdated" | "DigestUpdated" | "NSEC3DigestUpdated" | "RRSetUpdated"): EventFragment;
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
    encodeFunctionData(functionFragment: "rrdata", values: [BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "submitRRSet", values: [DNSSEC.RRSetWithSignatureStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "submitRRSets", values: [DNSSEC.RRSetWithSignatureStruct[], BytesLike]): string;
    decodeFunctionResult(functionFragment: "anchors", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deleteRRSet", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deleteRRSetNSEC3", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rrdata", data: BytesLike): Result;
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
export interface DNSSEC extends BaseContract {
    connect(runner?: ContractRunner | null): DNSSEC;
    waitForDeployment(): Promise<this>;
    interface: DNSSECInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
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
    rrdata: TypedContractMethod<[
        dnstype: BigNumberish,
        name: BytesLike
    ], [
        [bigint, bigint, string]
    ], "view">;
    submitRRSet: TypedContractMethod<[
        input: DNSSEC.RRSetWithSignatureStruct,
        proof: BytesLike
    ], [
        string
    ], "nonpayable">;
    submitRRSets: TypedContractMethod<[
        input: DNSSEC.RRSetWithSignatureStruct[],
        proof: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
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
    getFunction(nameOrSignature: "rrdata"): TypedContractMethod<[
        dnstype: BigNumberish,
        name: BytesLike
    ], [
        [bigint, bigint, string]
    ], "view">;
    getFunction(nameOrSignature: "submitRRSet"): TypedContractMethod<[
        input: DNSSEC.RRSetWithSignatureStruct,
        proof: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "submitRRSets"): TypedContractMethod<[
        input: DNSSEC.RRSetWithSignatureStruct[],
        proof: BytesLike
    ], [
        string
    ], "nonpayable">;
    getEvent(key: "AlgorithmUpdated"): TypedContractEvent<AlgorithmUpdatedEvent.InputTuple, AlgorithmUpdatedEvent.OutputTuple, AlgorithmUpdatedEvent.OutputObject>;
    getEvent(key: "DigestUpdated"): TypedContractEvent<DigestUpdatedEvent.InputTuple, DigestUpdatedEvent.OutputTuple, DigestUpdatedEvent.OutputObject>;
    getEvent(key: "NSEC3DigestUpdated"): TypedContractEvent<NSEC3DigestUpdatedEvent.InputTuple, NSEC3DigestUpdatedEvent.OutputTuple, NSEC3DigestUpdatedEvent.OutputObject>;
    getEvent(key: "RRSetUpdated"): TypedContractEvent<RRSetUpdatedEvent.InputTuple, RRSetUpdatedEvent.OutputTuple, RRSetUpdatedEvent.OutputObject>;
    filters: {
        "AlgorithmUpdated(uint8,address)": TypedContractEvent<AlgorithmUpdatedEvent.InputTuple, AlgorithmUpdatedEvent.OutputTuple, AlgorithmUpdatedEvent.OutputObject>;
        AlgorithmUpdated: TypedContractEvent<AlgorithmUpdatedEvent.InputTuple, AlgorithmUpdatedEvent.OutputTuple, AlgorithmUpdatedEvent.OutputObject>;
        "DigestUpdated(uint8,address)": TypedContractEvent<DigestUpdatedEvent.InputTuple, DigestUpdatedEvent.OutputTuple, DigestUpdatedEvent.OutputObject>;
        DigestUpdated: TypedContractEvent<DigestUpdatedEvent.InputTuple, DigestUpdatedEvent.OutputTuple, DigestUpdatedEvent.OutputObject>;
        "NSEC3DigestUpdated(uint8,address)": TypedContractEvent<NSEC3DigestUpdatedEvent.InputTuple, NSEC3DigestUpdatedEvent.OutputTuple, NSEC3DigestUpdatedEvent.OutputObject>;
        NSEC3DigestUpdated: TypedContractEvent<NSEC3DigestUpdatedEvent.InputTuple, NSEC3DigestUpdatedEvent.OutputTuple, NSEC3DigestUpdatedEvent.OutputObject>;
        "RRSetUpdated(bytes,bytes)": TypedContractEvent<RRSetUpdatedEvent.InputTuple, RRSetUpdatedEvent.OutputTuple, RRSetUpdatedEvent.OutputObject>;
        RRSetUpdated: TypedContractEvent<RRSetUpdatedEvent.InputTuple, RRSetUpdatedEvent.OutputTuple, RRSetUpdatedEvent.OutputObject>;
    };
}
//# sourceMappingURL=DNSSEC.d.ts.map