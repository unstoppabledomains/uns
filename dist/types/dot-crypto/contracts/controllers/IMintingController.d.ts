import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../common";
export interface IMintingControllerInterface extends utils.Interface {
    functions: {
        "mintSLD(address,string)": FunctionFragment;
        "safeMintSLD(address,string)": FunctionFragment;
        "safeMintSLD(address,string,bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "mintSLD" | "safeMintSLD(address,string)" | "safeMintSLD(address,string,bytes)"): FunctionFragment;
    encodeFunctionData(functionFragment: "mintSLD", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "safeMintSLD(address,string)", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "safeMintSLD(address,string,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>
    ]): string;
    decodeFunctionResult(functionFragment: "mintSLD", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLD(address,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLD(address,string,bytes)", data: BytesLike): Result;
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
        "safeMintSLD(address,string)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeMintSLD(address,string,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    mintSLD(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeMintSLD(address,string)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeMintSLD(address,string,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        mintSLD(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "safeMintSLD(address,string)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "safeMintSLD(address,string,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        mintSLD(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeMintSLD(address,string)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeMintSLD(address,string,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        mintSLD(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeMintSLD(address,string)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeMintSLD(address,string,bytes)"(to: PromiseOrValue<string>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IMintingController.d.ts.map