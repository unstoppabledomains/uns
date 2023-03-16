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
const _bytecode = "0x608060405234801561001057600080fd5b5061355d806100206000396000f3fe6080604052600436106102515760003560e01c806391d1485411610139578063b9998a24116100b6578063d1f5692c1161007a578063d1f5692c14610720578063d539139314610740578063d547741f14610762578063ec52738914610782578063f2fde38b146107a2578063ffa1ad74146107c257600080fd5b8063b9998a2414610680578063c3a3bc00146106a0578063cc2a9a5b146106c0578063cc2c3fc4146106e0578063ceeb4f501461070057600080fd5b8063a3f4df7e116100fd578063a3f4df7e146105b3578063a849d65c14610600578063aa271e1a14610620578063b0aa98c714610640578063b3ab15fb1461066057600080fd5b806391d1485414610529578063983b2d5614610549578063986502751461056957806399e0dd7c1461057e578063a217fddf1461059e57600080fd5b80635c975abb116101d257806371e2a6571161019657806371e2a6571461048357806377a2a589146104a357806381c81d35146104c35780638456cb59146104d65780638da5cb5b146104eb578063906cecc11461050957600080fd5b80635c975abb146104065780635cd7e3b31461041b5780635fc1964f1461043b578063634486da1461045b578063715018a61461046e57600080fd5b806336568abe1161021957806336568abe1461032b5780633f41b6141461034b5780633f4ba83a14610383578063572b6c05146103985780635b6fa8db146103e657600080fd5b806301ffc9a714610256578063248a9ca31461028b578063268b15ed146102c95780632f2ff15d146102eb5780633092afd51461030b575b600080fd5b34801561026257600080fd5b50610276610271366004612e7c565b6107f4565b60405190151581526020015b60405180910390f35b34801561029757600080fd5b506102bb6102a6366004612e35565b60009081526097602052604090206001015490565b604051908152602001610282565b3480156102d557600080fd5b506102e96102e4366004612f58565b61082b565b005b3480156102f757600080fd5b506102e9610306366004612e4d565b6108ce565b34801561031757600080fd5b506102e9610326366004612b3d565b6108f8565b34801561033757600080fd5b506102e9610346366004612e4d565b61090c565b34801561035757600080fd5b5060c95461036b906001600160a01b031681565b6040516001600160a01b039091168152602001610282565b34801561038f57600080fd5b506102e961099a565b3480156103a457600080fd5b506102766103b3366004612b3d565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b3480156103f257600080fd5b5060cc5461036b906001600160a01b031681565b34801561041257600080fd5b506102766109ac565b34801561042757600080fd5b506102e9610436366004612b75565b6109c2565b34801561044757600080fd5b506102e9610456366004612d79565b610d1c565b6102e9610469366004612b3d565b610d72565b34801561047a57600080fd5b506102e9610e65565b34801561048f57600080fd5b506102e961049e366004612d79565b610e77565b3480156104af57600080fd5b5060ce5461036b906001600160a01b031681565b6102e96104d1366004612b3d565b610ecd565b3480156104e257600080fd5b506102e9610f7a565b3480156104f757600080fd5b506033546001600160a01b031661036b565b34801561051557600080fd5b506102e9610524366004612c30565b610f8a565b34801561053557600080fd5b50610276610544366004612e4d565b611010565b34801561055557600080fd5b506102e9610564366004612b3d565b61103b565b34801561057557600080fd5b506102e961104c565b34801561058a57600080fd5b506102e9610599366004612f25565b611066565b3480156105aa57600080fd5b506102bb600081565b3480156105bf57600080fd5b506105f3604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b60405161028291906131d3565b34801561060c57600080fd5b5060cb5461036b906001600160a01b031681565b34801561062c57600080fd5b5061027661063b366004612b3d565b611145565b34801561064c57600080fd5b5061027661065b366004612e35565b61115f565b34801561066c57600080fd5b506102e961067b366004612b3d565b6111bd565b34801561068c57600080fd5b506102e961069b366004612b3d565b6111e7565b3480156106ac57600080fd5b506102e96106bb366004612f25565b61122c565b3480156106cc57600080fd5b506102e96106db366004612ea4565b611273565b3480156106ec57600080fd5b5060ca5461036b906001600160a01b031681565b34801561070c57600080fd5b506102e961071b366004612c89565b6115fc565b34801561072c57600080fd5b506102e961073b366004612d3a565b611692565b34801561074c57600080fd5b506102bb60008051602061353183398151915281565b34801561076e57600080fd5b506102e961077d366004612e4d565b611757565b34801561078e57600080fd5b506102e961079d366004612e35565b61177c565b3480156107ae57600080fd5b506102e96107bd366004612b3d565b6117ee565b3480156107ce57600080fd5b506105f36040518060400160405280600681526020016518171a17189960d11b81525081565b60006001600160e01b03198216637965db0b60e01b148061082557506301ffc9a760e01b6001600160e01b03198316145b92915050565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061086f925084915083905061180a565b6108776109ac565b1561089d5760405162461bcd60e51b8152600401610894906131e6565b60405180910390fd5b60606108c66108aa611960565b6108bd886108b8898961196f565b61199b565b83846001611ac8565b505050505050565b6000828152609760205260409020600101546108e981611dc4565b6108f38383611dd5565b505050565b610900611e5c565b61090981611ed5565b50565b610914611960565b6001600160a01b0316816001600160a01b03161461098c5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610894565b6109968282611eed565b5050565b6109a2611e5c565b6109aa611f72565b565b6000805160206135118339815191525460ff1690565b6109cc868861335f565b805160021415610a3e576109e161063b611960565b610a395760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610894565b610be9565b6000610a498261201a565b60c9549092506001600160a01b0316905063430c2081610a67611960565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b158015610aad57600080fd5b505afa158015610ac1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ae59190612e19565b80610b83575060c95460ce5460405163430c208160e01b81526001600160a01b0391821660048201526024810184905291169063430c20819060440160206040518083038186803b158015610b3957600080fd5b505afa158015610b4d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b719190612e19565b8015610b835750610b8361063b611960565b610be75760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b6064820152608401610894565b505b610bf3878961335f565b600281511015610c535760405162461bcd60e51b815260206004820152602560248201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456044820152642627abaf9960d91b6064820152608401610894565b610cc3610c9560008360018551610c6a9190613348565b81518110610c8857634e487b7160e01b600052603260045260246000fd5b6020026020010151612055565b82600081518110610cb657634e487b7160e01b600052603260045260246000fd5b602002602001015161180a565b610ccb6109ac565b15610ce85760405162461bcd60e51b8152600401610894906131e6565b610d108a610cf68a8c61335f565b610d00898b61335f565b610d0a888a61335f565b87611ac8565b50505050505050505050565b610d24611e5c565b60005b815181101561099657610d60828281518110610d5357634e487b7160e01b600052603260045260246000fd5b6020026020010151611ed5565b80610d6a816134a6565b915050610d27565b610d7d61063b611960565b610dc95760405162461bcd60e51b815260206004820181905260248201527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e5445526044820152606401610894565b6001600160a01b038116610e1f5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610894565b610e288161210a565b610e3061104c565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610996573d6000803e3d6000fd5b610e6d611e5c565b6109aa6000612122565b610e7f611e5c565b60005b815181101561099657610ebb828281518110610eae57634e487b7160e01b600052603260045260246000fd5b602002602001015161210a565b80610ec5816134a6565b915050610e82565b610ed861063b611960565b610f245760405162461bcd60e51b815260206004820181905260248201527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e5445526044820152606401610894565b6001600160a01b038116610e285760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610894565b610f82611e5c565b6109aa612174565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610fce925084915083905061180a565b610fd66109ac565b15610ff35760405162461bcd60e51b8152600401610894906131e6565b6060611007876108bd886108b8898961196f565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b611043611e5c565b6109098161210a565b6109aa600080516020613531833981519152610346611960565b61106e611e5c565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906110a090859085906004016131a4565b600060405180830381600087803b1580156110ba57600080fd5b505af11580156110ce573d6000803e3d6000fd5b505060cb546001600160a01b031615915061099690505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061111790859085906004016131a4565b600060405180830381600087803b15801561113157600080fd5b505af11580156108c6573d6000803e3d6000fd5b600061082560008051602061353183398151915283611010565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526000906111b3906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b6111c5611e5c565b60ce80546001600160a01b0319166001600160a01b0392909216919091179055565b6111ef611e5c565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b611234611e5c565b61099682828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506121dc92505050565b600054610100900460ff16158080156112935750600054600160ff909116105b806112ad5750303b1580156112ad575060005460ff166001145b6113105760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610894565b6000805460ff191660011790558015611333576000805461ff0019166101001790555b60c980546001600160a01b03199081166001600160a01b038a81169190911790925560ca8054821689841617905560cb8054821688841617905560cc8054821687841617905560ce80549091169185169190911790556113916122f8565b61139961232f565b6113a282612368565b6113aa61238f565b604080516102008101825260066101c082018181526563727970746f60d01b6101e0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b81830152610140840152835180850185528281526535b632bb32b960d11b81830152610160840152835180850185526002815261686960f01b818301526101808401528351808501909452908352656b726573757360d01b908301526101a081019190915260005b600e8110156115ac5761159a8282600e811061159057634e487b7160e01b600052603260045260246000fd5b60200201516121dc565b806115a4816134a6565b915050611564565b50508015611007576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050505050565b8686868080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611640925084915083905061180a565b6116486109ac565b156116655760405162461bcd60e51b8152600401610894906131e6565b610d108a6116778b6108b88c8c61196f565b611681888a61335f565b61168b878961335f565b6001611ac8565b61169a611e5c565b60005b818110156108f35760c9546001600160a01b031663509602398484848181106116d657634e487b7160e01b600052603260045260246000fd5b90506020020160208101906116eb9190612b3d565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561172c57600080fd5b505af1158015611740573d6000803e3d6000fd5b50505050808061174f906134a6565b91505061169d565b60008281526097602052604090206001015461177281611dc4565b6108f38383611eed565b611784611e5c565b61178d816123cf565b6117a95760405162461bcd60e51b815260040161089490613210565b600081815260cd602052604081206117c0916129e2565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b6117f6611e5c565b6117ff816123f5565b61090960008261246b565b611813826123cf565b61182f5760405162461bcd60e51b815260040161089490613210565b60006118628260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a8160000151111561190b5761188d611881826000600a612475565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8141561190b5760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610894565b611914826124b4565b6108f35760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a204c4142454c5f494e56414c49440000006044820152606401610894565b600061196a612619565b905090565b6060828260405160200161198492919061303d565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b60608152602001906001900390816119b557905050905082816000815181106119ee57634e487b7160e01b600052603260045260246000fd5b602002602001018190525060cd60008581526020019081526020016000208054611a179061346b565b80601f0160208091040260200160405190810160405280929190818152602001828054611a439061346b565b8015611a905780601f10611a6557610100808354040283529160200191611a90565b820191906000526020600020905b815481529060010190602001808311611a7357829003601f168201915b505050505081600181518110611ab657634e487b7160e01b600052603260045260246000fd5b60209081029190910101529392505050565b6000611ad38561201a565b5060c954604051634f558e7960e01b8152600481018390529192506001600160a01b031690634f558e799060240160206040518083038186803b158015611b1957600080fd5b505afa158015611b2d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b519190612e19565b8015611bdf575060c9546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e9060240160206040518083038186803b158015611b9c57600080fd5b505afa158015611bb0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bd49190612b59565b6001600160a01b0316145b15611c535760c954604051630fb8df0360e11b81526001600160a01b0390911690631f71be0690611c1c90899089908990899089906004016130da565b600060405180830381600087803b158015611c3657600080fd5b505af1158015611c4a573d6000803e3d6000fd5b505050506108c6565b611c5c81612660565b611c65856126bf565b8015611c72575084516002145b15611d5e5760ca5485516001600160a01b039091169063c36c21259088908890600090611caf57634e487b7160e01b600052603260045260246000fd5b602090810291909101015160cc546040516001600160e01b031960e086901b168152611ce99392916001600160a01b031690600401613139565b600060405180830381600087803b158015611d0357600080fd5b505af1158015611d17573d6000803e3d6000fd5b50505050600084511115611d595760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae7490611c1c9087908790869060040161316e565b6108c6565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b790611d9690899089908990899089906004016130da565b600060405180830381600087803b158015611db057600080fd5b505af1158015610d10573d6000803e3d6000fd5b61090981611dd0611960565b612719565b611ddf8282611010565b6109965760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611e18611960565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611e64611960565b6001600160a01b0316611e7f6033546001600160a01b031690565b6001600160a01b0316146109aa5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610894565b61090960008051602061353183398151915282611757565b611ef78282611010565b156109965760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055611f2e611960565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b611f7a6109ac565b611fbd5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610894565b600080516020613511833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa611ffd611960565b6040516001600160a01b03909116815260200160405180910390a1565b805160009081905b801561204f5782915061203b8285610c6a600185613348565b92508061204781613454565b915050612022565b50915091565b60008151600014156120a95760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610894565b82826040516020016120bb9190613021565b604051602081830303815290604052805190602001206040516020016120eb929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b6109096000805160206135318339815191528261246b565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b61217c6109ac565b156121995760405162461bcd60e51b8152600401610894906131e6565b600080516020613511833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611ffd611960565b60006121e9600083612055565b600081815260cd60209081526040909120845192935061220d929091850190612a1c565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf89808360405161223e91906131d3565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e799060240160206040518083038186803b15801561228a57600080fd5b505afa15801561229e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122c29190612e19565b6109965760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c6090611117908490869060040161329d565b600054610100900460ff1661231f5760405162461bcd60e51b815260040161089490613252565b6109aa61232a611960565b612122565b600054610100900460ff166123565760405162461bcd60e51b815260040161089490613252565b6109aa6000612363611960565b61246b565b600054610100900460ff166111ef5760405162461bcd60e51b815260040161089490613252565b600054610100900460ff166123b65760405162461bcd60e51b815260040161089490613252565b600080516020613511833981519152805460ff19169055565b600081815260cd6020526040812080548291906123eb9061346b565b9050119050919050565b6123fd611e5c565b6001600160a01b0381166124625760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610894565b61090981612122565b6109968282611dd5565b604080518082019091526000808252602082015260405180604001604052808381526020018486602001516124aa9190613311565b9052949350505050565b60008151600014156124c857506000919050565b60208201805160f81c603081108015906124e6575060398160ff1611155b158015612508575060618160ff16101580156125065750607a8160ff1611155b155b15612517575060009392505050565b835160018111156125855761253983612531600184613348565b015160f81c90565b915060308260ff1610158015612553575060398260ff1611155b158015612575575060618260ff16101580156125735750607a8260ff1611155b155b1561258557506000949350505050565b60015b612593600183613348565b81101561260d578381015160f81c9250602d83148015906125c9575060308360ff16101580156125c7575060398360ff1611155b155b80156125ea575060618360ff16101580156125e85750607a8360ff1611155b155b156125fb5750600095945050505050565b80612605816134a6565b915050612588565b50600195945050505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b031633141561265b575060331936013560601c90565b503390565b6126698161115f565b156126b65760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610894565b6109098161277d565b6000806126d660008460018651610c6a9190613348565b60ca549091506001600160a01b0316158015906127125750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b6127238282611010565b6109965761273b816001600160a01b03166014612801565b612746836020612801565b604051602001612757929190613065565b60408051601f198184030181529082905262461bcd60e51b8252610894916004016131d3565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526001906127bc9060600161119a565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b60606000612810836002613329565b61281b906002613311565b6001600160401b0381111561284057634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561286a576020820181803683370190505b509050600360fc1b8160008151811061289357634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106128d057634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060006128f4846002613329565b6128ff906001613311565b90505b6001811115612993576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061294157634e487b7160e01b600052603260045260246000fd5b1a60f81b82828151811061296557634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c9361298c81613454565b9050612902565b5083156127125760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610894565b5080546129ee9061346b565b6000825580601f106129fe575050565b601f0160209004906000526020600020908101906109099190612aa0565b828054612a289061346b565b90600052602060002090601f016020900481019282612a4a5760008555612a90565b82601f10612a6357805160ff1916838001178555612a90565b82800160010185558215612a90579182015b82811115612a90578251825591602001919060010190612a75565b50612a9c929150612aa0565b5090565b5b80821115612a9c5760008155600101612aa1565b60008083601f840112612ac6578182fd5b5081356001600160401b03811115612adc578182fd5b6020830191508360208260051b8501011115612af757600080fd5b9250929050565b60008083601f840112612b0f578182fd5b5081356001600160401b03811115612b25578182fd5b602083019150836020828501011115612af757600080fd5b600060208284031215612b4e578081fd5b8135612712816134ed565b600060208284031215612b6a578081fd5b8151612712816134ed565b60008060008060008060008060a0898b031215612b90578384fd5b8835612b9b816134ed565b975060208901356001600160401b0380821115612bb6578586fd5b612bc28c838d01612ab5565b909950975060408b0135915080821115612bda578586fd5b612be68c838d01612ab5565b909750955060608b0135915080821115612bfe578485fd5b50612c0b8b828c01612ab5565b9094509250506080890135612c1f81613502565b809150509295985092959890939650565b60008060008060608587031215612c45578384fd5b8435612c50816134ed565b93506020850135925060408501356001600160401b03811115612c71578283fd5b612c7d87828801612afe565b95989497509550505050565b60008060008060008060008060a0898b031215612ca4578182fd5b8835612caf816134ed565b97506020890135965060408901356001600160401b0380821115612cd1578384fd5b612cdd8c838d01612afe565b909850965060608b0135915080821115612cf5578384fd5b612d018c838d01612ab5565b909650945060808b0135915080821115612d19578384fd5b50612d268b828c01612ab5565b999c989b5096995094979396929594505050565b60008060208385031215612d4c578182fd5b82356001600160401b03811115612d61578283fd5b612d6d85828601612ab5565b90969095509350505050565b60006020808385031215612d8b578182fd5b82356001600160401b03811115612da0578283fd5b8301601f81018513612db0578283fd5b8035612dc3612dbe826132ee565b6132be565b80828252848201915084840188868560051b8701011115612de2578687fd5b8694505b83851015612e0d578035612df9816134ed565b835260019490940193918501918501612de6565b50979650505050505050565b600060208284031215612e2a578081fd5b815161271281613502565b600060208284031215612e46578081fd5b5035919050565b60008060408385031215612e5f578182fd5b823591506020830135612e71816134ed565b809150509250929050565b600060208284031215612e8d578081fd5b81356001600160e01b031981168114612712578182fd5b60008060008060008060c08789031215612ebc578384fd5b8635612ec7816134ed565b95506020870135612ed7816134ed565b94506040870135612ee7816134ed565b93506060870135612ef7816134ed565b92506080870135612f07816134ed565b915060a0870135612f17816134ed565b809150509295509295509295565b60008060208385031215612f37578182fd5b82356001600160401b03811115612f4c578283fd5b612d6d85828601612afe565b600080600060408486031215612f6c578081fd5b8335925060208401356001600160401b03811115612f88578182fd5b612f9486828701612afe565b9497909650939450505050565b600081518084526020808501808196508360051b81019150828601855b85811015612fe8578284038952612fd6848351612ff5565b98850198935090840190600101612fbe565b5091979650505050505050565b6000815180845261300d816020860160208601613424565b601f01601f19169290920160200192915050565b60008251613033818460208701613424565b9190910192915050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161309d816017850160208801613424565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516130ce816028840160208801613424565b01602801949350505050565b6001600160a01b038616815260a0602082018190526000906130fe90830187612fa1565b82810360408401526131108187612fa1565b905082810360608401526131248186612fa1565b91505082151560808301529695505050505050565b600060018060a01b0380861683526060602084015261315b6060840186612ff5565b9150808416604084015250949350505050565b6060815260006131816060830186612fa1565b82810360208401526131938186612fa1565b915050826040830152949350505050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b6020815260006127126020830184612ff5565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b8281526040602082015260006132b66040830184612ff5565b949350505050565b604051601f8201601f191681016001600160401b03811182821017156132e6576132e66134d7565b604052919050565b60006001600160401b03821115613307576133076134d7565b5060051b60200190565b60008219821115613324576133246134c1565b500190565b6000816000190483118215151615613343576133436134c1565b500290565b60008282101561335a5761335a6134c1565b500390565b600061336d612dbe846132ee565b808482526020808301925084368760051b8701111561338a578485fd5b845b878110156134185781356001600160401b03808211156133aa578788fd5b90880190601f36818401126133bd578889fd5b8235828111156133cf576133cf6134d7565b6133e0818301601f191688016132be565b925080835236878286010111156133f557898afd5b80878501888501378201860189905250865250938201939082019060010161338c565b50919695505050505050565b60005b8381101561343f578181015183820152602001613427565b8381111561344e576000848401525b50505050565b600081613463576134636134c1565b506000190190565b600181811c9082168061347f57607f821691505b602082108114156134a057634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156134ba576134ba6134c1565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461090957600080fd5b801515811461090957600080fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
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
