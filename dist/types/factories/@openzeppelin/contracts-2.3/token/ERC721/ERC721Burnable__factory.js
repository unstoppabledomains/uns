"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC721Burnable__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
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
                name: "owner",
                type: "address",
            },
        ],
        name: "balanceOf",
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
        constant: false,
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "burn",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
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
        name: "getApproved",
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
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
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
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
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
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
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
                name: "to",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
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
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60806040526100367f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b0361006d16565b6100687f80ac58cd000000000000000000000000000000000000000000000000000000006001600160e01b0361006d16565b61013b565b7fffffffff0000000000000000000000000000000000000000000000000000000080821614156100fe57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b7fffffffff00000000000000000000000000000000000000000000000000000000166000908152602081905260409020805460ff19166001179055565b610ed88061014a6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c806342966c681161007157806342966c68146101bc5780636352211e146101d957806370a08231146101f6578063a22cb4651461022e578063b88d4fde1461025c578063e985e9c514610322576100a9565b806301ffc9a7146100ae578063081812fc146100e9578063095ea7b31461012257806323b872dd1461015057806342842e0e14610186575b600080fd5b6100d5600480360360208110156100c457600080fd5b50356001600160e01b031916610350565b604080519115158252519081900360200190f35b610106600480360360208110156100ff57600080fd5b503561036f565b604080516001600160a01b039092168252519081900360200190f35b61014e6004803603604081101561013857600080fd5b506001600160a01b0381351690602001356103d1565b005b61014e6004803603606081101561016657600080fd5b506001600160a01b038135811691602081013590911690604001356104e2565b61014e6004803603606081101561019c57600080fd5b506001600160a01b03813581169160208101359091169060400135610537565b61014e600480360360208110156101d257600080fd5b5035610552565b610106600480360360208110156101ef57600080fd5b50356105a3565b61021c6004803603602081101561020c57600080fd5b50356001600160a01b03166105fd565b60408051918252519081900360200190f35b61014e6004803603604081101561024457600080fd5b506001600160a01b0381351690602001351515610665565b61014e6004803603608081101561027257600080fd5b6001600160a01b038235811692602081013590911691604082013591908101906080810160608201356401000000008111156102ad57600080fd5b8201836020820111156102bf57600080fd5b803590602001918460018302840111640100000000831117156102e157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610731945050505050565b6100d56004803603604081101561033857600080fd5b506001600160a01b0381358116916020013516610789565b6001600160e01b03191660009081526020819052604090205460ff1690565b600061037a826107b7565b6103b55760405162461bcd60e51b815260040180806020018281038252602c815260200180610da8602c913960400191505060405180910390fd5b506000908152600260205260409020546001600160a01b031690565b60006103dc826105a3565b9050806001600160a01b0316836001600160a01b0316141561042f5760405162461bcd60e51b8152600401808060200182810382526021815260200180610dfd6021913960400191505060405180910390fd5b336001600160a01b038216148061044b575061044b8133610789565b6104865760405162461bcd60e51b8152600401808060200182810382526038815260200180610d1d6038913960400191505060405180910390fd5b60008281526002602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b6104ec33826107d4565b6105275760405162461bcd60e51b8152600401808060200182810382526031815260200180610e1e6031913960400191505060405180910390fd5b610532838383610878565b505050565b61053283838360405180602001604052806000815250610731565b61055c33826107d4565b6105975760405162461bcd60e51b8152600401808060200182810382526030815260200180610e746030913960400191505060405180910390fd5b6105a0816109bc565b50565b6000818152600160205260408120546001600160a01b0316806105f75760405162461bcd60e51b8152600401808060200182810382526029815260200180610d7f6029913960400191505060405180910390fd5b92915050565b60006001600160a01b0382166106445760405162461bcd60e51b815260040180806020018281038252602a815260200180610d55602a913960400191505060405180910390fd5b6001600160a01b03821660009081526003602052604090206105f7906109ce565b6001600160a01b0382163314156106c3576040805162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015290519081900360640190fd5b3360008181526004602090815260408083206001600160a01b03871680855290835292819020805460ff1916861515908117909155815190815290519293927f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31929181900390910190a35050565b61073c8484846104e2565b610748848484846109d2565b6107835760405162461bcd60e51b8152600401808060200182810382526032815260200180610c9b6032913960400191505060405180910390fd5b50505050565b6001600160a01b03918216600090815260046020908152604080832093909416825291909152205460ff1690565b6000908152600160205260409020546001600160a01b0316151590565b60006107df826107b7565b61081a5760405162461bcd60e51b815260040180806020018281038252602c815260200180610cf1602c913960400191505060405180910390fd5b6000610825836105a3565b9050806001600160a01b0316846001600160a01b031614806108605750836001600160a01b03166108558461036f565b6001600160a01b0316145b8061087057506108708185610789565b949350505050565b826001600160a01b031661088b826105a3565b6001600160a01b0316146108d05760405162461bcd60e51b8152600401808060200182810382526029815260200180610dd46029913960400191505060405180910390fd5b6001600160a01b0382166109155760405162461bcd60e51b8152600401808060200182810382526024815260200180610ccd6024913960400191505060405180910390fd5b61091e81610b05565b6001600160a01b038316600090815260036020526040902061093f90610b40565b6001600160a01b038216600090815260036020526040902061096090610b57565b60008181526001602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6105a06109c8826105a3565b82610b60565b5490565b60006109e6846001600160a01b0316610c37565b6109f257506001610870565b604051630a85bd0160e11b815233600482018181526001600160a01b03888116602485015260448401879052608060648501908152865160848601528651600095928a169463150b7a029490938c938b938b939260a4019060208501908083838e5b83811015610a6c578181015183820152602001610a54565b50505050905090810190601f168015610a995780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b158015610abb57600080fd5b505af1158015610acf573d6000803e3d6000fd5b505050506040513d6020811015610ae557600080fd5b50516001600160e01b031916630a85bd0160e11b14915050949350505050565b6000818152600260205260409020546001600160a01b0316156105a057600090815260026020526040902080546001600160a01b0319169055565b8054610b5390600163ffffffff610c3d16565b9055565b80546001019055565b816001600160a01b0316610b73826105a3565b6001600160a01b031614610bb85760405162461bcd60e51b8152600401808060200182810382526025815260200180610e4f6025913960400191505060405180910390fd5b610bc181610b05565b6001600160a01b0382166000908152600360205260409020610be290610b40565b60008181526001602052604080822080546001600160a01b0319169055518291906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b3b151590565b600082821115610c94576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b5090039056fe4552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724552433732313a207472616e7366657220746f20746865207a65726f20616464726573734552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f7665644552433732313a206275726e206f6620746f6b656e2074686174206973206e6f74206f776e4552433732314275726e61626c653a2063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564a265627a7a723158200ba32e9c9462da34a9d3c6a111c2700852594b03759eff1f5a75e38e351e8adb64736f6c634300050c0032";
const isSuperArgs = (xs) => xs.length > 1;
class ERC721Burnable__factory extends ethers_1.ContractFactory {
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
exports.ERC721Burnable__factory = ERC721Burnable__factory;
ERC721Burnable__factory.bytecode = _bytecode;
ERC721Burnable__factory.abi = _abi;
