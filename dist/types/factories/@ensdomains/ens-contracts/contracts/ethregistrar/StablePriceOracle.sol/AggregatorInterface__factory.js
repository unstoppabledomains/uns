"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregatorInterface__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "latestAnswer",
        outputs: [
            {
                internalType: "int256",
                name: "",
                type: "int256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class AggregatorInterface__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.AggregatorInterface__factory = AggregatorInterface__factory;
AggregatorInterface__factory.abi = _abi;
