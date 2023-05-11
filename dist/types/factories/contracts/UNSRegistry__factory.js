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
const _bytecode = "0x608060405234801561001057600080fd5b50615084806100206000396000f3fe608060405234801561001057600080fd5b50600436106103835760003560e01c806370a08231116101de578063b88d4fde1161010f578063e985e9c5116100ad578063f5c1f76e1161007c578063f5c1f76e14610831578063f7df5c6014610844578063f8c8765e14610857578063ffa1ad741461086a57600080fd5b8063e985e9c5146107d3578063ebf0c7171461080f578063ec129eea14610816578063f25eb5c11461082957600080fd5b8063bebec6b4116100e9578063bebec6b414610787578063c87b56dd1461079a578063ce92b33e146107ad578063cf2c52cb146107c057600080fd5b8063b88d4fde1461074e578063ba5d40b714610761578063bb5b27e11461077457600080fd5b8063a22cb4651161017c578063ab3b87fe11610156578063ab3b87fe146106e7578063ac9650d8146106fa578063b3f9e4cb1461071a578063b85afd281461072d57600080fd5b8063a22cb46514610695578063a3f4df7e146106a8578063a4247400146106d457600080fd5b80639508b1c4116101b85780639508b1c41461065f5780639559c0bd1461067257806395d89b411461067a57806399e0dd7c1461068257600080fd5b806370a08231146106265780637e37479e1461063957806394d008ef1461064c57600080fd5b806342842e0e116102b85780635096023911610256578063638e5c7811610230578063638e5c78146105be578063663f7b2a146105d1578063672b9f81146105e45780636ccbae5f1461060557600080fd5b8063509602391461057c578063572b6c051461058f5780636352211e146105ab57600080fd5b806347c816991161029257806347c81699146105305780634a72584d146105435780634f558e791461055657806350382c1a1461056957600080fd5b806342842e0e146104f757806342966c681461050a578063430c20811461051d57600080fd5b80631bf7e13e11610325578063276fabb1116102ff578063276fabb11461049d57806327f18975146104be578063310bd74b146104d157806340c10f19146104e457600080fd5b80631bf7e13e146104645780631f71be061461047757806323b872dd1461048a57600080fd5b8063095ea7b311610361578063095ea7b3146103f0578063150b7a02146104055780631bd8cc1a146104315780631be5e7ed1461045157600080fd5b806301ffc9a71461038857806306fdde03146103b0578063081812fc146103c5575b600080fd5b61039b610396366004614606565b61088e565b60405190151581526020015b60405180910390f35b6103b861089f565b6040516103a79190614b91565b6103d86103d3366004614834565b610931565b6040516001600160a01b0390911681526020016103a7565b6104036103fe366004614381565b610958565b005b610418610413366004614173565b610971565b6040516001600160e01b031990911681526020016103a7565b61044461043f3660046144b4565b610acc565b6040516103a79190614b2c565b6103b861045f36600461476e565b610bec565b6103b86104723660046147d5565b610c37565b61040361048536600461424c565b610d42565b610403610498366004614133565b610dea565b6104b06104ab366004614405565b610e3d565b6040519081526020016103a7565b6104036104cc366004614444565b610e4c565b6104036104df366004614834565b610e94565b6104036104f2366004614381565b610ecf565b610403610505366004614133565b610f1c565b610403610518366004614834565b610f37565b61039b61052b366004614381565b610f7b565b61040361053e366004614710565b610f87565b61040361055136600461487c565b610fc6565b61039b610564366004614834565b61100c565b6104036105773660046147a3565b61102b565b61040361058a366004614068565b611061565b61039b61059d366004614068565b6001600160a01b0316301490565b6103d86105b9366004614834565b6110c1565b6104036105cc366004614834565b611121565b6104036105df3660046144fd565b61116c565b6105f76105f23660046148cc565b6111a6565b6040516103a7929190614ba4565b6104b0610613366004614834565b6000908152610100602052604090205490565b6104b0610634366004614068565b6111be565b6104b0610647366004614068565b611244565b61040361065a3660046143ac565b611275565b61040361066d36600461463e565b6112c4565b6104b0601481565b6103b861134b565b6104036106903660046146dd565b61135a565b6104036106a3366004614304565b6113e0565b6103b86040518060400160405280600d81526020016c554e533a20526567697374727960981b81525081565b61039b6106e23660046147d5565b6113f2565b6104036106f5366004614381565b61143d565b61070d610708366004614405565b611482565b6040516103a79190614acb565b6103d8610728366004614834565b61157b565b61074061073b3660046144b4565b6115a5565b6040516103a7929190614b3f565b61040361075c3660046141e3565b61170d565b61040361076f36600461424c565b611754565b6103b8610782366004614834565b6117dd565b6103b8610795366004614068565b61187f565b6103b86107a8366004614834565b611949565b6104036107bb366004614444565b6119af565b6104036107ce36600461432f565b6119ee565b61039b6107e13660046140a0565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006104b0565b610403610824366004614444565b611acb565b610403611b0a565b61044461083f366004614405565b611b90565b61040361085236600461484c565b611c6d565b6104036108653660046140d8565b611cfe565b6103b86040518060400160405280600581526020016418171c171960d91b81525081565b600061089982611ed4565b92915050565b6060606580546108ae90614f5f565b80601f01602080910402602001604051908101604052809291908181526020018280546108da90614f5f565b80156109275780601f106108fc57610100808354040283529160200191610927565b820191906000526020600020905b81548152906001019060200180831161090a57829003601f168201915b5050505050905090565b600061093c82611f24565b506000908152606960205260409020546001600160a01b031690565b8061096281611f83565b61096c8383611fea565b505050565b60007f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378546001600160a01b03166109a661210d565b6001600160a01b03161415610a68576109bd61210d565b6001600160a01b03166342966c68856040518263ffffffff1660e01b81526004016109ea91815260200190565b600060405180830381600087803b158015610a0457600080fd5b505af1158015610a18573d6000803e3d6000fd5b505050821580159150610a325750610a32828401846145d4565b15610a5057610a41308561211c565b610a4b858561226a565b610a5a565b610a5a858561211c565b50630a85bd0160e11b610ac3565b60405162461bcd60e51b815260206004820152602560248201527f52656769737472793a204552433732315f524543454956494e475f50524f4849604482015264109255115160da1b60648201526084015b60405180910390fd5b95945050505050565b6060826001600160401b03811115610af457634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610b2757816020015b6060815260200190600190039081610b125790505b50905060005b83811015610be457610ba6858583818110610b5857634e487b7160e01b600052603260045260246000fd5b9050602002810190610b6a9190614d38565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250879250612315915050565b828281518110610bc657634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080610bdc90614f94565b915050610b2d565b509392505050565b6060610c2f84848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250869250612315915050565b949350505050565b606060005a9050610c498585856113f2565b610ca55760405162461bcd60e51b815260206004820152602760248201527f554e535265676973747279466f727761726465723a205349474e41545552455f6044820152661253959053125160ca1b6064820152608401610aba565b610d37610cb56020870187614068565b30604088013584610cc960608b018b614d38565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b908190840183828082843760009201919091525061234a92505050565b9150505b9392505050565b610134546001600160a01b0316610d5761210d565b6001600160a01b031614610d7d5760405162461bcd60e51b8152600401610aba90614c64565b6000610d91610d8c888a614e87565b612439565b509050610d9d8161249f565b610db0610da9826110c1565b8a8361250c565b610dbd86868686856126b3565b8115610ddf57610ddf8982610dda610dd58b8d614e87565b61273d565b6127da565b505050505050505050565b80610dfc610df661210d565b8261281c565b610e185760405162461bcd60e51b8152600401610aba90614bc9565b81610e2281611f83565b610e2b8361249f565b610e3685858561250c565b5050505050565b6000610be4610d8c8385614e87565b80610e58610df661210d565b610e745760405162461bcd60e51b8152600401610aba90614bc9565b81610e7e81611f83565b610e8b878787878761289a565b50505050505050565b80610ea0610df661210d565b610ebc5760405162461bcd60e51b8152600401610aba90614bc9565b81610ec681611f83565b61096c8361249f565b610ed7612919565b6001600160a01b0316610ee861210d565b6001600160a01b031614610f0e5760405162461bcd60e51b8152600401610aba90614cf6565b610f18828261211c565b5050565b61096c8383836040518060200160405280600081525061170d565b80610f43610df661210d565b610f5f5760405162461bcd60e51b8152600401610aba90614bc9565b81610f6981611f83565b610f728361249f565b61096c83612a2c565b6000610d3b838361281c565b80610f93610df661210d565b610faf5760405162461bcd60e51b8152600401610aba90614bc9565b81610fb981611f83565b610e8b8787878787612ad3565b80610fd2610df661210d565b610fee5760405162461bcd60e51b8152600401610aba90614bc9565b81610ff881611f83565b61100486868686612bb2565b505050505050565b6000818152606760205260408120546001600160a01b03161515610899565b61105e8160405160200161103f9190614996565b6040516020818303038152906040528051906020012060001c82612c52565b50565b610134546001600160a01b031661107661210d565b6001600160a01b03161461109c5760405162461bcd60e51b8152600401610aba90614c64565b6001600160a01b0316600090815261013660205260409020805460ff19166001179055565b6000818152606760205260408120546001600160a01b0316806108995760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610aba565b8061112d610df661210d565b6111495760405162461bcd60e51b8152600401610aba90614bc9565b61115b61115461210d565b308461250c565b610f1861116661210d565b8361226a565b600061117782612439565b50905061118381612c7e565b61118c81611f83565b610f1861119761210d565b826111a18561273d565b612cee565b6060806111b38484612d7b565b909590945092505050565b60006001600160a01b0382166112285760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610aba565b506001600160a01b031660009081526068602052604090205490565b6001600160a01b0381166000908152610135602052604081205461126781612d9c565b61126f578091505b50919050565b61127d612919565b6001600160a01b031661128e61210d565b6001600160a01b0316146112b45760405162461bcd60e51b8152600401610aba90614cf6565b6112be848461211c565b50505050565b6112ce8787612de6565b6112d661210d565b6001600160a01b03166112e8866110c1565b6001600160a01b03161461133e5760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610aba565b610e8b84848484896126b3565b6060606680546108ae90614f5f565b610134546001600160a01b031661136f61210d565b6001600160a01b0316146113955760405162461bcd60e51b8152600401610aba90614c64565b6113a26101338383613de0565b507f4b120d6a959a84a520fa48f5f937cca0e79129423487af7901213b5d2e89313b82826040516113d4929190614b7d565b60405180910390a15050565b610f186113eb61210d565b8383612e55565b6000610c2f61140085614e94565b3085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612f2492505050565b80611449610df661210d565b6114655760405162461bcd60e51b8152600401610aba90614bc9565b8161146f81611f83565b6112be61147b846110c1565b858561250c565b606060006114908385614e12565b9050303314156115725760005b83811015611570576115326114b061210d565b6114b861307c565b8787858181106114d857634e487b7160e01b600052603260045260246000fd5b90506020028101906114ea9190614d38565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525060408051602081019091529081529250613091915050565b82828151811061155257634e487b7160e01b600052603260045260246000fd5b6020026020010181905250808061156890614f94565b91505061149d565b505b610c2f816130c1565b6000818152606760205260408120546001600160a01b031661159e576000610899565b3092915050565b606080836001600160401b038111156115ce57634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561160157816020015b60608152602001906001900390816115ec5790505b509150836001600160401b0381111561162a57634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561165d57816020015b60608152602001906001900390816116485790505b50905060005b848110156117045761169b86868381811061168e57634e487b7160e01b600052603260045260246000fd5b9050602002013585612d7b565b8483815181106116bb57634e487b7160e01b600052603260045260246000fd5b602002602001018484815181106116e257634e487b7160e01b600052603260045260246000fd5b60200260200101829052829052505080806116fc90614f94565b915050611663565b50935093915050565b81611719610df661210d565b6117355760405162461bcd60e51b8152600401610aba90614bc9565b8261173f81611f83565b6117488461249f565b61100486868686613216565b610134546001600160a01b031661176961210d565b6001600160a01b03161461178f5760405162461bcd60e51b8152600401610aba90614c64565b60008061179f610d8c898b614e87565b915091506117ac81613249565b6117c48a836117be610dd58c8e614e87565b866132a9565b6117d187878787866126b3565b50505050505050505050565b600081815260c9602052604090208054606091906117fa90614f5f565b80601f016020809104026020016040519081016040528092919081815260200182805461182690614f5f565b80156118735780601f1061184857610100808354040283529160200191611873565b820191906000526020600020905b81548152906001019060200180831161185657829003601f168201915b50505050509050919050565b6001600160a01b038116600090815261013560205260409020546060906118a581612d9c565b61126f5760008181526101386020526040902080546118c390614f5f565b80601f01602080910402602001604051908101604052809291908181526020018280546118ef90614f5f565b801561193c5780601f106119115761010080835404028352916020019161193c565b820191906000526020600020905b81548152906001019060200180831161191f57829003601f168201915b5050505050915050919050565b606061195482611f24565b600061195e6132fc565b9050600081511161197e5760405180602001604052806000815250610d3b565b806119888461330c565b604051602001611999929190614a3d565b6040516020818303038152906040529392505050565b806119bb610df661210d565b6119d75760405162461bcd60e51b8152600401610aba90614bc9565b816119e181611f83565b610e8b87878787876126b3565b7f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87546001600160a01b0316611a2161210d565b6001600160a01b031614611a475760405162461bcd60e51b8152600401610aba90614cf6565b6020811415611a6a576000611a5e82840184614834565b90506112be848261211c565b6000611a7882840184614542565b805190915060005b8181101561100457611ab986848381518110611aac57634e487b7160e01b600052603260045260246000fd5b602002602001015161211c565b80611ac381614f94565b915050611a80565b80611ad7610df661210d565b611af35760405162461bcd60e51b8152600401610aba90614bc9565b81611afd81611f83565b610e8b8787878787613425565b6000611b1461210d565b6001600160a01b03811660009081526101356020526040902054909150611b875760405162461bcd60e51b815260206004820152602160248201527f52656769737472793a20524556455253455f5245434f52445f49535f454d50546044820152605960f81b6064820152608401610aba565b61105e8161343b565b6060816001600160401b03811115611bb857634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015611beb57816020015b6060815260200190600190039081611bd65790505b50905060005b82811015611c6657611c28848483818110611c1c57634e487b7160e01b600052603260045260246000fd5b905060200201356117dd565b828281518110611c4857634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080611c5e90614f94565b915050611bf1565b5092915050565b610134546001600160a01b0316611c8261210d565b6001600160a01b031614611ca85760405162461bcd60e51b8152600401610aba90614c64565b61013454611cbf906001600160a01b03168461211c565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39528383604051611cf1929190614b7d565b60405180910390a2505050565b600054610100900460ff1615808015611d1e5750600054600160ff909116105b80611d385750303b158015611d38575060005460ff166001145b611d9b5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610aba565b6000805460ff191660011790558015611dbe576000805461ff0019166101001790555b61013480546001600160a01b0319166001600160a01b038716179055837f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec9237880546001600160a01b0319166001600160a01b03929092169190911790556040805180820182526013815272556e73746f707061626c6520446f6d61696e7360681b60208083019190915282518084019093526002835261155160f21b90830152611e6691613480565b611e6e6134ce565b611e766134ce565b611e7f836134f7565b611e8882613527565b8015610e36576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050505050565b60006001600160e01b031982166380ac58cd60e01b1480611f0557506001600160e01b03198216635b5e139f60e01b145b8061089957506301ffc9a760e01b6001600160e01b0319831614610899565b6000818152606760205260409020546001600160a01b031661105e5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610aba565b30331415611fe157611f9361307c565b811461105e5760405162461bcd60e51b815260206004820152601760248201527f52656769737472793a20544f4b454e5f494e56414c49440000000000000000006044820152606401610aba565b61105e81613557565b6000611ff5826110c1565b9050806001600160a01b0316836001600160a01b031614156120635760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610aba565b806001600160a01b031661207561210d565b6001600160a01b031614806120915750612091816107e161210d565b6121035760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610aba565b61096c8383613585565b60006121176135f3565b905090565b6001600160a01b0382166121725760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610aba565b6000818152606760205260409020546001600160a01b0316156121d75760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610aba565b6121e36000838361360f565b6001600160a01b038216600090815260686020526040812080546001929061220c908490614dcf565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000612274612919565b90506122808183613585565b60008051602061503183398151915254604080516020808201869052825180830390910181528183019283905263e3dec8fb60e01b9092526001600160a01b0390921691829163e3dec8fb916122dd918891309190604401614a6c565b600060405180830381600087803b1580156122f757600080fd5b505af115801561230b573d6000803e3d6000fd5b5050505050505050565b6060610d3b8360405160200161232b9190614996565b6040516020818303038152906040528051906020012060001c83613650565b606061235585613557565b600080876001600160a01b03168661236f8b8a8989613091565b60405161237c9190614996565b60006040518083038160008787f1925050503d80600081146123ba576040519150601f19603f3d011682016040523d82523d6000602084013e6123bf565b606091505b5090925090506123d0603f87614de7565b5a116123ec57634e487b7160e01b600052600160045260246000fd5b61242c82826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c4544000000000000815250613732565b9998505050505050505050565b805160009081905b801561249957829150612485828561245a600185614dfb565b8151811061247857634e487b7160e01b600052603260045260246000fd5b602002602001015161376b565b92508061249181614f48565b915050612441565b50915091565b6124a881613818565b6040516020016124ba91815260200190565b60408051601f198184030181528282528051602091820120600085815260cb9092529181209190915582917f185c30856dadb58bf097c1f665a52ada7029752dbcad008ea3fefc73bee8c9fe9190a250565b826001600160a01b031661251f826110c1565b6001600160a01b0316146125835760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610aba565b6001600160a01b0382166125e55760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610aba565b6125f083838361360f565b6125fb600082613585565b6001600160a01b0383166000908152606860205260408120805460019290612624908490614dfb565b90915550506001600160a01b0382166000908152606860205260408120805460019290612652908490614dcf565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60005b848110156110045761272b8686838181106126e157634e487b7160e01b600052603260045260246000fd5b90506020028101906126f39190614d38565b86868581811061271357634e487b7160e01b600052603260045260246000fd5b90506020028101906127259190614d38565b86612ad3565b8061273581614f94565b9150506126b6565b606060008260008151811061276257634e487b7160e01b600052603260045260246000fd5b602002602001015190506000600190505b8351811015611c66578184828151811061279d57634e487b7160e01b600052603260045260246000fd5b60200260200101516040516020016127b69291906149f1565b604051602081830303815290604052915080806127d290614f94565b915050612773565b61dead6001600160a01b0384161480159061280c57506001600160a01b03831660009081526101356020526040902054155b1561096c5761096c838383612cee565b600080612828836110c1565b9050806001600160a01b0316846001600160a01b0316148061286f57506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b80610c2f5750836001600160a01b031661288884610931565b6001600160a01b031614949350505050565b60005b84811015611004576129078686838181106128c857634e487b7160e01b600052603260045260246000fd5b905060200201358585848181106128ef57634e487b7160e01b600052603260045260246000fd5b90506020028101906129019190614d38565b85612bb2565b8061291181614f94565b91505061289d565b6000806000805160206150318339815191525460405163721804d360e11b81523060048201526001600160a01b039091169150600090829063e43009a69060240160206040518083038186803b15801561297257600080fd5b505afa158015612986573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129aa91906145ee565b60405163e66f960360e01b8152600481018290529091506001600160a01b0383169063e66f96039060240160206040518083038186803b1580156129ed57600080fd5b505afa158015612a01573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a259190614084565b9250505090565b6000612a37826110c1565b9050612a458160008461360f565b612a50600083613585565b6001600160a01b0381166000908152606860205260408120805460019290612a79908490614dfb565b909155505060008281526067602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60008585604051602001612ae8929190614a2d565b60408051601f198184030181528282528051602091820120601f8901829004820284018201909252878352909250612b3c9183918990899081908401838280828437600092019190915250612c5292505050565b6110048187878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b018190048102820181019092528981529250899150889081908401838280828437600092019190915250889250613844915050565b612bbb8461397f565b612c075760405162461bcd60e51b815260206004820152601c60248201527f5265636f726453746f726167653a204b45595f4e4f545f464f554e44000000006044820152606401610aba565b6112be84612c14866117dd565b85858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250879250613844915050565b612c5b8261397f565b610f1857600082815260c960209081526040909120825161096c92840190613e60565b612c8661210d565b6001600160a01b0316612c98826110c1565b6001600160a01b03161461105e5760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610aba565b6000828152610138602052604090208054612d0890614f5f565b15159050612d32576000828152610138602090815260409091208251612d3092840190613e60565b505b6001600160a01b03831660008181526101356020526040808220859055518492917feb76a21470988c474a21f690cc28fee1ed511bd812dc3c21fd0f49c5e5d4708a91a3505050565b606080612d87846117dd565b9150612d938484613650565b90509250929050565b6000818152610137602052604081205460ff16801561089957506101366000612dc361210d565b6001600160a01b0316815260208101919091526040016000205460ff1692915050565b60008051602061503183398151915254604051633805550f60e01b81526001600160a01b03909116908190633805550f90612e279086908690600401614b7d565b600060405180830381600087803b158015612e4157600080fd5b505af1158015610e8b573d6000803e3d6000fd5b816001600160a01b0316836001600160a01b03161415612eb75760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610aba565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f9060240160206040518083038186803b158015612f6657600080fd5b505afa158015612f7a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612f9e91906145ee565b9050600061304c866060015180519060200120868860200151604051602001612fec9392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b905081866020015114801561307257508551613072906001600160a01b031682866139a5565b9695505050505050565b60003033141561308e5750601f193601355b90565b60608285856040516020016130a8939291906149b2565b6040516020818303038152906040529050949350505050565b606081516001600160401b038111156130ea57634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561311d57816020015b60608152602001906001900390816131085790505b50905060005b825181101561126f57600080306001600160a01b031685848151811061315957634e487b7160e01b600052603260045260246000fd5b602002602001015160405161316e9190614996565b600060405180830381855af49150503d80600081146131a9576040519150601f19603f3d011682016040523d82523d6000602084013e6131ae565b606091505b50915091506131d6828260405180606001604052806027815260200161505160279139613732565b8484815181106131f657634e487b7160e01b600052603260045260246000fd5b60200260200101819052505050808061320e90614f94565b915050613123565b61322184848461250c565b61322d84848484613af5565b6112be5760405162461bcd60e51b8152600401610aba90614c12565b6000818152610137602052604090205460ff161561105e5760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a20544f4b454e5f555047524144454400000000000000006044820152606401610aba565b6132b3848461211c565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c3952836040516132e39190614b91565b60405180910390a280156112be576112be8484846127da565b606061013380546108ae90614f5f565b6060816133305750506040805180820190915260018152600360fc1b602082015290565b8160005b811561335a578061334481614f94565b91506133539050600a83614de7565b9150613334565b6000816001600160401b0381111561338257634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156133ac576020820181803683370190505b5090505b8415610c2f576133c1600183614dfb565b91506133ce600a86614faf565b6133d9906030614dcf565b60f81b8183815181106133fc57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535061341e600a86614de7565b94506133b0565b61342e8161249f565b610e3685858585856126b3565b6001600160a01b03811660008181526101356020526040808220829055517ffcf5eec0cfa3e6332f5f0e63ec242d71f866a61d121d6cdf5c2eb3b668a26c4f9190a250565b600054610100900460ff166134a75760405162461bcd60e51b8152600401610aba90614cab565b81516134ba906065906020850190613e60565b50805161096c906066906020840190613e60565b600054610100900460ff166134f55760405162461bcd60e51b8152600401610aba90614cab565b565b600054610100900460ff1661351e5760405162461bcd60e51b8152600401610aba90614cab565b61105e81613c06565b600054610100900460ff1661354e5760405162461bcd60e51b8152600401610aba90614cab565b61105e81613c5f565b60008181526101006020526040902054613572906001614dcf565b6000918252610100602052604090912055565b600081815260696020526040902080546001600160a01b0319166001600160a01b03841690811790915581906135ba826110c1565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60003033141561360a575060331936013560601c90565b503390565b6001600160a01b0382166136265761362681613249565b6001600160a01b0383166000908152610135602052604090205481141561096c5761096c8361343b565b606061365b82612d9c565b156136755750604080516020810190915260008152610899565b60ca600061368284613818565b8152602001908152602001600020600084815260200190815260200160002080546136ac90614f5f565b80601f01602080910402602001604051908101604052809291908181526020018280546136d890614f5f565b80156137255780601f106136fa57610100808354040283529160200191613725565b820191906000526020600020905b81548152906001019060200180831161370857829003601f168201915b5050505050905092915050565b60608315613741575081610d3b565b8251156137515782518084602001fd5b8160405162461bcd60e51b8152600401610aba9190614b91565b60008151600014156137b75760405162461bcd60e51b815260206004820152601560248201527452656769737472793a204c4142454c5f454d50545960581b6044820152606401610aba565b82826040516020016137c99190614996565b604051602081830303815290604052805190602001206040516020016137f9929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b600081815260cb60205260408120541561384057600082815260cb6020526040902054610899565b5090565b60ca600061385183613818565b81526020019081526020016000206000858152602001908152602001600020805461387b90614f5f565b151590506138d257826040516138919190614996565b6040518091039020817f7ae4f661958fbecc2f77be6b0eb280d2a6f604b29e1e7221c82b9da0c4af7f86856040516138c99190614b91565b60405180910390a35b8160ca60006138e084613818565b815260200190815260200160002060008681526020019081526020016000209080519060200190613912929190613e60565b50816040516139219190614996565b6040518091039020836040516139379190614996565b6040518091039020827f851ffe8e74d5015261dba0a1f9e1b0e5d42c5af5d2ad1908fee897c7d80a0d928686604051613971929190614ba4565b60405180910390a450505050565b600081815260c960205260408120805482919061399b90614f5f565b9050119050919050565b60008060006139b48585613cad565b909250905060008160048111156139db57634e487b7160e01b600052602160045260246000fd5b1480156139f95750856001600160a01b0316826001600160a01b0316145b15613a0957600192505050610d3b565b600080876001600160a01b0316631626ba7e60e01b8888604051602401613a31929190614b64565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051613a6f9190614996565b600060405180830381855afa9150503d8060008114613aaa576040519150601f19603f3d011682016040523d82523d6000602084013e613aaf565b606091505b5091509150818015613ac2575080516020145b8015613ae957508051630b135d3f60e11b90613ae790830160209081019084016145ee565b145b98975050505050505050565b60006001600160a01b0384163b15613bfe57836001600160a01b031663150b7a02613b1e61210d565b8786866040518563ffffffff1660e01b8152600401613b409493929190614a98565b602060405180830381600087803b158015613b5a57600080fd5b505af1925050508015613b8a575060408051601f3d908101601f19168201909252613b8791810190614622565b60015b613be4573d808015613bb8576040519150601f19603f3d011682016040523d82523d6000602084013e613bbd565b606091505b508051613bdc5760405162461bcd60e51b8152600401610aba90614c12565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610c2f565b506001610c2f565b600054610100900460ff16613c2d5760405162461bcd60e51b8152600401610aba90614cab565b806000805160206150318339815191525b80546001600160a01b0319166001600160a01b039290921691909117905550565b600054610100900460ff16613c865760405162461bcd60e51b8152600401610aba90614cab565b807f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87613c3e565b600080825160411415613ce45760208301516040840151606085015160001a613cd887828585613cf3565b94509450505050613cec565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613d2a5750600090506003613dd7565b8460ff16601b14158015613d4257508460ff16601c14155b15613d535750600090506004613dd7565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613da7573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613dd057600060019250925050613dd7565b9150600090505b94509492505050565b828054613dec90614f5f565b90600052602060002090601f016020900481019282613e0e5760008555613e54565b82601f10613e275782800160ff19823516178555613e54565b82800160010185558215613e54579182015b82811115613e54578235825591602001919060010190613e39565b50613840929150613ed4565b828054613e6c90614f5f565b90600052602060002090601f016020900481019282613e8e5760008555613e54565b82601f10613ea757805160ff1916838001178555613e54565b82800160010185558215613e54579182015b82811115613e54578251825591602001919060010190613eb9565b5b808211156138405760008155600101613ed5565b6000613efc613ef784614dac565b614d7c565b9050808382526020808301915083868660051b86011115613f1c57600080fd5b6000805b87811015613f5c5782356001600160401b03811115613f3d578283fd5b613f498a828a01613ffe565b8652509383019391830191600101613f20565b50505050509392505050565b60008083601f840112613f79578182fd5b5081356001600160401b03811115613f8f578182fd5b6020830191508360208260051b8501011115613cec57600080fd5b80358015158114613fba57600080fd5b919050565b60008083601f840112613fd0578182fd5b5081356001600160401b03811115613fe6578182fd5b602083019150836020828501011115613cec57600080fd5b600082601f83011261400e578081fd5b81356001600160401b0381111561402757614027614fef565b61403a601f8201601f1916602001614d7c565b81815284602083860101111561404e578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215614079578081fd5b8135610d3b81615005565b600060208284031215614095578081fd5b8151610d3b81615005565b600080604083850312156140b2578081fd5b82356140bd81615005565b915060208301356140cd81615005565b809150509250929050565b600080600080608085870312156140ed578182fd5b84356140f881615005565b9350602085013561410881615005565b9250604085013561411881615005565b9150606085013561412881615005565b939692955090935050565b600080600060608486031215614147578081fd5b833561415281615005565b9250602084013561416281615005565b929592945050506040919091013590565b60008060008060006080868803121561418a578283fd5b853561419581615005565b945060208601356141a581615005565b93506040860135925060608601356001600160401b038111156141c6578182fd5b6141d288828901613fbf565b969995985093965092949392505050565b600080600080608085870312156141f8578182fd5b843561420381615005565b9350602085013561421381615005565b92506040850135915060608501356001600160401b03811115614234578182fd5b61424087828801613ffe565b91505092959194509250565b60008060008060008060008060a0898b031215614267578586fd5b883561427281615005565b975060208901356001600160401b038082111561428d578788fd5b6142998c838d01613f68565b909950975060408b01359150808211156142b1578485fd5b6142bd8c838d01613f68565b909750955060608b01359150808211156142d5578485fd5b506142e28b828c01613f68565b90945092506142f5905060808a01613faa565b90509295985092959890939650565b60008060408385031215614316578182fd5b823561432181615005565b9150612d9360208401613faa565b600080600060408486031215614343578081fd5b833561434e81615005565b925060208401356001600160401b03811115614368578182fd5b61437486828701613fbf565b9497909650939450505050565b60008060408385031215614393578182fd5b823561439e81615005565b946020939093013593505050565b600080600080606085870312156143c1578182fd5b84356143cc81615005565b93506020850135925060408501356001600160401b038111156143ed578283fd5b6143f987828801613fbf565b95989497509550505050565b60008060208385031215614417578182fd5b82356001600160401b0381111561442c578283fd5b61443885828601613f68565b90969095509350505050565b60008060008060006060868803121561445b578283fd5b85356001600160401b0380821115614471578485fd5b61447d89838a01613f68565b90975095506020880135915080821115614495578485fd5b506144a288828901613f68565b96999598509660400135949350505050565b6000806000604084860312156144c8578081fd5b83356001600160401b038111156144dd578182fd5b6144e986828701613f68565b909790965060209590950135949350505050565b60006020828403121561450e578081fd5b81356001600160401b03811115614523578182fd5b8201601f81018413614533578182fd5b610c2f84823560208401613ee9565b60006020808385031215614554578182fd5b82356001600160401b03811115614569578283fd5b8301601f81018513614579578283fd5b8035614587613ef782614dac565b80828252848201915084840188868560051b87010111156145a6578687fd5b8694505b838510156145c85780358352600194909401939185019185016145aa565b50979650505050505050565b6000602082840312156145e5578081fd5b610d3b82613faa565b6000602082840312156145ff578081fd5b5051919050565b600060208284031215614617578081fd5b8135610d3b8161501a565b600060208284031215614633578081fd5b8151610d3b8161501a565b60008060008060008060006080888a031215614658578081fd5b87356001600160401b038082111561466e578283fd5b61467a8b838c01613fbf565b909950975060208a0135965060408a0135915080821115614699578283fd5b6146a58b838c01613f68565b909650945060608a01359150808211156146bd578283fd5b506146ca8a828b01613f68565b989b979a50959850939692959293505050565b600080602083850312156146ef578182fd5b82356001600160401b03811115614704578283fd5b61443885828601613fbf565b600080600080600060608688031215614727578283fd5b85356001600160401b038082111561473d578485fd5b61474989838a01613fbf565b90975095506020880135915080821115614761578485fd5b506144a288828901613fbf565b600080600060408486031215614782578081fd5b83356001600160401b03811115614797578182fd5b6144e986828701613fbf565b6000602082840312156147b4578081fd5b81356001600160401b038111156147c9578182fd5b610c2f84828501613ffe565b6000806000604084860312156147e9578081fd5b83356001600160401b03808211156147ff578283fd5b9085019060808288031215614812578283fd5b90935060208501359080821115614827578283fd5b5061437486828701613fbf565b600060208284031215614845578081fd5b5035919050565b600080600060408486031215614860578081fd5b8335925060208401356001600160401b03811115614368578182fd5b60008060008060608587031215614891578182fd5b8435935060208501356001600160401b038111156148ad578283fd5b6148b987828801613fbf565b9598909750949560400135949350505050565b600080604083850312156148de578182fd5b50508035926020909101359150565b600081518084526020808501808196508360051b81019150828601855b8581101561493457828403895261492284835161496a565b9885019893509084019060010161490a565b5091979650505050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60008151808452614982816020860160208601614f1c565b601f01601f19169290920160200192915050565b600082516149a8818460208701614f1c565b9190910192915050565b600084516149c4818460208901614f1c565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b60008351614a03818460208801614f1c565b601760f91b9083019081528351614a21816001840160208801614f1c565b01600101949350505050565b8183823760009101908152919050565b60008351614a4f818460208801614f1c565b835190830190614a63818360208801614f1c565b01949350505050565b6001600160a01b03848116825283166020820152606060408201819052600090610ac39083018461496a565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906130729083018461496a565b6000602080830181845280855180835260408601915060408160051b8701019250838701855b82811015614b1f57603f19888603018452614b0d85835161496a565b94509285019290850190600101614af1565b5092979650505050505050565b602081526000610d3b60208301846148ed565b604081526000614b5260408301856148ed565b8281036020840152610d3781856148ed565b828152604060208201526000610c2f604083018461496a565b602081526000610c2f602083018486614941565b602081526000610d3b602083018461496a565b604081526000614bb7604083018561496a565b8281036020840152610d37818561496a565b60208082526029908201527f52656769737472793a2053454e4445525f49535f4e4f545f415050524f5645446040820152682fa7a92fa7aba722a960b91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526027908201527f52656769737472793a2053454e4445525f49535f4e4f545f4d494e54494e475f60408201526626a0a720a3a2a960c91b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60208082526022908201527f52656769737472793a20494e53554646494349454e545f5045524d495353494f6040820152614e5360f01b606082015260800190565b6000808335601e19843603018112614d4e578283fd5b8301803591506001600160401b03821115614d67578283fd5b602001915036819003821315613cec57600080fd5b604051601f8201601f191681016001600160401b0381118282101715614da457614da4614fef565b604052919050565b60006001600160401b03821115614dc557614dc5614fef565b5060051b60200190565b60008219821115614de257614de2614fc3565b500190565b600082614df657614df6614fd9565b500490565b600082821015614e0d57614e0d614fc3565b500390565b6000614e20613ef784614dac565b808482526020808301925084368760051b87011115614e3d578485fd5b845b87811015614e7b5781356001600160401b03811115614e5c578687fd5b614e6836828a01613ffe565b8652509382019390820190600101614e3f565b50919695505050505050565b6000610d3b368484613ee9565b600060808236031215614ea5578081fd5b604051608081016001600160401b038282108183111715614ec857614ec8614fef565b8160405284359150614ed982615005565b81835260208501356020840152604085013560408401526060850135915080821115614f03578384fd5b50614f1036828601613ffe565b60608301525092915050565b60005b83811015614f37578181015183820152602001614f1f565b838111156112be5750506000910152565b600081614f5757614f57614fc3565b506000190190565b600181811c90821680614f7357607f821691505b6020821081141561126f57634e487b7160e01b600052602260045260246000fd5b6000600019821415614fa857614fa8614fc3565b5060010190565b600082614fbe57614fbe614fd9565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461105e57600080fd5b6001600160e01b03198116811461105e57600080fdfebe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a164736f6c6343000804000a";
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
