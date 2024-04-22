import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../../common";
export interface INameWrapperUpgradeInterface extends Interface {
    getFunction(nameOrSignature: "wrapFromUpgrade"): FunctionFragment;
    encodeFunctionData(functionFragment: "wrapFromUpgrade", values: [
        BytesLike,
        AddressLike,
        BigNumberish,
        BigNumberish,
        AddressLike,
        BytesLike
    ]): string;
    decodeFunctionResult(functionFragment: "wrapFromUpgrade", data: BytesLike): Result;
}
export interface INameWrapperUpgrade extends BaseContract {
    connect(runner?: ContractRunner | null): INameWrapperUpgrade;
    waitForDeployment(): Promise<this>;
    interface: INameWrapperUpgradeInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    wrapFromUpgrade: TypedContractMethod<[
        name: BytesLike,
        wrappedOwner: AddressLike,
        fuses: BigNumberish,
        expiry: BigNumberish,
        approved: AddressLike,
        extraData: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "wrapFromUpgrade"): TypedContractMethod<[
        name: BytesLike,
        wrappedOwner: AddressLike,
        fuses: BigNumberish,
        expiry: BigNumberish,
        approved: AddressLike,
        extraData: BytesLike
    ], [
        void
    ], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=INameWrapperUpgrade.d.ts.map