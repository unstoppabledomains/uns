"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureUtil__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract CNSRegistry",
                name: "registry",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "nonceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "registry",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5060405161013d38038061013d8339818101604052602081101561003357600080fd5b5051600180546001600160a01b0319166001600160a01b0390921691909117905560db806100626000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80636ccbae5f1460375780637b103999146063575b600080fd5b605160048036036020811015604b57600080fd5b50356085565b60408051918252519081900360200190f35b60696097565b604080516001600160a01b039092168252519081900360200190f35b60009081526020819052604090205490565b6001546001600160a01b03169056fea265627a7a7231582042e5eca3a51a0150dd7fe1074c34ca902df68bae0df3ddd40b3b4797aae6698164736f6c634300050c0032";
const isSuperArgs = (xs) => xs.length > 1;
class SignatureUtil__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(registry, overrides) {
        return super.deploy(registry, overrides || {});
    }
    getDeployTransaction(registry, overrides) {
        return super.getDeployTransaction(registry, overrides || {});
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
exports.SignatureUtil__factory = SignatureUtil__factory;
SignatureUtil__factory.bytecode = _bytecode;
SignatureUtil__factory.abi = _abi;
