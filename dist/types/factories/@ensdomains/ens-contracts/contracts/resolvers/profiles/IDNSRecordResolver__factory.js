"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDNSRecordResolver__factory = void 0;
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
                name: "name",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "uint16",
                name: "resource",
                type: "uint16",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "record",
                type: "bytes",
            },
        ],
        name: "DNSRecordChanged",
        type: "event",
    },
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
                name: "name",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "uint16",
                name: "resource",
                type: "uint16",
            },
        ],
        name: "DNSRecordDeleted",
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
                internalType: "bytes32",
                name: "name",
                type: "bytes32",
            },
            {
                internalType: "uint16",
                name: "resource",
                type: "uint16",
            },
        ],
        name: "dnsRecord",
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
class IDNSRecordResolver__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IDNSRecordResolver__factory = IDNSRecordResolver__factory;
IDNSRecordResolver__factory.abi = _abi;
