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
const _bytecode = "0x608060405234801561001057600080fd5b50613a95806100206000396000f3fe6080604052600436106102675760003560e01c806391d1485411610144578063c3a3bc00116100b6578063d53913931161007a578063d539139314610776578063d547741f14610798578063d6ab22ed146107b8578063ec527389146107d8578063f2fde38b146107f8578063ffa1ad741461081857600080fd5b8063c3a3bc00146106d6578063cc2c3fc4146106f6578063ceeb4f5014610716578063d1f5692c14610736578063d4a32ad61461075657600080fd5b8063a3f4df7e11610108578063a3f4df7e146105e9578063a849d65c14610636578063aa271e1a14610656578063ae31844a14610676578063b0aa98c714610696578063b9998a24146106b657600080fd5b806391d148541461055f578063983b2d561461057f578063986502751461059f57806399e0dd7c146105b4578063a217fddf146105d457600080fd5b80635b6fa8db116101dd578063715018a6116101a1578063715018a6146104c457806371e2a657146104d957806381c81d35146104f95780638456cb591461050c5780638da5cb5b14610521578063906cecc11461053f57600080fd5b80635b6fa8db1461043c5780635c975abb1461045c5780635cd7e3b3146104715780635fc1964f14610491578063634486da146104b157600080fd5b80633092afd51161022f5780633092afd51461034157806336568abe146103615780633f41b614146103815780633f4ba83a146103b9578063463c4bcb146103ce578063572b6c05146103ee57600080fd5b806301ffc9a71461026c5780631459457a146102a1578063248a9ca3146102c3578063268b15ed146103015780632f2ff15d14610321575b600080fd5b34801561027857600080fd5b5061028c6102873660046131ec565b610849565b60405190151581526020015b60405180910390f35b3480156102ad57600080fd5b506102c16102bc366004613214565b610880565b005b3480156102cf57600080fd5b506102f36102de3660046131a5565b60009081526097602052604090206001015490565b604051908152602001610298565b34801561030d57600080fd5b506102c161031c3660046132b7565b610be7565b34801561032d57600080fd5b506102c161033c3660046131bd565b610c79565b34801561034d57600080fd5b506102c161035c366004612e05565b610ca3565b34801561036d57600080fd5b506102c161037c3660046131bd565b610cb7565b34801561038d57600080fd5b5060c9546103a1906001600160a01b031681565b6040516001600160a01b039091168152602001610298565b3480156103c557600080fd5b506102c1610d45565b3480156103da57600080fd5b506102c16103e93660046131a5565b610d57565b3480156103fa57600080fd5b5061028c610409366004612e05565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561044857600080fd5b5060cc546103a1906001600160a01b031681565b34801561046857600080fd5b5061028c610d87565b34801561047d57600080fd5b506102c161048c366004612ee5565b610d9d565b34801561049d57600080fd5b506102c16104ac3660046130e9565b610f97565b6102c16104bf366004612e05565b610fed565b3480156104d057600080fd5b506102c16110b0565b3480156104e557600080fd5b506102c16104f43660046130e9565b6110c2565b6102c1610507366004612e05565b611118565b34801561051857600080fd5b506102c1611195565b34801561052d57600080fd5b506033546001600160a01b03166103a1565b34801561054b57600080fd5b506102c161055a366004612fa0565b6111a5565b34801561056b57600080fd5b5061028c61057a3660046131bd565b61122b565b34801561058b57600080fd5b506102c161059a366004612e05565b611256565b3480156105ab57600080fd5b506102c1611267565b3480156105c057600080fd5b506102c16105cf366004613284565b611281565b3480156105e057600080fd5b506102f3600081565b3480156105f557600080fd5b50610629604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b60405161029891906135a5565b34801561064257600080fd5b5060cb546103a1906001600160a01b031681565b34801561066257600080fd5b5061028c610671366004612e05565b611360565b34801561068257600080fd5b506102c16106913660046130aa565b61137a565b3480156106a257600080fd5b5061028c6106b13660046131a5565b611485565b3480156106c257600080fd5b506102c16106d1366004612e05565b6114e3565b3480156106e257600080fd5b506102c16106f1366004613284565b611528565b34801561070257600080fd5b5060ca546103a1906001600160a01b031681565b34801561072257600080fd5b506102c1610731366004612ff9565b61156f565b34801561074257600080fd5b506102c16107513660046130aa565b611605565b34801561076257600080fd5b506102c1610771366004612e3d565b6116ca565b34801561078257600080fd5b506102f3600080516020613a6983398151915281565b3480156107a457600080fd5b506102c16107b33660046131bd565b611850565b3480156107c457600080fd5b506102c16107d33660046130aa565b611875565b3480156107e457600080fd5b506102c16107f33660046131a5565b611b06565b34801561080457600080fd5b506102c1610813366004612e05565b611b78565b34801561082457600080fd5b506106296040518060400160405280600581526020016418171a171b60d91b81525081565b60006001600160e01b03198216637965db0b60e01b148061087a57506301ffc9a760e01b6001600160e01b03198316145b92915050565b600054610100900460ff16158080156108a05750600054600160ff909116105b806108ba5750303b1580156108ba575060005460ff166001145b6109225760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff191660011790558015610945576000805461ff0019166101001790555b60c980546001600160a01b038089166001600160a01b03199283161790925560ca805488841690831617905560cb805487841690831617905560cc805492861692909116919091179055610997611b94565b61099f611bcb565b6109a882611c04565b6109b0611c2b565b604080516101e08101825260066101a082018181526563727970746f60d01b6101c0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185529182526535b632bb32b960d11b8282015261016083019190915282518084019093526002835261686960f01b9083015261018081019190915260005b600d811015610b9757610b858282600d8110610b7b57634e487b7160e01b600052603260045260246000fd5b6020020151611c6b565b80610b8f816139de565b915050610b4f565b50508015610bdf576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050505050565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610c2b9250849150839050611d87565b610c33610d87565b15610c505760405162461bcd60e51b815260040161091990613632565b6060610bdf610c5d611edd565b610c7088610c6b8989611eec565b611f18565b83846001612045565b600082815260976020526040902060010154610c9481612341565b610c9e8383612352565b505050565b610cab6123d9565b610cb481612452565b50565b610cbf611edd565b6001600160a01b0316816001600160a01b031614610d375760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610919565b610d41828261246a565b5050565b610d4d6123d9565b610d556124ef565b565b610d62610671611edd565b610d7e5760405162461bcd60e51b8152600401610919906135fd565b610cb481612597565b600080516020613a498339815191525460ff1690565b610da78688613897565b805160021415610ddd57610dbc610671611edd565b610dd85760405162461bcd60e51b81526004016109199061365c565b610ea2565b6000610de88261261b565b60c9549092506001600160a01b0316905063430c2081610e06611edd565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b158015610e4c57600080fd5b505afa158015610e60573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e849190613189565b610ea05760405162461bcd60e51b81526004016109199061372d565b505b610eac8789613897565b600281511015610ece5760405162461bcd60e51b8152600401610919906135b8565b610f3e610f1060008360018551610ee59190613880565b81518110610f0357634e487b7160e01b600052603260045260246000fd5b6020026020010151612656565b82600081518110610f3157634e487b7160e01b600052603260045260246000fd5b6020026020010151611d87565b610f46610d87565b15610f635760405162461bcd60e51b815260040161091990613632565b610f8b8a610f718a8c613897565b610f7b898b613897565b610f85888a613897565b87612045565b50505050505050505050565b610f9f6123d9565b60005b8151811015610d4157610fdb828281518110610fce57634e487b7160e01b600052603260045260246000fd5b6020026020010151612452565b80610fe5816139de565b915050610fa2565b610ff8610671611edd565b6110145760405162461bcd60e51b8152600401610919906135fd565b6001600160a01b03811661106a5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610919565b6110738161270b565b61107b611267565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610d41573d6000803e3d6000fd5b6110b86123d9565b610d556000612723565b6110ca6123d9565b60005b8151811015610d41576111068282815181106110f957634e487b7160e01b600052603260045260246000fd5b602002602001015161270b565b80611110816139de565b9150506110cd565b611123610671611edd565b61113f5760405162461bcd60e51b8152600401610919906135fd565b6001600160a01b0381166110735760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610919565b61119d6123d9565b610d55612775565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506111e99250849150839050611d87565b6111f1610d87565b1561120e5760405162461bcd60e51b815260040161091990613632565b606061122287610c7088610c6b8989611eec565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61125e6123d9565b610cb48161270b565b610d55600080516020613a6983398151915261037c611edd565b6112896123d9565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906112bb9085908590600401613576565b600060405180830381600087803b1580156112d557600080fd5b505af11580156112e9573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610d4190505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906113329085908590600401613576565b600060405180830381600087803b15801561134c57600080fd5b505af1158015610bdf573d6000803e3d6000fd5b600061087a600080516020613a698339815191528361122b565b611385610671611edd565b6113a15760405162461bcd60e51b8152600401610919906135fd565b60c9546040516000916001600160a01b0316906113c4908590859060240161353c565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b179052516113f99190613380565b6000604051808303816000865af19150503d8060008114611436576040519150601f19603f3d011682016040523d82523d6000602084013e61143b565b606091505b5050905080610c9e5760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b6044820152606401610919565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526000906114d9906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b6114eb6123d9565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b6115306123d9565b610d4182828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611c6b92505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506115b39250849150839050611d87565b6115bb610d87565b156115d85760405162461bcd60e51b815260040161091990613632565b610f8b8a6115ea8b610c6b8c8c611eec565b6115f4888a613897565b6115fe8789613897565b6001612045565b61160d6123d9565b60005b81811015610c9e5760c9546001600160a01b0316635096023984848481811061164957634e487b7160e01b600052603260045260246000fd5b905060200201602081019061165e9190612e05565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561169f57600080fd5b505af11580156116b3573d6000803e3d6000fd5b5050505080806116c2906139de565b915050611610565b6116d48587613897565b80516002141561170a576116e9610671611edd565b6117055760405162461bcd60e51b81526004016109199061365c565b6117cf565b60006117158261261b565b60c9549092506001600160a01b0316905063430c2081611733611edd565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b15801561177957600080fd5b505afa15801561178d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117b19190613189565b6117cd5760405162461bcd60e51b81526004016109199061372d565b505b6117d98688613897565b6002815110156117fb5760405162461bcd60e51b8152600401610919906135b8565b611812610f1060008360018551610ee59190613880565b61181a610d87565b156118375760405162461bcd60e51b815260040161091990613632565b611845896115ea898b613897565b505050505050505050565b60008281526097602052604090206001015461186b81612341565b610c9e838361246a565b611880610671611edd565b61189c5760405162461bcd60e51b8152600401610919906135fd565b60005b81811015610c9e5761195a8383838181106118ca57634e487b7160e01b600052603260045260246000fd5b90506020028101906118dc91906137e1565b6040013584848481811061190057634e487b7160e01b600052603260045260246000fd5b905060200281019061191291906137e1565b61192090602081019061379d565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611d8792505050565b6000611a0f84848481811061197f57634e487b7160e01b600052603260045260246000fd5b905060200281019061199191906137e1565b604001358585858181106119b557634e487b7160e01b600052603260045260246000fd5b90506020028101906119c791906137e1565b6119d590602081019061379d565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611f1892505050565b90506000611a1c8261261b565b5060c954604051634f558e7960e01b8152600481018390529192506060916001600160a01b0390911690634f558e799060240160206040518083038186803b158015611a6757600080fd5b505afa158015611a7b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a9f9190613189565b611af057611af0868686818110611ac657634e487b7160e01b600052603260045260246000fd5b9050602002810190611ad891906137e1565b611ae6906020810190612e05565b8483846000612045565b5050508080611afe906139de565b91505061189f565b611b0e6123d9565b611b17816127dd565b611b335760405162461bcd60e51b8152600401610919906136a0565b600081815260cd60205260408120611b4a91612caa565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611b806123d9565b611b8981612803565b610cb4600082612879565b600054610100900460ff16611bbb5760405162461bcd60e51b8152600401610919906136e2565b610d55611bc6611edd565b612723565b600054610100900460ff16611bf25760405162461bcd60e51b8152600401610919906136e2565b610d556000611bff611edd565b612879565b600054610100900460ff166114eb5760405162461bcd60e51b8152600401610919906136e2565b600054610100900460ff16611c525760405162461bcd60e51b8152600401610919906136e2565b600080516020613a49833981519152805460ff19169055565b6000611c78600083612656565b600081815260cd602090815260409091208451929350611c9c929091850190612ce4565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf898083604051611ccd91906135a5565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e799060240160206040518083038186803b158015611d1957600080fd5b505afa158015611d2d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d519190613189565b610d415760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c6090611332908490869060040161377c565b611d90826127dd565b611dac5760405162461bcd60e51b8152600401610919906136a0565b6000611ddf8260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115611e8857611e0a611dfe826000600a612883565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b81415611e885760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610919565b611e91826128c2565b610c9e5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c49440000006044820152606401610919565b6000611ee761296e565b905090565b60608282604051602001611f0192919061339c565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611f325790505090508281600081518110611f6b57634e487b7160e01b600052603260045260246000fd5b602002602001018190525060cd60008581526020019081526020016000208054611f94906139a3565b80601f0160208091040260200160405190810160405280929190818152602001828054611fc0906139a3565b801561200d5780601f10611fe25761010080835404028352916020019161200d565b820191906000526020600020905b815481529060010190602001808311611ff057829003601f168201915b50505050508160018151811061203357634e487b7160e01b600052603260045260246000fd5b60209081029190910101529392505050565b60006120508561261b565b5060c954604051634f558e7960e01b8152600481018390529192506001600160a01b031690634f558e799060240160206040518083038186803b15801561209657600080fd5b505afa1580156120aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120ce9190613189565b801561215c575060c9546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e9060240160206040518083038186803b15801561211957600080fd5b505afa15801561212d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121519190612e21565b6001600160a01b0316145b156121d05760c95460405163d106353f60e01b81526001600160a01b039091169063d106353f9061219990899085908990899089906004016134cd565b600060405180830381600087803b1580156121b357600080fd5b505af11580156121c7573d6000803e3d6000fd5b50505050610bdf565b6121d9816129b5565b6121e285612a0b565b80156121ef575084516002145b156122db5760ca5485516001600160a01b039091169063c36c2125908890889060009061222c57634e487b7160e01b600052603260045260246000fd5b602090810291909101015160cc546040516001600160e01b031960e086901b1681526122669392916001600160a01b031690600401613498565b600060405180830381600087803b15801561228057600080fd5b505af1158015612294573d6000803e3d6000fd5b505050506000845111156122d65760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae749061219990879087908690600401613506565b610bdf565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b7906123139089908990899089908990600401613439565b600060405180830381600087803b15801561232d57600080fd5b505af1158015610f8b573d6000803e3d6000fd5b610cb48161234d611edd565b612a65565b61235c828261122b565b610d415760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612395611edd565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6123e1611edd565b6001600160a01b03166123fc6033546001600160a01b031690565b6001600160a01b031614610d555760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610919565b610cb4600080516020613a6983398151915282611850565b612474828261122b565b15610d415760008281526097602090815260408083206001600160a01b03851684529091529020805460ff191690556124ab611edd565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6124f7610d87565b61253a5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610919565b600080516020613a49833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa61257a611edd565b6040516001600160a01b03909116815260200160405180910390a1565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526001906125d6906060016114c0565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b805160009081905b80156126505782915061263c8285610ee5600185613880565b9250806126488161398c565b915050612623565b50915091565b60008151600014156126aa5760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610919565b82826040516020016126bc9190613380565b604051602081830303815290604052805190602001206040516020016126ec929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610cb4600080516020613a6983398151915282612879565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b61277d610d87565b1561279a5760405162461bcd60e51b815260040161091990613632565b600080516020613a49833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861257a611edd565b600081815260cd6020526040812080548291906127f9906139a3565b9050119050919050565b61280b6123d9565b6001600160a01b0381166128705760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610919565b610cb481612723565b610d418282612352565b604080518082019091526000808252602082015260405180604001604052808381526020018486602001516128b89190613849565b9052949350505050565b60008151600014156128d657506000919050565b6020820160005b83518110156129645760006128f58383015160f81c90565b90508060ff16602d14158015612920575060308160ff161015801561291e575060398160ff1611155b155b8015612941575060618160ff161015801561293f5750607a8160ff1611155b155b1561295157506000949350505050565b508061295c816139de565b9150506128dd565b5060019392505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b03163314156129b0575060331936013560601c90565b503390565b6129be81611485565b15610d7e5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610919565b600080612a2260008460018651610ee59190613880565b60ca549091506001600160a01b031615801590612a5e5750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b612a6f828261122b565b610d4157612a87816001600160a01b03166014612ac9565b612a92836020612ac9565b604051602001612aa39291906133c4565b60408051601f198184030181529082905262461bcd60e51b8252610919916004016135a5565b60606000612ad8836002613861565b612ae3906002613849565b6001600160401b03811115612b0857634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015612b32576020820181803683370190505b509050600360fc1b81600081518110612b5b57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612b9857634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000612bbc846002613861565b612bc7906001613849565b90505b6001811115612c5b576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612c0957634e487b7160e01b600052603260045260246000fd5b1a60f81b828281518110612c2d57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c93612c548161398c565b9050612bca565b508315612a5e5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610919565b508054612cb6906139a3565b6000825580601f10612cc6575050565b601f016020900490600052602060002090810190610cb49190612d68565b828054612cf0906139a3565b90600052602060002090601f016020900481019282612d125760008555612d58565b82601f10612d2b57805160ff1916838001178555612d58565b82800160010185558215612d58579182015b82811115612d58578251825591602001919060010190612d3d565b50612d64929150612d68565b5090565b5b80821115612d645760008155600101612d69565b60008083601f840112612d8e578182fd5b5081356001600160401b03811115612da4578182fd5b6020830191508360208260051b8501011115612dbf57600080fd5b9250929050565b60008083601f840112612dd7578182fd5b5081356001600160401b03811115612ded578182fd5b602083019150836020828501011115612dbf57600080fd5b600060208284031215612e16578081fd5b8135612a5e81613a25565b600060208284031215612e32578081fd5b8151612a5e81613a25565b60008060008060008060006080888a031215612e57578283fd5b8735612e6281613a25565b965060208801356001600160401b0380821115612e7d578485fd5b612e898b838c01612d7d565b909850965060408a0135915080821115612ea1578485fd5b612ead8b838c01612d7d565b909650945060608a0135915080821115612ec5578384fd5b50612ed28a828b01612d7d565b989b979a50959850939692959293505050565b60008060008060008060008060a0898b031215612f00578182fd5b8835612f0b81613a25565b975060208901356001600160401b0380821115612f26578384fd5b612f328c838d01612d7d565b909950975060408b0135915080821115612f4a578384fd5b612f568c838d01612d7d565b909750955060608b0135915080821115612f6e578384fd5b50612f7b8b828c01612d7d565b9094509250506080890135612f8f81613a3a565b809150509295985092959890939650565b60008060008060608587031215612fb5578182fd5b8435612fc081613a25565b93506020850135925060408501356001600160401b03811115612fe1578283fd5b612fed87828801612dc6565b95989497509550505050565b60008060008060008060008060a0898b031215613014578182fd5b883561301f81613a25565b97506020890135965060408901356001600160401b0380821115613041578384fd5b61304d8c838d01612dc6565b909850965060608b0135915080821115613065578384fd5b6130718c838d01612d7d565b909650945060808b0135915080821115613089578384fd5b506130968b828c01612d7d565b999c989b5096995094979396929594505050565b600080602083850312156130bc578182fd5b82356001600160401b038111156130d1578283fd5b6130dd85828601612d7d565b90969095509350505050565b600060208083850312156130fb578182fd5b82356001600160401b03811115613110578283fd5b8301601f81018513613120578283fd5b803561313361312e82613826565b6137f6565b80828252848201915084840188868560051b8701011115613152578687fd5b8694505b8385101561317d57803561316981613a25565b835260019490940193918501918501613156565b50979650505050505050565b60006020828403121561319a578081fd5b8151612a5e81613a3a565b6000602082840312156131b6578081fd5b5035919050565b600080604083850312156131cf578182fd5b8235915060208301356131e181613a25565b809150509250929050565b6000602082840312156131fd578081fd5b81356001600160e01b031981168114612a5e578182fd5b600080600080600060a0868803121561322b578283fd5b853561323681613a25565b9450602086013561324681613a25565b9350604086013561325681613a25565b9250606086013561326681613a25565b9150608086013561327681613a25565b809150509295509295909350565b60008060208385031215613296578182fd5b82356001600160401b038111156132ab578283fd5b6130dd85828601612dc6565b6000806000604084860312156132cb578081fd5b8335925060208401356001600160401b038111156132e7578182fd5b6132f386828701612dc6565b9497909650939450505050565b600081518084526020808501808196508360051b81019150828601855b85811015613347578284038952613335848351613354565b9885019893509084019060010161331d565b5091979650505050505050565b6000815180845261336c81602086016020860161395c565b601f01601f19169290920160200192915050565b6000825161339281846020870161395c565b9190910192915050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516133fc81601785016020880161395c565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161342d81602884016020880161395c565b01602801949350505050565b6001600160a01b038616815260a06020820181905260009061345d90830187613300565b828103604084015261346f8187613300565b905082810360608401526134838186613300565b91505082151560808301529695505050505050565b600060018060a01b038086168352606060208401526134ba6060840186613354565b9150808416604084015250949350505050565b60018060a01b038616815284602082015260a0604082015260006134f460a0830186613300565b82810360608401526134838186613300565b6060815260006135196060830186613300565b828103602084015261352b8186613300565b915050826040830152949350505050565b6020808252810182905260006001600160fb1b0383111561355b578081fd5b8260051b808560408501379190910160400190815292915050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b602081526000612a5e6020830184613354565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60208082526024908201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604082015263272a22a960e11b606082015260800190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6020808252602f908201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060408201526e282927ab22a22fa7a92fa7aba722a960891b606082015260800190565b8281526040602082015260006137956040830184613354565b949350505050565b6000808335601e198436030181126137b3578283fd5b8301803591506001600160401b038211156137cc578283fd5b602001915036819003821315612dbf57600080fd5b60008235605e19833603018112613392578182fd5b604051601f8201601f191681016001600160401b038111828210171561381e5761381e613a0f565b604052919050565b60006001600160401b0382111561383f5761383f613a0f565b5060051b60200190565b6000821982111561385c5761385c6139f9565b500190565b600081600019048311821515161561387b5761387b6139f9565b500290565b600082821015613892576138926139f9565b500390565b60006138a561312e84613826565b808482526020808301925084368760051b870111156138c2578485fd5b845b878110156139505781356001600160401b03808211156138e2578788fd5b90880190601f36818401126138f5578889fd5b82358281111561390757613907613a0f565b613918818301601f191688016137f6565b9250808352368782860101111561392d57898afd5b8087850188850137820186018990525086525093820193908201906001016138c4565b50919695505050505050565b60005b8381101561397757818101518382015260200161395f565b83811115613986576000848401525b50505050565b60008161399b5761399b6139f9565b506000190190565b600181811c908216806139b757607f821691505b602082108114156139d857634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156139f2576139f26139f9565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610cb457600080fd5b8015158114610cb457600080fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
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
