import type { BaseContract, BigNumber, BigNumberish, Signer, utils } from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
export interface IRootChainInterface extends utils.Interface {
    functions: {};
    events: {
        "NewHeaderBlock(address,uint256,uint256,uint256,uint256,bytes32)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "NewHeaderBlock"): EventFragment;
}
export interface NewHeaderBlockEventObject {
    proposer: string;
    headerBlockId: BigNumber;
    reward: BigNumber;
    start: BigNumber;
    end: BigNumber;
    root: string;
}
export declare type NewHeaderBlockEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string
], NewHeaderBlockEventObject>;
export declare type NewHeaderBlockEventFilter = TypedEventFilter<NewHeaderBlockEvent>;
export interface IRootChain extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IRootChainInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {};
    callStatic: {};
    filters: {
        "NewHeaderBlock(address,uint256,uint256,uint256,uint256,bytes32)"(proposer?: PromiseOrValue<string> | null, headerBlockId?: PromiseOrValue<BigNumberish> | null, reward?: PromiseOrValue<BigNumberish> | null, start?: null, end?: null, root?: null): NewHeaderBlockEventFilter;
        NewHeaderBlock(proposer?: PromiseOrValue<string> | null, headerBlockId?: PromiseOrValue<BigNumberish> | null, reward?: PromiseOrValue<BigNumberish> | null, start?: null, end?: null, root?: null): NewHeaderBlockEventFilter;
    };
    estimateGas: {};
    populateTransaction: {};
}
//# sourceMappingURL=IRootChain.d.ts.map