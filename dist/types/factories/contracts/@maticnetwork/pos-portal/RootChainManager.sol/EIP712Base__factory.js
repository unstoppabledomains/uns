"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EIP712Base__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "ERC712_VERSION",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getChainId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [],
        name: "getDomainSeperator",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x60806040526000805460ff1916905534801561001a57600080fd5b5061010b8061002a6000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80630f7e597014604157806320379ee51460b95780633408e4701460d1575b600080fd5b604760d7565b6040805160208082528351818301528351919283929083019185019080838360005b83811015607f5781810151838201526020016069565b50505050905090810190601f16801560ab5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60bf60f4565b60408051918252519081900360200190f35b60bf60fa565b604051806040016040528060018152602001603160f81b81525081565b60015490565b469056fea164736f6c6343000606000a";
const isSuperArgs = (xs) => xs.length > 1;
class EIP712Base__factory extends ethers_1.ContractFactory {
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
exports.EIP712Base__factory = EIP712Base__factory;
EIP712Base__factory.bytecode = _bytecode;
EIP712Base__factory.abi = _abi;
