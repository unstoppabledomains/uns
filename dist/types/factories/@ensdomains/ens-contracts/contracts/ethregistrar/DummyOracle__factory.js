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
const _bytecode = "0x608060405234801561001057600080fd5b506040516100e83803806100e883398101604081905261002f9161003e565b61003881600055565b50610057565b60006020828403121561005057600080fd5b5051919050565b6083806100656000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806350d25bcd146037578063e5c19b2d14604c575b600080fd5b60005460405190815260200160405180910390f35b605c6057366004605e565b600055565b005b600060208284031215606f57600080fd5b503591905056fea164736f6c6343000811000a";
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
    deploy(_value, overrides) {
        return super.deploy(_value, overrides || {});
    }
    getDeployTransaction(_value, overrides) {
        return super.getDeployTransaction(_value, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.DummyOracle__factory = DummyOracle__factory;
DummyOracle__factory.bytecode = _bytecode;
DummyOracle__factory.abi = _abi;
