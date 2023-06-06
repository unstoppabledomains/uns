import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface IExtendedResolverInterface extends utils.Interface {
    functions: {
        "resolve(bytes,bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "resolve"): FunctionFragment;
    encodeFunctionData(functionFragment: "resolve", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "resolve", data: BytesLike): Result;
    events: {};
}
export interface IExtendedResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IExtendedResolverInterface;
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
        resolve(name: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
    };
    resolve(name: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        resolve(name: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        resolve(name: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        resolve(name: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IExtendedResolver.d.ts.map