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
const _bytecode = "0x608060405234801561001057600080fd5b50614ec6806100206000396000f3fe6080604052600436106102ae5760003560e01c806391d1485411610175578063b9998a24116100dc578063d547741f11610095578063f2fde38b1161006f578063f2fde38b14610892578063f5243bc4146108b2578063f940e385146108d2578063ffa1ad74146108f257600080fd5b8063d547741f1461083f578063d7db74c71461085f578063ec5273891461087257600080fd5b8063b9998a241461077d578063cc2a9a5b1461079d578063cc2c3fc4146107bd578063ceeb4f50146107dd578063d1f5692c146107fd578063d53913931461081d57600080fd5b8063a3f4df7e1161012e578063a3f4df7e14610690578063a849d65c146106dd578063aa271e1a146106fd578063ae31844a1461071d578063b0aa98c71461073d578063b3ab15fb1461075d57600080fd5b806391d14854146105e6578063983b2d5614610606578063986502751461062657806399e0dd7c1461063b578063a217fddf1461065b578063a3a3f7f61461067057600080fd5b80635c975abb1161021957806371e2a657116101d257806371e2a6571461054057806377a2a5891461056057806381c81d35146105805780638456cb59146105935780638da5cb5b146105a8578063906cecc1146105c657600080fd5b80635c975abb146104a35780635cd7e3b3146104b85780635e22cd86146104d85780635fc1964f146104f8578063634486da14610518578063715018a61461052b57600080fd5b806336568abe1161026b57806336568abe146103a85780633f41b614146103c85780633f4ba83a1461040057806351cff8d914610415578063572b6c05146104355780635b6fa8db1461048357600080fd5b806301ffc9a7146102b35780631edb948e146102e8578063248a9ca31461030a578063268b15ed146103485780632f2ff15d146103685780633092afd514610388575b600080fd5b3480156102bf57600080fd5b506102d36102ce366004613d74565b610923565b60405190151581526020015b60405180910390f35b3480156102f457600080fd5b50610308610303366004613dc3565b61095a565b005b34801561031657600080fd5b5061033a610325366004613def565b60009081526097602052604090206001015490565b6040519081526020016102df565b34801561035457600080fd5b50610308610363366004613e49565b610b3f565b34801561037457600080fd5b50610308610383366004613eb4565b610bd2565b34801561039457600080fd5b506103086103a3366004613ee4565b610bfc565b3480156103b457600080fd5b506103086103c3366004613eb4565b610c10565b3480156103d457600080fd5b5060c9546103e8906001600160a01b031681565b6040516001600160a01b0390911681526020016102df565b34801561040c57600080fd5b50610308610c9e565b34801561042157600080fd5b50610308610430366004613ee4565b610cb0565b34801561044157600080fd5b506102d3610450366004613ee4565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561048f57600080fd5b5060cc546103e8906001600160a01b031681565b3480156104af57600080fd5b506102d3610d50565b3480156104c457600080fd5b506103086104d3366004613f53565b610d66565b3480156104e457600080fd5b506103086104f3366004614012565b610fca565b34801561050457600080fd5b5061030861051336600461414c565b611218565b610308610526366004613ee4565b611260565b34801561053757600080fd5b50610308611323565b34801561054c57600080fd5b5061030861055b36600461414c565b611335565b34801561056c57600080fd5b5060ce546103e8906001600160a01b031681565b61030861058e366004613ee4565b61137d565b34801561059f57600080fd5b506103086113fa565b3480156105b457600080fd5b506033546001600160a01b03166103e8565b3480156105d257600080fd5b506103086105e13660046141ea565b61140a565b3480156105f257600080fd5b506102d3610601366004613eb4565b611490565b34801561061257600080fd5b50610308610621366004613ee4565b6114bb565b34801561063257600080fd5b506103086114cc565b34801561064757600080fd5b50610308610656366004614245565b6114e6565b34801561066757600080fd5b5061033a600081565b34801561067c57600080fd5b5061030861068b366004614286565b6115cd565b34801561069c57600080fd5b506106d0604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102df919061432c565b3480156106e957600080fd5b5060cb546103e8906001600160a01b031681565b34801561070957600080fd5b506102d3610718366004613ee4565b611616565b34801561072957600080fd5b5061030861073836600461433f565b611630565b34801561074957600080fd5b506102d3610758366004613def565b61173b565b34801561076957600080fd5b50610308610778366004613ee4565b611799565b34801561078957600080fd5b50610308610798366004613ee4565b6117c3565b3480156107a957600080fd5b506103086107b8366004614374565b611808565b3480156107c957600080fd5b5060ca546103e8906001600160a01b031681565b3480156107e957600080fd5b506103086107f83660046143f6565b611c8b565b34801561080957600080fd5b5061030861081836600461433f565b611d2f565b34801561082957600080fd5b5061033a600080516020614e9a83398151915281565b34801561084b57600080fd5b5061030861085a366004613eb4565b611de6565b61030861086d3660046144ab565b611e0b565b34801561087e57600080fd5b5061030861088d366004613def565b611f9b565b34801561089e57600080fd5b506103086108ad366004613ee4565b61200d565b3480156108be57600080fd5b506103086108cd3660046145a0565b612029565b3480156108de57600080fd5b506103086108ed3660046146b8565b6121db565b3480156108fe57600080fd5b506106d0604051806040016040528060058152602001640302e352e360dc1b81525081565b60006001600160e01b03198216637965db0b60e01b148061095457506301ffc9a760e01b6001600160e01b03198316145b92915050565b610965610718612357565b61098a5760405162461bcd60e51b8152600401610981906146e6565b60405180910390fd5b60c95460405163baef73e960e01b8152600481018390526000916001600160a01b03169063baef73e990602401602060405180830381865afa1580156109d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f8919061471b565b9050806001600160401b0316600003610a5f5760405162461bcd60e51b815260206004820152602360248201527f4d696e74696e674d616e616765723a20544f4b454e5f4e4f545f455850495241604482015262424c4560e81b6064820152608401610981565b806001600160401b0316836001600160401b031611610acc5760405162461bcd60e51b815260206004820152602360248201527f4d696e74696e674d616e616765723a204558504952595f4e4f545f455854454e60448201526211115160ea1b6064820152608401610981565b60c954604051631fb9763760e11b81526001600160401b0385166004820152602481018490526001600160a01b0390911690633f72ec6e906044015b600060405180830381600087803b158015610b2257600080fd5b505af1158015610b36573d6000803e3d6000fd5b50505050505050565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250610b829350859250849150612366565b610b8a610d50565b15610ba75760405162461bcd60e51b815260040161098190614738565b6060610b36610bb4612357565b610bc788610bc28989612534565b612560565b838460006001612671565b600082815260976020526040902060010154610bed81612bc5565b610bf78383612bd6565b505050565b610c04612c5d565b610c0d81612cd6565b50565b610c18612357565b6001600160a01b0316816001600160a01b031614610c905760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610981565b610c9a8282612cee565b5050565b610ca6612c5d565b610cae612d73565b565b610cb8612c5d565b6001600160a01b038116610ccb57600080fd5b60405147906001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610d03573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905260008183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a15050565b600080516020614e7a8339815191525460ff1690565b610d708688614762565b8051600203610da557610d84610718612357565b610da05760405162461bcd60e51b81526004016109819061482c565b610eea565b6000610db082612e1b565b60c9549092506001600160a01b0316905063430c2081610dce612357565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610e19573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e3d9190614870565b80610ecc575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610e96573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eba9190614870565b8015610ecc5750610ecc610718612357565b610ee85760405162461bcd60e51b81526004016109819061488d565b505b610ef48789614762565b6000600282511015610f185760405162461bcd60e51b8152600401610981906148dc565b610f6d610f4c60008460018651610f2f9190614937565b81518110610f3f57610f3f61494a565b6020026020010151612e56565b83600081518110610f5f57610f5f61494a565b602002602001015183612366565b610f75610d50565b15610f925760405162461bcd60e51b815260040161098190614738565b610fbc8b610fa08b8d614762565b610faa8a8c614762565b610fb4898b614762565b600089612671565b505050505050505050505050565b610fd48789614762565b805160020361100957610fe8610718612357565b6110045760405162461bcd60e51b81526004016109819061482c565b61114e565b600061101482612e1b565b60c9549092506001600160a01b0316905063430c2081611032612357565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa15801561107d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110a19190614870565b80611130575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa1580156110fa573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061111e9190614870565b80156111305750611130610718612357565b61114c5760405162461bcd60e51b81526004016109819061488d565b505b611158888a614762565b836001600160401b03166002825110156111845760405162461bcd60e51b8152600401610981906148dc565b61119b610f4c60008460018651610f2f9190614937565b6111a3610d50565b156111c05760405162461bcd60e51b815260040161098190614738565b60028a146111e05760405162461bcd60e51b815260040161098190614960565b6112098c6111ee8c8e614762565b6111f88b8d614762565b6112028a8c614762565b8989612671565b50505050505050505050505050565b611220612c5d565b60005b8151811015610c9a5761124e8282815181106112415761124161494a565b6020026020010151612cd6565b80611258816149a6565b915050611223565b61126b610718612357565b6112875760405162461bcd60e51b8152600401610981906146e6565b6001600160a01b0381166112dd5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610981565b6112e681612f0a565b6112ee6114cc565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610c9a573d6000803e3d6000fd5b61132b612c5d565b610cae6000612f22565b61133d612c5d565b60005b8151811015610c9a5761136b82828151811061135e5761135e61494a565b6020026020010151612f0a565b80611375816149a6565b915050611340565b611388610718612357565b6113a45760405162461bcd60e51b8152600401610981906146e6565b6001600160a01b0381166112e65760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610981565b611402612c5d565b610cae612f74565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525061144d9350859250849150612366565b611455610d50565b156114725760405162461bcd60e51b815260040161098190614738565b606061148687610bc788610bc28989612534565b5050505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6114c3612c5d565b610c0d81612f0a565b610cae600080516020614e9a8339815191526103c3612357565b6114ee612c5d565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061152090859085906004016149bf565b600060405180830381600087803b15801561153a57600080fd5b505af115801561154e573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610c9a90505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061159790859085906004016149bf565b600060405180830381600087803b1580156115b157600080fd5b505af11580156115c5573d6000803e3d6000fd5b505050505050565b6115d5612c5d565b610bf783838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250859250612fdc915050565b6000610954600080516020614e9a83398151915283611490565b61163b610718612357565b6116575760405162461bcd60e51b8152600401610981906146e6565b60c9546040516000916001600160a01b03169061167a90859085906024016149ee565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b179052516116af9190614a27565b6000604051808303816000865af19150503d80600081146116ec576040519150601f19603f3d011682016040523d82523d6000602084013e6116f1565b606091505b5050905080610bf75760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b6044820152606401610981565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260009061178f906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b6117a1612c5d565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b6117cb612c5d565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b600054610100900460ff16158080156118285750600054600160ff909116105b806118425750303b158015611842575060005460ff166001145b6118a55760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610981565b6000805460ff1916600117905580156118c8576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce80549091169185169190911790556119266130fc565b61192e613133565b6119378261316c565b61193f613193565b604080516102e08101825260066102a082018181526563727970746f60d01b6102c0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b8183015261016084015283518085018552600280825261686960f01b8284015261018085019190915284518086018652928352656b726573757360d01b838301526101a084019290925283518085018552600580825264616e696d6560d81b828401526101c085019190915284518086018652818152646d616e676160d81b818401526101e085015284518086018652600981526862696e616e6365757360b81b8184015261020085015284518086018652818152647265616c6d60d81b818401526102208501528451808601865292835261676f60f01b83830152610240840192909252835180850185526008815267185b1d1a5b5a5cdd60c21b81830152610260840152835180850190945290835264707564677960d81b9083015261028081019190915260005b6015811015611c1557611c03828260158110611bf757611bf761494a565b60200201516000612fdc565b80611c0d816149a6565b915050611bd9565b50611c3c60405180604001604052806003815260200162636f6d60e81b8152506001612fdc565b508015610b36576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250611cce9350859250849150612366565b611cd6610d50565b15611cf35760405162461bcd60e51b815260040161098190614738565b611d228a611d058b610bc28c8c612534565b611d0f888a614762565b611d198789614762565b60006001612671565b5050505050505050505050565b611d37612c5d565b60005b81811015610bf75760c9546001600160a01b03166350960239848484818110611d6557611d6561494a565b9050602002016020810190611d7a9190613ee4565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b158015611dbb57600080fd5b505af1158015611dcf573d6000803e3d6000fd5b505050508080611dde906149a6565b915050611d3a565b600082815260976020526040902060010154611e0181612bc5565b610bf78383612cee565b611e15898b614762565b6000600282511015611e395760405162461bcd60e51b8152600401610981906148dc565b611e50610f4c60008460018651610f2f9190614937565b611e58610d50565b15611e755760405162461bcd60e51b815260040161098190614738565b60028b14611e955760405162461bcd60e51b815260040161098190614960565b611edb8d8d8d898960008a8a8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506131d392505050565b84341015611f2b5760405162461bcd60e51b815260206004820181905260248201527f4d696e74696e674d616e616765723a204e4f545f454e4f5547485f46554e44536044820152606401610981565b611f3d8d8d8d8d8d8d8d8c6000613393565b8434111561120957611f4d612357565b6001600160a01b03166108fc611f638734614937565b6040518115909202916000818181858888f19350505050158015611f8b573d6000803e3d6000fd5b5050505050505050505050505050565b611fa3612c5d565b611fac8161344f565b611fc85760405162461bcd60e51b815260040161098190614a43565b600081815260cd60205260408120611fdf91613d26565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b612015612c5d565b61201e81613475565b610c0d6000826134eb565b6120338a8c614762565b60006002825110156120575760405162461bcd60e51b8152600401610981906148dc565b61206e610f4c60008460018651610f2f9190614937565b612076610d50565b156120935760405162461bcd60e51b815260040161098190614738565b60028c146120b35760405162461bcd60e51b815260040161098190614960565b6120f88e8e8e8a898b8a8a8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506131d392505050565b856001600160a01b03166323b872dd61210f612357565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018890526064016020604051808303816000875af1158015612162573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121869190614870565b6121ca5760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610981565b611f8b8e8e8e8e8e8e8e8c8e613393565b6121e3612c5d565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa15801561222a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061224e9190614a85565b60405163a9059cbb60e01b81526001600160a01b038481166004830152602482018390529192509084169063a9059cbb906044016020604051808303816000875af11580156122a1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122c59190614870565b6123095760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610981565b604080516001600160a01b0384811682526020820184905285168183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a1505050565b60006123616134f5565b905090565b61236f8361344f565b61238b5760405162461bcd60e51b815260040161098190614a43565b600083815260cf602052604090205460ff161515811515146123fe5760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544c445f455850495241424c455f4d496044820152650a69a82a886960d31b6064820152608401610981565b60006124318360408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a816000015111156124d95761245c612450826000600a61353b565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8036124d95760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610981565b6124e28361357a565b61252e5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c49440000006044820152606401610981565b50505050565b60608282604051602001612549929190614a9e565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b606081526020019060019003908161257a57905050905082816000815181106125a5576125a561494a565b602002602001018190525060cd600085815260200190815260200160002080546125ce90614ac6565b80601f01602080910402602001604051908101604052809291908181526020018280546125fa90614ac6565b80156126475780601f1061261c57610100808354040283529160200191612647565b820191906000526020600020905b81548152906001019060200180831161262a57829003601f168201915b50505050508160018151811061265f5761265f61494a565b60209081029190910101529392505050565b600080600061267f88612e1b565b91509150838015612691575060028851115b8015612713575060c9546040516331a9108f60e11b8152600481018390526001600160a01b038b8116921690636352211e90602401602060405180830381865afa1580156126e3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127079190614b00565b6001600160a01b031614155b156127735760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b6064820152608401610981565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa1580156127bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127e09190614870565b80156128d1575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa158015612830573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128549190614b00565b6001600160a01b031614806128d1575060c95460405163d9548e5360e01b8152600481018490526001600160a01b039091169063d9548e5390602401602060405180830381865afa1580156128ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128d19190614870565b156129c2576001600160401b038516156129535760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b15801561293a57600080fd5b505af115801561294e573d6000803e3d6000fd5b505050505b60c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be069061298b908c908c908c908c908b90600401614b72565b600060405180830381600087803b1580156129a557600080fd5b505af11580156129b9573d6000803e3d6000fd5b50505050612bb9565b6129cb826136de565b6129d48861373d565b80156129e1575087516002145b80156129f457506001600160401b038516155b15612ad25760ca5488516001600160a01b039091169063c36c2125908b908b90600090612a2357612a2361494a565b602090810291909101015160cc546040516001600160e01b031960e086901b168152612a5d9392916001600160a01b031690600401614bd1565b600060405180830381600087803b158015612a7757600080fd5b505af1158015612a8b573d6000803e3d6000fd5b50505050600087511115612acd5760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae749061298b908a908a908790600401614c06565b612bb9565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790612b0a908c908c908c908c908b90600401614b72565b600060405180830381600087803b158015612b2457600080fd5b505af1158015612b38573d6000803e3d6000fd5b505050506001600160401b03851615612bb95760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b158015612ba057600080fd5b505af1158015612bb4573d6000803e3d6000fd5b505050505b50979650505050505050565b610c0d81612bd1612357565b613797565b612be08282611490565b610c9a5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612c19612357565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612c65612357565b6001600160a01b0316612c806033546001600160a01b031690565b6001600160a01b031614610cae5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610981565b610c0d600080516020614e9a83398151915282611de6565b612cf88282611490565b15610c9a5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612d2f612357565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b612d7b610d50565b612dbe5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610981565b600080516020614e7a833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa612dfe612357565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b8015612e5057829150612e3c8285610f2f600185614937565b925080612e4881614c3c565b915050612e23565b50915091565b60008151600003612ea95760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610981565b8282604051602001612ebb9190614a27565b60405160208183030381529060405280519060200120604051602001612eeb929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610c0d600080516020614e9a833981519152826134eb565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b612f7c610d50565b15612f995760405162461bcd60e51b815260040161098190614738565b600080516020614e7a833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612dfe612357565b6000612fe9600084612e56565b600081815260cd602052604090209091506130048482614c99565b50600081815260cf602052604090819020805460ff19168415151790555181907f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf89809061305190869061432c565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa1580156130a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906130c69190614870565b610bf75760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c6090610b089084908790600401614d58565b600054610100900460ff166131235760405162461bcd60e51b815260040161098190614d79565b610cae61312e612357565b612f22565b600054610100900460ff1661315a5760405162461bcd60e51b815260040161098190614d79565b610cae6000613167612357565b6134eb565b600054610100900460ff166117cb5760405162461bcd60e51b815260040161098190614d79565b600054610100900460ff166131ba5760405162461bcd60e51b815260040161098190614d79565b600080516020614e7a833981519152805460ff19169055565b60006131e76131e28789614762565b612e1b565b506040516bffffffffffffffffffffffff1930606090811b821660208401524660348401528b811b82166054840152606883018490526001600160c01b031960c08a901b1660888401526090830188905286901b1660b08201529091506000906132c39084906132bd9060c401604051602081830303815290604052805190602001206040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b906137fb565b90506132ce81611616565b6133265760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a205349474e45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610981565b42866001600160401b0316116133885760405162461bcd60e51b815260206004820152602160248201527f4d696e74696e674d616e616765723a20455850495245445f5349474e415455526044820152604560f81b6064820152608401610981565b505050505050505050565b60006133da8a6133a38a8c614762565b6133ad898b614762565b6133b7888a614762565b60008f6001600160a01b03166133cb612357565b6001600160a01b031614612671565b9050896001600160a01b03166133ee612357565b6001600160a01b0316827fa545b6fd3355e8d57f8c8147bafe740545bd3ea1f94bef2576a6d532a7c3b605868660405161343b9291909182526001600160a01b0316602082015260400190565b60405180910390a450505050505050505050565b600081815260cd60205260408120805482919061346b90614ac6565b9050119050919050565b61347d612c5d565b6001600160a01b0381166134e25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610981565b610c0d81612f22565b610c9a8282612bd6565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b03163303613536575060331936013560601c90565b503390565b604080518082019091526000808252602082015260405180604001604052808381526020018486602001516135709190614dc4565b9052949350505050565b6000815160000361358d57506000919050565b60208201805160f81c603081108015906135ab575060398160ff1611155b1580156135cd575060618160ff16101580156135cb5750607a8160ff1611155b155b156135dc575060009392505050565b8351600181111561364a576135fe836135f6600184614937565b015160f81c90565b915060308260ff1610158015613618575060398260ff1611155b15801561363a575060618260ff16101580156136385750607a8260ff1611155b155b1561364a57506000949350505050565b60015b613658600183614937565b8110156136d2578381015160f81c9250602d831480159061368e575060308360ff161015801561368c575060398360ff1611155b155b80156136af575060618360ff16101580156136ad5750607a8360ff1611155b155b156136c05750600095945050505050565b806136ca816149a6565b91505061364d565b50600195945050505050565b6136e78161173b565b156137345760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610981565b610c0d8161381f565b60008061375460008460018651610f2f9190614937565b60ca549091506001600160a01b0316158015906137905750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6137a18282611490565b610c9a576137b9816001600160a01b031660146138a3565b6137c48360206138a3565b6040516020016137d5929190614dd7565b60408051601f198184030181529082905262461bcd60e51b82526109819160040161432c565b600080600061380a8585613a3e565b9150915061381781613a83565b509392505050565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260019061385e90606001611776565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b606060006138b2836002614e4c565b6138bd906002614dc4565b6001600160401b038111156138d4576138d46140e3565b6040519080825280601f01601f1916602001820160405280156138fe576020820181803683370190505b509050600360fc1b816000815181106139195761391961494a565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106139485761394861494a565b60200101906001600160f81b031916908160001a905350600061396c846002614e4c565b613977906001614dc4565b90505b60018111156139ef576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106139ab576139ab61494a565b1a60f81b8282815181106139c1576139c161494a565b60200101906001600160f81b031916908160001a90535060049490941c936139e881614c3c565b905061397a565b5083156137905760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610981565b6000808251604103613a745760208301516040840151606085015160001a613a6887828585613c39565b94509450505050613a7c565b506000905060025b9250929050565b6000816004811115613a9757613a97614e63565b03613a9f5750565b6001816004811115613ab357613ab3614e63565b03613b005760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610981565b6002816004811115613b1457613b14614e63565b03613b615760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610981565b6003816004811115613b7557613b75614e63565b03613bcd5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610981565b6004816004811115613be157613be1614e63565b03610c0d5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610981565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613c705750600090506003613d1d565b8460ff16601b14158015613c8857508460ff16601c14155b15613c995750600090506004613d1d565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613ced573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613d1657600060019250925050613d1d565b9150600090505b94509492505050565b508054613d3290614ac6565b6000825580601f10613d42575050565b601f016020900490600052602060002090810190610c0d91905b80821115613d705760008155600101613d5c565b5090565b600060208284031215613d8657600080fd5b81356001600160e01b03198116811461379057600080fd5b6001600160401b0381168114610c0d57600080fd5b8035613dbe81613d9e565b919050565b60008060408385031215613dd657600080fd5b8235613de181613d9e565b946020939093013593505050565b600060208284031215613e0157600080fd5b5035919050565b60008083601f840112613e1a57600080fd5b5081356001600160401b03811115613e3157600080fd5b602083019150836020828501011115613a7c57600080fd5b600080600060408486031215613e5e57600080fd5b8335925060208401356001600160401b03811115613e7b57600080fd5b613e8786828701613e08565b9497909650939450505050565b6001600160a01b0381168114610c0d57600080fd5b8035613dbe81613e94565b60008060408385031215613ec757600080fd5b823591506020830135613ed981613e94565b809150509250929050565b600060208284031215613ef657600080fd5b813561379081613e94565b60008083601f840112613f1357600080fd5b5081356001600160401b03811115613f2a57600080fd5b6020830191508360208260051b8501011115613a7c57600080fd5b8015158114610c0d57600080fd5b60008060008060008060008060a0898b031215613f6f57600080fd5b8835613f7a81613e94565b975060208901356001600160401b0380821115613f9657600080fd5b613fa28c838d01613f01565b909950975060408b0135915080821115613fbb57600080fd5b613fc78c838d01613f01565b909750955060608b0135915080821115613fe057600080fd5b50613fed8b828c01613f01565b909450925050608089013561400181613f45565b809150509295985092959890939650565b600080600080600080600080600060c08a8c03121561403057600080fd5b893561403b81613e94565b985060208a01356001600160401b038082111561405757600080fd5b6140638d838e01613f01565b909a50985060408c013591508082111561407c57600080fd5b6140888d838e01613f01565b909850965060608c01359150808211156140a157600080fd5b506140ae8c828d01613f01565b90955093505060808a01356140c281613d9e565b915060a08a01356140d281613f45565b809150509295985092959850929598565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715614121576141216140e3565b604052919050565b60006001600160401b03821115614142576141426140e3565b5060051b60200190565b6000602080838503121561415f57600080fd5b82356001600160401b0381111561417557600080fd5b8301601f8101851361418657600080fd5b803561419961419482614129565b6140f9565b81815260059190911b820183019083810190878311156141b857600080fd5b928401925b828410156141df5783356141d081613e94565b825292840192908401906141bd565b979650505050505050565b6000806000806060858703121561420057600080fd5b843561420b81613e94565b93506020850135925060408501356001600160401b0381111561422d57600080fd5b61423987828801613e08565b95989497509550505050565b6000806020838503121561425857600080fd5b82356001600160401b0381111561426e57600080fd5b61427a85828601613e08565b90969095509350505050565b60008060006040848603121561429b57600080fd5b83356001600160401b038111156142b157600080fd5b6142bd86828701613e08565b90945092505060208401356142d181613f45565b809150509250925092565b60005b838110156142f75781810151838201526020016142df565b50506000910152565b600081518084526143188160208601602086016142dc565b601f01601f19169290920160200192915050565b6020815260006137906020830184614300565b6000806020838503121561435257600080fd5b82356001600160401b0381111561436857600080fd5b61427a85828601613f01565b60008060008060008060c0878903121561438d57600080fd5b863561439881613e94565b955060208701356143a881613e94565b945060408701356143b881613e94565b935060608701356143c881613e94565b925060808701356143d881613e94565b915060a08701356143e881613e94565b809150509295509295509295565b60008060008060008060008060a0898b03121561441257600080fd5b883561441d81613e94565b97506020890135965060408901356001600160401b038082111561444057600080fd5b61444c8c838d01613e08565b909850965060608b013591508082111561446557600080fd5b6144718c838d01613f01565b909650945060808b013591508082111561448a57600080fd5b506144978b828c01613f01565b999c989b5096995094979396929594505050565b600080600080600080600080600080600060e08c8e0312156144cc57600080fd5b6144d58c613ea9565b9a506001600160401b038060208e013511156144f057600080fd5b6145008e60208f01358f01613f01565b909b50995060408d013581101561451657600080fd5b6145268e60408f01358f01613f01565b909950975060608d013581101561453c57600080fd5b61454c8e60608f01358f01613f01565b909750955061455d60808e01613db3565b945060a08d013593508060c08e0135111561457757600080fd5b506145888d60c08e01358e01613e08565b81935080925050509295989b509295989b9093969950565b6000806000806000806000806000806000806101008d8f0312156145c357600080fd5b6145cc8d613ea9565b9b506001600160401b0360208e013511156145e657600080fd5b6145f68e60208f01358f01613f01565b909b5099506001600160401b0360408e0135111561461357600080fd5b6146238e60408f01358f01613f01565b90995097506001600160401b0360608e0135111561464057600080fd5b6146508e60608f01358f01613f01565b909750955061466160808e01613db3565b945061466f60a08e01613ea9565b935060c08d013592506001600160401b0360e08e0135111561469057600080fd5b6146a08e60e08f01358f01613e08565b81935080925050509295989b509295989b509295989b565b600080604083850312156146cb57600080fd5b82356146d681613e94565b91506020830135613ed981613e94565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60006020828403121561472d57600080fd5b815161379081613d9e565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b600061477061419484614129565b80848252602080830192508560051b85013681111561478e57600080fd5b855b818110156148205780356001600160401b03808211156147b05760008081fd5b90880190601f36818401126147c55760008081fd5b8235828111156147d7576147d76140e3565b6147e8818301601f191688016140f9565b9250808352368782860101111561480157600091508182fd5b8087850188850137600090830187015250865250938201938201614790565b50919695505050505050565b60208082526024908201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604082015263272a22a960e11b606082015260800190565b60006020828403121561488257600080fd5b815161379081613f45565b6020808252602f908201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060408201526e282927ab22a22fa7a92fa7aba722a960891b606082015260800190565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b8181038181111561095457610954614921565b634e487b7160e01b600052603260045260246000fd5b60208082526026908201527f4d696e74696e674d616e616765723a20535542444f4d41494e535f4e4f545f41604082015265131313d5d15160d21b606082015260800190565b6000600182016149b8576149b8614921565b5060010190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b6020808252810182905260006001600160fb1b03831115614a0e57600080fd5b8260051b80856040850137919091016040019392505050565b60008251614a398184602087016142dc565b9190910192915050565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b600060208284031215614a9757600080fd5b5051919050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c90821680614ada57607f821691505b602082108103614afa57634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215614b1257600080fd5b815161379081613e94565b600081518084526020808501808196508360051b8101915082860160005b85811015614b65578284038952614b53848351614300565b98850198935090840190600101614b3b565b5091979650505050505050565b6001600160a01b038616815260a060208201819052600090614b9690830187614b1d565b8281036040840152614ba88187614b1d565b90508281036060840152614bbc8186614b1d565b91505082151560808301529695505050505050565b600060018060a01b03808616835260606020840152614bf36060840186614300565b9150808416604084015250949350505050565b606081526000614c196060830186614b1d565b8281036020840152614c2b8186614b1d565b915050826040830152949350505050565b600081614c4b57614c4b614921565b506000190190565b601f821115610bf757600081815260208120601f850160051c81016020861015614c7a5750805b601f850160051c820191505b818110156115c557828155600101614c86565b81516001600160401b03811115614cb257614cb26140e3565b614cc681614cc08454614ac6565b84614c53565b602080601f831160018114614cfb5760008415614ce35750858301515b600019600386901b1c1916600185901b1785556115c5565b600085815260208120601f198616915b82811015614d2a57888601518255948401946001909101908401614d0b565b5085821015614d485787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b828152604060208201526000614d716040830184614300565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b8082018082111561095457610954614921565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351614e0f8160178501602088016142dc565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351614e408160288401602088016142dc565b01602801949350505050565b808202811582820484141761095457610954614921565b634e487b7160e01b600052602160045260246000fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
