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
const _bytecode = "0x608060405234801561001057600080fd5b506144ff806100206000396000f3fe60806040526004361061027d5760003560e01c8063983b2d561161014f578063cc2a9a5b116100c1578063d7db74c71161007a578063d7db74c7146107ce578063ec527389146107e1578063f2fde38b14610801578063f5243bc414610821578063f940e38514610841578063ffa1ad741461086157600080fd5b8063cc2a9a5b1461070c578063cc2c3fc41461072c578063ceeb4f501461074c578063d1f5692c1461076c578063d53913931461078c578063d547741f146107ae57600080fd5b8063a849d65c11610113578063a849d65c1461064c578063aa271e1a1461066c578063b0aa98c71461068c578063b3ab15fb146106ac578063b9998a24146106cc578063c3a3bc00146106ec57600080fd5b8063983b2d561461059557806398650275146105b557806399e0dd7c146105ca578063a217fddf146105ea578063a3f4df7e146105ff57600080fd5b80635c975abb116101f357806377a2a589116101ac57806377a2a589146104ef57806381c81d351461050f5780638456cb59146105225780638da5cb5b14610537578063906cecc11461055557806391d148541461057557600080fd5b80635c975abb146104525780635cd7e3b3146104675780635fc1964f14610487578063634486da146104a7578063715018a6146104ba57806371e2a657146104cf57600080fd5b806336568abe1161024557806336568abe146103575780633f41b614146103775780633f4ba83a146103af57806351cff8d9146103c4578063572b6c05146103e45780635b6fa8db1461043257600080fd5b806301ffc9a714610282578063248a9ca3146102b7578063268b15ed146102f55780632f2ff15d146103175780633092afd514610337575b600080fd5b34801561028e57600080fd5b506102a261029d366004613627565b610893565b60405190151581526020015b60405180910390f35b3480156102c357600080fd5b506102e76102d2366004613651565b60009081526097602052604090206001015490565b6040519081526020016102ae565b34801561030157600080fd5b506103156103103660046136ab565b6108ca565b005b34801561032357600080fd5b5061031561033236600461371b565b61096e565b34801561034357600080fd5b5061031561035236600461374b565b610998565b34801561036357600080fd5b5061031561037236600461371b565b6109ac565b34801561038357600080fd5b5060c954610397906001600160a01b031681565b6040516001600160a01b0390911681526020016102ae565b3480156103bb57600080fd5b50610315610a3a565b3480156103d057600080fd5b506103156103df36600461374b565b610a4c565b3480156103f057600080fd5b506102a26103ff36600461374b565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561043e57600080fd5b5060cc54610397906001600160a01b031681565b34801561045e57600080fd5b506102a2610aec565b34801561047357600080fd5b506103156104823660046137ba565b610b02565b34801561049357600080fd5b506103156104a23660046138e2565b610de4565b6103156104b536600461374b565b610e2c565b3480156104c657600080fd5b50610315610f1f565b3480156104db57600080fd5b506103156104ea3660046138e2565b610f31565b3480156104fb57600080fd5b5060ce54610397906001600160a01b031681565b61031561051d36600461374b565b610f79565b34801561052e57600080fd5b50610315611026565b34801561054357600080fd5b506033546001600160a01b0316610397565b34801561056157600080fd5b50610315610570366004613980565b611036565b34801561058157600080fd5b506102a261059036600461371b565b6110bd565b3480156105a157600080fd5b506103156105b036600461374b565b6110e8565b3480156105c157600080fd5b506103156110f9565b3480156105d657600080fd5b506103156105e53660046139db565b611113565b3480156105f657600080fd5b506102e7600081565b34801561060b57600080fd5b5061063f604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102ae9190613a6c565b34801561065857600080fd5b5060cb54610397906001600160a01b031681565b34801561067857600080fd5b506102a261068736600461374b565b6111fa565b34801561069857600080fd5b506102a26106a7366004613651565b611214565b3480156106b857600080fd5b506103156106c736600461374b565b611272565b3480156106d857600080fd5b506103156106e736600461374b565b61129c565b3480156106f857600080fd5b506103156107073660046139db565b6112e1565b34801561071857600080fd5b50610315610727366004613a7f565b611328565b34801561073857600080fd5b5060ca54610397906001600160a01b031681565b34801561075857600080fd5b50610315610767366004613b01565b611766565b34801561077857600080fd5b50610315610787366004613bb6565b6117fc565b34801561079857600080fd5b506102e76000805160206144d383398151915281565b3480156107ba57600080fd5b506103156107c936600461371b565b6118b3565b6103156107dc366004613c02565b6118d8565b3480156107ed57600080fd5b506103156107fc366004613651565b611a66565b34801561080d57600080fd5b5061031561081c36600461374b565b611ad8565b34801561082d57600080fd5b5061031561083c366004613cf7565b611af4565b34801561084d57600080fd5b5061031561085c366004613e0f565b611ca4565b34801561086d57600080fd5b5061063f604051806040016040528060068152602001650605c685c62760d31b81525081565b60006001600160e01b03198216637965db0b60e01b14806108c457506301ffc9a760e01b6001600160e01b03198316145b92915050565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061090e9250849150839050611e20565b610916610aec565b1561093c5760405162461bcd60e51b815260040161093390613e3d565b60405180910390fd5b6060610965610949611f75565b61095c886109578989611f84565b611fb0565b838460016120c1565b50505050505050565b60008281526097602052604090206001015461098981612496565b61099383836124a7565b505050565b6109a061252e565b6109a9816125a7565b50565b6109b4611f75565b6001600160a01b0316816001600160a01b031614610a2c5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610933565b610a3682826125bf565b5050565b610a4261252e565b610a4a612644565b565b610a5461252e565b6001600160a01b038116610a6757600080fd5b60405147906001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610a9f573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905260008183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a15050565b6000805160206144b38339815191525460ff1690565b610b0c8688613e67565b8051600203610b7d57610b20610687611f75565b610b785760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610933565b610d0a565b6000610b88826126ec565b60c9549092506001600160a01b0316905063430c2081610ba6611f75565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610bf1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c159190613f31565b80610ca4575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610c6e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c929190613f31565b8015610ca45750610ca4610687611f75565b610d085760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b6064820152608401610933565b505b610d148789613e67565b600281511015610d365760405162461bcd60e51b815260040161093390613f4e565b610d8a610d6a60008360018551610d4d9190613fa9565b81518110610d5d57610d5d613fbc565b6020026020010151612727565b82600081518110610d7d57610d7d613fbc565b6020026020010151611e20565b610d92610aec565b15610daf5760405162461bcd60e51b815260040161093390613e3d565b610dd78a610dbd8a8c613e67565b610dc7898b613e67565b610dd1888a613e67565b876120c1565b5050505050505050505050565b610dec61252e565b60005b8151811015610a3657610e1a828281518110610e0d57610e0d613fbc565b60200260200101516125a7565b80610e2481613fd2565b915050610def565b610e37610687611f75565b610e835760405162461bcd60e51b815260206004820181905260248201527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e5445526044820152606401610933565b6001600160a01b038116610ed95760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610933565b610ee2816127db565b610eea6110f9565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610a36573d6000803e3d6000fd5b610f2761252e565b610a4a60006127f3565b610f3961252e565b60005b8151811015610a3657610f67828281518110610f5a57610f5a613fbc565b60200260200101516127db565b80610f7181613fd2565b915050610f3c565b610f84610687611f75565b610fd05760405162461bcd60e51b815260206004820181905260248201527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e5445526044820152606401610933565b6001600160a01b038116610ee25760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610933565b61102e61252e565b610a4a612845565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061107a9250849150839050611e20565b611082610aec565b1561109f5760405162461bcd60e51b815260040161093390613e3d565b60606110b38761095c886109578989611f84565b5050505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6110f061252e565b6109a9816127db565b610a4a6000805160206144d3833981519152610372611f75565b61111b61252e565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061114d9085908590600401613feb565b600060405180830381600087803b15801561116757600080fd5b505af115801561117b573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610a3690505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906111c49085908590600401613feb565b600060405180830381600087803b1580156111de57600080fd5b505af11580156111f2573d6000803e3d6000fd5b505050505050565b60006108c46000805160206144d3833981519152836110bd565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611268906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b61127a61252e565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b6112a461252e565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b6112e961252e565b610a3682828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506128ad92505050565b600054610100900460ff16158080156113485750600054600160ff909116105b806113625750303b158015611362575060005460ff166001145b6113c55760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610933565b6000805460ff1916600117905580156113e8576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce80549091169185169190911790556114466129b1565b61144e6129e8565b61145782612a21565b61145f612a48565b604080516102c081018252600661028082018181526563727970746f60d01b6102a0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b8183015261016084015283518085018552600280825261686960f01b8284015261018085019190915284518086018652928352656b726573757360d01b838301526101a084019290925283518085018552600580825264616e696d6560d81b828401526101c085019190915284518086018652818152646d616e676160d81b818401526101e085015284518086018652600981526862696e616e6365757360b81b8184015261020085015284518086018652908152647265616c6d60d81b818301526102208401528351808501855291825261676f60f01b8282015261024083019190915282518084019093526008835267185b1d1a5b5a5cdd60c21b9083015261026081019190915260005b6014811015611716576117048282601481106116fa576116fa613fbc565b60200201516128ad565b8061170e81613fd2565b9150506116dc565b50508015610965576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506117aa9250849150839050611e20565b6117b2610aec565b156117cf5760405162461bcd60e51b815260040161093390613e3d565b610dd78a6117e18b6109578c8c611f84565b6117eb888a613e67565b6117f58789613e67565b60016120c1565b61180461252e565b60005b818110156109935760c9546001600160a01b0316635096023984848481811061183257611832613fbc565b9050602002016020810190611847919061374b565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561188857600080fd5b505af115801561189c573d6000803e3d6000fd5b5050505080806118ab90613fd2565b915050611807565b6000828152609760205260409020600101546118ce81612496565b61099383836125bf565b6118e2898b613e67565b6002815110156119045760405162461bcd60e51b815260040161093390613f4e565b61191b610d6a60008360018551610d4d9190613fa9565b611923610aec565b156119405760405162461bcd60e51b815260040161093390613e3d565b60028a146119605760405162461bcd60e51b81526004016109339061401a565b6119a68c8c8c8888600089898080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612a8892505050565b833410156119f65760405162461bcd60e51b815260206004820181905260248201527f4d696e74696e674d616e616765723a204e4f545f454e4f5547485f46554e44536044820152606401610933565b611a088c8c8c8c8c8c8c8b6000612c48565b83341115611a5857611a18611f75565b6001600160a01b03166108fc611a2e8634613fa9565b6040518115909202916000818181858888f19350505050158015611a56573d6000803e3d6000fd5b505b505050505050505050505050565b611a6e61252e565b611a7781612d02565b611a935760405162461bcd60e51b815260040161093390614060565b600081815260cd60205260408120611aaa916135d9565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611ae061252e565b611ae981612d28565b6109a9600082612d9e565b611afe8a8c613e67565b600281511015611b205760405162461bcd60e51b815260040161093390613f4e565b611b37610d6a60008360018551610d4d9190613fa9565b611b3f610aec565b15611b5c5760405162461bcd60e51b815260040161093390613e3d565b60028b14611b7c5760405162461bcd60e51b81526004016109339061401a565b611bc18d8d8d89888a89898080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612a8892505050565b846001600160a01b03166323b872dd611bd8611f75565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018790526064016020604051808303816000875af1158015611c2b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c4f9190613f31565b611c935760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610933565b611a568d8d8d8d8d8d8d8b8d612c48565b611cac61252e565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa158015611cf3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d1791906140a2565b60405163a9059cbb60e01b81526001600160a01b038481166004830152602482018390529192509084169063a9059cbb906044016020604051808303816000875af1158015611d6a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d8e9190613f31565b611dd25760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b6044820152606401610933565b604080516001600160a01b0384811682526020820184905285168183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a1505050565b611e2982612d02565b611e455760405162461bcd60e51b815260040161093390614060565b6000611e788260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115611f2057611ea3611e97826000600a612da8565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b803611f205760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610933565b611f2982612de7565b6109935760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c49440000006044820152606401610933565b6000611f7f612f4b565b905090565b60608282604051602001611f999291906140bb565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611fca5790505090508281600081518110611ff557611ff5613fbc565b602002602001018190525060cd6000858152602001908152602001600020805461201e906140e3565b80601f016020809104026020016040519081016040528092919081815260200182805461204a906140e3565b80156120975780601f1061206c57610100808354040283529160200191612097565b820191906000526020600020905b81548152906001019060200180831161207a57829003601f168201915b5050505050816001815181106120af576120af613fbc565b60209081029190910101529392505050565b60008060006120cf876126ec565b915091508380156120e1575060028751115b8015612163575060c9546040516331a9108f60e11b8152600481018390526001600160a01b038a8116921690636352211e90602401602060405180830381865afa158015612133573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612157919061411d565b6001600160a01b031614155b156121c35760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b6064820152608401610933565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa15801561220c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122309190613f31565b80156122af575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa158015612280573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122a4919061411d565b6001600160a01b0316145b156123235760c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be06906122ec908b908b908b908b908b9060040161418f565b600060405180830381600087803b15801561230657600080fd5b505af115801561231a573d6000803e3d6000fd5b5050505061248b565b61232c82612f91565b61233587612ff0565b8015612342575086516002145b156124205760ca5487516001600160a01b039091169063c36c2125908a908a9060009061237157612371613fbc565b602090810291909101015160cc546040516001600160e01b031960e086901b1681526123ab9392916001600160a01b0316906004016141ee565b600060405180830381600087803b1580156123c557600080fd5b505af11580156123d9573d6000803e3d6000fd5b5050505060008651111561241b5760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae74906122ec90899089908790600401614223565b61248b565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790612458908b908b908b908b908b9060040161418f565b600060405180830381600087803b15801561247257600080fd5b505af1158015612486573d6000803e3d6000fd5b505050505b509695505050505050565b6109a9816124a2611f75565b61304a565b6124b182826110bd565b610a365760008281526097602090815260408083206001600160a01b03851684529091529020805460ff191660011790556124ea611f75565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612536611f75565b6001600160a01b03166125516033546001600160a01b031690565b6001600160a01b031614610a4a5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610933565b6109a96000805160206144d3833981519152826118b3565b6125c982826110bd565b15610a365760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612600611f75565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b61264c610aec565b61268f5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610933565b6000805160206144b3833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6126cf611f75565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b80156127215782915061270d8285610d4d600185613fa9565b92508061271981614259565b9150506126f4565b50915091565b6000815160000361277a5760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610933565b828260405160200161278c9190614270565b604051602081830303815290604052805190602001206040516020016127bc929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b6109a96000805160206144d383398151915282612d9e565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b61284d610aec565b1561286a5760405162461bcd60e51b815260040161093390613e3d565b6000805160206144b3833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586126cf611f75565b60006128ba600083612727565b600081815260cd602052604090209091506128d583826142d2565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980836040516129069190613a6c565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015612957573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061297b9190613f31565b610a365760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c60906111c49084908690600401614391565b600054610100900460ff166129d85760405162461bcd60e51b8152600401610933906143b2565b610a4a6129e3611f75565b6127f3565b600054610100900460ff16612a0f5760405162461bcd60e51b8152600401610933906143b2565b610a4a6000612a1c611f75565b612d9e565b600054610100900460ff166112a45760405162461bcd60e51b8152600401610933906143b2565b600054610100900460ff16612a6f5760405162461bcd60e51b8152600401610933906143b2565b6000805160206144b3833981519152805460ff19169055565b6000612a9c612a978789613e67565b6126ec565b506040516bffffffffffffffffffffffff1930606090811b821660208401524660348401528b811b82166054840152606883018490526001600160c01b031960c08a901b1660888401526090830188905286901b1660b0820152909150600090612b78908490612b729060c401604051602081830303815290604052805190602001206040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b906130ae565b9050612b83816111fa565b612bdb5760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a205349474e45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610933565b42866001600160401b031611612c3d5760405162461bcd60e51b815260206004820152602160248201527f4d696e74696e674d616e616765723a20455850495245445f5349474e415455526044820152604560f81b6064820152608401610933565b505050505050505050565b6000612c8d8a612c588a8c613e67565b612c62898b613e67565b612c6c888a613e67565b8e6001600160a01b0316612c7e611f75565b6001600160a01b0316146120c1565b9050896001600160a01b0316612ca1611f75565b6001600160a01b0316827fa545b6fd3355e8d57f8c8147bafe740545bd3ea1f94bef2576a6d532a7c3b6058686604051612cee9291909182526001600160a01b0316602082015260400190565b60405180910390a450505050505050505050565b600081815260cd602052604081208054829190612d1e906140e3565b9050119050919050565b612d3061252e565b6001600160a01b038116612d955760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610933565b6109a9816127f3565b610a3682826124a7565b60408051808201909152600080825260208201526040518060400160405280838152602001848660200151612ddd91906143fd565b9052949350505050565b60008151600003612dfa57506000919050565b60208201805160f81c60308110801590612e18575060398160ff1611155b158015612e3a575060618160ff1610158015612e385750607a8160ff1611155b155b15612e49575060009392505050565b83516001811115612eb757612e6b83612e63600184613fa9565b015160f81c90565b915060308260ff1610158015612e85575060398260ff1611155b158015612ea7575060618260ff1610158015612ea55750607a8260ff1611155b155b15612eb757506000949350505050565b60015b612ec5600183613fa9565b811015612f3f578381015160f81c9250602d8314801590612efb575060308360ff1610158015612ef9575060398360ff1611155b155b8015612f1c575060618360ff1610158015612f1a5750607a8360ff1611155b155b15612f2d5750600095945050505050565b80612f3781613fd2565b915050612eba565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b03163303612f8c575060331936013560601c90565b503390565b612f9a81611214565b15612fe75760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610933565b6109a9816130d2565b60008061300760008460018651610d4d9190613fa9565b60ca549091506001600160a01b0316158015906130435750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b61305482826110bd565b610a365761306c816001600160a01b03166014613156565b613077836020613156565b604051602001613088929190614410565b60408051601f198184030181529082905262461bcd60e51b825261093391600401613a6c565b60008060006130bd85856132f1565b915091506130ca81613336565b509392505050565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526001906131119060600161124f565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b60606000613165836002614485565b6131709060026143fd565b6001600160401b0381111561318757613187613879565b6040519080825280601f01601f1916602001820160405280156131b1576020820181803683370190505b509050600360fc1b816000815181106131cc576131cc613fbc565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106131fb576131fb613fbc565b60200101906001600160f81b031916908160001a905350600061321f846002614485565b61322a9060016143fd565b90505b60018111156132a2576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061325e5761325e613fbc565b1a60f81b82828151811061327457613274613fbc565b60200101906001600160f81b031916908160001a90535060049490941c9361329b81614259565b905061322d565b5083156130435760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610933565b60008082516041036133275760208301516040840151606085015160001a61331b878285856134ec565b9450945050505061332f565b506000905060025b9250929050565b600081600481111561334a5761334a61449c565b036133525750565b60018160048111156133665761336661449c565b036133b35760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610933565b60028160048111156133c7576133c761449c565b036134145760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610933565b60038160048111156134285761342861449c565b036134805760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610933565b60048160048111156134945761349461449c565b036109a95760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610933565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561352357506000905060036135d0565b8460ff16601b1415801561353b57508460ff16601c14155b1561354c57506000905060046135d0565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa1580156135a0573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166135c9576000600192509250506135d0565b9150600090505b94509492505050565b5080546135e5906140e3565b6000825580601f106135f5575050565b601f0160209004906000526020600020908101906109a991905b80821115613623576000815560010161360f565b5090565b60006020828403121561363957600080fd5b81356001600160e01b03198116811461304357600080fd5b60006020828403121561366357600080fd5b5035919050565b60008083601f84011261367c57600080fd5b5081356001600160401b0381111561369357600080fd5b60208301915083602082850101111561332f57600080fd5b6000806000604084860312156136c057600080fd5b8335925060208401356001600160401b038111156136dd57600080fd5b6136e98682870161366a565b9497909650939450505050565b6001600160a01b03811681146109a957600080fd5b8035613716816136f6565b919050565b6000806040838503121561372e57600080fd5b823591506020830135613740816136f6565b809150509250929050565b60006020828403121561375d57600080fd5b8135613043816136f6565b60008083601f84011261377a57600080fd5b5081356001600160401b0381111561379157600080fd5b6020830191508360208260051b850101111561332f57600080fd5b80151581146109a957600080fd5b60008060008060008060008060a0898b0312156137d657600080fd5b88356137e1816136f6565b975060208901356001600160401b03808211156137fd57600080fd5b6138098c838d01613768565b909950975060408b013591508082111561382257600080fd5b61382e8c838d01613768565b909750955060608b013591508082111561384757600080fd5b506138548b828c01613768565b9094509250506080890135613868816137ac565b809150509295985092959890939650565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b03811182821017156138b7576138b7613879565b604052919050565b60006001600160401b038211156138d8576138d8613879565b5060051b60200190565b600060208083850312156138f557600080fd5b82356001600160401b0381111561390b57600080fd5b8301601f8101851361391c57600080fd5b803561392f61392a826138bf565b61388f565b81815260059190911b8201830190838101908783111561394e57600080fd5b928401925b82841015613975578335613966816136f6565b82529284019290840190613953565b979650505050505050565b6000806000806060858703121561399657600080fd5b84356139a1816136f6565b93506020850135925060408501356001600160401b038111156139c357600080fd5b6139cf8782880161366a565b95989497509550505050565b600080602083850312156139ee57600080fd5b82356001600160401b03811115613a0457600080fd5b613a108582860161366a565b90969095509350505050565b60005b83811015613a37578181015183820152602001613a1f565b50506000910152565b60008151808452613a58816020860160208601613a1c565b601f01601f19169290920160200192915050565b6020815260006130436020830184613a40565b60008060008060008060c08789031215613a9857600080fd5b8635613aa3816136f6565b95506020870135613ab3816136f6565b94506040870135613ac3816136f6565b93506060870135613ad3816136f6565b92506080870135613ae3816136f6565b915060a0870135613af3816136f6565b809150509295509295509295565b60008060008060008060008060a0898b031215613b1d57600080fd5b8835613b28816136f6565b97506020890135965060408901356001600160401b0380821115613b4b57600080fd5b613b578c838d0161366a565b909850965060608b0135915080821115613b7057600080fd5b613b7c8c838d01613768565b909650945060808b0135915080821115613b9557600080fd5b50613ba28b828c01613768565b999c989b5096995094979396929594505050565b60008060208385031215613bc957600080fd5b82356001600160401b03811115613bdf57600080fd5b613a1085828601613768565b80356001600160401b038116811461371657600080fd5b600080600080600080600080600080600060e08c8e031215613c2357600080fd5b613c2c8c61370b565b9a506001600160401b038060208e01351115613c4757600080fd5b613c578e60208f01358f01613768565b909b50995060408d0135811015613c6d57600080fd5b613c7d8e60408f01358f01613768565b909950975060608d0135811015613c9357600080fd5b613ca38e60608f01358f01613768565b9097509550613cb460808e01613beb565b945060a08d013593508060c08e01351115613cce57600080fd5b50613cdf8d60c08e01358e0161366a565b81935080925050509295989b509295989b9093969950565b6000806000806000806000806000806000806101008d8f031215613d1a57600080fd5b613d238d61370b565b9b506001600160401b0360208e01351115613d3d57600080fd5b613d4d8e60208f01358f01613768565b909b5099506001600160401b0360408e01351115613d6a57600080fd5b613d7a8e60408f01358f01613768565b90995097506001600160401b0360608e01351115613d9757600080fd5b613da78e60608f01358f01613768565b9097509550613db860808e01613beb565b9450613dc660a08e0161370b565b935060c08d013592506001600160401b0360e08e01351115613de757600080fd5b613df78e60e08f01358f0161366a565b81935080925050509295989b509295989b509295989b565b60008060408385031215613e2257600080fd5b8235613e2d816136f6565b91506020830135613740816136f6565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b6000613e7561392a846138bf565b80848252602080830192508560051b850136811115613e9357600080fd5b855b81811015613f255780356001600160401b0380821115613eb55760008081fd5b90880190601f3681840112613eca5760008081fd5b823582811115613edc57613edc613879565b613eed818301601f1916880161388f565b92508083523687828601011115613f0657600091508182fd5b8087850188850137600090830187015250865250938201938201613e95565b50919695505050505050565b600060208284031215613f4357600080fd5b8151613043816137ac565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b818103818111156108c4576108c4613f93565b634e487b7160e01b600052603260045260246000fd5b600060018201613fe457613fe4613f93565b5060010190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b60208082526026908201527f4d696e74696e674d616e616765723a20535542444f4d41494e535f4e4f545f41604082015265131313d5d15160d21b606082015260800190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6000602082840312156140b457600080fd5b5051919050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c908216806140f757607f821691505b60208210810361411757634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561412f57600080fd5b8151613043816136f6565b600081518084526020808501808196508360051b8101915082860160005b85811015614182578284038952614170848351613a40565b98850198935090840190600101614158565b5091979650505050505050565b6001600160a01b038616815260a0602082018190526000906141b39083018761413a565b82810360408401526141c5818761413a565b905082810360608401526141d9818661413a565b91505082151560808301529695505050505050565b600060018060a01b038086168352606060208401526142106060840186613a40565b9150808416604084015250949350505050565b606081526000614236606083018661413a565b8281036020840152614248818661413a565b915050826040830152949350505050565b60008161426857614268613f93565b506000190190565b60008251614282818460208701613a1c565b9190910192915050565b601f82111561099357600081815260208120601f850160051c810160208610156142b35750805b601f850160051c820191505b818110156111f2578281556001016142bf565b81516001600160401b038111156142eb576142eb613879565b6142ff816142f984546140e3565b8461428c565b602080601f831160018114614334576000841561431c5750858301515b600019600386901b1c1916600185901b1785556111f2565b600085815260208120601f198616915b8281101561436357888601518255948401946001909101908401614344565b50858210156143815787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b8281526040602082015260006143aa6040830184613a40565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b808201808211156108c4576108c4613f93565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351614448816017850160208801613a1c565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351614479816028840160208801613a1c565b01602801949350505050565b80820281158282048414176108c4576108c4613f93565b634e487b7160e01b600052602160045260246000fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
