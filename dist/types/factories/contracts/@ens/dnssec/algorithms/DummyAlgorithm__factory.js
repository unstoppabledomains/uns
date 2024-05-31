"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyAlgorithm__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "verify",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561000f575f80fd5b506101408061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063de8f50a11461002d575b5f80fd5b61004761003b3660046100a0565b60019695505050505050565b604051901515815260200160405180910390f35b5f8083601f84011261006b575f80fd5b50813567ffffffffffffffff811115610082575f80fd5b602083019150836020828501011115610099575f80fd5b9250929050565b5f805f805f80606087890312156100b5575f80fd5b863567ffffffffffffffff808211156100cc575f80fd5b6100d88a838b0161005b565b909850965060208901359150808211156100f0575f80fd5b6100fc8a838b0161005b565b90965094506040890135915080821115610114575f80fd5b5061012189828a0161005b565b979a969950949750929593949250505056fea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class DummyAlgorithm__factory extends ethers_1.ContractFactory {
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
exports.DummyAlgorithm__factory = DummyAlgorithm__factory;
DummyAlgorithm__factory.bytecode = _bytecode;
DummyAlgorithm__factory.abi = _abi;
