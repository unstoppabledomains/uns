"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNSRegistry__factory = void 0;
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
                name: "owner",
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
                indexed: true,
                internalType: "string",
                name: "keyIndex",
                type: "string",
            },
            {
                indexed: false,
                internalType: "string",
                name: "key",
                type: "string",
            },
        ],
        name: "NewKey",
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
                name: "uri",
                type: "string",
            },
        ],
        name: "NewURI",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "prefix",
                type: "string",
            },
        ],
        name: "NewURIPrefix",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "RemoveReverse",
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
        name: "ResetRecords",
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
                internalType: "string",
                name: "keyIndex",
                type: "string",
            },
            {
                indexed: true,
                internalType: "string",
                name: "valueIndex",
                type: "string",
            },
            {
                indexed: false,
                internalType: "string",
                name: "key",
                type: "string",
            },
            {
                indexed: false,
                internalType: "string",
                name: "value",
                type: "string",
            },
        ],
        name: "Set",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "SetReverse",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
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
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
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
        name: "BATCH_LIMIT",
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
                internalType: "string",
                name: "key",
                type: "string",
            },
        ],
        name: "addKey",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "addProxyReader",
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
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "depositData",
                type: "bytes",
            },
        ],
        name: "deposit",
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
        name: "depositToPolygon",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "exists",
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
                name: "key",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "get",
        outputs: [
            {
                internalType: "string",
                name: "value",
                type: "string",
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
        name: "getApproved",
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
                name: "keyHash",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getByHash",
        outputs: [
            {
                internalType: "string",
                name: "key",
                type: "string",
            },
            {
                internalType: "string",
                name: "value",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "keyHash",
                type: "uint256",
            },
        ],
        name: "getKey",
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
                internalType: "uint256[]",
                name: "hashes",
                type: "uint256[]",
            },
        ],
        name: "getKeys",
        outputs: [
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string[]",
                name: "keys",
                type: "string[]",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getMany",
        outputs: [
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "keyHashes",
                type: "uint256[]",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getManyByHash",
        outputs: [
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
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "mintingManager",
                type: "address",
            },
            {
                internalType: "address",
                name: "cnsRegistry",
                type: "address",
            },
            {
                internalType: "address",
                name: "rootChainManager",
                type: "address",
            },
            {
                internalType: "address",
                name: "childChainManager",
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
                name: "owner",
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
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "isApprovedOrOwner",
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
                name: "user",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "mint",
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
            {
                internalType: "string",
                name: "uri",
                type: "string",
            },
        ],
        name: "mintTLD",
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
            {
                internalType: "bool",
                name: "withReverse",
                type: "bool",
            },
        ],
        name: "mintWithRecords",
        outputs: [],
        stateMutability: "nonpayable",
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
                internalType: "string[]",
                name: "labels",
                type: "string[]",
            },
        ],
        name: "namehash",
        outputs: [
            {
                internalType: "uint256",
                name: "hash",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "reconfigure",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "removeReverse",
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
        name: "reset",
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
        name: "resolverOf",
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
                name: "addr",
                type: "address",
            },
        ],
        name: "reverseNameOf",
        outputs: [
            {
                internalType: "string",
                name: "reverseUri",
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
                name: "addr",
                type: "address",
            },
        ],
        name: "reverseOf",
        outputs: [
            {
                internalType: "uint256",
                name: "reverse",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "root",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
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
                name: "tokenId",
                type: "uint256",
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
                name: "tokenId",
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
                internalType: "string",
                name: "key",
                type: "string",
            },
            {
                internalType: "string",
                name: "value",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "set",
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
                internalType: "uint256",
                name: "keyHash",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "value",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "setByHash",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "setMany",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "keyHashes",
                type: "uint256[]",
            },
            {
                internalType: "string[]",
                name: "values",
                type: "string[]",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "setManyByHash",
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
        name: "setOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string[]",
                name: "labels",
                type: "string[]",
            },
        ],
        name: "setReverse",
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
        inputs: [],
        name: "symbol",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
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
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
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
            {
                internalType: "bool",
                name: "withReverse",
                type: "bool",
            },
        ],
        name: "unlockWithRecords",
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
        name: "upgradeAll",
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
        inputs: [
            {
                internalType: "bytes",
                name: "inputData",
                type: "bytes",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
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
        name: "withdrawFromPolygon",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5061514e806100206000396000f3fe608060405234801561001057600080fd5b506004361061038e5760003560e01c80637e37479e116101de578063b88d4fde1161010f578063e985e9c5116100ad578063f5c1f76e1161007c578063f5c1f76e1461084f578063f7df5c6014610862578063f8c8765e14610875578063ffa1ad741461088857600080fd5b8063e985e9c5146107f1578063ebf0c7171461082d578063ec129eea14610834578063f25eb5c11461084757600080fd5b8063bebec6b4116100e9578063bebec6b4146107a5578063c87b56dd146107b8578063ce92b33e146107cb578063cf2c52cb146107de57600080fd5b8063b88d4fde1461076c578063ba5d40b71461077f578063bb5b27e11461079257600080fd5b8063a3f4df7e1161017c578063ac9650d811610156578063ac9650d814610705578063ae31844a14610725578063b3f9e4cb14610738578063b85afd281461074b57600080fd5b8063a3f4df7e146106b3578063a4247400146106df578063ab3b87fe146106f257600080fd5b80639559c0bd116101b85780639559c0bd1461067d57806395d89b411461068557806399e0dd7c1461068d578063a22cb465146106a057600080fd5b80637e37479e1461064457806394d008ef146106575780639508b1c41461066a57600080fd5b806342842e0e116102c35780635096023911610261578063663f7b2a11610230578063663f7b2a146105dc578063672b9f81146105ef5780636ccbae5f1461061057806370a082311461063157600080fd5b80635096023914610587578063572b6c051461059a5780636352211e146105b6578063638e5c78146105c957600080fd5b806347c816991161029d57806347c816991461053b5780634a72584d1461054e5780634f558e791461056157806350382c1a1461057457600080fd5b806342842e0e1461050257806342966c6814610515578063430c20811461052857600080fd5b80631bf7e13e11610330578063276fabb11161030a578063276fabb1146104a857806327f18975146104c9578063310bd74b146104dc57806340c10f19146104ef57600080fd5b80631bf7e13e1461046f5780631f71be061461048257806323b872dd1461049557600080fd5b8063095ea7b31161036c578063095ea7b3146103fb578063150b7a02146104105780631bd8cc1a1461043c5780631be5e7ed1461045c57600080fd5b806301ffc9a71461039357806306fdde03146103bb578063081812fc146103d0575b600080fd5b6103a66103a13660046146d0565b6108ac565b60405190151581526020015b60405180910390f35b6103c36108bd565b6040516103b29190614c5b565b6103e36103de3660046148fe565b61094f565b6040516001600160a01b0390911681526020016103b2565b61040e61040936600461444b565b610976565b005b61042361041e36600461423d565b61098f565b6040516001600160e01b031990911681526020016103b2565b61044f61044a36600461457e565b610aea565b6040516103b29190614bf6565b6103c361046a366004614838565b610c0a565b6103c361047d36600461489f565b610c55565b61040e610490366004614316565b610d60565b61040e6104a33660046141fd565b610e08565b6104bb6104b63660046144cf565b610e5b565b6040519081526020016103b2565b61040e6104d736600461450e565b610e6a565b61040e6104ea3660046148fe565b610eb2565b61040e6104fd36600461444b565b610eed565b61040e6105103660046141fd565b610f3a565b61040e6105233660046148fe565b610f55565b6103a661053636600461444b565b610f99565b61040e6105493660046147da565b610fa5565b61040e61055c366004614946565b610fe4565b6103a661056f3660046148fe565b61102a565b61040e61058236600461486d565b611049565b61040e610595366004614132565b61107f565b6103a66105a8366004614132565b6001600160a01b0316301490565b6103e36105c43660046148fe565b6110df565b61040e6105d73660046148fe565b61113f565b61040e6105ea3660046145c7565b61118a565b6106026105fd366004614996565b6111c4565b6040516103b2929190614c6e565b6104bb61061e3660046148fe565b6000908152610100602052604090205490565b6104bb61063f366004614132565b6111dc565b6104bb610652366004614132565b611262565b61040e610665366004614476565b611293565b61040e610678366004614708565b6112e2565b6104bb601481565b6103c3611369565b61040e61069b3660046147a7565b611378565b61040e6106ae3660046143ce565b6113fe565b6103c36040518060400160405280600d81526020016c554e533a20526567697374727960981b81525081565b6103a66106ed36600461489f565b611410565b61040e61070036600461444b565b61145b565b6107186107133660046144cf565b6114a0565b6040516103b29190614b95565b61040e6107333660046144cf565b611599565b6103e36107463660046148fe565b611645565b61075e61075936600461457e565b61166f565b6040516103b2929190614c09565b61040e61077a3660046142ad565b6117d7565b61040e61078d366004614316565b61181e565b6103c36107a03660046148fe565b6118a7565b6103c36107b3366004614132565b611949565b6103c36107c63660046148fe565b611a13565b61040e6107d936600461450e565b611a79565b61040e6107ec3660046143f9565b611ab8565b6103a66107ff36600461416a565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006104bb565b61040e61084236600461450e565b611b95565b61040e611bd4565b61044f61085d3660046144cf565b611c5a565b61040e610870366004614916565b611d37565b61040e6108833660046141a2565b611dc8565b6103c360405180604001604052806005815260200164302e382e3160d81b81525081565b60006108b782611f9e565b92915050565b6060606580546108cc90615029565b80601f01602080910402602001604051908101604052809291908181526020018280546108f890615029565b80156109455780601f1061091a57610100808354040283529160200191610945565b820191906000526020600020905b81548152906001019060200180831161092857829003601f168201915b5050505050905090565b600061095a82611fee565b506000908152606960205260409020546001600160a01b031690565b806109808161204d565b61098a83836120b4565b505050565b60007f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378546001600160a01b03166109c46121d7565b6001600160a01b03161415610a86576109db6121d7565b6001600160a01b03166342966c68856040518263ffffffff1660e01b8152600401610a0891815260200190565b600060405180830381600087803b158015610a2257600080fd5b505af1158015610a36573d6000803e3d6000fd5b505050821580159150610a505750610a508284018461469e565b15610a6e57610a5f30856121e6565b610a698585612334565b610a78565b610a7885856121e6565b50630a85bd0160e11b610ae1565b60405162461bcd60e51b815260206004820152602560248201527f52656769737472793a204552433732315f524543454956494e475f50524f4849604482015264109255115160da1b60648201526084015b60405180910390fd5b95945050505050565b6060826001600160401b03811115610b1257634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610b4557816020015b6060815260200190600190039081610b305790505b50905060005b83811015610c0257610bc4858583818110610b7657634e487b7160e01b600052603260045260246000fd5b9050602002810190610b889190614e02565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508792506123df915050565b828281518110610be457634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080610bfa9061505e565b915050610b4b565b509392505050565b6060610c4d84848080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508692506123df915050565b949350505050565b606060005a9050610c67858585611410565b610cc35760405162461bcd60e51b815260206004820152602760248201527f554e535265676973747279466f727761726465723a205349474e41545552455f6044820152661253959053125160ca1b6064820152608401610ad8565b610d55610cd36020870187614132565b30604088013584610ce760608b018b614e02565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b908190840183828082843760009201919091525061241492505050565b9150505b9392505050565b610134546001600160a01b0316610d756121d7565b6001600160a01b031614610d9b5760405162461bcd60e51b8152600401610ad890614d2e565b6000610daf610daa888a614f51565b612503565b509050610dbb81612569565b610dce610dc7826110df565b8a836125d6565b610ddb868686868561277d565b8115610dfd57610dfd8982610df8610df38b8d614f51565b612807565b6128a4565b505050505050505050565b80610e1a610e146121d7565b826128e6565b610e365760405162461bcd60e51b8152600401610ad890614c93565b81610e408161204d565b610e4983612569565b610e548585856125d6565b5050505050565b6000610c02610daa8385614f51565b80610e76610e146121d7565b610e925760405162461bcd60e51b8152600401610ad890614c93565b81610e9c8161204d565b610ea98787878787612964565b50505050505050565b80610ebe610e146121d7565b610eda5760405162461bcd60e51b8152600401610ad890614c93565b81610ee48161204d565b61098a83612569565b610ef56129e3565b6001600160a01b0316610f066121d7565b6001600160a01b031614610f2c5760405162461bcd60e51b8152600401610ad890614dc0565b610f3682826121e6565b5050565b61098a838383604051806020016040528060008152506117d7565b80610f61610e146121d7565b610f7d5760405162461bcd60e51b8152600401610ad890614c93565b81610f878161204d565b610f9083612569565b61098a83612af6565b6000610d5983836128e6565b80610fb1610e146121d7565b610fcd5760405162461bcd60e51b8152600401610ad890614c93565b81610fd78161204d565b610ea98787878787612b9d565b80610ff0610e146121d7565b61100c5760405162461bcd60e51b8152600401610ad890614c93565b816110168161204d565b61102286868686612c7c565b505050505050565b6000818152606760205260408120546001600160a01b031615156108b7565b61107c8160405160200161105d9190614a60565b6040516020818303038152906040528051906020012060001c82612d1c565b50565b610134546001600160a01b03166110946121d7565b6001600160a01b0316146110ba5760405162461bcd60e51b8152600401610ad890614d2e565b6001600160a01b0316600090815261013660205260409020805460ff19166001179055565b6000818152606760205260408120546001600160a01b0316806108b75760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610ad8565b8061114b610e146121d7565b6111675760405162461bcd60e51b8152600401610ad890614c93565b6111796111726121d7565b30846125d6565b610f366111846121d7565b83612334565b600061119582612503565b5090506111a181612d48565b6111aa8161204d565b610f366111b56121d7565b826111bf85612807565b612db8565b6060806111d18484612e45565b909590945092505050565b60006001600160a01b0382166112465760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610ad8565b506001600160a01b031660009081526068602052604090205490565b6001600160a01b0381166000908152610135602052604081205461128581612e66565b61128d578091505b50919050565b61129b6129e3565b6001600160a01b03166112ac6121d7565b6001600160a01b0316146112d25760405162461bcd60e51b8152600401610ad890614dc0565b6112dc84846121e6565b50505050565b6112ec8787612eb0565b6112f46121d7565b6001600160a01b0316611306866110df565b6001600160a01b03161461135c5760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610ad8565b610ea9848484848961277d565b6060606680546108cc90615029565b610134546001600160a01b031661138d6121d7565b6001600160a01b0316146113b35760405162461bcd60e51b8152600401610ad890614d2e565b6113c06101338383613eaa565b507f4b120d6a959a84a520fa48f5f937cca0e79129423487af7901213b5d2e89313b82826040516113f2929190614c47565b60405180910390a15050565b610f366114096121d7565b8383612f1f565b6000610c4d61141e85614f5e565b3085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612fee92505050565b80611467610e146121d7565b6114835760405162461bcd60e51b8152600401610ad890614c93565b8161148d8161204d565b6112dc611499846110df565b85856125d6565b606060006114ae8385614edc565b9050303314156115905760005b8381101561158e576115506114ce6121d7565b6114d6613146565b8787858181106114f657634e487b7160e01b600052603260045260246000fd5b90506020028101906115089190614e02565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052506040805160208101909152908152925061315b915050565b82828151811061157057634e487b7160e01b600052603260045260246000fd5b602002602001018190525080806115869061505e565b9150506114bb565b505b610c4d8161318b565b610134546001600160a01b03166115ae6121d7565b6001600160a01b0316146115d45760405162461bcd60e51b8152600401610ad890614d2e565b60005b8181101561098a576001610137600085858581811061160657634e487b7160e01b600052603260045260246000fd5b90506020020135815260200190815260200160002060006101000a81548160ff021916908315150217905550808061163d9061505e565b9150506115d7565b6000818152606760205260408120546001600160a01b03166116685760006108b7565b3092915050565b606080836001600160401b0381111561169857634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156116cb57816020015b60608152602001906001900390816116b65790505b509150836001600160401b038111156116f457634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561172757816020015b60608152602001906001900390816117125790505b50905060005b848110156117ce5761176586868381811061175857634e487b7160e01b600052603260045260246000fd5b9050602002013585612e45565b84838151811061178557634e487b7160e01b600052603260045260246000fd5b602002602001018484815181106117ac57634e487b7160e01b600052603260045260246000fd5b60200260200101829052829052505080806117c69061505e565b91505061172d565b50935093915050565b816117e3610e146121d7565b6117ff5760405162461bcd60e51b8152600401610ad890614c93565b826118098161204d565b61181284612569565b611022868686866132e0565b610134546001600160a01b03166118336121d7565b6001600160a01b0316146118595760405162461bcd60e51b8152600401610ad890614d2e565b600080611869610daa898b614f51565b9150915061187681613313565b61188e8a83611888610df38c8e614f51565b86613373565b61189b878787878661277d565b50505050505050505050565b600081815260c9602052604090208054606091906118c490615029565b80601f01602080910402602001604051908101604052809291908181526020018280546118f090615029565b801561193d5780601f106119125761010080835404028352916020019161193d565b820191906000526020600020905b81548152906001019060200180831161192057829003601f168201915b50505050509050919050565b6001600160a01b0381166000908152610135602052604090205460609061196f81612e66565b61128d57600081815261013860205260409020805461198d90615029565b80601f01602080910402602001604051908101604052809291908181526020018280546119b990615029565b8015611a065780601f106119db57610100808354040283529160200191611a06565b820191906000526020600020905b8154815290600101906020018083116119e957829003601f168201915b5050505050915050919050565b6060611a1e82611fee565b6000611a286133c6565b90506000815111611a485760405180602001604052806000815250610d59565b80611a52846133d6565b604051602001611a63929190614b07565b6040516020818303038152906040529392505050565b80611a85610e146121d7565b611aa15760405162461bcd60e51b8152600401610ad890614c93565b81611aab8161204d565b610ea9878787878761277d565b7f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87546001600160a01b0316611aeb6121d7565b6001600160a01b031614611b115760405162461bcd60e51b8152600401610ad890614dc0565b6020811415611b34576000611b28828401846148fe565b90506112dc84826121e6565b6000611b428284018461460c565b805190915060005b8181101561102257611b8386848381518110611b7657634e487b7160e01b600052603260045260246000fd5b60200260200101516121e6565b80611b8d8161505e565b915050611b4a565b80611ba1610e146121d7565b611bbd5760405162461bcd60e51b8152600401610ad890614c93565b81611bc78161204d565b610ea987878787876134ef565b6000611bde6121d7565b6001600160a01b03811660009081526101356020526040902054909150611c515760405162461bcd60e51b815260206004820152602160248201527f52656769737472793a20524556455253455f5245434f52445f49535f454d50546044820152605960f81b6064820152608401610ad8565b61107c81613505565b6060816001600160401b03811115611c8257634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015611cb557816020015b6060815260200190600190039081611ca05790505b50905060005b82811015611d3057611cf2848483818110611ce657634e487b7160e01b600052603260045260246000fd5b905060200201356118a7565b828281518110611d1257634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080611d289061505e565b915050611cbb565b5092915050565b610134546001600160a01b0316611d4c6121d7565b6001600160a01b031614611d725760405162461bcd60e51b8152600401610ad890614d2e565b61013454611d89906001600160a01b0316846121e6565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39528383604051611dbb929190614c47565b60405180910390a2505050565b600054610100900460ff1615808015611de85750600054600160ff909116105b80611e025750303b158015611e02575060005460ff166001145b611e655760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610ad8565b6000805460ff191660011790558015611e88576000805461ff0019166101001790555b61013480546001600160a01b0319166001600160a01b038716179055837f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec9237880546001600160a01b0319166001600160a01b03929092169190911790556040805180820182526013815272556e73746f707061626c6520446f6d61696e7360681b60208083019190915282518084019093526002835261155160f21b90830152611f309161354a565b611f38613598565b611f40613598565b611f49836135c1565b611f52826135f1565b8015610e54576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050505050565b60006001600160e01b031982166380ac58cd60e01b1480611fcf57506001600160e01b03198216635b5e139f60e01b145b806108b757506301ffc9a760e01b6001600160e01b03198316146108b7565b6000818152606760205260409020546001600160a01b031661107c5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610ad8565b303314156120ab5761205d613146565b811461107c5760405162461bcd60e51b815260206004820152601760248201527f52656769737472793a20544f4b454e5f494e56414c49440000000000000000006044820152606401610ad8565b61107c81613621565b60006120bf826110df565b9050806001600160a01b0316836001600160a01b0316141561212d5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610ad8565b806001600160a01b031661213f6121d7565b6001600160a01b0316148061215b575061215b816107ff6121d7565b6121cd5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610ad8565b61098a838361364f565b60006121e16136bd565b905090565b6001600160a01b03821661223c5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610ad8565b6000818152606760205260409020546001600160a01b0316156122a15760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610ad8565b6122ad600083836136d9565b6001600160a01b03821660009081526068602052604081208054600192906122d6908490614e99565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600061233e6129e3565b905061234a818361364f565b6000805160206150fb83398151915254604080516020808201869052825180830390910181528183019283905263e3dec8fb60e01b9092526001600160a01b0390921691829163e3dec8fb916123a7918891309190604401614b36565b600060405180830381600087803b1580156123c157600080fd5b505af11580156123d5573d6000803e3d6000fd5b5050505050505050565b6060610d59836040516020016123f59190614a60565b6040516020818303038152906040528051906020012060001c8361371a565b606061241f85613621565b600080876001600160a01b0316866124398b8a898961315b565b6040516124469190614a60565b60006040518083038160008787f1925050503d8060008114612484576040519150601f19603f3d011682016040523d82523d6000602084013e612489565b606091505b50909250905061249a603f87614eb1565b5a116124b657634e487b7160e01b600052600160045260246000fd5b6124f682826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c45440000000000008152506137fc565b9998505050505050505050565b805160009081905b80156125635782915061254f8285612524600185614ec5565b8151811061254257634e487b7160e01b600052603260045260246000fd5b6020026020010151613835565b92508061255b81615012565b91505061250b565b50915091565b612572816138e2565b60405160200161258491815260200190565b60408051601f198184030181528282528051602091820120600085815260cb9092529181209190915582917f185c30856dadb58bf097c1f665a52ada7029752dbcad008ea3fefc73bee8c9fe9190a250565b826001600160a01b03166125e9826110df565b6001600160a01b03161461264d5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610ad8565b6001600160a01b0382166126af5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610ad8565b6126ba8383836136d9565b6126c560008261364f565b6001600160a01b03831660009081526068602052604081208054600192906126ee908490614ec5565b90915550506001600160a01b038216600090815260686020526040812080546001929061271c908490614e99565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60005b84811015611022576127f58686838181106127ab57634e487b7160e01b600052603260045260246000fd5b90506020028101906127bd9190614e02565b8686858181106127dd57634e487b7160e01b600052603260045260246000fd5b90506020028101906127ef9190614e02565b86612b9d565b806127ff8161505e565b915050612780565b606060008260008151811061282c57634e487b7160e01b600052603260045260246000fd5b602002602001015190506000600190505b8351811015611d30578184828151811061286757634e487b7160e01b600052603260045260246000fd5b6020026020010151604051602001612880929190614abb565b6040516020818303038152906040529150808061289c9061505e565b91505061283d565b61dead6001600160a01b038416148015906128d657506001600160a01b03831660009081526101356020526040902054155b1561098a5761098a838383612db8565b6000806128f2836110df565b9050806001600160a01b0316846001600160a01b0316148061293957506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b80610c4d5750836001600160a01b03166129528461094f565b6001600160a01b031614949350505050565b60005b84811015611022576129d186868381811061299257634e487b7160e01b600052603260045260246000fd5b905060200201358585848181106129b957634e487b7160e01b600052603260045260246000fd5b90506020028101906129cb9190614e02565b85612c7c565b806129db8161505e565b915050612967565b6000806000805160206150fb8339815191525460405163721804d360e11b81523060048201526001600160a01b039091169150600090829063e43009a69060240160206040518083038186803b158015612a3c57600080fd5b505afa158015612a50573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a7491906146b8565b60405163e66f960360e01b8152600481018290529091506001600160a01b0383169063e66f96039060240160206040518083038186803b158015612ab757600080fd5b505afa158015612acb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612aef919061414e565b9250505090565b6000612b01826110df565b9050612b0f816000846136d9565b612b1a60008361364f565b6001600160a01b0381166000908152606860205260408120805460019290612b43908490614ec5565b909155505060008281526067602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60008585604051602001612bb2929190614af7565b60408051601f198184030181528282528051602091820120601f8901829004820284018201909252878352909250612c069183918990899081908401838280828437600092019190915250612d1c92505050565b6110228187878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b01819004810282018101909252898152925089915088908190840183828082843760009201919091525088925061390e915050565b612c8584613a49565b612cd15760405162461bcd60e51b815260206004820152601c60248201527f5265636f726453746f726167653a204b45595f4e4f545f464f554e44000000006044820152606401610ad8565b6112dc84612cde866118a7565b85858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525087925061390e915050565b612d2582613a49565b610f3657600082815260c960209081526040909120825161098a92840190613f2a565b612d506121d7565b6001600160a01b0316612d62826110df565b6001600160a01b03161461107c5760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610ad8565b6000828152610138602052604090208054612dd290615029565b15159050612dfc576000828152610138602090815260409091208251612dfa92840190613f2a565b505b6001600160a01b03831660008181526101356020526040808220859055518492917feb76a21470988c474a21f690cc28fee1ed511bd812dc3c21fd0f49c5e5d4708a91a3505050565b606080612e51846118a7565b9150612e5d848461371a565b90509250929050565b6000818152610137602052604081205460ff1680156108b757506101366000612e8d6121d7565b6001600160a01b0316815260208101919091526040016000205460ff1692915050565b6000805160206150fb83398151915254604051633805550f60e01b81526001600160a01b03909116908190633805550f90612ef19086908690600401614c47565b600060405180830381600087803b158015612f0b57600080fd5b505af1158015610ea9573d6000803e3d6000fd5b816001600160a01b0316836001600160a01b03161415612f815760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610ad8565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f9060240160206040518083038186803b15801561303057600080fd5b505afa158015613044573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061306891906146b8565b905060006131168660600151805190602001208688602001516040516020016130b69392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b905081866020015114801561313c5750855161313c906001600160a01b03168286613a6f565b9695505050505050565b6000303314156131585750601f193601355b90565b606082858560405160200161317293929190614a7c565b6040516020818303038152906040529050949350505050565b606081516001600160401b038111156131b457634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156131e757816020015b60608152602001906001900390816131d25790505b50905060005b825181101561128d57600080306001600160a01b031685848151811061322357634e487b7160e01b600052603260045260246000fd5b60200260200101516040516132389190614a60565b600060405180830381855af49150503d8060008114613273576040519150601f19603f3d011682016040523d82523d6000602084013e613278565b606091505b50915091506132a0828260405180606001604052806027815260200161511b602791396137fc565b8484815181106132c057634e487b7160e01b600052603260045260246000fd5b6020026020010181905250505080806132d89061505e565b9150506131ed565b6132eb8484846125d6565b6132f784848484613bbf565b6112dc5760405162461bcd60e51b8152600401610ad890614cdc565b6000818152610137602052604090205460ff161561107c5760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a20544f4b454e5f555047524144454400000000000000006044820152606401610ad8565b61337d84846121e6565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c3952836040516133ad9190614c5b565b60405180910390a280156112dc576112dc8484846128a4565b606061013380546108cc90615029565b6060816133fa5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115613424578061340e8161505e565b915061341d9050600a83614eb1565b91506133fe565b6000816001600160401b0381111561344c57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015613476576020820181803683370190505b5090505b8415610c4d5761348b600183614ec5565b9150613498600a86615079565b6134a3906030614e99565b60f81b8183815181106134c657634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506134e8600a86614eb1565b945061347a565b6134f881612569565b610e54858585858561277d565b6001600160a01b03811660008181526101356020526040808220829055517ffcf5eec0cfa3e6332f5f0e63ec242d71f866a61d121d6cdf5c2eb3b668a26c4f9190a250565b600054610100900460ff166135715760405162461bcd60e51b8152600401610ad890614d75565b8151613584906065906020850190613f2a565b50805161098a906066906020840190613f2a565b600054610100900460ff166135bf5760405162461bcd60e51b8152600401610ad890614d75565b565b600054610100900460ff166135e85760405162461bcd60e51b8152600401610ad890614d75565b61107c81613cd0565b600054610100900460ff166136185760405162461bcd60e51b8152600401610ad890614d75565b61107c81613d29565b6000818152610100602052604090205461363c906001614e99565b6000918252610100602052604090912055565b600081815260696020526040902080546001600160a01b0319166001600160a01b0384169081179091558190613684826110df565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000303314156136d4575060331936013560601c90565b503390565b6001600160a01b0382166136f0576136f081613313565b6001600160a01b0383166000908152610135602052604090205481141561098a5761098a83613505565b606061372582612e66565b1561373f57506040805160208101909152600081526108b7565b60ca600061374c846138e2565b81526020019081526020016000206000848152602001908152602001600020805461377690615029565b80601f01602080910402602001604051908101604052809291908181526020018280546137a290615029565b80156137ef5780601f106137c4576101008083540402835291602001916137ef565b820191906000526020600020905b8154815290600101906020018083116137d257829003601f168201915b5050505050905092915050565b6060831561380b575081610d59565b82511561381b5782518084602001fd5b8160405162461bcd60e51b8152600401610ad89190614c5b565b60008151600014156138815760405162461bcd60e51b815260206004820152601560248201527452656769737472793a204c4142454c5f454d50545960581b6044820152606401610ad8565b82826040516020016138939190614a60565b604051602081830303815290604052805190602001206040516020016138c3929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b600081815260cb60205260408120541561390a57600082815260cb60205260409020546108b7565b5090565b60ca600061391b836138e2565b81526020019081526020016000206000858152602001908152602001600020805461394590615029565b1515905061399c578260405161395b9190614a60565b6040518091039020817f7ae4f661958fbecc2f77be6b0eb280d2a6f604b29e1e7221c82b9da0c4af7f86856040516139939190614c5b565b60405180910390a35b8160ca60006139aa846138e2565b8152602001908152602001600020600086815260200190815260200160002090805190602001906139dc929190613f2a565b50816040516139eb9190614a60565b604051809103902083604051613a019190614a60565b6040518091039020827f851ffe8e74d5015261dba0a1f9e1b0e5d42c5af5d2ad1908fee897c7d80a0d928686604051613a3b929190614c6e565b60405180910390a450505050565b600081815260c9602052604081208054829190613a6590615029565b9050119050919050565b6000806000613a7e8585613d77565b90925090506000816004811115613aa557634e487b7160e01b600052602160045260246000fd5b148015613ac35750856001600160a01b0316826001600160a01b0316145b15613ad357600192505050610d59565b600080876001600160a01b0316631626ba7e60e01b8888604051602401613afb929190614c2e565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051613b399190614a60565b600060405180830381855afa9150503d8060008114613b74576040519150601f19603f3d011682016040523d82523d6000602084013e613b79565b606091505b5091509150818015613b8c575080516020145b8015613bb357508051630b135d3f60e11b90613bb190830160209081019084016146b8565b145b98975050505050505050565b60006001600160a01b0384163b15613cc857836001600160a01b031663150b7a02613be86121d7565b8786866040518563ffffffff1660e01b8152600401613c0a9493929190614b62565b602060405180830381600087803b158015613c2457600080fd5b505af1925050508015613c54575060408051601f3d908101601f19168201909252613c51918101906146ec565b60015b613cae573d808015613c82576040519150601f19603f3d011682016040523d82523d6000602084013e613c87565b606091505b508051613ca65760405162461bcd60e51b8152600401610ad890614cdc565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610c4d565b506001610c4d565b600054610100900460ff16613cf75760405162461bcd60e51b8152600401610ad890614d75565b806000805160206150fb8339815191525b80546001600160a01b0319166001600160a01b039290921691909117905550565b600054610100900460ff16613d505760405162461bcd60e51b8152600401610ad890614d75565b807f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87613d08565b600080825160411415613dae5760208301516040840151606085015160001a613da287828585613dbd565b94509450505050613db6565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613df45750600090506003613ea1565b8460ff16601b14158015613e0c57508460ff16601c14155b15613e1d5750600090506004613ea1565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613e71573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613e9a57600060019250925050613ea1565b9150600090505b94509492505050565b828054613eb690615029565b90600052602060002090601f016020900481019282613ed85760008555613f1e565b82601f10613ef15782800160ff19823516178555613f1e565b82800160010185558215613f1e579182015b82811115613f1e578235825591602001919060010190613f03565b5061390a929150613f9e565b828054613f3690615029565b90600052602060002090601f016020900481019282613f585760008555613f1e565b82601f10613f7157805160ff1916838001178555613f1e565b82800160010185558215613f1e579182015b82811115613f1e578251825591602001919060010190613f83565b5b8082111561390a5760008155600101613f9f565b6000613fc6613fc184614e76565b614e46565b9050808382526020808301915083868660051b86011115613fe657600080fd5b6000805b878110156140265782356001600160401b03811115614007578283fd5b6140138a828a016140c8565b8652509383019391830191600101613fea565b50505050509392505050565b60008083601f840112614043578182fd5b5081356001600160401b03811115614059578182fd5b6020830191508360208260051b8501011115613db657600080fd5b8035801515811461408457600080fd5b919050565b60008083601f84011261409a578182fd5b5081356001600160401b038111156140b0578182fd5b602083019150836020828501011115613db657600080fd5b600082601f8301126140d8578081fd5b81356001600160401b038111156140f1576140f16150b9565b614104601f8201601f1916602001614e46565b818152846020838601011115614118578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215614143578081fd5b8135610d59816150cf565b60006020828403121561415f578081fd5b8151610d59816150cf565b6000806040838503121561417c578081fd5b8235614187816150cf565b91506020830135614197816150cf565b809150509250929050565b600080600080608085870312156141b7578182fd5b84356141c2816150cf565b935060208501356141d2816150cf565b925060408501356141e2816150cf565b915060608501356141f2816150cf565b939692955090935050565b600080600060608486031215614211578081fd5b833561421c816150cf565b9250602084013561422c816150cf565b929592945050506040919091013590565b600080600080600060808688031215614254578283fd5b853561425f816150cf565b9450602086013561426f816150cf565b93506040860135925060608601356001600160401b03811115614290578182fd5b61429c88828901614089565b969995985093965092949392505050565b600080600080608085870312156142c2578182fd5b84356142cd816150cf565b935060208501356142dd816150cf565b92506040850135915060608501356001600160401b038111156142fe578182fd5b61430a878288016140c8565b91505092959194509250565b60008060008060008060008060a0898b031215614331578586fd5b883561433c816150cf565b975060208901356001600160401b0380821115614357578788fd5b6143638c838d01614032565b909950975060408b013591508082111561437b578485fd5b6143878c838d01614032565b909750955060608b013591508082111561439f578485fd5b506143ac8b828c01614032565b90945092506143bf905060808a01614074565b90509295985092959890939650565b600080604083850312156143e0578182fd5b82356143eb816150cf565b9150612e5d60208401614074565b60008060006040848603121561440d578081fd5b8335614418816150cf565b925060208401356001600160401b03811115614432578182fd5b61443e86828701614089565b9497909650939450505050565b6000806040838503121561445d578182fd5b8235614468816150cf565b946020939093013593505050565b6000806000806060858703121561448b578182fd5b8435614496816150cf565b93506020850135925060408501356001600160401b038111156144b7578283fd5b6144c387828801614089565b95989497509550505050565b600080602083850312156144e1578182fd5b82356001600160401b038111156144f6578283fd5b61450285828601614032565b90969095509350505050565b600080600080600060608688031215614525578283fd5b85356001600160401b038082111561453b578485fd5b61454789838a01614032565b9097509550602088013591508082111561455f578485fd5b5061456c88828901614032565b96999598509660400135949350505050565b600080600060408486031215614592578081fd5b83356001600160401b038111156145a7578182fd5b6145b386828701614032565b909790965060209590950135949350505050565b6000602082840312156145d8578081fd5b81356001600160401b038111156145ed578182fd5b8201601f810184136145fd578182fd5b610c4d84823560208401613fb3565b6000602080838503121561461e578182fd5b82356001600160401b03811115614633578283fd5b8301601f81018513614643578283fd5b8035614651613fc182614e76565b80828252848201915084840188868560051b8701011115614670578687fd5b8694505b83851015614692578035835260019490940193918501918501614674565b50979650505050505050565b6000602082840312156146af578081fd5b610d5982614074565b6000602082840312156146c9578081fd5b5051919050565b6000602082840312156146e1578081fd5b8135610d59816150e4565b6000602082840312156146fd578081fd5b8151610d59816150e4565b60008060008060008060006080888a031215614722578081fd5b87356001600160401b0380821115614738578283fd5b6147448b838c01614089565b909950975060208a0135965060408a0135915080821115614763578283fd5b61476f8b838c01614032565b909650945060608a0135915080821115614787578283fd5b506147948a828b01614032565b989b979a50959850939692959293505050565b600080602083850312156147b9578182fd5b82356001600160401b038111156147ce578283fd5b61450285828601614089565b6000806000806000606086880312156147f1578283fd5b85356001600160401b0380821115614807578485fd5b61481389838a01614089565b9097509550602088013591508082111561482b578485fd5b5061456c88828901614089565b60008060006040848603121561484c578081fd5b83356001600160401b03811115614861578182fd5b6145b386828701614089565b60006020828403121561487e578081fd5b81356001600160401b03811115614893578182fd5b610c4d848285016140c8565b6000806000604084860312156148b3578081fd5b83356001600160401b03808211156148c9578283fd5b90850190608082880312156148dc578283fd5b909350602085013590808211156148f1578283fd5b5061443e86828701614089565b60006020828403121561490f578081fd5b5035919050565b60008060006040848603121561492a578081fd5b8335925060208401356001600160401b03811115614432578182fd5b6000806000806060858703121561495b578182fd5b8435935060208501356001600160401b03811115614977578283fd5b61498387828801614089565b9598909750949560400135949350505050565b600080604083850312156149a8578182fd5b50508035926020909101359150565b600081518084526020808501808196508360051b81019150828601855b858110156149fe5782840389526149ec848351614a34565b988501989350908401906001016149d4565b5091979650505050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60008151808452614a4c816020860160208601614fe6565b601f01601f19169290920160200192915050565b60008251614a72818460208701614fe6565b9190910192915050565b60008451614a8e818460208901614fe6565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b60008351614acd818460208801614fe6565b601760f91b9083019081528351614aeb816001840160208801614fe6565b01600101949350505050565b8183823760009101908152919050565b60008351614b19818460208801614fe6565b835190830190614b2d818360208801614fe6565b01949350505050565b6001600160a01b03848116825283166020820152606060408201819052600090610ae190830184614a34565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061313c90830184614a34565b6000602080830181845280855180835260408601915060408160051b8701019250838701855b82811015614be957603f19888603018452614bd7858351614a34565b94509285019290850190600101614bbb565b5092979650505050505050565b602081526000610d5960208301846149b7565b604081526000614c1c60408301856149b7565b8281036020840152610d5581856149b7565b828152604060208201526000610c4d6040830184614a34565b602081526000610c4d602083018486614a0b565b602081526000610d596020830184614a34565b604081526000614c816040830185614a34565b8281036020840152610d558185614a34565b60208082526029908201527f52656769737472793a2053454e4445525f49535f4e4f545f415050524f5645446040820152682fa7a92fa7aba722a960b91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526027908201527f52656769737472793a2053454e4445525f49535f4e4f545f4d494e54494e475f60408201526626a0a720a3a2a960c91b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60208082526022908201527f52656769737472793a20494e53554646494349454e545f5045524d495353494f6040820152614e5360f01b606082015260800190565b6000808335601e19843603018112614e18578283fd5b8301803591506001600160401b03821115614e31578283fd5b602001915036819003821315613db657600080fd5b604051601f8201601f191681016001600160401b0381118282101715614e6e57614e6e6150b9565b604052919050565b60006001600160401b03821115614e8f57614e8f6150b9565b5060051b60200190565b60008219821115614eac57614eac61508d565b500190565b600082614ec057614ec06150a3565b500490565b600082821015614ed757614ed761508d565b500390565b6000614eea613fc184614e76565b808482526020808301925084368760051b87011115614f07578485fd5b845b87811015614f455781356001600160401b03811115614f26578687fd5b614f3236828a016140c8565b8652509382019390820190600101614f09565b50919695505050505050565b6000610d59368484613fb3565b600060808236031215614f6f578081fd5b604051608081016001600160401b038282108183111715614f9257614f926150b9565b8160405284359150614fa3826150cf565b81835260208501356020840152604085013560408401526060850135915080821115614fcd578384fd5b50614fda368286016140c8565b60608301525092915050565b60005b83811015615001578181015183820152602001614fe9565b838111156112dc5750506000910152565b6000816150215761502161508d565b506000190190565b600181811c9082168061503d57607f821691505b6020821081141561128d57634e487b7160e01b600052602260045260246000fd5b60006000198214156150725761507261508d565b5060010190565b600082615088576150886150a3565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461107c57600080fd5b6001600160e01b03198116811461107c57600080fdfebe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a164736f6c6343000804000a";
const isSuperArgs = (xs) => xs.length > 1;
class UNSRegistry__factory extends ethers_1.ContractFactory {
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
exports.UNSRegistry__factory = UNSRegistry__factory;
UNSRegistry__factory.bytecode = _bytecode;
UNSRegistry__factory.abi = _abi;
