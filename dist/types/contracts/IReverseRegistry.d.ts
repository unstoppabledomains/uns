import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface IReverseRegistryInterface extends utils.Interface {
    functions: {
        "removeReverse()": FunctionFragment;
        "reverseOf(address)": FunctionFragment;
        "setReverse(uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "removeReverse" | "reverseOf" | "setReverse"): FunctionFragment;
    encodeFunctionData(functionFragment: "removeReverse", values?: undefined): string;
    encodeFunctionData(functionFragment: "reverseOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setReverse", values: [PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "removeReverse", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reverseOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setReverse", data: BytesLike): Result;
    events: {
        "RemoveReverse(address)": EventFragment;
        "SetReverse(address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "RemoveReverse"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetReverse"): EventFragment;
}
export interface RemoveReverseEventObject {
    addr: string;
}
export declare type RemoveReverseEvent = TypedEvent<[string], RemoveReverseEventObject>;
export declare type RemoveReverseEventFilter = TypedEventFilter<RemoveReverseEvent>;
export interface SetReverseEventObject {
    addr: string;
    tokenId: BigNumber;
}
export declare type SetReverseEvent = TypedEvent<[
    string,
    BigNumber
], SetReverseEventObject>;
export declare type SetReverseEventFilter = TypedEventFilter<SetReverseEvent>;
export interface IReverseRegistry extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IReverseRegistryInterface;
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
        removeReverse(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        reverseOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        setReverse(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    removeReverse(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    reverseOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    setReverse(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        removeReverse(overrides?: CallOverrides): Promise<void>;
        reverseOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        setReverse(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "RemoveReverse(address)"(addr?: PromiseOrValue<string> | null): RemoveReverseEventFilter;
        RemoveReverse(addr?: PromiseOrValue<string> | null): RemoveReverseEventFilter;
        "SetReverse(address,uint256)"(addr?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): SetReverseEventFilter;
        SetReverse(addr?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): SetReverseEventFilter;
    };
    estimateGas: {
        removeReverse(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        reverseOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        setReverse(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        removeReverse(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        reverseOf(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setReverse(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IReverseRegistry.d.ts.map