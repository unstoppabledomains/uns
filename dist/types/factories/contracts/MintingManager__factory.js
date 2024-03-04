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
const _bytecode = "0x608060405234801561001057600080fd5b5061451c806100206000396000f3fe60806040526004361061027d5760003560e01c8063983b2d561161014f578063cc2a9a5b116100c1578063d7db74c71161007a578063d7db74c7146107ce578063ec527389146107e1578063f2fde38b14610801578063f5243bc414610821578063f940e38514610841578063ffa1ad741461086157600080fd5b8063cc2a9a5b1461070c578063cc2c3fc41461072c578063ceeb4f501461074c578063d1f5692c1461076c578063d53913931461078c578063d547741f146107ae57600080fd5b8063a849d65c11610113578063a849d65c1461064c578063aa271e1a1461066c578063b0aa98c71461068c578063b3ab15fb146106ac578063b9998a24146106cc578063c3a3bc00146106ec57600080fd5b8063983b2d561461059557806398650275146105b557806399e0dd7c146105ca578063a217fddf146105ea578063a3f4df7e146105ff57600080fd5b80635c975abb116101f357806377a2a589116101ac57806377a2a589146104ef57806381c81d351461050f5780638456cb59146105225780638da5cb5b14610537578063906cecc11461055557806391d148541461057557600080fd5b80635c975abb146104525780635cd7e3b3146104675780635fc1964f14610487578063634486da146104a7578063715018a6146104ba57806371e2a657146104cf57600080fd5b806336568abe1161024557806336568abe146103575780633f41b614146103775780633f4ba83a146103af57806351cff8d9146103c4578063572b6c05146103e45780635b6fa8db1461043257600080fd5b806301ffc9a714610282578063248a9ca3146102b7578063268b15ed146102f55780632f2ff15d146103175780633092afd514610337575b600080fd5b34801561028e57600080fd5b506102a261029d366004613644565b610893565b60405190151581526020015b60405180910390f35b3480156102c357600080fd5b506102e76102d236600461366e565b60009081526097602052604090206001015490565b6040519081526020016102ae565b34801561030157600080fd5b506103156103103660046136c8565b6108ca565b005b34801561032357600080fd5b50610315610332366004613738565b61096e565b34801561034357600080fd5b50610315610352366004613768565b610998565b34801561036357600080fd5b50610315610372366004613738565b6109ac565b34801561038357600080fd5b5060c954610397906001600160a01b031681565b6040516001600160a01b0390911681526020016102ae565b3480156103bb57600080fd5b50610315610a3a565b3480156103d057600080fd5b506103156103df366004613768565b610a4c565b3480156103f057600080fd5b506102a26103ff366004613768565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561043e57600080fd5b5060cc54610397906001600160a01b031681565b34801561045e57600080fd5b506102a2610aec565b34801561047357600080fd5b506103156104823660046137d7565b610b02565b34801561049357600080fd5b506103156104a23660046138ff565b610de4565b6103156104b5366004613768565b610e2c565b3480156104c657600080fd5b50610315610f1f565b3480156104db57600080fd5b506103156104ea3660046138ff565b610f31565b3480156104fb57600080fd5b5060ce54610397906001600160a01b031681565b61031561051d366004613768565b610f79565b34801561052e57600080fd5b50610315611026565b34801561054357600080fd5b506033546001600160a01b0316610397565b34801561056157600080fd5b5061031561057036600461399d565b611036565b34801561058157600080fd5b506102a2610590366004613738565b6110bd565b3480156105a157600080fd5b506103156105b0366004613768565b6110e8565b3480156105c157600080fd5b506103156110f9565b3480156105d657600080fd5b506103156105e53660046139f8565b611113565b3480156105f657600080fd5b506102e7600081565b34801561060b57600080fd5b5061063f604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102ae9190613a89565b34801561065857600080fd5b5060cb54610397906001600160a01b031681565b34801561067857600080fd5b506102a2610687366004613768565b6111fa565b34801561069857600080fd5b506102a26106a736600461366e565b611214565b3480156106b857600080fd5b506103156106c7366004613768565b611272565b3480156106d857600080fd5b506103156106e7366004613768565b61129c565b3480156106f857600080fd5b506103156107073660046139f8565b6112e1565b34801561071857600080fd5b50610315610727366004613a9c565b611328565b34801561073857600080fd5b5060ca54610397906001600160a01b031681565b34801561075857600080fd5b50610315610767366004613b1e565b611783565b34801561077857600080fd5b50610315610787366004613bd3565b611819565b34801561079857600080fd5b506102e76000805160206144f083398151915281565b3480156107ba57600080fd5b506103156107c9366004613738565b6118d0565b6103156107dc366004613c1f565b6118f5565b3480156107ed57600080fd5b506103156107fc36600461366e565b611a83565b34801561080d57600080fd5b5061031561081c366004613768565b611af5565b34801561082d57600080fd5b5061031561083c366004613d14565b611b11565b34801561084d57600080fd5b5061031561085c366004613e2c565b611cc1565b34801561086d57600080fd5b5061063f604051806040016040528060068152602001650605c685c62760d31b81525081565b60006001600160e01b03198216637965db0b60e01b14806108c457506301ffc9a760e01b6001600160e01b03198316145b92915050565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061090e9250849150839050611e3d565b610916610aec565b1561093c5760405162461bcd60e51b815260040161093390613e5a565b60405180910390fd5b6060610965610949611f92565b61095c886109578989611fa1565b611fcd565b838460016120de565b50505050505050565b600082815260976020526040902060010154610989816124b3565b61099383836124c4565b505050565b6109a061254b565b6109a9816125c4565b50565b6109b4611f92565b6001600160a01b0316816001600160a01b031614610a2c5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610933565b610a3682826125dc565b5050565b610a4261254b565b610a4a612661565b565b610a5461254b565b6001600160a01b038116610a6757600080fd5b60405147906001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610a9f573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905260008183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a15050565b6000805160206144d08339815191525460ff1690565b610b0c8688613e84565b8051600203610b7d57610b20610687611f92565b610b785760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610933565b610d0a565b6000610b8882612709565b60c9549092506001600160a01b0316905063430c2081610ba6611f92565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610bf1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c159190613f4e565b80610ca4575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610c6e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c929190613f4e565b8015610ca45750610ca4610687611f92565b610d085760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b6064820152608401610933565b505b610d148789613e84565b600281511015610d365760405162461bcd60e51b815260040161093390613f6b565b610d8a610d6a60008360018551610d4d9190613fc6565b81518110610d5d57610d5d613fd9565b6020026020010151612744565b82600081518110610d7d57610d7d613fd9565b6020026020010151611e3d565b610d92610aec565b15610daf5760405162461bcd60e51b815260040161093390613e5a565b610dd78a610dbd8a8c613e84565b610dc7898b613e84565b610dd1888a613e84565b876120de565b5050505050505050505050565b610dec61254b565b60005b8151811015610a3657610e1a828281518110610e0d57610e0d613fd9565b60200260200101516125c4565b80610e2481613fef565b915050610def565b610e37610687611f92565b610e835760405162461bcd60e51b815260206004820181905260248201527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e5445526044820152606401610933565b6001600160a01b038116610ed95760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610933565b610ee2816127f8565b610eea6110f9565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610a36573d6000803e3d6000fd5b610f2761254b565b610a4a6000612810565b610f3961254b565b60005b8151811015610a3657610f67828281518110610f5a57610f5a613fd9565b60200260200101516127f8565b80610f7181613fef565b915050610f3c565b610f84610687611f92565b610fd05760405162461bcd60e51b815260206004820181905260248201527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e5445526044820152606401610933565b6001600160a01b038116610ee25760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610933565b61102e61254b565b610a4a612862565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061107a9250849150839050611e3d565b611082610aec565b1561109f5760405162461bcd60e51b815260040161093390613e5a565b60606110b38761095c886109578989611fa1565b5050505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6110f061254b565b6109a9816127f8565b610a4a6000805160206144f0833981519152610372611f92565b61111b61254b565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061114d9085908590600401614008565b600060405180830381600087803b15801561116757600080fd5b505af115801561117b573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610a3690505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906111c49085908590600401614008565b600060405180830381600087803b1580156111de57600080fd5b505af11580156111f2573d6000803e3d6000fd5b505050505050565b60006108c46000805160206144f0833981519152836110bd565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611268906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b61127a61254b565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b6112a461254b565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b6112e961254b565b610a3682828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506128ca92505050565b600054610100900460ff16158080156113485750600054600160ff909116105b806113625750303b158015611362575060005460ff166001145b6113c55760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610933565b6000805460ff1916600117905580156113e8576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce80549091169185169190911790556114466129ce565b61144e612a05565b61145782612a3e565b61145f612a65565b604080516102e08101825260066102a082018181526563727970746f60d01b6102c0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b8183015261016084015283518085018552600280825261686960f01b8284015261018085019190915284518086018652928352656b726573757360d01b838301526101a084019290925283518085018552600580825264616e696d6560d81b828401526101c085019190915284518086018652818152646d616e676160d81b818401526101e085015284518086018652600981526862696e616e6365757360b81b8184015261020085015284518086018652818152647265616c6d60d81b818401526102208501528451808601865292835261676f60f01b83830152610240840192909252835180850185526008815267185b1d1a5b5a5cdd60c21b81830152610260840152835180850190945290835264707564677960d81b9083015261028081019190915260005b60158110156117335761172182826015811061171757611717613fd9565b60200201516128ca565b8061172b81613fef565b9150506116f9565b50508015610965576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506117c79250849150839050611e3d565b6117cf610aec565b156117ec5760405162461bcd60e51b815260040161093390613e5a565b610dd78a6117fe8b6109578c8c611fa1565b611808888a613e84565b6118128789613e84565b60016120de565b61182161254b565b60005b818110156109935760c9546001600160a01b0316635096023984848481811061184f5761184f613fd9565b90506020020160208101906118649190613768565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b1580156118a557600080fd5b505af11580156118b9573d6000803e3d6000fd5b5050505080806118c890613fef565b915050611824565b6000828152609760205260409020600101546118eb816124b3565b61099383836125dc565b6118ff898b613e84565b6002815110156119215760405162461bcd60e51b815260040161093390613f6b565b611938610d6a60008360018551610d4d9190613fc6565b611940610aec565b1561195d5760405162461bcd60e51b815260040161093390613e5a565b60028a1461197d5760405162461bcd60e51b815260040161093390614037565b6119c38c8c8c8888600089898080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612aa592505050565b83341015611a135760405162461bcd60e51b815260206004820181905260248201527f4d696e74696e674d616e616765723a204e4f545f454e4f5547485f46554e44536044820152606401610933565b611a258c8c8c8c8c8c8c8b6000612c65565b83341115611a7557611a35611f92565b6001600160a01b03166108fc611a4b8634613fc6565b6040518115909202916000818181858888f19350505050158015611a73573d6000803e3d6000fd5b505b505050505050505050505050565b611a8b61254b565b611a9481612d1f565b611ab05760405162461bcd60e51b81526004016109339061407d565b600081815260cd60205260408120611ac7916135f6565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611afd61254b565b611b0681612d45565b6109a9600082612dbb565b611b1b8a8c613e84565b600281511015611b3d5760405162461bcd60e51b815260040161093390613f6b565b611b54610d6a60008360018551610d4d9190613fc6565b611b5c610aec565b15611b795760405162461bcd60e51b815260040161093390613e5a565b60028b14611b995760405162461bcd60e51b815260040161093390614037565b611bde8d8d8d89888a89898080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612aa592505050565b846001600160a01b03166323b872dd611bf5611f92565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018790526064016020604051808303816000875af1158015611c48573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c6c9190613f4e565b611cb05760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610933565b611a738d8d8d8d8d8d8d8b8d612c65565b611cc961254b565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa158015611d10573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d3491906140bf565b60405163a9059cbb60e01b81526001600160a01b038481166004830152602482018390529192509084169063a9059cbb906044016020604051808303816000875af1158015611d87573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611dab9190613f4e565b611def5760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610933565b604080516001600160a01b0384811682526020820184905285168183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a1505050565b611e4682612d1f565b611e625760405162461bcd60e51b81526004016109339061407d565b6000611e958260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115611f3d57611ec0611eb4826000600a612dc5565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b803611f3d5760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610933565b611f4682612e04565b6109935760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c49440000006044820152606401610933565b6000611f9c612f68565b905090565b60608282604051602001611fb69291906140d8565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611fe7579050509050828160008151811061201257612012613fd9565b602002602001018190525060cd6000858152602001908152602001600020805461203b90614100565b80601f016020809104026020016040519081016040528092919081815260200182805461206790614100565b80156120b45780601f10612089576101008083540402835291602001916120b4565b820191906000526020600020905b81548152906001019060200180831161209757829003601f168201915b5050505050816001815181106120cc576120cc613fd9565b60209081029190910101529392505050565b60008060006120ec87612709565b915091508380156120fe575060028751115b8015612180575060c9546040516331a9108f60e11b8152600481018390526001600160a01b038a8116921690636352211e90602401602060405180830381865afa158015612150573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612174919061413a565b6001600160a01b031614155b156121e05760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b6064820152608401610933565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015612229573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061224d9190613f4e565b80156122cc575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa15801561229d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122c1919061413a565b6001600160a01b0316145b156123405760c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690612309908b908b908b908b908b906004016141ac565b600060405180830381600087803b15801561232357600080fd5b505af1158015612337573d6000803e3d6000fd5b505050506124a8565b61234982612fae565b6123528761300d565b801561235f575086516002145b1561243d5760ca5487516001600160a01b039091169063c36c2125908a908a9060009061238e5761238e613fd9565b602090810291909101015160cc546040516001600160e01b031960e086901b1681526123c89392916001600160a01b03169060040161420b565b600060405180830381600087803b1580156123e257600080fd5b505af11580156123f6573d6000803e3d6000fd5b505050506000865111156124385760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae749061230990899089908790600401614240565b6124a8565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790612475908b908b908b908b908b906004016141ac565b600060405180830381600087803b15801561248f57600080fd5b505af11580156124a3573d6000803e3d6000fd5b505050505b509695505050505050565b6109a9816124bf611f92565b613067565b6124ce82826110bd565b610a365760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612507611f92565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612553611f92565b6001600160a01b031661256e6033546001600160a01b031690565b6001600160a01b031614610a4a5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610933565b6109a96000805160206144f0833981519152826118d0565b6125e682826110bd565b15610a365760008281526097602090815260408083206001600160a01b03851684529091529020805460ff1916905561261d611f92565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b612669610aec565b6126ac5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610933565b6000805160206144d0833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6126ec611f92565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b801561273e5782915061272a8285610d4d600185613fc6565b92508061273681614276565b915050612711565b50915091565b600081516000036127975760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610933565b82826040516020016127a9919061428d565b604051602081830303815290604052805190602001206040516020016127d9929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b6109a96000805160206144f083398151915282612dbb565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b61286a610aec565b156128875760405162461bcd60e51b815260040161093390613e5a565b6000805160206144d0833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586126ec611f92565b60006128d7600083612744565b600081815260cd602052604090209091506128f283826142ef565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980836040516129239190613a89565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015612974573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129989190613f4e565b610a365760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c60906111c490849086906004016143ae565b600054610100900460ff166129f55760405162461bcd60e51b8152600401610933906143cf565b610a4a612a00611f92565b612810565b600054610100900460ff16612a2c5760405162461bcd60e51b8152600401610933906143cf565b610a4a6000612a39611f92565b612dbb565b600054610100900460ff166112a45760405162461bcd60e51b8152600401610933906143cf565b600054610100900460ff16612a8c5760405162461bcd60e51b8152600401610933906143cf565b6000805160206144d0833981519152805460ff19169055565b6000612ab9612ab48789613e84565b612709565b506040516bffffffffffffffffffffffff1930606090811b821660208401524660348401528b811b82166054840152606883018490526001600160c01b031960c08a901b1660888401526090830188905286901b1660b0820152909150600090612b95908490612b8f9060c401604051602081830303815290604052805190602001206040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b906130cb565b9050612ba0816111fa565b612bf85760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a205349474e45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610933565b42866001600160401b031611612c5a5760405162461bcd60e51b815260206004820152602160248201527f4d696e74696e674d616e616765723a20455850495245445f5349474e415455526044820152604560f81b6064820152608401610933565b505050505050505050565b6000612caa8a612c758a8c613e84565b612c7f898b613e84565b612c89888a613e84565b8e6001600160a01b0316612c9b611f92565b6001600160a01b0316146120de565b9050896001600160a01b0316612cbe611f92565b6001600160a01b0316827fa545b6fd3355e8d57f8c8147bafe740545bd3ea1f94bef2576a6d532a7c3b6058686604051612d0b9291909182526001600160a01b0316602082015260400190565b60405180910390a450505050505050505050565b600081815260cd602052604081208054829190612d3b90614100565b9050119050919050565b612d4d61254b565b6001600160a01b038116612db25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610933565b6109a981612810565b610a3682826124c4565b60408051808201909152600080825260208201526040518060400160405280838152602001848660200151612dfa919061441a565b9052949350505050565b60008151600003612e1757506000919050565b60208201805160f81c60308110801590612e35575060398160ff1611155b158015612e57575060618160ff1610158015612e555750607a8160ff1611155b155b15612e66575060009392505050565b83516001811115612ed457612e8883612e80600184613fc6565b015160f81c90565b915060308260ff1610158015612ea2575060398260ff1611155b158015612ec4575060618260ff1610158015612ec25750607a8260ff1611155b155b15612ed457506000949350505050565b60015b612ee2600183613fc6565b811015612f5c578381015160f81c9250602d8314801590612f18575060308360ff1610158015612f16575060398360ff1611155b155b8015612f39575060618360ff1610158015612f375750607a8360ff1611155b155b15612f4a5750600095945050505050565b80612f5481613fef565b915050612ed7565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b03163303612fa9575060331936013560601c90565b503390565b612fb781611214565b156130045760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610933565b6109a9816130ef565b60008061302460008460018651610d4d9190613fc6565b60ca549091506001600160a01b0316158015906130605750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b61307182826110bd565b610a3657613089816001600160a01b03166014613173565b613094836020613173565b6040516020016130a592919061442d565b60408051601f198184030181529082905262461bcd60e51b825261093391600401613a89565b60008060006130da858561330e565b915091506130e781613353565b509392505050565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260019061312e9060600161124f565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b606060006131828360026144a2565b61318d90600261441a565b6001600160401b038111156131a4576131a4613896565b6040519080825280601f01601f1916602001820160405280156131ce576020820181803683370190505b509050600360fc1b816000815181106131e9576131e9613fd9565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061321857613218613fd9565b60200101906001600160f81b031916908160001a905350600061323c8460026144a2565b61324790600161441a565b90505b60018111156132bf576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061327b5761327b613fd9565b1a60f81b82828151811061329157613291613fd9565b60200101906001600160f81b031916908160001a90535060049490941c936132b881614276565b905061324a565b5083156130605760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610933565b60008082516041036133445760208301516040840151606085015160001a61333887828585613509565b9450945050505061334c565b506000905060025b9250929050565b6000816004811115613367576133676144b9565b0361336f5750565b6001816004811115613383576133836144b9565b036133d05760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610933565b60028160048111156133e4576133e46144b9565b036134315760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610933565b6003816004811115613445576134456144b9565b0361349d5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610933565b60048160048111156134b1576134b16144b9565b036109a95760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610933565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561354057506000905060036135ed565b8460ff16601b1415801561355857508460ff16601c14155b1561356957506000905060046135ed565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa1580156135bd573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166135e6576000600192509250506135ed565b9150600090505b94509492505050565b50805461360290614100565b6000825580601f10613612575050565b601f0160209004906000526020600020908101906109a991905b80821115613640576000815560010161362c565b5090565b60006020828403121561365657600080fd5b81356001600160e01b03198116811461306057600080fd5b60006020828403121561368057600080fd5b5035919050565b60008083601f84011261369957600080fd5b5081356001600160401b038111156136b057600080fd5b60208301915083602082850101111561334c57600080fd5b6000806000604084860312156136dd57600080fd5b8335925060208401356001600160401b038111156136fa57600080fd5b61370686828701613687565b9497909650939450505050565b6001600160a01b03811681146109a957600080fd5b803561373381613713565b919050565b6000806040838503121561374b57600080fd5b82359150602083013561375d81613713565b809150509250929050565b60006020828403121561377a57600080fd5b813561306081613713565b60008083601f84011261379757600080fd5b5081356001600160401b038111156137ae57600080fd5b6020830191508360208260051b850101111561334c57600080fd5b80151581146109a957600080fd5b60008060008060008060008060a0898b0312156137f357600080fd5b88356137fe81613713565b975060208901356001600160401b038082111561381a57600080fd5b6138268c838d01613785565b909950975060408b013591508082111561383f57600080fd5b61384b8c838d01613785565b909750955060608b013591508082111561386457600080fd5b506138718b828c01613785565b9094509250506080890135613885816137c9565b809150509295985092959890939650565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b03811182821017156138d4576138d4613896565b604052919050565b60006001600160401b038211156138f5576138f5613896565b5060051b60200190565b6000602080838503121561391257600080fd5b82356001600160401b0381111561392857600080fd5b8301601f8101851361393957600080fd5b803561394c613947826138dc565b6138ac565b81815260059190911b8201830190838101908783111561396b57600080fd5b928401925b8284101561399257833561398381613713565b82529284019290840190613970565b979650505050505050565b600080600080606085870312156139b357600080fd5b84356139be81613713565b93506020850135925060408501356001600160401b038111156139e057600080fd5b6139ec87828801613687565b95989497509550505050565b60008060208385031215613a0b57600080fd5b82356001600160401b03811115613a2157600080fd5b613a2d85828601613687565b90969095509350505050565b60005b83811015613a54578181015183820152602001613a3c565b50506000910152565b60008151808452613a75816020860160208601613a39565b601f01601f19169290920160200192915050565b6020815260006130606020830184613a5d565b60008060008060008060c08789031215613ab557600080fd5b8635613ac081613713565b95506020870135613ad081613713565b94506040870135613ae081613713565b93506060870135613af081613713565b92506080870135613b0081613713565b915060a0870135613b1081613713565b809150509295509295509295565b60008060008060008060008060a0898b031215613b3a57600080fd5b8835613b4581613713565b97506020890135965060408901356001600160401b0380821115613b6857600080fd5b613b748c838d01613687565b909850965060608b0135915080821115613b8d57600080fd5b613b998c838d01613785565b909650945060808b0135915080821115613bb257600080fd5b50613bbf8b828c01613785565b999c989b5096995094979396929594505050565b60008060208385031215613be657600080fd5b82356001600160401b03811115613bfc57600080fd5b613a2d85828601613785565b80356001600160401b038116811461373357600080fd5b600080600080600080600080600080600060e08c8e031215613c4057600080fd5b613c498c613728565b9a506001600160401b038060208e01351115613c6457600080fd5b613c748e60208f01358f01613785565b909b50995060408d0135811015613c8a57600080fd5b613c9a8e60408f01358f01613785565b909950975060608d0135811015613cb057600080fd5b613cc08e60608f01358f01613785565b9097509550613cd160808e01613c08565b945060a08d013593508060c08e01351115613ceb57600080fd5b50613cfc8d60c08e01358e01613687565b81935080925050509295989b509295989b9093969950565b6000806000806000806000806000806000806101008d8f031215613d3757600080fd5b613d408d613728565b9b506001600160401b0360208e01351115613d5a57600080fd5b613d6a8e60208f01358f01613785565b909b5099506001600160401b0360408e01351115613d8757600080fd5b613d978e60408f01358f01613785565b90995097506001600160401b0360608e01351115613db457600080fd5b613dc48e60608f01358f01613785565b9097509550613dd560808e01613c08565b9450613de360a08e01613728565b935060c08d013592506001600160401b0360e08e01351115613e0457600080fd5b613e148e60e08f01358f01613687565b81935080925050509295989b509295989b509295989b565b60008060408385031215613e3f57600080fd5b8235613e4a81613713565b9150602083013561375d81613713565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b6000613e92613947846138dc565b80848252602080830192508560051b850136811115613eb057600080fd5b855b81811015613f425780356001600160401b0380821115613ed25760008081fd5b90880190601f3681840112613ee75760008081fd5b823582811115613ef957613ef9613896565b613f0a818301601f191688016138ac565b92508083523687828601011115613f2357600091508182fd5b8087850188850137600090830187015250865250938201938201613eb2565b50919695505050505050565b600060208284031215613f6057600080fd5b8151613060816137c9565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b818103818111156108c4576108c4613fb0565b634e487b7160e01b600052603260045260246000fd5b60006001820161400157614001613fb0565b5060010190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b60208082526026908201527f4d696e74696e674d616e616765723a20535542444f4d41494e535f4e4f545f41604082015265131313d5d15160d21b606082015260800190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6000602082840312156140d157600080fd5b5051919050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c9082168061411457607f821691505b60208210810361413457634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561414c57600080fd5b815161306081613713565b600081518084526020808501808196508360051b8101915082860160005b8581101561419f57828403895261418d848351613a5d565b98850198935090840190600101614175565b5091979650505050505050565b6001600160a01b038616815260a0602082018190526000906141d090830187614157565b82810360408401526141e28187614157565b905082810360608401526141f68186614157565b91505082151560808301529695505050505050565b600060018060a01b0380861683526060602084015261422d6060840186613a5d565b9150808416604084015250949350505050565b6060815260006142536060830186614157565b82810360208401526142658186614157565b915050826040830152949350505050565b60008161428557614285613fb0565b506000190190565b6000825161429f818460208701613a39565b9190910192915050565b601f82111561099357600081815260208120601f850160051c810160208610156142d05750805b601f850160051c820191505b818110156111f2578281556001016142dc565b81516001600160401b0381111561430857614308613896565b61431c816143168454614100565b846142a9565b602080601f83116001811461435157600084156143395750858301515b600019600386901b1c1916600185901b1785556111f2565b600085815260208120601f198616915b8281101561438057888601518255948401946001909101908401614361565b508582101561439e5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b8281526040602082015260006143c76040830184613a5d565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b808201808211156108c4576108c4613fb0565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351614465816017850160208801613a39565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351614496816028840160208801613a39565b01602801949350505050565b80820281158282048414176108c4576108c4613fb0565b634e487b7160e01b600052602160045260246000fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
