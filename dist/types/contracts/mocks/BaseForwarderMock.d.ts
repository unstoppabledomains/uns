import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IForwarder {
    type ForwardRequestStruct = {
        from: PromiseOrValue<string>;
        nonce: PromiseOrValue<BigNumberish>;
        tokenId: PromiseOrValue<BigNumberish>;
        data: PromiseOrValue<BytesLike>;
    };
    type ForwardRequestStructOutput = [
        string,
        BigNumber,
        BigNumber,
        string
    ] & {
        from: string;
        nonce: BigNumber;
        tokenId: BigNumber;
        data: string;
    };
}
export interface BaseForwarderMockInterface extends utils.Interface {
    functions: {
        "execute((address,uint256,uint256,bytes),bytes)": FunctionFragment;
        "hasAsset(address)": FunctionFragment;
        "mintAsset()": FunctionFragment;
        "nonceOf(uint256)": FunctionFragment;
        "revertWithReason()": FunctionFragment;
        "revertWithoutReason()": FunctionFragment;
        "verify((address,uint256,uint256,bytes),bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "execute" | "hasAsset" | "mintAsset" | "nonceOf" | "revertWithReason" | "revertWithoutReason" | "verify"): FunctionFragment;
    encodeFunctionData(functionFragment: "execute", values: [IForwarder.ForwardRequestStruct, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "hasAsset", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "mintAsset", values?: undefined): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "revertWithReason", values?: undefined): string;
    encodeFunctionData(functionFragment: "revertWithoutReason", values?: undefined): string;
    encodeFunctionData(functionFragment: "verify", values: [IForwarder.ForwardRequestStruct, PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revertWithReason", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revertWithoutReason", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
    events: {};
}
export interface BaseForwarderMock extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: BaseForwarderMockInterface;
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
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        hasAsset(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        mintAsset(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        revertWithReason(overrides?: CallOverrides): Promise<[void]>;
        revertWithoutReason(overrides?: CallOverrides): Promise<[void]>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    };
    execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    hasAsset(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    mintAsset(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    revertWithReason(overrides?: CallOverrides): Promise<void>;
    revertWithoutReason(overrides?: CallOverrides): Promise<void>;
    verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        hasAsset(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        mintAsset(overrides?: CallOverrides): Promise<void>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        revertWithReason(overrides?: CallOverrides): Promise<void>;
        revertWithoutReason(overrides?: CallOverrides): Promise<void>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {};
    estimateGas: {
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        hasAsset(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        mintAsset(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        revertWithReason(overrides?: CallOverrides): Promise<BigNumber>;
        revertWithoutReason(overrides?: CallOverrides): Promise<BigNumber>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        hasAsset(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mintAsset(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        revertWithReason(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        revertWithoutReason(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=BaseForwarderMock.d.ts.map