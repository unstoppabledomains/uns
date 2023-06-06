import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IDNSRecordResolver, IDNSRecordResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IDNSRecordResolver";
export declare class IDNSRecordResolver__factory {
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
    static createInterface(): IDNSRecordResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IDNSRecordResolver;
}
//# sourceMappingURL=IDNSRecordResolver__factory.d.ts.map