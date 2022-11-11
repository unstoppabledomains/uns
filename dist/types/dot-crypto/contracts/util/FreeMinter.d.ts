import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../common";
export interface FreeMinterInterface extends utils.Interface {
    functions: {
        "NAME()": FunctionFragment;
        "VERSION()": FunctionFragment;
        "claim(string)": FunctionFragment;
        "claimTo(string,address)": FunctionFragment;
        "claimToWithRecords(string,address,string[],string[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "NAME" | "VERSION" | "claim" | "claimTo" | "claimToWithRecords"): FunctionFragment;
    encodeFunctionData(functionFragment: "NAME", values?: undefined): string;
    encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "claim", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "claimTo", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "claimToWithRecords", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[]
    ]): string;
    decodeFunctionResult(functionFragment: "NAME", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimToWithRecords", data: BytesLike): Result;
    events: {};
}
export interface FreeMinter extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: FreeMinterInterface;
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
        NAME(overrides?: CallOverrides): Promise<[string]>;
        VERSION(overrides?: CallOverrides): Promise<[string]>;
        claim(label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        claimTo(label: PromiseOrValue<string>, receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        claimToWithRecords(label: PromiseOrValue<string>, receiver: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    NAME(overrides?: CallOverrides): Promise<string>;
    VERSION(overrides?: CallOverrides): Promise<string>;
    claim(label: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    claimTo(label: PromiseOrValue<string>, receiver: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    claimToWithRecords(label: PromiseOrValue<string>, receiver: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        NAME(overrides?: CallOverrides): Promise<string>;
        VERSION(overrides?: CallOverrides): Promise<string>;
        claim(label: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        claimTo(label: PromiseOrValue<string>, receiver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        claimToWithRecords(label: PromiseOrValue<string>, receiver: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        NAME(overrides?: CallOverrides): Promise<BigNumber>;
        VERSION(overrides?: CallOverrides): Promise<BigNumber>;
        claim(label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        claimTo(label: PromiseOrValue<string>, receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        claimToWithRecords(label: PromiseOrValue<string>, receiver: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        NAME(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        claim(label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        claimTo(label: PromiseOrValue<string>, receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        claimToWithRecords(label: PromiseOrValue<string>, receiver: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=FreeMinter.d.ts.map