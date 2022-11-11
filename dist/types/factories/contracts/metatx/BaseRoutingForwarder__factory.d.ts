import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { BaseRoutingForwarder, BaseRoutingForwarderInterface } from "../../../contracts/metatx/BaseRoutingForwarder";
export declare class BaseRoutingForwarder__factory {
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
    static createInterface(): BaseRoutingForwarderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): BaseRoutingForwarder;
}
//# sourceMappingURL=BaseRoutingForwarder__factory.d.ts.map