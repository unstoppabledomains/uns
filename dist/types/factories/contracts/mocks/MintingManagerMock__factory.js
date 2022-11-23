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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "blocklist",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "to",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "label",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "tld",
                        type: "uint256",
                    },
                ],
                internalType: "struct IMintingManager.BulkSLDIssueRequest[]",
                name: "requests",
                type: "tuple[]",
            },
        ],
        name: "bulkIssue",
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
];
const _bytecode = "0x608060405234801561001057600080fd5b50613a77806100206000396000f3fe6080604052600436106102675760003560e01c806391d1485411610144578063c3a3bc00116100b6578063d53913931161007a578063d539139314610776578063d547741f14610798578063d6ab22ed146107b8578063ec527389146107d8578063f2fde38b146107f8578063ffa1ad741461081857600080fd5b8063c3a3bc00146106d6578063cc2c3fc4146106f6578063ceeb4f5014610716578063d1f5692c14610736578063d4a32ad61461075657600080fd5b8063a3f4df7e11610108578063a3f4df7e146105e9578063a849d65c14610636578063aa271e1a14610656578063ae31844a14610676578063b0aa98c714610696578063b9998a24146106b657600080fd5b806391d148541461055f578063983b2d561461057f578063986502751461059f57806399e0dd7c146105b4578063a217fddf146105d457600080fd5b80635b6fa8db116101dd578063715018a6116101a1578063715018a6146104c457806371e2a657146104d957806381c81d35146104f95780638456cb591461050c5780638da5cb5b14610521578063906cecc11461053f57600080fd5b80635b6fa8db1461043c5780635c975abb1461045c5780635cd7e3b3146104715780635fc1964f14610491578063634486da146104b157600080fd5b80633092afd51161022f5780633092afd51461034157806336568abe146103615780633f41b614146103815780633f4ba83a146103b9578063463c4bcb146103ce578063572b6c05146103ee57600080fd5b806301ffc9a71461026c5780631459457a146102a1578063248a9ca3146102c3578063268b15ed146103015780632f2ff15d14610321575b600080fd5b34801561027857600080fd5b5061028c6102873660046131ce565b610849565b60405190151581526020015b60405180910390f35b3480156102ad57600080fd5b506102c16102bc3660046131f6565b610880565b005b3480156102cf57600080fd5b506102f36102de366004613187565b60009081526097602052604090206001015490565b604051908152602001610298565b34801561030d57600080fd5b506102c161031c366004613299565b610bc9565b34801561032d57600080fd5b506102c161033c36600461319f565b610c5b565b34801561034d57600080fd5b506102c161035c366004612de7565b610c85565b34801561036d57600080fd5b506102c161037c36600461319f565b610c99565b34801561038d57600080fd5b5060c9546103a1906001600160a01b031681565b6040516001600160a01b039091168152602001610298565b3480156103c557600080fd5b506102c1610d27565b3480156103da57600080fd5b506102c16103e9366004613187565b610d39565b3480156103fa57600080fd5b5061028c610409366004612de7565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561044857600080fd5b5060cc546103a1906001600160a01b031681565b34801561046857600080fd5b5061028c610d69565b34801561047d57600080fd5b506102c161048c366004612ec7565b610d7f565b34801561049d57600080fd5b506102c16104ac3660046130cb565b610f79565b6102c16104bf366004612de7565b610fcf565b3480156104d057600080fd5b506102c1611092565b3480156104e557600080fd5b506102c16104f43660046130cb565b6110a4565b6102c1610507366004612de7565b6110fa565b34801561051857600080fd5b506102c1611177565b34801561052d57600080fd5b506033546001600160a01b03166103a1565b34801561054b57600080fd5b506102c161055a366004612f82565b611187565b34801561056b57600080fd5b5061028c61057a36600461319f565b61120d565b34801561058b57600080fd5b506102c161059a366004612de7565b611238565b3480156105ab57600080fd5b506102c1611249565b3480156105c057600080fd5b506102c16105cf366004613266565b611263565b3480156105e057600080fd5b506102f3600081565b3480156105f557600080fd5b50610629604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102989190613587565b34801561064257600080fd5b5060cb546103a1906001600160a01b031681565b34801561066257600080fd5b5061028c610671366004612de7565b611342565b34801561068257600080fd5b506102c161069136600461308c565b61135c565b3480156106a257600080fd5b5061028c6106b1366004613187565b611467565b3480156106c257600080fd5b506102c16106d1366004612de7565b6114c5565b3480156106e257600080fd5b506102c16106f1366004613266565b61150a565b34801561070257600080fd5b5060ca546103a1906001600160a01b031681565b34801561072257600080fd5b506102c1610731366004612fdb565b611551565b34801561074257600080fd5b506102c161075136600461308c565b6115e7565b34801561076257600080fd5b506102c1610771366004612e1f565b6116ac565b34801561078257600080fd5b506102f3600080516020613a4b83398151915281565b3480156107a457600080fd5b506102c16107b336600461319f565b611832565b3480156107c457600080fd5b506102c16107d336600461308c565b611857565b3480156107e457600080fd5b506102c16107f3366004613187565b611ae8565b34801561080457600080fd5b506102c1610813366004612de7565b611b5a565b34801561082457600080fd5b506106296040518060400160405280600581526020016418171a171b60d91b81525081565b60006001600160e01b03198216637965db0b60e01b148061087a57506301ffc9a760e01b6001600160e01b03198316145b92915050565b600054610100900460ff16158080156108a05750600054600160ff909116105b806108ba5750303b1580156108ba575060005460ff166001145b6109225760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff191660011790558015610945576000805461ff0019166101001790555b60c980546001600160a01b038089166001600160a01b03199283161790925560ca805488841690831617905560cb805487841690831617905560cc805492861692909116919091179055610997611b76565b61099f611bad565b6109a882611be6565b6109b0611c0d565b604080516101c081018252600661018082018181526563727970746f60d01b6101a0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b8183015261014084015283518085019094529083526535b632bb32b960d11b9083015261016081019190915260005b600c811015610b7957610b678282600c8110610b5d57634e487b7160e01b600052603260045260246000fd5b6020020151611c4d565b80610b71816139c0565b915050610b31565b50508015610bc1576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050505050565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610c0d9250849150839050611d69565b610c15610d69565b15610c325760405162461bcd60e51b815260040161091990613614565b6060610bc1610c3f611ebf565b610c5288610c4d8989611ece565b611efa565b83846001612027565b600082815260976020526040902060010154610c7681612323565b610c808383612334565b505050565b610c8d6123bb565b610c9681612434565b50565b610ca1611ebf565b6001600160a01b0316816001600160a01b031614610d195760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610919565b610d23828261244c565b5050565b610d2f6123bb565b610d376124d1565b565b610d44610671611ebf565b610d605760405162461bcd60e51b8152600401610919906135df565b610c9681612579565b600080516020613a2b8339815191525460ff1690565b610d898688613879565b805160021415610dbf57610d9e610671611ebf565b610dba5760405162461bcd60e51b81526004016109199061363e565b610e84565b6000610dca826125fd565b60c9549092506001600160a01b0316905063430c2081610de8611ebf565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b158015610e2e57600080fd5b505afa158015610e42573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e66919061316b565b610e825760405162461bcd60e51b81526004016109199061370f565b505b610e8e8789613879565b600281511015610eb05760405162461bcd60e51b81526004016109199061359a565b610f20610ef260008360018551610ec79190613862565b81518110610ee557634e487b7160e01b600052603260045260246000fd5b6020026020010151612638565b82600081518110610f1357634e487b7160e01b600052603260045260246000fd5b6020026020010151611d69565b610f28610d69565b15610f455760405162461bcd60e51b815260040161091990613614565b610f6d8a610f538a8c613879565b610f5d898b613879565b610f67888a613879565b87612027565b50505050505050505050565b610f816123bb565b60005b8151811015610d2357610fbd828281518110610fb057634e487b7160e01b600052603260045260246000fd5b6020026020010151612434565b80610fc7816139c0565b915050610f84565b610fda610671611ebf565b610ff65760405162461bcd60e51b8152600401610919906135df565b6001600160a01b03811661104c5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610919565b611055816126ed565b61105d611249565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610d23573d6000803e3d6000fd5b61109a6123bb565b610d376000612705565b6110ac6123bb565b60005b8151811015610d23576110e88282815181106110db57634e487b7160e01b600052603260045260246000fd5b60200260200101516126ed565b806110f2816139c0565b9150506110af565b611105610671611ebf565b6111215760405162461bcd60e51b8152600401610919906135df565b6001600160a01b0381166110555760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610919565b61117f6123bb565b610d37612757565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506111cb9250849150839050611d69565b6111d3610d69565b156111f05760405162461bcd60e51b815260040161091990613614565b606061120487610c5288610c4d8989611ece565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6112406123bb565b610c96816126ed565b610d37600080516020613a4b83398151915261037c611ebf565b61126b6123bb565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061129d9085908590600401613558565b600060405180830381600087803b1580156112b757600080fd5b505af11580156112cb573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610d2390505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906113149085908590600401613558565b600060405180830381600087803b15801561132e57600080fd5b505af1158015610bc1573d6000803e3d6000fd5b600061087a600080516020613a4b8339815191528361120d565b611367610671611ebf565b6113835760405162461bcd60e51b8152600401610919906135df565b60c9546040516000916001600160a01b0316906113a6908590859060240161351e565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b179052516113db9190613362565b6000604051808303816000865af19150503d8060008114611418576040519150601f19603f3d011682016040523d82523d6000602084013e61141d565b606091505b5050905080610c805760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b6044820152606401610919565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526000906114bb906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b6114cd6123bb565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b6115126123bb565b610d2382828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611c4d92505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506115959250849150839050611d69565b61159d610d69565b156115ba5760405162461bcd60e51b815260040161091990613614565b610f6d8a6115cc8b610c4d8c8c611ece565b6115d6888a613879565b6115e08789613879565b6001612027565b6115ef6123bb565b60005b81811015610c805760c9546001600160a01b0316635096023984848481811061162b57634e487b7160e01b600052603260045260246000fd5b90506020020160208101906116409190612de7565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561168157600080fd5b505af1158015611695573d6000803e3d6000fd5b5050505080806116a4906139c0565b9150506115f2565b6116b68587613879565b8051600214156116ec576116cb610671611ebf565b6116e75760405162461bcd60e51b81526004016109199061363e565b6117b1565b60006116f7826125fd565b60c9549092506001600160a01b0316905063430c2081611715611ebf565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b15801561175b57600080fd5b505afa15801561176f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611793919061316b565b6117af5760405162461bcd60e51b81526004016109199061370f565b505b6117bb8688613879565b6002815110156117dd5760405162461bcd60e51b81526004016109199061359a565b6117f4610ef260008360018551610ec79190613862565b6117fc610d69565b156118195760405162461bcd60e51b815260040161091990613614565b611827896115cc898b613879565b505050505050505050565b60008281526097602052604090206001015461184d81612323565b610c80838361244c565b611862610671611ebf565b61187e5760405162461bcd60e51b8152600401610919906135df565b60005b81811015610c805761193c8383838181106118ac57634e487b7160e01b600052603260045260246000fd5b90506020028101906118be91906137c3565b604001358484848181106118e257634e487b7160e01b600052603260045260246000fd5b90506020028101906118f491906137c3565b61190290602081019061377f565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611d6992505050565b60006119f184848481811061196157634e487b7160e01b600052603260045260246000fd5b905060200281019061197391906137c3565b6040013585858581811061199757634e487b7160e01b600052603260045260246000fd5b90506020028101906119a991906137c3565b6119b790602081019061377f565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611efa92505050565b905060006119fe826125fd565b5060c954604051634f558e7960e01b8152600481018390529192506060916001600160a01b0390911690634f558e799060240160206040518083038186803b158015611a4957600080fd5b505afa158015611a5d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a81919061316b565b611ad257611ad2868686818110611aa857634e487b7160e01b600052603260045260246000fd5b9050602002810190611aba91906137c3565b611ac8906020810190612de7565b8483846000612027565b5050508080611ae0906139c0565b915050611881565b611af06123bb565b611af9816127bf565b611b155760405162461bcd60e51b815260040161091990613682565b600081815260cd60205260408120611b2c91612c8c565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611b626123bb565b611b6b816127e5565b610c9660008261285b565b600054610100900460ff16611b9d5760405162461bcd60e51b8152600401610919906136c4565b610d37611ba8611ebf565b612705565b600054610100900460ff16611bd45760405162461bcd60e51b8152600401610919906136c4565b610d376000611be1611ebf565b61285b565b600054610100900460ff166114cd5760405162461bcd60e51b8152600401610919906136c4565b600054610100900460ff16611c345760405162461bcd60e51b8152600401610919906136c4565b600080516020613a2b833981519152805460ff19169055565b6000611c5a600083612638565b600081815260cd602090815260409091208451929350611c7e929091850190612cc6565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf898083604051611caf9190613587565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e799060240160206040518083038186803b158015611cfb57600080fd5b505afa158015611d0f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d33919061316b565b610d235760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c6090611314908490869060040161375e565b611d72826127bf565b611d8e5760405162461bcd60e51b815260040161091990613682565b6000611dc18260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115611e6a57611dec611de0826000600a612865565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b81415611e6a5760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610919565b611e73826128a4565b610c805760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c49440000006044820152606401610919565b6000611ec9612950565b905090565b60608282604051602001611ee392919061337e565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611f145790505090508281600081518110611f4d57634e487b7160e01b600052603260045260246000fd5b602002602001018190525060cd60008581526020019081526020016000208054611f7690613985565b80601f0160208091040260200160405190810160405280929190818152602001828054611fa290613985565b8015611fef5780601f10611fc457610100808354040283529160200191611fef565b820191906000526020600020905b815481529060010190602001808311611fd257829003601f168201915b50505050508160018151811061201557634e487b7160e01b600052603260045260246000fd5b60209081029190910101529392505050565b6000612032856125fd565b5060c954604051634f558e7960e01b8152600481018390529192506001600160a01b031690634f558e799060240160206040518083038186803b15801561207857600080fd5b505afa15801561208c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120b0919061316b565b801561213e575060c9546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e9060240160206040518083038186803b1580156120fb57600080fd5b505afa15801561210f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121339190612e03565b6001600160a01b0316145b156121b25760c95460405163d106353f60e01b81526001600160a01b039091169063d106353f9061217b90899085908990899089906004016134af565b600060405180830381600087803b15801561219557600080fd5b505af11580156121a9573d6000803e3d6000fd5b50505050610bc1565b6121bb81612997565b6121c4856129ed565b80156121d1575084516002145b156122bd5760ca5485516001600160a01b039091169063c36c2125908890889060009061220e57634e487b7160e01b600052603260045260246000fd5b602090810291909101015160cc546040516001600160e01b031960e086901b1681526122489392916001600160a01b03169060040161347a565b600060405180830381600087803b15801561226257600080fd5b505af1158015612276573d6000803e3d6000fd5b505050506000845111156122b85760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae749061217b908790879086906004016134e8565b610bc1565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b7906122f5908990899089908990899060040161341b565b600060405180830381600087803b15801561230f57600080fd5b505af1158015610f6d573d6000803e3d6000fd5b610c968161232f611ebf565b612a47565b61233e828261120d565b610d235760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612377611ebf565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6123c3611ebf565b6001600160a01b03166123de6033546001600160a01b031690565b6001600160a01b031614610d375760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610919565b610c96600080516020613a4b83398151915282611832565b612456828261120d565b15610d235760008281526097602090815260408083206001600160a01b03851684529091529020805460ff1916905561248d611ebf565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6124d9610d69565b61251c5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610919565b600080516020613a2b833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa61255c611ebf565b6040516001600160a01b03909116815260200160405180910390a1565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526001906125b8906060016114a2565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b805160009081905b80156126325782915061261e8285610ec7600185613862565b92508061262a8161396e565b915050612605565b50915091565b600081516000141561268c5760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610919565b828260405160200161269e9190613362565b604051602081830303815290604052805190602001206040516020016126ce929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610c96600080516020613a4b8339815191528261285b565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b61275f610d69565b1561277c5760405162461bcd60e51b815260040161091990613614565b600080516020613a2b833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861255c611ebf565b600081815260cd6020526040812080548291906127db90613985565b9050119050919050565b6127ed6123bb565b6001600160a01b0381166128525760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610919565b610c9681612705565b610d238282612334565b6040805180820190915260008082526020820152604051806040016040528083815260200184866020015161289a919061382b565b9052949350505050565b60008151600014156128b857506000919050565b6020820160005b83518110156129465760006128d78383015160f81c90565b90508060ff16602d14158015612902575060308160ff1610158015612900575060398160ff1611155b155b8015612923575060618160ff16101580156129215750607a8160ff1611155b155b1561293357506000949350505050565b508061293e816139c0565b9150506128bf565b5060019392505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b0316331415612992575060331936013560601c90565b503390565b6129a081611467565b15610d605760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610919565b600080612a0460008460018651610ec79190613862565b60ca549091506001600160a01b031615801590612a405750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b612a51828261120d565b610d2357612a69816001600160a01b03166014612aab565b612a74836020612aab565b604051602001612a859291906133a6565b60408051601f198184030181529082905262461bcd60e51b825261091991600401613587565b60606000612aba836002613843565b612ac590600261382b565b6001600160401b03811115612aea57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015612b14576020820181803683370190505b509050600360fc1b81600081518110612b3d57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612b7a57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000612b9e846002613843565b612ba990600161382b565b90505b6001811115612c3d576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612beb57634e487b7160e01b600052603260045260246000fd5b1a60f81b828281518110612c0f57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c93612c368161396e565b9050612bac565b508315612a405760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610919565b508054612c9890613985565b6000825580601f10612ca8575050565b601f016020900490600052602060002090810190610c969190612d4a565b828054612cd290613985565b90600052602060002090601f016020900481019282612cf45760008555612d3a565b82601f10612d0d57805160ff1916838001178555612d3a565b82800160010185558215612d3a579182015b82811115612d3a578251825591602001919060010190612d1f565b50612d46929150612d4a565b5090565b5b80821115612d465760008155600101612d4b565b60008083601f840112612d70578182fd5b5081356001600160401b03811115612d86578182fd5b6020830191508360208260051b8501011115612da157600080fd5b9250929050565b60008083601f840112612db9578182fd5b5081356001600160401b03811115612dcf578182fd5b602083019150836020828501011115612da157600080fd5b600060208284031215612df8578081fd5b8135612a4081613a07565b600060208284031215612e14578081fd5b8151612a4081613a07565b60008060008060008060006080888a031215612e39578283fd5b8735612e4481613a07565b965060208801356001600160401b0380821115612e5f578485fd5b612e6b8b838c01612d5f565b909850965060408a0135915080821115612e83578485fd5b612e8f8b838c01612d5f565b909650945060608a0135915080821115612ea7578384fd5b50612eb48a828b01612d5f565b989b979a50959850939692959293505050565b60008060008060008060008060a0898b031215612ee2578182fd5b8835612eed81613a07565b975060208901356001600160401b0380821115612f08578384fd5b612f148c838d01612d5f565b909950975060408b0135915080821115612f2c578384fd5b612f388c838d01612d5f565b909750955060608b0135915080821115612f50578384fd5b50612f5d8b828c01612d5f565b9094509250506080890135612f7181613a1c565b809150509295985092959890939650565b60008060008060608587031215612f97578182fd5b8435612fa281613a07565b93506020850135925060408501356001600160401b03811115612fc3578283fd5b612fcf87828801612da8565b95989497509550505050565b60008060008060008060008060a0898b031215612ff6578182fd5b883561300181613a07565b97506020890135965060408901356001600160401b0380821115613023578384fd5b61302f8c838d01612da8565b909850965060608b0135915080821115613047578384fd5b6130538c838d01612d5f565b909650945060808b013591508082111561306b578384fd5b506130788b828c01612d5f565b999c989b5096995094979396929594505050565b6000806020838503121561309e578182fd5b82356001600160401b038111156130b3578283fd5b6130bf85828601612d5f565b90969095509350505050565b600060208083850312156130dd578182fd5b82356001600160401b038111156130f2578283fd5b8301601f81018513613102578283fd5b803561311561311082613808565b6137d8565b80828252848201915084840188868560051b8701011115613134578687fd5b8694505b8385101561315f57803561314b81613a07565b835260019490940193918501918501613138565b50979650505050505050565b60006020828403121561317c578081fd5b8151612a4081613a1c565b600060208284031215613198578081fd5b5035919050565b600080604083850312156131b1578182fd5b8235915060208301356131c381613a07565b809150509250929050565b6000602082840312156131df578081fd5b81356001600160e01b031981168114612a40578182fd5b600080600080600060a0868803121561320d578283fd5b853561321881613a07565b9450602086013561322881613a07565b9350604086013561323881613a07565b9250606086013561324881613a07565b9150608086013561325881613a07565b809150509295509295909350565b60008060208385031215613278578182fd5b82356001600160401b0381111561328d578283fd5b6130bf85828601612da8565b6000806000604084860312156132ad578081fd5b8335925060208401356001600160401b038111156132c9578182fd5b6132d586828701612da8565b9497909650939450505050565b600081518084526020808501808196508360051b81019150828601855b85811015613329578284038952613317848351613336565b988501989350908401906001016132ff565b5091979650505050505050565b6000815180845261334e81602086016020860161393e565b601f01601f19169290920160200192915050565b6000825161337481846020870161393e565b9190910192915050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516133de81601785016020880161393e565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161340f81602884016020880161393e565b01602801949350505050565b6001600160a01b038616815260a06020820181905260009061343f908301876132e2565b828103604084015261345181876132e2565b9050828103606084015261346581866132e2565b91505082151560808301529695505050505050565b600060018060a01b0380861683526060602084015261349c6060840186613336565b9150808416604084015250949350505050565b60018060a01b038616815284602082015260a0604082015260006134d660a08301866132e2565b828103606084015261346581866132e2565b6060815260006134fb60608301866132e2565b828103602084015261350d81866132e2565b915050826040830152949350505050565b6020808252810182905260006001600160fb1b0383111561353d578081fd5b8260051b808560408501379190910160400190815292915050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b602081526000612a406020830184613336565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60208082526024908201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604082015263272a22a960e11b606082015260800190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6020808252602f908201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060408201526e282927ab22a22fa7a92fa7aba722a960891b606082015260800190565b8281526040602082015260006137776040830184613336565b949350505050565b6000808335601e19843603018112613795578283fd5b8301803591506001600160401b038211156137ae578283fd5b602001915036819003821315612da157600080fd5b60008235605e19833603018112613374578182fd5b604051601f8201601f191681016001600160401b0381118282101715613800576138006139f1565b604052919050565b60006001600160401b03821115613821576138216139f1565b5060051b60200190565b6000821982111561383e5761383e6139db565b500190565b600081600019048311821515161561385d5761385d6139db565b500290565b600082821015613874576138746139db565b500390565b600061388761311084613808565b808482526020808301925084368760051b870111156138a4578485fd5b845b878110156139325781356001600160401b03808211156138c4578788fd5b90880190601f36818401126138d7578889fd5b8235828111156138e9576138e96139f1565b6138fa818301601f191688016137d8565b9250808352368782860101111561390f57898afd5b8087850188850137820186018990525086525093820193908201906001016138a6565b50919695505050505050565b60005b83811015613959578181015183820152602001613941565b83811115613968576000848401525b50505050565b60008161397d5761397d6139db565b506000190190565b600181811c9082168061399957607f821691505b602082108114156139ba57634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156139d4576139d46139db565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610c9657600080fd5b8015158114610c9657600080fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
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
