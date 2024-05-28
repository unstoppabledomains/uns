"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FulfillmentApplicationErrors__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "InvalidFulfillmentComponentData",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "fulfillmentIndex",
                type: "uint256",
            },
        ],
        name: "MismatchedFulfillmentOfferAndConsiderationComponents",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "enum Side",
                name: "side",
                type: "uint8",
            },
        ],
        name: "MissingFulfillmentComponentOnAggregation",
        type: "error",
    },
    {
        inputs: [],
        name: "OfferAndConsiderationRequiredOnFulfillment",
        type: "error",
    },
];
class FulfillmentApplicationErrors__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.FulfillmentApplicationErrors__factory = FulfillmentApplicationErrors__factory;
FulfillmentApplicationErrors__factory.abi = _abi;
