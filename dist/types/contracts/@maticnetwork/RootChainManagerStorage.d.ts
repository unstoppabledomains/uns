import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface RootChainManagerStorageInterface extends utils.Interface {
    functions: {
        "tokenToType(address)": FunctionFragment;
        "typeToPredicate(bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "tokenToType" | "typeToPredicate"): FunctionFragment;
    encodeFunctionData(functionFragment: "tokenToType", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "typeToPredicate", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "tokenToType", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "typeToPredicate", data: BytesLike): Result;
    events: {};
}
export interface RootChainManagerStorage extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: RootChainManagerStorageInterface;
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
        tokenToType(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;
        typeToPredicate(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
    };
    tokenToType(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    typeToPredicate(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        tokenToType(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        typeToPredicate(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        tokenToType(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        typeToPredicate(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        tokenToType(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        typeToPredicate(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=RootChainManagerStorage.d.ts.map