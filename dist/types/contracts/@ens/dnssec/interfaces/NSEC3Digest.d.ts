import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
export interface NSEC3DigestInterface extends utils.Interface {
    functions: {
        "hash(bytes,bytes,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "hash"): FunctionFragment;
    encodeFunctionData(functionFragment: "hash", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>
    ]): string;
    decodeFunctionResult(functionFragment: "hash", data: BytesLike): Result;
    events: {};
}
export interface NSEC3Digest extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: NSEC3DigestInterface;
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
        hash(salt: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, iterations: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
    };
    hash(salt: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, iterations: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        hash(salt: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, iterations: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        hash(salt: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, iterations: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        hash(salt: PromiseOrValue<BytesLike>, data: PromiseOrValue<BytesLike>, iterations: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=NSEC3Digest.d.ts.map