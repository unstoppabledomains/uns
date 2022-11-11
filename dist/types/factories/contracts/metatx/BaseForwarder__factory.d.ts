import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { BaseForwarder, BaseForwarderInterface } from "../../../contracts/metatx/BaseForwarder";
export declare class BaseForwarder__factory {
    static readonly abi: {
        inputs: ({
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        } | {
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        })[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): BaseForwarderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): BaseForwarder;
}
//# sourceMappingURL=BaseForwarder__factory.d.ts.map