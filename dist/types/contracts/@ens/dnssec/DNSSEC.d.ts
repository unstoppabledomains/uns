import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../common";
export declare namespace DNSSEC {
    type RRSetWithSignatureStruct = {
        rrset: PromiseOrValue<BytesLike>;
        sig: PromiseOrValue<BytesLike>;
    };
    type RRSetWithSignatureStructOutput = [string, string] & {
        rrset: string;
        sig: string;
    };
}
export interface DNSSECInterface extends utils.Interface {
    functions: {
        "anchors()": FunctionFragment;
        "deleteRRSet(uint16,bytes,(bytes,bytes),bytes)": FunctionFragment;
        "deleteRRSetNSEC3(uint16,bytes,(bytes,bytes),(bytes,bytes),bytes)": FunctionFragment;
        "rrdata(uint16,bytes)": FunctionFragment;
        "submitRRSet((bytes,bytes),bytes)": FunctionFragment;
        "submitRRSets((bytes,bytes)[],bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "anchors" | "deleteRRSet" | "deleteRRSetNSEC3" | "rrdata" | "submitRRSet" | "submitRRSets"): FunctionFragment;
    encodeFunctionData(functionFragment: "anchors", values?: undefined): string;
    encodeFunctionData(functionFragment: "deleteRRSet", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        DNSSEC.RRSetWithSignatureStruct,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "deleteRRSetNSEC3", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        DNSSEC.RRSetWithSignatureStruct,
        DNSSEC.RRSetWithSignatureStruct,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "rrdata", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "submitRRSet", values: [DNSSEC.RRSetWithSignatureStruct, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "submitRRSets", values: [DNSSEC.RRSetWithSignatureStruct[], PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "anchors", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deleteRRSet", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deleteRRSetNSEC3", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rrdata", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitRRSet", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitRRSets", data: BytesLike): Result;
    events: {
        "AlgorithmUpdated(uint8,address)": EventFragment;
        "DigestUpdated(uint8,address)": EventFragment;
        "NSEC3DigestUpdated(uint8,address)": EventFragment;
        "RRSetUpdated(bytes,bytes)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AlgorithmUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DigestUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NSEC3DigestUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RRSetUpdated"): EventFragment;
}
export interface AlgorithmUpdatedEventObject {
    id: number;
    addr: string;
}
export declare type AlgorithmUpdatedEvent = TypedEvent<[
    number,
    string
], AlgorithmUpdatedEventObject>;
export declare type AlgorithmUpdatedEventFilter = TypedEventFilter<AlgorithmUpdatedEvent>;
export interface DigestUpdatedEventObject {
    id: number;
    addr: string;
}
export declare type DigestUpdatedEvent = TypedEvent<[
    number,
    string
], DigestUpdatedEventObject>;
export declare type DigestUpdatedEventFilter = TypedEventFilter<DigestUpdatedEvent>;
export interface NSEC3DigestUpdatedEventObject {
    id: number;
    addr: string;
}
export declare type NSEC3DigestUpdatedEvent = TypedEvent<[
    number,
    string
], NSEC3DigestUpdatedEventObject>;
export declare type NSEC3DigestUpdatedEventFilter = TypedEventFilter<NSEC3DigestUpdatedEvent>;
export interface RRSetUpdatedEventObject {
    name: string;
    rrset: string;
}
export declare type RRSetUpdatedEvent = TypedEvent<[
    string,
    string
], RRSetUpdatedEventObject>;
export declare type RRSetUpdatedEventFilter = TypedEventFilter<RRSetUpdatedEvent>;
export interface DNSSEC extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: DNSSECInterface;
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
        anchors(overrides?: CallOverrides): Promise<[string]>;
        deleteRRSet(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, nsec: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        deleteRRSetNSEC3(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, closestEncloser: DNSSEC.RRSetWithSignatureStruct, nextClosest: DNSSEC.RRSetWithSignatureStruct, dnskey: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        rrdata(dnstype: PromiseOrValue<BigNumberish>, name: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[number, number, string]>;
        submitRRSet(input: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        submitRRSets(input: DNSSEC.RRSetWithSignatureStruct[], proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    anchors(overrides?: CallOverrides): Promise<string>;
    deleteRRSet(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, nsec: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    deleteRRSetNSEC3(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, closestEncloser: DNSSEC.RRSetWithSignatureStruct, nextClosest: DNSSEC.RRSetWithSignatureStruct, dnskey: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    rrdata(dnstype: PromiseOrValue<BigNumberish>, name: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[number, number, string]>;
    submitRRSet(input: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    submitRRSets(input: DNSSEC.RRSetWithSignatureStruct[], proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        anchors(overrides?: CallOverrides): Promise<string>;
        deleteRRSet(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, nsec: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        deleteRRSetNSEC3(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, closestEncloser: DNSSEC.RRSetWithSignatureStruct, nextClosest: DNSSEC.RRSetWithSignatureStruct, dnskey: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        rrdata(dnstype: PromiseOrValue<BigNumberish>, name: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[number, number, string]>;
        submitRRSet(input: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        submitRRSets(input: DNSSEC.RRSetWithSignatureStruct[], proof: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "AlgorithmUpdated(uint8,address)"(id?: null, addr?: null): AlgorithmUpdatedEventFilter;
        AlgorithmUpdated(id?: null, addr?: null): AlgorithmUpdatedEventFilter;
        "DigestUpdated(uint8,address)"(id?: null, addr?: null): DigestUpdatedEventFilter;
        DigestUpdated(id?: null, addr?: null): DigestUpdatedEventFilter;
        "NSEC3DigestUpdated(uint8,address)"(id?: null, addr?: null): NSEC3DigestUpdatedEventFilter;
        NSEC3DigestUpdated(id?: null, addr?: null): NSEC3DigestUpdatedEventFilter;
        "RRSetUpdated(bytes,bytes)"(name?: null, rrset?: null): RRSetUpdatedEventFilter;
        RRSetUpdated(name?: null, rrset?: null): RRSetUpdatedEventFilter;
    };
    estimateGas: {
        anchors(overrides?: CallOverrides): Promise<BigNumber>;
        deleteRRSet(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, nsec: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        deleteRRSetNSEC3(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, closestEncloser: DNSSEC.RRSetWithSignatureStruct, nextClosest: DNSSEC.RRSetWithSignatureStruct, dnskey: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        rrdata(dnstype: PromiseOrValue<BigNumberish>, name: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        submitRRSet(input: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        submitRRSets(input: DNSSEC.RRSetWithSignatureStruct[], proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        anchors(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        deleteRRSet(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, nsec: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        deleteRRSetNSEC3(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, closestEncloser: DNSSEC.RRSetWithSignatureStruct, nextClosest: DNSSEC.RRSetWithSignatureStruct, dnskey: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        rrdata(dnstype: PromiseOrValue<BigNumberish>, name: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        submitRRSet(input: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        submitRRSets(input: DNSSEC.RRSetWithSignatureStruct[], proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=DNSSEC.d.ts.map