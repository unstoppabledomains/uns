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
const _bytecode = "0x608060405234801561001057600080fd5b50614d62806100206000396000f3fe6080604052600436106102935760003560e01c806391d148541161015a578063cc2a9a5b116100c1578063d7db74c71161007a578063d7db74c714610824578063ec52738914610837578063f2fde38b14610857578063f5243bc414610877578063f940e38514610897578063ffa1ad74146108b757600080fd5b8063cc2a9a5b14610762578063cc2c3fc414610782578063ceeb4f50146107a2578063d1f5692c146107c2578063d5391393146107e2578063d547741f1461080457600080fd5b8063a3f4df7e11610113578063a3f4df7e14610675578063a849d65c146106c2578063aa271e1a146106e2578063b0aa98c714610702578063b3ab15fb14610722578063b9998a241461074257600080fd5b806391d14854146105cb578063983b2d56146105eb578063986502751461060b57806399e0dd7c14610620578063a217fddf14610640578063a3a3f7f61461065557600080fd5b80635c975abb116101fe57806371e2a657116101b757806371e2a6571461052557806377a2a5891461054557806381c81d35146105655780638456cb59146105785780638da5cb5b1461058d578063906cecc1146105ab57600080fd5b80635c975abb146104885780635cd7e3b31461049d5780635e22cd86146104bd5780635fc1964f146104dd578063634486da146104fd578063715018a61461051057600080fd5b806336568abe1161025057806336568abe1461038d5780633f41b614146103ad5780633f4ba83a146103e557806351cff8d9146103fa578063572b6c051461041a5780635b6fa8db1461046857600080fd5b806301ffc9a7146102985780631edb948e146102cd578063248a9ca3146102ef578063268b15ed1461032d5780632f2ff15d1461034d5780633092afd51461036d575b600080fd5b3480156102a457600080fd5b506102b86102b3366004613c49565b6108e8565b60405190151581526020015b60405180910390f35b3480156102d957600080fd5b506102ed6102e8366004613c98565b61091f565b005b3480156102fb57600080fd5b5061031f61030a366004613cc4565b60009081526097602052604090206001015490565b6040519081526020016102c4565b34801561033957600080fd5b506102ed610348366004613d1e565b610b04565b34801561035957600080fd5b506102ed610368366004613d89565b610b97565b34801561037957600080fd5b506102ed610388366004613db9565b610bc1565b34801561039957600080fd5b506102ed6103a8366004613d89565b610bd5565b3480156103b957600080fd5b5060c9546103cd906001600160a01b031681565b6040516001600160a01b0390911681526020016102c4565b3480156103f157600080fd5b506102ed610c63565b34801561040657600080fd5b506102ed610415366004613db9565b610c75565b34801561042657600080fd5b506102b8610435366004613db9565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561047457600080fd5b5060cc546103cd906001600160a01b031681565b34801561049457600080fd5b506102b8610d15565b3480156104a957600080fd5b506102ed6104b8366004613e28565b610d2b565b3480156104c957600080fd5b506102ed6104d8366004613ee7565b610f8f565b3480156104e957600080fd5b506102ed6104f8366004614021565b6111dd565b6102ed61050b366004613db9565b611225565b34801561051c57600080fd5b506102ed6112e8565b34801561053157600080fd5b506102ed610540366004614021565b6112fa565b34801561055157600080fd5b5060ce546103cd906001600160a01b031681565b6102ed610573366004613db9565b611342565b34801561058457600080fd5b506102ed6113bf565b34801561059957600080fd5b506033546001600160a01b03166103cd565b3480156105b757600080fd5b506102ed6105c63660046140bf565b6113cf565b3480156105d757600080fd5b506102b86105e6366004613d89565b611455565b3480156105f757600080fd5b506102ed610606366004613db9565b611480565b34801561061757600080fd5b506102ed611491565b34801561062c57600080fd5b506102ed61063b36600461411a565b6114ab565b34801561064c57600080fd5b5061031f600081565b34801561066157600080fd5b506102ed61067036600461415b565b611592565b34801561068157600080fd5b506106b5604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102c49190614201565b3480156106ce57600080fd5b5060cb546103cd906001600160a01b031681565b3480156106ee57600080fd5b506102b86106fd366004613db9565b6115db565b34801561070e57600080fd5b506102b861071d366004613cc4565b6115f5565b34801561072e57600080fd5b506102ed61073d366004613db9565b611653565b34801561074e57600080fd5b506102ed61075d366004613db9565b61167d565b34801561076e57600080fd5b506102ed61077d366004614214565b6116c2565b34801561078e57600080fd5b5060ca546103cd906001600160a01b031681565b3480156107ae57600080fd5b506102ed6107bd366004614296565b611b60565b3480156107ce57600080fd5b506102ed6107dd36600461434b565b611c04565b3480156107ee57600080fd5b5061031f600080516020614d3683398151915281565b34801561081057600080fd5b506102ed61081f366004613d89565b611cbb565b6102ed610832366004614380565b611ce0565b34801561084357600080fd5b506102ed610852366004613cc4565b611e70565b34801561086357600080fd5b506102ed610872366004613db9565b611ee2565b34801561088357600080fd5b506102ed610892366004614475565b611efe565b3480156108a357600080fd5b506102ed6108b236600461458d565b6120b0565b3480156108c357600080fd5b506106b5604051806040016040528060058152602001640302e352e360dc1b81525081565b60006001600160e01b03198216637965db0b60e01b148061091957506301ffc9a760e01b6001600160e01b03198316145b92915050565b61092a6106fd61222c565b61094f5760405162461bcd60e51b8152600401610946906145bb565b60405180910390fd5b60c95460405163baef73e960e01b8152600481018390526000916001600160a01b03169063baef73e990602401602060405180830381865afa158015610999573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109bd91906145f0565b9050806001600160401b0316600003610a245760405162461bcd60e51b815260206004820152602360248201527f4d696e74696e674d616e616765723a20544f4b454e5f4e4f545f455850495241604482015262424c4560e81b6064820152608401610946565b806001600160401b0316836001600160401b031611610a915760405162461bcd60e51b815260206004820152602360248201527f4d696e74696e674d616e616765723a204558504952595f4e4f545f455854454e60448201526211115160ea1b6064820152608401610946565b60c954604051631fb9763760e11b81526001600160401b0385166004820152602481018490526001600160a01b0390911690633f72ec6e906044015b600060405180830381600087803b158015610ae757600080fd5b505af1158015610afb573d6000803e3d6000fd5b50505050505050565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250610b47935085925084915061223b565b610b4f610d15565b15610b6c5760405162461bcd60e51b81526004016109469061460d565b6060610afb610b7961222c565b610b8c88610b878989612409565b612435565b838460006001612546565b600082815260976020526040902060010154610bb281612a9a565b610bbc8383612aab565b505050565b610bc9612b32565b610bd281612bab565b50565b610bdd61222c565b6001600160a01b0316816001600160a01b031614610c555760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610946565b610c5f8282612bc3565b5050565b610c6b612b32565b610c73612c48565b565b610c7d612b32565b6001600160a01b038116610c9057600080fd5b60405147906001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610cc8573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905260008183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a15050565b600080516020614d168339815191525460ff1690565b610d358688614637565b8051600203610d6a57610d496106fd61222c565b610d655760405162461bcd60e51b815260040161094690614701565b610eaf565b6000610d7582612cf0565b60c9549092506001600160a01b0316905063430c2081610d9361222c565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610dde573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e029190614745565b80610e91575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610e5b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e7f9190614745565b8015610e915750610e916106fd61222c565b610ead5760405162461bcd60e51b815260040161094690614762565b505b610eb98789614637565b6000600282511015610edd5760405162461bcd60e51b8152600401610946906147b1565b610f32610f1160008460018651610ef4919061480c565b81518110610f0457610f0461481f565b6020026020010151612d2b565b83600081518110610f2457610f2461481f565b60200260200101518361223b565b610f3a610d15565b15610f575760405162461bcd60e51b81526004016109469061460d565b610f818b610f658b8d614637565b610f6f8a8c614637565b610f79898b614637565b600089612546565b505050505050505050505050565b610f998789614637565b8051600203610fce57610fad6106fd61222c565b610fc95760405162461bcd60e51b815260040161094690614701565b611113565b6000610fd982612cf0565b60c9549092506001600160a01b0316905063430c2081610ff761222c565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015611042573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110669190614745565b806110f5575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa1580156110bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110e39190614745565b80156110f557506110f56106fd61222c565b6111115760405162461bcd60e51b815260040161094690614762565b505b61111d888a614637565b836001600160401b03166002825110156111495760405162461bcd60e51b8152600401610946906147b1565b611160610f1160008460018651610ef4919061480c565b611168610d15565b156111855760405162461bcd60e51b81526004016109469061460d565b60028a146111a55760405162461bcd60e51b815260040161094690614835565b6111ce8c6111b38c8e614637565b6111bd8b8d614637565b6111c78a8c614637565b8989612546565b50505050505050505050505050565b6111e5612b32565b60005b8151811015610c5f576112138282815181106112065761120661481f565b6020026020010151612bab565b8061121d8161487b565b9150506111e8565b6112306106fd61222c565b61124c5760405162461bcd60e51b8152600401610946906145bb565b6001600160a01b0381166112a25760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610946565b6112ab81612ddf565b6112b3611491565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610c5f573d6000803e3d6000fd5b6112f0612b32565b610c736000612df7565b611302612b32565b60005b8151811015610c5f576113308282815181106113235761132361481f565b6020026020010151612ddf565b8061133a8161487b565b915050611305565b61134d6106fd61222c565b6113695760405162461bcd60e51b8152600401610946906145bb565b6001600160a01b0381166112ab5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610946565b6113c7612b32565b610c73612e49565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250611412935085925084915061223b565b61141a610d15565b156114375760405162461bcd60e51b81526004016109469061460d565b606061144b87610b8c88610b878989612409565b5050505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b611488612b32565b610bd281612ddf565b610c73600080516020614d368339815191526103a861222c565b6114b3612b32565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906114e59085908590600401614894565b600060405180830381600087803b1580156114ff57600080fd5b505af1158015611513573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610c5f90505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061155c9085908590600401614894565b600060405180830381600087803b15801561157657600080fd5b505af115801561158a573d6000803e3d6000fd5b505050505050565b61159a612b32565b610bbc83838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250859250612eb1915050565b6000610919600080516020614d3683398151915283611455565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611649906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b61165b612b32565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b611685612b32565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b600054610100900460ff16158080156116e25750600054600160ff909116105b806116fc5750303b1580156116fc575060005460ff166001145b61175f5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610946565b6000805460ff191660011790558015611782576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce80549091169185169190911790556117e0612fd1565b6117e8613008565b6117f182613041565b6117f9613068565b604080516103008101825260066102c082018181526563727970746f60d01b6102e0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b8183015261016084015283518085018552600280825261686960f01b8284015261018085019190915284518086018652838152656b726573757360d01b818401526101a085015284518086018652600580825264616e696d6560d81b828501526101c086019190915285518087018752818152646d616e676160d81b818501526101e086015285518087018752600981526862696e616e6365757360b81b8185015261020086015285518087018752818152647265616c6d60d81b818501526102208601528551808701875291825261676f60f01b82840152610240850191909152845180860186526008815267185b1d1a5b5a5cdd60c21b818401526102608501528451808601865290815264707564677960d81b8183015261028084015283518085019094529083526530bab9ba34b760d11b908301526102a081019190915260005b6016811015611aea57611ad8828260168110611acc57611acc61481f565b60200201516000612eb1565b80611ae28161487b565b915050611aae565b50611b1160405180604001604052806003815260200162636f6d60e81b8152506001612eb1565b508015610afb576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250611ba3935085925084915061223b565b611bab610d15565b15611bc85760405162461bcd60e51b81526004016109469061460d565b611bf78a611bda8b610b878c8c612409565b611be4888a614637565b611bee8789614637565b60006001612546565b5050505050505050505050565b611c0c612b32565b60005b81811015610bbc5760c9546001600160a01b03166350960239848484818110611c3a57611c3a61481f565b9050602002016020810190611c4f9190613db9565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b158015611c9057600080fd5b505af1158015611ca4573d6000803e3d6000fd5b505050508080611cb39061487b565b915050611c0f565b600082815260976020526040902060010154611cd681612a9a565b610bbc8383612bc3565b611cea898b614637565b6000600282511015611d0e5760405162461bcd60e51b8152600401610946906147b1565b611d25610f1160008460018651610ef4919061480c565b611d2d610d15565b15611d4a5760405162461bcd60e51b81526004016109469061460d565b60028b14611d6a5760405162461bcd60e51b815260040161094690614835565b611db08d8d8d898960008a8a8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506130a892505050565b84341015611e005760405162461bcd60e51b815260206004820181905260248201527f4d696e74696e674d616e616765723a204e4f545f454e4f5547485f46554e44536044820152606401610946565b611e128d8d8d8d8d8d8d8c6000613268565b843411156111ce57611e2261222c565b6001600160a01b03166108fc611e38873461480c565b6040518115909202916000818181858888f19350505050158015611e60573d6000803e3d6000fd5b5050505050505050505050505050565b611e78612b32565b611e8181613324565b611e9d5760405162461bcd60e51b8152600401610946906148c3565b600081815260cd60205260408120611eb491613bfb565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611eea612b32565b611ef38161334a565b610bd26000826133c0565b611f088a8c614637565b6000600282511015611f2c5760405162461bcd60e51b8152600401610946906147b1565b611f43610f1160008460018651610ef4919061480c565b611f4b610d15565b15611f685760405162461bcd60e51b81526004016109469061460d565b60028c14611f885760405162461bcd60e51b815260040161094690614835565b611fcd8e8e8e8a898b8a8a8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506130a892505050565b856001600160a01b03166323b872dd611fe461222c565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018890526064016020604051808303816000875af1158015612037573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061205b9190614745565b61209f5760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610946565b611e608e8e8e8e8e8e8e8c8e613268565b6120b8612b32565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa1580156120ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121239190614905565b60405163a9059cbb60e01b81526001600160a01b038481166004830152602482018390529192509084169063a9059cbb906044016020604051808303816000875af1158015612176573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061219a9190614745565b6121de5760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610946565b604080516001600160a01b0384811682526020820184905285168183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a1505050565b60006122366133ca565b905090565b61224483613324565b6122605760405162461bcd60e51b8152600401610946906148c3565b600083815260cf602052604090205460ff161515811515146122d35760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544c445f455850495241424c455f4d496044820152650a69a82a886960d31b6064820152608401610946565b60006123068360408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a816000015111156123ae57612331612325826000600a613410565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8036123ae5760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610946565b6123b78361344f565b6124035760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c49440000006044820152606401610946565b50505050565b6060828260405160200161241e92919061491e565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b606081526020019060019003908161244f579050509050828160008151811061247a5761247a61481f565b602002602001018190525060cd600085815260200190815260200160002080546124a390614946565b80601f01602080910402602001604051908101604052809291908181526020018280546124cf90614946565b801561251c5780601f106124f15761010080835404028352916020019161251c565b820191906000526020600020905b8154815290600101906020018083116124ff57829003601f168201915b5050505050816001815181106125345761253461481f565b60209081029190910101529392505050565b600080600061255488612cf0565b91509150838015612566575060028851115b80156125e8575060c9546040516331a9108f60e11b8152600481018390526001600160a01b038b8116921690636352211e90602401602060405180830381865afa1580156125b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125dc9190614980565b6001600160a01b031614155b156126485760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b6064820152608401610946565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015612691573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906126b59190614745565b80156127a6575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa158015612705573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127299190614980565b6001600160a01b031614806127a6575060c95460405163d9548e5360e01b8152600481018490526001600160a01b039091169063d9548e5390602401602060405180830381865afa158015612782573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127a69190614745565b15612897576001600160401b038516156128285760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b15801561280f57600080fd5b505af1158015612823573d6000803e3d6000fd5b505050505b60c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690612860908c908c908c908c908b906004016149f2565b600060405180830381600087803b15801561287a57600080fd5b505af115801561288e573d6000803e3d6000fd5b50505050612a8e565b6128a0826135b3565b6128a988613612565b80156128b6575087516002145b80156128c957506001600160401b038516155b156129a75760ca5488516001600160a01b039091169063c36c2125908b908b906000906128f8576128f861481f565b602090810291909101015160cc546040516001600160e01b031960e086901b1681526129329392916001600160a01b031690600401614a51565b600060405180830381600087803b15801561294c57600080fd5b505af1158015612960573d6000803e3d6000fd5b505050506000875111156129a25760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490612860908a908a908790600401614a86565b612a8e565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b7906129df908c908c908c908c908b906004016149f2565b600060405180830381600087803b1580156129f957600080fd5b505af1158015612a0d573d6000803e3d6000fd5b505050506001600160401b03851615612a8e5760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b158015612a7557600080fd5b505af1158015612a89573d6000803e3d6000fd5b505050505b50979650505050505050565b610bd281612aa661222c565b61366c565b612ab58282611455565b610c5f5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612aee61222c565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612b3a61222c565b6001600160a01b0316612b556033546001600160a01b031690565b6001600160a01b031614610c735760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610946565b610bd2600080516020614d3683398151915282611cbb565b612bcd8282611455565b15610c5f5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612c0461222c565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b612c50610d15565b612c935760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610946565b600080516020614d16833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa612cd361222c565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b8015612d2557829150612d118285610ef460018561480c565b925080612d1d81614abc565b915050612cf8565b50915091565b60008151600003612d7e5760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610946565b8282604051602001612d909190614ad3565b60405160208183030381529060405280519060200120604051602001612dc0929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610bd2600080516020614d36833981519152826133c0565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b612e51610d15565b15612e6e5760405162461bcd60e51b81526004016109469061460d565b600080516020614d16833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612cd361222c565b6000612ebe600084612d2b565b600081815260cd60205260409020909150612ed98482614b35565b50600081815260cf602052604090819020805460ff19168415151790555181907f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf898090612f26908690614201565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015612f77573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612f9b9190614745565b610bbc5760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c6090610acd9084908790600401614bf4565b600054610100900460ff16612ff85760405162461bcd60e51b815260040161094690614c15565b610c7361300361222c565b612df7565b600054610100900460ff1661302f5760405162461bcd60e51b815260040161094690614c15565b610c73600061303c61222c565b6133c0565b600054610100900460ff166116855760405162461bcd60e51b815260040161094690614c15565b600054610100900460ff1661308f5760405162461bcd60e51b815260040161094690614c15565b600080516020614d16833981519152805460ff19169055565b60006130bc6130b78789614637565b612cf0565b506040516bffffffffffffffffffffffff1930606090811b821660208401524660348401528b811b82166054840152606883018490526001600160c01b031960c08a901b1660888401526090830188905286901b1660b08201529091506000906131989084906131929060c401604051602081830303815290604052805190602001206040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b906136d0565b90506131a3816115db565b6131fb5760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a205349474e45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610946565b42866001600160401b03161161325d5760405162461bcd60e51b815260206004820152602160248201527f4d696e74696e674d616e616765723a20455850495245445f5349474e415455526044820152604560f81b6064820152608401610946565b505050505050505050565b60006132af8a6132788a8c614637565b613282898b614637565b61328c888a614637565b60008f6001600160a01b03166132a061222c565b6001600160a01b031614612546565b9050896001600160a01b03166132c361222c565b6001600160a01b0316827fa545b6fd3355e8d57f8c8147bafe740545bd3ea1f94bef2576a6d532a7c3b60586866040516133109291909182526001600160a01b0316602082015260400190565b60405180910390a450505050505050505050565b600081815260cd60205260408120805482919061334090614946565b9050119050919050565b613352612b32565b6001600160a01b0381166133b75760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610946565b610bd281612df7565b610c5f8282612aab565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b0316330361340b575060331936013560601c90565b503390565b604080518082019091526000808252602082015260405180604001604052808381526020018486602001516134459190614c60565b9052949350505050565b6000815160000361346257506000919050565b60208201805160f81c60308110801590613480575060398160ff1611155b1580156134a2575060618160ff16101580156134a05750607a8160ff1611155b155b156134b1575060009392505050565b8351600181111561351f576134d3836134cb60018461480c565b015160f81c90565b915060308260ff16101580156134ed575060398260ff1611155b15801561350f575060618260ff161015801561350d5750607a8260ff1611155b155b1561351f57506000949350505050565b60015b61352d60018361480c565b8110156135a7578381015160f81c9250602d8314801590613563575060308360ff1610158015613561575060398360ff1611155b155b8015613584575060618360ff16101580156135825750607a8360ff1611155b155b156135955750600095945050505050565b8061359f8161487b565b915050613522565b50600195945050505050565b6135bc816115f5565b156136095760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610946565b610bd2816136f4565b60008061362960008460018651610ef4919061480c565b60ca549091506001600160a01b0316158015906136655750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6136768282611455565b610c5f5761368e816001600160a01b03166014613778565b613699836020613778565b6040516020016136aa929190614c73565b60408051601f198184030181529082905262461bcd60e51b825261094691600401614201565b60008060006136df8585613913565b915091506136ec81613958565b509392505050565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260019061373390606001611630565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b60606000613787836002614ce8565b613792906002614c60565b6001600160401b038111156137a9576137a9613fb8565b6040519080825280601f01601f1916602001820160405280156137d3576020820181803683370190505b509050600360fc1b816000815181106137ee576137ee61481f565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061381d5761381d61481f565b60200101906001600160f81b031916908160001a9053506000613841846002614ce8565b61384c906001614c60565b90505b60018111156138c4576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106138805761388061481f565b1a60f81b8282815181106138965761389661481f565b60200101906001600160f81b031916908160001a90535060049490941c936138bd81614abc565b905061384f565b5083156136655760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610946565b60008082516041036139495760208301516040840151606085015160001a61393d87828585613b0e565b94509450505050613951565b506000905060025b9250929050565b600081600481111561396c5761396c614cff565b036139745750565b600181600481111561398857613988614cff565b036139d55760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610946565b60028160048111156139e9576139e9614cff565b03613a365760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610946565b6003816004811115613a4a57613a4a614cff565b03613aa25760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610946565b6004816004811115613ab657613ab6614cff565b03610bd25760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610946565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613b455750600090506003613bf2565b8460ff16601b14158015613b5d57508460ff16601c14155b15613b6e5750600090506004613bf2565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613bc2573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613beb57600060019250925050613bf2565b9150600090505b94509492505050565b508054613c0790614946565b6000825580601f10613c17575050565b601f016020900490600052602060002090810190610bd291905b80821115613c455760008155600101613c31565b5090565b600060208284031215613c5b57600080fd5b81356001600160e01b03198116811461366557600080fd5b6001600160401b0381168114610bd257600080fd5b8035613c9381613c73565b919050565b60008060408385031215613cab57600080fd5b8235613cb681613c73565b946020939093013593505050565b600060208284031215613cd657600080fd5b5035919050565b60008083601f840112613cef57600080fd5b5081356001600160401b03811115613d0657600080fd5b60208301915083602082850101111561395157600080fd5b600080600060408486031215613d3357600080fd5b8335925060208401356001600160401b03811115613d5057600080fd5b613d5c86828701613cdd565b9497909650939450505050565b6001600160a01b0381168114610bd257600080fd5b8035613c9381613d69565b60008060408385031215613d9c57600080fd5b823591506020830135613dae81613d69565b809150509250929050565b600060208284031215613dcb57600080fd5b813561366581613d69565b60008083601f840112613de857600080fd5b5081356001600160401b03811115613dff57600080fd5b6020830191508360208260051b850101111561395157600080fd5b8015158114610bd257600080fd5b60008060008060008060008060a0898b031215613e4457600080fd5b8835613e4f81613d69565b975060208901356001600160401b0380821115613e6b57600080fd5b613e778c838d01613dd6565b909950975060408b0135915080821115613e9057600080fd5b613e9c8c838d01613dd6565b909750955060608b0135915080821115613eb557600080fd5b50613ec28b828c01613dd6565b9094509250506080890135613ed681613e1a565b809150509295985092959890939650565b600080600080600080600080600060c08a8c031215613f0557600080fd5b8935613f1081613d69565b985060208a01356001600160401b0380821115613f2c57600080fd5b613f388d838e01613dd6565b909a50985060408c0135915080821115613f5157600080fd5b613f5d8d838e01613dd6565b909850965060608c0135915080821115613f7657600080fd5b50613f838c828d01613dd6565b90955093505060808a0135613f9781613c73565b915060a08a0135613fa781613e1a565b809150509295985092959850929598565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715613ff657613ff6613fb8565b604052919050565b60006001600160401b0382111561401757614017613fb8565b5060051b60200190565b6000602080838503121561403457600080fd5b82356001600160401b0381111561404a57600080fd5b8301601f8101851361405b57600080fd5b803561406e61406982613ffe565b613fce565b81815260059190911b8201830190838101908783111561408d57600080fd5b928401925b828410156140b45783356140a581613d69565b82529284019290840190614092565b979650505050505050565b600080600080606085870312156140d557600080fd5b84356140e081613d69565b93506020850135925060408501356001600160401b0381111561410257600080fd5b61410e87828801613cdd565b95989497509550505050565b6000806020838503121561412d57600080fd5b82356001600160401b0381111561414357600080fd5b61414f85828601613cdd565b90969095509350505050565b60008060006040848603121561417057600080fd5b83356001600160401b0381111561418657600080fd5b61419286828701613cdd565b90945092505060208401356141a681613e1a565b809150509250925092565b60005b838110156141cc5781810151838201526020016141b4565b50506000910152565b600081518084526141ed8160208601602086016141b1565b601f01601f19169290920160200192915050565b60208152600061366560208301846141d5565b60008060008060008060c0878903121561422d57600080fd5b863561423881613d69565b9550602087013561424881613d69565b9450604087013561425881613d69565b9350606087013561426881613d69565b9250608087013561427881613d69565b915060a087013561428881613d69565b809150509295509295509295565b60008060008060008060008060a0898b0312156142b257600080fd5b88356142bd81613d69565b97506020890135965060408901356001600160401b03808211156142e057600080fd5b6142ec8c838d01613cdd565b909850965060608b013591508082111561430557600080fd5b6143118c838d01613dd6565b909650945060808b013591508082111561432a57600080fd5b506143378b828c01613dd6565b999c989b5096995094979396929594505050565b6000806020838503121561435e57600080fd5b82356001600160401b0381111561437457600080fd5b61414f85828601613dd6565b600080600080600080600080600080600060e08c8e0312156143a157600080fd5b6143aa8c613d7e565b9a506001600160401b038060208e013511156143c557600080fd5b6143d58e60208f01358f01613dd6565b909b50995060408d01358110156143eb57600080fd5b6143fb8e60408f01358f01613dd6565b909950975060608d013581101561441157600080fd5b6144218e60608f01358f01613dd6565b909750955061443260808e01613c88565b945060a08d013593508060c08e0135111561444c57600080fd5b5061445d8d60c08e01358e01613cdd565b81935080925050509295989b509295989b9093969950565b6000806000806000806000806000806000806101008d8f03121561449857600080fd5b6144a18d613d7e565b9b506001600160401b0360208e013511156144bb57600080fd5b6144cb8e60208f01358f01613dd6565b909b5099506001600160401b0360408e013511156144e857600080fd5b6144f88e60408f01358f01613dd6565b90995097506001600160401b0360608e0135111561451557600080fd5b6145258e60608f01358f01613dd6565b909750955061453660808e01613c88565b945061454460a08e01613d7e565b935060c08d013592506001600160401b0360e08e0135111561456557600080fd5b6145758e60e08f01358f01613cdd565b81935080925050509295989b509295989b509295989b565b600080604083850312156145a057600080fd5b82356145ab81613d69565b91506020830135613dae81613d69565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60006020828403121561460257600080fd5b815161366581613c73565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b600061464561406984613ffe565b80848252602080830192508560051b85013681111561466357600080fd5b855b818110156146f55780356001600160401b03808211156146855760008081fd5b90880190601f368184011261469a5760008081fd5b8235828111156146ac576146ac613fb8565b6146bd818301601f19168801613fce565b925080835236878286010111156146d657600091508182fd5b8087850188850137600090830187015250865250938201938201614665565b50919695505050505050565b60208082526024908201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604082015263272a22a960e11b606082015260800190565b60006020828403121561475757600080fd5b815161366581613e1a565b6020808252602f908201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060408201526e282927ab22a22fa7a92fa7aba722a960891b606082015260800190565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b81810381811115610919576109196147f6565b634e487b7160e01b600052603260045260246000fd5b60208082526026908201527f4d696e74696e674d616e616765723a20535542444f4d41494e535f4e4f545f41604082015265131313d5d15160d21b606082015260800190565b60006001820161488d5761488d6147f6565b5060010190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b60006020828403121561491757600080fd5b5051919050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c9082168061495a57607f821691505b60208210810361497a57634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561499257600080fd5b815161366581613d69565b600081518084526020808501808196508360051b8101915082860160005b858110156149e55782840389526149d38483516141d5565b988501989350908401906001016149bb565b5091979650505050505050565b6001600160a01b038616815260a060208201819052600090614a169083018761499d565b8281036040840152614a28818761499d565b90508281036060840152614a3c818661499d565b91505082151560808301529695505050505050565b600060018060a01b03808616835260606020840152614a7360608401866141d5565b9150808416604084015250949350505050565b606081526000614a99606083018661499d565b8281036020840152614aab818661499d565b915050826040830152949350505050565b600081614acb57614acb6147f6565b506000190190565b60008251614ae58184602087016141b1565b9190910192915050565b601f821115610bbc57600081815260208120601f850160051c81016020861015614b165750805b601f850160051c820191505b8181101561158a57828155600101614b22565b81516001600160401b03811115614b4e57614b4e613fb8565b614b6281614b5c8454614946565b84614aef565b602080601f831160018114614b975760008415614b7f5750858301515b600019600386901b1c1916600185901b17855561158a565b600085815260208120601f198616915b82811015614bc657888601518255948401946001909101908401614ba7565b5085821015614be45787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b828152604060208201526000614c0d60408301846141d5565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b80820180821115610919576109196147f6565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351614cab8160178501602088016141b1565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351614cdc8160288401602088016141b1565b01602801949350505050565b8082028115828204841417610919576109196147f6565b634e487b7160e01b600052602160045260246000fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
