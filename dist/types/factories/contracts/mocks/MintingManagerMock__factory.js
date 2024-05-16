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
const _bytecode = "0x608060405234801561001057600080fd5b5061509f806100206000396000f3fe6080604052600436106102c95760003560e01c806391d1485411610175578063b9998a24116100dc578063d547741f11610095578063f2fde38b1161006f578063f2fde38b146108cd578063f5243bc4146108ed578063f940e3851461090d578063ffa1ad741461092d57600080fd5b8063d547741f1461087a578063d7db74c71461089a578063ec527389146108ad57600080fd5b8063b9998a24146107b8578063cc2a9a5b146107d8578063cc2c3fc4146107f8578063ceeb4f5014610818578063d1f5692c14610838578063d53913931461085857600080fd5b8063a3f4df7e1161012e578063a3f4df7e146106cb578063a849d65c14610718578063aa271e1a14610738578063ae31844a14610758578063b0aa98c714610778578063b3ab15fb1461079857600080fd5b806391d1485414610621578063983b2d5614610641578063986502751461066157806399e0dd7c14610676578063a217fddf14610696578063a3a3f7f6146106ab57600080fd5b80635b6fa8db11610234578063715018a6116101ed57806381c81d35116101c757806381c81d35146105bb5780638456cb59146105ce5780638da5cb5b146105e3578063906cecc11461060157600080fd5b8063715018a61461056657806371e2a6571461057b57806377a2a5891461059b57600080fd5b80635b6fa8db146104be5780635c975abb146104de5780635cd7e3b3146104f35780635e22cd86146105135780635fc1964f14610533578063634486da1461055357600080fd5b80633092afd5116102865780633092afd5146103c357806336568abe146103e35780633f41b614146104035780633f4ba83a1461043b57806351cff8d914610450578063572b6c051461047057600080fd5b806301ffc9a7146102ce5780631edb948e1461030357806320c5429b14610325578063248a9ca314610345578063268b15ed146103835780632f2ff15d146103a3575b600080fd5b3480156102da57600080fd5b506102ee6102e9366004613f0a565b61095e565b60405190151581526020015b60405180910390f35b34801561030f57600080fd5b5061032361031e366004613f59565b610995565b005b34801561033157600080fd5b50610323610340366004613f85565b610b3e565b34801561035157600080fd5b50610375610360366004613f85565b60009081526097602052604090206001015490565b6040519081526020016102fa565b34801561038f57600080fd5b5061032361039e366004613fdf565b610c61565b3480156103af57600080fd5b506103236103be36600461404a565b610cf4565b3480156103cf57600080fd5b506103236103de36600461407a565b610d1e565b3480156103ef57600080fd5b506103236103fe36600461404a565b610d32565b34801561040f57600080fd5b5060c954610423906001600160a01b031681565b6040516001600160a01b0390911681526020016102fa565b34801561044757600080fd5b50610323610dc0565b34801561045c57600080fd5b5061032361046b36600461407a565b610dd2565b34801561047c57600080fd5b506102ee61048b36600461407a565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b3480156104ca57600080fd5b5060cc54610423906001600160a01b031681565b3480156104ea57600080fd5b506102ee610e72565b3480156104ff57600080fd5b5061032361050e3660046140e9565b610e88565b34801561051f57600080fd5b5061032361052e3660046141a8565b6110ec565b34801561053f57600080fd5b5061032361054e3660046142e2565b611331565b61032361056136600461407a565b611379565b34801561057257600080fd5b5061032361143c565b34801561058757600080fd5b506103236105963660046142e2565b61144e565b3480156105a757600080fd5b5060ce54610423906001600160a01b031681565b6103236105c936600461407a565b611496565b3480156105da57600080fd5b50610323611513565b3480156105ef57600080fd5b506033546001600160a01b0316610423565b34801561060d57600080fd5b5061032361061c366004614380565b611523565b34801561062d57600080fd5b506102ee61063c36600461404a565b6115a9565b34801561064d57600080fd5b5061032361065c36600461407a565b6115d4565b34801561066d57600080fd5b506103236115e5565b34801561068257600080fd5b506103236106913660046143db565b6115ff565b3480156106a257600080fd5b50610375600081565b3480156106b757600080fd5b506103236106c636600461441c565b6116e6565b3480156106d757600080fd5b5061070b604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102fa91906144c2565b34801561072457600080fd5b5060cb54610423906001600160a01b031681565b34801561074457600080fd5b506102ee61075336600461407a565b61172f565b34801561076457600080fd5b506103236107733660046144d5565b611749565b34801561078457600080fd5b506102ee610793366004613f85565b611854565b3480156107a457600080fd5b506103236107b336600461407a565b6118b2565b3480156107c457600080fd5b506103236107d336600461407a565b6118dc565b3480156107e457600080fd5b506103236107f336600461450a565b611921565b34801561080457600080fd5b5060ca54610423906001600160a01b031681565b34801561082457600080fd5b5061032361083336600461458c565b611e18565b34801561084457600080fd5b506103236108533660046144d5565b611ebc565b34801561086457600080fd5b5061037560008051602061507383398151915281565b34801561088657600080fd5b5061032361089536600461404a565b611f73565b6103236108a8366004614641565b611f98565b3480156108b957600080fd5b506103236108c8366004613f85565b612128565b3480156108d957600080fd5b506103236108e836600461407a565b61219a565b3480156108f957600080fd5b50610323610908366004614736565b6121b6565b34801561091957600080fd5b5061032361092836600461484e565b612368565b34801561093957600080fd5b5061070b60405180604001604052806005815260200164302e352e3160d81b81525081565b60006001600160e01b03198216637965db0b60e01b148061098f57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6109a06107536124e4565b6109c55760405162461bcd60e51b81526004016109bc9061487c565b60405180910390fd5b60c95460405163baef73e960e01b8152600481018390526000916001600160a01b03169063baef73e990602401602060405180830381865afa158015610a0f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a3391906148b1565b9050806001600160401b0316600003610a5e5760405162461bcd60e51b81526004016109bc906148ce565b806001600160401b0316836001600160401b031611610acb5760405162461bcd60e51b815260206004820152602360248201527f4d696e74696e674d616e616765723a204558504952595f4e4f545f455854454e60448201526211115160ea1b60648201526084016109bc565b60c954604051631fb9763760e11b81526001600160401b0385166004820152602481018490526001600160a01b0390911690633f72ec6e906044015b600060405180830381600087803b158015610b2157600080fd5b505af1158015610b35573d6000803e3d6000fd5b50505050505050565b610b496107536124e4565b610b655760405162461bcd60e51b81526004016109bc9061487c565b60c95460405163baef73e960e01b8152600481018390526001600160a01b039091169063baef73e990602401602060405180830381865afa158015610bae573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd291906148b1565b6001600160401b0316600003610bfa5760405162461bcd60e51b81526004016109bc906148ce565b60c954604051637eee288d60e01b8152306004820152602481018390526001600160a01b0390911690637eee288d90604401600060405180830381600087803b158015610c4657600080fd5b505af1158015610c5a573d6000803e3d6000fd5b5050505050565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250610ca493508592508491506124f3565b610cac610e72565b15610cc95760405162461bcd60e51b81526004016109bc90614911565b6060610b35610cd66124e4565b610ce988610ce489896126ca565b6126f6565b838460006001612807565b600082815260976020526040902060010154610d0f81612d5b565b610d198383612d6c565b505050565b610d26612df3565b610d2f81612e6c565b50565b610d3a6124e4565b6001600160a01b0316816001600160a01b031614610db25760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016109bc565b610dbc8282612e84565b5050565b610dc8612df3565b610dd0612f09565b565b610dda612df3565b6001600160a01b038116610ded57600080fd5b60405147906001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610e25573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905260008183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a15050565b6000805160206150538339815191525460ff1690565b610e92868861493b565b8051600203610ec757610ea66107536124e4565b610ec25760405162461bcd60e51b81526004016109bc90614a05565b61100c565b6000610ed282612fb1565b60c9549092506001600160a01b0316905063430c2081610ef06124e4565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610f3b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f5f9190614a49565b80610fee575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610fb8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fdc9190614a49565b8015610fee5750610fee6107536124e4565b61100a5760405162461bcd60e51b81526004016109bc90614a66565b505b611016878961493b565b600060028251101561103a5760405162461bcd60e51b81526004016109bc90614ab5565b61108f61106e600084600186516110519190614b10565b8151811061106157611061614b23565b6020026020010151612fec565b8360008151811061108157611081614b23565b6020026020010151836124f3565b611097610e72565b156110b45760405162461bcd60e51b81526004016109bc90614911565b6110de8b6110c28b8d61493b565b6110cc8a8c61493b565b6110d6898b61493b565b600089612807565b505050505050505050505050565b6110f6878961493b565b805160020361112b5761110a6107536124e4565b6111265760405162461bcd60e51b81526004016109bc90614a05565b611270565b600061113682612fb1565b60c9549092506001600160a01b0316905063430c20816111546124e4565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa15801561119f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111c39190614a49565b80611252575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa15801561121c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112409190614a49565b801561125257506112526107536124e4565b61126e5760405162461bcd60e51b81526004016109bc90614a66565b505b61127a888a61493b565b8360028251101561129d5760405162461bcd60e51b81526004016109bc90614ab5565b6112b461106e600084600186516110519190614b10565b6112bc610e72565b156112d95760405162461bcd60e51b81526004016109bc90614911565b60028a146112f95760405162461bcd60e51b81526004016109bc90614b39565b6113228c6113078c8e61493b565b6113118b8d61493b565b61131b8a8c61493b565b8989612807565b50505050505050505050505050565b611339612df3565b60005b8151811015610dbc5761136782828151811061135a5761135a614b23565b6020026020010151612e6c565b8061137181614b7f565b91505061133c565b6113846107536124e4565b6113a05760405162461bcd60e51b81526004016109bc9061487c565b6001600160a01b0381166113f65760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016109bc565b6113ff816130a0565b6114076115e5565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610dbc573d6000803e3d6000fd5b611444612df3565b610dd060006130b8565b611456612df3565b60005b8151811015610dbc5761148482828151811061147757611477614b23565b60200260200101516130a0565b8061148e81614b7f565b915050611459565b6114a16107536124e4565b6114bd5760405162461bcd60e51b81526004016109bc9061487c565b6001600160a01b0381166113ff5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016109bc565b61151b612df3565b610dd061310a565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525061156693508592508491506124f3565b61156e610e72565b1561158b5760405162461bcd60e51b81526004016109bc90614911565b606061159f87610ce988610ce489896126ca565b5050505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6115dc612df3565b610d2f816130a0565b610dd06000805160206150738339815191526103fe6124e4565b611607612df3565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906116399085908590600401614b98565b600060405180830381600087803b15801561165357600080fd5b505af1158015611667573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610dbc90505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906116b09085908590600401614b98565b600060405180830381600087803b1580156116ca57600080fd5b505af11580156116de573d6000803e3d6000fd5b505050505050565b6116ee612df3565b610d1983838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250859250613172915050565b600061098f600080516020615073833981519152836115a9565b6117546107536124e4565b6117705760405162461bcd60e51b81526004016109bc9061487c565b60c9546040516000916001600160a01b0316906117939085908590602401614bc7565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b179052516117c89190614c00565b6000604051808303816000865af19150503d8060008114611805576040519150601f19603f3d011682016040523d82523d6000602084013e61180a565b606091505b5050905080610d195760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b60448201526064016109bc565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526000906118a8906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b6118ba612df3565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b6118e4612df3565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b600054610100900460ff16158080156119415750600054600160ff909116105b8061195b5750303b15801561195b575060005460ff166001145b6119be5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016109bc565b6000805460ff1916600117905580156119e1576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce8054909116918516919091179055611a3f613292565b611a476132c9565b611a5082613302565b611a58613329565b6040805161036081018252600661032082018181526563727970746f60d01b610340840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752828152621e9a5b60ea1b8185015261010086015285518087018752908152663837b63cb3b7b760c91b8184015261012085015284518086018652600b81526a756e73746f707061626c6560a81b81840152610140850152845180860186528381526535b632bb32b960d11b8184015261016085015284518086018652600280825261686960f01b8285015261018086019190915285518087018752848152656b726573757360d01b818501526101a086015285518087018752600580825264616e696d6560d81b828601526101c087019190915286518088018852818152646d616e676160d81b818601526101e087015286518088018852600981526862696e616e6365757360b81b8186015261020087015286518088018852818152647265616c6d60d81b818601526102208701528651808801885291825261676f60f01b82850152610240860191909152855180870187526008815267185b1d1a5b5a5cdd60c21b818501526102608601528551808701875290815264707564677960d81b81840152610280850152845180860186528381526530bab9ba34b760d11b818401526102a08501528451808601865292835265189a5d19d95d60d21b838301526102c08401929092528351808501855291825262706f6760e81b828201526102e083019190915282518084019093526004835263636c617960e01b9083015261030081019190915260005b6019811015611da257611d90828260198110611d8457611d84614b23565b60200201516000613172565b80611d9a81614b7f565b915050611d66565b50611dc960405180604001604052806003815260200162636f6d60e81b8152506001613172565b508015610b35576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250611e5b93508592508491506124f3565b611e63610e72565b15611e805760405162461bcd60e51b81526004016109bc90614911565b611eaf8a611e928b610ce48c8c6126ca565b611e9c888a61493b565b611ea6878961493b565b60006001612807565b5050505050505050505050565b611ec4612df3565b60005b81811015610d195760c9546001600160a01b03166350960239848484818110611ef257611ef2614b23565b9050602002016020810190611f07919061407a565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b158015611f4857600080fd5b505af1158015611f5c573d6000803e3d6000fd5b505050508080611f6b90614b7f565b915050611ec7565b600082815260976020526040902060010154611f8e81612d5b565b610d198383612e84565b611fa2898b61493b565b6000600282511015611fc65760405162461bcd60e51b81526004016109bc90614ab5565b611fdd61106e600084600186516110519190614b10565b611fe5610e72565b156120025760405162461bcd60e51b81526004016109bc90614911565b60028b146120225760405162461bcd60e51b81526004016109bc90614b39565b6120688d8d8d898960008a8a8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061336992505050565b843410156120b85760405162461bcd60e51b815260206004820181905260248201527f4d696e74696e674d616e616765723a204e4f545f454e4f5547485f46554e445360448201526064016109bc565b6120ca8d8d8d8d8d8d8d8c6000613529565b84341115611322576120da6124e4565b6001600160a01b03166108fc6120f08734614b10565b6040518115909202916000818181858888f19350505050158015612118573d6000803e3d6000fd5b5050505050505050505050505050565b612130612df3565b612139816135e5565b6121555760405162461bcd60e51b81526004016109bc90614c1c565b600081815260cd6020526040812061216c91613ebc565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b6121a2612df3565b6121ab8161360b565b610d2f600082613681565b6121c08a8c61493b565b60006002825110156121e45760405162461bcd60e51b81526004016109bc90614ab5565b6121fb61106e600084600186516110519190614b10565b612203610e72565b156122205760405162461bcd60e51b81526004016109bc90614911565b60028c146122405760405162461bcd60e51b81526004016109bc90614b39565b6122858e8e8e8a898b8a8a8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061336992505050565b856001600160a01b03166323b872dd61229c6124e4565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018890526064016020604051808303816000875af11580156122ef573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123139190614a49565b6123575760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b60448201526064016109bc565b6121188e8e8e8e8e8e8e8c8e613529565b612370612df3565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa1580156123b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123db9190614c5e565b60405163a9059cbb60e01b81526001600160a01b038481166004830152602482018390529192509084169063a9059cbb906044016020604051808303816000875af115801561242e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124529190614a49565b6124965760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b60448201526064016109bc565b604080516001600160a01b0384811682526020820184905285168183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a1505050565b60006124ee61368b565b905090565b6124fc836135e5565b6125185760405162461bcd60e51b81526004016109bc90614c1c565b600083815260cf602052604090205460ff1615156001600160401b0382161515146125945760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544c445f455850495241424c455f4d496044820152650a69a82a886960d31b60648201526084016109bc565b60006125c78360408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a8160000151111561266f576125f26125e6826000600a6136d1565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b80361266f5760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b60648201526084016109bc565b61267883613710565b6126c45760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c494400000060448201526064016109bc565b50505050565b606082826040516020016126df929190614c77565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081612710579050509050828160008151811061273b5761273b614b23565b602002602001018190525060cd6000858152602001908152602001600020805461276490614c9f565b80601f016020809104026020016040519081016040528092919081815260200182805461279090614c9f565b80156127dd5780601f106127b2576101008083540402835291602001916127dd565b820191906000526020600020905b8154815290600101906020018083116127c057829003601f168201915b5050505050816001815181106127f5576127f5614b23565b60209081029190910101529392505050565b600080600061281588612fb1565b91509150838015612827575060028851115b80156128a9575060c9546040516331a9108f60e11b8152600481018390526001600160a01b038b8116921690636352211e90602401602060405180830381865afa158015612879573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061289d9190614cd9565b6001600160a01b031614155b156129095760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b60648201526084016109bc565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015612952573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129769190614a49565b8015612a67575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa1580156129c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129ea9190614cd9565b6001600160a01b03161480612a67575060c95460405163d9548e5360e01b8152600481018490526001600160a01b039091169063d9548e5390602401602060405180830381865afa158015612a43573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a679190614a49565b15612b58576001600160401b03851615612ae95760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b158015612ad057600080fd5b505af1158015612ae4573d6000803e3d6000fd5b505050505b60c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690612b21908c908c908c908c908b90600401614d4b565b600060405180830381600087803b158015612b3b57600080fd5b505af1158015612b4f573d6000803e3d6000fd5b50505050612d4f565b612b6182613874565b612b6a886138d3565b8015612b77575087516002145b8015612b8a57506001600160401b038516155b15612c685760ca5488516001600160a01b039091169063c36c2125908b908b90600090612bb957612bb9614b23565b602090810291909101015160cc546040516001600160e01b031960e086901b168152612bf39392916001600160a01b031690600401614daa565b600060405180830381600087803b158015612c0d57600080fd5b505af1158015612c21573d6000803e3d6000fd5b50505050600087511115612c635760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490612b21908a908a908790600401614ddf565b612d4f565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790612ca0908c908c908c908c908b90600401614d4b565b600060405180830381600087803b158015612cba57600080fd5b505af1158015612cce573d6000803e3d6000fd5b505050506001600160401b03851615612d4f5760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b158015612d3657600080fd5b505af1158015612d4a573d6000803e3d6000fd5b505050505b50979650505050505050565b610d2f81612d676124e4565b61392d565b612d7682826115a9565b610dbc5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612daf6124e4565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612dfb6124e4565b6001600160a01b0316612e166033546001600160a01b031690565b6001600160a01b031614610dd05760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016109bc565b610d2f60008051602061507383398151915282611f73565b612e8e82826115a9565b15610dbc5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612ec56124e4565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b612f11610e72565b612f545760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b60448201526064016109bc565b600080516020615053833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa612f946124e4565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b8015612fe657829150612fd28285611051600185614b10565b925080612fde81614e15565b915050612fb9565b50915091565b6000815160000361303f5760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d505459000000000060448201526064016109bc565b82826040516020016130519190614c00565b60405160208183030381529060405280519060200120604051602001613081929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610d2f60008051602061507383398151915282613681565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b613112610e72565b1561312f5760405162461bcd60e51b81526004016109bc90614911565b600080516020615053833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612f946124e4565b600061317f600084612fec565b600081815260cd6020526040902090915061319a8482614e72565b50600081815260cf602052604090819020805460ff19168415151790555181907f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980906131e79086906144c2565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015613238573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061325c9190614a49565b610d195760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c6090610b079084908790600401614f31565b600054610100900460ff166132b95760405162461bcd60e51b81526004016109bc90614f52565b610dd06132c46124e4565b6130b8565b600054610100900460ff166132f05760405162461bcd60e51b81526004016109bc90614f52565b610dd060006132fd6124e4565b613681565b600054610100900460ff166118e45760405162461bcd60e51b81526004016109bc90614f52565b600054610100900460ff166133505760405162461bcd60e51b81526004016109bc90614f52565b600080516020615053833981519152805460ff19169055565b600061337d613378878961493b565b612fb1565b506040516bffffffffffffffffffffffff1930606090811b821660208401524660348401528b811b82166054840152606883018490526001600160c01b031960c08a901b1660888401526090830188905286901b1660b08201529091506000906134599084906134539060c401604051602081830303815290604052805190602001206040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b90613991565b90506134648161172f565b6134bc5760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a205349474e45525f49535f4e4f545f4d49604482015263272a22a960e11b60648201526084016109bc565b42866001600160401b03161161351e5760405162461bcd60e51b815260206004820152602160248201527f4d696e74696e674d616e616765723a20455850495245445f5349474e415455526044820152604560f81b60648201526084016109bc565b505050505050505050565b60006135708a6135398a8c61493b565b613543898b61493b565b61354d888a61493b565b60008f6001600160a01b03166135616124e4565b6001600160a01b031614612807565b9050896001600160a01b03166135846124e4565b6001600160a01b0316827fa545b6fd3355e8d57f8c8147bafe740545bd3ea1f94bef2576a6d532a7c3b60586866040516135d19291909182526001600160a01b0316602082015260400190565b60405180910390a450505050505050505050565b600081815260cd60205260408120805482919061360190614c9f565b9050119050919050565b613613612df3565b6001600160a01b0381166136785760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016109bc565b610d2f816130b8565b610dbc8282612d6c565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b031633036136cc575060331936013560601c90565b503390565b604080518082019091526000808252602082015260405180604001604052808381526020018486602001516137069190614f9d565b9052949350505050565b6000815160000361372357506000919050565b60208201805160f81c60308110801590613741575060398160ff1611155b158015613763575060618160ff16101580156137615750607a8160ff1611155b155b15613772575060009392505050565b835160018111156137e0576137948361378c600184614b10565b015160f81c90565b915060308260ff16101580156137ae575060398260ff1611155b1580156137d0575060618260ff16101580156137ce5750607a8260ff1611155b155b156137e057506000949350505050565b60015b6137ee600183614b10565b811015613868578381015160f81c9250602d8314801590613824575060308360ff1610158015613822575060398360ff1611155b155b8015613845575060618360ff16101580156138435750607a8360ff1611155b155b156138565750600095945050505050565b8061386081614b7f565b9150506137e3565b50600195945050505050565b61387d81611854565b156138ca5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b454400000060448201526064016109bc565b610d2f816139b5565b6000806138ea600084600186516110519190614b10565b60ca549091506001600160a01b0316158015906139265750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b61393782826115a9565b610dbc5761394f816001600160a01b03166014613a39565b61395a836020613a39565b60405160200161396b929190614fb0565b60408051601f198184030181529082905262461bcd60e51b82526109bc916004016144c2565b60008060006139a08585613bd4565b915091506139ad81613c19565b509392505050565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526001906139f49060600161188f565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b60606000613a48836002615025565b613a53906002614f9d565b6001600160401b03811115613a6a57613a6a614279565b6040519080825280601f01601f191660200182016040528015613a94576020820181803683370190505b509050600360fc1b81600081518110613aaf57613aaf614b23565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110613ade57613ade614b23565b60200101906001600160f81b031916908160001a9053506000613b02846002615025565b613b0d906001614f9d565b90505b6001811115613b85576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110613b4157613b41614b23565b1a60f81b828281518110613b5757613b57614b23565b60200101906001600160f81b031916908160001a90535060049490941c93613b7e81614e15565b9050613b10565b5083156139265760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016109bc565b6000808251604103613c0a5760208301516040840151606085015160001a613bfe87828585613dcf565b94509450505050613c12565b506000905060025b9250929050565b6000816004811115613c2d57613c2d61503c565b03613c355750565b6001816004811115613c4957613c4961503c565b03613c965760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016109bc565b6002816004811115613caa57613caa61503c565b03613cf75760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016109bc565b6003816004811115613d0b57613d0b61503c565b03613d635760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016109bc565b6004816004811115613d7757613d7761503c565b03610d2f5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b60648201526084016109bc565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613e065750600090506003613eb3565b8460ff16601b14158015613e1e57508460ff16601c14155b15613e2f5750600090506004613eb3565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613e83573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613eac57600060019250925050613eb3565b9150600090505b94509492505050565b508054613ec890614c9f565b6000825580601f10613ed8575050565b601f016020900490600052602060002090810190610d2f91905b80821115613f065760008155600101613ef2565b5090565b600060208284031215613f1c57600080fd5b81356001600160e01b03198116811461392657600080fd5b6001600160401b0381168114610d2f57600080fd5b8035613f5481613f34565b919050565b60008060408385031215613f6c57600080fd5b8235613f7781613f34565b946020939093013593505050565b600060208284031215613f9757600080fd5b5035919050565b60008083601f840112613fb057600080fd5b5081356001600160401b03811115613fc757600080fd5b602083019150836020828501011115613c1257600080fd5b600080600060408486031215613ff457600080fd5b8335925060208401356001600160401b0381111561401157600080fd5b61401d86828701613f9e565b9497909650939450505050565b6001600160a01b0381168114610d2f57600080fd5b8035613f548161402a565b6000806040838503121561405d57600080fd5b82359150602083013561406f8161402a565b809150509250929050565b60006020828403121561408c57600080fd5b81356139268161402a565b60008083601f8401126140a957600080fd5b5081356001600160401b038111156140c057600080fd5b6020830191508360208260051b8501011115613c1257600080fd5b8015158114610d2f57600080fd5b60008060008060008060008060a0898b03121561410557600080fd5b88356141108161402a565b975060208901356001600160401b038082111561412c57600080fd5b6141388c838d01614097565b909950975060408b013591508082111561415157600080fd5b61415d8c838d01614097565b909750955060608b013591508082111561417657600080fd5b506141838b828c01614097565b9094509250506080890135614197816140db565b809150509295985092959890939650565b600080600080600080600080600060c08a8c0312156141c657600080fd5b89356141d18161402a565b985060208a01356001600160401b03808211156141ed57600080fd5b6141f98d838e01614097565b909a50985060408c013591508082111561421257600080fd5b61421e8d838e01614097565b909850965060608c013591508082111561423757600080fd5b506142448c828d01614097565b90955093505060808a013561425881613f34565b915060a08a0135614268816140db565b809150509295985092959850929598565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b03811182821017156142b7576142b7614279565b604052919050565b60006001600160401b038211156142d8576142d8614279565b5060051b60200190565b600060208083850312156142f557600080fd5b82356001600160401b0381111561430b57600080fd5b8301601f8101851361431c57600080fd5b803561432f61432a826142bf565b61428f565b81815260059190911b8201830190838101908783111561434e57600080fd5b928401925b828410156143755783356143668161402a565b82529284019290840190614353565b979650505050505050565b6000806000806060858703121561439657600080fd5b84356143a18161402a565b93506020850135925060408501356001600160401b038111156143c357600080fd5b6143cf87828801613f9e565b95989497509550505050565b600080602083850312156143ee57600080fd5b82356001600160401b0381111561440457600080fd5b61441085828601613f9e565b90969095509350505050565b60008060006040848603121561443157600080fd5b83356001600160401b0381111561444757600080fd5b61445386828701613f9e565b9094509250506020840135614467816140db565b809150509250925092565b60005b8381101561448d578181015183820152602001614475565b50506000910152565b600081518084526144ae816020860160208601614472565b601f01601f19169290920160200192915050565b6020815260006139266020830184614496565b600080602083850312156144e857600080fd5b82356001600160401b038111156144fe57600080fd5b61441085828601614097565b60008060008060008060c0878903121561452357600080fd5b863561452e8161402a565b9550602087013561453e8161402a565b9450604087013561454e8161402a565b9350606087013561455e8161402a565b9250608087013561456e8161402a565b915060a087013561457e8161402a565b809150509295509295509295565b60008060008060008060008060a0898b0312156145a857600080fd5b88356145b38161402a565b97506020890135965060408901356001600160401b03808211156145d657600080fd5b6145e28c838d01613f9e565b909850965060608b01359150808211156145fb57600080fd5b6146078c838d01614097565b909650945060808b013591508082111561462057600080fd5b5061462d8b828c01614097565b999c989b5096995094979396929594505050565b600080600080600080600080600080600060e08c8e03121561466257600080fd5b61466b8c61403f565b9a506001600160401b038060208e0135111561468657600080fd5b6146968e60208f01358f01614097565b909b50995060408d01358110156146ac57600080fd5b6146bc8e60408f01358f01614097565b909950975060608d01358110156146d257600080fd5b6146e28e60608f01358f01614097565b90975095506146f360808e01613f49565b945060a08d013593508060c08e0135111561470d57600080fd5b5061471e8d60c08e01358e01613f9e565b81935080925050509295989b509295989b9093969950565b6000806000806000806000806000806000806101008d8f03121561475957600080fd5b6147628d61403f565b9b506001600160401b0360208e0135111561477c57600080fd5b61478c8e60208f01358f01614097565b909b5099506001600160401b0360408e013511156147a957600080fd5b6147b98e60408f01358f01614097565b90995097506001600160401b0360608e013511156147d657600080fd5b6147e68e60608f01358f01614097565b90975095506147f760808e01613f49565b945061480560a08e0161403f565b935060c08d013592506001600160401b0360e08e0135111561482657600080fd5b6148368e60e08f01358f01613f9e565b81935080925050509295989b509295989b509295989b565b6000806040838503121561486157600080fd5b823561486c8161402a565b9150602083013561406f8161402a565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b6000602082840312156148c357600080fd5b815161392681613f34565b60208082526023908201527f4d696e74696e674d616e616765723a20544f4b454e5f4e4f545f455850495241604082015262424c4560e81b606082015260800190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b600061494961432a846142bf565b80848252602080830192508560051b85013681111561496757600080fd5b855b818110156149f95780356001600160401b03808211156149895760008081fd5b90880190601f368184011261499e5760008081fd5b8235828111156149b0576149b0614279565b6149c1818301601f1916880161428f565b925080835236878286010111156149da57600091508182fd5b8087850188850137600090830187015250865250938201938201614969565b50919695505050505050565b60208082526024908201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604082015263272a22a960e11b606082015260800190565b600060208284031215614a5b57600080fd5b8151613926816140db565b6020808252602f908201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060408201526e282927ab22a22fa7a92fa7aba722a960891b606082015260800190565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b8181038181111561098f5761098f614afa565b634e487b7160e01b600052603260045260246000fd5b60208082526026908201527f4d696e74696e674d616e616765723a20535542444f4d41494e535f4e4f545f41604082015265131313d5d15160d21b606082015260800190565b600060018201614b9157614b91614afa565b5060010190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b6020808252810182905260006001600160fb1b03831115614be757600080fd5b8260051b80856040850137919091016040019392505050565b60008251614c12818460208701614472565b9190910192915050565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b600060208284031215614c7057600080fd5b5051919050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c90821680614cb357607f821691505b602082108103614cd357634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215614ceb57600080fd5b81516139268161402a565b600081518084526020808501808196508360051b8101915082860160005b85811015614d3e578284038952614d2c848351614496565b98850198935090840190600101614d14565b5091979650505050505050565b6001600160a01b038616815260a060208201819052600090614d6f90830187614cf6565b8281036040840152614d818187614cf6565b90508281036060840152614d958186614cf6565b91505082151560808301529695505050505050565b600060018060a01b03808616835260606020840152614dcc6060840186614496565b9150808416604084015250949350505050565b606081526000614df26060830186614cf6565b8281036020840152614e048186614cf6565b915050826040830152949350505050565b600081614e2457614e24614afa565b506000190190565b601f821115610d1957600081815260208120601f850160051c81016020861015614e535750805b601f850160051c820191505b818110156116de57828155600101614e5f565b81516001600160401b03811115614e8b57614e8b614279565b614e9f81614e998454614c9f565b84614e2c565b602080601f831160018114614ed45760008415614ebc5750858301515b600019600386901b1c1916600185901b1785556116de565b600085815260208120601f198616915b82811015614f0357888601518255948401946001909101908401614ee4565b5085821015614f215787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b828152604060208201526000614f4a6040830184614496565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b8082018082111561098f5761098f614afa565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351614fe8816017850160208801614472565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351615019816028840160208801614472565b01602801949350505050565b808202811582820484141761098f5761098f614afa565b634e487b7160e01b600052602160045260246000fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
exports.MintingManagerMock__factory = MintingManagerMock__factory;
MintingManagerMock__factory.bytecode = _bytecode;
MintingManagerMock__factory.abi = _abi;
