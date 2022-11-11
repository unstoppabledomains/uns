"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerRole__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "addController",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "isController",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "renounceController",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50610023336001600160e01b0361002816565b610168565b61004081600061004360201b6101e11790919060201c565b50565b61005682826001600160e01b036100e716565b156100c257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b60006001600160a01b038216610148576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806104516022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b6102da806101776000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806366ac3b6814610046578063a7fc7a0714610050578063b429afeb14610076575b600080fd5b61004e6100b0565b005b61004e6004803603602081101561006657600080fd5b50356001600160a01b03166100bb565b61009c6004803603602081101561008c57600080fd5b50356001600160a01b03166100d9565b604080519115158252519081900360200190f35b6100b9336100f1565b565b6100c4336100d9565b6100cd57600080fd5b6100d681610102565b50565b60006100eb818363ffffffff61011316565b92915050565b6100d660008263ffffffff61017a16565b6100d660008263ffffffff6101e116565b60006001600160a01b03821661015a5760405162461bcd60e51b81526004018080602001828103825260228152602001806102846022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b6101848282610113565b6101bf5760405162461bcd60e51b81526004018080602001828103825260218152602001806102636021913960400191505060405180910390fd5b6001600160a01b0316600090815260209190915260409020805460ff19169055565b6101eb8282610113565b1561023d576040805162461bcd60e51b815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff1916600117905556fe526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c65526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373a265627a7a72315820c3a230047fd11f83b3faec186239c455e41627df96ad21cdb571edba11ee2af364736f6c634300050c0032526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373";
const isSuperArgs = (xs) => xs.length > 1;
class ControllerRole__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
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
exports.ControllerRole__factory = ControllerRole__factory;
ControllerRole__factory.bytecode = _bytecode;
ControllerRole__factory.abi = _abi;
