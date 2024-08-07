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
const _bytecode = "0x608060405234801561001057600080fd5b50614d2d806100206000396000f3fe6080604052600436106102c95760003560e01c806391d1485411610175578063b9998a24116100dc578063d547741f11610095578063f2fde38b1161006f578063f2fde38b146108cd578063f5243bc4146108ed578063f940e3851461090d578063ffa1ad741461092d57600080fd5b8063d547741f1461087a578063d7db74c71461089a578063ec527389146108ad57600080fd5b8063b9998a24146107b8578063cc2a9a5b146107d8578063cc2c3fc4146107f8578063ceeb4f5014610818578063d1f5692c14610838578063d53913931461085857600080fd5b8063a3f4df7e1161012e578063a3f4df7e146106cb578063a849d65c14610718578063aa271e1a14610738578063ae31844a14610758578063b0aa98c714610778578063b3ab15fb1461079857600080fd5b806391d1485414610621578063983b2d5614610641578063986502751461066157806399e0dd7c14610676578063a217fddf14610696578063a3a3f7f6146106ab57600080fd5b80635b6fa8db11610234578063715018a6116101ed57806381c81d35116101c757806381c81d35146105bb5780638456cb59146105ce5780638da5cb5b146105e3578063906cecc11461060157600080fd5b8063715018a61461056657806371e2a6571461057b57806377a2a5891461059b57600080fd5b80635b6fa8db146104be5780635c975abb146104de5780635cd7e3b3146104f35780635e22cd86146105135780635fc1964f14610533578063634486da1461055357600080fd5b80633092afd5116102865780633092afd5146103c357806336568abe146103e35780633f41b614146104035780633f4ba83a1461043b57806351cff8d914610450578063572b6c051461047057600080fd5b806301ffc9a7146102ce5780631edb948e1461030357806320c5429b14610325578063248a9ca314610345578063268b15ed146103835780632f2ff15d146103a3575b600080fd5b3480156102da57600080fd5b506102ee6102e9366004613b98565b61095e565b60405190151581526020015b60405180910390f35b34801561030f57600080fd5b5061032361031e366004613be7565b610995565b005b34801561033157600080fd5b50610323610340366004613c13565b610b3e565b34801561035157600080fd5b50610375610360366004613c13565b60009081526097602052604090206001015490565b6040519081526020016102fa565b34801561038f57600080fd5b5061032361039e366004613c6d565b610c61565b3480156103af57600080fd5b506103236103be366004613cd8565b610cf4565b3480156103cf57600080fd5b506103236103de366004613d08565b610d1e565b3480156103ef57600080fd5b506103236103fe366004613cd8565b610d32565b34801561040f57600080fd5b5060c954610423906001600160a01b031681565b6040516001600160a01b0390911681526020016102fa565b34801561044757600080fd5b50610323610dc0565b34801561045c57600080fd5b5061032361046b366004613d08565b610dd2565b34801561047c57600080fd5b506102ee61048b366004613d08565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b3480156104ca57600080fd5b5060cc54610423906001600160a01b031681565b3480156104ea57600080fd5b506102ee610e72565b3480156104ff57600080fd5b5061032361050e366004613d77565b610e88565b34801561051f57600080fd5b5061032361052e366004613e36565b6110ec565b34801561053f57600080fd5b5061032361054e366004613f70565b611331565b610323610561366004613d08565b611379565b34801561057257600080fd5b5061032361143c565b34801561058757600080fd5b50610323610596366004613f70565b61144e565b3480156105a757600080fd5b5060ce54610423906001600160a01b031681565b6103236105c9366004613d08565b611496565b3480156105da57600080fd5b50610323611513565b3480156105ef57600080fd5b506033546001600160a01b0316610423565b34801561060d57600080fd5b5061032361061c36600461400e565b611523565b34801561062d57600080fd5b506102ee61063c366004613cd8565b6115a9565b34801561064d57600080fd5b5061032361065c366004613d08565b6115d4565b34801561066d57600080fd5b506103236115e5565b34801561068257600080fd5b50610323610691366004614069565b6115ff565b3480156106a257600080fd5b50610375600081565b3480156106b757600080fd5b506103236106c63660046140aa565b6116e6565b3480156106d757600080fd5b5061070b604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102fa9190614150565b34801561072457600080fd5b5060cb54610423906001600160a01b031681565b34801561074457600080fd5b506102ee610753366004613d08565b61172f565b34801561076457600080fd5b50610323610773366004614163565b611749565b34801561078457600080fd5b506102ee610793366004613c13565b611854565b3480156107a457600080fd5b506103236107b3366004613d08565b6118b2565b3480156107c457600080fd5b506103236107d3366004613d08565b6118dc565b3480156107e457600080fd5b506103236107f3366004614198565b611921565b34801561080457600080fd5b5060ca54610423906001600160a01b031681565b34801561082457600080fd5b5061032361083336600461421a565b611aa6565b34801561084457600080fd5b50610323610853366004614163565b611b4a565b34801561086457600080fd5b50610375600080516020614d0183398151915281565b34801561088657600080fd5b50610323610895366004613cd8565b611c01565b6103236108a83660046142cf565b611c26565b3480156108b957600080fd5b506103236108c8366004613c13565b611db6565b3480156108d957600080fd5b506103236108e8366004613d08565b611e28565b3480156108f957600080fd5b506103236109083660046143c4565b611e44565b34801561091957600080fd5b506103236109283660046144dc565b611ff6565b34801561093957600080fd5b5061070b60405180604001604052806005815260200164302e352e3160d81b81525081565b60006001600160e01b03198216637965db0b60e01b148061098f57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6109a0610753612172565b6109c55760405162461bcd60e51b81526004016109bc9061450a565b60405180910390fd5b60c95460405163baef73e960e01b8152600481018390526000916001600160a01b03169063baef73e990602401602060405180830381865afa158015610a0f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a33919061453f565b9050806001600160401b0316600003610a5e5760405162461bcd60e51b81526004016109bc9061455c565b806001600160401b0316836001600160401b031611610acb5760405162461bcd60e51b815260206004820152602360248201527f4d696e74696e674d616e616765723a204558504952595f4e4f545f455854454e60448201526211115160ea1b60648201526084016109bc565b60c954604051631fb9763760e11b81526001600160401b0385166004820152602481018490526001600160a01b0390911690633f72ec6e906044015b600060405180830381600087803b158015610b2157600080fd5b505af1158015610b35573d6000803e3d6000fd5b50505050505050565b610b49610753612172565b610b655760405162461bcd60e51b81526004016109bc9061450a565b60c95460405163baef73e960e01b8152600481018390526001600160a01b039091169063baef73e990602401602060405180830381865afa158015610bae573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd2919061453f565b6001600160401b0316600003610bfa5760405162461bcd60e51b81526004016109bc9061455c565b60c954604051637eee288d60e01b8152306004820152602481018390526001600160a01b0390911690637eee288d90604401600060405180830381600087803b158015610c4657600080fd5b505af1158015610c5a573d6000803e3d6000fd5b5050505050565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250610ca49350859250849150612181565b610cac610e72565b15610cc95760405162461bcd60e51b81526004016109bc9061459f565b6060610b35610cd6612172565b610ce988610ce48989612358565b612384565b838460006001612495565b600082815260976020526040902060010154610d0f816129e9565b610d1983836129fa565b505050565b610d26612a81565b610d2f81612afa565b50565b610d3a612172565b6001600160a01b0316816001600160a01b031614610db25760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016109bc565b610dbc8282612b12565b5050565b610dc8612a81565b610dd0612b97565b565b610dda612a81565b6001600160a01b038116610ded57600080fd5b60405147906001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610e25573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905260008183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a15050565b600080516020614ce18339815191525460ff1690565b610e9286886145c9565b8051600203610ec757610ea6610753612172565b610ec25760405162461bcd60e51b81526004016109bc90614693565b61100c565b6000610ed282612c3f565b60c9549092506001600160a01b0316905063430c2081610ef0612172565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610f3b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f5f91906146d7565b80610fee575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610fb8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fdc91906146d7565b8015610fee5750610fee610753612172565b61100a5760405162461bcd60e51b81526004016109bc906146f4565b505b61101687896145c9565b600060028251101561103a5760405162461bcd60e51b81526004016109bc90614743565b61108f61106e60008460018651611051919061479e565b81518110611061576110616147b1565b6020026020010151612c7a565b83600081518110611081576110816147b1565b602002602001015183612181565b611097610e72565b156110b45760405162461bcd60e51b81526004016109bc9061459f565b6110de8b6110c28b8d6145c9565b6110cc8a8c6145c9565b6110d6898b6145c9565b600089612495565b505050505050505050505050565b6110f687896145c9565b805160020361112b5761110a610753612172565b6111265760405162461bcd60e51b81526004016109bc90614693565b611270565b600061113682612c3f565b60c9549092506001600160a01b0316905063430c2081611154612172565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa15801561119f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111c391906146d7565b80611252575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa15801561121c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061124091906146d7565b80156112525750611252610753612172565b61126e5760405162461bcd60e51b81526004016109bc906146f4565b505b61127a888a6145c9565b8360028251101561129d5760405162461bcd60e51b81526004016109bc90614743565b6112b461106e60008460018651611051919061479e565b6112bc610e72565b156112d95760405162461bcd60e51b81526004016109bc9061459f565b60028a146112f95760405162461bcd60e51b81526004016109bc906147c7565b6113228c6113078c8e6145c9565b6113118b8d6145c9565b61131b8a8c6145c9565b8989612495565b50505050505050505050505050565b611339612a81565b60005b8151811015610dbc5761136782828151811061135a5761135a6147b1565b6020026020010151612afa565b806113718161480d565b91505061133c565b611384610753612172565b6113a05760405162461bcd60e51b81526004016109bc9061450a565b6001600160a01b0381166113f65760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016109bc565b6113ff81612d2e565b6114076115e5565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610dbc573d6000803e3d6000fd5b611444612a81565b610dd06000612d46565b611456612a81565b60005b8151811015610dbc57611484828281518110611477576114776147b1565b6020026020010151612d2e565b8061148e8161480d565b915050611459565b6114a1610753612172565b6114bd5760405162461bcd60e51b81526004016109bc9061450a565b6001600160a01b0381166113ff5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016109bc565b61151b612a81565b610dd0612d98565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052506115669350859250849150612181565b61156e610e72565b1561158b5760405162461bcd60e51b81526004016109bc9061459f565b606061159f87610ce988610ce48989612358565b5050505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6115dc612a81565b610d2f81612d2e565b610dd0600080516020614d018339815191526103fe612172565b611607612a81565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906116399085908590600401614826565b600060405180830381600087803b15801561165357600080fd5b505af1158015611667573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610dbc90505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906116b09085908590600401614826565b600060405180830381600087803b1580156116ca57600080fd5b505af11580156116de573d6000803e3d6000fd5b505050505050565b6116ee612a81565b610d1983838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250859250612e00915050565b600061098f600080516020614d01833981519152836115a9565b611754610753612172565b6117705760405162461bcd60e51b81526004016109bc9061450a565b60c9546040516000916001600160a01b0316906117939085908590602401614855565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b179052516117c8919061488e565b6000604051808303816000865af19150503d8060008114611805576040519150601f19603f3d011682016040523d82523d6000602084013e61180a565b606091505b5050905080610d195760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b60448201526064016109bc565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526000906118a8906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b6118ba612a81565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b6118e4612a81565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b600054610100900460ff16158080156119415750600054600160ff909116105b8061195b5750303b15801561195b575060005460ff166001145b6119be5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016109bc565b6000805460ff1916600117905580156119e1576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce8054909116918516919091179055611a3f612f20565b611a47612f57565b611a5082612f90565b611a58612fb7565b8015610b35576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250611ae99350859250849150612181565b611af1610e72565b15611b0e5760405162461bcd60e51b81526004016109bc9061459f565b611b3d8a611b208b610ce48c8c612358565b611b2a888a6145c9565b611b3487896145c9565b60006001612495565b5050505050505050505050565b611b52612a81565b60005b81811015610d195760c9546001600160a01b03166350960239848484818110611b8057611b806147b1565b9050602002016020810190611b959190613d08565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b158015611bd657600080fd5b505af1158015611bea573d6000803e3d6000fd5b505050508080611bf99061480d565b915050611b55565b600082815260976020526040902060010154611c1c816129e9565b610d198383612b12565b611c30898b6145c9565b6000600282511015611c545760405162461bcd60e51b81526004016109bc90614743565b611c6b61106e60008460018651611051919061479e565b611c73610e72565b15611c905760405162461bcd60e51b81526004016109bc9061459f565b60028b14611cb05760405162461bcd60e51b81526004016109bc906147c7565b611cf68d8d8d898960008a8a8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612ff792505050565b84341015611d465760405162461bcd60e51b815260206004820181905260248201527f4d696e74696e674d616e616765723a204e4f545f454e4f5547485f46554e445360448201526064016109bc565b611d588d8d8d8d8d8d8d8c60006131b7565b8434111561132257611d68612172565b6001600160a01b03166108fc611d7e873461479e565b6040518115909202916000818181858888f19350505050158015611da6573d6000803e3d6000fd5b5050505050505050505050505050565b611dbe612a81565b611dc781613273565b611de35760405162461bcd60e51b81526004016109bc906148aa565b600081815260cd60205260408120611dfa91613b4a565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611e30612a81565b611e3981613299565b610d2f60008261330f565b611e4e8a8c6145c9565b6000600282511015611e725760405162461bcd60e51b81526004016109bc90614743565b611e8961106e60008460018651611051919061479e565b611e91610e72565b15611eae5760405162461bcd60e51b81526004016109bc9061459f565b60028c14611ece5760405162461bcd60e51b81526004016109bc906147c7565b611f138e8e8e8a898b8a8a8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612ff792505050565b856001600160a01b03166323b872dd611f2a612172565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018890526064016020604051808303816000875af1158015611f7d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611fa191906146d7565b611fe55760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b60448201526064016109bc565b611da68e8e8e8e8e8e8e8c8e6131b7565b611ffe612a81565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa158015612045573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061206991906148ec565b60405163a9059cbb60e01b81526001600160a01b038481166004830152602482018390529192509084169063a9059cbb906044016020604051808303816000875af11580156120bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120e091906146d7565b6121245760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b60448201526064016109bc565b604080516001600160a01b0384811682526020820184905285168183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a1505050565b600061217c613319565b905090565b61218a83613273565b6121a65760405162461bcd60e51b81526004016109bc906148aa565b600083815260cf602052604090205460ff1615156001600160401b0382161515146122225760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544c445f455850495241424c455f4d496044820152650a69a82a886960d31b60648201526084016109bc565b60006122558360408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a816000015111156122fd57612280612274826000600a61335f565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8036122fd5760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b60648201526084016109bc565b6123068361339e565b6123525760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c494400000060448201526064016109bc565b50505050565b6060828260405160200161236d929190614905565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b606081526020019060019003908161239e57905050905082816000815181106123c9576123c96147b1565b602002602001018190525060cd600085815260200190815260200160002080546123f29061492d565b80601f016020809104026020016040519081016040528092919081815260200182805461241e9061492d565b801561246b5780601f106124405761010080835404028352916020019161246b565b820191906000526020600020905b81548152906001019060200180831161244e57829003601f168201915b505050505081600181518110612483576124836147b1565b60209081029190910101529392505050565b60008060006124a388612c3f565b915091508380156124b5575060028851115b8015612537575060c9546040516331a9108f60e11b8152600481018390526001600160a01b038b8116921690636352211e90602401602060405180830381865afa158015612507573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061252b9190614967565b6001600160a01b031614155b156125975760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b60648201526084016109bc565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa1580156125e0573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061260491906146d7565b80156126f5575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa158015612654573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906126789190614967565b6001600160a01b031614806126f5575060c95460405163d9548e5360e01b8152600481018490526001600160a01b039091169063d9548e5390602401602060405180830381865afa1580156126d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906126f591906146d7565b156127e6576001600160401b038516156127775760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b15801561275e57600080fd5b505af1158015612772573d6000803e3d6000fd5b505050505b60c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be06906127af908c908c908c908c908b906004016149d9565b600060405180830381600087803b1580156127c957600080fd5b505af11580156127dd573d6000803e3d6000fd5b505050506129dd565b6127ef82613502565b6127f888613561565b8015612805575087516002145b801561281857506001600160401b038516155b156128f65760ca5488516001600160a01b039091169063c36c2125908b908b90600090612847576128476147b1565b602090810291909101015160cc546040516001600160e01b031960e086901b1681526128819392916001600160a01b031690600401614a38565b600060405180830381600087803b15801561289b57600080fd5b505af11580156128af573d6000803e3d6000fd5b505050506000875111156128f15760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae74906127af908a908a908790600401614a6d565b6129dd565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b79061292e908c908c908c908c908b906004016149d9565b600060405180830381600087803b15801561294857600080fd5b505af115801561295c573d6000803e3d6000fd5b505050506001600160401b038516156129dd5760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b1580156129c457600080fd5b505af11580156129d8573d6000803e3d6000fd5b505050505b50979650505050505050565b610d2f816129f5612172565b6135bb565b612a0482826115a9565b610dbc5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612a3d612172565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612a89612172565b6001600160a01b0316612aa46033546001600160a01b031690565b6001600160a01b031614610dd05760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016109bc565b610d2f600080516020614d0183398151915282611c01565b612b1c82826115a9565b15610dbc5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612b53612172565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b612b9f610e72565b612be25760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b60448201526064016109bc565b600080516020614ce1833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa612c22612172565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b8015612c7457829150612c60828561105160018561479e565b925080612c6c81614aa3565b915050612c47565b50915091565b60008151600003612ccd5760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d505459000000000060448201526064016109bc565b8282604051602001612cdf919061488e565b60405160208183030381529060405280519060200120604051602001612d0f929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610d2f600080516020614d018339815191528261330f565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b612da0610e72565b15612dbd5760405162461bcd60e51b81526004016109bc9061459f565b600080516020614ce1833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612c22612172565b6000612e0d600084612c7a565b600081815260cd60205260409020909150612e288482614b00565b50600081815260cf602052604090819020805460ff19168415151790555181907f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf898090612e75908690614150565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015612ec6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612eea91906146d7565b610d195760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c6090610b079084908790600401614bbf565b600054610100900460ff16612f475760405162461bcd60e51b81526004016109bc90614be0565b610dd0612f52612172565b612d46565b600054610100900460ff16612f7e5760405162461bcd60e51b81526004016109bc90614be0565b610dd06000612f8b612172565b61330f565b600054610100900460ff166118e45760405162461bcd60e51b81526004016109bc90614be0565b600054610100900460ff16612fde5760405162461bcd60e51b81526004016109bc90614be0565b600080516020614ce1833981519152805460ff19169055565b600061300b61300687896145c9565b612c3f565b506040516bffffffffffffffffffffffff1930606090811b821660208401524660348401528b811b82166054840152606883018490526001600160c01b031960c08a901b1660888401526090830188905286901b1660b08201529091506000906130e79084906130e19060c401604051602081830303815290604052805190602001206040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b9061361f565b90506130f28161172f565b61314a5760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a205349474e45525f49535f4e4f545f4d49604482015263272a22a960e11b60648201526084016109bc565b42866001600160401b0316116131ac5760405162461bcd60e51b815260206004820152602160248201527f4d696e74696e674d616e616765723a20455850495245445f5349474e415455526044820152604560f81b60648201526084016109bc565b505050505050505050565b60006131fe8a6131c78a8c6145c9565b6131d1898b6145c9565b6131db888a6145c9565b60008f6001600160a01b03166131ef612172565b6001600160a01b031614612495565b9050896001600160a01b0316613212612172565b6001600160a01b0316827fa545b6fd3355e8d57f8c8147bafe740545bd3ea1f94bef2576a6d532a7c3b605868660405161325f9291909182526001600160a01b0316602082015260400190565b60405180910390a450505050505050505050565b600081815260cd60205260408120805482919061328f9061492d565b9050119050919050565b6132a1612a81565b6001600160a01b0381166133065760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016109bc565b610d2f81612d46565b610dbc82826129fa565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b0316330361335a575060331936013560601c90565b503390565b604080518082019091526000808252602082015260405180604001604052808381526020018486602001516133949190614c2b565b9052949350505050565b600081516000036133b157506000919050565b60208201805160f81c603081108015906133cf575060398160ff1611155b1580156133f1575060618160ff16101580156133ef5750607a8160ff1611155b155b15613400575060009392505050565b8351600181111561346e576134228361341a60018461479e565b015160f81c90565b915060308260ff161015801561343c575060398260ff1611155b15801561345e575060618260ff161015801561345c5750607a8260ff1611155b155b1561346e57506000949350505050565b60015b61347c60018361479e565b8110156134f6578381015160f81c9250602d83148015906134b2575060308360ff16101580156134b0575060398360ff1611155b155b80156134d3575060618360ff16101580156134d15750607a8360ff1611155b155b156134e45750600095945050505050565b806134ee8161480d565b915050613471565b50600195945050505050565b61350b81611854565b156135585760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b454400000060448201526064016109bc565b610d2f81613643565b60008061357860008460018651611051919061479e565b60ca549091506001600160a01b0316158015906135b45750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6135c582826115a9565b610dbc576135dd816001600160a01b031660146136c7565b6135e88360206136c7565b6040516020016135f9929190614c3e565b60408051601f198184030181529082905262461bcd60e51b82526109bc91600401614150565b600080600061362e8585613862565b9150915061363b816138a7565b509392505050565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526001906136829060600161188f565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b606060006136d6836002614cb3565b6136e1906002614c2b565b6001600160401b038111156136f8576136f8613f07565b6040519080825280601f01601f191660200182016040528015613722576020820181803683370190505b509050600360fc1b8160008151811061373d5761373d6147b1565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061376c5761376c6147b1565b60200101906001600160f81b031916908160001a9053506000613790846002614cb3565b61379b906001614c2b565b90505b6001811115613813576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106137cf576137cf6147b1565b1a60f81b8282815181106137e5576137e56147b1565b60200101906001600160f81b031916908160001a90535060049490941c9361380c81614aa3565b905061379e565b5083156135b45760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016109bc565b60008082516041036138985760208301516040840151606085015160001a61388c87828585613a5d565b945094505050506138a0565b506000905060025b9250929050565b60008160048111156138bb576138bb614cca565b036138c35750565b60018160048111156138d7576138d7614cca565b036139245760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016109bc565b600281600481111561393857613938614cca565b036139855760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016109bc565b600381600481111561399957613999614cca565b036139f15760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016109bc565b6004816004811115613a0557613a05614cca565b03610d2f5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b60648201526084016109bc565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613a945750600090506003613b41565b8460ff16601b14158015613aac57508460ff16601c14155b15613abd5750600090506004613b41565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613b11573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613b3a57600060019250925050613b41565b9150600090505b94509492505050565b508054613b569061492d565b6000825580601f10613b66575050565b601f016020900490600052602060002090810190610d2f91905b80821115613b945760008155600101613b80565b5090565b600060208284031215613baa57600080fd5b81356001600160e01b0319811681146135b457600080fd5b6001600160401b0381168114610d2f57600080fd5b8035613be281613bc2565b919050565b60008060408385031215613bfa57600080fd5b8235613c0581613bc2565b946020939093013593505050565b600060208284031215613c2557600080fd5b5035919050565b60008083601f840112613c3e57600080fd5b5081356001600160401b03811115613c5557600080fd5b6020830191508360208285010111156138a057600080fd5b600080600060408486031215613c8257600080fd5b8335925060208401356001600160401b03811115613c9f57600080fd5b613cab86828701613c2c565b9497909650939450505050565b6001600160a01b0381168114610d2f57600080fd5b8035613be281613cb8565b60008060408385031215613ceb57600080fd5b823591506020830135613cfd81613cb8565b809150509250929050565b600060208284031215613d1a57600080fd5b81356135b481613cb8565b60008083601f840112613d3757600080fd5b5081356001600160401b03811115613d4e57600080fd5b6020830191508360208260051b85010111156138a057600080fd5b8015158114610d2f57600080fd5b60008060008060008060008060a0898b031215613d9357600080fd5b8835613d9e81613cb8565b975060208901356001600160401b0380821115613dba57600080fd5b613dc68c838d01613d25565b909950975060408b0135915080821115613ddf57600080fd5b613deb8c838d01613d25565b909750955060608b0135915080821115613e0457600080fd5b50613e118b828c01613d25565b9094509250506080890135613e2581613d69565b809150509295985092959890939650565b600080600080600080600080600060c08a8c031215613e5457600080fd5b8935613e5f81613cb8565b985060208a01356001600160401b0380821115613e7b57600080fd5b613e878d838e01613d25565b909a50985060408c0135915080821115613ea057600080fd5b613eac8d838e01613d25565b909850965060608c0135915080821115613ec557600080fd5b50613ed28c828d01613d25565b90955093505060808a0135613ee681613bc2565b915060a08a0135613ef681613d69565b809150509295985092959850929598565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715613f4557613f45613f07565b604052919050565b60006001600160401b03821115613f6657613f66613f07565b5060051b60200190565b60006020808385031215613f8357600080fd5b82356001600160401b03811115613f9957600080fd5b8301601f81018513613faa57600080fd5b8035613fbd613fb882613f4d565b613f1d565b81815260059190911b82018301908381019087831115613fdc57600080fd5b928401925b82841015614003578335613ff481613cb8565b82529284019290840190613fe1565b979650505050505050565b6000806000806060858703121561402457600080fd5b843561402f81613cb8565b93506020850135925060408501356001600160401b0381111561405157600080fd5b61405d87828801613c2c565b95989497509550505050565b6000806020838503121561407c57600080fd5b82356001600160401b0381111561409257600080fd5b61409e85828601613c2c565b90969095509350505050565b6000806000604084860312156140bf57600080fd5b83356001600160401b038111156140d557600080fd5b6140e186828701613c2c565b90945092505060208401356140f581613d69565b809150509250925092565b60005b8381101561411b578181015183820152602001614103565b50506000910152565b6000815180845261413c816020860160208601614100565b601f01601f19169290920160200192915050565b6020815260006135b46020830184614124565b6000806020838503121561417657600080fd5b82356001600160401b0381111561418c57600080fd5b61409e85828601613d25565b60008060008060008060c087890312156141b157600080fd5b86356141bc81613cb8565b955060208701356141cc81613cb8565b945060408701356141dc81613cb8565b935060608701356141ec81613cb8565b925060808701356141fc81613cb8565b915060a087013561420c81613cb8565b809150509295509295509295565b60008060008060008060008060a0898b03121561423657600080fd5b883561424181613cb8565b97506020890135965060408901356001600160401b038082111561426457600080fd5b6142708c838d01613c2c565b909850965060608b013591508082111561428957600080fd5b6142958c838d01613d25565b909650945060808b01359150808211156142ae57600080fd5b506142bb8b828c01613d25565b999c989b5096995094979396929594505050565b600080600080600080600080600080600060e08c8e0312156142f057600080fd5b6142f98c613ccd565b9a506001600160401b038060208e0135111561431457600080fd5b6143248e60208f01358f01613d25565b909b50995060408d013581101561433a57600080fd5b61434a8e60408f01358f01613d25565b909950975060608d013581101561436057600080fd5b6143708e60608f01358f01613d25565b909750955061438160808e01613bd7565b945060a08d013593508060c08e0135111561439b57600080fd5b506143ac8d60c08e01358e01613c2c565b81935080925050509295989b509295989b9093969950565b6000806000806000806000806000806000806101008d8f0312156143e757600080fd5b6143f08d613ccd565b9b506001600160401b0360208e0135111561440a57600080fd5b61441a8e60208f01358f01613d25565b909b5099506001600160401b0360408e0135111561443757600080fd5b6144478e60408f01358f01613d25565b90995097506001600160401b0360608e0135111561446457600080fd5b6144748e60608f01358f01613d25565b909750955061448560808e01613bd7565b945061449360a08e01613ccd565b935060c08d013592506001600160401b0360e08e013511156144b457600080fd5b6144c48e60e08f01358f01613c2c565b81935080925050509295989b509295989b509295989b565b600080604083850312156144ef57600080fd5b82356144fa81613cb8565b91506020830135613cfd81613cb8565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60006020828403121561455157600080fd5b81516135b481613bc2565b60208082526023908201527f4d696e74696e674d616e616765723a20544f4b454e5f4e4f545f455850495241604082015262424c4560e81b606082015260800190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60006145d7613fb884613f4d565b80848252602080830192508560051b8501368111156145f557600080fd5b855b818110156146875780356001600160401b03808211156146175760008081fd5b90880190601f368184011261462c5760008081fd5b82358281111561463e5761463e613f07565b61464f818301601f19168801613f1d565b9250808352368782860101111561466857600091508182fd5b80878501888501376000908301870152508652509382019382016145f7565b50919695505050505050565b60208082526024908201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604082015263272a22a960e11b606082015260800190565b6000602082840312156146e957600080fd5b81516135b481613d69565b6020808252602f908201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060408201526e282927ab22a22fa7a92fa7aba722a960891b606082015260800190565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b8181038181111561098f5761098f614788565b634e487b7160e01b600052603260045260246000fd5b60208082526026908201527f4d696e74696e674d616e616765723a20535542444f4d41494e535f4e4f545f41604082015265131313d5d15160d21b606082015260800190565b60006001820161481f5761481f614788565b5060010190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b6020808252810182905260006001600160fb1b0383111561487557600080fd5b8260051b80856040850137919091016040019392505050565b600082516148a0818460208701614100565b9190910192915050565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6000602082840312156148fe57600080fd5b5051919050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c9082168061494157607f821691505b60208210810361496157634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561497957600080fd5b81516135b481613cb8565b600081518084526020808501808196508360051b8101915082860160005b858110156149cc5782840389526149ba848351614124565b988501989350908401906001016149a2565b5091979650505050505050565b6001600160a01b038616815260a0602082018190526000906149fd90830187614984565b8281036040840152614a0f8187614984565b90508281036060840152614a238186614984565b91505082151560808301529695505050505050565b600060018060a01b03808616835260606020840152614a5a6060840186614124565b9150808416604084015250949350505050565b606081526000614a806060830186614984565b8281036020840152614a928186614984565b915050826040830152949350505050565b600081614ab257614ab2614788565b506000190190565b601f821115610d1957600081815260208120601f850160051c81016020861015614ae15750805b601f850160051c820191505b818110156116de57828155600101614aed565b81516001600160401b03811115614b1957614b19613f07565b614b2d81614b27845461492d565b84614aba565b602080601f831160018114614b625760008415614b4a5750858301515b600019600386901b1c1916600185901b1785556116de565b600085815260208120601f198616915b82811015614b9157888601518255948401946001909101908401614b72565b5085821015614baf5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b828152604060208201526000614bd86040830184614124565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b8082018082111561098f5761098f614788565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351614c76816017850160208801614100565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351614ca7816028840160208801614100565b01602801949350505050565b808202811582820484141761098f5761098f614788565b634e487b7160e01b600052602160045260246000fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
