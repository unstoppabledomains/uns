import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../common";
export interface LegacyENSRegistryInterface extends utils.Interface {
    functions: {
        "owner(bytes32)": FunctionFragment;
        "resolver(bytes32)": FunctionFragment;
        "setOwner(bytes32,address)": FunctionFragment;
        "setResolver(bytes32,address)": FunctionFragment;
        "setSubnodeOwner(bytes32,bytes32,address)": FunctionFragment;
        "setTTL(bytes32,uint64)": FunctionFragment;
        "ttl(bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "owner" | "resolver" | "setOwner" | "setResolver" | "setSubnodeOwner" | "setTTL" | "ttl"): FunctionFragment;
    encodeFunctionData(functionFragment: "owner", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "resolver", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "setOwner", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setResolver", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setSubnodeOwner", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "setTTL", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "ttl", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSubnodeOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTTL", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ttl", data: BytesLike): Result;
    events: {
        "NewOwner(bytes32,bytes32,address)": EventFragment;
        "NewResolver(bytes32,address)": EventFragment;
        "NewTTL(bytes32,uint64)": EventFragment;
        "Transfer(bytes32,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "NewOwner"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NewResolver"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NewTTL"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
export interface NewOwnerEventObject {
    node: string;
    label: string;
    owner: string;
}
export declare type NewOwnerEvent = TypedEvent<[
    string,
    string,
    string
], NewOwnerEventObject>;
export declare type NewOwnerEventFilter = TypedEventFilter<NewOwnerEvent>;
export interface NewResolverEventObject {
    node: string;
    resolver: string;
}
export declare type NewResolverEvent = TypedEvent<[
    string,
    string
], NewResolverEventObject>;
export declare type NewResolverEventFilter = TypedEventFilter<NewResolverEvent>;
export interface NewTTLEventObject {
    node: string;
    ttl: BigNumber;
}
export declare type NewTTLEvent = TypedEvent<[string, BigNumber], NewTTLEventObject>;
export declare type NewTTLEventFilter = TypedEventFilter<NewTTLEvent>;
export interface TransferEventObject {
    node: string;
    owner: string;
}
export declare type TransferEvent = TypedEvent<[string, string], TransferEventObject>;
export declare type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface LegacyENSRegistry extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: LegacyENSRegistryInterface;
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
        owner(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        resolver(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        setOwner(node: PromiseOrValue<BytesLike>, owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setResolver(node: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setSubnodeOwner(node: PromiseOrValue<BytesLike>, label: PromiseOrValue<BytesLike>, owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setTTL(node: PromiseOrValue<BytesLike>, ttl: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        ttl(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[BigNumber]>;
    };
    owner(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    resolver(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    setOwner(node: PromiseOrValue<BytesLike>, owner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setResolver(node: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setSubnodeOwner(node: PromiseOrValue<BytesLike>, label: PromiseOrValue<BytesLike>, owner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setTTL(node: PromiseOrValue<BytesLike>, ttl: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    ttl(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        owner(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        resolver(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        setOwner(node: PromiseOrValue<BytesLike>, owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setResolver(node: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setSubnodeOwner(node: PromiseOrValue<BytesLike>, label: PromiseOrValue<BytesLike>, owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setTTL(node: PromiseOrValue<BytesLike>, ttl: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        ttl(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {
        "NewOwner(bytes32,bytes32,address)"(node?: PromiseOrValue<BytesLike> | null, label?: PromiseOrValue<BytesLike> | null, owner?: null): NewOwnerEventFilter;
        NewOwner(node?: PromiseOrValue<BytesLike> | null, label?: PromiseOrValue<BytesLike> | null, owner?: null): NewOwnerEventFilter;
        "NewResolver(bytes32,address)"(node?: PromiseOrValue<BytesLike> | null, resolver?: null): NewResolverEventFilter;
        NewResolver(node?: PromiseOrValue<BytesLike> | null, resolver?: null): NewResolverEventFilter;
        "NewTTL(bytes32,uint64)"(node?: PromiseOrValue<BytesLike> | null, ttl?: null): NewTTLEventFilter;
        NewTTL(node?: PromiseOrValue<BytesLike> | null, ttl?: null): NewTTLEventFilter;
        "Transfer(bytes32,address)"(node?: PromiseOrValue<BytesLike> | null, owner?: null): TransferEventFilter;
        Transfer(node?: PromiseOrValue<BytesLike> | null, owner?: null): TransferEventFilter;
    };
    estimateGas: {
        owner(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        resolver(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        setOwner(node: PromiseOrValue<BytesLike>, owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setResolver(node: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setSubnodeOwner(node: PromiseOrValue<BytesLike>, label: PromiseOrValue<BytesLike>, owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setTTL(node: PromiseOrValue<BytesLike>, ttl: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        ttl(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        owner(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        resolver(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setOwner(node: PromiseOrValue<BytesLike>, owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setResolver(node: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setSubnodeOwner(node: PromiseOrValue<BytesLike>, label: PromiseOrValue<BytesLike>, owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setTTL(node: PromiseOrValue<BytesLike>, ttl: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        ttl(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=LegacyENSRegistry.d.ts.map