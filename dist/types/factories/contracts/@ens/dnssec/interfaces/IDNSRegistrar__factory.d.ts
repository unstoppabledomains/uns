import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IDNSRegistrar, IDNSRegistrarInterface } from "../../../../../contracts/@ens/dnssec/interfaces/IDNSRegistrar";
export declare class IDNSRegistrar__factory {
    static readonly abi: {
        inputs: ({
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        } | {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        })[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IDNSRegistrarInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IDNSRegistrar;
}
//# sourceMappingURL=IDNSRegistrar__factory.d.ts.map