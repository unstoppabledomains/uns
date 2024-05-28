"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriteriaResolutionErrors__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "ConsiderationCriteriaResolverOutOfRange",
        type: "error",
    },
    {
        inputs: [],
        name: "CriteriaNotEnabledForItem",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidProof",
        type: "error",
    },
    {
        inputs: [],
        name: "OfferCriteriaResolverOutOfRange",
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
        name: "OrderCriteriaResolverOutOfRange",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "orderIndex",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "considerationIndex",
                type: "uint256",
            },
        ],
        name: "UnresolvedConsiderationCriteria",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "orderIndex",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "offerIndex",
                type: "uint256",
            },
        ],
        name: "UnresolvedOfferCriteria",
        type: "error",
    },
];
class CriteriaResolutionErrors__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.CriteriaResolutionErrors__factory = CriteriaResolutionErrors__factory;
CriteriaResolutionErrors__factory.abi = _abi;
