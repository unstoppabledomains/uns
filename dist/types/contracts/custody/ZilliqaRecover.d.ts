import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace IForwarder {
    type ForwardRequestStruct = {
        from: PromiseOrValue<string>;
        nonce: PromiseOrValue<BigNumberish>;
        tokenId: PromiseOrValue<BigNumberish>;
        data: PromiseOrValue<BytesLike>;
    };
    type ForwardRequestStructOutput = [
        string,
        BigNumber,
        BigNumber,
        string
    ] & {
        from: string;
        nonce: BigNumber;
        tokenId: BigNumber;
        data: string;
    };
}
export declare namespace ZilliqaRecover {
    type MintingTokenStruct = {
        zilOwner: PromiseOrValue<string>;
        label: PromiseOrValue<string>;
    };
    type MintingTokenStructOutput = [string, string] & {
        zilOwner: string;
        label: string;
    };
}
export interface ZilliqaRecoverInterface extends utils.Interface {
    functions: {
        "ZIL_NODE()": FunctionFragment;
        "claim(uint256,bytes32,bytes32,address)": FunctionFragment;
        "claimAll(uint256[],bytes32,bytes32,address)": FunctionFragment;
        "ethAddress(bytes32,bytes32)": FunctionFragment;
        "execute((address,uint256,uint256,bytes),bytes)": FunctionFragment;
        "initialize(address,address)": FunctionFragment;
        "isOwnedBy(address,uint256[])": FunctionFragment;
        "isTrustedForwarder(address)": FunctionFragment;
        "mint(string,address)": FunctionFragment;
        "mintAll((address,string)[])": FunctionFragment;
        "mintingManager()": FunctionFragment;
        "nonceOf(uint256)": FunctionFragment;
        "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
        "registry()": FunctionFragment;
        "verify((address,uint256,uint256,bytes),bytes)": FunctionFragment;
        "zilAddress(bytes32,bytes32)": FunctionFragment;
        "znsOwnerOf(uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "ZIL_NODE" | "claim" | "claimAll" | "ethAddress" | "execute" | "initialize" | "isOwnedBy" | "isTrustedForwarder" | "mint" | "mintAll" | "mintingManager" | "nonceOf" | "onERC721Received" | "registry" | "verify" | "zilAddress" | "znsOwnerOf"): FunctionFragment;
    encodeFunctionData(functionFragment: "ZIL_NODE", values?: undefined): string;
    encodeFunctionData(functionFragment: "claim", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "claimAll", values: [
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "ethAddress", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "execute", values: [IForwarder.ForwardRequestStruct, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "initialize", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isOwnedBy", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "isTrustedForwarder", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "mint", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "mintAll", values: [ZilliqaRecover.MintingTokenStruct[]]): string;
    encodeFunctionData(functionFragment: "mintingManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "onERC721Received", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "registry", values?: undefined): string;
    encodeFunctionData(functionFragment: "verify", values: [IForwarder.ForwardRequestStruct, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "zilAddress", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "znsOwnerOf", values: [PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "ZIL_NODE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ethAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isOwnedBy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTrustedForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintingManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC721Received", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "zilAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "znsOwnerOf", data: BytesLike): Result;
    events: {
        "Initialized(uint8)": EventFragment;
        "ZnsTokenClaimed(uint256,address,address)": EventFragment;
        "ZnsTokenMinted(uint256,address,string)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ZnsTokenClaimed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ZnsTokenMinted"): EventFragment;
}
export interface InitializedEventObject {
    version: number;
}
export declare type InitializedEvent = TypedEvent<[number], InitializedEventObject>;
export declare type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface ZnsTokenClaimedEventObject {
    tokenId: BigNumber;
    oldAddress: string;
    newAddress: string;
}
export declare type ZnsTokenClaimedEvent = TypedEvent<[
    BigNumber,
    string,
    string
], ZnsTokenClaimedEventObject>;
export declare type ZnsTokenClaimedEventFilter = TypedEventFilter<ZnsTokenClaimedEvent>;
export interface ZnsTokenMintedEventObject {
    tokenId: BigNumber;
    zilAddress: string;
    label: string;
}
export declare type ZnsTokenMintedEvent = TypedEvent<[
    BigNumber,
    string,
    string
], ZnsTokenMintedEventObject>;
export declare type ZnsTokenMintedEventFilter = TypedEventFilter<ZnsTokenMintedEvent>;
export interface ZilliqaRecover extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ZilliqaRecoverInterface;
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
        ZIL_NODE(overrides?: CallOverrides): Promise<[BigNumber]>;
        claim(tokenId: PromiseOrValue<BigNumberish>, publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, newOwnerAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        claimAll(tokenIds: PromiseOrValue<BigNumberish>[], publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, newOwnerAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        ethAddress(publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        initialize(registry_: PromiseOrValue<string>, mintingManager_: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isOwnedBy(_zilAddress: PromiseOrValue<string>, tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<[boolean]>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        mint(label: PromiseOrValue<string>, zilOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        mintAll(tokens: ZilliqaRecover.MintingTokenStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        mintingManager(overrides?: CallOverrides): Promise<[string]>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        onERC721Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        registry(overrides?: CallOverrides): Promise<[string]>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        zilAddress(publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        znsOwnerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
    };
    ZIL_NODE(overrides?: CallOverrides): Promise<BigNumber>;
    claim(tokenId: PromiseOrValue<BigNumberish>, publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, newOwnerAddress: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    claimAll(tokenIds: PromiseOrValue<BigNumberish>[], publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, newOwnerAddress: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    ethAddress(publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    initialize(registry_: PromiseOrValue<string>, mintingManager_: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isOwnedBy(_zilAddress: PromiseOrValue<string>, tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<boolean>;
    isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    mint(label: PromiseOrValue<string>, zilOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    mintAll(tokens: ZilliqaRecover.MintingTokenStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    mintingManager(overrides?: CallOverrides): Promise<string>;
    nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    onERC721Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    registry(overrides?: CallOverrides): Promise<string>;
    verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    zilAddress(publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    znsOwnerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        ZIL_NODE(overrides?: CallOverrides): Promise<BigNumber>;
        claim(tokenId: PromiseOrValue<BigNumberish>, publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, newOwnerAddress: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        claimAll(tokenIds: PromiseOrValue<BigNumberish>[], publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, newOwnerAddress: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        ethAddress(publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        initialize(registry_: PromiseOrValue<string>, mintingManager_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        isOwnedBy(_zilAddress: PromiseOrValue<string>, tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<boolean>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        mint(label: PromiseOrValue<string>, zilOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        mintAll(tokens: ZilliqaRecover.MintingTokenStruct[], overrides?: CallOverrides): Promise<void>;
        mintingManager(overrides?: CallOverrides): Promise<string>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        onERC721Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        registry(overrides?: CallOverrides): Promise<string>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        zilAddress(publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        znsOwnerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "Initialized(uint8)"(version?: null): InitializedEventFilter;
        Initialized(version?: null): InitializedEventFilter;
        "ZnsTokenClaimed(uint256,address,address)"(tokenId?: PromiseOrValue<BigNumberish> | null, oldAddress?: PromiseOrValue<string> | null, newAddress?: PromiseOrValue<string> | null): ZnsTokenClaimedEventFilter;
        ZnsTokenClaimed(tokenId?: PromiseOrValue<BigNumberish> | null, oldAddress?: PromiseOrValue<string> | null, newAddress?: PromiseOrValue<string> | null): ZnsTokenClaimedEventFilter;
        "ZnsTokenMinted(uint256,address,string)"(tokenId?: PromiseOrValue<BigNumberish> | null, zilAddress?: PromiseOrValue<string> | null, label?: null): ZnsTokenMintedEventFilter;
        ZnsTokenMinted(tokenId?: PromiseOrValue<BigNumberish> | null, zilAddress?: PromiseOrValue<string> | null, label?: null): ZnsTokenMintedEventFilter;
    };
    estimateGas: {
        ZIL_NODE(overrides?: CallOverrides): Promise<BigNumber>;
        claim(tokenId: PromiseOrValue<BigNumberish>, publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, newOwnerAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        claimAll(tokenIds: PromiseOrValue<BigNumberish>[], publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, newOwnerAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        ethAddress(publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        initialize(registry_: PromiseOrValue<string>, mintingManager_: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isOwnedBy(_zilAddress: PromiseOrValue<string>, tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        mint(label: PromiseOrValue<string>, zilOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        mintAll(tokens: ZilliqaRecover.MintingTokenStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        mintingManager(overrides?: CallOverrides): Promise<BigNumber>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        onERC721Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        registry(overrides?: CallOverrides): Promise<BigNumber>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        zilAddress(publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        znsOwnerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        ZIL_NODE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        claim(tokenId: PromiseOrValue<BigNumberish>, publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, newOwnerAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        claimAll(tokenIds: PromiseOrValue<BigNumberish>[], publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, newOwnerAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        ethAddress(publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        initialize(registry_: PromiseOrValue<string>, mintingManager_: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isOwnedBy(_zilAddress: PromiseOrValue<string>, tokenIds: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mint(label: PromiseOrValue<string>, zilOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        mintAll(tokens: ZilliqaRecover.MintingTokenStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        mintingManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        onERC721Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        registry(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        zilAddress(publicKeyX: PromiseOrValue<BytesLike>, publicKeyY: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        znsOwnerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ZilliqaRecover.d.ts.map