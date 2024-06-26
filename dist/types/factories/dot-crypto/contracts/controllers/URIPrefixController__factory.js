"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URIPrefixController__factory = void 0;
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
    {
        constant: false,
        inputs: [
            {
                internalType: "string",
                name: "prefix",
                type: "string",
            },
        ],
        name: "setTokenURIPrefix",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506040516109913803806109918339818101604052602081101561003357600080fd5b5051610047336001600160e01b0361006c16565b600280546001600160a01b0319166001600160a01b03929092169190911790556101e0565b6100848160006100bb60201b6105a61790919060201c565b6040516001600160a01b038216907f22380c05984257a1cb900161c713dd71d39e74820f1aea43bd3f1bdd2096129990600090a250565b6100ce82826001600160e01b0361015f16565b1561013a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b60006001600160a01b0382166101c0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602281526020018061096f6022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b610780806101ef6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80637362d9c8116100665780637362d9c8146101285780637b1039991461014e57806399e0dd7c14610172578063bb5f747b146101e2578063d6cd94731461020857610093565b806310154bad14610098578063291d9549146100c05780633af32abf146100e65780634c5a628c14610120575b600080fd5b6100be600480360360208110156100ae57600080fd5b50356001600160a01b0316610210565b005b6100be600480360360208110156100d657600080fd5b50356001600160a01b0316610260565b61010c600480360360208110156100fc57600080fd5b50356001600160a01b03166102ad565b604080519115158252519081900360200190f35b6100be6102c6565b6100be6004803603602081101561013e57600080fd5b50356001600160a01b03166102d1565b61015661031e565b604080516001600160a01b039092168252519081900360200190f35b6100be6004803603602081101561018857600080fd5b8101906020810181356401000000008111156101a357600080fd5b8201836020820111156101b557600080fd5b803590602001918460018302840111640100000000831117156101d757600080fd5b50909250905061032d565b61010c600480360360208110156101f857600080fd5b50356001600160a01b0316610404565b6100be610416565b61021933610404565b6102545760405162461bcd60e51b81526004018080602001828103825260408152602001806106d26040913960400191505060405180910390fd5b61025d8161041f565b50565b61026933610404565b6102a45760405162461bcd60e51b81526004018080602001828103825260408152602001806106d26040913960400191505060405180910390fd5b61025d81610467565b60006102c060018363ffffffff6104af16565b92915050565b6102cf33610516565b565b6102da33610404565b6103155760405162461bcd60e51b81526004018080602001828103825260408152602001806106d26040913960400191505060405180910390fd5b61025d8161055e565b6002546001600160a01b031690565b610336336102ad565b6103715760405162461bcd60e51b815260040180806020018281038252603a815260200180610712603a913960400191505060405180910390fd5b6002546040516369426cbd60e11b8152602060048201908152602482018490526001600160a01b039092169163d284d97a91859185918190604401848480828437600081840152601f19601f8201169050808301925050509350505050600060405180830381600087803b1580156103e857600080fd5b505af11580156103fc573d6000803e3d6000fd5b505050505050565b60006102c0818363ffffffff6104af16565b6102cf33610467565b61043060018263ffffffff6105a616565b6040516001600160a01b038216907fee1504a83b6d4a361f4c1dc78ab59bfa30d6a3b6612c403e86bb01ef2984295f90600090a250565b61047860018263ffffffff61062716565b6040516001600160a01b038216907f270d9b30cf5b0793bbfd54c9d5b94aeb49462b8148399000265144a8722da6b690600090a250565b60006001600160a01b0382166104f65760405162461bcd60e51b81526004018080602001828103825260228152602001806106b06022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b61052760008263ffffffff61062716565b6040516001600160a01b038216907f0a8eb35e5ca14b3d6f28e4abf2f128dbab231a58b56e89beb5d636115001e16590600090a250565b61056f60008263ffffffff6105a616565b6040516001600160a01b038216907f22380c05984257a1cb900161c713dd71d39e74820f1aea43bd3f1bdd2096129990600090a250565b6105b082826104af565b15610602576040805162461bcd60e51b815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b61063182826104af565b61066c5760405162461bcd60e51b815260040180806020018281038252602181526020018061068f6021913960400191505060405180910390fd5b6001600160a01b0316600090815260209190915260409020805460ff1916905556fe526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c65526f6c65733a206163636f756e7420697320746865207a65726f206164647265737357686974656c69737441646d696e526f6c653a2063616c6c657220646f6573206e6f742068617665207468652057686974656c69737441646d696e20726f6c6557686974656c6973746564526f6c653a2063616c6c657220646f6573206e6f742068617665207468652057686974656c697374656420726f6c65a265627a7a72315820debca60946c0819dc5b5c2756c5c1dd8dd8a46f2429fa8a43a4f4362af3030c164736f6c634300050c0032526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373";
const isSuperArgs = (xs) => xs.length > 1;
class URIPrefixController__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(registry, overrides) {
        return super.getDeployTransaction(registry, overrides || {});
    }
    deploy(registry, overrides) {
        return super.deploy(registry, overrides || {});
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
exports.URIPrefixController__factory = URIPrefixController__factory;
URIPrefixController__factory.bytecode = _bytecode;
URIPrefixController__factory.abi = _abi;
