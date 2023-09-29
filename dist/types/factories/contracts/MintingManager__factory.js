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
const _bytecode = "0x608060405234801561001057600080fd5b506144db806100206000396000f3fe60806040526004361061027d5760003560e01c8063983b2d561161014f578063cc2a9a5b116100c1578063d7db74c71161007a578063d7db74c7146107ce578063ec527389146107e1578063f2fde38b14610801578063f5243bc414610821578063f940e38514610841578063ffa1ad741461086157600080fd5b8063cc2a9a5b1461070c578063cc2c3fc41461072c578063ceeb4f501461074c578063d1f5692c1461076c578063d53913931461078c578063d547741f146107ae57600080fd5b8063a849d65c11610113578063a849d65c1461064c578063aa271e1a1461066c578063b0aa98c71461068c578063b3ab15fb146106ac578063b9998a24146106cc578063c3a3bc00146106ec57600080fd5b8063983b2d561461059557806398650275146105b557806399e0dd7c146105ca578063a217fddf146105ea578063a3f4df7e146105ff57600080fd5b80635c975abb116101f357806377a2a589116101ac57806377a2a589146104ef57806381c81d351461050f5780638456cb59146105225780638da5cb5b14610537578063906cecc11461055557806391d148541461057557600080fd5b80635c975abb146104525780635cd7e3b3146104675780635fc1964f14610487578063634486da146104a7578063715018a6146104ba57806371e2a657146104cf57600080fd5b806336568abe1161024557806336568abe146103575780633f41b614146103775780633f4ba83a146103af57806351cff8d9146103c4578063572b6c05146103e45780635b6fa8db1461043257600080fd5b806301ffc9a714610282578063248a9ca3146102b7578063268b15ed146102f55780632f2ff15d146103175780633092afd514610337575b600080fd5b34801561028e57600080fd5b506102a261029d366004613603565b610893565b60405190151581526020015b60405180910390f35b3480156102c357600080fd5b506102e76102d236600461362d565b60009081526097602052604090206001015490565b6040519081526020016102ae565b34801561030157600080fd5b50610315610310366004613687565b6108ca565b005b34801561032357600080fd5b506103156103323660046136f7565b61096e565b34801561034357600080fd5b50610315610352366004613727565b610998565b34801561036357600080fd5b506103156103723660046136f7565b6109ac565b34801561038357600080fd5b5060c954610397906001600160a01b031681565b6040516001600160a01b0390911681526020016102ae565b3480156103bb57600080fd5b50610315610a3a565b3480156103d057600080fd5b506103156103df366004613727565b610a4c565b3480156103f057600080fd5b506102a26103ff366004613727565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561043e57600080fd5b5060cc54610397906001600160a01b031681565b34801561045e57600080fd5b506102a2610aec565b34801561047357600080fd5b50610315610482366004613796565b610b02565b34801561049357600080fd5b506103156104a23660046138be565b610de4565b6103156104b5366004613727565b610e2c565b3480156104c657600080fd5b50610315610f1f565b3480156104db57600080fd5b506103156104ea3660046138be565b610f31565b3480156104fb57600080fd5b5060ce54610397906001600160a01b031681565b61031561051d366004613727565b610f79565b34801561052e57600080fd5b50610315611026565b34801561054357600080fd5b506033546001600160a01b0316610397565b34801561056157600080fd5b5061031561057036600461395c565b611036565b34801561058157600080fd5b506102a26105903660046136f7565b6110bd565b3480156105a157600080fd5b506103156105b0366004613727565b6110e8565b3480156105c157600080fd5b506103156110f9565b3480156105d657600080fd5b506103156105e53660046139b7565b611113565b3480156105f657600080fd5b506102e7600081565b34801561060b57600080fd5b5061063f604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102ae9190613a48565b34801561065857600080fd5b5060cb54610397906001600160a01b031681565b34801561067857600080fd5b506102a2610687366004613727565b6111fa565b34801561069857600080fd5b506102a26106a736600461362d565b611214565b3480156106b857600080fd5b506103156106c7366004613727565b611272565b3480156106d857600080fd5b506103156106e7366004613727565b61129c565b3480156106f857600080fd5b506103156107073660046139b7565b6112e1565b34801561071857600080fd5b50610315610727366004613a5b565b611328565b34801561073857600080fd5b5060ca54610397906001600160a01b031681565b34801561075857600080fd5b50610315610767366004613add565b611742565b34801561077857600080fd5b50610315610787366004613b92565b6117d8565b34801561079857600080fd5b506102e76000805160206144af83398151915281565b3480156107ba57600080fd5b506103156107c93660046136f7565b61188f565b6103156107dc366004613bde565b6118b4565b3480156107ed57600080fd5b506103156107fc36600461362d565b611a42565b34801561080d57600080fd5b5061031561081c366004613727565b611ab4565b34801561082d57600080fd5b5061031561083c366004613cd3565b611ad0565b34801561084d57600080fd5b5061031561085c366004613deb565b611c80565b34801561086d57600080fd5b5061063f604051806040016040528060068152602001650605c685c62760d31b81525081565b60006001600160e01b03198216637965db0b60e01b14806108c457506301ffc9a760e01b6001600160e01b03198316145b92915050565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061090e9250849150839050611dfc565b610916610aec565b1561093c5760405162461bcd60e51b815260040161093390613e19565b60405180910390fd5b6060610965610949611f51565b61095c886109578989611f60565b611f8c565b8384600161209d565b50505050505050565b60008281526097602052604090206001015461098981612472565b6109938383612483565b505050565b6109a061250a565b6109a981612583565b50565b6109b4611f51565b6001600160a01b0316816001600160a01b031614610a2c5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610933565b610a36828261259b565b5050565b610a4261250a565b610a4a612620565b565b610a5461250a565b6001600160a01b038116610a6757600080fd5b60405147906001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610a9f573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905260008183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a15050565b60008051602061448f8339815191525460ff1690565b610b0c8688613e43565b8051600203610b7d57610b20610687611f51565b610b785760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610933565b610d0a565b6000610b88826126c8565b60c9549092506001600160a01b0316905063430c2081610ba6611f51565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610bf1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c159190613f0d565b80610ca4575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610c6e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c929190613f0d565b8015610ca45750610ca4610687611f51565b610d085760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b6064820152608401610933565b505b610d148789613e43565b600281511015610d365760405162461bcd60e51b815260040161093390613f2a565b610d8a610d6a60008360018551610d4d9190613f85565b81518110610d5d57610d5d613f98565b6020026020010151612703565b82600081518110610d7d57610d7d613f98565b6020026020010151611dfc565b610d92610aec565b15610daf5760405162461bcd60e51b815260040161093390613e19565b610dd78a610dbd8a8c613e43565b610dc7898b613e43565b610dd1888a613e43565b8761209d565b5050505050505050505050565b610dec61250a565b60005b8151811015610a3657610e1a828281518110610e0d57610e0d613f98565b6020026020010151612583565b80610e2481613fae565b915050610def565b610e37610687611f51565b610e835760405162461bcd60e51b815260206004820181905260248201527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e5445526044820152606401610933565b6001600160a01b038116610ed95760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610933565b610ee2816127b7565b610eea6110f9565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610a36573d6000803e3d6000fd5b610f2761250a565b610a4a60006127cf565b610f3961250a565b60005b8151811015610a3657610f67828281518110610f5a57610f5a613f98565b60200260200101516127b7565b80610f7181613fae565b915050610f3c565b610f84610687611f51565b610fd05760405162461bcd60e51b815260206004820181905260248201527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e5445526044820152606401610933565b6001600160a01b038116610ee25760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610933565b61102e61250a565b610a4a612821565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061107a9250849150839050611dfc565b611082610aec565b1561109f5760405162461bcd60e51b815260040161093390613e19565b60606110b38761095c886109578989611f60565b5050505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6110f061250a565b6109a9816127b7565b610a4a6000805160206144af833981519152610372611f51565b61111b61250a565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061114d9085908590600401613fc7565b600060405180830381600087803b15801561116757600080fd5b505af115801561117b573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610a3690505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906111c49085908590600401613fc7565b600060405180830381600087803b1580156111de57600080fd5b505af11580156111f2573d6000803e3d6000fd5b505050505050565b60006108c46000805160206144af833981519152836110bd565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611268906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b61127a61250a565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b6112a461250a565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b6112e961250a565b610a3682828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061288992505050565b600054610100900460ff16158080156113485750600054600160ff909116105b806113625750303b158015611362575060005460ff166001145b6113c55760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610933565b6000805460ff1916600117905580156113e8576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce805490911691851691909117905561144661298d565b61144e6129c4565b611457826129fd565b61145f612a24565b604080516102a081018252600661026082018181526563727970746f60d01b610280840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b8183015261016084015283518085018552600280825261686960f01b8284015261018085019190915284518086018652928352656b726573757360d01b838301526101a084019290925283518085018552600580825264616e696d6560d81b828401526101c085019190915284518086018652818152646d616e676160d81b818401526101e085015284518086018652600981526862696e616e6365757360b81b8184015261020085015284518086018652908152647265616c6d60d81b81830152610220840152835180850190945290835261676f60f01b9083015261024081019190915260005b60138110156116f2576116e08282601381106116d6576116d6613f98565b6020020151612889565b806116ea81613fae565b9150506116b8565b50508015610965576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506117869250849150839050611dfc565b61178e610aec565b156117ab5760405162461bcd60e51b815260040161093390613e19565b610dd78a6117bd8b6109578c8c611f60565b6117c7888a613e43565b6117d18789613e43565b600161209d565b6117e061250a565b60005b818110156109935760c9546001600160a01b0316635096023984848481811061180e5761180e613f98565b90506020020160208101906118239190613727565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561186457600080fd5b505af1158015611878573d6000803e3d6000fd5b50505050808061188790613fae565b9150506117e3565b6000828152609760205260409020600101546118aa81612472565b610993838361259b565b6118be898b613e43565b6002815110156118e05760405162461bcd60e51b815260040161093390613f2a565b6118f7610d6a60008360018551610d4d9190613f85565b6118ff610aec565b1561191c5760405162461bcd60e51b815260040161093390613e19565b60028a1461193c5760405162461bcd60e51b815260040161093390613ff6565b6119828c8c8c8888600089898080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612a6492505050565b833410156119d25760405162461bcd60e51b815260206004820181905260248201527f4d696e74696e674d616e616765723a204e4f545f454e4f5547485f46554e44536044820152606401610933565b6119e48c8c8c8c8c8c8c8b6000612c24565b83341115611a34576119f4611f51565b6001600160a01b03166108fc611a0a8634613f85565b6040518115909202916000818181858888f19350505050158015611a32573d6000803e3d6000fd5b505b505050505050505050505050565b611a4a61250a565b611a5381612cde565b611a6f5760405162461bcd60e51b81526004016109339061403c565b600081815260cd60205260408120611a86916135b5565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611abc61250a565b611ac581612d04565b6109a9600082612d7a565b611ada8a8c613e43565b600281511015611afc5760405162461bcd60e51b815260040161093390613f2a565b611b13610d6a60008360018551610d4d9190613f85565b611b1b610aec565b15611b385760405162461bcd60e51b815260040161093390613e19565b60028b14611b585760405162461bcd60e51b815260040161093390613ff6565b611b9d8d8d8d89888a89898080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612a6492505050565b846001600160a01b03166323b872dd611bb4611f51565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018790526064016020604051808303816000875af1158015611c07573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c2b9190613f0d565b611c6f5760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610933565b611a328d8d8d8d8d8d8d8b8d612c24565b611c8861250a565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa158015611ccf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cf3919061407e565b60405163a9059cbb60e01b81526001600160a01b038481166004830152602482018390529192509084169063a9059cbb906044016020604051808303816000875af1158015611d46573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d6a9190613f0d565b611dae5760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610933565b604080516001600160a01b0384811682526020820184905285168183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a1505050565b611e0582612cde565b611e215760405162461bcd60e51b81526004016109339061403c565b6000611e548260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115611efc57611e7f611e73826000600a612d84565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b803611efc5760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610933565b611f0582612dc3565b6109935760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c49440000006044820152606401610933565b6000611f5b612f27565b905090565b60608282604051602001611f75929190614097565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611fa65790505090508281600081518110611fd157611fd1613f98565b602002602001018190525060cd60008581526020019081526020016000208054611ffa906140bf565b80601f0160208091040260200160405190810160405280929190818152602001828054612026906140bf565b80156120735780601f1061204857610100808354040283529160200191612073565b820191906000526020600020905b81548152906001019060200180831161205657829003601f168201915b50505050508160018151811061208b5761208b613f98565b60209081029190910101529392505050565b60008060006120ab876126c8565b915091508380156120bd575060028751115b801561213f575060c9546040516331a9108f60e11b8152600481018390526001600160a01b038a8116921690636352211e90602401602060405180830381865afa15801561210f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061213391906140f9565b6001600160a01b031614155b1561219f5760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b6064820152608401610933565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa1580156121e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061220c9190613f0d565b801561228b575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa15801561225c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061228091906140f9565b6001600160a01b0316145b156122ff5760c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be06906122c8908b908b908b908b908b9060040161416b565b600060405180830381600087803b1580156122e257600080fd5b505af11580156122f6573d6000803e3d6000fd5b50505050612467565b61230882612f6d565b61231187612fcc565b801561231e575086516002145b156123fc5760ca5487516001600160a01b039091169063c36c2125908a908a9060009061234d5761234d613f98565b602090810291909101015160cc546040516001600160e01b031960e086901b1681526123879392916001600160a01b0316906004016141ca565b600060405180830381600087803b1580156123a157600080fd5b505af11580156123b5573d6000803e3d6000fd5b505050506000865111156123f75760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae74906122c8908990899087906004016141ff565b612467565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790612434908b908b908b908b908b9060040161416b565b600060405180830381600087803b15801561244e57600080fd5b505af1158015612462573d6000803e3d6000fd5b505050505b509695505050505050565b6109a98161247e611f51565b613026565b61248d82826110bd565b610a365760008281526097602090815260408083206001600160a01b03851684529091529020805460ff191660011790556124c6611f51565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612512611f51565b6001600160a01b031661252d6033546001600160a01b031690565b6001600160a01b031614610a4a5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610933565b6109a96000805160206144af8339815191528261188f565b6125a582826110bd565b15610a365760008281526097602090815260408083206001600160a01b03851684529091529020805460ff191690556125dc611f51565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b612628610aec565b61266b5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610933565b60008051602061448f833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6126ab611f51565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b80156126fd578291506126e98285610d4d600185613f85565b9250806126f581614235565b9150506126d0565b50915091565b600081516000036127565760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610933565b8282604051602001612768919061424c565b60405160208183030381529060405280519060200120604051602001612798929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b6109a96000805160206144af83398151915282612d7a565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b612829610aec565b156128465760405162461bcd60e51b815260040161093390613e19565b60008051602061448f833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586126ab611f51565b6000612896600083612703565b600081815260cd602052604090209091506128b183826142ae565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980836040516128e29190613a48565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015612933573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129579190613f0d565b610a365760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c60906111c4908490869060040161436d565b600054610100900460ff166129b45760405162461bcd60e51b81526004016109339061438e565b610a4a6129bf611f51565b6127cf565b600054610100900460ff166129eb5760405162461bcd60e51b81526004016109339061438e565b610a4a60006129f8611f51565b612d7a565b600054610100900460ff166112a45760405162461bcd60e51b81526004016109339061438e565b600054610100900460ff16612a4b5760405162461bcd60e51b81526004016109339061438e565b60008051602061448f833981519152805460ff19169055565b6000612a78612a738789613e43565b6126c8565b506040516bffffffffffffffffffffffff1930606090811b821660208401524660348401528b811b82166054840152606883018490526001600160c01b031960c08a901b1660888401526090830188905286901b1660b0820152909150600090612b54908490612b4e9060c401604051602081830303815290604052805190602001206040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b9061308a565b9050612b5f816111fa565b612bb75760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a205349474e45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610933565b42866001600160401b031611612c195760405162461bcd60e51b815260206004820152602160248201527f4d696e74696e674d616e616765723a20455850495245445f5349474e415455526044820152604560f81b6064820152608401610933565b505050505050505050565b6000612c698a612c348a8c613e43565b612c3e898b613e43565b612c48888a613e43565b8e6001600160a01b0316612c5a611f51565b6001600160a01b03161461209d565b9050896001600160a01b0316612c7d611f51565b6001600160a01b0316827fa545b6fd3355e8d57f8c8147bafe740545bd3ea1f94bef2576a6d532a7c3b6058686604051612cca9291909182526001600160a01b0316602082015260400190565b60405180910390a450505050505050505050565b600081815260cd602052604081208054829190612cfa906140bf565b9050119050919050565b612d0c61250a565b6001600160a01b038116612d715760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610933565b6109a9816127cf565b610a368282612483565b60408051808201909152600080825260208201526040518060400160405280838152602001848660200151612db991906143d9565b9052949350505050565b60008151600003612dd657506000919050565b60208201805160f81c60308110801590612df4575060398160ff1611155b158015612e16575060618160ff1610158015612e145750607a8160ff1611155b155b15612e25575060009392505050565b83516001811115612e9357612e4783612e3f600184613f85565b015160f81c90565b915060308260ff1610158015612e61575060398260ff1611155b158015612e83575060618260ff1610158015612e815750607a8260ff1611155b155b15612e9357506000949350505050565b60015b612ea1600183613f85565b811015612f1b578381015160f81c9250602d8314801590612ed7575060308360ff1610158015612ed5575060398360ff1611155b155b8015612ef8575060618360ff1610158015612ef65750607a8360ff1611155b155b15612f095750600095945050505050565b80612f1381613fae565b915050612e96565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b03163303612f68575060331936013560601c90565b503390565b612f7681611214565b15612fc35760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610933565b6109a9816130ae565b600080612fe360008460018651610d4d9190613f85565b60ca549091506001600160a01b03161580159061301f5750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b61303082826110bd565b610a3657613048816001600160a01b03166014613132565b613053836020613132565b6040516020016130649291906143ec565b60408051601f198184030181529082905262461bcd60e51b825261093391600401613a48565b600080600061309985856132cd565b915091506130a681613312565b509392505050565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526001906130ed9060600161124f565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b60606000613141836002614461565b61314c9060026143d9565b6001600160401b0381111561316357613163613855565b6040519080825280601f01601f19166020018201604052801561318d576020820181803683370190505b509050600360fc1b816000815181106131a8576131a8613f98565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106131d7576131d7613f98565b60200101906001600160f81b031916908160001a90535060006131fb846002614461565b6132069060016143d9565b90505b600181111561327e576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061323a5761323a613f98565b1a60f81b82828151811061325057613250613f98565b60200101906001600160f81b031916908160001a90535060049490941c9361327781614235565b9050613209565b50831561301f5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610933565b60008082516041036133035760208301516040840151606085015160001a6132f7878285856134c8565b9450945050505061330b565b506000905060025b9250929050565b600081600481111561332657613326614478565b0361332e5750565b600181600481111561334257613342614478565b0361338f5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610933565b60028160048111156133a3576133a3614478565b036133f05760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610933565b600381600481111561340457613404614478565b0361345c5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610933565b600481600481111561347057613470614478565b036109a95760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610933565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156134ff57506000905060036135ac565b8460ff16601b1415801561351757508460ff16601c14155b1561352857506000905060046135ac565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa15801561357c573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166135a5576000600192509250506135ac565b9150600090505b94509492505050565b5080546135c1906140bf565b6000825580601f106135d1575050565b601f0160209004906000526020600020908101906109a991905b808211156135ff57600081556001016135eb565b5090565b60006020828403121561361557600080fd5b81356001600160e01b03198116811461301f57600080fd5b60006020828403121561363f57600080fd5b5035919050565b60008083601f84011261365857600080fd5b5081356001600160401b0381111561366f57600080fd5b60208301915083602082850101111561330b57600080fd5b60008060006040848603121561369c57600080fd5b8335925060208401356001600160401b038111156136b957600080fd5b6136c586828701613646565b9497909650939450505050565b6001600160a01b03811681146109a957600080fd5b80356136f2816136d2565b919050565b6000806040838503121561370a57600080fd5b82359150602083013561371c816136d2565b809150509250929050565b60006020828403121561373957600080fd5b813561301f816136d2565b60008083601f84011261375657600080fd5b5081356001600160401b0381111561376d57600080fd5b6020830191508360208260051b850101111561330b57600080fd5b80151581146109a957600080fd5b60008060008060008060008060a0898b0312156137b257600080fd5b88356137bd816136d2565b975060208901356001600160401b03808211156137d957600080fd5b6137e58c838d01613744565b909950975060408b01359150808211156137fe57600080fd5b61380a8c838d01613744565b909750955060608b013591508082111561382357600080fd5b506138308b828c01613744565b909450925050608089013561384481613788565b809150509295985092959890939650565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b038111828210171561389357613893613855565b604052919050565b60006001600160401b038211156138b4576138b4613855565b5060051b60200190565b600060208083850312156138d157600080fd5b82356001600160401b038111156138e757600080fd5b8301601f810185136138f857600080fd5b803561390b6139068261389b565b61386b565b81815260059190911b8201830190838101908783111561392a57600080fd5b928401925b82841015613951578335613942816136d2565b8252928401929084019061392f565b979650505050505050565b6000806000806060858703121561397257600080fd5b843561397d816136d2565b93506020850135925060408501356001600160401b0381111561399f57600080fd5b6139ab87828801613646565b95989497509550505050565b600080602083850312156139ca57600080fd5b82356001600160401b038111156139e057600080fd5b6139ec85828601613646565b90969095509350505050565b60005b83811015613a135781810151838201526020016139fb565b50506000910152565b60008151808452613a348160208601602086016139f8565b601f01601f19169290920160200192915050565b60208152600061301f6020830184613a1c565b60008060008060008060c08789031215613a7457600080fd5b8635613a7f816136d2565b95506020870135613a8f816136d2565b94506040870135613a9f816136d2565b93506060870135613aaf816136d2565b92506080870135613abf816136d2565b915060a0870135613acf816136d2565b809150509295509295509295565b60008060008060008060008060a0898b031215613af957600080fd5b8835613b04816136d2565b97506020890135965060408901356001600160401b0380821115613b2757600080fd5b613b338c838d01613646565b909850965060608b0135915080821115613b4c57600080fd5b613b588c838d01613744565b909650945060808b0135915080821115613b7157600080fd5b50613b7e8b828c01613744565b999c989b5096995094979396929594505050565b60008060208385031215613ba557600080fd5b82356001600160401b03811115613bbb57600080fd5b6139ec85828601613744565b80356001600160401b03811681146136f257600080fd5b600080600080600080600080600080600060e08c8e031215613bff57600080fd5b613c088c6136e7565b9a506001600160401b038060208e01351115613c2357600080fd5b613c338e60208f01358f01613744565b909b50995060408d0135811015613c4957600080fd5b613c598e60408f01358f01613744565b909950975060608d0135811015613c6f57600080fd5b613c7f8e60608f01358f01613744565b9097509550613c9060808e01613bc7565b945060a08d013593508060c08e01351115613caa57600080fd5b50613cbb8d60c08e01358e01613646565b81935080925050509295989b509295989b9093969950565b6000806000806000806000806000806000806101008d8f031215613cf657600080fd5b613cff8d6136e7565b9b506001600160401b0360208e01351115613d1957600080fd5b613d298e60208f01358f01613744565b909b5099506001600160401b0360408e01351115613d4657600080fd5b613d568e60408f01358f01613744565b90995097506001600160401b0360608e01351115613d7357600080fd5b613d838e60608f01358f01613744565b9097509550613d9460808e01613bc7565b9450613da260a08e016136e7565b935060c08d013592506001600160401b0360e08e01351115613dc357600080fd5b613dd38e60e08f01358f01613646565b81935080925050509295989b509295989b509295989b565b60008060408385031215613dfe57600080fd5b8235613e09816136d2565b9150602083013561371c816136d2565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b6000613e516139068461389b565b80848252602080830192508560051b850136811115613e6f57600080fd5b855b81811015613f015780356001600160401b0380821115613e915760008081fd5b90880190601f3681840112613ea65760008081fd5b823582811115613eb857613eb8613855565b613ec9818301601f1916880161386b565b92508083523687828601011115613ee257600091508182fd5b8087850188850137600090830187015250865250938201938201613e71565b50919695505050505050565b600060208284031215613f1f57600080fd5b815161301f81613788565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b818103818111156108c4576108c4613f6f565b634e487b7160e01b600052603260045260246000fd5b600060018201613fc057613fc0613f6f565b5060010190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b60208082526026908201527f4d696e74696e674d616e616765723a20535542444f4d41494e535f4e4f545f41604082015265131313d5d15160d21b606082015260800190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b60006020828403121561409057600080fd5b5051919050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c908216806140d357607f821691505b6020821081036140f357634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561410b57600080fd5b815161301f816136d2565b600081518084526020808501808196508360051b8101915082860160005b8581101561415e57828403895261414c848351613a1c565b98850198935090840190600101614134565b5091979650505050505050565b6001600160a01b038616815260a06020820181905260009061418f90830187614116565b82810360408401526141a18187614116565b905082810360608401526141b58186614116565b91505082151560808301529695505050505050565b600060018060a01b038086168352606060208401526141ec6060840186613a1c565b9150808416604084015250949350505050565b6060815260006142126060830186614116565b82810360208401526142248186614116565b915050826040830152949350505050565b60008161424457614244613f6f565b506000190190565b6000825161425e8184602087016139f8565b9190910192915050565b601f82111561099357600081815260208120601f850160051c8101602086101561428f5750805b601f850160051c820191505b818110156111f25782815560010161429b565b81516001600160401b038111156142c7576142c7613855565b6142db816142d584546140bf565b84614268565b602080601f83116001811461431057600084156142f85750858301515b600019600386901b1c1916600185901b1785556111f2565b600085815260208120601f198616915b8281101561433f57888601518255948401946001909101908401614320565b508582101561435d5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b8281526040602082015260006143866040830184613a1c565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b808201808211156108c4576108c4613f6f565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516144248160178501602088016139f8565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516144558160288401602088016139f8565b01602801949350505050565b80820281158282048414176108c4576108c4613f6f565b634e487b7160e01b600052602160045260246000fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
