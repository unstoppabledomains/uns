import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface IABIResolverInterface extends utils.Interface {
    functions: {
        "ABI(bytes32,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "ABI"): FunctionFragment;
    encodeFunctionData(functionFragment: "ABI", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "ABI", data: BytesLike): Result;
    events: {
        "ABIChanged(bytes32,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "ABIChanged"): EventFragment;
}
export interface ABIChangedEventObject {
    node: string;
    contentType: BigNumber;
}
export declare type ABIChangedEvent = TypedEvent<[
    string,
    BigNumber
], ABIChangedEventObject>;
export declare type ABIChangedEventFilter = TypedEventFilter<ABIChangedEvent>;
export interface IABIResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IABIResolverInterface;
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
        ABI(node: PromiseOrValue<BytesLike>, contentTypes: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, string]>;
    };
    ABI(node: PromiseOrValue<BytesLike>, contentTypes: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, string]>;
    callStatic: {
        ABI(node: PromiseOrValue<BytesLike>, contentTypes: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, string]>;
    };
    filters: {
        "ABIChanged(bytes32,uint256)"(node?: PromiseOrValue<BytesLike> | null, contentType?: PromiseOrValue<BigNumberish> | null): ABIChangedEventFilter;
        ABIChanged(node?: PromiseOrValue<BytesLike> | null, contentType?: PromiseOrValue<BigNumberish> | null): ABIChangedEventFilter;
    };
    estimateGas: {
        ABI(node: PromiseOrValue<BytesLike>, contentTypes: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        ABI(node: PromiseOrValue<BytesLike>, contentTypes: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IABIResolver.d.ts.map