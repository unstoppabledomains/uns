import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface DotCoinBurnerInterface extends utils.Interface {
    functions: {
        "burnAll(uint256[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "burnAll"): FunctionFragment;
    encodeFunctionData(functionFragment: "burnAll", values: [PromiseOrValue<BigNumberish>[]]): string;
    decodeFunctionResult(functionFragment: "burnAll", data: BytesLike): Result;
    events: {
        "BatchCompleted(uint256,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "BatchCompleted"): EventFragment;
}
export interface BatchCompletedEventObject {
    first: BigNumber;
    last: BigNumber;
}
export declare type BatchCompletedEvent = TypedEvent<[
    BigNumber,
    BigNumber
], BatchCompletedEventObject>;
export declare type BatchCompletedEventFilter = TypedEventFilter<BatchCompletedEvent>;
export interface DotCoinBurner extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: DotCoinBurnerInterface;
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
        burnAll(labelHashes: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    burnAll(labelHashes: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        burnAll(labelHashes: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "BatchCompleted(uint256,uint256)"(first?: PromiseOrValue<BigNumberish> | null, last?: PromiseOrValue<BigNumberish> | null): BatchCompletedEventFilter;
        BatchCompleted(first?: PromiseOrValue<BigNumberish> | null, last?: PromiseOrValue<BigNumberish> | null): BatchCompletedEventFilter;
    };
    estimateGas: {
        burnAll(labelHashes: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        burnAll(labelHashes: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=DotCoinBurner.d.ts.map