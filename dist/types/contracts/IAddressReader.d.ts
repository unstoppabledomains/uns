import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../common";
export interface IAddressReaderInterface extends Interface {
    getFunction(nameOrSignature: "getAddress" | "getAddressKey" | "getAddressKeys"): FunctionFragment;
    encodeFunctionData(functionFragment: "getAddress", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getAddressKey", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getAddressKeys", values: [string, string]): string;
    decodeFunctionResult(functionFragment: "getAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAddressKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAddressKeys", data: BytesLike): Result;
}
export interface IAddressReader extends BaseContract {
    connect(runner?: ContractRunner | null): IAddressReader;
    waitForDeployment(): Promise<this>;
    interface: IAddressReaderInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    getAddress: TypedContractMethod<[
        network: string,
        token: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getAddressKey: TypedContractMethod<[
        network: string,
        token: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getAddressKeys: TypedContractMethod<[
        network: string,
        token: string
    ], [
        string[]
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "getAddress"): TypedContractMethod<[
        network: string,
        token: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "getAddressKey"): TypedContractMethod<[
        network: string,
        token: string,
        tokenId: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "getAddressKeys"): TypedContractMethod<[network: string, token: string], [string[]], "view">;
    filters: {};
}
//# sourceMappingURL=IAddressReader.d.ts.map