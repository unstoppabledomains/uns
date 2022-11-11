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
const _bytecode = "0x608060405234801561001057600080fd5b50613856806100206000396000f3fe6080604052600436106102675760003560e01c8063906cecc111610144578063b9998a24116100b6578063d4a32ad61161007a578063d4a32ad614610778578063d539139314610798578063d547741f146107ba578063ec527389146107da578063f2fde38b146107fa578063ffa1ad741461081a57600080fd5b8063b9998a24146106d8578063c3a3bc00146106f8578063cc2c3fc414610718578063ceeb4f5014610738578063d1f5692c1461075857600080fd5b8063a217fddf11610108578063a217fddf146105f6578063a3f4df7e1461060b578063a849d65c14610658578063aa271e1a14610678578063ae31844a14610698578063b0aa98c7146106b857600080fd5b8063906cecc11461056157806391d1485414610581578063983b2d56146105a157806398650275146105c157806399e0dd7c146105d657600080fd5b8063463c4bcb116101dd578063634486da116101a1578063634486da146104d3578063715018a6146104e657806371e2a657146104fb57806381c81d351461051b5780638456cb591461052e5780638da5cb5b1461054357600080fd5b8063463c4bcb14610410578063572b6c05146104305780635b6fa8db1461047e5780635c975abb1461049e5780635fc1964f146104b357600080fd5b8063268b15ed1161022f578063268b15ed146103435780632f2ff15d146103635780633092afd51461038357806336568abe146103a35780633f41b614146103c35780633f4ba83a146103fb57600080fd5b806301ffc9a71461026c5780630e36a87d146102a157806310921f12146102ce5780631459457a146102e3578063248a9ca314610305575b600080fd5b34801561027857600080fd5b5061028c61028736600461304a565b61084b565b60405190151581526020015b60405180910390f35b3480156102ad57600080fd5b506102c16102bc366004612f04565b610882565b604051610298919061335a565b3480156102da57600080fd5b5061028c610959565b3480156102ef57600080fd5b506103036102fe366004613072565b610986565b005b34801561031157600080fd5b50610335610320366004613003565b60009081526097602052604090206001015490565b604051908152602001610298565b34801561034f57600080fd5b5061030361035e366004613115565b610cd7565b34801561036f57600080fd5b5061030361037e36600461301b565b610e09565b34801561038f57600080fd5b5061030361039e366004612d1a565b610e33565b3480156103af57600080fd5b506103036103be36600461301b565b610e47565b3480156103cf57600080fd5b5060c9546103e3906001600160a01b031681565b6040516001600160a01b039091168152602001610298565b34801561040757600080fd5b50610303610ed5565b34801561041c57600080fd5b5061030361042b366004613003565b610ee7565b34801561043c57600080fd5b5061028c61044b366004612d1a565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546001600160a01b0390811691161490565b34801561048a57600080fd5b5060cc546103e3906001600160a01b031681565b3480156104aa57600080fd5b5061028c610f17565b3480156104bf57600080fd5b506103036104ce366004612f43565b610f2d565b6103036104e1366004612d1a565b610f83565b3480156104f257600080fd5b50610303611046565b34801561050757600080fd5b50610303610516366004612f43565b611058565b610303610529366004612d1a565b6110ae565b34801561053a57600080fd5b5061030361112b565b34801561054f57600080fd5b506033546001600160a01b03166103e3565b34801561056d57600080fd5b5061030361057c366004612dfa565b61113b565b34801561058d57600080fd5b5061028c61059c36600461301b565b611259565b3480156105ad57600080fd5b506103036105bc366004612d1a565b611284565b3480156105cd57600080fd5b50610303611295565b3480156105e257600080fd5b506103036105f13660046130e2565b6112af565b34801561060257600080fd5b50610335600081565b34801561061757600080fd5b5061064b604051806040016040528060148152602001732aa7299d1026b4b73a34b7339026b0b730b3b2b960611b81525081565b604051610298919061343f565b34801561066457600080fd5b5060cb546103e3906001600160a01b031681565b34801561068457600080fd5b5061028c610693366004612d1a565b61138e565b3480156106a457600080fd5b506103036106b3366004612f04565b6113a8565b3480156106c457600080fd5b5061028c6106d3366004613003565b6114b3565b3480156106e457600080fd5b506103036106f3366004612d1a565b611520565b34801561070457600080fd5b506103036107133660046130e2565b611565565b34801561072457600080fd5b5060ca546103e3906001600160a01b031681565b34801561074457600080fd5b50610303610753366004612e53565b6115ac565b34801561076457600080fd5b50610303610773366004612f04565b6116e7565b34801561078457600080fd5b50610303610793366004612d52565b6117ac565b3480156107a457600080fd5b5061033560008051602061382a83398151915281565b3480156107c657600080fd5b506103036107d536600461301b565b611aea565b3480156107e657600080fd5b506103036107f5366004613003565b611b0f565b34801561080657600080fd5b50610303610815366004612d1a565b611b81565b34801561082657600080fd5b5061064b6040518060400160405280600581526020016418171a171960d91b81525081565b60006001600160e01b03198216637965db0b60e01b148061087c57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060816001600160401b038111156108aa57634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156108d3578160200160208202803683370190505b50905060005b828110156109525761091084848381811061090457634e487b7160e01b600052603260045260246000fd5b905060200201356114b3565b82828151811061093057634e487b7160e01b600052603260045260246000fd5b911515602092830291909101909101528061094a8161378d565b9150506108d9565b5092915050565b60007fa85b8425a460dd344a297bd4a82e287385f0fc558cb3e78867b0489f43df24705b5460ff16919050565b600054610100900460ff16158080156109a65750600054600160ff909116105b806109c05750303b1580156109c0575060005460ff166001145b610a285760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff191660011790558015610a4b576000805461ff0019166101001790555b60c980546001600160a01b038089166001600160a01b03199283161790925560ca805488841690831617905560cb805487841690831617905560cc805492861692909116919091179055610a9d611b9d565b610aa5611bd4565b610aae82611c0d565b610ab6611c34565b610abe611c90565b604080516101c081018252600661018082018181526563727970746f60d01b6101a0840152825282518084018452818152651dd85b1b195d60d21b602082810191909152808401919091528351808501855260018152600f60fb1b8183015283850152835180850185526003808252621b999d60ea1b82840152606085019190915284518086018652600a815269313637b1b5b1b430b4b760b11b818401526080850152845180860186526007808252663134ba31b7b4b760c91b8285015260a0860191909152855180870187528281526207070760eb1b8185015260c0860152855180870187528281526264616f60e81b8185015260e086015285518087018752918252621e9a5b60ea1b8284015261010085019190915284518086018652908152663837b63cb3b7b760c91b8183015261012084015283518085018552600b81526a756e73746f707061626c6560a81b8183015261014084015283518085019094529083526535b632bb32b960d11b9083015261016081019190915260005b600c811015610c8757610c758282600c8110610c6b57634e487b7160e01b600052603260045260246000fd5b6020020151611ccd565b80610c7f8161378d565b915050610c3f565b50508015610ccf576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050505050565b8282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610d1a9250849150611de99050565b610d365760405162461bcd60e51b8152600401610a1f906134f7565b6000610d698260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115610dc157610d94610d88826000600a611e0f565b80516020909101512090565b60008051602061380a8339815191521415610dc15760405162461bcd60e51b8152600401610a1f90613452565b610dc9610f17565b15610de65760405162461bcd60e51b8152600401610a1f906134cd565b610ccf610df1611e4e565b610e0488610dff8989611e5d565b611e89565b611fb6565b600082815260976020526040902060010154610e2481611fc4565b610e2e8383611fd5565b505050565b610e3b61205c565b610e44816120d5565b50565b610e4f611e4e565b6001600160a01b0316816001600160a01b031614610ec75760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610a1f565b610ed182826120ed565b5050565b610edd61205c565b610ee5612172565b565b610ef2610693611e4e565b610f0e5760405162461bcd60e51b8152600401610a1f90613498565b610e448161221a565b60006000805160206137ea83398151915261097d565b610f3561205c565b60005b8151811015610ed157610f71828281518110610f6457634e487b7160e01b600052603260045260246000fd5b60200260200101516120d5565b80610f7b8161378d565b915050610f38565b610f8e610693611e4e565b610faa5760405162461bcd60e51b8152600401610a1f90613498565b6001600160a01b0381166110005760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610a1f565b611009816122e9565b611011611295565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610ed1573d6000803e3d6000fd5b61104e61205c565b610ee56000612301565b61106061205c565b60005b8151811015610ed15761109c82828151811061108f57634e487b7160e01b600052603260045260246000fd5b60200260200101516122e9565b806110a68161378d565b915050611063565b6110b9610693611e4e565b6110d55760405162461bcd60e51b8152600401610a1f90613498565b6001600160a01b0381166110095760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610a1f565b61113361205c565b610ee5612353565b8282828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061117e9250849150611de99050565b61119a5760405162461bcd60e51b8152600401610a1f906134f7565b60006111cd8260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115611219576111ec610d88826000600a611e0f565b60008051602061380a83398151915214156112195760405162461bcd60e51b8152600401610a1f90613452565b611221610f17565b1561123e5760405162461bcd60e51b8152600401610a1f906134cd565b61125087610e0488610dff8989611e5d565b50505050505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61128c61205c565b610e44816122e9565b610ee560008051602061382a8339815191526103be611e4e565b6112b761205c565b60c954604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906112e99085908590600401613410565b600060405180830381600087803b15801561130357600080fd5b505af1158015611317573d6000803e3d6000fd5b505060cb546001600160a01b0316159150610ed190505760cb54604051632678375f60e21b81526001600160a01b03909116906399e0dd7c906113609085908590600401613410565b600060405180830381600087803b15801561137a57600080fd5b505af1158015610ccf573d6000803e3d6000fd5b600061087c60008051602061382a83398151915283611259565b6113b3610693611e4e565b6113cf5760405162461bcd60e51b8152600401610a1f90613498565b60c9546040516000916001600160a01b0316906113f290859085906024016133d6565b60408051601f198184030181529181526020820180516001600160e01b0316635718c22560e11b1790525161142791906131de565b6000604051808303816000865af19150503d8060008114611464576040519150601f19603f3d011682016040523d82523d6000602084013e611469565b606091505b5050905080610e2e5760405162461bcd60e51b81526020600482015260166024820152751d5c19dc985919505b1b081b5bd8dac819985a5b195960521b6044820152606401610a1f565b60006114bd610959565b15801561087c5750604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd696020820152908101839052611516906060015b6040516020818303038152906040528051906020012090565b5460ff1692915050565b61152861205c565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e80546001600160a01b0319166001600160a01b03831617905550565b61156d61205c565b610ed182828080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611ccd92505050565b8686868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506115ef9250849150611de99050565b61160b5760405162461bcd60e51b8152600401610a1f906134f7565b600061163e8260408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a8160000151111561168a5761165d610d88826000600a611e0f565b60008051602061380a833981519152141561168a5760405162461bcd60e51b8152600401610a1f90613452565b611692610f17565b156116af5760405162461bcd60e51b8152600401610a1f906134cd565b6116da8b6116c18c610dff8d8d611e5d565b6116cb898b613646565b6116d5888a613646565b6123bb565b5050505050505050505050565b6116ef61205c565b60005b81811015610e2e5760c9546001600160a01b0316635096023984848481811061172b57634e487b7160e01b600052603260045260246000fd5b90506020020160208101906117409190612d1a565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b15801561178157600080fd5b505af1158015611795573d6000803e3d6000fd5b5050505080806117a49061378d565b9150506116f2565b6117b68587613646565b805160021415611828576117cb610693611e4e565b6118235760405162461bcd60e51b8152602060048201526024808201527f4d696e74696e674d616e616765723a2043414c4c45525f49535f4e4f545f4d49604482015263272a22a960e11b6064820152608401610a1f565b611935565b6000611833826126bf565b60c9549092506001600160a01b0316905063430c2081611851611e4e565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024810184905260440160206040518083038186803b15801561189757600080fd5b505afa1580156118ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118cf9190612fe3565b6119335760405162461bcd60e51b815260206004820152602f60248201527f4d696e74696e674d616e616765723a2053454e4445525f49535f4e4f545f415060448201526e282927ab22a22fa7a92fa7aba722a960891b6064820152608401610a1f565b505b61193f8688613646565b60028151101561199f5760405162461bcd60e51b815260206004820152602560248201527f4d696e74696e674d616e616765723a204c4142454c535f4c454e4754485f42456044820152642627abaf9960d91b6064820152608401610a1f565b6119dc81600183516119b1919061362f565b815181106119cf57634e487b7160e01b600052603260045260246000fd5b6020026020010151612725565b6119f85760405162461bcd60e51b8152600401610a1f906134f7565b6000611a5f8260028451611a0c919061362f565b81518110611a2a57634e487b7160e01b600052603260045260246000fd5b602002602001015160408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b9050600a81600001511115611aab57611a7e610d88826000600a611e0f565b60008051602061380a8339815191521415611aab5760405162461bcd60e51b8152600401610a1f90613452565b611ab3610f17565b15611ad05760405162461bcd60e51b8152600401610a1f906134cd565b611ade8a6116c18a8c613646565b50505050505050505050565b600082815260976020526040902060010154611b0581611fc4565b610e2e83836120ed565b611b1761205c565b611b2081611de9565b611b3c5760405162461bcd60e51b8152600401610a1f906134f7565b600081815260cd60205260408120611b5391612bbf565b60405181907f0aa1aff0f830e739d86baf0e6624d6763da02f7733575e0e463886cd062dea6a90600090a250565b611b8961205c565b611b9281612745565b610e446000826127bb565b600054610100900460ff16611bc45760405162461bcd60e51b8152600401610a1f90613539565b610ee5611bcf611e4e565b612301565b600054610100900460ff16611bfb5760405162461bcd60e51b8152600401610a1f90613539565b610ee56000611c08611e4e565b6127bb565b600054610100900460ff166115285760405162461bcd60e51b8152600401610a1f90613539565b600054610100900460ff16611c5b5760405162461bcd60e51b8152600401610a1f90613539565b60007fa85b8425a460dd344a297bd4a82e287385f0fc558cb3e78867b0489f43df24705b805460ff1916911515919091179055565b600054610100900460ff16611cb75760405162461bcd60e51b8152600401610a1f90613539565b60006000805160206137ea833981519152611c7f565b6000611cda6000836127c5565b600081815260cd602090815260409091208451929350611cfe929091850190612bf9565b50807f4fce6f6e172b04eaa80325d8e3b0180a34945000f3e214605039e8420fdf898083604051611d2f919061343f565b60405180910390a260c954604051634f558e7960e01b8152600481018390526001600160a01b0390911690634f558e799060240160206040518083038186803b158015611d7b57600080fd5b505afa158015611d8f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611db39190612fe3565b610ed15760c9546040516307befae360e51b81526001600160a01b039091169063f7df5c60906113609084908690600401613584565b600081815260cd602052604081208054829190611e0590613752565b9050119050919050565b60408051808201909152600080825260208201526040518060400160405280838152602001848660200151611e4491906135f8565b9052949350505050565b6000611e5861287a565b905090565b60608282604051602001611e729291906131fa565b604051602081830303815290604052905092915050565b604080516002808252606082810190935260009190816020015b6060815260200190600190039081611ea35790505090508281600081518110611edc57634e487b7160e01b600052603260045260246000fd5b602002602001018190525060cd60008581526020019081526020016000208054611f0590613752565b80601f0160208091040260200160405190810160405280929190818152602001828054611f3190613752565b8015611f7e5780601f10611f5357610100808354040283529160200191611f7e565b820191906000526020600020905b815481529060010190602001808311611f6157829003601f168201915b505050505081600181518110611fa457634e487b7160e01b600052603260045260246000fd5b60209081029190910101529392505050565b6060610e2e838383846123bb565b610e4481611fd0611e4e565b6128c1565b611fdf8282611259565b610ed15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612018611e4e565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612064611e4e565b6001600160a01b031661207f6033546001600160a01b031690565b6001600160a01b031614610ee55760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610a1f565b610e4460008051602061382a83398151915282611aea565b6120f78282611259565b15610ed15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff1916905561212e611e4e565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b61217a610f17565b6121bd5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881393d517d4105554d15160621b6044820152606401610a1f565b6000805160206137ea833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6121fd611e4e565b6040516001600160a01b03909116815260200160405180910390a1565b612222610959565b156122655760405162461bcd60e51b8152602060048201526013602482015272109b1bd8dadb1a5cdd0e88111254d050931151606a1b6044820152606401610a1f565b604080517f1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd6960208201529081018290526001906122a4906060016114fd565b805460ff19169115159190911790556040518181527f2ce5d9351b1d590d5a066db0d2dc7602d55f092506a83a7ee8c4d78ee357d75a9060200160405180910390a150565b610e4460008051602061382a833981519152826127bb565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b61235b610f17565b156123785760405162461bcd60e51b8152600401610a1f906134cd565b6000805160206137ea833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586121fd611e4e565b60006123c6846126bf565b5060c954604051634f558e7960e01b8152600481018390529192506001600160a01b031690634f558e799060240160206040518083038186803b15801561240c57600080fd5b505afa158015612420573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124449190612fe3565b80156124d2575060c9546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e9060240160206040518083038186803b15801561248f57600080fd5b505afa1580156124a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124c79190612d36565b6001600160a01b0316145b156125445760c95460405163037b8ed760e21b81526001600160a01b0390911690630dee3b5c9061250d908890859088908890600401613321565b600060405180830381600087803b15801561252757600080fd5b505af115801561253b573d6000803e3d6000fd5b505050506126b8565b61254d81612925565b61255684612987565b8015612563575083516002145b1561264f5760ca5484516001600160a01b039091169063c36c212590879087906000906125a057634e487b7160e01b600052603260045260246000fd5b602090810291909101015160cc546040516001600160e01b031960e086901b1681526125da9392916001600160a01b0316906004016132ec565b600060405180830381600087803b1580156125f457600080fd5b505af1158015612608573d6000803e3d6000fd5b5050505060008351111561264a5760cc54604051633a0deb9d60e21b81526001600160a01b039091169063e837ae749061250d908690869086906004016133a0565b6126b8565b60c954604051637d67df6360e01b81526001600160a01b0390911690637d67df6390612685908890889088908890600401613297565b600060405180830381600087803b15801561269f57600080fd5b505af11580156126b3573d6000803e3d6000fd5b505050505b5050505050565b805160009081905b801561271f5782915061270b82856126e060018561362f565b815181106126fe57634e487b7160e01b600052603260045260246000fd5b60200260200101516127c5565b9250806127178161373b565b9150506126c7565b50915091565b6000806127336000846127c5565b905061273e81611de9565b9392505050565b61274d61205c565b6001600160a01b0381166127b25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610a1f565b610e4481612301565b610ed18282611fd5565b60008151600014156128195760405162461bcd60e51b815260206004820152601b60248201527f4d696e74696e674d616e616765723a204c4142454c5f454d50545900000000006044820152606401610a1f565b828260405160200161282b91906131de565b6040516020818303038152906040528051906020012060405160200161285b929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b7f893ef2ea16c023f61d4f55d3e6ee3fc3f2fbfd478461323dbc2fbf919047086e546000906001600160a01b03163314156128bc575060331936013560601c90565b503390565b6128cb8282611259565b610ed1576128e3816001600160a01b031660146129de565b6128ee8360206129de565b6040516020016128ff929190613222565b60408051601f198184030181529082905262461bcd60e51b8252610a1f9160040161343f565b61292d610959565b610e445761293a816114b3565b15610f0e5760405162461bcd60e51b815260206004820152601d60248201527f4d696e74696e674d616e616765723a20544f4b454e5f424c4f434b45440000006044820152606401610a1f565b60008061299e600084600186516126e0919061362f565b60ca549091506001600160a01b03161580159061273e57507f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f1492915050565b606060006129ed836002613610565b6129f89060026135f8565b6001600160401b03811115612a1d57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015612a47576020820181803683370190505b509050600360fc1b81600081518110612a7057634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612aad57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000612ad1846002613610565b612adc9060016135f8565b90505b6001811115612b70576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612b1e57634e487b7160e01b600052603260045260246000fd5b1a60f81b828281518110612b4257634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c93612b698161373b565b9050612adf565b50831561273e5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610a1f565b508054612bcb90613752565b6000825580601f10612bdb575050565b601f016020900490600052602060002090810190610e449190612c7d565b828054612c0590613752565b90600052602060002090601f016020900481019282612c275760008555612c6d565b82601f10612c4057805160ff1916838001178555612c6d565b82800160010185558215612c6d579182015b82811115612c6d578251825591602001919060010190612c52565b50612c79929150612c7d565b5090565b5b80821115612c795760008155600101612c7e565b60008083601f840112612ca3578182fd5b5081356001600160401b03811115612cb9578182fd5b6020830191508360208260051b8501011115612cd457600080fd5b9250929050565b60008083601f840112612cec578182fd5b5081356001600160401b03811115612d02578182fd5b602083019150836020828501011115612cd457600080fd5b600060208284031215612d2b578081fd5b813561273e816137d4565b600060208284031215612d47578081fd5b815161273e816137d4565b60008060008060008060006080888a031215612d6c578283fd5b8735612d77816137d4565b965060208801356001600160401b0380821115612d92578485fd5b612d9e8b838c01612c92565b909850965060408a0135915080821115612db6578485fd5b612dc28b838c01612c92565b909650945060608a0135915080821115612dda578384fd5b50612de78a828b01612c92565b989b979a50959850939692959293505050565b60008060008060608587031215612e0f578384fd5b8435612e1a816137d4565b93506020850135925060408501356001600160401b03811115612e3b578283fd5b612e4787828801612cdb565b95989497509550505050565b60008060008060008060008060a0898b031215612e6e578182fd5b8835612e79816137d4565b97506020890135965060408901356001600160401b0380821115612e9b578384fd5b612ea78c838d01612cdb565b909850965060608b0135915080821115612ebf578384fd5b612ecb8c838d01612c92565b909650945060808b0135915080821115612ee3578384fd5b50612ef08b828c01612c92565b999c989b5096995094979396929594505050565b60008060208385031215612f16578182fd5b82356001600160401b03811115612f2b578283fd5b612f3785828601612c92565b90969095509350505050565b60006020808385031215612f55578182fd5b82356001600160401b03811115612f6a578283fd5b8301601f81018513612f7a578283fd5b8035612f8d612f88826135d5565b6135a5565b80828252848201915084840188868560051b8701011115612fac578687fd5b8694505b83851015612fd7578035612fc3816137d4565b835260019490940193918501918501612fb0565b50979650505050505050565b600060208284031215612ff4578081fd5b8151801515811461273e578182fd5b600060208284031215613014578081fd5b5035919050565b6000806040838503121561302d578182fd5b82359150602083013561303f816137d4565b809150509250929050565b60006020828403121561305b578081fd5b81356001600160e01b03198116811461273e578182fd5b600080600080600060a08688031215613089578283fd5b8535613094816137d4565b945060208601356130a4816137d4565b935060408601356130b4816137d4565b925060608601356130c4816137d4565b915060808601356130d4816137d4565b809150509295509295909350565b600080602083850312156130f4578182fd5b82356001600160401b03811115613109578283fd5b612f3785828601612cdb565b600080600060408486031215613129578081fd5b8335925060208401356001600160401b03811115613145578182fd5b61315186828701612cdb565b9497909650939450505050565b600081518084526020808501808196508360051b81019150828601855b858110156131a55782840389526131938483516131b2565b9885019893509084019060010161317b565b5091979650505050505050565b600081518084526131ca81602086016020860161370b565b601f01601f19169290920160200192915050565b600082516131f081846020870161370b565b9190910192915050565b6b756e732d646576746573742d60a01b81528183600c83013760009101600c01908152919050565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161325a81601785016020880161370b565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161328b81602884016020880161370b565b01602801949350505050565b6001600160a01b03851681526080602082018190526000906132bb9083018661315e565b82810360408401526132cd818661315e565b905082810360608401526132e1818561315e565b979650505050505050565b600060018060a01b0380861683526060602084015261330e60608401866131b2565b9150808416604084015250949350505050565b60018060a01b0385168152836020820152608060408201526000613348608083018561315e565b82810360608401526132e1818561315e565b6020808252825182820181905260009190848201906040850190845b81811015613394578351151583529284019291840191600101613376565b50909695505050505050565b6060815260006133b3606083018661315e565b82810360208401526133c5818661315e565b915050826040830152949350505050565b6020808252810182905260006001600160fb1b038311156133f5578081fd5b8260051b808560408501379190910160400190815292915050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b60208152600061273e60208301846131b2565b60208082526026908201527f4d696e74696e674d616e616765723a20544f4b454e5f4c4142454c5f50524f4860408201526512509255115160d21b606082015260800190565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60208082526010908201526f14185d5cd8589b194e8814105554d15160821b604082015260600190565b60208082526022908201527f4d696e74696e674d616e616765723a20544c445f4e4f545f5245474953544552604082015261115160f21b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b82815260406020820152600061359d60408301846131b2565b949350505050565b604051601f8201601f191681016001600160401b03811182821017156135cd576135cd6137be565b604052919050565b60006001600160401b038211156135ee576135ee6137be565b5060051b60200190565b6000821982111561360b5761360b6137a8565b500190565b600081600019048311821515161561362a5761362a6137a8565b500290565b600082821015613641576136416137a8565b500390565b6000613654612f88846135d5565b808482526020808301925084368760051b87011115613671578485fd5b845b878110156136ff5781356001600160401b0380821115613691578788fd5b90880190601f36818401126136a4578889fd5b8235828111156136b6576136b66137be565b6136c7818301601f191688016135a5565b925080835236878286010111156136dc57898afd5b808785018885013782018601899052508652509382019390820190600101613673565b50919695505050505050565b60005b8381101561372657818101518382015260200161370e565b83811115613735576000848401525b50505050565b60008161374a5761374a6137a8565b506000190190565b600181811c9082168061376657607f821691505b6020821081141561378757634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156137a1576137a16137a8565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610e4457600080fdfe5496787fc1ebdfeba375028c1865f13fbb1d63c0caa356ccc1b29a80f3ebd622b551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b89f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
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
