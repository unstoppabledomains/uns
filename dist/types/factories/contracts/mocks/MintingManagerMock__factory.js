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
const _bytecode = "0x608060405234801561001057600080fd5b506137b1806100206000396000f3fe60806040526004361061025c5760003560e01c806391d1485411610144578063b9998a24116100b6578063d1f5692c1161007a578063d1f5692c1461074b578063d53913931461076b578063d547741f1461078d578063ec527389146107ad578063f2fde38b146107cd578063ffa1ad74146107ed57600080fd5b8063b9998a24146106ab578063c3a3bc00146106cb578063cc2a9a5b146106eb578063cc2c3fc41461070b578063ceeb4f501461072b57600080fd5b8063a3f4df7e11610108578063a3f4df7e146105be578063a849d65c1461060b578063aa271e1a1461062b578063ae31844a1461064b578063b0aa98c71461066b578063b3ab15fb1461068b57600080fd5b806391d1485414610534578063983b2d5614610554578063986502751461057457806399e0dd7c14610589578063a217fddf146105a957600080fd5b80635c975abb116101dd57806371e2a657116101a157806371e2a6571461048e57806377a2a589146104ae57806381c81d35146104ce5780638456cb59146104e15780638da5cb5b146104f6578063906cecc11461051457600080fd5b80635c975abb146104115780635cd7e3b3146104265780635fc1964f14610446578063634486da14610466578063715018a61461047957600080fd5b806336568abe1161022457806336568abe146103365780633f41b614146103565780633f4ba83a1461038e578063572b6c05146103a35780635b6fa8db146103f157600080fd5b806301ffc9a714610261578063248a9ca314610296578063268b15ed146102d45780632f2ff15d146102f65780633092afd514610316575b600080fd5b34801561026d57600080fd5b5061028161027c366004613061565b61081f565b60405190151581526020015b60405180910390f35b3480156102a257600080fd5b506102c66102b136600461301a565b60009081526097602052604090206001015490565b60405190815260200161028d565b3480156102e057600080fd5b506102f46102ef36600461313d565b610856565b005b34801561030257600080fd5b506102f4610311366004613032565b6108f9565b34801561032257600080fd5b506102f4610331366004612d22565b610923565b34801561034257600080fd5b506102f4610351366004613032565b610937565b34801561036257600080fd5b5060c954610376906001600160a01b031681565b6040516001600160a01b03909116815260200161028d565b34801561039a57600080fd5b506102f46109c5565b3480156103af57600080fd5b506102816103be366004612d22565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b3480156103fd57600080fd5b5060cc54610376906001600160a01b031681565b34801561041d57600080fd5b506102816109d7565b34801561043257600080fd5b506102f4610441366004612d5a565b6109ed565b34801561045257600080fd5b506102f4610461366004612f5e565b610d47565b6102f4610474366004612d22565b610d9d565b34801561048557600080fd5b506102f4610e60565b34801561049a57600080fd5b506102f46104a9366004612f5e565b610e72565b3480156104ba57600080fd5b5060ce54610376906001600160a01b031681565b6102f46104dc366004612d22565b610ec8565b3480156104ed57600080fd5b506102f4610f45565b34801561050257600080fd5b506033546001600160a01b0316610376565b34801561052057600080fd5b506102f461052f366004612e15565b610f55565b34801561054057600080fd5b5061028161054f366004613032565b610fdb565b34801561056057600080fd5b506102f461056f366004612d22565b611006565b34801561058057600080fd5b506102f4611017565b34801561059557600080fd5b506102f46105a436600461310a565b611031565b3480156105b557600080fd5b506102c6600081565b3480156105ca57600080fd5b506105fe604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b60405161028d91906133f2565b34801561061757600080fd5b5060cb54610376906001600160a01b031681565b34801561063757600080fd5b50610281610646366004612d22565b611110565b34801561065757600080fd5b506102f4610666366004612f1f565b61112a565b34801561067757600080fd5b5061028161068636600461301a565b611235565b34801561069757600080fd5b506102f46106a6366004612d22565b611293565b3480156106b757600080fd5b506102f46106c6366004612d22565b6112bd565b3480156106d757600080fd5b506102f46106e636600461310a565b611302565b3480156106f757600080fd5b506102f4610706366004613089565b611349565b34801561071757600080fd5b5060ca54610376906001600160a01b031681565b34801561073757600080fd5b506102f4610746366004612e6e565b6116d2565b34801561075757600080fd5b506102f4610766366004612f1f565b611768565b34801561077757600080fd5b506102c660008051602061378583398151915281565b34801561079957600080fd5b506102f46107a8366004613032565b61182d565b3480156107b957600080fd5b506102f46107c836600461301a565b611852565b3480156107d957600080fd5b506102f46107e8366004612d22565b6118c4565b3480156107f957600080fd5b506105fe60405180604001604052806006815260200165302e342e313360d01b81525081565b60006001600160e01b03198216637965db0b60e01b148061085057506301ffc9a760e01b6001600160e01b03198316145b92915050565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061089a92508491508390506118e0565b6108a26109d7565b156108c85760405162461bcd60e51b81526004016108bf9061343a565b60405180910390fd5b60606108f16108d5611a36565b6108e8886108e38989611a45565b611a71565b83846001611b9e565b505050505050565b60008281526097602052604090206001015461091481611fa9565b61091e8383611fba565b505050565b61092b612041565b610934816120ba565b50565b61093f611a36565b6001600160a01b0316816001600160a01b0316146109b75760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016108bf565b6109c182826120d2565b5050565b6109cd612041565b6109d5612157565b565b6000805160206137658339815191525460ff1690565b6109f786886135b3565b805160021415610a6957610a0c610646611a36565b610a645760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b60648201526084016108bf565b610c14565b6000610a74826121ff565b60c9549092506001600160a01b0316905063430c2081610a92611a36565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b158015610ad857600080fd5b505afa158015610aec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b109190612ffe565b80610bae575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c20819060440160206040518083038186803b158015610b6457600080fd5b505afa158015610b78573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b9c9190612ffe565b8015610bae5750610bae610646611a36565b610c125760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b60648201526084016108bf565b505b610c1e87896135b3565b600281511015610c7e5760405162461bcd60e51b815260206004820152602560248201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456044820152642627abaf9960d91b60648201526084016108bf565b610cee610cc060008360018551610c95919061359c565b81518110610cb357634e487b7160e01b600052603260045260246000fd5b602002602001015161223a565b82600081518110610ce157634e487b7160e01b600052603260045260246000fd5b60200260200101516118e0565b610cf66109d7565b15610d135760405162461bcd60e51b81526004016108bf9061343a565b610d3b8a610d218a8c6135b3565b610d2b898b6135b3565b610d35888a6135b3565b87611b9e565b50505050505050505050565b610d4f612041565b60005b81518110156109c157610d8b828281518110610d7e57634e487b7160e01b600052603260045260246000fd5b60200260200101516120ba565b80610d95816136fa565b915050610d52565b610da8610646611a36565b610dc45760405162461bcd60e51b81526004016108bf90613405565b6001600160a01b038116610e1a5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108bf565b610e23816122ef565b610e2b611017565b6040516001600160a01b038216903480156108fc02916000818181858888f193505050501580156109c1573d6000803e3d6000fd5b610e68612041565b6109d56000612307565b610e7a612041565b60005b81518110156109c157610eb6828281518110610ea957634e487b7160e01b600052603260045260246000fd5b60200260200101516122ef565b80610ec0816136fa565b915050610e7d565b610ed3610646611a36565b610eef5760405162461bcd60e51b81526004016108bf90613405565b6001600160a01b038116610e235760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108bf565b610f4d612041565b6109d5612359565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610f9992508491508390506118e0565b610fa16109d7565b15610fbe5760405162461bcd60e51b81526004016108bf9061343a565b6060610fd2876108e8886108e38989611a45565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61100e612041565b610934816122ef565b6109d5600080516020613785833981519152610351611a36565b611039612041565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061106b90859085906004016133c3565b600060405180830381600087803b15801561108557600080fd5b505af1158015611099573d6000803e3d6000fd5b505060cb546001600160a01b03161591506109c190505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906110e290859085906004016133c3565b600060405180830381600087803b1580156110fc57600080fd5b505af11580156108f1573d6000803e3d6000fd5b600061085060008051602061378583398151915283610fdb565b611135610646611a36565b6111515760405162461bcd60e51b81526004016108bf90613405565b60c9546040516000916001600160a01b0316906111749085908590602401613389565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b179052516111a99190613206565b6000604051808303816000865af19150503d80600081146111e6576040519150601f19603f3d011682016040523d82523d6000602084013e6111eb565b606091505b505090508061091e5760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b60448201526064016108bf565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611289906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b61129b612041565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b6112c5612041565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b61130a612041565b6109c182828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506123c192505050565b600054610100900460ff16158080156113695750600054600160ff909116105b806113835750303b158015611383575060005460ff166001145b6113e65760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016108bf565b6000805460ff191660011790558015611409576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce80549091169185169190911790556114676124dd565b61146f612514565b6114788261254d565b611480612574565b604080516102008101825260066101c082018181526563727970746f60d01b6101e0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b81830152610160840152835180850185526002815261686960f01b818301526101808401528351808501909452908352656b726573757360d01b908301526101a081019190915260005b600e811015611682576116708282600e811061166657634e487b7160e01b600052603260045260246000fd5b60200201516123c1565b8061167a816136fa565b91505061163a565b50508015610fd2576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061171692508491508390506118e0565b61171e6109d7565b1561173b5760405162461bcd60e51b81526004016108bf9061343a565b610d3b8a61174d8b6108e38c8c611a45565b611757888a6135b3565b61176187896135b3565b6001611b9e565b611770612041565b60005b8181101561091e5760c9546001600160a01b031663509602398484848181106117ac57634e487b7160e01b600052603260045260246000fd5b90506020020160208101906117c19190612d22565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561180257600080fd5b505af1158015611816573d6000803e3d6000fd5b505050508080611825906136fa565b915050611773565b60008281526097602052604090206001015461184881611fa9565b61091e83836120d2565b61185a612041565b611863816125b4565b61187f5760405162461bcd60e51b81526004016108bf90613464565b600081815260cd6020526040812061189691612bc7565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b6118cc612041565b6118d5816125da565b610934600082612650565b6118e9826125b4565b6119055760405162461bcd60e51b81526004016108bf90613464565b60006119388260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a816000015111156119e157611963611957826000600a61265a565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b814156119e15760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b60648201526084016108bf565b6119ea82612699565b61091e5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c494400000060448201526064016108bf565b6000611a406127fe565b905090565b60608282604051602001611a5a929190613222565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611a8b5790505090508281600081518110611ac457634e487b7160e01b600052603260045260246000fd5b602002602001018190525060cd60008581526020019081526020016000208054611aed906136bf565b80601f0160208091040260200160405190810160405280929190818152602001828054611b19906136bf565b8015611b665780601f10611b3b57610100808354040283529160200191611b66565b820191906000526020600020905b815481529060010190602001808311611b4957829003601f168201915b505050505081600181518110611b8c57634e487b7160e01b600052603260045260246000fd5b60209081029190910101529392505050565b600080611baa866121ff565b91509150828015611bbc575060028651115b8015611c4d575060c9546040516331a9108f60e11b8152600481018390526001600160a01b03898116921690636352211e9060240160206040518083038186803b158015611c0957600080fd5b505afa158015611c1d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c419190612d3e565b6001600160a01b031614155b15611cad5760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b60648201526084016108bf565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e799060240160206040518083038186803b158015611cf157600080fd5b505afa158015611d05573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d299190612ffe565b8015611db7575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e9060240160206040518083038186803b158015611d7457600080fd5b505afa158015611d88573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611dac9190612d3e565b6001600160a01b0316145b15611e2b5760c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690611df4908a908a908a908a908a906004016132bf565b600060405180830381600087803b158015611e0e57600080fd5b505af1158015611e22573d6000803e3d6000fd5b50505050610fd2565b611e3482612845565b611e3d866128a4565b8015611e4a575085516002145b15611f365760ca5486516001600160a01b039091169063c36c21259089908990600090611e8757634e487b7160e01b600052603260045260246000fd5b602090810291909101015160cc546040516001600160e01b031960e086901b168152611ec19392916001600160a01b03169060040161331e565b600060405180830381600087803b158015611edb57600080fd5b505af1158015611eef573d6000803e3d6000fd5b50505050600085511115611f315760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490611df490889088908790600401613353565b610fd2565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790611f6e908a908a908a908a908a906004016132bf565b600060405180830381600087803b158015611f8857600080fd5b505af1158015611f9c573d6000803e3d6000fd5b5050505050505050505050565b61093481611fb5611a36565b6128fe565b611fc48282610fdb565b6109c15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611ffd611a36565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612049611a36565b6001600160a01b03166120646033546001600160a01b031690565b6001600160a01b0316146109d55760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016108bf565b6109346000805160206137858339815191528261182d565b6120dc8282610fdb565b156109c15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612113611a36565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b61215f6109d7565b6121a25760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b60448201526064016108bf565b600080516020613765833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6121e2611a36565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b8015612234578291506122208285610c9560018561359c565b92508061222c816136a8565b915050612207565b50915091565b600081516000141561228e5760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d505459000000000060448201526064016108bf565b82826040516020016122a09190613206565b604051602081830303815290604052805190602001206040516020016122d0929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b61093460008051602061378583398151915282612650565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6123616109d7565b1561237e5760405162461bcd60e51b81526004016108bf9061343a565b600080516020613765833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586121e2611a36565b60006123ce60008361223a565b600081815260cd6020908152604090912084519293506123f2929091850190612c01565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf89808360405161242391906133f2565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e799060240160206040518083038186803b15801561246f57600080fd5b505afa158015612483573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124a79190612ffe565b6109c15760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c60906110e290849086906004016134f1565b600054610100900460ff166125045760405162461bcd60e51b81526004016108bf906134a6565b6109d561250f611a36565b612307565b600054610100900460ff1661253b5760405162461bcd60e51b81526004016108bf906134a6565b6109d56000612548611a36565b612650565b600054610100900460ff166112c55760405162461bcd60e51b81526004016108bf906134a6565b600054610100900460ff1661259b5760405162461bcd60e51b81526004016108bf906134a6565b600080516020613765833981519152805460ff19169055565b600081815260cd6020526040812080548291906125d0906136bf565b9050119050919050565b6125e2612041565b6001600160a01b0381166126475760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016108bf565b61093481612307565b6109c18282611fba565b6040805180820190915260008082526020820152604051806040016040528083815260200184866020015161268f9190613565565b9052949350505050565b60008151600014156126ad57506000919050565b60208201805160f81c603081108015906126cb575060398160ff1611155b1580156126ed575060618160ff16101580156126eb5750607a8160ff1611155b155b156126fc575060009392505050565b8351600181111561276a5761271e8361271660018461359c565b015160f81c90565b915060308260ff1610158015612738575060398260ff1611155b15801561275a575060618260ff16101580156127585750607a8260ff1611155b155b1561276a57506000949350505050565b60015b61277860018361359c565b8110156127f2578381015160f81c9250602d83148015906127ae575060308360ff16101580156127ac575060398360ff1611155b155b80156127cf575060618360ff16101580156127cd5750607a8360ff1611155b155b156127e05750600095945050505050565b806127ea816136fa565b91505061276d565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b0316331415612840575060331936013560601c90565b503390565b61284e81611235565b1561289b5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b454400000060448201526064016108bf565b61093481612962565b6000806128bb60008460018651610c95919061359c565b60ca549091506001600160a01b0316158015906128f75750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6129088282610fdb565b6109c157612920816001600160a01b031660146129e6565b61292b8360206129e6565b60405160200161293c92919061324a565b60408051601f198184030181529082905262461bcd60e51b82526108bf916004016133f2565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526001906129a190606001611270565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b606060006129f583600261357d565b612a00906002613565565b6001600160401b03811115612a2557634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015612a4f576020820181803683370190505b509050600360fc1b81600081518110612a7857634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612ab557634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000612ad984600261357d565b612ae4906001613565565b90505b6001811115612b78576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612b2657634e487b7160e01b600052603260045260246000fd5b1a60f81b828281518110612b4a57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c93612b71816136a8565b9050612ae7565b5083156128f75760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016108bf565b508054612bd3906136bf565b6000825580601f10612be3575050565b601f0160209004906000526020600020908101906109349190612c85565b828054612c0d906136bf565b90600052602060002090601f016020900481019282612c2f5760008555612c75565b82601f10612c4857805160ff1916838001178555612c75565b82800160010185558215612c75579182015b82811115612c75578251825591602001919060010190612c5a565b50612c81929150612c85565b5090565b5b80821115612c815760008155600101612c86565b60008083601f840112612cab578182fd5b5081356001600160401b03811115612cc1578182fd5b6020830191508360208260051b8501011115612cdc57600080fd5b9250929050565b60008083601f840112612cf4578182fd5b5081356001600160401b03811115612d0a578182fd5b602083019150836020828501011115612cdc57600080fd5b600060208284031215612d33578081fd5b81356128f781613741565b600060208284031215612d4f578081fd5b81516128f781613741565b60008060008060008060008060a0898b031215612d75578384fd5b8835612d8081613741565b975060208901356001600160401b0380821115612d9b578586fd5b612da78c838d01612c9a565b909950975060408b0135915080821115612dbf578586fd5b612dcb8c838d01612c9a565b909750955060608b0135915080821115612de3578485fd5b50612df08b828c01612c9a565b9094509250506080890135612e0481613756565b809150509295985092959890939650565b60008060008060608587031215612e2a578384fd5b8435612e3581613741565b93506020850135925060408501356001600160401b03811115612e56578283fd5b612e6287828801612ce3565b95989497509550505050565b60008060008060008060008060a0898b031215612e89578182fd5b8835612e9481613741565b97506020890135965060408901356001600160401b0380821115612eb6578384fd5b612ec28c838d01612ce3565b909850965060608b0135915080821115612eda578384fd5b612ee68c838d01612c9a565b909650945060808b0135915080821115612efe578384fd5b50612f0b8b828c01612c9a565b999c989b5096995094979396929594505050565b60008060208385031215612f31578182fd5b82356001600160401b03811115612f46578283fd5b612f5285828601612c9a565b90969095509350505050565b60006020808385031215612f70578182fd5b82356001600160401b03811115612f85578283fd5b8301601f81018513612f95578283fd5b8035612fa8612fa382613542565b613512565b80828252848201915084840188868560051b8701011115612fc7578687fd5b8694505b83851015612ff2578035612fde81613741565b835260019490940193918501918501612fcb565b50979650505050505050565b60006020828403121561300f578081fd5b81516128f781613756565b60006020828403121561302b578081fd5b5035919050565b60008060408385031215613044578182fd5b82359150602083013561305681613741565b809150509250929050565b600060208284031215613072578081fd5b81356001600160e01b0319811681146128f7578182fd5b60008060008060008060c087890312156130a1578384fd5b86356130ac81613741565b955060208701356130bc81613741565b945060408701356130cc81613741565b935060608701356130dc81613741565b925060808701356130ec81613741565b915060a08701356130fc81613741565b809150509295509295509295565b6000806020838503121561311c578182fd5b82356001600160401b03811115613131578283fd5b612f5285828601612ce3565b600080600060408486031215613151578081fd5b8335925060208401356001600160401b0381111561316d578182fd5b61317986828701612ce3565b9497909650939450505050565b600081518084526020808501808196508360051b81019150828601855b858110156131cd5782840389526131bb8483516131da565b988501989350908401906001016131a3565b5091979650505050505050565b600081518084526131f2816020860160208601613678565b601f01601f19169290920160200192915050565b60008251613218818460208701613678565b9190910192915050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351613282816017850160208801613678565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516132b3816028840160208801613678565b01602801949350505050565b6001600160a01b038616815260a0602082018190526000906132e390830187613186565b82810360408401526132f58187613186565b905082810360608401526133098186613186565b91505082151560808301529695505050505050565b600060018060a01b0380861683526060602084015261334060608401866131da565b9150808416604084015250949350505050565b6060815260006133666060830186613186565b82810360208401526133788186613186565b915050826040830152949350505050565b6020808252810182905260006001600160fb1b038311156133a8578081fd5b8260051b808560408501379190910160400190815292915050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b6020815260006128f760208301846131da565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b82815260406020820152600061350a60408301846131da565b949350505050565b604051601f8201601f191681016001600160401b038111828210171561353a5761353a61372b565b604052919050565b60006001600160401b0382111561355b5761355b61372b565b5060051b60200190565b6000821982111561357857613578613715565b500190565b600081600019048311821515161561359757613597613715565b500290565b6000828210156135ae576135ae613715565b500390565b60006135c1612fa384613542565b808482526020808301925084368760051b870111156135de578485fd5b845b8781101561366c5781356001600160401b03808211156135fe578788fd5b90880190601f3681840112613611578889fd5b8235828111156136235761362361372b565b613634818301601f19168801613512565b9250808352368782860101111561364957898afd5b8087850188850137820186018990525086525093820193908201906001016135e0565b50919695505050505050565b60005b8381101561369357818101518382015260200161367b565b838111156136a2576000848401525b50505050565b6000816136b7576136b7613715565b506000190190565b600181811c908216806136d357607f821691505b602082108114156136f457634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561370e5761370e613715565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461093457600080fd5b801515811461093457600080fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
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
