"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDNSRegistrar__factory = void 0;
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
                internalType: "bytes",
                name: "proof",
                type: "bytes",
            },
        ],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "name",
                type: "bytes",
            },
            {
                components: [
                    {
                        internalType: "bytes",
                        name: "rrset",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "sig",
                        type: "bytes",
                    },
                ],
                internalType: "struct DNSSEC.RRSetWithSignature[]",
                name: "input",
                type: "tuple[]",
            },
            {
                internalType: "bytes",
                name: "proof",
                type: "bytes",
            },
        ],
        name: "proveAndClaim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "name",
                type: "bytes",
            },
            {
                components: [
                    {
                        internalType: "bytes",
                        name: "rrset",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "sig",
                        type: "bytes",
                    },
                ],
                internalType: "struct DNSSEC.RRSetWithSignature[]",
                name: "input",
                type: "tuple[]",
            },
            {
                internalType: "bytes",
                name: "proof",
                type: "bytes",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "proveAndClaimWithResolver",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IDNSRegistrar__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IDNSRegistrar__factory = IDNSRegistrar__factory;
IDNSRegistrar__factory.abi = _abi;
