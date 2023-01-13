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
const _bytecode = "0x608060405234801561001057600080fd5b5061345a806100206000396000f3fe6080604052600436106102465760003560e01c80638da5cb5b11610139578063b0aa98c7116100b6578063d1f5692c1161007a578063d1f5692c146106f5578063d539139314610715578063d547741f14610737578063ec52738914610757578063f2fde38b14610777578063ffa1ad741461079757600080fd5b8063b0aa98c714610655578063b9998a2414610675578063c3a3bc0014610695578063cc2c3fc4146106b5578063ceeb4f50146106d557600080fd5b806399e0dd7c116100fd57806399e0dd7c14610593578063a217fddf146105b3578063a3f4df7e146105c8578063a849d65c14610615578063aa271e1a1461063557600080fd5b80638da5cb5b14610500578063906cecc11461051e57806391d148541461053e578063983b2d561461055e578063986502751461057e57600080fd5b8063572b6c05116101c7578063634486da1161018b578063634486da14610490578063715018a6146104a357806371e2a657146104b857806381c81d35146104d85780638456cb59146104eb57600080fd5b8063572b6c05146103cd5780635b6fa8db1461041b5780635c975abb1461043b5780635cd7e3b3146104505780635fc1964f1461047057600080fd5b80633092afd51161020e5780633092afd51461032057806336568abe146103405780633f41b614146103605780633f4ba83a14610398578063463c4bcb146103ad57600080fd5b806301ffc9a71461024b5780631459457a14610280578063248a9ca3146102a2578063268b15ed146102e05780632f2ff15d14610300575b600080fd5b34801561025757600080fd5b5061026b610266366004612d1c565b6107c8565b60405190151581526020015b60405180910390f35b34801561028c57600080fd5b506102a061029b366004612d44565b6107ff565b005b3480156102ae57600080fd5b506102d26102bd366004612cd5565b60009081526097602052604090206001015490565b604051908152602001610277565b3480156102ec57600080fd5b506102a06102fb366004612de7565b610b66565b34801561030c57600080fd5b506102a061031b366004612ced565b610bf8565b34801561032c57600080fd5b506102a061033b3660046129dd565b610c22565b34801561034c57600080fd5b506102a061035b366004612ced565b610c36565b34801561036c57600080fd5b5060c954610380906001600160a01b031681565b6040516001600160a01b039091168152602001610277565b3480156103a457600080fd5b506102a0610cc4565b3480156103b957600080fd5b506102a06103c8366004612cd5565b610cd6565b3480156103d957600080fd5b5061026b6103e83660046129dd565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561042757600080fd5b5060cc54610380906001600160a01b031681565b34801561044757600080fd5b5061026b610d06565b34801561045c57600080fd5b506102a061046b366004612a15565b610d1c565b34801561047c57600080fd5b506102a061048b366004612c19565b610fd8565b6102a061049e3660046129dd565b61102e565b3480156104af57600080fd5b506102a06110f1565b3480156104c457600080fd5b506102a06104d3366004612c19565b611103565b6102a06104e63660046129dd565b611159565b3480156104f757600080fd5b506102a06111d6565b34801561050c57600080fd5b506033546001600160a01b0316610380565b34801561052a57600080fd5b506102a0610539366004612ad0565b6111e6565b34801561054a57600080fd5b5061026b610559366004612ced565b61126c565b34801561056a57600080fd5b506102a06105793660046129dd565b611297565b34801561058a57600080fd5b506102a06112a8565b34801561059f57600080fd5b506102a06105ae366004612db4565b6112c2565b3480156105bf57600080fd5b506102d2600081565b3480156105d457600080fd5b50610608604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b604051610277919061309b565b34801561062157600080fd5b5060cb54610380906001600160a01b031681565b34801561064157600080fd5b5061026b6106503660046129dd565b6113a1565b34801561066157600080fd5b5061026b610670366004612cd5565b6113bb565b34801561068157600080fd5b506102a06106903660046129dd565b611419565b3480156106a157600080fd5b506102a06106b0366004612db4565b61145e565b3480156106c157600080fd5b5060ca54610380906001600160a01b031681565b3480156106e157600080fd5b506102a06106f0366004612b29565b6114a5565b34801561070157600080fd5b506102a0610710366004612bda565b61153b565b34801561072157600080fd5b506102d260008051602061342e83398151915281565b34801561074357600080fd5b506102a0610752366004612ced565b611600565b34801561076357600080fd5b506102a0610772366004612cd5565b611625565b34801561078357600080fd5b506102a06107923660046129dd565b611697565b3480156107a357600080fd5b50610608604051806040016040528060058152602001640605c685c760db1b81525081565b60006001600160e01b03198216637965db0b60e01b14806107f957506301ffc9a760e01b6001600160e01b03198316145b92915050565b600054610100900460ff161580801561081f5750600054600160ff909116105b806108395750303b158015610839575060005460ff166001145b6108a15760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff1916600117905580156108c4576000805461ff0019166101001790555b60c980546001600160a01b038089166001600160a01b03199283161790925560ca805488841690831617905560cb805487841690831617905560cc8054928616929091169190911790556109166116b3565b61091e6116ea565b61092782611723565b61092f61174a565b604080516101e08101825260066101a082018181526563727970746f60d01b6101c0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185529182526535b632bb32b960d11b8282015261016083019190915282518084019093526002835261686960f01b9083015261018081019190915260005b600d811015610b1657610b048282600d8110610afa57634e487b7160e01b600052603260045260246000fd5b602002015161178a565b80610b0e816133a3565b915050610ace565b50508015610b5e576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050505050565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610baa92508491508390506118a6565b610bb2610d06565b15610bcf5760405162461bcd60e51b8152600401610898906130e3565b6060610b5e610bdc6119fc565b610bef88610bea8989611a0b565b611a37565b83846001611b64565b600082815260976020526040902060010154610c1381611e60565b610c1d8383611e71565b505050565b610c2a611ef8565b610c3381611f71565b50565b610c3e6119fc565b6001600160a01b0316816001600160a01b031614610cb65760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610898565b610cc08282611f89565b5050565b610ccc611ef8565b610cd461200e565b565b610ce16106506119fc565b610cfd5760405162461bcd60e51b8152600401610898906130ae565b610c33816120b6565b60008051602061340e8339815191525460ff1690565b610d26868861325c565b805160021415610d9857610d3b6106506119fc565b610d935760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610898565b610ea5565b6000610da38261213a565b60c9549092506001600160a01b0316905063430c2081610dc16119fc565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b158015610e0757600080fd5b505afa158015610e1b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e3f9190612cb9565b610ea35760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b6064820152608401610898565b505b610eaf878961325c565b600281511015610f0f5760405162461bcd60e51b815260206004820152602560248201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456044820152642627abaf9960d91b6064820152608401610898565b610f7f610f5160008360018551610f269190613245565b81518110610f4457634e487b7160e01b600052603260045260246000fd5b6020026020010151612175565b82600081518110610f7257634e487b7160e01b600052603260045260246000fd5b60200260200101516118a6565b610f87610d06565b15610fa45760405162461bcd60e51b8152600401610898906130e3565b610fcc8a610fb28a8c61325c565b610fbc898b61325c565b610fc6888a61325c565b87611b64565b50505050505050505050565b610fe0611ef8565b60005b8151811015610cc05761101c82828151811061100f57634e487b7160e01b600052603260045260246000fd5b6020026020010151611f71565b80611026816133a3565b915050610fe3565b6110396106506119fc565b6110555760405162461bcd60e51b8152600401610898906130ae565b6001600160a01b0381166110ab5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610898565b6110b48161222a565b6110bc6112a8565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610cc0573d6000803e3d6000fd5b6110f9611ef8565b610cd46000612242565b61110b611ef8565b60005b8151811015610cc05761114782828151811061113a57634e487b7160e01b600052603260045260246000fd5b602002602001015161222a565b80611151816133a3565b91505061110e565b6111646106506119fc565b6111805760405162461bcd60e51b8152600401610898906130ae565b6001600160a01b0381166110b45760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610898565b6111de611ef8565b610cd4612294565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061122a92508491508390506118a6565b611232610d06565b1561124f5760405162461bcd60e51b8152600401610898906130e3565b606061126387610bef88610bea8989611a0b565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61129f611ef8565b610c338161222a565b610cd460008051602061342e83398151915261035b6119fc565b6112ca611ef8565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906112fc908590859060040161306c565b600060405180830381600087803b15801561131657600080fd5b505af115801561132a573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610cc090505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c90611373908590859060040161306c565b600060405180830381600087803b15801561138d57600080fd5b505af1158015610b5e573d6000803e3d6000fd5b60006107f960008051602061342e8339815191528361126c565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260009061140f906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b611421611ef8565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b611466611ef8565b610cc082828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061178a92505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506114e992508491508390506118a6565b6114f1610d06565b1561150e5760405162461bcd60e51b8152600401610898906130e3565b610fcc8a6115208b610bea8c8c611a0b565b61152a888a61325c565b611534878961325c565b6001611b64565b611543611ef8565b60005b81811015610c1d5760c9546001600160a01b0316635096023984848481811061157f57634e487b7160e01b600052603260045260246000fd5b905060200201602081019061159491906129dd565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b1580156115d557600080fd5b505af11580156115e9573d6000803e3d6000fd5b5050505080806115f8906133a3565b915050611546565b60008281526097602052604090206001015461161b81611e60565b610c1d8383611f89565b61162d611ef8565b611636816122fc565b6116525760405162461bcd60e51b81526004016108989061310d565b600081815260cd6020526040812061166991612882565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b61169f611ef8565b6116a881612322565b610c33600082612398565b600054610100900460ff166116da5760405162461bcd60e51b81526004016108989061314f565b610cd46116e56119fc565b612242565b600054610100900460ff166117115760405162461bcd60e51b81526004016108989061314f565b610cd4600061171e6119fc565b612398565b600054610100900460ff166114215760405162461bcd60e51b81526004016108989061314f565b600054610100900460ff166117715760405162461bcd60e51b81526004016108989061314f565b60008051602061340e833981519152805460ff19169055565b6000611797600083612175565b600081815260cd6020908152604090912084519293506117bb9290918501906128bc565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980836040516117ec919061309b565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e799060240160206040518083038186803b15801561183857600080fd5b505afa15801561184c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118709190612cb9565b610cc05760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c6090611373908490869060040161319a565b6118af826122fc565b6118cb5760405162461bcd60e51b81526004016108989061310d565b60006118fe8260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a816000015111156119a75761192961191d826000600a6123a2565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b814156119a75760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610898565b6119b0826123e1565b610c1d5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c49440000006044820152606401610898565b6000611a06612546565b905090565b60608282604051602001611a20929190612ecc565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611a515790505090508281600081518110611a8a57634e487b7160e01b600052603260045260246000fd5b602002602001018190525060cd60008581526020019081526020016000208054611ab390613368565b80601f0160208091040260200160405190810160405280929190818152602001828054611adf90613368565b8015611b2c5780601f10611b0157610100808354040283529160200191611b2c565b820191906000526020600020905b815481529060010190602001808311611b0f57829003601f168201915b505050505081600181518110611b5257634e487b7160e01b600052603260045260246000fd5b60209081029190910101529392505050565b6000611b6f8561213a565b5060c954604051634f558e7960e01b8152600481018390529192506001600160a01b031690634f558e799060240160206040518083038186803b158015611bb557600080fd5b505afa158015611bc9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bed9190612cb9565b8015611c7b575060c9546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e9060240160206040518083038186803b158015611c3857600080fd5b505afa158015611c4c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c7091906129f9565b6001600160a01b0316145b15611cef5760c95460405163d106353f60e01b81526001600160a01b039091169063d106353f90611cb89089908590899089908990600401612ffd565b600060405180830381600087803b158015611cd257600080fd5b505af1158015611ce6573d6000803e3d6000fd5b50505050610b5e565b611cf88161258d565b611d01856125e3565b8015611d0e575084516002145b15611dfa5760ca5485516001600160a01b039091169063c36c21259088908890600090611d4b57634e487b7160e01b600052603260045260246000fd5b602090810291909101015160cc546040516001600160e01b031960e086901b168152611d859392916001600160a01b031690600401612fc8565b600060405180830381600087803b158015611d9f57600080fd5b505af1158015611db3573d6000803e3d6000fd5b50505050600084511115611df55760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490611cb890879087908690600401613036565b610b5e565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790611e329089908990899089908990600401612f69565b600060405180830381600087803b158015611e4c57600080fd5b505af1158015610fcc573d6000803e3d6000fd5b610c3381611e6c6119fc565b61263d565b611e7b828261126c565b610cc05760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611eb46119fc565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611f006119fc565b6001600160a01b0316611f1b6033546001600160a01b031690565b6001600160a01b031614610cd45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610898565b610c3360008051602061342e83398151915282611600565b611f93828261126c565b15610cc05760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055611fca6119fc565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b612016610d06565b6120595760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610898565b60008051602061340e833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6120996119fc565b6040516001600160a01b03909116815260200160405180910390a1565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526001906120f5906060016113f6565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b805160009081905b801561216f5782915061215b8285610f26600185613245565b92508061216781613351565b915050612142565b50915091565b60008151600014156121c95760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610898565b82826040516020016121db9190612eb0565b6040516020818303038152906040528051906020012060405160200161220b929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610c3360008051602061342e83398151915282612398565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b61229c610d06565b156122b95760405162461bcd60e51b8152600401610898906130e3565b60008051602061340e833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586120996119fc565b600081815260cd60205260408120805482919061231890613368565b9050119050919050565b61232a611ef8565b6001600160a01b03811661238f5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610898565b610c3381612242565b610cc08282611e71565b604080518082019091526000808252602082015260405180604001604052808381526020018486602001516123d7919061320e565b9052949350505050565b60008151600014156123f557506000919050565b60208201805160f81c60308110801590612413575060398160ff1611155b158015612435575060618160ff16101580156124335750607a8160ff1611155b155b15612444575060009392505050565b835160018111156124b2576124668361245e600184613245565b015160f81c90565b915060308260ff1610158015612480575060398260ff1611155b1580156124a2575060618260ff16101580156124a05750607a8260ff1611155b155b156124b257506000949350505050565b60015b6124c0600183613245565b81101561253a578381015160f81c9250602d83148015906124f6575060308360ff16101580156124f4575060398360ff1611155b155b8015612517575060618360ff16101580156125155750607a8360ff1611155b155b156125285750600095945050505050565b80612532816133a3565b9150506124b5565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b0316331415612588575060331936013560601c90565b503390565b612596816113bb565b15610cfd5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610898565b6000806125fa60008460018651610f269190613245565b60ca549091506001600160a01b0316158015906126365750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b612647828261126c565b610cc05761265f816001600160a01b031660146126a1565b61266a8360206126a1565b60405160200161267b929190612ef4565b60408051601f198184030181529082905262461bcd60e51b82526108989160040161309b565b606060006126b0836002613226565b6126bb90600261320e565b6001600160401b038111156126e057634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561270a576020820181803683370190505b509050600360fc1b8160008151811061273357634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061277057634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000612794846002613226565b61279f90600161320e565b90505b6001811115612833576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106127e157634e487b7160e01b600052603260045260246000fd5b1a60f81b82828151811061280557634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c9361282c81613351565b90506127a2565b5083156126365760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610898565b50805461288e90613368565b6000825580601f1061289e575050565b601f016020900490600052602060002090810190610c339190612940565b8280546128c890613368565b90600052602060002090601f0160209004810192826128ea5760008555612930565b82601f1061290357805160ff1916838001178555612930565b82800160010185558215612930579182015b82811115612930578251825591602001919060010190612915565b5061293c929150612940565b5090565b5b8082111561293c5760008155600101612941565b60008083601f840112612966578182fd5b5081356001600160401b0381111561297c578182fd5b6020830191508360208260051b850101111561299757600080fd5b9250929050565b60008083601f8401126129af578182fd5b5081356001600160401b038111156129c5578182fd5b60208301915083602082850101111561299757600080fd5b6000602082840312156129ee578081fd5b8135612636816133ea565b600060208284031215612a0a578081fd5b8151612636816133ea565b60008060008060008060008060a0898b031215612a30578384fd5b8835612a3b816133ea565b975060208901356001600160401b0380821115612a56578586fd5b612a628c838d01612955565b909950975060408b0135915080821115612a7a578586fd5b612a868c838d01612955565b909750955060608b0135915080821115612a9e578485fd5b50612aab8b828c01612955565b9094509250506080890135612abf816133ff565b809150509295985092959890939650565b60008060008060608587031215612ae5578384fd5b8435612af0816133ea565b93506020850135925060408501356001600160401b03811115612b11578283fd5b612b1d8782880161299e565b95989497509550505050565b60008060008060008060008060a0898b031215612b44578182fd5b8835612b4f816133ea565b97506020890135965060408901356001600160401b0380821115612b71578384fd5b612b7d8c838d0161299e565b909850965060608b0135915080821115612b95578384fd5b612ba18c838d01612955565b909650945060808b0135915080821115612bb9578384fd5b50612bc68b828c01612955565b999c989b5096995094979396929594505050565b60008060208385031215612bec578182fd5b82356001600160401b03811115612c01578283fd5b612c0d85828601612955565b90969095509350505050565b60006020808385031215612c2b578182fd5b82356001600160401b03811115612c40578283fd5b8301601f81018513612c50578283fd5b8035612c63612c5e826131eb565b6131bb565b80828252848201915084840188868560051b8701011115612c82578687fd5b8694505b83851015612cad578035612c99816133ea565b835260019490940193918501918501612c86565b50979650505050505050565b600060208284031215612cca578081fd5b8151612636816133ff565b600060208284031215612ce6578081fd5b5035919050565b60008060408385031215612cff578182fd5b823591506020830135612d11816133ea565b809150509250929050565b600060208284031215612d2d578081fd5b81356001600160e01b031981168114612636578182fd5b600080600080600060a08688031215612d5b578283fd5b8535612d66816133ea565b94506020860135612d76816133ea565b93506040860135612d86816133ea565b92506060860135612d96816133ea565b91506080860135612da6816133ea565b809150509295509295909350565b60008060208385031215612dc6578182fd5b82356001600160401b03811115612ddb578283fd5b612c0d8582860161299e565b600080600060408486031215612dfb578081fd5b8335925060208401356001600160401b03811115612e17578182fd5b612e238682870161299e565b9497909650939450505050565b600081518084526020808501808196508360051b81019150828601855b85811015612e77578284038952612e65848351612e84565b98850198935090840190600101612e4d565b5091979650505050505050565b60008151808452612e9c816020860160208601613321565b601f01601f19169290920160200192915050565b60008251612ec2818460208701613321565b9190910192915050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351612f2c816017850160208801613321565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351612f5d816028840160208801613321565b01602801949350505050565b6001600160a01b038616815260a060208201819052600090612f8d90830187612e30565b8281036040840152612f9f8187612e30565b90508281036060840152612fb38186612e30565b91505082151560808301529695505050505050565b600060018060a01b03808616835260606020840152612fea6060840186612e84565b9150808416604084015250949350505050565b60018060a01b038616815284602082015260a06040820152600061302460a0830186612e30565b8281036060840152612fb38186612e30565b6060815260006130496060830186612e30565b828103602084015261305b8186612e30565b915050826040830152949350505050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b6020815260006126366020830184612e84565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b8281526040602082015260006131b36040830184612e84565b949350505050565b604051601f8201601f191681016001600160401b03811182821017156131e3576131e36133d4565b604052919050565b60006001600160401b03821115613204576132046133d4565b5060051b60200190565b60008219821115613221576132216133be565b500190565b6000816000190483118215151615613240576132406133be565b500290565b600082821015613257576132576133be565b500390565b600061326a612c5e846131eb565b808482526020808301925084368760051b87011115613287578485fd5b845b878110156133155781356001600160401b03808211156132a7578788fd5b90880190601f36818401126132ba578889fd5b8235828111156132cc576132cc6133d4565b6132dd818301601f191688016131bb565b925080835236878286010111156132f257898afd5b808785018885013782018601899052508652509382019390820190600101613289565b50919695505050505050565b60005b8381101561333c578181015183820152602001613324565b8381111561334b576000848401525b50505050565b600081613360576133606133be565b506000190190565b600181811c9082168061337c57607f821691505b6020821081141561339d57634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156133b7576133b76133be565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610c3357600080fd5b8015158114610c3357600080fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
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
