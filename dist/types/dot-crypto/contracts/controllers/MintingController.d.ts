import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
export interface MintingControllerInterface extends Interface {
    getFunction(nameOrSignature: "addMinter" | "isMinter" | "mintSLD" | "mintSLDWithResolver" | "registry" | "renounceMinter" | "safeMintSLD(address,string)" | "safeMintSLD(address,string,bytes)" | "safeMintSLDWithResolver(address,string,address,bytes)" | "safeMintSLDWithResolver(address,string,address)"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "MinterAdded" | "MinterRemoved"): EventFragment;
    encodeFunctionData(functionFragment: "addMinter", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "isMinter", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "mintSLD", values: [AddressLike, string]): string;
    encodeFunctionData(functionFragment: "mintSLDWithResolver", values: [AddressLike, string, AddressLike]): string;
    encodeFunctionData(functionFragment: "registry", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceMinter", values?: undefined): string;
    encodeFunctionData(functionFragment: "safeMintSLD(address,string)", values: [AddressLike, string]): string;
    encodeFunctionData(functionFragment: "safeMintSLD(address,string,bytes)", values: [AddressLike, string, BytesLike]): string;
    encodeFunctionData(functionFragment: "safeMintSLDWithResolver(address,string,address,bytes)", values: [AddressLike, string, AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "safeMintSLDWithResolver(address,string,address)", values: [AddressLike, string, AddressLike]): string;
    decodeFunctionResult(functionFragment: "addMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintSLD", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintSLDWithResolver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLD(address,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLD(address,string,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLDWithResolver(address,string,address,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintSLDWithResolver(address,string,address)", data: BytesLike): Result;
}
export declare namespace MinterAddedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace MinterRemovedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface MintingController extends BaseContract {
    connect(runner?: ContractRunner | null): MintingController;
    waitForDeployment(): Promise<this>;
    interface: MintingControllerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addMinter: TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    isMinter: TypedContractMethod<[account: AddressLike], [boolean], "view">;
    mintSLD: TypedContractMethod<[
        to: AddressLike,
        label: string
    ], [
        void
    ], "nonpayable">;
    mintSLDWithResolver: TypedContractMethod<[
        to: AddressLike,
        label: string,
        resolver: AddressLike
    ], [
        void
    ], "nonpayable">;
    registry: TypedContractMethod<[], [string], "view">;
    renounceMinter: TypedContractMethod<[], [void], "nonpayable">;
    "safeMintSLD(address,string)": TypedContractMethod<[
        to: AddressLike,
        label: string
    ], [
        void
    ], "nonpayable">;
    "safeMintSLD(address,string,bytes)": TypedContractMethod<[
        to: AddressLike,
        label: string,
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
    "safeMintSLDWithResolver(address,string,address,bytes)": TypedContractMethod<[
        to: AddressLike,
        label: string,
        resolver: AddressLike,
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
    "safeMintSLDWithResolver(address,string,address)": TypedContractMethod<[
        to: AddressLike,
        label: string,
        resolver: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addMinter"): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "isMinter"): TypedContractMethod<[account: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "mintSLD"): TypedContractMethod<[
        to: AddressLike,
        label: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "mintSLDWithResolver"): TypedContractMethod<[
        to: AddressLike,
        label: string,
        resolver: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "registry"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "renounceMinter"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "safeMintSLD(address,string)"): TypedContractMethod<[
        to: AddressLike,
        label: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeMintSLD(address,string,bytes)"): TypedContractMethod<[
        to: AddressLike,
        label: string,
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeMintSLDWithResolver(address,string,address,bytes)"): TypedContractMethod<[
        to: AddressLike,
        label: string,
        resolver: AddressLike,
        _data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeMintSLDWithResolver(address,string,address)"): TypedContractMethod<[
        to: AddressLike,
        label: string,
        resolver: AddressLike
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "MinterAdded"): TypedContractEvent<MinterAddedEvent.InputTuple, MinterAddedEvent.OutputTuple, MinterAddedEvent.OutputObject>;
    getEvent(key: "MinterRemoved"): TypedContractEvent<MinterRemovedEvent.InputTuple, MinterRemovedEvent.OutputTuple, MinterRemovedEvent.OutputObject>;
    filters: {
        "MinterAdded(address)": TypedContractEvent<MinterAddedEvent.InputTuple, MinterAddedEvent.OutputTuple, MinterAddedEvent.OutputObject>;
        MinterAdded: TypedContractEvent<MinterAddedEvent.InputTuple, MinterAddedEvent.OutputTuple, MinterAddedEvent.OutputObject>;
        "MinterRemoved(address)": TypedContractEvent<MinterRemovedEvent.InputTuple, MinterRemovedEvent.OutputTuple, MinterRemovedEvent.OutputObject>;
        MinterRemoved: TypedContractEvent<MinterRemovedEvent.InputTuple, MinterRemovedEvent.OutputTuple, MinterRemovedEvent.OutputObject>;
    };
}
//# sourceMappingURL=MintingController.d.ts.map