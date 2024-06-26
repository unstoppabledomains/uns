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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint64",
                name: "expiry",
                type: "uint64",
            },
        ],
        name: "SetExpiry",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "expiryOf",
        outputs: [
            {
                internalType: "uint64",
                name: "",
                type: "uint64",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "isExpired",
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
                internalType: "uint64",
                name: "expiry",
                type: "uint64",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "setExpiry",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "unlock",
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
const _bytecode = "0x608060405234801561001057600080fd5b506152e6806100206000396000f3fe608060405234801561001057600080fd5b50600436106103af5760003560e01c80637e37479e116101f4578063ba5d40b71161011a578063e985e9c5116100ad578063f5c1f76e1161007c578063f5c1f76e146108d8578063f7df5c60146108eb578063f8c8765e146108fe578063ffa1ad741461091157600080fd5b8063e985e9c51461087a578063ebf0c717146108b6578063ec129eea146108bd578063f25eb5c1146108d057600080fd5b8063c87b56dd116100e9578063c87b56dd1461082e578063ce92b33e14610841578063cf2c52cb14610854578063d9548e531461086757600080fd5b8063ba5d40b7146107b3578063baef73e9146107c6578063bb5b27e114610808578063bebec6b41461081b57600080fd5b8063a22cb46511610192578063ac9650d811610161578063ac9650d81461074c578063b3f9e4cb1461076c578063b85afd281461077f578063b88d4fde146107a057600080fd5b8063a22cb465146106e7578063a3f4df7e146106fa578063a424740014610726578063ab3b87fe1461073957600080fd5b80639508b1c4116101ce5780639508b1c4146106b15780639559c0bd146106c457806395d89b41146106cc57806399e0dd7c146106d457600080fd5b80637e37479e146106785780637eee288d1461068b57806394d008ef1461069e57600080fd5b806342842e0e116102d95780635096023911610277578063663f7b2a11610246578063663f7b2a14610610578063672b9f81146106235780636ccbae5f1461064457806370a082311461066557600080fd5b806350960239146105bb578063572b6c05146105ce5780636352211e146105ea578063638e5c78146105fd57600080fd5b806347c81699116102b357806347c816991461056f5780634a72584d146105825780634f558e791461059557806350382c1a146105a857600080fd5b806342842e0e1461053657806342966c6814610549578063430c20811461055c57600080fd5b80631bf7e13e1161035157806327f189751161032057806327f18975146104ea578063310bd74b146104fd5780633f72ec6e1461051057806340c10f191461052357600080fd5b80631bf7e13e146104905780631f71be06146104a357806323b872dd146104b6578063276fabb1146104c957600080fd5b8063095ea7b31161038d578063095ea7b31461041c578063150b7a02146104315780631bd8cc1a1461045d5780631be5e7ed1461047d57600080fd5b806301ffc9a7146103b457806306fdde03146103dc578063081812fc146103f1575b600080fd5b6103c76103c2366004613f0b565b610935565b60405190151581526020015b60405180910390f35b6103e4610946565b6040516103d39190613f78565b6104046103ff366004613f8b565b6109d8565b6040516001600160a01b0390911681526020016103d3565b61042f61042a366004613fb9565b6109ff565b005b61044461043f366004614026565b610a18565b6040516001600160e01b031990911681526020016103d3565b61047061046b3660046140dc565b610b72565b6040516103d3919061417f565b6103e461048b366004614192565b610c68565b6103e461049e3660046141c9565b610cb3565b61042f6104b1366004614249565b610dbe565b61042f6104c4366004614305565b610e54565b6104dc6104d7366004614346565b610ea7565b6040519081526020016103d3565b61042f6104f8366004614387565b610eb6565b61042f61050b366004613f8b565b610efe565b61042f61051e3660046143fa565b610f39565b61042f610531366004613fb9565b61103b565b61042f610544366004614305565b611088565b61042f610557366004613f8b565b6110a3565b6103c761056a366004613fb9565b6110e7565b61042f61057d366004614424565b6110f3565b61042f610590366004614485565b611132565b6103c76105a3366004613f8b565b611178565b61042f6105b636600461458c565b611197565b61042f6105c93660046145c0565b6111cd565b6103c76105dc3660046145c0565b6001600160a01b0316301490565b6104046105f8366004613f8b565b61122d565b61042f61060b366004613f8b565b61124a565b61042f61061e366004614678565b611295565b6106366106313660046146c0565b611336565b6040516103d39291906146e2565b6104dc610652366004613f8b565b6000908152610100602052604090205490565b6104dc6106733660046145c0565b61134e565b6104dc6106863660046145c0565b6113d4565b61042f610699366004613fb9565b611405565b61042f6106ac366004614707565b61145c565b61042f6106bf366004614762565b6114ab565b6104dc601481565b6103e4611532565b61042f6106e2366004614805565b611541565b61042f6106f536600461483a565b6115c8565b6103e46040518060400160405280600d81526020016c554e533a20526567697374727960981b81525081565b6103c76107343660046141c9565b6115da565b61042f610747366004613fb9565b611625565b61075f61075a366004614346565b61166a565b6040516103d39190614866565b61040461077a366004613f8b565b611746565b61079261078d3660046140dc565b611770565b6040516103d39291906148c8565b61042f6107ae3660046148ed565b611892565b61042f6107c1366004614249565b6118d9565b6107f06107d4366004613f8b565b600090815261013960205260409020546001600160401b031690565b6040516001600160401b0390911681526020016103d3565b6103e4610816366004613f8b565b611962565b6103e46108293660046145c0565b611a04565b6103e461083c366004613f8b565b611ace565b61042f61084f366004614387565b611b34565b61042f610862366004614958565b611b73565b6103c7610875366004613f8b565b611c42565b6103c761088836600461499f565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006104dc565b61042f6108cb366004614387565b611c85565b61042f611cc4565b6104706108e6366004614346565b611d4b565b61042f6108f93660046149d8565b611dfe565b61042f61090c366004614a0a565b611e8f565b6103e460405180604001604052806005815260200164302e392e3160d81b81525081565b600061094082612065565b92915050565b60606065805461095590614a66565b80601f016020809104026020016040519081016040528092919081815260200182805461098190614a66565b80156109ce5780601f106109a3576101008083540402835291602001916109ce565b820191906000526020600020905b8154815290600101906020018083116109b157829003601f168201915b5050505050905090565b60006109e3826120b5565b506000908152606960205260409020546001600160a01b031690565b80610a0981612114565b610a13838361217a565b505050565b60007f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378546001600160a01b0316610a4d61229c565b6001600160a01b031603610b0e57610a6361229c565b6001600160a01b03166342966c68856040518263ffffffff1660e01b8152600401610a9091815260200190565b600060405180830381600087803b158015610aaa57600080fd5b505af1158015610abe573d6000803e3d6000fd5b505050821580159150610ad85750610ad882840184614a9a565b15610af657610ae730856122ab565b610af185856123f9565b610b00565b610b0085856122ab565b50630a85bd0160e11b610b69565b60405162461bcd60e51b815260206004820152602560248201527f52656769737472793a204552433732315f524543454956494e475f50524f4849604482015264109255115160da1b60648201526084015b60405180910390fd5b95945050505050565b6060826001600160401b03811115610b8c57610b8c6144d7565b604051908082528060200260200182016040528015610bbf57816020015b6060815260200190600190039081610baa5790505b50905060005b83811015610c6057610c30858583818110610be257610be2614ab5565b9050602002810190610bf49190614acb565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508792506124a4915050565b828281518110610c4257610c42614ab5565b60200260200101819052508080610c5890614b27565b915050610bc5565b509392505050565b6060610cab84848080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508692506124a4915050565b949350505050565b606060005a9050610cc58585856115da565b610d215760405162461bcd60e51b815260206004820152602760248201527f554e535265676973747279466f727761726465723a205349474e41545552455f6044820152661253959053125160ca1b6064820152608401610b60565b610db3610d3160208701876145c0565b30604088013584610d4560608b018b614acb565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b90819084018382808284376000920191909152506124d992505050565b9150505b9392505050565b610134546001600160a01b0316610dd361229c565b6001600160a01b031614610df95760405162461bcd60e51b8152600401610b6090614b40565b6000610e0d610e08888a614b87565b6125ba565b509050610e1a8982611405565b610e278686868685612612565b8115610e4957610e498982610e44610e3f8b8d614b87565b612680565b612701565b505050505050505050565b80610e66610e6061229c565b82612743565b610e825760405162461bcd60e51b8152600401610b6090614b94565b81610e8c81612114565b610e95836127d4565b610ea0858585612841565b5050505050565b6000610c60610e088385614b87565b80610ec2610e6061229c565b610ede5760405162461bcd60e51b8152600401610b6090614b94565b81610ee881612114565b610ef587878787876129e8565b50505050505050565b80610f0a610e6061229c565b610f265760405162461bcd60e51b8152600401610b6090614b94565b81610f3081612114565b610a13836127d4565b610134546001600160a01b0316610f4e61229c565b6001600160a01b031614610f745760405162461bcd60e51b8152600401610b6090614b40565b610f7d816120b5565b42826001600160401b031611610fd55760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a204558504952595f494e5f5041535400000000000000006044820152606401610b60565b60008181526101396020908152604091829020805467ffffffffffffffff19166001600160401b038616908117909155915191825282917f93feabb03ab84f47fc85bf0c298103fca21d8c8bc376eae0c1e1c56b9d4f7789910160405180910390a25050565b611043612a4b565b6001600160a01b031661105461229c565b6001600160a01b03161461107a5760405162461bcd60e51b8152600401610b6090614bdd565b61108482826122ab565b5050565b610a1383838360405180602001604052806000815250611892565b806110af610e6061229c565b6110cb5760405162461bcd60e51b8152600401610b6090614b94565b816110d581612114565b6110de836127d4565b610a1383612b4c565b6000610db78383612743565b806110ff610e6061229c565b61111b5760405162461bcd60e51b8152600401610b6090614b94565b8161112581612114565b610ef58787878787612bf3565b8061113e610e6061229c565b61115a5760405162461bcd60e51b8152600401610b6090614b94565b8161116481612114565b61117086868686612cd2565b505050505050565b6000818152606760205260408120546001600160a01b03161515610940565b6111ca816040516020016111ab9190614c1f565b6040516020818303038152906040528051906020012060001c82612d72565b50565b610134546001600160a01b03166111e261229c565b6001600160a01b0316146112085760405162461bcd60e51b8152600401610b6090614b40565b6001600160a01b0316600090815261013660205260409020805460ff19166001179055565b600061123882611c42565b6112455761094082612d97565b919050565b80611256610e6061229c565b6112725760405162461bcd60e51b8152600401610b6090614b94565b61128461127d61229c565b3084612841565b61108461128f61229c565b836123f9565b60006112a0826125ba565b5090506112ab61229c565b6001600160a01b03166112bd8261122d565b6001600160a01b0316146113135760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610b60565b61131c81612114565b61108461132761229c565b8261133185612680565b612df7565b6060806113438484612e7e565b909590945092505050565b60006001600160a01b0382166113b85760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610b60565b506001600160a01b031660009081526068602052604090205490565b6001600160a01b038116600090815261013560205260408120546113f781612e9f565b6113ff578091505b50919050565b610134546001600160a01b031661141a61229c565b6001600160a01b0316146114405760405162461bcd60e51b8152600401610b6090614b40565b611449816127d4565b61108461145582612d97565b8383612841565b611464612a4b565b6001600160a01b031661147561229c565b6001600160a01b03161461149b5760405162461bcd60e51b8152600401610b6090614bdd565b6114a584846122ab565b50505050565b6114b58787612ee9565b6114bd61229c565b6001600160a01b03166114cf8661122d565b6001600160a01b0316146115255760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610b60565b610ef58484848489612612565b60606066805461095590614a66565b610134546001600160a01b031661155661229c565b6001600160a01b03161461157c5760405162461bcd60e51b8152600401610b6090614b40565b61013361158a828483614c81565b507f4b120d6a959a84a520fa48f5f937cca0e79129423487af7901213b5d2e89313b82826040516115bc929190614d69565b60405180910390a15050565b6110846115d361229c565b8383612f58565b6000610cab6115e885614d7d565b3085858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061302692505050565b80611631610e6061229c565b61164d5760405162461bcd60e51b8152600401610b6090614b94565b8161165781612114565b6114a561166384612d97565b8585612841565b606060006116788385614e07565b905030330361173d5760005b8381101561173b5761170b61169761229c565b61169f61316f565b8787858181106116b1576116b1614ab5565b90506020028101906116c39190614acb565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525060408051602081019091529081529250613183915050565b82828151811061171d5761171d614ab5565b6020026020010181905250808061173390614b27565b915050611684565b505b610cab816131b3565b6000818152606760205260408120546001600160a01b0316611769576000610940565b3092915050565b606080836001600160401b0381111561178b5761178b6144d7565b6040519080825280602002602001820160405280156117be57816020015b60608152602001906001900390816117a95790505b509150836001600160401b038111156117d9576117d96144d7565b60405190808252806020026020018201604052801561180c57816020015b60608152602001906001900390816117f75790505b50905060005b848110156118895761183c86868381811061182f5761182f614ab5565b9050602002013585612e7e565b84838151811061184e5761184e614ab5565b6020026020010184848151811061186757611867614ab5565b602002602001018290528290525050808061188190614b27565b915050611812565b50935093915050565b8161189e610e6061229c565b6118ba5760405162461bcd60e51b8152600401610b6090614b94565b826118c481612114565b6118cd846127d4565b611170868686866132de565b610134546001600160a01b03166118ee61229c565b6001600160a01b0316146119145760405162461bcd60e51b8152600401610b6090614b40565b600080611924610e08898b614b87565b9150915061193181613311565b6119498a83611943610e3f8c8e614b87565b86613371565b6119568787878786612612565b50505050505050505050565b600081815260c96020526040902080546060919061197f90614a66565b80601f01602080910402602001604051908101604052809291908181526020018280546119ab90614a66565b80156119f85780601f106119cd576101008083540402835291602001916119f8565b820191906000526020600020905b8154815290600101906020018083116119db57829003601f168201915b50505050509050919050565b6001600160a01b03811660009081526101356020526040902054606090611a2a81612e9f565b6113ff576000818152610138602052604090208054611a4890614a66565b80601f0160208091040260200160405190810160405280929190818152602001828054611a7490614a66565b8015611ac15780601f10611a9657610100808354040283529160200191611ac1565b820191906000526020600020905b815481529060010190602001808311611aa457829003601f168201915b5050505050915050919050565b6060611ad9826120b5565b6000611ae36133c4565b90506000815111611b035760405180602001604052806000815250610db7565b80611b0d846133d4565b604051602001611b1e929190614e7a565b6040516020818303038152906040529392505050565b80611b40610e6061229c565b611b5c5760405162461bcd60e51b8152600401610b6090614b94565b81611b6681612114565b610ef58787878787612612565b7f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87546001600160a01b0316611ba661229c565b6001600160a01b031614611bcc5760405162461bcd60e51b8152600401610b6090614bdd565b6020819003611bef576000611be382840184613f8b565b90506114a584826122ab565b6000611bfd82840184614ea9565b805190915060005b8181101561117057611c3086848381518110611c2357611c23614ab5565b60200260200101516122ab565b80611c3a81614b27565b915050611c05565b600081815261013960205260408120546001600160401b03161580159061094057505060009081526101396020526040902054426001600160401b039091161090565b80611c91610e6061229c565b611cad5760405162461bcd60e51b8152600401610b6090614b94565b81611cb781612114565b610ef587878787876134d4565b6000611cce61229c565b6001600160a01b0381166000908152610135602052604081205491925003611d425760405162461bcd60e51b815260206004820152602160248201527f52656769737472793a20524556455253455f5245434f52445f49535f454d50546044820152605960f81b6064820152608401610b60565b6111ca816134ea565b6060816001600160401b03811115611d6557611d656144d7565b604051908082528060200260200182016040528015611d9857816020015b6060815260200190600190039081611d835790505b50905060005b82811015611df757611dc7848483818110611dbb57611dbb614ab5565b90506020020135611962565b828281518110611dd957611dd9614ab5565b60200260200101819052508080611def90614b27565b915050611d9e565b5092915050565b610134546001600160a01b0316611e1361229c565b6001600160a01b031614611e395760405162461bcd60e51b8152600401610b6090614b40565b61013454611e50906001600160a01b0316846122ab565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39528383604051611e82929190614d69565b60405180910390a2505050565b600054610100900460ff1615808015611eaf5750600054600160ff909116105b80611ec95750303b158015611ec9575060005460ff166001145b611f2c5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610b60565b6000805460ff191660011790558015611f4f576000805461ff0019166101001790555b61013480546001600160a01b0319166001600160a01b038716179055837f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec9237880546001600160a01b0319166001600160a01b03929092169190911790556040805180820182526013815272556e73746f707061626c6520446f6d61696e7360681b60208083019190915282518084019093526002835261155160f21b90830152611ff79161352f565b611fff61356f565b61200761356f565b61201083613598565b612019826135c8565b8015610ea0576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050505050565b60006001600160e01b031982166380ac58cd60e01b148061209657506001600160e01b03198216635b5e139f60e01b145b8061094057506301ffc9a760e01b6001600160e01b0319831614610940565b6000818152606760205260409020546001600160a01b03166111ca5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610b60565b3033036121715761212361316f565b81146111ca5760405162461bcd60e51b815260206004820152601760248201527f52656769737472793a20544f4b454e5f494e56414c49440000000000000000006044820152606401610b60565b6111ca816135f8565b600061218582612d97565b9050806001600160a01b0316836001600160a01b0316036121f25760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610b60565b806001600160a01b031661220461229c565b6001600160a01b0316148061222057506122208161088861229c565b6122925760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610b60565b610a138383613626565b60006122a6613694565b905090565b6001600160a01b0382166123015760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610b60565b6000818152606760205260409020546001600160a01b0316156123665760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610b60565b612372600083836136af565b6001600160a01b038216600090815260686020526040812080546001929061239b908490614f39565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000612403612a4b565b905061240f8183613626565b60008051602061529383398151915254604080516020808201869052825180830390910181528183019283905263e3dec8fb60e01b9092526001600160a01b0390921691829163e3dec8fb9161246c918891309190604401614f4c565b600060405180830381600087803b15801561248657600080fd5b505af115801561249a573d6000803e3d6000fd5b5050505050505050565b6060610db7836040516020016124ba9190614c1f565b6040516020818303038152906040528051906020012060001c8361378b565b60606124e4856135f8565b600080876001600160a01b0316866124fe8b8a8989613183565b60405161250b9190614c1f565b60006040518083038160008787f1925050503d8060008114612549576040519150601f19603f3d011682016040523d82523d6000602084013e61254e565b606091505b50909250905061255f603f87614f8e565b5a1161256d5761256d614fa2565b6125ad82826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c454400000000000081525061386d565b9998505050505050505050565b805160009081905b801561260c578291506125f882856125db600185614fb8565b815181106125eb576125eb614ab5565b60200260200101516138a6565b92508061260481614fcb565b9150506125c2565b50915091565b60005b848110156111705761266e86868381811061263257612632614ab5565b90506020028101906126449190614acb565b86868581811061265657612656614ab5565b90506020028101906126689190614acb565b86612bf3565b8061267881614b27565b915050612615565b606060008260008151811061269757612697614ab5565b602002602001015190506000600190505b8351811015611df757818482815181106126c4576126c4614ab5565b60200260200101516040516020016126dd929190614fe2565b604051602081830303815290604052915080806126f990614b27565b9150506126a8565b61dead6001600160a01b0384161480159061273357506001600160a01b03831660009081526101356020526040902054155b15610a1357610a13838383612df7565b60008061274f8361122d565b90506001600160a01b03811615801590610cab5750806001600160a01b0316846001600160a01b031614806127a957506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b80610cab5750836001600160a01b03166127c2846109d8565b6001600160a01b031614949350505050565b6127dd81613952565b6040516020016127ef91815260200190565b60408051601f198184030181528282528051602091820120600085815260cb9092529181209190915582917f185c30856dadb58bf097c1f665a52ada7029752dbcad008ea3fefc73bee8c9fe9190a250565b826001600160a01b031661285482612d97565b6001600160a01b0316146128b85760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610b60565b6001600160a01b03821661291a5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610b60565b6129258383836136af565b612930600082613626565b6001600160a01b0383166000908152606860205260408120805460019290612959908490614fb8565b90915550506001600160a01b0382166000908152606860205260408120805460019290612987908490614f39565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60005b8481101561117057612a39868683818110612a0857612a08614ab5565b90506020020135858584818110612a2157612a21614ab5565b9050602002810190612a339190614acb565b85612cd2565b80612a4381614b27565b9150506129eb565b600080516020615293833981519152546000906001600160a01b03168015612b485760405163721804d360e11b81523060048201526000906001600160a01b0383169063e43009a690602401602060405180830381865afa158015612ab4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ad8919061501e565b60405163e66f960360e01b8152600481018290529091506001600160a01b0383169063e66f960390602401602060405180830381865afa158015612b20573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b449190615037565b9250505b5090565b6000612b5782612d97565b9050612b65816000846136af565b612b70600083613626565b6001600160a01b0381166000908152606860205260408120805460019290612b99908490614fb8565b909155505060008281526067602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60008585604051602001612c08929190615054565b60408051601f198184030181528282528051602091820120601f8901829004820284018201909252878352909250612c5c9183918990899081908401838280828437600092019190915250612d7292505050565b6111708187878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b01819004810282018101909252898152925089915088908190840183828082843760009201919091525088925061397a915050565b612cdb84613aaf565b612d275760405162461bcd60e51b815260206004820152601c60248201527f5265636f726453746f726167653a204b45595f4e4f545f464f554e44000000006044820152606401610b60565b6114a584612d3486611962565b85858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525087925061397a915050565b612d7b82613aaf565b61108457600082815260c960205260409020610a138282615064565b6000818152606760205260408120546001600160a01b0316806109405760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610b60565b6000828152610138602052604090208054612e1190614a66565b9050600003612e3557600082815261013860205260409020612e338282615064565b505b6001600160a01b03831660008181526101356020526040808220859055518492917feb76a21470988c474a21f690cc28fee1ed511bd812dc3c21fd0f49c5e5d4708a91a3505050565b606080612e8a84611962565b9150612e96848461378b565b90509250929050565b6000818152610137602052604081205460ff16801561094057506101366000612ec661229c565b6001600160a01b0316815260208101919091526040016000205460ff1692915050565b60008051602061529383398151915254604051633805550f60e01b81526001600160a01b03909116908190633805550f90612f2a9086908690600401614d69565b600060405180830381600087803b158015612f4457600080fd5b505af1158015610ef5573d6000803e3d6000fd5b816001600160a01b0316836001600160a01b031603612fb95760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610b60565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f90602401602060405180830381865afa15801561306d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613091919061501e565b9050600061313f8660600151805190602001208688602001516040516020016130df9392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b905081866020015114801561316557508551613165906001600160a01b03168286613ad5565b9695505050505050565b60003033036131805750601f193601355b90565b606082858560405160200161319a93929190615123565b6040516020818303038152906040529050949350505050565b606081516001600160401b038111156131ce576131ce6144d7565b60405190808252806020026020018201604052801561320157816020015b60608152602001906001900390816131ec5790505b50905060005b82518110156113ff57600080306001600160a01b031685848151811061322f5761322f614ab5565b60200260200101516040516132449190614c1f565b600060405180830381855af49150503d806000811461327f576040519150601f19603f3d011682016040523d82523d6000602084013e613284565b606091505b50915091506132ac82826040518060600160405280602781526020016152b36027913961386d565b8484815181106132be576132be614ab5565b6020026020010181905250505080806132d690614b27565b915050613207565b6132e9848484612841565b6132f584848484613c17565b6114a55760405162461bcd60e51b8152600401610b6090615162565b6000818152610137602052604090205460ff16156111ca5760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a20544f4b454e5f555047524144454400000000000000006044820152606401610b60565b61337b84846122ab565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c3952836040516133ab9190613f78565b60405180910390a280156114a5576114a5848484612701565b6060610133805461095590614a66565b6060816000036133fb5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115613425578061340f81614b27565b915061341e9050600a83614f8e565b91506133ff565b6000816001600160401b0381111561343f5761343f6144d7565b6040519080825280601f01601f191660200182016040528015613469576020820181803683370190505b5090505b8415610cab5761347e600183614fb8565b915061348b600a866151b4565b613496906030614f39565b60f81b8183815181106134ab576134ab614ab5565b60200101906001600160f81b031916908160001a9053506134cd600a86614f8e565b945061346d565b6134dd816127d4565b610ea08585858585612612565b6001600160a01b03811660008181526101356020526040808220829055517ffcf5eec0cfa3e6332f5f0e63ec242d71f866a61d121d6cdf5c2eb3b668a26c4f9190a250565b600054610100900460ff166135565760405162461bcd60e51b8152600401610b60906151c8565b60656135628382615064565b506066610a138282615064565b600054610100900460ff166135965760405162461bcd60e51b8152600401610b60906151c8565b565b600054610100900460ff166135bf5760405162461bcd60e51b8152600401610b60906151c8565b6111ca81613d1c565b600054610100900460ff166135ef5760405162461bcd60e51b8152600401610b60906151c8565b6111ca81613d75565b60008181526101006020526040902054613613906001614f39565b6000918252610100602052604090912055565b600081815260696020526040902080546001600160a01b0319166001600160a01b038416908117909155819061365b82612d97565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60003033036136aa575060331936013560601c90565b503390565b6001600160a01b0382166136c6576136c681613311565b600081815261013960205260409020546001600160401b031615613761576001600160a01b0382161580159061371557506136ff612a4b565b6001600160a01b0316826001600160a01b031614155b6137615760405162461bcd60e51b815260206004820152601960248201527f52656769737472793a20544f4b454e5f455850495241424c45000000000000006044820152606401610b60565b6001600160a01b03831660009081526101356020526040902054819003610a1357610a13836134ea565b606061379682612e9f565b156137b05750604080516020810190915260008152610940565b60ca60006137bd84613952565b8152602001908152602001600020600084815260200190815260200160002080546137e790614a66565b80601f016020809104026020016040519081016040528092919081815260200182805461381390614a66565b80156138605780601f1061383557610100808354040283529160200191613860565b820191906000526020600020905b81548152906001019060200180831161384357829003601f168201915b5050505050905092915050565b6060831561387c575081610db7565b82511561388c5782518084602001fd5b8160405162461bcd60e51b8152600401610b609190613f78565b600081516000036138f15760405162461bcd60e51b815260206004820152601560248201527452656769737472793a204c4142454c5f454d50545960581b6044820152606401610b60565b82826040516020016139039190614c1f565b60405160208183030381529060405280519060200120604051602001613933929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b600081815260cb602052604081205415612b4857600082815260cb6020526040902054610940565b60ca600061398783613952565b8152602001908152602001600020600085815260200190815260200160002080546139b190614a66565b9050600003613a0957826040516139c89190614c1f565b6040518091039020817f7ae4f661958fbecc2f77be6b0eb280d2a6f604b29e1e7221c82b9da0c4af7f8685604051613a009190613f78565b60405180910390a35b8160ca6000613a1784613952565b815260200190815260200160002060008681526020019081526020016000209081613a429190615064565b5081604051613a519190614c1f565b604051809103902083604051613a679190614c1f565b6040518091039020827f851ffe8e74d5015261dba0a1f9e1b0e5d42c5af5d2ad1908fee897c7d80a0d928686604051613aa19291906146e2565b60405180910390a450505050565b600081815260c9602052604081208054829190613acb90614a66565b9050119050919050565b6000806000613ae48585613dc3565b90925090506000816004811115613afd57613afd615213565b148015613b1b5750856001600160a01b0316826001600160a01b0316145b15613b2b57600192505050610db7565b600080876001600160a01b0316631626ba7e60e01b8888604051602401613b53929190615229565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051613b919190614c1f565b600060405180830381855afa9150503d8060008114613bcc576040519150601f19603f3d011682016040523d82523d6000602084013e613bd1565b606091505b5091509150818015613be4575080516020145b8015613c0b57508051630b135d3f60e11b90613c09908301602090810190840161501e565b145b98975050505050505050565b60006001600160a01b0384163b15613d1457836001600160a01b031663150b7a02613c4061229c565b8786866040518563ffffffff1660e01b8152600401613c629493929190615242565b6020604051808303816000875af1925050508015613c9d575060408051601f3d908101601f19168201909252613c9a91810190615275565b60015b613cfa573d808015613ccb576040519150601f19603f3d011682016040523d82523d6000602084013e613cd0565b606091505b508051600003613cf25760405162461bcd60e51b8152600401610b6090615162565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610cab565b506001610cab565b600054610100900460ff16613d435760405162461bcd60e51b8152600401610b60906151c8565b806000805160206152938339815191525b80546001600160a01b0319166001600160a01b039290921691909117905550565b600054610100900460ff16613d9c5760405162461bcd60e51b8152600401610b60906151c8565b807f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87613d54565b6000808251604103613df95760208301516040840151606085015160001a613ded87828585613e08565b94509450505050613e01565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613e3f5750600090506003613eec565b8460ff16601b14158015613e5757508460ff16601c14155b15613e685750600090506004613eec565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613ebc573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613ee557600060019250925050613eec565b9150600090505b94509492505050565b6001600160e01b0319811681146111ca57600080fd5b600060208284031215613f1d57600080fd5b8135610db781613ef5565b60005b83811015613f43578181015183820152602001613f2b565b50506000910152565b60008151808452613f64816020860160208601613f28565b601f01601f19169290920160200192915050565b602081526000610db76020830184613f4c565b600060208284031215613f9d57600080fd5b5035919050565b6001600160a01b03811681146111ca57600080fd5b60008060408385031215613fcc57600080fd5b8235613fd781613fa4565b946020939093013593505050565b60008083601f840112613ff757600080fd5b5081356001600160401b0381111561400e57600080fd5b602083019150836020828501011115613e0157600080fd5b60008060008060006080868803121561403e57600080fd5b853561404981613fa4565b9450602086013561405981613fa4565b93506040860135925060608601356001600160401b0381111561407b57600080fd5b61408788828901613fe5565b969995985093965092949392505050565b60008083601f8401126140aa57600080fd5b5081356001600160401b038111156140c157600080fd5b6020830191508360208260051b8501011115613e0157600080fd5b6000806000604084860312156140f157600080fd5b83356001600160401b0381111561410757600080fd5b61411386828701614098565b909790965060209590950135949350505050565b600082825180855260208086019550808260051b84010181860160005b8481101561417257601f19868403018952614160838351613f4c565b98840198925090830190600101614144565b5090979650505050505050565b602081526000610db76020830184614127565b6000806000604084860312156141a757600080fd5b83356001600160401b038111156141bd57600080fd5b61411386828701613fe5565b6000806000604084860312156141de57600080fd5b83356001600160401b03808211156141f557600080fd5b908501906080828803121561420957600080fd5b9093506020850135908082111561421f57600080fd5b5061422c86828701613fe5565b9497909650939450505050565b8035801515811461124557600080fd5b60008060008060008060008060a0898b03121561426557600080fd5b883561427081613fa4565b975060208901356001600160401b038082111561428c57600080fd5b6142988c838d01614098565b909950975060408b01359150808211156142b157600080fd5b6142bd8c838d01614098565b909750955060608b01359150808211156142d657600080fd5b506142e38b828c01614098565b90945092506142f6905060808a01614239565b90509295985092959890939650565b60008060006060848603121561431a57600080fd5b833561432581613fa4565b9250602084013561433581613fa4565b929592945050506040919091013590565b6000806020838503121561435957600080fd5b82356001600160401b0381111561436f57600080fd5b61437b85828601614098565b90969095509350505050565b60008060008060006060868803121561439f57600080fd5b85356001600160401b03808211156143b657600080fd5b6143c289838a01614098565b909750955060208801359150808211156143db57600080fd5b506143e888828901614098565b96999598509660400135949350505050565b6000806040838503121561440d57600080fd5b82356001600160401b0381168114613fd757600080fd5b60008060008060006060868803121561443c57600080fd5b85356001600160401b038082111561445357600080fd5b61445f89838a01613fe5565b9097509550602088013591508082111561447857600080fd5b506143e888828901613fe5565b6000806000806060858703121561449b57600080fd5b8435935060208501356001600160401b038111156144b857600080fd5b6144c487828801613fe5565b9598909750949560400135949350505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715614515576145156144d7565b604052919050565b600082601f83011261452e57600080fd5b81356001600160401b03811115614547576145476144d7565b61455a601f8201601f19166020016144ed565b81815284602083860101111561456f57600080fd5b816020850160208301376000918101602001919091529392505050565b60006020828403121561459e57600080fd5b81356001600160401b038111156145b457600080fd5b610cab8482850161451d565b6000602082840312156145d257600080fd5b8135610db781613fa4565b60006001600160401b038211156145f6576145f66144d7565b5060051b60200190565b600061461361460e846145dd565b6144ed565b8381529050602080820190600585901b84018681111561463257600080fd5b845b8181101561466d5780356001600160401b038111156146535760008081fd5b61465f8982890161451d565b855250928201928201614634565b505050509392505050565b60006020828403121561468a57600080fd5b81356001600160401b038111156146a057600080fd5b8201601f810184136146b157600080fd5b610cab84823560208401614600565b600080604083850312156146d357600080fd5b50508035926020909101359150565b6040815260006146f56040830185613f4c565b8281036020840152610db38185613f4c565b6000806000806060858703121561471d57600080fd5b843561472881613fa4565b93506020850135925060408501356001600160401b0381111561474a57600080fd5b61475687828801613fe5565b95989497509550505050565b60008060008060008060006080888a03121561477d57600080fd5b87356001600160401b038082111561479457600080fd5b6147a08b838c01613fe5565b909950975060208a0135965060408a01359150808211156147c057600080fd5b6147cc8b838c01614098565b909650945060608a01359150808211156147e557600080fd5b506147f28a828b01614098565b989b979a50959850939692959293505050565b6000806020838503121561481857600080fd5b82356001600160401b0381111561482e57600080fd5b61437b85828601613fe5565b6000806040838503121561484d57600080fd5b823561485881613fa4565b9150612e9660208401614239565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b828110156148bb57603f198886030184526148a9858351613f4c565b9450928501929085019060010161488d565b5092979650505050505050565b6040815260006148db6040830185614127565b8281036020840152610db38185614127565b6000806000806080858703121561490357600080fd5b843561490e81613fa4565b9350602085013561491e81613fa4565b92506040850135915060608501356001600160401b0381111561494057600080fd5b61494c8782880161451d565b91505092959194509250565b60008060006040848603121561496d57600080fd5b833561497881613fa4565b925060208401356001600160401b0381111561499357600080fd5b61422c86828701613fe5565b600080604083850312156149b257600080fd5b82356149bd81613fa4565b915060208301356149cd81613fa4565b809150509250929050565b6000806000604084860312156149ed57600080fd5b8335925060208401356001600160401b0381111561499357600080fd5b60008060008060808587031215614a2057600080fd5b8435614a2b81613fa4565b93506020850135614a3b81613fa4565b92506040850135614a4b81613fa4565b91506060850135614a5b81613fa4565b939692955090935050565b600181811c90821680614a7a57607f821691505b6020821081036113ff57634e487b7160e01b600052602260045260246000fd5b600060208284031215614aac57600080fd5b610db782614239565b634e487b7160e01b600052603260045260246000fd5b6000808335601e19843603018112614ae257600080fd5b8301803591506001600160401b03821115614afc57600080fd5b602001915036819003821315613e0157600080fd5b634e487b7160e01b600052601160045260246000fd5b600060018201614b3957614b39614b11565b5060010190565b60208082526027908201527f52656769737472793a2053454e4445525f49535f4e4f545f4d494e54494e475f60408201526626a0a720a3a2a960c91b606082015260800190565b6000610db7368484614600565b60208082526029908201527f52656769737472793a2053454e4445525f49535f4e4f545f415050524f5645446040820152682fa7a92fa7aba722a960b91b606082015260800190565b60208082526022908201527f52656769737472793a20494e53554646494349454e545f5045524d495353494f6040820152614e5360f01b606082015260800190565b60008251614c31818460208701613f28565b9190910192915050565b601f821115610a1357600081815260208120601f850160051c81016020861015614c625750805b601f850160051c820191505b8181101561117057828155600101614c6e565b6001600160401b03831115614c9857614c986144d7565b614cac83614ca68354614a66565b83614c3b565b6000601f841160018114614ce05760008515614cc85750838201355b600019600387901b1c1916600186901b178355610ea0565b600083815260209020601f19861690835b82811015614d115786850135825560209485019460019092019101614cf1565b5086821015614d2e5760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b602081526000610cab602083018486614d40565b600060808236031215614d8f57600080fd5b604051608081016001600160401b038282108183111715614db257614db26144d7565b8160405284359150614dc382613fa4565b81835260208501356020840152604085013560408401526060850135915080821115614dee57600080fd5b50614dfb3682860161451d565b60608301525092915050565b6000614e1561460e846145dd565b80848252602080830192508560051b850136811115614e3357600080fd5b855b81811015614e6e5780356001600160401b03811115614e545760008081fd5b614e6036828a0161451d565b865250938201938201614e35565b50919695505050505050565b60008351614e8c818460208801613f28565b835190830190614ea0818360208801613f28565b01949350505050565b60006020808385031215614ebc57600080fd5b82356001600160401b03811115614ed257600080fd5b8301601f81018513614ee357600080fd5b8035614ef161460e826145dd565b81815260059190911b82018301908381019087831115614f1057600080fd5b928401925b82841015614f2e57833582529284019290840190614f15565b979650505050505050565b8082018082111561094057610940614b11565b6001600160a01b03848116825283166020820152606060408201819052600090610b6990830184613f4c565b634e487b7160e01b600052601260045260246000fd5b600082614f9d57614f9d614f78565b500490565b634e487b7160e01b600052600160045260246000fd5b8181038181111561094057610940614b11565b600081614fda57614fda614b11565b506000190190565b60008351614ff4818460208801613f28565b601760f91b9083019081528351615012816001840160208801613f28565b01600101949350505050565b60006020828403121561503057600080fd5b5051919050565b60006020828403121561504957600080fd5b8151610db781613fa4565b8183823760009101908152919050565b81516001600160401b0381111561507d5761507d6144d7565b6150918161508b8454614a66565b84614c3b565b602080601f8311600181146150c657600084156150ae5750858301515b600019600386901b1c1916600185901b178555611170565b600085815260208120601f198616915b828110156150f5578886015182559484019460019091019084016150d6565b50858210156151135787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60008451615135818460208901613f28565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6000826151c3576151c3614f78565b500690565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b634e487b7160e01b600052602160045260246000fd5b828152604060208201526000610cab6040830184613f4c565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061316590830184613f4c565b60006020828403121561528757600080fd5b8151610db781613ef556febe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a164736f6c6343000811000a";
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
exports.UNSRegistry__factory = UNSRegistry__factory;
UNSRegistry__factory.bytecode = _bytecode;
UNSRegistry__factory.abi = _abi;
