import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
export interface IReverseRegistrarInterface extends utils.Interface {
    functions: {
        "claim(address)": FunctionFragment;
        "claimForAddr(address,address,address)": FunctionFragment;
        "claimWithResolver(address,address)": FunctionFragment;
        "node(address)": FunctionFragment;
        "setDefaultResolver(address)": FunctionFragment;
        "setName(string)": FunctionFragment;
        "setNameForAddr(address,address,address,string)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "claim" | "claimForAddr" | "claimWithResolver" | "node" | "setDefaultResolver" | "setName" | "setNameForAddr"): FunctionFragment;
    encodeFunctionData(functionFragment: "claim", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "claimForAddr", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "claimWithResolver", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "node", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setDefaultResolver", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setName", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setNameForAddr", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimForAddr", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimWithResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "node", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDefaultResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setNameForAddr", data: BytesLike): Result;
    events: {};
}
export interface IReverseRegistrar extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IReverseRegistrarInterface;
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
        claim(owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        claimForAddr(addr: PromiseOrValue<string>, owner: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        claimWithResolver(owner: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        node(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;
        setDefaultResolver(resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setName(name: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setNameForAddr(addr: PromiseOrValue<string>, owner: PromiseOrValue<string>, resolver: PromiseOrValue<string>, name: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    claim(owner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    claimForAddr(addr: PromiseOrValue<string>, owner: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    claimWithResolver(owner: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    node(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    setDefaultResolver(resolver: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setName(name: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setNameForAddr(addr: PromiseOrValue<string>, owner: PromiseOrValue<string>, resolver: PromiseOrValue<string>, name: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        claim(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        claimForAddr(addr: PromiseOrValue<string>, owner: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        claimWithResolver(owner: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        node(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        setDefaultResolver(resolver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setName(name: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        setNameForAddr(addr: PromiseOrValue<string>, owner: PromiseOrValue<string>, resolver: PromiseOrValue<string>, name: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        claim(owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        claimForAddr(addr: PromiseOrValue<string>, owner: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        claimWithResolver(owner: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        node(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        setDefaultResolver(resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setName(name: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setNameForAddr(addr: PromiseOrValue<string>, owner: PromiseOrValue<string>, resolver: PromiseOrValue<string>, name: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        claim(owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        claimForAddr(addr: PromiseOrValue<string>, owner: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        claimWithResolver(owner: PromiseOrValue<string>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        node(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setDefaultResolver(resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setName(name: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setNameForAddr(addr: PromiseOrValue<string>, owner: PromiseOrValue<string>, resolver: PromiseOrValue<string>, name: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IReverseRegistrar.d.ts.map