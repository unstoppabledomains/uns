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
const _bytecode = "0x608060405234801561001057600080fd5b506143ce806100206000396000f3fe6080604052600436106102675760003560e01c806391d1485411610144578063cc2a9a5b116100b6578063d7db74c71161007a578063d7db74c714610778578063ec5273891461078b578063f2fde38b146107ab578063f5243bc4146107cb578063f940e385146107eb578063ffa1ad741461080b57600080fd5b8063cc2a9a5b146106d6578063cc2c3fc4146106f6578063d1f5692c14610716578063d539139314610736578063d547741f1461075857600080fd5b8063a3a3f7f611610108578063a3a3f7f6146105e9578063a3f4df7e14610609578063a849d65c14610656578063aa271e1a14610676578063b0aa98c714610696578063b9998a24146106b657600080fd5b806391d148541461055f578063983b2d561461057f578063986502751461059f57806399e0dd7c146105b4578063a217fddf146105d457600080fd5b80635b6fa8db116101dd578063634486da116101a1578063634486da146104d1578063715018a6146104e457806371e2a657146104f957806381c81d35146105195780638456cb591461052c5780638da5cb5b1461054157600080fd5b80635b6fa8db1461043c5780635c975abb1461045c5780635cd7e3b3146104715780635e22cd86146104915780635fc1964f146104b157600080fd5b80633092afd51161022f5780633092afd51461034157806336568abe146103615780633f41b614146103815780633f4ba83a146103b957806351cff8d9146103ce578063572b6c05146103ee57600080fd5b806301ffc9a71461026c5780631edb948e146102a157806320c5429b146102c3578063248a9ca3146102e35780632f2ff15d14610321575b600080fd5b34801561027857600080fd5b5061028c6102873660046133da565b61083c565b60405190151581526020015b60405180910390f35b3480156102ad57600080fd5b506102c16102bc366004613429565b610873565b005b3480156102cf57600080fd5b506102c16102de366004613455565b610a1c565b3480156102ef57600080fd5b506103136102fe366004613455565b60009081526097602052604090206001015490565b604051908152602001610298565b34801561032d57600080fd5b506102c161033c36600461348e565b610b3f565b34801561034d57600080fd5b506102c161035c3660046134be565b610b69565b34801561036d57600080fd5b506102c161037c36600461348e565b610b7d565b34801561038d57600080fd5b5060c9546103a1906001600160a01b031681565b6040516001600160a01b039091168152602001610298565b3480156103c557600080fd5b506102c1610c0b565b3480156103da57600080fd5b506102c16103e93660046134be565b610c1d565b3480156103fa57600080fd5b5061028c6104093660046134be565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561044857600080fd5b5060cc546103a1906001600160a01b031681565b34801561046857600080fd5b5061028c610cbd565b34801561047d57600080fd5b506102c161048c36600461352d565b610cd3565b34801561049d57600080fd5b506102c16104ac3660046135ec565b610e73565b3480156104bd57600080fd5b506102c16104cc366004613726565b610ff8565b6102c16104df3660046134be565b611040565b3480156104f057600080fd5b506102c1611103565b34801561050557600080fd5b506102c1610514366004613726565b611115565b6102c16105273660046134be565b61115d565b34801561053857600080fd5b506102c16111da565b34801561054d57600080fd5b506033546001600160a01b03166103a1565b34801561056b57600080fd5b5061028c61057a36600461348e565b6111ea565b34801561058b57600080fd5b506102c161059a3660046134be565b611215565b3480156105ab57600080fd5b506102c1611226565b3480156105c057600080fd5b506102c16105cf3660046137fa565b611240565b3480156105e057600080fd5b50610313600081565b3480156105f557600080fd5b506102c161060436600461383b565b611327565b34801561061557600080fd5b50610649604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b60405161029891906138e1565b34801561066257600080fd5b5060cb546103a1906001600160a01b031681565b34801561068257600080fd5b5061028c6106913660046134be565b611370565b3480156106a257600080fd5b5061028c6106b1366004613455565b61138a565b3480156106c257600080fd5b506102c16106d13660046134be565b6113e8565b3480156106e257600080fd5b506102c16106f13660046138f4565b61142d565b34801561070257600080fd5b5060ca546103a1906001600160a01b031681565b34801561072257600080fd5b506102c1610731366004613976565b6115b2565b34801561074257600080fd5b506103136000805160206143a283398151915281565b34801561076457600080fd5b506102c161077336600461348e565b611669565b6102c16107863660046139ab565b61168e565b34801561079757600080fd5b506102c16107a6366004613455565b6118bd565b3480156107b757600080fd5b506102c16107c63660046134be565b61192f565b3480156107d757600080fd5b506102c16107e6366004613aa0565b61194b565b3480156107f757600080fd5b506102c1610806366004613bb8565b611b9a565b34801561081757600080fd5b50610649604051806040016040528060058152602001640302e362e360dc1b81525081565b60006001600160e01b03198216637965db0b60e01b148061086d57506301ffc9a760e01b6001600160e01b03198316145b92915050565b61087e610691611d16565b6108a35760405162461bcd60e51b815260040161089a90613be6565b60405180910390fd5b60c95460405163baef73e960e01b8152600481018390526000916001600160a01b03169063baef73e990602401602060405180830381865afa1580156108ed573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109119190613c1b565b9050806001600160401b031660000361093c5760405162461bcd60e51b815260040161089a90613c38565b806001600160401b0316836001600160401b0316116109a95760405162461bcd60e51b815260206004820152602360248201527f4d696e74696e674d616e616765723a204558504952595f4e4f545f455854454e60448201526211115160ea1b606482015260840161089a565b60c954604051631fb9763760e11b81526001600160401b0385166004820152602481018490526001600160a01b0390911690633f72ec6e906044015b600060405180830381600087803b1580156109ff57600080fd5b505af1158015610a13573d6000803e3d6000fd5b50505050505050565b610a27610691611d16565b610a435760405162461bcd60e51b815260040161089a90613be6565b60c95460405163baef73e960e01b8152600481018390526001600160a01b039091169063baef73e990602401602060405180830381865afa158015610a8c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ab09190613c1b565b6001600160401b0316600003610ad85760405162461bcd60e51b815260040161089a90613c38565b60c954604051637eee288d60e01b8152306004820152602481018390526001600160a01b0390911690637eee288d90604401600060405180830381600087803b158015610b2457600080fd5b505af1158015610b38573d6000803e3d6000fd5b5050505050565b600082815260976020526040902060010154610b5a81611d25565b610b648383611d36565b505050565b610b71611dbd565b610b7a81611e36565b50565b610b85611d16565b6001600160a01b0316816001600160a01b031614610bfd5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b606482015260840161089a565b610c078282611e4e565b5050565b610c13611dbd565b610c1b611ed3565b565b610c25611dbd565b6001600160a01b038116610c3857600080fd5b60405147906001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610c70573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905260008183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a15050565b6000805160206143828339815191525460ff1690565b610cde610691611d16565b610cfa5760405162461bcd60e51b815260040161089a90613c7b565b610d048688613cbf565b60008151600214610d275760405162461bcd60e51b815260040161089a90613d89565b6000610d3283611f7b565b915050610d3e81611fd3565b610d5a5760405162461bcd60e51b815260040161089a90613dcf565b600081815260cf602052604090205460ff1615156001600160401b038316151514610d975760405162461bcd60e51b815260040161089a90613e11565b610dba83600081518110610dad57610dad613e57565b6020026020010151611ff9565b610dd65760405162461bcd60e51b815260040161089a90613e6d565b610df983600081518110610dec57610dec613e57565b602002602001015161215d565b15610e165760405162461bcd60e51b815260040161089a90613ea4565b610e1e610cbd565b15610e3b5760405162461bcd60e51b815260040161089a90613eea565b610e658b610e498b8d613cbf565b610e538a8c613cbf565b610e5d898b613cbf565b6000896121e7565b505050505050505050505050565b610e7e610691611d16565b610e9a5760405162461bcd60e51b815260040161089a90613c7b565b610ea48789613cbf565b828151600214610ec65760405162461bcd60e51b815260040161089a90613d89565b6000610ed183611f7b565b915050610edd81611fd3565b610ef95760405162461bcd60e51b815260040161089a90613dcf565b600081815260cf602052604090205460ff1615156001600160401b038316151514610f365760405162461bcd60e51b815260040161089a90613e11565b610f4c83600081518110610dad57610dad613e57565b610f685760405162461bcd60e51b815260040161089a90613e6d565b610f7e83600081518110610dec57610dec613e57565b15610f9b5760405162461bcd60e51b815260040161089a90613ea4565b610fa3610cbd565b15610fc05760405162461bcd60e51b815260040161089a90613eea565b610fe98c610fce8c8e613cbf565b610fd88b8d613cbf565b610fe28a8c613cbf565b89896121e7565b50505050505050505050505050565b611000611dbd565b60005b8151811015610c075761102e82828151811061102157611021613e57565b6020026020010151611e36565b8061103881613f2a565b915050611003565b61104b610691611d16565b6110675760405162461bcd60e51b815260040161089a90613be6565b6001600160a01b0381166110bd5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d505459000000604482015260640161089a565b6110c681612646565b6110ce611226565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610c07573d6000803e3d6000fd5b61110b611dbd565b610c1b600061265e565b61111d611dbd565b60005b8151811015610c075761114b82828151811061113e5761113e613e57565b6020026020010151612646565b8061115581613f2a565b915050611120565b611168610691611d16565b6111845760405162461bcd60e51b815260040161089a90613be6565b6001600160a01b0381166110c65760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d505459000000604482015260640161089a565b6111e2611dbd565b610c1b6126b0565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61121d611dbd565b610b7a81612646565b610c1b6000805160206143a283398151915261037c611d16565b611248611dbd565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061127a9085908590600401613f43565b600060405180830381600087803b15801561129457600080fd5b505af11580156112a8573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610c0790505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906112f19085908590600401613f43565b600060405180830381600087803b15801561130b57600080fd5b505af115801561131f573d6000803e3d6000fd5b505050505050565b61132f611dbd565b610b6483838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250859250612718915050565b600061086d6000805160206143a2833981519152836111ea565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526000906113de906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b6113f0611dbd565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b600054610100900460ff161580801561144d5750600054600160ff909116105b806114675750303b158015611467575060005460ff166001145b6114ca5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161089a565b6000805460ff1916600117905580156114ed576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce805490911691851691909117905561154b612838565b61155361286f565b61155c826128a8565b6115646128cf565b8015610a13576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b6115ba611dbd565b60005b81811015610b645760c9546001600160a01b031663509602398484848181106115e8576115e8613e57565b90506020020160208101906115fd91906134be565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561163e57600080fd5b505af1158015611652573d6000803e3d6000fd5b50505050808061166190613f2a565b9150506115bd565b60008281526097602052604090206001015461168481611d25565b610b648383611e4e565b611698898b613cbf565b600081516002146116bb5760405162461bcd60e51b815260040161089a90613d89565b60006116c683611f7b565b9150506116d281611fd3565b6116ee5760405162461bcd60e51b815260040161089a90613dcf565b600081815260cf602052604090205460ff1615156001600160401b03831615151461172b5760405162461bcd60e51b815260040161089a90613e11565b61174183600081518110610dad57610dad613e57565b61175d5760405162461bcd60e51b815260040161089a90613e6d565b61177383600081518110610dec57610dec613e57565b156117905760405162461bcd60e51b815260040161089a90613ea4565b611798610cbd565b156117b55760405162461bcd60e51b815260040161089a90613eea565b6117fb8e8e8e8a8a60008b8b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061290f92505050565b8534101561184b5760405162461bcd60e51b815260206004820181905260248201527f4d696e74696e674d616e616765723a204e4f545f454e4f5547485f46554e4453604482015260640161089a565b61185d8e8e8e8e8e8e8e8d6000612acf565b853411156118ad5761186d611d16565b6001600160a01b03166108fc6118838834613f72565b6040518115909202916000818181858888f193505050501580156118ab573d6000803e3d6000fd5b505b5050505050505050505050505050565b6118c5611dbd565b6118ce81611fd3565b6118ea5760405162461bcd60e51b815260040161089a90613dcf565b600081815260cd602052604081206119019161338c565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611937611dbd565b61194081612b8b565b610b7a600082612c01565b6119558a8c613cbf565b600081516002146119785760405162461bcd60e51b815260040161089a90613d89565b600061198383611f7b565b91505061198f81611fd3565b6119ab5760405162461bcd60e51b815260040161089a90613dcf565b600081815260cf602052604090205460ff1615156001600160401b0383161515146119e85760405162461bcd60e51b815260040161089a90613e11565b6119fe83600081518110610dad57610dad613e57565b611a1a5760405162461bcd60e51b815260040161089a90613e6d565b611a3083600081518110610dec57610dec613e57565b15611a4d5760405162461bcd60e51b815260040161089a90613ea4565b611a55610cbd565b15611a725760405162461bcd60e51b815260040161089a90613eea565b611ab78f8f8f8b8a8c8b8b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061290f92505050565b866001600160a01b03166323b872dd611ace611d16565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018990526064016020604051808303816000875af1158015611b21573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b459190613f85565b611b895760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b604482015260640161089a565b6118ab8f8f8f8f8f8f8f8d8f612acf565b611ba2611dbd565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa158015611be9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c0d9190613fa2565b60405163a9059cbb60e01b81526001600160a01b038481166004830152602482018390529192509084169063a9059cbb906044016020604051808303816000875af1158015611c60573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c849190613f85565b611cc85760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b604482015260640161089a565b604080516001600160a01b0384811682526020820184905285168183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a1505050565b6000611d20612c0b565b905090565b610b7a81611d31611d16565b612c51565b611d4082826111ea565b610c075760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611d79611d16565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611dc5611d16565b6001600160a01b0316611de06033546001600160a01b031690565b6001600160a01b031614610c1b5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161089a565b610b7a6000805160206143a283398151915282611669565b611e5882826111ea565b15610c075760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055611e8f611d16565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b611edb610cbd565b611f1e5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b604482015260640161089a565b600080516020614382833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa611f5e611d16565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b8015611fcd57829150611fb98285611f9c600185613f72565b81518110611fac57611fac613e57565b6020026020010151612cb5565b925080611fc581613fbb565b915050611f83565b50915091565b600081815260cd602052604081208054829190611fef90613fd2565b9050119050919050565b6000815160000361200c57506000919050565b60208201805160f81c6030811080159061202a575060398160ff1611155b15801561204c575060618160ff161015801561204a5750607a8160ff1611155b155b1561205b575060009392505050565b835160018111156120c95761207d83612075600184613f72565b015160f81c90565b915060308260ff1610158015612097575060398260ff1611155b1580156120b9575060618260ff16101580156120b75750607a8260ff1611155b155b156120c957506000949350505050565b60015b6120d7600183613f72565b811015612151578381015160f81c9250602d831480159061210d575060308360ff161015801561210b575060398360ff1611155b155b801561212e575060618360ff161015801561212c5750607a8360ff1611155b155b1561213f5750600095945050505050565b8061214981613f2a565b9150506120cc565b50600195945050505050565b6000806121918360408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a816000015111156121e1576121bc6121b0826000600a612d69565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b81491505b50919050565b6000806121f387611f7b565b5060c954604051634f558e7960e01b8152600481018390529192506001600160a01b031690634f558e7990602401602060405180830381865afa15801561223e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122629190613f85565b8015612353575060c9546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e90602401602060405180830381865afa1580156122b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122d69190614006565b6001600160a01b03161480612353575060c95460405163d9548e5360e01b8152600481018390526001600160a01b039091169063d9548e5390602401602060405180830381865afa15801561232f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123539190613f85565b15612444576001600160401b038416156123d55760c954604051631fb9763760e11b81526001600160401b0386166004820152602481018390526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b1580156123bc57600080fd5b505af11580156123d0573d6000803e3d6000fd5b505050505b60c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be069061240d908b908b908b908b908a90600401614075565b600060405180830381600087803b15801561242757600080fd5b505af115801561243b573d6000803e3d6000fd5b5050505061263b565b61244d81612da8565b61245687612e07565b8015612463575086516002145b801561247657506001600160401b038416155b156125545760ca5487516001600160a01b039091169063c36c2125908a908a906000906124a5576124a5613e57565b602090810291909101015160cc546040516001600160e01b031960e086901b1681526124df9392916001600160a01b0316906004016140d4565b600060405180830381600087803b1580156124f957600080fd5b505af115801561250d573d6000803e3d6000fd5b5050505060008651111561254f5760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae749061240d90899089908690600401614109565b61263b565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b79061258c908b908b908b908b908a90600401614075565b600060405180830381600087803b1580156125a657600080fd5b505af11580156125ba573d6000803e3d6000fd5b505050506001600160401b0384161561263b5760c954604051631fb9763760e11b81526001600160401b0386166004820152602481018390526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b15801561262257600080fd5b505af1158015612636573d6000803e3d6000fd5b505050505b979650505050505050565b610b7a6000805160206143a283398151915282612c01565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6126b8610cbd565b156126d55760405162461bcd60e51b815260040161089a90613eea565b600080516020614382833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611f5e611d16565b6000612725600084612cb5565b600081815260cd602052604090209091506127408482614185565b50600081815260cf602052604090819020805460ff19168415151790555181907f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf89809061278d9086906138e1565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa1580156127de573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128029190613f85565b610b645760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c60906109e59084908790600401614244565b600054610100900460ff1661285f5760405162461bcd60e51b815260040161089a90614265565b610c1b61286a611d16565b61265e565b600054610100900460ff166128965760405162461bcd60e51b815260040161089a90614265565b610c1b60006128a3611d16565b612c01565b600054610100900460ff166113f05760405162461bcd60e51b815260040161089a90614265565b600054610100900460ff166128f65760405162461bcd60e51b815260040161089a90614265565b600080516020614382833981519152805460ff19169055565b600061292361291e8789613cbf565b611f7b565b506040516bffffffffffffffffffffffff1930606090811b821660208401524660348401528b811b82166054840152606883018490526001600160c01b031960c08a901b1660888401526090830188905286901b1660b08201529091506000906129ff9084906129f99060c401604051602081830303815290604052805190602001206040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b90612e61565b9050612a0a81611370565b612a625760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a205349474e45525f49535f4e4f545f4d49604482015263272a22a960e11b606482015260840161089a565b42866001600160401b031611612ac45760405162461bcd60e51b815260206004820152602160248201527f4d696e74696e674d616e616765723a20455850495245445f5349474e415455526044820152604560f81b606482015260840161089a565b505050505050505050565b6000612b168a612adf8a8c613cbf565b612ae9898b613cbf565b612af3888a613cbf565b60008f6001600160a01b0316612b07611d16565b6001600160a01b0316146121e7565b9050896001600160a01b0316612b2a611d16565b6001600160a01b0316827fa545b6fd3355e8d57f8c8147bafe740545bd3ea1f94bef2576a6d532a7c3b6058686604051612b779291909182526001600160a01b0316602082015260400190565b60405180910390a450505050505050505050565b612b93611dbd565b6001600160a01b038116612bf85760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161089a565b610b7a8161265e565b610c078282611d36565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b03163303612c4c575060331936013560601c90565b503390565b612c5b82826111ea565b610c0757612c73816001600160a01b03166014612e85565b612c7e836020612e85565b604051602001612c8f9291906142b0565b60408051601f198184030181529082905262461bcd60e51b825261089a916004016138e1565b60008151600003612d085760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d5054590000000000604482015260640161089a565b8282604051602001612d1a9190614325565b60405160208183030381529060405280519060200120604051602001612d4a929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b60408051808201909152600080825260208201526040518060400160405280838152602001848660200151612d9e9190614341565b9052949350505050565b612db18161138a565b15612dfe5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b4544000000604482015260640161089a565b610b7a81613020565b600080612e1e60008460018651611f9c9190613f72565b60ca549091506001600160a01b031615801590612e5a5750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6000806000612e7085856130a4565b91509150612e7d816130e9565b509392505050565b60606000612e94836002614354565b612e9f906002614341565b6001600160401b03811115612eb657612eb66136bd565b6040519080825280601f01601f191660200182016040528015612ee0576020820181803683370190505b509050600360fc1b81600081518110612efb57612efb613e57565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612f2a57612f2a613e57565b60200101906001600160f81b031916908160001a9053506000612f4e846002614354565b612f59906001614341565b90505b6001811115612fd1576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612f8d57612f8d613e57565b1a60f81b828281518110612fa357612fa3613e57565b60200101906001600160f81b031916908160001a90535060049490941c93612fca81613fbb565b9050612f5c565b508315612e5a5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161089a565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260019061305f906060016113c5565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b60008082516041036130da5760208301516040840151606085015160001a6130ce8782858561329f565b945094505050506130e2565b506000905060025b9250929050565b60008160048111156130fd576130fd61436b565b036131055750565b60018160048111156131195761311961436b565b036131665760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015260640161089a565b600281600481111561317a5761317a61436b565b036131c75760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015260640161089a565b60038160048111156131db576131db61436b565b036132335760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b606482015260840161089a565b60048160048111156132475761324761436b565b03610b7a5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b606482015260840161089a565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156132d65750600090506003613383565b8460ff16601b141580156132ee57508460ff16601c14155b156132ff5750600090506004613383565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613353573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661337c57600060019250925050613383565b9150600090505b94509492505050565b50805461339890613fd2565b6000825580601f106133a8575050565b601f016020900490600052602060002090810190610b7a91905b808211156133d657600081556001016133c2565b5090565b6000602082840312156133ec57600080fd5b81356001600160e01b031981168114612e5a57600080fd5b6001600160401b0381168114610b7a57600080fd5b803561342481613404565b919050565b6000806040838503121561343c57600080fd5b823561344781613404565b946020939093013593505050565b60006020828403121561346757600080fd5b5035919050565b6001600160a01b0381168114610b7a57600080fd5b80356134248161346e565b600080604083850312156134a157600080fd5b8235915060208301356134b38161346e565b809150509250929050565b6000602082840312156134d057600080fd5b8135612e5a8161346e565b60008083601f8401126134ed57600080fd5b5081356001600160401b0381111561350457600080fd5b6020830191508360208260051b85010111156130e257600080fd5b8015158114610b7a57600080fd5b60008060008060008060008060a0898b03121561354957600080fd5b88356135548161346e565b975060208901356001600160401b038082111561357057600080fd5b61357c8c838d016134db565b909950975060408b013591508082111561359557600080fd5b6135a18c838d016134db565b909750955060608b01359150808211156135ba57600080fd5b506135c78b828c016134db565b90945092505060808901356135db8161351f565b809150509295985092959890939650565b600080600080600080600080600060c08a8c03121561360a57600080fd5b89356136158161346e565b985060208a01356001600160401b038082111561363157600080fd5b61363d8d838e016134db565b909a50985060408c013591508082111561365657600080fd5b6136628d838e016134db565b909850965060608c013591508082111561367b57600080fd5b506136888c828d016134db565b90955093505060808a013561369c81613404565b915060a08a01356136ac8161351f565b809150509295985092959850929598565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b03811182821017156136fb576136fb6136bd565b604052919050565b60006001600160401b0382111561371c5761371c6136bd565b5060051b60200190565b6000602080838503121561373957600080fd5b82356001600160401b0381111561374f57600080fd5b8301601f8101851361376057600080fd5b803561377361376e82613703565b6136d3565b81815260059190911b8201830190838101908783111561379257600080fd5b928401925b8284101561263b5783356137aa8161346e565b82529284019290840190613797565b60008083601f8401126137cb57600080fd5b5081356001600160401b038111156137e257600080fd5b6020830191508360208285010111156130e257600080fd5b6000806020838503121561380d57600080fd5b82356001600160401b0381111561382357600080fd5b61382f858286016137b9565b90969095509350505050565b60008060006040848603121561385057600080fd5b83356001600160401b0381111561386657600080fd5b613872868287016137b9565b90945092505060208401356138868161351f565b809150509250925092565b60005b838110156138ac578181015183820152602001613894565b50506000910152565b600081518084526138cd816020860160208601613891565b601f01601f19169290920160200192915050565b602081526000612e5a60208301846138b5565b60008060008060008060c0878903121561390d57600080fd5b86356139188161346e565b955060208701356139288161346e565b945060408701356139388161346e565b935060608701356139488161346e565b925060808701356139588161346e565b915060a08701356139688161346e565b809150509295509295509295565b6000806020838503121561398957600080fd5b82356001600160401b0381111561399f57600080fd5b61382f858286016134db565b600080600080600080600080600080600060e08c8e0312156139cc57600080fd5b6139d58c613483565b9a506001600160401b038060208e013511156139f057600080fd5b613a008e60208f01358f016134db565b909b50995060408d0135811015613a1657600080fd5b613a268e60408f01358f016134db565b909950975060608d0135811015613a3c57600080fd5b613a4c8e60608f01358f016134db565b9097509550613a5d60808e01613419565b945060a08d013593508060c08e01351115613a7757600080fd5b50613a888d60c08e01358e016137b9565b81935080925050509295989b509295989b9093969950565b6000806000806000806000806000806000806101008d8f031215613ac357600080fd5b613acc8d613483565b9b506001600160401b0360208e01351115613ae657600080fd5b613af68e60208f01358f016134db565b909b5099506001600160401b0360408e01351115613b1357600080fd5b613b238e60408f01358f016134db565b90995097506001600160401b0360608e01351115613b4057600080fd5b613b508e60608f01358f016134db565b9097509550613b6160808e01613419565b9450613b6f60a08e01613483565b935060c08d013592506001600160401b0360e08e01351115613b9057600080fd5b613ba08e60e08f01358f016137b9565b81935080925050509295989b509295989b509295989b565b60008060408385031215613bcb57600080fd5b8235613bd68161346e565b915060208301356134b38161346e565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b600060208284031215613c2d57600080fd5b8151612e5a81613404565b60208082526023908201527f4d696e74696e674d616e616765723a20544f4b454e5f4e4f545f455850495241604082015262424c4560e81b606082015260800190565b60208082526024908201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604082015263272a22a960e11b606082015260800190565b6000613ccd61376e84613703565b80848252602080830192508560051b850136811115613ceb57600080fd5b855b81811015613d7d5780356001600160401b0380821115613d0d5760008081fd5b90880190601f3681840112613d225760008081fd5b823582811115613d3457613d346136bd565b613d45818301601f191688016136d3565b92508083523687828601011115613d5e57600091508182fd5b8087850188850137600090830187015250865250938201938201613ced565b50919695505050505050565b60208082526026908201527f4d696e74696e674d616e616765723a20535542444f4d41494e535f4e4f545f41604082015265131313d5d15160d21b606082015260800190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b60208082526026908201527f4d696e74696e674d616e616765723a20544c445f455850495241424c455f4d496040820152650a69a82a886960d31b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b6020808252601d908201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c4944000000604082015260600190565b60208082526026908201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860408201526512509255115160d21b606082015260800190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b600060018201613f3c57613f3c613f14565b5060010190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b8181038181111561086d5761086d613f14565b600060208284031215613f9757600080fd5b8151612e5a8161351f565b600060208284031215613fb457600080fd5b5051919050565b600081613fca57613fca613f14565b506000190190565b600181811c90821680613fe657607f821691505b6020821081036121e157634e487b7160e01b600052602260045260246000fd5b60006020828403121561401857600080fd5b8151612e5a8161346e565b6000815180845260208085019450848260051b860182860160005b858110156140685783830389526140568383516138b5565b9885019892509084019060010161403e565b5090979650505050505050565b6001600160a01b038616815260a06020820181905260009061409990830187614023565b82810360408401526140ab8187614023565b905082810360608401526140bf8186614023565b91505082151560808301529695505050505050565b600060018060a01b038086168352606060208401526140f660608401866138b5565b9150808416604084015250949350505050565b60608152600061411c6060830186614023565b828103602084015261412e8186614023565b915050826040830152949350505050565b601f821115610b6457600081815260208120601f850160051c810160208610156141665750805b601f850160051c820191505b8181101561131f57828155600101614172565b81516001600160401b0381111561419e5761419e6136bd565b6141b2816141ac8454613fd2565b8461413f565b602080601f8311600181146141e757600084156141cf5750858301515b600019600386901b1c1916600185901b17855561131f565b600085815260208120601f198616915b82811015614216578886015182559484019460019091019084016141f7565b50858210156142345787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b82815260406020820152600061425d60408301846138b5565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516142e8816017850160208801613891565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351614319816028840160208801613891565b01602801949350505050565b60008251614337818460208701613891565b9190910192915050565b8082018082111561086d5761086d613f14565b808202811582820484141761086d5761086d613f14565b634e487b7160e01b600052602160045260246000fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
