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
const _bytecode = "0x608060405234801561001057600080fd5b50615283806100206000396000f3fe608060405234801561001057600080fd5b50600436106103a45760003560e01c80637e37479e116101e9578063baef73e91161010f578063e985e9c5116100ad578063f5c1f76e1161007c578063f5c1f76e146108ba578063f7df5c60146108cd578063f8c8765e146108e0578063ffa1ad74146108f357600080fd5b8063e985e9c51461085c578063ebf0c71714610898578063ec129eea1461089f578063f25eb5c1146108b257600080fd5b8063c87b56dd116100e9578063c87b56dd14610810578063ce92b33e14610823578063cf2c52cb14610836578063d9548e531461084957600080fd5b8063baef73e9146107a8578063bb5b27e1146107ea578063bebec6b4146107fd57600080fd5b8063a3f4df7e11610187578063b3f9e4cb11610156578063b3f9e4cb1461074e578063b85afd2814610761578063b88d4fde14610782578063ba5d40b71461079557600080fd5b8063a3f4df7e146106dc578063a424740014610708578063ab3b87fe1461071b578063ac9650d81461072e57600080fd5b80639559c0bd116101c35780639559c0bd146106a657806395d89b41146106ae57806399e0dd7c146106b6578063a22cb465146106c957600080fd5b80637e37479e1461066d57806394d008ef146106805780639508b1c41461069357600080fd5b806342842e0e116102ce578063509602391161026c578063663f7b2a1161023b578063663f7b2a14610605578063672b9f81146106185780636ccbae5f1461063957806370a082311461065a57600080fd5b806350960239146105b0578063572b6c05146105c35780636352211e146105df578063638e5c78146105f257600080fd5b806347c81699116102a857806347c81699146105645780634a72584d146105775780634f558e791461058a57806350382c1a1461059d57600080fd5b806342842e0e1461052b57806342966c681461053e578063430c20811461055157600080fd5b80631bf7e13e1161034657806327f189751161031557806327f18975146104df578063310bd74b146104f25780633f72ec6e1461050557806340c10f191461051857600080fd5b80631bf7e13e146104855780631f71be061461049857806323b872dd146104ab578063276fabb1146104be57600080fd5b8063095ea7b311610382578063095ea7b314610411578063150b7a02146104265780631bd8cc1a146104525780631be5e7ed1461047257600080fd5b806301ffc9a7146103a957806306fdde03146103d1578063081812fc146103e6575b600080fd5b6103bc6103b7366004613ea8565b610917565b60405190151581526020015b60405180910390f35b6103d9610928565b6040516103c89190613f15565b6103f96103f4366004613f28565b6109ba565b6040516001600160a01b0390911681526020016103c8565b61042461041f366004613f56565b6109e1565b005b610439610434366004613fc3565b6109fa565b6040516001600160e01b031990911681526020016103c8565b610465610460366004614079565b610b54565b6040516103c8919061411c565b6103d961048036600461412f565b610c4a565b6103d9610493366004614166565b610c95565b6104246104a63660046141e6565b610da0565b6104246104b93660046142a2565b610e48565b6104d16104cc3660046142e3565b610e9b565b6040519081526020016103c8565b6104246104ed366004614324565b610eaa565b610424610500366004613f28565b610ef2565b610424610513366004614397565b610f2d565b610424610526366004613f56565b61102f565b6104246105393660046142a2565b61107c565b61042461054c366004613f28565b611097565b6103bc61055f366004613f56565b6110db565b6104246105723660046143c1565b6110e7565b610424610585366004614422565b611126565b6103bc610598366004613f28565b61116c565b6104246105ab366004614529565b61118b565b6104246105be36600461455d565b6111c1565b6103bc6105d136600461455d565b6001600160a01b0316301490565b6103f96105ed366004613f28565b611221565b610424610600366004613f28565b61123e565b610424610613366004614615565b611289565b61062b61062636600461465d565b61132a565b6040516103c892919061467f565b6104d1610647366004613f28565b6000908152610100602052604090205490565b6104d161066836600461455d565b611342565b6104d161067b36600461455d565b6113c8565b61042461068e3660046146a4565b6113f9565b6104246106a13660046146ff565b611448565b6104d1601481565b6103d96114cf565b6104246106c43660046147a2565b6114de565b6104246106d73660046147d7565b611565565b6103d96040518060400160405280600d81526020016c554e533a20526567697374727960981b81525081565b6103bc610716366004614166565b611577565b610424610729366004613f56565b6115c2565b61074161073c3660046142e3565b611607565b6040516103c89190614803565b6103f961075c366004613f28565b6116e3565b61077461076f366004614079565b61170d565b6040516103c8929190614865565b61042461079036600461488a565b61182f565b6104246107a33660046141e6565b611876565b6107d26107b6366004613f28565b600090815261013960205260409020546001600160401b031690565b6040516001600160401b0390911681526020016103c8565b6103d96107f8366004613f28565b6118ff565b6103d961080b36600461455d565b6119a1565b6103d961081e366004613f28565b611a6b565b610424610831366004614324565b611ad1565b6104246108443660046148f5565b611b10565b6103bc610857366004613f28565b611bdf565b6103bc61086a36600461493c565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006104d1565b6104246108ad366004614324565b611c22565b610424611c61565b6104656108c83660046142e3565b611ce8565b6104246108db366004614975565b611d9b565b6104246108ee3660046149a7565b611e2c565b6103d9604051806040016040528060058152602001640302e392e360dc1b81525081565b600061092282612002565b92915050565b60606065805461093790614a03565b80601f016020809104026020016040519081016040528092919081815260200182805461096390614a03565b80156109b05780601f10610985576101008083540402835291602001916109b0565b820191906000526020600020905b81548152906001019060200180831161099357829003601f168201915b5050505050905090565b60006109c582612052565b506000908152606960205260409020546001600160a01b031690565b806109eb816120b1565b6109f58383612117565b505050565b60007f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378546001600160a01b0316610a2f612239565b6001600160a01b031603610af057610a45612239565b6001600160a01b03166342966c68856040518263ffffffff1660e01b8152600401610a7291815260200190565b600060405180830381600087803b158015610a8c57600080fd5b505af1158015610aa0573d6000803e3d6000fd5b505050821580159150610aba5750610aba82840184614a37565b15610ad857610ac93085612248565b610ad38585612396565b610ae2565b610ae28585612248565b50630a85bd0160e11b610b4b565b60405162461bcd60e51b815260206004820152602560248201527f52656769737472793a204552433732315f524543454956494e475f50524f4849604482015264109255115160da1b60648201526084015b60405180910390fd5b95945050505050565b6060826001600160401b03811115610b6e57610b6e614474565b604051908082528060200260200182016040528015610ba157816020015b6060815260200190600190039081610b8c5790505b50905060005b83811015610c4257610c12858583818110610bc457610bc4614a52565b9050602002810190610bd69190614a68565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250879250612441915050565b828281518110610c2457610c24614a52565b60200260200101819052508080610c3a90614ac4565b915050610ba7565b509392505050565b6060610c8d84848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250869250612441915050565b949350505050565b606060005a9050610ca7858585611577565b610d035760405162461bcd60e51b815260206004820152602760248201527f554e535265676973747279466f727761726465723a205349474e41545552455f6044820152661253959053125160ca1b6064820152608401610b42565b610d95610d13602087018761455d565b30604088013584610d2760608b018b614a68565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b908190840183828082843760009201919091525061247692505050565b9150505b9392505050565b610134546001600160a01b0316610db5612239565b6001600160a01b031614610ddb5760405162461bcd60e51b8152600401610b4290614add565b6000610def610dea888a614b24565b612557565b509050610dfb816125af565b610e0e610e078261261c565b8a8361267c565b610e1b8686868685612823565b8115610e3d57610e3d8982610e38610e338b8d614b24565b612891565b612912565b505050505050505050565b80610e5a610e54612239565b82612954565b610e765760405162461bcd60e51b8152600401610b4290614b31565b81610e80816120b1565b610e89836125af565b610e9485858561267c565b5050505050565b6000610c42610dea8385614b24565b80610eb6610e54612239565b610ed25760405162461bcd60e51b8152600401610b4290614b31565b81610edc816120b1565b610ee987878787876129e5565b50505050505050565b80610efe610e54612239565b610f1a5760405162461bcd60e51b8152600401610b4290614b31565b81610f24816120b1565b6109f5836125af565b610134546001600160a01b0316610f42612239565b6001600160a01b031614610f685760405162461bcd60e51b8152600401610b4290614add565b610f7181612052565b42826001600160401b031611610fc95760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a204558504952595f494e5f5041535400000000000000006044820152606401610b42565b60008181526101396020908152604091829020805467ffffffffffffffff19166001600160401b038616908117909155915191825282917f93feabb03ab84f47fc85bf0c298103fca21d8c8bc376eae0c1e1c56b9d4f7789910160405180910390a25050565b611037612a48565b6001600160a01b0316611048612239565b6001600160a01b03161461106e5760405162461bcd60e51b8152600401610b4290614b7a565b6110788282612248565b5050565b6109f58383836040518060200160405280600081525061182f565b806110a3610e54612239565b6110bf5760405162461bcd60e51b8152600401610b4290614b31565b816110c9816120b1565b6110d2836125af565b6109f583612b49565b6000610d998383612954565b806110f3610e54612239565b61110f5760405162461bcd60e51b8152600401610b4290614b31565b81611119816120b1565b610ee98787878787612bf0565b80611132610e54612239565b61114e5760405162461bcd60e51b8152600401610b4290614b31565b81611158816120b1565b61116486868686612ccf565b505050505050565b6000818152606760205260408120546001600160a01b03161515610922565b6111be8160405160200161119f9190614bbc565b6040516020818303038152906040528051906020012060001c82612d6f565b50565b610134546001600160a01b03166111d6612239565b6001600160a01b0316146111fc5760405162461bcd60e51b8152600401610b4290614add565b6001600160a01b0316600090815261013660205260409020805460ff19166001179055565b600061122c82611bdf565b611239576109228261261c565b919050565b8061124a610e54612239565b6112665760405162461bcd60e51b8152600401610b4290614b31565b611278611271612239565b308461267c565b611078611283612239565b83612396565b600061129482612557565b50905061129f612239565b6001600160a01b03166112b182611221565b6001600160a01b0316146113075760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610b42565b611310816120b1565b61107861131b612239565b8261132585612891565b612d94565b6060806113378484612e1b565b909590945092505050565b60006001600160a01b0382166113ac5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610b42565b506001600160a01b031660009081526068602052604090205490565b6001600160a01b038116600090815261013560205260408120546113eb81612e3c565b6113f3578091505b50919050565b611401612a48565b6001600160a01b0316611412612239565b6001600160a01b0316146114385760405162461bcd60e51b8152600401610b4290614b7a565b6114428484612248565b50505050565b6114528787612e86565b61145a612239565b6001600160a01b031661146c86611221565b6001600160a01b0316146114c25760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610b42565b610ee98484848489612823565b60606066805461093790614a03565b610134546001600160a01b03166114f3612239565b6001600160a01b0316146115195760405162461bcd60e51b8152600401610b4290614add565b610133611527828483614c1e565b507f4b120d6a959a84a520fa48f5f937cca0e79129423487af7901213b5d2e89313b8282604051611559929190614d06565b60405180910390a15050565b611078611570612239565b8383612ef5565b6000610c8d61158585614d1a565b3085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612fc392505050565b806115ce610e54612239565b6115ea5760405162461bcd60e51b8152600401610b4290614b31565b816115f4816120b1565b6114426116008461261c565b858561267c565b606060006116158385614da4565b90503033036116da5760005b838110156116d8576116a8611634612239565b61163c61310c565b87878581811061164e5761164e614a52565b90506020028101906116609190614a68565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525060408051602081019091529081529250613120915050565b8282815181106116ba576116ba614a52565b602002602001018190525080806116d090614ac4565b915050611621565b505b610c8d81613150565b6000818152606760205260408120546001600160a01b0316611706576000610922565b3092915050565b606080836001600160401b0381111561172857611728614474565b60405190808252806020026020018201604052801561175b57816020015b60608152602001906001900390816117465790505b509150836001600160401b0381111561177657611776614474565b6040519080825280602002602001820160405280156117a957816020015b60608152602001906001900390816117945790505b50905060005b84811015611826576117d98686838181106117cc576117cc614a52565b9050602002013585612e1b565b8483815181106117eb576117eb614a52565b6020026020010184848151811061180457611804614a52565b602002602001018290528290525050808061181e90614ac4565b9150506117af565b50935093915050565b8161183b610e54612239565b6118575760405162461bcd60e51b8152600401610b4290614b31565b82611861816120b1565b61186a846125af565b6111648686868661327b565b610134546001600160a01b031661188b612239565b6001600160a01b0316146118b15760405162461bcd60e51b8152600401610b4290614add565b6000806118c1610dea898b614b24565b915091506118ce816132ae565b6118e68a836118e0610e338c8e614b24565b8661330e565b6118f38787878786612823565b50505050505050505050565b600081815260c96020526040902080546060919061191c90614a03565b80601f016020809104026020016040519081016040528092919081815260200182805461194890614a03565b80156119955780601f1061196a57610100808354040283529160200191611995565b820191906000526020600020905b81548152906001019060200180831161197857829003601f168201915b50505050509050919050565b6001600160a01b038116600090815261013560205260409020546060906119c781612e3c565b6113f35760008181526101386020526040902080546119e590614a03565b80601f0160208091040260200160405190810160405280929190818152602001828054611a1190614a03565b8015611a5e5780601f10611a3357610100808354040283529160200191611a5e565b820191906000526020600020905b815481529060010190602001808311611a4157829003601f168201915b5050505050915050919050565b6060611a7682612052565b6000611a80613361565b90506000815111611aa05760405180602001604052806000815250610d99565b80611aaa84613371565b604051602001611abb929190614e17565b6040516020818303038152906040529392505050565b80611add610e54612239565b611af95760405162461bcd60e51b8152600401610b4290614b31565b81611b03816120b1565b610ee98787878787612823565b7f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87546001600160a01b0316611b43612239565b6001600160a01b031614611b695760405162461bcd60e51b8152600401610b4290614b7a565b6020819003611b8c576000611b8082840184613f28565b90506114428482612248565b6000611b9a82840184614e46565b805190915060005b8181101561116457611bcd86848381518110611bc057611bc0614a52565b6020026020010151612248565b80611bd781614ac4565b915050611ba2565b600081815261013960205260408120546001600160401b03161580159061092257505060009081526101396020526040902054426001600160401b039091161090565b80611c2e610e54612239565b611c4a5760405162461bcd60e51b8152600401610b4290614b31565b81611c54816120b1565b610ee98787878787613471565b6000611c6b612239565b6001600160a01b0381166000908152610135602052604081205491925003611cdf5760405162461bcd60e51b815260206004820152602160248201527f52656769737472793a20524556455253455f5245434f52445f49535f454d50546044820152605960f81b6064820152608401610b42565b6111be81613487565b6060816001600160401b03811115611d0257611d02614474565b604051908082528060200260200182016040528015611d3557816020015b6060815260200190600190039081611d205790505b50905060005b82811015611d9457611d64848483818110611d5857611d58614a52565b905060200201356118ff565b828281518110611d7657611d76614a52565b60200260200101819052508080611d8c90614ac4565b915050611d3b565b5092915050565b610134546001600160a01b0316611db0612239565b6001600160a01b031614611dd65760405162461bcd60e51b8152600401610b4290614add565b61013454611ded906001600160a01b031684612248565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39528383604051611e1f929190614d06565b60405180910390a2505050565b600054610100900460ff1615808015611e4c5750600054600160ff909116105b80611e665750303b158015611e66575060005460ff166001145b611ec95760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610b42565b6000805460ff191660011790558015611eec576000805461ff0019166101001790555b61013480546001600160a01b0319166001600160a01b038716179055837f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec9237880546001600160a01b0319166001600160a01b03929092169190911790556040805180820182526013815272556e73746f707061626c6520446f6d61696e7360681b60208083019190915282518084019093526002835261155160f21b90830152611f94916134cc565b611f9c61350c565b611fa461350c565b611fad83613535565b611fb682613565565b8015610e94576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050505050565b60006001600160e01b031982166380ac58cd60e01b148061203357506001600160e01b03198216635b5e139f60e01b145b8061092257506301ffc9a760e01b6001600160e01b0319831614610922565b6000818152606760205260409020546001600160a01b03166111be5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610b42565b30330361210e576120c061310c565b81146111be5760405162461bcd60e51b815260206004820152601760248201527f52656769737472793a20544f4b454e5f494e56414c49440000000000000000006044820152606401610b42565b6111be81613595565b60006121228261261c565b9050806001600160a01b0316836001600160a01b03160361218f5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610b42565b806001600160a01b03166121a1612239565b6001600160a01b031614806121bd57506121bd8161086a612239565b61222f5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610b42565b6109f583836135c3565b6000612243613631565b905090565b6001600160a01b03821661229e5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610b42565b6000818152606760205260409020546001600160a01b0316156123035760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610b42565b61230f6000838361364c565b6001600160a01b0382166000908152606860205260408120805460019290612338908490614ed6565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60006123a0612a48565b90506123ac81836135c3565b60008051602061523083398151915254604080516020808201869052825180830390910181528183019283905263e3dec8fb60e01b9092526001600160a01b0390921691829163e3dec8fb91612409918891309190604401614ee9565b600060405180830381600087803b15801561242357600080fd5b505af1158015612437573d6000803e3d6000fd5b5050505050505050565b6060610d99836040516020016124579190614bbc565b6040516020818303038152906040528051906020012060001c83613728565b606061248185613595565b600080876001600160a01b03168661249b8b8a8989613120565b6040516124a89190614bbc565b60006040518083038160008787f1925050503d80600081146124e6576040519150601f19603f3d011682016040523d82523d6000602084013e6124eb565b606091505b5090925090506124fc603f87614f2b565b5a1161250a5761250a614f3f565b61254a82826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c454400000000000081525061380a565b9998505050505050505050565b805160009081905b80156125a9578291506125958285612578600185614f55565b8151811061258857612588614a52565b6020026020010151613843565b9250806125a181614f68565b91505061255f565b50915091565b6125b8816138ef565b6040516020016125ca91815260200190565b60408051601f198184030181528282528051602091820120600085815260cb9092529181209190915582917f185c30856dadb58bf097c1f665a52ada7029752dbcad008ea3fefc73bee8c9fe9190a250565b6000818152606760205260408120546001600160a01b0316806109225760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610b42565b826001600160a01b031661268f8261261c565b6001600160a01b0316146126f35760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610b42565b6001600160a01b0382166127555760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610b42565b61276083838361364c565b61276b6000826135c3565b6001600160a01b0383166000908152606860205260408120805460019290612794908490614f55565b90915550506001600160a01b03821660009081526068602052604081208054600192906127c2908490614ed6565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60005b848110156111645761287f86868381811061284357612843614a52565b90506020028101906128559190614a68565b86868581811061286757612867614a52565b90506020028101906128799190614a68565b86612bf0565b8061288981614ac4565b915050612826565b60606000826000815181106128a8576128a8614a52565b602002602001015190506000600190505b8351811015611d9457818482815181106128d5576128d5614a52565b60200260200101516040516020016128ee929190614f7f565b6040516020818303038152906040529150808061290a90614ac4565b9150506128b9565b61dead6001600160a01b0384161480159061294457506001600160a01b03831660009081526101356020526040902054155b156109f5576109f5838383612d94565b60008061296083611221565b90506001600160a01b03811615801590610c8d5750806001600160a01b0316846001600160a01b031614806129ba57506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b80610c8d5750836001600160a01b03166129d3846109ba565b6001600160a01b031614949350505050565b60005b8481101561116457612a36868683818110612a0557612a05614a52565b90506020020135858584818110612a1e57612a1e614a52565b9050602002810190612a309190614a68565b85612ccf565b80612a4081614ac4565b9150506129e8565b600080516020615230833981519152546000906001600160a01b03168015612b455760405163721804d360e11b81523060048201526000906001600160a01b0383169063e43009a690602401602060405180830381865afa158015612ab1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ad59190614fbb565b60405163e66f960360e01b8152600481018290529091506001600160a01b0383169063e66f960390602401602060405180830381865afa158015612b1d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b419190614fd4565b9250505b5090565b6000612b548261261c565b9050612b628160008461364c565b612b6d6000836135c3565b6001600160a01b0381166000908152606860205260408120805460019290612b96908490614f55565b909155505060008281526067602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60008585604051602001612c05929190614ff1565b60408051601f198184030181528282528051602091820120601f8901829004820284018201909252878352909250612c599183918990899081908401838280828437600092019190915250612d6f92505050565b6111648187878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b018190048102820181019092528981529250899150889081908401838280828437600092019190915250889250613917915050565b612cd884613a4c565b612d245760405162461bcd60e51b815260206004820152601c60248201527f5265636f726453746f726167653a204b45595f4e4f545f464f554e44000000006044820152606401610b42565b61144284612d31866118ff565b85858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250879250613917915050565b612d7882613a4c565b61107857600082815260c9602052604090206109f58282615001565b6000828152610138602052604090208054612dae90614a03565b9050600003612dd257600082815261013860205260409020612dd08282615001565b505b6001600160a01b03831660008181526101356020526040808220859055518492917feb76a21470988c474a21f690cc28fee1ed511bd812dc3c21fd0f49c5e5d4708a91a3505050565b606080612e27846118ff565b9150612e338484613728565b90509250929050565b6000818152610137602052604081205460ff16801561092257506101366000612e63612239565b6001600160a01b0316815260208101919091526040016000205460ff1692915050565b60008051602061523083398151915254604051633805550f60e01b81526001600160a01b03909116908190633805550f90612ec79086908690600401614d06565b600060405180830381600087803b158015612ee157600080fd5b505af1158015610ee9573d6000803e3d6000fd5b816001600160a01b0316836001600160a01b031603612f565760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610b42565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f90602401602060405180830381865afa15801561300a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061302e9190614fbb565b905060006130dc86606001518051906020012086886020015160405160200161307c9392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b905081866020015114801561310257508551613102906001600160a01b03168286613a72565b9695505050505050565b600030330361311d5750601f193601355b90565b6060828585604051602001613137939291906150c0565b6040516020818303038152906040529050949350505050565b606081516001600160401b0381111561316b5761316b614474565b60405190808252806020026020018201604052801561319e57816020015b60608152602001906001900390816131895790505b50905060005b82518110156113f357600080306001600160a01b03168584815181106131cc576131cc614a52565b60200260200101516040516131e19190614bbc565b600060405180830381855af49150503d806000811461321c576040519150601f19603f3d011682016040523d82523d6000602084013e613221565b606091505b509150915061324982826040518060600160405280602781526020016152506027913961380a565b84848151811061325b5761325b614a52565b60200260200101819052505050808061327390614ac4565b9150506131a4565b61328684848461267c565b61329284848484613bb4565b6114425760405162461bcd60e51b8152600401610b42906150ff565b6000818152610137602052604090205460ff16156111be5760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a20544f4b454e5f555047524144454400000000000000006044820152606401610b42565b6133188484612248565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c3952836040516133489190613f15565b60405180910390a2801561144257611442848484612912565b6060610133805461093790614a03565b6060816000036133985750506040805180820190915260018152600360fc1b602082015290565b8160005b81156133c257806133ac81614ac4565b91506133bb9050600a83614f2b565b915061339c565b6000816001600160401b038111156133dc576133dc614474565b6040519080825280601f01601f191660200182016040528015613406576020820181803683370190505b5090505b8415610c8d5761341b600183614f55565b9150613428600a86615151565b613433906030614ed6565b60f81b81838151811061344857613448614a52565b60200101906001600160f81b031916908160001a90535061346a600a86614f2b565b945061340a565b61347a816125af565b610e948585858585612823565b6001600160a01b03811660008181526101356020526040808220829055517ffcf5eec0cfa3e6332f5f0e63ec242d71f866a61d121d6cdf5c2eb3b668a26c4f9190a250565b600054610100900460ff166134f35760405162461bcd60e51b8152600401610b4290615165565b60656134ff8382615001565b5060666109f58282615001565b600054610100900460ff166135335760405162461bcd60e51b8152600401610b4290615165565b565b600054610100900460ff1661355c5760405162461bcd60e51b8152600401610b4290615165565b6111be81613cb9565b600054610100900460ff1661358c5760405162461bcd60e51b8152600401610b4290615165565b6111be81613d12565b600081815261010060205260409020546135b0906001614ed6565b6000918252610100602052604090912055565b600081815260696020526040902080546001600160a01b0319166001600160a01b03841690811790915581906135f88261261c565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000303303613647575060331936013560601c90565b503390565b6001600160a01b03821661366357613663816132ae565b600081815261013960205260409020546001600160401b0316156136fe576001600160a01b038216158015906136b2575061369c612a48565b6001600160a01b0316826001600160a01b031614155b6136fe5760405162461bcd60e51b815260206004820152601960248201527f52656769737472793a20544f4b454e5f455850495241424c45000000000000006044820152606401610b42565b6001600160a01b038316600090815261013560205260409020548190036109f5576109f583613487565b606061373382612e3c565b1561374d5750604080516020810190915260008152610922565b60ca600061375a846138ef565b81526020019081526020016000206000848152602001908152602001600020805461378490614a03565b80601f01602080910402602001604051908101604052809291908181526020018280546137b090614a03565b80156137fd5780601f106137d2576101008083540402835291602001916137fd565b820191906000526020600020905b8154815290600101906020018083116137e057829003601f168201915b5050505050905092915050565b60608315613819575081610d99565b8251156138295782518084602001fd5b8160405162461bcd60e51b8152600401610b429190613f15565b6000815160000361388e5760405162461bcd60e51b815260206004820152601560248201527452656769737472793a204c4142454c5f454d50545960581b6044820152606401610b42565b82826040516020016138a09190614bbc565b604051602081830303815290604052805190602001206040516020016138d0929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b600081815260cb602052604081205415612b4557600082815260cb6020526040902054610922565b60ca6000613924836138ef565b81526020019081526020016000206000858152602001908152602001600020805461394e90614a03565b90506000036139a657826040516139659190614bbc565b6040518091039020817f7ae4f661958fbecc2f77be6b0eb280d2a6f604b29e1e7221c82b9da0c4af7f868560405161399d9190613f15565b60405180910390a35b8160ca60006139b4846138ef565b8152602001908152602001600020600086815260200190815260200160002090816139df9190615001565b50816040516139ee9190614bbc565b604051809103902083604051613a049190614bbc565b6040518091039020827f851ffe8e74d5015261dba0a1f9e1b0e5d42c5af5d2ad1908fee897c7d80a0d928686604051613a3e92919061467f565b60405180910390a450505050565b600081815260c9602052604081208054829190613a6890614a03565b9050119050919050565b6000806000613a818585613d60565b90925090506000816004811115613a9a57613a9a6151b0565b148015613ab85750856001600160a01b0316826001600160a01b0316145b15613ac857600192505050610d99565b600080876001600160a01b0316631626ba7e60e01b8888604051602401613af09291906151c6565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051613b2e9190614bbc565b600060405180830381855afa9150503d8060008114613b69576040519150601f19603f3d011682016040523d82523d6000602084013e613b6e565b606091505b5091509150818015613b81575080516020145b8015613ba857508051630b135d3f60e11b90613ba69083016020908101908401614fbb565b145b98975050505050505050565b60006001600160a01b0384163b15613cb157836001600160a01b031663150b7a02613bdd612239565b8786866040518563ffffffff1660e01b8152600401613bff94939291906151df565b6020604051808303816000875af1925050508015613c3a575060408051601f3d908101601f19168201909252613c3791810190615212565b60015b613c97573d808015613c68576040519150601f19603f3d011682016040523d82523d6000602084013e613c6d565b606091505b508051600003613c8f5760405162461bcd60e51b8152600401610b42906150ff565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610c8d565b506001610c8d565b600054610100900460ff16613ce05760405162461bcd60e51b8152600401610b4290615165565b806000805160206152308339815191525b80546001600160a01b0319166001600160a01b039290921691909117905550565b600054610100900460ff16613d395760405162461bcd60e51b8152600401610b4290615165565b807f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87613cf1565b6000808251604103613d965760208301516040840151606085015160001a613d8a87828585613da5565b94509450505050613d9e565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613ddc5750600090506003613e89565b8460ff16601b14158015613df457508460ff16601c14155b15613e055750600090506004613e89565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613e59573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613e8257600060019250925050613e89565b9150600090505b94509492505050565b6001600160e01b0319811681146111be57600080fd5b600060208284031215613eba57600080fd5b8135610d9981613e92565b60005b83811015613ee0578181015183820152602001613ec8565b50506000910152565b60008151808452613f01816020860160208601613ec5565b601f01601f19169290920160200192915050565b602081526000610d996020830184613ee9565b600060208284031215613f3a57600080fd5b5035919050565b6001600160a01b03811681146111be57600080fd5b60008060408385031215613f6957600080fd5b8235613f7481613f41565b946020939093013593505050565b60008083601f840112613f9457600080fd5b5081356001600160401b03811115613fab57600080fd5b602083019150836020828501011115613d9e57600080fd5b600080600080600060808688031215613fdb57600080fd5b8535613fe681613f41565b94506020860135613ff681613f41565b93506040860135925060608601356001600160401b0381111561401857600080fd5b61402488828901613f82565b969995985093965092949392505050565b60008083601f84011261404757600080fd5b5081356001600160401b0381111561405e57600080fd5b6020830191508360208260051b8501011115613d9e57600080fd5b60008060006040848603121561408e57600080fd5b83356001600160401b038111156140a457600080fd5b6140b086828701614035565b909790965060209590950135949350505050565b600082825180855260208086019550808260051b84010181860160005b8481101561410f57601f198684030189526140fd838351613ee9565b988401989250908301906001016140e1565b5090979650505050505050565b602081526000610d9960208301846140c4565b60008060006040848603121561414457600080fd5b83356001600160401b0381111561415a57600080fd5b6140b086828701613f82565b60008060006040848603121561417b57600080fd5b83356001600160401b038082111561419257600080fd5b90850190608082880312156141a657600080fd5b909350602085013590808211156141bc57600080fd5b506141c986828701613f82565b9497909650939450505050565b8035801515811461123957600080fd5b60008060008060008060008060a0898b03121561420257600080fd5b883561420d81613f41565b975060208901356001600160401b038082111561422957600080fd5b6142358c838d01614035565b909950975060408b013591508082111561424e57600080fd5b61425a8c838d01614035565b909750955060608b013591508082111561427357600080fd5b506142808b828c01614035565b9094509250614293905060808a016141d6565b90509295985092959890939650565b6000806000606084860312156142b757600080fd5b83356142c281613f41565b925060208401356142d281613f41565b929592945050506040919091013590565b600080602083850312156142f657600080fd5b82356001600160401b0381111561430c57600080fd5b61431885828601614035565b90969095509350505050565b60008060008060006060868803121561433c57600080fd5b85356001600160401b038082111561435357600080fd5b61435f89838a01614035565b9097509550602088013591508082111561437857600080fd5b5061438588828901614035565b96999598509660400135949350505050565b600080604083850312156143aa57600080fd5b82356001600160401b0381168114613f7457600080fd5b6000806000806000606086880312156143d957600080fd5b85356001600160401b03808211156143f057600080fd5b6143fc89838a01613f82565b9097509550602088013591508082111561441557600080fd5b5061438588828901613f82565b6000806000806060858703121561443857600080fd5b8435935060208501356001600160401b0381111561445557600080fd5b61446187828801613f82565b9598909750949560400135949350505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b03811182821017156144b2576144b2614474565b604052919050565b600082601f8301126144cb57600080fd5b81356001600160401b038111156144e4576144e4614474565b6144f7601f8201601f191660200161448a565b81815284602083860101111561450c57600080fd5b816020850160208301376000918101602001919091529392505050565b60006020828403121561453b57600080fd5b81356001600160401b0381111561455157600080fd5b610c8d848285016144ba565b60006020828403121561456f57600080fd5b8135610d9981613f41565b60006001600160401b0382111561459357614593614474565b5060051b60200190565b60006145b06145ab8461457a565b61448a565b8381529050602080820190600585901b8401868111156145cf57600080fd5b845b8181101561460a5780356001600160401b038111156145f05760008081fd5b6145fc898289016144ba565b8552509282019282016145d1565b505050509392505050565b60006020828403121561462757600080fd5b81356001600160401b0381111561463d57600080fd5b8201601f8101841361464e57600080fd5b610c8d8482356020840161459d565b6000806040838503121561467057600080fd5b50508035926020909101359150565b6040815260006146926040830185613ee9565b8281036020840152610d958185613ee9565b600080600080606085870312156146ba57600080fd5b84356146c581613f41565b93506020850135925060408501356001600160401b038111156146e757600080fd5b6146f387828801613f82565b95989497509550505050565b60008060008060008060006080888a03121561471a57600080fd5b87356001600160401b038082111561473157600080fd5b61473d8b838c01613f82565b909950975060208a0135965060408a013591508082111561475d57600080fd5b6147698b838c01614035565b909650945060608a013591508082111561478257600080fd5b5061478f8a828b01614035565b989b979a50959850939692959293505050565b600080602083850312156147b557600080fd5b82356001600160401b038111156147cb57600080fd5b61431885828601613f82565b600080604083850312156147ea57600080fd5b82356147f581613f41565b9150612e33602084016141d6565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101561485857603f19888603018452614846858351613ee9565b9450928501929085019060010161482a565b5092979650505050505050565b60408152600061487860408301856140c4565b8281036020840152610d9581856140c4565b600080600080608085870312156148a057600080fd5b84356148ab81613f41565b935060208501356148bb81613f41565b92506040850135915060608501356001600160401b038111156148dd57600080fd5b6148e9878288016144ba565b91505092959194509250565b60008060006040848603121561490a57600080fd5b833561491581613f41565b925060208401356001600160401b0381111561493057600080fd5b6141c986828701613f82565b6000806040838503121561494f57600080fd5b823561495a81613f41565b9150602083013561496a81613f41565b809150509250929050565b60008060006040848603121561498a57600080fd5b8335925060208401356001600160401b0381111561493057600080fd5b600080600080608085870312156149bd57600080fd5b84356149c881613f41565b935060208501356149d881613f41565b925060408501356149e881613f41565b915060608501356149f881613f41565b939692955090935050565b600181811c90821680614a1757607f821691505b6020821081036113f357634e487b7160e01b600052602260045260246000fd5b600060208284031215614a4957600080fd5b610d99826141d6565b634e487b7160e01b600052603260045260246000fd5b6000808335601e19843603018112614a7f57600080fd5b8301803591506001600160401b03821115614a9957600080fd5b602001915036819003821315613d9e57600080fd5b634e487b7160e01b600052601160045260246000fd5b600060018201614ad657614ad6614aae565b5060010190565b60208082526027908201527f52656769737472793a2053454e4445525f49535f4e4f545f4d494e54494e475f60408201526626a0a720a3a2a960c91b606082015260800190565b6000610d9936848461459d565b60208082526029908201527f52656769737472793a2053454e4445525f49535f4e4f545f415050524f5645446040820152682fa7a92fa7aba722a960b91b606082015260800190565b60208082526022908201527f52656769737472793a20494e53554646494349454e545f5045524d495353494f6040820152614e5360f01b606082015260800190565b60008251614bce818460208701613ec5565b9190910192915050565b601f8211156109f557600081815260208120601f850160051c81016020861015614bff5750805b601f850160051c820191505b8181101561116457828155600101614c0b565b6001600160401b03831115614c3557614c35614474565b614c4983614c438354614a03565b83614bd8565b6000601f841160018114614c7d5760008515614c655750838201355b600019600387901b1c1916600186901b178355610e94565b600083815260209020601f19861690835b82811015614cae5786850135825560209485019460019092019101614c8e565b5086821015614ccb5760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b602081526000610c8d602083018486614cdd565b600060808236031215614d2c57600080fd5b604051608081016001600160401b038282108183111715614d4f57614d4f614474565b8160405284359150614d6082613f41565b81835260208501356020840152604085013560408401526060850135915080821115614d8b57600080fd5b50614d98368286016144ba565b60608301525092915050565b6000614db26145ab8461457a565b80848252602080830192508560051b850136811115614dd057600080fd5b855b81811015614e0b5780356001600160401b03811115614df15760008081fd5b614dfd36828a016144ba565b865250938201938201614dd2565b50919695505050505050565b60008351614e29818460208801613ec5565b835190830190614e3d818360208801613ec5565b01949350505050565b60006020808385031215614e5957600080fd5b82356001600160401b03811115614e6f57600080fd5b8301601f81018513614e8057600080fd5b8035614e8e6145ab8261457a565b81815260059190911b82018301908381019087831115614ead57600080fd5b928401925b82841015614ecb57833582529284019290840190614eb2565b979650505050505050565b8082018082111561092257610922614aae565b6001600160a01b03848116825283166020820152606060408201819052600090610b4b90830184613ee9565b634e487b7160e01b600052601260045260246000fd5b600082614f3a57614f3a614f15565b500490565b634e487b7160e01b600052600160045260246000fd5b8181038181111561092257610922614aae565b600081614f7757614f77614aae565b506000190190565b60008351614f91818460208801613ec5565b601760f91b9083019081528351614faf816001840160208801613ec5565b01600101949350505050565b600060208284031215614fcd57600080fd5b5051919050565b600060208284031215614fe657600080fd5b8151610d9981613f41565b8183823760009101908152919050565b81516001600160401b0381111561501a5761501a614474565b61502e816150288454614a03565b84614bd8565b602080601f831160018114615063576000841561504b5750858301515b600019600386901b1c1916600185901b178555611164565b600085815260208120601f198616915b8281101561509257888601518255948401946001909101908401615073565b50858210156150b05787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600084516150d2818460208901613ec5565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60008261516057615160614f15565b500690565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b634e487b7160e01b600052602160045260246000fd5b828152604060208201526000610c8d6040830184613ee9565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061310290830184613ee9565b60006020828403121561522457600080fd5b8151610d9981613e9256febe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a164736f6c6343000811000a";
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
