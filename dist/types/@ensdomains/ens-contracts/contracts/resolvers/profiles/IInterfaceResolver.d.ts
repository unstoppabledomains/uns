import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface IInterfaceResolverInterface extends utils.Interface {
    functions: {
        "interfaceImplementer(bytes32,bytes4)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "interfaceImplementer"): FunctionFragment;
    encodeFunctionData(functionFragment: "interfaceImplementer", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "interfaceImplementer", data: BytesLike): Result;
    events: {
        "InterfaceChanged(bytes32,bytes4,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "InterfaceChanged"): EventFragment;
}
export interface InterfaceChangedEventObject {
    node: string;
    interfaceID: string;
    implementer: string;
}
export declare type InterfaceChangedEvent = TypedEvent<[
    string,
    string,
    string
], InterfaceChangedEventObject>;
export declare type InterfaceChangedEventFilter = TypedEventFilter<InterfaceChangedEvent>;
export interface IInterfaceResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IInterfaceResolverInterface;
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
        interfaceImplementer(node: PromiseOrValue<BytesLike>, interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
    };
    interfaceImplementer(node: PromiseOrValue<BytesLike>, interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        interfaceImplementer(node: PromiseOrValue<BytesLike>, interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "InterfaceChanged(bytes32,bytes4,address)"(node?: PromiseOrValue<BytesLike> | null, interfaceID?: PromiseOrValue<BytesLike> | null, implementer?: null): InterfaceChangedEventFilter;
        InterfaceChanged(node?: PromiseOrValue<BytesLike> | null, interfaceID?: PromiseOrValue<BytesLike> | null, implementer?: null): InterfaceChangedEventFilter;
    };
    estimateGas: {
        interfaceImplementer(node: PromiseOrValue<BytesLike>, interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        interfaceImplementer(node: PromiseOrValue<BytesLike>, interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IInterfaceResolver.d.ts.map