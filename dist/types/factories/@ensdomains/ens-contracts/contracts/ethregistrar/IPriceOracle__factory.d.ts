import { type ContractRunner } from "ethers";
import type { IPriceOracle, IPriceOracleInterface } from "../../../../../@ensdomains/ens-contracts/contracts/ethregistrar/IPriceOracle";
export declare class IPriceOracle__factory {
    static readonly abi: readonly [{
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
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "base";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "premium";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IPriceOracle.Price";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IPriceOracleInterface;
    static connect(address: string, runner?: ContractRunner | null): IPriceOracle;
}
//# sourceMappingURL=IPriceOracle__factory.d.ts.map