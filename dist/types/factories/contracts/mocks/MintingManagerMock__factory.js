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
const _bytecode = "0x608060405234801561001057600080fd5b50613575806100206000396000f3fe6080604052600436106102465760003560e01c8063906cecc111610139578063b0aa98c7116100b6578063d1f5692c1161007a578063d1f5692c146106f5578063d539139314610715578063d547741f14610737578063ec52738914610757578063f2fde38b14610777578063ffa1ad741461079757600080fd5b8063b0aa98c714610655578063b9998a2414610675578063c3a3bc0014610695578063cc2c3fc4146106b5578063ceeb4f50146106d557600080fd5b8063a217fddf116100fd578063a217fddf14610593578063a3f4df7e146105a8578063a849d65c146105f5578063aa271e1a14610615578063ae31844a1461063557600080fd5b8063906cecc1146104fe57806391d148541461051e578063983b2d561461053e578063986502751461055e57806399e0dd7c1461057357600080fd5b80635b6fa8db116101c7578063715018a61161018b578063715018a61461048357806371e2a6571461049857806381c81d35146104b85780638456cb59146104cb5780638da5cb5b146104e057600080fd5b80635b6fa8db146103fb5780635c975abb1461041b5780635cd7e3b3146104305780635fc1964f14610450578063634486da1461047057600080fd5b80633092afd51161020e5780633092afd51461032057806336568abe146103405780633f41b614146103605780633f4ba83a14610398578063572b6c05146103ad57600080fd5b806301ffc9a71461024b5780631459457a14610280578063248a9ca3146102a2578063268b15ed146102e05780632f2ff15d14610300575b600080fd5b34801561025757600080fd5b5061026b610266366004612e00565b6107c8565b60405190151581526020015b60405180910390f35b34801561028c57600080fd5b506102a061029b366004612e28565b6107ff565b005b3480156102ae57600080fd5b506102d26102bd366004612db9565b60009081526097602052604090206001015490565b604051908152602001610277565b3480156102ec57600080fd5b506102a06102fb366004612ecb565b610b66565b34801561030c57600080fd5b506102a061031b366004612dd1565b610bf8565b34801561032c57600080fd5b506102a061033b366004612ac1565b610c22565b34801561034c57600080fd5b506102a061035b366004612dd1565b610c36565b34801561036c57600080fd5b5060c954610380906001600160a01b031681565b6040516001600160a01b039091168152602001610277565b3480156103a457600080fd5b506102a0610cc4565b3480156103b957600080fd5b5061026b6103c8366004612ac1565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561040757600080fd5b5060cc54610380906001600160a01b031681565b34801561042757600080fd5b5061026b610cd6565b34801561043c57600080fd5b506102a061044b366004612af9565b610cec565b34801561045c57600080fd5b506102a061046b366004612cfd565b610fa8565b6102a061047e366004612ac1565b610ffe565b34801561048f57600080fd5b506102a06110c1565b3480156104a457600080fd5b506102a06104b3366004612cfd565b6110d3565b6102a06104c6366004612ac1565b611129565b3480156104d757600080fd5b506102a06111a6565b3480156104ec57600080fd5b506033546001600160a01b0316610380565b34801561050a57600080fd5b506102a0610519366004612bb4565b6111b6565b34801561052a57600080fd5b5061026b610539366004612dd1565b61123c565b34801561054a57600080fd5b506102a0610559366004612ac1565b611267565b34801561056a57600080fd5b506102a0611278565b34801561057f57600080fd5b506102a061058e366004612e98565b611292565b34801561059f57600080fd5b506102d2600081565b3480156105b457600080fd5b506105e8604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b60405161027791906131b6565b34801561060157600080fd5b5060cb54610380906001600160a01b031681565b34801561062157600080fd5b5061026b610630366004612ac1565b611371565b34801561064157600080fd5b506102a0610650366004612cbe565b61138b565b34801561066157600080fd5b5061026b610670366004612db9565b611496565b34801561068157600080fd5b506102a0610690366004612ac1565b6114f4565b3480156106a157600080fd5b506102a06106b0366004612e98565b611539565b3480156106c157600080fd5b5060ca54610380906001600160a01b031681565b3480156106e157600080fd5b506102a06106f0366004612c0d565b611580565b34801561070157600080fd5b506102a0610710366004612cbe565b611616565b34801561072157600080fd5b506102d260008051602061354983398151915281565b34801561074357600080fd5b506102a0610752366004612dd1565b6116db565b34801561076357600080fd5b506102a0610772366004612db9565b611700565b34801561078357600080fd5b506102a0610792366004612ac1565b611772565b3480156107a357600080fd5b506105e860405180604001604052806005815260200164302e342e3960d81b81525081565b60006001600160e01b03198216637965db0b60e01b14806107f957506301ffc9a760e01b6001600160e01b03198316145b92915050565b600054610100900460ff161580801561081f5750600054600160ff909116105b806108395750303b158015610839575060005460ff166001145b6108a15760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff1916600117905580156108c4576000805461ff0019166101001790555b60c980546001600160a01b038089166001600160a01b03199283161790925560ca805488841690831617905560cb805487841690831617905560cc80549286169290911691909117905561091661178e565b61091e6117c5565b610927826117fe565b61092f611825565b604080516101e08101825260066101a082018181526563727970746f60d01b6101c0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185529182526535b632bb32b960d11b8282015261016083019190915282518084019093526002835261686960f01b9083015261018081019190915260005b600d811015610b1657610b048282600d8110610afa57634e487b7160e01b600052603260045260246000fd5b6020020151611865565b80610b0e816134be565b915050610ace565b50508015610b5e576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050505050565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610baa9250849150839050611981565b610bb2610cd6565b15610bcf5760405162461bcd60e51b8152600401610898906131fe565b6060610b5e610bdc611ad7565b610bef88610bea8989611ae6565b611b12565b83846001611c3f565b600082815260976020526040902060010154610c1381611f3b565b610c1d8383611f4c565b505050565b610c2a611fd3565b610c338161204c565b50565b610c3e611ad7565b6001600160a01b0316816001600160a01b031614610cb65760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610898565b610cc08282612064565b5050565b610ccc611fd3565b610cd46120e9565b565b6000805160206135298339815191525460ff1690565b610cf68688613377565b805160021415610d6857610d0b610630611ad7565b610d635760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610898565b610e75565b6000610d7382612191565b60c9549092506001600160a01b0316905063430c2081610d91611ad7565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b158015610dd757600080fd5b505afa158015610deb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e0f9190612d9d565b610e735760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b6064820152608401610898565b505b610e7f8789613377565b600281511015610edf5760405162461bcd60e51b815260206004820152602560248201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456044820152642627abaf9960d91b6064820152608401610898565b610f4f610f2160008360018551610ef69190613360565b81518110610f1457634e487b7160e01b600052603260045260246000fd5b60200260200101516121cc565b82600081518110610f4257634e487b7160e01b600052603260045260246000fd5b6020026020010151611981565b610f57610cd6565b15610f745760405162461bcd60e51b8152600401610898906131fe565b610f9c8a610f828a8c613377565b610f8c898b613377565b610f96888a613377565b87611c3f565b50505050505050505050565b610fb0611fd3565b60005b8151811015610cc057610fec828281518110610fdf57634e487b7160e01b600052603260045260246000fd5b602002602001015161204c565b80610ff6816134be565b915050610fb3565b611009610630611ad7565b6110255760405162461bcd60e51b8152600401610898906131c9565b6001600160a01b03811661107b5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610898565b61108481612281565b61108c611278565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610cc0573d6000803e3d6000fd5b6110c9611fd3565b610cd46000612299565b6110db611fd3565b60005b8151811015610cc05761111782828151811061110a57634e487b7160e01b600052603260045260246000fd5b6020026020010151612281565b80611121816134be565b9150506110de565b611134610630611ad7565b6111505760405162461bcd60e51b8152600401610898906131c9565b6001600160a01b0381166110845760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610898565b6111ae611fd3565b610cd46122eb565b8282828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506111fa9250849150839050611981565b611202610cd6565b1561121f5760405162461bcd60e51b8152600401610898906131fe565b606061123387610bef88610bea8989611ae6565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61126f611fd3565b610c3381612281565b610cd460008051602061354983398151915261035b611ad7565b61129a611fd3565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906112cc9085908590600401613187565b600060405180830381600087803b1580156112e657600080fd5b505af11580156112fa573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610cc090505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906113439085908590600401613187565b600060405180830381600087803b15801561135d57600080fd5b505af1158015610b5e573d6000803e3d6000fd5b60006107f96000805160206135498339815191528361123c565b611396610630611ad7565b6113b25760405162461bcd60e51b8152600401610898906131c9565b60c9546040516000916001600160a01b0316906113d5908590859060240161314d565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b1790525161140a9190612f91565b6000604051808303816000865af19150503d8060008114611447576040519150601f19603f3d011682016040523d82523d6000602084013e61144c565b606091505b5050905080610c1d5760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b6044820152606401610898565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526000906114ea906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b6114fc611fd3565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b611541611fd3565b610cc082828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061186592505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506115c49250849150839050611981565b6115cc610cd6565b156115e95760405162461bcd60e51b8152600401610898906131fe565b610f9c8a6115fb8b610bea8c8c611ae6565b611605888a613377565b61160f8789613377565b6001611c3f565b61161e611fd3565b60005b81811015610c1d5760c9546001600160a01b0316635096023984848481811061165a57634e487b7160e01b600052603260045260246000fd5b905060200201602081019061166f9190612ac1565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b1580156116b057600080fd5b505af11580156116c4573d6000803e3d6000fd5b5050505080806116d3906134be565b915050611621565b6000828152609760205260409020600101546116f681611f3b565b610c1d8383612064565b611708611fd3565b61171181612353565b61172d5760405162461bcd60e51b815260040161089890613228565b600081815260cd6020526040812061174491612966565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b61177a611fd3565b61178381612379565b610c336000826123ef565b600054610100900460ff166117b55760405162461bcd60e51b81526004016108989061326a565b610cd46117c0611ad7565b612299565b600054610100900460ff166117ec5760405162461bcd60e51b81526004016108989061326a565b610cd460006117f9611ad7565b6123ef565b600054610100900460ff166114fc5760405162461bcd60e51b81526004016108989061326a565b600054610100900460ff1661184c5760405162461bcd60e51b81526004016108989061326a565b600080516020613529833981519152805460ff19169055565b60006118726000836121cc565b600081815260cd6020908152604090912084519293506118969290918501906129a0565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980836040516118c791906131b6565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e799060240160206040518083038186803b15801561191357600080fd5b505afa158015611927573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061194b9190612d9d565b610cc05760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c609061134390849086906004016132b5565b61198a82612353565b6119a65760405162461bcd60e51b815260040161089890613228565b60006119d98260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115611a8257611a046119f8826000600a6123f9565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b81415611a825760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610898565b611a8b82612438565b610c1d5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c49440000006044820152606401610898565b6000611ae161259d565b905090565b60608282604051602001611afb929190612fad565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611b2c5790505090508281600081518110611b6557634e487b7160e01b600052603260045260246000fd5b602002602001018190525060cd60008581526020019081526020016000208054611b8e90613483565b80601f0160208091040260200160405190810160405280929190818152602001828054611bba90613483565b8015611c075780601f10611bdc57610100808354040283529160200191611c07565b820191906000526020600020905b815481529060010190602001808311611bea57829003601f168201915b505050505081600181518110611c2d57634e487b7160e01b600052603260045260246000fd5b60209081029190910101529392505050565b6000611c4a85612191565b5060c954604051634f558e7960e01b8152600481018390529192506001600160a01b031690634f558e799060240160206040518083038186803b158015611c9057600080fd5b505afa158015611ca4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cc89190612d9d565b8015611d56575060c9546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e9060240160206040518083038186803b158015611d1357600080fd5b505afa158015611d27573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d4b9190612add565b6001600160a01b0316145b15611dca5760c95460405163d106353f60e01b81526001600160a01b039091169063d106353f90611d9390899085908990899089906004016130de565b600060405180830381600087803b158015611dad57600080fd5b505af1158015611dc1573d6000803e3d6000fd5b50505050610b5e565b611dd3816125e4565b611ddc85612643565b8015611de9575084516002145b15611ed55760ca5485516001600160a01b039091169063c36c21259088908890600090611e2657634e487b7160e01b600052603260045260246000fd5b602090810291909101015160cc546040516001600160e01b031960e086901b168152611e609392916001600160a01b0316906004016130a9565b600060405180830381600087803b158015611e7a57600080fd5b505af1158015611e8e573d6000803e3d6000fd5b50505050600084511115611ed05760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490611d9390879087908690600401613117565b610b5e565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790611f0d908990899089908990899060040161304a565b600060405180830381600087803b158015611f2757600080fd5b505af1158015610f9c573d6000803e3d6000fd5b610c3381611f47611ad7565b61269d565b611f56828261123c565b610cc05760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611f8f611ad7565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611fdb611ad7565b6001600160a01b0316611ff66033546001600160a01b031690565b6001600160a01b031614610cd45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610898565b610c33600080516020613549833981519152826116db565b61206e828261123c565b15610cc05760008281526097602090815260408083206001600160a01b03851684529091529020805460ff191690556120a5611ad7565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6120f1610cd6565b6121345760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610898565b600080516020613529833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa612174611ad7565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b80156121c6578291506121b28285610ef6600185613360565b9250806121be8161346c565b915050612199565b50915091565b60008151600014156122205760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610898565b82826040516020016122329190612f91565b60405160208183030381529060405280519060200120604051602001612262929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610c33600080516020613549833981519152826123ef565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6122f3610cd6565b156123105760405162461bcd60e51b8152600401610898906131fe565b600080516020613529833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612174611ad7565b600081815260cd60205260408120805482919061236f90613483565b9050119050919050565b612381611fd3565b6001600160a01b0381166123e65760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610898565b610c3381612299565b610cc08282611f4c565b6040805180820190915260008082526020820152604051806040016040528083815260200184866020015161242e9190613329565b9052949350505050565b600081516000141561244c57506000919050565b60208201805160f81c6030811080159061246a575060398160ff1611155b15801561248c575060618160ff161015801561248a5750607a8160ff1611155b155b1561249b575060009392505050565b83516001811115612509576124bd836124b5600184613360565b015160f81c90565b915060308260ff16101580156124d7575060398260ff1611155b1580156124f9575060618260ff16101580156124f75750607a8260ff1611155b155b1561250957506000949350505050565b60015b612517600183613360565b811015612591578381015160f81c9250602d831480159061254d575060308360ff161015801561254b575060398360ff1611155b155b801561256e575060618360ff161015801561256c5750607a8360ff1611155b155b1561257f5750600095945050505050565b80612589816134be565b91505061250c565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b03163314156125df575060331936013560601c90565b503390565b6125ed81611496565b1561263a5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610898565b610c3381612701565b60008061265a60008460018651610ef69190613360565b60ca549091506001600160a01b0316158015906126965750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6126a7828261123c565b610cc0576126bf816001600160a01b03166014612785565b6126ca836020612785565b6040516020016126db929190612fd5565b60408051601f198184030181529082905262461bcd60e51b8252610898916004016131b6565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600190612740906060016114d1565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b60606000612794836002613341565b61279f906002613329565b6001600160401b038111156127c457634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156127ee576020820181803683370190505b509050600360fc1b8160008151811061281757634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061285457634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000612878846002613341565b612883906001613329565b90505b6001811115612917576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106128c557634e487b7160e01b600052603260045260246000fd5b1a60f81b8282815181106128e957634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c936129108161346c565b9050612886565b5083156126965760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610898565b50805461297290613483565b6000825580601f10612982575050565b601f016020900490600052602060002090810190610c339190612a24565b8280546129ac90613483565b90600052602060002090601f0160209004810192826129ce5760008555612a14565b82601f106129e757805160ff1916838001178555612a14565b82800160010185558215612a14579182015b82811115612a145782518255916020019190600101906129f9565b50612a20929150612a24565b5090565b5b80821115612a205760008155600101612a25565b60008083601f840112612a4a578182fd5b5081356001600160401b03811115612a60578182fd5b6020830191508360208260051b8501011115612a7b57600080fd5b9250929050565b60008083601f840112612a93578182fd5b5081356001600160401b03811115612aa9578182fd5b602083019150836020828501011115612a7b57600080fd5b600060208284031215612ad2578081fd5b813561269681613505565b600060208284031215612aee578081fd5b815161269681613505565b60008060008060008060008060a0898b031215612b14578384fd5b8835612b1f81613505565b975060208901356001600160401b0380821115612b3a578586fd5b612b468c838d01612a39565b909950975060408b0135915080821115612b5e578586fd5b612b6a8c838d01612a39565b909750955060608b0135915080821115612b82578485fd5b50612b8f8b828c01612a39565b9094509250506080890135612ba38161351a565b809150509295985092959890939650565b60008060008060608587031215612bc9578384fd5b8435612bd481613505565b93506020850135925060408501356001600160401b03811115612bf5578283fd5b612c0187828801612a82565b95989497509550505050565b60008060008060008060008060a0898b031215612c28578182fd5b8835612c3381613505565b97506020890135965060408901356001600160401b0380821115612c55578384fd5b612c618c838d01612a82565b909850965060608b0135915080821115612c79578384fd5b612c858c838d01612a39565b909650945060808b0135915080821115612c9d578384fd5b50612caa8b828c01612a39565b999c989b5096995094979396929594505050565b60008060208385031215612cd0578182fd5b82356001600160401b03811115612ce5578283fd5b612cf185828601612a39565b90969095509350505050565b60006020808385031215612d0f578182fd5b82356001600160401b03811115612d24578283fd5b8301601f81018513612d34578283fd5b8035612d47612d4282613306565b6132d6565b80828252848201915084840188868560051b8701011115612d66578687fd5b8694505b83851015612d91578035612d7d81613505565b835260019490940193918501918501612d6a565b50979650505050505050565b600060208284031215612dae578081fd5b81516126968161351a565b600060208284031215612dca578081fd5b5035919050565b60008060408385031215612de3578182fd5b823591506020830135612df581613505565b809150509250929050565b600060208284031215612e11578081fd5b81356001600160e01b031981168114612696578182fd5b600080600080600060a08688031215612e3f578283fd5b8535612e4a81613505565b94506020860135612e5a81613505565b93506040860135612e6a81613505565b92506060860135612e7a81613505565b91506080860135612e8a81613505565b809150509295509295909350565b60008060208385031215612eaa578182fd5b82356001600160401b03811115612ebf578283fd5b612cf185828601612a82565b600080600060408486031215612edf578081fd5b8335925060208401356001600160401b03811115612efb578182fd5b612f0786828701612a82565b9497909650939450505050565b6000815180845260208085019450848260051b8601828601855b85811015612f58578383038952612f46838351612f65565b98850198925090840190600101612f2e565b5090979650505050505050565b60008151808452612f7d81602086016020860161343c565b601f01601f19169290920160200192915050565b60008251612fa381846020870161343c565b9190910192915050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161300d81601785016020880161343c565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161303e81602884016020880161343c565b01602801949350505050565b6001600160a01b038616815260a06020820181905260009061306e90830187612f14565b82810360408401526130808187612f14565b905082810360608401526130948186612f14565b91505082151560808301529695505050505050565b600060018060a01b038086168352606060208401526130cb6060840186612f65565b9150808416604084015250949350505050565b60018060a01b038616815284602082015260a06040820152600061310560a0830186612f14565b82810360608401526130948186612f14565b60608152600061312a6060830186612f14565b828103602084015261313c8186612f14565b915050826040830152949350505050565b6020808252810182905260006001600160fb1b0383111561316c578081fd5b8260051b808560408501379190910160400190815292915050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b6020815260006126966020830184612f65565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b8281526040602082015260006132ce6040830184612f65565b949350505050565b604051601f8201601f191681016001600160401b03811182821017156132fe576132fe6134ef565b604052919050565b60006001600160401b0382111561331f5761331f6134ef565b5060051b60200190565b6000821982111561333c5761333c6134d9565b500190565b600081600019048311821515161561335b5761335b6134d9565b500290565b600082821015613372576133726134d9565b500390565b6000613385612d4284613306565b808482526020808301925084368760051b870111156133a2578485fd5b845b878110156134305781356001600160401b03808211156133c2578788fd5b90880190601f36818401126133d5578889fd5b8235828111156133e7576133e76134ef565b6133f8818301601f191688016132d6565b9250808352368782860101111561340d57898afd5b8087850188850137820186018990525086525093820193908201906001016133a4565b50919695505050505050565b60005b8381101561345757818101518382015260200161343f565b83811115613466576000848401525b50505050565b60008161347b5761347b6134d9565b506000190190565b600181811c9082168061349757607f821691505b602082108114156134b857634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156134d2576134d26134d9565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610c3357600080fd5b8015158114610c3357600080fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
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
