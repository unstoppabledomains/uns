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
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]",
            },
        ],
        name: "areBlocked",
        outputs: [
            {
                internalType: "bool[]",
                name: "values",
                type: "bool[]",
            },
        ],
        stateMutability: "view",
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
        inputs: [],
        name: "isBlocklistDisabled",
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
const _bytecode = "0x608060405234801561001057600080fd5b50613beb806100206000396000f3fe60806040526004361061027d5760003560e01c8063906cecc11161014f578063b9998a24116100c1578063d53913931161007a578063d5391393146107ce578063d547741f146107f0578063d6ab22ed14610810578063ec52738914610830578063f2fde38b14610850578063ffa1ad741461087057600080fd5b8063b9998a241461070e578063c3a3bc001461072e578063cc2c3fc41461074e578063ceeb4f501461076e578063d1f5692c1461078e578063d4a32ad6146107ae57600080fd5b8063a217fddf11610113578063a217fddf1461062c578063a3f4df7e14610641578063a849d65c1461068e578063aa271e1a146106ae578063ae31844a146106ce578063b0aa98c7146106ee57600080fd5b8063906cecc11461059757806391d14854146105b7578063983b2d56146105d757806398650275146105f757806399e0dd7c1461060c57600080fd5b8063463c4bcb116101f3578063634486da116101ac578063634486da14610509578063715018a61461051c57806371e2a6571461053157806381c81d35146105515780638456cb59146105645780638da5cb5b1461057957600080fd5b8063463c4bcb14610426578063572b6c05146104465780635b6fa8db146104945780635c975abb146104b45780635cd7e3b3146104c95780635fc1964f146104e957600080fd5b8063268b15ed11610245578063268b15ed146103595780632f2ff15d146103795780633092afd51461039957806336568abe146103b95780633f41b614146103d95780633f4ba83a1461041157600080fd5b806301ffc9a7146102825780630e36a87d146102b757806310921f12146102e45780631459457a146102f9578063248a9ca31461031b575b600080fd5b34801561028e57600080fd5b506102a261029d3660046132fc565b6108a1565b60405190151581526020015b60405180910390f35b3480156102c357600080fd5b506102d76102d23660046131ba565b6108d8565b6040516102ae9190613616565b3480156102f057600080fd5b506102a26109af565b34801561030557600080fd5b50610319610314366004613324565b6109dc565b005b34801561032757600080fd5b5061034b6103363660046132b5565b60009081526097602052604090206001015490565b6040519081526020016102ae565b34801561036557600080fd5b506103196103743660046133c7565b610d2d565b34801561038557600080fd5b506103196103943660046132cd565b610dbf565b3480156103a557600080fd5b506103196103b4366004612f15565b610de9565b3480156103c557600080fd5b506103196103d43660046132cd565b610dfd565b3480156103e557600080fd5b5060c9546103f9906001600160a01b031681565b6040516001600160a01b0390911681526020016102ae565b34801561041d57600080fd5b50610319610e8b565b34801561043257600080fd5b506103196104413660046132b5565b610e9d565b34801561045257600080fd5b506102a2610461366004612f15565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b3480156104a057600080fd5b5060cc546103f9906001600160a01b031681565b3480156104c057600080fd5b506102a2610ecd565b3480156104d557600080fd5b506103196104e4366004612ff5565b610ee3565b3480156104f557600080fd5b506103196105043660046131f9565b6110e9565b610319610517366004612f15565b61113f565b34801561052857600080fd5b50610319611202565b34801561053d57600080fd5b5061031961054c3660046131f9565b611214565b61031961055f366004612f15565b61126a565b34801561057057600080fd5b506103196112e7565b34801561058557600080fd5b506033546001600160a01b03166103f9565b3480156105a357600080fd5b506103196105b23660046130b0565b6112f7565b3480156105c357600080fd5b506102a26105d23660046132cd565b61137d565b3480156105e357600080fd5b506103196105f2366004612f15565b6113a8565b34801561060357600080fd5b506103196113b9565b34801561061857600080fd5b50610319610627366004613394565b6113d3565b34801561063857600080fd5b5061034b600081565b34801561064d57600080fd5b50610681604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b6040516102ae91906136fb565b34801561069a57600080fd5b5060cb546103f9906001600160a01b031681565b3480156106ba57600080fd5b506102a26106c9366004612f15565b6114b2565b3480156106da57600080fd5b506103196106e93660046131ba565b6114cc565b3480156106fa57600080fd5b506102a26107093660046132b5565b6115d7565b34801561071a57600080fd5b50610319610729366004612f15565b611644565b34801561073a57600080fd5b50610319610749366004613394565b611689565b34801561075a57600080fd5b5060ca546103f9906001600160a01b031681565b34801561077a57600080fd5b50610319610789366004613109565b6116d0565b34801561079a57600080fd5b506103196107a93660046131ba565b611766565b3480156107ba57600080fd5b506103196107c9366004612f4d565b61182b565b3480156107da57600080fd5b5061034b600080516020613bbf83398151915281565b3480156107fc57600080fd5b5061031961080b3660046132cd565b6119b1565b34801561081c57600080fd5b5061031961082b3660046131ba565b6119d6565b34801561083c57600080fd5b5061031961084b3660046132b5565b611c67565b34801561085c57600080fd5b5061031961086b366004612f15565b611cd9565b34801561087c57600080fd5b5061068160405180604001604052806005815260200164302e342e3360d81b81525081565b60006001600160e01b03198216637965db0b60e01b14806108d257506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060816001600160401b0381111561090057634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610929578160200160208202803683370190505b50905060005b828110156109a85761096684848381811061095a57634e487b7160e01b600052603260045260246000fd5b905060200201356115d7565b82828151811061098657634e487b7160e01b600052603260045260246000fd5b91151560209283029190910190910152806109a081613b34565b91505061092f565b5092915050565b60007fa85b8425a460dd344a297bd4a82e287385f0fc558cb3e78867b0489f43df24705b5460ff16919050565b600054610100900460ff16158080156109fc5750600054600160ff909116105b80610a165750303b158015610a16575060005460ff166001145b610a7e5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff191660011790558015610aa1576000805461ff0019166101001790555b60c980546001600160a01b038089166001600160a01b03199283161790925560ca805488841690831617905560cb805487841690831617905560cc805492861692909116919091179055610af3611cf5565b610afb611d2c565b610b0482611d65565b610b0c611d8c565b610b14611de8565b604080516101c081018252600661018082018181526563727970746f60d01b6101a0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b8183015261014084015283518085019094529083526535b632bb32b960d11b9083015261016081019190915260005b600c811015610cdd57610ccb8282600c8110610cc157634e487b7160e01b600052603260045260246000fd5b6020020151611e25565b80610cd581613b34565b915050610c95565b50508015610d25576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050505050565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610d719250849150839050611f41565b610d79610ecd565b15610d965760405162461bcd60e51b8152600401610a7590613788565b6060610d25610da3612042565b610db688610db18989612051565b61207d565b838460016121aa565b600082815260976020526040902060010154610dda816124a6565b610de483836124b7565b505050565b610df161253e565b610dfa816125b7565b50565b610e05612042565b6001600160a01b0316816001600160a01b031614610e7d5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610a75565b610e8782826125cf565b5050565b610e9361253e565b610e9b612654565b565b610ea86106c9612042565b610ec45760405162461bcd60e51b8152600401610a7590613753565b610dfa816126fc565b6000600080516020613b9f8339815191526109d3565b610eed86886139ed565b805160021415610f2357610f026106c9612042565b610f1e5760405162461bcd60e51b8152600401610a75906137b2565b610fe8565b6000610f2e826127cb565b60c9549092506001600160a01b0316905063430c2081610f4c612042565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b158015610f9257600080fd5b505afa158015610fa6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fca9190613299565b610fe65760405162461bcd60e51b8152600401610a7590613883565b505b610ff287896139ed565b6002815110156110145760405162461bcd60e51b8152600401610a759061370e565b6110906110566000836001855161102b91906139d6565b8151811061104957634e487b7160e01b600052603260045260246000fd5b6020026020010151612806565b826002845161106591906139d6565b8151811061108357634e487b7160e01b600052603260045260246000fd5b6020026020010151611f41565b611098610ecd565b156110b55760405162461bcd60e51b8152600401610a7590613788565b6110dd8a6110c38a8c6139ed565b6110cd898b6139ed565b6110d7888a6139ed565b876121aa565b50505050505050505050565b6110f161253e565b60005b8151811015610e875761112d82828151811061112057634e487b7160e01b600052603260045260246000fd5b60200260200101516125b7565b8061113781613b34565b9150506110f4565b61114a6106c9612042565b6111665760405162461bcd60e51b8152600401610a7590613753565b6001600160a01b0381166111bc5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610a75565b6111c5816128bb565b6111cd6113b9565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610e87573d6000803e3d6000fd5b61120a61253e565b610e9b60006128d3565b61121c61253e565b60005b8151811015610e875761125882828151811061124b57634e487b7160e01b600052603260045260246000fd5b60200260200101516128bb565b8061126281613b34565b91505061121f565b6112756106c9612042565b6112915760405162461bcd60e51b8152600401610a7590613753565b6001600160a01b0381166111c55760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610a75565b6112ef61253e565b610e9b612925565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061133b9250849150839050611f41565b611343610ecd565b156113605760405162461bcd60e51b8152600401610a7590613788565b606061137487610db688610db18989612051565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6113b061253e565b610dfa816128bb565b610e9b600080516020613bbf8339815191526103d4612042565b6113db61253e565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061140d90859085906004016136cc565b600060405180830381600087803b15801561142757600080fd5b505af115801561143b573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610e8790505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c9061148490859085906004016136cc565b600060405180830381600087803b15801561149e57600080fd5b505af1158015610d25573d6000803e3d6000fd5b60006108d2600080516020613bbf8339815191528361137d565b6114d76106c9612042565b6114f35760405162461bcd60e51b8152600401610a7590613753565b60c9546040516000916001600160a01b0316906115169085908590602401613692565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b1790525161154b9190613490565b6000604051808303816000865af19150503d8060008114611588576040519150601f19603f3d011682016040523d82523d6000602084013e61158d565b606091505b5050905080610de45760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b6044820152606401610a75565b60006115e16109af565b1580156108d25750604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810183905261163a906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b61164c61253e565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b61169161253e565b610e8782828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611e2592505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506117149250849150839050611f41565b61171c610ecd565b156117395760405162461bcd60e51b8152600401610a7590613788565b6110dd8a61174b8b610db18c8c612051565b611755888a6139ed565b61175f87896139ed565b60016121aa565b61176e61253e565b60005b81811015610de45760c9546001600160a01b031663509602398484848181106117aa57634e487b7160e01b600052603260045260246000fd5b90506020020160208101906117bf9190612f15565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561180057600080fd5b505af1158015611814573d6000803e3d6000fd5b50505050808061182390613b34565b915050611771565b61183585876139ed565b80516002141561186b5761184a6106c9612042565b6118665760405162461bcd60e51b8152600401610a75906137b2565b611930565b6000611876826127cb565b60c9549092506001600160a01b0316905063430c2081611894612042565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b1580156118da57600080fd5b505afa1580156118ee573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119129190613299565b61192e5760405162461bcd60e51b8152600401610a7590613883565b505b61193a86886139ed565b60028151101561195c5760405162461bcd60e51b8152600401610a759061370e565b6119736110566000836001855161102b91906139d6565b61197b610ecd565b156119985760405162461bcd60e51b8152600401610a7590613788565b6119a68961174b898b6139ed565b505050505050505050565b6000828152609760205260409020600101546119cc816124a6565b610de483836125cf565b6119e16106c9612042565b6119fd5760405162461bcd60e51b8152600401610a7590613753565b60005b81811015610de457611abb838383818110611a2b57634e487b7160e01b600052603260045260246000fd5b9050602002810190611a3d9190613937565b60400135848484818110611a6157634e487b7160e01b600052603260045260246000fd5b9050602002810190611a739190613937565b611a819060208101906138f3565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611f4192505050565b6000611b70848484818110611ae057634e487b7160e01b600052603260045260246000fd5b9050602002810190611af29190613937565b60400135858585818110611b1657634e487b7160e01b600052603260045260246000fd5b9050602002810190611b289190613937565b611b369060208101906138f3565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061207d92505050565b90506000611b7d826127cb565b5060c954604051634f558e7960e01b8152600481018390529192506060916001600160a01b0390911690634f558e799060240160206040518083038186803b158015611bc857600080fd5b505afa158015611bdc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c009190613299565b611c5157611c51868686818110611c2757634e487b7160e01b600052603260045260246000fd5b9050602002810190611c399190613937565b611c47906020810190612f15565b84838460006121aa565b5050508080611c5f90613b34565b915050611a00565b611c6f61253e565b611c788161298d565b611c945760405162461bcd60e51b8152600401610a75906137f6565b600081815260cd60205260408120611cab91612dba565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611ce161253e565b611cea816129b3565b610dfa600082612a29565b600054610100900460ff16611d1c5760405162461bcd60e51b8152600401610a7590613838565b610e9b611d27612042565b6128d3565b600054610100900460ff16611d535760405162461bcd60e51b8152600401610a7590613838565b610e9b6000611d60612042565b612a29565b600054610100900460ff1661164c5760405162461bcd60e51b8152600401610a7590613838565b600054610100900460ff16611db35760405162461bcd60e51b8152600401610a7590613838565b60007fa85b8425a460dd344a297bd4a82e287385f0fc558cb3e78867b0489f43df24705b805460ff1916911515919091179055565b600054610100900460ff16611e0f5760405162461bcd60e51b8152600401610a7590613838565b6000600080516020613b9f833981519152611dd7565b6000611e32600083612806565b600081815260cd602090815260409091208451929350611e56929091850190612df4565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf898083604051611e8791906136fb565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e799060240160206040518083038186803b158015611ed357600080fd5b505afa158015611ee7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f0b9190613299565b610e875760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c609061148490849086906004016138d2565b611f4a8261298d565b611f665760405162461bcd60e51b8152600401610a75906137f6565b6000611f998260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115610de457611fc4611fb8826000600a612a33565b80516020909101512090565b7fb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b81415610de45760405162461bcd60e51b815260206004820152602660248201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860448201526512509255115160d21b6064820152608401610a75565b600061204c612a72565b905090565b606082826040516020016120669291906134ac565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b606081526020019060019003908161209757905050905082816000815181106120d057634e487b7160e01b600052603260045260246000fd5b602002602001018190525060cd600085815260200190815260200160002080546120f990613af9565b80601f016020809104026020016040519081016040528092919081815260200182805461212590613af9565b80156121725780601f1061214757610100808354040283529160200191612172565b820191906000526020600020905b81548152906001019060200180831161215557829003601f168201915b50505050508160018151811061219857634e487b7160e01b600052603260045260246000fd5b60209081029190910101529392505050565b60006121b5856127cb565b5060c954604051634f558e7960e01b8152600481018390529192506001600160a01b031690634f558e799060240160206040518083038186803b1580156121fb57600080fd5b505afa15801561220f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122339190613299565b80156122c1575060c9546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e9060240160206040518083038186803b15801561227e57600080fd5b505afa158015612292573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122b69190612f31565b6001600160a01b0316145b156123355760c95460405163d106353f60e01b81526001600160a01b039091169063d106353f906122fe90899085908990899089906004016135dd565b600060405180830381600087803b15801561231857600080fd5b505af115801561232c573d6000803e3d6000fd5b50505050610d25565b61233e81612ab9565b61234785612b1b565b8015612354575084516002145b156124405760ca5485516001600160a01b039091169063c36c2125908890889060009061239157634e487b7160e01b600052603260045260246000fd5b602090810291909101015160cc546040516001600160e01b031960e086901b1681526123cb9392916001600160a01b0316906004016135a8565b600060405180830381600087803b1580156123e557600080fd5b505af11580156123f9573d6000803e3d6000fd5b5050505060008451111561243b5760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae74906122fe9087908790869060040161365c565b610d25565b60c95460405163ba5d40b760e01b81526001600160a01b039091169063ba5d40b7906124789089908990899089908990600401613549565b600060405180830381600087803b15801561249257600080fd5b505af11580156110dd573d6000803e3d6000fd5b610dfa816124b2612042565b612b75565b6124c1828261137d565b610e875760008281526097602090815260408083206001600160a01b03851684529091529020805460ff191660011790556124fa612042565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612546612042565b6001600160a01b03166125616033546001600160a01b031690565b6001600160a01b031614610e9b5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610a75565b610dfa600080516020613bbf833981519152826119b1565b6125d9828261137d565b15610e875760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19169055612610612042565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b61265c610ecd565b61269f5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610a75565b600080516020613b9f833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6126df612042565b6040516001600160a01b03909116815260200160405180910390a1565b6127046109af565b156127475760405162461bcd60e51b8152602060048201526013602482015272109b1bd8dadb1a5cdd0e88111254d050931151606a1b6044820152606401610a75565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69602082015290810182905260019061278690606001611621565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b805160009081905b8015612800578291506127ec828561102b6001856139d6565b9250806127f881613ae2565b9150506127d3565b50915091565b600081516000141561285a5760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610a75565b828260405160200161286c9190613490565b6040516020818303038152906040528051906020012060405160200161289c929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b610dfa600080516020613bbf83398151915282612a29565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b61292d610ecd565b1561294a5760405162461bcd60e51b8152600401610a7590613788565b600080516020613b9f833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586126df612042565b600081815260cd6020526040812080548291906129a990613af9565b9050119050919050565b6129bb61253e565b6001600160a01b038116612a205760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610a75565b610dfa816128d3565b610e8782826124b7565b60408051808201909152600080825260208201526040518060400160405280838152602001848660200151612a68919061399f565b9052949350505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b0316331415612ab4575060331936013560601c90565b503390565b612ac16109af565b610dfa57612ace816115d7565b15610ec45760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610a75565b600080612b326000846001865161102b91906139d6565b60ca549091506001600160a01b031615801590612b6e5750807f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f145b9392505050565b612b7f828261137d565b610e8757612b97816001600160a01b03166014612bd9565b612ba2836020612bd9565b604051602001612bb39291906134d4565b60408051601f198184030181529082905262461bcd60e51b8252610a75916004016136fb565b60606000612be88360026139b7565b612bf390600261399f565b6001600160401b03811115612c1857634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015612c42576020820181803683370190505b509050600360fc1b81600081518110612c6b57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612ca857634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000612ccc8460026139b7565b612cd790600161399f565b90505b6001811115612d6b576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612d1957634e487b7160e01b600052603260045260246000fd5b1a60f81b828281518110612d3d57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c93612d6481613ae2565b9050612cda565b508315612b6e5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610a75565b508054612dc690613af9565b6000825580601f10612dd6575050565b601f016020900490600052602060002090810190610dfa9190612e78565b828054612e0090613af9565b90600052602060002090601f016020900481019282612e225760008555612e68565b82601f10612e3b57805160ff1916838001178555612e68565b82800160010185558215612e68579182015b82811115612e68578251825591602001919060010190612e4d565b50612e74929150612e78565b5090565b5b80821115612e745760008155600101612e79565b60008083601f840112612e9e578182fd5b5081356001600160401b03811115612eb4578182fd5b6020830191508360208260051b8501011115612ecf57600080fd5b9250929050565b60008083601f840112612ee7578182fd5b5081356001600160401b03811115612efd578182fd5b602083019150836020828501011115612ecf57600080fd5b600060208284031215612f26578081fd5b8135612b6e81613b7b565b600060208284031215612f42578081fd5b8151612b6e81613b7b565b60008060008060008060006080888a031215612f67578283fd5b8735612f7281613b7b565b965060208801356001600160401b0380821115612f8d578485fd5b612f998b838c01612e8d565b909850965060408a0135915080821115612fb1578485fd5b612fbd8b838c01612e8d565b909650945060608a0135915080821115612fd5578384fd5b50612fe28a828b01612e8d565b989b979a50959850939692959293505050565b60008060008060008060008060a0898b031215613010578182fd5b883561301b81613b7b565b975060208901356001600160401b0380821115613036578384fd5b6130428c838d01612e8d565b909950975060408b013591508082111561305a578384fd5b6130668c838d01612e8d565b909750955060608b013591508082111561307e578384fd5b5061308b8b828c01612e8d565b909450925050608089013561309f81613b90565b809150509295985092959890939650565b600080600080606085870312156130c5578182fd5b84356130d081613b7b565b93506020850135925060408501356001600160401b038111156130f1578283fd5b6130fd87828801612ed6565b95989497509550505050565b60008060008060008060008060a0898b031215613124578182fd5b883561312f81613b7b565b97506020890135965060408901356001600160401b0380821115613151578384fd5b61315d8c838d01612ed6565b909850965060608b0135915080821115613175578384fd5b6131818c838d01612e8d565b909650945060808b0135915080821115613199578384fd5b506131a68b828c01612e8d565b999c989b5096995094979396929594505050565b600080602083850312156131cc578182fd5b82356001600160401b038111156131e1578283fd5b6131ed85828601612e8d565b90969095509350505050565b6000602080838503121561320b578182fd5b82356001600160401b03811115613220578283fd5b8301601f81018513613230578283fd5b803561324361323e8261397c565b61394c565b80828252848201915084840188868560051b8701011115613262578687fd5b8694505b8385101561328d57803561327981613b7b565b835260019490940193918501918501613266565b50979650505050505050565b6000602082840312156132aa578081fd5b8151612b6e81613b90565b6000602082840312156132c6578081fd5b5035919050565b600080604083850312156132df578182fd5b8235915060208301356132f181613b7b565b809150509250929050565b60006020828403121561330d578081fd5b81356001600160e01b031981168114612b6e578182fd5b600080600080600060a0868803121561333b578283fd5b853561334681613b7b565b9450602086013561335681613b7b565b9350604086013561336681613b7b565b9250606086013561337681613b7b565b9150608086013561338681613b7b565b809150509295509295909350565b600080602083850312156133a6578182fd5b82356001600160401b038111156133bb578283fd5b6131ed85828601612ed6565b6000806000604084860312156133db578081fd5b8335925060208401356001600160401b038111156133f7578182fd5b61340386828701612ed6565b9497909650939450505050565b600081518084526020808501808196508360051b81019150828601855b85811015613457578284038952613445848351613464565b9885019893509084019060010161342d565b5091979650505050505050565b6000815180845261347c816020860160208601613ab2565b601f01601f19169290920160200192915050565b600082516134a2818460208701613ab2565b9190910192915050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161350c816017850160208801613ab2565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161353d816028840160208801613ab2565b01602801949350505050565b6001600160a01b038616815260a06020820181905260009061356d90830187613410565b828103604084015261357f8187613410565b905082810360608401526135938186613410565b91505082151560808301529695505050505050565b600060018060a01b038086168352606060208401526135ca6060840186613464565b9150808416604084015250949350505050565b60018060a01b038616815284602082015260a06040820152600061360460a0830186613410565b82810360608401526135938186613410565b6020808252825182820181905260009190848201906040850190845b81811015613650578351151583529284019291840191600101613632565b50909695505050505050565b60608152600061366f6060830186613410565b82810360208401526136818186613410565b915050826040830152949350505050565b6020808252810182905260006001600160fb1b038311156136b1578081fd5b8260051b808560408501379190910160400190815292915050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b602081526000612b6e6020830184613464565b60208082526025908201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456040820152642627abaf9960d91b606082015260800190565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60208082526024908201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604082015263272a22a960e11b606082015260800190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6020808252602f908201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060408201526e282927ab22a22fa7a92fa7aba722a960891b606082015260800190565b8281526040602082015260006138eb6040830184613464565b949350505050565b6000808335601e19843603018112613909578283fd5b8301803591506001600160401b03821115613922578283fd5b602001915036819003821315612ecf57600080fd5b60008235605e198336030181126134a2578182fd5b604051601f8201601f191681016001600160401b038111828210171561397457613974613b65565b604052919050565b60006001600160401b0382111561399557613995613b65565b5060051b60200190565b600082198211156139b2576139b2613b4f565b500190565b60008160001904831182151516156139d1576139d1613b4f565b500290565b6000828210156139e8576139e8613b4f565b500390565b60006139fb61323e8461397c565b808482526020808301925084368760051b87011115613a18578485fd5b845b87811015613aa65781356001600160401b0380821115613a38578788fd5b90880190601f3681840112613a4b578889fd5b823582811115613a5d57613a5d613b65565b613a6e818301601f1916880161394c565b92508083523687828601011115613a8357898afd5b808785018885013782018601899052508652509382019390820190600101613a1a565b50919695505050505050565b60005b83811015613acd578181015183820152602001613ab5565b83811115613adc576000848401525b50505050565b600081613af157613af1613b4f565b506000190190565b600181811c90821680613b0d57607f821691505b60208210811415613b2e57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415613b4857613b48613b4f565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610dfa57600080fd5b8015158114610dfa57600080fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd6229f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
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
