import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { NameResolver, NameResolverInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/reverseRegistrar/ReverseRegistrar.sol/NameResolver";
export declare class NameResolver__factory {
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
    static createInterface(): NameResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): NameResolver;
}
//# sourceMappingURL=NameResolver__factory.d.ts.map