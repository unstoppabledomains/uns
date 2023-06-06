import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface ABIResolverInterface extends utils.Interface {
    functions: {
        "ABI(bytes32,uint256)": FunctionFragment;
        "clearRecords(bytes32)": FunctionFragment;
        "recordVersions(bytes32)": FunctionFragment;
        "setABI(bytes32,uint256,bytes)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "ABI" | "clearRecords" | "recordVersions" | "setABI" | "supportsInterface"): FunctionFragment;
    encodeFunctionData(functionFragment: "ABI", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "clearRecords", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "recordVersions", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "setABI", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "ABI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "clearRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "recordVersions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setABI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    events: {
        "ABIChanged(bytes32,uint256)": EventFragment;
        "VersionChanged(bytes32,uint64)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "ABIChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VersionChanged"): EventFragment;
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
export interface VersionChangedEventObject {
    node: string;
    newVersion: BigNumber;
}
export declare type VersionChangedEvent = TypedEvent<[
    string,
    BigNumber
], VersionChangedEventObject>;
export declare type VersionChangedEventFilter = TypedEventFilter<VersionChangedEvent>;
export interface ABIResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ABIResolverInterface;
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
        clearRecords(node: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        recordVersions(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[BigNumber]>;
        setABI(node: PromiseOrValue<BytesLike>, contentType: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    };
    ABI(node: PromiseOrValue<BytesLike>, contentTypes: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, string]>;
    clearRecords(node: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    recordVersions(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    setABI(node: PromiseOrValue<BytesLike>, contentType: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        ABI(node: PromiseOrValue<BytesLike>, contentTypes: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, string]>;
        clearRecords(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        recordVersions(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        setABI(node: PromiseOrValue<BytesLike>, contentType: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "ABIChanged(bytes32,uint256)"(node?: PromiseOrValue<BytesLike> | null, contentType?: PromiseOrValue<BigNumberish> | null): ABIChangedEventFilter;
        ABIChanged(node?: PromiseOrValue<BytesLike> | null, contentType?: PromiseOrValue<BigNumberish> | null): ABIChangedEventFilter;
        "VersionChanged(bytes32,uint64)"(node?: PromiseOrValue<BytesLike> | null, newVersion?: null): VersionChangedEventFilter;
        VersionChanged(node?: PromiseOrValue<BytesLike> | null, newVersion?: null): VersionChangedEventFilter;
    };
    estimateGas: {
        ABI(node: PromiseOrValue<BytesLike>, contentTypes: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        clearRecords(node: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        recordVersions(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        setABI(node: PromiseOrValue<BytesLike>, contentType: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        ABI(node: PromiseOrValue<BytesLike>, contentTypes: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        clearRecords(node: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        recordVersions(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setABI(node: PromiseOrValue<BytesLike>, contentType: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ABIResolver.d.ts.map