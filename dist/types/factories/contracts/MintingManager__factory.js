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
const _bytecode = "0x608060405234801561001057600080fd5b50615039806100206000396000f3fe6080604052600436106102ae5760003560e01c8063906cecc111610175578063b9998a24116100dc578063d547741f11610095578063f2fde38b1161006f578063f2fde38b14610892578063f5243bc4146108b2578063f940e385146108d2578063ffa1ad74146108f257600080fd5b8063d547741f1461083f578063d7db74c71461085f578063ec5273891461087257600080fd5b8063b9998a241461077d578063cc2a9a5b1461079d578063cc2c3fc4146107bd578063ceeb4f50146107dd578063d1f5692c146107fd578063d53913931461081d57600080fd5b8063a3a3f7f61161012e578063a3a3f7f614610690578063a3f4df7e146106b0578063a849d65c146106fd578063aa271e1a1461071d578063b0aa98c71461073d578063b3ab15fb1461075d57600080fd5b8063906cecc1146105e657806391d1485414610606578063983b2d5614610626578063986502751461064657806399e0dd7c1461065b578063a217fddf1461067b57600080fd5b80635b6fa8db11610219578063715018a6116101d2578063715018a61461054b57806371e2a6571461056057806377a2a5891461058057806381c81d35146105a05780638456cb59146105b35780638da5cb5b146105c857600080fd5b80635b6fa8db146104a35780635c975abb146104c35780635cd7e3b3146104d85780635e22cd86146104f85780635fc1964f14610518578063634486da1461053857600080fd5b80633092afd51161026b5780633092afd5146103a857806336568abe146103c85780633f41b614146103e85780633f4ba83a1461042057806351cff8d914610435578063572b6c051461045557600080fd5b806301ffc9a7146102b35780631edb948e146102e857806320c5429b1461030a578063248a9ca31461032a578063268b15ed146103685780632f2ff15d14610388575b600080fd5b3480156102bf57600080fd5b506102d36102ce366004613edd565b610923565b60405190151581526020015b60405180910390f35b3480156102f457600080fd5b50610308610303366004613f2c565b61095a565b005b34801561031657600080fd5b50610308610325366004613f58565b610b03565b34801561033657600080fd5b5061035a610345366004613f58565b60009081526097602052604090206001015490565b6040519081526020016102df565b34801561037457600080fd5b50610308610383366004613fb2565b610c26565b34801561039457600080fd5b506103086103a336600461401d565b610cb9565b3480156103b457600080fd5b506103086103c336600461404d565b610ce3565b3480156103d457600080fd5b506103086103e336600461401d565b610cf7565b3480156103f457600080fd5b5060c954610408906001600160a01b031681565b6040516001600160a01b0390911681526020016102df565b34801561042c57600080fd5b50610308610d85565b34801561044157600080fd5b5061030861045036600461404d565b610d97565b34801561046157600080fd5b506102d361047036600461404d565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b3480156104af57600080fd5b5060cc54610408906001600160a01b031681565b3480156104cf57600080fd5b506102d3610e37565b3480156104e457600080fd5b506103086104f33660046140bc565b610e4d565b34801561050457600080fd5b5061030861051336600461417b565b6110b1565b34801561052457600080fd5b506103086105333660046142b5565b6112f6565b61030861054636600461404d565b61133e565b34801561055757600080fd5b50610308611401565b34801561056c57600080fd5b5061030861057b3660046142b5565b611413565b34801561058c57600080fd5b5060ce54610408906001600160a01b031681565b6103086105ae36600461404d565b61145b565b3480156105bf57600080fd5b506103086114d8565b3480156105d457600080fd5b506033546001600160a01b0316610408565b3480156105f257600080fd5b50610308610601366004614353565b6114e8565b34801561061257600080fd5b506102d361062136600461401d565b61156e565b34801561063257600080fd5b5061030861064136600461404d565b611599565b34801561065257600080fd5b506103086115aa565b34801561066757600080fd5b506103086106763660046143ae565b6115c4565b34801561068757600080fd5b5061035a600081565b34801561069c57600080fd5b506103086106ab3660046143ef565b6116ab565b3480156106bc57600080fd5b506106f0604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102df9190614495565b34801561070957600080fd5b5060cb54610408906001600160a01b031681565b34801561072957600080fd5b506102d361073836600461404d565b6116f4565b34801561074957600080fd5b506102d3610758366004613f58565b61170e565b34801561076957600080fd5b5061030861077836600461404d565b61176c565b34801561078957600080fd5b5061030861079836600461404d565b611796565b3480156107a957600080fd5b506103086107b83660046144a8565b6117db565b3480156107c957600080fd5b5060ca54610408906001600160a01b031681565b3480156107e957600080fd5b506103086107f836600461452a565b611deb565b34801561080957600080fd5b506103086108183660046145df565b611e8f565b34801561082957600080fd5b5061035a60008051602061500d83398151915281565b34801561084b57600080fd5b5061030861085a36600461401d565b611f46565b61030861086d366004614614565b611f6b565b34801561087e57600080fd5b5061030861088d366004613f58565b6120fb565b34801561089e57600080fd5b506103086108ad36600461404d565b61216d565b3480156108be57600080fd5b506103086108cd366004614709565b612189565b3480156108de57600080fd5b506103086108ed366004614821565b61233b565b3480156108fe57600080fd5b506106f060405180604001604052806005815260200164302e352e3160d81b81525081565b60006001600160e01b03198216637965db0b60e01b148061095457506301ffc9a760e01b6001600160e01b03198316145b92915050565b6109656107386124b7565b61098a5760405162461bcd60e51b81526004016109819061484f565b60405180910390fd5b60c95460405163baef73e960e01b8152600481018390526000916001600160a01b03169063baef73e990602401602060405180830381865afa1580156109d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f89190614884565b9050806001600160401b0316600003610a235760405162461bcd60e51b8152600401610981906148a1565b806001600160401b0316836001600160401b031611610a905760405162461bcd60e51b815260206004820152602360248201527f4d696e74696e674d616e616765723a204558504952595f4e4f545f455854454e60448201526211115160ea1b6064820152608401610981565b60c954604051631fb9763760e11b81526001600160401b0385166004820152602481018490526001600160a01b0390911690633f72ec6e906044015b600060405180830381600087803b158015610ae657600080fd5b505af1158015610afa573d6000803e3d6000fd5b50505050505050565b610b0e6107386124b7565b610b2a5760405162461bcd60e51b81526004016109819061484f565b60c95460405163baef73e960e01b8152600481018390526001600160a01b039091169063baef73e990602401602060405180830381865afa158015610b73573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b979190614884565b6001600160401b0316600003610bbf5760405162461bcd60e51b8152600401610981906148a1565b60c954604051637eee288d60e01b8152306004820152602481018390526001600160a01b0390911690637eee288d90604401600060405180830381600087803b158015610c0b57600080fd5b505af1158015610c1f573d6000803e3d6000fd5b5050505050565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250610c6993508592508491506124c6565b610c71610e37565b15610c8e5760405162461bcd60e51b8152600401610981906148e4565b6060610afa610c9b6124b7565b610cae88610ca9898961269d565b6126c9565b8384600060016127da565b600082815260976020526040902060010154610cd481612d2e565b610cde8383612d3f565b505050565b610ceb612dc6565b610cf481612e3f565b50565b610cff6124b7565b6001600160a01b0316816001600160a01b031614610d775760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610981565b610d818282612e57565b5050565b610d8d612dc6565b610d95612edc565b565b610d9f612dc6565b6001600160a01b038116610db257600080fd5b60405147906001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610dea573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905260008183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a15050565b600080516020614fed8339815191525460ff1690565b610e57868861490e565b8051600203610e8c57610e6b6107386124b7565b610e875760405162461bcd60e51b8152600401610981906149d8565b610fd1565b6000610e9782612f84565b60c9549092506001600160a01b0316905063430c2081610eb56124b7565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610f00573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f249190614a1c565b80610fb3575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610f7d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fa19190614a1c565b8015610fb35750610fb36107386124b7565b610fcf5760405162461bcd60e51b815260040161098190614a39565b505b610fdb878961490e565b6000600282511015610fff5760405162461bcd60e51b815260040161098190614a88565b611054611033600084600186516110169190614ae3565b8151811061102657611026614af6565b6020026020010151612fbf565b8360008151811061104657611046614af6565b6020026020010151836124c6565b61105c610e37565b156110795760405162461bcd60e51b8152600401610981906148e4565b6110a38b6110878b8d61490e565b6110918a8c61490e565b61109b898b61490e565b6000896127da565b505050505050505050505050565b6110bb878961490e565b80516002036110f0576110cf6107386124b7565b6110eb5760405162461bcd60e51b8152600401610981906149d8565b611235565b60006110fb82612f84565b60c9549092506001600160a01b0316905063430c20816111196124b7565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015611164573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111889190614a1c565b80611217575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa1580156111e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112059190614a1c565b801561121757506112176107386124b7565b6112335760405162461bcd60e51b815260040161098190614a39565b505b61123f888a61490e565b836002825110156112625760405162461bcd60e51b815260040161098190614a88565b611279611033600084600186516110169190614ae3565b611281610e37565b1561129e5760405162461bcd60e51b8152600401610981906148e4565b60028a146112be5760405162461bcd60e51b815260040161098190614b0c565b6112e78c6112cc8c8e61490e565b6112d68b8d61490e565b6112e08a8c61490e565b89896127da565b50505050505050505050505050565b6112fe612dc6565b60005b8151811015610d815761132c82828151811061131f5761131f614af6565b6020026020010151612e3f565b8061133681614b52565b915050611301565b6113496107386124b7565b6113655760405162461bcd60e51b81526004016109819061484f565b6001600160a01b0381166113bb5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610981565b6113c481613073565b6113cc6115aa565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610d81573d6000803e3d6000fd5b611409612dc6565b610d95600061308b565b61141b612dc6565b60005b8151811015610d815761144982828151811061143c5761143c614af6565b6020026020010151613073565b8061145381614b52565b91505061141e565b6114666107386124b7565b6114825760405162461bcd60e51b81526004016109819061484f565b6001600160a01b0381166113c45760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610981565b6114e0612dc6565b610d956130dd565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525061152b93508592508491506124c6565b611533610e37565b156115505760405162461bcd60e51b8152600401610981906148e4565b606061156487610cae88610ca9898961269d565b5050505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6115a1612dc6565b610cf481613073565b610d9560008051602061500d8339815191526103e36124b7565b6115cc612dc6565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906115fe9085908590600401614b6b565b600060405180830381600087803b15801561161857600080fd5b505af115801561162c573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610d8190505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906116759085908590600401614b6b565b600060405180830381600087803b15801561168f57600080fd5b505af11580156116a3573d6000803e3d6000fd5b505050505050565b6116b3612dc6565b610cde83838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250859250613145915050565b600061095460008051602061500d8339815191528361156e565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611762906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b611774612dc6565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b61179e612dc6565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b600054610100900460ff16158080156117fb5750600054600160ff909116105b806118155750303b158015611815575060005460ff166001145b6118785760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610981565b6000805460ff19166001179055801561189b576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce80549091169185169190911790556118f9613265565b61190161329c565b61190a826132d5565b6119126132fc565b604080516104208101825260066103e082018181526563727970746f60d01b610400840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a80825269313637b1b5b1b430b4b760b11b828501526080860191909152855180870187526007808252663134ba31b7b4b760c91b8286015260a0870191909152865180880188528381526207070760eb1b8186015260c0870152865180880188528381526264616f60e81b8186015260e087015286518088018852838152621e9a5b60ea1b8186015261010087015286518088018852908152663837b63cb3b7b760c91b8185015261012086015285518087018752600b81526a756e73746f707061626c6560a81b81850152610140860152855180870187528481526535b632bb32b960d11b8185015261016086015285518087018752600280825261686960f01b8286015261018087019190915286518088018852858152656b726573757360d01b818601526101a087015286518088018852600580825264616e696d6560d81b828701526101c088019190915287518089018952818152646d616e676160d81b818701526101e088015287518089018952600981526862696e616e6365757360b81b8187015261020088015287518089018952818152647265616c6d60d81b818701526102208801528751808901895291825261676f60f01b82860152610240870191909152865180880188526008815267185b1d1a5b5a5cdd60c21b818601526102608701528651808801885281815264707564677960d81b81860152610280870152865180880188528581526530bab9ba34b760d11b818601526102a08701528651808801885285815265189a5d19d95d60d21b818601526102c08701528651808801885292835262706f6760e81b838501526102e086019290925285518087018752600480825263636c617960e01b8286015261030087019190915286518088018852818152637769746760e01b8186015261032087015286518088018852918252696d6574726f706f6c697360b01b8285015261034086019190915285518087018752908152630eee4d6f60e31b8184015261036085015284518086018652928352651cd958dc995d60d21b8383015261038084019290925283518085018552828152643930b4b4b760d91b818301526103a084015283518085019094529083526439ba32b83760d91b908301526103c081019190915260005b601f811015611d1957611d078282601f8110611cfb57611cfb614af6565b60200201516000613145565b80611d1181614b52565b915050611cdd565b5060408051608081018252600381830190815262636f6d60e81b6060830152815281518083019092526002825261636160f01b60208381019190915281019190915260005b6002811015611d9a57611d88828260028110611d7c57611d7c614af6565b60200201516001613145565b80611d9281614b52565b915050611d5e565b5050508015610afa576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250611e2e93508592508491506124c6565b611e36610e37565b15611e535760405162461bcd60e51b8152600401610981906148e4565b611e828a611e658b610ca98c8c61269d565b611e6f888a61490e565b611e79878961490e565b600060016127da565b5050505050505050505050565b611e97612dc6565b60005b81811015610cde5760c9546001600160a01b03166350960239848484818110611ec557611ec5614af6565b9050602002016020810190611eda919061404d565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b158015611f1b57600080fd5b505af1158015611f2f573d6000803e3d6000fd5b505050508080611f3e90614b52565b915050611e9a565b600082815260976020526040902060010154611f6181612d2e565b610cde8383612e57565b611f75898b61490e565b6000600282511015611f995760405162461bcd60e51b815260040161098190614a88565b611fb0611033600084600186516110169190614ae3565b611fb8610e37565b15611fd55760405162461bcd60e51b8152600401610981906148e4565b60028b14611ff55760405162461bcd60e51b815260040161098190614b0c565b61203b8d8d8d898960008a8a8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061333c92505050565b8434101561208b5760405162461bcd60e51b815260206004820181905260248201527f4d696e74696e674d616e616765723a204e4f545f454e4f5547485f46554e44536044820152606401610981565b61209d8d8d8d8d8d8d8d8c60006134fc565b843411156112e7576120ad6124b7565b6001600160a01b03166108fc6120c38734614ae3565b6040518115909202916000818181858888f193505050501580156120eb573d6000803e3d6000fd5b5050505050505050505050505050565b612103612dc6565b61210c816135b8565b6121285760405162461bcd60e51b815260040161098190614b9a565b600081815260cd6020526040812061213f91613e8f565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b612175612dc6565b61217e816135de565b610cf4600082613654565b6121938a8c61490e565b60006002825110156121b75760405162461bcd60e51b815260040161098190614a88565b6121ce611033600084600186516110169190614ae3565b6121d6610e37565b156121f35760405162461bcd60e51b8152600401610981906148e4565b60028c146122135760405162461bcd60e51b815260040161098190614b0c565b6122588e8e8e8a898b8a8a8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061333c92505050565b856001600160a01b03166323b872dd61226f6124b7565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018890526064016020604051808303816000875af11580156122c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122e69190614a1c565b61232a5760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610981565b6120eb8e8e8e8e8e8e8e8c8e6134fc565b612343612dc6565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa15801561238a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123ae9190614bdc565b60405163a9059cbb60e01b81526001600160a01b038481166004830152602482018390529192509084169063a9059cbb906044016020604051808303816000875af1158015612401573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124259190614a1c565b6124695760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610981565b604080516001600160a01b0384811682526020820184905285168183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a1505050565b60006124c161365e565b905090565b6124cf836135b8565b6124eb5760405162461bcd60e51b815260040161098190614b9a565b600083815260cf602052604090205460ff1615156001600160401b0382161515146125675760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544c445f455850495241424c455f4d496044820152650a69a82a886960d31b6064820152608401610981565b600061259a8360408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115612642576125c56125b9826000600a6136a4565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8036126425760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610981565b61264b836136e3565b6126975760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c49440000006044820152606401610981565b50505050565b606082826040516020016126b2929190614bf5565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b60608152602001906001900390816126e3579050509050828160008151811061270e5761270e614af6565b602002602001018190525060cd6000858152602001908152602001600020805461273790614c1d565b80601f016020809104026020016040519081016040528092919081815260200182805461276390614c1d565b80156127b05780601f10612785576101008083540402835291602001916127b0565b820191906000526020600020905b81548152906001019060200180831161279357829003601f168201915b5050505050816001815181106127c8576127c8614af6565b60209081029190910101529392505050565b60008060006127e888612f84565b915091508380156127fa575060028851115b801561287c575060c9546040516331a9108f60e11b8152600481018390526001600160a01b038b8116921690636352211e90602401602060405180830381865afa15801561284c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128709190614c57565b6001600160a01b031614155b156128dc5760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b6064820152608401610981565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015612925573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129499190614a1c565b8015612a3a575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa158015612999573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129bd9190614c57565b6001600160a01b03161480612a3a575060c95460405163d9548e5360e01b8152600481018490526001600160a01b039091169063d9548e5390602401602060405180830381865afa158015612a16573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a3a9190614a1c565b15612b2b576001600160401b03851615612abc5760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b158015612aa357600080fd5b505af1158015612ab7573d6000803e3d6000fd5b505050505b60c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690612af4908c908c908c908c908b90600401614cc9565b600060405180830381600087803b158015612b0e57600080fd5b505af1158015612b22573d6000803e3d6000fd5b50505050612d22565b612b3482613847565b612b3d886138a6565b8015612b4a575087516002145b8015612b5d57506001600160401b038516155b15612c3b5760ca5488516001600160a01b039091169063c36c2125908b908b90600090612b8c57612b8c614af6565b602090810291909101015160cc546040516001600160e01b031960e086901b168152612bc69392916001600160a01b031690600401614d28565b600060405180830381600087803b158015612be057600080fd5b505af1158015612bf4573d6000803e3d6000fd5b50505050600087511115612c365760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490612af4908a908a908790600401614d5d565b612d22565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790612c73908c908c908c908c908b90600401614cc9565b600060405180830381600087803b158015612c8d57600080fd5b505af1158015612ca1573d6000803e3d6000fd5b505050506001600160401b03851615612d225760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b158015612d0957600080fd5b505af1158015612d1d573d6000803e3d6000fd5b505050505b50979650505050505050565b610cf481612d3a6124b7565b613900565b612d49828261156e565b610d815760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612d826124b7565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612dce6124b7565b6001600160a01b0316612de96033546001600160a01b031690565b6001600160a01b031614610d955760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610981565b610cf460008051602061500d83398151915282611f46565b612e61828261156e565b15610d815760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612e986124b7565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b612ee4610e37565b612f275760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610981565b600080516020614fed833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa612f676124b7565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b8015612fb957829150612fa58285611016600185614ae3565b925080612fb181614d93565b915050612f8c565b50915091565b600081516000036130125760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610981565b82826040516020016130249190614daa565b60405160208183030381529060405280519060200120604051602001613054929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610cf460008051602061500d83398151915282613654565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6130e5610e37565b156131025760405162461bcd60e51b8152600401610981906148e4565b600080516020614fed833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612f676124b7565b6000613152600084612fbf565b600081815260cd6020526040902090915061316d8482614e0c565b50600081815260cf602052604090819020805460ff19168415151790555181907f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980906131ba908690614495565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa15801561320b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061322f9190614a1c565b610cde5760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c6090610acc9084908790600401614ecb565b600054610100900460ff1661328c5760405162461bcd60e51b815260040161098190614eec565b610d956132976124b7565b61308b565b600054610100900460ff166132c35760405162461bcd60e51b815260040161098190614eec565b610d9560006132d06124b7565b613654565b600054610100900460ff1661179e5760405162461bcd60e51b815260040161098190614eec565b600054610100900460ff166133235760405162461bcd60e51b815260040161098190614eec565b600080516020614fed833981519152805460ff19169055565b600061335061334b878961490e565b612f84565b506040516bffffffffffffffffffffffff1930606090811b821660208401524660348401528b811b82166054840152606883018490526001600160c01b031960c08a901b1660888401526090830188905286901b1660b082015290915060009061342c9084906134269060c401604051602081830303815290604052805190602001206040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b90613964565b9050613437816116f4565b61348f5760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a205349474e45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610981565b42866001600160401b0316116134f15760405162461bcd60e51b815260206004820152602160248201527f4d696e74696e674d616e616765723a20455850495245445f5349474e415455526044820152604560f81b6064820152608401610981565b505050505050505050565b60006135438a61350c8a8c61490e565b613516898b61490e565b613520888a61490e565b60008f6001600160a01b03166135346124b7565b6001600160a01b0316146127da565b9050896001600160a01b03166135576124b7565b6001600160a01b0316827fa545b6fd3355e8d57f8c8147bafe740545bd3ea1f94bef2576a6d532a7c3b60586866040516135a49291909182526001600160a01b0316602082015260400190565b60405180910390a450505050505050505050565b600081815260cd6020526040812080548291906135d490614c1d565b9050119050919050565b6135e6612dc6565b6001600160a01b03811661364b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610981565b610cf48161308b565b610d818282612d3f565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b0316330361369f575060331936013560601c90565b503390565b604080518082019091526000808252602082015260405180604001604052808381526020018486602001516136d99190614f37565b9052949350505050565b600081516000036136f657506000919050565b60208201805160f81c60308110801590613714575060398160ff1611155b158015613736575060618160ff16101580156137345750607a8160ff1611155b155b15613745575060009392505050565b835160018111156137b3576137678361375f600184614ae3565b015160f81c90565b915060308260ff1610158015613781575060398260ff1611155b1580156137a3575060618260ff16101580156137a15750607a8260ff1611155b155b156137b357506000949350505050565b60015b6137c1600183614ae3565b81101561383b578381015160f81c9250602d83148015906137f7575060308360ff16101580156137f5575060398360ff1611155b155b8015613818575060618360ff16101580156138165750607a8360ff1611155b155b156138295750600095945050505050565b8061383381614b52565b9150506137b6565b50600195945050505050565b6138508161170e565b1561389d5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610981565b610cf481613988565b6000806138bd600084600186516110169190614ae3565b60ca549091506001600160a01b0316158015906138f95750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b61390a828261156e565b610d8157613922816001600160a01b03166014613a0c565b61392d836020613a0c565b60405160200161393e929190614f4a565b60408051601f198184030181529082905262461bcd60e51b825261098191600401614495565b60008060006139738585613ba7565b9150915061398081613bec565b509392505050565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526001906139c790606001611749565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b60606000613a1b836002614fbf565b613a26906002614f37565b6001600160401b03811115613a3d57613a3d61424c565b6040519080825280601f01601f191660200182016040528015613a67576020820181803683370190505b509050600360fc1b81600081518110613a8257613a82614af6565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110613ab157613ab1614af6565b60200101906001600160f81b031916908160001a9053506000613ad5846002614fbf565b613ae0906001614f37565b90505b6001811115613b58576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110613b1457613b14614af6565b1a60f81b828281518110613b2a57613b2a614af6565b60200101906001600160f81b031916908160001a90535060049490941c93613b5181614d93565b9050613ae3565b5083156138f95760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610981565b6000808251604103613bdd5760208301516040840151606085015160001a613bd187828585613da2565b94509450505050613be5565b506000905060025b9250929050565b6000816004811115613c0057613c00614fd6565b03613c085750565b6001816004811115613c1c57613c1c614fd6565b03613c695760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610981565b6002816004811115613c7d57613c7d614fd6565b03613cca5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610981565b6003816004811115613cde57613cde614fd6565b03613d365760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610981565b6004816004811115613d4a57613d4a614fd6565b03610cf45760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610981565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613dd95750600090506003613e86565b8460ff16601b14158015613df157508460ff16601c14155b15613e025750600090506004613e86565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613e56573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613e7f57600060019250925050613e86565b9150600090505b94509492505050565b508054613e9b90614c1d565b6000825580601f10613eab575050565b601f016020900490600052602060002090810190610cf491905b80821115613ed95760008155600101613ec5565b5090565b600060208284031215613eef57600080fd5b81356001600160e01b0319811681146138f957600080fd5b6001600160401b0381168114610cf457600080fd5b8035613f2781613f07565b919050565b60008060408385031215613f3f57600080fd5b8235613f4a81613f07565b946020939093013593505050565b600060208284031215613f6a57600080fd5b5035919050565b60008083601f840112613f8357600080fd5b5081356001600160401b03811115613f9a57600080fd5b602083019150836020828501011115613be557600080fd5b600080600060408486031215613fc757600080fd5b8335925060208401356001600160401b03811115613fe457600080fd5b613ff086828701613f71565b9497909650939450505050565b6001600160a01b0381168114610cf457600080fd5b8035613f2781613ffd565b6000806040838503121561403057600080fd5b82359150602083013561404281613ffd565b809150509250929050565b60006020828403121561405f57600080fd5b81356138f981613ffd565b60008083601f84011261407c57600080fd5b5081356001600160401b0381111561409357600080fd5b6020830191508360208260051b8501011115613be557600080fd5b8015158114610cf457600080fd5b60008060008060008060008060a0898b0312156140d857600080fd5b88356140e381613ffd565b975060208901356001600160401b03808211156140ff57600080fd5b61410b8c838d0161406a565b909950975060408b013591508082111561412457600080fd5b6141308c838d0161406a565b909750955060608b013591508082111561414957600080fd5b506141568b828c0161406a565b909450925050608089013561416a816140ae565b809150509295985092959890939650565b600080600080600080600080600060c08a8c03121561419957600080fd5b89356141a481613ffd565b985060208a01356001600160401b03808211156141c057600080fd5b6141cc8d838e0161406a565b909a50985060408c01359150808211156141e557600080fd5b6141f18d838e0161406a565b909850965060608c013591508082111561420a57600080fd5b506142178c828d0161406a565b90955093505060808a013561422b81613f07565b915060a08a013561423b816140ae565b809150509295985092959850929598565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b038111828210171561428a5761428a61424c565b604052919050565b60006001600160401b038211156142ab576142ab61424c565b5060051b60200190565b600060208083850312156142c857600080fd5b82356001600160401b038111156142de57600080fd5b8301601f810185136142ef57600080fd5b80356143026142fd82614292565b614262565b81815260059190911b8201830190838101908783111561432157600080fd5b928401925b8284101561434857833561433981613ffd565b82529284019290840190614326565b979650505050505050565b6000806000806060858703121561436957600080fd5b843561437481613ffd565b93506020850135925060408501356001600160401b0381111561439657600080fd5b6143a287828801613f71565b95989497509550505050565b600080602083850312156143c157600080fd5b82356001600160401b038111156143d757600080fd5b6143e385828601613f71565b90969095509350505050565b60008060006040848603121561440457600080fd5b83356001600160401b0381111561441a57600080fd5b61442686828701613f71565b909450925050602084013561443a816140ae565b809150509250925092565b60005b83811015614460578181015183820152602001614448565b50506000910152565b60008151808452614481816020860160208601614445565b601f01601f19169290920160200192915050565b6020815260006138f96020830184614469565b60008060008060008060c087890312156144c157600080fd5b86356144cc81613ffd565b955060208701356144dc81613ffd565b945060408701356144ec81613ffd565b935060608701356144fc81613ffd565b9250608087013561450c81613ffd565b915060a087013561451c81613ffd565b809150509295509295509295565b60008060008060008060008060a0898b03121561454657600080fd5b883561455181613ffd565b97506020890135965060408901356001600160401b038082111561457457600080fd5b6145808c838d01613f71565b909850965060608b013591508082111561459957600080fd5b6145a58c838d0161406a565b909650945060808b01359150808211156145be57600080fd5b506145cb8b828c0161406a565b999c989b5096995094979396929594505050565b600080602083850312156145f257600080fd5b82356001600160401b0381111561460857600080fd5b6143e38582860161406a565b600080600080600080600080600080600060e08c8e03121561463557600080fd5b61463e8c614012565b9a506001600160401b038060208e0135111561465957600080fd5b6146698e60208f01358f0161406a565b909b50995060408d013581101561467f57600080fd5b61468f8e60408f01358f0161406a565b909950975060608d01358110156146a557600080fd5b6146b58e60608f01358f0161406a565b90975095506146c660808e01613f1c565b945060a08d013593508060c08e013511156146e057600080fd5b506146f18d60c08e01358e01613f71565b81935080925050509295989b509295989b9093969950565b6000806000806000806000806000806000806101008d8f03121561472c57600080fd5b6147358d614012565b9b506001600160401b0360208e0135111561474f57600080fd5b61475f8e60208f01358f0161406a565b909b5099506001600160401b0360408e0135111561477c57600080fd5b61478c8e60408f01358f0161406a565b90995097506001600160401b0360608e013511156147a957600080fd5b6147b98e60608f01358f0161406a565b90975095506147ca60808e01613f1c565b94506147d860a08e01614012565b935060c08d013592506001600160401b0360e08e013511156147f957600080fd5b6148098e60e08f01358f01613f71565b81935080925050509295989b509295989b509295989b565b6000806040838503121561483457600080fd5b823561483f81613ffd565b9150602083013561404281613ffd565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60006020828403121561489657600080fd5b81516138f981613f07565b60208082526023908201527f4d696e74696e674d616e616765723a20544f4b454e5f4e4f545f455850495241604082015262424c4560e81b606082015260800190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b600061491c6142fd84614292565b80848252602080830192508560051b85013681111561493a57600080fd5b855b818110156149cc5780356001600160401b038082111561495c5760008081fd5b90880190601f36818401126149715760008081fd5b8235828111156149835761498361424c565b614994818301601f19168801614262565b925080835236878286010111156149ad57600091508182fd5b808785018885013760009083018701525086525093820193820161493c565b50919695505050505050565b60208082526024908201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604082015263272a22a960e11b606082015260800190565b600060208284031215614a2e57600080fd5b81516138f9816140ae565b6020808252602f908201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060408201526e282927ab22a22fa7a92fa7aba722a960891b606082015260800190565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b8181038181111561095457610954614acd565b634e487b7160e01b600052603260045260246000fd5b60208082526026908201527f4d696e74696e674d616e616765723a20535542444f4d41494e535f4e4f545f41604082015265131313d5d15160d21b606082015260800190565b600060018201614b6457614b64614acd565b5060010190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b600060208284031215614bee57600080fd5b5051919050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c90821680614c3157607f821691505b602082108103614c5157634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215614c6957600080fd5b81516138f981613ffd565b600081518084526020808501808196508360051b8101915082860160005b85811015614cbc578284038952614caa848351614469565b98850198935090840190600101614c92565b5091979650505050505050565b6001600160a01b038616815260a060208201819052600090614ced90830187614c74565b8281036040840152614cff8187614c74565b90508281036060840152614d138186614c74565b91505082151560808301529695505050505050565b600060018060a01b03808616835260606020840152614d4a6060840186614469565b9150808416604084015250949350505050565b606081526000614d706060830186614c74565b8281036020840152614d828186614c74565b915050826040830152949350505050565b600081614da257614da2614acd565b506000190190565b60008251614dbc818460208701614445565b9190910192915050565b601f821115610cde57600081815260208120601f850160051c81016020861015614ded5750805b601f850160051c820191505b818110156116a357828155600101614df9565b81516001600160401b03811115614e2557614e2561424c565b614e3981614e338454614c1d565b84614dc6565b602080601f831160018114614e6e5760008415614e565750858301515b600019600386901b1c1916600185901b1785556116a3565b600085815260208120601f198616915b82811015614e9d57888601518255948401946001909101908401614e7e565b5085821015614ebb5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b828152604060208201526000614ee46040830184614469565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b8082018082111561095457610954614acd565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351614f82816017850160208801614445565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351614fb3816028840160208801614445565b01602801949350505050565b808202811582820484141761095457610954614acd565b634e487b7160e01b600052602160045260246000fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
