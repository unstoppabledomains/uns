"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Owned__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "setOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561000f575f80fd5b505f80546001600160a01b0319163317905560df8061002d5f395ff3fe6080604052348015600e575f80fd5b50600436106030575f3560e01c806313af40351460345780638da5cb5b146045575b5f80fd5b6043603f36600460a7565b6072565b005b5f546056906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b5f546001600160a01b031633146086575f80fd5b5f80546001600160a01b0319166001600160a01b0392909216919091179055565b5f6020828403121560b6575f80fd5b81356001600160a01b038116811460cb575f80fd5b939250505056fea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class Owned__factory extends ethers_1.ContractFactory {
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
exports.Owned__factory = Owned__factory;
Owned__factory.bytecode = _bytecode;
Owned__factory.abi = _abi;
