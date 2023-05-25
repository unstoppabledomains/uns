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
const _bytecode = "0x608060405234801561001057600080fd5b50613831806100206000396000f3fe60806040526004361061025c5760003560e01c806391d1485411610144578063b9998a24116100b6578063d1f5692c1161007a578063d1f5692c1461074b578063d53913931461076b578063d547741f1461078d578063ec527389146107ad578063f2fde38b146107cd578063ffa1ad74146107ed57600080fd5b8063b9998a24146106ab578063c3a3bc00146106cb578063cc2a9a5b146106eb578063cc2c3fc41461070b578063ceeb4f501461072b57600080fd5b8063a3f4df7e11610108578063a3f4df7e146105be578063a849d65c1461060b578063aa271e1a1461062b578063ae31844a1461064b578063b0aa98c71461066b578063b3ab15fb1461068b57600080fd5b806391d1485414610534578063983b2d5614610554578063986502751461057457806399e0dd7c14610589578063a217fddf146105a957600080fd5b80635c975abb116101dd57806371e2a657116101a157806371e2a6571461048e57806377a2a589146104ae57806381c81d35146104ce5780638456cb59146104e15780638da5cb5b146104f6578063906cecc11461051457600080fd5b80635c975abb146104115780635cd7e3b3146104265780635fc1964f14610446578063634486da14610466578063715018a61461047957600080fd5b806336568abe1161022457806336568abe146103365780633f41b614146103565780633f4ba83a1461038e578063572b6c05146103a35780635b6fa8db146103f157600080fd5b806301ffc9a714610261578063248a9ca314610296578063268b15ed146102d45780632f2ff15d146102f65780633092afd514610316575b600080fd5b34801561026d57600080fd5b5061028161027c3660046130e1565b61081f565b60405190151581526020015b60405180910390f35b3480156102a257600080fd5b506102c66102b136600461309a565b60009081526097602052604090206001015490565b60405190815260200161028d565b3480156102e057600080fd5b506102f46102ef3660046131bd565b610856565b005b34801561030257600080fd5b506102f46103113660046130b2565b6108f9565b34801561032257600080fd5b506102f4610331366004612da2565b610923565b34801561034257600080fd5b506102f46103513660046130b2565b610937565b34801561036257600080fd5b5060c954610376906001600160a01b031681565b6040516001600160a01b03909116815260200161028d565b34801561039a57600080fd5b506102f46109c5565b3480156103af57600080fd5b506102816103be366004612da2565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b3480156103fd57600080fd5b5060cc54610376906001600160a01b031681565b34801561041d57600080fd5b506102816109d7565b34801561043257600080fd5b506102f4610441366004612dda565b6109ed565b34801561045257600080fd5b506102f4610461366004612fde565b610d47565b6102f4610474366004612da2565b610d9d565b34801561048557600080fd5b506102f4610e60565b34801561049a57600080fd5b506102f46104a9366004612fde565b610e72565b3480156104ba57600080fd5b5060ce54610376906001600160a01b031681565b6102f46104dc366004612da2565b610ec8565b3480156104ed57600080fd5b506102f4610f45565b34801561050257600080fd5b506033546001600160a01b0316610376565b34801561052057600080fd5b506102f461052f366004612e95565b610f55565b34801561054057600080fd5b5061028161054f3660046130b2565b610fdb565b34801561056057600080fd5b506102f461056f366004612da2565b611006565b34801561058057600080fd5b506102f4611017565b34801561059557600080fd5b506102f46105a436600461318a565b611031565b3480156105b557600080fd5b506102c6600081565b3480156105ca57600080fd5b506105fe604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b60405161028d9190613472565b34801561061757600080fd5b5060cb54610376906001600160a01b031681565b34801561063757600080fd5b50610281610646366004612da2565b611110565b34801561065757600080fd5b506102f4610666366004612f9f565b61112a565b34801561067757600080fd5b5061028161068636600461309a565b611235565b34801561069757600080fd5b506102f46106a6366004612da2565b611293565b3480156106b757600080fd5b506102f46106c6366004612da2565b6112bd565b3480156106d757600080fd5b506102f46106e636600461318a565b611302565b3480156106f757600080fd5b506102f4610706366004613109565b611349565b34801561071757600080fd5b5060ca54610376906001600160a01b031681565b34801561073757600080fd5b506102f4610746366004612eee565b611752565b34801561075757600080fd5b506102f4610766366004612f9f565b6117e8565b34801561077757600080fd5b506102c660008051602061380583398151915281565b34801561079957600080fd5b506102f46107a83660046130b2565b6118ad565b3480156107b957600080fd5b506102f46107c836600461309a565b6118d2565b3480156107d957600080fd5b506102f46107e8366004612da2565b611944565b3480156107f957600080fd5b506105fe6040518060400160405280600681526020016518171a17189b60d11b81525081565b60006001600160e01b03198216637965db0b60e01b148061085057506301ffc9a760e01b6001600160e01b03198316145b92915050565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061089a9250849150839050611960565b6108a26109d7565b156108c85760405162461bcd60e51b81526004016108bf906134ba565b60405180910390fd5b60606108f16108d5611ab6565b6108e8886108e38989611ac5565b611af1565b83846001611c1e565b505050505050565b60008281526097602052604090206001015461091481612029565b61091e838361203a565b505050565b61092b6120c1565b6109348161213a565b50565b61093f611ab6565b6001600160a01b0316816001600160a01b0316146109b75760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016108bf565b6109c18282612152565b5050565b6109cd6120c1565b6109d56121d7565b565b6000805160206137e58339815191525460ff1690565b6109f78688613633565b805160021415610a6957610a0c610646611ab6565b610a645760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b60648201526084016108bf565b610c14565b6000610a748261227f565b60c9549092506001600160a01b0316905063430c2081610a92611ab6565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b158015610ad857600080fd5b505afa158015610aec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b10919061307e565b80610bae575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c20819060440160206040518083038186803b158015610b6457600080fd5b505afa158015610b78573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b9c919061307e565b8015610bae5750610bae610646611ab6565b610c125760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b60648201526084016108bf565b505b610c1e8789613633565b600281511015610c7e5760405162461bcd60e51b815260206004820152602560248201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456044820152642627abaf9960d91b60648201526084016108bf565b610cee610cc060008360018551610c95919061361c565b81518110610cb357634e487b7160e01b600052603260045260246000fd5b60200260200101516122ba565b82600081518110610ce157634e487b7160e01b600052603260045260246000fd5b6020026020010151611960565b610cf66109d7565b15610d135760405162461bcd60e51b81526004016108bf906134ba565b610d3b8a610d218a8c613633565b610d2b898b613633565b610d35888a613633565b87611c1e565b50505050505050505050565b610d4f6120c1565b60005b81518110156109c157610d8b828281518110610d7e57634e487b7160e01b600052603260045260246000fd5b602002602001015161213a565b80610d958161377a565b915050610d52565b610da8610646611ab6565b610dc45760405162461bcd60e51b81526004016108bf90613485565b6001600160a01b038116610e1a5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108bf565b610e238161236f565b610e2b611017565b6040516001600160a01b038216903480156108fc02916000818181858888f193505050501580156109c1573d6000803e3d6000fd5b610e686120c1565b6109d56000612387565b610e7a6120c1565b60005b81518110156109c157610eb6828281518110610ea957634e487b7160e01b600052603260045260246000fd5b602002602001015161236f565b80610ec08161377a565b915050610e7d565b610ed3610646611ab6565b610eef5760405162461bcd60e51b81526004016108bf90613485565b6001600160a01b038116610e235760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108bf565b610f4d6120c1565b6109d56123d9565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610f999250849150839050611960565b610fa16109d7565b15610fbe5760405162461bcd60e51b81526004016108bf906134ba565b6060610fd2876108e8886108e38989611ac5565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61100e6120c1565b6109348161236f565b6109d5600080516020613805833981519152610351611ab6565b6110396120c1565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061106b9085908590600401613443565b600060405180830381600087803b15801561108557600080fd5b505af1158015611099573d6000803e3d6000fd5b505060cb546001600160a01b03161591506109c190505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906110e29085908590600401613443565b600060405180830381600087803b1580156110fc57600080fd5b505af11580156108f1573d6000803e3d6000fd5b600061085060008051602061380583398151915283610fdb565b611135610646611ab6565b6111515760405162461bcd60e51b81526004016108bf90613485565b60c9546040516000916001600160a01b0316906111749085908590602401613409565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b179052516111a99190613286565b6000604051808303816000865af19150503d80600081146111e6576040519150601f19603f3d011682016040523d82523d6000602084013e6111eb565b606091505b505090508061091e5760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b60448201526064016108bf565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611289906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b61129b6120c1565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b6112c56120c1565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b61130a6120c1565b6109c182828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061244192505050565b600054610100900460ff16158080156113695750600054600160ff909116105b806113835750303b158015611383575060005460ff166001145b6113e65760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016108bf565b6000805460ff191660011790558015611409576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce805490911691851691909117905561146761255d565b61146f612594565b611478826125cd565b6114806125f4565b6040805161028081018252600661024082018181526563727970746f60d01b610260840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b81830152610160840152835180850185526002815261686960f01b8183015261018084015283518085018552918252656b726573757360d01b828201526101a083019190915282518084018452600580825264616e696d6560d81b828401526101c084019190915283518085018552818152646d616e676160d81b818401526101e084015283518085018552600981526862696e616e6365757360b81b8184015261020084015283518085019094528352647265616c6d60d81b9083015261022081019190915260005b6012811015611702576116f08282601281106116e657634e487b7160e01b600052603260045260246000fd5b6020020151612441565b806116fa8161377a565b9150506116ba565b50508015610fd2576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506117969250849150839050611960565b61179e6109d7565b156117bb5760405162461bcd60e51b81526004016108bf906134ba565b610d3b8a6117cd8b6108e38c8c611ac5565b6117d7888a613633565b6117e18789613633565b6001611c1e565b6117f06120c1565b60005b8181101561091e5760c9546001600160a01b0316635096023984848481811061182c57634e487b7160e01b600052603260045260246000fd5b90506020020160208101906118419190612da2565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561188257600080fd5b505af1158015611896573d6000803e3d6000fd5b5050505080806118a59061377a565b9150506117f3565b6000828152609760205260409020600101546118c881612029565b61091e8383612152565b6118da6120c1565b6118e381612634565b6118ff5760405162461bcd60e51b81526004016108bf906134e4565b600081815260cd6020526040812061191691612c47565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b61194c6120c1565b6119558161265a565b6109346000826126d0565b61196982612634565b6119855760405162461bcd60e51b81526004016108bf906134e4565b60006119b88260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115611a61576119e36119d7826000600a6126da565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b81415611a615760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b60648201526084016108bf565b611a6a82612719565b61091e5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c494400000060448201526064016108bf565b6000611ac061287e565b905090565b60608282604051602001611ada9291906132a2565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611b0b5790505090508281600081518110611b4457634e487b7160e01b600052603260045260246000fd5b602002602001018190525060cd60008581526020019081526020016000208054611b6d9061373f565b80601f0160208091040260200160405190810160405280929190818152602001828054611b999061373f565b8015611be65780601f10611bbb57610100808354040283529160200191611be6565b820191906000526020600020905b815481529060010190602001808311611bc957829003601f168201915b505050505081600181518110611c0c57634e487b7160e01b600052603260045260246000fd5b60209081029190910101529392505050565b600080611c2a8661227f565b91509150828015611c3c575060028651115b8015611ccd575060c9546040516331a9108f60e11b8152600481018390526001600160a01b03898116921690636352211e9060240160206040518083038186803b158015611c8957600080fd5b505afa158015611c9d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cc19190612dbe565b6001600160a01b031614155b15611d2d5760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b60648201526084016108bf565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e799060240160206040518083038186803b158015611d7157600080fd5b505afa158015611d85573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611da9919061307e565b8015611e37575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e9060240160206040518083038186803b158015611df457600080fd5b505afa158015611e08573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e2c9190612dbe565b6001600160a01b0316145b15611eab5760c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690611e74908a908a908a908a908a9060040161333f565b600060405180830381600087803b158015611e8e57600080fd5b505af1158015611ea2573d6000803e3d6000fd5b50505050610fd2565b611eb4826128c5565b611ebd86612924565b8015611eca575085516002145b15611fb65760ca5486516001600160a01b039091169063c36c21259089908990600090611f0757634e487b7160e01b600052603260045260246000fd5b602090810291909101015160cc546040516001600160e01b031960e086901b168152611f419392916001600160a01b03169060040161339e565b600060405180830381600087803b158015611f5b57600080fd5b505af1158015611f6f573d6000803e3d6000fd5b50505050600085511115611fb15760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490611e74908890889087906004016133d3565b610fd2565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790611fee908a908a908a908a908a9060040161333f565b600060405180830381600087803b15801561200857600080fd5b505af115801561201c573d6000803e3d6000fd5b5050505050505050505050565b61093481612035611ab6565b61297e565b6120448282610fdb565b6109c15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff1916600117905561207d611ab6565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6120c9611ab6565b6001600160a01b03166120e46033546001600160a01b031690565b6001600160a01b0316146109d55760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016108bf565b610934600080516020613805833981519152826118ad565b61215c8282610fdb565b156109c15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612193611ab6565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6121df6109d7565b6122225760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b60448201526064016108bf565b6000805160206137e5833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa612262611ab6565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b80156122b4578291506122a08285610c9560018561361c565b9250806122ac81613728565b915050612287565b50915091565b600081516000141561230e5760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d505459000000000060448201526064016108bf565b82826040516020016123209190613286565b60405160208183030381529060405280519060200120604051602001612350929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610934600080516020613805833981519152826126d0565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6123e16109d7565b156123fe5760405162461bcd60e51b81526004016108bf906134ba565b6000805160206137e5833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612262611ab6565b600061244e6000836122ba565b600081815260cd602090815260409091208451929350612472929091850190612c81565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980836040516124a39190613472565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e799060240160206040518083038186803b1580156124ef57600080fd5b505afa158015612503573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612527919061307e565b6109c15760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c60906110e29084908690600401613571565b600054610100900460ff166125845760405162461bcd60e51b81526004016108bf90613526565b6109d561258f611ab6565b612387565b600054610100900460ff166125bb5760405162461bcd60e51b81526004016108bf90613526565b6109d560006125c8611ab6565b6126d0565b600054610100900460ff166112c55760405162461bcd60e51b81526004016108bf90613526565b600054610100900460ff1661261b5760405162461bcd60e51b81526004016108bf90613526565b6000805160206137e5833981519152805460ff19169055565b600081815260cd6020526040812080548291906126509061373f565b9050119050919050565b6126626120c1565b6001600160a01b0381166126c75760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016108bf565b61093481612387565b6109c1828261203a565b6040805180820190915260008082526020820152604051806040016040528083815260200184866020015161270f91906135e5565b9052949350505050565b600081516000141561272d57506000919050565b60208201805160f81c6030811080159061274b575060398160ff1611155b15801561276d575060618160ff161015801561276b5750607a8160ff1611155b155b1561277c575060009392505050565b835160018111156127ea5761279e8361279660018461361c565b015160f81c90565b915060308260ff16101580156127b8575060398260ff1611155b1580156127da575060618260ff16101580156127d85750607a8260ff1611155b155b156127ea57506000949350505050565b60015b6127f860018361361c565b811015612872578381015160f81c9250602d831480159061282e575060308360ff161015801561282c575060398360ff1611155b155b801561284f575060618360ff161015801561284d5750607a8360ff1611155b155b156128605750600095945050505050565b8061286a8161377a565b9150506127ed565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b03163314156128c0575060331936013560601c90565b503390565b6128ce81611235565b1561291b5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b454400000060448201526064016108bf565b610934816129e2565b60008061293b60008460018651610c95919061361c565b60ca549091506001600160a01b0316158015906129775750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6129888282610fdb565b6109c1576129a0816001600160a01b03166014612a66565b6129ab836020612a66565b6040516020016129bc9291906132ca565b60408051601f198184030181529082905262461bcd60e51b82526108bf91600401613472565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600190612a2190606001611270565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b60606000612a758360026135fd565b612a809060026135e5565b6001600160401b03811115612aa557634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015612acf576020820181803683370190505b509050600360fc1b81600081518110612af857634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612b3557634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000612b598460026135fd565b612b649060016135e5565b90505b6001811115612bf8576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612ba657634e487b7160e01b600052603260045260246000fd5b1a60f81b828281518110612bca57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c93612bf181613728565b9050612b67565b5083156129775760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016108bf565b508054612c539061373f565b6000825580601f10612c63575050565b601f0160209004906000526020600020908101906109349190612d05565b828054612c8d9061373f565b90600052602060002090601f016020900481019282612caf5760008555612cf5565b82601f10612cc857805160ff1916838001178555612cf5565b82800160010185558215612cf5579182015b82811115612cf5578251825591602001919060010190612cda565b50612d01929150612d05565b5090565b5b80821115612d015760008155600101612d06565b60008083601f840112612d2b578182fd5b5081356001600160401b03811115612d41578182fd5b6020830191508360208260051b8501011115612d5c57600080fd5b9250929050565b60008083601f840112612d74578182fd5b5081356001600160401b03811115612d8a578182fd5b602083019150836020828501011115612d5c57600080fd5b600060208284031215612db3578081fd5b8135612977816137c1565b600060208284031215612dcf578081fd5b8151612977816137c1565b60008060008060008060008060a0898b031215612df5578384fd5b8835612e00816137c1565b975060208901356001600160401b0380821115612e1b578586fd5b612e278c838d01612d1a565b909950975060408b0135915080821115612e3f578586fd5b612e4b8c838d01612d1a565b909750955060608b0135915080821115612e63578485fd5b50612e708b828c01612d1a565b9094509250506080890135612e84816137d6565b809150509295985092959890939650565b60008060008060608587031215612eaa578384fd5b8435612eb5816137c1565b93506020850135925060408501356001600160401b03811115612ed6578283fd5b612ee287828801612d63565b95989497509550505050565b60008060008060008060008060a0898b031215612f09578182fd5b8835612f14816137c1565b97506020890135965060408901356001600160401b0380821115612f36578384fd5b612f428c838d01612d63565b909850965060608b0135915080821115612f5a578384fd5b612f668c838d01612d1a565b909650945060808b0135915080821115612f7e578384fd5b50612f8b8b828c01612d1a565b999c989b5096995094979396929594505050565b60008060208385031215612fb1578182fd5b82356001600160401b03811115612fc6578283fd5b612fd285828601612d1a565b90969095509350505050565b60006020808385031215612ff0578182fd5b82356001600160401b03811115613005578283fd5b8301601f81018513613015578283fd5b8035613028613023826135c2565b613592565b80828252848201915084840188868560051b8701011115613047578687fd5b8694505b8385101561307257803561305e816137c1565b83526001949094019391850191850161304b565b50979650505050505050565b60006020828403121561308f578081fd5b8151612977816137d6565b6000602082840312156130ab578081fd5b5035919050565b600080604083850312156130c4578182fd5b8235915060208301356130d6816137c1565b809150509250929050565b6000602082840312156130f2578081fd5b81356001600160e01b031981168114612977578182fd5b60008060008060008060c08789031215613121578384fd5b863561312c816137c1565b9550602087013561313c816137c1565b9450604087013561314c816137c1565b9350606087013561315c816137c1565b9250608087013561316c816137c1565b915060a087013561317c816137c1565b809150509295509295509295565b6000806020838503121561319c578182fd5b82356001600160401b038111156131b1578283fd5b612fd285828601612d63565b6000806000604084860312156131d1578081fd5b8335925060208401356001600160401b038111156131ed578182fd5b6131f986828701612d63565b9497909650939450505050565b600081518084526020808501808196508360051b81019150828601855b8581101561324d57828403895261323b84835161325a565b98850198935090840190600101613223565b5091979650505050505050565b600081518084526132728160208601602086016136f8565b601f01601f19169290920160200192915050565b600082516132988184602087016136f8565b9190910192915050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516133028160178501602088016136f8565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516133338160288401602088016136f8565b01602801949350505050565b6001600160a01b038616815260a06020820181905260009061336390830187613206565b82810360408401526133758187613206565b905082810360608401526133898186613206565b91505082151560808301529695505050505050565b600060018060a01b038086168352606060208401526133c0606084018661325a565b9150808416604084015250949350505050565b6060815260006133e66060830186613206565b82810360208401526133f88186613206565b915050826040830152949350505050565b6020808252810182905260006001600160fb1b03831115613428578081fd5b8260051b808560408501379190910160400190815292915050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b602081526000612977602083018461325a565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b82815260406020820152600061358a604083018461325a565b949350505050565b604051601f8201601f191681016001600160401b03811182821017156135ba576135ba6137ab565b604052919050565b60006001600160401b038211156135db576135db6137ab565b5060051b60200190565b600082198211156135f8576135f8613795565b500190565b600081600019048311821515161561361757613617613795565b500290565b60008282101561362e5761362e613795565b500390565b6000613641613023846135c2565b808482526020808301925084368760051b8701111561365e578485fd5b845b878110156136ec5781356001600160401b038082111561367e578788fd5b90880190601f3681840112613691578889fd5b8235828111156136a3576136a36137ab565b6136b4818301601f19168801613592565b925080835236878286010111156136c957898afd5b808785018885013782018601899052508652509382019390820190600101613660565b50919695505050505050565b60005b838110156137135781810151838201526020016136fb565b83811115613722576000848401525b50505050565b60008161373757613737613795565b506000190190565b600181811c9082168061375357607f821691505b6020821081141561377457634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561378e5761378e613795565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461093457600080fd5b801515811461093457600080fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
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
