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
const _bytecode = "0x608060405234801561001057600080fd5b50614660806100206000396000f3fe6080604052600436106102885760003560e01c8063983b2d561161015a578063cc2a9a5b116100c1578063d7db74c71161007a578063d7db74c7146107f9578063ec5273891461080c578063f2fde38b1461082c578063f5243bc41461084c578063f940e3851461086c578063ffa1ad741461088c57600080fd5b8063cc2a9a5b14610737578063cc2c3fc414610757578063ceeb4f5014610777578063d1f5692c14610797578063d5391393146107b7578063d547741f146107d957600080fd5b8063aa271e1a11610113578063aa271e1a14610677578063ae31844a14610697578063b0aa98c7146106b7578063b3ab15fb146106d7578063b9998a24146106f7578063c3a3bc001461071757600080fd5b8063983b2d56146105a057806398650275146105c057806399e0dd7c146105d5578063a217fddf146105f5578063a3f4df7e1461060a578063a849d65c1461065757600080fd5b80635c975abb116101fe57806377a2a589116101b757806377a2a589146104fa57806381c81d351461051a5780638456cb591461052d5780638da5cb5b14610542578063906cecc11461056057806391d148541461058057600080fd5b80635c975abb1461045d5780635cd7e3b3146104725780635fc1964f14610492578063634486da146104b2578063715018a6146104c557806371e2a657146104da57600080fd5b806336568abe1161025057806336568abe146103625780633f41b614146103825780633f4ba83a146103ba57806351cff8d9146103cf578063572b6c05146103ef5780635b6fa8db1461043d57600080fd5b806301ffc9a71461028d578063248a9ca3146102c2578063268b15ed146103005780632f2ff15d146103225780633092afd514610342575b600080fd5b34801561029957600080fd5b506102ad6102a836600461371a565b6108be565b60405190151581526020015b60405180910390f35b3480156102ce57600080fd5b506102f26102dd366004613744565b60009081526097602052604090206001015490565b6040519081526020016102b9565b34801561030c57600080fd5b5061032061031b36600461379e565b6108f5565b005b34801561032e57600080fd5b5061032061033d36600461380e565b610999565b34801561034e57600080fd5b5061032061035d36600461383e565b6109c3565b34801561036e57600080fd5b5061032061037d36600461380e565b6109d7565b34801561038e57600080fd5b5060c9546103a2906001600160a01b031681565b6040516001600160a01b0390911681526020016102b9565b3480156103c657600080fd5b50610320610a65565b3480156103db57600080fd5b506103206103ea36600461383e565b610a77565b3480156103fb57600080fd5b506102ad61040a36600461383e565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561044957600080fd5b5060cc546103a2906001600160a01b031681565b34801561046957600080fd5b506102ad610b17565b34801561047e57600080fd5b5061032061048d3660046138ad565b610b2d565b34801561049e57600080fd5b506103206104ad3660046139d5565b610e0f565b6103206104c036600461383e565b610e57565b3480156104d157600080fd5b50610320610f1a565b3480156104e657600080fd5b506103206104f53660046139d5565b610f2c565b34801561050657600080fd5b5060ce546103a2906001600160a01b031681565b61032061052836600461383e565b610f74565b34801561053957600080fd5b50610320610ff1565b34801561054e57600080fd5b506033546001600160a01b03166103a2565b34801561056c57600080fd5b5061032061057b366004613a73565b611001565b34801561058c57600080fd5b506102ad61059b36600461380e565b611088565b3480156105ac57600080fd5b506103206105bb36600461383e565b6110b3565b3480156105cc57600080fd5b506103206110c4565b3480156105e157600080fd5b506103206105f0366004613ace565b6110de565b34801561060157600080fd5b506102f2600081565b34801561061657600080fd5b5061064a604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102b99190613b5f565b34801561066357600080fd5b5060cb546103a2906001600160a01b031681565b34801561068357600080fd5b506102ad61069236600461383e565b6111c5565b3480156106a357600080fd5b506103206106b2366004613b72565b6111df565b3480156106c357600080fd5b506102ad6106d2366004613744565b6112ea565b3480156106e357600080fd5b506103206106f236600461383e565b611348565b34801561070357600080fd5b5061032061071236600461383e565b611372565b34801561072357600080fd5b50610320610732366004613ace565b6113b7565b34801561074357600080fd5b50610320610752366004613ba7565b6113fe565b34801561076357600080fd5b5060ca546103a2906001600160a01b031681565b34801561078357600080fd5b50610320610792366004613c29565b611859565b3480156107a357600080fd5b506103206107b2366004613b72565b6118ef565b3480156107c357600080fd5b506102f260008051602061463483398151915281565b3480156107e557600080fd5b506103206107f436600461380e565b6119a6565b610320610807366004613cf5565b6119cb565b34801561081857600080fd5b50610320610827366004613744565b611b59565b34801561083857600080fd5b5061032061084736600461383e565b611bcb565b34801561085857600080fd5b50610320610867366004613dea565b611be7565b34801561087857600080fd5b50610320610887366004613f02565b611d97565b34801561089857600080fd5b5061064a604051806040016040528060068152602001650605c685c62760d31b81525081565b60006001600160e01b03198216637965db0b60e01b14806108ef57506301ffc9a760e01b6001600160e01b03198316145b92915050565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506109399250849150839050611f13565b610941610b17565b156109675760405162461bcd60e51b815260040161095e90613f30565b60405180910390fd5b6060610990610974612068565b610987886109828989612077565b6120a3565b838460016121b4565b50505050505050565b6000828152609760205260409020600101546109b481612589565b6109be838361259a565b505050565b6109cb612621565b6109d48161269a565b50565b6109df612068565b6001600160a01b0316816001600160a01b031614610a575760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b606482015260840161095e565b610a6182826126b2565b5050565b610a6d612621565b610a75612737565b565b610a7f612621565b6001600160a01b038116610a9257600080fd5b60405147906001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610aca573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905260008183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a15050565b6000805160206146148339815191525460ff1690565b610b378688613f5a565b8051600203610ba857610b4b610692612068565b610ba35760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b606482015260840161095e565b610d35565b6000610bb3826127df565b60c9549092506001600160a01b0316905063430c2081610bd1612068565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610c1c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c409190614024565b80610ccf575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610c99573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cbd9190614024565b8015610ccf5750610ccf610692612068565b610d335760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b606482015260840161095e565b505b610d3f8789613f5a565b600281511015610d615760405162461bcd60e51b815260040161095e90614041565b610db5610d9560008360018551610d78919061409c565b81518110610d8857610d886140af565b602002602001015161281a565b82600081518110610da857610da86140af565b6020026020010151611f13565b610dbd610b17565b15610dda5760405162461bcd60e51b815260040161095e90613f30565b610e028a610de88a8c613f5a565b610df2898b613f5a565b610dfc888a613f5a565b876121b4565b5050505050505050505050565b610e17612621565b60005b8151811015610a6157610e45828281518110610e3857610e386140af565b602002602001015161269a565b80610e4f816140c5565b915050610e1a565b610e62610692612068565b610e7e5760405162461bcd60e51b815260040161095e906140de565b6001600160a01b038116610ed45760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d505459000000604482015260640161095e565b610edd816128ce565b610ee56110c4565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610a61573d6000803e3d6000fd5b610f22612621565b610a7560006128e6565b610f34612621565b60005b8151811015610a6157610f62828281518110610f5557610f556140af565b60200260200101516128ce565b80610f6c816140c5565b915050610f37565b610f7f610692612068565b610f9b5760405162461bcd60e51b815260040161095e906140de565b6001600160a01b038116610edd5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d505459000000604482015260640161095e565b610ff9612621565b610a75612938565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506110459250849150839050611f13565b61104d610b17565b1561106a5760405162461bcd60e51b815260040161095e90613f30565b606061107e87610987886109828989612077565b5050505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6110bb612621565b6109d4816128ce565b610a7560008051602061463483398151915261037d612068565b6110e6612621565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906111189085908590600401614113565b600060405180830381600087803b15801561113257600080fd5b505af1158015611146573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610a6190505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061118f9085908590600401614113565b600060405180830381600087803b1580156111a957600080fd5b505af11580156111bd573d6000803e3d6000fd5b505050505050565b60006108ef60008051602061463483398151915283611088565b6111ea610692612068565b6112065760405162461bcd60e51b815260040161095e906140de565b60c9546040516000916001600160a01b0316906112299085908590602401614142565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b1790525161125e919061417b565b6000604051808303816000865af19150503d806000811461129b576040519150601f19603f3d011682016040523d82523d6000602084013e6112a0565b606091505b50509050806109be5760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b604482015260640161095e565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260009061133e906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b611350612621565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b61137a612621565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b6113bf612621565b610a6182828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506129a092505050565b600054610100900460ff161580801561141e5750600054600160ff909116105b806114385750303b158015611438575060005460ff166001145b61149b5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161095e565b6000805460ff1916600117905580156114be576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce805490911691851691909117905561151c612aa4565b611524612adb565b61152d82612b14565b611535612b3b565b604080516102e08101825260066102a082018181526563727970746f60d01b6102c0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b8183015261016084015283518085018552600280825261686960f01b8284015261018085019190915284518086018652928352656b726573757360d01b838301526101a084019290925283518085018552600580825264616e696d6560d81b828401526101c085019190915284518086018652818152646d616e676160d81b818401526101e085015284518086018652600981526862696e616e6365757360b81b8184015261020085015284518086018652818152647265616c6d60d81b818401526102208501528451808601865292835261676f60f01b83830152610240840192909252835180850185526008815267185b1d1a5b5a5cdd60c21b81830152610260840152835180850190945290835264707564677960d81b9083015261028081019190915260005b6015811015611809576117f78282601581106117ed576117ed6140af565b60200201516129a0565b80611801816140c5565b9150506117cf565b50508015610990576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061189d9250849150839050611f13565b6118a5610b17565b156118c25760405162461bcd60e51b815260040161095e90613f30565b610e028a6118d48b6109828c8c612077565b6118de888a613f5a565b6118e88789613f5a565b60016121b4565b6118f7612621565b60005b818110156109be5760c9546001600160a01b03166350960239848484818110611925576119256140af565b905060200201602081019061193a919061383e565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561197b57600080fd5b505af115801561198f573d6000803e3d6000fd5b50505050808061199e906140c5565b9150506118fa565b6000828152609760205260409020600101546119c181612589565b6109be83836126b2565b6119d5898b613f5a565b6002815110156119f75760405162461bcd60e51b815260040161095e90614041565b611a0e610d9560008360018551610d78919061409c565b611a16610b17565b15611a335760405162461bcd60e51b815260040161095e90613f30565b60028a14611a535760405162461bcd60e51b815260040161095e90614197565b611a998c8c8c8888600089898080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612b7b92505050565b83341015611ae95760405162461bcd60e51b815260206004820181905260248201527f4d696e74696e674d616e616765723a204e4f545f454e4f5547485f46554e4453604482015260640161095e565b611afb8c8c8c8c8c8c8c8b6000612d3b565b83341115611b4b57611b0b612068565b6001600160a01b03166108fc611b21863461409c565b6040518115909202916000818181858888f19350505050158015611b49573d6000803e3d6000fd5b505b505050505050505050505050565b611b61612621565b611b6a81612df5565b611b865760405162461bcd60e51b815260040161095e906141dd565b600081815260cd60205260408120611b9d916136cc565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611bd3612621565b611bdc81612e1b565b6109d4600082612e91565b611bf18a8c613f5a565b600281511015611c135760405162461bcd60e51b815260040161095e90614041565b611c2a610d9560008360018551610d78919061409c565b611c32610b17565b15611c4f5760405162461bcd60e51b815260040161095e90613f30565b60028b14611c6f5760405162461bcd60e51b815260040161095e90614197565b611cb48d8d8d89888a89898080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612b7b92505050565b846001600160a01b03166323b872dd611ccb612068565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018790526064016020604051808303816000875af1158015611d1e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d429190614024565b611d865760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b604482015260640161095e565b611b498d8d8d8d8d8d8d8b8d612d3b565b611d9f612621565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa158015611de6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e0a919061421f565b60405163a9059cbb60e01b81526001600160a01b038481166004830152602482018390529192509084169063a9059cbb906044016020604051808303816000875af1158015611e5d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e819190614024565b611ec55760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b604482015260640161095e565b604080516001600160a01b0384811682526020820184905285168183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a1505050565b611f1c82612df5565b611f385760405162461bcd60e51b815260040161095e906141dd565b6000611f6b8260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a8160000151111561201357611f96611f8a826000600a612e9b565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8036120135760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b606482015260840161095e565b61201c82612eda565b6109be5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c4944000000604482015260640161095e565b600061207261303e565b905090565b6060828260405160200161208c929190614238565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b60608152602001906001900390816120bd57905050905082816000815181106120e8576120e86140af565b602002602001018190525060cd6000858152602001908152602001600020805461211190614260565b80601f016020809104026020016040519081016040528092919081815260200182805461213d90614260565b801561218a5780601f1061215f5761010080835404028352916020019161218a565b820191906000526020600020905b81548152906001019060200180831161216d57829003601f168201915b5050505050816001815181106121a2576121a26140af565b60209081029190910101529392505050565b60008060006121c2876127df565b915091508380156121d4575060028751115b8015612256575060c9546040516331a9108f60e11b8152600481018390526001600160a01b038a8116921690636352211e90602401602060405180830381865afa158015612226573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061224a919061429a565b6001600160a01b031614155b156122b65760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b606482015260840161095e565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa1580156122ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123239190614024565b80156123a2575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa158015612373573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612397919061429a565b6001600160a01b0316145b156124165760c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be06906123df908b908b908b908b908b9060040161430c565b600060405180830381600087803b1580156123f957600080fd5b505af115801561240d573d6000803e3d6000fd5b5050505061257e565b61241f82613084565b612428876130e3565b8015612435575086516002145b156125135760ca5487516001600160a01b039091169063c36c2125908a908a90600090612464576124646140af565b602090810291909101015160cc546040516001600160e01b031960e086901b16815261249e9392916001600160a01b03169060040161436b565b600060405180830381600087803b1580156124b857600080fd5b505af11580156124cc573d6000803e3d6000fd5b5050505060008651111561250e5760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae74906123df908990899087906004016143a0565b61257e565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b79061254b908b908b908b908b908b9060040161430c565b600060405180830381600087803b15801561256557600080fd5b505af1158015612579573d6000803e3d6000fd5b505050505b509695505050505050565b6109d481612595612068565b61313d565b6125a48282611088565b610a615760008281526097602090815260408083206001600160a01b03851684529091529020805460ff191660011790556125dd612068565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612629612068565b6001600160a01b03166126446033546001600160a01b031690565b6001600160a01b031614610a755760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161095e565b6109d4600080516020614634833981519152826119a6565b6126bc8282611088565b15610a615760008281526097602090815260408083206001600160a01b03851684529091529020805460ff191690556126f3612068565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b61273f610b17565b6127825760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b604482015260640161095e565b600080516020614614833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6127c2612068565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b8015612814578291506128008285610d7860018561409c565b92508061280c816143d6565b9150506127e7565b50915091565b6000815160000361286d5760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d5054590000000000604482015260640161095e565b828260405160200161287f919061417b565b604051602081830303815290604052805190602001206040516020016128af929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b6109d460008051602061463483398151915282612e91565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b612940610b17565b1561295d5760405162461bcd60e51b815260040161095e90613f30565b600080516020614614833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586127c2612068565b60006129ad60008361281a565b600081815260cd602052604090209091506129c88382614433565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980836040516129f99190613b5f565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015612a4a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a6e9190614024565b610a615760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c609061118f90849086906004016144f2565b600054610100900460ff16612acb5760405162461bcd60e51b815260040161095e90614513565b610a75612ad6612068565b6128e6565b600054610100900460ff16612b025760405162461bcd60e51b815260040161095e90614513565b610a756000612b0f612068565b612e91565b600054610100900460ff1661137a5760405162461bcd60e51b815260040161095e90614513565b600054610100900460ff16612b625760405162461bcd60e51b815260040161095e90614513565b600080516020614614833981519152805460ff19169055565b6000612b8f612b8a8789613f5a565b6127df565b506040516bffffffffffffffffffffffff1930606090811b821660208401524660348401528b811b82166054840152606883018490526001600160c01b031960c08a901b1660888401526090830188905286901b1660b0820152909150600090612c6b908490612c659060c401604051602081830303815290604052805190602001206040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b906131a1565b9050612c76816111c5565b612cce5760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a205349474e45525f49535f4e4f545f4d49604482015263272a22a960e11b606482015260840161095e565b42866001600160401b031611612d305760405162461bcd60e51b815260206004820152602160248201527f4d696e74696e674d616e616765723a20455850495245445f5349474e415455526044820152604560f81b606482015260840161095e565b505050505050505050565b6000612d808a612d4b8a8c613f5a565b612d55898b613f5a565b612d5f888a613f5a565b8e6001600160a01b0316612d71612068565b6001600160a01b0316146121b4565b9050896001600160a01b0316612d94612068565b6001600160a01b0316827fa545b6fd3355e8d57f8c8147bafe740545bd3ea1f94bef2576a6d532a7c3b6058686604051612de19291909182526001600160a01b0316602082015260400190565b60405180910390a450505050505050505050565b600081815260cd602052604081208054829190612e1190614260565b9050119050919050565b612e23612621565b6001600160a01b038116612e885760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161095e565b6109d4816128e6565b610a61828261259a565b60408051808201909152600080825260208201526040518060400160405280838152602001848660200151612ed0919061455e565b9052949350505050565b60008151600003612eed57506000919050565b60208201805160f81c60308110801590612f0b575060398160ff1611155b158015612f2d575060618160ff1610158015612f2b5750607a8160ff1611155b155b15612f3c575060009392505050565b83516001811115612faa57612f5e83612f5660018461409c565b015160f81c90565b915060308260ff1610158015612f78575060398260ff1611155b158015612f9a575060618260ff1610158015612f985750607a8260ff1611155b155b15612faa57506000949350505050565b60015b612fb860018361409c565b811015613032578381015160f81c9250602d8314801590612fee575060308360ff1610158015612fec575060398360ff1611155b155b801561300f575060618360ff161015801561300d5750607a8360ff1611155b155b156130205750600095945050505050565b8061302a816140c5565b915050612fad565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b0316330361307f575060331936013560601c90565b503390565b61308d816112ea565b156130da5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b4544000000604482015260640161095e565b6109d4816131c5565b6000806130fa60008460018651610d78919061409c565b60ca549091506001600160a01b0316158015906131365750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6131478282611088565b610a615761315f816001600160a01b03166014613249565b61316a836020613249565b60405160200161317b929190614571565b60408051601f198184030181529082905262461bcd60e51b825261095e91600401613b5f565b60008060006131b085856133e4565b915091506131bd81613429565b509392505050565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260019061320490606001611325565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b606060006132588360026145e6565b61326390600261455e565b6001600160401b0381111561327a5761327a61396c565b6040519080825280601f01601f1916602001820160405280156132a4576020820181803683370190505b509050600360fc1b816000815181106132bf576132bf6140af565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106132ee576132ee6140af565b60200101906001600160f81b031916908160001a90535060006133128460026145e6565b61331d90600161455e565b90505b6001811115613395576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110613351576133516140af565b1a60f81b828281518110613367576133676140af565b60200101906001600160f81b031916908160001a90535060049490941c9361338e816143d6565b9050613320565b5083156131365760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161095e565b600080825160410361341a5760208301516040840151606085015160001a61340e878285856135df565b94509450505050613422565b506000905060025b9250929050565b600081600481111561343d5761343d6145fd565b036134455750565b6001816004811115613459576134596145fd565b036134a65760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015260640161095e565b60028160048111156134ba576134ba6145fd565b036135075760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015260640161095e565b600381600481111561351b5761351b6145fd565b036135735760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b606482015260840161095e565b6004816004811115613587576135876145fd565b036109d45760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b606482015260840161095e565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561361657506000905060036136c3565b8460ff16601b1415801561362e57508460ff16601c14155b1561363f57506000905060046136c3565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613693573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166136bc576000600192509250506136c3565b9150600090505b94509492505050565b5080546136d890614260565b6000825580601f106136e8575050565b601f0160209004906000526020600020908101906109d491905b808211156137165760008155600101613702565b5090565b60006020828403121561372c57600080fd5b81356001600160e01b03198116811461313657600080fd5b60006020828403121561375657600080fd5b5035919050565b60008083601f84011261376f57600080fd5b5081356001600160401b0381111561378657600080fd5b60208301915083602082850101111561342257600080fd5b6000806000604084860312156137b357600080fd5b8335925060208401356001600160401b038111156137d057600080fd5b6137dc8682870161375d565b9497909650939450505050565b6001600160a01b03811681146109d457600080fd5b8035613809816137e9565b919050565b6000806040838503121561382157600080fd5b823591506020830135613833816137e9565b809150509250929050565b60006020828403121561385057600080fd5b8135613136816137e9565b60008083601f84011261386d57600080fd5b5081356001600160401b0381111561388457600080fd5b6020830191508360208260051b850101111561342257600080fd5b80151581146109d457600080fd5b60008060008060008060008060a0898b0312156138c957600080fd5b88356138d4816137e9565b975060208901356001600160401b03808211156138f057600080fd5b6138fc8c838d0161385b565b909950975060408b013591508082111561391557600080fd5b6139218c838d0161385b565b909750955060608b013591508082111561393a57600080fd5b506139478b828c0161385b565b909450925050608089013561395b8161389f565b809150509295985092959890939650565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b03811182821017156139aa576139aa61396c565b604052919050565b60006001600160401b038211156139cb576139cb61396c565b5060051b60200190565b600060208083850312156139e857600080fd5b82356001600160401b038111156139fe57600080fd5b8301601f81018513613a0f57600080fd5b8035613a22613a1d826139b2565b613982565b81815260059190911b82018301908381019087831115613a4157600080fd5b928401925b82841015613a68578335613a59816137e9565b82529284019290840190613a46565b979650505050505050565b60008060008060608587031215613a8957600080fd5b8435613a94816137e9565b93506020850135925060408501356001600160401b03811115613ab657600080fd5b613ac28782880161375d565b95989497509550505050565b60008060208385031215613ae157600080fd5b82356001600160401b03811115613af757600080fd5b613b038582860161375d565b90969095509350505050565b60005b83811015613b2a578181015183820152602001613b12565b50506000910152565b60008151808452613b4b816020860160208601613b0f565b601f01601f19169290920160200192915050565b6020815260006131366020830184613b33565b60008060208385031215613b8557600080fd5b82356001600160401b03811115613b9b57600080fd5b613b038582860161385b565b60008060008060008060c08789031215613bc057600080fd5b8635613bcb816137e9565b95506020870135613bdb816137e9565b94506040870135613beb816137e9565b93506060870135613bfb816137e9565b92506080870135613c0b816137e9565b915060a0870135613c1b816137e9565b809150509295509295509295565b60008060008060008060008060a0898b031215613c4557600080fd5b8835613c50816137e9565b97506020890135965060408901356001600160401b0380821115613c7357600080fd5b613c7f8c838d0161375d565b909850965060608b0135915080821115613c9857600080fd5b613ca48c838d0161385b565b909650945060808b0135915080821115613cbd57600080fd5b50613cca8b828c0161385b565b999c989b5096995094979396929594505050565b80356001600160401b038116811461380957600080fd5b600080600080600080600080600080600060e08c8e031215613d1657600080fd5b613d1f8c6137fe565b9a506001600160401b038060208e01351115613d3a57600080fd5b613d4a8e60208f01358f0161385b565b909b50995060408d0135811015613d6057600080fd5b613d708e60408f01358f0161385b565b909950975060608d0135811015613d8657600080fd5b613d968e60608f01358f0161385b565b9097509550613da760808e01613cde565b945060a08d013593508060c08e01351115613dc157600080fd5b50613dd28d60c08e01358e0161375d565b81935080925050509295989b509295989b9093969950565b6000806000806000806000806000806000806101008d8f031215613e0d57600080fd5b613e168d6137fe565b9b506001600160401b0360208e01351115613e3057600080fd5b613e408e60208f01358f0161385b565b909b5099506001600160401b0360408e01351115613e5d57600080fd5b613e6d8e60408f01358f0161385b565b90995097506001600160401b0360608e01351115613e8a57600080fd5b613e9a8e60608f01358f0161385b565b9097509550613eab60808e01613cde565b9450613eb960a08e016137fe565b935060c08d013592506001600160401b0360e08e01351115613eda57600080fd5b613eea8e60e08f01358f0161375d565b81935080925050509295989b509295989b509295989b565b60008060408385031215613f1557600080fd5b8235613f20816137e9565b91506020830135613833816137e9565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b6000613f68613a1d846139b2565b80848252602080830192508560051b850136811115613f8657600080fd5b855b818110156140185780356001600160401b0380821115613fa85760008081fd5b90880190601f3681840112613fbd5760008081fd5b823582811115613fcf57613fcf61396c565b613fe0818301601f19168801613982565b92508083523687828601011115613ff957600091508182fd5b8087850188850137600090830187015250865250938201938201613f88565b50919695505050505050565b60006020828403121561403657600080fd5b81516131368161389f565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b818103818111156108ef576108ef614086565b634e487b7160e01b600052603260045260246000fd5b6000600182016140d7576140d7614086565b5060010190565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b6020808252810182905260006001600160fb1b0383111561416257600080fd5b8260051b80856040850137919091016040019392505050565b6000825161418d818460208701613b0f565b9190910192915050565b60208082526026908201527f4d696e74696e674d616e616765723a20535542444f4d41494e535f4e4f545f41604082015265131313d5d15160d21b606082015260800190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b60006020828403121561423157600080fd5b5051919050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c9082168061427457607f821691505b60208210810361429457634e487b7160e01b600052602260045260246000fd5b50919050565b6000602082840312156142ac57600080fd5b8151613136816137e9565b600081518084526020808501808196508360051b8101915082860160005b858110156142ff5782840389526142ed848351613b33565b988501989350908401906001016142d5565b5091979650505050505050565b6001600160a01b038616815260a060208201819052600090614330908301876142b7565b828103604084015261434281876142b7565b9050828103606084015261435681866142b7565b91505082151560808301529695505050505050565b600060018060a01b0380861683526060602084015261438d6060840186613b33565b9150808416604084015250949350505050565b6060815260006143b360608301866142b7565b82810360208401526143c581866142b7565b915050826040830152949350505050565b6000816143e5576143e5614086565b506000190190565b601f8211156109be57600081815260208120601f850160051c810160208610156144145750805b601f850160051c820191505b818110156111bd57828155600101614420565b81516001600160401b0381111561444c5761444c61396c565b6144608161445a8454614260565b846143ed565b602080601f831160018114614495576000841561447d5750858301515b600019600386901b1c1916600185901b1785556111bd565b600085815260208120601f198616915b828110156144c4578886015182559484019460019091019084016144a5565b50858210156144e25787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b82815260406020820152600061450b6040830184613b33565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b808201808211156108ef576108ef614086565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516145a9816017850160208801613b0f565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516145da816028840160208801613b0f565b01602801949350505050565b80820281158282048414176108ef576108ef614086565b634e487b7160e01b600052602160045260246000fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
