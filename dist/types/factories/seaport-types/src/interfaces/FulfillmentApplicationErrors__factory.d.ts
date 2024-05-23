import { type ContractRunner } from "ethers";
import type { FulfillmentApplicationErrors, FulfillmentApplicationErrorsInterface } from "../../../../seaport-types/src/interfaces/FulfillmentApplicationErrors";
export declare class FulfillmentApplicationErrors__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "InvalidFulfillmentComponentData";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "fulfillmentIndex";
            readonly type: "uint256";
        }];
        readonly name: "MismatchedFulfillmentOfferAndConsiderationComponents";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "enum Side";
            readonly name: "side";
            readonly type: "uint8";
        }];
        readonly name: "MissingFulfillmentComponentOnAggregation";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OfferAndConsiderationRequiredOnFulfillment";
        readonly type: "error";
    }];
    static createInterface(): FulfillmentApplicationErrorsInterface;
    static connect(address: string, runner?: ContractRunner | null): FulfillmentApplicationErrors;
}
//# sourceMappingURL=FulfillmentApplicationErrors__factory.d.ts.map