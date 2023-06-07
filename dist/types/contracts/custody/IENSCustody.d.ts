import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface IENSCustodyInterface extends utils.Interface {
    functions: {
        "commit(bytes32)": FunctionFragment;
        "makeCommitment(string,address,uint256,bytes32,address,bytes[],bool,uint16,bool)": FunctionFragment;
        "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
        "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
        "ownerOf(uint256)": FunctionFragment;
        "register(string,address,uint256,bytes32,address,bytes[],bool,uint16,bool)": FunctionFragment;
        "renew(string,uint256)": FunctionFragment;
        "rentPrice(string,uint256)": FunctionFragment;
        "safeTransfer(address,uint256)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "commit" | "makeCommitment" | "onERC1155BatchReceived" | "onERC1155Received" | "ownerOf" | "register" | "renew" | "rentPrice" | "safeTransfer" | "supportsInterface"): FunctionFragment;
    encodeFunctionData(functionFragment: "commit", values: [PromiseOrValue<BytesLike>]): string;
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
    encodeFunctionData(functionFragment: "renew", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "rentPrice", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "safeTransfer", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
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
    events: {
        "Parked(uint256,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Parked"): EventFragment;
}
export interface ParkedEventObject {
    tokenId: BigNumber;
    owner: string;
}
export declare type ParkedEvent = TypedEvent<[BigNumber, string], ParkedEventObject>;
export declare type ParkedEventFilter = TypedEventFilter<ParkedEvent>;
export interface IENSCustody extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IENSCustodyInterface;
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
        commit(commitment: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        makeCommitment(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        onERC1155BatchReceived(operator: PromiseOrValue<string>, from: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        onERC1155Received(operator: PromiseOrValue<string>, from: PromiseOrValue<string>, id: PromiseOrValue<BigNumberish>, value: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        register(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renew(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        rentPrice(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        safeTransfer(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    };
    commit(commitment: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    makeCommitment(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    onERC1155BatchReceived(operator: PromiseOrValue<string>, from: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    onERC1155Received(operator: PromiseOrValue<string>, from: PromiseOrValue<string>, id: PromiseOrValue<BigNumberish>, value: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    register(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renew(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    rentPrice(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    safeTransfer(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        commit(commitment: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        makeCommitment(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<string>;
        onERC1155BatchReceived(operator: PromiseOrValue<string>, from: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        onERC1155Received(operator: PromiseOrValue<string>, from: PromiseOrValue<string>, id: PromiseOrValue<BigNumberish>, value: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        register(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        renew(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        rentPrice(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        safeTransfer(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "Parked(uint256,address)"(tokenId?: PromiseOrValue<BigNumberish> | null, owner?: PromiseOrValue<string> | null): ParkedEventFilter;
        Parked(tokenId?: PromiseOrValue<BigNumberish> | null, owner?: PromiseOrValue<string> | null): ParkedEventFilter;
    };
    estimateGas: {
        commit(commitment: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        makeCommitment(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        onERC1155BatchReceived(operator: PromiseOrValue<string>, from: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        onERC1155Received(operator: PromiseOrValue<string>, from: PromiseOrValue<string>, id: PromiseOrValue<BigNumberish>, value: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        register(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renew(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        rentPrice(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        safeTransfer(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        commit(commitment: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        makeCommitment(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        onERC1155BatchReceived(operator: PromiseOrValue<string>, from: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        onERC1155Received(operator: PromiseOrValue<string>, from: PromiseOrValue<string>, id: PromiseOrValue<BigNumberish>, value: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        register(name: PromiseOrValue<string>, owner: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, secret: PromiseOrValue<BytesLike>, resolver: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>[], reverseRecord: PromiseOrValue<boolean>, ownerControlledFuses: PromiseOrValue<BigNumberish>, selfCustody: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renew(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        rentPrice(name: PromiseOrValue<string>, duration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        safeTransfer(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IENSCustody.d.ts.map