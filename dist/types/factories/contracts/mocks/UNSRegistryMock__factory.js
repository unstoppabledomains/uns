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
const _bytecode = "0x608060405234801561001057600080fd5b5061518a806100206000396000f3fe608060405234801561001057600080fd5b50600436106103995760003560e01c80637e37479e116101e9578063ba5d40b71161010f578063e985e9c5116100ad578063f5c1f76e1161007c578063f5c1f76e1461086d578063f7df5c6014610880578063f8c8765e14610893578063ffa1ad74146108a657600080fd5b8063e985e9c51461080f578063ebf0c7171461084b578063ec129eea14610852578063f25eb5c11461086557600080fd5b8063c87b56dd116100e9578063c87b56dd146107c3578063ce92b33e146107d6578063cf2c52cb146107e9578063dbe16c07146107fc57600080fd5b8063ba5d40b71461078a578063bb5b27e11461079d578063bebec6b4146107b057600080fd5b8063a3f4df7e11610187578063ae31844a11610156578063ae31844a14610730578063b3f9e4cb14610743578063b85afd2814610756578063b88d4fde1461077757600080fd5b8063a3f4df7e146106be578063a4247400146106ea578063ab3b87fe146106fd578063ac9650d81461071057600080fd5b80639559c0bd116101c35780639559c0bd1461068857806395d89b411461069057806399e0dd7c14610698578063a22cb465146106ab57600080fd5b80637e37479e1461064f57806394d008ef146106625780639508b1c41461067557600080fd5b806342842e0e116102ce578063509602391161026c578063663f7b2a1161023b578063663f7b2a146105e7578063672b9f81146105fa5780636ccbae5f1461061b57806370a082311461063c57600080fd5b80635096023914610592578063572b6c05146105a55780636352211e146105c1578063638e5c78146105d457600080fd5b806347c81699116102a857806347c81699146105465780634a72584d146105595780634f558e791461056c57806350382c1a1461057f57600080fd5b806342842e0e1461050d57806342966c6814610520578063430c20811461053357600080fd5b80631bf7e13e1161033b578063276fabb111610315578063276fabb1146104b357806327f18975146104d4578063310bd74b146104e757806340c10f19146104fa57600080fd5b80631bf7e13e1461047a5780631f71be061461048d57806323b872dd146104a057600080fd5b8063095ea7b311610377578063095ea7b314610406578063150b7a021461041b5780631bd8cc1a146104475780631be5e7ed1461046757600080fd5b806301ffc9a71461039e57806306fdde03146103c6578063081812fc146103db575b600080fd5b6103b16103ac36600461470c565b6108ca565b60405190151581526020015b60405180910390f35b6103ce6108db565b6040516103bd9190614c97565b6103ee6103e936600461493a565b61096d565b6040516001600160a01b0390911681526020016103bd565b610419610414366004614487565b610994565b005b61042e610429366004614279565b6109ad565b6040516001600160e01b031990911681526020016103bd565b61045a6104553660046145ba565b610b08565b6040516103bd9190614c32565b6103ce610475366004614874565b610c28565b6103ce6104883660046148db565b610c73565b61041961049b366004614352565b610d7e565b6104196104ae366004614239565b610e26565b6104c66104c136600461450b565b610e79565b6040519081526020016103bd565b6104196104e236600461454a565b610e88565b6104196104f536600461493a565b610ed0565b610419610508366004614487565b610f0b565b61041961051b366004614239565b610f58565b61041961052e36600461493a565b610f73565b6103b1610541366004614487565b610fb7565b610419610554366004614816565b610fc3565b610419610567366004614982565b611002565b6103b161057a36600461493a565b611048565b61041961058d3660046148a9565b611067565b6104196105a036600461416e565b61109d565b6103b16105b336600461416e565b6001600160a01b0316301490565b6103ee6105cf36600461493a565b6110fd565b6104196105e236600461493a565b61115d565b6104196105f5366004614603565b6111a8565b61060d6106083660046149d2565b6111e2565b6040516103bd929190614caa565b6104c661062936600461493a565b6000908152610100602052604090205490565b6104c661064a36600461416e565b6111fa565b6104c661065d36600461416e565b611280565b6104196106703660046144b2565b6112b1565b610419610683366004614744565b611300565b6104c6601481565b6103ce611387565b6104196106a63660046147e3565b611396565b6104196106b936600461440a565b61141c565b6103ce6040518060400160405280600d81526020016c554e533a20526567697374727960981b81525081565b6103b16106f83660046148db565b61142e565b61041961070b366004614487565b611479565b61072361071e36600461450b565b6114be565b6040516103bd9190614bd1565b61041961073e36600461450b565b6115b7565b6103ee61075136600461493a565b611663565b6107696107643660046145ba565b61168d565b6040516103bd929190614c45565b6104196107853660046142e9565b6117f5565b610419610798366004614352565b61183c565b6103ce6107ab36600461493a565b6118c5565b6103ce6107be36600461416e565b611967565b6103ce6107d136600461493a565b611a31565b6104196107e436600461454a565b611a97565b6104196107f7366004614435565b611ad6565b6103ce61080a36600461493a565b611bb3565b6103b161081d3660046141a6565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006104c6565b61041961086036600461454a565b611bd1565b610419611c10565b61045a61087b36600461450b565b611c96565b61041961088e366004614952565b611d73565b6104196108a13660046141de565b611e04565b6103ce60405180604001604052806005815260200164302e382e3160d81b81525081565b60006108d582611fda565b92915050565b6060606580546108ea90615065565b80601f016020809104026020016040519081016040528092919081815260200182805461091690615065565b80156109635780601f1061093857610100808354040283529160200191610963565b820191906000526020600020905b81548152906001019060200180831161094657829003601f168201915b5050505050905090565b60006109788261202a565b506000908152606960205260409020546001600160a01b031690565b8061099e81612089565b6109a883836120f0565b505050565b60007f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378546001600160a01b03166109e2612213565b6001600160a01b03161415610aa4576109f9612213565b6001600160a01b03166342966c68856040518263ffffffff1660e01b8152600401610a2691815260200190565b600060405180830381600087803b158015610a4057600080fd5b505af1158015610a54573d6000803e3d6000fd5b505050821580159150610a6e5750610a6e828401846146da565b15610a8c57610a7d3085612222565b610a878585612370565b610a96565b610a968585612222565b50630a85bd0160e11b610aff565b60405162461bcd60e51b815260206004820152602560248201527f52656769737472793a204552433732315f524543454956494e475f50524f4849604482015264109255115160da1b60648201526084015b60405180910390fd5b95945050505050565b6060826001600160401b03811115610b3057634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610b6357816020015b6060815260200190600190039081610b4e5790505b50905060005b83811015610c2057610be2858583818110610b9457634e487b7160e01b600052603260045260246000fd5b9050602002810190610ba69190614e3e565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525087925061241b915050565b828281518110610c0257634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080610c189061509a565b915050610b69565b509392505050565b6060610c6b84848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525086925061241b915050565b949350505050565b606060005a9050610c8585858561142e565b610ce15760405162461bcd60e51b815260206004820152602760248201527f554e535265676973747279466f727761726465723a205349474e41545552455f6044820152661253959053125160ca1b6064820152608401610af6565b610d73610cf1602087018761416e565b30604088013584610d0560608b018b614e3e565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b908190840183828082843760009201919091525061245092505050565b9150505b9392505050565b610134546001600160a01b0316610d93612213565b6001600160a01b031614610db95760405162461bcd60e51b8152600401610af690614d6a565b6000610dcd610dc8888a614f8d565b61253f565b509050610dd9816125a5565b610dec610de5826110fd565b8a83612612565b610df986868686856127b9565b8115610e1b57610e1b8982610e16610e118b8d614f8d565b612843565b6128e0565b505050505050505050565b80610e38610e32612213565b82612922565b610e545760405162461bcd60e51b8152600401610af690614ccf565b81610e5e81612089565b610e67836125a5565b610e72858585612612565b5050505050565b6000610c20610dc88385614f8d565b80610e94610e32612213565b610eb05760405162461bcd60e51b8152600401610af690614ccf565b81610eba81612089565b610ec787878787876129a0565b50505050505050565b80610edc610e32612213565b610ef85760405162461bcd60e51b8152600401610af690614ccf565b81610f0281612089565b6109a8836125a5565b610f13612a1f565b6001600160a01b0316610f24612213565b6001600160a01b031614610f4a5760405162461bcd60e51b8152600401610af690614dfc565b610f548282612222565b5050565b6109a8838383604051806020016040528060008152506117f5565b80610f7f610e32612213565b610f9b5760405162461bcd60e51b8152600401610af690614ccf565b81610fa581612089565b610fae836125a5565b6109a883612b32565b6000610d778383612922565b80610fcf610e32612213565b610feb5760405162461bcd60e51b8152600401610af690614ccf565b81610ff581612089565b610ec78787878787612bd9565b8061100e610e32612213565b61102a5760405162461bcd60e51b8152600401610af690614ccf565b8161103481612089565b61104086868686612cb8565b505050505050565b6000818152606760205260408120546001600160a01b031615156108d5565b61109a8160405160200161107b9190614a9c565b6040516020818303038152906040528051906020012060001c82612d58565b50565b610134546001600160a01b03166110b2612213565b6001600160a01b0316146110d85760405162461bcd60e51b8152600401610af690614d6a565b6001600160a01b0316600090815261013660205260409020805460ff19166001179055565b6000818152606760205260408120546001600160a01b0316806108d55760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610af6565b80611169610e32612213565b6111855760405162461bcd60e51b8152600401610af690614ccf565b611197611190612213565b3084612612565b610f546111a2612213565b83612370565b60006111b38261253f565b5090506111bf81612d84565b6111c881612089565b610f546111d3612213565b826111dd85612843565b612df4565b6060806111ef8484612e81565b909590945092505050565b60006001600160a01b0382166112645760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610af6565b506001600160a01b031660009081526068602052604090205490565b6001600160a01b038116600090815261013560205260408120546112a381612ea2565b6112ab578091505b50919050565b6112b9612a1f565b6001600160a01b03166112ca612213565b6001600160a01b0316146112f05760405162461bcd60e51b8152600401610af690614dfc565b6112fa8484612222565b50505050565b61130a8787612eec565b611312612213565b6001600160a01b0316611324866110fd565b6001600160a01b03161461137a5760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610af6565b610ec784848484896127b9565b6060606680546108ea90615065565b610134546001600160a01b03166113ab612213565b6001600160a01b0316146113d15760405162461bcd60e51b8152600401610af690614d6a565b6113de6101338383613ee6565b507f4b120d6a959a84a520fa48f5f937cca0e79129423487af7901213b5d2e89313b8282604051611410929190614c83565b60405180910390a15050565b610f54611427612213565b8383612f5b565b6000610c6b61143c85614f9a565b3085858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061302a92505050565b80611485610e32612213565b6114a15760405162461bcd60e51b8152600401610af690614ccf565b816114ab81612089565b6112fa6114b7846110fd565b8585612612565b606060006114cc8385614f18565b9050303314156115ae5760005b838110156115ac5761156e6114ec612213565b6114f4613182565b87878581811061151457634e487b7160e01b600052603260045260246000fd5b90506020028101906115269190614e3e565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525060408051602081019091529081529250613197915050565b82828151811061158e57634e487b7160e01b600052603260045260246000fd5b602002602001018190525080806115a49061509a565b9150506114d9565b505b610c6b816131c7565b610134546001600160a01b03166115cc612213565b6001600160a01b0316146115f25760405162461bcd60e51b8152600401610af690614d6a565b60005b818110156109a8576001610137600085858581811061162457634e487b7160e01b600052603260045260246000fd5b90506020020135815260200190815260200160002060006101000a81548160ff021916908315150217905550808061165b9061509a565b9150506115f5565b6000818152606760205260408120546001600160a01b03166116865760006108d5565b3092915050565b606080836001600160401b038111156116b657634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156116e957816020015b60608152602001906001900390816116d45790505b509150836001600160401b0381111561171257634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561174557816020015b60608152602001906001900390816117305790505b50905060005b848110156117ec5761178386868381811061177657634e487b7160e01b600052603260045260246000fd5b9050602002013585612e81565b8483815181106117a357634e487b7160e01b600052603260045260246000fd5b602002602001018484815181106117ca57634e487b7160e01b600052603260045260246000fd5b60200260200101829052829052505080806117e49061509a565b91505061174b565b50935093915050565b81611801610e32612213565b61181d5760405162461bcd60e51b8152600401610af690614ccf565b8261182781612089565b611830846125a5565b6110408686868661331c565b610134546001600160a01b0316611851612213565b6001600160a01b0316146118775760405162461bcd60e51b8152600401610af690614d6a565b600080611887610dc8898b614f8d565b915091506118948161334f565b6118ac8a836118a6610e118c8e614f8d565b866133af565b6118b987878787866127b9565b50505050505050505050565b600081815260c9602052604090208054606091906118e290615065565b80601f016020809104026020016040519081016040528092919081815260200182805461190e90615065565b801561195b5780601f106119305761010080835404028352916020019161195b565b820191906000526020600020905b81548152906001019060200180831161193e57829003601f168201915b50505050509050919050565b6001600160a01b0381166000908152610135602052604090205460609061198d81612ea2565b6112ab5760008181526101386020526040902080546119ab90615065565b80601f01602080910402602001604051908101604052809291908181526020018280546119d790615065565b8015611a245780601f106119f957610100808354040283529160200191611a24565b820191906000526020600020905b815481529060010190602001808311611a0757829003601f168201915b5050505050915050919050565b6060611a3c8261202a565b6000611a46613402565b90506000815111611a665760405180602001604052806000815250610d77565b80611a7084613412565b604051602001611a81929190614b43565b6040516020818303038152906040529392505050565b80611aa3610e32612213565b611abf5760405162461bcd60e51b8152600401610af690614ccf565b81611ac981612089565b610ec787878787876127b9565b7f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87546001600160a01b0316611b09612213565b6001600160a01b031614611b2f5760405162461bcd60e51b8152600401610af690614dfc565b6020811415611b52576000611b468284018461493a565b90506112fa8482612222565b6000611b6082840184614648565b805190915060005b8181101561104057611ba186848381518110611b9457634e487b7160e01b600052603260045260246000fd5b6020026020010151612222565b80611bab8161509a565b915050611b68565b6000818152610138602052604090208054606091906118e290615065565b80611bdd610e32612213565b611bf95760405162461bcd60e51b8152600401610af690614ccf565b81611c0381612089565b610ec7878787878761352b565b6000611c1a612213565b6001600160a01b03811660009081526101356020526040902054909150611c8d5760405162461bcd60e51b815260206004820152602160248201527f52656769737472793a20524556455253455f5245434f52445f49535f454d50546044820152605960f81b6064820152608401610af6565b61109a81613541565b6060816001600160401b03811115611cbe57634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015611cf157816020015b6060815260200190600190039081611cdc5790505b50905060005b82811015611d6c57611d2e848483818110611d2257634e487b7160e01b600052603260045260246000fd5b905060200201356118c5565b828281518110611d4e57634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080611d649061509a565b915050611cf7565b5092915050565b610134546001600160a01b0316611d88612213565b6001600160a01b031614611dae5760405162461bcd60e51b8152600401610af690614d6a565b61013454611dc5906001600160a01b031684612222565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39528383604051611df7929190614c83565b60405180910390a2505050565b600054610100900460ff1615808015611e245750600054600160ff909116105b80611e3e5750303b158015611e3e575060005460ff166001145b611ea15760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610af6565b6000805460ff191660011790558015611ec4576000805461ff0019166101001790555b61013480546001600160a01b0319166001600160a01b038716179055837f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec9237880546001600160a01b0319166001600160a01b03929092169190911790556040805180820182526013815272556e73746f707061626c6520446f6d61696e7360681b60208083019190915282518084019093526002835261155160f21b90830152611f6c91613586565b611f746135d4565b611f7c6135d4565b611f85836135fd565b611f8e8261362d565b8015610e72576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050505050565b60006001600160e01b031982166380ac58cd60e01b148061200b57506001600160e01b03198216635b5e139f60e01b145b806108d557506301ffc9a760e01b6001600160e01b03198316146108d5565b6000818152606760205260409020546001600160a01b031661109a5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610af6565b303314156120e757612099613182565b811461109a5760405162461bcd60e51b815260206004820152601760248201527f52656769737472793a20544f4b454e5f494e56414c49440000000000000000006044820152606401610af6565b61109a8161365d565b60006120fb826110fd565b9050806001600160a01b0316836001600160a01b031614156121695760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610af6565b806001600160a01b031661217b612213565b6001600160a01b0316148061219757506121978161081d612213565b6122095760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610af6565b6109a8838361368b565b600061221d6136f9565b905090565b6001600160a01b0382166122785760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610af6565b6000818152606760205260409020546001600160a01b0316156122dd5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610af6565b6122e960008383613715565b6001600160a01b0382166000908152606860205260408120805460019290612312908490614ed5565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600061237a612a1f565b9050612386818361368b565b60008051602061513783398151915254604080516020808201869052825180830390910181528183019283905263e3dec8fb60e01b9092526001600160a01b0390921691829163e3dec8fb916123e3918891309190604401614b72565b600060405180830381600087803b1580156123fd57600080fd5b505af1158015612411573d6000803e3d6000fd5b5050505050505050565b6060610d77836040516020016124319190614a9c565b6040516020818303038152906040528051906020012060001c83613756565b606061245b8561365d565b600080876001600160a01b0316866124758b8a8989613197565b6040516124829190614a9c565b60006040518083038160008787f1925050503d80600081146124c0576040519150601f19603f3d011682016040523d82523d6000602084013e6124c5565b606091505b5090925090506124d6603f87614eed565b5a116124f257634e487b7160e01b600052600160045260246000fd5b61253282826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c4544000000000000815250613838565b9998505050505050505050565b805160009081905b801561259f5782915061258b8285612560600185614f01565b8151811061257e57634e487b7160e01b600052603260045260246000fd5b6020026020010151613871565b9250806125978161504e565b915050612547565b50915091565b6125ae8161391e565b6040516020016125c091815260200190565b60408051601f198184030181528282528051602091820120600085815260cb9092529181209190915582917f185c30856dadb58bf097c1f665a52ada7029752dbcad008ea3fefc73bee8c9fe9190a250565b826001600160a01b0316612625826110fd565b6001600160a01b0316146126895760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610af6565b6001600160a01b0382166126eb5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610af6565b6126f6838383613715565b61270160008261368b565b6001600160a01b038316600090815260686020526040812080546001929061272a908490614f01565b90915550506001600160a01b0382166000908152606860205260408120805460019290612758908490614ed5565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60005b84811015611040576128318686838181106127e757634e487b7160e01b600052603260045260246000fd5b90506020028101906127f99190614e3e565b86868581811061281957634e487b7160e01b600052603260045260246000fd5b905060200281019061282b9190614e3e565b86612bd9565b8061283b8161509a565b9150506127bc565b606060008260008151811061286857634e487b7160e01b600052603260045260246000fd5b602002602001015190506000600190505b8351811015611d6c57818482815181106128a357634e487b7160e01b600052603260045260246000fd5b60200260200101516040516020016128bc929190614af7565b604051602081830303815290604052915080806128d89061509a565b915050612879565b61dead6001600160a01b0384161480159061291257506001600160a01b03831660009081526101356020526040902054155b156109a8576109a8838383612df4565b60008061292e836110fd565b9050806001600160a01b0316846001600160a01b0316148061297557506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b80610c6b5750836001600160a01b031661298e8461096d565b6001600160a01b031614949350505050565b60005b8481101561104057612a0d8686838181106129ce57634e487b7160e01b600052603260045260246000fd5b905060200201358585848181106129f557634e487b7160e01b600052603260045260246000fd5b9050602002810190612a079190614e3e565b85612cb8565b80612a178161509a565b9150506129a3565b6000806000805160206151378339815191525460405163721804d360e11b81523060048201526001600160a01b039091169150600090829063e43009a69060240160206040518083038186803b158015612a7857600080fd5b505afa158015612a8c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ab091906146f4565b60405163e66f960360e01b8152600481018290529091506001600160a01b0383169063e66f96039060240160206040518083038186803b158015612af357600080fd5b505afa158015612b07573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b2b919061418a565b9250505090565b6000612b3d826110fd565b9050612b4b81600084613715565b612b5660008361368b565b6001600160a01b0381166000908152606860205260408120805460019290612b7f908490614f01565b909155505060008281526067602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60008585604051602001612bee929190614b33565b60408051601f198184030181528282528051602091820120601f8901829004820284018201909252878352909250612c429183918990899081908401838280828437600092019190915250612d5892505050565b6110408187878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b01819004810282018101909252898152925089915088908190840183828082843760009201919091525088925061394a915050565b612cc184613a85565b612d0d5760405162461bcd60e51b815260206004820152601c60248201527f5265636f726453746f726167653a204b45595f4e4f545f464f554e44000000006044820152606401610af6565b6112fa84612d1a866118c5565b85858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525087925061394a915050565b612d6182613a85565b610f5457600082815260c96020908152604090912082516109a892840190613f66565b612d8c612213565b6001600160a01b0316612d9e826110fd565b6001600160a01b03161461109a5760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610af6565b6000828152610138602052604090208054612e0e90615065565b15159050612e38576000828152610138602090815260409091208251612e3692840190613f66565b505b6001600160a01b03831660008181526101356020526040808220859055518492917feb76a21470988c474a21f690cc28fee1ed511bd812dc3c21fd0f49c5e5d4708a91a3505050565b606080612e8d846118c5565b9150612e998484613756565b90509250929050565b6000818152610137602052604081205460ff1680156108d557506101366000612ec9612213565b6001600160a01b0316815260208101919091526040016000205460ff1692915050565b60008051602061513783398151915254604051633805550f60e01b81526001600160a01b03909116908190633805550f90612f2d9086908690600401614c83565b600060405180830381600087803b158015612f4757600080fd5b505af1158015610ec7573d6000803e3d6000fd5b816001600160a01b0316836001600160a01b03161415612fbd5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610af6565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f9060240160206040518083038186803b15801561306c57600080fd5b505afa158015613080573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906130a491906146f4565b905060006131528660600151805190602001208688602001516040516020016130f29392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b905081866020015114801561317857508551613178906001600160a01b03168286613aab565b9695505050505050565b6000303314156131945750601f193601355b90565b60608285856040516020016131ae93929190614ab8565b6040516020818303038152906040529050949350505050565b606081516001600160401b038111156131f057634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561322357816020015b606081526020019060019003908161320e5790505b50905060005b82518110156112ab57600080306001600160a01b031685848151811061325f57634e487b7160e01b600052603260045260246000fd5b60200260200101516040516132749190614a9c565b600060405180830381855af49150503d80600081146132af576040519150601f19603f3d011682016040523d82523d6000602084013e6132b4565b606091505b50915091506132dc828260405180606001604052806027815260200161515760279139613838565b8484815181106132fc57634e487b7160e01b600052603260045260246000fd5b6020026020010181905250505080806133149061509a565b915050613229565b613327848484612612565b61333384848484613bfb565b6112fa5760405162461bcd60e51b8152600401610af690614d18565b6000818152610137602052604090205460ff161561109a5760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a20544f4b454e5f555047524144454400000000000000006044820152606401610af6565b6133b98484612222565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c3952836040516133e99190614c97565b60405180910390a280156112fa576112fa8484846128e0565b606061013380546108ea90615065565b6060816134365750506040805180820190915260018152600360fc1b602082015290565b8160005b8115613460578061344a8161509a565b91506134599050600a83614eed565b915061343a565b6000816001600160401b0381111561348857634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156134b2576020820181803683370190505b5090505b8415610c6b576134c7600183614f01565b91506134d4600a866150b5565b6134df906030614ed5565b60f81b81838151811061350257634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350613524600a86614eed565b94506134b6565b613534816125a5565b610e7285858585856127b9565b6001600160a01b03811660008181526101356020526040808220829055517ffcf5eec0cfa3e6332f5f0e63ec242d71f866a61d121d6cdf5c2eb3b668a26c4f9190a250565b600054610100900460ff166135ad5760405162461bcd60e51b8152600401610af690614db1565b81516135c0906065906020850190613f66565b5080516109a8906066906020840190613f66565b600054610100900460ff166135fb5760405162461bcd60e51b8152600401610af690614db1565b565b600054610100900460ff166136245760405162461bcd60e51b8152600401610af690614db1565b61109a81613d0c565b600054610100900460ff166136545760405162461bcd60e51b8152600401610af690614db1565b61109a81613d65565b60008181526101006020526040902054613678906001614ed5565b6000918252610100602052604090912055565b600081815260696020526040902080546001600160a01b0319166001600160a01b03841690811790915581906136c0826110fd565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600030331415613710575060331936013560601c90565b503390565b6001600160a01b03821661372c5761372c8161334f565b6001600160a01b038316600090815261013560205260409020548114156109a8576109a883613541565b606061376182612ea2565b1561377b57506040805160208101909152600081526108d5565b60ca60006137888461391e565b8152602001908152602001600020600084815260200190815260200160002080546137b290615065565b80601f01602080910402602001604051908101604052809291908181526020018280546137de90615065565b801561382b5780601f106138005761010080835404028352916020019161382b565b820191906000526020600020905b81548152906001019060200180831161380e57829003601f168201915b5050505050905092915050565b60608315613847575081610d77565b8251156138575782518084602001fd5b8160405162461bcd60e51b8152600401610af69190614c97565b60008151600014156138bd5760405162461bcd60e51b815260206004820152601560248201527452656769737472793a204c4142454c5f454d50545960581b6044820152606401610af6565b82826040516020016138cf9190614a9c565b604051602081830303815290604052805190602001206040516020016138ff929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b600081815260cb60205260408120541561394657600082815260cb60205260409020546108d5565b5090565b60ca60006139578361391e565b81526020019081526020016000206000858152602001908152602001600020805461398190615065565b151590506139d857826040516139979190614a9c565b6040518091039020817f7ae4f661958fbecc2f77be6b0eb280d2a6f604b29e1e7221c82b9da0c4af7f86856040516139cf9190614c97565b60405180910390a35b8160ca60006139e68461391e565b815260200190815260200160002060008681526020019081526020016000209080519060200190613a18929190613f66565b5081604051613a279190614a9c565b604051809103902083604051613a3d9190614a9c565b6040518091039020827f851ffe8e74d5015261dba0a1f9e1b0e5d42c5af5d2ad1908fee897c7d80a0d928686604051613a77929190614caa565b60405180910390a450505050565b600081815260c9602052604081208054829190613aa190615065565b9050119050919050565b6000806000613aba8585613db3565b90925090506000816004811115613ae157634e487b7160e01b600052602160045260246000fd5b148015613aff5750856001600160a01b0316826001600160a01b0316145b15613b0f57600192505050610d77565b600080876001600160a01b0316631626ba7e60e01b8888604051602401613b37929190614c6a565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051613b759190614a9c565b600060405180830381855afa9150503d8060008114613bb0576040519150601f19603f3d011682016040523d82523d6000602084013e613bb5565b606091505b5091509150818015613bc8575080516020145b8015613bef57508051630b135d3f60e11b90613bed90830160209081019084016146f4565b145b98975050505050505050565b60006001600160a01b0384163b15613d0457836001600160a01b031663150b7a02613c24612213565b8786866040518563ffffffff1660e01b8152600401613c469493929190614b9e565b602060405180830381600087803b158015613c6057600080fd5b505af1925050508015613c90575060408051601f3d908101601f19168201909252613c8d91810190614728565b60015b613cea573d808015613cbe576040519150601f19603f3d011682016040523d82523d6000602084013e613cc3565b606091505b508051613ce25760405162461bcd60e51b8152600401610af690614d18565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610c6b565b506001610c6b565b600054610100900460ff16613d335760405162461bcd60e51b8152600401610af690614db1565b806000805160206151378339815191525b80546001600160a01b0319166001600160a01b039290921691909117905550565b600054610100900460ff16613d8c5760405162461bcd60e51b8152600401610af690614db1565b807f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87613d44565b600080825160411415613dea5760208301516040840151606085015160001a613dde87828585613df9565b94509450505050613df2565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613e305750600090506003613edd565b8460ff16601b14158015613e4857508460ff16601c14155b15613e595750600090506004613edd565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613ead573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613ed657600060019250925050613edd565b9150600090505b94509492505050565b828054613ef290615065565b90600052602060002090601f016020900481019282613f145760008555613f5a565b82601f10613f2d5782800160ff19823516178555613f5a565b82800160010185558215613f5a579182015b82811115613f5a578235825591602001919060010190613f3f565b50613946929150613fda565b828054613f7290615065565b90600052602060002090601f016020900481019282613f945760008555613f5a565b82601f10613fad57805160ff1916838001178555613f5a565b82800160010185558215613f5a579182015b82811115613f5a578251825591602001919060010190613fbf565b5b808211156139465760008155600101613fdb565b6000614002613ffd84614eb2565b614e82565b9050808382526020808301915083868660051b8601111561402257600080fd5b6000805b878110156140625782356001600160401b03811115614043578283fd5b61404f8a828a01614104565b8652509383019391830191600101614026565b50505050509392505050565b60008083601f84011261407f578182fd5b5081356001600160401b03811115614095578182fd5b6020830191508360208260051b8501011115613df257600080fd5b803580151581146140c057600080fd5b919050565b60008083601f8401126140d6578182fd5b5081356001600160401b038111156140ec578182fd5b602083019150836020828501011115613df257600080fd5b600082601f830112614114578081fd5b81356001600160401b0381111561412d5761412d6150f5565b614140601f8201601f1916602001614e82565b818152846020838601011115614154578283fd5b816020850160208301379081016020019190915292915050565b60006020828403121561417f578081fd5b8135610d778161510b565b60006020828403121561419b578081fd5b8151610d778161510b565b600080604083850312156141b8578081fd5b82356141c38161510b565b915060208301356141d38161510b565b809150509250929050565b600080600080608085870312156141f3578182fd5b84356141fe8161510b565b9350602085013561420e8161510b565b9250604085013561421e8161510b565b9150606085013561422e8161510b565b939692955090935050565b60008060006060848603121561424d578081fd5b83356142588161510b565b925060208401356142688161510b565b929592945050506040919091013590565b600080600080600060808688031215614290578283fd5b853561429b8161510b565b945060208601356142ab8161510b565b93506040860135925060608601356001600160401b038111156142cc578182fd5b6142d8888289016140c5565b969995985093965092949392505050565b600080600080608085870312156142fe578182fd5b84356143098161510b565b935060208501356143198161510b565b92506040850135915060608501356001600160401b0381111561433a578182fd5b61434687828801614104565b91505092959194509250565b60008060008060008060008060a0898b03121561436d578586fd5b88356143788161510b565b975060208901356001600160401b0380821115614393578788fd5b61439f8c838d0161406e565b909950975060408b01359150808211156143b7578485fd5b6143c38c838d0161406e565b909750955060608b01359150808211156143db578485fd5b506143e88b828c0161406e565b90945092506143fb905060808a016140b0565b90509295985092959890939650565b6000806040838503121561441c578182fd5b82356144278161510b565b9150612e99602084016140b0565b600080600060408486031215614449578081fd5b83356144548161510b565b925060208401356001600160401b0381111561446e578182fd5b61447a868287016140c5565b9497909650939450505050565b60008060408385031215614499578182fd5b82356144a48161510b565b946020939093013593505050565b600080600080606085870312156144c7578182fd5b84356144d28161510b565b93506020850135925060408501356001600160401b038111156144f3578283fd5b6144ff878288016140c5565b95989497509550505050565b6000806020838503121561451d578182fd5b82356001600160401b03811115614532578283fd5b61453e8582860161406e565b90969095509350505050565b600080600080600060608688031215614561578283fd5b85356001600160401b0380821115614577578485fd5b61458389838a0161406e565b9097509550602088013591508082111561459b578485fd5b506145a88882890161406e565b96999598509660400135949350505050565b6000806000604084860312156145ce578081fd5b83356001600160401b038111156145e3578182fd5b6145ef8682870161406e565b909790965060209590950135949350505050565b600060208284031215614614578081fd5b81356001600160401b03811115614629578182fd5b8201601f81018413614639578182fd5b610c6b84823560208401613fef565b6000602080838503121561465a578182fd5b82356001600160401b0381111561466f578283fd5b8301601f8101851361467f578283fd5b803561468d613ffd82614eb2565b80828252848201915084840188868560051b87010111156146ac578687fd5b8694505b838510156146ce5780358352600194909401939185019185016146b0565b50979650505050505050565b6000602082840312156146eb578081fd5b610d77826140b0565b600060208284031215614705578081fd5b5051919050565b60006020828403121561471d578081fd5b8135610d7781615120565b600060208284031215614739578081fd5b8151610d7781615120565b60008060008060008060006080888a03121561475e578081fd5b87356001600160401b0380821115614774578283fd5b6147808b838c016140c5565b909950975060208a0135965060408a013591508082111561479f578283fd5b6147ab8b838c0161406e565b909650945060608a01359150808211156147c3578283fd5b506147d08a828b0161406e565b989b979a50959850939692959293505050565b600080602083850312156147f5578182fd5b82356001600160401b0381111561480a578283fd5b61453e858286016140c5565b60008060008060006060868803121561482d578283fd5b85356001600160401b0380821115614843578485fd5b61484f89838a016140c5565b90975095506020880135915080821115614867578485fd5b506145a8888289016140c5565b600080600060408486031215614888578081fd5b83356001600160401b0381111561489d578182fd5b6145ef868287016140c5565b6000602082840312156148ba578081fd5b81356001600160401b038111156148cf578182fd5b610c6b84828501614104565b6000806000604084860312156148ef578081fd5b83356001600160401b0380821115614905578283fd5b9085019060808288031215614918578283fd5b9093506020850135908082111561492d578283fd5b5061447a868287016140c5565b60006020828403121561494b578081fd5b5035919050565b600080600060408486031215614966578081fd5b8335925060208401356001600160401b0381111561446e578182fd5b60008060008060608587031215614997578182fd5b8435935060208501356001600160401b038111156149b3578283fd5b6149bf878288016140c5565b9598909750949560400135949350505050565b600080604083850312156149e4578182fd5b50508035926020909101359150565b600081518084526020808501808196508360051b81019150828601855b85811015614a3a578284038952614a28848351614a70565b98850198935090840190600101614a10565b5091979650505050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60008151808452614a88816020860160208601615022565b601f01601f19169290920160200192915050565b60008251614aae818460208701615022565b9190910192915050565b60008451614aca818460208901615022565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b60008351614b09818460208801615022565b601760f91b9083019081528351614b27816001840160208801615022565b01600101949350505050565b8183823760009101908152919050565b60008351614b55818460208801615022565b835190830190614b69818360208801615022565b01949350505050565b6001600160a01b03848116825283166020820152606060408201819052600090610aff90830184614a70565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061317890830184614a70565b6000602080830181845280855180835260408601915060408160051b8701019250838701855b82811015614c2557603f19888603018452614c13858351614a70565b94509285019290850190600101614bf7565b5092979650505050505050565b602081526000610d7760208301846149f3565b604081526000614c5860408301856149f3565b8281036020840152610d7381856149f3565b828152604060208201526000610c6b6040830184614a70565b602081526000610c6b602083018486614a47565b602081526000610d776020830184614a70565b604081526000614cbd6040830185614a70565b8281036020840152610d738185614a70565b60208082526029908201527f52656769737472793a2053454e4445525f49535f4e4f545f415050524f5645446040820152682fa7a92fa7aba722a960b91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526027908201527f52656769737472793a2053454e4445525f49535f4e4f545f4d494e54494e475f60408201526626a0a720a3a2a960c91b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60208082526022908201527f52656769737472793a20494e53554646494349454e545f5045524d495353494f6040820152614e5360f01b606082015260800190565b6000808335601e19843603018112614e54578283fd5b8301803591506001600160401b03821115614e6d578283fd5b602001915036819003821315613df257600080fd5b604051601f8201601f191681016001600160401b0381118282101715614eaa57614eaa6150f5565b604052919050565b60006001600160401b03821115614ecb57614ecb6150f5565b5060051b60200190565b60008219821115614ee857614ee86150c9565b500190565b600082614efc57614efc6150df565b500490565b600082821015614f1357614f136150c9565b500390565b6000614f26613ffd84614eb2565b808482526020808301925084368760051b87011115614f43578485fd5b845b87811015614f815781356001600160401b03811115614f62578687fd5b614f6e36828a01614104565b8652509382019390820190600101614f45565b50919695505050505050565b6000610d77368484613fef565b600060808236031215614fab578081fd5b604051608081016001600160401b038282108183111715614fce57614fce6150f5565b8160405284359150614fdf8261510b565b81835260208501356020840152604085013560408401526060850135915080821115615009578384fd5b5061501636828601614104565b60608301525092915050565b60005b8381101561503d578181015183820152602001615025565b838111156112fa5750506000910152565b60008161505d5761505d6150c9565b506000190190565b600181811c9082168061507957607f821691505b602082108114156112ab57634e487b7160e01b600052602260045260246000fd5b60006000198214156150ae576150ae6150c9565b5060010190565b6000826150c4576150c46150df565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461109a57600080fd5b6001600160e01b03198116811461109a57600080fdfebe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a164736f6c6343000804000a";
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
