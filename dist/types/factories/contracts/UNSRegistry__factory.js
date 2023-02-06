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
                internalType: "string[][]",
                name: "domains",
                type: "string[][]",
            },
        ],
        name: "backfillReverseNames",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
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
const _bytecode = "0x608060405234801561001057600080fd5b5061504c806100206000396000f3fe608060405234801561001057600080fd5b50600436106103995760003560e01c80636ccbae5f116101e9578063ba5d40b71161010f578063e985e9c5116100ad578063f5c1f76e1161007c578063f5c1f76e14610860578063f7df5c6014610873578063f8c8765e14610886578063ffa1ad741461089957600080fd5b8063e985e9c514610802578063ebf0c7171461083e578063ec129eea14610845578063f25eb5c11461085857600080fd5b8063c87b56dd116100e9578063c87b56dd146107b6578063ce92b33e146107c9578063cf2c52cb146107dc578063d106353f146107ef57600080fd5b8063ba5d40b71461077d578063bb5b27e114610790578063bebec6b4146107a357600080fd5b806399e0dd7c11610187578063ab3b87fe11610156578063ab3b87fe14610723578063b3f9e4cb14610736578063b85afd2814610749578063b88d4fde1461076a57600080fd5b806399e0dd7c146106be578063a22cb465146106d1578063a3f4df7e146106e4578063a42474001461071057600080fd5b806394d008ef116101c357806394d008ef146106885780639508b1c41461069b5780639559c0bd146106ae57806395d89b41146106b657600080fd5b80636ccbae5f1461064157806370a08231146106625780637e37479e1461067557600080fd5b806340c10f19116102ce5780634f558e791161026c5780636352211e1161023b5780636352211e146105e7578063638e5c78146105fa578063663f7b2a1461060d578063672b9f811461062057600080fd5b80634f558e791461059257806350382c1a146105a557806350960239146105b8578063572b6c05146105cb57600080fd5b8063430c2081116102a8578063430c20811461054657806344d5f66c1461055957806347c816991461056c5780634a72584d1461057f57600080fd5b806340c10f191461050d57806342842e0e1461052057806342966c681461053357600080fd5b80631bf7e13e1161033b578063276fabb111610315578063276fabb1146104b357806327f18975146104d4578063310bd74b146104e7578063384e9a55146104fa57600080fd5b80631bf7e13e1461047a5780631f71be061461048d57806323b872dd146104a057600080fd5b8063095ea7b311610377578063095ea7b314610406578063150b7a021461041b5780631bd8cc1a146104475780631be5e7ed1461046757600080fd5b806301ffc9a71461039e57806306fdde03146103c6578063081812fc146103db575b600080fd5b6103b16103ac3660046146cb565b6108bd565b60405190151581526020015b60405180910390f35b6103ce6108ce565b6040516103bd9190614bf5565b6103ee6103e93660046148f9565b610960565b6040516001600160a01b0390911681526020016103bd565b610419610414366004614310565b610987565b005b61042e610429366004614102565b6109a0565b6040516001600160e01b031990911681526020016103bd565b61045a61045536600461458c565b610afb565b6040516103bd9190614b90565b6103ce610475366004614833565b610c1b565b6103ce61048836600461489a565b610c66565b61041961049b3660046141db565b610d71565b6104196104ae3660046140c2565b610dfd565b6104c66104c13660046144dd565b610e50565b6040519081526020016103bd565b6104196104e236600461451c565b610e5f565b6104196104f53660046148f9565b610ea7565b6104196105083660046148f9565b610ee2565b61041961051b366004614310565b610f07565b61041961052e3660046140c2565b610f54565b6104196105413660046148f9565b610f6f565b6103b1610554366004614310565b610fb3565b61041961056736600461442d565b610fbf565b61041961057a3660046147d5565b61109f565b61041961058d366004614941565b6110de565b6103b16105a03660046148f9565b611124565b6104196105b3366004614868565b611143565b6104196105c6366004613ff7565b611179565b6103b16105d9366004613ff7565b6001600160a01b0316301490565b6103ee6105f53660046148f9565b6111d9565b6104196106083660046148f9565b611239565b61041961061b3660046145d5565b611284565b61063361062e366004614991565b6112bd565b6040516103bd929190614c08565b6104c661064f3660046148f9565b6000908152610100602052604090205490565b6104c6610670366004613ff7565b6112d5565b6104c6610683366004613ff7565b61135b565b6104196106963660046143d4565b61138c565b6104196106a9366004614703565b6113db565b6104c6601481565b6103ce611462565b6104196106cc3660046147a2565b611471565b6104196106df366004614293565b6114f7565b6103ce6040518060400160405280600d81526020016c554e533a20526567697374727960981b81525081565b6103b161071e36600461489a565b611509565b610419610731366004614310565b611554565b6103ee6107443660046148f9565b611599565b61075c61075736600461458c565b6115c3565b6040516103bd929190614ba3565b610419610778366004614172565b61172b565b61041961078b3660046141db565b611772565b6103ce61079e3660046148f9565b6117e3565b6103ce6107b1366004613ff7565b611885565b6103ce6107c43660046148f9565b61194f565b6104196107d736600461451c565b6119b5565b6104196107ea3660046142be565b6119f4565b6104196107fd36600461433b565b611ad1565b6103b161081036600461402f565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006104c6565b61041961085336600461451c565b611b2a565b610419611b69565b61045a61086e3660046144dd565b611bef565b610419610881366004614911565b611ccc565b610419610894366004614067565b611d5d565b6103ce604051806040016040528060058152602001640c0b8d8b8d60da1b81525081565b60006108c882611f33565b92915050565b6060606580546108dd90614f4e565b80601f016020809104026020016040519081016040528092919081815260200182805461090990614f4e565b80156109565780601f1061092b57610100808354040283529160200191610956565b820191906000526020600020905b81548152906001019060200180831161093957829003601f168201915b5050505050905090565b600061096b82611f83565b506000908152606960205260409020546001600160a01b031690565b8061099181611fe2565b61099b8383612049565b505050565b60007f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378546001600160a01b03166109d561216c565b6001600160a01b03161415610a97576109ec61216c565b6001600160a01b03166342966c68856040518263ffffffff1660e01b8152600401610a1991815260200190565b600060405180830381600087803b158015610a3357600080fd5b505af1158015610a47573d6000803e3d6000fd5b505050821580159150610a615750610a6182840184614699565b15610a7f57610a70308561217b565b610a7a85856122c9565b610a89565b610a89858561217b565b50630a85bd0160e11b610af2565b60405162461bcd60e51b815260206004820152602560248201527f52656769737472793a204552433732315f524543454956494e475f50524f4849604482015264109255115160da1b60648201526084015b60405180910390fd5b95945050505050565b6060826001600160401b03811115610b2357634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610b5657816020015b6060815260200190600190039081610b415790505b50905060005b83811015610c1357610bd5858583818110610b8757634e487b7160e01b600052603260045260246000fd5b9050602002810190610b999190614d9c565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250879250612374915050565b828281518110610bf557634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080610c0b90614f83565b915050610b5c565b509392505050565b6060610c5e84848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250869250612374915050565b949350505050565b606060005a9050610c78858585611509565b610cd45760405162461bcd60e51b815260206004820152602760248201527f554e535265676973747279466f727761726465723a205349474e41545552455f6044820152661253959053125160ca1b6064820152608401610ae9565b610d66610ce46020870187613ff7565b30604088013584610cf860608b018b614d9c565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b90819084018382808284376000920191909152506123a992505050565b9150505b9392505050565b610134546001600160a01b0316610d8661216c565b6001600160a01b031614610dac5760405162461bcd60e51b8152600401610ae990614cc8565b6000610dc0610dbb888a614e76565b612498565b9050610dd08982888888886124f5565b8115610df257610df28982610ded610de88b8d614e76565b61251e565b6125bb565b505050505050505050565b80610e0f610e0961216c565b826125fd565b610e2b5760405162461bcd60e51b8152600401610ae990614c2d565b81610e3581611fe2565b610e3e8361267b565b610e498585856126e8565b5050505050565b6000610d6a610dbb8385614e76565b80610e6b610e0961216c565b610e875760405162461bcd60e51b8152600401610ae990614c2d565b81610e9181611fe2565b610e9e878787878761288f565b50505050505050565b80610eb3610e0961216c565b610ecf5760405162461bcd60e51b8152600401610ae990614c2d565b81610ed981611fe2565b61099b8361267b565b80610eec8161290e565b81610ef681611fe2565b61099b610f0161216c565b8461297e565b610f0f6129c6565b6001600160a01b0316610f2061216c565b6001600160a01b031614610f465760405162461bcd60e51b8152600401610ae990614d5a565b610f50828261217b565b5050565b61099b8383836040518060200160405280600081525061172b565b80610f7b610e0961216c565b610f975760405162461bcd60e51b8152600401610ae990614c2d565b81610fa181611fe2565b610faa8361267b565b61099b83612ad9565b6000610d6a83836125fd565b610134546001600160a01b0316610fd461216c565b6001600160a01b031614610ffa5760405162461bcd60e51b8152600401610ae990614cc8565b60005b8151811015610f505761103682828151811061102957634e487b7160e01b600052603260045260246000fd5b602002602001015161251e565b610138600061106b85858151811061105e57634e487b7160e01b600052603260045260246000fd5b6020026020010151612498565b8152602001908152602001600020908051906020019061108c929190613d50565b508061109781614f83565b915050610ffd565b806110ab610e0961216c565b6110c75760405162461bcd60e51b8152600401610ae990614c2d565b816110d181611fe2565b610e9e8787878787612b80565b806110ea610e0961216c565b6111065760405162461bcd60e51b8152600401610ae990614c2d565b8161111081611fe2565b61111c86868686612c5f565b505050505050565b6000818152606760205260408120546001600160a01b031615156108c8565b611176816040516020016111579190614a5b565b6040516020818303038152906040528051906020012060001c82612cff565b50565b610134546001600160a01b031661118e61216c565b6001600160a01b0316146111b45760405162461bcd60e51b8152600401610ae990614cc8565b6001600160a01b0316600090815261013660205260409020805460ff19166001179055565b6000818152606760205260408120546001600160a01b0316806108c85760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610ae9565b80611245610e0961216c565b6112615760405162461bcd60e51b8152600401610ae990614c2d565b61127361126c61216c565b30846126e8565b610f5061127e61216c565b836122c9565b600061128f82612498565b905061129a8161290e565b6112a381611fe2565b610f506112ae61216c565b826112b88561251e565b612d2b565b6060806112ca8484612d79565b909590945092505050565b60006001600160a01b03821661133f5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610ae9565b506001600160a01b031660009081526068602052604090205490565b6001600160a01b0381166000908152610135602052604081205461137e81612d9a565b611386578091505b50919050565b6113946129c6565b6001600160a01b03166113a561216c565b6001600160a01b0316146113cb5760405162461bcd60e51b8152600401610ae990614d5a565b6113d5848461217b565b50505050565b6113e58787612de4565b6113ed61216c565b6001600160a01b03166113ff866111d9565b6001600160a01b0316146114555760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610ae9565b610e9e8484848489612e53565b6060606680546108dd90614f4e565b610134546001600160a01b031661148661216c565b6001600160a01b0316146114ac5760405162461bcd60e51b8152600401610ae990614cc8565b6114b96101338383613dd0565b507f4b120d6a959a84a520fa48f5f937cca0e79129423487af7901213b5d2e89313b82826040516114eb929190614be1565b60405180910390a15050565b610f5061150261216c565b8383612edd565b6000610c5e61151785614e83565b3085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612fac92505050565b80611560610e0961216c565b61157c5760405162461bcd60e51b8152600401610ae990614c2d565b8161158681611fe2565b6113d5611592846111d9565b85856126e8565b6000818152606760205260408120546001600160a01b03166115bc5760006108c8565b3092915050565b606080836001600160401b038111156115ec57634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561161f57816020015b606081526020019060019003908161160a5790505b509150836001600160401b0381111561164857634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561167b57816020015b60608152602001906001900390816116665790505b50905060005b84811015611722576116b98686838181106116ac57634e487b7160e01b600052603260045260246000fd5b9050602002013585612d79565b8483815181106116d957634e487b7160e01b600052603260045260246000fd5b6020026020010184848151811061170057634e487b7160e01b600052603260045260246000fd5b602002602001018290528290525050808061171a90614f83565b915050611681565b50935093915050565b81611737610e0961216c565b6117535760405162461bcd60e51b8152600401610ae990614c2d565b8261175d81611fe2565b6117668461267b565b61111c86868686613104565b610134546001600160a01b031661178761216c565b6001600160a01b0316146117ad5760405162461bcd60e51b8152600401610ae990614cc8565b60006117bc610dbb888a614e76565b90506117d689826117d0610de88b8d614e76565b85613137565b610df28686868685612e53565b600081815260c96020526040902080546060919061180090614f4e565b80601f016020809104026020016040519081016040528092919081815260200182805461182c90614f4e565b80156118795780601f1061184e57610100808354040283529160200191611879565b820191906000526020600020905b81548152906001019060200180831161185c57829003601f168201915b50505050509050919050565b6001600160a01b038116600090815261013560205260409020546060906118ab81612d9a565b6113865760008181526101386020526040902080546118c990614f4e565b80601f01602080910402602001604051908101604052809291908181526020018280546118f590614f4e565b80156119425780601f1061191757610100808354040283529160200191611942565b820191906000526020600020905b81548152906001019060200180831161192557829003601f168201915b5050505050915050919050565b606061195a82611f83565b600061196461318a565b905060008151116119845760405180602001604052806000815250610d6a565b8061198e8461319a565b60405160200161199f929190614b02565b6040516020818303038152906040529392505050565b806119c1610e0961216c565b6119dd5760405162461bcd60e51b8152600401610ae990614c2d565b816119e781611fe2565b610e9e8787878787612e53565b7f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87546001600160a01b0316611a2761216c565b6001600160a01b031614611a4d5760405162461bcd60e51b8152600401610ae990614d5a565b6020811415611a70576000611a64828401846148f9565b90506113d5848261217b565b6000611a7e82840184614607565b805190915060005b8181101561111c57611abf86848381518110611ab257634e487b7160e01b600052603260045260246000fd5b602002602001015161217b565b80611ac981614f83565b915050611a86565b610134546001600160a01b0316611ae661216c565b6001600160a01b031614611b0c5760405162461bcd60e51b8152600401610ae990614cc8565b611b1a8787878787876124f5565b8015610e9e57610e9e87876132b3565b80611b36610e0961216c565b611b525760405162461bcd60e51b8152600401610ae990614c2d565b81611b5c81611fe2565b610e9e87878787876132f4565b6000611b7361216c565b6001600160a01b03811660009081526101356020526040902054909150611be65760405162461bcd60e51b815260206004820152602160248201527f52656769737472793a20524556455253455f5245434f52445f49535f454d50546044820152605960f81b6064820152608401610ae9565b6111768161330a565b6060816001600160401b03811115611c1757634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015611c4a57816020015b6060815260200190600190039081611c355790505b50905060005b82811015611cc557611c87848483818110611c7b57634e487b7160e01b600052603260045260246000fd5b905060200201356117e3565b828281518110611ca757634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080611cbd90614f83565b915050611c50565b5092915050565b610134546001600160a01b0316611ce161216c565b6001600160a01b031614611d075760405162461bcd60e51b8152600401610ae990614cc8565b61013454611d1e906001600160a01b03168461217b565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39528383604051611d50929190614be1565b60405180910390a2505050565b600054610100900460ff1615808015611d7d5750600054600160ff909116105b80611d975750303b158015611d97575060005460ff166001145b611dfa5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610ae9565b6000805460ff191660011790558015611e1d576000805461ff0019166101001790555b61013480546001600160a01b0319166001600160a01b038716179055837f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec9237880546001600160a01b0319166001600160a01b03929092169190911790556040805180820182526013815272556e73746f707061626c6520446f6d61696e7360681b60208083019190915282518084019093526002835261155160f21b90830152611ec59161334f565b611ecd61339d565b611ed561339d565b611ede836133c6565b611ee7826133f6565b8015610e49576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050505050565b60006001600160e01b031982166380ac58cd60e01b1480611f6457506001600160e01b03198216635b5e139f60e01b145b806108c857506301ffc9a760e01b6001600160e01b03198316146108c8565b6000818152606760205260409020546001600160a01b03166111765760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610ae9565b3033141561204057611ff2613426565b81146111765760405162461bcd60e51b815260206004820152601760248201527f52656769737472793a20544f4b454e5f494e56414c49440000000000000000006044820152606401610ae9565b6111768161343b565b6000612054826111d9565b9050806001600160a01b0316836001600160a01b031614156120c25760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610ae9565b806001600160a01b03166120d461216c565b6001600160a01b031614806120f057506120f08161081061216c565b6121625760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610ae9565b61099b8383613469565b60006121766134d7565b905090565b6001600160a01b0382166121d15760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610ae9565b6000818152606760205260409020546001600160a01b0316156122365760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610ae9565b612242600083836134f3565b6001600160a01b038216600090815260686020526040812080546001929061226b908490614e33565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60006122d36129c6565b90506122df8183613469565b60008051602061502083398151915254604080516020808201869052825180830390910181528183019283905263e3dec8fb60e01b9092526001600160a01b0390921691829163e3dec8fb9161233c918891309190604401614b31565b600060405180830381600087803b15801561235657600080fd5b505af115801561236a573d6000803e3d6000fd5b5050505050505050565b6060610d6a8360405160200161238a9190614a5b565b6040516020818303038152906040528051906020012060001c83613590565b60606123b48561343b565b600080876001600160a01b0316866123ce8b8a8989613672565b6040516123db9190614a5b565b60006040518083038160008787f1925050503d8060008114612419576040519150601f19603f3d011682016040523d82523d6000602084013e61241e565b606091505b50909250905061242f603f87614e4b565b5a1161244b57634e487b7160e01b600052600160045260246000fd5b61248b82826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c45440000000000008152506136a2565b9998505050505050505050565b805160009081905b8015611cc5576124e182856124b6600185614e5f565b815181106124d457634e487b7160e01b600052603260045260246000fd5b60200260200101516136db565b9150806124ed81614f37565b9150506124a0565b6124fe8561267b565b61251161250a866111d9565b87876126e8565b61111c8484848489612e53565b606060008260008151811061254357634e487b7160e01b600052603260045260246000fd5b602002602001015190506000600190505b8351811015611cc5578184828151811061257e57634e487b7160e01b600052603260045260246000fd5b6020026020010151604051602001612597929190614ab6565b604051602081830303815290604052915080806125b390614f83565b915050612554565b61dead6001600160a01b038416148015906125ed57506001600160a01b03831660009081526101356020526040902054155b1561099b5761099b838383612d2b565b600080612609836111d9565b9050806001600160a01b0316846001600160a01b0316148061265057506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b80610c5e5750836001600160a01b031661266984610960565b6001600160a01b031614949350505050565b61268481613788565b60405160200161269691815260200190565b60408051601f198184030181528282528051602091820120600085815260cb9092529181209190915582917f185c30856dadb58bf097c1f665a52ada7029752dbcad008ea3fefc73bee8c9fe9190a250565b826001600160a01b03166126fb826111d9565b6001600160a01b03161461275f5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610ae9565b6001600160a01b0382166127c15760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610ae9565b6127cc8383836134f3565b6127d7600082613469565b6001600160a01b0383166000908152606860205260408120805460019290612800908490614e5f565b90915550506001600160a01b038216600090815260686020526040812080546001929061282e908490614e33565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60005b8481101561111c576128fc8686838181106128bd57634e487b7160e01b600052603260045260246000fd5b905060200201358585848181106128e457634e487b7160e01b600052603260045260246000fd5b90506020028101906128f69190614d9c565b85612c5f565b8061290681614f83565b915050612892565b61291661216c565b6001600160a01b0316612928826111d9565b6001600160a01b0316146111765760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610ae9565b6001600160a01b03821660008181526101356020526040808220849055518392917feb76a21470988c474a21f690cc28fee1ed511bd812dc3c21fd0f49c5e5d4708a91a35050565b6000806000805160206150208339815191525460405163721804d360e11b81523060048201526001600160a01b039091169150600090829063e43009a69060240160206040518083038186803b158015612a1f57600080fd5b505afa158015612a33573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a5791906146b3565b60405163e66f960360e01b8152600481018290529091506001600160a01b0383169063e66f96039060240160206040518083038186803b158015612a9a57600080fd5b505afa158015612aae573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ad29190614013565b9250505090565b6000612ae4826111d9565b9050612af2816000846134f3565b612afd600083613469565b6001600160a01b0381166000908152606860205260408120805460019290612b26908490614e5f565b909155505060008281526067602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60008585604051602001612b95929190614af2565b60408051601f198184030181528282528051602091820120601f8901829004820284018201909252878352909250612be99183918990899081908401838280828437600092019190915250612cff92505050565b61111c8187878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b0181900481028201810190925289815292508991508890819084018382808284376000920191909152508892506137b4915050565b612c68846138ef565b612cb45760405162461bcd60e51b815260206004820152601c60248201527f5265636f726453746f726167653a204b45595f4e4f545f464f554e44000000006044820152606401610ae9565b6113d584612cc1866117e3565b85858080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508792506137b4915050565b612d08826138ef565b610f5057600082815260c960209081526040909120825161099b92840190613d50565b6000828152610138602052604090208054612d4590614f4e565b15159050612d6f576000828152610138602090815260409091208251612d6d92840190613d50565b505b61099b838361297e565b606080612d85846117e3565b9150612d918484613590565b90509250929050565b6000818152610137602052604081205460ff1680156108c857506101366000612dc161216c565b6001600160a01b0316815260208101919091526040016000205460ff1692915050565b60008051602061502083398151915254604051633805550f60e01b81526001600160a01b03909116908190633805550f90612e259086908690600401614be1565b600060405180830381600087803b158015612e3f57600080fd5b505af1158015610e9e573d6000803e3d6000fd5b60005b8481101561111c57612ecb868683818110612e8157634e487b7160e01b600052603260045260246000fd5b9050602002810190612e939190614d9c565b868685818110612eb357634e487b7160e01b600052603260045260246000fd5b9050602002810190612ec59190614d9c565b86612b80565b80612ed581614f83565b915050612e56565b816001600160a01b0316836001600160a01b03161415612f3f5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610ae9565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f9060240160206040518083038186803b158015612fee57600080fd5b505afa158015613002573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061302691906146b3565b905060006130d48660600151805190602001208688602001516040516020016130749392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b90508186602001511480156130fa575085516130fa906001600160a01b03168286613915565b9695505050505050565b61310f8484846126e8565b61311b84848484613a65565b6113d55760405162461bcd60e51b8152600401610ae990614c76565b613141848461217b565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c3952836040516131719190614bf5565b60405180910390a280156113d5576113d58484846125bb565b606061013380546108dd90614f4e565b6060816131be5750506040805180820190915260018152600360fc1b602082015290565b8160005b81156131e857806131d281614f83565b91506131e19050600a83614e4b565b91506131c2565b6000816001600160401b0381111561321057634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561323a576020820181803683370190505b5090505b8415610c5e5761324f600183614e5f565b915061325c600a86614f9e565b613267906030614e33565b60f81b81838151811061328a57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506132ac600a86614e4b565b945061323e565b61dead6001600160a01b038316148015906132e557506001600160a01b03821660009081526101356020526040902054155b15610f5057610f50828261297e565b6132fd8161267b565b610e498585858585612e53565b6001600160a01b03811660008181526101356020526040808220829055517ffcf5eec0cfa3e6332f5f0e63ec242d71f866a61d121d6cdf5c2eb3b668a26c4f9190a250565b600054610100900460ff166133765760405162461bcd60e51b8152600401610ae990614d0f565b8151613389906065906020850190613d50565b50805161099b906066906020840190613d50565b600054610100900460ff166133c45760405162461bcd60e51b8152600401610ae990614d0f565b565b600054610100900460ff166133ed5760405162461bcd60e51b8152600401610ae990614d0f565b61117681613b76565b600054610100900460ff1661341d5760405162461bcd60e51b8152600401610ae990614d0f565b61117681613bcf565b6000303314156134385750601f193601355b90565b60008181526101006020526040902054613456906001614e33565b6000918252610100602052604090912055565b600081815260696020526040902080546001600160a01b0319166001600160a01b038416908117909155819061349e826111d9565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000303314156134ee575060331936013560601c90565b503390565b6000818152610137602052604090205460ff16158061351a57506001600160a01b03821615155b6135665760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a20544f4b454e5f555047524144454400000000000000006044820152606401610ae9565b6001600160a01b0383166000908152610135602052604090205481141561099b5761099b8361330a565b606061359b82612d9a565b156135b557506040805160208101909152600081526108c8565b60ca60006135c284613788565b8152602001908152602001600020600084815260200190815260200160002080546135ec90614f4e565b80601f016020809104026020016040519081016040528092919081815260200182805461361890614f4e565b80156136655780601f1061363a57610100808354040283529160200191613665565b820191906000526020600020905b81548152906001019060200180831161364857829003601f168201915b5050505050905092915050565b606082858560405160200161368993929190614a77565b6040516020818303038152906040529050949350505050565b606083156136b1575081610d6a565b8251156136c15782518084602001fd5b8160405162461bcd60e51b8152600401610ae99190614bf5565b60008151600014156137275760405162461bcd60e51b815260206004820152601560248201527452656769737472793a204c4142454c5f454d50545960581b6044820152606401610ae9565b82826040516020016137399190614a5b565b60405160208183030381529060405280519060200120604051602001613769929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b600081815260cb6020526040812054156137b057600082815260cb60205260409020546108c8565b5090565b60ca60006137c183613788565b8152602001908152602001600020600085815260200190815260200160002080546137eb90614f4e565b1515905061384257826040516138019190614a5b565b6040518091039020817f7ae4f661958fbecc2f77be6b0eb280d2a6f604b29e1e7221c82b9da0c4af7f86856040516138399190614bf5565b60405180910390a35b8160ca600061385084613788565b815260200190815260200160002060008681526020019081526020016000209080519060200190613882929190613d50565b50816040516138919190614a5b565b6040518091039020836040516138a79190614a5b565b6040518091039020827f851ffe8e74d5015261dba0a1f9e1b0e5d42c5af5d2ad1908fee897c7d80a0d9286866040516138e1929190614c08565b60405180910390a450505050565b600081815260c960205260408120805482919061390b90614f4e565b9050119050919050565b60008060006139248585613c1d565b9092509050600081600481111561394b57634e487b7160e01b600052602160045260246000fd5b1480156139695750856001600160a01b0316826001600160a01b0316145b1561397957600192505050610d6a565b600080876001600160a01b0316631626ba7e60e01b88886040516024016139a1929190614bc8565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516139df9190614a5b565b600060405180830381855afa9150503d8060008114613a1a576040519150601f19603f3d011682016040523d82523d6000602084013e613a1f565b606091505b5091509150818015613a32575080516020145b8015613a5957508051630b135d3f60e11b90613a5790830160209081019084016146b3565b145b98975050505050505050565b60006001600160a01b0384163b15613b6e57836001600160a01b031663150b7a02613a8e61216c565b8786866040518563ffffffff1660e01b8152600401613ab09493929190614b5d565b602060405180830381600087803b158015613aca57600080fd5b505af1925050508015613afa575060408051601f3d908101601f19168201909252613af7918101906146e7565b60015b613b54573d808015613b28576040519150601f19603f3d011682016040523d82523d6000602084013e613b2d565b606091505b508051613b4c5760405162461bcd60e51b8152600401610ae990614c76565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610c5e565b506001610c5e565b600054610100900460ff16613b9d5760405162461bcd60e51b8152600401610ae990614d0f565b806000805160206150208339815191525b80546001600160a01b0319166001600160a01b039290921691909117905550565b600054610100900460ff16613bf65760405162461bcd60e51b8152600401610ae990614d0f565b807f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87613bae565b600080825160411415613c545760208301516040840151606085015160001a613c4887828585613c63565b94509450505050613c5c565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613c9a5750600090506003613d47565b8460ff16601b14158015613cb257508460ff16601c14155b15613cc35750600090506004613d47565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613d17573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613d4057600060019250925050613d47565b9150600090505b94509492505050565b828054613d5c90614f4e565b90600052602060002090601f016020900481019282613d7e5760008555613dc4565b82601f10613d9757805160ff1916838001178555613dc4565b82800160010185558215613dc4579182015b82811115613dc4578251825591602001919060010190613da9565b506137b0929150613e44565b828054613ddc90614f4e565b90600052602060002090601f016020900481019282613dfe5760008555613dc4565b82601f10613e175782800160ff19823516178555613dc4565b82800160010185558215613dc4579182015b82811115613dc4578235825591602001919060010190613e29565b5b808211156137b05760008155600101613e45565b6000613e6c613e6784614e10565b614de0565b9050808382526020808301915083868660051b86011115613e8c57600080fd5b6000805b87811015613ecc5782356001600160401b03811115613ead578283fd5b613eb98a828a01613f8d565b8652509383019391830191600101613e90565b50505050509392505050565b60008083601f840112613ee9578182fd5b5081356001600160401b03811115613eff578182fd5b6020830191508360208260051b8501011115613c5c57600080fd5b600082601f830112613f2a578081fd5b610d6a83833560208501613e59565b80358015158114613f4957600080fd5b919050565b60008083601f840112613f5f578182fd5b5081356001600160401b03811115613f75578182fd5b602083019150836020828501011115613c5c57600080fd5b600082601f830112613f9d578081fd5b81356001600160401b03811115613fb657613fb6614fde565b613fc9601f8201601f1916602001614de0565b818152846020838601011115613fdd578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215614008578081fd5b8135610d6a81614ff4565b600060208284031215614024578081fd5b8151610d6a81614ff4565b60008060408385031215614041578081fd5b823561404c81614ff4565b9150602083013561405c81614ff4565b809150509250929050565b6000806000806080858703121561407c578182fd5b843561408781614ff4565b9350602085013561409781614ff4565b925060408501356140a781614ff4565b915060608501356140b781614ff4565b939692955090935050565b6000806000606084860312156140d6578081fd5b83356140e181614ff4565b925060208401356140f181614ff4565b929592945050506040919091013590565b600080600080600060808688031215614119578283fd5b853561412481614ff4565b9450602086013561413481614ff4565b93506040860135925060608601356001600160401b03811115614155578182fd5b61416188828901613f4e565b969995985093965092949392505050565b60008060008060808587031215614187578182fd5b843561419281614ff4565b935060208501356141a281614ff4565b92506040850135915060608501356001600160401b038111156141c3578182fd5b6141cf87828801613f8d565b91505092959194509250565b60008060008060008060008060a0898b0312156141f6578586fd5b883561420181614ff4565b975060208901356001600160401b038082111561421c578788fd5b6142288c838d01613ed8565b909950975060408b0135915080821115614240578485fd5b61424c8c838d01613ed8565b909750955060608b0135915080821115614264578485fd5b506142718b828c01613ed8565b9094509250614284905060808a01613f39565b90509295985092959890939650565b600080604083850312156142a5578182fd5b82356142b081614ff4565b9150612d9160208401613f39565b6000806000604084860312156142d2578081fd5b83356142dd81614ff4565b925060208401356001600160401b038111156142f7578182fd5b61430386828701613f4e565b9497909650939450505050565b60008060408385031215614322578182fd5b823561432d81614ff4565b946020939093013593505050565b600080600080600080600060a0888a031215614355578081fd5b873561436081614ff4565b96506020880135955060408801356001600160401b0380821115614382578283fd5b61438e8b838c01613ed8565b909750955060608a01359150808211156143a6578283fd5b506143b38a828b01613ed8565b90945092506143c6905060808901613f39565b905092959891949750929550565b600080600080606085870312156143e9578182fd5b84356143f481614ff4565b93506020850135925060408501356001600160401b03811115614415578283fd5b61442187828801613f4e565b95989497509550505050565b6000602080838503121561443f578182fd5b82356001600160401b0380821115614455578384fd5b818501915085601f830112614468578384fd5b8135614476613e6782614e10565b80828252858201915085850189878560051b8801011115614495578788fd5b875b848110156144ce578135868111156144ad57898afd5b6144bb8c8a838b0101613f1a565b8552509287019290870190600101614497565b50909998505050505050505050565b600080602083850312156144ef578182fd5b82356001600160401b03811115614504578283fd5b61451085828601613ed8565b90969095509350505050565b600080600080600060608688031215614533578283fd5b85356001600160401b0380821115614549578485fd5b61455589838a01613ed8565b9097509550602088013591508082111561456d578485fd5b5061457a88828901613ed8565b96999598509660400135949350505050565b6000806000604084860312156145a0578081fd5b83356001600160401b038111156145b5578182fd5b6145c186828701613ed8565b909790965060209590950135949350505050565b6000602082840312156145e6578081fd5b81356001600160401b038111156145fb578182fd5b610c5e84828501613f1a565b60006020808385031215614619578182fd5b82356001600160401b0381111561462e578283fd5b8301601f8101851361463e578283fd5b803561464c613e6782614e10565b80828252848201915084840188868560051b870101111561466b578687fd5b8694505b8385101561468d57803583526001949094019391850191850161466f565b50979650505050505050565b6000602082840312156146aa578081fd5b610d6a82613f39565b6000602082840312156146c4578081fd5b5051919050565b6000602082840312156146dc578081fd5b8135610d6a81615009565b6000602082840312156146f8578081fd5b8151610d6a81615009565b60008060008060008060006080888a03121561471d578081fd5b87356001600160401b0380821115614733578283fd5b61473f8b838c01613f4e565b909950975060208a0135965060408a013591508082111561475e578283fd5b61476a8b838c01613ed8565b909650945060608a0135915080821115614782578283fd5b5061478f8a828b01613ed8565b989b979a50959850939692959293505050565b600080602083850312156147b4578182fd5b82356001600160401b038111156147c9578283fd5b61451085828601613f4e565b6000806000806000606086880312156147ec578283fd5b85356001600160401b0380821115614802578485fd5b61480e89838a01613f4e565b90975095506020880135915080821115614826578485fd5b5061457a88828901613f4e565b600080600060408486031215614847578081fd5b83356001600160401b0381111561485c578182fd5b6145c186828701613f4e565b600060208284031215614879578081fd5b81356001600160401b0381111561488e578182fd5b610c5e84828501613f8d565b6000806000604084860312156148ae578081fd5b83356001600160401b03808211156148c4578283fd5b90850190608082880312156148d7578283fd5b909350602085013590808211156148ec578283fd5b5061430386828701613f4e565b60006020828403121561490a578081fd5b5035919050565b600080600060408486031215614925578081fd5b8335925060208401356001600160401b038111156142f7578182fd5b60008060008060608587031215614956578182fd5b8435935060208501356001600160401b03811115614972578283fd5b61497e87828801613f4e565b9598909750949560400135949350505050565b600080604083850312156149a3578182fd5b50508035926020909101359150565b600081518084526020808501808196508360051b81019150828601855b858110156149f95782840389526149e7848351614a2f565b988501989350908401906001016149cf565b5091979650505050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60008151808452614a47816020860160208601614f0b565b601f01601f19169290920160200192915050565b60008251614a6d818460208701614f0b565b9190910192915050565b60008451614a89818460208901614f0b565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b60008351614ac8818460208801614f0b565b601760f91b9083019081528351614ae6816001840160208801614f0b565b01600101949350505050565b8183823760009101908152919050565b60008351614b14818460208801614f0b565b835190830190614b28818360208801614f0b565b01949350505050565b6001600160a01b03848116825283166020820152606060408201819052600090610af290830184614a2f565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906130fa90830184614a2f565b602081526000610d6a60208301846149b2565b604081526000614bb660408301856149b2565b8281036020840152610d6681856149b2565b828152604060208201526000610c5e6040830184614a2f565b602081526000610c5e602083018486614a06565b602081526000610d6a6020830184614a2f565b604081526000614c1b6040830185614a2f565b8281036020840152610d668185614a2f565b60208082526029908201527f52656769737472793a2053454e4445525f49535f4e4f545f415050524f5645446040820152682fa7a92fa7aba722a960b91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526027908201527f52656769737472793a2053454e4445525f49535f4e4f545f4d494e54494e475f60408201526626a0a720a3a2a960c91b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60208082526022908201527f52656769737472793a20494e53554646494349454e545f5045524d495353494f6040820152614e5360f01b606082015260800190565b6000808335601e19843603018112614db2578283fd5b8301803591506001600160401b03821115614dcb578283fd5b602001915036819003821315613c5c57600080fd5b604051601f8201601f191681016001600160401b0381118282101715614e0857614e08614fde565b604052919050565b60006001600160401b03821115614e2957614e29614fde565b5060051b60200190565b60008219821115614e4657614e46614fb2565b500190565b600082614e5a57614e5a614fc8565b500490565b600082821015614e7157614e71614fb2565b500390565b6000610d6a368484613e59565b600060808236031215614e94578081fd5b604051608081016001600160401b038282108183111715614eb757614eb7614fde565b8160405284359150614ec882614ff4565b81835260208501356020840152604085013560408401526060850135915080821115614ef2578384fd5b50614eff36828601613f8d565b60608301525092915050565b60005b83811015614f26578181015183820152602001614f0e565b838111156113d55750506000910152565b600081614f4657614f46614fb2565b506000190190565b600181811c90821680614f6257607f821691505b6020821081141561138657634e487b7160e01b600052602260045260246000fd5b6000600019821415614f9757614f97614fb2565b5060010190565b600082614fad57614fad614fc8565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461117657600080fd5b6001600160e01b03198116811461117657600080fdfebe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafea164736f6c6343000804000a";
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
