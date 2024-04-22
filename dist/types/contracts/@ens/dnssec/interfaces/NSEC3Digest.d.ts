import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../../common";
export interface NSEC3DigestInterface extends Interface {
    getFunction(nameOrSignature: "hash"): FunctionFragment;
    encodeFunctionData(functionFragment: "hash", values: [BytesLike, BytesLike, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "hash", data: BytesLike): Result;
}
export interface NSEC3Digest extends BaseContract {
    connect(runner?: ContractRunner | null): NSEC3Digest;
    waitForDeployment(): Promise<this>;
    interface: NSEC3DigestInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    hash: TypedContractMethod<[
        salt: BytesLike,
        data: BytesLike,
        iterations: BigNumberish
    ], [
        string
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "hash"): TypedContractMethod<[
        salt: BytesLike,
        data: BytesLike,
        iterations: BigNumberish
    ], [
        string
    ], "view">;
    filters: {};
}
//# sourceMappingURL=NSEC3Digest.d.ts.map