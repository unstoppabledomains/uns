import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface IPubkeyResolverInterface extends utils.Interface {
    functions: {
        "pubkey(bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "pubkey"): FunctionFragment;
    encodeFunctionData(functionFragment: "pubkey", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "pubkey", data: BytesLike): Result;
    events: {
        "PubkeyChanged(bytes32,bytes32,bytes32)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "PubkeyChanged"): EventFragment;
}
export interface PubkeyChangedEventObject {
    node: string;
    x: string;
    y: string;
}
export declare type PubkeyChangedEvent = TypedEvent<[
    string,
    string,
    string
], PubkeyChangedEventObject>;
export declare type PubkeyChangedEventFilter = TypedEventFilter<PubkeyChangedEvent>;
export interface IPubkeyResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IPubkeyResolverInterface;
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
        pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, string] & {
            x: string;
            y: string;
        }>;
    };
    pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, string] & {
        x: string;
        y: string;
    }>;
    callStatic: {
        pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, string] & {
            x: string;
            y: string;
        }>;
    };
    filters: {
        "PubkeyChanged(bytes32,bytes32,bytes32)"(node?: PromiseOrValue<BytesLike> | null, x?: null, y?: null): PubkeyChangedEventFilter;
        PubkeyChanged(node?: PromiseOrValue<BytesLike> | null, x?: null, y?: null): PubkeyChangedEventFilter;
    };
    estimateGas: {
        pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IPubkeyResolver.d.ts.map