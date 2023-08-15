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
];
const _bytecode = "0x608060405234801561001057600080fd5b50613675806100206000396000f3fe6080604052600436106102515760003560e01c806391d1485411610139578063b9998a24116100b6578063d1f5692c1161007a578063d1f5692c14610720578063d539139314610740578063d547741f14610762578063ec52738914610782578063f2fde38b146107a2578063ffa1ad74146107c257600080fd5b8063b9998a2414610680578063c3a3bc00146106a0578063cc2a9a5b146106c0578063cc2c3fc4146106e0578063ceeb4f501461070057600080fd5b8063a3f4df7e116100fd578063a3f4df7e146105b3578063a849d65c14610600578063aa271e1a14610620578063b0aa98c714610640578063b3ab15fb1461066057600080fd5b806391d1485414610529578063983b2d5614610549578063986502751461056957806399e0dd7c1461057e578063a217fddf1461059e57600080fd5b80635c975abb116101d257806371e2a6571161019657806371e2a6571461048357806377a2a589146104a357806381c81d35146104c35780638456cb59146104d65780638da5cb5b146104eb578063906cecc11461050957600080fd5b80635c975abb146104065780635cd7e3b31461041b5780635fc1964f1461043b578063634486da1461045b578063715018a61461046e57600080fd5b806336568abe1161021957806336568abe1461032b5780633f41b6141461034b5780633f4ba83a14610383578063572b6c05146103985780635b6fa8db146103e657600080fd5b806301ffc9a714610256578063248a9ca31461028b578063268b15ed146102c95780632f2ff15d146102eb5780633092afd51461030b575b600080fd5b34801561026257600080fd5b50610276610271366004612ab2565b6107f4565b60405190151581526020015b60405180910390f35b34801561029757600080fd5b506102bb6102a6366004612adc565b60009081526097602052604090206001015490565b604051908152602001610282565b3480156102d557600080fd5b506102e96102e4366004612b3d565b61082b565b005b3480156102f757600080fd5b506102e9610306366004612b9d565b6108ce565b34801561031757600080fd5b506102e9610326366004612bcd565b6108f8565b34801561033757600080fd5b506102e9610346366004612b9d565b61090c565b34801561035757600080fd5b5060c95461036b906001600160a01b031681565b6040516001600160a01b039091168152602001610282565b34801561038f57600080fd5b506102e961099a565b3480156103a457600080fd5b506102766103b3366004612bcd565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b3480156103f257600080fd5b5060cc5461036b906001600160a01b031681565b34801561041257600080fd5b506102766109ac565b34801561042757600080fd5b506102e9610436366004612c3c565b6109c2565b34801561044757600080fd5b506102e9610456366004612d64565b610ce1565b6102e9610469366004612bcd565b610d29565b34801561047a57600080fd5b506102e9610e1c565b34801561048f57600080fd5b506102e961049e366004612d64565b610e2e565b3480156104af57600080fd5b5060ce5461036b906001600160a01b031681565b6102e96104d1366004612bcd565b610e76565b3480156104e257600080fd5b506102e9610f23565b3480156104f757600080fd5b506033546001600160a01b031661036b565b34801561051557600080fd5b506102e9610524366004612e02565b610f33565b34801561053557600080fd5b50610276610544366004612b9d565b610fb9565b34801561055557600080fd5b506102e9610564366004612bcd565b610fe4565b34801561057557600080fd5b506102e9610ff5565b34801561058a57600080fd5b506102e9610599366004612e5d565b61100f565b3480156105aa57600080fd5b506102bb600081565b3480156105bf57600080fd5b506105f3604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102829190612eee565b34801561060c57600080fd5b5060cb5461036b906001600160a01b031681565b34801561062c57600080fd5b5061027661063b366004612bcd565b6110ee565b34801561064c57600080fd5b5061027661065b366004612adc565b611108565b34801561066c57600080fd5b506102e961067b366004612bcd565b611166565b34801561068c57600080fd5b506102e961069b366004612bcd565b611190565b3480156106ac57600080fd5b506102e96106bb366004612e5d565b6111d5565b3480156106cc57600080fd5b506102e96106db366004612f01565b61121c565b3480156106ec57600080fd5b5060ca5461036b906001600160a01b031681565b34801561070c57600080fd5b506102e961071b366004612f83565b611636565b34801561072c57600080fd5b506102e961073b366004613038565b6116cc565b34801561074c57600080fd5b506102bb60008051602061364983398151915281565b34801561076e57600080fd5b506102e961077d366004612b9d565b611783565b34801561078e57600080fd5b506102e961079d366004612adc565b6117a8565b3480156107ae57600080fd5b506102e96107bd366004612bcd565b61181a565b3480156107ce57600080fd5b506105f36040518060400160405280600681526020016518171a17189b60d11b81525081565b60006001600160e01b03198216637965db0b60e01b148061082557506301ffc9a760e01b6001600160e01b03198316145b92915050565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061086f9250849150839050611836565b6108776109ac565b1561089d5760405162461bcd60e51b81526004016108949061306d565b60405180910390fd5b60606108c66108aa61198b565b6108bd886108b8898961199a565b6119c6565b83846001611ad7565b505050505050565b6000828152609760205260409020600101546108e981611ea7565b6108f38383611eb8565b505050565b610900611f3f565b61090981611fb8565b50565b61091461198b565b6001600160a01b0316816001600160a01b03161461098c5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610894565b6109968282611fd0565b5050565b6109a2611f3f565b6109aa612055565b565b6000805160206136298339815191525460ff1690565b6109cc8688613097565b8051600203610a3d576109e061063b61198b565b610a385760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610894565b610bca565b6000610a48826120fd565b60c9549092506001600160a01b0316905063430c2081610a6661198b565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381865afa158015610ab1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ad59190613161565b80610b64575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c208190604401602060405180830381865afa158015610b2e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b529190613161565b8015610b645750610b6461063b61198b565b610bc85760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b6064820152608401610894565b505b610bd48789613097565b600281511015610c345760405162461bcd60e51b815260206004820152602560248201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456044820152642627abaf9960d91b6064820152608401610894565b610c88610c6860008360018551610c4b9190613194565b81518110610c5b57610c5b6131a7565b6020026020010151612138565b82600081518110610c7b57610c7b6131a7565b6020026020010151611836565b610c906109ac565b15610cad5760405162461bcd60e51b81526004016108949061306d565b610cd58a610cbb8a8c613097565b610cc5898b613097565b610ccf888a613097565b87611ad7565b50505050505050505050565b610ce9611f3f565b60005b815181101561099657610d17828281518110610d0a57610d0a6131a7565b6020026020010151611fb8565b80610d21816131bd565b915050610cec565b610d3461063b61198b565b610d805760405162461bcd60e51b815260206004820181905260248201527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e5445526044820152606401610894565b6001600160a01b038116610dd65760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610894565b610ddf816121ec565b610de7610ff5565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610996573d6000803e3d6000fd5b610e24611f3f565b6109aa6000612204565b610e36611f3f565b60005b815181101561099657610e64828281518110610e5757610e576131a7565b60200260200101516121ec565b80610e6e816131bd565b915050610e39565b610e8161063b61198b565b610ecd5760405162461bcd60e51b815260206004820181905260248201527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e5445526044820152606401610894565b6001600160a01b038116610ddf5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610894565b610f2b611f3f565b6109aa612256565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610f779250849150839050611836565b610f7f6109ac565b15610f9c5760405162461bcd60e51b81526004016108949061306d565b6060610fb0876108bd886108b8898961199a565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610fec611f3f565b610909816121ec565b6109aa60008051602061364983398151915261034661198b565b611017611f3f565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061104990859085906004016131d6565b600060405180830381600087803b15801561106357600080fd5b505af1158015611077573d6000803e3d6000fd5b505060cb546001600160a01b031615915061099690505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906110c090859085906004016131d6565b600060405180830381600087803b1580156110da57600080fd5b505af11580156108c6573d6000803e3d6000fd5b600061082560008051602061364983398151915283610fb9565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260009061115c906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b61116e611f3f565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b611198611f3f565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b6111dd611f3f565b61099682828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506122be92505050565b600054610100900460ff161580801561123c5750600054600160ff909116105b806112565750303b158015611256575060005460ff166001145b6112b95760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610894565b6000805460ff1916600117905580156112dc576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce805490911691851691909117905561133a6123c2565b6113426123f9565b61134b82612432565b611353612459565b604080516102a081018252600661026082018181526563727970746f60d01b610280840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b8183015261016084015283518085018552600280825261686960f01b8284015261018085019190915284518086018652928352656b726573757360d01b838301526101a084019290925283518085018552600580825264616e696d6560d81b828401526101c085019190915284518086018652818152646d616e676160d81b818401526101e085015284518086018652600981526862696e616e6365757360b81b8184015261020085015284518086018652908152647265616c6d60d81b81830152610220840152835180850190945290835261676f60f01b9083015261024081019190915260005b60138110156115e6576115d48282601381106115ca576115ca6131a7565b60200201516122be565b806115de816131bd565b9150506115ac565b50508015610fb0576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061167a9250849150839050611836565b6116826109ac565b1561169f5760405162461bcd60e51b81526004016108949061306d565b610cd58a6116b18b6108b88c8c61199a565b6116bb888a613097565b6116c58789613097565b6001611ad7565b6116d4611f3f565b60005b818110156108f35760c9546001600160a01b03166350960239848484818110611702576117026131a7565b90506020020160208101906117179190612bcd565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561175857600080fd5b505af115801561176c573d6000803e3d6000fd5b50505050808061177b906131bd565b9150506116d7565b60008281526097602052604090206001015461179e81611ea7565b6108f38383611fd0565b6117b0611f3f565b6117b981612499565b6117d55760405162461bcd60e51b815260040161089490613205565b600081815260cd602052604081206117ec91612a64565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611822611f3f565b61182b816124bf565b610909600082612535565b61183f82612499565b61185b5760405162461bcd60e51b815260040161089490613205565b600061188e8260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115611936576118b96118ad826000600a61253f565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8036119365760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610894565b61193f8261257e565b6108f35760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c49440000006044820152606401610894565b60006119956126e2565b905090565b606082826040516020016119af929190613247565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b60608152602001906001900390816119e05790505090508281600081518110611a0b57611a0b6131a7565b602002602001018190525060cd60008581526020019081526020016000208054611a349061326f565b80601f0160208091040260200160405190810160405280929190818152602001828054611a609061326f565b8015611aad5780601f10611a8257610100808354040283529160200191611aad565b820191906000526020600020905b815481529060010190602001808311611a9057829003601f168201915b505050505081600181518110611ac557611ac56131a7565b60209081029190910101529392505050565b600080611ae3866120fd565b91509150828015611af5575060028651115b8015611b77575060c9546040516331a9108f60e11b8152600481018390526001600160a01b03898116921690636352211e90602401602060405180830381865afa158015611b47573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b6b91906132a9565b6001600160a01b031614155b15611bd75760405162461bcd60e51b815260206004820152602a60248201527f4d696e74696e674d616e616765723a20524556455253455f5245434f52445f4e60448201526913d517d0531313d5d15160b21b6064820152608401610894565b60c954604051634f558e7960e01b8152600481018490526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015611c20573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c449190613161565b8015611cc3575060c9546040516331a9108f60e11b81526004810184905230916001600160a01b031690636352211e90602401602060405180830381865afa158015611c94573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cb891906132a9565b6001600160a01b0316145b15611d375760c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690611d00908a908a908a908a908a9060040161331b565b600060405180830381600087803b158015611d1a57600080fd5b505af1158015611d2e573d6000803e3d6000fd5b50505050610fb0565b611d4082612728565b611d4986612787565b8015611d56575085516002145b15611e345760ca5486516001600160a01b039091169063c36c21259089908990600090611d8557611d856131a7565b602090810291909101015160cc546040516001600160e01b031960e086901b168152611dbf9392916001600160a01b03169060040161337a565b600060405180830381600087803b158015611dd957600080fd5b505af1158015611ded573d6000803e3d6000fd5b50505050600085511115611e2f5760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490611d00908890889087906004016133af565b610fb0565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790611e6c908a908a908a908a908a9060040161331b565b600060405180830381600087803b158015611e8657600080fd5b505af1158015611e9a573d6000803e3d6000fd5b5050505050505050505050565b61090981611eb361198b565b6127e1565b611ec28282610fb9565b6109965760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611efb61198b565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611f4761198b565b6001600160a01b0316611f626033546001600160a01b031690565b6001600160a01b0316146109aa5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610894565b61090960008051602061364983398151915282611783565b611fda8282610fb9565b156109965760008281526097602090815260408083206001600160a01b03851684529091529020805460ff1916905561201161198b565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b61205d6109ac565b6120a05760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610894565b600080516020613629833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6120e061198b565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b80156121325782915061211e8285610c4b600185613194565b92508061212a816133e5565b915050612105565b50915091565b6000815160000361218b5760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610894565b828260405160200161219d91906133fc565b604051602081830303815290604052805190602001206040516020016121cd929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b61090960008051602061364983398151915282612535565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b61225e6109ac565b1561227b5760405162461bcd60e51b81526004016108949061306d565b600080516020613629833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586120e061198b565b60006122cb600083612138565b600081815260cd602052604090209091506122e6838261345e565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf8980836040516123179190612eee565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e7990602401602060405180830381865afa158015612368573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061238c9190613161565b6109965760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c60906110c0908490869060040161351d565b600054610100900460ff166123e95760405162461bcd60e51b81526004016108949061353e565b6109aa6123f461198b565b612204565b600054610100900460ff166124205760405162461bcd60e51b81526004016108949061353e565b6109aa600061242d61198b565b612535565b600054610100900460ff166111985760405162461bcd60e51b81526004016108949061353e565b600054610100900460ff166124805760405162461bcd60e51b81526004016108949061353e565b600080516020613629833981519152805460ff19169055565b600081815260cd6020526040812080548291906124b59061326f565b9050119050919050565b6124c7611f3f565b6001600160a01b03811661252c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610894565b61090981612204565b6109968282611eb8565b604080518082019091526000808252602082015260405180604001604052808381526020018486602001516125749190613589565b9052949350505050565b6000815160000361259157506000919050565b60208201805160f81c603081108015906125af575060398160ff1611155b1580156125d1575060618160ff16101580156125cf5750607a8160ff1611155b155b156125e0575060009392505050565b8351600181111561264e57612602836125fa600184613194565b015160f81c90565b915060308260ff161015801561261c575060398260ff1611155b15801561263e575060618260ff161015801561263c5750607a8260ff1611155b155b1561264e57506000949350505050565b60015b61265c600183613194565b8110156126d6578381015160f81c9250602d8314801590612692575060308360ff1610158015612690575060398360ff1611155b155b80156126b3575060618360ff16101580156126b15750607a8360ff1611155b155b156126c45750600095945050505050565b806126ce816131bd565b915050612651565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b03163303612723575060331936013560601c90565b503390565b61273181611108565b1561277e5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610894565b61090981612845565b60008061279e60008460018651610c4b9190613194565b60ca549091506001600160a01b0316158015906127da5750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6127eb8282610fb9565b61099657612803816001600160a01b031660146128c9565b61280e8360206128c9565b60405160200161281f92919061359c565b60408051601f198184030181529082905262461bcd60e51b825261089491600401612eee565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260019061288490606001611143565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b606060006128d8836002613611565b6128e3906002613589565b6001600160401b038111156128fa576128fa612cfb565b6040519080825280601f01601f191660200182016040528015612924576020820181803683370190505b509050600360fc1b8160008151811061293f5761293f6131a7565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061296e5761296e6131a7565b60200101906001600160f81b031916908160001a9053506000612992846002613611565b61299d906001613589565b90505b6001811115612a15576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106129d1576129d16131a7565b1a60f81b8282815181106129e7576129e76131a7565b60200101906001600160f81b031916908160001a90535060049490941c93612a0e816133e5565b90506129a0565b5083156127da5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610894565b508054612a709061326f565b6000825580601f10612a80575050565b601f01602090049060005260206000209081019061090991905b80821115612aae5760008155600101612a9a565b5090565b600060208284031215612ac457600080fd5b81356001600160e01b0319811681146127da57600080fd5b600060208284031215612aee57600080fd5b5035919050565b60008083601f840112612b0757600080fd5b5081356001600160401b03811115612b1e57600080fd5b602083019150836020828501011115612b3657600080fd5b9250929050565b600080600060408486031215612b5257600080fd5b8335925060208401356001600160401b03811115612b6f57600080fd5b612b7b86828701612af5565b9497909650939450505050565b6001600160a01b038116811461090957600080fd5b60008060408385031215612bb057600080fd5b823591506020830135612bc281612b88565b809150509250929050565b600060208284031215612bdf57600080fd5b81356127da81612b88565b60008083601f840112612bfc57600080fd5b5081356001600160401b03811115612c1357600080fd5b6020830191508360208260051b8501011115612b3657600080fd5b801515811461090957600080fd5b60008060008060008060008060a0898b031215612c5857600080fd5b8835612c6381612b88565b975060208901356001600160401b0380821115612c7f57600080fd5b612c8b8c838d01612bea565b909950975060408b0135915080821115612ca457600080fd5b612cb08c838d01612bea565b909750955060608b0135915080821115612cc957600080fd5b50612cd68b828c01612bea565b9094509250506080890135612cea81612c2e565b809150509295985092959890939650565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715612d3957612d39612cfb565b604052919050565b60006001600160401b03821115612d5a57612d5a612cfb565b5060051b60200190565b60006020808385031215612d7757600080fd5b82356001600160401b03811115612d8d57600080fd5b8301601f81018513612d9e57600080fd5b8035612db1612dac82612d41565b612d11565b81815260059190911b82018301908381019087831115612dd057600080fd5b928401925b82841015612df7578335612de881612b88565b82529284019290840190612dd5565b979650505050505050565b60008060008060608587031215612e1857600080fd5b8435612e2381612b88565b93506020850135925060408501356001600160401b03811115612e4557600080fd5b612e5187828801612af5565b95989497509550505050565b60008060208385031215612e7057600080fd5b82356001600160401b03811115612e8657600080fd5b612e9285828601612af5565b90969095509350505050565b60005b83811015612eb9578181015183820152602001612ea1565b50506000910152565b60008151808452612eda816020860160208601612e9e565b601f01601f19169290920160200192915050565b6020815260006127da6020830184612ec2565b60008060008060008060c08789031215612f1a57600080fd5b8635612f2581612b88565b95506020870135612f3581612b88565b94506040870135612f4581612b88565b93506060870135612f5581612b88565b92506080870135612f6581612b88565b915060a0870135612f7581612b88565b809150509295509295509295565b60008060008060008060008060a0898b031215612f9f57600080fd5b8835612faa81612b88565b97506020890135965060408901356001600160401b0380821115612fcd57600080fd5b612fd98c838d01612af5565b909850965060608b0135915080821115612ff257600080fd5b612ffe8c838d01612bea565b909650945060808b013591508082111561301757600080fd5b506130248b828c01612bea565b999c989b5096995094979396929594505050565b6000806020838503121561304b57600080fd5b82356001600160401b0381111561306157600080fd5b612e9285828601612bea565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60006130a5612dac84612d41565b80848252602080830192508560051b8501368111156130c357600080fd5b855b818110156131555780356001600160401b03808211156130e55760008081fd5b90880190601f36818401126130fa5760008081fd5b82358281111561310c5761310c612cfb565b61311d818301601f19168801612d11565b9250808352368782860101111561313657600091508182fd5b80878501888501376000908301870152508652509382019382016130c5565b50919695505050505050565b60006020828403121561317357600080fd5b81516127da81612c2e565b634e487b7160e01b600052601160045260246000fd5b818103818111156108255761082561317e565b634e487b7160e01b600052603260045260246000fd5b6000600182016131cf576131cf61317e565b5060010190565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b600181811c9082168061328357607f821691505b6020821081036132a357634e487b7160e01b600052602260045260246000fd5b50919050565b6000602082840312156132bb57600080fd5b81516127da81612b88565b600081518084526020808501808196508360051b8101915082860160005b8581101561330e5782840389526132fc848351612ec2565b988501989350908401906001016132e4565b5091979650505050505050565b6001600160a01b038616815260a06020820181905260009061333f908301876132c6565b828103604084015261335181876132c6565b9050828103606084015261336581866132c6565b91505082151560808301529695505050505050565b600060018060a01b0380861683526060602084015261339c6060840186612ec2565b9150808416604084015250949350505050565b6060815260006133c260608301866132c6565b82810360208401526133d481866132c6565b915050826040830152949350505050565b6000816133f4576133f461317e565b506000190190565b6000825161340e818460208701612e9e565b9190910192915050565b601f8211156108f357600081815260208120601f850160051c8101602086101561343f5750805b601f850160051c820191505b818110156108c65782815560010161344b565b81516001600160401b0381111561347757613477612cfb565b61348b81613485845461326f565b84613418565b602080601f8311600181146134c057600084156134a85750858301515b600019600386901b1c1916600185901b1785556108c6565b600085815260208120601f198616915b828110156134ef578886015182559484019460019091019084016134d0565b508582101561350d5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b8281526040602082015260006135366040830184612ec2565b949350505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b808201808211156108255761082561317e565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516135d4816017850160208801612e9e565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351613605816028840160208801612e9e565b01602801949350505050565b80820281158282048414176108255761082561317e56fe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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
