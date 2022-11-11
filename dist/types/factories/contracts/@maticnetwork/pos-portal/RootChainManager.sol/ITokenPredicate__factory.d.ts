import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ITokenPredicate, ITokenPredicateInterface } from "../../../../../contracts/@maticnetwork/pos-portal/RootChainManager.sol/ITokenPredicate";
export declare class ITokenPredicate__factory {
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
    static createInterface(): ITokenPredicateInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ITokenPredicate;
}
//# sourceMappingURL=ITokenPredicate__factory.d.ts.map