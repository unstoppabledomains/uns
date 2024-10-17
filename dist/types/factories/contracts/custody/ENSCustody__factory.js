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
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "internalTransfer",
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
                internalType: "bytes[]",
                name: "data",
                type: "bytes[]",
            },
        ],
        name: "multicall",
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
const _bytecode = "0x60806040523480156200001157600080fd5b506200001c62000022565b620000e4565b600054610100900460ff16156200008f5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff9081161015620000e2576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b61383180620000f46000396000f3fe6080604052600436106102345760003560e01c80638da5cb5b1161012e578063acf1a841116100ab578063d547741f1161006f578063d547741f146106e5578063f14fcbc814610705578063f23a6e6114610725578063f2fde38b14610745578063ffa1ad741461076557600080fd5b8063acf1a84114610643578063bc197c8114610663578063c0c53b8b14610683578063cf015853146106a3578063d5391393146106c357600080fd5b8063a217fddf116100f2578063a217fddf1461058a578063a3f4df7e1461059f578063a4247400146105d6578063aa271e1a146105f6578063ac9650d81461061657600080fd5b80638da5cb5b146104f757806391d1485414610515578063983b2d56146105355780639865027514610555578063a0e3aef11461056a57600080fd5b8063572b6c05116101bc5780636ccbae5f116101805780636ccbae5f1461046f578063715018a61461048f57806371e2a657146104a457806381c81d35146104c457806383e7f6ff146104d757600080fd5b8063572b6c05146103bb5780635fc1964f146103e4578063634486da146104045780636352211e146104175780636a8be89e1461044f57600080fd5b80632f2ff15d116102035780632f2ff15d146103195780633092afd51461033b57806336568abe1461035b5780633e7ba1661461037b578063423f6cef1461039b57600080fd5b806301ffc9a714610240578063150b7a02146102755780631bf7e13e146102ae578063248a9ca3146102db57600080fd5b3661023b57005b600080fd5b34801561024c57600080fd5b5061026061025b3660046128a5565b610796565b60405190151581526020015b60405180910390f35b34801561028157600080fd5b50610295610290366004612925565b6107dc565b6040516001600160e01b0319909116815260200161026c565b3480156102ba57600080fd5b506102ce6102c9366004612997565b61092e565b60405161026c9190612a57565b3480156102e757600080fd5b5061030b6102f6366004612a6a565b600090815260fb602052604090206001015490565b60405190815260200161026c565b34801561032557600080fd5b50610339610334366004612a83565b6109fa565b005b34801561034757600080fd5b50610339610356366004612ab3565b610a24565b34801561036757600080fd5b50610339610376366004612a83565b610a38565b34801561038757600080fd5b50610339610396366004612ad0565b610acb565b3480156103a757600080fd5b506103396103b6366004612ad0565b610b3b565b3480156103c757600080fd5b506102606103d6366004612ab3565b6001600160a01b0316301490565b3480156103f057600080fd5b506103396103ff366004612b65565b610c81565b610339610412366004612ab3565b610cc9565b34801561042357600080fd5b50610437610432366004612a6a565b610d8c565b6040516001600160a01b03909116815260200161026c565b34801561045b57600080fd5b5061033961046a366004612ab3565b610d97565b34801561047b57600080fd5b5061030b61048a366004612a6a565b610de0565b34801561049b57600080fd5b50610339610e26565b3480156104b057600080fd5b506103396104bf366004612b65565b610e3a565b6103396104d2366004612ab3565b610e82565b3480156104e357600080fd5b5061030b6104f2366004612c03565b610eff565b34801561050357600080fd5b506097546001600160a01b0316610437565b34801561052157600080fd5b50610260610530366004612a83565b610fa2565b34801561054157600080fd5b50610339610550366004612ab3565b610fcd565b34801561056157600080fd5b50610339610fde565b34801561057657600080fd5b5061030b610585366004612d23565b610ff8565b34801561059657600080fd5b5061030b600081565b3480156105ab57600080fd5b506102ce6040518060400160405280600b81526020016a454e5320437573746f647960a81b81525081565b3480156105e257600080fd5b506102606105f1366004612997565b6110a4565b34801561060257600080fd5b50610260610611366004612ab3565b6110f7565b34801561062257600080fd5b50610636610631366004612dfc565b611111565b60405161026c9190612e3d565b34801561064f57600080fd5b5061033961065e366004612c03565b6111ed565b34801561066f57600080fd5b5061029561067e366004612e9f565b6113a6565b34801561068f57600080fd5b5061033961069e366004612f5d565b61145f565b3480156106af57600080fd5b506103396106be366004612fa8565b611609565b3480156106cf57600080fd5b5061030b6000805160206137e583398151915281565b3480156106f157600080fd5b50610339610700366004612a83565b611716565b34801561071157600080fd5b50610339610720366004612a6a565b61173b565b34801561073157600080fd5b5061029561074036600461308a565b6117af565b34801561075157600080fd5b50610339610760366004612ab3565b611840565b34801561077157600080fd5b506102ce604051806040016040528060058152602001640c0b8c4b8d60da1b81525081565b60006001600160e01b03198216630a85bd0160e11b14806107c757506001600160e01b03198216630271189760e51b145b806107d657506107d68261185c565b92915050565b7ff851d5f4fccb32d2a48561b7acc01b5d4d46b7e138d49f887026f203b08c5004546000906001600160a01b031680610813611891565b6001600160a01b03160361090c576000808061083186880188613105565b925092509250610840836118a0565b6001600160a01b03841663b88d4fde30600080516020613805833981519152546040516001600160a01b03909116908c9061088690879030906000908b90602001613166565b6040516020818303038152906040526040518563ffffffff1660e01b81526004016108b494939291906131a6565b600060405180830381600087803b1580156108ce57600080fd5b505af11580156108e2573d6000803e3d6000fd5b505050506108f86108f2826118d2565b84611957565b50630a85bd0160e11b935061092592505050565b6040516344e7d94960e01b815260040160405180910390fd5b95945050505050565b606060005a90506109408585856110a4565b61095d57604051638baa579f60e01b815260040160405180910390fd5b6109ef61096d6020870187612ab3565b3060408801358461098160608b018b6131d9565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b90819084018382808284376000920191909152506119e292505050565b9150505b9392505050565b600082815260fb6020526040902060010154610a1581611ac3565b610a1f8383611ad4565b505050565b610a2c611b5b565b610a3581611bd4565b50565b610a40611891565b6001600160a01b0316816001600160a01b031614610abd5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b610ac78282611bec565b5050565b80610ad4611891565b6001600160a01b0316610ae682611c71565b6001600160a01b031614610b285780610afd611891565b604051637ea58b1160e01b815260048101929092526001600160a01b03166024820152604401610ab4565b610b3182611d87565b610a1f8284611957565b80610b44611891565b6001600160a01b0316610b5682611c71565b6001600160a01b031614610b6d5780610afd611891565b610b7682611d87565b604080517f0a8885dd093a12d378a27df09bde33e3caca641a3d6970e06805fde8e847cb466020820152908101839052600090610bca906060015b6040516020818303038152906040528051906020012090565b80546001600160a01b0319166001600160a01b0392909216919091179055600060008051602061380583398151915254604051637921219560e11b81523060048201526001600160a01b038681166024830152604482018690526001606483015260a06084830152600060a48301529091169150819063f242432a9060c401600060405180830381600087803b158015610c6357600080fd5b505af1158015610c77573d6000803e3d6000fd5b5050505050505050565b610c89611b5b565b60005b8151811015610ac757610cb7828281518110610caa57610caa61321f565b6020026020010151611bd4565b80610cc18161324b565b915050610c8c565b610cd4610611611891565b610cf05760405162461bcd60e51b8152600401610ab490613264565b6001600160a01b038116610d465760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610ab4565b610d4f81611da0565b610d57610fde565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610ac7573d6000803e3d6000fd5b60006107d682611c71565b610d9f611b5b565b7ff851d5f4fccb32d2a48561b7acc01b5d4d46b7e138d49f887026f203b08c500480546001600160a01b0319166001600160a01b0392909216919091179055565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a838156020820152908101829052600090610e1f90606001610bb1565b5492915050565b610e2e611b5b565b610e386000611db8565b565b610e42611b5b565b60005b8151811015610ac757610e70828281518110610e6357610e6361321f565b6020026020010151611da0565b80610e7a8161324b565b915050610e45565b610e8d610611611891565b610ea95760405162461bcd60e51b8152600401610ab490613264565b6001600160a01b038116610d4f5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610ab4565b60008051602061379e833981519152546040516383e7f6ff60e01b81526000916001600160a01b031690829082906383e7f6ff90610f45908990899089906004016132c2565b6040805180830381865afa158015610f61573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f8591906132e6565b60208101518151919250610f9891613334565b9695505050505050565b600091825260fb602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610fd5611b5b565b610a3581611da0565b610e386000805160206137e5833981519152610376611891565b60008051602061379e833981519152546000906001600160a01b0316806365a69dcf8d856110265730611028565b8d5b8d8d8d8d8d8d8d6040518a63ffffffff1660e01b8152600401611053999897969594939291906133d8565b602060405180830381865afa158015611070573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110949190613448565b9c9b505050505050505050505050565b60006110ef6110b285613461565b3085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611e0a92505050565b949350505050565b60006107d66000805160206137e583398151915283610fa2565b6060600061111f83856134eb565b90503033036111e45760005b838110156111e2576111b261113e611891565b611146611f49565b8787858181106111585761115861321f565b905060200281019061116a91906131d9565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525060408051602081019091529081529250611f5d915050565b8282815181106111c4576111c461321f565b602002602001018190525080806111da9061324b565b91505061112b565b505b6110ef81611f8d565b6111f8610611611891565b6112145760405162461bcd60e51b8152600401610ab490613264565b6002603354036112665760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610ab4565b600260335560008051602061379e833981519152546040516383e7f6ff60e01b81526001600160a01b039091169060009082906383e7f6ff906112b1908890889088906004016132c2565b6040805180830381865afa1580156112cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112f191906132e6565b6020810151815191925061130491613334565b4710156113245760405163050205f960e01b815260040160405180910390fd5b816001600160a01b031663acf1a841826020015183600001516113479190613334565b8787876040518563ffffffff1660e01b8152600401611368939291906132c2565b6000604051808303818588803b15801561138157600080fd5b505af1158015611395573d6000803e3d6000fd5b505060016033555050505050505050565b6000600080516020613805833981519152546001600160a01b03166113c9611891565b6001600160a01b0316146113f0576040516344e7d94960e01b815260040160405180910390fd5b60006113fe83850185612ab3565b9050611409816118a0565b60005b87811015611448576114368989838181106114295761142961321f565b9050602002013583611957565b806114408161324b565b91505061140c565b5063bc197c8160e01b9a9950505050505050505050565b600054610100900460ff161580801561147f5750600054600160ff909116105b806114995750303b158015611499575060005460ff166001145b6114fc5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610ab4565b6000805460ff19166001179055801561151f576000805461ff0019166101001790555b60008051602061379e83398151915280546001600160a01b038087166001600160a01b03199283161790925560008051602061380583398151915280548684169083161790557ff851d5f4fccb32d2a48561b7acc01b5d4d46b7e138d49f887026f203b08c500480549285169290911691909117905561159d6120be565b6115a56120ec565b6115ad6120ec565b6115b5612113565b6115bd61214a565b8015611603576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050565b611614610611611891565b6116305760405162461bcd60e51b8152600401610ab490613264565b6002603354036116825760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610ab4565b600260338190555060006116cb8c8c8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506118d292505050565b90506116d681611d87565b6116f48c8c846116e657306116e8565b8c5b8c8c8c8c8c8c8c612183565b8161170357611703818b611957565b5050600160335550505050505050505050565b600082815260fb602052604090206001015461173181611ac3565b610a1f8383611bec565b600060008051602061379e83398151915254604051631e29f97960e31b8152600481018490526001600160a01b039091169150819063f14fcbc890602401600060405180830381600087803b15801561179357600080fd5b505af11580156117a7573d6000803e3d6000fd5b505050505050565b6000600080516020613805833981519152546001600160a01b03166117d2611891565b6001600160a01b0316146117f9576040516344e7d94960e01b815260040160405180910390fd5b6001600160a01b0386161561182d57600061181683850185612ab3565b9050611821816118a0565b61182b8682611957565b505b5063f23a6e6160e01b9695505050505050565b611848611b5b565b611851816122ce565b610a35600082612344565b60006001600160e01b03198216637965db0b60e01b14806107d657506301ffc9a760e01b6001600160e01b03198316146107d6565b600061189b61234e565b905090565b6001600160a01b038116610a355760405163b20f76e360e01b81526001600160a01b0382166004820152602401610ab4565b60007f93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae60001b82604051602001611909919061355e565b60405160208183030381529060405280519060200120604051602001611939929190918252602082015260400190565b60408051601f19818403018152919052805160209091012092915050565b604080517f0a8885dd093a12d378a27df09bde33e3caca641a3d6970e06805fde8e847cb466020820152908101839052819061199590606001610bb1565b80546001600160a01b0319166001600160a01b039283161790556040519082169083907f45aa97e368889fb3527c1db60c59c2ae91e82f21778613449e46d4208c1c4b1290600090a35050565b60606119ed85612369565b600080876001600160a01b031686611a078b8a8989611f5d565b604051611a14919061355e565b60006040518083038160008787f1925050503d8060008114611a52576040519150601f19603f3d011682016040523d82523d6000602084013e611a57565b606091505b509092509050611a68603f8761357a565b5a11611a7657611a7661359c565b611ab682826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c45440000000000008152506123cf565b9998505050505050505050565b610a3581611acf611891565b612408565b611ade8282610fa2565b610ac757600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611b17611891565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611b63611891565b6001600160a01b0316611b7e6097546001600160a01b031690565b6001600160a01b031614610e385760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610ab4565b610a356000805160206137e583398151915282611716565b611bf68282610fa2565b15610ac757600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff19169055611c2d611891565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b604080517f0a8885dd093a12d378a27df09bde33e3caca641a3d6970e06805fde8e847cb466020820152908101829052600090611cb090606001610bb1565b546001600160a01b0316905080611cdd5760405163124bad6360e31b815260048101839052602401610ab4565b30600080516020613805833981519152546040516331a9108f60e11b8152600481018590526001600160a01b0390911690636352211e90602401602060405180830381865afa158015611d34573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d5891906135b2565b6001600160a01b031614611d82576040516303b673fd60e21b815260048101839052602401610ab4565b919050565b303303611d9757610a358161246c565b610a3581612369565b610a356000805160206137e583398151915282612344565b609780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f90602401602060405180830381865afa158015611e51573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e759190613448565b90506000611f23866060015180519060200120868860200151604051602001611ec39392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b9050818660200151148015610f9857508551610f98906001600160a01b03168286612496565b6000303303611f5a5750601f193601355b90565b6060828585604051602001611f74939291906135cf565b6040516020818303038152906040529050949350505050565b606081516001600160401b03811115611fa857611fa8612afc565b604051908082528060200260200182016040528015611fdb57816020015b6060815260200190600190039081611fc65790505b50905060005b82518110156120b857600080306001600160a01b03168584815181106120095761200961321f565b602002602001015160405161201e919061355e565b600060405180830381855af49150503d8060008114612059576040519150601f19603f3d011682016040523d82523d6000602084013e61205e565b606091505b509150915061208682826040518060600160405280602781526020016137be602791396123cf565b8484815181106120985761209861321f565b6020026020010181905250505080806120b09061324b565b915050611fe1565b50919050565b600054610100900460ff166120e55760405162461bcd60e51b8152600401610ab49061360e565b6001603355565b600054610100900460ff16610e385760405162461bcd60e51b8152600401610ab49061360e565b600054610100900460ff1661213a5760405162461bcd60e51b8152600401610ab49061360e565b610e38612145611891565b611db8565b600054610100900460ff166121715760405162461bcd60e51b8152600401610ab49061360e565b610e38600061217e611891565b612344565b60008051602061379e833981519152546040516383e7f6ff60e01b81526001600160a01b039091169060009082906383e7f6ff906121c9908f908f908e906004016132c2565b6040805180830381865afa1580156121e5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061220991906132e6565b6020810151815191925061221c91613334565b47101561223c5760405163050205f960e01b815260040160405180910390fd5b816001600160a01b03166374694a2b8260200151836000015161225f9190613334565b8e8e8e8e8e8e8e8e8e8e6040518c63ffffffff1660e01b815260040161228e9a99989796959493929190613659565b6000604051808303818588803b1580156122a757600080fd5b505af11580156122bb573d6000803e3d6000fd5b5050505050505050505050505050505050565b6122d6611b5b565b6001600160a01b03811661233b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610ab4565b610a3581611db8565b610ac78282611ad4565b6000303303612364575060331936013560601c90565b503390565b604080517f1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a8381560208201529081018290526000906060016040516020818303038152906040528051906020012090506123be8190565b546123ca906001613334565b905550565b606083156123de5750816109f3565b8251156123ee5782518084602001fd5b8160405162461bcd60e51b8152600401610ab49190612a57565b6124128282610fa2565b610ac75761242a816001600160a01b031660146125d8565b6124358360206125d8565b6040516020016124469291906136cb565b60408051601f198184030181529082905262461bcd60e51b8252610ab491600401612a57565b612474611f49565b8114610a3557604051635637b6af60e11b815260048101829052602401610ab4565b60008060006124a58585612773565b909250905060008160048111156124be576124be613740565b1480156124dc5750856001600160a01b0316826001600160a01b0316145b156124ec576001925050506109f3565b600080876001600160a01b0316631626ba7e60e01b8888604051602401612514929190613756565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051612552919061355e565b600060405180830381855afa9150503d806000811461258d576040519150601f19603f3d011682016040523d82523d6000602084013e612592565b606091505b50915091508180156125a5575080516020145b80156125cc57508051630b135d3f60e11b906125ca9083016020908101908401613448565b145b98975050505050505050565b606060006125e783600261376f565b6125f2906002613334565b6001600160401b0381111561260957612609612afc565b6040519080825280601f01601f191660200182016040528015612633576020820181803683370190505b509050600360fc1b8160008151811061264e5761264e61321f565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061267d5761267d61321f565b60200101906001600160f81b031916908160001a90535060006126a184600261376f565b6126ac906001613334565b90505b6001811115612724576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106126e0576126e061321f565b1a60f81b8282815181106126f6576126f661321f565b60200101906001600160f81b031916908160001a90535060049490941c9361271d81613786565b90506126af565b5083156109f35760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610ab4565b60008082516041036127a95760208301516040840151606085015160001a61279d878285856127b8565b945094505050506127b1565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156127ef575060009050600361289c565b8460ff16601b1415801561280757508460ff16601c14155b15612818575060009050600461289c565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa15801561286c573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166128955760006001925092505061289c565b9150600090505b94509492505050565b6000602082840312156128b757600080fd5b81356001600160e01b0319811681146109f357600080fd5b6001600160a01b0381168114610a3557600080fd5b60008083601f8401126128f657600080fd5b5081356001600160401b0381111561290d57600080fd5b6020830191508360208285010111156127b157600080fd5b60008060008060006080868803121561293d57600080fd5b8535612948816128cf565b94506020860135612958816128cf565b93506040860135925060608601356001600160401b0381111561297a57600080fd5b612986888289016128e4565b969995985093965092949392505050565b6000806000604084860312156129ac57600080fd5b83356001600160401b03808211156129c357600080fd5b90850190608082880312156129d757600080fd5b909350602085013590808211156129ed57600080fd5b506129fa868287016128e4565b9497909650939450505050565b60005b83811015612a22578181015183820152602001612a0a565b50506000910152565b60008151808452612a43816020860160208601612a07565b601f01601f19169290920160200192915050565b6020815260006109f36020830184612a2b565b600060208284031215612a7c57600080fd5b5035919050565b60008060408385031215612a9657600080fd5b823591506020830135612aa8816128cf565b809150509250929050565b600060208284031215612ac557600080fd5b81356109f3816128cf565b60008060408385031215612ae357600080fd5b8235612aee816128cf565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715612b3a57612b3a612afc565b604052919050565b60006001600160401b03821115612b5b57612b5b612afc565b5060051b60200190565b60006020808385031215612b7857600080fd5b82356001600160401b03811115612b8e57600080fd5b8301601f81018513612b9f57600080fd5b8035612bb2612bad82612b42565b612b12565b81815260059190911b82018301908381019087831115612bd157600080fd5b928401925b82841015612bf8578335612be9816128cf565b82529284019290840190612bd6565b979650505050505050565b600080600060408486031215612c1857600080fd5b83356001600160401b03811115612c2e57600080fd5b612c3a868287016128e4565b909790965060209590950135949350505050565b600082601f830112612c5f57600080fd5b81356001600160401b03811115612c7857612c78612afc565b612c8b601f8201601f1916602001612b12565b818152846020838601011115612ca057600080fd5b816020850160208301376000918101602001919091529392505050565b60008083601f840112612ccf57600080fd5b5081356001600160401b03811115612ce657600080fd5b6020830191508360208260051b85010111156127b157600080fd5b80358015158114611d8257600080fd5b803561ffff81168114611d8257600080fd5b6000806000806000806000806000806101208b8d031215612d4357600080fd5b8a356001600160401b0380821115612d5a57600080fd5b612d668e838f01612c4e565b9b5060208d01359150612d78826128cf565b90995060408c0135985060608c0135975060808c013590612d98826128cf565b90965060a08c01359080821115612dae57600080fd5b50612dbb8d828e01612cbd565b9096509450612dce905060c08c01612d01565b9250612ddc60e08c01612d11565b9150612deb6101008c01612d01565b90509295989b9194979a5092959850565b60008060208385031215612e0f57600080fd5b82356001600160401b03811115612e2557600080fd5b612e3185828601612cbd565b90969095509350505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015612e9257603f19888603018452612e80858351612a2b565b94509285019290850190600101612e64565b5092979650505050505050565b60008060008060008060008060a0898b031215612ebb57600080fd5b8835612ec6816128cf565b97506020890135612ed6816128cf565b965060408901356001600160401b0380821115612ef257600080fd5b612efe8c838d01612cbd565b909850965060608b0135915080821115612f1757600080fd5b612f238c838d01612cbd565b909650945060808b0135915080821115612f3c57600080fd5b50612f498b828c016128e4565b999c989b5096995094979396929594505050565b600080600060608486031215612f7257600080fd5b8335612f7d816128cf565b92506020840135612f8d816128cf565b91506040840135612f9d816128cf565b809150509250925092565b60008060008060008060008060008060006101208c8e031215612fca57600080fd5b6001600160401b03808d351115612fe057600080fd5b612fed8e8e358f016128e4565b909c509a50612fff60208e01356128cf565b60208d0135995060408d0135985060608d0135975061302160808e01356128cf565b60808d013596508060a08e0135111561303957600080fd5b5061304a8d60a08e01358e01612cbd565b909550935061305b60c08d01612d01565b925061306960e08d01612d11565b91506130786101008d01612d01565b90509295989b509295989b9093969950565b60008060008060008060a087890312156130a357600080fd5b86356130ae816128cf565b955060208701356130be816128cf565b9450604087013593506060870135925060808701356001600160401b038111156130e757600080fd5b6130f389828a016128e4565b979a9699509497509295939492505050565b60008060006060848603121561311a57600080fd5b8335613125816128cf565b92506020840135613135816128cf565b915060408401356001600160401b0381111561315057600080fd5b61315c86828701612c4e565b9150509250925092565b6080815260006131796080830187612a2b565b6001600160a01b03958616602084015261ffff949094166040830152509216606090920191909152919050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090610f9890830184612a2b565b6000808335601e198436030181126131f057600080fd5b8301803591506001600160401b0382111561320a57600080fd5b6020019150368190038213156127b157600080fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60006001820161325d5761325d613235565b5060010190565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6040815260006132d6604083018587613299565b9050826020830152949350505050565b6000604082840312156132f857600080fd5b604051604081018181106001600160401b038211171561331a5761331a612afc565b604052825181526020928301519281019290925250919050565b808201808211156107d6576107d6613235565b81835260006020808501808196508560051b810191508460005b878110156133cb5782840389528135601e1988360301811261338257600080fd5b870185810190356001600160401b0381111561339d57600080fd5b8036038213156133ac57600080fd5b6133b7868284613299565b9a87019a9550505090840190600101613361565b5091979650505050505050565b60006101008083526133ec8184018d612a2b565b6001600160a01b038c81166020860152604085018c9052606085018b90528916608085015283810360a08501529050613426818789613347565b94151560c0840152505061ffff9190911660e090910152979650505050505050565b60006020828403121561345a57600080fd5b5051919050565b60006080823603121561347357600080fd5b604051608081016001600160401b03828210818311171561349657613496612afc565b81604052843591506134a7826128cf565b818352602085013560208401526040850135604084015260608501359150808211156134d257600080fd5b506134df36828601612c4e565b60608301525092915050565b60006134f9612bad84612b42565b80848252602080830192508560051b85013681111561351757600080fd5b855b818110156135525780356001600160401b038111156135385760008081fd5b61354436828a01612c4e565b865250938201938201613519565b50919695505050505050565b60008251613570818460208701612a07565b9190910192915050565b60008261359757634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052600160045260246000fd5b6000602082840312156135c457600080fd5b81516109f3816128cf565b600084516135e1818460208901612a07565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b600061010080835261366e8184018d8f613299565b6001600160a01b038c81166020860152604085018c9052606085018b90528916608085015283810360a085015290506136a8818789613347565b94151560c0840152505061ffff9190911660e09091015298975050505050505050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351613703816017850160208801612a07565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351613734816028840160208801612a07565b01602801949350505050565b634e487b7160e01b600052602160045260246000fd5b8281526040602082015260006110ef6040830184612a2b565b80820281158282048414176107d6576107d6613235565b60008161379557613795613235565b50600019019056fe412386de53449251cbf7ce1f4c6a038bf9c0746e62d331b08ef0c3fa7d0ab672416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c65649f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a660793a5062d506d35cc8f1beda67ee5028c16bfcd9c923d5bfc439c04bd929b1a164736f6c6343000811000a";
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
