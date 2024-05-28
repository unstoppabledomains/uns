import { type ContractRunner } from "ethers";
import type { CriteriaResolutionErrors, CriteriaResolutionErrorsInterface } from "../../../../seaport-types/src/interfaces/CriteriaResolutionErrors";
export declare class CriteriaResolutionErrors__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "ConsiderationCriteriaResolverOutOfRange";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "CriteriaNotEnabledForItem";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidProof";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OfferCriteriaResolverOutOfRange";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "enum Side";
            readonly name: "side";
            readonly type: "uint8";
        }];
        readonly name: "OrderCriteriaResolverOutOfRange";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "orderIndex";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "considerationIndex";
            readonly type: "uint256";
        }];
        readonly name: "UnresolvedConsiderationCriteria";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "orderIndex";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "offerIndex";
            readonly type: "uint256";
        }];
        readonly name: "UnresolvedOfferCriteria";
        readonly type: "error";
    }];
    static createInterface(): CriteriaResolutionErrorsInterface;
    static connect(address: string, runner?: ContractRunner | null): CriteriaResolutionErrors;
}
//# sourceMappingURL=CriteriaResolutionErrors__factory.d.ts.map