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
];
const _bytecode = "0x608060405234801561001057600080fd5b50613907806100206000396000f3fe60806040526004361061025c5760003560e01c8063906cecc111610144578063c3a3bc00116100b6578063d53913931161007a578063d53913931461074b578063d547741f1461076d578063d6ab22ed1461078d578063ec527389146107ad578063f2fde38b146107cd578063ffa1ad74146107ed57600080fd5b8063c3a3bc00146106ab578063cc2c3fc4146106cb578063ceeb4f50146106eb578063d1f5692c1461070b578063d4a32ad61461072b57600080fd5b8063a217fddf11610108578063a217fddf146105c9578063a3f4df7e146105de578063a849d65c1461062b578063aa271e1a1461064b578063b0aa98c71461066b578063b9998a241461068b57600080fd5b8063906cecc11461053457806391d1485414610554578063983b2d5614610574578063986502751461059457806399e0dd7c146105a957600080fd5b8063572b6c05116101dd578063634486da116101a1578063634486da146104a6578063715018a6146104b957806371e2a657146104ce57806381c81d35146104ee5780638456cb59146105015780638da5cb5b1461051657600080fd5b8063572b6c05146103e35780635b6fa8db146104315780635c975abb146104515780635cd7e3b3146104665780635fc1964f1461048657600080fd5b80633092afd5116102245780633092afd51461033657806336568abe146103565780633f41b614146103765780633f4ba83a146103ae578063463c4bcb146103c357600080fd5b806301ffc9a7146102615780631459457a14610296578063248a9ca3146102b8578063268b15ed146102f65780632f2ff15d14610316575b600080fd5b34801561026d57600080fd5b5061028161027c366004613098565b61081e565b60405190151581526020015b60405180910390f35b3480156102a257600080fd5b506102b66102b13660046130c0565b610855565b005b3480156102c457600080fd5b506102e86102d3366004613051565b60009081526097602052604090206001015490565b60405190815260200161028d565b34801561030257600080fd5b506102b6610311366004613163565b610b9e565b34801561032257600080fd5b506102b6610331366004613069565b610c30565b34801561034257600080fd5b506102b6610351366004612cb1565b610c5a565b34801561036257600080fd5b506102b6610371366004613069565b610c6e565b34801561038257600080fd5b5060c954610396906001600160a01b031681565b6040516001600160a01b03909116815260200161028d565b3480156103ba57600080fd5b506102b6610cfc565b3480156103cf57600080fd5b506102b66103de366004613051565b610d0e565b3480156103ef57600080fd5b506102816103fe366004612cb1565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561043d57600080fd5b5060cc54610396906001600160a01b031681565b34801561045d57600080fd5b50610281610d3e565b34801561047257600080fd5b506102b6610481366004612d91565b610d54565b34801561049257600080fd5b506102b66104a1366004612f95565b610f4e565b6102b66104b4366004612cb1565b610fa4565b3480156104c557600080fd5b506102b6611067565b3480156104da57600080fd5b506102b66104e9366004612f95565b611079565b6102b66104fc366004612cb1565b6110cf565b34801561050d57600080fd5b506102b661114c565b34801561052257600080fd5b506033546001600160a01b0316610396565b34801561054057600080fd5b506102b661054f366004612e4c565b61115c565b34801561056057600080fd5b5061028161056f366004613069565b6111e2565b34801561058057600080fd5b506102b661058f366004612cb1565b61120d565b3480156105a057600080fd5b506102b661121e565b3480156105b557600080fd5b506102b66105c4366004613130565b611238565b3480156105d557600080fd5b506102e8600081565b3480156105ea57600080fd5b5061061e604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b60405161028d9190613417565b34801561063757600080fd5b5060cb54610396906001600160a01b031681565b34801561065757600080fd5b50610281610666366004612cb1565b611317565b34801561067757600080fd5b50610281610686366004613051565b611331565b34801561069757600080fd5b506102b66106a6366004612cb1565b61138f565b3480156106b757600080fd5b506102b66106c6366004613130565b6113d4565b3480156106d757600080fd5b5060ca54610396906001600160a01b031681565b3480156106f757600080fd5b506102b6610706366004612ea5565b61141b565b34801561071757600080fd5b506102b6610726366004612f56565b6114b1565b34801561073757600080fd5b506102b6610746366004612ce9565b611576565b34801561075757600080fd5b506102e86000805160206138db83398151915281565b34801561077957600080fd5b506102b6610788366004613069565b6116fc565b34801561079957600080fd5b506102b66107a8366004612f56565b611721565b3480156107b957600080fd5b506102b66107c8366004613051565b6119b2565b3480156107d957600080fd5b506102b66107e8366004612cb1565b611a24565b3480156107f957600080fd5b5061061e6040518060400160405280600581526020016418171a171b60d91b81525081565b60006001600160e01b03198216637965db0b60e01b148061084f57506301ffc9a760e01b6001600160e01b03198316145b92915050565b600054610100900460ff16158080156108755750600054600160ff909116105b8061088f5750303b15801561088f575060005460ff166001145b6108f75760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff19166001179055801561091a576000805461ff0019166101001790555b60c980546001600160a01b038089166001600160a01b03199283161790925560ca805488841690831617905560cb805487841690831617905560cc80549286169290911691909117905561096c611a40565b610974611a77565b61097d82611ab0565b610985611ad7565b604080516101c081018252600661018082018181526563727970746f60d01b6101a0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b8183015261014084015283518085019094529083526535b632bb32b960d11b9083015261016081019190915260005b600c811015610b4e57610b3c8282600c8110610b3257634e487b7160e01b600052603260045260246000fd5b6020020151611b17565b80610b4681613850565b915050610b06565b50508015610b96576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050505050565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610be29250849150839050611c33565b610bea610d3e565b15610c075760405162461bcd60e51b81526004016108ee906134a4565b6060610b96610c14611d89565b610c2788610c228989611d98565b611dc4565b83846001611ef1565b600082815260976020526040902060010154610c4b816121ed565b610c5583836121fe565b505050565b610c62612285565b610c6b816122fe565b50565b610c76611d89565b6001600160a01b0316816001600160a01b031614610cee5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016108ee565b610cf88282612316565b5050565b610d04612285565b610d0c61239b565b565b610d19610666611d89565b610d355760405162461bcd60e51b81526004016108ee9061346f565b610c6b81612443565b6000805160206138bb8339815191525460ff1690565b610d5e8688613709565b805160021415610d9457610d73610666611d89565b610d8f5760405162461bcd60e51b81526004016108ee906134ce565b610e59565b6000610d9f826124c7565b60c9549092506001600160a01b0316905063430c2081610dbd611d89565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b158015610e0357600080fd5b505afa158015610e17573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e3b9190613035565b610e575760405162461bcd60e51b81526004016108ee9061359f565b505b610e638789613709565b600281511015610e855760405162461bcd60e51b81526004016108ee9061342a565b610ef5610ec760008360018551610e9c91906136f2565b81518110610eba57634e487b7160e01b600052603260045260246000fd5b6020026020010151612502565b82600081518110610ee857634e487b7160e01b600052603260045260246000fd5b6020026020010151611c33565b610efd610d3e565b15610f1a5760405162461bcd60e51b81526004016108ee906134a4565b610f428a610f288a8c613709565b610f32898b613709565b610f3c888a613709565b87611ef1565b50505050505050505050565b610f56612285565b60005b8151811015610cf857610f92828281518110610f8557634e487b7160e01b600052603260045260246000fd5b60200260200101516122fe565b80610f9c81613850565b915050610f59565b610faf610666611d89565b610fcb5760405162461bcd60e51b81526004016108ee9061346f565b6001600160a01b0381166110215760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108ee565b61102a816125b7565b61103261121e565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610cf8573d6000803e3d6000fd5b61106f612285565b610d0c60006125cf565b611081612285565b60005b8151811015610cf8576110bd8282815181106110b057634e487b7160e01b600052603260045260246000fd5b60200260200101516125b7565b806110c781613850565b915050611084565b6110da610666611d89565b6110f65760405162461bcd60e51b81526004016108ee9061346f565b6001600160a01b03811661102a5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d50545900000060448201526064016108ee565b611154612285565b610d0c612621565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506111a09250849150839050611c33565b6111a8610d3e565b156111c55760405162461bcd60e51b81526004016108ee906134a4565b60606111d987610c2788610c228989611d98565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b611215612285565b610c6b816125b7565b610d0c6000805160206138db833981519152610371611d89565b611240612285565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061127290859085906004016133e8565b600060405180830381600087803b15801561128c57600080fd5b505af11580156112a0573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610cf890505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906112e990859085906004016133e8565b600060405180830381600087803b15801561130357600080fd5b505af1158015610b96573d6000803e3d6000fd5b600061084f6000805160206138db833981519152836111e2565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611385906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b611397612285565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b6113dc612285565b610cf882828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611b1792505050565b8686868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061145f9250849150839050611c33565b611467610d3e565b156114845760405162461bcd60e51b81526004016108ee906134a4565b610f428a6114968b610c228c8c611d98565b6114a0888a613709565b6114aa8789613709565b6001611ef1565b6114b9612285565b60005b81811015610c555760c9546001600160a01b031663509602398484848181106114f557634e487b7160e01b600052603260045260246000fd5b905060200201602081019061150a9190612cb1565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561154b57600080fd5b505af115801561155f573d6000803e3d6000fd5b50505050808061156e90613850565b9150506114bc565b6115808587613709565b8051600214156115b657611595610666611d89565b6115b15760405162461bcd60e51b81526004016108ee906134ce565b61167b565b60006115c1826124c7565b60c9549092506001600160a01b0316905063430c20816115df611d89565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b15801561162557600080fd5b505afa158015611639573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061165d9190613035565b6116795760405162461bcd60e51b81526004016108ee9061359f565b505b6116858688613709565b6002815110156116a75760405162461bcd60e51b81526004016108ee9061342a565b6116be610ec760008360018551610e9c91906136f2565b6116c6610d3e565b156116e35760405162461bcd60e51b81526004016108ee906134a4565b6116f189611496898b613709565b505050505050505050565b600082815260976020526040902060010154611717816121ed565b610c558383612316565b61172c610666611d89565b6117485760405162461bcd60e51b81526004016108ee9061346f565b60005b81811015610c555761180683838381811061177657634e487b7160e01b600052603260045260246000fd5b90506020028101906117889190613653565b604001358484848181106117ac57634e487b7160e01b600052603260045260246000fd5b90506020028101906117be9190613653565b6117cc90602081019061360f565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611c3392505050565b60006118bb84848481811061182b57634e487b7160e01b600052603260045260246000fd5b905060200281019061183d9190613653565b6040013585858581811061186157634e487b7160e01b600052603260045260246000fd5b90506020028101906118739190613653565b61188190602081019061360f565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611dc492505050565b905060006118c8826124c7565b5060c954604051634f558e7960e01b8152600481018390529192506060916001600160a01b0390911690634f558e799060240160206040518083038186803b15801561191357600080fd5b505afa158015611927573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061194b9190613035565b61199c5761199c86868681811061197257634e487b7160e01b600052603260045260246000fd5b90506020028101906119849190613653565b611992906020810190612cb1565b8483846000611ef1565b50505080806119aa90613850565b91505061174b565b6119ba612285565b6119c381612689565b6119df5760405162461bcd60e51b81526004016108ee90613512565b600081815260cd602052604081206119f691612b56565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611a2c612285565b611a35816126af565b610c6b600082612725565b600054610100900460ff16611a675760405162461bcd60e51b81526004016108ee90613554565b610d0c611a72611d89565b6125cf565b600054610100900460ff16611a9e5760405162461bcd60e51b81526004016108ee90613554565b610d0c6000611aab611d89565b612725565b600054610100900460ff166113975760405162461bcd60e51b81526004016108ee90613554565b600054610100900460ff16611afe5760405162461bcd60e51b81526004016108ee90613554565b6000805160206138bb833981519152805460ff19169055565b6000611b24600083612502565b600081815260cd602090815260409091208451929350611b48929091850190612b90565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf898083604051611b799190613417565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e799060240160206040518083038186803b158015611bc557600080fd5b505afa158015611bd9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bfd9190613035565b610cf85760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c60906112e990849086906004016135ee565b611c3c82612689565b611c585760405162461bcd60e51b81526004016108ee90613512565b6000611c8b8260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115611d3457611cb6611caa826000600a61272f565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b81415611d345760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b60648201526084016108ee565b611d3d8261276e565b610c555760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c494400000060448201526064016108ee565b6000611d9361281a565b905090565b60608282604051602001611dad929190613248565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611dde5790505090508281600081518110611e1757634e487b7160e01b600052603260045260246000fd5b602002602001018190525060cd60008581526020019081526020016000208054611e4090613815565b80601f0160208091040260200160405190810160405280929190818152602001828054611e6c90613815565b8015611eb95780601f10611e8e57610100808354040283529160200191611eb9565b820191906000526020600020905b815481529060010190602001808311611e9c57829003601f168201915b505050505081600181518110611edf57634e487b7160e01b600052603260045260246000fd5b60209081029190910101529392505050565b6000611efc856124c7565b5060c954604051634f558e7960e01b8152600481018390529192506001600160a01b031690634f558e799060240160206040518083038186803b158015611f4257600080fd5b505afa158015611f56573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f7a9190613035565b8015612008575060c9546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e9060240160206040518083038186803b158015611fc557600080fd5b505afa158015611fd9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ffd9190612ccd565b6001600160a01b0316145b1561207c5760c95460405163d106353f60e01b81526001600160a01b039091169063d106353f906120459089908590899089908990600401613379565b600060405180830381600087803b15801561205f57600080fd5b505af1158015612073573d6000803e3d6000fd5b50505050610b96565b61208581612861565b61208e856128b7565b801561209b575084516002145b156121875760ca5485516001600160a01b039091169063c36c212590889088906000906120d857634e487b7160e01b600052603260045260246000fd5b602090810291909101015160cc546040516001600160e01b031960e086901b1681526121129392916001600160a01b031690600401613344565b600060405180830381600087803b15801561212c57600080fd5b505af1158015612140573d6000803e3d6000fd5b505050506000845111156121825760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490612045908790879086906004016133b2565b610b96565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b7906121bf90899089908990899089906004016132e5565b600060405180830381600087803b1580156121d957600080fd5b505af1158015610f42573d6000803e3d6000fd5b610c6b816121f9611d89565b612911565b61220882826111e2565b610cf85760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612241611d89565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b61228d611d89565b6001600160a01b03166122a86033546001600160a01b031690565b6001600160a01b031614610d0c5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016108ee565b610c6b6000805160206138db833981519152826116fc565b61232082826111e2565b15610cf85760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612357611d89565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6123a3610d3e565b6123e65760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b60448201526064016108ee565b6000805160206138bb833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa612426611d89565b6040516001600160a01b03909116815260200160405180910390a1565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526001906124829060600161136c565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b805160009081905b80156124fc578291506124e88285610e9c6001856136f2565b9250806124f4816137fe565b9150506124cf565b50915091565b60008151600014156125565760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d505459000000000060448201526064016108ee565b8282604051602001612568919061322c565b60405160208183030381529060405280519060200120604051602001612598929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610c6b6000805160206138db83398151915282612725565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b612629610d3e565b156126465760405162461bcd60e51b81526004016108ee906134a4565b6000805160206138bb833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612426611d89565b600081815260cd6020526040812080548291906126a590613815565b9050119050919050565b6126b7612285565b6001600160a01b03811661271c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016108ee565b610c6b816125cf565b610cf882826121fe565b6040805180820190915260008082526020820152604051806040016040528083815260200184866020015161276491906136bb565b9052949350505050565b600081516000141561278257506000919050565b6020820160005b83518110156128105760006127a18383015160f81c90565b90508060ff16602d141580156127cc575060308160ff16101580156127ca575060398160ff1611155b155b80156127ed575060618160ff16101580156127eb5750607a8160ff1611155b155b156127fd57506000949350505050565b508061280881613850565b915050612789565b5060019392505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b031633141561285c575060331936013560601c90565b503390565b61286a81611331565b15610d355760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b454400000060448201526064016108ee565b6000806128ce60008460018651610e9c91906136f2565b60ca549091506001600160a01b03161580159061290a5750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b61291b82826111e2565b610cf857612933816001600160a01b03166014612975565b61293e836020612975565b60405160200161294f929190613270565b60408051601f198184030181529082905262461bcd60e51b82526108ee91600401613417565b606060006129848360026136d3565b61298f9060026136bb565b6001600160401b038111156129b457634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156129de576020820181803683370190505b509050600360fc1b81600081518110612a0757634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612a4457634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000612a688460026136d3565b612a739060016136bb565b90505b6001811115612b07576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612ab557634e487b7160e01b600052603260045260246000fd5b1a60f81b828281518110612ad957634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c93612b00816137fe565b9050612a76565b50831561290a5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016108ee565b508054612b6290613815565b6000825580601f10612b72575050565b601f016020900490600052602060002090810190610c6b9190612c14565b828054612b9c90613815565b90600052602060002090601f016020900481019282612bbe5760008555612c04565b82601f10612bd757805160ff1916838001178555612c04565b82800160010185558215612c04579182015b82811115612c04578251825591602001919060010190612be9565b50612c10929150612c14565b5090565b5b80821115612c105760008155600101612c15565b60008083601f840112612c3a578182fd5b5081356001600160401b03811115612c50578182fd5b6020830191508360208260051b8501011115612c6b57600080fd5b9250929050565b60008083601f840112612c83578182fd5b5081356001600160401b03811115612c99578182fd5b602083019150836020828501011115612c6b57600080fd5b600060208284031215612cc2578081fd5b813561290a81613897565b600060208284031215612cde578081fd5b815161290a81613897565b60008060008060008060006080888a031215612d03578283fd5b8735612d0e81613897565b965060208801356001600160401b0380821115612d29578485fd5b612d358b838c01612c29565b909850965060408a0135915080821115612d4d578485fd5b612d598b838c01612c29565b909650945060608a0135915080821115612d71578384fd5b50612d7e8a828b01612c29565b989b979a50959850939692959293505050565b60008060008060008060008060a0898b031215612dac578081fd5b8835612db781613897565b975060208901356001600160401b0380821115612dd2578283fd5b612dde8c838d01612c29565b909950975060408b0135915080821115612df6578283fd5b612e028c838d01612c29565b909750955060608b0135915080821115612e1a578283fd5b50612e278b828c01612c29565b9094509250506080890135612e3b816138ac565b809150509295985092959890939650565b60008060008060608587031215612e61578182fd5b8435612e6c81613897565b93506020850135925060408501356001600160401b03811115612e8d578283fd5b612e9987828801612c72565b95989497509550505050565b60008060008060008060008060a0898b031215612ec0578182fd5b8835612ecb81613897565b97506020890135965060408901356001600160401b0380821115612eed578384fd5b612ef98c838d01612c72565b909850965060608b0135915080821115612f11578384fd5b612f1d8c838d01612c29565b909650945060808b0135915080821115612f35578384fd5b50612f428b828c01612c29565b999c989b5096995094979396929594505050565b60008060208385031215612f68578182fd5b82356001600160401b03811115612f7d578283fd5b612f8985828601612c29565b90969095509350505050565b60006020808385031215612fa7578182fd5b82356001600160401b03811115612fbc578283fd5b8301601f81018513612fcc578283fd5b8035612fdf612fda82613698565b613668565b80828252848201915084840188868560051b8701011115612ffe578687fd5b8694505b8385101561302957803561301581613897565b835260019490940193918501918501613002565b50979650505050505050565b600060208284031215613046578081fd5b815161290a816138ac565b600060208284031215613062578081fd5b5035919050565b6000806040838503121561307b578182fd5b82359150602083013561308d81613897565b809150509250929050565b6000602082840312156130a9578081fd5b81356001600160e01b03198116811461290a578182fd5b600080600080600060a086880312156130d7578283fd5b85356130e281613897565b945060208601356130f281613897565b9350604086013561310281613897565b9250606086013561311281613897565b9150608086013561312281613897565b809150509295509295909350565b60008060208385031215613142578182fd5b82356001600160401b03811115613157578283fd5b612f8985828601612c72565b600080600060408486031215613177578081fd5b8335925060208401356001600160401b03811115613193578182fd5b61319f86828701612c72565b9497909650939450505050565b600081518084526020808501808196508360051b81019150828601855b858110156131f35782840389526131e1848351613200565b988501989350908401906001016131c9565b5091979650505050505050565b600081518084526132188160208601602086016137ce565b601f01601f19169290920160200192915050565b6000825161323e8184602087016137ce565b9190910192915050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516132a88160178501602088016137ce565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516132d98160288401602088016137ce565b01602801949350505050565b6001600160a01b038616815260a060208201819052600090613309908301876131ac565b828103604084015261331b81876131ac565b9050828103606084015261332f81866131ac565b91505082151560808301529695505050505050565b600060018060a01b038086168352606060208401526133666060840186613200565b9150808416604084015250949350505050565b60018060a01b038616815284602082015260a0604082015260006133a060a08301866131ac565b828103606084015261332f81866131ac565b6060815260006133c560608301866131ac565b82810360208401526133d781866131ac565b915050826040830152949350505050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b60208152600061290a6020830184613200565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60208082526024908201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604082015263272a22a960e11b606082015260800190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6020808252602f908201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060408201526e282927ab22a22fa7a92fa7aba722a960891b606082015260800190565b8281526040602082015260006136076040830184613200565b949350505050565b6000808335601e19843603018112613625578283fd5b8301803591506001600160401b0382111561363e578283fd5b602001915036819003821315612c6b57600080fd5b60008235605e1983360301811261323e578182fd5b604051601f8201601f191681016001600160401b038111828210171561369057613690613881565b604052919050565b60006001600160401b038211156136b1576136b1613881565b5060051b60200190565b600082198211156136ce576136ce61386b565b500190565b60008160001904831182151516156136ed576136ed61386b565b500290565b6000828210156137045761370461386b565b500390565b6000613717612fda84613698565b808482526020808301925084368760051b87011115613734578485fd5b845b878110156137c25781356001600160401b0380821115613754578788fd5b90880190601f3681840112613767578889fd5b82358281111561377957613779613881565b61378a818301601f19168801613668565b9250808352368782860101111561379f57898afd5b808785018885013782018601899052508652509382019390820190600101613736565b50919695505050505050565b60005b838110156137e95781810151838201526020016137d1565b838111156137f8576000848401525b50505050565b60008161380d5761380d61386b565b506000190190565b600181811c9082168061382957607f821691505b6020821081141561384a57634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156138645761386461386b565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610c6b57600080fd5b8015158114610c6b57600080fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
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
