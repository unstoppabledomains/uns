"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MintingManager__factory = void 0;
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
                internalType: "string[][]",
                name: "domains",
                type: "string[][]",
            },
        ],
        name: "backfillReverseNames",
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
];
const _bytecode = "0x608060405234801561001057600080fd5b50613707806100206000396000f3fe60806040526004361061025c5760003560e01c8063906cecc111610144578063b9998a24116100b6578063d1f5692c1161007a578063d1f5692c1461074b578063d53913931461076b578063d547741f1461078d578063ec527389146107ad578063f2fde38b146107cd578063ffa1ad74146107ed57600080fd5b8063b9998a24146106ab578063c3a3bc00146106cb578063cc2a9a5b146106eb578063cc2c3fc41461070b578063ceeb4f501461072b57600080fd5b8063a217fddf11610108578063a217fddf146105c9578063a3f4df7e146105de578063a849d65c1461062b578063aa271e1a1461064b578063b0aa98c71461066b578063b3ab15fb1461068b57600080fd5b8063906cecc11461053457806391d1485414610554578063983b2d5614610574578063986502751461059457806399e0dd7c146105a957600080fd5b80635b6fa8db116101dd578063715018a6116101a1578063715018a61461049957806371e2a657146104ae57806377a2a589146104ce57806381c81d35146104ee5780638456cb59146105015780638da5cb5b1461051657600080fd5b80635b6fa8db146104115780635c975abb146104315780635cd7e3b3146104465780635fc1964f14610466578063634486da1461048657600080fd5b806336568abe1161022457806336568abe146103365780633f41b614146103565780633f4ba83a1461038e57806344d5f66c146103a3578063572b6c05146103c357600080fd5b806301ffc9a714610261578063248a9ca314610296578063268b15ed146102d45780632f2ff15d146102f65780633092afd514610316575b600080fd5b34801561026d57600080fd5b5061028161027c366004613048565b61081f565b60405190151581526020015b60405180910390f35b3480156102a257600080fd5b506102c66102b1366004613001565b60009081526097602052604090206001015490565b60405190815260200161028d565b3480156102e057600080fd5b506102f46102ef366004613124565b610856565b005b34801561030257600080fd5b506102f4610311366004613019565b6108f9565b34801561032257600080fd5b506102f4610331366004612c4b565b610923565b34801561034257600080fd5b506102f4610351366004613019565b610937565b34801561036257600080fd5b5060c954610376906001600160a01b031681565b6040516001600160a01b03909116815260200161028d565b34801561039a57600080fd5b506102f46109c5565b3480156103af57600080fd5b506102f46103be366004612f22565b6109d7565b3480156103cf57600080fd5b506102816103de366004612c4b565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561041d57600080fd5b5060cc54610376906001600160a01b031681565b34801561043d57600080fd5b50610281610a63565b34801561045257600080fd5b506102f4610461366004612c83565b610a79565b34801561047257600080fd5b506102f4610481366004612e87565b610dd3565b6102f4610494366004612c4b565b610e29565b3480156104a557600080fd5b506102f4610eec565b3480156104ba57600080fd5b506102f46104c9366004612e87565b610efe565b3480156104da57600080fd5b5060ce54610376906001600160a01b031681565b6102f46104fc366004612c4b565b610f54565b34801561050d57600080fd5b506102f4610fd1565b34801561052257600080fd5b506033546001600160a01b0316610376565b34801561054057600080fd5b506102f461054f366004612d3e565b610fe1565b34801561056057600080fd5b5061028161056f366004613019565b611067565b34801561058057600080fd5b506102f461058f366004612c4b565b611092565b3480156105a057600080fd5b506102f46110a3565b3480156105b557600080fd5b506102f46105c43660046130f1565b6110bd565b3480156105d557600080fd5b506102c6600081565b3480156105ea57600080fd5b5061061e604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b60405161028d9190613400565b34801561063757600080fd5b5060cb54610376906001600160a01b031681565b34801561065757600080fd5b50610281610666366004612c4b565b61119c565b34801561067757600080fd5b50610281610686366004613001565b6111b6565b34801561069757600080fd5b506102f46106a6366004612c4b565b611214565b3480156106b757600080fd5b506102f46106c6366004612c4b565b61123e565b3480156106d757600080fd5b506102f46106e63660046130f1565b611283565b3480156106f757600080fd5b506102f4610706366004613070565b6112ca565b34801561071757600080fd5b5060ca54610376906001600160a01b031681565b34801561073757600080fd5b506102f4610746366004612d97565b611638565b34801561075757600080fd5b506102f4610766366004612e48565b6116ce565b34801561077757600080fd5b506102c66000805160206136db83398151915281565b34801561079957600080fd5b506102f46107a8366004613019565b611793565b3480156107b957600080fd5b506102f46107c8366004613001565b6117b8565b3480156107d957600080fd5b506102f46107e8366004612c4b565b61182a565b3480156107f957600080fd5b5061061e60405180604001604052806006815260200165302e342e313160d01b81525081565b60006001600160e01b03198216637965db0b60e01b148061085057506301ffc9a760e01b6001600160e01b03198316145b92915050565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061089a9250849150839050611846565b6108a2610a63565b156108c85760405162461bcd60e51b81526004016108bf90613448565b60405180910390fd5b60606108f16108d561199c565b6108e8886108e389896119ab565b6119d7565b83846001611b04565b505050505050565b60008281526097602052604090206001015461091481611e00565b61091e8383611e11565b505050565b61092b611e98565b61093481611f11565b50565b61093f61199c565b6001600160a01b0316816001600160a01b0316146109b75760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016108bf565b6109c18282611f29565b5050565b6109cd611e98565b6109d5611fae565b565b6109e261066661199c565b6109fe5760405162461bcd60e51b81526004016108bf90613413565b60c9546040516311357d9b60e21b81526001600160a01b03909116906344d5f66c90610a2e90849060040161333a565b600060405180830381600087803b158015610a4857600080fd5b505af1158015610a5c573d6000803e3d6000fd5b5050505050565b6000805160206136bb8339815191525460ff1690565b610a8386886135c1565b805160021415610af557610a9861066661199c565b610af05760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b60648201526084016108bf565b610ca0565b6000610b0082612056565b60c9549092506001600160a01b0316905063430c2081610b1e61199c565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b158015610b6457600080fd5b505afa158015610b78573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b9c9190612fe5565b80610c3a575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c20819060440160206040518083038186803b158015610bf057600080fd5b505afa158015610c04573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c289190612fe5565b8015610c3a5750610c3a61066661199c565b610c9e5760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b60648201526084016108bf565b505b610caa87896135c1565b600281511015610d0a5760405162461bcd60e51b815260206004820152602560248201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456044820152642627abaf9960d91b60648201526084016108bf565b610d7a610d4c60008360018551610d2191906135aa565b81518110610d3f57634e487b7160e01b600052603260045260246000fd5b6020026020010151612091565b82600081518110610d6d57634e487b7160e01b600052603260045260246000fd5b6020026020010151611846565b610d82610a63565b15610d9f5760405162461bcd60e51b81526004016108bf90613448565b610dc78a610dad8a8c6135c1565b610db7898b6135c1565b610dc1888a6135c1565b87611b04565b50505050505050505050565b610ddb611e98565b60005b81518110156109c157610e17828281518110610e0a57634e487b7160e01b600052603260045260246000fd5b6020026020010151611f11565b80610e2181613650565b915050610dde565b610e3461066661199c565b610e505760405162461bcd60e51b81526004016108bf90613413565b6001600160a01b038116610ea65760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108bf565b610eaf81612146565b610eb76110a3565b6040516001600160a01b038216903480156108fc02916000818181858888f193505050501580156109c1573d6000803e3d6000fd5b610ef4611e98565b6109d5600061215e565b610f06611e98565b60005b81518110156109c157610f42828281518110610f3557634e487b7160e01b600052603260045260246000fd5b6020026020010151612146565b80610f4c81613650565b915050610f09565b610f5f61066661199c565b610f7b5760405162461bcd60e51b81526004016108bf90613413565b6001600160a01b038116610eaf5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108bf565b610fd9611e98565b6109d56121b0565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506110259250849150839050611846565b61102d610a63565b1561104a5760405162461bcd60e51b81526004016108bf90613448565b606061105e876108e8886108e389896119ab565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61109a611e98565b61093481612146565b6109d56000805160206136db83398151915261035161199c565b6110c5611e98565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906110f790859085906004016133d1565b600060405180830381600087803b15801561111157600080fd5b505af1158015611125573d6000803e3d6000fd5b505060cb546001600160a01b03161591506109c190505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061116e90859085906004016133d1565b600060405180830381600087803b15801561118857600080fd5b505af11580156108f1573d6000803e3d6000fd5b60006108506000805160206136db83398151915283611067565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260009061120a906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b61121c611e98565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b611246611e98565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b61128b611e98565b6109c182828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061221892505050565b600054610100900460ff16158080156112ea5750600054600160ff909116105b806113045750303b158015611304575060005460ff166001145b6113675760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016108bf565b6000805460ff19166001179055801561138a576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce80549091169185169190911790556113e8612334565b6113f061236b565b6113f9826123a4565b6114016123cb565b604080516101e08101825260066101a082018181526563727970746f60d01b6101c0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185529182526535b632bb32b960d11b8282015261016083019190915282518084019093526002835261686960f01b9083015261018081019190915260005b600d8110156115e8576115d68282600d81106115cc57634e487b7160e01b600052603260045260246000fd5b6020020151612218565b806115e081613650565b9150506115a0565b5050801561105e576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061167c9250849150839050611846565b611684610a63565b156116a15760405162461bcd60e51b81526004016108bf90613448565b610dc78a6116b38b6108e38c8c6119ab565b6116bd888a6135c1565b6116c787896135c1565b6001611b04565b6116d6611e98565b60005b8181101561091e5760c9546001600160a01b0316635096023984848481811061171257634e487b7160e01b600052603260045260246000fd5b90506020020160208101906117279190612c4b565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561176857600080fd5b505af115801561177c573d6000803e3d6000fd5b50505050808061178b90613650565b9150506116d9565b6000828152609760205260409020600101546117ae81611e00565b61091e8383611f29565b6117c0611e98565b6117c98161240b565b6117e55760405162461bcd60e51b81526004016108bf90613472565b600081815260cd602052604081206117fc91612a1e565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611832611e98565b61183b81612431565b6109346000826124a7565b61184f8261240b565b61186b5760405162461bcd60e51b81526004016108bf90613472565b600061189e8260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115611947576118c96118bd826000600a6124b1565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b814156119475760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b60648201526084016108bf565b611950826124f0565b61091e5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c494400000060448201526064016108bf565b60006119a6612655565b905090565b606082826040516020016119c0929190613209565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b60608152602001906001900390816119f15790505090508281600081518110611a2a57634e487b7160e01b600052603260045260246000fd5b602002602001018190525060cd60008581526020019081526020016000208054611a5390613615565b80601f0160208091040260200160405190810160405280929190818152602001828054611a7f90613615565b8015611acc5780601f10611aa157610100808354040283529160200191611acc565b820191906000526020600020905b815481529060010190602001808311611aaf57829003601f168201915b505050505081600181518110611af257634e487b7160e01b600052603260045260246000fd5b60209081029190910101529392505050565b6000611b0f85612056565b5060c954604051634f558e7960e01b8152600481018390529192506001600160a01b031690634f558e799060240160206040518083038186803b158015611b5557600080fd5b505afa158015611b69573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b8d9190612fe5565b8015611c1b575060c9546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e9060240160206040518083038186803b158015611bd857600080fd5b505afa158015611bec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c109190612c67565b6001600160a01b0316145b15611c8f5760c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690611c5890899089908990899089906004016132a6565b600060405180830381600087803b158015611c7257600080fd5b505af1158015611c86573d6000803e3d6000fd5b505050506108f1565b611c988161269c565b611ca1856126fb565b8015611cae575084516002145b15611d9a5760ca5485516001600160a01b039091169063c36c21259088908890600090611ceb57634e487b7160e01b600052603260045260246000fd5b602090810291909101015160cc546040516001600160e01b031960e086901b168152611d259392916001600160a01b031690600401613305565b600060405180830381600087803b158015611d3f57600080fd5b505af1158015611d53573d6000803e3d6000fd5b50505050600084511115611d955760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490611c589087908790869060040161339b565b6108f1565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790611dd290899089908990899089906004016132a6565b600060405180830381600087803b158015611dec57600080fd5b505af1158015610dc7573d6000803e3d6000fd5b61093481611e0c61199c565b612755565b611e1b8282611067565b6109c15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611e5461199c565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611ea061199c565b6001600160a01b0316611ebb6033546001600160a01b031690565b6001600160a01b0316146109d55760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016108bf565b6109346000805160206136db83398151915282611793565b611f338282611067565b156109c15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055611f6a61199c565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b611fb6610a63565b611ff95760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b60448201526064016108bf565b6000805160206136bb833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa61203961199c565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b801561208b578291506120778285610d216001856135aa565b925080612083816135fe565b91505061205e565b50915091565b60008151600014156120e55760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d505459000000000060448201526064016108bf565b82826040516020016120f791906131ed565b60405160208183030381529060405280519060200120604051602001612127929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b6109346000805160206136db833981519152826124a7565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6121b8610a63565b156121d55760405162461bcd60e51b81526004016108bf90613448565b6000805160206136bb833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861203961199c565b6000612225600083612091565b600081815260cd602090815260409091208451929350612249929091850190612a58565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf89808360405161227a9190613400565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e799060240160206040518083038186803b1580156122c657600080fd5b505afa1580156122da573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122fe9190612fe5565b6109c15760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c609061116e90849086906004016134ff565b600054610100900460ff1661235b5760405162461bcd60e51b81526004016108bf906134b4565b6109d561236661199c565b61215e565b600054610100900460ff166123925760405162461bcd60e51b81526004016108bf906134b4565b6109d5600061239f61199c565b6124a7565b600054610100900460ff166112465760405162461bcd60e51b81526004016108bf906134b4565b600054610100900460ff166123f25760405162461bcd60e51b81526004016108bf906134b4565b6000805160206136bb833981519152805460ff19169055565b600081815260cd60205260408120805482919061242790613615565b9050119050919050565b612439611e98565b6001600160a01b03811661249e5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016108bf565b6109348161215e565b6109c18282611e11565b604080518082019091526000808252602082015260405180604001604052808381526020018486602001516124e69190613573565b9052949350505050565b600081516000141561250457506000919050565b60208201805160f81c60308110801590612522575060398160ff1611155b158015612544575060618160ff16101580156125425750607a8160ff1611155b155b15612553575060009392505050565b835160018111156125c1576125758361256d6001846135aa565b015160f81c90565b915060308260ff161015801561258f575060398260ff1611155b1580156125b1575060618260ff16101580156125af5750607a8260ff1611155b155b156125c157506000949350505050565b60015b6125cf6001836135aa565b811015612649578381015160f81c9250602d8314801590612605575060308360ff1610158015612603575060398360ff1611155b155b8015612626575060618360ff16101580156126245750607a8360ff1611155b155b156126375750600095945050505050565b8061264181613650565b9150506125c4565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b0316331415612697575060331936013560601c90565b503390565b6126a5816111b6565b156126f25760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b454400000060448201526064016108bf565b610934816127b9565b60008061271260008460018651610d2191906135aa565b60ca549091506001600160a01b03161580159061274e5750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b61275f8282611067565b6109c157612777816001600160a01b0316601461283d565b61278283602061283d565b604051602001612793929190613231565b60408051601f198184030181529082905262461bcd60e51b82526108bf91600401613400565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526001906127f8906060016111f1565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b6060600061284c83600261358b565b612857906002613573565b6001600160401b0381111561287c57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156128a6576020820181803683370190505b509050600360fc1b816000815181106128cf57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061290c57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600061293084600261358b565b61293b906001613573565b90505b60018111156129cf576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061297d57634e487b7160e01b600052603260045260246000fd5b1a60f81b8282815181106129a157634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c936129c8816135fe565b905061293e565b50831561274e5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016108bf565b508054612a2a90613615565b6000825580601f10612a3a575050565b601f0160209004906000526020600020908101906109349190612adc565b828054612a6490613615565b90600052602060002090601f016020900481019282612a865760008555612acc565b82601f10612a9f57805160ff1916838001178555612acc565b82800160010185558215612acc579182015b82811115612acc578251825591602001919060010190612ab1565b50612ad8929150612adc565b5090565b5b80821115612ad85760008155600101612add565b6000612b04612aff84613550565b613520565b9050808382526020808301915083868660051b86011115612b2457600080fd5b60005b86811015612bb85781356001600160401b0380821115612b4657600080fd5b8188019150601f8a81840112612b5b57600080fd5b823582811115612b6d57612b6d613681565b612b7e818301601f19168801613520565b92508083528b87828601011115612b9457600080fd5b80878501888501376000908301870152508552509282019290820190600101612b27565b505050509392505050565b60008083601f840112612bd4578182fd5b5081356001600160401b03811115612bea578182fd5b6020830191508360208260051b8501011115612c0557600080fd5b9250929050565b60008083601f840112612c1d578182fd5b5081356001600160401b03811115612c33578182fd5b602083019150836020828501011115612c0557600080fd5b600060208284031215612c5c578081fd5b813561274e81613697565b600060208284031215612c78578081fd5b815161274e81613697565b60008060008060008060008060a0898b031215612c9e578384fd5b8835612ca981613697565b975060208901356001600160401b0380821115612cc4578586fd5b612cd08c838d01612bc3565b909950975060408b0135915080821115612ce8578586fd5b612cf48c838d01612bc3565b909750955060608b0135915080821115612d0c578485fd5b50612d198b828c01612bc3565b9094509250506080890135612d2d816136ac565b809150509295985092959890939650565b60008060008060608587031215612d53578182fd5b8435612d5e81613697565b93506020850135925060408501356001600160401b03811115612d7f578283fd5b612d8b87828801612c0c565b95989497509550505050565b60008060008060008060008060a0898b031215612db2578182fd5b8835612dbd81613697565b97506020890135965060408901356001600160401b0380821115612ddf578384fd5b612deb8c838d01612c0c565b909850965060608b0135915080821115612e03578384fd5b612e0f8c838d01612bc3565b909650945060808b0135915080821115612e27578384fd5b50612e348b828c01612bc3565b999c989b5096995094979396929594505050565b60008060208385031215612e5a578182fd5b82356001600160401b03811115612e6f578283fd5b612e7b85828601612bc3565b90969095509350505050565b60006020808385031215612e99578182fd5b82356001600160401b03811115612eae578283fd5b8301601f81018513612ebe578283fd5b8035612ecc612aff82613550565b80828252848201915084840188868560051b8701011115612eeb578687fd5b8694505b83851015612f16578035612f0281613697565b835260019490940193918501918501612eef565b50979650505050505050565b60006020808385031215612f34578182fd5b82356001600160401b0380821115612f4a578384fd5b818501915085601f830112612f5d578384fd5b8135612f6b612aff82613550565b80828252858201915085850189878560051b8801011115612f8a578788fd5b875b84811015612fd657813586811115612fa257898afd5b8701603f81018c13612fb257898afd5b612fc38c8a83013560408401612af1565b8552509287019290870190600101612f8c565b50909998505050505050505050565b600060208284031215612ff6578081fd5b815161274e816136ac565b600060208284031215613012578081fd5b5035919050565b6000806040838503121561302b578182fd5b82359150602083013561303d81613697565b809150509250929050565b600060208284031215613059578081fd5b81356001600160e01b03198116811461274e578182fd5b60008060008060008060c08789031215613088578384fd5b863561309381613697565b955060208701356130a381613697565b945060408701356130b381613697565b935060608701356130c381613697565b925060808701356130d381613697565b915060a08701356130e381613697565b809150509295509295509295565b60008060208385031215613103578182fd5b82356001600160401b03811115613118578283fd5b612e7b85828601612c0c565b600080600060408486031215613138578081fd5b8335925060208401356001600160401b03811115613154578182fd5b61316086828701612c0c565b9497909650939450505050565b600081518084526020808501808196508360051b81019150828601855b858110156131b45782840389526131a28483516131c1565b9885019893509084019060010161318a565b5091979650505050505050565b600081518084526131d98160208601602086016135ce565b601f01601f19169290920160200192915050565b600082516131ff8184602087016135ce565b9190910192915050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516132698160178501602088016135ce565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161329a8160288401602088016135ce565b01602801949350505050565b6001600160a01b038616815260a0602082018190526000906132ca9083018761316d565b82810360408401526132dc818761316d565b905082810360608401526132f0818661316d565b91505082151560808301529695505050505050565b600060018060a01b0380861683526060602084015261332760608401866131c1565b9150808416604084015250949350505050565b6000602080830181845280855180835260408601915060408160051b8701019250838701855b8281101561338e57603f1988860301845261337c85835161316d565b94509285019290850190600101613360565b5092979650505050505050565b6060815260006133ae606083018661316d565b82810360208401526133c0818661316d565b915050826040830152949350505050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b60208152600061274e60208301846131c1565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b82815260406020820152600061351860408301846131c1565b949350505050565b604051601f8201601f191681016001600160401b038111828210171561354857613548613681565b604052919050565b60006001600160401b0382111561356957613569613681565b5060051b60200190565b600082198211156135865761358661366b565b500190565b60008160001904831182151516156135a5576135a561366b565b500290565b6000828210156135bc576135bc61366b565b500390565b600061274e368484612af1565b60005b838110156135e95781810151838201526020016135d1565b838111156135f8576000848401525b50505050565b60008161360d5761360d61366b565b506000190190565b600181811c9082168061362957607f821691505b6020821081141561364a57634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156136645761366461366b565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461093457600080fd5b801515811461093457600080fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
const isSuperArgs = (xs) => xs.length > 1;
class MintingManager__factory extends ethers_1.ContractFactory {
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
exports.MintingManager__factory = MintingManager__factory;
MintingManager__factory.bytecode = _bytecode;
MintingManager__factory.abi = _abi;
