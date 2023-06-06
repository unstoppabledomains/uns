import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface IAddressResolverInterface extends utils.Interface {
    functions: {
        "addr(bytes32,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addr"): FunctionFragment;
    encodeFunctionData(functionFragment: "addr", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "addr", data: BytesLike): Result;
    events: {
        "AddressChanged(bytes32,uint256,bytes)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AddressChanged"): EventFragment;
}
export interface AddressChangedEventObject {
    node: string;
    coinType: BigNumber;
    newAddress: string;
}
export declare type AddressChangedEvent = TypedEvent<[
    string,
    BigNumber,
    string
], AddressChangedEventObject>;
export declare type AddressChangedEventFilter = TypedEventFilter<AddressChangedEvent>;
export interface IAddressResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IAddressResolverInterface;
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
        addr(node: PromiseOrValue<BytesLike>, coinType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
    };
    addr(node: PromiseOrValue<BytesLike>, coinType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        addr(node: PromiseOrValue<BytesLike>, coinType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "AddressChanged(bytes32,uint256,bytes)"(node?: PromiseOrValue<BytesLike> | null, coinType?: null, newAddress?: null): AddressChangedEventFilter;
        AddressChanged(node?: PromiseOrValue<BytesLike> | null, coinType?: null, newAddress?: null): AddressChangedEventFilter;
    };
    estimateGas: {
        addr(node: PromiseOrValue<BytesLike>, coinType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        addr(node: PromiseOrValue<BytesLike>, coinType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IAddressResolver.d.ts.map