"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHA1__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "x",
                type: "bytes32",
            },
        ],
        name: "Debug",
        type: "event",
    },
];
const _bytecode = "0x602c6032600b8282823980515f1a607314602657634e487b7160e01b5f525f60045260245ffd5b305f52607381538281f3fe730000000000000000000000000000000000000000301460806040525f80fdfea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class SHA1__factory extends ethers_1.ContractFactory {
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
exports.SHA1__factory = SHA1__factory;
SHA1__factory.bytecode = _bytecode;
SHA1__factory.abi = _abi;
