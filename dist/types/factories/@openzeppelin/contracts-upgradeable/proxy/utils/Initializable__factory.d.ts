import { type ContractRunner } from "ethers";
import type { Initializable, InitializableInterface } from "../../../../../@openzeppelin/contracts-upgradeable/proxy/utils/Initializable";
export declare class Initializable__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint8";
            readonly name: "version";
            readonly type: "uint8";
        }];
        readonly name: "Initialized";
        readonly type: "event";
    }];
    static createInterface(): InitializableInterface;
    static connect(address: string, runner?: ContractRunner | null): Initializable;
}
//# sourceMappingURL=Initializable__factory.d.ts.map