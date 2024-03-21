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
const _bytecode = "0x608060405234801561001057600080fd5b50615046806100206000396000f3fe6080604052600436106102c95760003560e01c806391d1485411610175578063b9998a24116100dc578063d547741f11610095578063f2fde38b1161006f578063f2fde38b146108cd578063f5243bc4146108ed578063f940e3851461090d578063ffa1ad741461092d57600080fd5b8063d547741f1461087a578063d7db74c71461089a578063ec527389146108ad57600080fd5b8063b9998a24146107b8578063cc2a9a5b146107d8578063cc2c3fc4146107f8578063ceeb4f5014610818578063d1f5692c14610838578063d53913931461085857600080fd5b8063a3f4df7e1161012e578063a3f4df7e146106cb578063a849d65c14610718578063aa271e1a14610738578063ae31844a14610758578063b0aa98c714610778578063b3ab15fb1461079857600080fd5b806391d1485414610621578063983b2d5614610641578063986502751461066157806399e0dd7c14610676578063a217fddf14610696578063a3a3f7f6146106ab57600080fd5b80635b6fa8db11610234578063715018a6116101ed57806381c81d35116101c757806381c81d35146105bb5780638456cb59146105ce5780638da5cb5b146105e3578063906cecc11461060157600080fd5b8063715018a61461056657806371e2a6571461057b57806377a2a5891461059b57600080fd5b80635b6fa8db146104be5780635c975abb146104de5780635cd7e3b3146104f35780635e22cd86146105135780635fc1964f14610533578063634486da1461055357600080fd5b80633092afd5116102865780633092afd5146103c357806336568abe146103e35780633f41b614146104035780633f4ba83a1461043b57806351cff8d914610450578063572b6c051461047057600080fd5b806301ffc9a7146102ce5780631edb948e1461030357806320c5429b14610325578063248a9ca314610345578063268b15ed146103835780632f2ff15d146103a3575b600080fd5b3480156102da57600080fd5b506102ee6102e9366004613eb1565b61095e565b60405190151581526020015b60405180910390f35b34801561030f57600080fd5b5061032361031e366004613f00565b610995565b005b34801561033157600080fd5b50610323610340366004613f2c565b610b3e565b34801561035157600080fd5b50610375610360366004613f2c565b60009081526097602052604090206001015490565b6040519081526020016102fa565b34801561038f57600080fd5b5061032361039e366004613f86565b610c61565b3480156103af57600080fd5b506103236103be366004613ff1565b610cf4565b3480156103cf57600080fd5b506103236103de366004614021565b610d1e565b3480156103ef57600080fd5b506103236103fe366004613ff1565b610d32565b34801561040f57600080fd5b5060c954610423906001600160a01b031681565b6040516001600160a01b0390911681526020016102fa565b34801561044757600080fd5b50610323610dc0565b34801561045c57600080fd5b5061032361046b366004614021565b610dd2565b34801561047c57600080fd5b506102ee61048b366004614021565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b3480156104ca57600080fd5b5060cc54610423906001600160a01b031681565b3480156104ea57600080fd5b506102ee610e72565b3480156104ff57600080fd5b5061032361050e366004614090565b610e88565b34801561051f57600080fd5b5061032361052e36600461414f565b6110ec565b34801561053f57600080fd5b5061032361054e366004614289565b611331565b610323610561366004614021565b611379565b34801561057257600080fd5b5061032361143c565b34801561058757600080fd5b50610323610596366004614289565b61144e565b3480156105a757600080fd5b5060ce54610423906001600160a01b031681565b6103236105c9366004614021565b611496565b3480156105da57600080fd5b50610323611513565b3480156105ef57600080fd5b506033546001600160a01b0316610423565b34801561060d57600080fd5b5061032361061c366004614327565b611523565b34801561062d57600080fd5b506102ee61063c366004613ff1565b6115a9565b34801561064d57600080fd5b5061032361065c366004614021565b6115d4565b34801561066d57600080fd5b506103236115e5565b34801561068257600080fd5b50610323610691366004614382565b6115ff565b3480156106a257600080fd5b50610375600081565b3480156106b757600080fd5b506103236106c63660046143c3565b6116e6565b3480156106d757600080fd5b5061070b604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102fa9190614469565b34801561072457600080fd5b5060cb54610423906001600160a01b031681565b34801561074457600080fd5b506102ee610753366004614021565b61172f565b34801561076457600080fd5b5061032361077336600461447c565b611749565b34801561078457600080fd5b506102ee610793366004613f2c565b611854565b3480156107a457600080fd5b506103236107b3366004614021565b6118b2565b3480156107c457600080fd5b506103236107d3366004614021565b6118dc565b3480156107e457600080fd5b506103236107f33660046144b1565b611921565b34801561080457600080fd5b5060ca54610423906001600160a01b031681565b34801561082457600080fd5b50610323610833366004614533565b611dbf565b34801561084457600080fd5b5061032361085336600461447c565b611e63565b34801561086457600080fd5b5061037560008051602061501a83398151915281565b34801561088657600080fd5b50610323610895366004613ff1565b611f1a565b6103236108a83660046145e8565b611f3f565b3480156108b957600080fd5b506103236108c8366004613f2c565b6120cf565b3480156108d957600080fd5b506103236108e8366004614021565b612141565b3480156108f957600080fd5b506103236109083660046146dd565b61215d565b34801561091957600080fd5b506103236109283660046147f5565b61230f565b34801561093957600080fd5b5061070b60405180604001604052806005815260200164302e352e3160d81b81525081565b60006001600160e01b03198216637965db0b60e01b148061098f57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6109a061075361248b565b6109c55760405162461bcd60e51b81526004016109bc90614823565b60405180910390fd5b60c95460405163baef73e960e01b8152600481018390526000916001600160a01b03169063baef73e990602401602060405180830381865afa158015610a0f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a339190614858565b9050806001600160401b0316600003610a5e5760405162461bcd60e51b81526004016109bc90614875565b806001600160401b0316836001600160401b031611610acb5760405162461bcd60e51b815260206004820152602360248201527f4d696e74696e674d616e616765723a204558504952595f4e4f545f455854454e60448201526211115160ea1b60648201526084016109bc565b60c954604051631fb9763760e11b81526001600160401b0385166004820152602481018490526001600160a01b0390911690633f72ec6e906044015b600060405180830381600087803b158015610b2157600080fd5b505af1158015610b35573d6000803e3d6000fd5b50505050505050565b610b4961075361248b565b610b655760405162461bcd60e51b81526004016109bc90614823565b60c95460405163baef73e960e01b8152600481018390526001600160a01b039091169063baef73e990602401602060405180830381865afa158015610bae573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd29190614858565b6001600160401b0316600003610bfa5760405162461bcd60e51b81526004016109bc90614875565b60c954604051637eee288d60e01b8152306004820152602481018390526001600160a01b0390911690637eee288d90604401600060405180830381600087803b158015610c4657600080fd5b505af1158015610c5a573d6000803e3d6000fd5b5050505050565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250610ca4935085925084915061249a565b610cac610e72565b15610cc95760405162461bcd60e51b81526004016109bc906148b8565b6060610b35610cd661248b565b610ce988610ce48989612671565b61269d565b8384600060016127ae565b600082815260976020526040902060010154610d0f81612d02565b610d198383612d13565b505050565b610d26612d9a565b610d2f81612e13565b50565b610d3a61248b565b6001600160a01b0316816001600160a01b031614610db25760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016109bc565b610dbc8282612e2b565b5050565b610dc8612d9a565b610dd0612eb0565b565b610dda612d9a565b6001600160a01b038116610ded57600080fd5b60405147906001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610e25573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905260008183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a15050565b600080516020614ffa8339815191525460ff1690565b610e9286886148e2565b8051600203610ec757610ea661075361248b565b610ec25760405162461bcd60e51b81526004016109bc906149ac565b61100c565b6000610ed282612f58565b60c9549092506001600160a01b0316905063430c2081610ef061248b565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610f3b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f5f91906149f0565b80610fee575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610fb8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fdc91906149f0565b8015610fee5750610fee61075361248b565b61100a5760405162461bcd60e51b81526004016109bc90614a0d565b505b61101687896148e2565b600060028251101561103a5760405162461bcd60e51b81526004016109bc90614a5c565b61108f61106e600084600186516110519190614ab7565b8151811061106157611061614aca565b6020026020010151612f93565b8360008151811061108157611081614aca565b60200260200101518361249a565b611097610e72565b156110b45760405162461bcd60e51b81526004016109bc906148b8565b6110de8b6110c28b8d6148e2565b6110cc8a8c6148e2565b6110d6898b6148e2565b6000896127ae565b505050505050505050505050565b6110f687896148e2565b805160020361112b5761110a61075361248b565b6111265760405162461bcd60e51b81526004016109bc906149ac565b611270565b600061113682612f58565b60c9549092506001600160a01b0316905063430c208161115461248b565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa15801561119f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111c391906149f0565b80611252575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa15801561121c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061124091906149f0565b8015611252575061125261075361248b565b61126e5760405162461bcd60e51b81526004016109bc90614a0d565b505b61127a888a6148e2565b8360028251101561129d5760405162461bcd60e51b81526004016109bc90614a5c565b6112b461106e600084600186516110519190614ab7565b6112bc610e72565b156112d95760405162461bcd60e51b81526004016109bc906148b8565b60028a146112f95760405162461bcd60e51b81526004016109bc90614ae0565b6113228c6113078c8e6148e2565b6113118b8d6148e2565b61131b8a8c6148e2565b89896127ae565b50505050505050505050505050565b611339612d9a565b60005b8151811015610dbc5761136782828151811061135a5761135a614aca565b6020026020010151612e13565b8061137181614b26565b91505061133c565b61138461075361248b565b6113a05760405162461bcd60e51b81526004016109bc90614823565b6001600160a01b0381166113f65760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016109bc565b6113ff81613047565b6114076115e5565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610dbc573d6000803e3d6000fd5b611444612d9a565b610dd0600061305f565b611456612d9a565b60005b8151811015610dbc5761148482828151811061147757611477614aca565b6020026020010151613047565b8061148e81614b26565b915050611459565b6114a161075361248b565b6114bd5760405162461bcd60e51b81526004016109bc90614823565b6001600160a01b0381166113ff5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016109bc565b61151b612d9a565b610dd06130b1565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250611566935085925084915061249a565b61156e610e72565b1561158b5760405162461bcd60e51b81526004016109bc906148b8565b606061159f87610ce988610ce48989612671565b5050505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6115dc612d9a565b610d2f81613047565b610dd060008051602061501a8339815191526103fe61248b565b611607612d9a565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906116399085908590600401614b3f565b600060405180830381600087803b15801561165357600080fd5b505af1158015611667573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610dbc90505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906116b09085908590600401614b3f565b600060405180830381600087803b1580156116ca57600080fd5b505af11580156116de573d6000803e3d6000fd5b505050505050565b6116ee612d9a565b610d1983838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250859250613119915050565b600061098f60008051602061501a833981519152836115a9565b61175461075361248b565b6117705760405162461bcd60e51b81526004016109bc90614823565b60c9546040516000916001600160a01b0316906117939085908590602401614b6e565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b179052516117c89190614ba7565b6000604051808303816000865af19150503d8060008114611805576040519150601f19603f3d011682016040523d82523d6000602084013e61180a565b606091505b5050905080610d195760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b60448201526064016109bc565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526000906118a8906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b6118ba612d9a565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b6118e4612d9a565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b600054610100900460ff16158080156119415750600054600160ff909116105b8061195b5750303b15801561195b575060005460ff166001145b6119be5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016109bc565b6000805460ff1916600117905580156119e1576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce8054909116918516919091179055611a3f613239565b611a47613270565b611a50826132a9565b611a586132d0565b604080516103008101825260066102c082018181526563727970746f60d01b6102e0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b8183015261016084015283518085018552600280825261686960f01b8284015261018085019190915284518086018652838152656b726573757360d01b818401526101a085015284518086018652600580825264616e696d6560d81b828501526101c086019190915285518087018752818152646d616e676160d81b818501526101e086015285518087018752600981526862696e616e6365757360b81b8185015261020086015285518087018752818152647265616c6d60d81b818501526102208601528551808701875291825261676f60f01b82840152610240850191909152845180860186526008815267185b1d1a5b5a5cdd60c21b818401526102608501528451808601865290815264707564677960d81b8183015261028084015283518085019094529083526530bab9ba34b760d11b908301526102a081019190915260005b6016811015611d4957611d37828260168110611d2b57611d2b614aca565b60200201516000613119565b80611d4181614b26565b915050611d0d565b50611d7060405180604001604052806003815260200162636f6d60e81b8152506001613119565b508015610b35576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250611e02935085925084915061249a565b611e0a610e72565b15611e275760405162461bcd60e51b81526004016109bc906148b8565b611e568a611e398b610ce48c8c612671565b611e43888a6148e2565b611e4d87896148e2565b600060016127ae565b5050505050505050505050565b611e6b612d9a565b60005b81811015610d195760c9546001600160a01b03166350960239848484818110611e9957611e99614aca565b9050602002016020810190611eae9190614021565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b158015611eef57600080fd5b505af1158015611f03573d6000803e3d6000fd5b505050508080611f1290614b26565b915050611e6e565b600082815260976020526040902060010154611f3581612d02565b610d198383612e2b565b611f49898b6148e2565b6000600282511015611f6d5760405162461bcd60e51b81526004016109bc90614a5c565b611f8461106e600084600186516110519190614ab7565b611f8c610e72565b15611fa95760405162461bcd60e51b81526004016109bc906148b8565b60028b14611fc95760405162461bcd60e51b81526004016109bc90614ae0565b61200f8d8d8d898960008a8a8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061331092505050565b8434101561205f5760405162461bcd60e51b815260206004820181905260248201527f4d696e74696e674d616e616765723a204e4f545f454e4f5547485f46554e445360448201526064016109bc565b6120718d8d8d8d8d8d8d8c60006134d0565b843411156113225761208161248b565b6001600160a01b03166108fc6120978734614ab7565b6040518115909202916000818181858888f193505050501580156120bf573d6000803e3d6000fd5b5050505050505050505050505050565b6120d7612d9a565b6120e08161358c565b6120fc5760405162461bcd60e51b81526004016109bc90614bc3565b600081815260cd6020526040812061211391613e63565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b612149612d9a565b612152816135b2565b610d2f600082613628565b6121678a8c6148e2565b600060028251101561218b5760405162461bcd60e51b81526004016109bc90614a5c565b6121a261106e600084600186516110519190614ab7565b6121aa610e72565b156121c75760405162461bcd60e51b81526004016109bc906148b8565b60028c146121e75760405162461bcd60e51b81526004016109bc90614ae0565b61222c8e8e8e8a898b8a8a8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061331092505050565b856001600160a01b03166323b872dd61224361248b565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018890526064016020604051808303816000875af1158015612296573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122ba91906149f0565b6122fe5760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b60448201526064016109bc565b6120bf8e8e8e8e8e8e8e8c8e6134d0565b612317612d9a565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa15801561235e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123829190614c05565b60405163a9059cbb60e01b81526001600160a01b038481166004830152602482018390529192509084169063a9059cbb906044016020604051808303816000875af11580156123d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123f991906149f0565b61243d5760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b60448201526064016109bc565b604080516001600160a01b0384811682526020820184905285168183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a1505050565b6000612495613632565b905090565b6124a38361358c565b6124bf5760405162461bcd60e51b81526004016109bc90614bc3565b600083815260cf602052604090205460ff1615156001600160401b03821615151461253b5760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544c445f455850495241424c455f4d496044820152650a69a82a886960d31b60648201526084016109bc565b600061256e8360408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a816000015111156126165761259961258d826000600a613678565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8036126165760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b60648201526084016109bc565b61261f836136b7565b61266b5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c494400000060448201526064016109bc565b50505050565b60608282604051602001612686929190614c1e565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b60608152602001906001900390816126b757905050905082816000815181106126e2576126e2614aca565b602002602001018190525060cd6000858152602001908152602001600020805461270b90614c46565b80601f016020809104026020016040519081016040528092919081815260200182805461273790614c46565b80156127845780601f1061275957610100808354040283529160200191612784565b820191906000526020600020905b81548152906001019060200180831161276757829003601f168201915b50505050508160018151811061279c5761279c614aca565b60209081029190910101529392505050565b60008060006127bc88612f58565b915091508380156127ce575060028851115b8015612850575060c9546040516331a9108f60e11b8152600481018390526001600160a01b038b8116921690636352211e90602401602060405180830381865afa158015612820573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128449190614c80565b6001600160a01b031614155b156128b05760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b60648201526084016109bc565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa1580156128f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061291d91906149f0565b8015612a0e575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa15801561296d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129919190614c80565b6001600160a01b03161480612a0e575060c95460405163d9548e5360e01b8152600481018490526001600160a01b039091169063d9548e5390602401602060405180830381865afa1580156129ea573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a0e91906149f0565b15612aff576001600160401b03851615612a905760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b158015612a7757600080fd5b505af1158015612a8b573d6000803e3d6000fd5b505050505b60c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690612ac8908c908c908c908c908b90600401614cf2565b600060405180830381600087803b158015612ae257600080fd5b505af1158015612af6573d6000803e3d6000fd5b50505050612cf6565b612b088261381b565b612b118861387a565b8015612b1e575087516002145b8015612b3157506001600160401b038516155b15612c0f5760ca5488516001600160a01b039091169063c36c2125908b908b90600090612b6057612b60614aca565b602090810291909101015160cc546040516001600160e01b031960e086901b168152612b9a9392916001600160a01b031690600401614d51565b600060405180830381600087803b158015612bb457600080fd5b505af1158015612bc8573d6000803e3d6000fd5b50505050600087511115612c0a5760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490612ac8908a908a908790600401614d86565b612cf6565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790612c47908c908c908c908c908b90600401614cf2565b600060405180830381600087803b158015612c6157600080fd5b505af1158015612c75573d6000803e3d6000fd5b505050506001600160401b03851615612cf65760c954604051631fb9763760e11b81526001600160401b0387166004820152602481018490526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b158015612cdd57600080fd5b505af1158015612cf1573d6000803e3d6000fd5b505050505b50979650505050505050565b610d2f81612d0e61248b565b6138d4565b612d1d82826115a9565b610dbc5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612d5661248b565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612da261248b565b6001600160a01b0316612dbd6033546001600160a01b031690565b6001600160a01b031614610dd05760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016109bc565b610d2f60008051602061501a83398151915282611f1a565b612e3582826115a9565b15610dbc5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612e6c61248b565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b612eb8610e72565b612efb5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b60448201526064016109bc565b600080516020614ffa833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa612f3b61248b565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b8015612f8d57829150612f798285611051600185614ab7565b925080612f8581614dbc565b915050612f60565b50915091565b60008151600003612fe65760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d505459000000000060448201526064016109bc565b8282604051602001612ff89190614ba7565b60405160208183030381529060405280519060200120604051602001613028929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610d2f60008051602061501a83398151915282613628565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6130b9610e72565b156130d65760405162461bcd60e51b81526004016109bc906148b8565b600080516020614ffa833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612f3b61248b565b6000613126600084612f93565b600081815260cd602052604090209091506131418482614e19565b50600081815260cf602052604090819020805460ff19168415151790555181907f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf89809061318e908690614469565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa1580156131df573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061320391906149f0565b610d195760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c6090610b079084908790600401614ed8565b600054610100900460ff166132605760405162461bcd60e51b81526004016109bc90614ef9565b610dd061326b61248b565b61305f565b600054610100900460ff166132975760405162461bcd60e51b81526004016109bc90614ef9565b610dd060006132a461248b565b613628565b600054610100900460ff166118e45760405162461bcd60e51b81526004016109bc90614ef9565b600054610100900460ff166132f75760405162461bcd60e51b81526004016109bc90614ef9565b600080516020614ffa833981519152805460ff19169055565b600061332461331f87896148e2565b612f58565b506040516bffffffffffffffffffffffff1930606090811b821660208401524660348401528b811b82166054840152606883018490526001600160c01b031960c08a901b1660888401526090830188905286901b1660b08201529091506000906134009084906133fa9060c401604051602081830303815290604052805190602001206040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b90613938565b905061340b8161172f565b6134635760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a205349474e45525f49535f4e4f545f4d49604482015263272a22a960e11b60648201526084016109bc565b42866001600160401b0316116134c55760405162461bcd60e51b815260206004820152602160248201527f4d696e74696e674d616e616765723a20455850495245445f5349474e415455526044820152604560f81b60648201526084016109bc565b505050505050505050565b60006135178a6134e08a8c6148e2565b6134ea898b6148e2565b6134f4888a6148e2565b60008f6001600160a01b031661350861248b565b6001600160a01b0316146127ae565b9050896001600160a01b031661352b61248b565b6001600160a01b0316827fa545b6fd3355e8d57f8c8147bafe740545bd3ea1f94bef2576a6d532a7c3b60586866040516135789291909182526001600160a01b0316602082015260400190565b60405180910390a450505050505050505050565b600081815260cd6020526040812080548291906135a890614c46565b9050119050919050565b6135ba612d9a565b6001600160a01b03811661361f5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016109bc565b610d2f8161305f565b610dbc8282612d13565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b03163303613673575060331936013560601c90565b503390565b604080518082019091526000808252602082015260405180604001604052808381526020018486602001516136ad9190614f44565b9052949350505050565b600081516000036136ca57506000919050565b60208201805160f81c603081108015906136e8575060398160ff1611155b15801561370a575060618160ff16101580156137085750607a8160ff1611155b155b15613719575060009392505050565b835160018111156137875761373b83613733600184614ab7565b015160f81c90565b915060308260ff1610158015613755575060398260ff1611155b158015613777575060618260ff16101580156137755750607a8260ff1611155b155b1561378757506000949350505050565b60015b613795600183614ab7565b81101561380f578381015160f81c9250602d83148015906137cb575060308360ff16101580156137c9575060398360ff1611155b155b80156137ec575060618360ff16101580156137ea5750607a8360ff1611155b155b156137fd5750600095945050505050565b8061380781614b26565b91505061378a565b50600195945050505050565b61382481611854565b156138715760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b454400000060448201526064016109bc565b610d2f8161395c565b600080613891600084600186516110519190614ab7565b60ca549091506001600160a01b0316158015906138cd5750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6138de82826115a9565b610dbc576138f6816001600160a01b031660146139e0565b6139018360206139e0565b604051602001613912929190614f57565b60408051601f198184030181529082905262461bcd60e51b82526109bc91600401614469565b60008060006139478585613b7b565b9150915061395481613bc0565b509392505050565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260019061399b9060600161188f565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b606060006139ef836002614fcc565b6139fa906002614f44565b6001600160401b03811115613a1157613a11614220565b6040519080825280601f01601f191660200182016040528015613a3b576020820181803683370190505b509050600360fc1b81600081518110613a5657613a56614aca565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110613a8557613a85614aca565b60200101906001600160f81b031916908160001a9053506000613aa9846002614fcc565b613ab4906001614f44565b90505b6001811115613b2c576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110613ae857613ae8614aca565b1a60f81b828281518110613afe57613afe614aca565b60200101906001600160f81b031916908160001a90535060049490941c93613b2581614dbc565b9050613ab7565b5083156138cd5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016109bc565b6000808251604103613bb15760208301516040840151606085015160001a613ba587828585613d76565b94509450505050613bb9565b506000905060025b9250929050565b6000816004811115613bd457613bd4614fe3565b03613bdc5750565b6001816004811115613bf057613bf0614fe3565b03613c3d5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016109bc565b6002816004811115613c5157613c51614fe3565b03613c9e5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016109bc565b6003816004811115613cb257613cb2614fe3565b03613d0a5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016109bc565b6004816004811115613d1e57613d1e614fe3565b03610d2f5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b60648201526084016109bc565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613dad5750600090506003613e5a565b8460ff16601b14158015613dc557508460ff16601c14155b15613dd65750600090506004613e5a565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613e2a573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613e5357600060019250925050613e5a565b9150600090505b94509492505050565b508054613e6f90614c46565b6000825580601f10613e7f575050565b601f016020900490600052602060002090810190610d2f91905b80821115613ead5760008155600101613e99565b5090565b600060208284031215613ec357600080fd5b81356001600160e01b0319811681146138cd57600080fd5b6001600160401b0381168114610d2f57600080fd5b8035613efb81613edb565b919050565b60008060408385031215613f1357600080fd5b8235613f1e81613edb565b946020939093013593505050565b600060208284031215613f3e57600080fd5b5035919050565b60008083601f840112613f5757600080fd5b5081356001600160401b03811115613f6e57600080fd5b602083019150836020828501011115613bb957600080fd5b600080600060408486031215613f9b57600080fd5b8335925060208401356001600160401b03811115613fb857600080fd5b613fc486828701613f45565b9497909650939450505050565b6001600160a01b0381168114610d2f57600080fd5b8035613efb81613fd1565b6000806040838503121561400457600080fd5b82359150602083013561401681613fd1565b809150509250929050565b60006020828403121561403357600080fd5b81356138cd81613fd1565b60008083601f84011261405057600080fd5b5081356001600160401b0381111561406757600080fd5b6020830191508360208260051b8501011115613bb957600080fd5b8015158114610d2f57600080fd5b60008060008060008060008060a0898b0312156140ac57600080fd5b88356140b781613fd1565b975060208901356001600160401b03808211156140d357600080fd5b6140df8c838d0161403e565b909950975060408b01359150808211156140f857600080fd5b6141048c838d0161403e565b909750955060608b013591508082111561411d57600080fd5b5061412a8b828c0161403e565b909450925050608089013561413e81614082565b809150509295985092959890939650565b600080600080600080600080600060c08a8c03121561416d57600080fd5b893561417881613fd1565b985060208a01356001600160401b038082111561419457600080fd5b6141a08d838e0161403e565b909a50985060408c01359150808211156141b957600080fd5b6141c58d838e0161403e565b909850965060608c01359150808211156141de57600080fd5b506141eb8c828d0161403e565b90955093505060808a01356141ff81613edb565b915060a08a013561420f81614082565b809150509295985092959850929598565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b038111828210171561425e5761425e614220565b604052919050565b60006001600160401b0382111561427f5761427f614220565b5060051b60200190565b6000602080838503121561429c57600080fd5b82356001600160401b038111156142b257600080fd5b8301601f810185136142c357600080fd5b80356142d66142d182614266565b614236565b81815260059190911b820183019083810190878311156142f557600080fd5b928401925b8284101561431c57833561430d81613fd1565b825292840192908401906142fa565b979650505050505050565b6000806000806060858703121561433d57600080fd5b843561434881613fd1565b93506020850135925060408501356001600160401b0381111561436a57600080fd5b61437687828801613f45565b95989497509550505050565b6000806020838503121561439557600080fd5b82356001600160401b038111156143ab57600080fd5b6143b785828601613f45565b90969095509350505050565b6000806000604084860312156143d857600080fd5b83356001600160401b038111156143ee57600080fd5b6143fa86828701613f45565b909450925050602084013561440e81614082565b809150509250925092565b60005b8381101561443457818101518382015260200161441c565b50506000910152565b60008151808452614455816020860160208601614419565b601f01601f19169290920160200192915050565b6020815260006138cd602083018461443d565b6000806020838503121561448f57600080fd5b82356001600160401b038111156144a557600080fd5b6143b78582860161403e565b60008060008060008060c087890312156144ca57600080fd5b86356144d581613fd1565b955060208701356144e581613fd1565b945060408701356144f581613fd1565b9350606087013561450581613fd1565b9250608087013561451581613fd1565b915060a087013561452581613fd1565b809150509295509295509295565b60008060008060008060008060a0898b03121561454f57600080fd5b883561455a81613fd1565b97506020890135965060408901356001600160401b038082111561457d57600080fd5b6145898c838d01613f45565b909850965060608b01359150808211156145a257600080fd5b6145ae8c838d0161403e565b909650945060808b01359150808211156145c757600080fd5b506145d48b828c0161403e565b999c989b5096995094979396929594505050565b600080600080600080600080600080600060e08c8e03121561460957600080fd5b6146128c613fe6565b9a506001600160401b038060208e0135111561462d57600080fd5b61463d8e60208f01358f0161403e565b909b50995060408d013581101561465357600080fd5b6146638e60408f01358f0161403e565b909950975060608d013581101561467957600080fd5b6146898e60608f01358f0161403e565b909750955061469a60808e01613ef0565b945060a08d013593508060c08e013511156146b457600080fd5b506146c58d60c08e01358e01613f45565b81935080925050509295989b509295989b9093969950565b6000806000806000806000806000806000806101008d8f03121561470057600080fd5b6147098d613fe6565b9b506001600160401b0360208e0135111561472357600080fd5b6147338e60208f01358f0161403e565b909b5099506001600160401b0360408e0135111561475057600080fd5b6147608e60408f01358f0161403e565b90995097506001600160401b0360608e0135111561477d57600080fd5b61478d8e60608f01358f0161403e565b909750955061479e60808e01613ef0565b94506147ac60a08e01613fe6565b935060c08d013592506001600160401b0360e08e013511156147cd57600080fd5b6147dd8e60e08f01358f01613f45565b81935080925050509295989b509295989b509295989b565b6000806040838503121561480857600080fd5b823561481381613fd1565b9150602083013561401681613fd1565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60006020828403121561486a57600080fd5b81516138cd81613edb565b60208082526023908201527f4d696e74696e674d616e616765723a20544f4b454e5f4e4f545f455850495241604082015262424c4560e81b606082015260800190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60006148f06142d184614266565b80848252602080830192508560051b85013681111561490e57600080fd5b855b818110156149a05780356001600160401b03808211156149305760008081fd5b90880190601f36818401126149455760008081fd5b82358281111561495757614957614220565b614968818301601f19168801614236565b9250808352368782860101111561498157600091508182fd5b8087850188850137600090830187015250865250938201938201614910565b50919695505050505050565b60208082526024908201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604082015263272a22a960e11b606082015260800190565b600060208284031215614a0257600080fd5b81516138cd81614082565b6020808252602f908201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060408201526e282927ab22a22fa7a92fa7aba722a960891b606082015260800190565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b8181038181111561098f5761098f614aa1565b634e487b7160e01b600052603260045260246000fd5b60208082526026908201527f4d696e74696e674d616e616765723a20535542444f4d41494e535f4e4f545f41604082015265131313d5d15160d21b606082015260800190565b600060018201614b3857614b38614aa1565b5060010190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b6020808252810182905260006001600160fb1b03831115614b8e57600080fd5b8260051b80856040850137919091016040019392505050565b60008251614bb9818460208701614419565b9190910192915050565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b600060208284031215614c1757600080fd5b5051919050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c90821680614c5a57607f821691505b602082108103614c7a57634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215614c9257600080fd5b81516138cd81613fd1565b600081518084526020808501808196508360051b8101915082860160005b85811015614ce5578284038952614cd384835161443d565b98850198935090840190600101614cbb565b5091979650505050505050565b6001600160a01b038616815260a060208201819052600090614d1690830187614c9d565b8281036040840152614d288187614c9d565b90508281036060840152614d3c8186614c9d565b91505082151560808301529695505050505050565b600060018060a01b03808616835260606020840152614d73606084018661443d565b9150808416604084015250949350505050565b606081526000614d996060830186614c9d565b8281036020840152614dab8186614c9d565b915050826040830152949350505050565b600081614dcb57614dcb614aa1565b506000190190565b601f821115610d1957600081815260208120601f850160051c81016020861015614dfa5750805b601f850160051c820191505b818110156116de57828155600101614e06565b81516001600160401b03811115614e3257614e32614220565b614e4681614e408454614c46565b84614dd3565b602080601f831160018114614e7b5760008415614e635750858301515b600019600386901b1c1916600185901b1785556116de565b600085815260208120601f198616915b82811015614eaa57888601518255948401946001909101908401614e8b565b5085821015614ec85787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b828152604060208201526000614ef1604083018461443d565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b8082018082111561098f5761098f614aa1565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351614f8f816017850160208801614419565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351614fc0816028840160208801614419565b01602801949350505050565b808202811582820484141761098f5761098f614aa1565b634e487b7160e01b600052602160045260246000fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
