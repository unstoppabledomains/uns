"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNSRegistryMock__factory = void 0;
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getTokenName",
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
const _bytecode = "0x608060405234801561001057600080fd5b5061537b806100206000396000f3fe608060405234801561001057600080fd5b50600436106103ba5760003560e01c806394d008ef116101f4578063baef73e91161011a578063e985e9c5116100ad578063f5c1f76e1161007c578063f5c1f76e146108f6578063f7df5c6014610909578063f8c8765e1461091c578063ffa1ad741461092f57600080fd5b8063e985e9c514610898578063ebf0c717146108d4578063ec129eea146108db578063f25eb5c1146108ee57600080fd5b8063ce92b33e116100e9578063ce92b33e1461084c578063cf2c52cb1461085f578063d9548e5314610872578063dbe16c071461088557600080fd5b8063baef73e9146107d1578063bb5b27e114610813578063bebec6b414610826578063c87b56dd1461083957600080fd5b8063a424740011610192578063b3f9e4cb11610161578063b3f9e4cb14610777578063b85afd281461078a578063b88d4fde146107ab578063ba5d40b7146107be57600080fd5b8063a42474001461071e578063ab3b87fe14610731578063ac9650d814610744578063ae31844a1461076457600080fd5b806395d89b41116101ce57806395d89b41146106c457806399e0dd7c146106cc578063a22cb465146106df578063a3f4df7e146106f257600080fd5b806394d008ef146106965780639508b1c4146106a95780639559c0bd146106bc57600080fd5b806342842e0e116102e4578063572b6c0511610277578063672b9f8111610246578063672b9f811461062e5780636ccbae5f1461064f57806370a08231146106705780637e37479e1461068357600080fd5b8063572b6c05146105d95780636352211e146105f5578063638e5c7814610608578063663f7b2a1461061b57600080fd5b80634a72584d116102b35780634a72584d1461058d5780634f558e79146105a057806350382c1a146105b357806350960239146105c657600080fd5b806342842e0e1461054157806342966c6814610554578063430c20811461056757806347c816991461057a57600080fd5b80631bf7e13e1161035c57806327f189751161032b57806327f18975146104f5578063310bd74b146105085780633f72ec6e1461051b57806340c10f191461052e57600080fd5b80631bf7e13e1461049b5780631f71be06146104ae57806323b872dd146104c1578063276fabb1146104d457600080fd5b8063095ea7b311610398578063095ea7b314610427578063150b7a021461043c5780631bd8cc1a146104685780631be5e7ed1461048857600080fd5b806301ffc9a7146103bf57806306fdde03146103e7578063081812fc146103fc575b600080fd5b6103d26103cd366004613fa0565b610953565b60405190151581526020015b60405180910390f35b6103ef610964565b6040516103de919061400d565b61040f61040a366004614020565b6109f6565b6040516001600160a01b0390911681526020016103de565b61043a61043536600461404e565b610a1d565b005b61044f61044a3660046140bb565b610a36565b6040516001600160e01b031990911681526020016103de565b61047b610476366004614171565b610b90565b6040516103de9190614214565b6103ef610496366004614227565b610c86565b6103ef6104a936600461425e565b610cd1565b61043a6104bc3660046142de565b610ddc565b61043a6104cf36600461439a565b610e84565b6104e76104e23660046143db565b610ed7565b6040519081526020016103de565b61043a61050336600461441c565b610ee6565b61043a610516366004614020565b610f2e565b61043a61052936600461448f565b610f69565b61043a61053c36600461404e565b61106b565b61043a61054f36600461439a565b6110b8565b61043a610562366004614020565b6110d3565b6103d261057536600461404e565b611117565b61043a6105883660046144b9565b611123565b61043a61059b36600461451a565b611162565b6103d26105ae366004614020565b6111a8565b61043a6105c1366004614621565b6111c7565b61043a6105d4366004614655565b6111fd565b6103d26105e7366004614655565b6001600160a01b0316301490565b61040f610603366004614020565b61125d565b61043a610616366004614020565b61127a565b61043a61062936600461470d565b6112c5565b61064161063c366004614755565b611366565b6040516103de929190614777565b6104e761065d366004614020565b6000908152610100602052604090205490565b6104e761067e366004614655565b61137e565b6104e7610691366004614655565b611404565b61043a6106a436600461479c565b611435565b61043a6106b73660046147f7565b611484565b6104e7601481565b6103ef61150b565b61043a6106da36600461489a565b61151a565b61043a6106ed3660046148cf565b6115a1565b6103ef6040518060400160405280600d81526020016c554e533a20526567697374727960981b81525081565b6103d261072c36600461425e565b6115b3565b61043a61073f36600461404e565b6115fe565b6107576107523660046143db565b611643565b6040516103de91906148fb565b61043a6107723660046143db565b61171f565b61040f610785366004614020565b6117bd565b61079d610798366004614171565b6117e7565b6040516103de92919061495d565b61043a6107b9366004614982565b611909565b61043a6107cc3660046142de565b611950565b6107fb6107df366004614020565b600090815261013960205260409020546001600160401b031690565b6040516001600160401b0390911681526020016103de565b6103ef610821366004614020565b6119d9565b6103ef610834366004614655565b611a7b565b6103ef610847366004614020565b611b45565b61043a61085a36600461441c565b611bab565b61043a61086d3660046149ed565b611bea565b6103d2610880366004614020565b611cb9565b6103ef610893366004614020565b611cfc565b6103d26108a6366004614a34565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006104e7565b61043a6108e936600461441c565b611d1a565b61043a611d59565b61047b6109043660046143db565b611de0565b61043a610917366004614a6d565b611e93565b61043a61092a366004614a9f565b611f24565b6103ef604051806040016040528060058152602001640302e392e360dc1b81525081565b600061095e826120fa565b92915050565b60606065805461097390614afb565b80601f016020809104026020016040519081016040528092919081815260200182805461099f90614afb565b80156109ec5780601f106109c1576101008083540402835291602001916109ec565b820191906000526020600020905b8154815290600101906020018083116109cf57829003601f168201915b5050505050905090565b6000610a018261214a565b506000908152606960205260409020546001600160a01b031690565b80610a27816121a9565b610a31838361220f565b505050565b60007f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378546001600160a01b0316610a6b612331565b6001600160a01b031603610b2c57610a81612331565b6001600160a01b03166342966c68856040518263ffffffff1660e01b8152600401610aae91815260200190565b600060405180830381600087803b158015610ac857600080fd5b505af1158015610adc573d6000803e3d6000fd5b505050821580159150610af65750610af682840184614b2f565b15610b1457610b053085612340565b610b0f858561248e565b610b1e565b610b1e8585612340565b50630a85bd0160e11b610b87565b60405162461bcd60e51b815260206004820152602560248201527f52656769737472793a204552433732315f524543454956494e475f50524f4849604482015264109255115160da1b60648201526084015b60405180910390fd5b95945050505050565b6060826001600160401b03811115610baa57610baa61456c565b604051908082528060200260200182016040528015610bdd57816020015b6060815260200190600190039081610bc85790505b50905060005b83811015610c7e57610c4e858583818110610c0057610c00614b4a565b9050602002810190610c129190614b60565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250879250612539915050565b828281518110610c6057610c60614b4a565b60200260200101819052508080610c7690614bbc565b915050610be3565b509392505050565b6060610cc984848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250869250612539915050565b949350505050565b606060005a9050610ce38585856115b3565b610d3f5760405162461bcd60e51b815260206004820152602760248201527f554e535265676973747279466f727761726465723a205349474e41545552455f6044820152661253959053125160ca1b6064820152608401610b7e565b610dd1610d4f6020870187614655565b30604088013584610d6360608b018b614b60565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b908190840183828082843760009201919091525061256e92505050565b9150505b9392505050565b610134546001600160a01b0316610df1612331565b6001600160a01b031614610e175760405162461bcd60e51b8152600401610b7e90614bd5565b6000610e2b610e26888a614c1c565b61264f565b509050610e37816126a7565b610e4a610e4382612714565b8a83612774565b610e57868686868561291b565b8115610e7957610e798982610e74610e6f8b8d614c1c565b612989565b612a0a565b505050505050505050565b80610e96610e90612331565b82612a4c565b610eb25760405162461bcd60e51b8152600401610b7e90614c29565b81610ebc816121a9565b610ec5836126a7565b610ed0858585612774565b5050505050565b6000610c7e610e268385614c1c565b80610ef2610e90612331565b610f0e5760405162461bcd60e51b8152600401610b7e90614c29565b81610f18816121a9565b610f258787878787612add565b50505050505050565b80610f3a610e90612331565b610f565760405162461bcd60e51b8152600401610b7e90614c29565b81610f60816121a9565b610a31836126a7565b610134546001600160a01b0316610f7e612331565b6001600160a01b031614610fa45760405162461bcd60e51b8152600401610b7e90614bd5565b610fad8161214a565b42826001600160401b0316116110055760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a204558504952595f494e5f5041535400000000000000006044820152606401610b7e565b60008181526101396020908152604091829020805467ffffffffffffffff19166001600160401b038616908117909155915191825282917f93feabb03ab84f47fc85bf0c298103fca21d8c8bc376eae0c1e1c56b9d4f7789910160405180910390a25050565b611073612b40565b6001600160a01b0316611084612331565b6001600160a01b0316146110aa5760405162461bcd60e51b8152600401610b7e90614c72565b6110b48282612340565b5050565b610a3183838360405180602001604052806000815250611909565b806110df610e90612331565b6110fb5760405162461bcd60e51b8152600401610b7e90614c29565b81611105816121a9565b61110e836126a7565b610a3183612c41565b6000610dd58383612a4c565b8061112f610e90612331565b61114b5760405162461bcd60e51b8152600401610b7e90614c29565b81611155816121a9565b610f258787878787612ce8565b8061116e610e90612331565b61118a5760405162461bcd60e51b8152600401610b7e90614c29565b81611194816121a9565b6111a086868686612dc7565b505050505050565b6000818152606760205260408120546001600160a01b0316151561095e565b6111fa816040516020016111db9190614cb4565b6040516020818303038152906040528051906020012060001c82612e67565b50565b610134546001600160a01b0316611212612331565b6001600160a01b0316146112385760405162461bcd60e51b8152600401610b7e90614bd5565b6001600160a01b0316600090815261013660205260409020805460ff19166001179055565b600061126882611cb9565b6112755761095e82612714565b919050565b80611286610e90612331565b6112a25760405162461bcd60e51b8152600401610b7e90614c29565b6112b46112ad612331565b3084612774565b6110b46112bf612331565b8361248e565b60006112d08261264f565b5090506112db612331565b6001600160a01b03166112ed8261125d565b6001600160a01b0316146113435760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610b7e565b61134c816121a9565b6110b4611357612331565b8261136185612989565b612e8c565b6060806113738484612f13565b909590945092505050565b60006001600160a01b0382166113e85760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610b7e565b506001600160a01b031660009081526068602052604090205490565b6001600160a01b0381166000908152610135602052604081205461142781612f34565b61142f578091505b50919050565b61143d612b40565b6001600160a01b031661144e612331565b6001600160a01b0316146114745760405162461bcd60e51b8152600401610b7e90614c72565b61147e8484612340565b50505050565b61148e8787612f7e565b611496612331565b6001600160a01b03166114a88661125d565b6001600160a01b0316146114fe5760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610b7e565b610f25848484848961291b565b60606066805461097390614afb565b610134546001600160a01b031661152f612331565b6001600160a01b0316146115555760405162461bcd60e51b8152600401610b7e90614bd5565b610133611563828483614d16565b507f4b120d6a959a84a520fa48f5f937cca0e79129423487af7901213b5d2e89313b8282604051611595929190614dfe565b60405180910390a15050565b6110b46115ac612331565b8383612fed565b6000610cc96115c185614e12565b3085858080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506130bb92505050565b8061160a610e90612331565b6116265760405162461bcd60e51b8152600401610b7e90614c29565b81611630816121a9565b61147e61163c84612714565b8585612774565b606060006116518385614e9c565b90503033036117165760005b83811015611714576116e4611670612331565b611678613204565b87878581811061168a5761168a614b4a565b905060200281019061169c9190614b60565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525060408051602081019091529081529250613218915050565b8282815181106116f6576116f6614b4a565b6020026020010181905250808061170c90614bbc565b91505061165d565b505b610cc981613248565b610134546001600160a01b0316611734612331565b6001600160a01b03161461175a5760405162461bcd60e51b8152600401610b7e90614bd5565b60005b81811015610a31576001610137600085858581811061177e5761177e614b4a565b90506020020135815260200190815260200160002060006101000a81548160ff02191690831515021790555080806117b590614bbc565b91505061175d565b6000818152606760205260408120546001600160a01b03166117e057600061095e565b3092915050565b606080836001600160401b038111156118025761180261456c565b60405190808252806020026020018201604052801561183557816020015b60608152602001906001900390816118205790505b509150836001600160401b038111156118505761185061456c565b60405190808252806020026020018201604052801561188357816020015b606081526020019060019003908161186e5790505b50905060005b84811015611900576118b38686838181106118a6576118a6614b4a565b9050602002013585612f13565b8483815181106118c5576118c5614b4a565b602002602001018484815181106118de576118de614b4a565b60200260200101829052829052505080806118f890614bbc565b915050611889565b50935093915050565b81611915610e90612331565b6119315760405162461bcd60e51b8152600401610b7e90614c29565b8261193b816121a9565b611944846126a7565b6111a086868686613373565b610134546001600160a01b0316611965612331565b6001600160a01b03161461198b5760405162461bcd60e51b8152600401610b7e90614bd5565b60008061199b610e26898b614c1c565b915091506119a8816133a6565b6119c08a836119ba610e6f8c8e614c1c565b86613406565b6119cd878787878661291b565b50505050505050505050565b600081815260c9602052604090208054606091906119f690614afb565b80601f0160208091040260200160405190810160405280929190818152602001828054611a2290614afb565b8015611a6f5780601f10611a4457610100808354040283529160200191611a6f565b820191906000526020600020905b815481529060010190602001808311611a5257829003601f168201915b50505050509050919050565b6001600160a01b03811660009081526101356020526040902054606090611aa181612f34565b61142f576000818152610138602052604090208054611abf90614afb565b80601f0160208091040260200160405190810160405280929190818152602001828054611aeb90614afb565b8015611b385780601f10611b0d57610100808354040283529160200191611b38565b820191906000526020600020905b815481529060010190602001808311611b1b57829003601f168201915b5050505050915050919050565b6060611b508261214a565b6000611b5a613459565b90506000815111611b7a5760405180602001604052806000815250610dd5565b80611b8484613469565b604051602001611b95929190614f0f565b6040516020818303038152906040529392505050565b80611bb7610e90612331565b611bd35760405162461bcd60e51b8152600401610b7e90614c29565b81611bdd816121a9565b610f25878787878761291b565b7f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87546001600160a01b0316611c1d612331565b6001600160a01b031614611c435760405162461bcd60e51b8152600401610b7e90614c72565b6020819003611c66576000611c5a82840184614020565b905061147e8482612340565b6000611c7482840184614f3e565b805190915060005b818110156111a057611ca786848381518110611c9a57611c9a614b4a565b6020026020010151612340565b80611cb181614bbc565b915050611c7c565b600081815261013960205260408120546001600160401b03161580159061095e57505060009081526101396020526040902054426001600160401b039091161090565b6000818152610138602052604090208054606091906119f690614afb565b80611d26610e90612331565b611d425760405162461bcd60e51b8152600401610b7e90614c29565b81611d4c816121a9565b610f258787878787613569565b6000611d63612331565b6001600160a01b0381166000908152610135602052604081205491925003611dd75760405162461bcd60e51b815260206004820152602160248201527f52656769737472793a20524556455253455f5245434f52445f49535f454d50546044820152605960f81b6064820152608401610b7e565b6111fa8161357f565b6060816001600160401b03811115611dfa57611dfa61456c565b604051908082528060200260200182016040528015611e2d57816020015b6060815260200190600190039081611e185790505b50905060005b82811015611e8c57611e5c848483818110611e5057611e50614b4a565b905060200201356119d9565b828281518110611e6e57611e6e614b4a565b60200260200101819052508080611e8490614bbc565b915050611e33565b5092915050565b610134546001600160a01b0316611ea8612331565b6001600160a01b031614611ece5760405162461bcd60e51b8152600401610b7e90614bd5565b61013454611ee5906001600160a01b031684612340565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39528383604051611f17929190614dfe565b60405180910390a2505050565b600054610100900460ff1615808015611f445750600054600160ff909116105b80611f5e5750303b158015611f5e575060005460ff166001145b611fc15760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610b7e565b6000805460ff191660011790558015611fe4576000805461ff0019166101001790555b61013480546001600160a01b0319166001600160a01b038716179055837f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec9237880546001600160a01b0319166001600160a01b03929092169190911790556040805180820182526013815272556e73746f707061626c6520446f6d61696e7360681b60208083019190915282518084019093526002835261155160f21b9083015261208c916135c4565b612094613604565b61209c613604565b6120a58361362d565b6120ae8261365d565b8015610ed0576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050505050565b60006001600160e01b031982166380ac58cd60e01b148061212b57506001600160e01b03198216635b5e139f60e01b145b8061095e57506301ffc9a760e01b6001600160e01b031983161461095e565b6000818152606760205260409020546001600160a01b03166111fa5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610b7e565b303303612206576121b8613204565b81146111fa5760405162461bcd60e51b815260206004820152601760248201527f52656769737472793a20544f4b454e5f494e56414c49440000000000000000006044820152606401610b7e565b6111fa8161368d565b600061221a82612714565b9050806001600160a01b0316836001600160a01b0316036122875760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610b7e565b806001600160a01b0316612299612331565b6001600160a01b031614806122b557506122b5816108a6612331565b6123275760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610b7e565b610a3183836136bb565b600061233b613729565b905090565b6001600160a01b0382166123965760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610b7e565b6000818152606760205260409020546001600160a01b0316156123fb5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610b7e565b61240760008383613744565b6001600160a01b0382166000908152606860205260408120805460019290612430908490614fce565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000612498612b40565b90506124a481836136bb565b60008051602061532883398151915254604080516020808201869052825180830390910181528183019283905263e3dec8fb60e01b9092526001600160a01b0390921691829163e3dec8fb91612501918891309190604401614fe1565b600060405180830381600087803b15801561251b57600080fd5b505af115801561252f573d6000803e3d6000fd5b5050505050505050565b6060610dd58360405160200161254f9190614cb4565b6040516020818303038152906040528051906020012060001c83613820565b60606125798561368d565b600080876001600160a01b0316866125938b8a8989613218565b6040516125a09190614cb4565b60006040518083038160008787f1925050503d80600081146125de576040519150601f19603f3d011682016040523d82523d6000602084013e6125e3565b606091505b5090925090506125f4603f87615023565b5a1161260257612602615037565b61264282826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c4544000000000000815250613902565b9998505050505050505050565b805160009081905b80156126a15782915061268d828561267060018561504d565b8151811061268057612680614b4a565b602002602001015161393b565b92508061269981615060565b915050612657565b50915091565b6126b0816139e7565b6040516020016126c291815260200190565b60408051601f198184030181528282528051602091820120600085815260cb9092529181209190915582917f185c30856dadb58bf097c1f665a52ada7029752dbcad008ea3fefc73bee8c9fe9190a250565b6000818152606760205260408120546001600160a01b03168061095e5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610b7e565b826001600160a01b031661278782612714565b6001600160a01b0316146127eb5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610b7e565b6001600160a01b03821661284d5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610b7e565b612858838383613744565b6128636000826136bb565b6001600160a01b038316600090815260686020526040812080546001929061288c90849061504d565b90915550506001600160a01b03821660009081526068602052604081208054600192906128ba908490614fce565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60005b848110156111a05761297786868381811061293b5761293b614b4a565b905060200281019061294d9190614b60565b86868581811061295f5761295f614b4a565b90506020028101906129719190614b60565b86612ce8565b8061298181614bbc565b91505061291e565b60606000826000815181106129a0576129a0614b4a565b602002602001015190506000600190505b8351811015611e8c57818482815181106129cd576129cd614b4a565b60200260200101516040516020016129e6929190615077565b60405160208183030381529060405291508080612a0290614bbc565b9150506129b1565b61dead6001600160a01b03841614801590612a3c57506001600160a01b03831660009081526101356020526040902054155b15610a3157610a31838383612e8c565b600080612a588361125d565b90506001600160a01b03811615801590610cc95750806001600160a01b0316846001600160a01b03161480612ab257506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b80610cc95750836001600160a01b0316612acb846109f6565b6001600160a01b031614949350505050565b60005b848110156111a057612b2e868683818110612afd57612afd614b4a565b90506020020135858584818110612b1657612b16614b4a565b9050602002810190612b289190614b60565b85612dc7565b80612b3881614bbc565b915050612ae0565b600080516020615328833981519152546000906001600160a01b03168015612c3d5760405163721804d360e11b81523060048201526000906001600160a01b0383169063e43009a690602401602060405180830381865afa158015612ba9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612bcd91906150b3565b60405163e66f960360e01b8152600481018290529091506001600160a01b0383169063e66f960390602401602060405180830381865afa158015612c15573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612c3991906150cc565b9250505b5090565b6000612c4c82612714565b9050612c5a81600084613744565b612c656000836136bb565b6001600160a01b0381166000908152606860205260408120805460019290612c8e90849061504d565b909155505060008281526067602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60008585604051602001612cfd9291906150e9565b60408051601f198184030181528282528051602091820120601f8901829004820284018201909252878352909250612d519183918990899081908401838280828437600092019190915250612e6792505050565b6111a08187878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b018190048102820181019092528981529250899150889081908401838280828437600092019190915250889250613a0f915050565b612dd084613b44565b612e1c5760405162461bcd60e51b815260206004820152601c60248201527f5265636f726453746f726167653a204b45595f4e4f545f464f554e44000000006044820152606401610b7e565b61147e84612e29866119d9565b85858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250879250613a0f915050565b612e7082613b44565b6110b457600082815260c960205260409020610a3182826150f9565b6000828152610138602052604090208054612ea690614afb565b9050600003612eca57600082815261013860205260409020612ec882826150f9565b505b6001600160a01b03831660008181526101356020526040808220859055518492917feb76a21470988c474a21f690cc28fee1ed511bd812dc3c21fd0f49c5e5d4708a91a3505050565b606080612f1f846119d9565b9150612f2b8484613820565b90509250929050565b6000818152610137602052604081205460ff16801561095e57506101366000612f5b612331565b6001600160a01b0316815260208101919091526040016000205460ff1692915050565b60008051602061532883398151915254604051633805550f60e01b81526001600160a01b03909116908190633805550f90612fbf9086908690600401614dfe565b600060405180830381600087803b158015612fd957600080fd5b505af1158015610f25573d6000803e3d6000fd5b816001600160a01b0316836001600160a01b03160361304e5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610b7e565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f90602401602060405180830381865afa158015613102573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061312691906150b3565b905060006131d48660600151805190602001208688602001516040516020016131749392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b90508186602001511480156131fa575085516131fa906001600160a01b03168286613b6a565b9695505050505050565b60003033036132155750601f193601355b90565b606082858560405160200161322f939291906151b8565b6040516020818303038152906040529050949350505050565b606081516001600160401b038111156132635761326361456c565b60405190808252806020026020018201604052801561329657816020015b60608152602001906001900390816132815790505b50905060005b825181101561142f57600080306001600160a01b03168584815181106132c4576132c4614b4a565b60200260200101516040516132d99190614cb4565b600060405180830381855af49150503d8060008114613314576040519150601f19603f3d011682016040523d82523d6000602084013e613319565b606091505b5091509150613341828260405180606001604052806027815260200161534860279139613902565b84848151811061335357613353614b4a565b60200260200101819052505050808061336b90614bbc565b91505061329c565b61337e848484612774565b61338a84848484613cac565b61147e5760405162461bcd60e51b8152600401610b7e906151f7565b6000818152610137602052604090205460ff16156111fa5760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a20544f4b454e5f555047524144454400000000000000006044820152606401610b7e565b6134108484612340565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c395283604051613440919061400d565b60405180910390a2801561147e5761147e848484612a0a565b6060610133805461097390614afb565b6060816000036134905750506040805180820190915260018152600360fc1b602082015290565b8160005b81156134ba57806134a481614bbc565b91506134b39050600a83615023565b9150613494565b6000816001600160401b038111156134d4576134d461456c565b6040519080825280601f01601f1916602001820160405280156134fe576020820181803683370190505b5090505b8415610cc95761351360018361504d565b9150613520600a86615249565b61352b906030614fce565b60f81b81838151811061354057613540614b4a565b60200101906001600160f81b031916908160001a905350613562600a86615023565b9450613502565b613572816126a7565b610ed0858585858561291b565b6001600160a01b03811660008181526101356020526040808220829055517ffcf5eec0cfa3e6332f5f0e63ec242d71f866a61d121d6cdf5c2eb3b668a26c4f9190a250565b600054610100900460ff166135eb5760405162461bcd60e51b8152600401610b7e9061525d565b60656135f783826150f9565b506066610a3182826150f9565b600054610100900460ff1661362b5760405162461bcd60e51b8152600401610b7e9061525d565b565b600054610100900460ff166136545760405162461bcd60e51b8152600401610b7e9061525d565b6111fa81613db1565b600054610100900460ff166136845760405162461bcd60e51b8152600401610b7e9061525d565b6111fa81613e0a565b600081815261010060205260409020546136a8906001614fce565b6000918252610100602052604090912055565b600081815260696020526040902080546001600160a01b0319166001600160a01b03841690811790915581906136f082612714565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600030330361373f575060331936013560601c90565b503390565b6001600160a01b03821661375b5761375b816133a6565b600081815261013960205260409020546001600160401b0316156137f6576001600160a01b038216158015906137aa5750613794612b40565b6001600160a01b0316826001600160a01b031614155b6137f65760405162461bcd60e51b815260206004820152601960248201527f52656769737472793a20544f4b454e5f455850495241424c45000000000000006044820152606401610b7e565b6001600160a01b03831660009081526101356020526040902054819003610a3157610a318361357f565b606061382b82612f34565b15613845575060408051602081019091526000815261095e565b60ca6000613852846139e7565b81526020019081526020016000206000848152602001908152602001600020805461387c90614afb565b80601f01602080910402602001604051908101604052809291908181526020018280546138a890614afb565b80156138f55780601f106138ca576101008083540402835291602001916138f5565b820191906000526020600020905b8154815290600101906020018083116138d857829003601f168201915b5050505050905092915050565b60608315613911575081610dd5565b8251156139215782518084602001fd5b8160405162461bcd60e51b8152600401610b7e919061400d565b600081516000036139865760405162461bcd60e51b815260206004820152601560248201527452656769737472793a204c4142454c5f454d50545960581b6044820152606401610b7e565b82826040516020016139989190614cb4565b604051602081830303815290604052805190602001206040516020016139c8929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b600081815260cb602052604081205415612c3d57600082815260cb602052604090205461095e565b60ca6000613a1c836139e7565b815260200190815260200160002060008581526020019081526020016000208054613a4690614afb565b9050600003613a9e5782604051613a5d9190614cb4565b6040518091039020817f7ae4f661958fbecc2f77be6b0eb280d2a6f604b29e1e7221c82b9da0c4af7f8685604051613a95919061400d565b60405180910390a35b8160ca6000613aac846139e7565b815260200190815260200160002060008681526020019081526020016000209081613ad791906150f9565b5081604051613ae69190614cb4565b604051809103902083604051613afc9190614cb4565b6040518091039020827f851ffe8e74d5015261dba0a1f9e1b0e5d42c5af5d2ad1908fee897c7d80a0d928686604051613b36929190614777565b60405180910390a450505050565b600081815260c9602052604081208054829190613b6090614afb565b9050119050919050565b6000806000613b798585613e58565b90925090506000816004811115613b9257613b926152a8565b148015613bb05750856001600160a01b0316826001600160a01b0316145b15613bc057600192505050610dd5565b600080876001600160a01b0316631626ba7e60e01b8888604051602401613be89291906152be565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051613c269190614cb4565b600060405180830381855afa9150503d8060008114613c61576040519150601f19603f3d011682016040523d82523d6000602084013e613c66565b606091505b5091509150818015613c79575080516020145b8015613ca057508051630b135d3f60e11b90613c9e90830160209081019084016150b3565b145b98975050505050505050565b60006001600160a01b0384163b15613da957836001600160a01b031663150b7a02613cd5612331565b8786866040518563ffffffff1660e01b8152600401613cf794939291906152d7565b6020604051808303816000875af1925050508015613d32575060408051601f3d908101601f19168201909252613d2f9181019061530a565b60015b613d8f573d808015613d60576040519150601f19603f3d011682016040523d82523d6000602084013e613d65565b606091505b508051600003613d875760405162461bcd60e51b8152600401610b7e906151f7565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610cc9565b506001610cc9565b600054610100900460ff16613dd85760405162461bcd60e51b8152600401610b7e9061525d565b806000805160206153288339815191525b80546001600160a01b0319166001600160a01b039290921691909117905550565b600054610100900460ff16613e315760405162461bcd60e51b8152600401610b7e9061525d565b807f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87613de9565b6000808251604103613e8e5760208301516040840151606085015160001a613e8287828585613e9d565b94509450505050613e96565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613ed45750600090506003613f81565b8460ff16601b14158015613eec57508460ff16601c14155b15613efd5750600090506004613f81565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613f51573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613f7a57600060019250925050613f81565b9150600090505b94509492505050565b6001600160e01b0319811681146111fa57600080fd5b600060208284031215613fb257600080fd5b8135610dd581613f8a565b60005b83811015613fd8578181015183820152602001613fc0565b50506000910152565b60008151808452613ff9816020860160208601613fbd565b601f01601f19169290920160200192915050565b602081526000610dd56020830184613fe1565b60006020828403121561403257600080fd5b5035919050565b6001600160a01b03811681146111fa57600080fd5b6000806040838503121561406157600080fd5b823561406c81614039565b946020939093013593505050565b60008083601f84011261408c57600080fd5b5081356001600160401b038111156140a357600080fd5b602083019150836020828501011115613e9657600080fd5b6000806000806000608086880312156140d357600080fd5b85356140de81614039565b945060208601356140ee81614039565b93506040860135925060608601356001600160401b0381111561411057600080fd5b61411c8882890161407a565b969995985093965092949392505050565b60008083601f84011261413f57600080fd5b5081356001600160401b0381111561415657600080fd5b6020830191508360208260051b8501011115613e9657600080fd5b60008060006040848603121561418657600080fd5b83356001600160401b0381111561419c57600080fd5b6141a88682870161412d565b909790965060209590950135949350505050565b600082825180855260208086019550808260051b84010181860160005b8481101561420757601f198684030189526141f5838351613fe1565b988401989250908301906001016141d9565b5090979650505050505050565b602081526000610dd560208301846141bc565b60008060006040848603121561423c57600080fd5b83356001600160401b0381111561425257600080fd5b6141a88682870161407a565b60008060006040848603121561427357600080fd5b83356001600160401b038082111561428a57600080fd5b908501906080828803121561429e57600080fd5b909350602085013590808211156142b457600080fd5b506142c18682870161407a565b9497909650939450505050565b8035801515811461127557600080fd5b60008060008060008060008060a0898b0312156142fa57600080fd5b883561430581614039565b975060208901356001600160401b038082111561432157600080fd5b61432d8c838d0161412d565b909950975060408b013591508082111561434657600080fd5b6143528c838d0161412d565b909750955060608b013591508082111561436b57600080fd5b506143788b828c0161412d565b909450925061438b905060808a016142ce565b90509295985092959890939650565b6000806000606084860312156143af57600080fd5b83356143ba81614039565b925060208401356143ca81614039565b929592945050506040919091013590565b600080602083850312156143ee57600080fd5b82356001600160401b0381111561440457600080fd5b6144108582860161412d565b90969095509350505050565b60008060008060006060868803121561443457600080fd5b85356001600160401b038082111561444b57600080fd5b61445789838a0161412d565b9097509550602088013591508082111561447057600080fd5b5061447d8882890161412d565b96999598509660400135949350505050565b600080604083850312156144a257600080fd5b82356001600160401b038116811461406c57600080fd5b6000806000806000606086880312156144d157600080fd5b85356001600160401b03808211156144e857600080fd5b6144f489838a0161407a565b9097509550602088013591508082111561450d57600080fd5b5061447d8882890161407a565b6000806000806060858703121561453057600080fd5b8435935060208501356001600160401b0381111561454d57600080fd5b6145598782880161407a565b9598909750949560400135949350505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b03811182821017156145aa576145aa61456c565b604052919050565b600082601f8301126145c357600080fd5b81356001600160401b038111156145dc576145dc61456c565b6145ef601f8201601f1916602001614582565b81815284602083860101111561460457600080fd5b816020850160208301376000918101602001919091529392505050565b60006020828403121561463357600080fd5b81356001600160401b0381111561464957600080fd5b610cc9848285016145b2565b60006020828403121561466757600080fd5b8135610dd581614039565b60006001600160401b0382111561468b5761468b61456c565b5060051b60200190565b60006146a86146a384614672565b614582565b8381529050602080820190600585901b8401868111156146c757600080fd5b845b818110156147025780356001600160401b038111156146e85760008081fd5b6146f4898289016145b2565b8552509282019282016146c9565b505050509392505050565b60006020828403121561471f57600080fd5b81356001600160401b0381111561473557600080fd5b8201601f8101841361474657600080fd5b610cc984823560208401614695565b6000806040838503121561476857600080fd5b50508035926020909101359150565b60408152600061478a6040830185613fe1565b8281036020840152610dd18185613fe1565b600080600080606085870312156147b257600080fd5b84356147bd81614039565b93506020850135925060408501356001600160401b038111156147df57600080fd5b6147eb8782880161407a565b95989497509550505050565b60008060008060008060006080888a03121561481257600080fd5b87356001600160401b038082111561482957600080fd5b6148358b838c0161407a565b909950975060208a0135965060408a013591508082111561485557600080fd5b6148618b838c0161412d565b909650945060608a013591508082111561487a57600080fd5b506148878a828b0161412d565b989b979a50959850939692959293505050565b600080602083850312156148ad57600080fd5b82356001600160401b038111156148c357600080fd5b6144108582860161407a565b600080604083850312156148e257600080fd5b82356148ed81614039565b9150612f2b602084016142ce565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101561495057603f1988860301845261493e858351613fe1565b94509285019290850190600101614922565b5092979650505050505050565b60408152600061497060408301856141bc565b8281036020840152610dd181856141bc565b6000806000806080858703121561499857600080fd5b84356149a381614039565b935060208501356149b381614039565b92506040850135915060608501356001600160401b038111156149d557600080fd5b6149e1878288016145b2565b91505092959194509250565b600080600060408486031215614a0257600080fd5b8335614a0d81614039565b925060208401356001600160401b03811115614a2857600080fd5b6142c18682870161407a565b60008060408385031215614a4757600080fd5b8235614a5281614039565b91506020830135614a6281614039565b809150509250929050565b600080600060408486031215614a8257600080fd5b8335925060208401356001600160401b03811115614a2857600080fd5b60008060008060808587031215614ab557600080fd5b8435614ac081614039565b93506020850135614ad081614039565b92506040850135614ae081614039565b91506060850135614af081614039565b939692955090935050565b600181811c90821680614b0f57607f821691505b60208210810361142f57634e487b7160e01b600052602260045260246000fd5b600060208284031215614b4157600080fd5b610dd5826142ce565b634e487b7160e01b600052603260045260246000fd5b6000808335601e19843603018112614b7757600080fd5b8301803591506001600160401b03821115614b9157600080fd5b602001915036819003821315613e9657600080fd5b634e487b7160e01b600052601160045260246000fd5b600060018201614bce57614bce614ba6565b5060010190565b60208082526027908201527f52656769737472793a2053454e4445525f49535f4e4f545f4d494e54494e475f60408201526626a0a720a3a2a960c91b606082015260800190565b6000610dd5368484614695565b60208082526029908201527f52656769737472793a2053454e4445525f49535f4e4f545f415050524f5645446040820152682fa7a92fa7aba722a960b91b606082015260800190565b60208082526022908201527f52656769737472793a20494e53554646494349454e545f5045524d495353494f6040820152614e5360f01b606082015260800190565b60008251614cc6818460208701613fbd565b9190910192915050565b601f821115610a3157600081815260208120601f850160051c81016020861015614cf75750805b601f850160051c820191505b818110156111a057828155600101614d03565b6001600160401b03831115614d2d57614d2d61456c565b614d4183614d3b8354614afb565b83614cd0565b6000601f841160018114614d755760008515614d5d5750838201355b600019600387901b1c1916600186901b178355610ed0565b600083815260209020601f19861690835b82811015614da65786850135825560209485019460019092019101614d86565b5086821015614dc35760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b602081526000610cc9602083018486614dd5565b600060808236031215614e2457600080fd5b604051608081016001600160401b038282108183111715614e4757614e4761456c565b8160405284359150614e5882614039565b81835260208501356020840152604085013560408401526060850135915080821115614e8357600080fd5b50614e90368286016145b2565b60608301525092915050565b6000614eaa6146a384614672565b80848252602080830192508560051b850136811115614ec857600080fd5b855b81811015614f035780356001600160401b03811115614ee95760008081fd5b614ef536828a016145b2565b865250938201938201614eca565b50919695505050505050565b60008351614f21818460208801613fbd565b835190830190614f35818360208801613fbd565b01949350505050565b60006020808385031215614f5157600080fd5b82356001600160401b03811115614f6757600080fd5b8301601f81018513614f7857600080fd5b8035614f866146a382614672565b81815260059190911b82018301908381019087831115614fa557600080fd5b928401925b82841015614fc357833582529284019290840190614faa565b979650505050505050565b8082018082111561095e5761095e614ba6565b6001600160a01b03848116825283166020820152606060408201819052600090610b8790830184613fe1565b634e487b7160e01b600052601260045260246000fd5b6000826150325761503261500d565b500490565b634e487b7160e01b600052600160045260246000fd5b8181038181111561095e5761095e614ba6565b60008161506f5761506f614ba6565b506000190190565b60008351615089818460208801613fbd565b601760f91b90830190815283516150a7816001840160208801613fbd565b01600101949350505050565b6000602082840312156150c557600080fd5b5051919050565b6000602082840312156150de57600080fd5b8151610dd581614039565b8183823760009101908152919050565b81516001600160401b038111156151125761511261456c565b615126816151208454614afb565b84614cd0565b602080601f83116001811461515b57600084156151435750858301515b600019600386901b1c1916600185901b1785556111a0565b600085815260208120601f198616915b8281101561518a5788860151825594840194600190910190840161516b565b50858210156151a85787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600084516151ca818460208901613fbd565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6000826152585761525861500d565b500690565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b634e487b7160e01b600052602160045260246000fd5b828152604060208201526000610cc96040830184613fe1565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906131fa90830184613fe1565b60006020828403121561531c57600080fd5b8151610dd581613f8a56febe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a164736f6c6343000811000a";
const isSuperArgs = (xs) => xs.length > 1;
class UNSRegistryMock__factory extends ethers_1.ContractFactory {
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
exports.UNSRegistryMock__factory = UNSRegistryMock__factory;
UNSRegistryMock__factory.bytecode = _bytecode;
UNSRegistryMock__factory.abi = _abi;
