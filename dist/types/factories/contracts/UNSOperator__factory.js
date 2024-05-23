"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNSOperator__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "version",
                type: "uint8",
            },
        ],
        name: "Initialized",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        inputs: [],
        name: "NAME",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "VERSION",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561000f575f80fd5b506104438061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610060575f3560e01c8063715018a6146100645780638129fc1c1461006e5780638da5cb5b14610076578063a3f4df7e14610096578063f2fde38b146100cf578063ffa1ad74146100e2575b5f80fd5b61006c610106565b005b61006c610119565b6033546040516001600160a01b0390911681526020015b60405180910390f35b6100c26040518060400160405280600d81526020016c2aa7299d1027b832b930ba37b960991b81525081565b60405161008d91906103bd565b61006c6100dd366004610409565b610229565b6100c2604051806040016040528060058152602001640302e312e360dc1b81525081565b61010e61029f565b6101175f6102f9565b565b5f54610100900460ff161580801561013757505f54600160ff909116105b806101505750303b15801561015057505f5460ff166001145b6101b85760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b5f805460ff1916600117905580156101d9575f805461ff0019166101001790555b6101e161034a565b8015610226575f805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50565b61023161029f565b6001600160a01b0381166102965760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016101af565b610226816102f9565b6033546001600160a01b031633146101175760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101af565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b5f54610100900460ff166103b45760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016101af565b610117336102f9565b5f602080835283518060208501525f5b818110156103e9578581018301518582016040015282016103cd565b505f604082860101526040601f19601f8301168501019250505092915050565b5f60208284031215610419575f80fd5b81356001600160a01b038116811461042f575f80fd5b939250505056fea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class UNSOperator__factory extends ethers_1.ContractFactory {
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
exports.UNSOperator__factory = UNSOperator__factory;
UNSOperator__factory.bytecode = _bytecode;
UNSOperator__factory.abi = _abi;
