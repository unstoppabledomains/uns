import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface IENSCustodyInterface extends Interface {
    getFunction(nameOrSignature: "commit" | "makeCommitment" | "onERC1155BatchReceived" | "onERC1155Received" | "ownerOf" | "register" | "renew" | "rentPrice" | "safeTransfer" | "supportsInterface"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Parked"): EventFragment;
    encodeFunctionData(functionFragment: "commit", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "makeCommitment", values: [
        string,
        AddressLike,
        BigNumberish,
        BytesLike,
        AddressLike,
        BytesLike[],
        boolean,
        BigNumberish,
        boolean
    ]): string;
    encodeFunctionData(functionFragment: "onERC1155BatchReceived", values: [
        AddressLike,
        AddressLike,
        BigNumberish[],
        BigNumberish[],
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "onERC1155Received", values: [AddressLike, AddressLike, BigNumberish, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "register", values: [
        string,
        AddressLike,
        BigNumberish,
        BytesLike,
        AddressLike,
        BytesLike[],
        boolean,
        BigNumberish,
        boolean
    ]): string;
    encodeFunctionData(functionFragment: "renew", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "rentPrice", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "safeTransfer", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "commit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "makeCommitment", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC1155BatchReceived", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC1155Received", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renew", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rentPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
}
export declare namespace ParkedEvent {
    type InputTuple = [tokenId: BigNumberish, owner: AddressLike];
    type OutputTuple = [tokenId: bigint, owner: string];
    interface OutputObject {
        tokenId: bigint;
        owner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IENSCustody extends BaseContract {
    connect(runner?: ContractRunner | null): IENSCustody;
    waitForDeployment(): Promise<this>;
    interface: IENSCustodyInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    commit: TypedContractMethod<[commitment: BytesLike], [void], "nonpayable">;
    makeCommitment: TypedContractMethod<[
        name: string,
        owner: AddressLike,
        duration: BigNumberish,
        secret: BytesLike,
        resolver: AddressLike,
        data: BytesLike[],
        reverseRecord: boolean,
        ownerControlledFuses: BigNumberish,
        selfCustody: boolean
    ], [
        string
    ], "nonpayable">;
    onERC1155BatchReceived: TypedContractMethod<[
        operator: AddressLike,
        from: AddressLike,
        ids: BigNumberish[],
        values: BigNumberish[],
        data: BytesLike
    ], [
        string
    ], "nonpayable">;
    onERC1155Received: TypedContractMethod<[
        operator: AddressLike,
        from: AddressLike,
        id: BigNumberish,
        value: BigNumberish,
        data: BytesLike
    ], [
        string
    ], "nonpayable">;
    ownerOf: TypedContractMethod<[tokenId: BigNumberish], [string], "nonpayable">;
    register: TypedContractMethod<[
        name: string,
        owner: AddressLike,
        duration: BigNumberish,
        secret: BytesLike,
        resolver: AddressLike,
        data: BytesLike[],
        reverseRecord: boolean,
        ownerControlledFuses: BigNumberish,
        selfCustody: boolean
    ], [
        void
    ], "nonpayable">;
    renew: TypedContractMethod<[
        name: string,
        duration: BigNumberish
    ], [
        void
    ], "nonpayable">;
    rentPrice: TypedContractMethod<[
        name: string,
        duration: BigNumberish
    ], [
        bigint
    ], "view">;
    safeTransfer: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "commit"): TypedContractMethod<[commitment: BytesLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "makeCommitment"): TypedContractMethod<[
        name: string,
        owner: AddressLike,
        duration: BigNumberish,
        secret: BytesLike,
        resolver: AddressLike,
        data: BytesLike[],
        reverseRecord: boolean,
        ownerControlledFuses: BigNumberish,
        selfCustody: boolean
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "onERC1155BatchReceived"): TypedContractMethod<[
        operator: AddressLike,
        from: AddressLike,
        ids: BigNumberish[],
        values: BigNumberish[],
        data: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "onERC1155Received"): TypedContractMethod<[
        operator: AddressLike,
        from: AddressLike,
        id: BigNumberish,
        value: BigNumberish,
        data: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "ownerOf"): TypedContractMethod<[tokenId: BigNumberish], [string], "nonpayable">;
    getFunction(nameOrSignature: "register"): TypedContractMethod<[
        name: string,
        owner: AddressLike,
        duration: BigNumberish,
        secret: BytesLike,
        resolver: AddressLike,
        data: BytesLike[],
        reverseRecord: boolean,
        ownerControlledFuses: BigNumberish,
        selfCustody: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "renew"): TypedContractMethod<[
        name: string,
        duration: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "rentPrice"): TypedContractMethod<[
        name: string,
        duration: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "safeTransfer"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getEvent(key: "Parked"): TypedContractEvent<ParkedEvent.InputTuple, ParkedEvent.OutputTuple, ParkedEvent.OutputObject>;
    filters: {
        "Parked(uint256,address)": TypedContractEvent<ParkedEvent.InputTuple, ParkedEvent.OutputTuple, ParkedEvent.OutputObject>;
        Parked: TypedContractEvent<ParkedEvent.InputTuple, ParkedEvent.OutputTuple, ParkedEvent.OutputObject>;
    };
}
//# sourceMappingURL=IENSCustody.d.ts.map