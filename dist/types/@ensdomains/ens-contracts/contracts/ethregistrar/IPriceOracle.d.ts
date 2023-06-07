import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
export declare namespace IPriceOracle {
    type PriceStruct = {
        base: PromiseOrValue<BigNumberish>;
        premium: PromiseOrValue<BigNumberish>;
    };
    type PriceStructOutput = [BigNumber, BigNumber] & {
        base: BigNumber;
        premium: BigNumber;
    };
}
export interface IPriceOracleInterface extends utils.Interface {
    functions: {
        "price(string,uint256,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "price"): FunctionFragment;
    encodeFunctionData(functionFragment: "price", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    decodeFunctionResult(functionFragment: "price", data: BytesLike): Result;
    events: {};
}
export interface IPriceOracle extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IPriceOracleInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        price(name: PromiseOrValue<string>, expires: PromiseOrValue<BigNumberish>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[IPriceOracle.PriceStructOutput]>;
    };
    price(name: PromiseOrValue<string>, expires: PromiseOrValue<BigNumberish>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<IPriceOracle.PriceStructOutput>;
    callStatic: {
        price(name: PromiseOrValue<string>, expires: PromiseOrValue<BigNumberish>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<IPriceOracle.PriceStructOutput>;
    };
    filters: {};
    estimateGas: {
        price(name: PromiseOrValue<string>, expires: PromiseOrValue<BigNumberish>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        price(name: PromiseOrValue<string>, expires: PromiseOrValue<BigNumberish>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IPriceOracle.d.ts.map