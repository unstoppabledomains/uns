import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
export declare namespace DNSSEC {
    type RRSetWithSignatureStruct = {
        rrset: PromiseOrValue<BytesLike>;
        sig: PromiseOrValue<BytesLike>;
    };
    type RRSetWithSignatureStructOutput = [string, string] & {
        rrset: string;
        sig: string;
    };
}
export interface IDNSRegistrarInterface extends utils.Interface {
    functions: {
        "claim(bytes,bytes)": FunctionFragment;
        "proveAndClaim(bytes,(bytes,bytes)[],bytes)": FunctionFragment;
        "proveAndClaimWithResolver(bytes,(bytes,bytes)[],bytes,address,address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "claim" | "proveAndClaim" | "proveAndClaimWithResolver"): FunctionFragment;
    encodeFunctionData(functionFragment: "claim", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "proveAndClaim", values: [
        PromiseOrValue<BytesLike>,
        DNSSEC.RRSetWithSignatureStruct[],
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "proveAndClaimWithResolver", values: [
        PromiseOrValue<BytesLike>,
        DNSSEC.RRSetWithSignatureStruct[],
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proveAndClaim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proveAndClaimWithResolver", data: BytesLike): Result;
    events: {};
}
export interface IDNSRegistrar extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IDNSRegistrarInterface;
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
        claim(name: PromiseOrValue<BytesLike>, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        proveAndClaim(name: PromiseOrValue<BytesLike>, input: DNSSEC.RRSetWithSignatureStruct[], proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        proveAndClaimWithResolver(name: PromiseOrValue<BytesLike>, input: DNSSEC.RRSetWithSignatureStruct[], proof: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, addr: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    claim(name: PromiseOrValue<BytesLike>, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    proveAndClaim(name: PromiseOrValue<BytesLike>, input: DNSSEC.RRSetWithSignatureStruct[], proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    proveAndClaimWithResolver(name: PromiseOrValue<BytesLike>, input: DNSSEC.RRSetWithSignatureStruct[], proof: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, addr: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        claim(name: PromiseOrValue<BytesLike>, proof: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        proveAndClaim(name: PromiseOrValue<BytesLike>, input: DNSSEC.RRSetWithSignatureStruct[], proof: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        proveAndClaimWithResolver(name: PromiseOrValue<BytesLike>, input: DNSSEC.RRSetWithSignatureStruct[], proof: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        claim(name: PromiseOrValue<BytesLike>, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        proveAndClaim(name: PromiseOrValue<BytesLike>, input: DNSSEC.RRSetWithSignatureStruct[], proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        proveAndClaimWithResolver(name: PromiseOrValue<BytesLike>, input: DNSSEC.RRSetWithSignatureStruct[], proof: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, addr: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        claim(name: PromiseOrValue<BytesLike>, proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        proveAndClaim(name: PromiseOrValue<BytesLike>, input: DNSSEC.RRSetWithSignatureStruct[], proof: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        proveAndClaimWithResolver(name: PromiseOrValue<BytesLike>, input: DNSSEC.RRSetWithSignatureStruct[], proof: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, addr: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IDNSRegistrar.d.ts.map