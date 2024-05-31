"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmountDerivationErrors__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "InexactFraction",
        type: "error",
    },
];
class AmountDerivationErrors__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.AmountDerivationErrors__factory = AmountDerivationErrors__factory;
AmountDerivationErrors__factory.abi = _abi;
