import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../common";
export interface LegacyETHRegistrarControllerInterface extends utils.Interface {
    functions: {
        "MIN_REGISTRATION_DURATION()": FunctionFragment;
        "available(string)": FunctionFragment;
        "commit(bytes32)": FunctionFragment;
        "commitments(bytes32)": FunctionFragment;
        "isOwner()": FunctionFragment;
        "makeCommitment(string,address,bytes32)": FunctionFragment;
        "makeCommitmentWithConfig(string,address,bytes32,address,address)": FunctionFragment;
        "maxCommitmentAge()": FunctionFragment;
        "minCommitmentAge()": FunctionFragment;
        "owner()": FunctionFragment;
        "register(string,address,uint256,bytes32)": FunctionFragment;
        "registerWithConfig(string,address,uint256,bytes32,address,address)": FunctionFragment;
        "renew(string,uint256)": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "rentPrice(string,uint256)": FunctionFragment;
        "setCommitmentAges(uint256,uint256)": FunctionFragment;
        "setPriceOracle(address)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "valid(string)": FunctionFragment;
        "withdraw()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "MIN_REGISTRATION_DURATION" | "available" | "commit" | "commitments" | "isOwner" | "makeCommitment" | "makeCommitmentWithConfig" | "maxCommitmentAge" | "minCommitmentAge" | "owner" | "register" | "registerWithConfig" | "renew" | "renounceOwnership" | "rentPrice" | "setCommitmentAges" | "setPriceOracle" | "supportsInterface" | "transferOwnership" | "valid" | "withdraw"): FunctionFragment;
    encodeFunctionData(functionFragment: "MIN_REGISTRATION_DURATION", values?: undefined): string;
    encodeFunctionData(functionFragment: "available", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "commit", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "commitments", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "isOwner", values?: undefined): string;
    encodeFunctionData(functionFragment: "makeCommitment", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "makeCommitmentWithConfig", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "maxCommitmentAge", values?: undefined): string;
    encodeFunctionData(functionFragment: "minCommitmentAge", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "register", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "registerWithConfig", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "renew", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "rentPrice", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setCommitmentAges", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setPriceOracle", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "valid", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
    decodeFunctionResult(functionFragment: "MIN_REGISTRATION_DURATION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "available", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "commit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "commitments", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "makeCommitment", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "makeCommitmentWithConfig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "maxCommitmentAge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "minCommitmentAge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerWithConfig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renew", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rentPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setCommitmentAges", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPriceOracle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "valid", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    events: {
        "NameRegistered(string,bytes32,address,uint256,uint256)": EventFragment;
        "NameRenewed(string,bytes32,uint256,uint256)": EventFragment;
        "NewPriceOracle(address)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "NameRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NameRenewed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NewPriceOracle"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
export interface NameRegisteredEventObject {
    name: string;
    label: string;
    owner: string;
    cost: BigNumber;
    expires: BigNumber;
}
export declare type NameRegisteredEvent = TypedEvent<[
    string,
    string,
    string,
    BigNumber,
    BigNumber
], NameRegisteredEventObject>;
export declare type NameRegisteredEventFilter = TypedEventFilter<NameRegisteredEvent>;
export interface NameRenewedEventObject {
    name: string;
    label: string;
    cost: BigNumber;
    expires: BigNumber;
}
export declare type NameRenewedEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber
], NameRenewedEventObject>;
export declare type NameRenewedEventFilter = TypedEventFilter<NameRenewedEvent>;
export interface NewPriceOracleEventObject {
    oracle: string;
}
export declare type NewPriceOracleEvent = TypedEvent<[
    string
], NewPriceOracleEventObject>;
export declare type NewPriceOracleEventFilter = TypedEventFilter<NewPriceOracleEvent>;
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface LegacyETHRegistrarController extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: LegacyETHRegistrarControllerInterface;
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
        MIN_REGISTRATION_DURATION(overrides?: CallOverrides): Promise<[BigNumber]>;
        available(name: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        commit(commitment: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        commitments(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[BigNumber]>;
        isOwner(overrides?: CallOverrides): Promise<[boolean]>;
        makeCommitment(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, secret: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        makeCommitmentWithConfig(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;
        maxCommitmentAge(overrides?: CallOverrides): Promise<[BigNumber]>;
        minCommitmentAge(overrides?: CallOverrides): Promise<[BigNumber]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        register(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        registerWithConfig(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, addr: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renew(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        rentPrice(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        setCommitmentAges(_minCommitmentAge: PromiseOrValue<BigNumberish>, _maxCommitmentAge: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setPriceOracle(_prices: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        valid(name: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        withdraw(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    MIN_REGISTRATION_DURATION(overrides?: CallOverrides): Promise<BigNumber>;
    available(name: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    commit(commitment: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    commitments(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    isOwner(overrides?: CallOverrides): Promise<boolean>;
    makeCommitment(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, secret: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    makeCommitmentWithConfig(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    maxCommitmentAge(overrides?: CallOverrides): Promise<BigNumber>;
    minCommitmentAge(overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<string>;
    register(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    registerWithConfig(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, addr: PromiseOrValue<string>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renew(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    rentPrice(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    setCommitmentAges(_minCommitmentAge: PromiseOrValue<BigNumberish>, _maxCommitmentAge: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setPriceOracle(_prices: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    valid(name: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    withdraw(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        MIN_REGISTRATION_DURATION(overrides?: CallOverrides): Promise<BigNumber>;
        available(name: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        commit(commitment: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        commitments(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        isOwner(overrides?: CallOverrides): Promise<boolean>;
        makeCommitment(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, secret: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        makeCommitmentWithConfig(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        maxCommitmentAge(overrides?: CallOverrides): Promise<BigNumber>;
        minCommitmentAge(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<string>;
        register(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        registerWithConfig(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        renew(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        rentPrice(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        setCommitmentAges(_minCommitmentAge: PromiseOrValue<BigNumberish>, _maxCommitmentAge: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setPriceOracle(_prices: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        valid(name: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        withdraw(overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "NameRegistered(string,bytes32,address,uint256,uint256)"(name?: null, label?: PromiseOrValue<BytesLike> | null, owner?: PromiseOrValue<string> | null, cost?: null, expires?: null): NameRegisteredEventFilter;
        NameRegistered(name?: null, label?: PromiseOrValue<BytesLike> | null, owner?: PromiseOrValue<string> | null, cost?: null, expires?: null): NameRegisteredEventFilter;
        "NameRenewed(string,bytes32,uint256,uint256)"(name?: null, label?: PromiseOrValue<BytesLike> | null, cost?: null, expires?: null): NameRenewedEventFilter;
        NameRenewed(name?: null, label?: PromiseOrValue<BytesLike> | null, cost?: null, expires?: null): NameRenewedEventFilter;
        "NewPriceOracle(address)"(oracle?: PromiseOrValue<string> | null): NewPriceOracleEventFilter;
        NewPriceOracle(oracle?: PromiseOrValue<string> | null): NewPriceOracleEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
    };
    estimateGas: {
        MIN_REGISTRATION_DURATION(overrides?: CallOverrides): Promise<BigNumber>;
        available(name: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        commit(commitment: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        commitments(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        isOwner(overrides?: CallOverrides): Promise<BigNumber>;
        makeCommitment(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, secret: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        makeCommitmentWithConfig(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        maxCommitmentAge(overrides?: CallOverrides): Promise<BigNumber>;
        minCommitmentAge(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        register(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        registerWithConfig(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, addr: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renew(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        rentPrice(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        setCommitmentAges(_minCommitmentAge: PromiseOrValue<BigNumberish>, _maxCommitmentAge: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setPriceOracle(_prices: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        valid(name: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        withdraw(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        MIN_REGISTRATION_DURATION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        available(name: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        commit(commitment: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        commitments(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        makeCommitment(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, secret: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        makeCommitmentWithConfig(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        maxCommitmentAge(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        minCommitmentAge(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        register(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        registerWithConfig(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, addr: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renew(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        rentPrice(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setCommitmentAges(_minCommitmentAge: PromiseOrValue<BigNumberish>, _maxCommitmentAge: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setPriceOracle(_prices: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        valid(name: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        withdraw(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=LegacyETHRegistrarController.d.ts.map