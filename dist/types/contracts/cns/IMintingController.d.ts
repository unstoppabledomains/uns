import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface IMintingControllerInterface extends utils.Interface {
    functions: {
        "mintSLD(address,string)": FunctionFragment;
        "mintSLDWithResolver(address,string,address)": FunctionFragment;
        "safeMintSLD(address,string)": FunctionFragment;
        "safeMintSLD(address,string,bytes)": FunctionFragment;
        "safeMintSLDWithResolver(address,string,address,bytes)": FunctionFragment;
        "safeMintSLDWithResolver(address,string,address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "mintSLD" | "mintSLDWithResolver" | "safeMintSLD(address,string)" | "safeMintSLD(address,string,bytes)" | "safeMintSLDWithResolver(address,string,address,bytes)" | "safeMintSLDWithResolver(address,string,address)"): FunctionFragment;
    encodeFunctionData(functionFragment: "mintSLD", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "mintSLDWithResolver", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
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
    decodeFunctionResult(functionFragment: "mintSLD", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintSLDWithResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLD(address,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLD(address,string,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLDWithResolver(address,string,address,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLDWithResolver(address,string,address)", data: BytesLike): Result;
    events: {};
}
export interface IMintingController extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IMintingControllerInterface;
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
        mintSLD(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        mintSLDWithResolver(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeMintSLD(address,string)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeMintSLD(address,string,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeMintSLDWithResolver(address,string,address,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeMintSLDWithResolver(address,string,address)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    mintSLD(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    mintSLDWithResolver(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeMintSLD(address,string)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeMintSLD(address,string,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeMintSLDWithResolver(address,string,address,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeMintSLDWithResolver(address,string,address)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        mintSLD(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        mintSLDWithResolver(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "safeMintSLD(address,string)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "safeMintSLD(address,string,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "safeMintSLDWithResolver(address,string,address,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "safeMintSLDWithResolver(address,string,address)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        mintSLD(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        mintSLDWithResolver(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeMintSLD(address,string)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeMintSLD(address,string,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeMintSLDWithResolver(address,string,address,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeMintSLDWithResolver(address,string,address)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        mintSLD(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        mintSLDWithResolver(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeMintSLD(address,string)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeMintSLD(address,string,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeMintSLDWithResolver(address,string,address,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeMintSLDWithResolver(address,string,address)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IMintingController.d.ts.map