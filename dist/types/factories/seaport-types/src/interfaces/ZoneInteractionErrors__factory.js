"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneInteractionErrors__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "orderHash",
                type: "bytes32",
            },
        ],
        name: "InvalidContractOrder",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "orderHash",
                type: "bytes32",
            },
        ],
        name: "InvalidRestrictedOrder",
        type: "error",
    },
];
class ZoneInteractionErrors__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.ZoneInteractionErrors__factory = ZoneInteractionErrors__factory;
ZoneInteractionErrors__factory.abi = _abi;
