import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../common";
export interface SignatureControllerInterface extends utils.Interface {
    functions: {
        "burnChildFor(uint256,string,bytes)": FunctionFragment;
        "burnFor(uint256,bytes)": FunctionFragment;
        "mintChildFor(address,uint256,string,bytes)": FunctionFragment;
        "nonceOf(uint256)": FunctionFragment;
        "registry()": FunctionFragment;
        "resolveToFor(address,uint256,bytes)": FunctionFragment;
        "safeMintChildFor(address,uint256,string,bytes,bytes)": FunctionFragment;
        "safeMintChildFor(address,uint256,string,bytes)": FunctionFragment;
        "safeTransferFromChildFor(address,address,uint256,string,bytes)": FunctionFragment;
        "safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)": FunctionFragment;
        "safeTransferFromFor(address,address,uint256,bytes,bytes)": FunctionFragment;
        "safeTransferFromFor(address,address,uint256,bytes)": FunctionFragment;
        "transferFromChildFor(address,address,uint256,string,bytes)": FunctionFragment;
        "transferFromFor(address,address,uint256,bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "burnChildFor" | "burnFor" | "mintChildFor" | "nonceOf" | "registry" | "resolveToFor" | "safeMintChildFor(address,uint256,string,bytes,bytes)" | "safeMintChildFor(address,uint256,string,bytes)" | "safeTransferFromChildFor(address,address,uint256,string,bytes)" | "safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)" | "safeTransferFromFor(address,address,uint256,bytes,bytes)" | "safeTransferFromFor(address,address,uint256,bytes)" | "transferFromChildFor" | "transferFromFor"): FunctionFragment;
    encodeFunctionData(functionFragment: "burnChildFor", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "burnFor", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "mintChildFor", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "registry", values?: undefined): string;
    encodeFunctionData(functionFragment: "resolveToFor", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "safeMintChildFor(address,uint256,string,bytes,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "safeMintChildFor(address,uint256,string,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "safeTransferFromChildFor(address,address,uint256,string,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "safeTransferFromFor(address,address,uint256,bytes,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "safeTransferFromFor(address,address,uint256,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "transferFromChildFor", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "transferFromFor", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    decodeFunctionResult(functionFragment: "burnChildFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burnFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintChildFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resolveToFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintChildFor(address,uint256,string,bytes,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintChildFor(address,uint256,string,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFromChildFor(address,address,uint256,string,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFromFor(address,address,uint256,bytes,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFromFor(address,address,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFromChildFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFromFor", data: BytesLike): Result;
    events: {};
}
export interface SignatureController extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: SignatureControllerInterface;
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
        burnChildFor(tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        burnFor(tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        mintChildFor(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        registry(overrides?: CallOverrides): Promise<[string]>;
        resolveToFor(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeMintChildFor(address,uint256,string,bytes,bytes)"(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeMintChildFor(address,uint256,string,bytes)"(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFromChildFor(address,address,uint256,string,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFromFor(address,address,uint256,bytes,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFromFor(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferFromChildFor(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferFromFor(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    burnChildFor(tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    burnFor(tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    mintChildFor(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    registry(overrides?: CallOverrides): Promise<string>;
    resolveToFor(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeMintChildFor(address,uint256,string,bytes,bytes)"(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeMintChildFor(address,uint256,string,bytes)"(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFromChildFor(address,address,uint256,string,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFromFor(address,address,uint256,bytes,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFromFor(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferFromChildFor(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferFromFor(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        burnChildFor(tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        burnFor(tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        mintChildFor(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        registry(overrides?: CallOverrides): Promise<string>;
        resolveToFor(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "safeMintChildFor(address,uint256,string,bytes,bytes)"(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "safeMintChildFor(address,uint256,string,bytes)"(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "safeTransferFromChildFor(address,address,uint256,string,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "safeTransferFromFor(address,address,uint256,bytes,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "safeTransferFromFor(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        transferFromChildFor(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        transferFromFor(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        burnChildFor(tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        burnFor(tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        mintChildFor(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        registry(overrides?: CallOverrides): Promise<BigNumber>;
        resolveToFor(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeMintChildFor(address,uint256,string,bytes,bytes)"(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeMintChildFor(address,uint256,string,bytes)"(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeTransferFromChildFor(address,address,uint256,string,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeTransferFromFor(address,address,uint256,bytes,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeTransferFromFor(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferFromChildFor(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferFromFor(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        burnChildFor(tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        burnFor(tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        mintChildFor(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        registry(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        resolveToFor(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeMintChildFor(address,uint256,string,bytes,bytes)"(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeMintChildFor(address,uint256,string,bytes)"(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFromChildFor(address,address,uint256,string,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFromFor(address,address,uint256,bytes,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFromFor(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferFromChildFor(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferFromFor(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=SignatureController.d.ts.map