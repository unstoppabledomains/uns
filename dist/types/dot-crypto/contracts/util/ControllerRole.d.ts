import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface ControllerRoleInterface extends Interface {
    getFunction(nameOrSignature: "addController" | "isController" | "renounceController"): FunctionFragment;
    encodeFunctionData(functionFragment: "addController", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "isController", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "renounceController", values?: undefined): string;
    decodeFunctionResult(functionFragment: "addController", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isController", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceController", data: BytesLike): Result;
}
export interface ControllerRole extends BaseContract {
    connect(runner?: ContractRunner | null): ControllerRole;
    waitForDeployment(): Promise<this>;
    interface: ControllerRoleInterface;
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
    isController: TypedContractMethod<[account: AddressLike], [boolean], "view">;
    renounceController: TypedContractMethod<[], [void], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addController"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "isController"): TypedContractMethod<[account: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "renounceController"): TypedContractMethod<[], [void], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=ControllerRole.d.ts.map