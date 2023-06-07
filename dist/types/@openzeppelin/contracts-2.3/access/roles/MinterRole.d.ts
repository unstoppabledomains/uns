import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
export interface MinterRoleInterface extends utils.Interface {
    functions: {
        "addMinter(address)": FunctionFragment;
        "isMinter(address)": FunctionFragment;
        "renounceMinter()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addMinter" | "isMinter" | "renounceMinter"): FunctionFragment;
    encodeFunctionData(functionFragment: "addMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "renounceMinter", values?: undefined): string;
    decodeFunctionResult(functionFragment: "addMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceMinter", data: BytesLike): Result;
    events: {
        "MinterAdded(address)": EventFragment;
        "MinterRemoved(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "MinterAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MinterRemoved"): EventFragment;
}
export interface MinterAddedEventObject {
    account: string;
}
export declare type MinterAddedEvent = TypedEvent<[string], MinterAddedEventObject>;
export declare type MinterAddedEventFilter = TypedEventFilter<MinterAddedEvent>;
export interface MinterRemovedEventObject {
    account: string;
}
export declare type MinterRemovedEvent = TypedEvent<[string], MinterRemovedEventObject>;
export declare type MinterRemovedEventFilter = TypedEventFilter<MinterRemovedEvent>;
export interface MinterRole extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: MinterRoleInterface;
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
        addMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        renounceMinter(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    addMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    renounceMinter(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        addMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        renounceMinter(overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "MinterAdded(address)"(account?: PromiseOrValue<string> | null): MinterAddedEventFilter;
        MinterAdded(account?: PromiseOrValue<string> | null): MinterAddedEventFilter;
        "MinterRemoved(address)"(account?: PromiseOrValue<string> | null): MinterRemovedEventFilter;
        MinterRemoved(account?: PromiseOrValue<string> | null): MinterRemovedEventFilter;
    };
    estimateGas: {
        addMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        renounceMinter(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        addMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceMinter(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=MinterRole.d.ts.map