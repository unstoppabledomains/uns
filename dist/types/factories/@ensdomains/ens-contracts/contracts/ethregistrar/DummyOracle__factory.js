"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyOracle__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "int256",
                name: "_value",
                type: "int256",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
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
    {
        inputs: [
            {
                internalType: "int256",
                name: "_value",
                type: "int256",
            },
        ],
        name: "set",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561000f575f80fd5b506040516100db3803806100db83398101604081905261002e9161003c565b610036815f55565b50610053565b5f6020828403121561004c575f80fd5b5051919050565b607c8061005f5f395ff3fe6080604052348015600e575f80fd5b50600436106030575f3560e01c806350d25bcd146034578063e5c19b2d146048575b5f80fd5b5f5460405190815260200160405180910390f35b605760533660046059565b5f55565b005b5f602082840312156068575f80fd5b503591905056fea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class DummyOracle__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(_value, overrides) {
        return super.getDeployTransaction(_value, overrides || {});
    }
    deploy(_value, overrides) {
        return super.deploy(_value, overrides || {});
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
exports.DummyOracle__factory = DummyOracle__factory;
DummyOracle__factory.bytecode = _bytecode;
DummyOracle__factory.abi = _abi;
