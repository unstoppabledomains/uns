"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHA256Digest__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "hash",
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
        stateMutability: "pure",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50610283806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063f7e83aee14610030575b600080fd5b61004361003e3660046101ba565b610057565b604051901515815260200160405180910390f35b6000602082146100ad5760405162461bcd60e51b815260206004820152601a60248201527f496e76616c6964207368613235362068617368206c656e677468000000000000604482015260640160405180910390fd5b6100f1600084848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929392505061014d9050565b60028686604051610103929190610226565b602060405180830381855afa158015610120573d6000803e3d6000fd5b5050506040513d601f19601f820116820180604052508101906101439190610236565b1495945050505050565b815160009061015d83602061024f565b111561016857600080fd5b50016020015190565b60008083601f84011261018357600080fd5b50813567ffffffffffffffff81111561019b57600080fd5b6020830191508360208285010111156101b357600080fd5b9250929050565b600080600080604085870312156101d057600080fd5b843567ffffffffffffffff808211156101e857600080fd5b6101f488838901610171565b9096509450602087013591508082111561020d57600080fd5b5061021a87828801610171565b95989497509550505050565b8183823760009101908152919050565b60006020828403121561024857600080fd5b5051919050565b8082018082111561027057634e487b7160e01b600052601160045260246000fd5b9291505056fea164736f6c6343000811000a";
const isSuperArgs = (xs) => xs.length > 1;
class SHA256Digest__factory extends ethers_1.ContractFactory {
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
exports.SHA256Digest__factory = SHA256Digest__factory;
SHA256Digest__factory.bytecode = _bytecode;
SHA256Digest__factory.abi = _abi;
