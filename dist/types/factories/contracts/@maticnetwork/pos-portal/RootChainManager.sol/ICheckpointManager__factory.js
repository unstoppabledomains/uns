"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICheckpointManager__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "headerBlocks",
        outputs: [
            {
                internalType: "bytes32",
                name: "root",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "start",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "end",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "createdAt",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "proposer",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5060c08061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806341539d4a14602d575b600080fd5b604760048036036020811015604157600080fd5b5035607b565b6040805195865260208601949094528484019290925260608401526001600160a01b03166080830152519081900360a00190f35b60006020819052908152604090208054600182015460028301546003840154600490940154929391929091906001600160a01b03168556fea164736f6c6343000606000a";
const isSuperArgs = (xs) => xs.length > 1;
class ICheckpointManager__factory extends ethers_1.ContractFactory {
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
exports.ICheckpointManager__factory = ICheckpointManager__factory;
ICheckpointManager__factory.bytecode = _bytecode;
ICheckpointManager__factory.abi = _abi;
