import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { PriceOracle, PriceOracleInterface } from "../../../../contracts/@ens/LegacyETHRegistrarController.sol/PriceOracle";
export declare class PriceOracle__factory {
    static readonly abi: {
        constant: boolean;
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
        payable: boolean;
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): PriceOracleInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): PriceOracle;
}
//# sourceMappingURL=PriceOracle__factory.d.ts.map