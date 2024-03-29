"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNSRegistryV07__factory = void 0;
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
const _bytecode = "0x608060405234801561001057600080fd5b50614c76806100206000396000f3fe608060405234801561001057600080fd5b50600436106103785760003560e01c806370a08231116101d3578063ba5d40b711610104578063ebf0c717116100a2578063f5c1f76e1161007c578063f5c1f76e14610806578063f7df5c6014610819578063f8c8765e1461082c578063ffa1ad741461083f57600080fd5b8063ebf0c717146107e4578063ec129eea146107eb578063f25eb5c1146107fe57600080fd5b8063c87b56dd116100de578063c87b56dd1461076f578063ce92b33e14610782578063cf2c52cb14610795578063e985e9c5146107a857600080fd5b8063ba5d40b714610736578063bb5b27e114610749578063bebec6b41461075c57600080fd5b8063a22cb46511610171578063ab3b87fe1161014b578063ab3b87fe146106dc578063b3f9e4cb146106ef578063b85afd2814610702578063b88d4fde1461072357600080fd5b8063a22cb4651461068a578063a3f4df7e1461069d578063a4247400146106c957600080fd5b80639508b1c4116101ad5780639508b1c4146106545780639559c0bd1461066757806395d89b411461066f57806399e0dd7c1461067757600080fd5b806370a082311461061b5780637e37479e1461062e57806394d008ef1461064157600080fd5b806342842e0e116102ad578063509602391161024b578063638e5c7811610225578063638e5c78146105b3578063663f7b2a146105c6578063672b9f81146105d95780636ccbae5f146105fa57600080fd5b80635096023914610571578063572b6c05146105845780636352211e146105a057600080fd5b806347c816991161028757806347c81699146105255780634a72584d146105385780634f558e791461054b57806350382c1a1461055e57600080fd5b806342842e0e146104ec57806342966c68146104ff578063430c20811461051257600080fd5b80631bf7e13e1161031a578063276fabb1116102f4578063276fabb11461049257806327f18975146104b3578063310bd74b146104c657806340c10f19146104d957600080fd5b80631bf7e13e146104595780631f71be061461046c57806323b872dd1461047f57600080fd5b8063095ea7b311610356578063095ea7b3146103e5578063150b7a02146103fa5780631bd8cc1a146104265780631be5e7ed1461044657600080fd5b806301ffc9a71461037d57806306fdde03146103a5578063081812fc146103ba575b600080fd5b61039061038b3660046139bf565b610863565b60405190151581526020015b60405180910390f35b6103ad610874565b60405161039c9190613a2c565b6103cd6103c8366004613a3f565b610906565b6040516001600160a01b03909116815260200161039c565b6103f86103f3366004613a6d565b61092d565b005b61040d610408366004613ada565b610946565b6040516001600160e01b0319909116815260200161039c565b610439610434366004613b90565b610aa0565b60405161039c9190613c30565b6103ad610454366004613c43565b610b96565b6103ad610467366004613c7a565b610be1565b6103f861047a366004613cff565b610cec565b6103f861048d366004613dbb565b610d93565b6104a56104a0366004613dfc565b610de6565b60405190815260200161039c565b6103f86104c1366004613e3d565b610df5565b6103f86104d4366004613a3f565b610e3d565b6103f86104e7366004613a6d565b610e78565b6103f86104fa366004613dbb565b610ec5565b6103f861050d366004613a3f565b610ee0565b610390610520366004613a6d565b610f24565b6103f8610533366004613eb0565b610f30565b6103f8610546366004613f11565b610f6f565b610390610559366004613a3f565b610fb5565b6103f861056c366004614018565b610fd4565b6103f861057f36600461404c565b61100a565b61039061059236600461404c565b6001600160a01b0316301490565b6103cd6105ae366004613a3f565b61106a565b6103f86105c1366004613a3f565b6110ca565b6103f86105d4366004614104565b611115565b6105ec6105e736600461414c565b61114e565b60405161039c92919061416e565b6104a5610608366004613a3f565b6000908152610100602052604090205490565b6104a561062936600461404c565b611166565b6104a561063c36600461404c565b6111ec565b6103f861064f366004614193565b61121d565b6103f86106623660046141ee565b61126c565b6104a5601481565b6103ad6112f3565b6103f8610685366004614291565b611302565b6103f86106983660046142c6565b611389565b6103ad6040518060400160405280600d81526020016c554e533a20526567697374727960981b81525081565b6103906106d7366004613c7a565b61139b565b6103f86106ea366004613a6d565b6113e6565b6103cd6106fd366004613a3f565b61142b565b610715610710366004613b90565b611455565b60405161039c9291906142f2565b6103f8610731366004614317565b611577565b6103f8610744366004613cff565b6115be565b6103ad610757366004613a3f565b61162f565b6103ad61076a36600461404c565b6116d1565b6103ad61077d366004613a3f565b61179b565b6103f8610790366004613e3d565b611801565b6103f86107a3366004614382565b611840565b6103906107b63660046143c9565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006104a5565b6103f86107f9366004613e3d565b61190f565b6103f861194e565b610439610814366004613dfc565b6119d5565b6103f8610827366004614402565b611a88565b6103f861083a366004614434565b611b19565b6103ad60405180604001604052806005815260200164302e372e3360d81b81525081565b600061086e82611cef565b92915050565b60606065805461088390614490565b80601f01602080910402602001604051908101604052809291908181526020018280546108af90614490565b80156108fc5780601f106108d1576101008083540402835291602001916108fc565b820191906000526020600020905b8154815290600101906020018083116108df57829003601f168201915b5050505050905090565b600061091182611d3f565b506000908152606960205260409020546001600160a01b031690565b8061093781611d9e565b6109418383611e04565b505050565b60007f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378546001600160a01b031661097b611f26565b6001600160a01b031603610a3c57610991611f26565b6001600160a01b03166342966c68856040518263ffffffff1660e01b81526004016109be91815260200190565b600060405180830381600087803b1580156109d857600080fd5b505af11580156109ec573d6000803e3d6000fd5b505050821580159150610a065750610a06828401846144c4565b15610a2457610a153085611f35565b610a1f8585612083565b610a2e565b610a2e8585611f35565b50630a85bd0160e11b610a97565b60405162461bcd60e51b815260206004820152602560248201527f52656769737472793a204552433732315f524543454956494e475f50524f4849604482015264109255115160da1b60648201526084015b60405180910390fd5b95945050505050565b6060826001600160401b03811115610aba57610aba613f63565b604051908082528060200260200182016040528015610aed57816020015b6060815260200190600190039081610ad85790505b50905060005b83811015610b8e57610b5e858583818110610b1057610b106144df565b9050602002810190610b2291906144f5565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525087925061212e915050565b828281518110610b7057610b706144df565b60200260200101819052508080610b8690614551565b915050610af3565b509392505050565b6060610bd984848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525086925061212e915050565b949350505050565b606060005a9050610bf385858561139b565b610c4f5760405162461bcd60e51b815260206004820152602760248201527f554e535265676973747279466f727761726465723a205349474e41545552455f6044820152661253959053125160ca1b6064820152608401610a8e565b610ce1610c5f602087018761404c565b30604088013584610c7360608b018b6144f5565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b908190840183828082843760009201919091525061216392505050565b9150505b9392505050565b610134546001600160a01b0316610d01611f26565b6001600160a01b031614610d275760405162461bcd60e51b8152600401610a8e9061456a565b6000610d3b610d36888a6145b1565b612244565b9050610d4681612293565b610d59610d528261106a565b8a83612300565b610d6686868686856124a7565b8115610d8857610d888982610d83610d7e8b8d6145b1565b612515565b612596565b505050505050505050565b80610da5610d9f611f26565b826125d8565b610dc15760405162461bcd60e51b8152600401610a8e906145be565b81610dcb81611d9e565b610dd483612293565b610ddf858585612300565b5050505050565b6000610ce5610d3683856145b1565b80610e01610d9f611f26565b610e1d5760405162461bcd60e51b8152600401610a8e906145be565b81610e2781611d9e565b610e348787878787612656565b50505050505050565b80610e49610d9f611f26565b610e655760405162461bcd60e51b8152600401610a8e906145be565b81610e6f81611d9e565b61094183612293565b610e806126b9565b6001600160a01b0316610e91611f26565b6001600160a01b031614610eb75760405162461bcd60e51b8152600401610a8e90614607565b610ec18282611f35565b5050565b61094183838360405180602001604052806000815250611577565b80610eec610d9f611f26565b610f085760405162461bcd60e51b8152600401610a8e906145be565b81610f1281611d9e565b610f1b83612293565b610941836127ba565b6000610ce583836125d8565b80610f3c610d9f611f26565b610f585760405162461bcd60e51b8152600401610a8e906145be565b81610f6281611d9e565b610e348787878787612861565b80610f7b610d9f611f26565b610f975760405162461bcd60e51b8152600401610a8e906145be565b81610fa181611d9e565b610fad86868686612940565b505050505050565b6000818152606760205260408120546001600160a01b0316151561086e565b61100781604051602001610fe89190614649565b6040516020818303038152906040528051906020012060001c826129e0565b50565b610134546001600160a01b031661101f611f26565b6001600160a01b0316146110455760405162461bcd60e51b8152600401610a8e9061456a565b6001600160a01b0316600090815261013660205260409020805460ff19166001179055565b6000818152606760205260408120546001600160a01b03168061086e5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610a8e565b806110d6610d9f611f26565b6110f25760405162461bcd60e51b8152600401610a8e906145be565b6111046110fd611f26565b3084612300565b610ec161110f611f26565b83612083565b600061112082612244565b905061112b81612a05565b61113481611d9e565b610ec161113f611f26565b8261114985612515565b612a75565b60608061115b8484612afc565b909590945092505050565b60006001600160a01b0382166111d05760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610a8e565b506001600160a01b031660009081526068602052604090205490565b6001600160a01b0381166000908152610135602052604081205461120f81612b1d565b611217578091505b50919050565b6112256126b9565b6001600160a01b0316611236611f26565b6001600160a01b03161461125c5760405162461bcd60e51b8152600401610a8e90614607565b6112668484611f35565b50505050565b6112768787612b67565b61127e611f26565b6001600160a01b03166112908661106a565b6001600160a01b0316146112e65760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610a8e565b610e3484848484896124a7565b60606066805461088390614490565b610134546001600160a01b0316611317611f26565b6001600160a01b03161461133d5760405162461bcd60e51b8152600401610a8e9061456a565b61013361134b8284836146ab565b507f4b120d6a959a84a520fa48f5f937cca0e79129423487af7901213b5d2e89313b828260405161137d929190614793565b60405180910390a15050565b610ec1611394611f26565b8383612bd6565b6000610bd96113a9856147a7565b3085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612ca492505050565b806113f2610d9f611f26565b61140e5760405162461bcd60e51b8152600401610a8e906145be565b8161141881611d9e565b6112666114248461106a565b8585612300565b6000818152606760205260408120546001600160a01b031661144e57600061086e565b3092915050565b606080836001600160401b0381111561147057611470613f63565b6040519080825280602002602001820160405280156114a357816020015b606081526020019060019003908161148e5790505b509150836001600160401b038111156114be576114be613f63565b6040519080825280602002602001820160405280156114f157816020015b60608152602001906001900390816114dc5790505b50905060005b8481101561156e57611521868683818110611514576115146144df565b9050602002013585612afc565b848381518110611533576115336144df565b6020026020010184848151811061154c5761154c6144df565b602002602001018290528290525050808061156690614551565b9150506114f7565b50935093915050565b81611583610d9f611f26565b61159f5760405162461bcd60e51b8152600401610a8e906145be565b826115a981611d9e565b6115b284612293565b610fad86868686612ded565b610134546001600160a01b03166115d3611f26565b6001600160a01b0316146115f95760405162461bcd60e51b8152600401610a8e9061456a565b6000611608610d36888a6145b1565b9050611622898261161c610d7e8b8d6145b1565b85612e20565b610d8886868686856124a7565b600081815260c96020526040902080546060919061164c90614490565b80601f016020809104026020016040519081016040528092919081815260200182805461167890614490565b80156116c55780601f1061169a576101008083540402835291602001916116c5565b820191906000526020600020905b8154815290600101906020018083116116a857829003601f168201915b50505050509050919050565b6001600160a01b038116600090815261013560205260409020546060906116f781612b1d565b61121757600081815261013860205260409020805461171590614490565b80601f016020809104026020016040519081016040528092919081815260200182805461174190614490565b801561178e5780601f106117635761010080835404028352916020019161178e565b820191906000526020600020905b81548152906001019060200180831161177157829003601f168201915b5050505050915050919050565b60606117a682611d3f565b60006117b0612e73565b905060008151116117d05760405180602001604052806000815250610ce5565b806117da84612e83565b6040516020016117eb929190614831565b6040516020818303038152906040529392505050565b8061180d610d9f611f26565b6118295760405162461bcd60e51b8152600401610a8e906145be565b8161183381611d9e565b610e3487878787876124a7565b7f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87546001600160a01b0316611873611f26565b6001600160a01b0316146118995760405162461bcd60e51b8152600401610a8e90614607565b60208190036118bc5760006118b082840184613a3f565b90506112668482611f35565b60006118ca82840184614860565b805190915060005b81811015610fad576118fd868483815181106118f0576118f06144df565b6020026020010151611f35565b8061190781614551565b9150506118d2565b8061191b610d9f611f26565b6119375760405162461bcd60e51b8152600401610a8e906145be565b8161194181611d9e565b610e348787878787612f83565b6000611958611f26565b6001600160a01b03811660009081526101356020526040812054919250036119cc5760405162461bcd60e51b815260206004820152602160248201527f52656769737472793a20524556455253455f5245434f52445f49535f454d50546044820152605960f81b6064820152608401610a8e565b61100781612f99565b6060816001600160401b038111156119ef576119ef613f63565b604051908082528060200260200182016040528015611a2257816020015b6060815260200190600190039081611a0d5790505b50905060005b82811015611a8157611a51848483818110611a4557611a456144df565b9050602002013561162f565b828281518110611a6357611a636144df565b60200260200101819052508080611a7990614551565b915050611a28565b5092915050565b610134546001600160a01b0316611a9d611f26565b6001600160a01b031614611ac35760405162461bcd60e51b8152600401610a8e9061456a565b61013454611ada906001600160a01b031684611f35565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39528383604051611b0c929190614793565b60405180910390a2505050565b600054610100900460ff1615808015611b395750600054600160ff909116105b80611b535750303b158015611b53575060005460ff166001145b611bb65760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610a8e565b6000805460ff191660011790558015611bd9576000805461ff0019166101001790555b61013480546001600160a01b0319166001600160a01b038716179055837f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec9237880546001600160a01b0319166001600160a01b03929092169190911790556040805180820182526013815272556e73746f707061626c6520446f6d61696e7360681b60208083019190915282518084019093526002835261155160f21b90830152611c8191612fde565b611c8961301e565b611c9161301e565b611c9a83613047565b611ca382613077565b8015610ddf576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050505050565b60006001600160e01b031982166380ac58cd60e01b1480611d2057506001600160e01b03198216635b5e139f60e01b145b8061086e57506301ffc9a760e01b6001600160e01b031983161461086e565b6000818152606760205260409020546001600160a01b03166110075760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610a8e565b303303611dfb57611dad6130a7565b81146110075760405162461bcd60e51b815260206004820152601760248201527f52656769737472793a20544f4b454e5f494e56414c49440000000000000000006044820152606401610a8e565b611007816130bb565b6000611e0f8261106a565b9050806001600160a01b0316836001600160a01b031603611e7c5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610a8e565b806001600160a01b0316611e8e611f26565b6001600160a01b03161480611eaa5750611eaa816107b6611f26565b611f1c5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610a8e565b61094183836130e9565b6000611f30613157565b905090565b6001600160a01b038216611f8b5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610a8e565b6000818152606760205260409020546001600160a01b031615611ff05760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610a8e565b611ffc60008383613172565b6001600160a01b03821660009081526068602052604081208054600192906120259084906148f0565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600061208d6126b9565b905061209981836130e9565b600080516020614c4a83398151915254604080516020808201869052825180830390910181528183019283905263e3dec8fb60e01b9092526001600160a01b0390921691829163e3dec8fb916120f6918891309190604401614903565b600060405180830381600087803b15801561211057600080fd5b505af1158015612124573d6000803e3d6000fd5b5050505050505050565b6060610ce5836040516020016121449190614649565b6040516020818303038152906040528051906020012060001c8361320f565b606061216e856130bb565b600080876001600160a01b0316866121888b8a89896132f1565b6040516121959190614649565b60006040518083038160008787f1925050503d80600081146121d3576040519150601f19603f3d011682016040523d82523d6000602084013e6121d8565b606091505b5090925090506121e9603f87614945565b5a116121f7576121f7614959565b61223782826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c4544000000000000815250613321565b9998505050505050505050565b805160009081905b8015611a815761227f828561226260018561496f565b81518110612272576122726144df565b602002602001015161335a565b91508061228b81614982565b91505061224c565b61229c81613406565b6040516020016122ae91815260200190565b60408051601f198184030181528282528051602091820120600085815260cb9092529181209190915582917f185c30856dadb58bf097c1f665a52ada7029752dbcad008ea3fefc73bee8c9fe9190a250565b826001600160a01b03166123138261106a565b6001600160a01b0316146123775760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610a8e565b6001600160a01b0382166123d95760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610a8e565b6123e4838383613172565b6123ef6000826130e9565b6001600160a01b038316600090815260686020526040812080546001929061241890849061496f565b90915550506001600160a01b03821660009081526068602052604081208054600192906124469084906148f0565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60005b84811015610fad576125038686838181106124c7576124c76144df565b90506020028101906124d991906144f5565b8686858181106124eb576124eb6144df565b90506020028101906124fd91906144f5565b86612861565b8061250d81614551565b9150506124aa565b606060008260008151811061252c5761252c6144df565b602002602001015190506000600190505b8351811015611a815781848281518110612559576125596144df565b6020026020010151604051602001612572929190614999565b6040516020818303038152906040529150808061258e90614551565b91505061253d565b61dead6001600160a01b038416148015906125c857506001600160a01b03831660009081526101356020526040902054155b1561094157610941838383612a75565b6000806125e48361106a565b9050806001600160a01b0316846001600160a01b0316148061262b57506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b80610bd95750836001600160a01b031661264484610906565b6001600160a01b031614949350505050565b60005b84811015610fad576126a7868683818110612676576126766144df565b9050602002013585858481811061268f5761268f6144df565b90506020028101906126a191906144f5565b85612940565b806126b181614551565b915050612659565b600080516020614c4a833981519152546000906001600160a01b031680156127b65760405163721804d360e11b81523060048201526000906001600160a01b0383169063e43009a690602401602060405180830381865afa158015612722573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061274691906149d5565b60405163e66f960360e01b8152600481018290529091506001600160a01b0383169063e66f960390602401602060405180830381865afa15801561278e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127b291906149ee565b9250505b5090565b60006127c58261106a565b90506127d381600084613172565b6127de6000836130e9565b6001600160a01b038116600090815260686020526040812080546001929061280790849061496f565b909155505060008281526067602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60008585604051602001612876929190614a0b565b60408051601f198184030181528282528051602091820120601f89018290048202840182019092528783529092506128ca91839189908990819084018382808284376000920191909152506129e092505050565b610fad8187878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b01819004810282018101909252898152925089915088908190840183828082843760009201919091525088925061342e915050565b61294984613563565b6129955760405162461bcd60e51b815260206004820152601c60248201527f5265636f726453746f726167653a204b45595f4e4f545f464f554e44000000006044820152606401610a8e565b611266846129a28661162f565b85858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525087925061342e915050565b6129e982613563565b610ec157600082815260c9602052604090206109418282614a1b565b612a0d611f26565b6001600160a01b0316612a1f8261106a565b6001600160a01b0316146110075760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610a8e565b6000828152610138602052604090208054612a8f90614490565b9050600003612ab357600082815261013860205260409020612ab18282614a1b565b505b6001600160a01b03831660008181526101356020526040808220859055518492917feb76a21470988c474a21f690cc28fee1ed511bd812dc3c21fd0f49c5e5d4708a91a3505050565b606080612b088461162f565b9150612b14848461320f565b90509250929050565b6000818152610137602052604081205460ff16801561086e57506101366000612b44611f26565b6001600160a01b0316815260208101919091526040016000205460ff1692915050565b600080516020614c4a83398151915254604051633805550f60e01b81526001600160a01b03909116908190633805550f90612ba89086908690600401614793565b600060405180830381600087803b158015612bc257600080fd5b505af1158015610e34573d6000803e3d6000fd5b816001600160a01b0316836001600160a01b031603612c375760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610a8e565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f90602401602060405180830381865afa158015612ceb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612d0f91906149d5565b90506000612dbd866060015180519060200120868860200151604051602001612d5d9392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b9050818660200151148015612de357508551612de3906001600160a01b03168286613589565b9695505050505050565b612df8848484612300565b612e04848484846136cb565b6112665760405162461bcd60e51b8152600401610a8e90614ada565b612e2a8484611f35565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c395283604051612e5a9190613a2c565b60405180910390a2801561126657611266848484612596565b6060610133805461088390614490565b606081600003612eaa5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115612ed45780612ebe81614551565b9150612ecd9050600a83614945565b9150612eae565b6000816001600160401b03811115612eee57612eee613f63565b6040519080825280601f01601f191660200182016040528015612f18576020820181803683370190505b5090505b8415610bd957612f2d60018361496f565b9150612f3a600a86614b2c565b612f459060306148f0565b60f81b818381518110612f5a57612f5a6144df565b60200101906001600160f81b031916908160001a905350612f7c600a86614945565b9450612f1c565b612f8c81612293565b610ddf85858585856124a7565b6001600160a01b03811660008181526101356020526040808220829055517ffcf5eec0cfa3e6332f5f0e63ec242d71f866a61d121d6cdf5c2eb3b668a26c4f9190a250565b600054610100900460ff166130055760405162461bcd60e51b8152600401610a8e90614b40565b60656130118382614a1b565b5060666109418282614a1b565b600054610100900460ff166130455760405162461bcd60e51b8152600401610a8e90614b40565b565b600054610100900460ff1661306e5760405162461bcd60e51b8152600401610a8e90614b40565b611007816137d0565b600054610100900460ff1661309e5760405162461bcd60e51b8152600401610a8e90614b40565b61100781613829565b60003033036130b85750601f193601355b90565b600081815261010060205260409020546130d69060016148f0565b6000918252610100602052604090912055565b600081815260696020526040902080546001600160a01b0319166001600160a01b038416908117909155819061311e8261106a565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600030330361316d575060331936013560601c90565b503390565b6000818152610137602052604090205460ff16158061319957506001600160a01b03821615155b6131e55760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a20544f4b454e5f555047524144454400000000000000006044820152606401610a8e565b6001600160a01b038316600090815261013560205260409020548190036109415761094183612f99565b606061321a82612b1d565b15613234575060408051602081019091526000815261086e565b60ca600061324184613406565b81526020019081526020016000206000848152602001908152602001600020805461326b90614490565b80601f016020809104026020016040519081016040528092919081815260200182805461329790614490565b80156132e45780601f106132b9576101008083540402835291602001916132e4565b820191906000526020600020905b8154815290600101906020018083116132c757829003601f168201915b5050505050905092915050565b606082858560405160200161330893929190614b8b565b6040516020818303038152906040529050949350505050565b60608315613330575081610ce5565b8251156133405782518084602001fd5b8160405162461bcd60e51b8152600401610a8e9190613a2c565b600081516000036133a55760405162461bcd60e51b815260206004820152601560248201527452656769737472793a204c4142454c5f454d50545960581b6044820152606401610a8e565b82826040516020016133b79190614649565b604051602081830303815290604052805190602001206040516020016133e7929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b600081815260cb6020526040812054156127b657600082815260cb602052604090205461086e565b60ca600061343b83613406565b81526020019081526020016000206000858152602001908152602001600020805461346590614490565b90506000036134bd578260405161347c9190614649565b6040518091039020817f7ae4f661958fbecc2f77be6b0eb280d2a6f604b29e1e7221c82b9da0c4af7f86856040516134b49190613a2c565b60405180910390a35b8160ca60006134cb84613406565b8152602001908152602001600020600086815260200190815260200160002090816134f69190614a1b565b50816040516135059190614649565b60405180910390208360405161351b9190614649565b6040518091039020827f851ffe8e74d5015261dba0a1f9e1b0e5d42c5af5d2ad1908fee897c7d80a0d92868660405161355592919061416e565b60405180910390a450505050565b600081815260c960205260408120805482919061357f90614490565b9050119050919050565b60008060006135988585613877565b909250905060008160048111156135b1576135b1614bca565b1480156135cf5750856001600160a01b0316826001600160a01b0316145b156135df57600192505050610ce5565b600080876001600160a01b0316631626ba7e60e01b8888604051602401613607929190614be0565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516136459190614649565b600060405180830381855afa9150503d8060008114613680576040519150601f19603f3d011682016040523d82523d6000602084013e613685565b606091505b5091509150818015613698575080516020145b80156136bf57508051630b135d3f60e11b906136bd90830160209081019084016149d5565b145b98975050505050505050565b60006001600160a01b0384163b156137c857836001600160a01b031663150b7a026136f4611f26565b8786866040518563ffffffff1660e01b81526004016137169493929190614bf9565b6020604051808303816000875af1925050508015613751575060408051601f3d908101601f1916820190925261374e91810190614c2c565b60015b6137ae573d80801561377f576040519150601f19603f3d011682016040523d82523d6000602084013e613784565b606091505b5080516000036137a65760405162461bcd60e51b8152600401610a8e90614ada565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610bd9565b506001610bd9565b600054610100900460ff166137f75760405162461bcd60e51b8152600401610a8e90614b40565b80600080516020614c4a8339815191525b80546001600160a01b0319166001600160a01b039290921691909117905550565b600054610100900460ff166138505760405162461bcd60e51b8152600401610a8e90614b40565b807f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87613808565b60008082516041036138ad5760208301516040840151606085015160001a6138a1878285856138bc565b945094505050506138b5565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156138f357506000905060036139a0565b8460ff16601b1415801561390b57508460ff16601c14155b1561391c57506000905060046139a0565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613970573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613999576000600192509250506139a0565b9150600090505b94509492505050565b6001600160e01b03198116811461100757600080fd5b6000602082840312156139d157600080fd5b8135610ce5816139a9565b60005b838110156139f75781810151838201526020016139df565b50506000910152565b60008151808452613a188160208601602086016139dc565b601f01601f19169290920160200192915050565b602081526000610ce56020830184613a00565b600060208284031215613a5157600080fd5b5035919050565b6001600160a01b038116811461100757600080fd5b60008060408385031215613a8057600080fd5b8235613a8b81613a58565b946020939093013593505050565b60008083601f840112613aab57600080fd5b5081356001600160401b03811115613ac257600080fd5b6020830191508360208285010111156138b557600080fd5b600080600080600060808688031215613af257600080fd5b8535613afd81613a58565b94506020860135613b0d81613a58565b93506040860135925060608601356001600160401b03811115613b2f57600080fd5b613b3b88828901613a99565b969995985093965092949392505050565b60008083601f840112613b5e57600080fd5b5081356001600160401b03811115613b7557600080fd5b6020830191508360208260051b85010111156138b557600080fd5b600080600060408486031215613ba557600080fd5b83356001600160401b03811115613bbb57600080fd5b613bc786828701613b4c565b909790965060209590950135949350505050565b600081518084526020808501808196508360051b8101915082860160005b85811015613c23578284038952613c11848351613a00565b98850198935090840190600101613bf9565b5091979650505050505050565b602081526000610ce56020830184613bdb565b600080600060408486031215613c5857600080fd5b83356001600160401b03811115613c6e57600080fd5b613bc786828701613a99565b600080600060408486031215613c8f57600080fd5b83356001600160401b0380821115613ca657600080fd5b9085019060808288031215613cba57600080fd5b90935060208501359080821115613cd057600080fd5b50613cdd86828701613a99565b9497909650939450505050565b80358015158114613cfa57600080fd5b919050565b60008060008060008060008060a0898b031215613d1b57600080fd5b8835613d2681613a58565b975060208901356001600160401b0380821115613d4257600080fd5b613d4e8c838d01613b4c565b909950975060408b0135915080821115613d6757600080fd5b613d738c838d01613b4c565b909750955060608b0135915080821115613d8c57600080fd5b50613d998b828c01613b4c565b9094509250613dac905060808a01613cea565b90509295985092959890939650565b600080600060608486031215613dd057600080fd5b8335613ddb81613a58565b92506020840135613deb81613a58565b929592945050506040919091013590565b60008060208385031215613e0f57600080fd5b82356001600160401b03811115613e2557600080fd5b613e3185828601613b4c565b90969095509350505050565b600080600080600060608688031215613e5557600080fd5b85356001600160401b0380821115613e6c57600080fd5b613e7889838a01613b4c565b90975095506020880135915080821115613e9157600080fd5b50613e9e88828901613b4c565b96999598509660400135949350505050565b600080600080600060608688031215613ec857600080fd5b85356001600160401b0380821115613edf57600080fd5b613eeb89838a01613a99565b90975095506020880135915080821115613f0457600080fd5b50613e9e88828901613a99565b60008060008060608587031215613f2757600080fd5b8435935060208501356001600160401b03811115613f4457600080fd5b613f5087828801613a99565b9598909750949560400135949350505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715613fa157613fa1613f63565b604052919050565b600082601f830112613fba57600080fd5b81356001600160401b03811115613fd357613fd3613f63565b613fe6601f8201601f1916602001613f79565b818152846020838601011115613ffb57600080fd5b816020850160208301376000918101602001919091529392505050565b60006020828403121561402a57600080fd5b81356001600160401b0381111561404057600080fd5b610bd984828501613fa9565b60006020828403121561405e57600080fd5b8135610ce581613a58565b60006001600160401b0382111561408257614082613f63565b5060051b60200190565b600061409f61409a84614069565b613f79565b8381529050602080820190600585901b8401868111156140be57600080fd5b845b818110156140f95780356001600160401b038111156140df5760008081fd5b6140eb89828901613fa9565b8552509282019282016140c0565b505050509392505050565b60006020828403121561411657600080fd5b81356001600160401b0381111561412c57600080fd5b8201601f8101841361413d57600080fd5b610bd98482356020840161408c565b6000806040838503121561415f57600080fd5b50508035926020909101359150565b6040815260006141816040830185613a00565b8281036020840152610ce18185613a00565b600080600080606085870312156141a957600080fd5b84356141b481613a58565b93506020850135925060408501356001600160401b038111156141d657600080fd5b6141e287828801613a99565b95989497509550505050565b60008060008060008060006080888a03121561420957600080fd5b87356001600160401b038082111561422057600080fd5b61422c8b838c01613a99565b909950975060208a0135965060408a013591508082111561424c57600080fd5b6142588b838c01613b4c565b909650945060608a013591508082111561427157600080fd5b5061427e8a828b01613b4c565b989b979a50959850939692959293505050565b600080602083850312156142a457600080fd5b82356001600160401b038111156142ba57600080fd5b613e3185828601613a99565b600080604083850312156142d957600080fd5b82356142e481613a58565b9150612b1460208401613cea565b6040815260006143056040830185613bdb565b8281036020840152610ce18185613bdb565b6000806000806080858703121561432d57600080fd5b843561433881613a58565b9350602085013561434881613a58565b92506040850135915060608501356001600160401b0381111561436a57600080fd5b61437687828801613fa9565b91505092959194509250565b60008060006040848603121561439757600080fd5b83356143a281613a58565b925060208401356001600160401b038111156143bd57600080fd5b613cdd86828701613a99565b600080604083850312156143dc57600080fd5b82356143e781613a58565b915060208301356143f781613a58565b809150509250929050565b60008060006040848603121561441757600080fd5b8335925060208401356001600160401b038111156143bd57600080fd5b6000806000806080858703121561444a57600080fd5b843561445581613a58565b9350602085013561446581613a58565b9250604085013561447581613a58565b9150606085013561448581613a58565b939692955090935050565b600181811c908216806144a457607f821691505b60208210810361121757634e487b7160e01b600052602260045260246000fd5b6000602082840312156144d657600080fd5b610ce582613cea565b634e487b7160e01b600052603260045260246000fd5b6000808335601e1984360301811261450c57600080fd5b8301803591506001600160401b0382111561452657600080fd5b6020019150368190038213156138b557600080fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016145635761456361453b565b5060010190565b60208082526027908201527f52656769737472793a2053454e4445525f49535f4e4f545f4d494e54494e475f60408201526626a0a720a3a2a960c91b606082015260800190565b6000610ce536848461408c565b60208082526029908201527f52656769737472793a2053454e4445525f49535f4e4f545f415050524f5645446040820152682fa7a92fa7aba722a960b91b606082015260800190565b60208082526022908201527f52656769737472793a20494e53554646494349454e545f5045524d495353494f6040820152614e5360f01b606082015260800190565b6000825161465b8184602087016139dc565b9190910192915050565b601f82111561094157600081815260208120601f850160051c8101602086101561468c5750805b601f850160051c820191505b81811015610fad57828155600101614698565b6001600160401b038311156146c2576146c2613f63565b6146d6836146d08354614490565b83614665565b6000601f84116001811461470a57600085156146f25750838201355b600019600387901b1c1916600186901b178355610ddf565b600083815260209020601f19861690835b8281101561473b578685013582556020948501946001909201910161471b565b50868210156147585760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b602081526000610bd960208301848661476a565b6000608082360312156147b957600080fd5b604051608081016001600160401b0382821081831117156147dc576147dc613f63565b81604052843591506147ed82613a58565b8183526020850135602084015260408501356040840152606085013591508082111561481857600080fd5b5061482536828601613fa9565b60608301525092915050565b600083516148438184602088016139dc565b8351908301906148578183602088016139dc565b01949350505050565b6000602080838503121561487357600080fd5b82356001600160401b0381111561488957600080fd5b8301601f8101851361489a57600080fd5b80356148a861409a82614069565b81815260059190911b820183019083810190878311156148c757600080fd5b928401925b828410156148e5578335825292840192908401906148cc565b979650505050505050565b8082018082111561086e5761086e61453b565b6001600160a01b03848116825283166020820152606060408201819052600090610a9790830184613a00565b634e487b7160e01b600052601260045260246000fd5b6000826149545761495461492f565b500490565b634e487b7160e01b600052600160045260246000fd5b8181038181111561086e5761086e61453b565b6000816149915761499161453b565b506000190190565b600083516149ab8184602088016139dc565b601760f91b90830190815283516149c98160018401602088016139dc565b01600101949350505050565b6000602082840312156149e757600080fd5b5051919050565b600060208284031215614a0057600080fd5b8151610ce581613a58565b8183823760009101908152919050565b81516001600160401b03811115614a3457614a34613f63565b614a4881614a428454614490565b84614665565b602080601f831160018114614a7d5760008415614a655750858301515b600019600386901b1c1916600185901b178555610fad565b600085815260208120601f198616915b82811015614aac57888601518255948401946001909101908401614a8d565b5085821015614aca5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b600082614b3b57614b3b61492f565b500690565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60008451614b9d8184602089016139dc565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b634e487b7160e01b600052602160045260246000fd5b828152604060208201526000610bd96040830184613a00565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090612de390830184613a00565b600060208284031215614c3e57600080fd5b8151610ce5816139a956febe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafea164736f6c6343000811000a";
const isSuperArgs = (xs) => xs.length > 1;
class UNSRegistryV07__factory extends ethers_1.ContractFactory {
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
exports.UNSRegistryV07__factory = UNSRegistryV07__factory;
UNSRegistryV07__factory.bytecode = _bytecode;
UNSRegistryV07__factory.abi = _abi;
