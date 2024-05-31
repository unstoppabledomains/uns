"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TLDPublicSuffixList__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "bytes",
                name: "name",
                type: "bytes",
            },
        ],
        name: "isPublicSuffix",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561000f575f80fd5b506101d18061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c80634f89059e1461002d575b5f80fd5b61004061003b366004610125565b610054565b604051901515815260200160405180910390f35b5f806100985f85858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525092939250506101029050565b60ff1690505f811180156100f857506100f36100b5826001610191565b85858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525092939250506101029050565b60ff16155b9150505b92915050565b5f828281518110610115576101156101b0565b016020015160f81c905092915050565b5f8060208385031215610136575f80fd5b823567ffffffffffffffff8082111561014d575f80fd5b818501915085601f830112610160575f80fd5b81358181111561016e575f80fd5b86602082850101111561017f575f80fd5b60209290920196919550909350505050565b808201808211156100fc57634e487b7160e01b5f52601160045260245ffd5b634e487b7160e01b5f52603260045260245ffdfea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class TLDPublicSuffixList__factory extends ethers_1.ContractFactory {
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
exports.TLDPublicSuffixList__factory = TLDPublicSuffixList__factory;
TLDPublicSuffixList__factory.bytecode = _bytecode;
TLDPublicSuffixList__factory.abi = _abi;
