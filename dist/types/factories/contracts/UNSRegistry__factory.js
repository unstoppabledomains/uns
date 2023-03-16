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
const _bytecode = "0x608060405234801561001057600080fd5b50614ce7806100206000396000f3fe608060405234801561001057600080fd5b50600436106103785760003560e01c806370a08231116101d3578063ba5d40b711610104578063ebf0c717116100a2578063f5c1f76e1161007c578063f5c1f76e14610806578063f7df5c6014610819578063f8c8765e1461082c578063ffa1ad741461083f57600080fd5b8063ebf0c717146107e4578063ec129eea146107eb578063f25eb5c1146107fe57600080fd5b8063c87b56dd116100de578063c87b56dd1461076f578063ce92b33e14610782578063cf2c52cb14610795578063e985e9c5146107a857600080fd5b8063ba5d40b714610736578063bb5b27e114610749578063bebec6b41461075c57600080fd5b8063a22cb46511610171578063ab3b87fe1161014b578063ab3b87fe146106dc578063b3f9e4cb146106ef578063b85afd2814610702578063b88d4fde1461072357600080fd5b8063a22cb4651461068a578063a3f4df7e1461069d578063a4247400146106c957600080fd5b80639508b1c4116101ad5780639508b1c4146106545780639559c0bd1461066757806395d89b411461066f57806399e0dd7c1461067757600080fd5b806370a082311461061b5780637e37479e1461062e57806394d008ef1461064157600080fd5b806342842e0e116102ad578063509602391161024b578063638e5c7811610225578063638e5c78146105b3578063663f7b2a146105c6578063672b9f81146105d95780636ccbae5f146105fa57600080fd5b80635096023914610571578063572b6c05146105845780636352211e146105a057600080fd5b806347c816991161028757806347c81699146105255780634a72584d146105385780634f558e791461054b57806350382c1a1461055e57600080fd5b806342842e0e146104ec57806342966c68146104ff578063430c20811461051257600080fd5b80631bf7e13e1161031a578063276fabb1116102f4578063276fabb11461049257806327f18975146104b3578063310bd74b146104c657806340c10f19146104d957600080fd5b80631bf7e13e146104595780631f71be061461046c57806323b872dd1461047f57600080fd5b8063095ea7b311610356578063095ea7b3146103e5578063150b7a02146103fa5780631bd8cc1a146104265780631be5e7ed1461044657600080fd5b806301ffc9a71461037d57806306fdde03146103a5578063081812fc146103ba575b600080fd5b61039061038b366004614366565b610863565b60405190151581526020015b60405180910390f35b6103ad610874565b60405161039c9190614890565b6103cd6103c8366004614594565b610906565b6040516001600160a01b03909116815260200161039c565b6103f86103f33660046140e1565b61092d565b005b61040d610408366004613ed3565b610946565b6040516001600160e01b0319909116815260200161039c565b610439610434366004614214565b610aa1565b60405161039c919061482b565b6103ad6104543660046144ce565b610bc1565b6103ad610467366004614535565b610c0c565b6103f861047a366004613fac565b610d17565b6103f861048d366004613e93565b610dbe565b6104a56104a0366004614165565b610e11565b60405190815260200161039c565b6103f86104c13660046141a4565b610e20565b6103f86104d4366004614594565b610e68565b6103f86104e73660046140e1565b610ea3565b6103f86104fa366004613e93565b610ef0565b6103f861050d366004614594565b610f0b565b6103906105203660046140e1565b610f4f565b6103f8610533366004614470565b610f5b565b6103f86105463660046145dc565b610f9a565b610390610559366004614594565b610fe0565b6103f861056c366004614503565b610fff565b6103f861057f366004613dc8565b611035565b610390610592366004613dc8565b6001600160a01b0316301490565b6103cd6105ae366004614594565b611095565b6103f86105c1366004614594565b6110f5565b6103f86105d436600461425d565b611140565b6105ec6105e736600461462c565b611179565b60405161039c9291906148a3565b6104a5610608366004614594565b6000908152610100602052604090205490565b6104a5610629366004613dc8565b611191565b6104a561063c366004613dc8565b611217565b6103f861064f36600461410c565b611248565b6103f861066236600461439e565b611297565b6104a5601481565b6103ad61131e565b6103f861068536600461443d565b61132d565b6103f8610698366004614064565b6113b3565b6103ad6040518060400160405280600d81526020016c554e533a20526567697374727960981b81525081565b6103906106d7366004614535565b6113c5565b6103f86106ea3660046140e1565b611410565b6103cd6106fd366004614594565b611455565b610715610710366004614214565b61147f565b60405161039c92919061483e565b6103f8610731366004613f43565b6115e7565b6103f8610744366004613fac565b61162e565b6103ad610757366004614594565b61169f565b6103ad61076a366004613dc8565b611741565b6103ad61077d366004614594565b61180b565b6103f86107903660046141a4565b611871565b6103f86107a336600461408f565b6118b0565b6103906107b6366004613e00565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006104a5565b6103f86107f93660046141a4565b61198d565b6103f86119cc565b610439610814366004614165565b611a52565b6103f86108273660046145ac565b611b2f565b6103f861083a366004613e38565b611bc0565b6103ad60405180604001604052806005815260200164302e372e3160d81b81525081565b600061086e82611d96565b92915050565b60606065805461088390614be9565b80601f01602080910402602001604051908101604052809291908181526020018280546108af90614be9565b80156108fc5780601f106108d1576101008083540402835291602001916108fc565b820191906000526020600020905b8154815290600101906020018083116108df57829003601f168201915b5050505050905090565b600061091182611de6565b506000908152606960205260409020546001600160a01b031690565b8061093781611e45565b6109418383611eac565b505050565b60007f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378546001600160a01b031661097b611fcf565b6001600160a01b03161415610a3d57610992611fcf565b6001600160a01b03166342966c68856040518263ffffffff1660e01b81526004016109bf91815260200190565b600060405180830381600087803b1580156109d957600080fd5b505af11580156109ed573d6000803e3d6000fd5b505050821580159150610a075750610a0782840184614334565b15610a2557610a163085611fde565b610a20858561212c565b610a2f565b610a2f8585611fde565b50630a85bd0160e11b610a98565b60405162461bcd60e51b815260206004820152602560248201527f52656769737472793a204552433732315f524543454956494e475f50524f4849604482015264109255115160da1b60648201526084015b60405180910390fd5b95945050505050565b6060826001600160401b03811115610ac957634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610afc57816020015b6060815260200190600190039081610ae75790505b50905060005b83811015610bb957610b7b858583818110610b2d57634e487b7160e01b600052603260045260246000fd5b9050602002810190610b3f9190614a37565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508792506121d7915050565b828281518110610b9b57634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080610bb190614c1e565b915050610b02565b509392505050565b6060610c0484848080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508692506121d7915050565b949350505050565b606060005a9050610c1e8585856113c5565b610c7a5760405162461bcd60e51b815260206004820152602760248201527f554e535265676973747279466f727761726465723a205349474e41545552455f6044820152661253959053125160ca1b6064820152608401610a8f565b610d0c610c8a6020870187613dc8565b30604088013584610c9e60608b018b614a37565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b908190840183828082843760009201919091525061220c92505050565b9150505b9392505050565b610134546001600160a01b0316610d2c611fcf565b6001600160a01b031614610d525760405162461bcd60e51b8152600401610a8f90614963565b6000610d66610d61888a614b11565b6122fb565b9050610d7181612358565b610d84610d7d82611095565b8a836123c5565b610d91868686868561256c565b8115610db357610db38982610dae610da98b8d614b11565b6125f6565b612693565b505050505050505050565b80610dd0610dca611fcf565b826126d5565b610dec5760405162461bcd60e51b8152600401610a8f906148c8565b81610df681611e45565b610dff83612358565b610e0a8585856123c5565b5050505050565b6000610d10610d618385614b11565b80610e2c610dca611fcf565b610e485760405162461bcd60e51b8152600401610a8f906148c8565b81610e5281611e45565b610e5f8787878787612753565b50505050505050565b80610e74610dca611fcf565b610e905760405162461bcd60e51b8152600401610a8f906148c8565b81610e9a81611e45565b61094183612358565b610eab6127d2565b6001600160a01b0316610ebc611fcf565b6001600160a01b031614610ee25760405162461bcd60e51b8152600401610a8f906149f5565b610eec8282611fde565b5050565b610941838383604051806020016040528060008152506115e7565b80610f17610dca611fcf565b610f335760405162461bcd60e51b8152600401610a8f906148c8565b81610f3d81611e45565b610f4683612358565b610941836128e5565b6000610d1083836126d5565b80610f67610dca611fcf565b610f835760405162461bcd60e51b8152600401610a8f906148c8565b81610f8d81611e45565b610e5f878787878761298c565b80610fa6610dca611fcf565b610fc25760405162461bcd60e51b8152600401610a8f906148c8565b81610fcc81611e45565b610fd886868686612a6b565b505050505050565b6000818152606760205260408120546001600160a01b0316151561086e565b6110328160405160200161101391906146f6565b6040516020818303038152906040528051906020012060001c82612b0b565b50565b610134546001600160a01b031661104a611fcf565b6001600160a01b0316146110705760405162461bcd60e51b8152600401610a8f90614963565b6001600160a01b0316600090815261013660205260409020805460ff19166001179055565b6000818152606760205260408120546001600160a01b03168061086e5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610a8f565b80611101610dca611fcf565b61111d5760405162461bcd60e51b8152600401610a8f906148c8565b61112f611128611fcf565b30846123c5565b610eec61113a611fcf565b8361212c565b600061114b826122fb565b905061115681612b37565b61115f81611e45565b610eec61116a611fcf565b82611174856125f6565b612ba7565b6060806111868484612c34565b909590945092505050565b60006001600160a01b0382166111fb5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610a8f565b506001600160a01b031660009081526068602052604090205490565b6001600160a01b0381166000908152610135602052604081205461123a81612c55565b611242578091505b50919050565b6112506127d2565b6001600160a01b0316611261611fcf565b6001600160a01b0316146112875760405162461bcd60e51b8152600401610a8f906149f5565b6112918484611fde565b50505050565b6112a18787612c9f565b6112a9611fcf565b6001600160a01b03166112bb86611095565b6001600160a01b0316146113115760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610a8f565b610e5f848484848961256c565b60606066805461088390614be9565b610134546001600160a01b0316611342611fcf565b6001600160a01b0316146113685760405162461bcd60e51b8152600401610a8f90614963565b6113756101338383613b40565b507f4b120d6a959a84a520fa48f5f937cca0e79129423487af7901213b5d2e89313b82826040516113a792919061487c565b60405180910390a15050565b610eec6113be611fcf565b8383612d0e565b6000610c046113d385614b1e565b3085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612ddd92505050565b8061141c610dca611fcf565b6114385760405162461bcd60e51b8152600401610a8f906148c8565b8161144281611e45565b61129161144e84611095565b85856123c5565b6000818152606760205260408120546001600160a01b031661147857600061086e565b3092915050565b606080836001600160401b038111156114a857634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156114db57816020015b60608152602001906001900390816114c65790505b509150836001600160401b0381111561150457634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561153757816020015b60608152602001906001900390816115225790505b50905060005b848110156115de5761157586868381811061156857634e487b7160e01b600052603260045260246000fd5b9050602002013585612c34565b84838151811061159557634e487b7160e01b600052603260045260246000fd5b602002602001018484815181106115bc57634e487b7160e01b600052603260045260246000fd5b60200260200101829052829052505080806115d690614c1e565b91505061153d565b50935093915050565b816115f3610dca611fcf565b61160f5760405162461bcd60e51b8152600401610a8f906148c8565b8261161981611e45565b61162284612358565b610fd886868686612f35565b610134546001600160a01b0316611643611fcf565b6001600160a01b0316146116695760405162461bcd60e51b8152600401610a8f90614963565b6000611678610d61888a614b11565b9050611692898261168c610da98b8d614b11565b85612f68565b610db3868686868561256c565b600081815260c9602052604090208054606091906116bc90614be9565b80601f01602080910402602001604051908101604052809291908181526020018280546116e890614be9565b80156117355780601f1061170a57610100808354040283529160200191611735565b820191906000526020600020905b81548152906001019060200180831161171857829003601f168201915b50505050509050919050565b6001600160a01b0381166000908152610135602052604090205460609061176781612c55565b61124257600081815261013860205260409020805461178590614be9565b80601f01602080910402602001604051908101604052809291908181526020018280546117b190614be9565b80156117fe5780601f106117d3576101008083540402835291602001916117fe565b820191906000526020600020905b8154815290600101906020018083116117e157829003601f168201915b5050505050915050919050565b606061181682611de6565b6000611820612fbb565b905060008151116118405760405180602001604052806000815250610d10565b8061184a84612fcb565b60405160200161185b92919061479d565b6040516020818303038152906040529392505050565b8061187d610dca611fcf565b6118995760405162461bcd60e51b8152600401610a8f906148c8565b816118a381611e45565b610e5f878787878761256c565b7f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87546001600160a01b03166118e3611fcf565b6001600160a01b0316146119095760405162461bcd60e51b8152600401610a8f906149f5565b602081141561192c57600061192082840184614594565b90506112918482611fde565b600061193a828401846142a2565b805190915060005b81811015610fd85761197b8684838151811061196e57634e487b7160e01b600052603260045260246000fd5b6020026020010151611fde565b8061198581614c1e565b915050611942565b80611999610dca611fcf565b6119b55760405162461bcd60e51b8152600401610a8f906148c8565b816119bf81611e45565b610e5f87878787876130e4565b60006119d6611fcf565b6001600160a01b03811660009081526101356020526040902054909150611a495760405162461bcd60e51b815260206004820152602160248201527f52656769737472793a20524556455253455f5245434f52445f49535f454d50546044820152605960f81b6064820152608401610a8f565b611032816130fa565b6060816001600160401b03811115611a7a57634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015611aad57816020015b6060815260200190600190039081611a985790505b50905060005b82811015611b2857611aea848483818110611ade57634e487b7160e01b600052603260045260246000fd5b9050602002013561169f565b828281518110611b0a57634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080611b2090614c1e565b915050611ab3565b5092915050565b610134546001600160a01b0316611b44611fcf565b6001600160a01b031614611b6a5760405162461bcd60e51b8152600401610a8f90614963565b61013454611b81906001600160a01b031684611fde565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39528383604051611bb392919061487c565b60405180910390a2505050565b600054610100900460ff1615808015611be05750600054600160ff909116105b80611bfa5750303b158015611bfa575060005460ff166001145b611c5d5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610a8f565b6000805460ff191660011790558015611c80576000805461ff0019166101001790555b61013480546001600160a01b0319166001600160a01b038716179055837f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec9237880546001600160a01b0319166001600160a01b03929092169190911790556040805180820182526013815272556e73746f707061626c6520446f6d61696e7360681b60208083019190915282518084019093526002835261155160f21b90830152611d289161313f565b611d3061318d565b611d3861318d565b611d41836131b6565b611d4a826131e6565b8015610e0a576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050505050565b60006001600160e01b031982166380ac58cd60e01b1480611dc757506001600160e01b03198216635b5e139f60e01b145b8061086e57506301ffc9a760e01b6001600160e01b031983161461086e565b6000818152606760205260409020546001600160a01b03166110325760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610a8f565b30331415611ea357611e55613216565b81146110325760405162461bcd60e51b815260206004820152601760248201527f52656769737472793a20544f4b454e5f494e56414c49440000000000000000006044820152606401610a8f565b6110328161322b565b6000611eb782611095565b9050806001600160a01b0316836001600160a01b03161415611f255760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610a8f565b806001600160a01b0316611f37611fcf565b6001600160a01b03161480611f535750611f53816107b6611fcf565b611fc55760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610a8f565b6109418383613259565b6000611fd96132c7565b905090565b6001600160a01b0382166120345760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610a8f565b6000818152606760205260409020546001600160a01b0316156120995760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610a8f565b6120a5600083836132e3565b6001600160a01b03821660009081526068602052604081208054600192906120ce908490614ace565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60006121366127d2565b90506121428183613259565b600080516020614cbb83398151915254604080516020808201869052825180830390910181528183019283905263e3dec8fb60e01b9092526001600160a01b0390921691829163e3dec8fb9161219f9188913091906044016147cc565b600060405180830381600087803b1580156121b957600080fd5b505af11580156121cd573d6000803e3d6000fd5b5050505050505050565b6060610d10836040516020016121ed91906146f6565b6040516020818303038152906040528051906020012060001c83613380565b60606122178561322b565b600080876001600160a01b0316866122318b8a8989613462565b60405161223e91906146f6565b60006040518083038160008787f1925050503d806000811461227c576040519150601f19603f3d011682016040523d82523d6000602084013e612281565b606091505b509092509050612292603f87614ae6565b5a116122ae57634e487b7160e01b600052600160045260246000fd5b6122ee82826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c4544000000000000815250613492565b9998505050505050505050565b805160009081905b8015611b28576123448285612319600185614afa565b8151811061233757634e487b7160e01b600052603260045260246000fd5b60200260200101516134cb565b91508061235081614bd2565b915050612303565b61236181613578565b60405160200161237391815260200190565b60408051601f198184030181528282528051602091820120600085815260cb9092529181209190915582917f185c30856dadb58bf097c1f665a52ada7029752dbcad008ea3fefc73bee8c9fe9190a250565b826001600160a01b03166123d882611095565b6001600160a01b03161461243c5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610a8f565b6001600160a01b03821661249e5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610a8f565b6124a98383836132e3565b6124b4600082613259565b6001600160a01b03831660009081526068602052604081208054600192906124dd908490614afa565b90915550506001600160a01b038216600090815260686020526040812080546001929061250b908490614ace565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60005b84811015610fd8576125e486868381811061259a57634e487b7160e01b600052603260045260246000fd5b90506020028101906125ac9190614a37565b8686858181106125cc57634e487b7160e01b600052603260045260246000fd5b90506020028101906125de9190614a37565b8661298c565b806125ee81614c1e565b91505061256f565b606060008260008151811061261b57634e487b7160e01b600052603260045260246000fd5b602002602001015190506000600190505b8351811015611b28578184828151811061265657634e487b7160e01b600052603260045260246000fd5b602002602001015160405160200161266f929190614751565b6040516020818303038152906040529150808061268b90614c1e565b91505061262c565b61dead6001600160a01b038416148015906126c557506001600160a01b03831660009081526101356020526040902054155b1561094157610941838383612ba7565b6000806126e183611095565b9050806001600160a01b0316846001600160a01b0316148061272857506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b80610c045750836001600160a01b031661274184610906565b6001600160a01b031614949350505050565b60005b84811015610fd8576127c086868381811061278157634e487b7160e01b600052603260045260246000fd5b905060200201358585848181106127a857634e487b7160e01b600052603260045260246000fd5b90506020028101906127ba9190614a37565b85612a6b565b806127ca81614c1e565b915050612756565b600080600080516020614cbb8339815191525460405163721804d360e11b81523060048201526001600160a01b039091169150600090829063e43009a69060240160206040518083038186803b15801561282b57600080fd5b505afa15801561283f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612863919061434e565b60405163e66f960360e01b8152600481018290529091506001600160a01b0383169063e66f96039060240160206040518083038186803b1580156128a657600080fd5b505afa1580156128ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128de9190613de4565b9250505090565b60006128f082611095565b90506128fe816000846132e3565b612909600083613259565b6001600160a01b0381166000908152606860205260408120805460019290612932908490614afa565b909155505060008281526067602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b600085856040516020016129a192919061478d565b60408051601f198184030181528282528051602091820120601f89018290048202840182019092528783529092506129f59183918990899081908401838280828437600092019190915250612b0b92505050565b610fd88187878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b0181900481028201810190925289815292508991508890819084018382808284376000920191909152508892506135a4915050565b612a74846136df565b612ac05760405162461bcd60e51b815260206004820152601c60248201527f5265636f726453746f726167653a204b45595f4e4f545f464f554e44000000006044820152606401610a8f565b61129184612acd8661169f565b85858080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508792506135a4915050565b612b14826136df565b610eec57600082815260c960209081526040909120825161094192840190613bc0565b612b3f611fcf565b6001600160a01b0316612b5182611095565b6001600160a01b0316146110325760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610a8f565b6000828152610138602052604090208054612bc190614be9565b15159050612beb576000828152610138602090815260409091208251612be992840190613bc0565b505b6001600160a01b03831660008181526101356020526040808220859055518492917feb76a21470988c474a21f690cc28fee1ed511bd812dc3c21fd0f49c5e5d4708a91a3505050565b606080612c408461169f565b9150612c4c8484613380565b90509250929050565b6000818152610137602052604081205460ff16801561086e57506101366000612c7c611fcf565b6001600160a01b0316815260208101919091526040016000205460ff1692915050565b600080516020614cbb83398151915254604051633805550f60e01b81526001600160a01b03909116908190633805550f90612ce0908690869060040161487c565b600060405180830381600087803b158015612cfa57600080fd5b505af1158015610e5f573d6000803e3d6000fd5b816001600160a01b0316836001600160a01b03161415612d705760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610a8f565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f9060240160206040518083038186803b158015612e1f57600080fd5b505afa158015612e33573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612e57919061434e565b90506000612f05866060015180519060200120868860200151604051602001612ea59392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b9050818660200151148015612f2b57508551612f2b906001600160a01b03168286613705565b9695505050505050565b612f408484846123c5565b612f4c84848484613855565b6112915760405162461bcd60e51b8152600401610a8f90614911565b612f728484611fde565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c395283604051612fa29190614890565b60405180910390a2801561129157611291848484612693565b6060610133805461088390614be9565b606081612fef5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115613019578061300381614c1e565b91506130129050600a83614ae6565b9150612ff3565b6000816001600160401b0381111561304157634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561306b576020820181803683370190505b5090505b8415610c0457613080600183614afa565b915061308d600a86614c39565b613098906030614ace565b60f81b8183815181106130bb57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506130dd600a86614ae6565b945061306f565b6130ed81612358565b610e0a858585858561256c565b6001600160a01b03811660008181526101356020526040808220829055517ffcf5eec0cfa3e6332f5f0e63ec242d71f866a61d121d6cdf5c2eb3b668a26c4f9190a250565b600054610100900460ff166131665760405162461bcd60e51b8152600401610a8f906149aa565b8151613179906065906020850190613bc0565b508051610941906066906020840190613bc0565b600054610100900460ff166131b45760405162461bcd60e51b8152600401610a8f906149aa565b565b600054610100900460ff166131dd5760405162461bcd60e51b8152600401610a8f906149aa565b61103281613966565b600054610100900460ff1661320d5760405162461bcd60e51b8152600401610a8f906149aa565b611032816139bf565b6000303314156132285750601f193601355b90565b60008181526101006020526040902054613246906001614ace565b6000918252610100602052604090912055565b600081815260696020526040902080546001600160a01b0319166001600160a01b038416908117909155819061328e82611095565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000303314156132de575060331936013560601c90565b503390565b6000818152610137602052604090205460ff16158061330a57506001600160a01b03821615155b6133565760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a20544f4b454e5f555047524144454400000000000000006044820152606401610a8f565b6001600160a01b0383166000908152610135602052604090205481141561094157610941836130fa565b606061338b82612c55565b156133a5575060408051602081019091526000815261086e565b60ca60006133b284613578565b8152602001908152602001600020600084815260200190815260200160002080546133dc90614be9565b80601f016020809104026020016040519081016040528092919081815260200182805461340890614be9565b80156134555780601f1061342a57610100808354040283529160200191613455565b820191906000526020600020905b81548152906001019060200180831161343857829003601f168201915b5050505050905092915050565b606082858560405160200161347993929190614712565b6040516020818303038152906040529050949350505050565b606083156134a1575081610d10565b8251156134b15782518084602001fd5b8160405162461bcd60e51b8152600401610a8f9190614890565b60008151600014156135175760405162461bcd60e51b815260206004820152601560248201527452656769737472793a204c4142454c5f454d50545960581b6044820152606401610a8f565b828260405160200161352991906146f6565b60405160208183030381529060405280519060200120604051602001613559929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b600081815260cb6020526040812054156135a057600082815260cb602052604090205461086e565b5090565b60ca60006135b183613578565b8152602001908152602001600020600085815260200190815260200160002080546135db90614be9565b1515905061363257826040516135f191906146f6565b6040518091039020817f7ae4f661958fbecc2f77be6b0eb280d2a6f604b29e1e7221c82b9da0c4af7f86856040516136299190614890565b60405180910390a35b8160ca600061364084613578565b815260200190815260200160002060008681526020019081526020016000209080519060200190613672929190613bc0565b508160405161368191906146f6565b60405180910390208360405161369791906146f6565b6040518091039020827f851ffe8e74d5015261dba0a1f9e1b0e5d42c5af5d2ad1908fee897c7d80a0d9286866040516136d19291906148a3565b60405180910390a450505050565b600081815260c96020526040812080548291906136fb90614be9565b9050119050919050565b60008060006137148585613a0d565b9092509050600081600481111561373b57634e487b7160e01b600052602160045260246000fd5b1480156137595750856001600160a01b0316826001600160a01b0316145b1561376957600192505050610d10565b600080876001600160a01b0316631626ba7e60e01b8888604051602401613791929190614863565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516137cf91906146f6565b600060405180830381855afa9150503d806000811461380a576040519150601f19603f3d011682016040523d82523d6000602084013e61380f565b606091505b5091509150818015613822575080516020145b801561384957508051630b135d3f60e11b90613847908301602090810190840161434e565b145b98975050505050505050565b60006001600160a01b0384163b1561395e57836001600160a01b031663150b7a0261387e611fcf565b8786866040518563ffffffff1660e01b81526004016138a094939291906147f8565b602060405180830381600087803b1580156138ba57600080fd5b505af19250505080156138ea575060408051601f3d908101601f191682019092526138e791810190614382565b60015b613944573d808015613918576040519150601f19603f3d011682016040523d82523d6000602084013e61391d565b606091505b50805161393c5760405162461bcd60e51b8152600401610a8f90614911565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610c04565b506001610c04565b600054610100900460ff1661398d5760405162461bcd60e51b8152600401610a8f906149aa565b80600080516020614cbb8339815191525b80546001600160a01b0319166001600160a01b039290921691909117905550565b600054610100900460ff166139e65760405162461bcd60e51b8152600401610a8f906149aa565b807f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b8761399e565b600080825160411415613a445760208301516040840151606085015160001a613a3887828585613a53565b94509450505050613a4c565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613a8a5750600090506003613b37565b8460ff16601b14158015613aa257508460ff16601c14155b15613ab35750600090506004613b37565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613b07573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613b3057600060019250925050613b37565b9150600090505b94509492505050565b828054613b4c90614be9565b90600052602060002090601f016020900481019282613b6e5760008555613bb4565b82601f10613b875782800160ff19823516178555613bb4565b82800160010185558215613bb4579182015b82811115613bb4578235825591602001919060010190613b99565b506135a0929150613c34565b828054613bcc90614be9565b90600052602060002090601f016020900481019282613bee5760008555613bb4565b82601f10613c0757805160ff1916838001178555613bb4565b82800160010185558215613bb4579182015b82811115613bb4578251825591602001919060010190613c19565b5b808211156135a05760008155600101613c35565b6000613c5c613c5784614aab565b614a7b565b9050808382526020808301915083868660051b86011115613c7c57600080fd5b6000805b87811015613cbc5782356001600160401b03811115613c9d578283fd5b613ca98a828a01613d5e565b8652509383019391830191600101613c80565b50505050509392505050565b60008083601f840112613cd9578182fd5b5081356001600160401b03811115613cef578182fd5b6020830191508360208260051b8501011115613a4c57600080fd5b80358015158114613d1a57600080fd5b919050565b60008083601f840112613d30578182fd5b5081356001600160401b03811115613d46578182fd5b602083019150836020828501011115613a4c57600080fd5b600082601f830112613d6e578081fd5b81356001600160401b03811115613d8757613d87614c79565b613d9a601f8201601f1916602001614a7b565b818152846020838601011115613dae578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215613dd9578081fd5b8135610d1081614c8f565b600060208284031215613df5578081fd5b8151610d1081614c8f565b60008060408385031215613e12578081fd5b8235613e1d81614c8f565b91506020830135613e2d81614c8f565b809150509250929050565b60008060008060808587031215613e4d578182fd5b8435613e5881614c8f565b93506020850135613e6881614c8f565b92506040850135613e7881614c8f565b91506060850135613e8881614c8f565b939692955090935050565b600080600060608486031215613ea7578081fd5b8335613eb281614c8f565b92506020840135613ec281614c8f565b929592945050506040919091013590565b600080600080600060808688031215613eea578283fd5b8535613ef581614c8f565b94506020860135613f0581614c8f565b93506040860135925060608601356001600160401b03811115613f26578182fd5b613f3288828901613d1f565b969995985093965092949392505050565b60008060008060808587031215613f58578182fd5b8435613f6381614c8f565b93506020850135613f7381614c8f565b92506040850135915060608501356001600160401b03811115613f94578182fd5b613fa087828801613d5e565b91505092959194509250565b60008060008060008060008060a0898b031215613fc7578586fd5b8835613fd281614c8f565b975060208901356001600160401b0380821115613fed578788fd5b613ff98c838d01613cc8565b909950975060408b0135915080821115614011578485fd5b61401d8c838d01613cc8565b909750955060608b0135915080821115614035578485fd5b506140428b828c01613cc8565b9094509250614055905060808a01613d0a565b90509295985092959890939650565b60008060408385031215614076578182fd5b823561408181614c8f565b9150612c4c60208401613d0a565b6000806000604084860312156140a3578081fd5b83356140ae81614c8f565b925060208401356001600160401b038111156140c8578182fd5b6140d486828701613d1f565b9497909650939450505050565b600080604083850312156140f3578182fd5b82356140fe81614c8f565b946020939093013593505050565b60008060008060608587031215614121578182fd5b843561412c81614c8f565b93506020850135925060408501356001600160401b0381111561414d578283fd5b61415987828801613d1f565b95989497509550505050565b60008060208385031215614177578182fd5b82356001600160401b0381111561418c578283fd5b61419885828601613cc8565b90969095509350505050565b6000806000806000606086880312156141bb578283fd5b85356001600160401b03808211156141d1578485fd5b6141dd89838a01613cc8565b909750955060208801359150808211156141f5578485fd5b5061420288828901613cc8565b96999598509660400135949350505050565b600080600060408486031215614228578081fd5b83356001600160401b0381111561423d578182fd5b61424986828701613cc8565b909790965060209590950135949350505050565b60006020828403121561426e578081fd5b81356001600160401b03811115614283578182fd5b8201601f81018413614293578182fd5b610c0484823560208401613c49565b600060208083850312156142b4578182fd5b82356001600160401b038111156142c9578283fd5b8301601f810185136142d9578283fd5b80356142e7613c5782614aab565b80828252848201915084840188868560051b8701011115614306578687fd5b8694505b8385101561432857803583526001949094019391850191850161430a565b50979650505050505050565b600060208284031215614345578081fd5b610d1082613d0a565b60006020828403121561435f578081fd5b5051919050565b600060208284031215614377578081fd5b8135610d1081614ca4565b600060208284031215614393578081fd5b8151610d1081614ca4565b60008060008060008060006080888a0312156143b8578081fd5b87356001600160401b03808211156143ce578283fd5b6143da8b838c01613d1f565b909950975060208a0135965060408a01359150808211156143f9578283fd5b6144058b838c01613cc8565b909650945060608a013591508082111561441d578283fd5b5061442a8a828b01613cc8565b989b979a50959850939692959293505050565b6000806020838503121561444f578182fd5b82356001600160401b03811115614464578283fd5b61419885828601613d1f565b600080600080600060608688031215614487578283fd5b85356001600160401b038082111561449d578485fd5b6144a989838a01613d1f565b909750955060208801359150808211156144c1578485fd5b5061420288828901613d1f565b6000806000604084860312156144e2578081fd5b83356001600160401b038111156144f7578182fd5b61424986828701613d1f565b600060208284031215614514578081fd5b81356001600160401b03811115614529578182fd5b610c0484828501613d5e565b600080600060408486031215614549578081fd5b83356001600160401b038082111561455f578283fd5b9085019060808288031215614572578283fd5b90935060208501359080821115614587578283fd5b506140d486828701613d1f565b6000602082840312156145a5578081fd5b5035919050565b6000806000604084860312156145c0578081fd5b8335925060208401356001600160401b038111156140c8578182fd5b600080600080606085870312156145f1578182fd5b8435935060208501356001600160401b0381111561460d578283fd5b61461987828801613d1f565b9598909750949560400135949350505050565b6000806040838503121561463e578182fd5b50508035926020909101359150565b600081518084526020808501808196508360051b81019150828601855b858110156146945782840389526146828483516146ca565b9885019893509084019060010161466a565b5091979650505050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b600081518084526146e2816020860160208601614ba6565b601f01601f19169290920160200192915050565b60008251614708818460208701614ba6565b9190910192915050565b60008451614724818460208901614ba6565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b60008351614763818460208801614ba6565b601760f91b9083019081528351614781816001840160208801614ba6565b01600101949350505050565b8183823760009101908152919050565b600083516147af818460208801614ba6565b8351908301906147c3818360208801614ba6565b01949350505050565b6001600160a01b03848116825283166020820152606060408201819052600090610a98908301846146ca565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090612f2b908301846146ca565b602081526000610d10602083018461464d565b604081526000614851604083018561464d565b8281036020840152610d0c818561464d565b828152604060208201526000610c0460408301846146ca565b602081526000610c046020830184866146a1565b602081526000610d1060208301846146ca565b6040815260006148b660408301856146ca565b8281036020840152610d0c81856146ca565b60208082526029908201527f52656769737472793a2053454e4445525f49535f4e4f545f415050524f5645446040820152682fa7a92fa7aba722a960b91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526027908201527f52656769737472793a2053454e4445525f49535f4e4f545f4d494e54494e475f60408201526626a0a720a3a2a960c91b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60208082526022908201527f52656769737472793a20494e53554646494349454e545f5045524d495353494f6040820152614e5360f01b606082015260800190565b6000808335601e19843603018112614a4d578283fd5b8301803591506001600160401b03821115614a66578283fd5b602001915036819003821315613a4c57600080fd5b604051601f8201601f191681016001600160401b0381118282101715614aa357614aa3614c79565b604052919050565b60006001600160401b03821115614ac457614ac4614c79565b5060051b60200190565b60008219821115614ae157614ae1614c4d565b500190565b600082614af557614af5614c63565b500490565b600082821015614b0c57614b0c614c4d565b500390565b6000610d10368484613c49565b600060808236031215614b2f578081fd5b604051608081016001600160401b038282108183111715614b5257614b52614c79565b8160405284359150614b6382614c8f565b81835260208501356020840152604085013560408401526060850135915080821115614b8d578384fd5b50614b9a36828601613d5e565b60608301525092915050565b60005b83811015614bc1578181015183820152602001614ba9565b838111156112915750506000910152565b600081614be157614be1614c4d565b506000190190565b600181811c90821680614bfd57607f821691505b6020821081141561124257634e487b7160e01b600052602260045260246000fd5b6000600019821415614c3257614c32614c4d565b5060010190565b600082614c4857614c48614c63565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461103257600080fd5b6001600160e01b03198116811461103257600080fdfebe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafea164736f6c6343000804000a";
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
