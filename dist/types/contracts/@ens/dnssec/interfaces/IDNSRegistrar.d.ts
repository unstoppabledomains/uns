import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../../common";
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
export interface IDNSRegistrarInterface extends Interface {
    getFunction(nameOrSignature: "claim" | "proveAndClaim" | "proveAndClaimWithResolver"): FunctionFragment;
    encodeFunctionData(functionFragment: "claim", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "proveAndClaim", values: [BytesLike, DNSSEC.RRSetWithSignatureStruct[], BytesLike]): string;
    encodeFunctionData(functionFragment: "proveAndClaimWithResolver", values: [
        BytesLike,
        DNSSEC.RRSetWithSignatureStruct[],
        BytesLike,
        AddressLike,
        AddressLike
    ]): string;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proveAndClaim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proveAndClaimWithResolver", data: BytesLike): Result;
}
export interface IDNSRegistrar extends BaseContract {
    connect(runner?: ContractRunner | null): IDNSRegistrar;
    waitForDeployment(): Promise<this>;
    interface: IDNSRegistrarInterface;
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
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "claim"): TypedContractMethod<[
        name: BytesLike,
        proof: BytesLike
    ], [
        void
    ], "nonpayable">;
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
    filters: {};
}
//# sourceMappingURL=IDNSRegistrar.d.ts.map