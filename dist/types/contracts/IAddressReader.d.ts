import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface IAddressReaderInterface extends utils.Interface {
    functions: {
        "getAddress(string,string,uint256)": FunctionFragment;
        "getAddressKey(string,string,uint256)": FunctionFragment;
        "getAddressKeys(string,string)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "getAddress" | "getAddressKey" | "getAddressKeys"): FunctionFragment;
    encodeFunctionData(functionFragment: "getAddress", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "getAddressKey", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "getAddressKeys", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "getAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAddressKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAddressKeys", data: BytesLike): Result;
    events: {};
}
export interface IAddressReader extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IAddressReaderInterface;
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
        getAddress(network: PromiseOrValue<string>, token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        getAddressKey(network: PromiseOrValue<string>, token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        getAddressKeys(network: PromiseOrValue<string>, token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string[]]>;
    };
    getAddress(network: PromiseOrValue<string>, token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    getAddressKey(network: PromiseOrValue<string>, token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    getAddressKeys(network: PromiseOrValue<string>, token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string[]>;
    callStatic: {
        getAddress(network: PromiseOrValue<string>, token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getAddressKey(network: PromiseOrValue<string>, token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getAddressKeys(network: PromiseOrValue<string>, token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string[]>;
    };
    filters: {};
    estimateGas: {
        getAddress(network: PromiseOrValue<string>, token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getAddressKey(network: PromiseOrValue<string>, token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getAddressKeys(network: PromiseOrValue<string>, token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getAddress(network: PromiseOrValue<string>, token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAddressKey(network: PromiseOrValue<string>, token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAddressKeys(network: PromiseOrValue<string>, token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IAddressReader.d.ts.map