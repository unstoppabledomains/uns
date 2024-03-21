import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface IMintingManagerInterface extends utils.Interface {
    functions: {
        "addTld(string,bool)": FunctionFragment;
        "buy(address,string[],string[],string[],uint64,uint256,bytes)": FunctionFragment;
        "buyForErc20(address,string[],string[],string[],uint64,address,uint256,bytes)": FunctionFragment;
        "claim(uint256,string)": FunctionFragment;
        "claimTo(address,uint256,string)": FunctionFragment;
        "claimToWithRecords(address,uint256,string,string[],string[])": FunctionFragment;
        "issueExpirableWithRecords(address,string[],string[],string[],uint64,bool)": FunctionFragment;
        "issueWithRecords(address,string[],string[],string[],bool)": FunctionFragment;
        "removeTld(uint256)": FunctionFragment;
        "renew(uint64,uint256)": FunctionFragment;
        "revoke(uint256)": FunctionFragment;
        "setTokenURIPrefix(string)": FunctionFragment;
        "withdraw(address)": FunctionFragment;
        "withdraw(address,address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addTld" | "buy" | "buyForErc20" | "claim" | "claimTo" | "claimToWithRecords" | "issueExpirableWithRecords" | "issueWithRecords" | "removeTld" | "renew" | "revoke" | "setTokenURIPrefix" | "withdraw(address)" | "withdraw(address,address)"): FunctionFragment;
    encodeFunctionData(functionFragment: "addTld", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "buy", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "buyForErc20", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "claim", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "claimTo", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "claimToWithRecords", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[]
    ]): string;
    encodeFunctionData(functionFragment: "issueExpirableWithRecords", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "issueWithRecords", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "removeTld", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "renew", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "revoke", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setTokenURIPrefix", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "withdraw(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "withdraw(address,address)", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "addTld", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "buyForErc20", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimToWithRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "issueExpirableWithRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "issueWithRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeTld", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renew", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revoke", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTokenURIPrefix", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw(address,address)", data: BytesLike): Result;
    events: {
        "AdminChanged(address,address)": EventFragment;
        "DomainPurchase(uint256,address,address,uint256,address)": EventFragment;
        "NewTld(uint256,string)": EventFragment;
        "RemoveTld(uint256)": EventFragment;
        "Upgraded(address)": EventFragment;
        "Withdrawal(address,uint256,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DomainPurchase"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NewTld"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RemoveTld"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Withdrawal"): EventFragment;
}
export interface AdminChangedEventObject {
    previousAdmin: string;
    newAdmin: string;
}
export declare type AdminChangedEvent = TypedEvent<[
    string,
    string
], AdminChangedEventObject>;
export declare type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;
export interface DomainPurchaseEventObject {
    tokenId: BigNumber;
    sender: string;
    owner: string;
    price: BigNumber;
    token: string;
}
export declare type DomainPurchaseEvent = TypedEvent<[
    BigNumber,
    string,
    string,
    BigNumber,
    string
], DomainPurchaseEventObject>;
export declare type DomainPurchaseEventFilter = TypedEventFilter<DomainPurchaseEvent>;
export interface NewTldEventObject {
    tokenId: BigNumber;
    tld: string;
}
export declare type NewTldEvent = TypedEvent<[BigNumber, string], NewTldEventObject>;
export declare type NewTldEventFilter = TypedEventFilter<NewTldEvent>;
export interface RemoveTldEventObject {
    tokenId: BigNumber;
}
export declare type RemoveTldEvent = TypedEvent<[BigNumber], RemoveTldEventObject>;
export declare type RemoveTldEventFilter = TypedEventFilter<RemoveTldEvent>;
export interface UpgradedEventObject {
    implementation: string;
}
export declare type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;
export declare type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;
export interface WithdrawalEventObject {
    recepient: string;
    value: BigNumber;
    token: string;
}
export declare type WithdrawalEvent = TypedEvent<[
    string,
    BigNumber,
    string
], WithdrawalEventObject>;
export declare type WithdrawalEventFilter = TypedEventFilter<WithdrawalEvent>;
export interface IMintingManager extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IMintingManagerInterface;
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
        addTld(tld: PromiseOrValue<string>, isExpirable: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        buy(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        buyForErc20(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        claim(tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        claimTo(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        claimToWithRecords(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        issueExpirableWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        issueWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeTld(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renew(expiry: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        revoke(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "withdraw(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "withdraw(address,address)"(token: PromiseOrValue<string>, recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    addTld(tld: PromiseOrValue<string>, isExpirable: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    buy(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    buyForErc20(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    claim(tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    claimTo(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    claimToWithRecords(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    issueExpirableWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    issueWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeTld(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renew(expiry: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    revoke(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "withdraw(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "withdraw(address,address)"(token: PromiseOrValue<string>, recepient: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        addTld(tld: PromiseOrValue<string>, isExpirable: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        buy(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        buyForErc20(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        claim(tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        claimTo(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        claimToWithRecords(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        issueExpirableWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, withReverse: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        issueWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        removeTld(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        renew(expiry: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        revoke(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "withdraw(address)"(recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "withdraw(address,address)"(token: PromiseOrValue<string>, recepient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "AdminChanged(address,address)"(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
        AdminChanged(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
        "DomainPurchase(uint256,address,address,uint256,address)"(tokenId?: PromiseOrValue<BigNumberish> | null, sender?: PromiseOrValue<string> | null, owner?: PromiseOrValue<string> | null, price?: null, token?: null): DomainPurchaseEventFilter;
        DomainPurchase(tokenId?: PromiseOrValue<BigNumberish> | null, sender?: PromiseOrValue<string> | null, owner?: PromiseOrValue<string> | null, price?: null, token?: null): DomainPurchaseEventFilter;
        "NewTld(uint256,string)"(tokenId?: PromiseOrValue<BigNumberish> | null, tld?: null): NewTldEventFilter;
        NewTld(tokenId?: PromiseOrValue<BigNumberish> | null, tld?: null): NewTldEventFilter;
        "RemoveTld(uint256)"(tokenId?: PromiseOrValue<BigNumberish> | null): RemoveTldEventFilter;
        RemoveTld(tokenId?: PromiseOrValue<BigNumberish> | null): RemoveTldEventFilter;
        "Upgraded(address)"(implementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
        Upgraded(implementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
        "Withdrawal(address,uint256,address)"(recepient?: null, value?: null, token?: null): WithdrawalEventFilter;
        Withdrawal(recepient?: null, value?: null, token?: null): WithdrawalEventFilter;
    };
    estimateGas: {
        addTld(tld: PromiseOrValue<string>, isExpirable: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        buy(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        buyForErc20(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        claim(tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        claimTo(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        claimToWithRecords(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        issueExpirableWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        issueWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeTld(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renew(expiry: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        revoke(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "withdraw(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "withdraw(address,address)"(token: PromiseOrValue<string>, recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        addTld(tld: PromiseOrValue<string>, isExpirable: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        buy(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        buyForErc20(owner: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, price: PromiseOrValue<BigNumberish>, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        claim(tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        claimTo(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        claimToWithRecords(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        issueExpirableWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], expiry: PromiseOrValue<BigNumberish>, withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        issueWithRecords(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeTld(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renew(expiry: PromiseOrValue<BigNumberish>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        revoke(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "withdraw(address)"(recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "withdraw(address,address)"(token: PromiseOrValue<string>, recepient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IMintingManager.d.ts.map