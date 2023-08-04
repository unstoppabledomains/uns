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
                name: "from",
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
                name: "",
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
                name: "",
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
                name: "from",
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
const _bytecode = "0x60806040523480156200001157600080fd5b506200001c62000022565b620000e4565b600054610100900460ff16156200008f5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff9081161015620000e2576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b6133aa80620000f46000396000f3fe60806040526004361061021e5760003560e01c80638da5cb5b11610123578063acf1a841116100ab578063d547741f1161006f578063d547741f14610682578063f14fcbc8146106a2578063f23a6e61146106c2578063f2fde38b146106e2578063ffa1ad741461070257600080fd5b8063acf1a841146105e0578063bc197c8114610600578063c0c53b8b14610620578063cf01585314610640578063d53913931461066057600080fd5b8063a0e3aef1116100f2578063a0e3aef114610534578063a217fddf14610554578063a3f4df7e14610569578063a4247400146105a0578063aa271e1a146105c057600080fd5b80638da5cb5b146104c157806391d14854146104df578063983b2d56146104ff578063986502751461051f57600080fd5b80635fc1964f116101a65780636ccbae5f116101755780636ccbae5f14610439578063715018a61461045957806371e2a6571461046e57806381c81d351461048e57806383e7f6ff146104a157600080fd5b80635fc1964f146103ae578063634486da146103ce5780636352211e146103e15780636a8be89e1461041957600080fd5b80632f2ff15d116101ed5780632f2ff15d146103035780633092afd51461032557806336568abe14610345578063423f6cef14610365578063572b6c051461038557600080fd5b806301ffc9a71461022a578063150b7a021461025f5780631bf7e13e14610298578063248a9ca3146102c557600080fd5b3661022557005b600080fd5b34801561023657600080fd5b5061024a610245366004612576565b610733565b60405190151581526020015b60405180910390f35b34801561026b57600080fd5b5061027f61027a3660046125f6565b610779565b6040516001600160e01b03199091168152602001610256565b3480156102a457600080fd5b506102b86102b3366004612668565b6108bf565b6040516102569190612728565b3480156102d157600080fd5b506102f56102e036600461273b565b600090815260fb602052604090206001015490565b604051908152602001610256565b34801561030f57600080fd5b5061032361031e366004612754565b61098b565b005b34801561033157600080fd5b50610323610340366004612784565b6109b5565b34801561035157600080fd5b50610323610360366004612754565b6109c9565b34801561037157600080fd5b506103236103803660046127a1565b610a5c565b34801561039157600080fd5b5061024a6103a0366004612784565b6001600160a01b0316301490565b3480156103ba57600080fd5b506103236103c9366004612813565b610bcd565b6103236103dc366004612784565b610c15565b3480156103ed57600080fd5b506104016103fc36600461273b565b610cd8565b6040516001600160a01b039091168152602001610256565b34801561042557600080fd5b50610323610434366004612784565b610ce3565b34801561044557600080fd5b506102f561045436600461273b565b610d2c565b34801561046557600080fd5b50610323610d72565b34801561047a57600080fd5b50610323610489366004612813565b610d86565b61032361049c366004612784565b610dce565b3480156104ad57600080fd5b506102f56104bc3660046128b8565b610e4b565b3480156104cd57600080fd5b506097546001600160a01b0316610401565b3480156104eb57600080fd5b5061024a6104fa366004612754565b610eee565b34801561050b57600080fd5b5061032361051a366004612784565b610f19565b34801561052b57600080fd5b50610323610f2a565b34801561054057600080fd5b506102f561054f3660046129e0565b610f44565b34801561056057600080fd5b506102f5600081565b34801561057557600080fd5b506102b86040518060400160405280600b81526020016a454e5320437573746f647960a81b81525081565b3480156105ac57600080fd5b5061024a6105bb366004612668565b610ff0565b3480156105cc57600080fd5b5061024a6105db366004612784565b611043565b3480156105ec57600080fd5b506103236105fb3660046128b8565b61105d565b34801561060c57600080fd5b5061027f61061b366004612ab9565b611216565b34801561062c57600080fd5b5061032361063b366004612b77565b6112b5565b34801561064c57600080fd5b5061032361065b366004612bc2565b61145f565b34801561066c57600080fd5b506102f560008051602061335e83398151915281565b34801561068e57600080fd5b5061032361069d366004612754565b61156c565b3480156106ae57600080fd5b506103236106bd36600461273b565b611591565b3480156106ce57600080fd5b5061027f6106dd366004612ca4565b611605565b3480156106ee57600080fd5b506103236106fd366004612784565b61167b565b34801561070e57600080fd5b506102b860405180604001604052806005815260200164181718971960d91b81525081565b60006001600160e01b03198216630a85bd0160e11b148061076457506001600160e01b03198216630271189760e51b145b80610773575061077382611697565b92915050565b7ff851d5f4fccb32d2a48561b7acc01b5d4d46b7e138d49f887026f203b08c5004546000906001600160a01b0316806107b06116cc565b6001600160a01b03160361089d576000806107cd85870187612d1f565b90925090506001600160a01b03831663b88d4fde3060008051602061337e833981519152546040516001600160a01b03909116908b9061081890889030906000908a90602001612d65565b6040516020818303038152906040526040518563ffffffff1660e01b81526004016108469493929190612da5565b600060405180830381600087803b15801561086057600080fd5b505af1158015610874573d6000803e3d6000fd5b5050505061088a610884836116db565b89611760565b50630a85bd0160e11b92506108b6915050565b6040516344e7d94960e01b815260040160405180910390fd5b95945050505050565b606060005a90506108d1858585610ff0565b6108ee57604051638baa579f60e01b815260040160405180910390fd5b6109806108fe6020870187612784565b3060408801358461091260608b018b612dd8565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b90819084018382808284376000920191909152506117eb92505050565b9150505b9392505050565b600082815260fb60205260409020600101546109a6816118cc565b6109b083836118dd565b505050565b6109bd611964565b6109c6816119dd565b50565b6109d16116cc565b6001600160a01b0316816001600160a01b031614610a4e5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b610a5882826119f5565b5050565b80610a656116cc565b6001600160a01b0316610a7782611a7a565b6001600160a01b031614610ab95780610a8e6116cc565b604051637ea58b1160e01b815260048101929092526001600160a01b03166024820152604401610a45565b610ac282611b90565b604080517f0a8885dd093a12d378a27df09bde33e3caca641a3d6970e06805fde8e847cb466020820152908101839052600090610b16906060015b6040516020818303038152906040528051906020012090565b80546001600160a01b0319166001600160a01b0392909216919091179055600060008051602061337e83398151915254604051637921219560e11b81523060048201526001600160a01b038681166024830152604482018690526001606483015260a06084830152600060a48301529091169150819063f242432a9060c401600060405180830381600087803b158015610baf57600080fd5b505af1158015610bc3573d6000803e3d6000fd5b5050505050505050565b610bd5611964565b60005b8151811015610a5857610c03828281518110610bf657610bf6612e1e565b60200260200101516119dd565b80610c0d81612e4a565b915050610bd8565b610c206105db6116cc565b610c3c5760405162461bcd60e51b8152600401610a4590612e63565b6001600160a01b038116610c925760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610a45565b610c9b81611bca565b610ca3610f2a565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610a58573d6000803e3d6000fd5b600061077382611a7a565b610ceb611964565b7ff851d5f4fccb32d2a48561b7acc01b5d4d46b7e138d49f887026f203b08c500480546001600160a01b0319166001600160a01b0392909216919091179055565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a838156020820152908101829052600090610d6b90606001610afd565b5492915050565b610d7a611964565b610d846000611be2565b565b610d8e611964565b60005b8151811015610a5857610dbc828281518110610daf57610daf612e1e565b6020026020010151611bca565b80610dc681612e4a565b915050610d91565b610dd96105db6116cc565b610df55760405162461bcd60e51b8152600401610a4590612e63565b6001600160a01b038116610c9b5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610a45565b60008051602061333e833981519152546040516383e7f6ff60e01b81526000916001600160a01b031690829082906383e7f6ff90610e9190899089908990600401612ec1565b6040805180830381865afa158015610ead573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ed19190612ee5565b60208101518151919250610ee491612f33565b9695505050505050565b600091825260fb602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610f21611964565b6109c681611bca565b610d8460008051602061335e8339815191526103606116cc565b60008051602061333e833981519152546000906001600160a01b0316806365a69dcf8d85610f725730610f74565b8d5b8d8d8d8d8d8d8d6040518a63ffffffff1660e01b8152600401610f9f99989796959493929190612fd7565b602060405180830381865afa158015610fbc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fe09190613047565b9c9b505050505050505050505050565b600061103b610ffe85613060565b3085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611c3492505050565b949350505050565b600061077360008051602061335e83398151915283610eee565b6110686105db6116cc565b6110845760405162461bcd60e51b8152600401610a4590612e63565b6002603354036110d65760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610a45565b600260335560008051602061333e833981519152546040516383e7f6ff60e01b81526001600160a01b039091169060009082906383e7f6ff9061112190889088908890600401612ec1565b6040805180830381865afa15801561113d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111619190612ee5565b6020810151815191925061117491612f33565b4710156111945760405163050205f960e01b815260040160405180910390fd5b816001600160a01b031663acf1a841826020015183600001516111b79190612f33565b8787876040518563ffffffff1660e01b81526004016111d893929190612ec1565b6000604051808303818588803b1580156111f157600080fd5b505af1158015611205573d6000803e3d6000fd5b505060016033555050505050505050565b600060008051602061337e833981519152546001600160a01b03166112396116cc565b6001600160a01b031614611260576040516344e7d94960e01b815260040160405180910390fd5b60005b8681101561129f5761128d88888381811061128057611280612e1e565b905060200201358a611760565b8061129781612e4a565b915050611263565b5063bc197c8160e01b9998505050505050505050565b600054610100900460ff16158080156112d55750600054600160ff909116105b806112ef5750303b1580156112ef575060005460ff166001145b6113525760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610a45565b6000805460ff191660011790558015611375576000805461ff0019166101001790555b60008051602061333e83398151915280546001600160a01b038087166001600160a01b03199283161790925560008051602061337e83398151915280548684169083161790557ff851d5f4fccb32d2a48561b7acc01b5d4d46b7e138d49f887026f203b08c50048054928516929091169190911790556113f3611d73565b6113fb611da1565b611403611da1565b61140b611dc8565b611413611dff565b8015611459576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050565b61146a6105db6116cc565b6114865760405162461bcd60e51b8152600401610a4590612e63565b6002603354036114d85760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610a45565b600260338190555060006115218c8c8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506116db92505050565b905061152c81611b90565b61154a8c8c8461153c573061153e565b8c5b8c8c8c8c8c8c8c611e38565b8161155957611559818b611760565b5050600160335550505050505050505050565b600082815260fb6020526040902060010154611587816118cc565b6109b083836119f5565b600060008051602061333e83398151915254604051631e29f97960e31b8152600481018490526001600160a01b039091169150819063f14fcbc890602401600060405180830381600087803b1580156115e957600080fd5b505af11580156115fd573d6000803e3d6000fd5b505050505050565b600060008051602061337e833981519152546001600160a01b03166116286116cc565b6001600160a01b03161461164f576040516344e7d94960e01b815260040160405180910390fd5b6001600160a01b03861615611668576116688587611760565b5063f23a6e6160e01b9695505050505050565b611683611964565b61168c81611f83565b6109c6600082611ff9565b60006001600160e01b03198216637965db0b60e01b148061077357506301ffc9a760e01b6001600160e01b0319831614610773565b60006116d6612003565b905090565b60007f93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae60001b8260405160200161171291906130fe565b60405160208183030381529060405280519060200120604051602001611742929190918252602082015260400190565b60408051601f19818403018152919052805160209091012092915050565b604080517f0a8885dd093a12d378a27df09bde33e3caca641a3d6970e06805fde8e847cb466020820152908101839052819061179e90606001610afd565b80546001600160a01b0319166001600160a01b039283161790556040519082169083907f45aa97e368889fb3527c1db60c59c2ae91e82f21778613449e46d4208c1c4b1290600090a35050565b60606117f685612021565b600080876001600160a01b0316866118108b8a8989612087565b60405161181d91906130fe565b60006040518083038160008787f1925050503d806000811461185b576040519150601f19603f3d011682016040523d82523d6000602084013e611860565b606091505b509092509050611871603f8761311a565b5a1161187f5761187f61313c565b6118bf82826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c45440000000000008152506120b7565b9998505050505050505050565b6109c6816118d86116cc565b6120f0565b6118e78282610eee565b610a5857600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff191660011790556119206116cc565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b61196c6116cc565b6001600160a01b03166119876097546001600160a01b031690565b6001600160a01b031614610d845760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610a45565b6109c660008051602061335e8339815191528261156c565b6119ff8282610eee565b15610a5857600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff19169055611a366116cc565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b604080517f0a8885dd093a12d378a27df09bde33e3caca641a3d6970e06805fde8e847cb466020820152908101829052600090611ab990606001610afd565b546001600160a01b0316905080611ae65760405163124bad6360e31b815260048101839052602401610a45565b3060008051602061337e833981519152546040516331a9108f60e11b8152600481018590526001600160a01b0390911690636352211e90602401602060405180830381865afa158015611b3d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b619190613152565b6001600160a01b031614611b8b576040516303b673fd60e21b815260048101839052602401610a45565b919050565b303303611bc157611b9f612154565b81146109c657604051635637b6af60e11b815260048101829052602401610a45565b6109c681612021565b6109c660008051602061335e83398151915282611ff9565b609780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f90602401602060405180830381865afa158015611c7b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c9f9190613047565b90506000611d4d866060015180519060200120868860200151604051602001611ced9392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b9050818660200151148015610ee457508551610ee4906001600160a01b03168286612167565b600054610100900460ff16611d9a5760405162461bcd60e51b8152600401610a459061316f565b6001603355565b600054610100900460ff16610d845760405162461bcd60e51b8152600401610a459061316f565b600054610100900460ff16611def5760405162461bcd60e51b8152600401610a459061316f565b610d84611dfa6116cc565b611be2565b600054610100900460ff16611e265760405162461bcd60e51b8152600401610a459061316f565b610d846000611e336116cc565b611ff9565b60008051602061333e833981519152546040516383e7f6ff60e01b81526001600160a01b039091169060009082906383e7f6ff90611e7e908f908f908e90600401612ec1565b6040805180830381865afa158015611e9a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ebe9190612ee5565b60208101518151919250611ed191612f33565b471015611ef15760405163050205f960e01b815260040160405180910390fd5b816001600160a01b03166374694a2b82602001518360000151611f149190612f33565b8e8e8e8e8e8e8e8e8e8e6040518c63ffffffff1660e01b8152600401611f439a999897969594939291906131ba565b6000604051808303818588803b158015611f5c57600080fd5b505af1158015611f70573d6000803e3d6000fd5b5050505050505050505050505050505050565b611f8b611964565b6001600160a01b038116611ff05760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610a45565b6109c681611be2565b610a5882826118dd565b6000303303612019575060331936013560601c90565b503390565b90565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a8381560208201529081018290526000906060016040516020818303038152906040528051906020012090506120768190565b54612082906001612f33565b905550565b606082858560405160200161209e9392919061322c565b6040516020818303038152906040529050949350505050565b606083156120c6575081610984565b8251156120d65782518084602001fd5b8160405162461bcd60e51b8152600401610a459190612728565b6120fa8282610eee565b610a5857612112816001600160a01b031660146122a9565b61211d8360206122a9565b60405160200161212e92919061326b565b60408051601f198184030181529082905262461bcd60e51b8252610a4591600401612728565b600030330361201e5750601f1936013590565b60008060006121768585612444565b9092509050600081600481111561218f5761218f6132e0565b1480156121ad5750856001600160a01b0316826001600160a01b0316145b156121bd57600192505050610984565b600080876001600160a01b0316631626ba7e60e01b88886040516024016121e59291906132f6565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252905161222391906130fe565b600060405180830381855afa9150503d806000811461225e576040519150601f19603f3d011682016040523d82523d6000602084013e612263565b606091505b5091509150818015612276575080516020145b801561229d57508051630b135d3f60e11b9061229b9083016020908101908401613047565b145b98975050505050505050565b606060006122b883600261330f565b6122c3906002612f33565b6001600160401b038111156122da576122da6127cd565b6040519080825280601f01601f191660200182016040528015612304576020820181803683370190505b509050600360fc1b8160008151811061231f5761231f612e1e565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061234e5761234e612e1e565b60200101906001600160f81b031916908160001a905350600061237284600261330f565b61237d906001612f33565b90505b60018111156123f5576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106123b1576123b1612e1e565b1a60f81b8282815181106123c7576123c7612e1e565b60200101906001600160f81b031916908160001a90535060049490941c936123ee81613326565b9050612380565b5083156109845760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610a45565b600080825160410361247a5760208301516040840151606085015160001a61246e87828585612489565b94509450505050612482565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156124c0575060009050600361256d565b8460ff16601b141580156124d857508460ff16601c14155b156124e9575060009050600461256d565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa15801561253d573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166125665760006001925092505061256d565b9150600090505b94509492505050565b60006020828403121561258857600080fd5b81356001600160e01b03198116811461098457600080fd5b6001600160a01b03811681146109c657600080fd5b60008083601f8401126125c757600080fd5b5081356001600160401b038111156125de57600080fd5b60208301915083602082850101111561248257600080fd5b60008060008060006080868803121561260e57600080fd5b8535612619816125a0565b94506020860135612629816125a0565b93506040860135925060608601356001600160401b0381111561264b57600080fd5b612657888289016125b5565b969995985093965092949392505050565b60008060006040848603121561267d57600080fd5b83356001600160401b038082111561269457600080fd5b90850190608082880312156126a857600080fd5b909350602085013590808211156126be57600080fd5b506126cb868287016125b5565b9497909650939450505050565b60005b838110156126f35781810151838201526020016126db565b50506000910152565b600081518084526127148160208601602086016126d8565b601f01601f19169290920160200192915050565b60208152600061098460208301846126fc565b60006020828403121561274d57600080fd5b5035919050565b6000806040838503121561276757600080fd5b823591506020830135612779816125a0565b809150509250929050565b60006020828403121561279657600080fd5b8135610984816125a0565b600080604083850312156127b457600080fd5b82356127bf816125a0565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b038111828210171561280b5761280b6127cd565b604052919050565b6000602080838503121561282657600080fd5b82356001600160401b038082111561283d57600080fd5b818501915085601f83011261285157600080fd5b813581811115612863576128636127cd565b8060051b91506128748483016127e3565b818152918301840191848101908884111561288e57600080fd5b938501935b8385101561229d57843592506128a8836125a0565b8282529385019390850190612893565b6000806000604084860312156128cd57600080fd5b83356001600160401b038111156128e357600080fd5b6128ef868287016125b5565b909790965060209590950135949350505050565b60006001600160401b0383111561291c5761291c6127cd565b61292f601f8401601f19166020016127e3565b905082815283838301111561294357600080fd5b828260208301376000602084830101529392505050565b600082601f83011261296b57600080fd5b61098483833560208501612903565b60008083601f84011261298c57600080fd5b5081356001600160401b038111156129a357600080fd5b6020830191508360208260051b850101111561248257600080fd5b80358015158114611b8b57600080fd5b803561ffff81168114611b8b57600080fd5b6000806000806000806000806000806101208b8d031215612a0057600080fd5b8a356001600160401b0380821115612a1757600080fd5b612a238e838f0161295a565b9b5060208d01359150612a35826125a0565b90995060408c0135985060608c0135975060808c013590612a55826125a0565b90965060a08c01359080821115612a6b57600080fd5b50612a788d828e0161297a565b9096509450612a8b905060c08c016129be565b9250612a9960e08c016129ce565b9150612aa86101008c016129be565b90509295989b9194979a5092959850565b60008060008060008060008060a0898b031215612ad557600080fd5b8835612ae0816125a0565b97506020890135612af0816125a0565b965060408901356001600160401b0380821115612b0c57600080fd5b612b188c838d0161297a565b909850965060608b0135915080821115612b3157600080fd5b612b3d8c838d0161297a565b909650945060808b0135915080821115612b5657600080fd5b50612b638b828c016125b5565b999c989b5096995094979396929594505050565b600080600060608486031215612b8c57600080fd5b8335612b97816125a0565b92506020840135612ba7816125a0565b91506040840135612bb7816125a0565b809150509250925092565b60008060008060008060008060008060006101208c8e031215612be457600080fd5b6001600160401b03808d351115612bfa57600080fd5b612c078e8e358f016125b5565b909c509a50612c1960208e01356125a0565b60208d0135995060408d0135985060608d01359750612c3b60808e01356125a0565b60808d013596508060a08e01351115612c5357600080fd5b50612c648d60a08e01358e0161297a565b9095509350612c7560c08d016129be565b9250612c8360e08d016129ce565b9150612c926101008d016129be565b90509295989b509295989b9093969950565b60008060008060008060a08789031215612cbd57600080fd5b8635612cc8816125a0565b95506020870135612cd8816125a0565b9450604087013593506060870135925060808701356001600160401b03811115612d0157600080fd5b612d0d89828a016125b5565b979a9699509497509295939492505050565b60008060408385031215612d3257600080fd5b82356001600160401b03811115612d4857600080fd5b612d548582860161295a565b9250506020830135612779816125a0565b608081526000612d7860808301876126fc565b6001600160a01b03958616602084015261ffff949094166040830152509216606090920191909152919050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090610ee4908301846126fc565b6000808335601e19843603018112612def57600080fd5b8301803591506001600160401b03821115612e0957600080fd5b60200191503681900382131561248257600080fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201612e5c57612e5c612e34565b5060010190565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b604081526000612ed5604083018587612e98565b9050826020830152949350505050565b600060408284031215612ef757600080fd5b604051604081018181106001600160401b0382111715612f1957612f196127cd565b604052825181526020928301519281019290925250919050565b8082018082111561077357610773612e34565b81835260006020808501808196508560051b810191508460005b87811015612fca5782840389528135601e19883603018112612f8157600080fd5b870185810190356001600160401b03811115612f9c57600080fd5b803603821315612fab57600080fd5b612fb6868284612e98565b9a87019a9550505090840190600101612f60565b5091979650505050505050565b6000610100808352612feb8184018d6126fc565b6001600160a01b038c81166020860152604085018c9052606085018b90528916608085015283810360a08501529050613025818789612f46565b94151560c0840152505061ffff9190911660e090910152979650505050505050565b60006020828403121561305957600080fd5b5051919050565b60006080823603121561307257600080fd5b604051608081016001600160401b038282108183111715613095576130956127cd565b81604052843591506130a6826125a0565b818352602085013560208401526040850135604084015260608501359150808211156130d157600080fd5b50830136601f8201126130e357600080fd5b6130f236823560208401612903565b60608301525092915050565b600082516131108184602087016126d8565b9190910192915050565b60008261313757634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052600160045260246000fd5b60006020828403121561316457600080fd5b8151610984816125a0565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60006101008083526131cf8184018d8f612e98565b6001600160a01b038c81166020860152604085018c9052606085018b90528916608085015283810360a08501529050613209818789612f46565b94151560c0840152505061ffff9190911660e09091015298975050505050505050565b6000845161323e8184602089016126d8565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516132a38160178501602088016126d8565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516132d48160288401602088016126d8565b01602801949350505050565b634e487b7160e01b600052602160045260246000fd5b82815260406020820152600061103b60408301846126fc565b808202811582820484141761077357610773612e34565b60008161333557613335612e34565b50600019019056fe412386de53449251cbf7ce1f4c6a038bf9c0746e62d331b08ef0c3fa7d0ab6729f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a660793a5062d506d35cc8f1beda67ee5028c16bfcd9c923d5bfc439c04bd929b1a164736f6c6343000811000a";
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
exports.ENSCustody__factory = ENSCustody__factory;
ENSCustody__factory.bytecode = _bytecode;
ENSCustody__factory.abi = _abi;
