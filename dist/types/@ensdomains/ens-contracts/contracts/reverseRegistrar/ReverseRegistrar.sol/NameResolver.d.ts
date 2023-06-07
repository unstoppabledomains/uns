import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface NameResolverInterface extends utils.Interface {
    functions: {
        "setName(bytes32,string)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "setName"): FunctionFragment;
    encodeFunctionData(functionFragment: "setName", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "setName", data: BytesLike): Result;
    events: {};
}
export interface NameResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: NameResolverInterface;
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
        setName(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    setName(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        setName(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        setName(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        setName(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=NameResolver.d.ts.map