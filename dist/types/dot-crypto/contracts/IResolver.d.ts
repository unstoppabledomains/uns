import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
export interface IResolverInterface extends Interface {
    getFunction(nameOrSignature: "preconfigure" | "reconfigure" | "reset" | "set" | "setMany"): FunctionFragment;
    encodeFunctionData(functionFragment: "preconfigure", values: [string[], string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "reconfigure", values: [string[], string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "reset", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "set", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setMany", values: [string[], string[], BigNumberish]): string;
    decodeFunctionResult(functionFragment: "preconfigure", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reconfigure", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "set", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMany", data: BytesLike): Result;
}
export interface IResolver extends BaseContract {
    connect(runner?: ContractRunner | null): IResolver;
    waitForDeployment(): Promise<this>;
    interface: IResolverInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    preconfigure: TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    reconfigure: TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    reset: TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    set: TypedContractMethod<[
        key: string,
        value: string,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setMany: TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "preconfigure"): TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "reconfigure"): TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "reset"): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "set"): TypedContractMethod<[
        key: string,
        value: string,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setMany"): TypedContractMethod<[
        keys: string[],
        values: string[],
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=IResolver.d.ts.map