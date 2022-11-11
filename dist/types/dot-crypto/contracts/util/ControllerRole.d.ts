import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../common";
export interface ControllerRoleInterface extends utils.Interface {
    functions: {
        "addController(address)": FunctionFragment;
        "isController(address)": FunctionFragment;
        "renounceController()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addController" | "isController" | "renounceController"): FunctionFragment;
    encodeFunctionData(functionFragment: "addController", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isController", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "renounceController", values?: undefined): string;
    decodeFunctionResult(functionFragment: "addController", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isController", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceController", data: BytesLike): Result;
    events: {};
}
export interface ControllerRole extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ControllerRoleInterface;
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
        addController(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isController(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        renounceController(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    addController(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isController(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    renounceController(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        addController(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        isController(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        renounceController(overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        addController(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isController(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        renounceController(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        addController(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isController(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceController(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ControllerRole.d.ts.map