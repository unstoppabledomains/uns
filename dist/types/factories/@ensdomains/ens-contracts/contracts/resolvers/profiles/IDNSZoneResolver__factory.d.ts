import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IDNSZoneResolver, IDNSZoneResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IDNSZoneResolver";
export declare class IDNSZoneResolver__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): IDNSZoneResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IDNSZoneResolver;
}
//# sourceMappingURL=IDNSZoneResolver__factory.d.ts.map