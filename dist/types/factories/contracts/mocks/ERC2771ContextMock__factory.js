"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC2771ContextMock__factory = void 0;
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
        inputs: [
            {
                internalType: "address",
                name: "forwarder",
                type: "address",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "forwarder",
                type: "address",
            },
        ],
        name: "isTrustedForwarder",
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
    {
        inputs: [],
        name: "msgData",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "msgSender",
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
        name: "msgToken",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "run",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5061053a806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063572b6c0514610067578063c04062261461008f578063c4c2bfdc146100ce578063c4d66de8146100e4578063d737d0c7146100f9578063f4b06cd814610119575b600080fd5b61007a6100753660046103e4565b61012f565b60405190151581526020015b60405180910390f35b604080518082018252601781527f45524332373731436f6e746578744d6f636b3a2072756e000000000000000000602082015290516100869190610414565b6100d6610162565b604051610086929190610462565b6100f76100f23660046103e4565b610175565b005b61010161028d565b6040516001600160a01b039091168152602001610086565b61012161029c565b604051908152602001610086565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b36600061016d6102a6565b915091509091565b600054610100900460ff16158080156101955750600054600160ff909116105b806101af5750303b1580156101af575060005460ff166001145b6102175760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff19166001179055801561023a576000805461ff0019166101001790555b610243826102db565b8015610289576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5050565b6000610297610316565b905090565b600061029761033b565b3660006102b23361012f565b156102d357600080366102c6603482610491565b9261016d939291906104b8565b60003661016d565b600054610100900460ff166103025760405162461bcd60e51b815260040161020e906104e2565b61030a610355565b6103138161037e565b50565b60006103213361012f565b15610333575060331936013560601c90565b503390565b90565b60006103463361012f565b156103385750601f1936013590565b600054610100900460ff1661037c5760405162461bcd60e51b815260040161020e906104e2565b565b600054610100900460ff166103a55760405162461bcd60e51b815260040161020e906104e2565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b038316179055610313565b6000602082840312156103f657600080fd5b81356001600160a01b038116811461040d57600080fd5b9392505050565b600060208083528351808285015260005b8181101561044157858101830151858201604001528201610425565b506000604082860101526040601f19601f8301168501019250505092915050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b818103818111156104b257634e487b7160e01b600052601160045260246000fd5b92915050565b600080858511156104c857600080fd5b838611156104d557600080fd5b5050820193919092039150565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b60608201526080019056fea164736f6c6343000811000a";
const isSuperArgs = (xs) => xs.length > 1;
class ERC2771ContextMock__factory extends ethers_1.ContractFactory {
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
exports.ERC2771ContextMock__factory = ERC2771ContextMock__factory;
ERC2771ContextMock__factory.bytecode = _bytecode;
ERC2771ContextMock__factory.abi = _abi;
