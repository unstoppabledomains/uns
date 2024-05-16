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
export interface BaseForwarderInterface extends Interface {
    getFunction(nameOrSignature: "execute" | "nonceOf" | "verify"): FunctionFragment;
    encodeFunctionData(functionFragment: "execute", values: [IForwarder.ForwardRequestStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "verify", values: [IForwarder.ForwardRequestStruct, BytesLike]): string;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
}
export interface BaseForwarder extends BaseContract {
    connect(runner?: ContractRunner | null): BaseForwarder;
    waitForDeployment(): Promise<this>;
    interface: BaseForwarderInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    execute: TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        string
    ], "nonpayable">;
    nonceOf: TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    verify: TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        boolean
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "execute"): TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "nonceOf"): TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "verify"): TypedContractMethod<[
        req: IForwarder.ForwardRequestStruct,
        signature: BytesLike
    ], [
        boolean
    ], "view">;
    filters: {};
}
//# sourceMappingURL=BaseForwarder.d.ts.map