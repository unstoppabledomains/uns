import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
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
export interface DNSRegistrarInterface extends Interface {
    getFunction(nameOrSignature: "claim" | "ens" | "oracle" | "proveAndClaim" | "proveAndClaimWithResolver" | "setOracle" | "setPublicSuffixList" | "suffixes" | "supportsInterface"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Claim" | "NewOracle" | "NewPublicSuffixList"): EventFragment;
    encodeFunctionData(functionFragment: "claim", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "ens", values?: undefined): string;
    encodeFunctionData(functionFragment: "oracle", values?: undefined): string;
    encodeFunctionData(functionFragment: "proveAndClaim", values: [BytesLike, DNSSEC.RRSetWithSignatureStruct[], BytesLike]): string;
    encodeFunctionData(functionFragment: "proveAndClaimWithResolver", values: [
        BytesLike,
        DNSSEC.RRSetWithSignatureStruct[],
        BytesLike,
        AddressLike,
        AddressLike
    ]): string;
    encodeFunctionData(functionFragment: "setOracle", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setPublicSuffixList", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "suffixes", values?: undefined): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "oracle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proveAndClaim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proveAndClaimWithResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOracle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPublicSuffixList", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "suffixes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
}
export declare namespace ClaimEvent {
    type InputTuple = [
        node: BytesLike,
        owner: AddressLike,
        dnsname: BytesLike
    ];
    type OutputTuple = [node: string, owner: string, dnsname: string];
    interface OutputObject {
        node: string;
        owner: string;
        dnsname: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NewOracleEvent {
    type InputTuple = [oracle: AddressLike];
    type OutputTuple = [oracle: string];
    interface OutputObject {
        oracle: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NewPublicSuffixListEvent {
    type InputTuple = [suffixes: AddressLike];
    type OutputTuple = [suffixes: string];
    interface OutputObject {
        suffixes: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface DNSRegistrar extends BaseContract {
    connect(runner?: ContractRunner | null): DNSRegistrar;
    waitForDeployment(): Promise<this>;
    interface: DNSRegistrarInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    claim: TypedContractMethod<[
        name: BytesLike,
        proof: BytesLike
    ], [
        void
    ], "nonpayable">;
    ens: TypedContractMethod<[], [string], "view">;
    oracle: TypedContractMethod<[], [string], "view">;
    proveAndClaim: TypedContractMethod<[
        name: BytesLike,
        input: DNSSEC.RRSetWithSignatureStruct[],
        proof: BytesLike
    ], [
        void
    ], "nonpayable">;
    proveAndClaimWithResolver: TypedContractMethod<[
        name: BytesLike,
        input: DNSSEC.RRSetWithSignatureStruct[],
        proof: BytesLike,
        resolver: AddressLike,
        addr: AddressLike
    ], [
        void
    ], "nonpayable">;
    setOracle: TypedContractMethod<[_dnssec: AddressLike], [void], "nonpayable">;
    setPublicSuffixList: TypedContractMethod<[
        _suffixes: AddressLike
    ], [
        void
    ], "nonpayable">;
    suffixes: TypedContractMethod<[], [string], "view">;
    supportsInterface: TypedContractMethod<[
        interfaceID: BytesLike
    ], [
        boolean
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "claim"): TypedContractMethod<[
        name: BytesLike,
        proof: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "ens"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "oracle"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "proveAndClaim"): TypedContractMethod<[
        name: BytesLike,
        input: DNSSEC.RRSetWithSignatureStruct[],
        proof: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "proveAndClaimWithResolver"): TypedContractMethod<[
        name: BytesLike,
        input: DNSSEC.RRSetWithSignatureStruct[],
        proof: BytesLike,
        resolver: AddressLike,
        addr: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setOracle"): TypedContractMethod<[_dnssec: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "setPublicSuffixList"): TypedContractMethod<[_suffixes: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "suffixes"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceID: BytesLike], [boolean], "view">;
    getEvent(key: "Claim"): TypedContractEvent<ClaimEvent.InputTuple, ClaimEvent.OutputTuple, ClaimEvent.OutputObject>;
    getEvent(key: "NewOracle"): TypedContractEvent<NewOracleEvent.InputTuple, NewOracleEvent.OutputTuple, NewOracleEvent.OutputObject>;
    getEvent(key: "NewPublicSuffixList"): TypedContractEvent<NewPublicSuffixListEvent.InputTuple, NewPublicSuffixListEvent.OutputTuple, NewPublicSuffixListEvent.OutputObject>;
    filters: {
        "Claim(bytes32,address,bytes)": TypedContractEvent<ClaimEvent.InputTuple, ClaimEvent.OutputTuple, ClaimEvent.OutputObject>;
        Claim: TypedContractEvent<ClaimEvent.InputTuple, ClaimEvent.OutputTuple, ClaimEvent.OutputObject>;
        "NewOracle(address)": TypedContractEvent<NewOracleEvent.InputTuple, NewOracleEvent.OutputTuple, NewOracleEvent.OutputObject>;
        NewOracle: TypedContractEvent<NewOracleEvent.InputTuple, NewOracleEvent.OutputTuple, NewOracleEvent.OutputObject>;
        "NewPublicSuffixList(address)": TypedContractEvent<NewPublicSuffixListEvent.InputTuple, NewPublicSuffixListEvent.OutputTuple, NewPublicSuffixListEvent.OutputObject>;
        NewPublicSuffixList: TypedContractEvent<NewPublicSuffixListEvent.InputTuple, NewPublicSuffixListEvent.OutputTuple, NewPublicSuffixListEvent.OutputObject>;
    };
}
//# sourceMappingURL=DNSRegistrar.d.ts.map