"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MintingManagerMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address",
            },
        ],
        name: "AdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Blocked",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "BlocklistDisabled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "BlocklistEnabled",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "tld",
                type: "string",
            },
        ],
        name: "NewTld",
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
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "Paused",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "RemoveTld",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32",
            },
        ],
        name: "RoleAdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleRevoked",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "Unpaused",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address",
            },
        ],
        name: "Upgraded",
        type: "event",
    },
    {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MINTER_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
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
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "addMinter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "accounts",
                type: "address[]",
            },
        ],
        name: "addMinters",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "addrs",
                type: "address[]",
            },
        ],
        name: "addProxyReaders",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "tld",
                type: "string",
            },
        ],
        name: "addTld",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tld",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
        ],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
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
                name: "tld",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
        ],
        name: "claimTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
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
                name: "tld",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
            {
                internalType: "string[]",
                name: "keys",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
        ],
        name: "claimToWithRecords",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "receiver",
                type: "address",
            },
        ],
        name: "closeMinter",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "cnsMintingController",
        outputs: [
            {
                internalType: "contract IMintingController",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "cnsResolver",
        outputs: [
            {
                internalType: "contract IResolver",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "cnsURIPrefixController",
        outputs: [
            {
                internalType: "contract IURIPrefixController",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleAdmin",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "hasRole",
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
        inputs: [
            {
                internalType: "contract IUNSRegistry",
                name: "unsRegistry_",
                type: "address",
            },
            {
                internalType: "contract IMintingController",
                name: "cnsMintingController_",
                type: "address",
            },
            {
                internalType: "contract IURIPrefixController",
                name: "cnsURIPrefixController_",
                type: "address",
            },
            {
                internalType: "contract IResolver",
                name: "cnsResolver_",
                type: "address",
            },
            {
                internalType: "address",
                name: "unsOperator_",
                type: "address",
            },
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "isBlocked",
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
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "isMinter",
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
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "string[]",
                name: "labels",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "keys",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
            {
                internalType: "bool",
                name: "withReverse",
                type: "bool",
            },
        ],
        name: "issueWithRecords",
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
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "paused",
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
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "removeMinter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "accounts",
                type: "address[]",
            },
        ],
        name: "removeMinters",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tld",
                type: "uint256",
            },
        ],
        name: "removeTld",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceMinter",
        outputs: [],
        stateMutability: "nonpayable",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "receiver",
                type: "address",
            },
        ],
        name: "rotateMinter",
        outputs: [],
        stateMutability: "payable",
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
        name: "setForwarder",
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
        ],
        name: "setOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "prefix",
                type: "string",
            },
        ],
        name: "setTokenURIPrefix",
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
    {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "unsOperator",
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
        name: "unsRegistry",
        outputs: [
            {
                internalType: "contract IUNSRegistry",
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
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]",
            },
        ],
        name: "upgradeAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506136a2806100206000396000f3fe60806040526004361061025c5760003560e01c806391d1485411610144578063b9998a24116100b6578063d1f5692c1161007a578063d1f5692c1461074b578063d53913931461076b578063d547741f1461078d578063ec527389146107ad578063f2fde38b146107cd578063ffa1ad74146107ed57600080fd5b8063b9998a24146106ab578063c3a3bc00146106cb578063cc2a9a5b146106eb578063cc2c3fc41461070b578063ceeb4f501461072b57600080fd5b8063a3f4df7e11610108578063a3f4df7e146105be578063a849d65c1461060b578063aa271e1a1461062b578063ae31844a1461064b578063b0aa98c71461066b578063b3ab15fb1461068b57600080fd5b806391d1485414610534578063983b2d5614610554578063986502751461057457806399e0dd7c14610589578063a217fddf146105a957600080fd5b80635c975abb116101dd57806371e2a657116101a157806371e2a6571461048e57806377a2a589146104ae57806381c81d35146104ce5780638456cb59146104e15780638da5cb5b146104f6578063906cecc11461051457600080fd5b80635c975abb146104115780635cd7e3b3146104265780635fc1964f14610446578063634486da14610466578063715018a61461047957600080fd5b806336568abe1161022457806336568abe146103365780633f41b614146103565780633f4ba83a1461038e578063572b6c05146103a35780635b6fa8db146103f157600080fd5b806301ffc9a714610261578063248a9ca314610296578063268b15ed146102d45780632f2ff15d146102f65780633092afd514610316575b600080fd5b34801561026d57600080fd5b5061028161027c366004612f52565b61081f565b60405190151581526020015b60405180910390f35b3480156102a257600080fd5b506102c66102b1366004612f0b565b60009081526097602052604090206001015490565b60405190815260200161028d565b3480156102e057600080fd5b506102f46102ef36600461302e565b610856565b005b34801561030257600080fd5b506102f4610311366004612f23565b6108f9565b34801561032257600080fd5b506102f4610331366004612c13565b610923565b34801561034257600080fd5b506102f4610351366004612f23565b610937565b34801561036257600080fd5b5060c954610376906001600160a01b031681565b6040516001600160a01b03909116815260200161028d565b34801561039a57600080fd5b506102f46109c5565b3480156103af57600080fd5b506102816103be366004612c13565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b3480156103fd57600080fd5b5060cc54610376906001600160a01b031681565b34801561041d57600080fd5b506102816109d7565b34801561043257600080fd5b506102f4610441366004612c4b565b6109ed565b34801561045257600080fd5b506102f4610461366004612e4f565b610d47565b6102f4610474366004612c13565b610d9d565b34801561048557600080fd5b506102f4610e60565b34801561049a57600080fd5b506102f46104a9366004612e4f565b610e72565b3480156104ba57600080fd5b5060ce54610376906001600160a01b031681565b6102f46104dc366004612c13565b610ec8565b3480156104ed57600080fd5b506102f4610f45565b34801561050257600080fd5b506033546001600160a01b0316610376565b34801561052057600080fd5b506102f461052f366004612d06565b610f55565b34801561054057600080fd5b5061028161054f366004612f23565b610fdb565b34801561056057600080fd5b506102f461056f366004612c13565b611006565b34801561058057600080fd5b506102f4611017565b34801561059557600080fd5b506102f46105a4366004612ffb565b611031565b3480156105b557600080fd5b506102c6600081565b3480156105ca57600080fd5b506105fe604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b60405161028d91906132e3565b34801561061757600080fd5b5060cb54610376906001600160a01b031681565b34801561063757600080fd5b50610281610646366004612c13565b611110565b34801561065757600080fd5b506102f4610666366004612e10565b61112a565b34801561067757600080fd5b50610281610686366004612f0b565b611235565b34801561069757600080fd5b506102f46106a6366004612c13565b611293565b3480156106b757600080fd5b506102f46106c6366004612c13565b6112bd565b3480156106d757600080fd5b506102f46106e6366004612ffb565b611302565b3480156106f757600080fd5b506102f4610706366004612f7a565b611349565b34801561071757600080fd5b5060ca54610376906001600160a01b031681565b34801561073757600080fd5b506102f4610746366004612d5f565b6116d2565b34801561075757600080fd5b506102f4610766366004612e10565b611768565b34801561077757600080fd5b506102c660008051602061367683398151915281565b34801561079957600080fd5b506102f46107a8366004612f23565b61182d565b3480156107b957600080fd5b506102f46107c8366004612f0b565b611852565b3480156107d957600080fd5b506102f46107e8366004612c13565b6118c4565b3480156107f957600080fd5b506105fe6040518060400160405280600681526020016518171a17189960d11b81525081565b60006001600160e01b03198216637965db0b60e01b148061085057506301ffc9a760e01b6001600160e01b03198316145b92915050565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061089a92508491508390506118e0565b6108a26109d7565b156108c85760405162461bcd60e51b81526004016108bf9061332b565b60405180910390fd5b60606108f16108d5611a36565b6108e8886108e38989611a45565b611a71565b83846001611b9e565b505050505050565b60008281526097602052604090206001015461091481611e9a565b61091e8383611eab565b505050565b61092b611f32565b61093481611fab565b50565b61093f611a36565b6001600160a01b0316816001600160a01b0316146109b75760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016108bf565b6109c18282611fc3565b5050565b6109cd611f32565b6109d5612048565b565b6000805160206136568339815191525460ff1690565b6109f786886134a4565b805160021415610a6957610a0c610646611a36565b610a645760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b60648201526084016108bf565b610c14565b6000610a74826120f0565b60c9549092506001600160a01b0316905063430c2081610a92611a36565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b158015610ad857600080fd5b505afa158015610aec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b109190612eef565b80610bae575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c20819060440160206040518083038186803b158015610b6457600080fd5b505afa158015610b78573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b9c9190612eef565b8015610bae5750610bae610646611a36565b610c125760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b60648201526084016108bf565b505b610c1e87896134a4565b600281511015610c7e5760405162461bcd60e51b815260206004820152602560248201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456044820152642627abaf9960d91b60648201526084016108bf565b610cee610cc060008360018551610c95919061348d565b81518110610cb357634e487b7160e01b600052603260045260246000fd5b602002602001015161212b565b82600081518110610ce157634e487b7160e01b600052603260045260246000fd5b60200260200101516118e0565b610cf66109d7565b15610d135760405162461bcd60e51b81526004016108bf9061332b565b610d3b8a610d218a8c6134a4565b610d2b898b6134a4565b610d35888a6134a4565b87611b9e565b50505050505050505050565b610d4f611f32565b60005b81518110156109c157610d8b828281518110610d7e57634e487b7160e01b600052603260045260246000fd5b6020026020010151611fab565b80610d95816135eb565b915050610d52565b610da8610646611a36565b610dc45760405162461bcd60e51b81526004016108bf906132f6565b6001600160a01b038116610e1a5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108bf565b610e23816121e0565b610e2b611017565b6040516001600160a01b038216903480156108fc02916000818181858888f193505050501580156109c1573d6000803e3d6000fd5b610e68611f32565b6109d560006121f8565b610e7a611f32565b60005b81518110156109c157610eb6828281518110610ea957634e487b7160e01b600052603260045260246000fd5b60200260200101516121e0565b80610ec0816135eb565b915050610e7d565b610ed3610646611a36565b610eef5760405162461bcd60e51b81526004016108bf906132f6565b6001600160a01b038116610e235760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108bf565b610f4d611f32565b6109d561224a565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610f9992508491508390506118e0565b610fa16109d7565b15610fbe5760405162461bcd60e51b81526004016108bf9061332b565b6060610fd2876108e8886108e38989611a45565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61100e611f32565b610934816121e0565b6109d5600080516020613676833981519152610351611a36565b611039611f32565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061106b90859085906004016132b4565b600060405180830381600087803b15801561108557600080fd5b505af1158015611099573d6000803e3d6000fd5b505060cb546001600160a01b03161591506109c190505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906110e290859085906004016132b4565b600060405180830381600087803b1580156110fc57600080fd5b505af11580156108f1573d6000803e3d6000fd5b600061085060008051602061367683398151915283610fdb565b611135610646611a36565b6111515760405162461bcd60e51b81526004016108bf906132f6565b60c9546040516000916001600160a01b031690611174908590859060240161327a565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b179052516111a991906130f7565b6000604051808303816000865af19150503d80600081146111e6576040519150601f19603f3d011682016040523d82523d6000602084013e6111eb565b606091505b505090508061091e5760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b60448201526064016108bf565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611289906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b61129b611f32565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b6112c5611f32565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b61130a611f32565b6109c182828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506122b292505050565b600054610100900460ff16158080156113695750600054600160ff909116105b806113835750303b158015611383575060005460ff166001145b6113e65760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016108bf565b6000805460ff191660011790558015611409576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce80549091169185169190911790556114676123ce565b61146f612405565b6114788261243e565b611480612465565b604080516102008101825260066101c082018181526563727970746f60d01b6101e0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b81830152610160840152835180850185526002815261686960f01b818301526101808401528351808501909452908352656b726573757360d01b908301526101a081019190915260005b600e811015611682576116708282600e811061166657634e487b7160e01b600052603260045260246000fd5b60200201516122b2565b8061167a816135eb565b91505061163a565b50508015610fd2576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061171692508491508390506118e0565b61171e6109d7565b1561173b5760405162461bcd60e51b81526004016108bf9061332b565b610d3b8a61174d8b6108e38c8c611a45565b611757888a6134a4565b61176187896134a4565b6001611b9e565b611770611f32565b60005b8181101561091e5760c9546001600160a01b031663509602398484848181106117ac57634e487b7160e01b600052603260045260246000fd5b90506020020160208101906117c19190612c13565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561180257600080fd5b505af1158015611816573d6000803e3d6000fd5b505050508080611825906135eb565b915050611773565b60008281526097602052604090206001015461184881611e9a565b61091e8383611fc3565b61185a611f32565b611863816124a5565b61187f5760405162461bcd60e51b81526004016108bf90613355565b600081815260cd6020526040812061189691612ab8565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b6118cc611f32565b6118d5816124cb565b610934600082612541565b6118e9826124a5565b6119055760405162461bcd60e51b81526004016108bf90613355565b60006119388260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a816000015111156119e157611963611957826000600a61254b565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b814156119e15760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b60648201526084016108bf565b6119ea8261258a565b61091e5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c494400000060448201526064016108bf565b6000611a406126ef565b905090565b60608282604051602001611a5a929190613113565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611a8b5790505090508281600081518110611ac457634e487b7160e01b600052603260045260246000fd5b602002602001018190525060cd60008581526020019081526020016000208054611aed906135b0565b80601f0160208091040260200160405190810160405280929190818152602001828054611b19906135b0565b8015611b665780601f10611b3b57610100808354040283529160200191611b66565b820191906000526020600020905b815481529060010190602001808311611b4957829003601f168201915b505050505081600181518110611b8c57634e487b7160e01b600052603260045260246000fd5b60209081029190910101529392505050565b6000611ba9856120f0565b5060c954604051634f558e7960e01b8152600481018390529192506001600160a01b031690634f558e799060240160206040518083038186803b158015611bef57600080fd5b505afa158015611c03573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c279190612eef565b8015611cb5575060c9546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e9060240160206040518083038186803b158015611c7257600080fd5b505afa158015611c86573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611caa9190612c2f565b6001600160a01b0316145b15611d295760c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690611cf290899089908990899089906004016131b0565b600060405180830381600087803b158015611d0c57600080fd5b505af1158015611d20573d6000803e3d6000fd5b505050506108f1565b611d3281612736565b611d3b85612795565b8015611d48575084516002145b15611e345760ca5485516001600160a01b039091169063c36c21259088908890600090611d8557634e487b7160e01b600052603260045260246000fd5b602090810291909101015160cc546040516001600160e01b031960e086901b168152611dbf9392916001600160a01b03169060040161320f565b600060405180830381600087803b158015611dd957600080fd5b505af1158015611ded573d6000803e3d6000fd5b50505050600084511115611e2f5760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490611cf290879087908690600401613244565b6108f1565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790611e6c90899089908990899089906004016131b0565b600060405180830381600087803b158015611e8657600080fd5b505af1158015610d3b573d6000803e3d6000fd5b61093481611ea6611a36565b6127ef565b611eb58282610fdb565b6109c15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611eee611a36565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611f3a611a36565b6001600160a01b0316611f556033546001600160a01b031690565b6001600160a01b0316146109d55760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016108bf565b6109346000805160206136768339815191528261182d565b611fcd8282610fdb565b156109c15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612004611a36565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6120506109d7565b6120935760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b60448201526064016108bf565b600080516020613656833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6120d3611a36565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b8015612125578291506121118285610c9560018561348d565b92508061211d81613599565b9150506120f8565b50915091565b600081516000141561217f5760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d505459000000000060448201526064016108bf565b828260405160200161219191906130f7565b604051602081830303815290604052805190602001206040516020016121c1929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b61093460008051602061367683398151915282612541565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6122526109d7565b1561226f5760405162461bcd60e51b81526004016108bf9061332b565b600080516020613656833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586120d3611a36565b60006122bf60008361212b565b600081815260cd6020908152604090912084519293506122e3929091850190612af2565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf89808360405161231491906132e3565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e799060240160206040518083038186803b15801561236057600080fd5b505afa158015612374573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123989190612eef565b6109c15760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c60906110e290849086906004016133e2565b600054610100900460ff166123f55760405162461bcd60e51b81526004016108bf90613397565b6109d5612400611a36565b6121f8565b600054610100900460ff1661242c5760405162461bcd60e51b81526004016108bf90613397565b6109d56000612439611a36565b612541565b600054610100900460ff166112c55760405162461bcd60e51b81526004016108bf90613397565b600054610100900460ff1661248c5760405162461bcd60e51b81526004016108bf90613397565b600080516020613656833981519152805460ff19169055565b600081815260cd6020526040812080548291906124c1906135b0565b9050119050919050565b6124d3611f32565b6001600160a01b0381166125385760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016108bf565b610934816121f8565b6109c18282611eab565b604080518082019091526000808252602082015260405180604001604052808381526020018486602001516125809190613456565b9052949350505050565b600081516000141561259e57506000919050565b60208201805160f81c603081108015906125bc575060398160ff1611155b1580156125de575060618160ff16101580156125dc5750607a8160ff1611155b155b156125ed575060009392505050565b8351600181111561265b5761260f8361260760018461348d565b015160f81c90565b915060308260ff1610158015612629575060398260ff1611155b15801561264b575060618260ff16101580156126495750607a8260ff1611155b155b1561265b57506000949350505050565b60015b61266960018361348d565b8110156126e3578381015160f81c9250602d831480159061269f575060308360ff161015801561269d575060398360ff1611155b155b80156126c0575060618360ff16101580156126be5750607a8360ff1611155b155b156126d15750600095945050505050565b806126db816135eb565b91505061265e565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b0316331415612731575060331936013560601c90565b503390565b61273f81611235565b1561278c5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b454400000060448201526064016108bf565b61093481612853565b6000806127ac60008460018651610c95919061348d565b60ca549091506001600160a01b0316158015906127e85750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6127f98282610fdb565b6109c157612811816001600160a01b031660146128d7565b61281c8360206128d7565b60405160200161282d92919061313b565b60408051601f198184030181529082905262461bcd60e51b82526108bf916004016132e3565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260019061289290606001611270565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b606060006128e683600261346e565b6128f1906002613456565b6001600160401b0381111561291657634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015612940576020820181803683370190505b509050600360fc1b8160008151811061296957634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106129a657634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060006129ca84600261346e565b6129d5906001613456565b90505b6001811115612a69576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612a1757634e487b7160e01b600052603260045260246000fd5b1a60f81b828281518110612a3b57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c93612a6281613599565b90506129d8565b5083156127e85760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016108bf565b508054612ac4906135b0565b6000825580601f10612ad4575050565b601f0160209004906000526020600020908101906109349190612b76565b828054612afe906135b0565b90600052602060002090601f016020900481019282612b205760008555612b66565b82601f10612b3957805160ff1916838001178555612b66565b82800160010185558215612b66579182015b82811115612b66578251825591602001919060010190612b4b565b50612b72929150612b76565b5090565b5b80821115612b725760008155600101612b77565b60008083601f840112612b9c578182fd5b5081356001600160401b03811115612bb2578182fd5b6020830191508360208260051b8501011115612bcd57600080fd5b9250929050565b60008083601f840112612be5578182fd5b5081356001600160401b03811115612bfb578182fd5b602083019150836020828501011115612bcd57600080fd5b600060208284031215612c24578081fd5b81356127e881613632565b600060208284031215612c40578081fd5b81516127e881613632565b60008060008060008060008060a0898b031215612c66578384fd5b8835612c7181613632565b975060208901356001600160401b0380821115612c8c578586fd5b612c988c838d01612b8b565b909950975060408b0135915080821115612cb0578586fd5b612cbc8c838d01612b8b565b909750955060608b0135915080821115612cd4578485fd5b50612ce18b828c01612b8b565b9094509250506080890135612cf581613647565b809150509295985092959890939650565b60008060008060608587031215612d1b578384fd5b8435612d2681613632565b93506020850135925060408501356001600160401b03811115612d47578283fd5b612d5387828801612bd4565b95989497509550505050565b60008060008060008060008060a0898b031215612d7a578182fd5b8835612d8581613632565b97506020890135965060408901356001600160401b0380821115612da7578384fd5b612db38c838d01612bd4565b909850965060608b0135915080821115612dcb578384fd5b612dd78c838d01612b8b565b909650945060808b0135915080821115612def578384fd5b50612dfc8b828c01612b8b565b999c989b5096995094979396929594505050565b60008060208385031215612e22578182fd5b82356001600160401b03811115612e37578283fd5b612e4385828601612b8b565b90969095509350505050565b60006020808385031215612e61578182fd5b82356001600160401b03811115612e76578283fd5b8301601f81018513612e86578283fd5b8035612e99612e9482613433565b613403565b80828252848201915084840188868560051b8701011115612eb8578687fd5b8694505b83851015612ee3578035612ecf81613632565b835260019490940193918501918501612ebc565b50979650505050505050565b600060208284031215612f00578081fd5b81516127e881613647565b600060208284031215612f1c578081fd5b5035919050565b60008060408385031215612f35578182fd5b823591506020830135612f4781613632565b809150509250929050565b600060208284031215612f63578081fd5b81356001600160e01b0319811681146127e8578182fd5b60008060008060008060c08789031215612f92578384fd5b8635612f9d81613632565b95506020870135612fad81613632565b94506040870135612fbd81613632565b93506060870135612fcd81613632565b92506080870135612fdd81613632565b915060a0870135612fed81613632565b809150509295509295509295565b6000806020838503121561300d578182fd5b82356001600160401b03811115613022578283fd5b612e4385828601612bd4565b600080600060408486031215613042578081fd5b8335925060208401356001600160401b0381111561305e578182fd5b61306a86828701612bd4565b9497909650939450505050565b600081518084526020808501808196508360051b81019150828601855b858110156130be5782840389526130ac8483516130cb565b98850198935090840190600101613094565b5091979650505050505050565b600081518084526130e3816020860160208601613569565b601f01601f19169290920160200192915050565b60008251613109818460208701613569565b9190910192915050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351613173816017850160208801613569565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516131a4816028840160208801613569565b01602801949350505050565b6001600160a01b038616815260a0602082018190526000906131d490830187613077565b82810360408401526131e68187613077565b905082810360608401526131fa8186613077565b91505082151560808301529695505050505050565b600060018060a01b0380861683526060602084015261323160608401866130cb565b9150808416604084015250949350505050565b6060815260006132576060830186613077565b82810360208401526132698186613077565b915050826040830152949350505050565b6020808252810182905260006001600160fb1b03831115613299578081fd5b8260051b808560408501379190910160400190815292915050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b6020815260006127e860208301846130cb565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b8281526040602082015260006133fb60408301846130cb565b949350505050565b604051601f8201601f191681016001600160401b038111828210171561342b5761342b61361c565b604052919050565b60006001600160401b0382111561344c5761344c61361c565b5060051b60200190565b6000821982111561346957613469613606565b500190565b600081600019048311821515161561348857613488613606565b500290565b60008282101561349f5761349f613606565b500390565b60006134b2612e9484613433565b808482526020808301925084368760051b870111156134cf578485fd5b845b8781101561355d5781356001600160401b03808211156134ef578788fd5b90880190601f3681840112613502578889fd5b8235828111156135145761351461361c565b613525818301601f19168801613403565b9250808352368782860101111561353a57898afd5b8087850188850137820186018990525086525093820193908201906001016134d1565b50919695505050505050565b60005b8381101561358457818101518382015260200161356c565b83811115613593576000848401525b50505050565b6000816135a8576135a8613606565b506000190190565b600181811c908216806135c457607f821691505b602082108114156135e557634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156135ff576135ff613606565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461093457600080fd5b801515811461093457600080fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
const isSuperArgs = (xs) => xs.length > 1;
class MintingManagerMock__factory extends ethers_1.ContractFactory {
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
exports.MintingManagerMock__factory = MintingManagerMock__factory;
MintingManagerMock__factory.bytecode = _bytecode;
MintingManagerMock__factory.abi = _abi;
