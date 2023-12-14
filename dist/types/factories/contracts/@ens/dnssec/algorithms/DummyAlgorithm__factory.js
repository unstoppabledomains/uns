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
const _bytecode = "0x608060405234801561001057600080fd5b5061014e806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063de8f50a114610030575b600080fd5b61004a61003e3660046100a7565b60019695505050505050565b604051901515815260200160405180910390f35b60008083601f84011261007057600080fd5b50813567ffffffffffffffff81111561008857600080fd5b6020830191508360208285010111156100a057600080fd5b9250929050565b600080600080600080606087890312156100c057600080fd5b863567ffffffffffffffff808211156100d857600080fd5b6100e48a838b0161005e565b909850965060208901359150808211156100fd57600080fd5b6101098a838b0161005e565b9096509450604089013591508082111561012257600080fd5b5061012f89828a0161005e565b979a969950949750929593949250505056fea164736f6c6343000811000a";
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
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
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
exports.DummyAlgorithm__factory = DummyAlgorithm__factory;
DummyAlgorithm__factory.bytecode = _bytecode;
DummyAlgorithm__factory.abi = _abi;
