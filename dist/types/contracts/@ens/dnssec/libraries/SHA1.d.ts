import type { BaseContract, Signer, utils } from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../../../common";
export interface SHA1Interface extends utils.Interface {
    functions: {};
    events: {
        "Debug(bytes32)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Debug"): EventFragment;
}
export interface DebugEventObject {
    x: string;
}
export declare type DebugEvent = TypedEvent<[string], DebugEventObject>;
export declare type DebugEventFilter = TypedEventFilter<DebugEvent>;
export interface SHA1 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: SHA1Interface;
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
        "Debug(bytes32)"(x?: null): DebugEventFilter;
        Debug(x?: null): DebugEventFilter;
    };
    estimateGas: {};
    populateTransaction: {};
}
//# sourceMappingURL=SHA1.d.ts.map