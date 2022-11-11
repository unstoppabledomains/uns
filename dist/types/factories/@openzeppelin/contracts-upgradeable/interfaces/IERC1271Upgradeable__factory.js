"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IERC1271Upgradeable__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "isValidSignature",
        outputs: [
            {
                internalType: "bytes4",
                name: "magicValue",
                type: "bytes4",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IERC1271Upgradeable__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IERC1271Upgradeable__factory = IERC1271Upgradeable__factory;
IERC1271Upgradeable__factory.abi = _abi;
