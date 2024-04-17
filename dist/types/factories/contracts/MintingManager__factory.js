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
const _bytecode = "0x608060405234801561001057600080fd5b50614f20806100206000396000f3fe6080604052600436106102ae5760003560e01c8063906cecc111610175578063b9998a24116100dc578063d547741f11610095578063f2fde38b1161006f578063f2fde38b14610892578063f5243bc4146108b2578063f940e385146108d2578063ffa1ad74146108f257600080fd5b8063d547741f1461083f578063d7db74c71461085f578063ec5273891461087257600080fd5b8063b9998a241461077d578063cc2a9a5b1461079d578063cc2c3fc4146107bd578063ceeb4f50146107dd578063d1f5692c146107fd578063d53913931461081d57600080fd5b8063a3a3f7f61161012e578063a3a3f7f614610690578063a3f4df7e146106b0578063a849d65c146106fd578063aa271e1a1461071d578063b0aa98c71461073d578063b3ab15fb1461075d57600080fd5b8063906cecc1146105e657806391d1485414610606578063983b2d5614610626578063986502751461064657806399e0dd7c1461065b578063a217fddf1461067b57600080fd5b80635b6fa8db11610219578063715018a6116101d2578063715018a61461054b57806371e2a6571461056057806377a2a5891461058057806381c81d35146105a05780638456cb59146105b35780638da5cb5b146105c857600080fd5b80635b6fa8db146104a35780635c975abb146104c35780635cd7e3b3146104d85780635e22cd86146104f85780635fc1964f14610518578063634486da1461053857600080fd5b80633092afd51161026b5780633092afd5146103a857806336568abe146103c85780633f41b614146103e85780633f4ba83a1461042057806351cff8d914610435578063572b6c051461045557600080fd5b806301ffc9a7146102b35780631edb948e146102e857806320c5429b1461030a578063248a9ca31461032a578063268b15ed146103685780632f2ff15d14610388575b600080fd5b3480156102bf57600080fd5b506102d36102ce366004613dc4565b610923565b60405190151581526020015b60405180910390f35b3480156102f457600080fd5b50610308610303366004613e13565b61095a565b005b34801561031657600080fd5b50610308610325366004613e3f565b610b03565b34801561033657600080fd5b5061035a610345366004613e3f565b60009081526097602052604090206001015490565b6040519081526020016102df565b34801561037457600080fd5b50610308610383366004613e99565b610c26565b34801561039457600080fd5b506103086103a3366004613f04565b610cb9565b3480156103b457600080fd5b506103086103c3366004613f34565b610ce3565b3480156103d457600080fd5b506103086103e3366004613f04565b610cf7565b3480156103f457600080fd5b5060c954610408906001600160a01b031681565b6040516001600160a01b0390911681526020016102df565b34801561042c57600080fd5b50610308610d85565b34801561044157600080fd5b50610308610450366004613f34565b610d97565b34801561046157600080fd5b506102d3610470366004613f34565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b3480156104af57600080fd5b5060cc54610408906001600160a01b031681565b3480156104cf57600080fd5b506102d3610e37565b3480156104e457600080fd5b506103086104f3366004613fa3565b610e4d565b34801561050457600080fd5b50610308610513366004614062565b6110b1565b34801561052457600080fd5b5061030861053336600461419c565b6112f6565b610308610546366004613f34565b61133e565b34801561055757600080fd5b50610308611401565b34801561056c57600080fd5b5061030861057b36600461419c565b611413565b34801561058c57600080fd5b5060ce54610408906001600160a01b031681565b6103086105ae366004613f34565b61145b565b3480156105bf57600080fd5b506103086114d8565b3480156105d457600080fd5b506033546001600160a01b0316610408565b3480156105f257600080fd5b5061030861060136600461423a565b6114e8565b34801561061257600080fd5b506102d3610621366004613f04565b61156e565b34801561063257600080fd5b50610308610641366004613f34565b611599565b34801561065257600080fd5b506103086115aa565b34801561066757600080fd5b50610308610676366004614295565b6115c4565b34801561068757600080fd5b5061035a600081565b34801561069c57600080fd5b506103086106ab3660046142d6565b6116ab565b3480156106bc57600080fd5b506106f0604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102df919061437c565b34801561070957600080fd5b5060cb54610408906001600160a01b031681565b34801561072957600080fd5b506102d3610738366004613f34565b6116f4565b34801561074957600080fd5b506102d3610758366004613e3f565b61170e565b34801561076957600080fd5b50610308610778366004613f34565b61176c565b34801561078957600080fd5b50610308610798366004613f34565b611796565b3480156107a957600080fd5b506103086107b836600461438f565b6117db565b3480156107c957600080fd5b5060ca54610408906001600160a01b031681565b3480156107e957600080fd5b506103086107f8366004614411565b611cd2565b34801561080957600080fd5b506103086108183660046144c6565b611d76565b34801561082957600080fd5b5061035a600080516020614ef483398151915281565b34801561084b57600080fd5b5061030861085a366004613f04565b611e2d565b61030861086d3660046144fb565b611e52565b34801561087e57600080fd5b5061030861088d366004613e3f565b611fe2565b34801561089e57600080fd5b506103086108ad366004613f34565b612054565b3480156108be57600080fd5b506103086108cd3660046145f0565b612070565b3480156108de57600080fd5b506103086108ed366004614708565b612222565b3480156108fe57600080fd5b506106f060405180604001604052806005815260200164302e352e3160d81b81525081565b60006001600160e01b03198216637965db0b60e01b148061095457506301ffc9a760e01b6001600160e01b03198316145b92915050565b61096561073861239e565b61098a5760405162461bcd60e51b815260040161098190614736565b60405180910390fd5b60c95460405163baef73e960e01b8152600481018390526000916001600160a01b03169063baef73e990602401602060405180830381865afa1580156109d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f8919061476b565b9050806001600160401b0316600003610a235760405162461bcd60e51b815260040161098190614788565b806001600160401b0316836001600160401b031611610a905760405162461bcd60e51b815260206004820152602360248201527f4d696e74696e674d616e616765723a204558504952595f4e4f545f455854454e60448201526211115160ea1b6064820152608401610981565b60c954604051631fb9763760e11b81526001600160401b0385166004820152602481018490526001600160a01b0390911690633f72ec6e906044015b600060405180830381600087803b158015610ae657600080fd5b505af1158015610afa573d6000803e3d6000fd5b50505050505050565b610b0e61073861239e565b610b2a5760405162461bcd60e51b815260040161098190614736565b60c95460405163baef73e960e01b8152600481018390526001600160a01b039091169063baef73e990602401602060405180830381865afa158015610b73573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b97919061476b565b6001600160401b0316600003610bbf5760405162461bcd60e51b815260040161098190614788565b60c954604051637eee288d60e01b8152306004820152602481018390526001600160a01b0390911690637eee288d90604401600060405180830381600087803b158015610c0b57600080fd5b505af1158015610c1f573d6000803e3d6000fd5b5050505050565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250610c6993508592508491506123ad565b610c71610e37565b15610c8e5760405162461bcd60e51b8152600401610981906147cb565b6060610afa610c9b61239e565b610cae88610ca98989612584565b6125b0565b8384600060016126c1565b600082815260976020526040902060010154610cd481612c15565b610cde8383612c26565b505050565b610ceb612cad565b610cf481612d26565b50565b610cff61239e565b6001600160a01b0316816001600160a01b031614610d775760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610981565b610d818282612d3e565b5050565b610d8d612cad565b610d95612dc3565b565b610d9f612cad565b6001600160a01b038116610db257600080fd5b60405147906001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610dea573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905260008183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a15050565b600080516020614ed48339815191525460ff1690565b610e5786886147f5565b8051600203610e8c57610e6b61073861239e565b610e875760405162461bcd60e51b8152600401610981906148bf565b610fd1565b6000610e9782612e6b565b60c9549092506001600160a01b0316905063430c2081610eb561239e565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610f00573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f249190614903565b80610fb3575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610f7d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fa19190614903565b8015610fb35750610fb361073861239e565b610fcf5760405162461bcd60e51b815260040161098190614920565b505b610fdb87896147f5565b6000600282511015610fff5760405162461bcd60e51b81526004016109819061496f565b6110546110336000846001865161101691906149ca565b81518110611026576110266149dd565b6020026020010151612ea6565b83600081518110611046576110466149dd565b6020026020010151836123ad565b61105c610e37565b156110795760405162461bcd60e51b8152600401610981906147cb565b6110a38b6110878b8d6147f5565b6110918a8c6147f5565b61109b898b6147f5565b6000896126c1565b505050505050505050505050565b6110bb87896147f5565b80516002036110f0576110cf61073861239e565b6110eb5760405162461bcd60e51b8152600401610981906148bf565b611235565b60006110fb82612e6b565b60c9549092506001600160a01b0316905063430c208161111961239e565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015611164573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111889190614903565b80611217575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa1580156111e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112059190614903565b8015611217575061121761073861239e565b6112335760405162461bcd60e51b815260040161098190614920565b505b61123f888a6147f5565b836002825110156112625760405162461bcd60e51b81526004016109819061496f565b6112796110336000846001865161101691906149ca565b611281610e37565b1561129e5760405162461bcd60e51b8152600401610981906147cb565b60028a146112be5760405162461bcd60e51b8152600401610981906149f3565b6112e78c6112cc8c8e6147f5565b6112d68b8d6147f5565b6112e08a8c6147f5565b89896126c1565b50505050505050505050505050565b6112fe612cad565b60005b8151811015610d815761132c82828151811061131f5761131f6149dd565b6020026020010151612d26565b8061133681614a39565b915050611301565b61134961073861239e565b6113655760405162461bcd60e51b815260040161098190614736565b6001600160a01b0381166113bb5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610981565b6113c481612f5a565b6113cc6115aa565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610d81573d6000803e3d6000fd5b611409612cad565b610d956000612f72565b61141b612cad565b60005b8151811015610d815761144982828151811061143c5761143c6149dd565b6020026020010151612f5a565b8061145381614a39565b91505061141e565b61146661073861239e565b6114825760405162461bcd60e51b815260040161098190614736565b6001600160a01b0381166113c45760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610981565b6114e0612cad565b610d95612fc4565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525061152b93508592508491506123ad565b611533610e37565b156115505760405162461bcd60e51b8152600401610981906147cb565b606061156487610cae88610ca98989612584565b5050505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6115a1612cad565b610cf481612f5a565b610d95600080516020614ef48339815191526103e361239e565b6115cc612cad565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906115fe9085908590600401614a52565b600060405180830381600087803b15801561161857600080fd5b505af115801561162c573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610d8190505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906116759085908590600401614a52565b600060405180830381600087803b15801561168f57600080fd5b505af11580156116a3573d6000803e3d6000fd5b505050505050565b6116b3612cad565b610cde83838080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525085925061302c915050565b6000610954600080516020614ef48339815191528361156e565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611762906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b611774612cad565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b61179e612cad565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b600054610100900460ff16158080156117fb5750600054600160ff909116105b806118155750303b158015611815575060005460ff166001145b6118785760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610981565b6000805460ff19166001179055801561189b576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce80549091169185169190911790556118f961314c565b611901613183565b61190a826131bc565b6119126131e3565b6040805161036081018252600661032082018181526563727970746f60d01b610340840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752828152621e9a5b60ea1b8185015261010086015285518087018752908152663837b63cb3b7b760c91b8184015261012085015284518086018652600b81526a756e73746f707061626c6560a81b81840152610140850152845180860186528381526535b632bb32b960d11b8184015261016085015284518086018652600280825261686960f01b8285015261018086019190915285518087018752848152656b726573757360d01b818501526101a086015285518087018752600580825264616e696d6560d81b828601526101c087019190915286518088018852818152646d616e676160d81b818601526101e087015286518088018852600981526862696e616e6365757360b81b8186015261020087015286518088018852818152647265616c6d60d81b818601526102208701528651808801885291825261676f60f01b82850152610240860191909152855180870187526008815267185b1d1a5b5a5cdd60c21b818501526102608601528551808701875290815264707564677960d81b81840152610280850152845180860186528381526530bab9ba34b760d11b818401526102a08501528451808601865292835265189a5d19d95d60d21b838301526102c08401929092528351808501855291825262706f6760e81b828201526102e083019190915282518084019093526004835263636c617960e01b9083015261030081019190915260005b6019811015611c5c57611c4a828260198110611c3e57611c3e6149dd565b6020020151600061302c565b80611c5481614a39565b915050611c20565b50611c8360405180604001604052806003815260200162636f6d60e81b815250600161302c565b508015610afa576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250611d1593508592508491506123ad565b611d1d610e37565b15611d3a5760405162461bcd60e51b8152600401610981906147cb565b611d698a611d4c8b610ca98c8c612584565b611d56888a6147f5565b611d6087896147f5565b600060016126c1565b5050505050505050505050565b611d7e612cad565b60005b81811015610cde5760c9546001600160a01b03166350960239848484818110611dac57611dac6149dd565b9050602002016020810190611dc19190613f34565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b158015611e0257600080fd5b505af1158015611e16573d6000803e3d6000fd5b505050508080611e2590614a39565b915050611d81565b600082815260976020526040902060010154611e4881612c15565b610cde8383612d3e565b611e5c898b6147f5565b6000600282511015611e805760405162461bcd60e51b81526004016109819061496f565b611e976110336000846001865161101691906149ca565b611e9f610e37565b15611ebc5760405162461bcd60e51b8152600401610981906147cb565b60028b14611edc5760405162461bcd60e51b8152600401610981906149f3565b611f228d8d8d898960008a8a8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061322392505050565b84341015611f725760405162461bcd60e51b815260206004820181905260248201527f4d696e74696e674d616e616765723a204e4f545f454e4f5547485f46554e44536044820152606401610981565b611f848d8d8d8d8d8d8d8c60006133e3565b843411156112e757611f9461239e565b6001600160a01b03166108fc611faa87346149ca565b6040518115909202916000818181858888f19350505050158015611fd2573d6000803e3d6000fd5b5050505050505050505050505050565b611fea612cad565b611ff38161349f565b61200f5760405162461bcd60e51b815260040161098190614a81565b600081815260cd6020526040812061202691613d76565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b61205c612cad565b612065816134c5565b610cf460008261353b565b61207a8a8c6147f5565b600060028251101561209e5760405162461bcd60e51b81526004016109819061496f565b6120b56110336000846001865161101691906149ca565b6120bd610e37565b156120da5760405162461bcd60e51b8152600401610981906147cb565b60028c146120fa5760405162461bcd60e51b8152600401610981906149f3565b61213f8e8e8e8a898b8a8a8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061322392505050565b856001600160a01b03166323b872dd61215661239e565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018890526064016020604051808303816000875af11580156121a9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121cd9190614903565b6122115760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610981565b611fd28e8e8e8e8e8e8e8c8e6133e3565b61222a612cad565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa158015612271573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122959190614ac3565b60405163a9059cbb60e01b81526001600160a01b038481166004830152602482018390529192509084169063a9059cbb906044016020604051808303816000875af11580156122e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061230c9190614903565b6123505760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610981565b604080516001600160a01b0384811682526020820184905285168183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a1505050565b60006123a8613545565b905090565b6123b68361349f565b6123d25760405162461bcd60e51b815260040161098190614a81565b600083815260cf602052604090205460ff1615156001600160401b03821615151461244e5760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544c445f455850495241424c455f4d496044820152650a69a82a886960d31b6064820152608401610981565b60006124818360408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115612529576124ac6124a0826000600a61358b565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8036125295760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610981565b612532836135ca565b61257e5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c49440000006044820152606401610981565b50505050565b60608282604051602001612599929190614adc565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b60608152602001906001900390816125ca57905050905082816000815181106125f5576125f56149dd565b602002602001018190525060cd6000858152602001908152602001600020805461261e90614b04565b80601f016020809104026020016040519081016040528092919081815260200182805461264a90614b04565b80156126975780601f1061266c57610100808354040283529160200191612697565b820191906000526020600020905b81548152906001019060200180831161267a57829003601f168201915b5050505050816001815181106126af576126af6149dd565b60209081029190910101529392505050565b60008060006126cf88612e6b565b915091508380156126e1575060028851115b8015612763575060c9546040516331a9108f60e11b8152600481018390526001600160a01b038b8116921690636352211e90602401602060405180830381865afa158015612733573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127579190614b3e565b6001600160a01b031614155b156127c35760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b6064820152608401610981565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa15801561280c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128309190614903565b8015612921575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa158015612880573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128a49190614b3e565b6001600160a01b03161480612921575060c95460405163d9548e5360e01b8152600481018490526001600160a01b039091169063d9548e5390602401602060405180830381865afa1580156128fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129219190614903565b15612a12576001600160401b038516156129a35760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b15801561298a57600080fd5b505af115801561299e573d6000803e3d6000fd5b505050505b60c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be06906129db908c908c908c908c908b90600401614bb0565b600060405180830381600087803b1580156129f557600080fd5b505af1158015612a09573d6000803e3d6000fd5b50505050612c09565b612a1b8261372e565b612a248861378d565b8015612a31575087516002145b8015612a4457506001600160401b038516155b15612b225760ca5488516001600160a01b039091169063c36c2125908b908b90600090612a7357612a736149dd565b602090810291909101015160cc546040516001600160e01b031960e086901b168152612aad9392916001600160a01b031690600401614c0f565b600060405180830381600087803b158015612ac757600080fd5b505af1158015612adb573d6000803e3d6000fd5b50505050600087511115612b1d5760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae74906129db908a908a908790600401614c44565b612c09565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790612b5a908c908c908c908c908b90600401614bb0565b600060405180830381600087803b158015612b7457600080fd5b505af1158015612b88573d6000803e3d6000fd5b505050506001600160401b03851615612c095760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b158015612bf057600080fd5b505af1158015612c04573d6000803e3d6000fd5b505050505b50979650505050505050565b610cf481612c2161239e565b6137e7565b612c30828261156e565b610d815760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612c6961239e565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612cb561239e565b6001600160a01b0316612cd06033546001600160a01b031690565b6001600160a01b031614610d955760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610981565b610cf4600080516020614ef483398151915282611e2d565b612d48828261156e565b15610d815760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612d7f61239e565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b612dcb610e37565b612e0e5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610981565b600080516020614ed4833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa612e4e61239e565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b8015612ea057829150612e8c82856110166001856149ca565b925080612e9881614c7a565b915050612e73565b50915091565b60008151600003612ef95760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610981565b8282604051602001612f0b9190614c91565b60405160208183030381529060405280519060200120604051602001612f3b929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610cf4600080516020614ef48339815191528261353b565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b612fcc610e37565b15612fe95760405162461bcd60e51b8152600401610981906147cb565b600080516020614ed4833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612e4e61239e565b6000613039600084612ea6565b600081815260cd602052604090209091506130548482614cf3565b50600081815260cf602052604090819020805460ff19168415151790555181907f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980906130a190869061437c565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa1580156130f2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906131169190614903565b610cde5760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c6090610acc9084908790600401614db2565b600054610100900460ff166131735760405162461bcd60e51b815260040161098190614dd3565b610d9561317e61239e565b612f72565b600054610100900460ff166131aa5760405162461bcd60e51b815260040161098190614dd3565b610d9560006131b761239e565b61353b565b600054610100900460ff1661179e5760405162461bcd60e51b815260040161098190614dd3565b600054610100900460ff1661320a5760405162461bcd60e51b815260040161098190614dd3565b600080516020614ed4833981519152805460ff19169055565b600061323761323287896147f5565b612e6b565b506040516bffffffffffffffffffffffff1930606090811b821660208401524660348401528b811b82166054840152606883018490526001600160c01b031960c08a901b1660888401526090830188905286901b1660b082015290915060009061331390849061330d9060c401604051602081830303815290604052805190602001206040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b9061384b565b905061331e816116f4565b6133765760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a205349474e45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610981565b42866001600160401b0316116133d85760405162461bcd60e51b815260206004820152602160248201527f4d696e74696e674d616e616765723a20455850495245445f5349474e415455526044820152604560f81b6064820152608401610981565b505050505050505050565b600061342a8a6133f38a8c6147f5565b6133fd898b6147f5565b613407888a6147f5565b60008f6001600160a01b031661341b61239e565b6001600160a01b0316146126c1565b9050896001600160a01b031661343e61239e565b6001600160a01b0316827fa545b6fd3355e8d57f8c8147bafe740545bd3ea1f94bef2576a6d532a7c3b605868660405161348b9291909182526001600160a01b0316602082015260400190565b60405180910390a450505050505050505050565b600081815260cd6020526040812080548291906134bb90614b04565b9050119050919050565b6134cd612cad565b6001600160a01b0381166135325760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610981565b610cf481612f72565b610d818282612c26565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b03163303613586575060331936013560601c90565b503390565b604080518082019091526000808252602082015260405180604001604052808381526020018486602001516135c09190614e1e565b9052949350505050565b600081516000036135dd57506000919050565b60208201805160f81c603081108015906135fb575060398160ff1611155b15801561361d575060618160ff161015801561361b5750607a8160ff1611155b155b1561362c575060009392505050565b8351600181111561369a5761364e836136466001846149ca565b015160f81c90565b915060308260ff1610158015613668575060398260ff1611155b15801561368a575060618260ff16101580156136885750607a8260ff1611155b155b1561369a57506000949350505050565b60015b6136a86001836149ca565b811015613722578381015160f81c9250602d83148015906136de575060308360ff16101580156136dc575060398360ff1611155b155b80156136ff575060618360ff16101580156136fd5750607a8360ff1611155b155b156137105750600095945050505050565b8061371a81614a39565b91505061369d565b50600195945050505050565b6137378161170e565b156137845760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610981565b610cf48161386f565b6000806137a46000846001865161101691906149ca565b60ca549091506001600160a01b0316158015906137e05750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6137f1828261156e565b610d8157613809816001600160a01b031660146138f3565b6138148360206138f3565b604051602001613825929190614e31565b60408051601f198184030181529082905262461bcd60e51b82526109819160040161437c565b600080600061385a8585613a8e565b9150915061386781613ad3565b509392505050565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526001906138ae90606001611749565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b60606000613902836002614ea6565b61390d906002614e1e565b6001600160401b0381111561392457613924614133565b6040519080825280601f01601f19166020018201604052801561394e576020820181803683370190505b509050600360fc1b81600081518110613969576139696149dd565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110613998576139986149dd565b60200101906001600160f81b031916908160001a90535060006139bc846002614ea6565b6139c7906001614e1e565b90505b6001811115613a3f576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106139fb576139fb6149dd565b1a60f81b828281518110613a1157613a116149dd565b60200101906001600160f81b031916908160001a90535060049490941c93613a3881614c7a565b90506139ca565b5083156137e05760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610981565b6000808251604103613ac45760208301516040840151606085015160001a613ab887828585613c89565b94509450505050613acc565b506000905060025b9250929050565b6000816004811115613ae757613ae7614ebd565b03613aef5750565b6001816004811115613b0357613b03614ebd565b03613b505760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610981565b6002816004811115613b6457613b64614ebd565b03613bb15760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610981565b6003816004811115613bc557613bc5614ebd565b03613c1d5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610981565b6004816004811115613c3157613c31614ebd565b03610cf45760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610981565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613cc05750600090506003613d6d565b8460ff16601b14158015613cd857508460ff16601c14155b15613ce95750600090506004613d6d565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613d3d573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613d6657600060019250925050613d6d565b9150600090505b94509492505050565b508054613d8290614b04565b6000825580601f10613d92575050565b601f016020900490600052602060002090810190610cf491905b80821115613dc05760008155600101613dac565b5090565b600060208284031215613dd657600080fd5b81356001600160e01b0319811681146137e057600080fd5b6001600160401b0381168114610cf457600080fd5b8035613e0e81613dee565b919050565b60008060408385031215613e2657600080fd5b8235613e3181613dee565b946020939093013593505050565b600060208284031215613e5157600080fd5b5035919050565b60008083601f840112613e6a57600080fd5b5081356001600160401b03811115613e8157600080fd5b602083019150836020828501011115613acc57600080fd5b600080600060408486031215613eae57600080fd5b8335925060208401356001600160401b03811115613ecb57600080fd5b613ed786828701613e58565b9497909650939450505050565b6001600160a01b0381168114610cf457600080fd5b8035613e0e81613ee4565b60008060408385031215613f1757600080fd5b823591506020830135613f2981613ee4565b809150509250929050565b600060208284031215613f4657600080fd5b81356137e081613ee4565b60008083601f840112613f6357600080fd5b5081356001600160401b03811115613f7a57600080fd5b6020830191508360208260051b8501011115613acc57600080fd5b8015158114610cf457600080fd5b60008060008060008060008060a0898b031215613fbf57600080fd5b8835613fca81613ee4565b975060208901356001600160401b0380821115613fe657600080fd5b613ff28c838d01613f51565b909950975060408b013591508082111561400b57600080fd5b6140178c838d01613f51565b909750955060608b013591508082111561403057600080fd5b5061403d8b828c01613f51565b909450925050608089013561405181613f95565b809150509295985092959890939650565b600080600080600080600080600060c08a8c03121561408057600080fd5b893561408b81613ee4565b985060208a01356001600160401b03808211156140a757600080fd5b6140b38d838e01613f51565b909a50985060408c01359150808211156140cc57600080fd5b6140d88d838e01613f51565b909850965060608c01359150808211156140f157600080fd5b506140fe8c828d01613f51565b90955093505060808a013561411281613dee565b915060a08a013561412281613f95565b809150509295985092959850929598565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b038111828210171561417157614171614133565b604052919050565b60006001600160401b0382111561419257614192614133565b5060051b60200190565b600060208083850312156141af57600080fd5b82356001600160401b038111156141c557600080fd5b8301601f810185136141d657600080fd5b80356141e96141e482614179565b614149565b81815260059190911b8201830190838101908783111561420857600080fd5b928401925b8284101561422f57833561422081613ee4565b8252928401929084019061420d565b979650505050505050565b6000806000806060858703121561425057600080fd5b843561425b81613ee4565b93506020850135925060408501356001600160401b0381111561427d57600080fd5b61428987828801613e58565b95989497509550505050565b600080602083850312156142a857600080fd5b82356001600160401b038111156142be57600080fd5b6142ca85828601613e58565b90969095509350505050565b6000806000604084860312156142eb57600080fd5b83356001600160401b0381111561430157600080fd5b61430d86828701613e58565b909450925050602084013561432181613f95565b809150509250925092565b60005b8381101561434757818101518382015260200161432f565b50506000910152565b6000815180845261436881602086016020860161432c565b601f01601f19169290920160200192915050565b6020815260006137e06020830184614350565b60008060008060008060c087890312156143a857600080fd5b86356143b381613ee4565b955060208701356143c381613ee4565b945060408701356143d381613ee4565b935060608701356143e381613ee4565b925060808701356143f381613ee4565b915060a087013561440381613ee4565b809150509295509295509295565b60008060008060008060008060a0898b03121561442d57600080fd5b883561443881613ee4565b97506020890135965060408901356001600160401b038082111561445b57600080fd5b6144678c838d01613e58565b909850965060608b013591508082111561448057600080fd5b61448c8c838d01613f51565b909650945060808b01359150808211156144a557600080fd5b506144b28b828c01613f51565b999c989b5096995094979396929594505050565b600080602083850312156144d957600080fd5b82356001600160401b038111156144ef57600080fd5b6142ca85828601613f51565b600080600080600080600080600080600060e08c8e03121561451c57600080fd5b6145258c613ef9565b9a506001600160401b038060208e0135111561454057600080fd5b6145508e60208f01358f01613f51565b909b50995060408d013581101561456657600080fd5b6145768e60408f01358f01613f51565b909950975060608d013581101561458c57600080fd5b61459c8e60608f01358f01613f51565b90975095506145ad60808e01613e03565b945060a08d013593508060c08e013511156145c757600080fd5b506145d88d60c08e01358e01613e58565b81935080925050509295989b509295989b9093969950565b6000806000806000806000806000806000806101008d8f03121561461357600080fd5b61461c8d613ef9565b9b506001600160401b0360208e0135111561463657600080fd5b6146468e60208f01358f01613f51565b909b5099506001600160401b0360408e0135111561466357600080fd5b6146738e60408f01358f01613f51565b90995097506001600160401b0360608e0135111561469057600080fd5b6146a08e60608f01358f01613f51565b90975095506146b160808e01613e03565b94506146bf60a08e01613ef9565b935060c08d013592506001600160401b0360e08e013511156146e057600080fd5b6146f08e60e08f01358f01613e58565b81935080925050509295989b509295989b509295989b565b6000806040838503121561471b57600080fd5b823561472681613ee4565b91506020830135613f2981613ee4565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60006020828403121561477d57600080fd5b81516137e081613dee565b60208082526023908201527f4d696e74696e674d616e616765723a20544f4b454e5f4e4f545f455850495241604082015262424c4560e81b606082015260800190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60006148036141e484614179565b80848252602080830192508560051b85013681111561482157600080fd5b855b818110156148b35780356001600160401b03808211156148435760008081fd5b90880190601f36818401126148585760008081fd5b82358281111561486a5761486a614133565b61487b818301601f19168801614149565b9250808352368782860101111561489457600091508182fd5b8087850188850137600090830187015250865250938201938201614823565b50919695505050505050565b60208082526024908201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604082015263272a22a960e11b606082015260800190565b60006020828403121561491557600080fd5b81516137e081613f95565b6020808252602f908201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060408201526e282927ab22a22fa7a92fa7aba722a960891b606082015260800190565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b81810381811115610954576109546149b4565b634e487b7160e01b600052603260045260246000fd5b60208082526026908201527f4d696e74696e674d616e616765723a20535542444f4d41494e535f4e4f545f41604082015265131313d5d15160d21b606082015260800190565b600060018201614a4b57614a4b6149b4565b5060010190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b600060208284031215614ad557600080fd5b5051919050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c90821680614b1857607f821691505b602082108103614b3857634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215614b5057600080fd5b81516137e081613ee4565b600081518084526020808501808196508360051b8101915082860160005b85811015614ba3578284038952614b91848351614350565b98850198935090840190600101614b79565b5091979650505050505050565b6001600160a01b038616815260a060208201819052600090614bd490830187614b5b565b8281036040840152614be68187614b5b565b90508281036060840152614bfa8186614b5b565b91505082151560808301529695505050505050565b600060018060a01b03808616835260606020840152614c316060840186614350565b9150808416604084015250949350505050565b606081526000614c576060830186614b5b565b8281036020840152614c698186614b5b565b915050826040830152949350505050565b600081614c8957614c896149b4565b506000190190565b60008251614ca381846020870161432c565b9190910192915050565b601f821115610cde57600081815260208120601f850160051c81016020861015614cd45750805b601f850160051c820191505b818110156116a357828155600101614ce0565b81516001600160401b03811115614d0c57614d0c614133565b614d2081614d1a8454614b04565b84614cad565b602080601f831160018114614d555760008415614d3d5750858301515b600019600386901b1c1916600185901b1785556116a3565b600085815260208120601f198616915b82811015614d8457888601518255948401946001909101908401614d65565b5085821015614da25787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b828152604060208201526000614dcb6040830184614350565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b80820180821115610954576109546149b4565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351614e6981601785016020880161432c565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351614e9a81602884016020880161432c565b01602801949350505050565b8082028115828204841417610954576109546149b4565b634e487b7160e01b600052602160045260246000fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
