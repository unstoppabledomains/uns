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
                components: [
                    {
                        internalType: "address",
                        name: "to",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "label",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "tld",
                        type: "uint256",
                    },
                ],
                internalType: "struct IMintingManager.BulkSLDIssueRequest[]",
                name: "requests",
                type: "tuple[]",
            },
        ],
        name: "bulkIssue",
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
const _bytecode = "0x608060405234801561001057600080fd5b50613a88806100206000396000f3fe6080604052600436106102675760003560e01c8063983b2d5611610144578063c3a3bc00116100b6578063d53913931161007a578063d539139314610776578063d547741f14610798578063d6ab22ed146107b8578063ec527389146107d8578063f2fde38b146107f8578063ffa1ad741461081857600080fd5b8063c3a3bc00146106d6578063cc2a9a5b146106f6578063cc2c3fc414610716578063ceeb4f5014610736578063d1f5692c1461075657600080fd5b8063a849d65c11610108578063a849d65c14610616578063aa271e1a14610636578063ae31844a14610656578063b0aa98c714610676578063b3ab15fb14610696578063b9998a24146106b657600080fd5b8063983b2d561461055f578063986502751461057f57806399e0dd7c14610594578063a217fddf146105b4578063a3f4df7e146105c957600080fd5b80635cd7e3b3116101dd57806377a2a589116101a157806377a2a589146104b957806381c81d35146104d95780638456cb59146104ec5780638da5cb5b14610501578063906cecc11461051f57806391d148541461053f57600080fd5b80635cd7e3b3146104315780635fc1964f14610451578063634486da14610471578063715018a61461048457806371e2a6571461049957600080fd5b806336568abe1161022f57806336568abe146103415780633f41b614146103615780633f4ba83a14610399578063572b6c05146103ae5780635b6fa8db146103fc5780635c975abb1461041c57600080fd5b806301ffc9a71461026c578063248a9ca3146102a1578063268b15ed146102df5780632f2ff15d146103015780633092afd514610321575b600080fd5b34801561027857600080fd5b5061028c6102873660046132e3565b61084a565b60405190151581526020015b60405180910390f35b3480156102ad57600080fd5b506102d16102bc36600461329c565b60009081526097602052604090206001015490565b604051908152602001610298565b3480156102eb57600080fd5b506102ff6102fa3660046133bf565b610881565b005b34801561030d57600080fd5b506102ff61031c3660046132b4565b610926565b34801561032d57600080fd5b506102ff61033c366004612fa4565b610950565b34801561034d57600080fd5b506102ff61035c3660046132b4565b610964565b34801561036d57600080fd5b5060c954610381906001600160a01b031681565b6040516001600160a01b039091168152602001610298565b3480156103a557600080fd5b506102ff6109f2565b3480156103ba57600080fd5b5061028c6103c9366004612fa4565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561040857600080fd5b5060cc54610381906001600160a01b031681565b34801561042857600080fd5b5061028c610a04565b34801561043d57600080fd5b506102ff61044c366004612fdc565b610a1a565b34801561045d57600080fd5b506102ff61046c3660046131e0565b610d76565b6102ff61047f366004612fa4565b610dcc565b34801561049057600080fd5b506102ff610e8f565b3480156104a557600080fd5b506102ff6104b43660046131e0565b610ea1565b3480156104c557600080fd5b5060ce54610381906001600160a01b031681565b6102ff6104e7366004612fa4565b610ef7565b3480156104f857600080fd5b506102ff610f74565b34801561050d57600080fd5b506033546001600160a01b0316610381565b34801561052b57600080fd5b506102ff61053a366004613097565b610f84565b34801561054b57600080fd5b5061028c61055a3660046132b4565b61100c565b34801561056b57600080fd5b506102ff61057a366004612fa4565b611037565b34801561058b57600080fd5b506102ff611048565b3480156105a057600080fd5b506102ff6105af36600461338c565b611062565b3480156105c057600080fd5b506102d1600081565b3480156105d557600080fd5b50610609604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102989190613674565b34801561062257600080fd5b5060cb54610381906001600160a01b031681565b34801561064257600080fd5b5061028c610651366004612fa4565b611141565b34801561066257600080fd5b506102ff6106713660046131a1565b61115b565b34801561068257600080fd5b5061028c61069136600461329c565b6111b4565b3480156106a257600080fd5b506102ff6106b1366004612fa4565b611212565b3480156106c257600080fd5b506102ff6106d1366004612fa4565b61123c565b3480156106e257600080fd5b506102ff6106f136600461338c565b611281565b34801561070257600080fd5b506102ff61071136600461330b565b6112c8565b34801561072257600080fd5b5060ca54610381906001600160a01b031681565b34801561074257600080fd5b506102ff6107513660046130f0565b6116b5565b34801561076257600080fd5b506102ff6107713660046131a1565b61174d565b34801561078257600080fd5b506102d1600080516020613a5c83398151915281565b3480156107a457600080fd5b506102ff6107b33660046132b4565b611812565b3480156107c457600080fd5b506102ff6107d33660046131a1565b611837565b3480156107e457600080fd5b506102ff6107f336600461329c565b611ac6565b34801561080457600080fd5b506102ff610813366004612fa4565b611b38565b34801561082457600080fd5b50610609604051806040016040528060068152602001650c0b8d0b8c4d60d21b81525081565b60006001600160e01b03198216637965db0b60e01b148061087b57506301ffc9a760e01b6001600160e01b03198316145b92915050565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506108c792508491508390506001611b54565b6108cf610a04565b156108f55760405162461bcd60e51b81526004016108ec906136bc565b60405180910390fd5b606061091e610902611cb8565b610915886109108989611cc7565b611cf3565b83846001611e20565b505050505050565b6000828152609760205260409020600101546109418161222b565b61094b838361223c565b505050565b6109586122c3565b6109618161233c565b50565b61096c611cb8565b6001600160a01b0316816001600160a01b0316146109e45760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016108ec565b6109ee8282612354565b5050565b6109fa6122c3565b610a026123d9565b565b600080516020613a3c8339815191525460ff1690565b610a24868861388e565b805160021415610a9657610a39610651611cb8565b610a915760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b60648201526084016108ec565b610c41565b6000610aa182612481565b60c9549092506001600160a01b0316905063430c2081610abf611cb8565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b158015610b0557600080fd5b505afa158015610b19573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b3d9190613280565b80610bdb575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c20819060440160206040518083038186803b158015610b9157600080fd5b505afa158015610ba5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bc99190613280565b8015610bdb5750610bdb610651611cb8565b610c3f5760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b60648201526084016108ec565b505b610c4b878961388e565b600281511015610cab5760405162461bcd60e51b815260206004820152602560248201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456044820152642627abaf9960d91b60648201526084016108ec565b610d1d610ced60008360018551610cc29190613877565b81518110610ce057634e487b7160e01b600052603260045260246000fd5b60200260200101516124bc565b82600081518110610d0e57634e487b7160e01b600052603260045260246000fd5b60200260200101516001611b54565b610d25610a04565b15610d425760405162461bcd60e51b81526004016108ec906136bc565b610d6a8a610d508a8c61388e565b610d5a898b61388e565b610d64888a61388e565b87611e20565b50505050505050505050565b610d7e6122c3565b60005b81518110156109ee57610dba828281518110610dad57634e487b7160e01b600052603260045260246000fd5b602002602001015161233c565b80610dc4816139d1565b915050610d81565b610dd7610651611cb8565b610df35760405162461bcd60e51b81526004016108ec90613687565b6001600160a01b038116610e495760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108ec565b610e5281612571565b610e5a611048565b6040516001600160a01b038216903480156108fc02916000818181858888f193505050501580156109ee573d6000803e3d6000fd5b610e976122c3565b610a026000612589565b610ea96122c3565b60005b81518110156109ee57610ee5828281518110610ed857634e487b7160e01b600052603260045260246000fd5b6020026020010151612571565b80610eef816139d1565b915050610eac565b610f02610651611cb8565b610f1e5760405162461bcd60e51b81526004016108ec90613687565b6001600160a01b038116610e525760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108ec565b610f7c6122c3565b610a026125db565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610fca92508491508390506001611b54565b610fd2610a04565b15610fef5760405162461bcd60e51b81526004016108ec906136bc565b606061100387610915886109108989611cc7565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61103f6122c3565b61096181612571565b610a02600080516020613a5c83398151915261035c611cb8565b61106a6122c3565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061109c9085908590600401613645565b600060405180830381600087803b1580156110b657600080fd5b505af11580156110ca573d6000803e3d6000fd5b505060cb546001600160a01b03161591506109ee90505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906111139085908590600401613645565b600060405180830381600087803b15801561112d57600080fd5b505af115801561091e573d6000803e3d6000fd5b600061087b600080516020613a5c8339815191528361100c565b611166610651611cb8565b6111825760405162461bcd60e51b81526004016108ec90613687565b60c954604051635718c22560e11b81526001600160a01b039091169063ae31844a90611113908590859060040161360b565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611208906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b61121a6122c3565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b6112446122c3565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b6112896122c3565b6109ee82828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061264392505050565b600054610100900460ff16158080156112e85750600054600160ff909116105b806113025750303b158015611302575060005460ff166001145b6113655760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016108ec565b6000805460ff191660011790558015611388576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce80549091169185169190911790556113e661275f565b6113ee612796565b6113f7826127cf565b6113ff6127f6565b6040805161026081018252600661022082018181526563727970746f60d01b610240840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b81830152610160840152835180850185526002815261686960f01b8183015261018084015283518085018552918252656b726573757360d01b828201526101a083019190915282518084018452600580825264616e696d6560d81b828401526101c084019190915283518085018552908152646d616e676160d81b818301526101e08301528251808401909352600983526862696e616e6365757360b81b9083015261020081019190915260005b60118110156116655761165382826011811061164957634e487b7160e01b600052603260045260246000fd5b6020020151612643565b8061165d816139d1565b91505061161d565b50508015611003576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506116fb92508491508390506001611b54565b611703610a04565b156117205760405162461bcd60e51b81526004016108ec906136bc565b610d6a8a6117328b6109108c8c611cc7565b61173c888a61388e565b611746878961388e565b6001611e20565b6117556122c3565b60005b8181101561094b5760c9546001600160a01b0316635096023984848481811061179157634e487b7160e01b600052603260045260246000fd5b90506020020160208101906117a69190612fa4565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b1580156117e757600080fd5b505af11580156117fb573d6000803e3d6000fd5b50505050808061180a906139d1565b915050611758565b60008281526097602052604090206001015461182d8161222b565b61094b8383612354565b611842610651611cb8565b61185e5760405162461bcd60e51b81526004016108ec90613687565b60005b8181101561094b5761191c83838381811061188c57634e487b7160e01b600052603260045260246000fd5b905060200281019061189e91906137d8565b604001358484848181106118c257634e487b7160e01b600052603260045260246000fd5b90506020028101906118d491906137d8565b6118e2906020810190613794565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052509250611b54915050565b60006119d184848481811061194157634e487b7160e01b600052603260045260246000fd5b905060200281019061195391906137d8565b6040013585858581811061197757634e487b7160e01b600052603260045260246000fd5b905060200281019061198991906137d8565b611997906020810190613794565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611cf392505050565b905060006119de82612481565b5060c954604051634f558e7960e01b8152600481018390529192506001600160a01b031690634f558e799060240160206040518083038186803b158015611a2457600080fd5b505afa158015611a38573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a5c9190613280565b611ab1576060611aaf868686818110611a8557634e487b7160e01b600052603260045260246000fd5b9050602002810190611a9791906137d8565b611aa5906020810190612fa4565b8483846000611e20565b505b50508080611abe906139d1565b915050611861565b611ace6122c3565b611ad781612836565b611af35760405162461bcd60e51b81526004016108ec906136e6565b600081815260cd60205260408120611b0a91612e49565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611b406122c3565b611b498161285c565b6109616000826128d2565b611b5d83612836565b611b795760405162461bcd60e51b81526004016108ec906136e6565b6000611bac8360408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115611c5557611bd7611bcb826000600a6128dc565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b81415611c555760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b60648201526084016108ec565b811580611c665750611c668361291b565b611cb25760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c494400000060448201526064016108ec565b50505050565b6000611cc2612a80565b905090565b60608282604051602001611cdc9291906134a4565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611d0d5790505090508281600081518110611d4657634e487b7160e01b600052603260045260246000fd5b602002602001018190525060cd60008581526020019081526020016000208054611d6f90613996565b80601f0160208091040260200160405190810160405280929190818152602001828054611d9b90613996565b8015611de85780601f10611dbd57610100808354040283529160200191611de8565b820191906000526020600020905b815481529060010190602001808311611dcb57829003601f168201915b505050505081600181518110611e0e57634e487b7160e01b600052603260045260246000fd5b60209081029190910101529392505050565b600080611e2c86612481565b91509150828015611e3e575060028651115b8015611ecf575060c9546040516331a9108f60e11b8152600481018390526001600160a01b03898116921690636352211e9060240160206040518083038186803b158015611e8b57600080fd5b505afa158015611e9f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ec39190612fc0565b6001600160a01b031614155b15611f2f5760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b60648201526084016108ec565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e799060240160206040518083038186803b158015611f7357600080fd5b505afa158015611f87573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611fab9190613280565b8015612039575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e9060240160206040518083038186803b158015611ff657600080fd5b505afa15801561200a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061202e9190612fc0565b6001600160a01b0316145b156120ad5760c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690612076908a908a908a908a908a90600401613541565b600060405180830381600087803b15801561209057600080fd5b505af11580156120a4573d6000803e3d6000fd5b50505050611003565b6120b682612ac7565b6120bf86612b26565b80156120cc575085516002145b156121b85760ca5486516001600160a01b039091169063c36c2125908990899060009061210957634e487b7160e01b600052603260045260246000fd5b602090810291909101015160cc546040516001600160e01b031960e086901b1681526121439392916001600160a01b0316906004016135a0565b600060405180830381600087803b15801561215d57600080fd5b505af1158015612171573d6000803e3d6000fd5b505050506000855111156121b35760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490612076908890889087906004016135d5565b611003565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b7906121f0908a908a908a908a908a90600401613541565b600060405180830381600087803b15801561220a57600080fd5b505af115801561221e573d6000803e3d6000fd5b5050505050505050505050565b61096181612237611cb8565b612b80565b612246828261100c565b6109ee5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff1916600117905561227f611cb8565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6122cb611cb8565b6001600160a01b03166122e66033546001600160a01b031690565b6001600160a01b031614610a025760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016108ec565b610961600080516020613a5c83398151915282611812565b61235e828261100c565b156109ee5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612395611cb8565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6123e1610a04565b6124245760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b60448201526064016108ec565b600080516020613a3c833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa612464611cb8565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b80156124b6578291506124a28285610cc2600185613877565b9250806124ae8161397f565b915050612489565b50915091565b60008151600014156125105760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d505459000000000060448201526064016108ec565b82826040516020016125229190613488565b60405160208183030381529060405280519060200120604051602001612552929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610961600080516020613a5c833981519152826128d2565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6125e3610a04565b156126005760405162461bcd60e51b81526004016108ec906136bc565b600080516020613a3c833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612464611cb8565b60006126506000836124bc565b600081815260cd602090815260409091208451929350612674929091850190612e83565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980836040516126a59190613674565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e799060240160206040518083038186803b1580156126f157600080fd5b505afa158015612705573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127299190613280565b6109ee5760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c60906111139084908690600401613773565b600054610100900460ff166127865760405162461bcd60e51b81526004016108ec90613728565b610a02612791611cb8565b612589565b600054610100900460ff166127bd5760405162461bcd60e51b81526004016108ec90613728565b610a0260006127ca611cb8565b6128d2565b600054610100900460ff166112445760405162461bcd60e51b81526004016108ec90613728565b600054610100900460ff1661281d5760405162461bcd60e51b81526004016108ec90613728565b600080516020613a3c833981519152805460ff19169055565b600081815260cd60205260408120805482919061285290613996565b9050119050919050565b6128646122c3565b6001600160a01b0381166128c95760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016108ec565b61096181612589565b6109ee828261223c565b604080518082019091526000808252602082015260405180604001604052808381526020018486602001516129119190613840565b9052949350505050565b600081516000141561292f57506000919050565b60208201805160f81c6030811080159061294d575060398160ff1611155b15801561296f575060618160ff161015801561296d5750607a8160ff1611155b155b1561297e575060009392505050565b835160018111156129ec576129a083612998600184613877565b015160f81c90565b915060308260ff16101580156129ba575060398260ff1611155b1580156129dc575060618260ff16101580156129da5750607a8260ff1611155b155b156129ec57506000949350505050565b60015b6129fa600183613877565b811015612a74578381015160f81c9250602d8314801590612a30575060308360ff1610158015612a2e575060398360ff1611155b155b8015612a51575060618360ff1610158015612a4f5750607a8360ff1611155b155b15612a625750600095945050505050565b80612a6c816139d1565b9150506129ef565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b0316331415612ac2575060331936013560601c90565b503390565b612ad0816111b4565b15612b1d5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b454400000060448201526064016108ec565b61096181612be4565b600080612b3d60008460018651610cc29190613877565b60ca549091506001600160a01b031615801590612b795750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b612b8a828261100c565b6109ee57612ba2816001600160a01b03166014612c68565b612bad836020612c68565b604051602001612bbe9291906134cc565b60408051601f198184030181529082905262461bcd60e51b82526108ec91600401613674565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600190612c23906060016111ef565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b60606000612c77836002613858565b612c82906002613840565b6001600160401b03811115612ca757634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015612cd1576020820181803683370190505b509050600360fc1b81600081518110612cfa57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612d3757634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000612d5b846002613858565b612d66906001613840565b90505b6001811115612dfa576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612da857634e487b7160e01b600052603260045260246000fd5b1a60f81b828281518110612dcc57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c93612df38161397f565b9050612d69565b508315612b795760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016108ec565b508054612e5590613996565b6000825580601f10612e65575050565b601f0160209004906000526020600020908101906109619190612f07565b828054612e8f90613996565b90600052602060002090601f016020900481019282612eb15760008555612ef7565b82601f10612eca57805160ff1916838001178555612ef7565b82800160010185558215612ef7579182015b82811115612ef7578251825591602001919060010190612edc565b50612f03929150612f07565b5090565b5b80821115612f035760008155600101612f08565b60008083601f840112612f2d578182fd5b5081356001600160401b03811115612f43578182fd5b6020830191508360208260051b8501011115612f5e57600080fd5b9250929050565b60008083601f840112612f76578182fd5b5081356001600160401b03811115612f8c578182fd5b602083019150836020828501011115612f5e57600080fd5b600060208284031215612fb5578081fd5b8135612b7981613a18565b600060208284031215612fd1578081fd5b8151612b7981613a18565b60008060008060008060008060a0898b031215612ff7578384fd5b883561300281613a18565b975060208901356001600160401b038082111561301d578586fd5b6130298c838d01612f1c565b909950975060408b0135915080821115613041578586fd5b61304d8c838d01612f1c565b909750955060608b0135915080821115613065578485fd5b506130728b828c01612f1c565b909450925050608089013561308681613a2d565b809150509295985092959890939650565b600080600080606085870312156130ac578384fd5b84356130b781613a18565b93506020850135925060408501356001600160401b038111156130d8578283fd5b6130e487828801612f65565b95989497509550505050565b60008060008060008060008060a0898b03121561310b578182fd5b883561311681613a18565b97506020890135965060408901356001600160401b0380821115613138578384fd5b6131448c838d01612f65565b909850965060608b013591508082111561315c578384fd5b6131688c838d01612f1c565b909650945060808b0135915080821115613180578384fd5b5061318d8b828c01612f1c565b999c989b5096995094979396929594505050565b600080602083850312156131b3578182fd5b82356001600160401b038111156131c8578283fd5b6131d485828601612f1c565b90969095509350505050565b600060208083850312156131f2578182fd5b82356001600160401b03811115613207578283fd5b8301601f81018513613217578283fd5b803561322a6132258261381d565b6137ed565b80828252848201915084840188868560051b8701011115613249578687fd5b8694505b8385101561327457803561326081613a18565b83526001949094019391850191850161324d565b50979650505050505050565b600060208284031215613291578081fd5b8151612b7981613a2d565b6000602082840312156132ad578081fd5b5035919050565b600080604083850312156132c6578182fd5b8235915060208301356132d881613a18565b809150509250929050565b6000602082840312156132f4578081fd5b81356001600160e01b031981168114612b79578182fd5b60008060008060008060c08789031215613323578384fd5b863561332e81613a18565b9550602087013561333e81613a18565b9450604087013561334e81613a18565b9350606087013561335e81613a18565b9250608087013561336e81613a18565b915060a087013561337e81613a18565b809150509295509295509295565b6000806020838503121561339e578182fd5b82356001600160401b038111156133b3578283fd5b6131d485828601612f65565b6000806000604084860312156133d3578081fd5b8335925060208401356001600160401b038111156133ef578182fd5b6133fb86828701612f65565b9497909650939450505050565b600081518084526020808501808196508360051b81019150828601855b8581101561344f57828403895261343d84835161345c565b98850198935090840190600101613425565b5091979650505050505050565b60008151808452613474816020860160208601613953565b601f01601f19169290920160200192915050565b6000825161349a818460208701613953565b9190910192915050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351613504816017850160208801613953565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351613535816028840160208801613953565b01602801949350505050565b6001600160a01b038616815260a06020820181905260009061356590830187613408565b82810360408401526135778187613408565b9050828103606084015261358b8186613408565b91505082151560808301529695505050505050565b600060018060a01b038086168352606060208401526135c2606084018661345c565b9150808416604084015250949350505050565b6060815260006135e86060830186613408565b82810360208401526135fa8186613408565b915050826040830152949350505050565b6020808252810182905260006001600160fb1b0383111561362a578081fd5b8260051b808560408501379190910160400190815292915050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b602081526000612b79602083018461345c565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b82815260406020820152600061378c604083018461345c565b949350505050565b6000808335601e198436030181126137aa578283fd5b8301803591506001600160401b038211156137c3578283fd5b602001915036819003821315612f5e57600080fd5b60008235605e1983360301811261349a578182fd5b604051601f8201601f191681016001600160401b038111828210171561381557613815613a02565b604052919050565b60006001600160401b0382111561383657613836613a02565b5060051b60200190565b60008219821115613853576138536139ec565b500190565b6000816000190483118215151615613872576138726139ec565b500290565b600082821015613889576138896139ec565b500390565b600061389c6132258461381d565b808482526020808301925084368760051b870111156138b9578485fd5b845b878110156139475781356001600160401b03808211156138d9578788fd5b90880190601f36818401126138ec578889fd5b8235828111156138fe576138fe613a02565b61390f818301601f191688016137ed565b9250808352368782860101111561392457898afd5b8087850188850137820186018990525086525093820193908201906001016138bb565b50919695505050505050565b60005b8381101561396e578181015183820152602001613956565b83811115611cb25750506000910152565b60008161398e5761398e6139ec565b506000190190565b600181811c908216806139aa57607f821691505b602082108114156139cb57634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156139e5576139e56139ec565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461096157600080fd5b801515811461096157600080fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
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
