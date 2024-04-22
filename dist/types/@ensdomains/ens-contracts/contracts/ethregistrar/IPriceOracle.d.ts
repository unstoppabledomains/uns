import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
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
export interface IPriceOracleInterface extends Interface {
    getFunction(nameOrSignature: "price"): FunctionFragment;
    encodeFunctionData(functionFragment: "price", values: [string, BigNumberish, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "price", data: BytesLike): Result;
}
export interface IPriceOracle extends BaseContract {
    connect(runner?: ContractRunner | null): IPriceOracle;
    waitForDeployment(): Promise<this>;
    interface: IPriceOracleInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    price: TypedContractMethod<[
        name: string,
        expires: BigNumberish,
        duration: BigNumberish
    ], [
        IPriceOracle.PriceStructOutput
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "price"): TypedContractMethod<[
        name: string,
        expires: BigNumberish,
        duration: BigNumberish
    ], [
        IPriceOracle.PriceStructOutput
    ], "view">;
    filters: {};
}
//# sourceMappingURL=IPriceOracle.d.ts.map