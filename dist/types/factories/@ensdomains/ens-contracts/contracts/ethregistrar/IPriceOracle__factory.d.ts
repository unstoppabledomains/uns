import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IPriceOracle, IPriceOracleInterface } from "../../../../../@ensdomains/ens-contracts/contracts/ethregistrar/IPriceOracle";
export declare class IPriceOracle__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IPriceOracleInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IPriceOracle;
}
//# sourceMappingURL=IPriceOracle__factory.d.ts.map