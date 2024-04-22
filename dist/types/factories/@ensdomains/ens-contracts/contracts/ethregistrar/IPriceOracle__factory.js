"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPriceOracle__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "expires",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
        ],
        name: "price",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "base",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "premium",
                        type: "uint256",
                    },
                ],
                internalType: "struct IPriceOracle.Price",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IPriceOracle__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IPriceOracle__factory = IPriceOracle__factory;
IPriceOracle__factory.abi = _abi;
