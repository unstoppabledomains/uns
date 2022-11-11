import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../common";
export interface MintingControllerInterface extends utils.Interface {
    functions: {
        "addMinter(address)": FunctionFragment;
        "isMinter(address)": FunctionFragment;
        "mintSLD(address,string)": FunctionFragment;
        "mintSLDWithResolver(address,string,address)": FunctionFragment;
        "registry()": FunctionFragment;
        "renounceMinter()": FunctionFragment;
        "safeMintSLD(address,string)": FunctionFragment;
        "safeMintSLD(address,string,bytes)": FunctionFragment;
        "safeMintSLDWithResolver(address,string,address,bytes)": FunctionFragment;
        "safeMintSLDWithResolver(address,string,address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addMinter" | "isMinter" | "mintSLD" | "mintSLDWithResolver" | "registry" | "renounceMinter" | "safeMintSLD(address,string)" | "safeMintSLD(address,string,bytes)" | "safeMintSLDWithResolver(address,string,address,bytes)" | "safeMintSLDWithResolver(address,string,address)"): FunctionFragment;
    encodeFunctionData(functionFragment: "addMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "mintSLD", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "mintSLDWithResolver", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "registry", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceMinter", values?: undefined): string;
    encodeFunctionData(functionFragment: "safeMintSLD(address,string)", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "safeMintSLD(address,string,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "safeMintSLDWithResolver(address,string,address,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "safeMintSLDWithResolver(address,string,address)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    decodeFunctionResult(functionFragment: "addMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintSLD", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintSLDWithResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLD(address,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLD(address,string,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLDWithResolver(address,string,address,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLDWithResolver(address,string,address)", data: BytesLike): Result;
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
export interface MintingController extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: MintingControllerInterface;
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
        mintSLD(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        mintSLDWithResolver(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        registry(overrides?: CallOverrides): Promise<[string]>;
        renounceMinter(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeMintSLD(address,string)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeMintSLD(address,string,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeMintSLDWithResolver(address,string,address,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeMintSLDWithResolver(address,string,address)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    addMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    mintSLD(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    mintSLDWithResolver(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    registry(overrides?: CallOverrides): Promise<string>;
    renounceMinter(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeMintSLD(address,string)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeMintSLD(address,string,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeMintSLDWithResolver(address,string,address,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeMintSLDWithResolver(address,string,address)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        addMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        mintSLD(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        mintSLDWithResolver(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        registry(overrides?: CallOverrides): Promise<string>;
        renounceMinter(overrides?: CallOverrides): Promise<void>;
        "safeMintSLD(address,string)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "safeMintSLD(address,string,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "safeMintSLDWithResolver(address,string,address,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "safeMintSLDWithResolver(address,string,address)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
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
        mintSLD(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        mintSLDWithResolver(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        registry(overrides?: CallOverrides): Promise<BigNumber>;
        renounceMinter(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeMintSLD(address,string)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeMintSLD(address,string,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeMintSLDWithResolver(address,string,address,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeMintSLDWithResolver(address,string,address)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        addMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mintSLD(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        mintSLDWithResolver(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        registry(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceMinter(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeMintSLD(address,string)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeMintSLD(address,string,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeMintSLDWithResolver(address,string,address,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeMintSLDWithResolver(address,string,address)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=MintingController.d.ts.map