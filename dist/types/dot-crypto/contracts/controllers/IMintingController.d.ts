import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface IMintingControllerInterface extends Interface {
    getFunction(nameOrSignature: "mintSLD" | "safeMintSLD(address,string)" | "safeMintSLD(address,string,bytes)"): FunctionFragment;
    encodeFunctionData(functionFragment: "mintSLD", values: [AddressLike, string]): string;
    encodeFunctionData(functionFragment: "safeMintSLD(address,string)", values: [AddressLike, string]): string;
    encodeFunctionData(functionFragment: "safeMintSLD(address,string,bytes)", values: [AddressLike, string, BytesLike]): string;
    decodeFunctionResult(functionFragment: "mintSLD", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLD(address,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLD(address,string,bytes)", data: BytesLike): Result;
}
export interface IMintingController extends BaseContract {
    connect(runner?: ContractRunner | null): IMintingController;
    waitForDeployment(): Promise<this>;
    interface: IMintingControllerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    mintSLD: TypedContractMethod<[
        to: AddressLike,
        label: string
    ], [
        void
    ], "nonpayable">;
    "safeMintSLD(address,string)": TypedContractMethod<[
        to: AddressLike,
        label: string
    ], [
        void
    ], "nonpayable">;
    "safeMintSLD(address,string,bytes)": TypedContractMethod<[
        to: AddressLike,
        label: string,
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "mintSLD"): TypedContractMethod<[
        to: AddressLike,
        label: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeMintSLD(address,string)"): TypedContractMethod<[
        to: AddressLike,
        label: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeMintSLD(address,string,bytes)"): TypedContractMethod<[
        to: AddressLike,
        label: string,
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=IMintingController.d.ts.map