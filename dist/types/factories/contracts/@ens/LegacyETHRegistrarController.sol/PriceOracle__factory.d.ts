import { type ContractRunner } from "ethers";
import type { PriceOracle, PriceOracleInterface } from "../../../../contracts/@ens/LegacyETHRegistrarController.sol/PriceOracle";
export declare class PriceOracle__factory {
    static readonly abi: readonly [{
        readonly constant: true;
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly internalType: "uint256";
            readonly name: "expires";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "duration";
            readonly type: "uint256";
        }];
        readonly name: "price";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): PriceOracleInterface;
    static connect(address: string, runner?: ContractRunner | null): PriceOracle;
}
//# sourceMappingURL=PriceOracle__factory.d.ts.map