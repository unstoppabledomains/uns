"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENSCustody__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract IETHRegistrarController",
                name: "controller",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
];
const _bytecode = "0x6080604052348015600f57600080fd5b50604051609f380380609f833981016040819052602a91604e565b600080546001600160a01b0319166001600160a01b0392909216919091179055607c565b600060208284031215605f57600080fd5b81516001600160a01b0381168114607557600080fd5b9392505050565b60168060896000396000f3fe6080604052600080fdfea164736f6c6343000811000a";
const isSuperArgs = (xs) => xs.length > 1;
class ENSCustody__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(controller, overrides) {
        return super.deploy(controller, overrides || {});
    }
    getDeployTransaction(controller, overrides) {
        return super.getDeployTransaction(controller, overrides || {});
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
exports.ENSCustody__factory = ENSCustody__factory;
ENSCustody__factory.bytecode = _bytecode;
ENSCustody__factory.abi = _abi;
