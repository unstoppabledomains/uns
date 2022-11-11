import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
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
export interface BaseRoutingForwarderMockInterface extends utils.Interface {
    functions: {
        "buildRouteData((address,uint256,uint256,bytes),bytes)": FunctionFragment;
        "execute((address,uint256,uint256,bytes),bytes)": FunctionFragment;
        "nonceOf(uint256)": FunctionFragment;
        "putString(string)": FunctionFragment;
        "putStringFor(string,bytes)": FunctionFragment;
        "putUint(uint256)": FunctionFragment;
        "putUintArr(uint256[])": FunctionFragment;
        "putUintArrFor(uint256[],bytes)": FunctionFragment;
        "putUintFor(uint256,bytes)": FunctionFragment;
        "verify((address,uint256,uint256,bytes),bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "buildRouteData" | "execute" | "nonceOf" | "putString" | "putStringFor" | "putUint" | "putUintArr" | "putUintArrFor" | "putUintFor" | "verify"): FunctionFragment;
    encodeFunctionData(functionFragment: "buildRouteData", values: [IForwarder.ForwardRequestStruct, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "execute", values: [IForwarder.ForwardRequestStruct, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "putString", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "putStringFor", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "putUint", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "putUintArr", values: [PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "putUintArrFor", values: [PromiseOrValue<BigNumberish>[], PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "putUintFor", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "verify", values: [IForwarder.ForwardRequestStruct, PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "buildRouteData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "putString", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "putStringFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "putUint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "putUintArr", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "putUintArrFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "putUintFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
    events: {};
}
export interface BaseRoutingForwarderMock extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: BaseRoutingForwarderMockInterface;
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
        buildRouteData(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        execute(arg0: IForwarder.ForwardRequestStruct, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        nonceOf(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        putString(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[void]>;
        putStringFor(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[void]>;
        putUint(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[void]>;
        putUintArr(arg0: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[void]>;
        putUintArrFor(arg0: PromiseOrValue<BigNumberish>[], arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[void]>;
        putUintFor(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[void]>;
        verify(arg0: IForwarder.ForwardRequestStruct, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    };
    buildRouteData(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    execute(arg0: IForwarder.ForwardRequestStruct, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    nonceOf(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    putString(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    putStringFor(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
    putUint(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
    putUintArr(arg0: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<void>;
    putUintArrFor(arg0: PromiseOrValue<BigNumberish>[], arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
    putUintFor(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
    verify(arg0: IForwarder.ForwardRequestStruct, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        buildRouteData(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        execute(arg0: IForwarder.ForwardRequestStruct, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        nonceOf(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        putString(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        putStringFor(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        putUint(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        putUintArr(arg0: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<void>;
        putUintArrFor(arg0: PromiseOrValue<BigNumberish>[], arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        putUintFor(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        verify(arg0: IForwarder.ForwardRequestStruct, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {};
    estimateGas: {
        buildRouteData(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        execute(arg0: IForwarder.ForwardRequestStruct, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        nonceOf(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        putString(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        putStringFor(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        putUint(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        putUintArr(arg0: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        putUintArrFor(arg0: PromiseOrValue<BigNumberish>[], arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        putUintFor(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        verify(arg0: IForwarder.ForwardRequestStruct, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        buildRouteData(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        execute(arg0: IForwarder.ForwardRequestStruct, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nonceOf(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        putString(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        putStringFor(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        putUint(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        putUintArr(arg0: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        putUintArrFor(arg0: PromiseOrValue<BigNumberish>[], arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        putUintFor(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        verify(arg0: IForwarder.ForwardRequestStruct, arg1: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=BaseRoutingForwarderMock.d.ts.map