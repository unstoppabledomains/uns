"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDNSZoneResolver__factory = void 0;
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
                internalType: "bytes",
                name: "lastzonehash",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "zonehash",
                type: "bytes",
            },
        ],
        name: "DNSZonehashChanged",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "zonehash",
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
class IDNSZoneResolver__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IDNSZoneResolver__factory = IDNSZoneResolver__factory;
IDNSZoneResolver__factory.abi = _abi;
