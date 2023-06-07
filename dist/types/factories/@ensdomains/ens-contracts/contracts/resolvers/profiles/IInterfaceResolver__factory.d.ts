import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IInterfaceResolver, IInterfaceResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IInterfaceResolver";
export declare class IInterfaceResolver__factory {
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
    static createInterface(): IInterfaceResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IInterfaceResolver;
}
//# sourceMappingURL=IInterfaceResolver__factory.d.ts.map