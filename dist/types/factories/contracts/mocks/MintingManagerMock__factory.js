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
const _bytecode = "0x608060405234801561001057600080fd5b50614540806100206000396000f3fe6080604052600436106102725760003560e01c806391d148541161014f578063b9998a24116100c1578063d7db74c71161007a578063d7db74c7146107a3578063ec527389146107b6578063f2fde38b146107d6578063f5243bc4146107f6578063f940e38514610816578063ffa1ad741461083657600080fd5b8063b9998a24146106e1578063cc2a9a5b14610701578063cc2c3fc414610721578063d1f5692c14610741578063d539139314610761578063d547741f1461078357600080fd5b8063a3a3f7f611610113578063a3a3f7f6146105f4578063a3f4df7e14610614578063a849d65c14610661578063aa271e1a14610681578063ae31844a146106a1578063b0aa98c7146106c157600080fd5b806391d148541461056a578063983b2d561461058a57806398650275146105aa57806399e0dd7c146105bf578063a217fddf146105df57600080fd5b80635b6fa8db116101e8578063634486da116101ac578063634486da146104dc578063715018a6146104ef57806371e2a6571461050457806381c81d35146105245780638456cb59146105375780638da5cb5b1461054c57600080fd5b80635b6fa8db146104475780635c975abb146104675780635cd7e3b31461047c5780635e22cd861461049c5780635fc1964f146104bc57600080fd5b80633092afd51161023a5780633092afd51461034c57806336568abe1461036c5780633f41b6141461038c5780633f4ba83a146103c457806351cff8d9146103d9578063572b6c05146103f957600080fd5b806301ffc9a7146102775780631edb948e146102ac57806320c5429b146102ce578063248a9ca3146102ee5780632f2ff15d1461032c575b600080fd5b34801561028357600080fd5b50610297610292366004613510565b610867565b60405190151581526020015b60405180910390f35b3480156102b857600080fd5b506102cc6102c736600461355f565b61089e565b005b3480156102da57600080fd5b506102cc6102e936600461358b565b610a47565b3480156102fa57600080fd5b5061031e61030936600461358b565b60009081526097602052604090206001015490565b6040519081526020016102a3565b34801561033857600080fd5b506102cc6103473660046135c4565b610b6a565b34801561035857600080fd5b506102cc6103673660046135f4565b610b94565b34801561037857600080fd5b506102cc6103873660046135c4565b610ba8565b34801561039857600080fd5b5060c9546103ac906001600160a01b031681565b6040516001600160a01b0390911681526020016102a3565b3480156103d057600080fd5b506102cc610c36565b3480156103e557600080fd5b506102cc6103f43660046135f4565b610c48565b34801561040557600080fd5b506102976104143660046135f4565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561045357600080fd5b5060cc546103ac906001600160a01b031681565b34801561047357600080fd5b50610297610ce8565b34801561048857600080fd5b506102cc610497366004613663565b610cfe565b3480156104a857600080fd5b506102cc6104b7366004613722565b610e9e565b3480156104c857600080fd5b506102cc6104d736600461385c565b611023565b6102cc6104ea3660046135f4565b61106b565b3480156104fb57600080fd5b506102cc61112e565b34801561051057600080fd5b506102cc61051f36600461385c565b611140565b6102cc6105323660046135f4565b611188565b34801561054357600080fd5b506102cc611205565b34801561055857600080fd5b506033546001600160a01b03166103ac565b34801561057657600080fd5b506102976105853660046135c4565b611215565b34801561059657600080fd5b506102cc6105a53660046135f4565b611240565b3480156105b657600080fd5b506102cc611251565b3480156105cb57600080fd5b506102cc6105da366004613930565b61126b565b3480156105eb57600080fd5b5061031e600081565b34801561060057600080fd5b506102cc61060f366004613971565b611352565b34801561062057600080fd5b50610654604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102a39190613a17565b34801561066d57600080fd5b5060cb546103ac906001600160a01b031681565b34801561068d57600080fd5b5061029761069c3660046135f4565b61139b565b3480156106ad57600080fd5b506102cc6106bc366004613a2a565b6113b5565b3480156106cd57600080fd5b506102976106dc36600461358b565b6114c0565b3480156106ed57600080fd5b506102cc6106fc3660046135f4565b61151e565b34801561070d57600080fd5b506102cc61071c366004613a5f565b611563565b34801561072d57600080fd5b5060ca546103ac906001600160a01b031681565b34801561074d57600080fd5b506102cc61075c366004613a2a565b6116e8565b34801561076d57600080fd5b5061031e60008051602061451483398151915281565b34801561078f57600080fd5b506102cc61079e3660046135c4565b61179f565b6102cc6107b1366004613ae1565b6117c4565b3480156107c257600080fd5b506102cc6107d136600461358b565b6119f3565b3480156107e257600080fd5b506102cc6107f13660046135f4565b611a65565b34801561080257600080fd5b506102cc610811366004613bd6565b611a81565b34801561082257600080fd5b506102cc610831366004613cee565b611cd0565b34801561084257600080fd5b50610654604051806040016040528060058152602001640302e362e360dc1b81525081565b60006001600160e01b03198216637965db0b60e01b148061089857506301ffc9a760e01b6001600160e01b03198316145b92915050565b6108a961069c611e4c565b6108ce5760405162461bcd60e51b81526004016108c590613d1c565b60405180910390fd5b60c95460405163baef73e960e01b8152600481018390526000916001600160a01b03169063baef73e990602401602060405180830381865afa158015610918573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061093c9190613d51565b9050806001600160401b03166000036109675760405162461bcd60e51b81526004016108c590613d6e565b806001600160401b0316836001600160401b0316116109d45760405162461bcd60e51b815260206004820152602360248201527f4d696e74696e674d616e616765723a204558504952595f4e4f545f455854454e60448201526211115160ea1b60648201526084016108c5565b60c954604051631fb9763760e11b81526001600160401b0385166004820152602481018490526001600160a01b0390911690633f72ec6e906044015b600060405180830381600087803b158015610a2a57600080fd5b505af1158015610a3e573d6000803e3d6000fd5b50505050505050565b610a5261069c611e4c565b610a6e5760405162461bcd60e51b81526004016108c590613d1c565b60c95460405163baef73e960e01b8152600481018390526001600160a01b039091169063baef73e990602401602060405180830381865afa158015610ab7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610adb9190613d51565b6001600160401b0316600003610b035760405162461bcd60e51b81526004016108c590613d6e565b60c954604051637eee288d60e01b8152306004820152602481018390526001600160a01b0390911690637eee288d90604401600060405180830381600087803b158015610b4f57600080fd5b505af1158015610b63573d6000803e3d6000fd5b5050505050565b600082815260976020526040902060010154610b8581611e5b565b610b8f8383611e6c565b505050565b610b9c611ef3565b610ba581611f6c565b50565b610bb0611e4c565b6001600160a01b0316816001600160a01b031614610c285760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016108c5565b610c328282611f84565b5050565b610c3e611ef3565b610c46612009565b565b610c50611ef3565b6001600160a01b038116610c6357600080fd5b60405147906001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610c9b573d6000803e3d6000fd5b50604080516001600160a01b03841681526020810183905260008183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a15050565b6000805160206144f48339815191525460ff1690565b610d0961069c611e4c565b610d255760405162461bcd60e51b81526004016108c590613db1565b610d2f8688613df5565b60008151600214610d525760405162461bcd60e51b81526004016108c590613ebf565b6000610d5d836120b1565b915050610d6981612109565b610d855760405162461bcd60e51b81526004016108c590613f05565b600081815260cf602052604090205460ff1615156001600160401b038316151514610dc25760405162461bcd60e51b81526004016108c590613f47565b610de583600081518110610dd857610dd8613f8d565b602002602001015161212f565b610e015760405162461bcd60e51b81526004016108c590613fa3565b610e2483600081518110610e1757610e17613f8d565b6020026020010151612293565b15610e415760405162461bcd60e51b81526004016108c590613fda565b610e49610ce8565b15610e665760405162461bcd60e51b81526004016108c590614020565b610e908b610e748b8d613df5565b610e7e8a8c613df5565b610e88898b613df5565b60008961231d565b505050505050505050505050565b610ea961069c611e4c565b610ec55760405162461bcd60e51b81526004016108c590613db1565b610ecf8789613df5565b828151600214610ef15760405162461bcd60e51b81526004016108c590613ebf565b6000610efc836120b1565b915050610f0881612109565b610f245760405162461bcd60e51b81526004016108c590613f05565b600081815260cf602052604090205460ff1615156001600160401b038316151514610f615760405162461bcd60e51b81526004016108c590613f47565b610f7783600081518110610dd857610dd8613f8d565b610f935760405162461bcd60e51b81526004016108c590613fa3565b610fa983600081518110610e1757610e17613f8d565b15610fc65760405162461bcd60e51b81526004016108c590613fda565b610fce610ce8565b15610feb5760405162461bcd60e51b81526004016108c590614020565b6110148c610ff98c8e613df5565b6110038b8d613df5565b61100d8a8c613df5565b898961231d565b50505050505050505050505050565b61102b611ef3565b60005b8151811015610c325761105982828151811061104c5761104c613f8d565b6020026020010151611f6c565b8061106381614060565b91505061102e565b61107661069c611e4c565b6110925760405162461bcd60e51b81526004016108c590613d1c565b6001600160a01b0381166110e85760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108c5565b6110f18161277c565b6110f9611251565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610c32573d6000803e3d6000fd5b611136611ef3565b610c466000612794565b611148611ef3565b60005b8151811015610c325761117682828151811061116957611169613f8d565b602002602001015161277c565b8061118081614060565b91505061114b565b61119361069c611e4c565b6111af5760405162461bcd60e51b81526004016108c590613d1c565b6001600160a01b0381166110f15760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108c5565b61120d611ef3565b610c466127e6565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b611248611ef3565b610ba58161277c565b610c46600080516020614514833981519152610387611e4c565b611273611ef3565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906112a59085908590600401614079565b600060405180830381600087803b1580156112bf57600080fd5b505af11580156112d3573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610c3290505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061131c9085908590600401614079565b600060405180830381600087803b15801561133657600080fd5b505af115801561134a573d6000803e3d6000fd5b505050505050565b61135a611ef3565b610b8f83838080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525085925061284e915050565b600061089860008051602061451483398151915283611215565b6113c061069c611e4c565b6113dc5760405162461bcd60e51b81526004016108c590613d1c565b60c9546040516000916001600160a01b0316906113ff90859085906024016140a8565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b1790525161143491906140e1565b6000604051808303816000865af19150503d8060008114611471576040519150601f19603f3d011682016040523d82523d6000602084013e611476565b606091505b5050905080610b8f5760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b60448201526064016108c5565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611514906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b611526611ef3565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b600054610100900460ff16158080156115835750600054600160ff909116105b8061159d5750303b15801561159d575060005460ff166001145b6116005760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016108c5565b6000805460ff191660011790558015611623576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce805490911691851691909117905561168161296e565b6116896129a5565b611692826129de565b61169a612a05565b8015610a3e576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b6116f0611ef3565b60005b81811015610b8f5760c9546001600160a01b0316635096023984848481811061171e5761171e613f8d565b905060200201602081019061173391906135f4565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561177457600080fd5b505af1158015611788573d6000803e3d6000fd5b50505050808061179790614060565b9150506116f3565b6000828152609760205260409020600101546117ba81611e5b565b610b8f8383611f84565b6117ce898b613df5565b600081516002146117f15760405162461bcd60e51b81526004016108c590613ebf565b60006117fc836120b1565b91505061180881612109565b6118245760405162461bcd60e51b81526004016108c590613f05565b600081815260cf602052604090205460ff1615156001600160401b0383161515146118615760405162461bcd60e51b81526004016108c590613f47565b61187783600081518110610dd857610dd8613f8d565b6118935760405162461bcd60e51b81526004016108c590613fa3565b6118a983600081518110610e1757610e17613f8d565b156118c65760405162461bcd60e51b81526004016108c590613fda565b6118ce610ce8565b156118eb5760405162461bcd60e51b81526004016108c590614020565b6119318e8e8e8a8a60008b8b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612a4592505050565b853410156119815760405162461bcd60e51b815260206004820181905260248201527f4d696e74696e674d616e616765723a204e4f545f454e4f5547485f46554e445360448201526064016108c5565b6119938e8e8e8e8e8e8e8d6000612c05565b853411156119e3576119a3611e4c565b6001600160a01b03166108fc6119b988346140fd565b6040518115909202916000818181858888f193505050501580156119e1573d6000803e3d6000fd5b505b5050505050505050505050505050565b6119fb611ef3565b611a0481612109565b611a205760405162461bcd60e51b81526004016108c590613f05565b600081815260cd60205260408120611a37916134c2565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611a6d611ef3565b611a7681612cc1565b610ba5600082612d37565b611a8b8a8c613df5565b60008151600214611aae5760405162461bcd60e51b81526004016108c590613ebf565b6000611ab9836120b1565b915050611ac581612109565b611ae15760405162461bcd60e51b81526004016108c590613f05565b600081815260cf602052604090205460ff1615156001600160401b038316151514611b1e5760405162461bcd60e51b81526004016108c590613f47565b611b3483600081518110610dd857610dd8613f8d565b611b505760405162461bcd60e51b81526004016108c590613fa3565b611b6683600081518110610e1757610e17613f8d565b15611b835760405162461bcd60e51b81526004016108c590613fda565b611b8b610ce8565b15611ba85760405162461bcd60e51b81526004016108c590614020565b611bed8f8f8f8b8a8c8b8b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612a4592505050565b866001600160a01b03166323b872dd611c04611e4c565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018990526064016020604051808303816000875af1158015611c57573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c7b9190614110565b611cbf5760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b60448201526064016108c5565b6119e18f8f8f8f8f8f8f8d8f612c05565b611cd8611ef3565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa158015611d1f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d43919061412d565b60405163a9059cbb60e01b81526001600160a01b038481166004830152602482018390529192509084169063a9059cbb906044016020604051808303816000875af1158015611d96573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611dba9190614110565b611dfe5760405162461bcd60e51b8152602060048201526015602482015274115490cc8c0e881313d5d7d31155915317d1905253605a1b60448201526064016108c5565b604080516001600160a01b0384811682526020820184905285168183015290517e1a143d5b175701cb3246058ffac3d63945192075a926ff73a19930f09d587a9181900360600190a1505050565b6000611e56612d41565b905090565b610ba581611e67611e4c565b612d87565b611e768282611215565b610c325760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611eaf611e4c565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611efb611e4c565b6001600160a01b0316611f166033546001600160a01b031690565b6001600160a01b031614610c465760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016108c5565b610ba56000805160206145148339815191528261179f565b611f8e8282611215565b15610c325760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055611fc5611e4c565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b612011610ce8565b6120545760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b60448201526064016108c5565b6000805160206144f4833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa612094611e4c565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b8015612103578291506120ef82856120d26001856140fd565b815181106120e2576120e2613f8d565b6020026020010151612deb565b9250806120fb81614146565b9150506120b9565b50915091565b600081815260cd6020526040812080548291906121259061415d565b9050119050919050565b6000815160000361214257506000919050565b60208201805160f81c60308110801590612160575060398160ff1611155b158015612182575060618160ff16101580156121805750607a8160ff1611155b155b15612191575060009392505050565b835160018111156121ff576121b3836121ab6001846140fd565b015160f81c90565b915060308260ff16101580156121cd575060398260ff1611155b1580156121ef575060618260ff16101580156121ed5750607a8260ff1611155b155b156121ff57506000949350505050565b60015b61220d6001836140fd565b811015612287578381015160f81c9250602d8314801590612243575060308360ff1610158015612241575060398360ff1611155b155b8015612264575060618360ff16101580156122625750607a8360ff1611155b155b156122755750600095945050505050565b8061227f81614060565b915050612202565b50600195945050505050565b6000806122c78360408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115612317576122f26122e6826000600a612e9f565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b81491505b50919050565b600080612329876120b1565b5060c954604051634f558e7960e01b8152600481018390529192506001600160a01b031690634f558e7990602401602060405180830381865afa158015612374573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123989190614110565b8015612489575060c9546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e90602401602060405180830381865afa1580156123e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061240c9190614191565b6001600160a01b03161480612489575060c95460405163d9548e5360e01b8152600481018390526001600160a01b039091169063d9548e5390602401602060405180830381865afa158015612465573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124899190614110565b1561257a576001600160401b0384161561250b5760c954604051631fb9763760e11b81526001600160401b0386166004820152602481018390526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b1580156124f257600080fd5b505af1158015612506573d6000803e3d6000fd5b505050505b60c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690612543908b908b908b908b908a90600401614203565b600060405180830381600087803b15801561255d57600080fd5b505af1158015612571573d6000803e3d6000fd5b50505050612771565b61258381612ede565b61258c87612f3d565b8015612599575086516002145b80156125ac57506001600160401b038416155b1561268a5760ca5487516001600160a01b039091169063c36c2125908a908a906000906125db576125db613f8d565b602090810291909101015160cc546040516001600160e01b031960e086901b1681526126159392916001600160a01b031690600401614262565b600060405180830381600087803b15801561262f57600080fd5b505af1158015612643573d6000803e3d6000fd5b505050506000865111156126855760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae749061254390899089908690600401614297565b612771565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b7906126c2908b908b908b908b908a90600401614203565b600060405180830381600087803b1580156126dc57600080fd5b505af11580156126f0573d6000803e3d6000fd5b505050506001600160401b038416156127715760c954604051631fb9763760e11b81526001600160401b0386166004820152602481018390526001600160a01b0390911690633f72ec6e90604401600060405180830381600087803b15801561275857600080fd5b505af115801561276c573d6000803e3d6000fd5b505050505b979650505050505050565b610ba560008051602061451483398151915282612d37565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6127ee610ce8565b1561280b5760405162461bcd60e51b81526004016108c590614020565b6000805160206144f4833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612094611e4c565b600061285b600084612deb565b600081815260cd602052604090209091506128768482614313565b50600081815260cf602052604090819020805460ff19168415151790555181907f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980906128c3908690613a17565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015612914573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129389190614110565b610b8f5760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c6090610a1090849087906004016143d2565b600054610100900460ff166129955760405162461bcd60e51b81526004016108c5906143f3565b610c466129a0611e4c565b612794565b600054610100900460ff166129cc5760405162461bcd60e51b81526004016108c5906143f3565b610c4660006129d9611e4c565b612d37565b600054610100900460ff166115265760405162461bcd60e51b81526004016108c5906143f3565b600054610100900460ff16612a2c5760405162461bcd60e51b81526004016108c5906143f3565b6000805160206144f4833981519152805460ff19169055565b6000612a59612a548789613df5565b6120b1565b506040516bffffffffffffffffffffffff1930606090811b821660208401524660348401528b811b82166054840152606883018490526001600160c01b031960c08a901b1660888401526090830188905286901b1660b0820152909150600090612b35908490612b2f9060c401604051602081830303815290604052805190602001206040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b90612f97565b9050612b408161139b565b612b985760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a205349474e45525f49535f4e4f545f4d49604482015263272a22a960e11b60648201526084016108c5565b42866001600160401b031611612bfa5760405162461bcd60e51b815260206004820152602160248201527f4d696e74696e674d616e616765723a20455850495245445f5349474e415455526044820152604560f81b60648201526084016108c5565b505050505050505050565b6000612c4c8a612c158a8c613df5565b612c1f898b613df5565b612c29888a613df5565b60008f6001600160a01b0316612c3d611e4c565b6001600160a01b03161461231d565b9050896001600160a01b0316612c60611e4c565b6001600160a01b0316827fa545b6fd3355e8d57f8c8147bafe740545bd3ea1f94bef2576a6d532a7c3b6058686604051612cad9291909182526001600160a01b0316602082015260400190565b60405180910390a450505050505050505050565b612cc9611ef3565b6001600160a01b038116612d2e5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016108c5565b610ba581612794565b610c328282611e6c565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b03163303612d82575060331936013560601c90565b503390565b612d918282611215565b610c3257612da9816001600160a01b03166014612fbb565b612db4836020612fbb565b604051602001612dc592919061443e565b60408051601f198184030181529082905262461bcd60e51b82526108c591600401613a17565b60008151600003612e3e5760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d505459000000000060448201526064016108c5565b8282604051602001612e5091906140e1565b60405160208183030381529060405280519060200120604051602001612e80929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b60408051808201909152600080825260208201526040518060400160405280838152602001848660200151612ed491906144b3565b9052949350505050565b612ee7816114c0565b15612f345760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b454400000060448201526064016108c5565b610ba581613156565b600080612f54600084600186516120d291906140fd565b60ca549091506001600160a01b031615801590612f905750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6000806000612fa685856131da565b91509150612fb38161321f565b509392505050565b60606000612fca8360026144c6565b612fd59060026144b3565b6001600160401b03811115612fec57612fec6137f3565b6040519080825280601f01601f191660200182016040528015613016576020820181803683370190505b509050600360fc1b8160008151811061303157613031613f8d565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061306057613060613f8d565b60200101906001600160f81b031916908160001a90535060006130848460026144c6565b61308f9060016144b3565b90505b6001811115613107576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106130c3576130c3613f8d565b1a60f81b8282815181106130d9576130d9613f8d565b60200101906001600160f81b031916908160001a90535060049490941c9361310081614146565b9050613092565b508315612f905760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016108c5565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600190613195906060016114fb565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b60008082516041036132105760208301516040840151606085015160001a613204878285856133d5565b94509450505050613218565b506000905060025b9250929050565b6000816004811115613233576132336144dd565b0361323b5750565b600181600481111561324f5761324f6144dd565b0361329c5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016108c5565b60028160048111156132b0576132b06144dd565b036132fd5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016108c5565b6003816004811115613311576133116144dd565b036133695760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016108c5565b600481600481111561337d5761337d6144dd565b03610ba55760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b60648201526084016108c5565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561340c57506000905060036134b9565b8460ff16601b1415801561342457508460ff16601c14155b1561343557506000905060046134b9565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613489573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166134b2576000600192509250506134b9565b9150600090505b94509492505050565b5080546134ce9061415d565b6000825580601f106134de575050565b601f016020900490600052602060002090810190610ba591905b8082111561350c57600081556001016134f8565b5090565b60006020828403121561352257600080fd5b81356001600160e01b031981168114612f9057600080fd5b6001600160401b0381168114610ba557600080fd5b803561355a8161353a565b919050565b6000806040838503121561357257600080fd5b823561357d8161353a565b946020939093013593505050565b60006020828403121561359d57600080fd5b5035919050565b6001600160a01b0381168114610ba557600080fd5b803561355a816135a4565b600080604083850312156135d757600080fd5b8235915060208301356135e9816135a4565b809150509250929050565b60006020828403121561360657600080fd5b8135612f90816135a4565b60008083601f84011261362357600080fd5b5081356001600160401b0381111561363a57600080fd5b6020830191508360208260051b850101111561321857600080fd5b8015158114610ba557600080fd5b60008060008060008060008060a0898b03121561367f57600080fd5b883561368a816135a4565b975060208901356001600160401b03808211156136a657600080fd5b6136b28c838d01613611565b909950975060408b01359150808211156136cb57600080fd5b6136d78c838d01613611565b909750955060608b01359150808211156136f057600080fd5b506136fd8b828c01613611565b909450925050608089013561371181613655565b809150509295985092959890939650565b600080600080600080600080600060c08a8c03121561374057600080fd5b893561374b816135a4565b985060208a01356001600160401b038082111561376757600080fd5b6137738d838e01613611565b909a50985060408c013591508082111561378c57600080fd5b6137988d838e01613611565b909850965060608c01359150808211156137b157600080fd5b506137be8c828d01613611565b90955093505060808a01356137d28161353a565b915060a08a01356137e281613655565b809150509295985092959850929598565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715613831576138316137f3565b604052919050565b60006001600160401b03821115613852576138526137f3565b5060051b60200190565b6000602080838503121561386f57600080fd5b82356001600160401b0381111561388557600080fd5b8301601f8101851361389657600080fd5b80356138a96138a482613839565b613809565b81815260059190911b820183019083810190878311156138c857600080fd5b928401925b828410156127715783356138e0816135a4565b825292840192908401906138cd565b60008083601f84011261390157600080fd5b5081356001600160401b0381111561391857600080fd5b60208301915083602082850101111561321857600080fd5b6000806020838503121561394357600080fd5b82356001600160401b0381111561395957600080fd5b613965858286016138ef565b90969095509350505050565b60008060006040848603121561398657600080fd5b83356001600160401b0381111561399c57600080fd5b6139a8868287016138ef565b90945092505060208401356139bc81613655565b809150509250925092565b60005b838110156139e25781810151838201526020016139ca565b50506000910152565b60008151808452613a038160208601602086016139c7565b601f01601f19169290920160200192915050565b602081526000612f9060208301846139eb565b60008060208385031215613a3d57600080fd5b82356001600160401b03811115613a5357600080fd5b61396585828601613611565b60008060008060008060c08789031215613a7857600080fd5b8635613a83816135a4565b95506020870135613a93816135a4565b94506040870135613aa3816135a4565b93506060870135613ab3816135a4565b92506080870135613ac3816135a4565b915060a0870135613ad3816135a4565b809150509295509295509295565b600080600080600080600080600080600060e08c8e031215613b0257600080fd5b613b0b8c6135b9565b9a506001600160401b038060208e01351115613b2657600080fd5b613b368e60208f01358f01613611565b909b50995060408d0135811015613b4c57600080fd5b613b5c8e60408f01358f01613611565b909950975060608d0135811015613b7257600080fd5b613b828e60608f01358f01613611565b9097509550613b9360808e0161354f565b945060a08d013593508060c08e01351115613bad57600080fd5b50613bbe8d60c08e01358e016138ef565b81935080925050509295989b509295989b9093969950565b6000806000806000806000806000806000806101008d8f031215613bf957600080fd5b613c028d6135b9565b9b506001600160401b0360208e01351115613c1c57600080fd5b613c2c8e60208f01358f01613611565b909b5099506001600160401b0360408e01351115613c4957600080fd5b613c598e60408f01358f01613611565b90995097506001600160401b0360608e01351115613c7657600080fd5b613c868e60608f01358f01613611565b9097509550613c9760808e0161354f565b9450613ca560a08e016135b9565b935060c08d013592506001600160401b0360e08e01351115613cc657600080fd5b613cd68e60e08f01358f016138ef565b81935080925050509295989b509295989b509295989b565b60008060408385031215613d0157600080fd5b8235613d0c816135a4565b915060208301356135e9816135a4565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b600060208284031215613d6357600080fd5b8151612f908161353a565b60208082526023908201527f4d696e74696e674d616e616765723a20544f4b454e5f4e4f545f455850495241604082015262424c4560e81b606082015260800190565b60208082526024908201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604082015263272a22a960e11b606082015260800190565b6000613e036138a484613839565b80848252602080830192508560051b850136811115613e2157600080fd5b855b81811015613eb35780356001600160401b0380821115613e435760008081fd5b90880190601f3681840112613e585760008081fd5b823582811115613e6a57613e6a6137f3565b613e7b818301601f19168801613809565b92508083523687828601011115613e9457600091508182fd5b8087850188850137600090830187015250865250938201938201613e23565b50919695505050505050565b60208082526026908201527f4d696e74696e674d616e616765723a20535542444f4d41494e535f4e4f545f41604082015265131313d5d15160d21b606082015260800190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b60208082526026908201527f4d696e74696e674d616e616765723a20544c445f455850495241424c455f4d496040820152650a69a82a886960d31b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b6020808252601d908201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c4944000000604082015260600190565b60208082526026908201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860408201526512509255115160d21b606082015260800190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b6000600182016140725761407261404a565b5060010190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b6020808252810182905260006001600160fb1b038311156140c857600080fd5b8260051b80856040850137919091016040019392505050565b600082516140f38184602087016139c7565b9190910192915050565b818103818111156108985761089861404a565b60006020828403121561412257600080fd5b8151612f9081613655565b60006020828403121561413f57600080fd5b5051919050565b6000816141555761415561404a565b506000190190565b600181811c9082168061417157607f821691505b60208210810361231757634e487b7160e01b600052602260045260246000fd5b6000602082840312156141a357600080fd5b8151612f90816135a4565b600081518084526020808501808196508360051b8101915082860160005b858110156141f65782840389526141e48483516139eb565b988501989350908401906001016141cc565b5091979650505050505050565b6001600160a01b038616815260a060208201819052600090614227908301876141ae565b828103604084015261423981876141ae565b9050828103606084015261424d81866141ae565b91505082151560808301529695505050505050565b600060018060a01b0380861683526060602084015261428460608401866139eb565b9150808416604084015250949350505050565b6060815260006142aa60608301866141ae565b82810360208401526142bc81866141ae565b915050826040830152949350505050565b601f821115610b8f57600081815260208120601f850160051c810160208610156142f45750805b601f850160051c820191505b8181101561134a57828155600101614300565b81516001600160401b0381111561432c5761432c6137f3565b6143408161433a845461415d565b846142cd565b602080601f831160018114614375576000841561435d5750858301515b600019600386901b1c1916600185901b17855561134a565b600085815260208120601f198616915b828110156143a457888601518255948401946001909101908401614385565b50858210156143c25787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b8281526040602082015260006143eb60408301846139eb565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516144768160178501602088016139c7565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516144a78160288401602088016139c7565b01602801949350505050565b808201808211156108985761089861404a565b80820281158282048414176108985761089861404a565b634e487b7160e01b600052602160045260246000fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
