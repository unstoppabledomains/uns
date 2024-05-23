"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReentrancyErrors__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "NoReentrantCalls",
        type: "error",
    },
    {
        inputs: [],
        name: "TStoreAlreadyActivated",
        type: "error",
    },
    {
        inputs: [],
        name: "TStoreNotSupported",
        type: "error",
    },
    {
        inputs: [],
        name: "TloadTestContractDeploymentFailed",
        type: "error",
    },
];
class ReentrancyErrors__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.ReentrancyErrors__factory = ReentrancyErrors__factory;
ReentrancyErrors__factory.abi = _abi;
