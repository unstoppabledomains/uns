import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface PubkeyResolverInterface extends utils.Interface {
    functions: {
        "clearRecords(bytes32)": FunctionFragment;
        "pubkey(bytes32)": FunctionFragment;
        "recordVersions(bytes32)": FunctionFragment;
        "setPubkey(bytes32,bytes32,bytes32)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "clearRecords" | "pubkey" | "recordVersions" | "setPubkey" | "supportsInterface"): FunctionFragment;
    encodeFunctionData(functionFragment: "clearRecords", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "pubkey", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "recordVersions", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "setPubkey", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "clearRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pubkey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "recordVersions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPubkey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    events: {
        "PubkeyChanged(bytes32,bytes32,bytes32)": EventFragment;
        "VersionChanged(bytes32,uint64)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "PubkeyChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VersionChanged"): EventFragment;
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
export interface VersionChangedEventObject {
    node: string;
    newVersion: BigNumber;
}
export declare type VersionChangedEvent = TypedEvent<[
    string,
    BigNumber
], VersionChangedEventObject>;
export declare type VersionChangedEventFilter = TypedEventFilter<VersionChangedEvent>;
export interface PubkeyResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: PubkeyResolverInterface;
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
        clearRecords(node: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, string] & {
            x: string;
            y: string;
        }>;
        recordVersions(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[BigNumber]>;
        setPubkey(node: PromiseOrValue<BytesLike>, x: PromiseOrValue<BytesLike>, y: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    };
    clearRecords(node: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, string] & {
        x: string;
        y: string;
    }>;
    recordVersions(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    setPubkey(node: PromiseOrValue<BytesLike>, x: PromiseOrValue<BytesLike>, y: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        clearRecords(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string, string] & {
            x: string;
            y: string;
        }>;
        recordVersions(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        setPubkey(node: PromiseOrValue<BytesLike>, x: PromiseOrValue<BytesLike>, y: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "PubkeyChanged(bytes32,bytes32,bytes32)"(node?: PromiseOrValue<BytesLike> | null, x?: null, y?: null): PubkeyChangedEventFilter;
        PubkeyChanged(node?: PromiseOrValue<BytesLike> | null, x?: null, y?: null): PubkeyChangedEventFilter;
        "VersionChanged(bytes32,uint64)"(node?: PromiseOrValue<BytesLike> | null, newVersion?: null): VersionChangedEventFilter;
        VersionChanged(node?: PromiseOrValue<BytesLike> | null, newVersion?: null): VersionChangedEventFilter;
    };
    estimateGas: {
        clearRecords(node: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        recordVersions(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        setPubkey(node: PromiseOrValue<BytesLike>, x: PromiseOrValue<BytesLike>, y: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        clearRecords(node: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        recordVersions(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setPubkey(node: PromiseOrValue<BytesLike>, x: PromiseOrValue<BytesLike>, y: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=PubkeyResolver.d.ts.map