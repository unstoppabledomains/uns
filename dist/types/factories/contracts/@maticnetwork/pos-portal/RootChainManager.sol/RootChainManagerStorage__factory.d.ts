import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { RootChainManagerStorage, RootChainManagerStorageInterface } from "../../../../../contracts/@maticnetwork/pos-portal/RootChainManager.sol/RootChainManagerStorage";
export declare class RootChainManagerStorage__factory {
    static readonly abi: {
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
    }[];
    static createInterface(): RootChainManagerStorageInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): RootChainManagerStorage;
}
//# sourceMappingURL=RootChainManagerStorage__factory.d.ts.map