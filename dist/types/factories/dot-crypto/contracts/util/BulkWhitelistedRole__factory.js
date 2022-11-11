"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkWhitelistedRole__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "WhitelistAdminAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "WhitelistAdminRemoved",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "WhitelistedAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "WhitelistedRemoved",
        type: "event",
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
        name: "addWhitelistAdmin",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
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
        name: "addWhitelisted",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address[]",
                name: "accounts",
                type: "address[]",
            },
        ],
        name: "bulkAddWhitelisted",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address[]",
                name: "accounts",
                type: "address[]",
            },
        ],
        name: "bulkRemoveWhitelisted",
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
        name: "isWhitelistAdmin",
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
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "isWhitelisted",
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
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "removeWhitelisted",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "renounceWhitelistAdmin",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "renounceWhitelisted",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x6080604052610016336001600160e01b0361001b16565b61018f565b61003381600061006a60201b61065e1790919060201c565b6040516001600160a01b038216907f22380c05984257a1cb900161c713dd71d39e74820f1aea43bd3f1bdd2096129990600090a250565b61007d82826001600160e01b0361010e16565b156100e957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b60006001600160a01b03821661016f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602281526020018061099c6022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b6107fe8061019e6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80637362d9c8116100665780637362d9c814610128578063bb5f747b1461014e578063d6cd947314610174578063f6e491aa1461017c578063f8a6c3d61461021f57610093565b806310154bad14610098578063291d9549146100c05780633af32abf146100e65780634c5a628c14610120575b600080fd5b6100be600480360360208110156100ae57600080fd5b50356001600160a01b03166102c2565b005b6100be600480360360208110156100d657600080fd5b50356001600160a01b0316610312565b61010c600480360360208110156100fc57600080fd5b50356001600160a01b031661035f565b604080519115158252519081900360200190f35b6100be610378565b6100be6004803603602081101561013e57600080fd5b50356001600160a01b0316610383565b61010c6004803603602081101561016457600080fd5b50356001600160a01b03166103d0565b6100be6103e2565b6100be6004803603602081101561019257600080fd5b8101906020810181356401000000008111156101ad57600080fd5b8201836020820111156101bf57600080fd5b803590602001918460208302840111640100000000831117156101e157600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295506103eb945050505050565b6100be6004803603602081101561023557600080fd5b81019060208101813564010000000081111561025057600080fd5b82018360208201111561026257600080fd5b8035906020019184602083028401116401000000008311171561028457600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550610463945050505050565b6102cb336103d0565b6103065760405162461bcd60e51b815260040180806020018281038252604081526020018061078a6040913960400191505060405180910390fd5b61030f816104d7565b50565b61031b336103d0565b6103565760405162461bcd60e51b815260040180806020018281038252604081526020018061078a6040913960400191505060405180910390fd5b61030f8161051f565b600061037260018363ffffffff61056716565b92915050565b610381336105ce565b565b61038c336103d0565b6103c75760405162461bcd60e51b815260040180806020018281038252604081526020018061078a6040913960400191505060405180910390fd5b61030f81610616565b6000610372818363ffffffff61056716565b6103813361051f565b6103f4336103d0565b61042f5760405162461bcd60e51b815260040180806020018281038252604081526020018061078a6040913960400191505060405180910390fd5b60005b815181101561045f5761045782828151811061044a57fe5b60200260200101516104d7565b600101610432565b5050565b61046c336103d0565b6104a75760405162461bcd60e51b815260040180806020018281038252604081526020018061078a6040913960400191505060405180910390fd5b60005b815181101561045f576104cf8282815181106104c257fe5b602002602001015161051f565b6001016104aa565b6104e860018263ffffffff61065e16565b6040516001600160a01b038216907fee1504a83b6d4a361f4c1dc78ab59bfa30d6a3b6612c403e86bb01ef2984295f90600090a250565b61053060018263ffffffff6106df16565b6040516001600160a01b038216907f270d9b30cf5b0793bbfd54c9d5b94aeb49462b8148399000265144a8722da6b690600090a250565b60006001600160a01b0382166105ae5760405162461bcd60e51b81526004018080602001828103825260228152602001806107686022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b6105df60008263ffffffff6106df16565b6040516001600160a01b038216907f0a8eb35e5ca14b3d6f28e4abf2f128dbab231a58b56e89beb5d636115001e16590600090a250565b61062760008263ffffffff61065e16565b6040516001600160a01b038216907f22380c05984257a1cb900161c713dd71d39e74820f1aea43bd3f1bdd2096129990600090a250565b6106688282610567565b156106ba576040805162461bcd60e51b815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b6106e98282610567565b6107245760405162461bcd60e51b81526004018080602001828103825260218152602001806107476021913960400191505060405180910390fd5b6001600160a01b0316600090815260209190915260409020805460ff1916905556fe526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c65526f6c65733a206163636f756e7420697320746865207a65726f206164647265737357686974656c69737441646d696e526f6c653a2063616c6c657220646f6573206e6f742068617665207468652057686974656c69737441646d696e20726f6c65a265627a7a72315820ce1cfa8fba696ade5646cb7443d1454257cd8e972c86633cceba8b7c722c125e64736f6c634300050c0032526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373";
const isSuperArgs = (xs) => xs.length > 1;
class BulkWhitelistedRole__factory extends ethers_1.ContractFactory {
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
exports.BulkWhitelistedRole__factory = BulkWhitelistedRole__factory;
BulkWhitelistedRole__factory.bytecode = _bytecode;
BulkWhitelistedRole__factory.abi = _abi;
