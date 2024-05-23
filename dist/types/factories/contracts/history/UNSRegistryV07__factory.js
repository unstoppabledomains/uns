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
const _bytecode = "0x608060405234801561000f575f80fd5b50614aa08061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610367575f3560e01c806370a08231116101c9578063ba5d40b7116100fe578063ebf0c7171161009e578063f5c1f76e11610079578063f5c1f76e146107f1578063f7df5c6014610804578063f8c8765e14610817578063ffa1ad741461082a575f80fd5b8063ebf0c717146107d0578063ec129eea146107d6578063f25eb5c1146107e9575f80fd5b8063c87b56dd116100d9578063c87b56dd1461075c578063ce92b33e1461076f578063cf2c52cb14610782578063e985e9c514610795575f80fd5b8063ba5d40b714610723578063bb5b27e114610736578063bebec6b414610749575f80fd5b8063a22cb46511610169578063ab3b87fe11610144578063ab3b87fe146106c9578063b3f9e4cb146106dc578063b85afd28146106ef578063b88d4fde14610710575f80fd5b8063a22cb46514610677578063a3f4df7e1461068a578063a4247400146106b6575f80fd5b80639508b1c4116101a45780639508b1c4146106415780639559c0bd1461065457806395d89b411461065c57806399e0dd7c14610664575f80fd5b806370a08231146106085780637e37479e1461061b57806394d008ef1461062e575f80fd5b806342842e0e1161029f578063509602391161023f578063638e5c781161021a578063638e5c78146105a1578063663f7b2a146105b4578063672b9f81146105c75780636ccbae5f146105e8575f80fd5b8063509602391461055f578063572b6c05146105725780636352211e1461058e575f80fd5b806347c816991161027a57806347c81699146105135780634a72584d146105265780634f558e791461053957806350382c1a1461054c575f80fd5b806342842e0e146104da57806342966c68146104ed578063430c208114610500575f80fd5b80631bf7e13e1161030a578063276fabb1116102e5578063276fabb11461048057806327f18975146104a1578063310bd74b146104b457806340c10f19146104c7575f80fd5b80631bf7e13e146104475780631f71be061461045a57806323b872dd1461046d575f80fd5b8063095ea7b311610345578063095ea7b3146103d3578063150b7a02146103e85780631bd8cc1a146104145780631be5e7ed14610434575f80fd5b806301ffc9a71461036b57806306fdde0314610393578063081812fc146103a8575b5f80fd5b61037e6103793660046138a2565b61084e565b60405190151581526020015b60405180910390f35b61039b61085e565b60405161038a919061390a565b6103bb6103b636600461391c565b6108ee565b6040516001600160a01b03909116815260200161038a565b6103e66103e1366004613947565b610913565b005b6103fb6103f63660046139ae565b61092c565b6040516001600160e01b0319909116815260200161038a565b610427610422366004613a5b565b610a80565b60405161038a9190613afa565b61039b610442366004613b0c565b610b69565b61039b610455366004613b3f565b610bb3565b6103e6610468366004613bbd565b610cbb565b6103e661047b366004613c71565b610d61565b61049361048e366004613caf565b610db4565b60405190815260200161038a565b6103e66104af366004613ced565b610dc2565b6103e66104c236600461391c565b610e0a565b6103e66104d5366004613947565b610e45565b6103e66104e8366004613c71565b610e92565b6103e66104fb36600461391c565b610eac565b61037e61050e366004613947565b610ef0565b6103e6610521366004613d5a565b610efb565b6103e6610534366004613db5565b610f3a565b61037e61054736600461391c565b610f80565b6103e661055a366004613eb2565b610f9e565b6103e661056d366004613ee3565b610fd3565b61037e610580366004613ee3565b6001600160a01b0316301490565b6103bb61059c36600461391c565b611032565b6103e66105af36600461391c565b611091565b6103e66105c2366004613f94565b6110dc565b6105da6105d5366004613fd8565b611114565b60405161038a929190613ff8565b6104936105f636600461391c565b5f908152610100602052604090205490565b610493610616366004613ee3565b61112c565b610493610629366004613ee3565b6111b0565b6103e661063c36600461401c565b6111e0565b6103e661064f366004614073565b61122f565b610493601481565b61039b6112b6565b6103e661067236600461410e565b6112c5565b6103e6610685366004614140565b61134c565b61039b6040518060400160405280600d81526020016c554e533a20526567697374727960981b81525081565b61037e6106c4366004613b3f565b61135e565b6103e66106d7366004613947565b6113a7565b6103bb6106ea36600461391c565b6113ec565b6107026106fd366004613a5b565b611414565b60405161038a92919061416a565b6103e661071e36600461418e565b61152a565b6103e6610731366004613bbd565b611571565b61039b61074436600461391c565b6115e1565b61039b610757366004613ee3565b611680565b61039b61076a36600461391c565b611746565b6103e661077d366004613ced565b6117a9565b6103e66107903660046141f5565b6117e8565b61037e6107a3366004614238565b6001600160a01b039182165f908152606a6020908152604080832093909416825291909152205460ff1690565b5f610493565b6103e66107e4366004613ced565b6118aa565b6103e66118e9565b6104276107ff366004613caf565b61196e565b6103e661081236600461426f565b611a15565b6103e661082536600461429d565b611aa6565b61039b60405180604001604052806005815260200164302e372e3360d81b81525081565b5f61085882611c76565b92915050565b60606065805461086d906142f6565b80601f0160208091040260200160405190810160405280929190818152602001828054610899906142f6565b80156108e45780601f106108bb576101008083540402835291602001916108e4565b820191905f5260205f20905b8154815290600101906020018083116108c757829003601f168201915b5050505050905090565b5f6108f882611cc5565b505f908152606960205260409020546001600160a01b031690565b8061091d81611d23565b6109278383611d89565b505050565b5f7f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378546001600160a01b0316610960611eaa565b6001600160a01b031603610a1c57610976611eaa565b6001600160a01b03166342966c68856040518263ffffffff1660e01b81526004016109a391815260200190565b5f604051808303815f87803b1580156109ba575f80fd5b505af11580156109cc573d5f803e3d5ffd5b5050508215801591506109e657506109e682840184614328565b15610a04576109f53085611eb8565b6109ff8585612002565b610a0e565b610a0e8585611eb8565b50630a85bd0160e11b610a77565b60405162461bcd60e51b815260206004820152602560248201527f52656769737472793a204552433732315f524543454956494e475f50524f4849604482015264109255115160da1b60648201526084015b60405180910390fd5b95945050505050565b6060826001600160401b03811115610a9a57610a9a613e03565b604051908082528060200260200182016040528015610acd57816020015b6060815260200190600190039081610ab85790505b5090505f5b83811015610b6157610b3c858583818110610aef57610aef614341565b9050602002810190610b019190614355565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152508792506120a6915050565b828281518110610b4e57610b4e614341565b6020908102919091010152600101610ad2565b509392505050565b6060610bab84848080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152508692506120a6915050565b949350505050565b60605f5a9050610bc485858561135e565b610c205760405162461bcd60e51b815260206004820152602760248201527f554e535265676973747279466f727761726465723a205349474e41545552455f6044820152661253959053125160ca1b6064820152608401610a6e565b610cb0610c306020870187613ee3565b30604088013584610c4460608b018b614355565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b90819084018382808284375f920191909152506120da92505050565b9150505b9392505050565b610134546001600160a01b0316610cd0611eaa565b6001600160a01b031614610cf65760405162461bcd60e51b8152600401610a6e90614397565b5f610d09610d04888a6143de565b6121b6565b9050610d1481612204565b610d27610d2082611032565b8a83612270565b610d348686868685612413565b8115610d5657610d568982610d51610d4c8b8d6143de565b612476565b6124ea565b505050505050505050565b80610d73610d6d611eaa565b8261252b565b610d8f5760405162461bcd60e51b8152600401610a6e906143ea565b81610d9981611d23565b610da283612204565b610dad858585612270565b5050505050565b5f610cb4610d0483856143de565b80610dce610d6d611eaa565b610dea5760405162461bcd60e51b8152600401610a6e906143ea565b81610df481611d23565b610e0187878787876125a7565b50505050505050565b80610e16610d6d611eaa565b610e325760405162461bcd60e51b8152600401610a6e906143ea565b81610e3c81611d23565b61092783612204565b610e4d6125ff565b6001600160a01b0316610e5e611eaa565b6001600160a01b031614610e845760405162461bcd60e51b8152600401610a6e90614433565b610e8e8282611eb8565b5050565b61092783838360405180602001604052805f81525061152a565b80610eb8610d6d611eaa565b610ed45760405162461bcd60e51b8152600401610a6e906143ea565b81610ede81611d23565b610ee783612204565b610927836126f9565b5f610cb4838361252b565b80610f07610d6d611eaa565b610f235760405162461bcd60e51b8152600401610a6e906143ea565b81610f2d81611d23565b610e01878787878761279b565b80610f46610d6d611eaa565b610f625760405162461bcd60e51b8152600401610a6e906143ea565b81610f6c81611d23565b610f7886868686612876565b505050505050565b5f818152606760205260408120546001600160a01b03161515610858565b610fd081604051602001610fb29190614475565b604051602081830303815290604052805190602001205f1c82612915565b50565b610134546001600160a01b0316610fe8611eaa565b6001600160a01b03161461100e5760405162461bcd60e51b8152600401610a6e90614397565b6001600160a01b03165f90815261013660205260409020805460ff19166001179055565b5f818152606760205260408120546001600160a01b0316806108585760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610a6e565b8061109d610d6d611eaa565b6110b95760405162461bcd60e51b8152600401610a6e906143ea565b6110cb6110c4611eaa565b3084612270565b610e8e6110d6611eaa565b83612002565b5f6110e6826121b6565b90506110f181612939565b6110fa81611d23565b610e8e611105611eaa565b8261110f85612476565b6129a9565b6060806111218484612a2c565b909590945092505050565b5f6001600160a01b0382166111955760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610a6e565b506001600160a01b03165f9081526068602052604090205490565b6001600160a01b0381165f90815261013560205260408120546111d281612a4d565b6111da578091505b50919050565b6111e86125ff565b6001600160a01b03166111f9611eaa565b6001600160a01b03161461121f5760405162461bcd60e51b8152600401610a6e90614433565b6112298484611eb8565b50505050565b6112398787612a94565b611241611eaa565b6001600160a01b031661125386611032565b6001600160a01b0316146112a95760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610a6e565b610e018484848489612413565b60606066805461086d906142f6565b610134546001600160a01b03166112da611eaa565b6001600160a01b0316146113005760405162461bcd60e51b8152600401610a6e90614397565b61013361130e8284836144d4565b507f4b120d6a959a84a520fa48f5f937cca0e79129423487af7901213b5d2e89313b82826040516113409291906145b5565b60405180910390a15050565b610e8e611357611eaa565b8383612afd565b5f610bab61136b856145c8565b3085858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f92019190915250612bca92505050565b806113b3610d6d611eaa565b6113cf5760405162461bcd60e51b8152600401610a6e906143ea565b816113d981611d23565b6112296113e584611032565b8585612270565b5f818152606760205260408120546001600160a01b031661140d575f610858565b3092915050565b606080836001600160401b0381111561142f5761142f613e03565b60405190808252806020026020018201604052801561146257816020015b606081526020019060019003908161144d5790505b509150836001600160401b0381111561147d5761147d613e03565b6040519080825280602002602001820160405280156114b057816020015b606081526020019060019003908161149b5790505b5090505f5b84811015611521576114df8686838181106114d2576114d2614341565b9050602002013585612a2c565b8483815181106114f1576114f1614341565b6020026020010184848151811061150a5761150a614341565b6020908102919091010191909152526001016114b5565b50935093915050565b81611536610d6d611eaa565b6115525760405162461bcd60e51b8152600401610a6e906143ea565b8261155c81611d23565b61156584612204565b610f7886868686612d0f565b610134546001600160a01b0316611586611eaa565b6001600160a01b0316146115ac5760405162461bcd60e51b8152600401610a6e90614397565b5f6115ba610d04888a6143de565b90506115d489826115ce610d4c8b8d6143de565b85612d42565b610d568686868685612413565b5f81815260c9602052604090208054606091906115fd906142f6565b80601f0160208091040260200160405190810160405280929190818152602001828054611629906142f6565b80156116745780601f1061164b57610100808354040283529160200191611674565b820191905f5260205f20905b81548152906001019060200180831161165757829003601f168201915b50505050509050919050565b6001600160a01b0381165f90815261013560205260409020546060906116a581612a4d565b6111da575f8181526101386020526040902080546116c2906142f6565b80601f01602080910402602001604051908101604052809291908181526020018280546116ee906142f6565b80156117395780601f1061171057610100808354040283529160200191611739565b820191905f5260205f20905b81548152906001019060200180831161171c57829003601f168201915b5050505050915050919050565b606061175182611cc5565b5f61175a612d95565b90505f8151116117785760405180602001604052805f815250610cb4565b8061178284612da5565b60405160200161179392919061464f565b6040516020818303038152906040529392505050565b806117b5610d6d611eaa565b6117d15760405162461bcd60e51b8152600401610a6e906143ea565b816117db81611d23565b610e018787878787612413565b7f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87546001600160a01b031661181b611eaa565b6001600160a01b0316146118415760405162461bcd60e51b8152600401610a6e90614433565b6020819003611863575f6118578284018461391c565b90506112298482611eb8565b5f6118708284018461467d565b80519091505f5b81811015610f78576118a28684838151811061189557611895614341565b6020026020010151611eb8565b600101611877565b806118b6610d6d611eaa565b6118d25760405162461bcd60e51b8152600401610a6e906143ea565b816118dc81611d23565b610e018787878787612ea1565b5f6118f2611eaa565b6001600160a01b0381165f9081526101356020526040812054919250036119655760405162461bcd60e51b815260206004820152602160248201527f52656769737472793a20524556455253455f5245434f52445f49535f454d50546044820152605960f81b6064820152608401610a6e565b610fd081612eb7565b6060816001600160401b0381111561198857611988613e03565b6040519080825280602002602001820160405280156119bb57816020015b60608152602001906001900390816119a65790505b5090505f5b82811015611a0e576119e98484838181106119dd576119dd614341565b905060200201356115e1565b8282815181106119fb576119fb614341565b60209081029190910101526001016119c0565b5092915050565b610134546001600160a01b0316611a2a611eaa565b6001600160a01b031614611a505760405162461bcd60e51b8152600401610a6e90614397565b61013454611a67906001600160a01b031684611eb8565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39528383604051611a999291906145b5565b60405180910390a2505050565b5f54610100900460ff1615808015611ac457505f54600160ff909116105b80611add5750303b158015611add57505f5460ff166001145b611b405760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610a6e565b5f805460ff191660011790558015611b61575f805461ff0019166101001790555b61013480546001600160a01b0319166001600160a01b038716179055837f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec9237880546001600160a01b0319166001600160a01b03929092169190911790556040805180820182526013815272556e73746f707061626c6520446f6d61696e7360681b60208083019190915282518084019093526002835261155160f21b90830152611c0991612efb565b611c11612f3a565b611c19612f3a565b611c2283612f62565b611c2b82612f91565b8015610dad575f805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050505050565b5f6001600160e01b031982166380ac58cd60e01b1480611ca657506001600160e01b03198216635b5e139f60e01b145b8061085857506301ffc9a760e01b6001600160e01b0319831614610858565b5f818152606760205260409020546001600160a01b0316610fd05760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610a6e565b303303611d8057611d32612fc0565b8114610fd05760405162461bcd60e51b815260206004820152601760248201527f52656769737472793a20544f4b454e5f494e56414c49440000000000000000006044820152606401610a6e565b610fd081612fd3565b5f611d9382611032565b9050806001600160a01b0316836001600160a01b031603611e005760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610a6e565b806001600160a01b0316611e12611eaa565b6001600160a01b03161480611e2e5750611e2e816107a3611eaa565b611ea05760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610a6e565b6109278383612fff565b5f611eb361306c565b905090565b6001600160a01b038216611f0e5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610a6e565b5f818152606760205260409020546001600160a01b031615611f725760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610a6e565b611f7d5f8383613086565b6001600160a01b0382165f908152606860205260408120805460019290611fa590849061471c565b90915550505f8181526067602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b5f61200b6125ff565b90506120178183612fff565b5f80516020614a7483398151915254604080516020808201869052825180830390910181528183019283905263e3dec8fb60e01b9092526001600160a01b0390921691829163e3dec8fb9161207391889130919060440161472f565b5f604051808303815f87803b15801561208a575f80fd5b505af115801561209c573d5f803e3d5ffd5b5050505050505050565b6060610cb4836040516020016120bc9190614475565b604051602081830303815290604052805190602001205f1c83613121565b60606120e585612fd3565b5f80876001600160a01b0316866120fe8b8a89896131fc565b60405161210b9190614475565b5f604051808303815f8787f1925050503d805f8114612145576040519150601f19603f3d011682016040523d82523d5f602084013e61214a565b606091505b50909250905061215b603f8761476e565b5a1161216957612169614781565b6121a982826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c454400000000000081525061322c565b9998505050505050505050565b80515f9081905b8015611a0e576121f082856121d3600185614795565b815181106121e3576121e3614341565b6020026020010151613265565b9150806121fc816147a8565b9150506121bd565b61220d8161330f565b60405160200161221f91815260200190565b60408051601f1981840301815282825280516020918201205f85815260cb9092529181209190915582917f185c30856dadb58bf097c1f665a52ada7029752dbcad008ea3fefc73bee8c9fe9190a250565b826001600160a01b031661228382611032565b6001600160a01b0316146122e75760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610a6e565b6001600160a01b0382166123495760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610a6e565b612354838383613086565b61235e5f82612fff565b6001600160a01b0383165f908152606860205260408120805460019290612386908490614795565b90915550506001600160a01b0382165f9081526068602052604081208054600192906123b390849061471c565b90915550505f8181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b5f5b84811015610f785761246e86868381811061243257612432614341565b90506020028101906124449190614355565b86868581811061245657612456614341565b90506020028101906124689190614355565b8661279b565b600101612415565b60605f825f8151811061248b5761248b614341565b602002602001015190505f600190505b8351811015611a0e57818482815181106124b7576124b7614341565b60200260200101516040516020016124d09291906147bd565b60408051601f19818403018152919052915060010161249b565b61dead6001600160a01b0384161480159061251b57506001600160a01b0383165f9081526101356020526040902054155b15610927576109278383836129a9565b5f8061253683611032565b9050806001600160a01b0316846001600160a01b0316148061257c57506001600160a01b038082165f908152606a602090815260408083209388168352929052205460ff165b80610bab5750836001600160a01b0316612595846108ee565b6001600160a01b031614949350505050565b5f5b84811015610f78576125f78686838181106125c6576125c6614341565b905060200201358585848181106125df576125df614341565b90506020028101906125f19190614355565b85612876565b6001016125a9565b5f80516020614a74833981519152545f906001600160a01b031680156126f55760405163721804d360e11b81523060048201525f906001600160a01b0383169063e43009a690602401602060405180830381865afa158015612663573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061268791906147f8565b60405163e66f960360e01b8152600481018290529091506001600160a01b0383169063e66f960390602401602060405180830381865afa1580156126cd573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906126f1919061480f565b9250505b5090565b5f61270382611032565b9050612710815f84613086565b61271a5f83612fff565b6001600160a01b0381165f908152606860205260408120805460019290612742908490614795565b90915550505f8281526067602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b5f85856040516020016127af92919061482a565b60408051601f198184030181528282528051602091820120601f890182900482028401820190925287835290925061280291839189908990819084018382808284375f9201919091525061291592505050565b610f788187878080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525050604080516020601f8b0181900481028201810190925289815292508991508890819084018382808284375f92019190915250889250613335915050565b61287f84613461565b6128cb5760405162461bcd60e51b815260206004820152601c60248201527f5265636f726453746f726167653a204b45595f4e4f545f464f554e44000000006044820152606401610a6e565b611229846128d8866115e1565b85858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f92019190915250879250613335915050565b61291e82613461565b610e8e575f82815260c9602052604090206109278282614839565b612941611eaa565b6001600160a01b031661295382611032565b6001600160a01b031614610fd05760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610a6e565b5f8281526101386020526040902080546129c2906142f6565b90505f036129e4575f828152610138602052604090206129e28282614839565b505b6001600160a01b0383165f8181526101356020526040808220859055518492917feb76a21470988c474a21f690cc28fee1ed511bd812dc3c21fd0f49c5e5d4708a91a3505050565b606080612a38846115e1565b9150612a448484613121565b90509250929050565b5f818152610137602052604081205460ff16801561085857506101365f612a72611eaa565b6001600160a01b0316815260208101919091526040015f205460ff1692915050565b5f80516020614a7483398151915254604051633805550f60e01b81526001600160a01b03909116908190633805550f90612ad490869086906004016145b5565b5f604051808303815f87803b158015612aeb575f80fd5b505af1158015610e01573d5f803e3d5ffd5b816001600160a01b0316836001600160a01b031603612b5e5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610a6e565b6001600160a01b038381165f818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6040838101519051636ccbae5f60e01b815260048101919091525f9081903090636ccbae5f90602401602060405180830381865afa158015612c0e573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190612c3291906147f8565b90505f612cdf866060015180519060200120868860200151604051602001612c7f9392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b9050818660200151148015612d0557508551612d05906001600160a01b03168286613486565b9695505050505050565b612d1a848484612270565b612d26848484846135c1565b6112295760405162461bcd60e51b8152600401610a6e906148f4565b612d4c8484611eb8565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c395283604051612d7c919061390a565b60405180910390a28015611229576112298484846124ea565b6060610133805461086d906142f6565b6060815f03612dcb5750506040805180820190915260018152600360fc1b602082015290565b815f5b8115612df45780612dde81614946565b9150612ded9050600a8361476e565b9150612dce565b5f816001600160401b03811115612e0d57612e0d613e03565b6040519080825280601f01601f191660200182016040528015612e37576020820181803683370190505b5090505b8415610bab57612e4c600183614795565b9150612e59600a8661495e565b612e6490603061471c565b60f81b818381518110612e7957612e79614341565b60200101906001600160f81b03191690815f1a905350612e9a600a8661476e565b9450612e3b565b612eaa81612204565b610dad8585858585612413565b6001600160a01b0381165f8181526101356020526040808220829055517ffcf5eec0cfa3e6332f5f0e63ec242d71f866a61d121d6cdf5c2eb3b668a26c4f9190a250565b5f54610100900460ff16612f215760405162461bcd60e51b8152600401610a6e90614971565b6065612f2d8382614839565b5060666109278282614839565b5f54610100900460ff16612f605760405162461bcd60e51b8152600401610a6e90614971565b565b5f54610100900460ff16612f885760405162461bcd60e51b8152600401610a6e90614971565b610fd0816136c2565b5f54610100900460ff16612fb75760405162461bcd60e51b8152600401610a6e90614971565b610fd081613719565b5f303303612fd05750601f193601355b90565b5f8181526101006020526040902054612fed90600161471c565b5f918252610100602052604090912055565b5f81815260696020526040902080546001600160a01b0319166001600160a01b038416908117909155819061303382611032565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b5f303303613081575060331936013560601c90565b503390565b5f818152610137602052604090205460ff1615806130ac57506001600160a01b03821615155b6130f85760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a20544f4b454e5f555047524144454400000000000000006044820152606401610a6e565b6001600160a01b0383165f90815261013560205260409020548190036109275761092783612eb7565b606061312c82612a4d565b15613145575060408051602081019091525f8152610858565b60ca5f6131518461330f565b81526020019081526020015f205f8481526020019081526020015f208054613178906142f6565b80601f01602080910402602001604051908101604052809291908181526020018280546131a4906142f6565b80156131ef5780601f106131c6576101008083540402835291602001916131ef565b820191905f5260205f20905b8154815290600101906020018083116131d257829003601f168201915b5050505050905092915050565b6060828585604051602001613213939291906149bc565b6040516020818303038152906040529050949350505050565b6060831561323b575081610cb4565b82511561324b5782518084602001fd5b8160405162461bcd60e51b8152600401610a6e919061390a565b5f81515f036132ae5760405162461bcd60e51b815260206004820152601560248201527452656769737472793a204c4142454c5f454d50545960581b6044820152606401610a6e565b82826040516020016132c09190614475565b604051602081830303815290604052805190602001206040516020016132f0929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b5f81815260cb6020526040812054156126f5575f82815260cb6020526040902054610858565b60ca5f6133418361330f565b81526020019081526020015f205f8581526020019081526020015f208054613368906142f6565b90505f036133bf578260405161337e9190614475565b6040518091039020817f7ae4f661958fbecc2f77be6b0eb280d2a6f604b29e1e7221c82b9da0c4af7f86856040516133b6919061390a565b60405180910390a35b8160ca5f6133cc8461330f565b81526020019081526020015f205f8681526020019081526020015f2090816133f49190614839565b50816040516134039190614475565b6040518091039020836040516134199190614475565b6040518091039020827f851ffe8e74d5015261dba0a1f9e1b0e5d42c5af5d2ad1908fee897c7d80a0d928686604051613453929190613ff8565b60405180910390a450505050565b5f81815260c960205260408120805482919061347c906142f6565b9050119050919050565b5f805f6134938585613766565b90925090505f8160048111156134ab576134ab6149fa565b1480156134c95750856001600160a01b0316826001600160a01b0316145b156134d957600192505050610cb4565b5f80876001600160a01b0316631626ba7e60e01b8888604051602401613500929190614a0e565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252905161353e9190614475565b5f60405180830381855afa9150503d805f8114613576576040519150601f19603f3d011682016040523d82523d5f602084013e61357b565b606091505b509150915081801561358e575080516020145b80156135b557508051630b135d3f60e11b906135b390830160209081019084016147f8565b145b98975050505050505050565b5f6001600160a01b0384163b156136ba57836001600160a01b031663150b7a026135e9611eaa565b8786866040518563ffffffff1660e01b815260040161360b9493929190614a26565b6020604051808303815f875af1925050508015613645575060408051601f3d908101601f1916820190925261364291810190614a58565b60015b6136a0573d808015613672576040519150601f19603f3d011682016040523d82523d5f602084013e613677565b606091505b5080515f036136985760405162461bcd60e51b8152600401610a6e906148f4565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610bab565b506001610bab565b5f54610100900460ff166136e85760405162461bcd60e51b8152600401610a6e90614971565b805f80516020614a748339815191525b80546001600160a01b0319166001600160a01b039290921691909117905550565b5f54610100900460ff1661373f5760405162461bcd60e51b8152600401610a6e90614971565b807f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b876136f8565b5f80825160410361379a576020830151604084015160608501515f1a61378e878285856137a8565b945094505050506137a1565b505f905060025b9250929050565b5f807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156137dd57505f90506003613884565b8460ff16601b141580156137f557508460ff16601c14155b1561380557505f90506004613884565b604080515f8082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613856573d5f803e3d5ffd5b5050604051601f1901519150506001600160a01b03811661387e575f60019250925050613884565b91505f90505b94509492505050565b6001600160e01b031981168114610fd0575f80fd5b5f602082840312156138b2575f80fd5b8135610cb48161388d565b5f5b838110156138d75781810151838201526020016138bf565b50505f910152565b5f81518084526138f68160208601602086016138bd565b601f01601f19169290920160200192915050565b602081525f610cb460208301846138df565b5f6020828403121561392c575f80fd5b5035919050565b6001600160a01b0381168114610fd0575f80fd5b5f8060408385031215613958575f80fd5b823561396381613933565b946020939093013593505050565b5f8083601f840112613981575f80fd5b5081356001600160401b03811115613997575f80fd5b6020830191508360208285010111156137a1575f80fd5b5f805f805f608086880312156139c2575f80fd5b85356139cd81613933565b945060208601356139dd81613933565b93506040860135925060608601356001600160401b038111156139fe575f80fd5b613a0a88828901613971565b969995985093965092949392505050565b5f8083601f840112613a2b575f80fd5b5081356001600160401b03811115613a41575f80fd5b6020830191508360208260051b85010111156137a1575f80fd5b5f805f60408486031215613a6d575f80fd5b83356001600160401b03811115613a82575f80fd5b613a8e86828701613a1b565b909790965060209590950135949350505050565b5f8282518085526020808601955060208260051b840101602086015f5b84811015613aed57601f19868403018952613adb8383516138df565b98840198925090830190600101613abf565b5090979650505050505050565b602081525f610cb46020830184613aa2565b5f805f60408486031215613b1e575f80fd5b83356001600160401b03811115613b33575f80fd5b613a8e86828701613971565b5f805f60408486031215613b51575f80fd5b83356001600160401b0380821115613b67575f80fd5b9085019060808288031215613b7a575f80fd5b90935060208501359080821115613b8f575f80fd5b50613b9c86828701613971565b9497909650939450505050565b80358015158114613bb8575f80fd5b919050565b5f805f805f805f8060a0898b031215613bd4575f80fd5b8835613bdf81613933565b975060208901356001600160401b0380821115613bfa575f80fd5b613c068c838d01613a1b565b909950975060408b0135915080821115613c1e575f80fd5b613c2a8c838d01613a1b565b909750955060608b0135915080821115613c42575f80fd5b50613c4f8b828c01613a1b565b9094509250613c62905060808a01613ba9565b90509295985092959890939650565b5f805f60608486031215613c83575f80fd5b8335613c8e81613933565b92506020840135613c9e81613933565b929592945050506040919091013590565b5f8060208385031215613cc0575f80fd5b82356001600160401b03811115613cd5575f80fd5b613ce185828601613a1b565b90969095509350505050565b5f805f805f60608688031215613d01575f80fd5b85356001600160401b0380821115613d17575f80fd5b613d2389838a01613a1b565b90975095506020880135915080821115613d3b575f80fd5b50613d4888828901613a1b565b96999598509660400135949350505050565b5f805f805f60608688031215613d6e575f80fd5b85356001600160401b0380821115613d84575f80fd5b613d9089838a01613971565b90975095506020880135915080821115613da8575f80fd5b50613d4888828901613971565b5f805f8060608587031215613dc8575f80fd5b8435935060208501356001600160401b03811115613de4575f80fd5b613df087828801613971565b9598909750949560400135949350505050565b634e487b7160e01b5f52604160045260245ffd5b604051601f8201601f191681016001600160401b0381118282101715613e3f57613e3f613e03565b604052919050565b5f82601f830112613e56575f80fd5b81356001600160401b03811115613e6f57613e6f613e03565b613e82601f8201601f1916602001613e17565b818152846020838601011115613e96575f80fd5b816020850160208301375f918101602001919091529392505050565b5f60208284031215613ec2575f80fd5b81356001600160401b03811115613ed7575f80fd5b610bab84828501613e47565b5f60208284031215613ef3575f80fd5b8135610cb481613933565b5f6001600160401b03821115613f1657613f16613e03565b5060051b60200190565b5f613f32613f2d84613efe565b613e17565b8381529050602080820190600585901b840186811115613f50575f80fd5b845b81811015613f895780356001600160401b03811115613f6f575f80fd5b613f7b89828901613e47565b855250928201928201613f52565b505050509392505050565b5f60208284031215613fa4575f80fd5b81356001600160401b03811115613fb9575f80fd5b8201601f81018413613fc9575f80fd5b610bab84823560208401613f20565b5f8060408385031215613fe9575f80fd5b50508035926020909101359150565b604081525f61400a60408301856138df565b8281036020840152610cb081856138df565b5f805f806060858703121561402f575f80fd5b843561403a81613933565b93506020850135925060408501356001600160401b0381111561405b575f80fd5b61406787828801613971565b95989497509550505050565b5f805f805f805f6080888a031215614089575f80fd5b87356001600160401b038082111561409f575f80fd5b6140ab8b838c01613971565b909950975060208a0135965060408a01359150808211156140ca575f80fd5b6140d68b838c01613a1b565b909650945060608a01359150808211156140ee575f80fd5b506140fb8a828b01613a1b565b989b979a50959850939692959293505050565b5f806020838503121561411f575f80fd5b82356001600160401b03811115614134575f80fd5b613ce185828601613971565b5f8060408385031215614151575f80fd5b823561415c81613933565b9150612a4460208401613ba9565b604081525f61417c6040830185613aa2565b8281036020840152610cb08185613aa2565b5f805f80608085870312156141a1575f80fd5b84356141ac81613933565b935060208501356141bc81613933565b92506040850135915060608501356001600160401b038111156141dd575f80fd5b6141e987828801613e47565b91505092959194509250565b5f805f60408486031215614207575f80fd5b833561421281613933565b925060208401356001600160401b0381111561422c575f80fd5b613b9c86828701613971565b5f8060408385031215614249575f80fd5b823561425481613933565b9150602083013561426481613933565b809150509250929050565b5f805f60408486031215614281575f80fd5b8335925060208401356001600160401b0381111561422c575f80fd5b5f805f80608085870312156142b0575f80fd5b84356142bb81613933565b935060208501356142cb81613933565b925060408501356142db81613933565b915060608501356142eb81613933565b939692955090935050565b600181811c9082168061430a57607f821691505b6020821081036111da57634e487b7160e01b5f52602260045260245ffd5b5f60208284031215614338575f80fd5b610cb482613ba9565b634e487b7160e01b5f52603260045260245ffd5b5f808335601e1984360301811261436a575f80fd5b8301803591506001600160401b03821115614383575f80fd5b6020019150368190038213156137a1575f80fd5b60208082526027908201527f52656769737472793a2053454e4445525f49535f4e4f545f4d494e54494e475f60408201526626a0a720a3a2a960c91b606082015260800190565b5f610cb4368484613f20565b60208082526029908201527f52656769737472793a2053454e4445525f49535f4e4f545f415050524f5645446040820152682fa7a92fa7aba722a960b91b606082015260800190565b60208082526022908201527f52656769737472793a20494e53554646494349454e545f5045524d495353494f6040820152614e5360f01b606082015260800190565b5f82516144868184602087016138bd565b9190910192915050565b601f82111561092757805f5260205f20601f840160051c810160208510156144b55750805b601f840160051c820191505b81811015610dad575f81556001016144c1565b6001600160401b038311156144eb576144eb613e03565b6144ff836144f983546142f6565b83614490565b5f601f841160018114614530575f85156145195750838201355b5f19600387901b1c1916600186901b178355610dad565b5f83815260208120601f198716915b8281101561455f578685013582556020948501946001909201910161453f565b508682101561457b575f1960f88860031b161c19848701351681555b505060018560011b0183555050505050565b81835281816020850137505f828201602090810191909152601f909101601f19169091010190565b602081525f610bab60208301848661458d565b5f608082360312156145d8575f80fd5b604051608081016001600160401b0382821081831117156145fb576145fb613e03565b816040528435915061460c82613933565b81835260208501356020840152604085013560408401526060850135915080821115614636575f80fd5b5061464336828601613e47565b60608301525092915050565b5f83516146608184602088016138bd565b8351908301906146748183602088016138bd565b01949350505050565b5f602080838503121561468e575f80fd5b82356001600160401b038111156146a3575f80fd5b8301601f810185136146b3575f80fd5b80356146c1613f2d82613efe565b81815260059190911b820183019083810190878311156146df575f80fd5b928401925b828410156146fd578335825292840192908401906146e4565b979650505050505050565b634e487b7160e01b5f52601160045260245ffd5b8082018082111561085857610858614708565b6001600160a01b038481168252831660208201526060604082018190525f90610a77908301846138df565b634e487b7160e01b5f52601260045260245ffd5b5f8261477c5761477c61475a565b500490565b634e487b7160e01b5f52600160045260245ffd5b8181038181111561085857610858614708565b5f816147b6576147b6614708565b505f190190565b5f83516147ce8184602088016138bd565b601760f91b90830190815283516147ec8160018401602088016138bd565b01600101949350505050565b5f60208284031215614808575f80fd5b5051919050565b5f6020828403121561481f575f80fd5b8151610cb481613933565b818382375f9101908152919050565b81516001600160401b0381111561485257614852613e03565b6148668161486084546142f6565b84614490565b602080601f831160018114614899575f84156148825750858301515b5f19600386901b1c1916600185901b178555610f78565b5f85815260208120601f198616915b828110156148c7578886015182559484019460019091019084016148a8565b50858210156148e457878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b5f6001820161495757614957614708565b5060010190565b5f8261496c5761496c61475a565b500690565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b5f84516149cd8184602089016138bd565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b634e487b7160e01b5f52602160045260245ffd5b828152604060208201525f610bab60408301846138df565b6001600160a01b03858116825284166020820152604081018390526080606082018190525f90612d05908301846138df565b5f60208284031215614a68575f80fd5b8151610cb48161388d56febe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafea164736f6c6343000818000a";
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
exports.UNSRegistryV07__factory = UNSRegistryV07__factory;
UNSRegistryV07__factory.bytecode = _bytecode;
UNSRegistryV07__factory.abi = _abi;
