import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface FreeMinterInterface extends Interface {
    getFunction(nameOrSignature: "NAME" | "VERSION" | "claim" | "claimTo" | "claimToWithRecords"): FunctionFragment;
    encodeFunctionData(functionFragment: "NAME", values?: undefined): string;
    encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "claim", values: [string]): string;
    encodeFunctionData(functionFragment: "claimTo", values: [string, AddressLike]): string;
    encodeFunctionData(functionFragment: "claimToWithRecords", values: [string, AddressLike, string[], string[]]): string;
    decodeFunctionResult(functionFragment: "NAME", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimToWithRecords", data: BytesLike): Result;
}
export interface FreeMinter extends BaseContract {
    connect(runner?: ContractRunner | null): FreeMinter;
    waitForDeployment(): Promise<this>;
    interface: FreeMinterInterface;
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
    claim: TypedContractMethod<[label: string], [void], "nonpayable">;
    claimTo: TypedContractMethod<[
        label: string,
        receiver: AddressLike
    ], [
        void
    ], "nonpayable">;
    claimToWithRecords: TypedContractMethod<[
        label: string,
        receiver: AddressLike,
        keys: string[],
        values: string[]
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "NAME"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "VERSION"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "claim"): TypedContractMethod<[label: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "claimTo"): TypedContractMethod<[
        label: string,
        receiver: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "claimToWithRecords"): TypedContractMethod<[
        label: string,
        receiver: AddressLike,
        keys: string[],
        values: string[]
    ], [
        void
    ], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=FreeMinter.d.ts.map