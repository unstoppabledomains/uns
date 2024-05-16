import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../../common";
export declare namespace IPriceOracle {
    type PriceStruct = {
        base: BigNumberish;
        premium: BigNumberish;
    };
    type PriceStructOutput = [base: bigint, premium: bigint] & {
        base: bigint;
        premium: bigint;
    };
}
export interface IETHRegistrarControllerInterface extends Interface {
    getFunction(nameOrSignature: "available" | "commit" | "makeCommitment" | "register" | "renew" | "rentPrice"): FunctionFragment;
    encodeFunctionData(functionFragment: "available", values: [string]): string;
    encodeFunctionData(functionFragment: "commit", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "makeCommitment", values: [
        string,
        AddressLike,
        BigNumberish,
        BytesLike,
        AddressLike,
        BytesLike[],
        boolean,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "register", values: [
        string,
        AddressLike,
        BigNumberish,
        BytesLike,
        AddressLike,
        BytesLike[],
        boolean,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "renew", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "rentPrice", values: [string, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "available", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "commit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "makeCommitment", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renew", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rentPrice", data: BytesLike): Result;
}
export interface IETHRegistrarController extends BaseContract {
    connect(runner?: ContractRunner | null): IETHRegistrarController;
    waitForDeployment(): Promise<this>;
    interface: IETHRegistrarControllerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    available: TypedContractMethod<[arg0: string], [boolean], "nonpayable">;
    commit: TypedContractMethod<[arg0: BytesLike], [void], "nonpayable">;
    makeCommitment: TypedContractMethod<[
        arg0: string,
        arg1: AddressLike,
        arg2: BigNumberish,
        arg3: BytesLike,
        arg4: AddressLike,
        arg5: BytesLike[],
        arg6: boolean,
        arg7: BigNumberish
    ], [
        string
    ], "view">;
    register: TypedContractMethod<[
        arg0: string,
        arg1: AddressLike,
        arg2: BigNumberish,
        arg3: BytesLike,
        arg4: AddressLike,
        arg5: BytesLike[],
        arg6: boolean,
        arg7: BigNumberish
    ], [
        void
    ], "payable">;
    renew: TypedContractMethod<[
        arg0: string,
        arg1: BigNumberish
    ], [
        void
    ], "payable">;
    rentPrice: TypedContractMethod<[
        arg0: string,
        arg1: BigNumberish
    ], [
        IPriceOracle.PriceStructOutput
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "available"): TypedContractMethod<[arg0: string], [boolean], "nonpayable">;
    getFunction(nameOrSignature: "commit"): TypedContractMethod<[arg0: BytesLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "makeCommitment"): TypedContractMethod<[
        arg0: string,
        arg1: AddressLike,
        arg2: BigNumberish,
        arg3: BytesLike,
        arg4: AddressLike,
        arg5: BytesLike[],
        arg6: boolean,
        arg7: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "register"): TypedContractMethod<[
        arg0: string,
        arg1: AddressLike,
        arg2: BigNumberish,
        arg3: BytesLike,
        arg4: AddressLike,
        arg5: BytesLike[],
        arg6: boolean,
        arg7: BigNumberish
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "renew"): TypedContractMethod<[arg0: string, arg1: BigNumberish], [void], "payable">;
    getFunction(nameOrSignature: "rentPrice"): TypedContractMethod<[
        arg0: string,
        arg1: BigNumberish
    ], [
        IPriceOracle.PriceStructOutput
    ], "view">;
    filters: {};
}
//# sourceMappingURL=IETHRegistrarController.d.ts.map