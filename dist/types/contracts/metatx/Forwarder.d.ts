import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
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
export interface ForwarderInterface extends utils.Interface {
    functions: {
        "execute((address,uint256,uint256,bytes),bytes)": FunctionFragment;
        "nonceOf(uint256)": FunctionFragment;
        "verify((address,uint256,uint256,bytes),bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "execute" | "nonceOf" | "verify"): FunctionFragment;
    encodeFunctionData(functionFragment: "execute", values: [IForwarder.ForwardRequestStruct, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "verify", values: [IForwarder.ForwardRequestStruct, PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
    events: {
        "Initialized(uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
}
export interface InitializedEventObject {
    version: number;
}
export declare type InitializedEvent = TypedEvent<[number], InitializedEventObject>;
export declare type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface Forwarder extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ForwarderInterface;
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
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    };
    execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "Initialized(uint8)"(version?: null): InitializedEventFilter;
        Initialized(version?: null): InitializedEventFilter;
    };
    estimateGas: {
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=Forwarder.d.ts.map