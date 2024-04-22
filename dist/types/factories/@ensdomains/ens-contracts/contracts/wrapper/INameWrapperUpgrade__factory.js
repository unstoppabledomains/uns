"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INameWrapperUpgrade__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "bytes",
                name: "name",
                type: "bytes",
            },
            {
                internalType: "address",
                name: "wrappedOwner",
                type: "address",
            },
            {
                internalType: "uint32",
                name: "fuses",
                type: "uint32",
            },
            {
                internalType: "uint64",
                name: "expiry",
                type: "uint64",
            },
            {
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "extraData",
                type: "bytes",
            },
        ],
        name: "wrapFromUpgrade",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class INameWrapperUpgrade__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.INameWrapperUpgrade__factory = INameWrapperUpgrade__factory;
INameWrapperUpgrade__factory.abi = _abi;
