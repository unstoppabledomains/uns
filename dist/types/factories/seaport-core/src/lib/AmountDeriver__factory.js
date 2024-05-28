"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmountDeriver__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "InexactFraction",
        type: "error",
    },
];
const _bytecode = "0x6080604052348015600e575f80fd5b50601580601a5f395ff3fe60806040525f80fdfea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class AmountDeriver__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    connect(runner) {
        return super.connect(runner);
    }
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.AmountDeriver__factory = AmountDeriver__factory;
AmountDeriver__factory.bytecode = _bytecode;
AmountDeriver__factory.abi = _abi;
