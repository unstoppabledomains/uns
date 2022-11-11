"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSend__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address payable[]",
                name: "accounts",
                type: "address[]",
            },
            {
                internalType: "uint256[]",
                name: "values",
                type: "uint256[]",
            },
        ],
        stateMutability: "payable",
        type: "constructor",
    },
];
const _bytecode = "0x608060405260405161029c38038061029c8339810160408190526100229161013b565b60005b82518110156100c85782818151811061004e57634e487b7160e01b600052603260045260246000fd5b60200260200101516001600160a01b03166108fc83838151811061008257634e487b7160e01b600052603260045260246000fd5b60200260200101519081150290604051600060405180830381858888f193505050501580156100b5573d6000803e3d6000fd5b50806100c08161025e565b915050610025565b5033ff5b600082601f8301126100dc578081fd5b815160206100f16100ec8361023b565b61020b565b80838252828201915082860187848660051b8901011115610110578586fd5b855b8581101561012e57815184529284019290840190600101610112565b5090979650505050505050565b6000806040838503121561014d578182fd5b82516001600160401b0380821115610163578384fd5b818501915085601f830112610176578384fd5b815160206101866100ec8361023b565b8083825282820191508286018a848660051b89010111156101a5578889fd5b8896505b848710156101db5780516001600160a01b03811681146101c757898afd5b8352600196909601959183019183016101a9565b50918801519196509093505050808211156101f4578283fd5b50610201858286016100cc565b9150509250929050565b604051601f8201601f191681016001600160401b038111828210171561023357610233610285565b604052919050565b60006001600160401b0382111561025457610254610285565b5060051b60200190565b600060001982141561027e57634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fdfe";
const isSuperArgs = (xs) => xs.length > 1;
class MultiSend__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(accounts, values, overrides) {
        return super.deploy(accounts, values, overrides || {});
    }
    getDeployTransaction(accounts, values, overrides) {
        return super.getDeployTransaction(accounts, values, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.MultiSend__factory = MultiSend__factory;
MultiSend__factory.bytecode = _bytecode;
MultiSend__factory.abi = _abi;
