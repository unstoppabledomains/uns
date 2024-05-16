import { type ContractRunner } from "ethers";
import type { IMetadataService, IMetadataServiceInterface } from "../../../../../@ensdomains/ens-contracts/contracts/wrapper/IMetadataService";
export declare class IMetadataService__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "uri";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IMetadataServiceInterface;
    static connect(address: string, runner?: ContractRunner | null): IMetadataService;
}
//# sourceMappingURL=IMetadataService__factory.d.ts.map