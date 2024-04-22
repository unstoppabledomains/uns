import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
export declare namespace IForwarder {
    type ForwardRequestStruct = {
        from: AddressLike;
        nonce: BigNumberish;
        tokenId: BigNumberish;
        data: BytesLike;
    };
    type ForwardRequestStructOutput = [
        from: string,
        nonce: bigint,
        tokenId: bigint,
        data: string
    ] & {
        from: string;
        nonce: bigint;
        tokenId: bigint;
        data: string;
    };
}
export interface BaseRoutingForwarderMockInterface extends Interface {
    getFunction(nameOrSignature: "buildRouteData" | "execute" | "nonceOf" | "putString" | "putStringFor" | "putUint" | "putUintArr" | "putUintArrFor" | "putUintFor" | "verify"): FunctionFragment;
    encodeFunctionData(functionFragment: "buildRouteData", values: [IForwarder.ForwardRequestStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "execute", values: [IForwarder.ForwardRequestStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "putString", values: [string]): string;
    encodeFunctionData(functionFragment: "putStringFor", values: [string, BytesLike]): string;
    encodeFunctionData(functionFragment: "putUint", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "putUintArr", values: [BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "putUintArrFor", values: [BigNumberish[], BytesLike]): string;
    encodeFunctionData(functionFragment: "putUintFor", values: [BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "verify", values: [IForwarder.ForwardRequestStruct, BytesLike]): string;
    decodeFunctionResult(functionFragment: "buildRouteData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "putString", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "putStringFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "putUint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "putUintArr", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "putUintArrFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "putUintFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
}
export interface BaseRoutingForwarderMock extends BaseContract {
    connect(runner?: ContractRunner | null): BaseRoutingForwarderMock;
    waitForDeployment(): Promise<this>;
    interface: BaseRoutingForwarderMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    buildRouteData: TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        string
    ], "view">;
    execute: TypedContractMethod<[
        arg0: IForwarder.ForwardRequestStruct,
        arg1: BytesLike
    ], [
        string
    ], "view">;
    nonceOf: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    putString: TypedContractMethod<[arg0: string], [void], "view">;
    putStringFor: TypedContractMethod<[
        arg0: string,
        arg1: BytesLike
    ], [
        void
    ], "view">;
    putUint: TypedContractMethod<[arg0: BigNumberish], [void], "view">;
    putUintArr: TypedContractMethod<[arg0: BigNumberish[]], [void], "view">;
    putUintArrFor: TypedContractMethod<[
        arg0: BigNumberish[],
        arg1: BytesLike
    ], [
        void
    ], "view">;
    putUintFor: TypedContractMethod<[
        arg0: BigNumberish,
        arg1: BytesLike
    ], [
        void
    ], "view">;
    verify: TypedContractMethod<[
        arg0: IForwarder.ForwardRequestStruct,
        arg1: BytesLike
    ], [
        boolean
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "buildRouteData"): TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "execute"): TypedContractMethod<[
        arg0: IForwarder.ForwardRequestStruct,
        arg1: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "nonceOf"): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "putString"): TypedContractMethod<[arg0: string], [void], "view">;
    getFunction(nameOrSignature: "putStringFor"): TypedContractMethod<[arg0: string, arg1: BytesLike], [void], "view">;
    getFunction(nameOrSignature: "putUint"): TypedContractMethod<[arg0: BigNumberish], [void], "view">;
    getFunction(nameOrSignature: "putUintArr"): TypedContractMethod<[arg0: BigNumberish[]], [void], "view">;
    getFunction(nameOrSignature: "putUintArrFor"): TypedContractMethod<[
        arg0: BigNumberish[],
        arg1: BytesLike
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "putUintFor"): TypedContractMethod<[arg0: BigNumberish, arg1: BytesLike], [void], "view">;
    getFunction(nameOrSignature: "verify"): TypedContractMethod<[
        arg0: IForwarder.ForwardRequestStruct,
        arg1: BytesLike
    ], [
        boolean
    ], "view">;
    filters: {};
}
//# sourceMappingURL=BaseRoutingForwarderMock.d.ts.map