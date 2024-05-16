"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyStateSender__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "contractAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "StateSynced",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "syncState",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50610130806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806316f1983114610030575b600080fd5b6100b06004803603604081101561004657600080fd5b6001600160a01b03823516919081019060408101602082013564010000000081111561007157600080fd5b82018360208201111561008357600080fd5b803590602001918460018302840111640100000000831117156100a557600080fd5b5090925090506100b2565b005b826001600160a01b031660017f103fed9db65eac19c4d870f49ab7520fe03b99f1838e5996caf47e9e43308392848460405180806020018281038252848482818152602001925080828437600083820152604051601f909101601f19169092018290039550909350505050a350505056fea164736f6c6343000606000a";
const isSuperArgs = (xs) => xs.length > 1;
class DummyStateSender__factory extends ethers_1.ContractFactory {
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
exports.DummyStateSender__factory = DummyStateSender__factory;
DummyStateSender__factory.bytecode = _bytecode;
DummyStateSender__factory.abi = _abi;
