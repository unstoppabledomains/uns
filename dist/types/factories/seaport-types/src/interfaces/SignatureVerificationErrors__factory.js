"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureVerificationErrors__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "BadContractSignature",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "v",
                type: "uint8",
            },
        ],
        name: "BadSignatureV",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidSignature",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidSigner",
        type: "error",
    },
];
class SignatureVerificationErrors__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.SignatureVerificationErrors__factory = SignatureVerificationErrors__factory;
SignatureVerificationErrors__factory.abi = _abi;
