import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
export declare namespace IPriceOracle {
    type PriceStruct = {
        base: PromiseOrValue<BigNumberish>;
        premium: PromiseOrValue<BigNumberish>;
    };
    type PriceStructOutput = [BigNumber, BigNumber] & {
        base: BigNumber;
        premium: BigNumber;
    };
}
export interface IETHRegistrarControllerInterface extends utils.Interface {
    functions: {
        "available(string)": FunctionFragment;
        "commit(bytes32)": FunctionFragment;
        "makeCommitment(string,address,uint256,bytes32,address,bytes[],bool,uint16)": FunctionFragment;
        "register(string,address,uint256,bytes32,address,bytes[],bool,uint16)": FunctionFragment;
        "renew(string,uint256)": FunctionFragment;
        "rentPrice(string,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "available" | "commit" | "makeCommitment" | "register" | "renew" | "rentPrice"): FunctionFragment;
    encodeFunctionData(functionFragment: "available", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "commit", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "makeCommitment", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>[],
        PromiseOrValue<boolean>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "register", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>[],
        PromiseOrValue<boolean>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "renew", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "rentPrice", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "available", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "commit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "makeCommitment", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renew", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rentPrice", data: BytesLike): Result;
    events: {};
}
export interface IETHRegistrarController extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IETHRegistrarControllerInterface;
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
        available(arg0: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        commit(arg0: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        makeCommitment(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, arg4: PromiseOrValue<string>, arg5: PromiseOrValue<BytesLike>[], arg6: PromiseOrValue<boolean>, arg7: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        register(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, arg4: PromiseOrValue<string>, arg5: PromiseOrValue<BytesLike>[], arg6: PromiseOrValue<boolean>, arg7: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renew(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        rentPrice(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[IPriceOracle.PriceStructOutput]>;
    };
    available(arg0: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    commit(arg0: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    makeCommitment(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, arg4: PromiseOrValue<string>, arg5: PromiseOrValue<BytesLike>[], arg6: PromiseOrValue<boolean>, arg7: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    register(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, arg4: PromiseOrValue<string>, arg5: PromiseOrValue<BytesLike>[], arg6: PromiseOrValue<boolean>, arg7: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renew(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    rentPrice(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<IPriceOracle.PriceStructOutput>;
    callStatic: {
        available(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        commit(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        makeCommitment(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, arg4: PromiseOrValue<string>, arg5: PromiseOrValue<BytesLike>[], arg6: PromiseOrValue<boolean>, arg7: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        register(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, arg4: PromiseOrValue<string>, arg5: PromiseOrValue<BytesLike>[], arg6: PromiseOrValue<boolean>, arg7: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        renew(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        rentPrice(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<IPriceOracle.PriceStructOutput>;
    };
    filters: {};
    estimateGas: {
        available(arg0: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        commit(arg0: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        makeCommitment(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, arg4: PromiseOrValue<string>, arg5: PromiseOrValue<BytesLike>[], arg6: PromiseOrValue<boolean>, arg7: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        register(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, arg4: PromiseOrValue<string>, arg5: PromiseOrValue<BytesLike>[], arg6: PromiseOrValue<boolean>, arg7: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renew(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        rentPrice(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        available(arg0: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        commit(arg0: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        makeCommitment(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, arg4: PromiseOrValue<string>, arg5: PromiseOrValue<BytesLike>[], arg6: PromiseOrValue<boolean>, arg7: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        register(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, arg4: PromiseOrValue<string>, arg5: PromiseOrValue<BytesLike>[], arg6: PromiseOrValue<boolean>, arg7: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renew(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        rentPrice(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IETHRegistrarController.d.ts.map