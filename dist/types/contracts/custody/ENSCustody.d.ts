import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
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
export interface ENSCustodyInterface extends utils.Interface {
    functions: {
        "DEFAULT_ADMIN_ROLE()": FunctionFragment;
        "MINTER_ROLE()": FunctionFragment;
        "NAME()": FunctionFragment;
        "VERSION()": FunctionFragment;
        "addMinter(address)": FunctionFragment;
        "addMinters(address[])": FunctionFragment;
        "closeMinter(address)": FunctionFragment;
        "commit(bytes32)": FunctionFragment;
        "execute((address,uint256,uint256,bytes),bytes)": FunctionFragment;
        "getRoleAdmin(bytes32)": FunctionFragment;
        "grantRole(bytes32,address)": FunctionFragment;
        "hasRole(bytes32,address)": FunctionFragment;
        "initialize(address,address)": FunctionFragment;
        "isMinter(address)": FunctionFragment;
        "isTrustedForwarder(address)": FunctionFragment;
        "makeCommitment(string,address,uint256,bytes32,address,bytes[],bool,uint16,bool)": FunctionFragment;
        "nonceOf(uint256)": FunctionFragment;
        "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
        "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
        "owner()": FunctionFragment;
        "ownerOf(uint256)": FunctionFragment;
        "register(string,address,uint256,bytes32,address,bytes[],bool,uint16,bool)": FunctionFragment;
        "removeMinter(address)": FunctionFragment;
        "removeMinters(address[])": FunctionFragment;
        "renew(string,uint256)": FunctionFragment;
        "renounceMinter()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "renounceRole(bytes32,address)": FunctionFragment;
        "rentPrice(string,uint256)": FunctionFragment;
        "revokeRole(bytes32,address)": FunctionFragment;
        "rotateMinter(address)": FunctionFragment;
        "safeTransfer(address,uint256)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "verify((address,uint256,uint256,bytes),bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "DEFAULT_ADMIN_ROLE" | "MINTER_ROLE" | "NAME" | "VERSION" | "addMinter" | "addMinters" | "closeMinter" | "commit" | "execute" | "getRoleAdmin" | "grantRole" | "hasRole" | "initialize" | "isMinter" | "isTrustedForwarder" | "makeCommitment" | "nonceOf" | "onERC1155BatchReceived" | "onERC1155Received" | "owner" | "ownerOf" | "register" | "removeMinter" | "removeMinters" | "renew" | "renounceMinter" | "renounceOwnership" | "renounceRole" | "rentPrice" | "revokeRole" | "rotateMinter" | "safeTransfer" | "supportsInterface" | "transferOwnership" | "verify"): FunctionFragment;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "MINTER_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "NAME", values?: undefined): string;
    encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "addMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "addMinters", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "closeMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "commit", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "execute", values: [IForwarder.ForwardRequestStruct, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "initialize", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isTrustedForwarder", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "makeCommitment", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>[],
        PromiseOrValue<boolean>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "nonceOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "onERC1155BatchReceived", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "onERC1155Received", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "register", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>[],
        PromiseOrValue<boolean>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "removeMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "removeMinters", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "renew", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "renounceMinter", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "rentPrice", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "rotateMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "safeTransfer", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "verify", values: [IForwarder.ForwardRequestStruct, PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "MINTER_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "NAME", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addMinters", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "closeMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "commit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTrustedForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "makeCommitment", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC1155BatchReceived", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC1155Received", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeMinters", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renew", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rentPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rotateMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
    events: {
        "Initialized(uint8)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
        "Parked(uint256,address)": EventFragment;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
        "RoleGranted(bytes32,address,address)": EventFragment;
        "RoleRevoked(bytes32,address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Parked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
}
export interface InitializedEventObject {
    version: number;
}
export declare type InitializedEvent = TypedEvent<[number], InitializedEventObject>;
export declare type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface ParkedEventObject {
    tokenId: BigNumber;
    owner: string;
}
export declare type ParkedEvent = TypedEvent<[BigNumber, string], ParkedEventObject>;
export declare type ParkedEventFilter = TypedEventFilter<ParkedEvent>;
export interface RoleAdminChangedEventObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
}
export declare type RoleAdminChangedEvent = TypedEvent<[
    string,
    string,
    string
], RoleAdminChangedEventObject>;
export declare type RoleAdminChangedEventFilter = TypedEventFilter<RoleAdminChangedEvent>;
export interface RoleGrantedEventObject {
    role: string;
    account: string;
    sender: string;
}
export declare type RoleGrantedEvent = TypedEvent<[
    string,
    string,
    string
], RoleGrantedEventObject>;
export declare type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;
export interface RoleRevokedEventObject {
    role: string;
    account: string;
    sender: string;
}
export declare type RoleRevokedEvent = TypedEvent<[
    string,
    string,
    string
], RoleRevokedEventObject>;
export declare type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;
export interface ENSCustody extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ENSCustodyInterface;
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
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;
        MINTER_ROLE(overrides?: CallOverrides): Promise<[string]>;
        NAME(overrides?: CallOverrides): Promise<[string]>;
        VERSION(overrides?: CallOverrides): Promise<[string]>;
        addMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        addMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        closeMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        commit(commitment: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        initialize(controller: PromiseOrValue<string>, wrapper: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        makeCommitment(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<[string]>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        onERC1155BatchReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>[], arg3: PromiseOrValue<BigNumberish>[], arg4: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        onERC1155Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BigNumberish>, arg4: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        register(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renew(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceMinter(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        rentPrice(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        rotateMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        safeTransfer(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    };
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    MINTER_ROLE(overrides?: CallOverrides): Promise<string>;
    NAME(overrides?: CallOverrides): Promise<string>;
    VERSION(overrides?: CallOverrides): Promise<string>;
    addMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    closeMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    commit(commitment: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    initialize(controller: PromiseOrValue<string>, wrapper: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    makeCommitment(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<string>;
    nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    onERC1155BatchReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>[], arg3: PromiseOrValue<BigNumberish>[], arg4: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    onERC1155Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BigNumberish>, arg4: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    register(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renew(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceMinter(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    rentPrice(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    rotateMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    safeTransfer(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
        MINTER_ROLE(overrides?: CallOverrides): Promise<string>;
        NAME(overrides?: CallOverrides): Promise<string>;
        VERSION(overrides?: CallOverrides): Promise<string>;
        addMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        addMinters(accounts: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        closeMinter(receiver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        commit(commitment: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        initialize(controller: PromiseOrValue<string>, wrapper: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        makeCommitment(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<string>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        onERC1155BatchReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>[], arg3: PromiseOrValue<BigNumberish>[], arg4: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        onERC1155Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BigNumberish>, arg4: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        register(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        removeMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        removeMinters(accounts: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        renew(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        renounceMinter(overrides?: CallOverrides): Promise<void>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        rentPrice(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        rotateMinter(receiver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        safeTransfer(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "Initialized(uint8)"(version?: null): InitializedEventFilter;
        Initialized(version?: null): InitializedEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        "Parked(uint256,address)"(tokenId?: PromiseOrValue<BigNumberish> | null, owner?: PromiseOrValue<string> | null): ParkedEventFilter;
        Parked(tokenId?: PromiseOrValue<BigNumberish> | null, owner?: PromiseOrValue<string> | null): ParkedEventFilter;
        "RoleAdminChanged(bytes32,bytes32,bytes32)"(role?: PromiseOrValue<BytesLike> | null, previousAdminRole?: PromiseOrValue<BytesLike> | null, newAdminRole?: PromiseOrValue<BytesLike> | null): RoleAdminChangedEventFilter;
        RoleAdminChanged(role?: PromiseOrValue<BytesLike> | null, previousAdminRole?: PromiseOrValue<BytesLike> | null, newAdminRole?: PromiseOrValue<BytesLike> | null): RoleAdminChangedEventFilter;
        "RoleGranted(bytes32,address,address)"(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleGrantedEventFilter;
        RoleGranted(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleGrantedEventFilter;
        "RoleRevoked(bytes32,address,address)"(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleRevokedEventFilter;
        RoleRevoked(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleRevokedEventFilter;
    };
    estimateGas: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        MINTER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        NAME(overrides?: CallOverrides): Promise<BigNumber>;
        VERSION(overrides?: CallOverrides): Promise<BigNumber>;
        addMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        closeMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        commit(commitment: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        initialize(controller: PromiseOrValue<string>, wrapper: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        makeCommitment(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        onERC1155BatchReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>[], arg3: PromiseOrValue<BigNumberish>[], arg4: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        onERC1155Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BigNumberish>, arg4: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        register(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renew(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceMinter(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        rentPrice(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        rotateMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        safeTransfer(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        MINTER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        NAME(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        addMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        closeMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        commit(commitment: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        execute(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(controller: PromiseOrValue<string>, wrapper: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isMinter(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isTrustedForwarder(forwarder: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        makeCommitment(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nonceOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        onERC1155BatchReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>[], arg3: PromiseOrValue<BigNumberish>[], arg4: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        onERC1155Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BigNumberish>, arg4: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        register(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeMinter(account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeMinters(accounts: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renew(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceMinter(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        rentPrice(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        rotateMinter(receiver: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        safeTransfer(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        verify(req: IForwarder.ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ENSCustody.d.ts.map