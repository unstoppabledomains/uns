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
const _bytecode = "0x608060405234801561001057600080fd5b50613874806100206000396000f3fe6080604052600436106102675760003560e01c806391d1485411610144578063b9998a24116100b6578063d1f5692c1161007a578063d1f5692c14610776578063d539139314610796578063d547741f146107b8578063ec527389146107d8578063f2fde38b146107f8578063ffa1ad741461081857600080fd5b8063b9998a24146106d6578063c3a3bc00146106f6578063cc2a9a5b14610716578063cc2c3fc414610736578063ceeb4f501461075657600080fd5b8063a3f4df7e11610108578063a3f4df7e146105e9578063a849d65c14610636578063aa271e1a14610656578063ae31844a14610676578063b0aa98c714610696578063b3ab15fb146106b657600080fd5b806391d148541461055f578063983b2d561461057f578063986502751461059f57806399e0dd7c146105b4578063a217fddf146105d457600080fd5b80635c975abb116101dd57806371e2a657116101a157806371e2a657146104b957806377a2a589146104d957806381c81d35146104f95780638456cb591461050c5780638da5cb5b14610521578063906cecc11461053f57600080fd5b80635c975abb1461043c5780635cd7e3b3146104515780635fc1964f14610471578063634486da14610491578063715018a6146104a457600080fd5b806336568abe1161022f57806336568abe146103415780633f41b614146103615780633f4ba83a1461039957806344d5f66c146103ae578063572b6c05146103ce5780635b6fa8db1461041c57600080fd5b806301ffc9a71461026c578063248a9ca3146102a1578063268b15ed146102df5780632f2ff15d146103015780633092afd514610321575b600080fd5b34801561027857600080fd5b5061028c61028736600461317e565b61084a565b60405190151581526020015b60405180910390f35b3480156102ad57600080fd5b506102d16102bc366004613137565b60009081526097602052604090206001015490565b604051908152602001610298565b3480156102eb57600080fd5b506102ff6102fa36600461325a565b610881565b005b34801561030d57600080fd5b506102ff61031c36600461314f565b610924565b34801561032d57600080fd5b506102ff61033c366004612d81565b61094e565b34801561034d57600080fd5b506102ff61035c36600461314f565b610962565b34801561036d57600080fd5b5060c954610381906001600160a01b031681565b6040516001600160a01b039091168152602001610298565b3480156103a557600080fd5b506102ff6109f0565b3480156103ba57600080fd5b506102ff6103c9366004613058565b610a02565b3480156103da57600080fd5b5061028c6103e9366004612d81565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561042857600080fd5b5060cc54610381906001600160a01b031681565b34801561044857600080fd5b5061028c610a8e565b34801561045d57600080fd5b506102ff61046c366004612db9565b610aa4565b34801561047d57600080fd5b506102ff61048c366004612fbd565b610dfe565b6102ff61049f366004612d81565b610e54565b3480156104b057600080fd5b506102ff610f17565b3480156104c557600080fd5b506102ff6104d4366004612fbd565b610f29565b3480156104e557600080fd5b5060ce54610381906001600160a01b031681565b6102ff610507366004612d81565b610f7f565b34801561051857600080fd5b506102ff610ffc565b34801561052d57600080fd5b506033546001600160a01b0316610381565b34801561054b57600080fd5b506102ff61055a366004612e74565b61100c565b34801561056b57600080fd5b5061028c61057a36600461314f565b611092565b34801561058b57600080fd5b506102ff61059a366004612d81565b6110bd565b3480156105ab57600080fd5b506102ff6110ce565b3480156105c057600080fd5b506102ff6105cf366004613227565b6110e8565b3480156105e057600080fd5b506102d1600081565b3480156105f557600080fd5b50610629604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b604051610298919061356d565b34801561064257600080fd5b5060cb54610381906001600160a01b031681565b34801561066257600080fd5b5061028c610671366004612d81565b6111c7565b34801561068257600080fd5b506102ff610691366004612f7e565b6111e1565b3480156106a257600080fd5b5061028c6106b1366004613137565b6112ec565b3480156106c257600080fd5b506102ff6106d1366004612d81565b61134a565b3480156106e257600080fd5b506102ff6106f1366004612d81565b611374565b34801561070257600080fd5b506102ff610711366004613227565b6113b9565b34801561072257600080fd5b506102ff6107313660046131a6565b611400565b34801561074257600080fd5b5060ca54610381906001600160a01b031681565b34801561076257600080fd5b506102ff610771366004612ecd565b61176e565b34801561078257600080fd5b506102ff610791366004612f7e565b611804565b3480156107a257600080fd5b506102d160008051602061384883398151915281565b3480156107c457600080fd5b506102ff6107d336600461314f565b6118c9565b3480156107e457600080fd5b506102ff6107f3366004613137565b6118ee565b34801561080457600080fd5b506102ff610813366004612d81565b611960565b34801561082457600080fd5b5061062960405180604001604052806006815260200165302e342e313160d01b81525081565b60006001600160e01b03198216637965db0b60e01b148061087b57506301ffc9a760e01b6001600160e01b03198316145b92915050565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506108c5925084915083905061197c565b6108cd610a8e565b156108f35760405162461bcd60e51b81526004016108ea906135b5565b60405180910390fd5b606061091c610900611ad2565b6109138861090e8989611ae1565b611b0d565b83846001611c3a565b505050505050565b60008281526097602052604090206001015461093f81611f36565b6109498383611f47565b505050565b610956611fce565b61095f81612047565b50565b61096a611ad2565b6001600160a01b0316816001600160a01b0316146109e25760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016108ea565b6109ec828261205f565b5050565b6109f8611fce565b610a006120e4565b565b610a0d610671611ad2565b610a295760405162461bcd60e51b81526004016108ea90613580565b60c9546040516311357d9b60e21b81526001600160a01b03909116906344d5f66c90610a5990849060040161346d565b600060405180830381600087803b158015610a7357600080fd5b505af1158015610a87573d6000803e3d6000fd5b5050505050565b6000805160206138288339815191525460ff1690565b610aae868861372e565b805160021415610b2057610ac3610671611ad2565b610b1b5760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b60648201526084016108ea565b610ccb565b6000610b2b8261218c565b60c9549092506001600160a01b0316905063430c2081610b49611ad2565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b158015610b8f57600080fd5b505afa158015610ba3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bc7919061311b565b80610c65575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c20819060440160206040518083038186803b158015610c1b57600080fd5b505afa158015610c2f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c53919061311b565b8015610c655750610c65610671611ad2565b610cc95760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b60648201526084016108ea565b505b610cd5878961372e565b600281511015610d355760405162461bcd60e51b815260206004820152602560248201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456044820152642627abaf9960d91b60648201526084016108ea565b610da5610d7760008360018551610d4c9190613717565b81518110610d6a57634e487b7160e01b600052603260045260246000fd5b60200260200101516121c7565b82600081518110610d9857634e487b7160e01b600052603260045260246000fd5b602002602001015161197c565b610dad610a8e565b15610dca5760405162461bcd60e51b81526004016108ea906135b5565b610df28a610dd88a8c61372e565b610de2898b61372e565b610dec888a61372e565b87611c3a565b50505050505050505050565b610e06611fce565b60005b81518110156109ec57610e42828281518110610e3557634e487b7160e01b600052603260045260246000fd5b6020026020010151612047565b80610e4c816137bd565b915050610e09565b610e5f610671611ad2565b610e7b5760405162461bcd60e51b81526004016108ea90613580565b6001600160a01b038116610ed15760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108ea565b610eda8161227c565b610ee26110ce565b6040516001600160a01b038216903480156108fc02916000818181858888f193505050501580156109ec573d6000803e3d6000fd5b610f1f611fce565b610a006000612294565b610f31611fce565b60005b81518110156109ec57610f6d828281518110610f6057634e487b7160e01b600052603260045260246000fd5b602002602001015161227c565b80610f77816137bd565b915050610f34565b610f8a610671611ad2565b610fa65760405162461bcd60e51b81526004016108ea90613580565b6001600160a01b038116610eda5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108ea565b611004611fce565b610a006122e6565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611050925084915083905061197c565b611058610a8e565b156110755760405162461bcd60e51b81526004016108ea906135b5565b6060611089876109138861090e8989611ae1565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6110c5611fce565b61095f8161227c565b610a0060008051602061384883398151915261035c611ad2565b6110f0611fce565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c90611122908590859060040161353e565b600060405180830381600087803b15801561113c57600080fd5b505af1158015611150573d6000803e3d6000fd5b505060cb546001600160a01b03161591506109ec90505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c90611199908590859060040161353e565b600060405180830381600087803b1580156111b357600080fd5b505af115801561091c573d6000803e3d6000fd5b600061087b60008051602061384883398151915283611092565b6111ec610671611ad2565b6112085760405162461bcd60e51b81526004016108ea90613580565b60c9546040516000916001600160a01b03169061122b9085908590602401613504565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b179052516112609190613320565b6000604051808303816000865af19150503d806000811461129d576040519150601f19603f3d011682016040523d82523d6000602084013e6112a2565b606091505b50509050806109495760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b60448201526064016108ea565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611340906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b611352611fce565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b61137c611fce565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b6113c1611fce565b6109ec82828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061234e92505050565b600054610100900460ff16158080156114205750600054600160ff909116105b8061143a5750303b15801561143a575060005460ff166001145b61149d5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016108ea565b6000805460ff1916600117905580156114c0576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce805490911691851691909117905561151e61246a565b6115266124a1565b61152f826124da565b611537612501565b604080516101e08101825260066101a082018181526563727970746f60d01b6101c0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185529182526535b632bb32b960d11b8282015261016083019190915282518084019093526002835261686960f01b9083015261018081019190915260005b600d81101561171e5761170c8282600d811061170257634e487b7160e01b600052603260045260246000fd5b602002015161234e565b80611716816137bd565b9150506116d6565b50508015611089576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506117b2925084915083905061197c565b6117ba610a8e565b156117d75760405162461bcd60e51b81526004016108ea906135b5565b610df28a6117e98b61090e8c8c611ae1565b6117f3888a61372e565b6117fd878961372e565b6001611c3a565b61180c611fce565b60005b818110156109495760c9546001600160a01b0316635096023984848481811061184857634e487b7160e01b600052603260045260246000fd5b905060200201602081019061185d9190612d81565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561189e57600080fd5b505af11580156118b2573d6000803e3d6000fd5b5050505080806118c1906137bd565b91505061180f565b6000828152609760205260409020600101546118e481611f36565b610949838361205f565b6118f6611fce565b6118ff81612541565b61191b5760405162461bcd60e51b81526004016108ea906135df565b600081815260cd6020526040812061193291612b54565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611968611fce565b61197181612567565b61095f6000826125dd565b61198582612541565b6119a15760405162461bcd60e51b81526004016108ea906135df565b60006119d48260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115611a7d576119ff6119f3826000600a6125e7565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b81415611a7d5760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b60648201526084016108ea565b611a8682612626565b6109495760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c494400000060448201526064016108ea565b6000611adc61278b565b905090565b60608282604051602001611af692919061333c565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611b275790505090508281600081518110611b6057634e487b7160e01b600052603260045260246000fd5b602002602001018190525060cd60008581526020019081526020016000208054611b8990613782565b80601f0160208091040260200160405190810160405280929190818152602001828054611bb590613782565b8015611c025780601f10611bd757610100808354040283529160200191611c02565b820191906000526020600020905b815481529060010190602001808311611be557829003601f168201915b505050505081600181518110611c2857634e487b7160e01b600052603260045260246000fd5b60209081029190910101529392505050565b6000611c458561218c565b5060c954604051634f558e7960e01b8152600481018390529192506001600160a01b031690634f558e799060240160206040518083038186803b158015611c8b57600080fd5b505afa158015611c9f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cc3919061311b565b8015611d51575060c9546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e9060240160206040518083038186803b158015611d0e57600080fd5b505afa158015611d22573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d469190612d9d565b6001600160a01b0316145b15611dc55760c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690611d8e90899089908990899089906004016133d9565b600060405180830381600087803b158015611da857600080fd5b505af1158015611dbc573d6000803e3d6000fd5b5050505061091c565b611dce816127d2565b611dd785612831565b8015611de4575084516002145b15611ed05760ca5485516001600160a01b039091169063c36c21259088908890600090611e2157634e487b7160e01b600052603260045260246000fd5b602090810291909101015160cc546040516001600160e01b031960e086901b168152611e5b9392916001600160a01b031690600401613438565b600060405180830381600087803b158015611e7557600080fd5b505af1158015611e89573d6000803e3d6000fd5b50505050600084511115611ecb5760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490611d8e908790879086906004016134ce565b61091c565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790611f0890899089908990899089906004016133d9565b600060405180830381600087803b158015611f2257600080fd5b505af1158015610df2573d6000803e3d6000fd5b61095f81611f42611ad2565b61288b565b611f518282611092565b6109ec5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611f8a611ad2565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611fd6611ad2565b6001600160a01b0316611ff16033546001600160a01b031690565b6001600160a01b031614610a005760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016108ea565b61095f600080516020613848833981519152826118c9565b6120698282611092565b156109ec5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff191690556120a0611ad2565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6120ec610a8e565b61212f5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b60448201526064016108ea565b600080516020613828833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa61216f611ad2565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b80156121c1578291506121ad8285610d4c600185613717565b9250806121b98161376b565b915050612194565b50915091565b600081516000141561221b5760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d505459000000000060448201526064016108ea565b828260405160200161222d9190613320565b6040516020818303038152906040528051906020012060405160200161225d929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b61095f600080516020613848833981519152826125dd565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6122ee610a8e565b1561230b5760405162461bcd60e51b81526004016108ea906135b5565b600080516020613828833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861216f611ad2565b600061235b6000836121c7565b600081815260cd60209081526040909120845192935061237f929091850190612b8e565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980836040516123b0919061356d565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e799060240160206040518083038186803b1580156123fc57600080fd5b505afa158015612410573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612434919061311b565b6109ec5760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c6090611199908490869060040161366c565b600054610100900460ff166124915760405162461bcd60e51b81526004016108ea90613621565b610a0061249c611ad2565b612294565b600054610100900460ff166124c85760405162461bcd60e51b81526004016108ea90613621565b610a0060006124d5611ad2565b6125dd565b600054610100900460ff1661137c5760405162461bcd60e51b81526004016108ea90613621565b600054610100900460ff166125285760405162461bcd60e51b81526004016108ea90613621565b600080516020613828833981519152805460ff19169055565b600081815260cd60205260408120805482919061255d90613782565b9050119050919050565b61256f611fce565b6001600160a01b0381166125d45760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016108ea565b61095f81612294565b6109ec8282611f47565b6040805180820190915260008082526020820152604051806040016040528083815260200184866020015161261c91906136e0565b9052949350505050565b600081516000141561263a57506000919050565b60208201805160f81c60308110801590612658575060398160ff1611155b15801561267a575060618160ff16101580156126785750607a8160ff1611155b155b15612689575060009392505050565b835160018111156126f7576126ab836126a3600184613717565b015160f81c90565b915060308260ff16101580156126c5575060398260ff1611155b1580156126e7575060618260ff16101580156126e55750607a8260ff1611155b155b156126f757506000949350505050565b60015b612705600183613717565b81101561277f578381015160f81c9250602d831480159061273b575060308360ff1610158015612739575060398360ff1611155b155b801561275c575060618360ff161015801561275a5750607a8360ff1611155b155b1561276d5750600095945050505050565b80612777816137bd565b9150506126fa565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b03163314156127cd575060331936013560601c90565b503390565b6127db816112ec565b156128285760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b454400000060448201526064016108ea565b61095f816128ef565b60008061284860008460018651610d4c9190613717565b60ca549091506001600160a01b0316158015906128845750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6128958282611092565b6109ec576128ad816001600160a01b03166014612973565b6128b8836020612973565b6040516020016128c9929190613364565b60408051601f198184030181529082905262461bcd60e51b82526108ea9160040161356d565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260019061292e90606001611327565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b606060006129828360026136f8565b61298d9060026136e0565b6001600160401b038111156129b257634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156129dc576020820181803683370190505b509050600360fc1b81600081518110612a0557634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612a4257634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000612a668460026136f8565b612a719060016136e0565b90505b6001811115612b05576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612ab357634e487b7160e01b600052603260045260246000fd5b1a60f81b828281518110612ad757634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c93612afe8161376b565b9050612a74565b5083156128845760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016108ea565b508054612b6090613782565b6000825580601f10612b70575050565b601f01602090049060005260206000209081019061095f9190612c12565b828054612b9a90613782565b90600052602060002090601f016020900481019282612bbc5760008555612c02565b82601f10612bd557805160ff1916838001178555612c02565b82800160010185558215612c02579182015b82811115612c02578251825591602001919060010190612be7565b50612c0e929150612c12565b5090565b5b80821115612c0e5760008155600101612c13565b6000612c3a612c35846136bd565b61368d565b9050808382526020808301915083868660051b86011115612c5a57600080fd5b60005b86811015612cee5781356001600160401b0380821115612c7c57600080fd5b8188019150601f8a81840112612c9157600080fd5b823582811115612ca357612ca36137ee565b612cb4818301601f1916880161368d565b92508083528b87828601011115612cca57600080fd5b80878501888501376000908301870152508552509282019290820190600101612c5d565b505050509392505050565b60008083601f840112612d0a578182fd5b5081356001600160401b03811115612d20578182fd5b6020830191508360208260051b8501011115612d3b57600080fd5b9250929050565b60008083601f840112612d53578182fd5b5081356001600160401b03811115612d69578182fd5b602083019150836020828501011115612d3b57600080fd5b600060208284031215612d92578081fd5b813561288481613804565b600060208284031215612dae578081fd5b815161288481613804565b60008060008060008060008060a0898b031215612dd4578384fd5b8835612ddf81613804565b975060208901356001600160401b0380821115612dfa578586fd5b612e068c838d01612cf9565b909950975060408b0135915080821115612e1e578586fd5b612e2a8c838d01612cf9565b909750955060608b0135915080821115612e42578485fd5b50612e4f8b828c01612cf9565b9094509250506080890135612e6381613819565b809150509295985092959890939650565b60008060008060608587031215612e89578182fd5b8435612e9481613804565b93506020850135925060408501356001600160401b03811115612eb5578283fd5b612ec187828801612d42565b95989497509550505050565b60008060008060008060008060a0898b031215612ee8578182fd5b8835612ef381613804565b97506020890135965060408901356001600160401b0380821115612f15578384fd5b612f218c838d01612d42565b909850965060608b0135915080821115612f39578384fd5b612f458c838d01612cf9565b909650945060808b0135915080821115612f5d578384fd5b50612f6a8b828c01612cf9565b999c989b5096995094979396929594505050565b60008060208385031215612f90578182fd5b82356001600160401b03811115612fa5578283fd5b612fb185828601612cf9565b90969095509350505050565b60006020808385031215612fcf578182fd5b82356001600160401b03811115612fe4578283fd5b8301601f81018513612ff4578283fd5b8035613002612c35826136bd565b80828252848201915084840188868560051b8701011115613021578687fd5b8694505b8385101561304c57803561303881613804565b835260019490940193918501918501613025565b50979650505050505050565b6000602080838503121561306a578182fd5b82356001600160401b0380821115613080578384fd5b818501915085601f830112613093578384fd5b81356130a1612c35826136bd565b80828252858201915085850189878560051b88010111156130c0578788fd5b875b8481101561310c578135868111156130d857898afd5b8701603f81018c136130e857898afd5b6130f98c8a83013560408401612c27565b85525092870192908701906001016130c2565b50909998505050505050505050565b60006020828403121561312c578081fd5b815161288481613819565b600060208284031215613148578081fd5b5035919050565b60008060408385031215613161578182fd5b82359150602083013561317381613804565b809150509250929050565b60006020828403121561318f578081fd5b81356001600160e01b031981168114612884578182fd5b60008060008060008060c087890312156131be578384fd5b86356131c981613804565b955060208701356131d981613804565b945060408701356131e981613804565b935060608701356131f981613804565b9250608087013561320981613804565b915060a087013561321981613804565b809150509295509295509295565b60008060208385031215613239578182fd5b82356001600160401b0381111561324e578283fd5b612fb185828601612d42565b60008060006040848603121561326e578081fd5b8335925060208401356001600160401b0381111561328a578182fd5b61329686828701612d42565b9497909650939450505050565b6000815180845260208085019450848260051b8601828601855b858110156132e75783830389526132d58383516132f4565b988501989250908401906001016132bd565b5090979650505050505050565b6000815180845261330c81602086016020860161373b565b601f01601f19169290920160200192915050565b6000825161333281846020870161373b565b9190910192915050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161339c81601785016020880161373b565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516133cd81602884016020880161373b565b01602801949350505050565b6001600160a01b038616815260a0602082018190526000906133fd908301876132a3565b828103604084015261340f81876132a3565b9050828103606084015261342381866132a3565b91505082151560808301529695505050505050565b600060018060a01b0380861683526060602084015261345a60608401866132f4565b9150808416604084015250949350505050565b6000602080830181845280855180835260408601915060408160051b8701019250838701855b828110156134c157603f198886030184526134af8583516132a3565b94509285019290850190600101613493565b5092979650505050505050565b6060815260006134e160608301866132a3565b82810360208401526134f381866132a3565b915050826040830152949350505050565b6020808252810182905260006001600160fb1b03831115613523578081fd5b8260051b808560408501379190910160400190815292915050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b60208152600061288460208301846132f4565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b82815260406020820152600061368560408301846132f4565b949350505050565b604051601f8201601f191681016001600160401b03811182821017156136b5576136b56137ee565b604052919050565b60006001600160401b038211156136d6576136d66137ee565b5060051b60200190565b600082198211156136f3576136f36137d8565b500190565b6000816000190483118215151615613712576137126137d8565b500290565b600082821015613729576137296137d8565b500390565b6000612884368484612c27565b60005b8381101561375657818101518382015260200161373e565b83811115613765576000848401525b50505050565b60008161377a5761377a6137d8565b506000190190565b600181811c9082168061379657607f821691505b602082108114156137b757634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156137d1576137d16137d8565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461095f57600080fd5b801515811461095f57600080fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
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
