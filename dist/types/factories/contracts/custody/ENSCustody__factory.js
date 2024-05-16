"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENSCustody__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "CustodyNotEnoughBalance",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "InvalidForwardedToken",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "InvalidOwner",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidSignature",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "InvalidToken",
        type: "error",
    },
    {
        inputs: [],
        name: "OperationProhibited",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "Unauthorised",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "UnknownToken",
        type: "error",
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
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "Parked",
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
        inputs: [
            {
                internalType: "bytes32",
                name: "commitment",
                type: "bytes32",
            },
        ],
        name: "commit",
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
                        name: "from",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                    },
                ],
                internalType: "struct IForwarder.ForwardRequest",
                name: "req",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "execute",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
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
                internalType: "address",
                name: "controller",
                type: "address",
            },
            {
                internalType: "address",
                name: "wrapper",
                type: "address",
            },
            {
                internalType: "address",
                name: "registrar",
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
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
            {
                internalType: "bytes32",
                name: "secret",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "bytes[]",
                name: "data",
                type: "bytes[]",
            },
            {
                internalType: "bool",
                name: "reverseRecord",
                type: "bool",
            },
            {
                internalType: "uint16",
                name: "ownerControlledFuses",
                type: "uint16",
            },
            {
                internalType: "bool",
                name: "selfCustody",
                type: "bool",
            },
        ],
        name: "makeCommitment",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "nonceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "onERC1155BatchReceived",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "onERC1155Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "onERC721Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
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
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
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
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
            {
                internalType: "bytes32",
                name: "secret",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "bytes[]",
                name: "data",
                type: "bytes[]",
            },
            {
                internalType: "bool",
                name: "reverseRecord",
                type: "bool",
            },
            {
                internalType: "uint16",
                name: "ownerControlledFuses",
                type: "uint16",
            },
            {
                internalType: "bool",
                name: "selfCustody",
                type: "bool",
            },
        ],
        name: "register",
        outputs: [],
        stateMutability: "nonpayable",
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
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
        ],
        name: "renew",
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
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
        ],
        name: "rentPrice",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
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
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransfer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "baseRegistrar",
                type: "address",
            },
        ],
        name: "setBaseRegistrar",
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
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "from",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                    },
                ],
                internalType: "struct IForwarder.ForwardRequest",
                name: "req",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "verify",
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
        stateMutability: "payable",
        type: "receive",
    },
];
const _bytecode = "0x60806040523480156200001157600080fd5b506200001c62000022565b620000e4565b600054610100900460ff16156200008f5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff9081161015620000e2576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b61344180620000f46000396000f3fe60806040526004361061021e5760003560e01c80638da5cb5b11610123578063acf1a841116100ab578063d547741f1161006f578063d547741f14610682578063f14fcbc8146106a2578063f23a6e61146106c2578063f2fde38b146106e2578063ffa1ad741461070257600080fd5b8063acf1a841146105e0578063bc197c8114610600578063c0c53b8b14610620578063cf01585314610640578063d53913931461066057600080fd5b8063a0e3aef1116100f2578063a0e3aef114610534578063a217fddf14610554578063a3f4df7e14610569578063a4247400146105a0578063aa271e1a146105c057600080fd5b80638da5cb5b146104c157806391d14854146104df578063983b2d56146104ff578063986502751461051f57600080fd5b80635fc1964f116101a65780636ccbae5f116101755780636ccbae5f14610439578063715018a61461045957806371e2a6571461046e57806381c81d351461048e57806383e7f6ff146104a157600080fd5b80635fc1964f146103ae578063634486da146103ce5780636352211e146103e15780636a8be89e1461041957600080fd5b80632f2ff15d116101ed5780632f2ff15d146103035780633092afd51461032557806336568abe14610345578063423f6cef14610365578063572b6c051461038557600080fd5b806301ffc9a71461022a578063150b7a021461025f5780631bf7e13e14610298578063248a9ca3146102c557600080fd5b3661022557005b600080fd5b34801561023657600080fd5b5061024a6102453660046125f2565b610733565b60405190151581526020015b60405180910390f35b34801561026b57600080fd5b5061027f61027a366004612672565b610779565b6040516001600160e01b03199091168152602001610256565b3480156102a457600080fd5b506102b86102b33660046126e4565b6108cb565b60405161025691906127a4565b3480156102d157600080fd5b506102f56102e03660046127b7565b600090815260fb602052604090206001015490565b604051908152602001610256565b34801561030f57600080fd5b5061032361031e3660046127d0565b610997565b005b34801561033157600080fd5b50610323610340366004612800565b6109c1565b34801561035157600080fd5b506103236103603660046127d0565b6109d5565b34801561037157600080fd5b5061032361038036600461281d565b610a68565b34801561039157600080fd5b5061024a6103a0366004612800565b6001600160a01b0316301490565b3480156103ba57600080fd5b506103236103c936600461288f565b610bd9565b6103236103dc366004612800565b610c21565b3480156103ed57600080fd5b506104016103fc3660046127b7565b610ce4565b6040516001600160a01b039091168152602001610256565b34801561042557600080fd5b50610323610434366004612800565b610cef565b34801561044557600080fd5b506102f56104543660046127b7565b610d38565b34801561046557600080fd5b50610323610d7e565b34801561047a57600080fd5b5061032361048936600461288f565b610d92565b61032361049c366004612800565b610dda565b3480156104ad57600080fd5b506102f56104bc366004612934565b610e57565b3480156104cd57600080fd5b506097546001600160a01b0316610401565b3480156104eb57600080fd5b5061024a6104fa3660046127d0565b610efa565b34801561050b57600080fd5b5061032361051a366004612800565b610f25565b34801561052b57600080fd5b50610323610f36565b34801561054057600080fd5b506102f561054f366004612a5c565b610f50565b34801561056057600080fd5b506102f5600081565b34801561057557600080fd5b506102b86040518060400160405280600b81526020016a454e5320437573746f647960a81b81525081565b3480156105ac57600080fd5b5061024a6105bb3660046126e4565b610ffc565b3480156105cc57600080fd5b5061024a6105db366004612800565b61104f565b3480156105ec57600080fd5b506103236105fb366004612934565b611069565b34801561060c57600080fd5b5061027f61061b366004612b35565b611222565b34801561062c57600080fd5b5061032361063b366004612bf3565b6112db565b34801561064c57600080fd5b5061032361065b366004612c3e565b611485565b34801561066c57600080fd5b506102f56000805160206133f583398151915281565b34801561068e57600080fd5b5061032361069d3660046127d0565b611592565b3480156106ae57600080fd5b506103236106bd3660046127b7565b6115b7565b3480156106ce57600080fd5b5061027f6106dd366004612d20565b61162b565b3480156106ee57600080fd5b506103236106fd366004612800565b6116bc565b34801561070e57600080fd5b506102b860405180604001604052806005815260200164302e312e3360d81b81525081565b60006001600160e01b03198216630a85bd0160e11b148061076457506001600160e01b03198216630271189760e51b145b806107735750610773826116d8565b92915050565b7ff851d5f4fccb32d2a48561b7acc01b5d4d46b7e138d49f887026f203b08c5004546000906001600160a01b0316806107b061170d565b6001600160a01b0316036108a957600080806107ce86880188612d9b565b9250925092506107dd8361171c565b6001600160a01b03841663b88d4fde30600080516020613415833981519152546040516001600160a01b03909116908c9061082390879030906000908b90602001612dfc565b6040516020818303038152906040526040518563ffffffff1660e01b81526004016108519493929190612e3c565b600060405180830381600087803b15801561086b57600080fd5b505af115801561087f573d6000803e3d6000fd5b5050505061089561088f8261174e565b846117d3565b50630a85bd0160e11b93506108c292505050565b6040516344e7d94960e01b815260040160405180910390fd5b95945050505050565b606060005a90506108dd858585610ffc565b6108fa57604051638baa579f60e01b815260040160405180910390fd5b61098c61090a6020870187612800565b3060408801358461091e60608b018b612e6f565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b908190840183828082843760009201919091525061185e92505050565b9150505b9392505050565b600082815260fb60205260409020600101546109b28161193f565b6109bc8383611950565b505050565b6109c96119d7565b6109d281611a50565b50565b6109dd61170d565b6001600160a01b0316816001600160a01b031614610a5a5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b610a648282611a68565b5050565b80610a7161170d565b6001600160a01b0316610a8382611aed565b6001600160a01b031614610ac55780610a9a61170d565b604051637ea58b1160e01b815260048101929092526001600160a01b03166024820152604401610a51565b610ace82611c03565b604080517f0a8885dd093a12d378a27df09bde33e3caca641a3d6970e06805fde8e847cb466020820152908101839052600090610b22906060015b6040516020818303038152906040528051906020012090565b80546001600160a01b0319166001600160a01b0392909216919091179055600060008051602061341583398151915254604051637921219560e11b81523060048201526001600160a01b038681166024830152604482018690526001606483015260a06084830152600060a48301529091169150819063f242432a9060c401600060405180830381600087803b158015610bbb57600080fd5b505af1158015610bcf573d6000803e3d6000fd5b5050505050505050565b610be16119d7565b60005b8151811015610a6457610c0f828281518110610c0257610c02612eb5565b6020026020010151611a50565b80610c1981612ee1565b915050610be4565b610c2c6105db61170d565b610c485760405162461bcd60e51b8152600401610a5190612efa565b6001600160a01b038116610c9e5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610a51565b610ca781611c1c565b610caf610f36565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610a64573d6000803e3d6000fd5b600061077382611aed565b610cf76119d7565b7ff851d5f4fccb32d2a48561b7acc01b5d4d46b7e138d49f887026f203b08c500480546001600160a01b0319166001600160a01b0392909216919091179055565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a838156020820152908101829052600090610d7790606001610b09565b5492915050565b610d866119d7565b610d906000611c34565b565b610d9a6119d7565b60005b8151811015610a6457610dc8828281518110610dbb57610dbb612eb5565b6020026020010151611c1c565b80610dd281612ee1565b915050610d9d565b610de56105db61170d565b610e015760405162461bcd60e51b8152600401610a5190612efa565b6001600160a01b038116610ca75760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610a51565b6000805160206133d5833981519152546040516383e7f6ff60e01b81526000916001600160a01b031690829082906383e7f6ff90610e9d90899089908990600401612f58565b6040805180830381865afa158015610eb9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610edd9190612f7c565b60208101518151919250610ef091612fca565b9695505050505050565b600091825260fb602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610f2d6119d7565b6109d281611c1c565b610d906000805160206133f583398151915261036061170d565b6000805160206133d5833981519152546000906001600160a01b0316806365a69dcf8d85610f7e5730610f80565b8d5b8d8d8d8d8d8d8d6040518a63ffffffff1660e01b8152600401610fab9998979695949392919061306e565b602060405180830381865afa158015610fc8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fec91906130de565b9c9b505050505050505050505050565b600061104761100a856130f7565b3085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611c8692505050565b949350505050565b60006107736000805160206133f583398151915283610efa565b6110746105db61170d565b6110905760405162461bcd60e51b8152600401610a5190612efa565b6002603354036110e25760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610a51565b60026033556000805160206133d5833981519152546040516383e7f6ff60e01b81526001600160a01b039091169060009082906383e7f6ff9061112d90889088908890600401612f58565b6040805180830381865afa158015611149573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061116d9190612f7c565b6020810151815191925061118091612fca565b4710156111a05760405163050205f960e01b815260040160405180910390fd5b816001600160a01b031663acf1a841826020015183600001516111c39190612fca565b8787876040518563ffffffff1660e01b81526004016111e493929190612f58565b6000604051808303818588803b1580156111fd57600080fd5b505af1158015611211573d6000803e3d6000fd5b505060016033555050505050505050565b6000600080516020613415833981519152546001600160a01b031661124561170d565b6001600160a01b03161461126c576040516344e7d94960e01b815260040160405180910390fd5b600061127a83850185612800565b90506112858161171c565b60005b878110156112c4576112b28989838181106112a5576112a5612eb5565b90506020020135836117d3565b806112bc81612ee1565b915050611288565b5063bc197c8160e01b9a9950505050505050505050565b600054610100900460ff16158080156112fb5750600054600160ff909116105b806113155750303b158015611315575060005460ff166001145b6113785760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610a51565b6000805460ff19166001179055801561139b576000805461ff0019166101001790555b6000805160206133d583398151915280546001600160a01b038087166001600160a01b03199283161790925560008051602061341583398151915280548684169083161790557ff851d5f4fccb32d2a48561b7acc01b5d4d46b7e138d49f887026f203b08c5004805492851692909116919091179055611419611dc5565b611421611df3565b611429611df3565b611431611e1a565b611439611e51565b801561147f576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050565b6114906105db61170d565b6114ac5760405162461bcd60e51b8152600401610a5190612efa565b6002603354036114fe5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610a51565b600260338190555060006115478c8c8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061174e92505050565b905061155281611c03565b6115708c8c846115625730611564565b8c5b8c8c8c8c8c8c8c611e8a565b8161157f5761157f818b6117d3565b5050600160335550505050505050505050565b600082815260fb60205260409020600101546115ad8161193f565b6109bc8383611a68565b60006000805160206133d583398151915254604051631e29f97960e31b8152600481018490526001600160a01b039091169150819063f14fcbc890602401600060405180830381600087803b15801561160f57600080fd5b505af1158015611623573d6000803e3d6000fd5b505050505050565b6000600080516020613415833981519152546001600160a01b031661164e61170d565b6001600160a01b031614611675576040516344e7d94960e01b815260040160405180910390fd5b6001600160a01b038616156116a957600061169283850185612800565b905061169d8161171c565b6116a786826117d3565b505b5063f23a6e6160e01b9695505050505050565b6116c46119d7565b6116cd81611fd5565b6109d260008261204b565b60006001600160e01b03198216637965db0b60e01b148061077357506301ffc9a760e01b6001600160e01b0319831614610773565b6000611717612055565b905090565b6001600160a01b0381166109d25760405163b20f76e360e01b81526001600160a01b0382166004820152602401610a51565b60007f93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae60001b826040516020016117859190613195565b604051602081830303815290604052805190602001206040516020016117b5929190918252602082015260400190565b60408051601f19818403018152919052805160209091012092915050565b604080517f0a8885dd093a12d378a27df09bde33e3caca641a3d6970e06805fde8e847cb466020820152908101839052819061181190606001610b09565b80546001600160a01b0319166001600160a01b039283161790556040519082169083907f45aa97e368889fb3527c1db60c59c2ae91e82f21778613449e46d4208c1c4b1290600090a35050565b606061186985612073565b600080876001600160a01b0316866118838b8a89896120d9565b6040516118909190613195565b60006040518083038160008787f1925050503d80600081146118ce576040519150601f19603f3d011682016040523d82523d6000602084013e6118d3565b606091505b5090925090506118e4603f876131b1565b5a116118f2576118f26131d3565b61193282826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c4544000000000000815250612109565b9998505050505050505050565b6109d28161194b61170d565b612142565b61195a8282610efa565b610a6457600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff1916600117905561199361170d565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6119df61170d565b6001600160a01b03166119fa6097546001600160a01b031690565b6001600160a01b031614610d905760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610a51565b6109d26000805160206133f583398151915282611592565b611a728282610efa565b15610a6457600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff19169055611aa961170d565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b604080517f0a8885dd093a12d378a27df09bde33e3caca641a3d6970e06805fde8e847cb466020820152908101829052600090611b2c90606001610b09565b546001600160a01b0316905080611b595760405163124bad6360e31b815260048101839052602401610a51565b30600080516020613415833981519152546040516331a9108f60e11b8152600481018590526001600160a01b0390911690636352211e90602401602060405180830381865afa158015611bb0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bd491906131e9565b6001600160a01b031614611bfe576040516303b673fd60e21b815260048101839052602401610a51565b919050565b303303611c13576109d2816121a6565b6109d281612073565b6109d26000805160206133f58339815191528261204b565b609780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f90602401602060405180830381865afa158015611ccd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cf191906130de565b90506000611d9f866060015180519060200120868860200151604051602001611d3f9392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b9050818660200151148015610ef057508551610ef0906001600160a01b031682866121d0565b600054610100900460ff16611dec5760405162461bcd60e51b8152600401610a5190613206565b6001603355565b600054610100900460ff16610d905760405162461bcd60e51b8152600401610a5190613206565b600054610100900460ff16611e415760405162461bcd60e51b8152600401610a5190613206565b610d90611e4c61170d565b611c34565b600054610100900460ff16611e785760405162461bcd60e51b8152600401610a5190613206565b610d906000611e8561170d565b61204b565b6000805160206133d5833981519152546040516383e7f6ff60e01b81526001600160a01b039091169060009082906383e7f6ff90611ed0908f908f908e90600401612f58565b6040805180830381865afa158015611eec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f109190612f7c565b60208101518151919250611f2391612fca565b471015611f435760405163050205f960e01b815260040160405180910390fd5b816001600160a01b03166374694a2b82602001518360000151611f669190612fca565b8e8e8e8e8e8e8e8e8e8e6040518c63ffffffff1660e01b8152600401611f959a99989796959493929190613251565b6000604051808303818588803b158015611fae57600080fd5b505af1158015611fc2573d6000803e3d6000fd5b5050505050505050505050505050505050565b611fdd6119d7565b6001600160a01b0381166120425760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610a51565b6109d281611c34565b610a648282611950565b600030330361206b575060331936013560601c90565b503390565b90565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a8381560208201529081018290526000906060016040516020818303038152906040528051906020012090506120c88190565b546120d4906001612fca565b905550565b60608285856040516020016120f0939291906132c3565b6040516020818303038152906040529050949350505050565b60608315612118575081610990565b8251156121285782518084602001fd5b8160405162461bcd60e51b8152600401610a5191906127a4565b61214c8282610efa565b610a6457612164816001600160a01b03166014612312565b61216f836020612312565b604051602001612180929190613302565b60408051601f198184030181529082905262461bcd60e51b8252610a51916004016127a4565b6121ae6124ad565b81146109d257604051635637b6af60e11b815260048101829052602401610a51565b60008060006121df85856124c0565b909250905060008160048111156121f8576121f8613377565b1480156122165750856001600160a01b0316826001600160a01b0316145b1561222657600192505050610990565b600080876001600160a01b0316631626ba7e60e01b888860405160240161224e92919061338d565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252905161228c9190613195565b600060405180830381855afa9150503d80600081146122c7576040519150601f19603f3d011682016040523d82523d6000602084013e6122cc565b606091505b50915091508180156122df575080516020145b801561230657508051630b135d3f60e11b9061230490830160209081019084016130de565b145b98975050505050505050565b606060006123218360026133a6565b61232c906002612fca565b6001600160401b0381111561234357612343612849565b6040519080825280601f01601f19166020018201604052801561236d576020820181803683370190505b509050600360fc1b8160008151811061238857612388612eb5565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106123b7576123b7612eb5565b60200101906001600160f81b031916908160001a90535060006123db8460026133a6565b6123e6906001612fca565b90505b600181111561245e576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061241a5761241a612eb5565b1a60f81b82828151811061243057612430612eb5565b60200101906001600160f81b031916908160001a90535060049490941c93612457816133bd565b90506123e9565b5083156109905760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610a51565b60003033036120705750601f1936013590565b60008082516041036124f65760208301516040840151606085015160001a6124ea87828585612505565b945094505050506124fe565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561253c57506000905060036125e9565b8460ff16601b1415801561255457508460ff16601c14155b1561256557506000905060046125e9565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa1580156125b9573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166125e2576000600192509250506125e9565b9150600090505b94509492505050565b60006020828403121561260457600080fd5b81356001600160e01b03198116811461099057600080fd5b6001600160a01b03811681146109d257600080fd5b60008083601f84011261264357600080fd5b5081356001600160401b0381111561265a57600080fd5b6020830191508360208285010111156124fe57600080fd5b60008060008060006080868803121561268a57600080fd5b85356126958161261c565b945060208601356126a58161261c565b93506040860135925060608601356001600160401b038111156126c757600080fd5b6126d388828901612631565b969995985093965092949392505050565b6000806000604084860312156126f957600080fd5b83356001600160401b038082111561271057600080fd5b908501906080828803121561272457600080fd5b9093506020850135908082111561273a57600080fd5b5061274786828701612631565b9497909650939450505050565b60005b8381101561276f578181015183820152602001612757565b50506000910152565b60008151808452612790816020860160208601612754565b601f01601f19169290920160200192915050565b6020815260006109906020830184612778565b6000602082840312156127c957600080fd5b5035919050565b600080604083850312156127e357600080fd5b8235915060208301356127f58161261c565b809150509250929050565b60006020828403121561281257600080fd5b81356109908161261c565b6000806040838503121561283057600080fd5b823561283b8161261c565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b038111828210171561288757612887612849565b604052919050565b600060208083850312156128a257600080fd5b82356001600160401b03808211156128b957600080fd5b818501915085601f8301126128cd57600080fd5b8135818111156128df576128df612849565b8060051b91506128f084830161285f565b818152918301840191848101908884111561290a57600080fd5b938501935b8385101561230657843592506129248361261c565b828252938501939085019061290f565b60008060006040848603121561294957600080fd5b83356001600160401b0381111561295f57600080fd5b61296b86828701612631565b909790965060209590950135949350505050565b60006001600160401b0383111561299857612998612849565b6129ab601f8401601f191660200161285f565b90508281528383830111156129bf57600080fd5b828260208301376000602084830101529392505050565b600082601f8301126129e757600080fd5b6109908383356020850161297f565b60008083601f840112612a0857600080fd5b5081356001600160401b03811115612a1f57600080fd5b6020830191508360208260051b85010111156124fe57600080fd5b80358015158114611bfe57600080fd5b803561ffff81168114611bfe57600080fd5b6000806000806000806000806000806101208b8d031215612a7c57600080fd5b8a356001600160401b0380821115612a9357600080fd5b612a9f8e838f016129d6565b9b5060208d01359150612ab18261261c565b90995060408c0135985060608c0135975060808c013590612ad18261261c565b90965060a08c01359080821115612ae757600080fd5b50612af48d828e016129f6565b9096509450612b07905060c08c01612a3a565b9250612b1560e08c01612a4a565b9150612b246101008c01612a3a565b90509295989b9194979a5092959850565b60008060008060008060008060a0898b031215612b5157600080fd5b8835612b5c8161261c565b97506020890135612b6c8161261c565b965060408901356001600160401b0380821115612b8857600080fd5b612b948c838d016129f6565b909850965060608b0135915080821115612bad57600080fd5b612bb98c838d016129f6565b909650945060808b0135915080821115612bd257600080fd5b50612bdf8b828c01612631565b999c989b5096995094979396929594505050565b600080600060608486031215612c0857600080fd5b8335612c138161261c565b92506020840135612c238161261c565b91506040840135612c338161261c565b809150509250925092565b60008060008060008060008060008060006101208c8e031215612c6057600080fd5b6001600160401b03808d351115612c7657600080fd5b612c838e8e358f01612631565b909c509a50612c9560208e013561261c565b60208d0135995060408d0135985060608d01359750612cb760808e013561261c565b60808d013596508060a08e01351115612ccf57600080fd5b50612ce08d60a08e01358e016129f6565b9095509350612cf160c08d01612a3a565b9250612cff60e08d01612a4a565b9150612d0e6101008d01612a3a565b90509295989b509295989b9093969950565b60008060008060008060a08789031215612d3957600080fd5b8635612d448161261c565b95506020870135612d548161261c565b9450604087013593506060870135925060808701356001600160401b03811115612d7d57600080fd5b612d8989828a01612631565b979a9699509497509295939492505050565b600080600060608486031215612db057600080fd5b8335612dbb8161261c565b92506020840135612dcb8161261c565b915060408401356001600160401b03811115612de657600080fd5b612df2868287016129d6565b9150509250925092565b608081526000612e0f6080830187612778565b6001600160a01b03958616602084015261ffff949094166040830152509216606090920191909152919050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090610ef090830184612778565b6000808335601e19843603018112612e8657600080fd5b8301803591506001600160401b03821115612ea057600080fd5b6020019150368190038213156124fe57600080fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201612ef357612ef3612ecb565b5060010190565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b604081526000612f6c604083018587612f2f565b9050826020830152949350505050565b600060408284031215612f8e57600080fd5b604051604081018181106001600160401b0382111715612fb057612fb0612849565b604052825181526020928301519281019290925250919050565b8082018082111561077357610773612ecb565b81835260006020808501808196508560051b810191508460005b878110156130615782840389528135601e1988360301811261301857600080fd5b870185810190356001600160401b0381111561303357600080fd5b80360382131561304257600080fd5b61304d868284612f2f565b9a87019a9550505090840190600101612ff7565b5091979650505050505050565b60006101008083526130828184018d612778565b6001600160a01b038c81166020860152604085018c9052606085018b90528916608085015283810360a085015290506130bc818789612fdd565b94151560c0840152505061ffff9190911660e090910152979650505050505050565b6000602082840312156130f057600080fd5b5051919050565b60006080823603121561310957600080fd5b604051608081016001600160401b03828210818311171561312c5761312c612849565b816040528435915061313d8261261c565b8183526020850135602084015260408501356040840152606085013591508082111561316857600080fd5b50830136601f82011261317a57600080fd5b6131893682356020840161297f565b60608301525092915050565b600082516131a7818460208701612754565b9190910192915050565b6000826131ce57634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052600160045260246000fd5b6000602082840312156131fb57600080fd5b81516109908161261c565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60006101008083526132668184018d8f612f2f565b6001600160a01b038c81166020860152604085018c9052606085018b90528916608085015283810360a085015290506132a0818789612fdd565b94151560c0840152505061ffff9190911660e09091015298975050505050505050565b600084516132d5818460208901612754565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161333a816017850160208801612754565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161336b816028840160208801612754565b01602801949350505050565b634e487b7160e01b600052602160045260246000fd5b8281526040602082015260006110476040830184612778565b808202811582820484141761077357610773612ecb565b6000816133cc576133cc612ecb565b50600019019056fe412386de53449251cbf7ce1f4c6a038bf9c0746e62d331b08ef0c3fa7d0ab6729f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a660793a5062d506d35cc8f1beda67ee5028c16bfcd9c923d5bfc439c04bd929b1a164736f6c6343000811000a";
const isSuperArgs = (xs) => xs.length > 1;
class ENSCustody__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    connect(runner) {
        return super.connect(runner);
    }
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.ENSCustody__factory = ENSCustody__factory;
ENSCustody__factory.bytecode = _bytecode;
ENSCustody__factory.abi = _abi;
