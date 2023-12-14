import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
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
export interface DNSSECImplInterface extends utils.Interface {
    functions: {
        "algorithms(uint8)": FunctionFragment;
        "anchors()": FunctionFragment;
        "deleteRRSet(uint16,bytes,(bytes,bytes),bytes)": FunctionFragment;
        "deleteRRSetNSEC3(uint16,bytes,(bytes,bytes),(bytes,bytes),bytes)": FunctionFragment;
        "digests(uint8)": FunctionFragment;
        "nsec3Digests(uint8)": FunctionFragment;
        "owner()": FunctionFragment;
        "rrdata(uint16,bytes)": FunctionFragment;
        "setAlgorithm(uint8,address)": FunctionFragment;
        "setDigest(uint8,address)": FunctionFragment;
        "setNSEC3Digest(uint8,address)": FunctionFragment;
        "setOwner(address)": FunctionFragment;
        "submitRRSet((bytes,bytes),bytes)": FunctionFragment;
        "submitRRSets((bytes,bytes)[],bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "algorithms" | "anchors" | "deleteRRSet" | "deleteRRSetNSEC3" | "digests" | "nsec3Digests" | "owner" | "rrdata" | "setAlgorithm" | "setDigest" | "setNSEC3Digest" | "setOwner" | "submitRRSet" | "submitRRSets"): FunctionFragment;
    encodeFunctionData(functionFragment: "algorithms", values: [PromiseOrValue<BigNumberish>]): string;
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
    encodeFunctionData(functionFragment: "digests", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "nsec3Digests", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "rrdata", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "setAlgorithm", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setDigest", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setNSEC3Digest", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setOwner", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "submitRRSet", values: [DNSSEC.RRSetWithSignatureStruct, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "submitRRSets", values: [DNSSEC.RRSetWithSignatureStruct[], PromiseOrValue<BytesLike>]): string;
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
    events: {
        "AlgorithmUpdated(uint8,address)": EventFragment;
        "DigestUpdated(uint8,address)": EventFragment;
        "Marker()": EventFragment;
        "NSEC3DigestUpdated(uint8,address)": EventFragment;
        "RRSetUpdated(bytes,bytes)": EventFragment;
        "Test(uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AlgorithmUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DigestUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Marker"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NSEC3DigestUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RRSetUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Test"): EventFragment;
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
export interface MarkerEventObject {
}
export declare type MarkerEvent = TypedEvent<[], MarkerEventObject>;
export declare type MarkerEventFilter = TypedEventFilter<MarkerEvent>;
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
export interface TestEventObject {
    t: BigNumber;
}
export declare type TestEvent = TypedEvent<[BigNumber], TestEventObject>;
export declare type TestEventFilter = TypedEventFilter<TestEvent>;
export interface DNSSECImpl extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: DNSSECImplInterface;
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
        algorithms(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        anchors(overrides?: CallOverrides): Promise<[string]>;
        deleteRRSet(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, nsec: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        deleteRRSetNSEC3(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, closestEncloser: DNSSEC.RRSetWithSignatureStruct, nextClosest: DNSSEC.RRSetWithSignatureStruct, dnskey: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        digests(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        nsec3Digests(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        rrdata(dnstype: PromiseOrValue<BigNumberish>, name: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[number, number, string]>;
        setAlgorithm(id: PromiseOrValue<BigNumberish>, algo: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setDigest(id: PromiseOrValue<BigNumberish>, digest: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setNSEC3Digest(id: PromiseOrValue<BigNumberish>, digest: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setOwner(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        submitRRSet(input: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        submitRRSets(input: DNSSEC.RRSetWithSignatureStruct[], _proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    algorithms(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    anchors(overrides?: CallOverrides): Promise<string>;
    deleteRRSet(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, nsec: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    deleteRRSetNSEC3(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, closestEncloser: DNSSEC.RRSetWithSignatureStruct, nextClosest: DNSSEC.RRSetWithSignatureStruct, dnskey: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    digests(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    nsec3Digests(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    rrdata(dnstype: PromiseOrValue<BigNumberish>, name: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[number, number, string]>;
    setAlgorithm(id: PromiseOrValue<BigNumberish>, algo: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setDigest(id: PromiseOrValue<BigNumberish>, digest: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setNSEC3Digest(id: PromiseOrValue<BigNumberish>, digest: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setOwner(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    submitRRSet(input: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    submitRRSets(input: DNSSEC.RRSetWithSignatureStruct[], _proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        algorithms(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        anchors(overrides?: CallOverrides): Promise<string>;
        deleteRRSet(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, nsec: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        deleteRRSetNSEC3(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, closestEncloser: DNSSEC.RRSetWithSignatureStruct, nextClosest: DNSSEC.RRSetWithSignatureStruct, dnskey: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        digests(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        nsec3Digests(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        rrdata(dnstype: PromiseOrValue<BigNumberish>, name: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[number, number, string]>;
        setAlgorithm(id: PromiseOrValue<BigNumberish>, algo: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setDigest(id: PromiseOrValue<BigNumberish>, digest: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setNSEC3Digest(id: PromiseOrValue<BigNumberish>, digest: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setOwner(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        submitRRSet(input: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        submitRRSets(input: DNSSEC.RRSetWithSignatureStruct[], _proof: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "AlgorithmUpdated(uint8,address)"(id?: null, addr?: null): AlgorithmUpdatedEventFilter;
        AlgorithmUpdated(id?: null, addr?: null): AlgorithmUpdatedEventFilter;
        "DigestUpdated(uint8,address)"(id?: null, addr?: null): DigestUpdatedEventFilter;
        DigestUpdated(id?: null, addr?: null): DigestUpdatedEventFilter;
        "Marker()"(): MarkerEventFilter;
        Marker(): MarkerEventFilter;
        "NSEC3DigestUpdated(uint8,address)"(id?: null, addr?: null): NSEC3DigestUpdatedEventFilter;
        NSEC3DigestUpdated(id?: null, addr?: null): NSEC3DigestUpdatedEventFilter;
        "RRSetUpdated(bytes,bytes)"(name?: null, rrset?: null): RRSetUpdatedEventFilter;
        RRSetUpdated(name?: null, rrset?: null): RRSetUpdatedEventFilter;
        "Test(uint256)"(t?: null): TestEventFilter;
        Test(t?: null): TestEventFilter;
    };
    estimateGas: {
        algorithms(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        anchors(overrides?: CallOverrides): Promise<BigNumber>;
        deleteRRSet(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, nsec: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        deleteRRSetNSEC3(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, closestEncloser: DNSSEC.RRSetWithSignatureStruct, nextClosest: DNSSEC.RRSetWithSignatureStruct, dnskey: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        digests(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        nsec3Digests(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        rrdata(dnstype: PromiseOrValue<BigNumberish>, name: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        setAlgorithm(id: PromiseOrValue<BigNumberish>, algo: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setDigest(id: PromiseOrValue<BigNumberish>, digest: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setNSEC3Digest(id: PromiseOrValue<BigNumberish>, digest: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setOwner(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        submitRRSet(input: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        submitRRSets(input: DNSSEC.RRSetWithSignatureStruct[], _proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        algorithms(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        anchors(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        deleteRRSet(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, nsec: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        deleteRRSetNSEC3(deleteType: PromiseOrValue<BigNumberish>, deleteName: PromiseOrValue<BytesLike>, closestEncloser: DNSSEC.RRSetWithSignatureStruct, nextClosest: DNSSEC.RRSetWithSignatureStruct, dnskey: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        digests(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nsec3Digests(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        rrdata(dnstype: PromiseOrValue<BigNumberish>, name: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setAlgorithm(id: PromiseOrValue<BigNumberish>, algo: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setDigest(id: PromiseOrValue<BigNumberish>, digest: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setNSEC3Digest(id: PromiseOrValue<BigNumberish>, digest: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setOwner(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        submitRRSet(input: DNSSEC.RRSetWithSignatureStruct, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        submitRRSets(input: DNSSEC.RRSetWithSignatureStruct[], _proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=DNSSECImpl.d.ts.map