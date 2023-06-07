"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAddressResolver__factory = void 0;
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
                indexed: false,
                internalType: "uint256",
                name: "coinType",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "newAddress",
                type: "bytes",
            },
        ],
        name: "AddressChanged",
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
                internalType: "uint256",
                name: "coinType",
                type: "uint256",
            },
        ],
        name: "addr",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IAddressResolver__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IAddressResolver__factory = IAddressResolver__factory;
IAddressResolver__factory.abi = _abi;
