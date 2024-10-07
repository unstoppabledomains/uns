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
                components: [
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
                internalType: "struct ENSCustody.ExecuteData[]",
                name: "data",
                type: "tuple[]",
            },
        ],
        name: "multicallExecute",
        outputs: [
            {
                internalType: "bytes[]",
                name: "results",
                type: "bytes[]",
            },
        ],
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
        name: "parkingTransfer",
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
const _bytecode = "0x60806040523480156200001157600080fd5b506200001c62000022565b620000e4565b600054610100900460ff16156200008f5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff9081161015620000e2576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b61381080620000f46000396000f3fe6080604052600436106102345760003560e01c806383e7f6ff1161012e578063acf1a841116100ab578063d547741f1161006f578063d547741f146106e5578063f14fcbc814610705578063f23a6e6114610725578063f2fde38b14610745578063ffa1ad741461076557600080fd5b8063acf1a84114610643578063bc197c8114610663578063c0c53b8b14610683578063cf015853146106a3578063d5391393146106c357600080fd5b8063a0e3aef1116100f2578063a0e3aef114610597578063a217fddf146105b7578063a3f4df7e146105cc578063a424740014610603578063aa271e1a1461062357600080fd5b806383e7f6ff146105045780638da5cb5b1461052457806391d1485414610542578063983b2d5614610562578063986502751461058257600080fd5b8063572b6c05116101bc5780636ccbae5f116101805780636ccbae5f1461046f578063715018a61461048f57806371e2a657146104a457806380fab2bd146104c457806381c81d35146104f157600080fd5b8063572b6c05146103bb5780635fc1964f146103e4578063634486da146104045780636352211e146104175780636a8be89e1461044f57600080fd5b80632f2ff15d116102035780632f2ff15d146103195780633092afd51461033b57806336568abe1461035b5780633ac05a5d1461037b578063423f6cef1461039b57600080fd5b806301ffc9a714610240578063150b7a02146102755780631bf7e13e146102ae578063248a9ca3146102db57600080fd5b3661023b57005b600080fd5b34801561024c57600080fd5b5061026061025b3660046128c8565b610796565b60405190151581526020015b60405180910390f35b34801561028157600080fd5b50610295610290366004612948565b6107dc565b6040516001600160e01b0319909116815260200161026c565b3480156102ba57600080fd5b506102ce6102c93660046129ba565b61092e565b60405161026c9190612a7a565b3480156102e757600080fd5b5061030b6102f6366004612a8d565b600090815260fb602052604090206001015490565b60405190815260200161026c565b34801561032557600080fd5b50610339610334366004612aa6565b6109fa565b005b34801561034757600080fd5b50610339610356366004612ad6565b610a24565b34801561036757600080fd5b50610339610376366004612aa6565b610a38565b34801561038757600080fd5b50610339610396366004612af3565b610acb565b3480156103a757600080fd5b506103396103b6366004612af3565b610b3b565b3480156103c757600080fd5b506102606103d6366004612ad6565b6001600160a01b0316301490565b3480156103f057600080fd5b506103396103ff366004612b65565b610c81565b610339610412366004612ad6565b610cc9565b34801561042357600080fd5b50610437610432366004612a8d565b610d8c565b6040516001600160a01b03909116815260200161026c565b34801561045b57600080fd5b5061033961046a366004612ad6565b610d97565b34801561047b57600080fd5b5061030b61048a366004612a8d565b610de0565b34801561049b57600080fd5b50610339610e26565b3480156104b057600080fd5b506103396104bf366004612b65565b610e3a565b3480156104d057600080fd5b506104e46104df366004612c4e565b610e82565b60405161026c9190612c8f565b6103396104ff366004612ad6565b6110b0565b34801561051057600080fd5b5061030b61051f366004612cf1565b61112d565b34801561053057600080fd5b506097546001600160a01b0316610437565b34801561054e57600080fd5b5061026061055d366004612aa6565b6111d0565b34801561056e57600080fd5b5061033961057d366004612ad6565b6111fb565b34801561058e57600080fd5b5061033961120c565b3480156105a357600080fd5b5061030b6105b2366004612dd5565b611226565b3480156105c357600080fd5b5061030b600081565b3480156105d857600080fd5b506102ce6040518060400160405280600b81526020016a454e5320437573746f647960a81b81525081565b34801561060f57600080fd5b5061026061061e3660046129ba565b6112d2565b34801561062f57600080fd5b5061026061063e366004612ad6565b611325565b34801561064f57600080fd5b5061033961065e366004612cf1565b61133f565b34801561066f57600080fd5b5061029561067e366004612eae565b6114f8565b34801561068f57600080fd5b5061033961069e366004612f6c565b6115b1565b3480156106af57600080fd5b506103396106be366004612fb7565b61175b565b3480156106cf57600080fd5b5061030b6000805160206137c483398151915281565b3480156106f157600080fd5b50610339610700366004612aa6565b611868565b34801561071157600080fd5b50610339610720366004612a8d565b61188d565b34801561073157600080fd5b50610295610740366004613099565b611901565b34801561075157600080fd5b50610339610760366004612ad6565b611992565b34801561077157600080fd5b506102ce60405180604001604052806005815260200164302e312e3360d81b81525081565b60006001600160e01b03198216630a85bd0160e11b14806107c757506001600160e01b03198216630271189760e51b145b806107d657506107d6826119ae565b92915050565b7ff851d5f4fccb32d2a48561b7acc01b5d4d46b7e138d49f887026f203b08c5004546000906001600160a01b0316806108136119e3565b6001600160a01b03160361090c576000808061083186880188613114565b925092509250610840836119f2565b6001600160a01b03841663b88d4fde306000805160206137e4833981519152546040516001600160a01b03909116908c9061088690879030906000908b90602001613175565b6040516020818303038152906040526040518563ffffffff1660e01b81526004016108b494939291906131b5565b600060405180830381600087803b1580156108ce57600080fd5b505af11580156108e2573d6000803e3d6000fd5b505050506108f86108f282611a24565b84611aa9565b50630a85bd0160e11b935061092592505050565b6040516344e7d94960e01b815260040160405180910390fd5b95945050505050565b606060005a90506109408585856112d2565b61095d57604051638baa579f60e01b815260040160405180910390fd5b6109ef61096d6020870187612ad6565b3060408801358461098160608b018b6131e8565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b9081908401838280828437600092019190915250611b3492505050565b9150505b9392505050565b600082815260fb6020526040902060010154610a1581611c15565b610a1f8383611c26565b505050565b610a2c611cad565b610a3581611d26565b50565b610a406119e3565b6001600160a01b0316816001600160a01b031614610abd5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b610ac78282611d3e565b5050565b80610ad46119e3565b6001600160a01b0316610ae682611dc3565b6001600160a01b031614610b285780610afd6119e3565b604051637ea58b1160e01b815260048101929092526001600160a01b03166024820152604401610ab4565b610b3182611ed9565b610a1f8284611aa9565b80610b446119e3565b6001600160a01b0316610b5682611dc3565b6001600160a01b031614610b6d5780610afd6119e3565b610b7682611ed9565b604080517f0a8885dd093a12d378a27df09bde33e3caca641a3d6970e06805fde8e847cb466020820152908101839052600090610bca906060015b6040516020818303038152906040528051906020012090565b80546001600160a01b0319166001600160a01b039290921691909117905560006000805160206137e483398151915254604051637921219560e11b81523060048201526001600160a01b038681166024830152604482018690526001606483015260a06084830152600060a48301529091169150819063f242432a9060c401600060405180830381600087803b158015610c6357600080fd5b505af1158015610c77573d6000803e3d6000fd5b5050505050505050565b610c89611cad565b60005b8151811015610ac757610cb7828281518110610caa57610caa61322e565b6020026020010151611d26565b80610cc18161325a565b915050610c8c565b610cd461063e6119e3565b610cf05760405162461bcd60e51b8152600401610ab490613273565b6001600160a01b038116610d465760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610ab4565b610d4f81611ef2565b610d5761120c565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610ac7573d6000803e3d6000fd5b60006107d682611dc3565b610d9f611cad565b7ff851d5f4fccb32d2a48561b7acc01b5d4d46b7e138d49f887026f203b08c500480546001600160a01b0319166001600160a01b0392909216919091179055565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a838156020820152908101829052600090610e1f90606001610bb1565b5492915050565b610e2e611cad565b610e386000611f0a565b565b610e42611cad565b60005b8151811015610ac757610e70828281518110610e6357610e6361322e565b6020026020010151611ef2565b80610e7a8161325a565b915050610e45565b6060303303610edd5760405162461bcd60e51b815260206004820152602160248201527f6d657461207472616e73616374696f6e7320617265206e6f7420616c6c6f77656044820152601960fa1b6064820152608401610ab4565b60005b82811015610fbc5736848483818110610efb57610efb61322e565b9050602002810190610f0d91906132a8565b90506000610f1b82806132c8565b610f299060608101906131e8565b610f38916004916000916132de565b810190610f4591906128c8565b90506001600160e01b03198116633ac05a5d60e01b14610fa75760405162461bcd60e51b815260206004820152601f60248201527f6f6e6c79207061726b696e675472616e7366657220697320616c6c6f776564006044820152606401610ab4565b50508080610fb49061325a565b915050610ee0565b50816001600160401b03811115610fd557610fd5612b1f565b60405190808252806020026020018201604052801561100857816020015b6060815260200190600190039081610ff35790505b50905060005b828110156110a95761107984848381811061102b5761102b61322e565b905060200281019061103d91906132a8565b61104790806132c8565b8585848181106110595761105961322e565b905060200281019061106b91906132a8565b6102c99060208101906131e8565b82828151811061108b5761108b61322e565b602002602001018190525080806110a19061325a565b91505061100e565b5092915050565b6110bb61063e6119e3565b6110d75760405162461bcd60e51b8152600401610ab490613273565b6001600160a01b038116610d4f5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610ab4565b6000805160206137a4833981519152546040516383e7f6ff60e01b81526000916001600160a01b031690829082906383e7f6ff9061117390899089908990600401613331565b6040805180830381865afa15801561118f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111b39190613355565b602081015181519192506111c6916133a3565b9695505050505050565b600091825260fb602090815260408084206001600160a01b0393909316845291905290205460ff1690565b611203611cad565b610a3581611ef2565b610e386000805160206137c48339815191526103766119e3565b6000805160206137a4833981519152546000906001600160a01b0316806365a69dcf8d856112545730611256565b8d5b8d8d8d8d8d8d8d6040518a63ffffffff1660e01b815260040161128199989796959493929190613447565b602060405180830381865afa15801561129e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112c291906134b7565b9c9b505050505050505050505050565b600061131d6112e0856134d0565b3085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611f5c92505050565b949350505050565b60006107d66000805160206137c4833981519152836111d0565b61134a61063e6119e3565b6113665760405162461bcd60e51b8152600401610ab490613273565b6002603354036113b85760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610ab4565b60026033556000805160206137a4833981519152546040516383e7f6ff60e01b81526001600160a01b039091169060009082906383e7f6ff9061140390889088908890600401613331565b6040805180830381865afa15801561141f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114439190613355565b60208101518151919250611456916133a3565b4710156114765760405163050205f960e01b815260040160405180910390fd5b816001600160a01b031663acf1a8418260200151836000015161149991906133a3565b8787876040518563ffffffff1660e01b81526004016114ba93929190613331565b6000604051808303818588803b1580156114d357600080fd5b505af11580156114e7573d6000803e3d6000fd5b505060016033555050505050505050565b60006000805160206137e4833981519152546001600160a01b031661151b6119e3565b6001600160a01b031614611542576040516344e7d94960e01b815260040160405180910390fd5b600061155083850185612ad6565b905061155b816119f2565b60005b8781101561159a5761158889898381811061157b5761157b61322e565b9050602002013583611aa9565b806115928161325a565b91505061155e565b5063bc197c8160e01b9a9950505050505050505050565b600054610100900460ff16158080156115d15750600054600160ff909116105b806115eb5750303b1580156115eb575060005460ff166001145b61164e5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610ab4565b6000805460ff191660011790558015611671576000805461ff0019166101001790555b6000805160206137a483398151915280546001600160a01b038087166001600160a01b0319928316179092556000805160206137e483398151915280548684169083161790557ff851d5f4fccb32d2a48561b7acc01b5d4d46b7e138d49f887026f203b08c50048054928516929091169190911790556116ef61209b565b6116f76120c9565b6116ff6120c9565b6117076120f0565b61170f612127565b8015611755576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050565b61176661063e6119e3565b6117825760405162461bcd60e51b8152600401610ab490613273565b6002603354036117d45760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610ab4565b6002603381905550600061181d8c8c8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611a2492505050565b905061182881611ed9565b6118468c8c84611838573061183a565b8c5b8c8c8c8c8c8c8c612160565b8161185557611855818b611aa9565b5050600160335550505050505050505050565b600082815260fb602052604090206001015461188381611c15565b610a1f8383611d3e565b60006000805160206137a483398151915254604051631e29f97960e31b8152600481018490526001600160a01b039091169150819063f14fcbc890602401600060405180830381600087803b1580156118e557600080fd5b505af11580156118f9573d6000803e3d6000fd5b505050505050565b60006000805160206137e4833981519152546001600160a01b03166119246119e3565b6001600160a01b03161461194b576040516344e7d94960e01b815260040160405180910390fd5b6001600160a01b0386161561197f57600061196883850185612ad6565b9050611973816119f2565b61197d8682611aa9565b505b5063f23a6e6160e01b9695505050505050565b61199a611cad565b6119a3816122ab565b610a35600082612321565b60006001600160e01b03198216637965db0b60e01b14806107d657506301ffc9a760e01b6001600160e01b03198316146107d6565b60006119ed61232b565b905090565b6001600160a01b038116610a355760405163b20f76e360e01b81526001600160a01b0382166004820152602401610ab4565b60007f93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae60001b82604051602001611a5b919061356e565b60405160208183030381529060405280519060200120604051602001611a8b929190918252602082015260400190565b60408051601f19818403018152919052805160209091012092915050565b604080517f0a8885dd093a12d378a27df09bde33e3caca641a3d6970e06805fde8e847cb4660208201529081018390528190611ae790606001610bb1565b80546001600160a01b0319166001600160a01b039283161790556040519082169083907f45aa97e368889fb3527c1db60c59c2ae91e82f21778613449e46d4208c1c4b1290600090a35050565b6060611b3f85612349565b600080876001600160a01b031686611b598b8a89896123af565b604051611b66919061356e565b60006040518083038160008787f1925050503d8060008114611ba4576040519150601f19603f3d011682016040523d82523d6000602084013e611ba9565b606091505b509092509050611bba603f87613580565b5a11611bc857611bc86135a2565b611c0882826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c45440000000000008152506123df565b9998505050505050505050565b610a3581611c216119e3565b612418565b611c3082826111d0565b610ac757600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611c696119e3565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611cb56119e3565b6001600160a01b0316611cd06097546001600160a01b031690565b6001600160a01b031614610e385760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610ab4565b610a356000805160206137c483398151915282611868565b611d4882826111d0565b15610ac757600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff19169055611d7f6119e3565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b604080517f0a8885dd093a12d378a27df09bde33e3caca641a3d6970e06805fde8e847cb466020820152908101829052600090611e0290606001610bb1565b546001600160a01b0316905080611e2f5760405163124bad6360e31b815260048101839052602401610ab4565b306000805160206137e4833981519152546040516331a9108f60e11b8152600481018590526001600160a01b0390911690636352211e90602401602060405180830381865afa158015611e86573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611eaa91906135b8565b6001600160a01b031614611ed4576040516303b673fd60e21b815260048101839052602401610ab4565b919050565b303303611ee957610a358161247c565b610a3581612349565b610a356000805160206137c483398151915282612321565b609780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f90602401602060405180830381865afa158015611fa3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611fc791906134b7565b905060006120758660600151805190602001208688602001516040516020016120159392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b90508186602001511480156111c6575085516111c6906001600160a01b031682866124a6565b600054610100900460ff166120c25760405162461bcd60e51b8152600401610ab4906135d5565b6001603355565b600054610100900460ff16610e385760405162461bcd60e51b8152600401610ab4906135d5565b600054610100900460ff166121175760405162461bcd60e51b8152600401610ab4906135d5565b610e386121226119e3565b611f0a565b600054610100900460ff1661214e5760405162461bcd60e51b8152600401610ab4906135d5565b610e38600061215b6119e3565b612321565b6000805160206137a4833981519152546040516383e7f6ff60e01b81526001600160a01b039091169060009082906383e7f6ff906121a6908f908f908e90600401613331565b6040805180830381865afa1580156121c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121e69190613355565b602081015181519192506121f9916133a3565b4710156122195760405163050205f960e01b815260040160405180910390fd5b816001600160a01b03166374694a2b8260200151836000015161223c91906133a3565b8e8e8e8e8e8e8e8e8e8e6040518c63ffffffff1660e01b815260040161226b9a99989796959493929190613620565b6000604051808303818588803b15801561228457600080fd5b505af1158015612298573d6000803e3d6000fd5b5050505050505050505050505050505050565b6122b3611cad565b6001600160a01b0381166123185760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610ab4565b610a3581611f0a565b610ac78282611c26565b6000303303612341575060331936013560601c90565b503390565b90565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a83815602082015290810182905260009060600160405160208183030381529060405280519060200120905061239e8190565b546123aa9060016133a3565b905550565b60608285856040516020016123c693929190613692565b6040516020818303038152906040529050949350505050565b606083156123ee5750816109f3565b8251156123fe5782518084602001fd5b8160405162461bcd60e51b8152600401610ab49190612a7a565b61242282826111d0565b610ac75761243a816001600160a01b031660146125e8565b6124458360206125e8565b6040516020016124569291906136d1565b60408051601f198184030181529082905262461bcd60e51b8252610ab491600401612a7a565b612484612783565b8114610a3557604051635637b6af60e11b815260048101829052602401610ab4565b60008060006124b58585612796565b909250905060008160048111156124ce576124ce613746565b1480156124ec5750856001600160a01b0316826001600160a01b0316145b156124fc576001925050506109f3565b600080876001600160a01b0316631626ba7e60e01b888860405160240161252492919061375c565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051612562919061356e565b600060405180830381855afa9150503d806000811461259d576040519150601f19603f3d011682016040523d82523d6000602084013e6125a2565b606091505b50915091508180156125b5575080516020145b80156125dc57508051630b135d3f60e11b906125da90830160209081019084016134b7565b145b98975050505050505050565b606060006125f7836002613775565b6126029060026133a3565b6001600160401b0381111561261957612619612b1f565b6040519080825280601f01601f191660200182016040528015612643576020820181803683370190505b509050600360fc1b8160008151811061265e5761265e61322e565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061268d5761268d61322e565b60200101906001600160f81b031916908160001a90535060006126b1846002613775565b6126bc9060016133a3565b90505b6001811115612734576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106126f0576126f061322e565b1a60f81b8282815181106127065761270661322e565b60200101906001600160f81b031916908160001a90535060049490941c9361272d8161378c565b90506126bf565b5083156109f35760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610ab4565b60003033036123465750601f1936013590565b60008082516041036127cc5760208301516040840151606085015160001a6127c0878285856127db565b945094505050506127d4565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561281257506000905060036128bf565b8460ff16601b1415801561282a57508460ff16601c14155b1561283b57506000905060046128bf565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa15801561288f573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166128b8576000600192509250506128bf565b9150600090505b94509492505050565b6000602082840312156128da57600080fd5b81356001600160e01b0319811681146109f357600080fd5b6001600160a01b0381168114610a3557600080fd5b60008083601f84011261291957600080fd5b5081356001600160401b0381111561293057600080fd5b6020830191508360208285010111156127d457600080fd5b60008060008060006080868803121561296057600080fd5b853561296b816128f2565b9450602086013561297b816128f2565b93506040860135925060608601356001600160401b0381111561299d57600080fd5b6129a988828901612907565b969995985093965092949392505050565b6000806000604084860312156129cf57600080fd5b83356001600160401b03808211156129e657600080fd5b90850190608082880312156129fa57600080fd5b90935060208501359080821115612a1057600080fd5b50612a1d86828701612907565b9497909650939450505050565b60005b83811015612a45578181015183820152602001612a2d565b50506000910152565b60008151808452612a66816020860160208601612a2a565b601f01601f19169290920160200192915050565b6020815260006109f36020830184612a4e565b600060208284031215612a9f57600080fd5b5035919050565b60008060408385031215612ab957600080fd5b823591506020830135612acb816128f2565b809150509250929050565b600060208284031215612ae857600080fd5b81356109f3816128f2565b60008060408385031215612b0657600080fd5b8235612b11816128f2565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715612b5d57612b5d612b1f565b604052919050565b60006020808385031215612b7857600080fd5b82356001600160401b0380821115612b8f57600080fd5b818501915085601f830112612ba357600080fd5b813581811115612bb557612bb5612b1f565b8060051b9150612bc6848301612b35565b8181529183018401918481019088841115612be057600080fd5b938501935b838510156125dc5784359250612bfa836128f2565b8282529385019390850190612be5565b60008083601f840112612c1c57600080fd5b5081356001600160401b03811115612c3357600080fd5b6020830191508360208260051b85010111156127d457600080fd5b60008060208385031215612c6157600080fd5b82356001600160401b03811115612c7757600080fd5b612c8385828601612c0a565b90969095509350505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015612ce457603f19888603018452612cd2858351612a4e565b94509285019290850190600101612cb6565b5092979650505050505050565b600080600060408486031215612d0657600080fd5b83356001600160401b03811115612d1c57600080fd5b612d2886828701612907565b909790965060209590950135949350505050565b60006001600160401b03831115612d5557612d55612b1f565b612d68601f8401601f1916602001612b35565b9050828152838383011115612d7c57600080fd5b828260208301376000602084830101529392505050565b600082601f830112612da457600080fd5b6109f383833560208501612d3c565b80358015158114611ed457600080fd5b803561ffff81168114611ed457600080fd5b6000806000806000806000806000806101208b8d031215612df557600080fd5b8a356001600160401b0380821115612e0c57600080fd5b612e188e838f01612d93565b9b5060208d01359150612e2a826128f2565b90995060408c0135985060608c0135975060808c013590612e4a826128f2565b90965060a08c01359080821115612e6057600080fd5b50612e6d8d828e01612c0a565b9096509450612e80905060c08c01612db3565b9250612e8e60e08c01612dc3565b9150612e9d6101008c01612db3565b90509295989b9194979a5092959850565b60008060008060008060008060a0898b031215612eca57600080fd5b8835612ed5816128f2565b97506020890135612ee5816128f2565b965060408901356001600160401b0380821115612f0157600080fd5b612f0d8c838d01612c0a565b909850965060608b0135915080821115612f2657600080fd5b612f328c838d01612c0a565b909650945060808b0135915080821115612f4b57600080fd5b50612f588b828c01612907565b999c989b5096995094979396929594505050565b600080600060608486031215612f8157600080fd5b8335612f8c816128f2565b92506020840135612f9c816128f2565b91506040840135612fac816128f2565b809150509250925092565b60008060008060008060008060008060006101208c8e031215612fd957600080fd5b6001600160401b03808d351115612fef57600080fd5b612ffc8e8e358f01612907565b909c509a5061300e60208e01356128f2565b60208d0135995060408d0135985060608d0135975061303060808e01356128f2565b60808d013596508060a08e0135111561304857600080fd5b506130598d60a08e01358e01612c0a565b909550935061306a60c08d01612db3565b925061307860e08d01612dc3565b91506130876101008d01612db3565b90509295989b509295989b9093969950565b60008060008060008060a087890312156130b257600080fd5b86356130bd816128f2565b955060208701356130cd816128f2565b9450604087013593506060870135925060808701356001600160401b038111156130f657600080fd5b61310289828a01612907565b979a9699509497509295939492505050565b60008060006060848603121561312957600080fd5b8335613134816128f2565b92506020840135613144816128f2565b915060408401356001600160401b0381111561315f57600080fd5b61316b86828701612d93565b9150509250925092565b6080815260006131886080830187612a4e565b6001600160a01b03958616602084015261ffff949094166040830152509216606090920191909152919050565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906111c690830184612a4e565b6000808335601e198436030181126131ff57600080fd5b8301803591506001600160401b0382111561321957600080fd5b6020019150368190038213156127d457600080fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60006001820161326c5761326c613244565b5060010190565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b60008235603e198336030181126132be57600080fd5b9190910192915050565b60008235607e198336030181126132be57600080fd5b600080858511156132ee57600080fd5b838611156132fb57600080fd5b5050820193919092039150565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b604081526000613345604083018587613308565b9050826020830152949350505050565b60006040828403121561336757600080fd5b604051604081018181106001600160401b038211171561338957613389612b1f565b604052825181526020928301519281019290925250919050565b808201808211156107d6576107d6613244565b81835260006020808501808196508560051b810191508460005b8781101561343a5782840389528135601e198836030181126133f157600080fd5b870185810190356001600160401b0381111561340c57600080fd5b80360382131561341b57600080fd5b613426868284613308565b9a87019a95505050908401906001016133d0565b5091979650505050505050565b600061010080835261345b8184018d612a4e565b6001600160a01b038c81166020860152604085018c9052606085018b90528916608085015283810360a085015290506134958187896133b6565b94151560c0840152505061ffff9190911660e090910152979650505050505050565b6000602082840312156134c957600080fd5b5051919050565b6000608082360312156134e257600080fd5b604051608081016001600160401b03828210818311171561350557613505612b1f565b8160405284359150613516826128f2565b8183526020850135602084015260408501356040840152606085013591508082111561354157600080fd5b50830136601f82011261355357600080fd5b61356236823560208401612d3c565b60608301525092915050565b600082516132be818460208701612a2a565b60008261359d57634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052600160045260246000fd5b6000602082840312156135ca57600080fd5b81516109f3816128f2565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60006101008083526136358184018d8f613308565b6001600160a01b038c81166020860152604085018c9052606085018b90528916608085015283810360a0850152905061366f8187896133b6565b94151560c0840152505061ffff9190911660e09091015298975050505050505050565b600084516136a4818460208901612a2a565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351613709816017850160208801612a2a565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161373a816028840160208801612a2a565b01602801949350505050565b634e487b7160e01b600052602160045260246000fd5b82815260406020820152600061131d6040830184612a4e565b80820281158282048414176107d6576107d6613244565b60008161379b5761379b613244565b50600019019056fe412386de53449251cbf7ce1f4c6a038bf9c0746e62d331b08ef0c3fa7d0ab6729f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a660793a5062d506d35cc8f1beda67ee5028c16bfcd9c923d5bfc439c04bd929b1a164736f6c6343000811000a";
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
