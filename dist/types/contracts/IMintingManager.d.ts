import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export declare namespace IMintingManager {
    type BulkSLDIssueRequestStruct = {
        to: PromiseOrValue<string>;
        label: PromiseOrValue<string>;
        tld: PromiseOrValue<BigNumberish>;
    };
    type BulkSLDIssueRequestStructOutput = [string, string, BigNumber] & {
        to: string;
        label: string;
        tld: BigNumber;
    };
}
export interface IMintingManagerInterface extends utils.Interface {
    functions: {
        "addTld(string)": FunctionFragment;
        "bulkIssue((address,string,uint256)[])": FunctionFragment;
        "claim(uint256,string)": FunctionFragment;
        "claimTo(address,uint256,string)": FunctionFragment;
        "claimToWithRecords(address,uint256,string,string[],string[])": FunctionFragment;
        "issueWithRecords(address,string[],string[],string[],bool)": FunctionFragment;
        "issueWithRecords(address,string[],string[],string[])": FunctionFragment;
        "removeTld(uint256)": FunctionFragment;
        "setTokenURIPrefix(string)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addTld" | "bulkIssue" | "claim" | "claimTo" | "claimToWithRecords" | "issueWithRecords(address,string[],string[],string[],bool)" | "issueWithRecords(address,string[],string[],string[])" | "removeTld" | "setTokenURIPrefix"): FunctionFragment;
    encodeFunctionData(functionFragment: "addTld", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "bulkIssue", values: [IMintingManager.BulkSLDIssueRequestStruct[]]): string;
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
    encodeFunctionData(functionFragment: "issueWithRecords(address,string[],string[],string[],bool)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "issueWithRecords(address,string[],string[],string[])", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<string>[],
        PromiseOrValue<string>[]
    ]): string;
    encodeFunctionData(functionFragment: "removeTld", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setTokenURIPrefix", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "addTld", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bulkIssue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimToWithRecords", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "issueWithRecords(address,string[],string[],string[],bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "issueWithRecords(address,string[],string[],string[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeTld", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTokenURIPrefix", data: BytesLike): Result;
    events: {
        "AdminChanged(address,address)": EventFragment;
        "NewTld(uint256,string)": EventFragment;
        "RemoveTld(uint256)": EventFragment;
        "Upgraded(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NewTld"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RemoveTld"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
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
        addTld(tld: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        bulkIssue(requests: IMintingManager.BulkSLDIssueRequestStruct[], overrides?: Overrides & {
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
        "issueWithRecords(address,string[],string[],string[],bool)"(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "issueWithRecords(address,string[],string[],string[])"(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeTld(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    addTld(tld: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    bulkIssue(requests: IMintingManager.BulkSLDIssueRequestStruct[], overrides?: Overrides & {
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
    "issueWithRecords(address,string[],string[],string[],bool)"(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "issueWithRecords(address,string[],string[],string[])"(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeTld(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        addTld(tld: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        bulkIssue(requests: IMintingManager.BulkSLDIssueRequestStruct[], overrides?: CallOverrides): Promise<void>;
        claim(tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        claimTo(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        claimToWithRecords(to: PromiseOrValue<string>, tld: PromiseOrValue<BigNumberish>, label: PromiseOrValue<string>, keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        "issueWithRecords(address,string[],string[],string[],bool)"(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        "issueWithRecords(address,string[],string[],string[])"(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        removeTld(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "AdminChanged(address,address)"(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
        AdminChanged(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
        "NewTld(uint256,string)"(tokenId?: PromiseOrValue<BigNumberish> | null, tld?: null): NewTldEventFilter;
        NewTld(tokenId?: PromiseOrValue<BigNumberish> | null, tld?: null): NewTldEventFilter;
        "RemoveTld(uint256)"(tokenId?: PromiseOrValue<BigNumberish> | null): RemoveTldEventFilter;
        RemoveTld(tokenId?: PromiseOrValue<BigNumberish> | null): RemoveTldEventFilter;
        "Upgraded(address)"(implementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
        Upgraded(implementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
    };
    estimateGas: {
        addTld(tld: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        bulkIssue(requests: IMintingManager.BulkSLDIssueRequestStruct[], overrides?: Overrides & {
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
        "issueWithRecords(address,string[],string[],string[],bool)"(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "issueWithRecords(address,string[],string[],string[])"(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeTld(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        addTld(tld: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        bulkIssue(requests: IMintingManager.BulkSLDIssueRequestStruct[], overrides?: Overrides & {
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
        "issueWithRecords(address,string[],string[],string[],bool)"(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], withReverse: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "issueWithRecords(address,string[],string[],string[])"(to: PromiseOrValue<string>, labels: PromiseOrValue<string>[], keys: PromiseOrValue<string>[], values: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeTld(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setTokenURIPrefix(prefix: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IMintingManager.d.ts.map