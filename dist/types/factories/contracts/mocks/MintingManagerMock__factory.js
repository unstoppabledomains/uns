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
const _bytecode = "0x608060405234801561001057600080fd5b506137b9806100206000396000f3fe60806040526004361061025c5760003560e01c806391d1485411610144578063b9998a24116100b6578063d1f5692c1161007a578063d1f5692c1461074b578063d53913931461076b578063d547741f1461078d578063ec527389146107ad578063f2fde38b146107cd578063ffa1ad74146107ed57600080fd5b8063b9998a24146106ab578063c3a3bc00146106cb578063cc2a9a5b146106eb578063cc2c3fc41461070b578063ceeb4f501461072b57600080fd5b8063a3f4df7e11610108578063a3f4df7e146105be578063a849d65c1461060b578063aa271e1a1461062b578063ae31844a1461064b578063b0aa98c71461066b578063b3ab15fb1461068b57600080fd5b806391d1485414610534578063983b2d5614610554578063986502751461057457806399e0dd7c14610589578063a217fddf146105a957600080fd5b80635c975abb116101dd57806371e2a657116101a157806371e2a6571461048e57806377a2a589146104ae57806381c81d35146104ce5780638456cb59146104e15780638da5cb5b146104f6578063906cecc11461051457600080fd5b80635c975abb146104115780635cd7e3b3146104265780635fc1964f14610446578063634486da14610466578063715018a61461047957600080fd5b806336568abe1161022457806336568abe146103365780633f41b614146103565780633f4ba83a1461038e578063572b6c05146103a35780635b6fa8db146103f157600080fd5b806301ffc9a714610261578063248a9ca314610296578063268b15ed146102d45780632f2ff15d146102f65780633092afd514610316575b600080fd5b34801561026d57600080fd5b5061028161027c366004612b88565b61081f565b60405190151581526020015b60405180910390f35b3480156102a257600080fd5b506102c66102b1366004612bb2565b60009081526097602052604090206001015490565b60405190815260200161028d565b3480156102e057600080fd5b506102f46102ef366004612c13565b610856565b005b34801561030257600080fd5b506102f4610311366004612c73565b6108f9565b34801561032257600080fd5b506102f4610331366004612ca3565b610923565b34801561034257600080fd5b506102f4610351366004612c73565b610937565b34801561036257600080fd5b5060c954610376906001600160a01b031681565b6040516001600160a01b03909116815260200161028d565b34801561039a57600080fd5b506102f46109c5565b3480156103af57600080fd5b506102816103be366004612ca3565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b3480156103fd57600080fd5b5060cc54610376906001600160a01b031681565b34801561041d57600080fd5b506102816109d7565b34801561043257600080fd5b506102f4610441366004612d12565b6109ed565b34801561045257600080fd5b506102f4610461366004612e3a565b610d0c565b6102f4610474366004612ca3565b610d54565b34801561048557600080fd5b506102f4610e17565b34801561049a57600080fd5b506102f46104a9366004612e3a565b610e29565b3480156104ba57600080fd5b5060ce54610376906001600160a01b031681565b6102f46104dc366004612ca3565b610e71565b3480156104ed57600080fd5b506102f4610eee565b34801561050257600080fd5b506033546001600160a01b0316610376565b34801561052057600080fd5b506102f461052f366004612ed8565b610efe565b34801561054057600080fd5b5061028161054f366004612c73565b610f84565b34801561056057600080fd5b506102f461056f366004612ca3565b610faf565b34801561058057600080fd5b506102f4610fc0565b34801561059557600080fd5b506102f46105a4366004612f33565b610fda565b3480156105b557600080fd5b506102c6600081565b3480156105ca57600080fd5b506105fe604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b60405161028d9190612fc4565b34801561061757600080fd5b5060cb54610376906001600160a01b031681565b34801561063757600080fd5b50610281610646366004612ca3565b6110b9565b34801561065757600080fd5b506102f4610666366004612fd7565b6110d3565b34801561067757600080fd5b50610281610686366004612bb2565b6111de565b34801561069757600080fd5b506102f46106a6366004612ca3565b61123c565b3480156106b757600080fd5b506102f46106c6366004612ca3565b611266565b3480156106d757600080fd5b506102f46106e6366004612f33565b6112ab565b3480156106f757600080fd5b506102f461070636600461300c565b6112f2565b34801561071757600080fd5b5060ca54610376906001600160a01b031681565b34801561073757600080fd5b506102f461074636600461308e565b61170c565b34801561075757600080fd5b506102f4610766366004612fd7565b6117a2565b34801561077757600080fd5b506102c660008051602061378d83398151915281565b34801561079957600080fd5b506102f46107a8366004612c73565b611859565b3480156107b957600080fd5b506102f46107c8366004612bb2565b61187e565b3480156107d957600080fd5b506102f46107e8366004612ca3565b6118f0565b3480156107f957600080fd5b506105fe6040518060400160405280600681526020016518171a17189b60d11b81525081565b60006001600160e01b03198216637965db0b60e01b148061085057506301ffc9a760e01b6001600160e01b03198316145b92915050565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061089a925084915083905061190c565b6108a26109d7565b156108c85760405162461bcd60e51b81526004016108bf90613143565b60405180910390fd5b60606108f16108d5611a61565b6108e8886108e38989611a70565b611a9c565b83846001611bad565b505050505050565b60008281526097602052604090206001015461091481611f7d565b61091e8383611f8e565b505050565b61092b612015565b6109348161208e565b50565b61093f611a61565b6001600160a01b0316816001600160a01b0316146109b75760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016108bf565b6109c182826120a6565b5050565b6109cd612015565b6109d561212b565b565b60008051602061376d8339815191525460ff1690565b6109f7868861316d565b8051600203610a6857610a0b610646611a61565b610a635760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b60648201526084016108bf565b610bf5565b6000610a73826121d3565b60c9549092506001600160a01b0316905063430c2081610a91611a61565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610adc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b009190613237565b80610b8f575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610b59573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b7d9190613237565b8015610b8f5750610b8f610646611a61565b610bf35760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b60648201526084016108bf565b505b610bff878961316d565b600281511015610c5f5760405162461bcd60e51b815260206004820152602560248201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456044820152642627abaf9960d91b60648201526084016108bf565b610cb3610c9360008360018551610c76919061326a565b81518110610c8657610c8661327d565b602002602001015161220e565b82600081518110610ca657610ca661327d565b602002602001015161190c565b610cbb6109d7565b15610cd85760405162461bcd60e51b81526004016108bf90613143565b610d008a610ce68a8c61316d565b610cf0898b61316d565b610cfa888a61316d565b87611bad565b50505050505050505050565b610d14612015565b60005b81518110156109c157610d42828281518110610d3557610d3561327d565b602002602001015161208e565b80610d4c81613293565b915050610d17565b610d5f610646611a61565b610d7b5760405162461bcd60e51b81526004016108bf906132ac565b6001600160a01b038116610dd15760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108bf565b610dda816122c2565b610de2610fc0565b6040516001600160a01b038216903480156108fc02916000818181858888f193505050501580156109c1573d6000803e3d6000fd5b610e1f612015565b6109d560006122da565b610e31612015565b60005b81518110156109c157610e5f828281518110610e5257610e5261327d565b60200260200101516122c2565b80610e6981613293565b915050610e34565b610e7c610646611a61565b610e985760405162461bcd60e51b81526004016108bf906132ac565b6001600160a01b038116610dda5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108bf565b610ef6612015565b6109d561232c565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610f42925084915083905061190c565b610f4a6109d7565b15610f675760405162461bcd60e51b81526004016108bf90613143565b6060610f7b876108e8886108e38989611a70565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610fb7612015565b610934816122c2565b6109d560008051602061378d833981519152610351611a61565b610fe2612015565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061101490859085906004016132e1565b600060405180830381600087803b15801561102e57600080fd5b505af1158015611042573d6000803e3d6000fd5b505060cb546001600160a01b03161591506109c190505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061108b90859085906004016132e1565b600060405180830381600087803b1580156110a557600080fd5b505af11580156108f1573d6000803e3d6000fd5b600061085060008051602061378d83398151915283610f84565b6110de610646611a61565b6110fa5760405162461bcd60e51b81526004016108bf906132ac565b60c9546040516000916001600160a01b03169061111d9085908590602401613310565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b179052516111529190613349565b6000604051808303816000865af19150503d806000811461118f576040519150601f19603f3d011682016040523d82523d6000602084013e611194565b606091505b505090508061091e5760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b60448201526064016108bf565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611232906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b611244612015565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b61126e612015565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b6112b3612015565b6109c182828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061239492505050565b600054610100900460ff16158080156113125750600054600160ff909116105b8061132c5750303b15801561132c575060005460ff166001145b61138f5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016108bf565b6000805460ff1916600117905580156113b2576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce8054909116918516919091179055611410612498565b6114186124cf565b61142182612508565b61142961252f565b604080516102a081018252600661026082018181526563727970746f60d01b610280840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b8183015261016084015283518085018552600280825261686960f01b8284015261018085019190915284518086018652928352656b726573757360d01b838301526101a084019290925283518085018552600580825264616e696d6560d81b828401526101c085019190915284518086018652818152646d616e676160d81b818401526101e085015284518086018652600981526862696e616e6365757360b81b8184015261020085015284518086018652908152647265616c6d60d81b81830152610220840152835180850190945290835261676f60f01b9083015261024081019190915260005b60138110156116bc576116aa8282601381106116a0576116a061327d565b6020020151612394565b806116b481613293565b915050611682565b50508015610f7b576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611750925084915083905061190c565b6117586109d7565b156117755760405162461bcd60e51b81526004016108bf90613143565b610d008a6117878b6108e38c8c611a70565b611791888a61316d565b61179b878961316d565b6001611bad565b6117aa612015565b60005b8181101561091e5760c9546001600160a01b031663509602398484848181106117d8576117d861327d565b90506020020160208101906117ed9190612ca3565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561182e57600080fd5b505af1158015611842573d6000803e3d6000fd5b50505050808061185190613293565b9150506117ad565b60008281526097602052604090206001015461187481611f7d565b61091e83836120a6565b611886612015565b61188f8161256f565b6118ab5760405162461bcd60e51b81526004016108bf90613365565b600081815260cd602052604081206118c291612b3a565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b6118f8612015565b61190181612595565b61093460008261260b565b6119158261256f565b6119315760405162461bcd60e51b81526004016108bf90613365565b60006119648260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115611a0c5761198f611983826000600a612615565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b803611a0c5760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b60648201526084016108bf565b611a1582612654565b61091e5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c494400000060448201526064016108bf565b6000611a6b6127b8565b905090565b60608282604051602001611a859291906133a7565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611ab65790505090508281600081518110611ae157611ae161327d565b602002602001018190525060cd60008581526020019081526020016000208054611b0a906133cf565b80601f0160208091040260200160405190810160405280929190818152602001828054611b36906133cf565b8015611b835780601f10611b5857610100808354040283529160200191611b83565b820191906000526020600020905b815481529060010190602001808311611b6657829003601f168201915b505050505081600181518110611b9b57611b9b61327d565b60209081029190910101529392505050565b600080611bb9866121d3565b91509150828015611bcb575060028651115b8015611c4d575060c9546040516331a9108f60e11b8152600481018390526001600160a01b03898116921690636352211e90602401602060405180830381865afa158015611c1d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c419190613409565b6001600160a01b031614155b15611cad5760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b60648201526084016108bf565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015611cf6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d1a9190613237565b8015611d99575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa158015611d6a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d8e9190613409565b6001600160a01b0316145b15611e0d5760c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690611dd6908a908a908a908a908a9060040161347b565b600060405180830381600087803b158015611df057600080fd5b505af1158015611e04573d6000803e3d6000fd5b50505050610f7b565b611e16826127fe565b611e1f8661285d565b8015611e2c575085516002145b15611f0a5760ca5486516001600160a01b039091169063c36c21259089908990600090611e5b57611e5b61327d565b602090810291909101015160cc546040516001600160e01b031960e086901b168152611e959392916001600160a01b0316906004016134da565b600060405180830381600087803b158015611eaf57600080fd5b505af1158015611ec3573d6000803e3d6000fd5b50505050600085511115611f055760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490611dd69088908890879060040161350f565b610f7b565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790611f42908a908a908a908a908a9060040161347b565b600060405180830381600087803b158015611f5c57600080fd5b505af1158015611f70573d6000803e3d6000fd5b5050505050505050505050565b61093481611f89611a61565b6128b7565b611f988282610f84565b6109c15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611fd1611a61565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b61201d611a61565b6001600160a01b03166120386033546001600160a01b031690565b6001600160a01b0316146109d55760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016108bf565b61093460008051602061378d83398151915282611859565b6120b08282610f84565b156109c15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff191690556120e7611a61565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6121336109d7565b6121765760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b60448201526064016108bf565b60008051602061376d833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6121b6611a61565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b8015612208578291506121f48285610c7660018561326a565b92508061220081613545565b9150506121db565b50915091565b600081516000036122615760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d505459000000000060448201526064016108bf565b82826040516020016122739190613349565b604051602081830303815290604052805190602001206040516020016122a3929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b61093460008051602061378d8339815191528261260b565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6123346109d7565b156123515760405162461bcd60e51b81526004016108bf90613143565b60008051602061376d833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586121b6611a61565b60006123a160008361220e565b600081815260cd602052604090209091506123bc83826135a2565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980836040516123ed9190612fc4565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa15801561243e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124629190613237565b6109c15760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c609061108b9084908690600401613661565b600054610100900460ff166124bf5760405162461bcd60e51b81526004016108bf90613682565b6109d56124ca611a61565b6122da565b600054610100900460ff166124f65760405162461bcd60e51b81526004016108bf90613682565b6109d56000612503611a61565b61260b565b600054610100900460ff1661126e5760405162461bcd60e51b81526004016108bf90613682565b600054610100900460ff166125565760405162461bcd60e51b81526004016108bf90613682565b60008051602061376d833981519152805460ff19169055565b600081815260cd60205260408120805482919061258b906133cf565b9050119050919050565b61259d612015565b6001600160a01b0381166126025760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016108bf565b610934816122da565b6109c18282611f8e565b6040805180820190915260008082526020820152604051806040016040528083815260200184866020015161264a91906136cd565b9052949350505050565b6000815160000361266757506000919050565b60208201805160f81c60308110801590612685575060398160ff1611155b1580156126a7575060618160ff16101580156126a55750607a8160ff1611155b155b156126b6575060009392505050565b83516001811115612724576126d8836126d060018461326a565b015160f81c90565b915060308260ff16101580156126f2575060398260ff1611155b158015612714575060618260ff16101580156127125750607a8260ff1611155b155b1561272457506000949350505050565b60015b61273260018361326a565b8110156127ac578381015160f81c9250602d8314801590612768575060308360ff1610158015612766575060398360ff1611155b155b8015612789575060618360ff16101580156127875750607a8360ff1611155b155b1561279a5750600095945050505050565b806127a481613293565b915050612727565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b031633036127f9575060331936013560601c90565b503390565b612807816111de565b156128545760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b454400000060448201526064016108bf565b6109348161291b565b60008061287460008460018651610c76919061326a565b60ca549091506001600160a01b0316158015906128b05750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6128c18282610f84565b6109c1576128d9816001600160a01b0316601461299f565b6128e483602061299f565b6040516020016128f59291906136e0565b60408051601f198184030181529082905262461bcd60e51b82526108bf91600401612fc4565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260019061295a90606001611219565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b606060006129ae836002613755565b6129b99060026136cd565b6001600160401b038111156129d0576129d0612dd1565b6040519080825280601f01601f1916602001820160405280156129fa576020820181803683370190505b509050600360fc1b81600081518110612a1557612a1561327d565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612a4457612a4461327d565b60200101906001600160f81b031916908160001a9053506000612a68846002613755565b612a739060016136cd565b90505b6001811115612aeb576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612aa757612aa761327d565b1a60f81b828281518110612abd57612abd61327d565b60200101906001600160f81b031916908160001a90535060049490941c93612ae481613545565b9050612a76565b5083156128b05760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016108bf565b508054612b46906133cf565b6000825580601f10612b56575050565b601f01602090049060005260206000209081019061093491905b80821115612b845760008155600101612b70565b5090565b600060208284031215612b9a57600080fd5b81356001600160e01b0319811681146128b057600080fd5b600060208284031215612bc457600080fd5b5035919050565b60008083601f840112612bdd57600080fd5b5081356001600160401b03811115612bf457600080fd5b602083019150836020828501011115612c0c57600080fd5b9250929050565b600080600060408486031215612c2857600080fd5b8335925060208401356001600160401b03811115612c4557600080fd5b612c5186828701612bcb565b9497909650939450505050565b6001600160a01b038116811461093457600080fd5b60008060408385031215612c8657600080fd5b823591506020830135612c9881612c5e565b809150509250929050565b600060208284031215612cb557600080fd5b81356128b081612c5e565b60008083601f840112612cd257600080fd5b5081356001600160401b03811115612ce957600080fd5b6020830191508360208260051b8501011115612c0c57600080fd5b801515811461093457600080fd5b60008060008060008060008060a0898b031215612d2e57600080fd5b8835612d3981612c5e565b975060208901356001600160401b0380821115612d5557600080fd5b612d618c838d01612cc0565b909950975060408b0135915080821115612d7a57600080fd5b612d868c838d01612cc0565b909750955060608b0135915080821115612d9f57600080fd5b50612dac8b828c01612cc0565b9094509250506080890135612dc081612d04565b809150509295985092959890939650565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715612e0f57612e0f612dd1565b604052919050565b60006001600160401b03821115612e3057612e30612dd1565b5060051b60200190565b60006020808385031215612e4d57600080fd5b82356001600160401b03811115612e6357600080fd5b8301601f81018513612e7457600080fd5b8035612e87612e8282612e17565b612de7565b81815260059190911b82018301908381019087831115612ea657600080fd5b928401925b82841015612ecd578335612ebe81612c5e565b82529284019290840190612eab565b979650505050505050565b60008060008060608587031215612eee57600080fd5b8435612ef981612c5e565b93506020850135925060408501356001600160401b03811115612f1b57600080fd5b612f2787828801612bcb565b95989497509550505050565b60008060208385031215612f4657600080fd5b82356001600160401b03811115612f5c57600080fd5b612f6885828601612bcb565b90969095509350505050565b60005b83811015612f8f578181015183820152602001612f77565b50506000910152565b60008151808452612fb0816020860160208601612f74565b601f01601f19169290920160200192915050565b6020815260006128b06020830184612f98565b60008060208385031215612fea57600080fd5b82356001600160401b0381111561300057600080fd5b612f6885828601612cc0565b60008060008060008060c0878903121561302557600080fd5b863561303081612c5e565b9550602087013561304081612c5e565b9450604087013561305081612c5e565b9350606087013561306081612c5e565b9250608087013561307081612c5e565b915060a087013561308081612c5e565b809150509295509295509295565b60008060008060008060008060a0898b0312156130aa57600080fd5b88356130b581612c5e565b97506020890135965060408901356001600160401b03808211156130d857600080fd5b6130e48c838d01612bcb565b909850965060608b01359150808211156130fd57600080fd5b6131098c838d01612cc0565b909650945060808b013591508082111561312257600080fd5b5061312f8b828c01612cc0565b999c989b5096995094979396929594505050565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b600061317b612e8284612e17565b80848252602080830192508560051b85013681111561319957600080fd5b855b8181101561322b5780356001600160401b03808211156131bb5760008081fd5b90880190601f36818401126131d05760008081fd5b8235828111156131e2576131e2612dd1565b6131f3818301601f19168801612de7565b9250808352368782860101111561320c57600091508182fd5b808785018885013760009083018701525086525093820193820161319b565b50919695505050505050565b60006020828403121561324957600080fd5b81516128b081612d04565b634e487b7160e01b600052601160045260246000fd5b8181038181111561085057610850613254565b634e487b7160e01b600052603260045260246000fd5b6000600182016132a5576132a5613254565b5060010190565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b6020808252810182905260006001600160fb1b0383111561333057600080fd5b8260051b80856040850137919091016040019392505050565b6000825161335b818460208701612f74565b9190910192915050565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c908216806133e357607f821691505b60208210810361340357634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561341b57600080fd5b81516128b081612c5e565b600081518084526020808501808196508360051b8101915082860160005b8581101561346e57828403895261345c848351612f98565b98850198935090840190600101613444565b5091979650505050505050565b6001600160a01b038616815260a06020820181905260009061349f90830187613426565b82810360408401526134b18187613426565b905082810360608401526134c58186613426565b91505082151560808301529695505050505050565b600060018060a01b038086168352606060208401526134fc6060840186612f98565b9150808416604084015250949350505050565b6060815260006135226060830186613426565b82810360208401526135348186613426565b915050826040830152949350505050565b60008161355457613554613254565b506000190190565b601f82111561091e57600081815260208120601f850160051c810160208610156135835750805b601f850160051c820191505b818110156108f15782815560010161358f565b81516001600160401b038111156135bb576135bb612dd1565b6135cf816135c984546133cf565b8461355c565b602080601f83116001811461360457600084156135ec5750858301515b600019600386901b1c1916600185901b1785556108f1565b600085815260208120601f198616915b8281101561363357888601518255948401946001909101908401613614565b50858210156136515787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b82815260406020820152600061367a6040830184612f98565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b8082018082111561085057610850613254565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351613718816017850160208801612f74565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351613749816028840160208801612f74565b01602801949350505050565b80820281158282048414176108505761085061325456fe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
