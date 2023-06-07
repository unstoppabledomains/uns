import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { AggregatorInterface, AggregatorInterfaceInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/ethregistrar/StablePriceOracle.sol/AggregatorInterface";
export declare class AggregatorInterface__factory {
    static readonly abi: {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): AggregatorInterfaceInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): AggregatorInterface;
}
//# sourceMappingURL=AggregatorInterface__factory.d.ts.map