import { type ContractRunner } from "ethers";
import type { AggregatorInterface, AggregatorInterfaceInterface } from "../../../../../../@ensdomains/ens-contracts/contracts/ethregistrar/StablePriceOracle.sol/AggregatorInterface";
export declare class AggregatorInterface__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "latestAnswer";
        readonly outputs: readonly [{
            readonly internalType: "int256";
            readonly name: "";
            readonly type: "int256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): AggregatorInterfaceInterface;
    static connect(address: string, runner?: ContractRunner | null): AggregatorInterface;
}
//# sourceMappingURL=AggregatorInterface__factory.d.ts.map