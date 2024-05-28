"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameWrapper__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract ENS",
                name: "_ens",
                type: "address",
            },
            {
                internalType: "contract IBaseRegistrar",
                name: "_registrar",
                type: "address",
            },
            {
                internalType: "contract IMetadataService",
                name: "_metadataService",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "CannotUpgrade",
        type: "error",
    },
    {
        inputs: [],
        name: "IncompatibleParent",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "IncorrectTargetOwner",
        type: "error",
    },
    {
        inputs: [],
        name: "IncorrectTokenType",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "labelHash",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "expectedLabelhash",
                type: "bytes32",
            },
        ],
        name: "LabelMismatch",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
        ],
        name: "LabelTooLong",
        type: "error",
    },
    {
        inputs: [],
        name: "LabelTooShort",
        type: "error",
    },
    {
        inputs: [],
        name: "NameIsNotWrapped",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "OperationProhibited",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
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
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "controller",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "active",
                type: "bool",
            },
        ],
        name: "ControllerChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint64",
                name: "expiry",
                type: "uint64",
            },
        ],
        name: "ExpiryExtended",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint32",
                name: "fuses",
                type: "uint32",
            },
        ],
        name: "FusesSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "NameUnwrapped",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "name",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint32",
                name: "fuses",
                type: "uint32",
            },
            {
                indexed: false,
                internalType: "uint64",
                name: "expiry",
                type: "uint64",
            },
        ],
        name: "NameWrapped",
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
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "values",
                type: "uint256[]",
            },
        ],
        name: "TransferBatch",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "TransferSingle",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "value",
                type: "string",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "URI",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "_tokens",
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
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "uint32",
                name: "fuseMask",
                type: "uint32",
            },
        ],
        name: "allFusesBurned",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
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
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "balanceOf",
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
                internalType: "address[]",
                name: "accounts",
                type: "address[]",
            },
            {
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
        ],
        name: "balanceOfBatch",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "canExtendSubnames",
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
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "canModifyName",
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
                name: "",
                type: "address",
            },
        ],
        name: "controllers",
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
        name: "ens",
        outputs: [
            {
                internalType: "contract ENS",
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
                name: "parentNode",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "labelhash",
                type: "bytes32",
            },
            {
                internalType: "uint64",
                name: "expiry",
                type: "uint64",
            },
        ],
        name: "extendExpiry",
        outputs: [
            {
                internalType: "uint64",
                name: "",
                type: "uint64",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "getApproved",
        outputs: [
            {
                internalType: "address",
                name: "operator",
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
                name: "id",
                type: "uint256",
            },
        ],
        name: "getData",
        outputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint32",
                name: "fuses",
                type: "uint32",
            },
            {
                internalType: "uint64",
                name: "expiry",
                type: "uint64",
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
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
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
                internalType: "bytes32",
                name: "parentNode",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "labelhash",
                type: "bytes32",
            },
        ],
        name: "isWrapped",
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
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "isWrapped",
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
        name: "metadataService",
        outputs: [
            {
                internalType: "contract IMetadataService",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
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
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "names",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
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
                name: "id",
                type: "uint256",
            },
        ],
        name: "ownerOf",
        outputs: [
            {
                internalType: "address",
                name: "owner",
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
                name: "_token",
                type: "address",
            },
            {
                internalType: "address",
                name: "_to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "recoverFunds",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
            {
                internalType: "address",
                name: "wrappedOwner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "uint16",
                name: "ownerControlledFuses",
                type: "uint16",
            },
        ],
        name: "registerAndWrapETH2LD",
        outputs: [
            {
                internalType: "uint256",
                name: "registrarExpiry",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "registrar",
        outputs: [
            {
                internalType: "contract IBaseRegistrar",
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
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
        ],
        name: "renew",
        outputs: [
            {
                internalType: "uint256",
                name: "expires",
                type: "uint256",
            },
        ],
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
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeBatchTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
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
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "parentNode",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "labelhash",
                type: "bytes32",
            },
            {
                internalType: "uint32",
                name: "fuses",
                type: "uint32",
            },
            {
                internalType: "uint64",
                name: "expiry",
                type: "uint64",
            },
        ],
        name: "setChildFuses",
        outputs: [],
        stateMutability: "nonpayable",
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
                internalType: "bool",
                name: "active",
                type: "bool",
            },
        ],
        name: "setController",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "uint16",
                name: "ownerControlledFuses",
                type: "uint16",
            },
        ],
        name: "setFuses",
        outputs: [
            {
                internalType: "uint32",
                name: "",
                type: "uint32",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IMetadataService",
                name: "_metadataService",
                type: "address",
            },
        ],
        name: "setMetadataService",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "uint64",
                name: "ttl",
                type: "uint64",
            },
        ],
        name: "setRecord",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
        ],
        name: "setResolver",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "parentNode",
                type: "bytes32",
            },
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint32",
                name: "fuses",
                type: "uint32",
            },
            {
                internalType: "uint64",
                name: "expiry",
                type: "uint64",
            },
        ],
        name: "setSubnodeOwner",
        outputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "parentNode",
                type: "bytes32",
            },
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "uint64",
                name: "ttl",
                type: "uint64",
            },
            {
                internalType: "uint32",
                name: "fuses",
                type: "uint32",
            },
            {
                internalType: "uint64",
                name: "expiry",
                type: "uint64",
            },
        ],
        name: "setSubnodeRecord",
        outputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "uint64",
                name: "ttl",
                type: "uint64",
            },
        ],
        name: "setTTL",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract INameWrapperUpgrade",
                name: "_upgradeAddress",
                type: "address",
            },
        ],
        name: "setUpgradeContract",
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
                internalType: "bytes32",
                name: "parentNode",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "labelhash",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "controller",
                type: "address",
            },
        ],
        name: "unwrap",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "labelhash",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "registrant",
                type: "address",
            },
            {
                internalType: "address",
                name: "controller",
                type: "address",
            },
        ],
        name: "unwrapETH2LD",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "name",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "extraData",
                type: "bytes",
            },
        ],
        name: "upgrade",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "upgradeContract",
        outputs: [
            {
                internalType: "contract INameWrapperUpgrade",
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
        name: "uri",
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
                internalType: "bytes",
                name: "name",
                type: "bytes",
            },
            {
                internalType: "address",
                name: "wrappedOwner",
                type: "address",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
        ],
        name: "wrap",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
            {
                internalType: "address",
                name: "wrappedOwner",
                type: "address",
            },
            {
                internalType: "uint16",
                name: "ownerControlledFuses",
                type: "uint16",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
        ],
        name: "wrapETH2LD",
        outputs: [
            {
                internalType: "uint64",
                name: "expiry",
                type: "uint64",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60c060405234801562000010575f80fd5b5060405162005b1638038062005b168339810160408190526200003391620002ed565b8233620000408162000286565b6040516302571be360e01b81527f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e260048201525f906001600160a01b038416906302571be390602401602060405180830381865afa158015620000a5573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190620000cb91906200033e565b604051630f41a04d60e11b81526001600160a01b03848116600483015291925090821690631e83409a906024016020604051808303815f875af115801562000115573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906200013b919062000363565b505050506001600160a01b0383811660805282811660a052600580546001600160a01b031916918316919091179055600163fffeffff60a01b03197fafa26c20e8b3d9a2853d642cfe1021dae26242ffedfac91c97aab212c1a4b93b8190557fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb495560408051808201909152600181525f6020808301829052908052600690527f54cdd369e4e8a8515e52ca72ec816c2101831ad1f18bf44102ed171459c9b4f89062000208908262000419565b506040805180820190915260058152626cae8d60e31b6020808301919091527f93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae5f52600690527ffb9e8e321b8a5ec48f12a7b41f22c6e595d761285c9eb19d8dda7c99edf1b54f906200027c908262000419565b50505050620004e5565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b0381168114620002ea575f80fd5b50565b5f805f6060848603121562000300575f80fd5b83516200030d81620002d5565b60208501519093506200032081620002d5565b60408501519092506200033381620002d5565b809150509250925092565b5f602082840312156200034f575f80fd5b81516200035c81620002d5565b9392505050565b5f6020828403121562000374575f80fd5b5051919050565b634e487b7160e01b5f52604160045260245ffd5b600181811c90821680620003a457607f821691505b602082108103620003c357634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156200041457805f5260205f20601f840160051c81016020851015620003f05750805b601f840160051c820191505b8181101562000411575f8155600101620003fc565b50505b505050565b81516001600160401b038111156200043557620004356200037b565b6200044d816200044684546200038f565b84620003c9565b602080601f83116001811462000483575f84156200046b5750858301515b5f19600386901b1c1916600185901b178555620004dd565b5f85815260208120601f198616915b82811015620004b35788860151825594840194600190910190840162000492565b5085821015620004d157878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b60805160a051615528620005ee5f395f818161046901528181610acc01528181610b6e01528181610bf701528181611863015281816118f20152818161199e01528181611a6d01528181611ad901528181611b5901528181611d6701528181611e9d01528181611fc40152818161210e0152818161219101526128aa01525f81816104b601528181610a5801528181610d3e01528181610ec901528181610f750152818161127501528181611f1c015281816120440152818161223c015281816123e6015281816126a701528181612ad801528181612b8401528181612c3701528181612cb3015281816131a7015281816132f20152818161354d0152613ae401526155285ff3fe608060405234801561000f575f80fd5b5060043610610296575f3560e01c80636352211e11610161578063c93ab3fd116100ca578063e985e9c511610084578063e985e9c5146106c8578063eb8ae530146106db578063ed70554d146106ee578063f242432a1461070d578063f2fde38b14610720578063fd0cd0d914610733575f80fd5b8063c93ab3fd14610647578063cf4088231461065a578063d8c9921a1461066d578063d9a50c1214610680578063da8c229e14610693578063e0dba60f146106b5575f80fd5b8063a22cb4651161011b578063a22cb465146105d5578063a4014982146105e8578063adf4960a146105fb578063b6bcad261461060e578063c475abff14610621578063c658e08614610634575f80fd5b80636352211e146105595780636e5d6ad21461056c578063715018a6146105975780638b4dfa751461059f5780638cf8b41e146105b25780638da5cb5b146105c5575f80fd5b80631f4e1504116102035780633f15457f116101bd5780633f15457f146104b1578063402906fc146104d857806341415eab146105005780634e1273f41461051357806353095467146105335780635d3590d514610546575f80fd5b80631f4e15041461042b57806320c38e2b1461043e57806324c1af44146104515780632b20e397146104645780632eb2c2d61461048b57806333c69ea91461049e575f80fd5b80630e4cd725116102545780630e4cd725146103a05780630e89341c146103b357806314ab9038146103c6578063150b7a02146103d95780631534e177146104055780631896f70a14610418575f80fd5b8062fdd58e1461029a5780630178fe3f146102c057806301ffc9a71461030657806306fdde0314610329578063081812fc14610360578063095ea7b31461038b575b5f80fd5b6102ad6102a8366004614316565b610746565b6040519081526020015b60405180910390f35b6102d36102ce366004614340565b6107f0565b604080516001600160a01b03909416845263ffffffff90921660208401526001600160401b0316908201526060016102b7565b61031961031436600461436c565b61081f565b60405190151581526020016102b7565b6103536040518060400160405280600b81526020016a2730b6b2abb930b83832b960a91b81525081565b6040516102b791906143d4565b61037361036e366004614340565b61085e565b6040516001600160a01b0390911681526020016102b7565b61039e610399366004614316565b6108a0565b005b6103196103ae3660046143e6565b6108e5565b6103536103c1366004614340565b61095e565b61039e6103d436600461442f565b6109cc565b6103ec6103e736600461449d565b610ac0565b6040516001600160e01b031990911681526020016102b7565b61039e61041336600461450a565b610c96565b61039e6104263660046143e6565b610cc0565b600754610373906001600160a01b031681565b61035361044c366004614340565b610d75565b6102ad61045f3660046145f6565b610e0c565b6103737f000000000000000000000000000000000000000000000000000000000000000081565b61039e610499366004614717565b610fe7565b61039e6104ac3660046147bd565b61121a565b6103737f000000000000000000000000000000000000000000000000000000000000000081565b6104eb6104e6366004614811565b6113e6565b60405163ffffffff90911681526020016102b7565b61031961050e3660046143e6565b611480565b610526610521366004614832565b6114b8565b6040516102b79190614928565b600554610373906001600160a01b031681565b61039e61055436600461493a565b6115d7565b610373610567366004614340565b611655565b61057f61057a366004614978565b61165f565b6040516001600160401b0390911681526020016102b7565b61039e61178e565b61039e6105ad3660046149aa565b6117a1565b61057f6105c03660046149e9565b6118c0565b5f546001600160a01b0316610373565b61039e6105e3366004614a6b565b611c28565b6102ad6105f6366004614a97565b611cfd565b610319610609366004614b12565b611e38565b61039e61061c36600461450a565b611e5c565b6102ad61062f366004614b33565b61209e565b6102ad610642366004614b53565b6122fd565b61039e610655366004614bc0565b6124bd565b61039e610668366004614c26565b612605565b61039e61067b366004614c5b565b612794565b61031961068e366004614b33565b61285d565b6103196106a136600461450a565b60046020525f908152604090205460ff1681565b61039e6106c3366004614a6b565b612938565b6103196106d6366004614c86565b61299f565b61039e6106e9366004614cb2565b6129cc565b6102ad6106fc366004614340565b60016020525f908152604090205481565b61039e61071b366004614d15565b612d59565b61039e61072e36600461450a565b612e06565b610319610741366004614340565b612e7c565b5f6001600160a01b0383166107b65760405162461bcd60e51b815260206004820152602b60248201527f455243313135353a2062616c616e636520717565727920666f7220746865207a60448201526a65726f206164647265737360a81b60648201526084015b60405180910390fd5b5f6107c083611655565b9050836001600160a01b0316816001600160a01b0316036107e55760019150506107ea565b5f9150505b92915050565b5f8181526001602052604090205460a081901c60c082901c610813838383612f4d565b90959094509092509050565b5f6001600160e01b03198216631b05885b60e31b148061084f57506001600160e01b03198216630a85bd0160e11b145b806107ea57506107ea82612f80565b5f8061086983611655565b90506001600160a01b03811661088157505f92915050565b5f838152600360205260409020546001600160a01b03165b9392505050565b5f6108aa826107f0565b50915050603f1960408216016108d65760405163a2a7201360e01b8152600481018390526024016107ad565b6108e08383612fcf565b505050565b5f8080806108f2866107f0565b925092509250846001600160a01b0316836001600160a01b0316148061091d575061091d838661299f565b8061094157506001600160a01b0385166109368761085e565b6001600160a01b0316145b8015610954575061095282826130de565b155b9695505050505050565b6005546040516303a24d0760e21b8152600481018390526060916001600160a01b031690630e89341c906024015f60405180830381865afa1580156109a5573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526107ea9190810190614d78565b816109d78133611480565b6109f857803360405163168ab55d60e31b81526004016107ad929190614dea565b8260105f610a05836107f0565b5091505063ffffffff8282161615610a335760405163a2a7201360e01b8152600481018490526024016107ad565b604051630295720760e31b8152600481018790526001600160401b03861660248201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906314ab9038906044015b5f604051808303815f87803b158015610aa2575f80fd5b505af1158015610ab4573d5f803e3d5ffd5b50505050505050505050565b5f336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610b0a5760405163032634a760e31b815260040160405180910390fd5b5f808080610b1a86880188614e01565b83516020850120939750919550935091508890808214610b57576040516331970f3360e21b815260048101829052602481018390526044016107ad565b604051630a3b53db60e21b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906328ed4f6c90610ba59085903090600401614dea565b5f604051808303815f87803b158015610bbc575f80fd5b505af1158015610bce573d5f803e3d5ffd5b5050604051636b727d4360e11b8152600481018d90525f92506276a70091506001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063d6e4fa8690602401602060405180830381865afa158015610c3c573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610c609190614e64565b610c6a9190614e8f565b9050610c7d87878761ffff16848861310d565b50630a85bd0160e11b9c9b505050505050505050505050565b610c9e613215565b600580546001600160a01b0319166001600160a01b0392909216919091179055565b81610ccb8133611480565b610cec57803360405163168ab55d60e31b81526004016107ad929190614dea565b8260085f610cf9836107f0565b5091505063ffffffff8282161615610d275760405163a2a7201360e01b8152600481018490526024016107ad565b604051630c4b7b8560e11b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690631896f70a90610a8b9089908990600401614dea565b60066020525f908152604090208054610d8d90614eb6565b80601f0160208091040260200160405190810160405280929190818152602001828054610db990614eb6565b8015610e045780601f10610ddb57610100808354040283529160200191610e04565b820191905f5260205f20905b815481529060010190602001808311610de757829003601f168201915b505050505081565b5f87610e188133611480565b610e3957803360405163168ab55d60e31b81526004016107ad929190614dea565b87516020890120610e4a8a8261326e565b9250610e568a8461329a565b610e6083866133d3565b610e6b8a848b613406565b50610e788a8487876134cd565b9350610e8383613510565b610f33576040516305ef2c7f60e41b8152600481018b9052602481018290523060448201526001600160a01b0388811660648301526001600160401b03881660848301527f00000000000000000000000000000000000000000000000000000000000000001690635ef2c7f09060a4015f604051808303815f87803b158015610f0a575f80fd5b505af1158015610f1c573d5f803e3d5ffd5b50505050610f2e8a848b8b89896135c6565b610fda565b6040516305ef2c7f60e41b8152600481018b9052602481018290523060448201526001600160a01b0388811660648301526001600160401b03881660848301527f00000000000000000000000000000000000000000000000000000000000000001690635ef2c7f09060a4015f604051808303815f87803b158015610fb6575f80fd5b505af1158015610fc8573d5f803e3d5ffd5b50505050610fda8a848b8b89896135fc565b5050979650505050505050565b81518351146110495760405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206044820152670dad2e6dac2e8c6d60c31b60648201526084016107ad565b6001600160a01b03841661106f5760405162461bcd60e51b81526004016107ad90614eee565b6001600160a01b03851633148061108b575061108b853361299f565b6110f25760405162461bcd60e51b815260206004820152603260248201527f455243313135353a207472616e736665722063616c6c6572206973206e6f74206044820152711bdddb995c881b9bdc88185c1c1c9bdd995960721b60648201526084016107ad565b5f5b83518110156111ad575f84828151811061111057611110614f33565b602002602001015190505f84838151811061112d5761112d614f33565b602002602001015190505f805f611143856107f0565b9250925092506111548583836136b6565b83600114801561117557508a6001600160a01b0316836001600160a01b0316145b6111915760405162461bcd60e51b81526004016107ad90614f47565b61119d858b848461375d565b50505050508060010190506110f4565b50836001600160a01b0316856001600160a01b0316336001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb86866040516111fd929190614f91565b60405180910390a461121333868686868661379d565b5050505050565b5f611225858561326e565b905061123181846133d3565b5f808061123d846107f0565b919450925090506001600160a01b03831615806112ea57506040516302571be360e01b81526004810185905230906001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906302571be390602401602060405180830381865afa1580156112ba573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906112de9190614fbe565b6001600160a01b031614155b1561130857604051635374b59960e01b815260040160405180910390fd5b5f806113138a6107f0565b90935091508a905061134f576113298633611480565b61134a57853360405163168ab55d60e31b81526004016107ad929190614dea565b61137a565b6113598a33611480565b61137a57893360405163168ab55d60e31b81526004016107ad929190614dea565b6113858689846138f7565b611390878483613932565b9650620100008416158015906113b457508363ffffffff1688851763ffffffff1614155b156113d55760405163a2a7201360e01b8152600481018790526024016107ad565b96831796610ab486868a868b613977565b5f826113f28133611480565b61141357803360405163168ab55d60e31b81526004016107ad929190614dea565b8360025f611420836107f0565b5091505063ffffffff828216161561144e5760405163a2a7201360e01b8152600481018490526024016107ad565b5f808061145a8a6107f0565b9250925092506114738a84848c61ffff16178485613977565b5098975050505050505050565b5f80808061148d866107f0565b925092509250846001600160a01b0316836001600160a01b031614806109415750610941838661299f565b6060815183511461151d5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e677468604482015268040dad2e6dac2e8c6d60bb1b60648201526084016107ad565b5f83516001600160401b0381111561153757611537614525565b604051908082528060200260200182016040528015611560578160200160208202803683370190505b5090505f5b84518110156115cf576115aa85828151811061158357611583614f33565b602002602001015185838151811061159d5761159d614f33565b6020026020010151610746565b8282815181106115bc576115bc614f33565b6020908102919091010152600101611565565b509392505050565b6115df613215565b60405163a9059cbb60e01b81526001600160a01b0383811660048301526024820183905284169063a9059cbb906044016020604051808303815f875af115801561162b573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061164f9190614fd9565b50505050565b5f6107ea82613a1e565b5f8061166b858561326e565b905061167681613510565b61169357604051635374b59960e01b815260040160405180910390fd5b5f61169e86336108e5565b9050801580156116b557506116b38233611480565b155b156116d757813360405163168ab55d60e31b81526004016107ad929190614dea565b5f80806116e3856107f0565b925092509250831580156116fa5750620400008216155b1561171b5760405163a2a7201360e01b8152600481018690526024016107ad565b5f6117258a6107f0565b92505050611734888383613932565b97506117428685858b613a33565b6040516001600160401b038916815286907ff675815a0817338f93a7da433f6bd5f5542f1029b11b455191ac96c7f6a9b1329060200160405180910390a2509598975050505050505050565b611796613215565b61179f5f613a49565b565b6117b85f805160206154fc8339815191528461326e565b6117c28133611480565b6117e357803360405163168ab55d60e31b81526004016107ad929190614dea565b306001600160a01b0384160361181757604051632ca49b0d60e11b81526001600160a01b03841660048201526024016107ad565b6118376118315f805160206154fc8339815191528661326e565b83613a98565b604051632142170760e11b81523060048201526001600160a01b038481166024830152604482018690527f000000000000000000000000000000000000000000000000000000000000000016906342842e0e906064015f604051808303815f87803b1580156118a4575f80fd5b505af11580156118b6573d5f803e3d5ffd5b5050505050505050565b5f8086866040516118d2929190614ff4565b6040519081900381206331a9108f60e11b82526004820181905291505f907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690636352211e90602401602060405180830381865afa15801561193f573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906119639190614fbe565b90506001600160a01b0381163314801590611a09575060405163e985e9c560e01b81526001600160a01b0382811660048301523360248301527f0000000000000000000000000000000000000000000000000000000000000000169063e985e9c590604401602060405180830381865afa1580156119e3573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611a079190614fd9565b155b15611a4157611a255f805160206154fc8339815191528361326e565b3360405163168ab55d60e31b81526004016107ad929190614dea565b6040516323b872dd60e01b81526001600160a01b038281166004830152306024830152604482018490527f000000000000000000000000000000000000000000000000000000000000000016906323b872dd906064015f604051808303815f87803b158015611aae575f80fd5b505af1158015611ac0573d5f803e3d5ffd5b5050604051630a3b53db60e21b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001692506328ed4f6c9150611b129085903090600401614dea565b5f604051808303815f87803b158015611b29575f80fd5b505af1158015611b3b573d5f803e3d5ffd5b5050604051636b727d4360e11b8152600481018590526276a70092507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316915063d6e4fa8690602401602060405180830381865afa158015611ba7573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611bcb9190614e64565b611bd59190614e8f565b9250611c1d88888080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152508a9250505061ffff8816868861310d565b505095945050505050565b6001600160a01b0382163303611c925760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c20737461747573604482015268103337b91039b2b63360b91b60648201526084016107ad565b335f8181526002602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b335f9081526004602052604081205460ff16611d2b5760405162461bcd60e51b81526004016107ad90615003565b5f8787604051611d3c929190614ff4565b604051908190038120633f2891eb60e21b8252600482018190523060248301526044820187905291507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063fca247ac906064016020604051808303815f875af1158015611db5573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611dd99190614e64565b9150611e2d88888080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152508a9250505061ffff8616611e276276a70087614e8f565b8861310d565b509695505050505050565b5f80611e43846107f0565b50841663ffffffff908116908516149250505092915050565b611e64613215565b6007546001600160a01b031615611f785760075460405163a22cb46560e01b81526001600160a01b0391821660048201525f60248201527f00000000000000000000000000000000000000000000000000000000000000009091169063a22cb465906044015f604051808303815f87803b158015611ee0575f80fd5b505af1158015611ef2573d5f803e3d5ffd5b505060075460405163a22cb46560e01b81526001600160a01b0391821660048201525f60248201527f0000000000000000000000000000000000000000000000000000000000000000909116925063a22cb46591506044015f604051808303815f87803b158015611f61575f80fd5b505af1158015611f73573d5f803e3d5ffd5b505050505b600780546001600160a01b0319166001600160a01b0383169081179091551561209b5760075460405163a22cb46560e01b81526001600160a01b039182166004820152600160248201527f00000000000000000000000000000000000000000000000000000000000000009091169063a22cb465906044015f604051808303815f87803b158015612007575f80fd5b505af1158015612019573d5f803e3d5ffd5b505060075460405163a22cb46560e01b81526001600160a01b039182166004820152600160248201527f0000000000000000000000000000000000000000000000000000000000000000909116925063a22cb46591506044015f604051808303815f87803b158015612089575f80fd5b505af1158015611213573d5f803e3d5ffd5b50565b335f9081526004602052604081205460ff166120cc5760405162461bcd60e51b81526004016107ad90615003565b5f6120e45f805160206154fc8339815191528561326e565b60405163c475abff60e01b815260048101869052602481018590529091505f906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063c475abff906044016020604051808303815f875af1158015612154573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906121789190614e64565b6040516331a9108f60e11b8152600481018790529091507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690636352211e90602401602060405180830381865afa9250505080156121fc575060408051601f3d908101601f191682019092526121f991810190614fbe565b60015b6122095791506107ea9050565b6001600160a01b038116301415806122b157506040516302571be360e01b81526004810184905230906001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906302571be390602401602060405180830381865afa158015612281573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906122a59190614fbe565b6001600160a01b031614155b156122c0575091506107ea9050565b505f6122cf6276a70083614e8f565b5f8481526001602052604090205490915060a081901c6122f185838386613a33565b50919695505050505050565b5f866123098133611480565b61232a57803360405163168ab55d60e31b81526004016107ad929190614dea565b5f878760405161233b929190614ff4565b6040518091039020905061234f898261326e565b925061235b898461329a565b61236583866133d3565b5f6123a68a858b8b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525061340692505050565b90506123b48a8588886134cd565b94506123bf84613510565b61246b576040516306ab592360e01b8152600481018b9052602481018390523060448201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906306ab5923906064016020604051808303815f875af1158015612434573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906124589190614e64565b506124668482898989613b83565b6124b0565b6124b08a858b8b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152508d92508c91508b90506135fc565b5050509695505050505050565b5f6125005f86868080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152509293925050613bc59050565b6007549091506001600160a01b031661252c5760405163093075b560e21b815260040160405180910390fd5b6125368133611480565b61255757803360405163168ab55d60e31b81526004016107ad929190614dea565b5f8080612563846107f0565b919450925090505f6125748561085e565b905061257f85613c81565b60075f9054906101000a90046001600160a01b03166001600160a01b0316639198c2768a8a878787878e8e6040518963ffffffff1660e01b81526004016125cd989796959493929190615073565b5f604051808303815f87803b1580156125e4575f80fd5b505af11580156125f6573d5f803e3d5ffd5b50505050505050505050505050565b836126108133611480565b61263157803360405163168ab55d60e31b81526004016107ad929190614dea565b84601c5f61263e836107f0565b5091505063ffffffff828216161561266c5760405163a2a7201360e01b8152600481018490526024016107ad565b60405163cf40882360e01b8152600481018990523060248201526001600160a01b0387811660448301526001600160401b03871660648301527f0000000000000000000000000000000000000000000000000000000000000000169063cf408823906084015f604051808303815f87803b1580156126e8575f80fd5b505af11580156126fa573d5f803e3d5ffd5b5050506001600160a01b038816905061275f575f612717896107f0565b509150506201ffff196202000082160161274f57604051632ca49b0d60e11b81526001600160a01b03891660048201526024016107ad565b612759895f613a98565b506118b6565b5f61276989611655565b905061278981898b5f1c600160405180602001604052805f815250613d1e565b505050505050505050565b61279e838361326e565b6127a88133611480565b6127c957803360405163168ab55d60e31b81526004016107ad929190614dea565b7f6c32148f748aba23997146d7fe89e962e3cc30271290fb96f5f4337756c03b5284016128095760405163615a470360e01b815260040160405180910390fd5b6001600160a01b038216158061282757506001600160a01b03821630145b1561285057604051632ca49b0d60e11b81526001600160a01b03831660048201526024016107ad565b61164f611831858561326e565b5f80612869848461326e565b90505f61287582613510565b90505f805160206154fc83398151915285146128945791506107ea9050565b6040516331a9108f60e11b8152600481018590527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690636352211e90602401602060405180830381865afa925050508015612915575060408051601f3d908101601f1916820190925261291291810190614fbe565b60015b612923575f925050506107ea565b6001600160a01b0316301492506107ea915050565b612940613215565b6001600160a01b0382165f81815260046020908152604091829020805460ff191685151590811790915591519182527f4c97694570a07277810af7e5669ffd5f6a2d6b74b6e9a274b8b870fd5114cf8791015b60405180910390a25050565b6001600160a01b039182165f90815260026020908152604080832093909416825291909152205460ff1690565b5f80612a105f87878080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152509293925050613dfe9050565b915091505f612a578288888080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152509293925050613bc59050565b90505f612a64828561326e565b5f818152600660205260409020909150612a7f888a8361511e565b507f6c32148f748aba23997146d7fe89e962e3cc30271290fb96f5f4337756c03b528201612ac05760405163615a470360e01b815260040160405180910390fd5b6040516302571be360e01b8152600481018290525f907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906302571be390602401602060405180830381865afa158015612b25573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190612b499190614fbe565b90506001600160a01b0381163314801590612bef575060405163e985e9c560e01b81526001600160a01b0382811660048301523360248301527f0000000000000000000000000000000000000000000000000000000000000000169063e985e9c590604401602060405180830381865afa158015612bc9573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190612bed9190614fd9565b155b15612c1157813360405163168ab55d60e31b81526004016107ad929190614dea565b6001600160a01b03861615612c9c57604051630c4b7b8560e11b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690631896f70a90612c6e9085908a90600401614dea565b5f604051808303815f87803b158015612c85575f80fd5b505af1158015612c97573d5f803e3d5ffd5b505050505b604051635b0fc9c360e01b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690635b0fc9c390612cea9085903090600401614dea565b5f604051808303815f87803b158015612d01575f80fd5b505af1158015612d13573d5f803e3d5ffd5b50505050612789828a8a8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201829052508d93509150819050613b83565b6001600160a01b038416612d7f5760405162461bcd60e51b81526004016107ad90614eee565b6001600160a01b038516331480612d9b5750612d9b853361299f565b612df95760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7260448201526808185c1c1c9bdd995960ba1b60648201526084016107ad565b6112138585858585613d1e565b612e0e613215565b6001600160a01b038116612e735760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016107ad565b61209b81613a49565b5f8181526006602052604081208054829190612e9790614eb6565b80601f0160208091040260200160405190810160405280929190818152602001828054612ec390614eb6565b8015612f0e5780601f10612ee557610100808354040283529160200191612f0e565b820191905f5260205f20905b815481529060010190602001808311612ef157829003601f168201915b5050505050905080515f03612f2557505f92915050565b5f80612f318382613dfe565b90925090505f612f418483613bc5565b9050610954818461285d565b5f8042836001600160401b03161015612f775761ffff1962010000851601612f73575f94505b5f93505b50929391925050565b5f6001600160e01b03198216636cdb3d1360e11b1480612fb057506001600160e01b031982166303a24d0760e21b145b806107ea57506301ffc9a760e01b6001600160e01b03198316146107ea565b5f612fd982611655565b9050806001600160a01b0316836001600160a01b0316036130465760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016107ad565b336001600160a01b03821614806130625750613062813361299f565b6130d45760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c00000060648201526084016107ad565b6108e08383613eb2565b5f620200008381161480156108995750426130fc6276a700846151d7565b6001600160401b0316109392505050565b845160208601205f61312c5f805160206154fc8339815191528361326e565b90505f61315488604051806040016040528060058152602001626cae8d60e31b815250613f1f565b5f83815260066020526040902090915061316e82826151f7565b50613181828289620300008a1789613b83565b6001600160a01b038416156118b657604051630c4b7b8560e11b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690631896f70a906131de9085908890600401614dea565b5f604051808303815f87803b1580156131f5575f80fd5b505af1158015613207573d5f803e3d5ffd5b505050505050505050505050565b5f546001600160a01b0316331461179f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016107ad565b604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b5f80806132a6846107f0565b91945092509050426001600160401b0382161080801561336657506001600160a01b038416158061336657506040516302571be360e01b8152600481018690525f906001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906302571be390602401602060405180830381865afa158015613337573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061335b9190614fbe565b6001600160a01b0316145b156133a4575f613375876107f0565b50915050602081161561339e5760405163a2a7201360e01b8152600481018790526024016107ad565b506133cb565b620100008316156133cb5760405163a2a7201360e01b8152600481018690526024016107ad565b505050505050565b63fffdffff81811763ffffffff16146134025760405163a2a7201360e01b8152600481018390526024016107ad565b5050565b60605f6134aa8360065f8881526020019081526020015f20805461342990614eb6565b80601f016020809104026020016040519081016040528092919081815260200182805461345590614eb6565b80156134a05780601f10613477576101008083540402835291602001916134a0565b820191905f5260205f20905b81548152906001019060200180831161348357829003601f168201915b5050505050613f1f565b5f8581526006602052604090209091506134c482826151f7565b50949350505050565b5f806134d8856107f0565b925050505f806134e9885f1c6107f0565b92509250506134f98787846138f7565b613504858483613932565b98975050505050505050565b5f8061351b83611655565b6001600160a01b0316141580156107ea57506040516302571be360e01b81526004810183905230906001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906302571be390602401602060405180830381865afa158015613592573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906135b69190614fbe565b6001600160a01b03161492915050565b5f86815260066020526040812080546135e491879161342990614eb6565b90506135f38682868686613b83565b50505050505050565b5f8080613608886107f0565b9250925092505f61362f8860065f8d81526020019081526020015f20805461342990614eb6565b5f8a815260066020526040902080549192509061364b90614eb6565b90505f0361366c575f89815260066020526040902061366a82826151f7565b505b61367b89858886178589613977565b6001600160a01b03871661369857613693895f613a98565b610ab4565b610ab484888b5f1c600160405180602001604052805f815250613d1e565b6201ffff19620200008316016136d6576136d36276a700826151d7565b90505b42816001600160401b0316101561370f576201000082161561370a5760405162461bcd60e51b81526004016107ad90614f47565b613734565b60048216156137345760405163a2a7201360e01b8152600481018490526024016107ad565b604082165f036108e05750505f90815260036020526040902080546001600160a01b0319169055565b60c0816001600160401b0316901b60a08363ffffffff16901b846001600160a01b0316171760015f8681526020019081526020015f208190555050505050565b6001600160a01b0384163b156133cb5760405163bc197c8160e01b81526001600160a01b0385169063bc197c81906137e190899089908890889088906004016152b2565b6020604051808303815f875af192505050801561381b575060408051601f3d908101601f1916820190925261381891810190615303565b60015b6138c75761382761531e565b806308c379a003613860575061383b615337565b806138465750613862565b8060405162461bcd60e51b81526004016107ad91906143d4565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e20455243313135356044820152732932b1b2b4bb32b91034b6b83632b6b2b73a32b960611b60648201526084016107ad565b6001600160e01b0319811663bc197c8160e01b146135f35760405162461bcd60e51b81526004016107ad906153bf565b63ffff000082161580159060018316159082906139115750805b156112135760405163a2a7201360e01b8152600481018690526024016107ad565b5f816001600160401b0316846001600160401b03161115613951578193505b826001600160401b0316846001600160401b0316101561396f578293505b509192915050565b61398385858584613a33565b60405163ffffffff8416815285907f39873f00c80f4f94b7bd1594aebcf650f003545b74824d57ddf4939e3ff3a34b9060200160405180910390a2816001600160401b0316816001600160401b03161115611213576040516001600160401b038216815285907ff675815a0817338f93a7da433f6bd5f5542f1029b11b455191ac96c7f6a9b132906020015b60405180910390a25050505050565b5f80613a29836107f0565b5090949350505050565b613a3d8483613f96565b61164f8484848461375d565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b613aa3826001611e38565b15613ac45760405163a2a7201360e01b8152600481018390526024016107ad565b613acd82613c81565b604051635b0fc9c360e01b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690635b0fc9c390613b1b9085908590600401614dea565b5f604051808303815f87803b158015613b32575f80fd5b505af1158015613b44573d5f803e3d5ffd5b50506040516001600160a01b03841681528492507fee2ba1195c65bcf218a83d874335c6bf9d9067b4c672f3c3bf16cf40de7586c49150602001612993565b613b8f85848484613fcf565b847f8ce7013e8abebc55c3890a68f5a27c67c3f7efa64e584de5fb22363c606fd34085858585604051613a0f9493929190615407565b5f805f613bd28585613dfe565b909250905081613c435760018551613bea919061544d565b8414613c385760405162461bcd60e51b815260206004820152601d60248201527f6e616d65686173683a204a756e6b20617420656e64206f66206e616d6500000060448201526064016107ad565b505f91506107ea9050565b613c4d8582613bc5565b6040805160208101929092528101839052606001604051602081830303815290604052805190602001209250505092915050565b5f8181526001602052604090205460a081901c60c082901c613ca4838383612f4d565b5f86815260036020526040812080546001600160a01b0319169055909350613cd091508590848461375d565b60408051858152600160208201525f916001600160a01b0386169133917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a450505050565b5f805f613d2a866107f0565b925092509250613d3b8683836136b6565b846001148015613d5c5750876001600160a01b0316836001600160a01b0316145b613d785760405162461bcd60e51b81526004016107ad90614f47565b866001600160a01b0316836001600160a01b031603613d9957505050611213565b613da58688848461375d565b60408051878152602081018790526001600160a01b03808a1692908b169133917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a46118b6338989898989614041565b5f8083518310613e505760405162461bcd60e51b815260206004820152601e60248201527f726561644c6162656c3a20496e646578206f7574206f6620626f756e6473000060448201526064016107ad565b5f848481518110613e6357613e63614f33565b016020015160f81c90508015613e8f57613e8885613e82866001615460565b836140fb565b9250613e93565b5f92505b613e9d8185615460565b613ea8906001615460565b9150509250929050565b5f81815260036020526040902080546001600160a01b0319166001600160a01b0384169081179091558190613ee682611655565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6060600183511015613f4457604051631406d65b60e11b815260040160405180910390fd5b60ff83511115613f69578260405163e3ba295f60e01b81526004016107ad91906143d4565b82518383604051602001613f7f93929190615473565b604051602081830303815290604052905092915050565b61ffff811615801590613fae57506201000181811614155b156134025760405163a2a7201360e01b8152600481018390526024016107ad565b613fd98483613f96565b5f848152600160205260409020546001600160a01b0381161561403557613fff85613c81565b6040515f815285907fee2ba1195c65bcf218a83d874335c6bf9d9067b4c672f3c3bf16cf40de7586c49060200160405180910390a25b6112138585858561411d565b6001600160a01b0384163b156133cb5760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e619061408590899089908890889088906004016154b7565b6020604051808303815f875af19250505080156140bf575060408051601f3d908101601f191682019092526140bc91810190615303565b60015b6140cb5761382761531e565b6001600160e01b0319811663f23a6e6160e01b146135f35760405162461bcd60e51b81526004016107ad906153bf565b82515f906141098385615460565b1115614113575f80fd5b5091016020012090565b835f808061412a846107f0565b9194509250905063ffff000082166001600160401b038087169083161115614150578195505b42826001600160401b03161061416557958617955b6001600160a01b038416156141bc5760405162461bcd60e51b815260206004820152601f60248201527f455243313135353a206d696e74206f66206578697374696e6720746f6b656e0060448201526064016107ad565b6001600160a01b03881661421c5760405162461bcd60e51b815260206004820152602160248201527f455243313135353a206d696e7420746f20746865207a65726f206164647265736044820152607360f81b60648201526084016107ad565b306001600160a01b038916036142915760405162461bcd60e51b815260206004820152603460248201527f455243313135353a206e65774f776e65722063616e6e6f74206265207468652060448201527313985b5955dc985c1c195c8818dbdb9d1c9858dd60621b60648201526084016107ad565b61429d8589898961375d565b60408051868152600160208201526001600160a01b038a16915f9133917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a4612789335f8a88600160405180602001604052805f815250614041565b6001600160a01b038116811461209b575f80fd5b5f8060408385031215614327575f80fd5b823561433281614302565b946020939093013593505050565b5f60208284031215614350575f80fd5b5035919050565b6001600160e01b03198116811461209b575f80fd5b5f6020828403121561437c575f80fd5b813561089981614357565b5f5b838110156143a1578181015183820152602001614389565b50505f910152565b5f81518084526143c0816020860160208601614387565b601f01601f19169290920160200192915050565b602081525f61089960208301846143a9565b5f80604083850312156143f7575f80fd5b82359150602083013561440981614302565b809150509250929050565b80356001600160401b038116811461442a575f80fd5b919050565b5f8060408385031215614440575f80fd5b8235915061445060208401614414565b90509250929050565b5f8083601f840112614469575f80fd5b5081356001600160401b0381111561447f575f80fd5b602083019150836020828501011115614496575f80fd5b9250929050565b5f805f805f608086880312156144b1575f80fd5b85356144bc81614302565b945060208601356144cc81614302565b93506040860135925060608601356001600160401b038111156144ed575f80fd5b6144f988828901614459565b969995985093965092949392505050565b5f6020828403121561451a575f80fd5b813561089981614302565b634e487b7160e01b5f52604160045260245ffd5b601f8201601f191681016001600160401b038111828210171561455e5761455e614525565b6040525050565b5f6001600160401b0382111561457d5761457d614525565b50601f01601f191660200190565b5f82601f83011261459a575f80fd5b81356145a581614565565b6040516145b28282614539565b8281528560208487010111156145c6575f80fd5b826020860160208301375f92810160200192909252509392505050565b803563ffffffff8116811461442a575f80fd5b5f805f805f805f60e0888a03121561460c575f80fd5b8735965060208801356001600160401b03811115614628575f80fd5b6146348a828b0161458b565b965050604088013561464581614302565b9450606088013561465581614302565b935061466360808901614414565b925061467160a089016145e3565b915061467f60c08901614414565b905092959891949750929550565b5f6001600160401b038211156146a5576146a5614525565b5060051b60200190565b5f82601f8301126146be575f80fd5b813560206146cb8261468d565b6040516146d88282614539565b80915083815260208101915060208460051b8701019350868411156146fb575f80fd5b602086015b84811015611e2d5780358352918301918301614700565b5f805f805f60a0868803121561472b575f80fd5b853561473681614302565b9450602086013561474681614302565b935060408601356001600160401b0380821115614761575f80fd5b61476d89838a016146af565b94506060880135915080821115614782575f80fd5b61478e89838a016146af565b935060808801359150808211156147a3575f80fd5b506147b08882890161458b565b9150509295509295909350565b5f805f80608085870312156147d0575f80fd5b84359350602085013592506147e7604086016145e3565b91506147f560608601614414565b905092959194509250565b803561ffff8116811461442a575f80fd5b5f8060408385031215614822575f80fd5b8235915061445060208401614800565b5f8060408385031215614843575f80fd5b82356001600160401b0380821115614859575f80fd5b818501915085601f83011261486c575f80fd5b813560206148798261468d565b6040516148868282614539565b83815260059390931b85018201928281019150898411156148a5575f80fd5b948201945b838610156148cc5785356148bd81614302565b825294820194908201906148aa565b965050860135925050808211156148e1575f80fd5b50613ea8858286016146af565b5f815180845260208085019450602084015f5b8381101561491d57815187529582019590820190600101614901565b509495945050505050565b602081525f61089960208301846148ee565b5f805f6060848603121561494c575f80fd5b833561495781614302565b9250602084013561496781614302565b929592945050506040919091013590565b5f805f6060848603121561498a575f80fd5b83359250602084013591506149a160408501614414565b90509250925092565b5f805f606084860312156149bc575f80fd5b8335925060208401356149ce81614302565b915060408401356149de81614302565b809150509250925092565b5f805f805f608086880312156149fd575f80fd5b85356001600160401b03811115614a12575f80fd5b614a1e88828901614459565b9096509450506020860135614a3281614302565b9250614a4060408701614800565b91506060860135614a5081614302565b809150509295509295909350565b801515811461209b575f80fd5b5f8060408385031215614a7c575f80fd5b8235614a8781614302565b9150602083013561440981614a5e565b5f805f805f8060a08789031215614aac575f80fd5b86356001600160401b03811115614ac1575f80fd5b614acd89828a01614459565b9097509550506020870135614ae181614302565b9350604087013592506060870135614af881614302565b9150614b0660808801614800565b90509295509295509295565b5f8060408385031215614b23575f80fd5b82359150614450602084016145e3565b5f8060408385031215614b44575f80fd5b50508035926020909101359150565b5f805f805f8060a08789031215614b68575f80fd5b8635955060208701356001600160401b03811115614b84575f80fd5b614b9089828a01614459565b9096509450506040870135614ba481614302565b9250614bb2606088016145e3565b9150614b0660808801614414565b5f805f8060408587031215614bd3575f80fd5b84356001600160401b0380821115614be9575f80fd5b614bf588838901614459565b90965094506020870135915080821115614c0d575f80fd5b50614c1a87828801614459565b95989497509550505050565b5f805f8060808587031215614c39575f80fd5b843593506020850135614c4b81614302565b925060408501356147e781614302565b5f805f60608486031215614c6d575f80fd5b833592506020840135915060408401356149de81614302565b5f8060408385031215614c97575f80fd5b8235614ca281614302565b9150602083013561440981614302565b5f805f8060608587031215614cc5575f80fd5b84356001600160401b03811115614cda575f80fd5b614ce687828801614459565b9095509350506020850135614cfa81614302565b91506040850135614d0a81614302565b939692955090935050565b5f805f805f60a08688031215614d29575f80fd5b8535614d3481614302565b94506020860135614d4481614302565b9350604086013592506060860135915060808601356001600160401b03811115614d6c575f80fd5b6147b08882890161458b565b5f60208284031215614d88575f80fd5b81516001600160401b03811115614d9d575f80fd5b8201601f81018413614dad575f80fd5b8051614db881614565565b604051614dc58282614539565b828152866020848601011115614dd9575f80fd5b610954836020830160208701614387565b9182526001600160a01b0316602082015260400190565b5f805f8060808587031215614e14575f80fd5b84356001600160401b03811115614e29575f80fd5b614e358782880161458b565b9450506020850135614e4681614302565b9250614e5460408601614800565b91506060850135614d0a81614302565b5f60208284031215614e74575f80fd5b5051919050565b634e487b7160e01b5f52601160045260245ffd5b6001600160401b03818116838216019080821115614eaf57614eaf614e7b565b5092915050565b600181811c90821680614eca57607f821691505b602082108103614ee857634e487b7160e01b5f52602260045260245ffd5b50919050565b60208082526025908201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604082015264647265737360d81b606082015260800190565b634e487b7160e01b5f52603260045260245ffd5b6020808252602a908201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60408201526939103a3930b739b332b960b11b606082015260800190565b604081525f614fa360408301856148ee565b8281036020840152614fb581856148ee565b95945050505050565b5f60208284031215614fce575f80fd5b815161089981614302565b5f60208284031215614fe9575f80fd5b815161089981614a5e565b818382375f9101908152919050565b60208082526028908201527f436f6e74726f6c6c61626c653a2043616c6c6572206973206e6f74206120636f604082015267373a3937b63632b960c11b606082015260800190565b81835281816020850137505f828201602090810191909152601f909101601f19169091010190565b60c081525f61508660c083018a8c61504b565b6001600160a01b03898116602085015263ffffffff891660408501526001600160401b03881660608501528616608084015282810360a08401526150cb81858761504b565b9b9a5050505050505050505050565b601f8211156108e057805f5260205f20601f840160051c810160208510156150ff5750805b601f840160051c820191505b81811015611213575f815560010161510b565b6001600160401b0383111561513557615135614525565b615149836151438354614eb6565b836150da565b5f601f84116001811461517a575f85156151635750838201355b5f19600387901b1c1916600186901b178355611213565b5f83815260208120601f198716915b828110156151a95786850135825560209485019460019092019101615189565b50868210156151c5575f1960f88860031b161c19848701351681555b505060018560011b0183555050505050565b6001600160401b03828116828216039080821115614eaf57614eaf614e7b565b81516001600160401b0381111561521057615210614525565b6152248161521e8454614eb6565b846150da565b602080601f831160018114615257575f84156152405750858301515b5f19600386901b1c1916600185901b1785556133cb565b5f85815260208120601f198616915b8281101561528557888601518255948401946001909101908401615266565b50858210156152a257878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b6001600160a01b0386811682528516602082015260a0604082018190525f906152dd908301866148ee565b82810360608401526152ef81866148ee565b9050828103608084015261350481856143a9565b5f60208284031215615313575f80fd5b815161089981614357565b5f60033d11156153345760045f803e505f5160e01c5b90565b5f60443d10156153445790565b6040516003193d81016004833e81513d6001600160401b03816024840111818411171561537357505050505090565b828501915081518181111561538b5750505050505090565b843d87010160208285010111156153a55750505050505090565b6153b460208286010187614539565b509095945050505050565b60208082526028908201527f455243313135353a204552433131353552656365697665722072656a656374656040820152676420746f6b656e7360c01b606082015260800190565b608081525f61541960808301876143a9565b6001600160a01b039590951660208301525063ffffffff9290921660408301526001600160401b0316606090910152919050565b818103818111156107ea576107ea614e7b565b808201808211156107ea576107ea614e7b565b60ff60f81b8460f81b1681525f8351615493816001850160208801614387565b8351908301906154aa816001840160208801614387565b0160010195945050505050565b6001600160a01b03868116825285166020820152604081018490526060810183905260a0608082018190525f906154f0908301846143a9565b97965050505050505056fe93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4aea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class NameWrapper__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(_ens, _registrar, _metadataService, overrides) {
        return super.getDeployTransaction(_ens, _registrar, _metadataService, overrides || {});
    }
    deploy(_ens, _registrar, _metadataService, overrides) {
        return super.deploy(_ens, _registrar, _metadataService, overrides || {});
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
exports.NameWrapper__factory = NameWrapper__factory;
NameWrapper__factory.bytecode = _bytecode;
NameWrapper__factory.abi = _abi;
