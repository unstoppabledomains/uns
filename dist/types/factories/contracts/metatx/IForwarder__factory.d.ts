import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IForwarder, IForwarderInterface } from "../../../contracts/metatx/IForwarder";
export declare class IForwarder__factory {
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
    static createInterface(): IForwarderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IForwarder;
}
//# sourceMappingURL=IForwarder__factory.d.ts.map