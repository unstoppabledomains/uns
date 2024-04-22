import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../../common";
export interface ITokenPredicateInterface extends Interface {
    getFunction(nameOrSignature: "exitTokens" | "lockTokens"): FunctionFragment;
    encodeFunctionData(functionFragment: "exitTokens", values: [AddressLike, AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "lockTokens", values: [AddressLike, AddressLike, AddressLike, BytesLike]): string;
    decodeFunctionResult(functionFragment: "exitTokens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockTokens", data: BytesLike): Result;
}
export interface ITokenPredicate extends BaseContract {
    connect(runner?: ContractRunner | null): ITokenPredicate;
    waitForDeployment(): Promise<this>;
    interface: ITokenPredicateInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    exitTokens: TypedContractMethod<[
        sender: AddressLike,
        rootToken: AddressLike,
        logRLPList: BytesLike
    ], [
        void
    ], "nonpayable">;
    lockTokens: TypedContractMethod<[
        depositor: AddressLike,
        depositReceiver: AddressLike,
        rootToken: AddressLike,
        depositData: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "exitTokens"): TypedContractMethod<[
        sender: AddressLike,
        rootToken: AddressLike,
        logRLPList: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "lockTokens"): TypedContractMethod<[
        depositor: AddressLike,
        depositReceiver: AddressLike,
        rootToken: AddressLike,
        depositData: BytesLike
    ], [
        void
    ], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=ITokenPredicate.d.ts.map