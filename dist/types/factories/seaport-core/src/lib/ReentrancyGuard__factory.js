"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReentrancyGuard__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "NoReentrantCalls",
        type: "error",
    },
    {
        inputs: [],
        name: "TStoreAlreadyActivated",
        type: "error",
    },
    {
        inputs: [],
        name: "TStoreNotSupported",
        type: "error",
    },
    {
        inputs: [],
        name: "TloadTestContractDeploymentFailed",
        type: "error",
    },
    {
        inputs: [],
        name: "__activateTstore",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60c060405234801561000f575f80fd5b505f610019610076565b90506001600160a01b03811661004257604051632aea588760e01b815260040160405180910390fd5b5f61004c8261008f565b8015156080526001600160a01b03831660a05290508061006f57600163929eee14555b505061010c565b5f696002601e613d5c3d52f35f52600a60165ff0905090565b5f816001600160a01b0316600a5a6100a791906100ed565b6040515f8181818686fa925050503d805f81146100df576040519150601f19603f3d011682016040523d82523d5f602084013e6100e4565b606091505b50909392505050565b5f8261010757634e487b7160e01b5f52601260045260245ffd5b500490565b60805160a05161016261012b5f395f608d01525f604201526101625ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c80637423eb3c1461002d575b5f80fd5b610035610037565b005b63929eee14546001147f00000000000000000000000000000000000000000000000000000000000000008061006a575080155b1561008857604051630f45b98b60e41b815260040160405180910390fd5b6100b17f00000000000000000000000000000000000000000000000000000000000000006100d8565b6100ce576040516370a4078f60e01b815260040160405180910390fd5b5f63929eee145550565b5f816001600160a01b0316600a5a6100f09190610136565b6040515f8181818686fa925050503d805f8114610128576040519150601f19603f3d011682016040523d82523d5f602084013e61012d565b606091505b50909392505050565b5f8261015057634e487b7160e01b5f52601260045260245ffd5b50049056fea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class ReentrancyGuard__factory extends ethers_1.ContractFactory {
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
exports.ReentrancyGuard__factory = ReentrancyGuard__factory;
ReentrancyGuard__factory.bytecode = _bytecode;
ReentrancyGuard__factory.abi = _abi;
