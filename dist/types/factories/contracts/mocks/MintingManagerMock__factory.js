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
const _bytecode = "0x608060405234801561001057600080fd5b5061379a806100206000396000f3fe60806040526004361061025c5760003560e01c806391d1485411610144578063b9998a24116100b6578063d1f5692c1161007a578063d1f5692c1461074b578063d53913931461076b578063d547741f1461078d578063ec527389146107ad578063f2fde38b146107cd578063ffa1ad74146107ed57600080fd5b8063b9998a24146106ab578063c3a3bc00146106cb578063cc2a9a5b146106eb578063cc2c3fc41461070b578063ceeb4f501461072b57600080fd5b8063a3f4df7e11610108578063a3f4df7e146105be578063a849d65c1461060b578063aa271e1a1461062b578063ae31844a1461064b578063b0aa98c71461066b578063b3ab15fb1461068b57600080fd5b806391d1485414610534578063983b2d5614610554578063986502751461057457806399e0dd7c14610589578063a217fddf146105a957600080fd5b80635c975abb116101dd57806371e2a657116101a157806371e2a6571461048e57806377a2a589146104ae57806381c81d35146104ce5780638456cb59146104e15780638da5cb5b146104f6578063906cecc11461051457600080fd5b80635c975abb146104115780635cd7e3b3146104265780635fc1964f14610446578063634486da14610466578063715018a61461047957600080fd5b806336568abe1161022457806336568abe146103365780633f41b614146103565780633f4ba83a1461038e578063572b6c05146103a35780635b6fa8db146103f157600080fd5b806301ffc9a714610261578063248a9ca314610296578063268b15ed146102d45780632f2ff15d146102f65780633092afd514610316575b600080fd5b34801561026d57600080fd5b5061028161027c366004612b69565b61081f565b60405190151581526020015b60405180910390f35b3480156102a257600080fd5b506102c66102b1366004612b93565b60009081526097602052604090206001015490565b60405190815260200161028d565b3480156102e057600080fd5b506102f46102ef366004612bf4565b610856565b005b34801561030257600080fd5b506102f4610311366004612c54565b6108f9565b34801561032257600080fd5b506102f4610331366004612c84565b610923565b34801561034257600080fd5b506102f4610351366004612c54565b610937565b34801561036257600080fd5b5060c954610376906001600160a01b031681565b6040516001600160a01b03909116815260200161028d565b34801561039a57600080fd5b506102f46109c5565b3480156103af57600080fd5b506102816103be366004612c84565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b3480156103fd57600080fd5b5060cc54610376906001600160a01b031681565b34801561041d57600080fd5b506102816109d7565b34801561043257600080fd5b506102f4610441366004612cf3565b6109ed565b34801561045257600080fd5b506102f4610461366004612e1b565b610d0c565b6102f4610474366004612c84565b610d54565b34801561048557600080fd5b506102f4610e17565b34801561049a57600080fd5b506102f46104a9366004612e1b565b610e29565b3480156104ba57600080fd5b5060ce54610376906001600160a01b031681565b6102f46104dc366004612c84565b610e71565b3480156104ed57600080fd5b506102f4610eee565b34801561050257600080fd5b506033546001600160a01b0316610376565b34801561052057600080fd5b506102f461052f366004612eb9565b610efe565b34801561054057600080fd5b5061028161054f366004612c54565b610f84565b34801561056057600080fd5b506102f461056f366004612c84565b610faf565b34801561058057600080fd5b506102f4610fc0565b34801561059557600080fd5b506102f46105a4366004612f14565b610fda565b3480156105b557600080fd5b506102c6600081565b3480156105ca57600080fd5b506105fe604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b60405161028d9190612fa5565b34801561061757600080fd5b5060cb54610376906001600160a01b031681565b34801561063757600080fd5b50610281610646366004612c84565b6110b9565b34801561065757600080fd5b506102f4610666366004612fb8565b6110d3565b34801561067757600080fd5b50610281610686366004612b93565b6111de565b34801561069757600080fd5b506102f46106a6366004612c84565b61123c565b3480156106b757600080fd5b506102f46106c6366004612c84565b611266565b3480156106d757600080fd5b506102f46106e6366004612f14565b6112ab565b3480156106f757600080fd5b506102f4610706366004612fed565b6112f2565b34801561071757600080fd5b5060ca54610376906001600160a01b031681565b34801561073757600080fd5b506102f461074636600461306f565b6116ed565b34801561075757600080fd5b506102f4610766366004612fb8565b611783565b34801561077757600080fd5b506102c660008051602061376e83398151915281565b34801561079957600080fd5b506102f46107a8366004612c54565b61183a565b3480156107b957600080fd5b506102f46107c8366004612b93565b61185f565b3480156107d957600080fd5b506102f46107e8366004612c84565b6118d1565b3480156107f957600080fd5b506105fe6040518060400160405280600681526020016518171a17189b60d11b81525081565b60006001600160e01b03198216637965db0b60e01b148061085057506301ffc9a760e01b6001600160e01b03198316145b92915050565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061089a92508491508390506118ed565b6108a26109d7565b156108c85760405162461bcd60e51b81526004016108bf90613124565b60405180910390fd5b60606108f16108d5611a42565b6108e8886108e38989611a51565b611a7d565b83846001611b8e565b505050505050565b60008281526097602052604090206001015461091481611f5e565b61091e8383611f6f565b505050565b61092b611ff6565b6109348161206f565b50565b61093f611a42565b6001600160a01b0316816001600160a01b0316146109b75760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016108bf565b6109c18282612087565b5050565b6109cd611ff6565b6109d561210c565b565b60008051602061374e8339815191525460ff1690565b6109f7868861314e565b8051600203610a6857610a0b610646611a42565b610a635760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b60648201526084016108bf565b610bf5565b6000610a73826121b4565b60c9549092506001600160a01b0316905063430c2081610a91611a42565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610adc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b009190613218565b80610b8f575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610b59573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b7d9190613218565b8015610b8f5750610b8f610646611a42565b610bf35760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b60648201526084016108bf565b505b610bff878961314e565b600281511015610c5f5760405162461bcd60e51b815260206004820152602560248201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456044820152642627abaf9960d91b60648201526084016108bf565b610cb3610c9360008360018551610c76919061324b565b81518110610c8657610c8661325e565b60200260200101516121ef565b82600081518110610ca657610ca661325e565b60200260200101516118ed565b610cbb6109d7565b15610cd85760405162461bcd60e51b81526004016108bf90613124565b610d008a610ce68a8c61314e565b610cf0898b61314e565b610cfa888a61314e565b87611b8e565b50505050505050505050565b610d14611ff6565b60005b81518110156109c157610d42828281518110610d3557610d3561325e565b602002602001015161206f565b80610d4c81613274565b915050610d17565b610d5f610646611a42565b610d7b5760405162461bcd60e51b81526004016108bf9061328d565b6001600160a01b038116610dd15760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108bf565b610dda816122a3565b610de2610fc0565b6040516001600160a01b038216903480156108fc02916000818181858888f193505050501580156109c1573d6000803e3d6000fd5b610e1f611ff6565b6109d560006122bb565b610e31611ff6565b60005b81518110156109c157610e5f828281518110610e5257610e5261325e565b60200260200101516122a3565b80610e6981613274565b915050610e34565b610e7c610646611a42565b610e985760405162461bcd60e51b81526004016108bf9061328d565b6001600160a01b038116610dda5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108bf565b610ef6611ff6565b6109d561230d565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610f4292508491508390506118ed565b610f4a6109d7565b15610f675760405162461bcd60e51b81526004016108bf90613124565b6060610f7b876108e8886108e38989611a51565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610fb7611ff6565b610934816122a3565b6109d560008051602061376e833981519152610351611a42565b610fe2611ff6565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061101490859085906004016132c2565b600060405180830381600087803b15801561102e57600080fd5b505af1158015611042573d6000803e3d6000fd5b505060cb546001600160a01b03161591506109c190505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061108b90859085906004016132c2565b600060405180830381600087803b1580156110a557600080fd5b505af11580156108f1573d6000803e3d6000fd5b600061085060008051602061376e83398151915283610f84565b6110de610646611a42565b6110fa5760405162461bcd60e51b81526004016108bf9061328d565b60c9546040516000916001600160a01b03169061111d90859085906024016132f1565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b17905251611152919061332a565b6000604051808303816000865af19150503d806000811461118f576040519150601f19603f3d011682016040523d82523d6000602084013e611194565b606091505b505090508061091e5760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b60448201526064016108bf565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611232906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b611244611ff6565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b61126e611ff6565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b6112b3611ff6565b6109c182828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061237592505050565b600054610100900460ff16158080156113125750600054600160ff909116105b8061132c5750303b15801561132c575060005460ff166001145b61138f5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016108bf565b6000805460ff1916600117905580156113b2576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce8054909116918516919091179055611410612479565b6114186124b0565b611421826124e9565b611429612510565b6040805161028081018252600661024082018181526563727970746f60d01b610260840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b81830152610160840152835180850185526002815261686960f01b8183015261018084015283518085018552918252656b726573757360d01b828201526101a083019190915282518084018452600580825264616e696d6560d81b828401526101c084019190915283518085018552818152646d616e676160d81b818401526101e084015283518085018552600981526862696e616e6365757360b81b8184015261020084015283518085019094528352647265616c6d60d81b9083015261022081019190915260005b601281101561169d5761168b8282601281106116815761168161325e565b6020020151612375565b8061169581613274565b915050611663565b50508015610f7b576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061173192508491508390506118ed565b6117396109d7565b156117565760405162461bcd60e51b81526004016108bf90613124565b610d008a6117688b6108e38c8c611a51565b611772888a61314e565b61177c878961314e565b6001611b8e565b61178b611ff6565b60005b8181101561091e5760c9546001600160a01b031663509602398484848181106117b9576117b961325e565b90506020020160208101906117ce9190612c84565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561180f57600080fd5b505af1158015611823573d6000803e3d6000fd5b50505050808061183290613274565b91505061178e565b60008281526097602052604090206001015461185581611f5e565b61091e8383612087565b611867611ff6565b61187081612550565b61188c5760405162461bcd60e51b81526004016108bf90613346565b600081815260cd602052604081206118a391612b1b565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b6118d9611ff6565b6118e281612576565b6109346000826125ec565b6118f682612550565b6119125760405162461bcd60e51b81526004016108bf90613346565b60006119458260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a816000015111156119ed57611970611964826000600a6125f6565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8036119ed5760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b60648201526084016108bf565b6119f682612635565b61091e5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c494400000060448201526064016108bf565b6000611a4c612799565b905090565b60608282604051602001611a66929190613388565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611a975790505090508281600081518110611ac257611ac261325e565b602002602001018190525060cd60008581526020019081526020016000208054611aeb906133b0565b80601f0160208091040260200160405190810160405280929190818152602001828054611b17906133b0565b8015611b645780601f10611b3957610100808354040283529160200191611b64565b820191906000526020600020905b815481529060010190602001808311611b4757829003601f168201915b505050505081600181518110611b7c57611b7c61325e565b60209081029190910101529392505050565b600080611b9a866121b4565b91509150828015611bac575060028651115b8015611c2e575060c9546040516331a9108f60e11b8152600481018390526001600160a01b03898116921690636352211e90602401602060405180830381865afa158015611bfe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c2291906133ea565b6001600160a01b031614155b15611c8e5760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b60648201526084016108bf565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015611cd7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cfb9190613218565b8015611d7a575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa158015611d4b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d6f91906133ea565b6001600160a01b0316145b15611dee5760c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690611db7908a908a908a908a908a9060040161345c565b600060405180830381600087803b158015611dd157600080fd5b505af1158015611de5573d6000803e3d6000fd5b50505050610f7b565b611df7826127df565b611e008661283e565b8015611e0d575085516002145b15611eeb5760ca5486516001600160a01b039091169063c36c21259089908990600090611e3c57611e3c61325e565b602090810291909101015160cc546040516001600160e01b031960e086901b168152611e769392916001600160a01b0316906004016134bb565b600060405180830381600087803b158015611e9057600080fd5b505af1158015611ea4573d6000803e3d6000fd5b50505050600085511115611ee65760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490611db7908890889087906004016134f0565b610f7b565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790611f23908a908a908a908a908a9060040161345c565b600060405180830381600087803b158015611f3d57600080fd5b505af1158015611f51573d6000803e3d6000fd5b5050505050505050505050565b61093481611f6a611a42565b612898565b611f798282610f84565b6109c15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611fb2611a42565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611ffe611a42565b6001600160a01b03166120196033546001600160a01b031690565b6001600160a01b0316146109d55760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016108bf565b61093460008051602061376e8339815191528261183a565b6120918282610f84565b156109c15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff191690556120c8611a42565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6121146109d7565b6121575760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b60448201526064016108bf565b60008051602061374e833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa612197611a42565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b80156121e9578291506121d58285610c7660018561324b565b9250806121e181613526565b9150506121bc565b50915091565b600081516000036122425760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d505459000000000060448201526064016108bf565b8282604051602001612254919061332a565b60405160208183030381529060405280519060200120604051602001612284929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b61093460008051602061376e833981519152826125ec565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6123156109d7565b156123325760405162461bcd60e51b81526004016108bf90613124565b60008051602061374e833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612197611a42565b60006123826000836121ef565b600081815260cd6020526040902090915061239d8382613583565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980836040516123ce9190612fa5565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa15801561241f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124439190613218565b6109c15760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c609061108b9084908690600401613642565b600054610100900460ff166124a05760405162461bcd60e51b81526004016108bf90613663565b6109d56124ab611a42565b6122bb565b600054610100900460ff166124d75760405162461bcd60e51b81526004016108bf90613663565b6109d560006124e4611a42565b6125ec565b600054610100900460ff1661126e5760405162461bcd60e51b81526004016108bf90613663565b600054610100900460ff166125375760405162461bcd60e51b81526004016108bf90613663565b60008051602061374e833981519152805460ff19169055565b600081815260cd60205260408120805482919061256c906133b0565b9050119050919050565b61257e611ff6565b6001600160a01b0381166125e35760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016108bf565b610934816122bb565b6109c18282611f6f565b6040805180820190915260008082526020820152604051806040016040528083815260200184866020015161262b91906136ae565b9052949350505050565b6000815160000361264857506000919050565b60208201805160f81c60308110801590612666575060398160ff1611155b158015612688575060618160ff16101580156126865750607a8160ff1611155b155b15612697575060009392505050565b83516001811115612705576126b9836126b160018461324b565b015160f81c90565b915060308260ff16101580156126d3575060398260ff1611155b1580156126f5575060618260ff16101580156126f35750607a8260ff1611155b155b1561270557506000949350505050565b60015b61271360018361324b565b81101561278d578381015160f81c9250602d8314801590612749575060308360ff1610158015612747575060398360ff1611155b155b801561276a575060618360ff16101580156127685750607a8360ff1611155b155b1561277b5750600095945050505050565b8061278581613274565b915050612708565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b031633036127da575060331936013560601c90565b503390565b6127e8816111de565b156128355760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b454400000060448201526064016108bf565b610934816128fc565b60008061285560008460018651610c76919061324b565b60ca549091506001600160a01b0316158015906128915750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6128a28282610f84565b6109c1576128ba816001600160a01b03166014612980565b6128c5836020612980565b6040516020016128d69291906136c1565b60408051601f198184030181529082905262461bcd60e51b82526108bf91600401612fa5565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260019061293b90606001611219565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b6060600061298f836002613736565b61299a9060026136ae565b6001600160401b038111156129b1576129b1612db2565b6040519080825280601f01601f1916602001820160405280156129db576020820181803683370190505b509050600360fc1b816000815181106129f6576129f661325e565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612a2557612a2561325e565b60200101906001600160f81b031916908160001a9053506000612a49846002613736565b612a549060016136ae565b90505b6001811115612acc576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612a8857612a8861325e565b1a60f81b828281518110612a9e57612a9e61325e565b60200101906001600160f81b031916908160001a90535060049490941c93612ac581613526565b9050612a57565b5083156128915760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016108bf565b508054612b27906133b0565b6000825580601f10612b37575050565b601f01602090049060005260206000209081019061093491905b80821115612b655760008155600101612b51565b5090565b600060208284031215612b7b57600080fd5b81356001600160e01b03198116811461289157600080fd5b600060208284031215612ba557600080fd5b5035919050565b60008083601f840112612bbe57600080fd5b5081356001600160401b03811115612bd557600080fd5b602083019150836020828501011115612bed57600080fd5b9250929050565b600080600060408486031215612c0957600080fd5b8335925060208401356001600160401b03811115612c2657600080fd5b612c3286828701612bac565b9497909650939450505050565b6001600160a01b038116811461093457600080fd5b60008060408385031215612c6757600080fd5b823591506020830135612c7981612c3f565b809150509250929050565b600060208284031215612c9657600080fd5b813561289181612c3f565b60008083601f840112612cb357600080fd5b5081356001600160401b03811115612cca57600080fd5b6020830191508360208260051b8501011115612bed57600080fd5b801515811461093457600080fd5b60008060008060008060008060a0898b031215612d0f57600080fd5b8835612d1a81612c3f565b975060208901356001600160401b0380821115612d3657600080fd5b612d428c838d01612ca1565b909950975060408b0135915080821115612d5b57600080fd5b612d678c838d01612ca1565b909750955060608b0135915080821115612d8057600080fd5b50612d8d8b828c01612ca1565b9094509250506080890135612da181612ce5565b809150509295985092959890939650565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715612df057612df0612db2565b604052919050565b60006001600160401b03821115612e1157612e11612db2565b5060051b60200190565b60006020808385031215612e2e57600080fd5b82356001600160401b03811115612e4457600080fd5b8301601f81018513612e5557600080fd5b8035612e68612e6382612df8565b612dc8565b81815260059190911b82018301908381019087831115612e8757600080fd5b928401925b82841015612eae578335612e9f81612c3f565b82529284019290840190612e8c565b979650505050505050565b60008060008060608587031215612ecf57600080fd5b8435612eda81612c3f565b93506020850135925060408501356001600160401b03811115612efc57600080fd5b612f0887828801612bac565b95989497509550505050565b60008060208385031215612f2757600080fd5b82356001600160401b03811115612f3d57600080fd5b612f4985828601612bac565b90969095509350505050565b60005b83811015612f70578181015183820152602001612f58565b50506000910152565b60008151808452612f91816020860160208601612f55565b601f01601f19169290920160200192915050565b6020815260006128916020830184612f79565b60008060208385031215612fcb57600080fd5b82356001600160401b03811115612fe157600080fd5b612f4985828601612ca1565b60008060008060008060c0878903121561300657600080fd5b863561301181612c3f565b9550602087013561302181612c3f565b9450604087013561303181612c3f565b9350606087013561304181612c3f565b9250608087013561305181612c3f565b915060a087013561306181612c3f565b809150509295509295509295565b60008060008060008060008060a0898b03121561308b57600080fd5b883561309681612c3f565b97506020890135965060408901356001600160401b03808211156130b957600080fd5b6130c58c838d01612bac565b909850965060608b01359150808211156130de57600080fd5b6130ea8c838d01612ca1565b909650945060808b013591508082111561310357600080fd5b506131108b828c01612ca1565b999c989b5096995094979396929594505050565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b600061315c612e6384612df8565b80848252602080830192508560051b85013681111561317a57600080fd5b855b8181101561320c5780356001600160401b038082111561319c5760008081fd5b90880190601f36818401126131b15760008081fd5b8235828111156131c3576131c3612db2565b6131d4818301601f19168801612dc8565b925080835236878286010111156131ed57600091508182fd5b808785018885013760009083018701525086525093820193820161317c565b50919695505050505050565b60006020828403121561322a57600080fd5b815161289181612ce5565b634e487b7160e01b600052601160045260246000fd5b8181038181111561085057610850613235565b634e487b7160e01b600052603260045260246000fd5b60006001820161328657613286613235565b5060010190565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b6020808252810182905260006001600160fb1b0383111561331157600080fd5b8260051b80856040850137919091016040019392505050565b6000825161333c818460208701612f55565b9190910192915050565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c908216806133c457607f821691505b6020821081036133e457634e487b7160e01b600052602260045260246000fd5b50919050565b6000602082840312156133fc57600080fd5b815161289181612c3f565b600081518084526020808501808196508360051b8101915082860160005b8581101561344f57828403895261343d848351612f79565b98850198935090840190600101613425565b5091979650505050505050565b6001600160a01b038616815260a06020820181905260009061348090830187613407565b82810360408401526134928187613407565b905082810360608401526134a68186613407565b91505082151560808301529695505050505050565b600060018060a01b038086168352606060208401526134dd6060840186612f79565b9150808416604084015250949350505050565b6060815260006135036060830186613407565b82810360208401526135158186613407565b915050826040830152949350505050565b60008161353557613535613235565b506000190190565b601f82111561091e57600081815260208120601f850160051c810160208610156135645750805b601f850160051c820191505b818110156108f157828155600101613570565b81516001600160401b0381111561359c5761359c612db2565b6135b0816135aa84546133b0565b8461353d565b602080601f8311600181146135e557600084156135cd5750858301515b600019600386901b1c1916600185901b1785556108f1565b600085815260208120601f198616915b82811015613614578886015182559484019460019091019084016135f5565b50858210156136325787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b82815260406020820152600061365b6040830184612f79565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b8082018082111561085057610850613235565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516136f9816017850160208801612f55565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161372a816028840160208801612f55565b01602801949350505050565b80820281158282048414176108505761085061323556fe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
