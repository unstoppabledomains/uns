import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../../../common";
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
export interface StablePriceOracleInterface extends Interface {
    getFunction(nameOrSignature: "premium" | "price" | "price1Letter" | "price2Letter" | "price3Letter" | "price4Letter" | "price5Letter" | "supportsInterface" | "usdOracle"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "RentPriceChanged"): EventFragment;
    encodeFunctionData(functionFragment: "premium", values: [string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "price", values: [string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "price1Letter", values?: undefined): string;
    encodeFunctionData(functionFragment: "price2Letter", values?: undefined): string;
    encodeFunctionData(functionFragment: "price3Letter", values?: undefined): string;
    encodeFunctionData(functionFragment: "price4Letter", values?: undefined): string;
    encodeFunctionData(functionFragment: "price5Letter", values?: undefined): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "usdOracle", values?: undefined): string;
    decodeFunctionResult(functionFragment: "premium", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "price", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "price1Letter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "price2Letter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "price3Letter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "price4Letter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "price5Letter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "usdOracle", data: BytesLike): Result;
}
export declare namespace RentPriceChangedEvent {
    type InputTuple = [prices: BigNumberish[]];
    type OutputTuple = [prices: bigint[]];
    interface OutputObject {
        prices: bigint[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface StablePriceOracle extends BaseContract {
    connect(runner?: ContractRunner | null): StablePriceOracle;
    waitForDeployment(): Promise<this>;
    interface: StablePriceOracleInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    premium: TypedContractMethod<[
        name: string,
        expires: BigNumberish,
        duration: BigNumberish
    ], [
        bigint
    ], "view">;
    price: TypedContractMethod<[
        name: string,
        expires: BigNumberish,
        duration: BigNumberish
    ], [
        IPriceOracle.PriceStructOutput
    ], "view">;
    price1Letter: TypedContractMethod<[], [bigint], "view">;
    price2Letter: TypedContractMethod<[], [bigint], "view">;
    price3Letter: TypedContractMethod<[], [bigint], "view">;
    price4Letter: TypedContractMethod<[], [bigint], "view">;
    price5Letter: TypedContractMethod<[], [bigint], "view">;
    supportsInterface: TypedContractMethod<[
        interfaceID: BytesLike
    ], [
        boolean
    ], "view">;
    usdOracle: TypedContractMethod<[], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "premium"): TypedContractMethod<[
        name: string,
        expires: BigNumberish,
        duration: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "price"): TypedContractMethod<[
        name: string,
        expires: BigNumberish,
        duration: BigNumberish
    ], [
        IPriceOracle.PriceStructOutput
    ], "view">;
    getFunction(nameOrSignature: "price1Letter"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "price2Letter"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "price3Letter"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "price4Letter"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "price5Letter"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceID: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "usdOracle"): TypedContractMethod<[], [string], "view">;
    getEvent(key: "RentPriceChanged"): TypedContractEvent<RentPriceChangedEvent.InputTuple, RentPriceChangedEvent.OutputTuple, RentPriceChangedEvent.OutputObject>;
    filters: {
        "RentPriceChanged(uint256[])": TypedContractEvent<RentPriceChangedEvent.InputTuple, RentPriceChangedEvent.OutputTuple, RentPriceChangedEvent.OutputObject>;
        RentPriceChanged: TypedContractEvent<RentPriceChangedEvent.InputTuple, RentPriceChangedEvent.OutputTuple, RentPriceChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=StablePriceOracle.d.ts.map