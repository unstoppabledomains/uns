"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TLDPublicSuffixList__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "bytes",
                name: "name",
                type: "bytes",
            },
        ],
        name: "isPublicSuffix",
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
const _bytecode = "0x608060405234801561001057600080fd5b506101e4806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80634f89059e14610030575b600080fd5b61004361003e36600461012e565b610057565b604051901515815260200160405180910390f35b60008061009e600085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929392505061010a9050565b60ff16905060008111801561010057506100fb6100bc8260016101a0565b85858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929392505061010a9050565b60ff16155b9150505b92915050565b600082828151811061011e5761011e6101c1565b016020015160f81c905092915050565b6000806020838503121561014157600080fd5b823567ffffffffffffffff8082111561015957600080fd5b818501915085601f83011261016d57600080fd5b81358181111561017c57600080fd5b86602082850101111561018e57600080fd5b60209290920196919550909350505050565b8082018082111561010457634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fdfea164736f6c6343000811000a";
const isSuperArgs = (xs) => xs.length > 1;
class TLDPublicSuffixList__factory extends ethers_1.ContractFactory {
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
exports.TLDPublicSuffixList__factory = TLDPublicSuffixList__factory;
TLDPublicSuffixList__factory.bytecode = _bytecode;
TLDPublicSuffixList__factory.abi = _abi;
