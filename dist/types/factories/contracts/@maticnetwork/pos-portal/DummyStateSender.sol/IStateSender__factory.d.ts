import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IStateSender, IStateSenderInterface } from "../../../../../contracts/@maticnetwork/pos-portal/DummyStateSender.sol/IStateSender";
export declare class IStateSender__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IStateSenderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IStateSender;
}
//# sourceMappingURL=IStateSender__factory.d.ts.map