import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { INameWrapperUpgrade, INameWrapperUpgradeInterface } from "../../../../../@ensdomains/ens-contracts/contracts/wrapper/INameWrapperUpgrade";
export declare class INameWrapperUpgrade__factory {
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
    static createInterface(): INameWrapperUpgradeInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): INameWrapperUpgrade;
}
//# sourceMappingURL=INameWrapperUpgrade__factory.d.ts.map