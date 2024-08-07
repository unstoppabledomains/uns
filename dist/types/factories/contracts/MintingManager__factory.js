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
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "price",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "DomainPurchase",
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
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "recepient",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "Withdrawal",
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
            {
                internalType: "bool",
                name: "isExpirable",
                type: "bool",
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
                internalType: "address",
                name: "owner",
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
                internalType: "uint64",
                name: "expiry",
                type: "uint64",
            },
            {
                internalType: "uint256",
                name: "price",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "buy",
        outputs: [],
        stateMutability: "payable",
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
                internalType: "uint64",
                name: "expiry",
                type: "uint64",
            },
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "price",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "buyForErc20",
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
                internalType: "uint64",
                name: "expiry",
                type: "uint64",
            },
            {
                internalType: "bool",
                name: "withReverse",
                type: "bool",
            },
        ],
        name: "issueExpirableWithRecords",
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
        inputs: [
            {
                internalType: "uint64",
                name: "expiry",
                type: "uint64",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "renew",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "revoke",
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
                internalType: "address",
                name: "recepient",
                type: "address",
            },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "address",
                name: "recepient",
                type: "address",
            },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50614bae806100206000396000f3fe6080604052600436106102ae5760003560e01c8063906cecc111610175578063b9998a24116100dc578063d547741f11610095578063f2fde38b1161006f578063f2fde38b14610892578063f5243bc4146108b2578063f940e385146108d2578063ffa1ad74146108f257600080fd5b8063d547741f1461083f578063d7db74c71461085f578063ec5273891461087257600080fd5b8063b9998a241461077d578063cc2a9a5b1461079d578063cc2c3fc4146107bd578063ceeb4f50146107dd578063d1f5692c146107fd578063d53913931461081d57600080fd5b8063a3a3f7f61161012e578063a3a3f7f614610690578063a3f4df7e146106b0578063a849d65c146106fd578063aa271e1a1461071d578063b0aa98c71461073d578063b3ab15fb1461075d57600080fd5b8063906cecc1146105e657806391d1485414610606578063983b2d5614610626578063986502751461064657806399e0dd7c1461065b578063a217fddf1461067b57600080fd5b80635b6fa8db11610219578063715018a6116101d2578063715018a61461054b57806371e2a6571461056057806377a2a5891461058057806381c81d35146105a05780638456cb59146105b35780638da5cb5b146105c857600080fd5b80635b6fa8db146104a35780635c975abb146104c35780635cd7e3b3146104d85780635e22cd86146104f85780635fc1964f14610518578063634486da1461053857600080fd5b80633092afd51161026b5780633092afd5146103a857806336568abe146103c85780633f41b614146103e85780633f4ba83a1461042057806351cff8d914610435578063572b6c051461045557600080fd5b806301ffc9a7146102b35780631edb948e146102e857806320c5429b1461030a578063248a9ca31461032a578063268b15ed146103685780632f2ff15d14610388575b600080fd5b3480156102bf57600080fd5b506102d36102ce366004613a52565b610923565b60405190151581526020015b60405180910390f35b3480156102f457600080fd5b50610308610303366004613aa1565b61095a565b005b34801561031657600080fd5b50610308610325366004613acd565b610b03565b34801561033657600080fd5b5061035a610345366004613acd565b60009081526097602052604090206001015490565b6040519081526020016102df565b34801561037457600080fd5b50610308610383366004613b27565b610c26565b34801561039457600080fd5b506103086103a3366004613b92565b610cb9565b3480156103b457600080fd5b506103086103c3366004613bc2565b610ce3565b3480156103d457600080fd5b506103086103e3366004613b92565b610cf7565b3480156103f457600080fd5b5060c954610408906001600160a01b031681565b6040516001600160a01b0390911681526020016102df565b34801561042c57600080fd5b50610308610d85565b34801561044157600080fd5b50610308610450366004613bc2565b610d97565b34801561046157600080fd5b506102d3610470366004613bc2565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b3480156104af57600080fd5b5060cc54610408906001600160a01b031681565b3480156104cf57600080fd5b506102d3610e37565b3480156104e457600080fd5b506103086104f3366004613c31565b610e4d565b34801561050457600080fd5b50610308610513366004613cf0565b6110b1565b34801561052457600080fd5b50610308610533366004613e2a565b6112f6565b610308610546366004613bc2565b61133e565b34801561055757600080fd5b50610308611401565b34801561056c57600080fd5b5061030861057b366004613e2a565b611413565b34801561058c57600080fd5b5060ce54610408906001600160a01b031681565b6103086105ae366004613bc2565b61145b565b3480156105bf57600080fd5b506103086114d8565b3480156105d457600080fd5b506033546001600160a01b0316610408565b3480156105f257600080fd5b50610308610601366004613ec8565b6114e8565b34801561061257600080fd5b506102d3610621366004613b92565b61156e565b34801561063257600080fd5b50610308610641366004613bc2565b611599565b34801561065257600080fd5b506103086115aa565b34801561066757600080fd5b50610308610676366004613f23565b6115c4565b34801561068757600080fd5b5061035a600081565b34801561069c57600080fd5b506103086106ab366004613f64565b6116ab565b3480156106bc57600080fd5b506106f0604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102df919061400a565b34801561070957600080fd5b5060cb54610408906001600160a01b031681565b34801561072957600080fd5b506102d3610738366004613bc2565b6116f4565b34801561074957600080fd5b506102d3610758366004613acd565b61170e565b34801561076957600080fd5b50610308610778366004613bc2565b61176c565b34801561078957600080fd5b50610308610798366004613bc2565b611796565b3480156107a957600080fd5b506103086107b836600461401d565b6117db565b3480156107c957600080fd5b5060ca54610408906001600160a01b031681565b3480156107e957600080fd5b506103086107f836600461409f565b611960565b34801561080957600080fd5b50610308610818366004614154565b611a04565b34801561082957600080fd5b5061035a600080516020614b8283398151915281565b34801561084b57600080fd5b5061030861085a366004613b92565b611abb565b61030861086d366004614189565b611ae0565b34801561087e57600080fd5b5061030861088d366004613acd565b611c70565b34801561089e57600080fd5b506103086108ad366004613bc2565b611ce2565b3480156108be57600080fd5b506103086108cd36600461427e565b611cfe565b3480156108de57600080fd5b506103086108ed366004614396565b611eb0565b3480156108fe57600080fd5b506106f060405180604001604052806005815260200164302e352e3160d81b81525081565b60006001600160e01b03198216637965db0b60e01b148061095457506301ffc9a760e01b6001600160e01b03198316145b92915050565b61096561073861202c565b61098a5760405162461bcd60e51b8152600401610981906143c4565b60405180910390fd5b60c95460405163baef73e960e01b8152600481018390526000916001600160a01b03169063baef73e990602401602060405180830381865afa1580156109d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f891906143f9565b9050806001600160401b0316600003610a235760405162461bcd60e51b815260040161098190614416565b806001600160401b0316836001600160401b031611610a905760405162461bcd60e51b815260206004820152602360248201527f4d696e74696e674d616e616765723a204558504952595f4e4f545f455854454e60448201526211115160ea1b6064820152608401610981565b60c954604051631fb9763760e11b81526001600160401b0385166004820152602481018490526001600160a01b0390911690633f72ec6e906044015b600060405180830381600087803b158015610ae657600080fd5b505af1158015610afa573d6000803e3d6000fd5b50505050505050565b610b0e61073861202c565b610b2a5760405162461bcd60e51b8152600401610981906143c4565b60c95460405163baef73e960e01b8152600481018390526001600160a01b039091169063baef73e990602401602060405180830381865afa158015610b73573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b9791906143f9565b6001600160401b0316600003610bbf5760405162461bcd60e51b815260040161098190614416565b60c954604051637eee288d60e01b8152306004820152602481018390526001600160a01b0390911690637eee288d90604401600060405180830381600087803b158015610c0b57600080fd5b505af1158015610c1f573d6000803e3d6000fd5b5050505050565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250610c69935085925084915061203b565b610c71610e37565b15610c8e5760405162461bcd60e51b815260040161098190614459565b6060610afa610c9b61202c565b610cae88610ca98989612212565b61223e565b83846000600161234f565b600082815260976020526040902060010154610cd4816128a3565b610cde83836128b4565b505050565b610ceb61293b565b610cf4816129b4565b50565b610cff61202c565b6001600160a01b0316816001600160a01b031614610d775760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610981565b610d8182826129cc565b5050565b610d8d61293b565b610d95612a51565b565b610d9f61293b565b6001600160a01b038116610db257600080fd5b60405147906001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610dea573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905260008183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a15050565b600080516020614b628339815191525460ff1690565b610e578688614483565b8051600203610e8c57610e6b61073861202c565b610e875760405162461bcd60e51b81526004016109819061454d565b610fd1565b6000610e9782612af9565b60c9549092506001600160a01b0316905063430c2081610eb561202c565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610f00573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f249190614591565b80610fb3575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610f7d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fa19190614591565b8015610fb35750610fb361073861202c565b610fcf5760405162461bcd60e51b8152600401610981906145ae565b505b610fdb8789614483565b6000600282511015610fff5760405162461bcd60e51b8152600401610981906145fd565b611054611033600084600186516110169190614658565b815181106110265761102661466b565b6020026020010151612b34565b836000815181106110465761104661466b565b60200260200101518361203b565b61105c610e37565b156110795760405162461bcd60e51b815260040161098190614459565b6110a38b6110878b8d614483565b6110918a8c614483565b61109b898b614483565b60008961234f565b505050505050505050505050565b6110bb8789614483565b80516002036110f0576110cf61073861202c565b6110eb5760405162461bcd60e51b81526004016109819061454d565b611235565b60006110fb82612af9565b60c9549092506001600160a01b0316905063430c208161111961202c565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015611164573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111889190614591565b80611217575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa1580156111e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112059190614591565b8015611217575061121761073861202c565b6112335760405162461bcd60e51b8152600401610981906145ae565b505b61123f888a614483565b836002825110156112625760405162461bcd60e51b8152600401610981906145fd565b611279611033600084600186516110169190614658565b611281610e37565b1561129e5760405162461bcd60e51b815260040161098190614459565b60028a146112be5760405162461bcd60e51b815260040161098190614681565b6112e78c6112cc8c8e614483565b6112d68b8d614483565b6112e08a8c614483565b898961234f565b50505050505050505050505050565b6112fe61293b565b60005b8151811015610d815761132c82828151811061131f5761131f61466b565b60200260200101516129b4565b80611336816146c7565b915050611301565b61134961073861202c565b6113655760405162461bcd60e51b8152600401610981906143c4565b6001600160a01b0381166113bb5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610981565b6113c481612be8565b6113cc6115aa565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610d81573d6000803e3d6000fd5b61140961293b565b610d956000612c00565b61141b61293b565b60005b8151811015610d815761144982828151811061143c5761143c61466b565b6020026020010151612be8565b80611453816146c7565b91505061141e565b61146661073861202c565b6114825760405162461bcd60e51b8152600401610981906143c4565b6001600160a01b0381166113c45760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610981565b6114e061293b565b610d95612c52565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525061152b935085925084915061203b565b611533610e37565b156115505760405162461bcd60e51b815260040161098190614459565b606061156487610cae88610ca98989612212565b5050505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6115a161293b565b610cf481612be8565b610d95600080516020614b828339815191526103e361202c565b6115cc61293b565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906115fe90859085906004016146e0565b600060405180830381600087803b15801561161857600080fd5b505af115801561162c573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610d8190505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061167590859085906004016146e0565b600060405180830381600087803b15801561168f57600080fd5b505af11580156116a3573d6000803e3d6000fd5b505050505050565b6116b361293b565b610cde83838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250859250612cba915050565b6000610954600080516020614b828339815191528361156e565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611762906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b61177461293b565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b61179e61293b565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b600054610100900460ff16158080156117fb5750600054600160ff909116105b806118155750303b158015611815575060005460ff166001145b6118785760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610981565b6000805460ff19166001179055801561189b576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce80549091169185169190911790556118f9612dda565b611901612e11565b61190a82612e4a565b611912612e71565b8015610afa576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052506119a3935085925084915061203b565b6119ab610e37565b156119c85760405162461bcd60e51b815260040161098190614459565b6119f78a6119da8b610ca98c8c612212565b6119e4888a614483565b6119ee8789614483565b6000600161234f565b5050505050505050505050565b611a0c61293b565b60005b81811015610cde5760c9546001600160a01b03166350960239848484818110611a3a57611a3a61466b565b9050602002016020810190611a4f9190613bc2565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b158015611a9057600080fd5b505af1158015611aa4573d6000803e3d6000fd5b505050508080611ab3906146c7565b915050611a0f565b600082815260976020526040902060010154611ad6816128a3565b610cde83836129cc565b611aea898b614483565b6000600282511015611b0e5760405162461bcd60e51b8152600401610981906145fd565b611b25611033600084600186516110169190614658565b611b2d610e37565b15611b4a5760405162461bcd60e51b815260040161098190614459565b60028b14611b6a5760405162461bcd60e51b815260040161098190614681565b611bb08d8d8d898960008a8a8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612eb192505050565b84341015611c005760405162461bcd60e51b815260206004820181905260248201527f4d696e74696e674d616e616765723a204e4f545f454e4f5547485f46554e44536044820152606401610981565b611c128d8d8d8d8d8d8d8c6000613071565b843411156112e757611c2261202c565b6001600160a01b03166108fc611c388734614658565b6040518115909202916000818181858888f19350505050158015611c60573d6000803e3d6000fd5b5050505050505050505050505050565b611c7861293b565b611c818161312d565b611c9d5760405162461bcd60e51b81526004016109819061470f565b600081815260cd60205260408120611cb491613a04565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611cea61293b565b611cf381613153565b610cf46000826131c9565b611d088a8c614483565b6000600282511015611d2c5760405162461bcd60e51b8152600401610981906145fd565b611d43611033600084600186516110169190614658565b611d4b610e37565b15611d685760405162461bcd60e51b815260040161098190614459565b60028c14611d885760405162461bcd60e51b815260040161098190614681565b611dcd8e8e8e8a898b8a8a8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612eb192505050565b856001600160a01b03166323b872dd611de461202c565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018890526064016020604051808303816000875af1158015611e37573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e5b9190614591565b611e9f5760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610981565b611c608e8e8e8e8e8e8e8c8e613071565b611eb861293b565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa158015611eff573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f239190614751565b60405163a9059cbb60e01b81526001600160a01b038481166004830152602482018390529192509084169063a9059cbb906044016020604051808303816000875af1158015611f76573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f9a9190614591565b611fde5760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610981565b604080516001600160a01b0384811682526020820184905285168183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a1505050565b60006120366131d3565b905090565b6120448361312d565b6120605760405162461bcd60e51b81526004016109819061470f565b600083815260cf602052604090205460ff1615156001600160401b0382161515146120dc5760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544c445f455850495241424c455f4d496044820152650a69a82a886960d31b6064820152608401610981565b600061210f8360408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a816000015111156121b75761213a61212e826000600a613219565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8036121b75760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610981565b6121c083613258565b61220c5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c49440000006044820152606401610981565b50505050565b6060828260405160200161222792919061476a565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b606081526020019060019003908161225857905050905082816000815181106122835761228361466b565b602002602001018190525060cd600085815260200190815260200160002080546122ac90614792565b80601f01602080910402602001604051908101604052809291908181526020018280546122d890614792565b80156123255780601f106122fa57610100808354040283529160200191612325565b820191906000526020600020905b81548152906001019060200180831161230857829003601f168201915b50505050508160018151811061233d5761233d61466b565b60209081029190910101529392505050565b600080600061235d88612af9565b9150915083801561236f575060028851115b80156123f1575060c9546040516331a9108f60e11b8152600481018390526001600160a01b038b8116921690636352211e90602401602060405180830381865afa1580156123c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123e591906147cc565b6001600160a01b031614155b156124515760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b6064820152608401610981565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa15801561249a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124be9190614591565b80156125af575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa15801561250e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061253291906147cc565b6001600160a01b031614806125af575060c95460405163d9548e5360e01b8152600481018490526001600160a01b039091169063d9548e5390602401602060405180830381865afa15801561258b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125af9190614591565b156126a0576001600160401b038516156126315760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b15801561261857600080fd5b505af115801561262c573d6000803e3d6000fd5b505050505b60c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690612669908c908c908c908c908b9060040161483e565b600060405180830381600087803b15801561268357600080fd5b505af1158015612697573d6000803e3d6000fd5b50505050612897565b6126a9826133bc565b6126b28861341b565b80156126bf575087516002145b80156126d257506001600160401b038516155b156127b05760ca5488516001600160a01b039091169063c36c2125908b908b906000906127015761270161466b565b602090810291909101015160cc546040516001600160e01b031960e086901b16815261273b9392916001600160a01b03169060040161489d565b600060405180830381600087803b15801561275557600080fd5b505af1158015612769573d6000803e3d6000fd5b505050506000875111156127ab5760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490612669908a908a9087906004016148d2565b612897565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b7906127e8908c908c908c908c908b9060040161483e565b600060405180830381600087803b15801561280257600080fd5b505af1158015612816573d6000803e3d6000fd5b505050506001600160401b038516156128975760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b15801561287e57600080fd5b505af1158015612892573d6000803e3d6000fd5b505050505b50979650505050505050565b610cf4816128af61202c565b613475565b6128be828261156e565b610d815760008281526097602090815260408083206001600160a01b03851684529091529020805460ff191660011790556128f761202c565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b61294361202c565b6001600160a01b031661295e6033546001600160a01b031690565b6001600160a01b031614610d955760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610981565b610cf4600080516020614b8283398151915282611abb565b6129d6828261156e565b15610d815760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612a0d61202c565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b612a59610e37565b612a9c5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610981565b600080516020614b62833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa612adc61202c565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b8015612b2e57829150612b1a8285611016600185614658565b925080612b2681614908565b915050612b01565b50915091565b60008151600003612b875760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610981565b8282604051602001612b99919061491f565b60405160208183030381529060405280519060200120604051602001612bc9929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610cf4600080516020614b82833981519152826131c9565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b612c5a610e37565b15612c775760405162461bcd60e51b815260040161098190614459565b600080516020614b62833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612adc61202c565b6000612cc7600084612b34565b600081815260cd60205260409020909150612ce28482614981565b50600081815260cf602052604090819020805460ff19168415151790555181907f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf898090612d2f90869061400a565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015612d80573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612da49190614591565b610cde5760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c6090610acc9084908790600401614a40565b600054610100900460ff16612e015760405162461bcd60e51b815260040161098190614a61565b610d95612e0c61202c565b612c00565b600054610100900460ff16612e385760405162461bcd60e51b815260040161098190614a61565b610d956000612e4561202c565b6131c9565b600054610100900460ff1661179e5760405162461bcd60e51b815260040161098190614a61565b600054610100900460ff16612e985760405162461bcd60e51b815260040161098190614a61565b600080516020614b62833981519152805460ff19169055565b6000612ec5612ec08789614483565b612af9565b506040516bffffffffffffffffffffffff1930606090811b821660208401524660348401528b811b82166054840152606883018490526001600160c01b031960c08a901b1660888401526090830188905286901b1660b0820152909150600090612fa1908490612f9b9060c401604051602081830303815290604052805190602001206040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b906134d9565b9050612fac816116f4565b6130045760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a205349474e45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610981565b42866001600160401b0316116130665760405162461bcd60e51b815260206004820152602160248201527f4d696e74696e674d616e616765723a20455850495245445f5349474e415455526044820152604560f81b6064820152608401610981565b505050505050505050565b60006130b88a6130818a8c614483565b61308b898b614483565b613095888a614483565b60008f6001600160a01b03166130a961202c565b6001600160a01b03161461234f565b9050896001600160a01b03166130cc61202c565b6001600160a01b0316827fa545b6fd3355e8d57f8c8147bafe740545bd3ea1f94bef2576a6d532a7c3b60586866040516131199291909182526001600160a01b0316602082015260400190565b60405180910390a450505050505050505050565b600081815260cd60205260408120805482919061314990614792565b9050119050919050565b61315b61293b565b6001600160a01b0381166131c05760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610981565b610cf481612c00565b610d8182826128b4565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b03163303613214575060331936013560601c90565b503390565b6040805180820190915260008082526020820152604051806040016040528083815260200184866020015161324e9190614aac565b9052949350505050565b6000815160000361326b57506000919050565b60208201805160f81c60308110801590613289575060398160ff1611155b1580156132ab575060618160ff16101580156132a95750607a8160ff1611155b155b156132ba575060009392505050565b83516001811115613328576132dc836132d4600184614658565b015160f81c90565b915060308260ff16101580156132f6575060398260ff1611155b158015613318575060618260ff16101580156133165750607a8260ff1611155b155b1561332857506000949350505050565b60015b613336600183614658565b8110156133b0578381015160f81c9250602d831480159061336c575060308360ff161015801561336a575060398360ff1611155b155b801561338d575060618360ff161015801561338b5750607a8360ff1611155b155b1561339e5750600095945050505050565b806133a8816146c7565b91505061332b565b50600195945050505050565b6133c58161170e565b156134125760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610981565b610cf4816134fd565b600080613432600084600186516110169190614658565b60ca549091506001600160a01b03161580159061346e5750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b61347f828261156e565b610d8157613497816001600160a01b03166014613581565b6134a2836020613581565b6040516020016134b3929190614abf565b60408051601f198184030181529082905262461bcd60e51b82526109819160040161400a565b60008060006134e8858561371c565b915091506134f581613761565b509392505050565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260019061353c90606001611749565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b60606000613590836002614b34565b61359b906002614aac565b6001600160401b038111156135b2576135b2613dc1565b6040519080825280601f01601f1916602001820160405280156135dc576020820181803683370190505b509050600360fc1b816000815181106135f7576135f761466b565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106136265761362661466b565b60200101906001600160f81b031916908160001a905350600061364a846002614b34565b613655906001614aac565b90505b60018111156136cd576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106136895761368961466b565b1a60f81b82828151811061369f5761369f61466b565b60200101906001600160f81b031916908160001a90535060049490941c936136c681614908565b9050613658565b50831561346e5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610981565b60008082516041036137525760208301516040840151606085015160001a61374687828585613917565b9450945050505061375a565b506000905060025b9250929050565b600081600481111561377557613775614b4b565b0361377d5750565b600181600481111561379157613791614b4b565b036137de5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610981565b60028160048111156137f2576137f2614b4b565b0361383f5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610981565b600381600481111561385357613853614b4b565b036138ab5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610981565b60048160048111156138bf576138bf614b4b565b03610cf45760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610981565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561394e57506000905060036139fb565b8460ff16601b1415801561396657508460ff16601c14155b1561397757506000905060046139fb565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa1580156139cb573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166139f4576000600192509250506139fb565b9150600090505b94509492505050565b508054613a1090614792565b6000825580601f10613a20575050565b601f016020900490600052602060002090810190610cf491905b80821115613a4e5760008155600101613a3a565b5090565b600060208284031215613a6457600080fd5b81356001600160e01b03198116811461346e57600080fd5b6001600160401b0381168114610cf457600080fd5b8035613a9c81613a7c565b919050565b60008060408385031215613ab457600080fd5b8235613abf81613a7c565b946020939093013593505050565b600060208284031215613adf57600080fd5b5035919050565b60008083601f840112613af857600080fd5b5081356001600160401b03811115613b0f57600080fd5b60208301915083602082850101111561375a57600080fd5b600080600060408486031215613b3c57600080fd5b8335925060208401356001600160401b03811115613b5957600080fd5b613b6586828701613ae6565b9497909650939450505050565b6001600160a01b0381168114610cf457600080fd5b8035613a9c81613b72565b60008060408385031215613ba557600080fd5b823591506020830135613bb781613b72565b809150509250929050565b600060208284031215613bd457600080fd5b813561346e81613b72565b60008083601f840112613bf157600080fd5b5081356001600160401b03811115613c0857600080fd5b6020830191508360208260051b850101111561375a57600080fd5b8015158114610cf457600080fd5b60008060008060008060008060a0898b031215613c4d57600080fd5b8835613c5881613b72565b975060208901356001600160401b0380821115613c7457600080fd5b613c808c838d01613bdf565b909950975060408b0135915080821115613c9957600080fd5b613ca58c838d01613bdf565b909750955060608b0135915080821115613cbe57600080fd5b50613ccb8b828c01613bdf565b9094509250506080890135613cdf81613c23565b809150509295985092959890939650565b600080600080600080600080600060c08a8c031215613d0e57600080fd5b8935613d1981613b72565b985060208a01356001600160401b0380821115613d3557600080fd5b613d418d838e01613bdf565b909a50985060408c0135915080821115613d5a57600080fd5b613d668d838e01613bdf565b909850965060608c0135915080821115613d7f57600080fd5b50613d8c8c828d01613bdf565b90955093505060808a0135613da081613a7c565b915060a08a0135613db081613c23565b809150509295985092959850929598565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715613dff57613dff613dc1565b604052919050565b60006001600160401b03821115613e2057613e20613dc1565b5060051b60200190565b60006020808385031215613e3d57600080fd5b82356001600160401b03811115613e5357600080fd5b8301601f81018513613e6457600080fd5b8035613e77613e7282613e07565b613dd7565b81815260059190911b82018301908381019087831115613e9657600080fd5b928401925b82841015613ebd578335613eae81613b72565b82529284019290840190613e9b565b979650505050505050565b60008060008060608587031215613ede57600080fd5b8435613ee981613b72565b93506020850135925060408501356001600160401b03811115613f0b57600080fd5b613f1787828801613ae6565b95989497509550505050565b60008060208385031215613f3657600080fd5b82356001600160401b03811115613f4c57600080fd5b613f5885828601613ae6565b90969095509350505050565b600080600060408486031215613f7957600080fd5b83356001600160401b03811115613f8f57600080fd5b613f9b86828701613ae6565b9094509250506020840135613faf81613c23565b809150509250925092565b60005b83811015613fd5578181015183820152602001613fbd565b50506000910152565b60008151808452613ff6816020860160208601613fba565b601f01601f19169290920160200192915050565b60208152600061346e6020830184613fde565b60008060008060008060c0878903121561403657600080fd5b863561404181613b72565b9550602087013561405181613b72565b9450604087013561406181613b72565b9350606087013561407181613b72565b9250608087013561408181613b72565b915060a087013561409181613b72565b809150509295509295509295565b60008060008060008060008060a0898b0312156140bb57600080fd5b88356140c681613b72565b97506020890135965060408901356001600160401b03808211156140e957600080fd5b6140f58c838d01613ae6565b909850965060608b013591508082111561410e57600080fd5b61411a8c838d01613bdf565b909650945060808b013591508082111561413357600080fd5b506141408b828c01613bdf565b999c989b5096995094979396929594505050565b6000806020838503121561416757600080fd5b82356001600160401b0381111561417d57600080fd5b613f5885828601613bdf565b600080600080600080600080600080600060e08c8e0312156141aa57600080fd5b6141b38c613b87565b9a506001600160401b038060208e013511156141ce57600080fd5b6141de8e60208f01358f01613bdf565b909b50995060408d01358110156141f457600080fd5b6142048e60408f01358f01613bdf565b909950975060608d013581101561421a57600080fd5b61422a8e60608f01358f01613bdf565b909750955061423b60808e01613a91565b945060a08d013593508060c08e0135111561425557600080fd5b506142668d60c08e01358e01613ae6565b81935080925050509295989b509295989b9093969950565b6000806000806000806000806000806000806101008d8f0312156142a157600080fd5b6142aa8d613b87565b9b506001600160401b0360208e013511156142c457600080fd5b6142d48e60208f01358f01613bdf565b909b5099506001600160401b0360408e013511156142f157600080fd5b6143018e60408f01358f01613bdf565b90995097506001600160401b0360608e0135111561431e57600080fd5b61432e8e60608f01358f01613bdf565b909750955061433f60808e01613a91565b945061434d60a08e01613b87565b935060c08d013592506001600160401b0360e08e0135111561436e57600080fd5b61437e8e60e08f01358f01613ae6565b81935080925050509295989b509295989b509295989b565b600080604083850312156143a957600080fd5b82356143b481613b72565b91506020830135613bb781613b72565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60006020828403121561440b57600080fd5b815161346e81613a7c565b60208082526023908201527f4d696e74696e674d616e616765723a20544f4b454e5f4e4f545f455850495241604082015262424c4560e81b606082015260800190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b6000614491613e7284613e07565b80848252602080830192508560051b8501368111156144af57600080fd5b855b818110156145415780356001600160401b03808211156144d15760008081fd5b90880190601f36818401126144e65760008081fd5b8235828111156144f8576144f8613dc1565b614509818301601f19168801613dd7565b9250808352368782860101111561452257600091508182fd5b80878501888501376000908301870152508652509382019382016144b1565b50919695505050505050565b60208082526024908201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604082015263272a22a960e11b606082015260800190565b6000602082840312156145a357600080fd5b815161346e81613c23565b6020808252602f908201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060408201526e282927ab22a22fa7a92fa7aba722a960891b606082015260800190565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b8181038181111561095457610954614642565b634e487b7160e01b600052603260045260246000fd5b60208082526026908201527f4d696e74696e674d616e616765723a20535542444f4d41494e535f4e4f545f41604082015265131313d5d15160d21b606082015260800190565b6000600182016146d9576146d9614642565b5060010190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b60006020828403121561476357600080fd5b5051919050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c908216806147a657607f821691505b6020821081036147c657634e487b7160e01b600052602260045260246000fd5b50919050565b6000602082840312156147de57600080fd5b815161346e81613b72565b600081518084526020808501808196508360051b8101915082860160005b8581101561483157828403895261481f848351613fde565b98850198935090840190600101614807565b5091979650505050505050565b6001600160a01b038616815260a060208201819052600090614862908301876147e9565b828103604084015261487481876147e9565b9050828103606084015261488881866147e9565b91505082151560808301529695505050505050565b600060018060a01b038086168352606060208401526148bf6060840186613fde565b9150808416604084015250949350505050565b6060815260006148e560608301866147e9565b82810360208401526148f781866147e9565b915050826040830152949350505050565b60008161491757614917614642565b506000190190565b60008251614931818460208701613fba565b9190910192915050565b601f821115610cde57600081815260208120601f850160051c810160208610156149625750805b601f850160051c820191505b818110156116a35782815560010161496e565b81516001600160401b0381111561499a5761499a613dc1565b6149ae816149a88454614792565b8461493b565b602080601f8311600181146149e357600084156149cb5750858301515b600019600386901b1c1916600185901b1785556116a3565b600085815260208120601f198616915b82811015614a12578886015182559484019460019091019084016149f3565b5085821015614a305787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b828152604060208201526000614a596040830184613fde565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b8082018082111561095457610954614642565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351614af7816017850160208801613fba565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351614b28816028840160208801613fba565b01602801949350505050565b808202811582820484141761095457610954614642565b634e487b7160e01b600052602160045260246000fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
exports.MintingManager__factory = MintingManager__factory;
MintingManager__factory.bytecode = _bytecode;
MintingManager__factory.abi = _abi;
