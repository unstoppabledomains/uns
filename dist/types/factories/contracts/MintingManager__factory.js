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
const _bytecode = "0x608060405234801561001057600080fd5b50614d47806100206000396000f3fe6080604052600436106102935760003560e01c806391d148541161015a578063cc2a9a5b116100c1578063d7db74c71161007a578063d7db74c714610824578063ec52738914610837578063f2fde38b14610857578063f5243bc414610877578063f940e38514610897578063ffa1ad74146108b757600080fd5b8063cc2a9a5b14610762578063cc2c3fc414610782578063ceeb4f50146107a2578063d1f5692c146107c2578063d5391393146107e2578063d547741f1461080457600080fd5b8063a3f4df7e11610113578063a3f4df7e14610675578063a849d65c146106c2578063aa271e1a146106e2578063b0aa98c714610702578063b3ab15fb14610722578063b9998a241461074257600080fd5b806391d14854146105cb578063983b2d56146105eb578063986502751461060b57806399e0dd7c14610620578063a217fddf14610640578063a3a3f7f61461065557600080fd5b80635c975abb116101fe57806371e2a657116101b757806371e2a6571461052557806377a2a5891461054557806381c81d35146105655780638456cb59146105785780638da5cb5b1461058d578063906cecc1146105ab57600080fd5b80635c975abb146104885780635cd7e3b31461049d5780635e22cd86146104bd5780635fc1964f146104dd578063634486da146104fd578063715018a61461051057600080fd5b806336568abe1161025057806336568abe1461038d5780633f41b614146103ad5780633f4ba83a146103e557806351cff8d9146103fa578063572b6c051461041a5780635b6fa8db1461046857600080fd5b806301ffc9a7146102985780631edb948e146102cd578063248a9ca3146102ef578063268b15ed1461032d5780632f2ff15d1461034d5780633092afd51461036d575b600080fd5b3480156102a457600080fd5b506102b86102b3366004613c2e565b6108e8565b60405190151581526020015b60405180910390f35b3480156102d957600080fd5b506102ed6102e8366004613c7d565b61091f565b005b3480156102fb57600080fd5b5061031f61030a366004613ca9565b60009081526097602052604090206001015490565b6040519081526020016102c4565b34801561033957600080fd5b506102ed610348366004613d03565b610b04565b34801561035957600080fd5b506102ed610368366004613d6e565b610b97565b34801561037957600080fd5b506102ed610388366004613d9e565b610bc1565b34801561039957600080fd5b506102ed6103a8366004613d6e565b610bd5565b3480156103b957600080fd5b5060c9546103cd906001600160a01b031681565b6040516001600160a01b0390911681526020016102c4565b3480156103f157600080fd5b506102ed610c63565b34801561040657600080fd5b506102ed610415366004613d9e565b610c75565b34801561042657600080fd5b506102b8610435366004613d9e565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561047457600080fd5b5060cc546103cd906001600160a01b031681565b34801561049457600080fd5b506102b8610d15565b3480156104a957600080fd5b506102ed6104b8366004613e0d565b610d2b565b3480156104c957600080fd5b506102ed6104d8366004613ecc565b610f8f565b3480156104e957600080fd5b506102ed6104f8366004614006565b6111dd565b6102ed61050b366004613d9e565b611225565b34801561051c57600080fd5b506102ed6112e8565b34801561053157600080fd5b506102ed610540366004614006565b6112fa565b34801561055157600080fd5b5060ce546103cd906001600160a01b031681565b6102ed610573366004613d9e565b611342565b34801561058457600080fd5b506102ed6113bf565b34801561059957600080fd5b506033546001600160a01b03166103cd565b3480156105b757600080fd5b506102ed6105c63660046140a4565b6113cf565b3480156105d757600080fd5b506102b86105e6366004613d6e565b611455565b3480156105f757600080fd5b506102ed610606366004613d9e565b611480565b34801561061757600080fd5b506102ed611491565b34801561062c57600080fd5b506102ed61063b3660046140ff565b6114ab565b34801561064c57600080fd5b5061031f600081565b34801561066157600080fd5b506102ed610670366004614140565b611592565b34801561068157600080fd5b506106b5604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102c491906141e6565b3480156106ce57600080fd5b5060cb546103cd906001600160a01b031681565b3480156106ee57600080fd5b506102b86106fd366004613d9e565b6115db565b34801561070e57600080fd5b506102b861071d366004613ca9565b6115f5565b34801561072e57600080fd5b506102ed61073d366004613d9e565b611653565b34801561074e57600080fd5b506102ed61075d366004613d9e565b61167d565b34801561076e57600080fd5b506102ed61077d3660046141f9565b6116c2565b34801561078e57600080fd5b5060ca546103cd906001600160a01b031681565b3480156107ae57600080fd5b506102ed6107bd36600461427b565b611b45565b3480156107ce57600080fd5b506102ed6107dd366004614330565b611be9565b3480156107ee57600080fd5b5061031f600080516020614d1b83398151915281565b34801561081057600080fd5b506102ed61081f366004613d6e565b611ca0565b6102ed610832366004614365565b611cc5565b34801561084357600080fd5b506102ed610852366004613ca9565b611e55565b34801561086357600080fd5b506102ed610872366004613d9e565b611ec7565b34801561088357600080fd5b506102ed61089236600461445a565b611ee3565b3480156108a357600080fd5b506102ed6108b2366004614572565b612095565b3480156108c357600080fd5b506106b5604051806040016040528060058152602001640302e352e360dc1b81525081565b60006001600160e01b03198216637965db0b60e01b148061091957506301ffc9a760e01b6001600160e01b03198316145b92915050565b61092a6106fd612211565b61094f5760405162461bcd60e51b8152600401610946906145a0565b60405180910390fd5b60c95460405163baef73e960e01b8152600481018390526000916001600160a01b03169063baef73e990602401602060405180830381865afa158015610999573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109bd91906145d5565b9050806001600160401b0316600003610a245760405162461bcd60e51b815260206004820152602360248201527f4d696e74696e674d616e616765723a20544f4b454e5f4e4f545f455850495241604482015262424c4560e81b6064820152608401610946565b806001600160401b0316836001600160401b031611610a915760405162461bcd60e51b815260206004820152602360248201527f4d696e74696e674d616e616765723a204558504952595f4e4f545f455854454e60448201526211115160ea1b6064820152608401610946565b60c954604051631fb9763760e11b81526001600160401b0385166004820152602481018490526001600160a01b0390911690633f72ec6e906044015b600060405180830381600087803b158015610ae757600080fd5b505af1158015610afb573d6000803e3d6000fd5b50505050505050565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250610b479350859250849150612220565b610b4f610d15565b15610b6c5760405162461bcd60e51b8152600401610946906145f2565b6060610afb610b79612211565b610b8c88610b8789896123ee565b61241a565b83846000600161252b565b600082815260976020526040902060010154610bb281612a7f565b610bbc8383612a90565b505050565b610bc9612b17565b610bd281612b90565b50565b610bdd612211565b6001600160a01b0316816001600160a01b031614610c555760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610946565b610c5f8282612ba8565b5050565b610c6b612b17565b610c73612c2d565b565b610c7d612b17565b6001600160a01b038116610c9057600080fd5b60405147906001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610cc8573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905260008183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a15050565b600080516020614cfb8339815191525460ff1690565b610d35868861461c565b8051600203610d6a57610d496106fd612211565b610d655760405162461bcd60e51b8152600401610946906146e6565b610eaf565b6000610d7582612cd5565b60c9549092506001600160a01b0316905063430c2081610d93612211565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610dde573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e02919061472a565b80610e91575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610e5b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e7f919061472a565b8015610e915750610e916106fd612211565b610ead5760405162461bcd60e51b815260040161094690614747565b505b610eb9878961461c565b6000600282511015610edd5760405162461bcd60e51b815260040161094690614796565b610f32610f1160008460018651610ef491906147f1565b81518110610f0457610f04614804565b6020026020010151612d10565b83600081518110610f2457610f24614804565b602002602001015183612220565b610f3a610d15565b15610f575760405162461bcd60e51b8152600401610946906145f2565b610f818b610f658b8d61461c565b610f6f8a8c61461c565b610f79898b61461c565b60008961252b565b505050505050505050505050565b610f99878961461c565b8051600203610fce57610fad6106fd612211565b610fc95760405162461bcd60e51b8152600401610946906146e6565b611113565b6000610fd982612cd5565b60c9549092506001600160a01b0316905063430c2081610ff7612211565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015611042573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611066919061472a565b806110f5575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa1580156110bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110e3919061472a565b80156110f557506110f56106fd612211565b6111115760405162461bcd60e51b815260040161094690614747565b505b61111d888a61461c565b836001600160401b03166002825110156111495760405162461bcd60e51b815260040161094690614796565b611160610f1160008460018651610ef491906147f1565b611168610d15565b156111855760405162461bcd60e51b8152600401610946906145f2565b60028a146111a55760405162461bcd60e51b81526004016109469061481a565b6111ce8c6111b38c8e61461c565b6111bd8b8d61461c565b6111c78a8c61461c565b898961252b565b50505050505050505050505050565b6111e5612b17565b60005b8151811015610c5f5761121382828151811061120657611206614804565b6020026020010151612b90565b8061121d81614860565b9150506111e8565b6112306106fd612211565b61124c5760405162461bcd60e51b8152600401610946906145a0565b6001600160a01b0381166112a25760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610946565b6112ab81612dc4565b6112b3611491565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610c5f573d6000803e3d6000fd5b6112f0612b17565b610c736000612ddc565b611302612b17565b60005b8151811015610c5f5761133082828151811061132357611323614804565b6020026020010151612dc4565b8061133a81614860565b915050611305565b61134d6106fd612211565b6113695760405162461bcd60e51b8152600401610946906145a0565b6001600160a01b0381166112ab5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610946565b6113c7612b17565b610c73612e2e565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052506114129350859250849150612220565b61141a610d15565b156114375760405162461bcd60e51b8152600401610946906145f2565b606061144b87610b8c88610b8789896123ee565b5050505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b611488612b17565b610bd281612dc4565b610c73600080516020614d1b8339815191526103a8612211565b6114b3612b17565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906114e59085908590600401614879565b600060405180830381600087803b1580156114ff57600080fd5b505af1158015611513573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610c5f90505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061155c9085908590600401614879565b600060405180830381600087803b15801561157657600080fd5b505af115801561158a573d6000803e3d6000fd5b505050505050565b61159a612b17565b610bbc83838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250859250612e96915050565b6000610919600080516020614d1b83398151915283611455565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611649906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b61165b612b17565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b611685612b17565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b600054610100900460ff16158080156116e25750600054600160ff909116105b806116fc5750303b1580156116fc575060005460ff166001145b61175f5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610946565b6000805460ff191660011790558015611782576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce80549091169185169190911790556117e0612fb6565b6117e8612fed565b6117f182613026565b6117f961304d565b604080516102e08101825260066102a082018181526563727970746f60d01b6102c0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b8183015261016084015283518085018552600280825261686960f01b8284015261018085019190915284518086018652928352656b726573757360d01b838301526101a084019290925283518085018552600580825264616e696d6560d81b828401526101c085019190915284518086018652818152646d616e676160d81b818401526101e085015284518086018652600981526862696e616e6365757360b81b8184015261020085015284518086018652818152647265616c6d60d81b818401526102208501528451808601865292835261676f60f01b83830152610240840192909252835180850185526008815267185b1d1a5b5a5cdd60c21b81830152610260840152835180850190945290835264707564677960d81b9083015261028081019190915260005b6015811015611acf57611abd828260158110611ab157611ab1614804565b60200201516000612e96565b80611ac781614860565b915050611a93565b50611af660405180604001604052806003815260200162636f6d60e81b8152506001612e96565b508015610afb576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250611b889350859250849150612220565b611b90610d15565b15611bad5760405162461bcd60e51b8152600401610946906145f2565b611bdc8a611bbf8b610b878c8c6123ee565b611bc9888a61461c565b611bd3878961461c565b6000600161252b565b5050505050505050505050565b611bf1612b17565b60005b81811015610bbc5760c9546001600160a01b03166350960239848484818110611c1f57611c1f614804565b9050602002016020810190611c349190613d9e565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b158015611c7557600080fd5b505af1158015611c89573d6000803e3d6000fd5b505050508080611c9890614860565b915050611bf4565b600082815260976020526040902060010154611cbb81612a7f565b610bbc8383612ba8565b611ccf898b61461c565b6000600282511015611cf35760405162461bcd60e51b815260040161094690614796565b611d0a610f1160008460018651610ef491906147f1565b611d12610d15565b15611d2f5760405162461bcd60e51b8152600401610946906145f2565b60028b14611d4f5760405162461bcd60e51b81526004016109469061481a565b611d958d8d8d898960008a8a8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061308d92505050565b84341015611de55760405162461bcd60e51b815260206004820181905260248201527f4d696e74696e674d616e616765723a204e4f545f454e4f5547485f46554e44536044820152606401610946565b611df78d8d8d8d8d8d8d8c600061324d565b843411156111ce57611e07612211565b6001600160a01b03166108fc611e1d87346147f1565b6040518115909202916000818181858888f19350505050158015611e45573d6000803e3d6000fd5b5050505050505050505050505050565b611e5d612b17565b611e6681613309565b611e825760405162461bcd60e51b8152600401610946906148a8565b600081815260cd60205260408120611e9991613be0565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611ecf612b17565b611ed88161332f565b610bd26000826133a5565b611eed8a8c61461c565b6000600282511015611f115760405162461bcd60e51b815260040161094690614796565b611f28610f1160008460018651610ef491906147f1565b611f30610d15565b15611f4d5760405162461bcd60e51b8152600401610946906145f2565b60028c14611f6d5760405162461bcd60e51b81526004016109469061481a565b611fb28e8e8e8a898b8a8a8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061308d92505050565b856001600160a01b03166323b872dd611fc9612211565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018890526064016020604051808303816000875af115801561201c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612040919061472a565b6120845760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610946565b611e458e8e8e8e8e8e8e8c8e61324d565b61209d612b17565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa1580156120e4573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061210891906148ea565b60405163a9059cbb60e01b81526001600160a01b038481166004830152602482018390529192509084169063a9059cbb906044016020604051808303816000875af115801561215b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061217f919061472a565b6121c35760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610946565b604080516001600160a01b0384811682526020820184905285168183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a1505050565b600061221b6133af565b905090565b61222983613309565b6122455760405162461bcd60e51b8152600401610946906148a8565b600083815260cf602052604090205460ff161515811515146122b85760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544c445f455850495241424c455f4d496044820152650a69a82a886960d31b6064820152608401610946565b60006122eb8360408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a816000015111156123935761231661230a826000600a6133f5565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8036123935760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610946565b61239c83613434565b6123e85760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c49440000006044820152606401610946565b50505050565b60608282604051602001612403929190614903565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081612434579050509050828160008151811061245f5761245f614804565b602002602001018190525060cd600085815260200190815260200160002080546124889061492b565b80601f01602080910402602001604051908101604052809291908181526020018280546124b49061492b565b80156125015780601f106124d657610100808354040283529160200191612501565b820191906000526020600020905b8154815290600101906020018083116124e457829003601f168201915b50505050508160018151811061251957612519614804565b60209081029190910101529392505050565b600080600061253988612cd5565b9150915083801561254b575060028851115b80156125cd575060c9546040516331a9108f60e11b8152600481018390526001600160a01b038b8116921690636352211e90602401602060405180830381865afa15801561259d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125c19190614965565b6001600160a01b031614155b1561262d5760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b6064820152608401610946565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015612676573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061269a919061472a565b801561278b575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa1580156126ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061270e9190614965565b6001600160a01b0316148061278b575060c95460405163d9548e5360e01b8152600481018490526001600160a01b039091169063d9548e5390602401602060405180830381865afa158015612767573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061278b919061472a565b1561287c576001600160401b0385161561280d5760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b1580156127f457600080fd5b505af1158015612808573d6000803e3d6000fd5b505050505b60c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690612845908c908c908c908c908b906004016149d7565b600060405180830381600087803b15801561285f57600080fd5b505af1158015612873573d6000803e3d6000fd5b50505050612a73565b61288582613598565b61288e886135f7565b801561289b575087516002145b80156128ae57506001600160401b038516155b1561298c5760ca5488516001600160a01b039091169063c36c2125908b908b906000906128dd576128dd614804565b602090810291909101015160cc546040516001600160e01b031960e086901b1681526129179392916001600160a01b031690600401614a36565b600060405180830381600087803b15801561293157600080fd5b505af1158015612945573d6000803e3d6000fd5b505050506000875111156129875760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490612845908a908a908790600401614a6b565b612a73565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b7906129c4908c908c908c908c908b906004016149d7565b600060405180830381600087803b1580156129de57600080fd5b505af11580156129f2573d6000803e3d6000fd5b505050506001600160401b03851615612a735760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b158015612a5a57600080fd5b505af1158015612a6e573d6000803e3d6000fd5b505050505b50979650505050505050565b610bd281612a8b612211565b613651565b612a9a8282611455565b610c5f5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612ad3612211565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612b1f612211565b6001600160a01b0316612b3a6033546001600160a01b031690565b6001600160a01b031614610c735760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610946565b610bd2600080516020614d1b83398151915282611ca0565b612bb28282611455565b15610c5f5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612be9612211565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b612c35610d15565b612c785760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610946565b600080516020614cfb833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa612cb8612211565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b8015612d0a57829150612cf68285610ef46001856147f1565b925080612d0281614aa1565b915050612cdd565b50915091565b60008151600003612d635760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610946565b8282604051602001612d759190614ab8565b60405160208183030381529060405280519060200120604051602001612da5929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610bd2600080516020614d1b833981519152826133a5565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b612e36610d15565b15612e535760405162461bcd60e51b8152600401610946906145f2565b600080516020614cfb833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612cb8612211565b6000612ea3600084612d10565b600081815260cd60205260409020909150612ebe8482614b1a565b50600081815260cf602052604090819020805460ff19168415151790555181907f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf898090612f0b9086906141e6565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015612f5c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612f80919061472a565b610bbc5760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c6090610acd9084908790600401614bd9565b600054610100900460ff16612fdd5760405162461bcd60e51b815260040161094690614bfa565b610c73612fe8612211565b612ddc565b600054610100900460ff166130145760405162461bcd60e51b815260040161094690614bfa565b610c736000613021612211565b6133a5565b600054610100900460ff166116855760405162461bcd60e51b815260040161094690614bfa565b600054610100900460ff166130745760405162461bcd60e51b815260040161094690614bfa565b600080516020614cfb833981519152805460ff19169055565b60006130a161309c878961461c565b612cd5565b506040516bffffffffffffffffffffffff1930606090811b821660208401524660348401528b811b82166054840152606883018490526001600160c01b031960c08a901b1660888401526090830188905286901b1660b082015290915060009061317d9084906131779060c401604051602081830303815290604052805190602001206040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b906136b5565b9050613188816115db565b6131e05760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a205349474e45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610946565b42866001600160401b0316116132425760405162461bcd60e51b815260206004820152602160248201527f4d696e74696e674d616e616765723a20455850495245445f5349474e415455526044820152604560f81b6064820152608401610946565b505050505050505050565b60006132948a61325d8a8c61461c565b613267898b61461c565b613271888a61461c565b60008f6001600160a01b0316613285612211565b6001600160a01b03161461252b565b9050896001600160a01b03166132a8612211565b6001600160a01b0316827fa545b6fd3355e8d57f8c8147bafe740545bd3ea1f94bef2576a6d532a7c3b60586866040516132f59291909182526001600160a01b0316602082015260400190565b60405180910390a450505050505050505050565b600081815260cd6020526040812080548291906133259061492b565b9050119050919050565b613337612b17565b6001600160a01b03811661339c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610946565b610bd281612ddc565b610c5f8282612a90565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b031633036133f0575060331936013560601c90565b503390565b6040805180820190915260008082526020820152604051806040016040528083815260200184866020015161342a9190614c45565b9052949350505050565b6000815160000361344757506000919050565b60208201805160f81c60308110801590613465575060398160ff1611155b158015613487575060618160ff16101580156134855750607a8160ff1611155b155b15613496575060009392505050565b83516001811115613504576134b8836134b06001846147f1565b015160f81c90565b915060308260ff16101580156134d2575060398260ff1611155b1580156134f4575060618260ff16101580156134f25750607a8260ff1611155b155b1561350457506000949350505050565b60015b6135126001836147f1565b81101561358c578381015160f81c9250602d8314801590613548575060308360ff1610158015613546575060398360ff1611155b155b8015613569575060618360ff16101580156135675750607a8360ff1611155b155b1561357a5750600095945050505050565b8061358481614860565b915050613507565b50600195945050505050565b6135a1816115f5565b156135ee5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610946565b610bd2816136d9565b60008061360e60008460018651610ef491906147f1565b60ca549091506001600160a01b03161580159061364a5750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b61365b8282611455565b610c5f57613673816001600160a01b0316601461375d565b61367e83602061375d565b60405160200161368f929190614c58565b60408051601f198184030181529082905262461bcd60e51b8252610946916004016141e6565b60008060006136c485856138f8565b915091506136d18161393d565b509392505050565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260019061371890606001611630565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b6060600061376c836002614ccd565b613777906002614c45565b6001600160401b0381111561378e5761378e613f9d565b6040519080825280601f01601f1916602001820160405280156137b8576020820181803683370190505b509050600360fc1b816000815181106137d3576137d3614804565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061380257613802614804565b60200101906001600160f81b031916908160001a9053506000613826846002614ccd565b613831906001614c45565b90505b60018111156138a9576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061386557613865614804565b1a60f81b82828151811061387b5761387b614804565b60200101906001600160f81b031916908160001a90535060049490941c936138a281614aa1565b9050613834565b50831561364a5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610946565b600080825160410361392e5760208301516040840151606085015160001a61392287828585613af3565b94509450505050613936565b506000905060025b9250929050565b600081600481111561395157613951614ce4565b036139595750565b600181600481111561396d5761396d614ce4565b036139ba5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610946565b60028160048111156139ce576139ce614ce4565b03613a1b5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610946565b6003816004811115613a2f57613a2f614ce4565b03613a875760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610946565b6004816004811115613a9b57613a9b614ce4565b03610bd25760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610946565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613b2a5750600090506003613bd7565b8460ff16601b14158015613b4257508460ff16601c14155b15613b535750600090506004613bd7565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613ba7573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613bd057600060019250925050613bd7565b9150600090505b94509492505050565b508054613bec9061492b565b6000825580601f10613bfc575050565b601f016020900490600052602060002090810190610bd291905b80821115613c2a5760008155600101613c16565b5090565b600060208284031215613c4057600080fd5b81356001600160e01b03198116811461364a57600080fd5b6001600160401b0381168114610bd257600080fd5b8035613c7881613c58565b919050565b60008060408385031215613c9057600080fd5b8235613c9b81613c58565b946020939093013593505050565b600060208284031215613cbb57600080fd5b5035919050565b60008083601f840112613cd457600080fd5b5081356001600160401b03811115613ceb57600080fd5b60208301915083602082850101111561393657600080fd5b600080600060408486031215613d1857600080fd5b8335925060208401356001600160401b03811115613d3557600080fd5b613d4186828701613cc2565b9497909650939450505050565b6001600160a01b0381168114610bd257600080fd5b8035613c7881613d4e565b60008060408385031215613d8157600080fd5b823591506020830135613d9381613d4e565b809150509250929050565b600060208284031215613db057600080fd5b813561364a81613d4e565b60008083601f840112613dcd57600080fd5b5081356001600160401b03811115613de457600080fd5b6020830191508360208260051b850101111561393657600080fd5b8015158114610bd257600080fd5b60008060008060008060008060a0898b031215613e2957600080fd5b8835613e3481613d4e565b975060208901356001600160401b0380821115613e5057600080fd5b613e5c8c838d01613dbb565b909950975060408b0135915080821115613e7557600080fd5b613e818c838d01613dbb565b909750955060608b0135915080821115613e9a57600080fd5b50613ea78b828c01613dbb565b9094509250506080890135613ebb81613dff565b809150509295985092959890939650565b600080600080600080600080600060c08a8c031215613eea57600080fd5b8935613ef581613d4e565b985060208a01356001600160401b0380821115613f1157600080fd5b613f1d8d838e01613dbb565b909a50985060408c0135915080821115613f3657600080fd5b613f428d838e01613dbb565b909850965060608c0135915080821115613f5b57600080fd5b50613f688c828d01613dbb565b90955093505060808a0135613f7c81613c58565b915060a08a0135613f8c81613dff565b809150509295985092959850929598565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715613fdb57613fdb613f9d565b604052919050565b60006001600160401b03821115613ffc57613ffc613f9d565b5060051b60200190565b6000602080838503121561401957600080fd5b82356001600160401b0381111561402f57600080fd5b8301601f8101851361404057600080fd5b803561405361404e82613fe3565b613fb3565b81815260059190911b8201830190838101908783111561407257600080fd5b928401925b8284101561409957833561408a81613d4e565b82529284019290840190614077565b979650505050505050565b600080600080606085870312156140ba57600080fd5b84356140c581613d4e565b93506020850135925060408501356001600160401b038111156140e757600080fd5b6140f387828801613cc2565b95989497509550505050565b6000806020838503121561411257600080fd5b82356001600160401b0381111561412857600080fd5b61413485828601613cc2565b90969095509350505050565b60008060006040848603121561415557600080fd5b83356001600160401b0381111561416b57600080fd5b61417786828701613cc2565b909450925050602084013561418b81613dff565b809150509250925092565b60005b838110156141b1578181015183820152602001614199565b50506000910152565b600081518084526141d2816020860160208601614196565b601f01601f19169290920160200192915050565b60208152600061364a60208301846141ba565b60008060008060008060c0878903121561421257600080fd5b863561421d81613d4e565b9550602087013561422d81613d4e565b9450604087013561423d81613d4e565b9350606087013561424d81613d4e565b9250608087013561425d81613d4e565b915060a087013561426d81613d4e565b809150509295509295509295565b60008060008060008060008060a0898b03121561429757600080fd5b88356142a281613d4e565b97506020890135965060408901356001600160401b03808211156142c557600080fd5b6142d18c838d01613cc2565b909850965060608b01359150808211156142ea57600080fd5b6142f68c838d01613dbb565b909650945060808b013591508082111561430f57600080fd5b5061431c8b828c01613dbb565b999c989b5096995094979396929594505050565b6000806020838503121561434357600080fd5b82356001600160401b0381111561435957600080fd5b61413485828601613dbb565b600080600080600080600080600080600060e08c8e03121561438657600080fd5b61438f8c613d63565b9a506001600160401b038060208e013511156143aa57600080fd5b6143ba8e60208f01358f01613dbb565b909b50995060408d01358110156143d057600080fd5b6143e08e60408f01358f01613dbb565b909950975060608d01358110156143f657600080fd5b6144068e60608f01358f01613dbb565b909750955061441760808e01613c6d565b945060a08d013593508060c08e0135111561443157600080fd5b506144428d60c08e01358e01613cc2565b81935080925050509295989b509295989b9093969950565b6000806000806000806000806000806000806101008d8f03121561447d57600080fd5b6144868d613d63565b9b506001600160401b0360208e013511156144a057600080fd5b6144b08e60208f01358f01613dbb565b909b5099506001600160401b0360408e013511156144cd57600080fd5b6144dd8e60408f01358f01613dbb565b90995097506001600160401b0360608e013511156144fa57600080fd5b61450a8e60608f01358f01613dbb565b909750955061451b60808e01613c6d565b945061452960a08e01613d63565b935060c08d013592506001600160401b0360e08e0135111561454a57600080fd5b61455a8e60e08f01358f01613cc2565b81935080925050509295989b509295989b509295989b565b6000806040838503121561458557600080fd5b823561459081613d4e565b91506020830135613d9381613d4e565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b6000602082840312156145e757600080fd5b815161364a81613c58565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b600061462a61404e84613fe3565b80848252602080830192508560051b85013681111561464857600080fd5b855b818110156146da5780356001600160401b038082111561466a5760008081fd5b90880190601f368184011261467f5760008081fd5b82358281111561469157614691613f9d565b6146a2818301601f19168801613fb3565b925080835236878286010111156146bb57600091508182fd5b808785018885013760009083018701525086525093820193820161464a565b50919695505050505050565b60208082526024908201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604082015263272a22a960e11b606082015260800190565b60006020828403121561473c57600080fd5b815161364a81613dff565b6020808252602f908201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060408201526e282927ab22a22fa7a92fa7aba722a960891b606082015260800190565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b81810381811115610919576109196147db565b634e487b7160e01b600052603260045260246000fd5b60208082526026908201527f4d696e74696e674d616e616765723a20535542444f4d41494e535f4e4f545f41604082015265131313d5d15160d21b606082015260800190565b600060018201614872576148726147db565b5060010190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6000602082840312156148fc57600080fd5b5051919050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c9082168061493f57607f821691505b60208210810361495f57634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561497757600080fd5b815161364a81613d4e565b600081518084526020808501808196508360051b8101915082860160005b858110156149ca5782840389526149b88483516141ba565b988501989350908401906001016149a0565b5091979650505050505050565b6001600160a01b038616815260a0602082018190526000906149fb90830187614982565b8281036040840152614a0d8187614982565b90508281036060840152614a218186614982565b91505082151560808301529695505050505050565b600060018060a01b03808616835260606020840152614a5860608401866141ba565b9150808416604084015250949350505050565b606081526000614a7e6060830186614982565b8281036020840152614a908186614982565b915050826040830152949350505050565b600081614ab057614ab06147db565b506000190190565b60008251614aca818460208701614196565b9190910192915050565b601f821115610bbc57600081815260208120601f850160051c81016020861015614afb5750805b601f850160051c820191505b8181101561158a57828155600101614b07565b81516001600160401b03811115614b3357614b33613f9d565b614b4781614b41845461492b565b84614ad4565b602080601f831160018114614b7c5760008415614b645750858301515b600019600386901b1c1916600185901b17855561158a565b600085815260208120601f198616915b82811015614bab57888601518255948401946001909101908401614b8c565b5085821015614bc95787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b828152604060208201526000614bf260408301846141ba565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b80820180821115610919576109196147db565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351614c90816017850160208801614196565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351614cc1816028840160208801614196565b01602801949350505050565b8082028115828204841417610919576109196147db565b634e487b7160e01b600052602160045260246000fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
