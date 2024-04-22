import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface SignatureControllerInterface extends Interface {
    getFunction(nameOrSignature: "burnChildFor" | "burnFor" | "mintChildFor" | "nonceOf" | "registry" | "resolveToFor" | "safeMintChildFor(address,uint256,string,bytes,bytes)" | "safeMintChildFor(address,uint256,string,bytes)" | "safeTransferFromChildFor(address,address,uint256,string,bytes)" | "safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)" | "safeTransferFromFor(address,address,uint256,bytes,bytes)" | "safeTransferFromFor(address,address,uint256,bytes)" | "transferFromChildFor" | "transferFromFor"): FunctionFragment;
    encodeFunctionData(functionFragment: "burnChildFor", values: [BigNumberish, string, BytesLike]): string;
    encodeFunctionData(functionFragment: "burnFor", values: [BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "mintChildFor", values: [AddressLike, BigNumberish, string, BytesLike]): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "registry", values?: undefined): string;
    encodeFunctionData(functionFragment: "resolveToFor", values: [AddressLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "safeMintChildFor(address,uint256,string,bytes,bytes)", values: [AddressLike, BigNumberish, string, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "safeMintChildFor(address,uint256,string,bytes)", values: [AddressLike, BigNumberish, string, BytesLike]): string;
    encodeFunctionData(functionFragment: "safeTransferFromChildFor(address,address,uint256,string,bytes)", values: [AddressLike, AddressLike, BigNumberish, string, BytesLike]): string;
    encodeFunctionData(functionFragment: "safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)", values: [
        AddressLike,
        AddressLike,
        BigNumberish,
        string,
        BytesLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "safeTransferFromFor(address,address,uint256,bytes,bytes)", values: [AddressLike, AddressLike, BigNumberish, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "safeTransferFromFor(address,address,uint256,bytes)", values: [AddressLike, AddressLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "transferFromChildFor", values: [AddressLike, AddressLike, BigNumberish, string, BytesLike]): string;
    encodeFunctionData(functionFragment: "transferFromFor", values: [AddressLike, AddressLike, BigNumberish, BytesLike]): string;
    decodeFunctionResult(functionFragment: "burnChildFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burnFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintChildFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resolveToFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintChildFor(address,uint256,string,bytes,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMintChildFor(address,uint256,string,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFromChildFor(address,address,uint256,string,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFromFor(address,address,uint256,bytes,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFromFor(address,address,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFromChildFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFromFor", data: BytesLike): Result;
}
export interface SignatureController extends BaseContract {
    connect(runner?: ContractRunner | null): SignatureController;
    waitForDeployment(): Promise<this>;
    interface: SignatureControllerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    burnChildFor: TypedContractMethod<[
        tokenId: BigNumberish,
        label: string,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    burnFor: TypedContractMethod<[
        tokenId: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    mintChildFor: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    nonceOf: TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    registry: TypedContractMethod<[], [string], "view">;
    resolveToFor: TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    "safeMintChildFor(address,uint256,string,bytes,bytes)": TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        _data: BytesLike,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    "safeMintChildFor(address,uint256,string,bytes)": TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    "safeTransferFromChildFor(address,address,uint256,string,bytes)": TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    "safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)": TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        _data: BytesLike,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    "safeTransferFromFor(address,address,uint256,bytes,bytes)": TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        _data: BytesLike,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    "safeTransferFromFor(address,address,uint256,bytes)": TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    transferFromChildFor: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    transferFromFor: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "burnChildFor"): TypedContractMethod<[
        tokenId: BigNumberish,
        label: string,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "burnFor"): TypedContractMethod<[
        tokenId: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "mintChildFor"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "nonceOf"): TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "registry"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "resolveToFor"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeMintChildFor(address,uint256,string,bytes,bytes)"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        _data: BytesLike,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeMintChildFor(address,uint256,string,bytes)"): TypedContractMethod<[
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeTransferFromChildFor(address,address,uint256,string,bytes)"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        _data: BytesLike,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeTransferFromFor(address,address,uint256,bytes,bytes)"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        _data: BytesLike,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeTransferFromFor(address,address,uint256,bytes)"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferFromChildFor"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        label: string,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferFromFor"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        tokenId: BigNumberish,
        signature: BytesLike
    ], [
        void
    ], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=SignatureController.d.ts.map