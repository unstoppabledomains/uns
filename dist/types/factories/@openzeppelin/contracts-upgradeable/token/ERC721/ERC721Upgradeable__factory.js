"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC721Upgradeable__factory = void 0;
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
        stateMutability: "nonpayable",
        type: "function",
    },
    {
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
        stateMutability: "view",
        type: "function",
    },
    {
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
        stateMutability: "view",
        type: "function",
    },
    {
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
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
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
        stateMutability: "view",
        type: "function",
    },
    {
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
        stateMutability: "nonpayable",
        type: "function",
    },
    {
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
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
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
        stateMutability: "nonpayable",
        type: "function",
    },
    {
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
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
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
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
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
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506110e2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101b3578063b88d4fde146101c6578063c87b56dd146101d9578063e985e9c5146101ec57600080fd5b80636352211e1461017757806370a082311461018a57806395d89b41146101ab57600080fd5b806301ffc9a7146100d457806306fdde03146100fc578063081812fc14610111578063095ea7b31461013c57806323b872dd1461015157806342842e0e14610164575b600080fd5b6100e76100e2366004610c32565b6101ff565b60405190151581526020015b60405180910390f35b610104610251565b6040516100f39190610c9f565b61012461011f366004610cb2565b6102e3565b6040516001600160a01b0390911681526020016100f3565b61014f61014a366004610ce7565b61030a565b005b61014f61015f366004610d11565b610424565b61014f610172366004610d11565b610455565b610124610185366004610cb2565b610470565b61019d610198366004610d4d565b6104d0565b6040519081526020016100f3565b610104610556565b61014f6101c1366004610d68565b610565565b61014f6101d4366004610dba565b610574565b6101046101e7366004610cb2565b6105ac565b6100e76101fa366004610e96565b610620565b60006001600160e01b031982166380ac58cd60e01b148061023057506001600160e01b03198216635b5e139f60e01b145b8061024b57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606065805461026090610ec9565b80601f016020809104026020016040519081016040528092919081815260200182805461028c90610ec9565b80156102d95780601f106102ae576101008083540402835291602001916102d9565b820191906000526020600020905b8154815290600101906020018083116102bc57829003601f168201915b5050505050905090565b60006102ee8261064e565b506000908152606960205260409020546001600160a01b031690565b600061031582610470565b9050806001600160a01b0316836001600160a01b0316036103875760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806103a357506103a38133610620565b6104155760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c0000606482015260840161037e565b61041f83836106b0565b505050565b61042e338261071e565b61044a5760405162461bcd60e51b815260040161037e90610f03565b61041f83838361077d565b61041f83838360405180602001604052806000815250610574565b6000818152606760205260408120546001600160a01b03168061024b5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161037e565b60006001600160a01b03821661053a5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b606482015260840161037e565b506001600160a01b031660009081526068602052604090205490565b60606066805461026090610ec9565b610570338383610919565b5050565b61057e338361071e565b61059a5760405162461bcd60e51b815260040161037e90610f03565b6105a6848484846109e7565b50505050565b60606105b78261064e565b60006105ce60408051602081019091526000815290565b905060008151116105ee5760405180602001604052806000815250610619565b806105f884610a1a565b604051602001610609929190610f51565b6040516020818303038152906040525b9392505050565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b6000818152606760205260409020546001600160a01b03166106ad5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161037e565b50565b600081815260696020526040902080546001600160a01b0319166001600160a01b03841690811790915581906106e582610470565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60008061072a83610470565b9050806001600160a01b0316846001600160a01b0316148061075157506107518185610620565b806107755750836001600160a01b031661076a846102e3565b6001600160a01b0316145b949350505050565b826001600160a01b031661079082610470565b6001600160a01b0316146107f45760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b606482015260840161037e565b6001600160a01b0382166108565760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161037e565b6108616000826106b0565b6001600160a01b038316600090815260686020526040812080546001929061088a908490610f96565b90915550506001600160a01b03821660009081526068602052604081208054600192906108b8908490610fa9565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b03160361097a5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161037e565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6109f284848461077d565b6109fe84848484610b1b565b6105a65760405162461bcd60e51b815260040161037e90610fbc565b606081600003610a415750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610a6b5780610a558161100e565b9150610a649050600a8361103d565b9150610a45565b60008167ffffffffffffffff811115610a8657610a86610da4565b6040519080825280601f01601f191660200182016040528015610ab0576020820181803683370190505b5090505b841561077557610ac5600183610f96565b9150610ad2600a86611051565b610add906030610fa9565b60f81b818381518110610af257610af2611065565b60200101906001600160f81b031916908160001a905350610b14600a8661103d565b9450610ab4565b60006001600160a01b0384163b15610c1157604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610b5f90339089908890889060040161107b565b6020604051808303816000875af1925050508015610b9a575060408051601f3d908101601f19168201909252610b97918101906110b8565b60015b610bf7573d808015610bc8576040519150601f19603f3d011682016040523d82523d6000602084013e610bcd565b606091505b508051600003610bef5760405162461bcd60e51b815260040161037e90610fbc565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610775565b506001949350505050565b6001600160e01b0319811681146106ad57600080fd5b600060208284031215610c4457600080fd5b813561061981610c1c565b60005b83811015610c6a578181015183820152602001610c52565b50506000910152565b60008151808452610c8b816020860160208601610c4f565b601f01601f19169290920160200192915050565b6020815260006106196020830184610c73565b600060208284031215610cc457600080fd5b5035919050565b80356001600160a01b0381168114610ce257600080fd5b919050565b60008060408385031215610cfa57600080fd5b610d0383610ccb565b946020939093013593505050565b600080600060608486031215610d2657600080fd5b610d2f84610ccb565b9250610d3d60208501610ccb565b9150604084013590509250925092565b600060208284031215610d5f57600080fd5b61061982610ccb565b60008060408385031215610d7b57600080fd5b610d8483610ccb565b915060208301358015158114610d9957600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610dd057600080fd5b610dd985610ccb565b9350610de760208601610ccb565b925060408501359150606085013567ffffffffffffffff80821115610e0b57600080fd5b818701915087601f830112610e1f57600080fd5b813581811115610e3157610e31610da4565b604051601f8201601f19908116603f01168101908382118183101715610e5957610e59610da4565b816040528281528a6020848701011115610e7257600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60008060408385031215610ea957600080fd5b610eb283610ccb565b9150610ec060208401610ccb565b90509250929050565b600181811c90821680610edd57607f821691505b602082108103610efd57634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b60008351610f63818460208801610c4f565b835190830190610f77818360208801610c4f565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b8181038181111561024b5761024b610f80565b8082018082111561024b5761024b610f80565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60006001820161102057611020610f80565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261104c5761104c611027565b500490565b60008261106057611060611027565b500690565b634e487b7160e01b600052603260045260246000fd5b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906110ae90830184610c73565b9695505050505050565b6000602082840312156110ca57600080fd5b815161061981610c1c56fea164736f6c6343000811000a";
const isSuperArgs = (xs) => xs.length > 1;
class ERC721Upgradeable__factory extends ethers_1.ContractFactory {
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
exports.ERC721Upgradeable__factory = ERC721Upgradeable__factory;
ERC721Upgradeable__factory.bytecode = _bytecode;
ERC721Upgradeable__factory.abi = _abi;
