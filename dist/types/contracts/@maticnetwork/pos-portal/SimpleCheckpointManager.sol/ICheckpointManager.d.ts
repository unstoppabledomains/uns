import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../../common";
export interface ICheckpointManagerInterface extends Interface {
    getFunction(nameOrSignature: "headerBlocks"): FunctionFragment;
    encodeFunctionData(functionFragment: "headerBlocks", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "headerBlocks", data: BytesLike): Result;
}
export interface ICheckpointManager extends BaseContract {
    connect(runner?: ContractRunner | null): ICheckpointManager;
    waitForDeployment(): Promise<this>;
    interface: ICheckpointManagerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    headerBlocks: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        [
            string,
            bigint,
            bigint,
            bigint,
            string
        ] & {
            root: string;
            start: bigint;
            end: bigint;
            createdAt: bigint;
            proposer: string;
        }
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "headerBlocks"): TypedContractMethod<[
        arg0: BigNumberish
    ], [
        [
            string,
            bigint,
            bigint,
            bigint,
            string
        ] & {
            root: string;
            start: bigint;
            end: bigint;
            createdAt: bigint;
            proposer: string;
        }
    ], "view">;
    filters: {};
}
//# sourceMappingURL=ICheckpointManager.d.ts.map