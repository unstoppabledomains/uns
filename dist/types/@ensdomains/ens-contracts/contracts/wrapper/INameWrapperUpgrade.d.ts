import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
export interface INameWrapperUpgradeInterface extends utils.Interface {
    functions: {
        "wrapFromUpgrade(bytes,address,uint32,uint64,address,bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "wrapFromUpgrade"): FunctionFragment;
    encodeFunctionData(functionFragment: "wrapFromUpgrade", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>
    ]): string;
    decodeFunctionResult(functionFragment: "wrapFromUpgrade", data: BytesLike): Result;
    events: {};
}
export interface INameWrapperUpgrade extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: INameWrapperUpgradeInterface;
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
        wrapFromUpgrade(name: PromiseOrValue<BytesLike>, wrappedOwner: PromiseOrValue<string>, fuses: PromiseOrValue<BigNumberish>, expiry: PromiseOrValue<BigNumberish>, approved: PromiseOrValue<string>, extraData: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    wrapFromUpgrade(name: PromiseOrValue<BytesLike>, wrappedOwner: PromiseOrValue<string>, fuses: PromiseOrValue<BigNumberish>, expiry: PromiseOrValue<BigNumberish>, approved: PromiseOrValue<string>, extraData: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        wrapFromUpgrade(name: PromiseOrValue<BytesLike>, wrappedOwner: PromiseOrValue<string>, fuses: PromiseOrValue<BigNumberish>, expiry: PromiseOrValue<BigNumberish>, approved: PromiseOrValue<string>, extraData: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        wrapFromUpgrade(name: PromiseOrValue<BytesLike>, wrappedOwner: PromiseOrValue<string>, fuses: PromiseOrValue<BigNumberish>, expiry: PromiseOrValue<BigNumberish>, approved: PromiseOrValue<string>, extraData: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        wrapFromUpgrade(name: PromiseOrValue<BytesLike>, wrappedOwner: PromiseOrValue<string>, fuses: PromiseOrValue<BigNumberish>, expiry: PromiseOrValue<BigNumberish>, approved: PromiseOrValue<string>, extraData: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=INameWrapperUpgrade.d.ts.map