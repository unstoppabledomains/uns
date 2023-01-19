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
const _bytecode = "0x608060405234801561001057600080fd5b50613433806100206000396000f3fe60806040526004361061023b5760003560e01c8063906cecc11161012e578063b9998a24116100ab578063d53913931161006f578063d5391393146106ea578063d547741f1461070c578063ec5273891461072c578063f2fde38b1461074c578063ffa1ad741461076c57600080fd5b8063b9998a241461064a578063c3a3bc001461066a578063cc2c3fc41461068a578063ceeb4f50146106aa578063d1f5692c146106ca57600080fd5b8063a217fddf116100f2578063a217fddf14610588578063a3f4df7e1461059d578063a849d65c146105ea578063aa271e1a1461060a578063b0aa98c71461062a57600080fd5b8063906cecc1146104f357806391d1485414610513578063983b2d5614610533578063986502751461055357806399e0dd7c1461056857600080fd5b80635b6fa8db116101bc578063715018a611610180578063715018a61461047857806371e2a6571461048d57806381c81d35146104ad5780638456cb59146104c05780638da5cb5b146104d557600080fd5b80635b6fa8db146103f05780635c975abb146104105780635cd7e3b3146104255780635fc1964f14610445578063634486da1461046557600080fd5b80633092afd5116102035780633092afd51461031557806336568abe146103355780633f41b614146103555780633f4ba83a1461038d578063572b6c05146103a257600080fd5b806301ffc9a7146102405780631459457a14610275578063248a9ca314610297578063268b15ed146102d55780632f2ff15d146102f5575b600080fd5b34801561024c57600080fd5b5061026061025b366004612d2a565b61079d565b60405190151581526020015b60405180910390f35b34801561028157600080fd5b50610295610290366004612d52565b6107d4565b005b3480156102a357600080fd5b506102c76102b2366004612ce3565b60009081526097602052604090206001015490565b60405190815260200161026c565b3480156102e157600080fd5b506102956102f0366004612df5565b610b3b565b34801561030157600080fd5b50610295610310366004612cfb565b610bcd565b34801561032157600080fd5b506102956103303660046129eb565b610bf7565b34801561034157600080fd5b50610295610350366004612cfb565b610c0b565b34801561036157600080fd5b5060c954610375906001600160a01b031681565b6040516001600160a01b03909116815260200161026c565b34801561039957600080fd5b50610295610c99565b3480156103ae57600080fd5b506102606103bd3660046129eb565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b3480156103fc57600080fd5b5060cc54610375906001600160a01b031681565b34801561041c57600080fd5b50610260610cab565b34801561043157600080fd5b50610295610440366004612a23565b610cc1565b34801561045157600080fd5b50610295610460366004612c27565b610f7d565b6102956104733660046129eb565b610fd3565b34801561048457600080fd5b506102956110c6565b34801561049957600080fd5b506102956104a8366004612c27565b6110d8565b6102956104bb3660046129eb565b61112e565b3480156104cc57600080fd5b506102956111db565b3480156104e157600080fd5b506033546001600160a01b0316610375565b3480156104ff57600080fd5b5061029561050e366004612ade565b6111eb565b34801561051f57600080fd5b5061026061052e366004612cfb565b611271565b34801561053f57600080fd5b5061029561054e3660046129eb565b61129c565b34801561055f57600080fd5b506102956112ad565b34801561057457600080fd5b50610295610583366004612dc2565b6112c7565b34801561059457600080fd5b506102c7600081565b3480156105a957600080fd5b506105dd604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b60405161026c91906130a9565b3480156105f657600080fd5b5060cb54610375906001600160a01b031681565b34801561061657600080fd5b506102606106253660046129eb565b6113a6565b34801561063657600080fd5b50610260610645366004612ce3565b6113c0565b34801561065657600080fd5b506102956106653660046129eb565b61141e565b34801561067657600080fd5b50610295610685366004612dc2565b611463565b34801561069657600080fd5b5060ca54610375906001600160a01b031681565b3480156106b657600080fd5b506102956106c5366004612b37565b6114aa565b3480156106d657600080fd5b506102956106e5366004612be8565b611540565b3480156106f657600080fd5b506102c760008051602061340783398151915281565b34801561071857600080fd5b50610295610727366004612cfb565b611605565b34801561073857600080fd5b50610295610747366004612ce3565b61162a565b34801561075857600080fd5b506102956107673660046129eb565b61169c565b34801561077857600080fd5b506105dd60405180604001604052806005815260200164302e342e3960d81b81525081565b60006001600160e01b03198216637965db0b60e01b14806107ce57506301ffc9a760e01b6001600160e01b03198316145b92915050565b600054610100900460ff16158080156107f45750600054600160ff909116105b8061080e5750303b15801561080e575060005460ff166001145b6108765760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff191660011790558015610899576000805461ff0019166101001790555b60c980546001600160a01b038089166001600160a01b03199283161790925560ca805488841690831617905560cb805487841690831617905560cc8054928616929091169190911790556108eb6116b8565b6108f36116ef565b6108fc82611728565b61090461174f565b604080516101e08101825260066101a082018181526563727970746f60d01b6101c0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185529182526535b632bb32b960d11b8282015261016083019190915282518084019093526002835261686960f01b9083015261018081019190915260005b600d811015610aeb57610ad98282600d8110610acf57634e487b7160e01b600052603260045260246000fd5b602002015161178f565b80610ae38161337c565b915050610aa3565b50508015610b33576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050505050565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610b7f92508491508390506118ab565b610b87610cab565b15610ba45760405162461bcd60e51b815260040161086d906130bc565b6060610b33610bb1611a01565b610bc488610bbf8989611a10565b611a3c565b83846001611b69565b600082815260976020526040902060010154610be881611e65565b610bf28383611e76565b505050565b610bff611efd565b610c0881611f76565b50565b610c13611a01565b6001600160a01b0316816001600160a01b031614610c8b5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b606482015260840161086d565b610c958282611f8e565b5050565b610ca1611efd565b610ca9612013565b565b6000805160206133e78339815191525460ff1690565b610ccb8688613235565b805160021415610d3d57610ce0610625611a01565b610d385760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b606482015260840161086d565b610e4a565b6000610d48826120bb565b60c9549092506001600160a01b0316905063430c2081610d66611a01565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b158015610dac57600080fd5b505afa158015610dc0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610de49190612cc7565b610e485760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b606482015260840161086d565b505b610e548789613235565b600281511015610eb45760405162461bcd60e51b815260206004820152602560248201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456044820152642627abaf9960d91b606482015260840161086d565b610f24610ef660008360018551610ecb919061321e565b81518110610ee957634e487b7160e01b600052603260045260246000fd5b60200260200101516120f6565b82600081518110610f1757634e487b7160e01b600052603260045260246000fd5b60200260200101516118ab565b610f2c610cab565b15610f495760405162461bcd60e51b815260040161086d906130bc565b610f718a610f578a8c613235565b610f61898b613235565b610f6b888a613235565b87611b69565b50505050505050505050565b610f85611efd565b60005b8151811015610c9557610fc1828281518110610fb457634e487b7160e01b600052603260045260246000fd5b6020026020010151611f76565b80610fcb8161337c565b915050610f88565b610fde610625611a01565b61102a5760405162461bcd60e51b815260206004820181905260248201527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604482015260640161086d565b6001600160a01b0381166110805760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d505459000000604482015260640161086d565b611089816121ab565b6110916112ad565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610c95573d6000803e3d6000fd5b6110ce611efd565b610ca960006121c3565b6110e0611efd565b60005b8151811015610c955761111c82828151811061110f57634e487b7160e01b600052603260045260246000fd5b60200260200101516121ab565b806111268161337c565b9150506110e3565b611139610625611a01565b6111855760405162461bcd60e51b815260206004820181905260248201527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604482015260640161086d565b6001600160a01b0381166110895760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d505459000000604482015260640161086d565b6111e3611efd565b610ca9612215565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061122f92508491508390506118ab565b611237610cab565b156112545760405162461bcd60e51b815260040161086d906130bc565b606061126887610bc488610bbf8989611a10565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6112a4611efd565b610c08816121ab565b610ca9600080516020613407833981519152610350611a01565b6112cf611efd565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c90611301908590859060040161307a565b600060405180830381600087803b15801561131b57600080fd5b505af115801561132f573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610c9590505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c90611378908590859060040161307a565b600060405180830381600087803b15801561139257600080fd5b505af1158015610b33573d6000803e3d6000fd5b60006107ce60008051602061340783398151915283611271565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101829052600090611414906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b611426611efd565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b61146b611efd565b610c9582828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061178f92505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506114ee92508491508390506118ab565b6114f6610cab565b156115135760405162461bcd60e51b815260040161086d906130bc565b610f718a6115258b610bbf8c8c611a10565b61152f888a613235565b6115398789613235565b6001611b69565b611548611efd565b60005b81811015610bf25760c9546001600160a01b0316635096023984848481811061158457634e487b7160e01b600052603260045260246000fd5b905060200201602081019061159991906129eb565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b1580156115da57600080fd5b505af11580156115ee573d6000803e3d6000fd5b5050505080806115fd9061337c565b91505061154b565b60008281526097602052604090206001015461162081611e65565b610bf28383611f8e565b611632611efd565b61163b8161227d565b6116575760405162461bcd60e51b815260040161086d906130e6565b600081815260cd6020526040812061166e91612890565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b6116a4611efd565b6116ad816122a3565b610c08600082612319565b600054610100900460ff166116df5760405162461bcd60e51b815260040161086d90613128565b610ca96116ea611a01565b6121c3565b600054610100900460ff166117165760405162461bcd60e51b815260040161086d90613128565b610ca96000611723611a01565b612319565b600054610100900460ff166114265760405162461bcd60e51b815260040161086d90613128565b600054610100900460ff166117765760405162461bcd60e51b815260040161086d90613128565b6000805160206133e7833981519152805460ff19169055565b600061179c6000836120f6565b600081815260cd6020908152604090912084519293506117c09290918501906128ca565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980836040516117f191906130a9565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e799060240160206040518083038186803b15801561183d57600080fd5b505afa158015611851573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118759190612cc7565b610c955760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c60906113789084908690600401613173565b6118b48261227d565b6118d05760405162461bcd60e51b815260040161086d906130e6565b60006119038260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a816000015111156119ac5761192e611922826000600a612323565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b814156119ac5760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b606482015260840161086d565b6119b582612362565b610bf25760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c4944000000604482015260640161086d565b6000611a0b6124c7565b905090565b60608282604051602001611a25929190612eda565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611a565790505090508281600081518110611a8f57634e487b7160e01b600052603260045260246000fd5b602002602001018190525060cd60008581526020019081526020016000208054611ab890613341565b80601f0160208091040260200160405190810160405280929190818152602001828054611ae490613341565b8015611b315780601f10611b0657610100808354040283529160200191611b31565b820191906000526020600020905b815481529060010190602001808311611b1457829003601f168201915b505050505081600181518110611b5757634e487b7160e01b600052603260045260246000fd5b60209081029190910101529392505050565b6000611b74856120bb565b5060c954604051634f558e7960e01b8152600481018390529192506001600160a01b031690634f558e799060240160206040518083038186803b158015611bba57600080fd5b505afa158015611bce573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bf29190612cc7565b8015611c80575060c9546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e9060240160206040518083038186803b158015611c3d57600080fd5b505afa158015611c51573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c759190612a07565b6001600160a01b0316145b15611cf45760c95460405163d106353f60e01b81526001600160a01b039091169063d106353f90611cbd908990859089908990899060040161300b565b600060405180830381600087803b158015611cd757600080fd5b505af1158015611ceb573d6000803e3d6000fd5b50505050610b33565b611cfd8161250e565b611d068561256d565b8015611d13575084516002145b15611dff5760ca5485516001600160a01b039091169063c36c21259088908890600090611d5057634e487b7160e01b600052603260045260246000fd5b602090810291909101015160cc546040516001600160e01b031960e086901b168152611d8a9392916001600160a01b031690600401612fd6565b600060405180830381600087803b158015611da457600080fd5b505af1158015611db8573d6000803e3d6000fd5b50505050600084511115611dfa5760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490611cbd90879087908690600401613044565b610b33565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790611e379089908990899089908990600401612f77565b600060405180830381600087803b158015611e5157600080fd5b505af1158015610f71573d6000803e3d6000fd5b610c0881611e71611a01565b6125c7565b611e808282611271565b610c955760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611eb9611a01565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611f05611a01565b6001600160a01b0316611f206033546001600160a01b031690565b6001600160a01b031614610ca95760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161086d565b610c0860008051602061340783398151915282611605565b611f988282611271565b15610c955760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055611fcf611a01565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b61201b610cab565b61205e5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b604482015260640161086d565b6000805160206133e7833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa61209e611a01565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b80156120f0578291506120dc8285610ecb60018561321e565b9250806120e88161332a565b9150506120c3565b50915091565b600081516000141561214a5760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d5054590000000000604482015260640161086d565b828260405160200161215c9190612ebe565b6040516020818303038152906040528051906020012060405160200161218c929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610c0860008051602061340783398151915282612319565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b61221d610cab565b1561223a5760405162461bcd60e51b815260040161086d906130bc565b6000805160206133e7833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861209e611a01565b600081815260cd60205260408120805482919061229990613341565b9050119050919050565b6122ab611efd565b6001600160a01b0381166123105760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161086d565b610c08816121c3565b610c958282611e76565b6040805180820190915260008082526020820152604051806040016040528083815260200184866020015161235891906131e7565b9052949350505050565b600081516000141561237657506000919050565b60208201805160f81c60308110801590612394575060398160ff1611155b1580156123b6575060618160ff16101580156123b45750607a8160ff1611155b155b156123c5575060009392505050565b83516001811115612433576123e7836123df60018461321e565b015160f81c90565b915060308260ff1610158015612401575060398260ff1611155b158015612423575060618260ff16101580156124215750607a8260ff1611155b155b1561243357506000949350505050565b60015b61244160018361321e565b8110156124bb578381015160f81c9250602d8314801590612477575060308360ff1610158015612475575060398360ff1611155b155b8015612498575060618360ff16101580156124965750607a8360ff1611155b155b156124a95750600095945050505050565b806124b38161337c565b915050612436565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b0316331415612509575060331936013560601c90565b503390565b612517816113c0565b156125645760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b4544000000604482015260640161086d565b610c088161262b565b60008061258460008460018651610ecb919061321e565b60ca549091506001600160a01b0316158015906125c05750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6125d18282611271565b610c95576125e9816001600160a01b031660146126af565b6125f48360206126af565b604051602001612605929190612f02565b60408051601f198184030181529082905262461bcd60e51b825261086d916004016130a9565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260019061266a906060016113fb565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b606060006126be8360026131ff565b6126c99060026131e7565b6001600160401b038111156126ee57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015612718576020820181803683370190505b509050600360fc1b8160008151811061274157634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061277e57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060006127a28460026131ff565b6127ad9060016131e7565b90505b6001811115612841576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106127ef57634e487b7160e01b600052603260045260246000fd5b1a60f81b82828151811061281357634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c9361283a8161332a565b90506127b0565b5083156125c05760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161086d565b50805461289c90613341565b6000825580601f106128ac575050565b601f016020900490600052602060002090810190610c08919061294e565b8280546128d690613341565b90600052602060002090601f0160209004810192826128f8576000855561293e565b82601f1061291157805160ff191683800117855561293e565b8280016001018555821561293e579182015b8281111561293e578251825591602001919060010190612923565b5061294a92915061294e565b5090565b5b8082111561294a576000815560010161294f565b60008083601f840112612974578182fd5b5081356001600160401b0381111561298a578182fd5b6020830191508360208260051b85010111156129a557600080fd5b9250929050565b60008083601f8401126129bd578182fd5b5081356001600160401b038111156129d3578182fd5b6020830191508360208285010111156129a557600080fd5b6000602082840312156129fc578081fd5b81356125c0816133c3565b600060208284031215612a18578081fd5b81516125c0816133c3565b60008060008060008060008060a0898b031215612a3e578384fd5b8835612a49816133c3565b975060208901356001600160401b0380821115612a64578586fd5b612a708c838d01612963565b909950975060408b0135915080821115612a88578586fd5b612a948c838d01612963565b909750955060608b0135915080821115612aac578485fd5b50612ab98b828c01612963565b9094509250506080890135612acd816133d8565b809150509295985092959890939650565b60008060008060608587031215612af3578384fd5b8435612afe816133c3565b93506020850135925060408501356001600160401b03811115612b1f578283fd5b612b2b878288016129ac565b95989497509550505050565b60008060008060008060008060a0898b031215612b52578182fd5b8835612b5d816133c3565b97506020890135965060408901356001600160401b0380821115612b7f578384fd5b612b8b8c838d016129ac565b909850965060608b0135915080821115612ba3578384fd5b612baf8c838d01612963565b909650945060808b0135915080821115612bc7578384fd5b50612bd48b828c01612963565b999c989b5096995094979396929594505050565b60008060208385031215612bfa578182fd5b82356001600160401b03811115612c0f578283fd5b612c1b85828601612963565b90969095509350505050565b60006020808385031215612c39578182fd5b82356001600160401b03811115612c4e578283fd5b8301601f81018513612c5e578283fd5b8035612c71612c6c826131c4565b613194565b80828252848201915084840188868560051b8701011115612c90578687fd5b8694505b83851015612cbb578035612ca7816133c3565b835260019490940193918501918501612c94565b50979650505050505050565b600060208284031215612cd8578081fd5b81516125c0816133d8565b600060208284031215612cf4578081fd5b5035919050565b60008060408385031215612d0d578182fd5b823591506020830135612d1f816133c3565b809150509250929050565b600060208284031215612d3b578081fd5b81356001600160e01b0319811681146125c0578182fd5b600080600080600060a08688031215612d69578283fd5b8535612d74816133c3565b94506020860135612d84816133c3565b93506040860135612d94816133c3565b92506060860135612da4816133c3565b91506080860135612db4816133c3565b809150509295509295909350565b60008060208385031215612dd4578182fd5b82356001600160401b03811115612de9578283fd5b612c1b858286016129ac565b600080600060408486031215612e09578081fd5b8335925060208401356001600160401b03811115612e25578182fd5b612e31868287016129ac565b9497909650939450505050565b600081518084526020808501808196508360051b81019150828601855b85811015612e85578284038952612e73848351612e92565b98850198935090840190600101612e5b565b5091979650505050505050565b60008151808452612eaa8160208601602086016132fa565b601f01601f19169290920160200192915050565b60008251612ed08184602087016132fa565b9190910192915050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351612f3a8160178501602088016132fa565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351612f6b8160288401602088016132fa565b01602801949350505050565b6001600160a01b038616815260a060208201819052600090612f9b90830187612e3e565b8281036040840152612fad8187612e3e565b90508281036060840152612fc18186612e3e565b91505082151560808301529695505050505050565b600060018060a01b03808616835260606020840152612ff86060840186612e92565b9150808416604084015250949350505050565b60018060a01b038616815284602082015260a06040820152600061303260a0830186612e3e565b8281036060840152612fc18186612e3e565b6060815260006130576060830186612e3e565b82810360208401526130698186612e3e565b915050826040830152949350505050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b6020815260006125c06020830184612e92565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b82815260406020820152600061318c6040830184612e92565b949350505050565b604051601f8201601f191681016001600160401b03811182821017156131bc576131bc6133ad565b604052919050565b60006001600160401b038211156131dd576131dd6133ad565b5060051b60200190565b600082198211156131fa576131fa613397565b500190565b600081600019048311821515161561321957613219613397565b500290565b60008282101561323057613230613397565b500390565b6000613243612c6c846131c4565b808482526020808301925084368760051b87011115613260578485fd5b845b878110156132ee5781356001600160401b0380821115613280578788fd5b90880190601f3681840112613293578889fd5b8235828111156132a5576132a56133ad565b6132b6818301601f19168801613194565b925080835236878286010111156132cb57898afd5b808785018885013782018601899052508652509382019390820190600101613262565b50919695505050505050565b60005b838110156133155781810151838201526020016132fd565b83811115613324576000848401525b50505050565b60008161333957613339613397565b506000190190565b600181811c9082168061335557607f821691505b6020821081141561337657634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561339057613390613397565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610c0857600080fd5b8015158114610c0857600080fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
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
