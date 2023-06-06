"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IInterfaceResolver__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes4",
                name: "interfaceID",
                type: "bytes4",
            },
            {
                indexed: false,
                internalType: "address",
                name: "implementer",
                type: "address",
            },
        ],
        name: "InterfaceChanged",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "bytes4",
                name: "interfaceID",
                type: "bytes4",
            },
        ],
        name: "interfaceImplementer",
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
];
class IInterfaceResolver__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IInterfaceResolver__factory = IInterfaceResolver__factory;
IInterfaceResolver__factory.abi = _abi;
