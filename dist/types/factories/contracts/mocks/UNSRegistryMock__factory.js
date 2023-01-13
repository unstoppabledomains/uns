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
const _bytecode = "0x608060405234801561001057600080fd5b50614ec1806100206000396000f3fe608060405234801561001057600080fd5b50600436106103785760003560e01c80637e37479e116101d3578063ba5d40b711610104578063ebf0c717116100a2578063f5c1f76e1161007c578063f5c1f76e14610806578063f7df5c6014610819578063f8c8765e1461082c578063ffa1ad741461083f57600080fd5b8063ebf0c717146107e4578063ec129eea146107eb578063f25eb5c1146107fe57600080fd5b8063ce92b33e116100de578063ce92b33e1461076f578063cf2c52cb14610782578063d106353f14610795578063e985e9c5146107a857600080fd5b8063ba5d40b714610736578063bb5b27e114610749578063c87b56dd1461075c57600080fd5b8063a3f4df7e11610171578063ae31844a1161014b578063ae31844a146106dc578063b3f9e4cb146106ef578063b85afd2814610702578063b88d4fde1461072357600080fd5b8063a3f4df7e1461068a578063a4247400146106b6578063ab3b87fe146106c957600080fd5b80639559c0bd116101ad5780639559c0bd1461065457806395d89b411461065c57806399e0dd7c14610664578063a22cb4651461067757600080fd5b80637e37479e1461061b57806394d008ef1461062e5780639508b1c41461064157600080fd5b806342842e0e116102ad578063509602391161024b578063638e5c7811610225578063638e5c78146105b3578063672b9f81146105c65780636ccbae5f146105e757806370a082311461060857600080fd5b80635096023914610571578063572b6c05146105845780636352211e146105a057600080fd5b806347c816991161028757806347c81699146105255780634a72584d146105385780634f558e791461054b57806350382c1a1461055e57600080fd5b806342842e0e146104ec57806342966c68146104ff578063430c20811461051257600080fd5b80631bf7e13e1161031a57806327f18975116102f457806327f18975146104a0578063310bd74b146104b3578063384e9a55146104c657806340c10f19146104d957600080fd5b80631bf7e13e1461045957806323b872dd1461046c578063276fabb11461047f57600080fd5b8063095ea7b311610356578063095ea7b3146103e5578063150b7a02146103fa5780631bd8cc1a146104265780631be5e7ed1461044657600080fd5b806301ffc9a71461037d57806306fdde03146103a5578063081812fc146103ba575b600080fd5b61039061038b3660046144a1565b610863565b60405190151581526020015b60405180910390f35b6103ad610874565b60405161039c91906149cb565b6103cd6103c83660046146cf565b610906565b6040516001600160a01b03909116815260200161039c565b6103f86103f33660046141c3565b61092d565b005b61040d610408366004613fb5565b610982565b6040516001600160e01b0319909116815260200161039c565b61043961043436600461438f565b610ad8565b60405161039c9190614966565b6103ad610454366004614609565b610bf8565b6103ad610467366004614670565b610c43565b6103f861047a366004613f75565b610d4e565b61049261048d3660046142e0565b610dd4565b60405190815260200161039c565b6103f86104ae36600461431f565b610de8565b6103f86104c13660046146cf565b610e63565b6103f86104d43660046146cf565b610ed1565b6103f86104e73660046141c3565b610f90565b6103f86104fa366004613f75565b610fdd565b6103f861050d3660046146cf565b610ff8565b6103906105203660046141c3565b61106f565b6103f86105333660046145ab565b61107b565b6103f8610546366004614717565b6110ed565b6103906105593660046146cf565b611166565b6103f861056c36600461463e565b611185565b6103f861057f366004613eaa565b6111bb565b610390610592366004613eaa565b6001600160a01b0316301490565b6103cd6105ae3660046146cf565b61121b565b6103f86105c13660046146cf565b61127b565b6105d96105d4366004614767565b6112c6565b60405161039c9291906149de565b6104926105f53660046146cf565b6000908152610100602052604090205490565b610492610616366004613eaa565b6112de565b610492610629366004613eaa565b611364565b6103f861063c366004614287565b611395565b6103f861064f3660046144d9565b6113e4565b610492601481565b6103ad61146b565b6103f8610672366004614578565b61147a565b6103f8610685366004614146565b611500565b6103ad6040518060400160405280600d81526020016c554e533a20526567697374727960981b81525081565b6103906106c4366004614670565b611512565b6103f86106d73660046141c3565b61155d565b6103f86106ea3660046142e0565b6115d5565b6103cd6106fd3660046146cf565b611681565b61071561071036600461438f565b6116ab565b60405161039c929190614979565b6103f8610731366004614025565b611813565b6103f861074436600461408e565b61188d565b6103ad6107573660046146cf565b61190e565b6103ad61076a3660046146cf565b6119b0565b6103f861077d36600461431f565b611a16565b6103f8610790366004614171565b611a88565b6103f86107a33660046141ee565b611b65565b6103906107b6366004613ee2565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b6000610492565b6103f86107f936600461431f565b611bd9565b6103f8611c4b565b6104396108143660046142e0565b611cd1565b6103f86108273660046146e7565b611dae565b6103f861083a366004613f1a565b611e3f565b6103ad60405180604001604052806005815260200164302e362e3360d81b81525081565b600061086e82612015565b92915050565b60606065805461088390614dc3565b80601f01602080910402602001604051908101604052809291908181526020018280546108af90614dc3565b80156108fc5780601f106108d1576101008083540402835291602001916108fc565b820191906000526020600020905b8154815290600101906020018083116108df57829003601f168201915b5050505050905090565b600061091182612065565b506000908152606960205260409020546001600160a01b031690565b803033141561096a5761093e6120c4565b81146109655760405162461bcd60e51b815260040161095c90614ae5565b60405180910390fd5b610973565b610973816120d9565b61097d8383612107565b505050565b60007f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378546001600160a01b03166109b761222a565b6001600160a01b03161415610a79576109ce61222a565b6001600160a01b03166342966c68856040518263ffffffff1660e01b81526004016109fb91815260200190565b600060405180830381600087803b158015610a1557600080fd5b505af1158015610a29573d6000803e3d6000fd5b505050821580159150610a435750610a438284018461446f565b15610a6157610a523085612239565b610a5c8585612387565b610a6b565b610a6b8585612239565b50630a85bd0160e11b610acf565b60405162461bcd60e51b815260206004820152602560248201527f52656769737472793a204552433732315f524543454956494e475f50524f4849604482015264109255115160da1b606482015260840161095c565b95945050505050565b6060826001600160401b03811115610b0057634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610b3357816020015b6060815260200190600190039081610b1e5790505b50905060005b83811015610bf057610bb2858583818110610b6457634e487b7160e01b600052603260045260246000fd5b9050602002810190610b769190614ba9565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250879250612432915050565b828281518110610bd257634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080610be890614df8565b915050610b39565b509392505050565b6060610c3b84848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250869250612432915050565b949350505050565b606060005a9050610c55858585611512565b610cb15760405162461bcd60e51b815260206004820152602760248201527f554e535265676973747279466f727761726465723a205349474e41545552455f6044820152661253959053125160ca1b606482015260840161095c565b610d43610cc16020870187613eaa565b30604088013584610cd560608b018b614ba9565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b908190840183828082843760009201919091525061246792505050565b9150505b9392505050565b80610d60610d5a61222a565b82612556565b610d7c5760405162461bcd60e51b815260040161095c90614a03565b8130331415610db057610d8d6120c4565b8114610dab5760405162461bcd60e51b815260040161095c90614ae5565b610db9565b610db9816120d9565b610dc2836125d4565b610dcd858585612641565b5050505050565b6000610d47610de38385614c83565b6127e8565b80610df4610d5a61222a565b610e105760405162461bcd60e51b815260040161095c90614a03565b8130331415610e4457610e216120c4565b8114610e3f5760405162461bcd60e51b815260040161095c90614ae5565b610e4d565b610e4d816120d9565b610e5a8787878787612845565b50505050505050565b80610e6f610d5a61222a565b610e8b5760405162461bcd60e51b815260040161095c90614a03565b8130331415610ebf57610e9c6120c4565b8114610eba5760405162461bcd60e51b815260040161095c90614ae5565b610ec8565b610ec8816120d9565b61097d836125d4565b80610eda61222a565b6001600160a01b0316610eec8261121b565b6001600160a01b031614610f425760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e4552000000604482015260640161095c565b8130331415610f7657610f536120c4565b8114610f715760405162461bcd60e51b815260040161095c90614ae5565b610f7f565b610f7f816120d9565b61097d610f8a61222a565b846128c4565b610f9861290c565b6001600160a01b0316610fa961222a565b6001600160a01b031614610fcf5760405162461bcd60e51b815260040161095c90614b67565b610fd98282612239565b5050565b61097d83838360405180602001604052806000815250611813565b80611004610d5a61222a565b6110205760405162461bcd60e51b815260040161095c90614a03565b8130331415611054576110316120c4565b811461104f5760405162461bcd60e51b815260040161095c90614ae5565b61105d565b61105d816120d9565b611066836125d4565b61097d83612a1f565b6000610d478383612556565b80611087610d5a61222a565b6110a35760405162461bcd60e51b815260040161095c90614a03565b81303314156110d7576110b46120c4565b81146110d25760405162461bcd60e51b815260040161095c90614ae5565b6110e0565b6110e0816120d9565b610e5a8787878787612ac6565b806110f9610d5a61222a565b6111155760405162461bcd60e51b815260040161095c90614a03565b8130331415611149576111266120c4565b81146111445760405162461bcd60e51b815260040161095c90614ae5565b611152565b611152816120d9565b61115e86868686612ba5565b505050505050565b6000818152606760205260408120546001600160a01b0316151561086e565b6111b8816040516020016111999190614831565b6040516020818303038152906040528051906020012060001c82612c45565b50565b610134546001600160a01b03166111d061222a565b6001600160a01b0316146111f65760405162461bcd60e51b815260040161095c90614a9e565b6001600160a01b0316600090815261013660205260409020805460ff19166001179055565b6000818152606760205260408120546001600160a01b03168061086e5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161095c565b80611287610d5a61222a565b6112a35760405162461bcd60e51b815260040161095c90614a03565b6112b56112ae61222a565b3084612641565b610fd96112c061222a565b83612387565b6060806112d38484612c71565b909590945092505050565b60006001600160a01b0382166113485760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b606482015260840161095c565b506001600160a01b031660009081526068602052604090205490565b6001600160a01b0381166000908152610135602052604081205461138781612c92565b61138f578091505b50919050565b61139d61290c565b6001600160a01b03166113ae61222a565b6001600160a01b0316146113d45760405162461bcd60e51b815260040161095c90614b67565b6113de8484612239565b50505050565b6113ee8787612cdc565b6113f661222a565b6001600160a01b03166114088661121b565b6001600160a01b03161461145e5760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e4552000000604482015260640161095c565b610e5a8484848489612d4b565b60606066805461088390614dc3565b610134546001600160a01b031661148f61222a565b6001600160a01b0316146114b55760405162461bcd60e51b815260040161095c90614a9e565b6114c26101338383613ca1565b507f4b120d6a959a84a520fa48f5f937cca0e79129423487af7901213b5d2e89313b82826040516114f49291906149b7565b60405180910390a15050565b610fd961150b61222a565b8383612dd5565b6000610c3b61152085614cf8565b3085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612ea492505050565b80611569610d5a61222a565b6115855760405162461bcd60e51b815260040161095c90614a03565b81303314156115b9576115966120c4565b81146115b45760405162461bcd60e51b815260040161095c90614ae5565b6115c2565b6115c2816120d9565b6113de6115ce8461121b565b8585612641565b610134546001600160a01b03166115ea61222a565b6001600160a01b0316146116105760405162461bcd60e51b815260040161095c90614a9e565b60005b8181101561097d576001610137600085858581811061164257634e487b7160e01b600052603260045260246000fd5b90506020020135815260200190815260200160002060006101000a81548160ff021916908315150217905550808061167990614df8565b915050611613565b6000818152606760205260408120546001600160a01b03166116a457600061086e565b3092915050565b606080836001600160401b038111156116d457634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561170757816020015b60608152602001906001900390816116f25790505b509150836001600160401b0381111561173057634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561176357816020015b606081526020019060019003908161174e5790505b50905060005b8481101561180a576117a186868381811061179457634e487b7160e01b600052603260045260246000fd5b9050602002013585612c71565b8483815181106117c157634e487b7160e01b600052603260045260246000fd5b602002602001018484815181106117e857634e487b7160e01b600052603260045260246000fd5b602002602001018290528290525050808061180290614df8565b915050611769565b50935093915050565b8161181f610d5a61222a565b61183b5760405162461bcd60e51b815260040161095c90614a03565b823033141561186f5761184c6120c4565b811461186a5760405162461bcd60e51b815260040161095c90614ae5565b611878565b611878816120d9565b611881846125d4565b61115e86868686612ffc565b610134546001600160a01b03166118a261222a565b6001600160a01b0316146118c85760405162461bcd60e51b815260040161095c90614a9e565b60006118d7610de3888a614c83565b90506118f689826118f06118eb8b8d614c83565b61302f565b856130cc565b6119038686868685612d4b565b505050505050505050565b600081815260c96020526040902080546060919061192b90614dc3565b80601f016020809104026020016040519081016040528092919081815260200182805461195790614dc3565b80156119a45780601f10611979576101008083540402835291602001916119a4565b820191906000526020600020905b81548152906001019060200180831161198757829003601f168201915b50505050509050919050565b60606119bb82612065565b60006119c561311e565b905060008151116119e55760405180602001604052806000815250610d47565b806119ef8461312e565b604051602001611a009291906148d8565b6040516020818303038152906040529392505050565b80611a22610d5a61222a565b611a3e5760405162461bcd60e51b815260040161095c90614a03565b8130331415611a7257611a4f6120c4565b8114611a6d5760405162461bcd60e51b815260040161095c90614ae5565b611a7b565b611a7b816120d9565b610e5a8787878787612d4b565b7f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87546001600160a01b0316611abb61222a565b6001600160a01b031614611ae15760405162461bcd60e51b815260040161095c90614b67565b6020811415611b04576000611af8828401846146cf565b90506113de8482612239565b6000611b12828401846143d8565b805190915060005b8181101561115e57611b5386848381518110611b4657634e487b7160e01b600052603260045260246000fd5b6020026020010151612239565b80611b5d81614df8565b915050611b1a565b610134546001600160a01b0316611b7a61222a565b6001600160a01b031614611ba05760405162461bcd60e51b815260040161095c90614a9e565b611ba9866125d4565b611bbc611bb58761121b565b8888612641565b611bc9858585858a612d4b565b8015610e5a57610e5a8787613247565b80611be5610d5a61222a565b611c015760405162461bcd60e51b815260040161095c90614a03565b8130331415611c3557611c126120c4565b8114611c305760405162461bcd60e51b815260040161095c90614ae5565b611c3e565b611c3e816120d9565b610e5a8787878787613288565b6000611c5561222a565b6001600160a01b03811660009081526101356020526040902054909150611cc85760405162461bcd60e51b815260206004820152602160248201527f52656769737472793a20524556455253455f5245434f52445f49535f454d50546044820152605960f81b606482015260840161095c565b6111b88161329e565b6060816001600160401b03811115611cf957634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015611d2c57816020015b6060815260200190600190039081611d175790505b50905060005b82811015611da757611d69848483818110611d5d57634e487b7160e01b600052603260045260246000fd5b9050602002013561190e565b828281518110611d8957634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080611d9f90614df8565b915050611d32565b5092915050565b610134546001600160a01b0316611dc361222a565b6001600160a01b031614611de95760405162461bcd60e51b815260040161095c90614a9e565b61013454611e00906001600160a01b031684612239565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39528383604051611e329291906149b7565b60405180910390a2505050565b600054610100900460ff1615808015611e5f5750600054600160ff909116105b80611e795750303b158015611e79575060005460ff166001145b611edc5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161095c565b6000805460ff191660011790558015611eff576000805461ff0019166101001790555b61013480546001600160a01b0319166001600160a01b038716179055837f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec9237880546001600160a01b0319166001600160a01b03929092169190911790556040805180820182526013815272556e73746f707061626c6520446f6d61696e7360681b60208083019190915282518084019093526002835261155160f21b90830152611fa7916132e3565b611faf613331565b611fb7613331565b611fc08361335a565b611fc98261338a565b8015610dcd576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050505050565b60006001600160e01b031982166380ac58cd60e01b148061204657506001600160e01b03198216635b5e139f60e01b145b8061086e57506301ffc9a760e01b6001600160e01b031983161461086e565b6000818152606760205260409020546001600160a01b03166111b85760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161095c565b6000303314156120d65750601f193601355b90565b600081815261010060205260409020546120f4906001614c40565b6000918252610100602052604090912055565b60006121128261121b565b9050806001600160a01b0316836001600160a01b031614156121805760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b606482015260840161095c565b806001600160a01b031661219261222a565b6001600160a01b031614806121ae57506121ae816107b661222a565b6122205760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c0000606482015260840161095c565b61097d83836133ba565b6000612234613428565b905090565b6001600160a01b03821661228f5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161095c565b6000818152606760205260409020546001600160a01b0316156122f45760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161095c565b61230060008383613444565b6001600160a01b0382166000908152606860205260408120805460019290612329908490614c40565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600061239161290c565b905061239d81836133ba565b600080516020614e9583398151915254604080516020808201869052825180830390910181528183019283905263e3dec8fb60e01b9092526001600160a01b0390921691829163e3dec8fb916123fa918891309190604401614907565b600060405180830381600087803b15801561241457600080fd5b505af1158015612428573d6000803e3d6000fd5b5050505050505050565b6060610d47836040516020016124489190614831565b6040516020818303038152906040528051906020012060001c836134e1565b6060612472856120d9565b600080876001600160a01b03168661248c8b8a89896135c3565b6040516124999190614831565b60006040518083038160008787f1925050503d80600081146124d7576040519150601f19603f3d011682016040523d82523d6000602084013e6124dc565b606091505b5090925090506124ed603f87614c58565b5a1161250957634e487b7160e01b600052600160045260246000fd5b61254982826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c45440000000000008152506135f3565b9998505050505050505050565b6000806125628361121b565b9050806001600160a01b0316846001600160a01b031614806125a957506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b80610c3b5750836001600160a01b03166125c284610906565b6001600160a01b031614949350505050565b6125dd8161362c565b6040516020016125ef91815260200190565b60408051601f198184030181528282528051602091820120600085815260cb9092529181209190915582917f185c30856dadb58bf097c1f665a52ada7029752dbcad008ea3fefc73bee8c9fe9190a250565b826001600160a01b03166126548261121b565b6001600160a01b0316146126b85760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b606482015260840161095c565b6001600160a01b03821661271a5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161095c565b612725838383613444565b6127306000826133ba565b6001600160a01b0383166000908152606860205260408120805460019290612759908490614c6c565b90915550506001600160a01b0382166000908152606860205260408120805460019290612787908490614c40565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b805160009081905b8015611da7576128318285612806600185614c6c565b8151811061282457634e487b7160e01b600052603260045260246000fd5b6020026020010151613658565b91508061283d81614dac565b9150506127f0565b60005b8481101561115e576128b286868381811061287357634e487b7160e01b600052603260045260246000fd5b9050602002013585858481811061289a57634e487b7160e01b600052603260045260246000fd5b90506020028101906128ac9190614ba9565b85612ba5565b806128bc81614df8565b915050612848565b6001600160a01b03821660008181526101356020526040808220849055518392917feb76a21470988c474a21f690cc28fee1ed511bd812dc3c21fd0f49c5e5d4708a91a35050565b600080600080516020614e958339815191525460405163721804d360e11b81523060048201526001600160a01b039091169150600090829063e43009a69060240160206040518083038186803b15801561296557600080fd5b505afa158015612979573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061299d9190614489565b60405163e66f960360e01b8152600481018290529091506001600160a01b0383169063e66f96039060240160206040518083038186803b1580156129e057600080fd5b505afa1580156129f4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a189190613ec6565b9250505090565b6000612a2a8261121b565b9050612a3881600084613444565b612a436000836133ba565b6001600160a01b0381166000908152606860205260408120805460019290612a6c908490614c6c565b909155505060008281526067602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60008585604051602001612adb9291906148c8565b60408051601f198184030181528282528051602091820120601f8901829004820284018201909252878352909250612b2f9183918990899081908401838280828437600092019190915250612c4592505050565b61115e8187878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b018190048102820181019092528981529250899150889081908401838280828437600092019190915250889250613705915050565b612bae84613840565b612bfa5760405162461bcd60e51b815260206004820152601c60248201527f5265636f726453746f726167653a204b45595f4e4f545f464f554e4400000000604482015260640161095c565b6113de84612c078661190e565b85858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250879250613705915050565b612c4e82613840565b610fd957600082815260c960209081526040909120825161097d92840190613d21565b606080612c7d8461190e565b9150612c8984846134e1565b90509250929050565b6000818152610137602052604081205460ff16801561086e57506101366000612cb961222a565b6001600160a01b0316815260208101919091526040016000205460ff1692915050565b600080516020614e9583398151915254604051633805550f60e01b81526001600160a01b03909116908190633805550f90612d1d90869086906004016149b7565b600060405180830381600087803b158015612d3757600080fd5b505af1158015610e5a573d6000803e3d6000fd5b60005b8481101561115e57612dc3868683818110612d7957634e487b7160e01b600052603260045260246000fd5b9050602002810190612d8b9190614ba9565b868685818110612dab57634e487b7160e01b600052603260045260246000fd5b9050602002810190612dbd9190614ba9565b86612ac6565b80612dcd81614df8565b915050612d4e565b816001600160a01b0316836001600160a01b03161415612e375760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161095c565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f9060240160206040518083038186803b158015612ee657600080fd5b505afa158015612efa573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612f1e9190614489565b90506000612fcc866060015180519060200120868860200151604051602001612f6c9392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b9050818660200151148015612ff257508551612ff2906001600160a01b03168286613866565b9695505050505050565b613007848484612641565b613013848484846139b6565b6113de5760405162461bcd60e51b815260040161095c90614a4c565b606060008260008151811061305457634e487b7160e01b600052603260045260246000fd5b602002602001015190506000600190505b8351811015611da7578184828151811061308f57634e487b7160e01b600052603260045260246000fd5b60200260200101516040516020016130a892919061488c565b604051602081830303815290604052915080806130c490614df8565b915050613065565b6130d68484612239565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39528360405161310691906149cb565b60405180910390a280156113de576113de8484613247565b6060610133805461088390614dc3565b6060816131525750506040805180820190915260018152600360fc1b602082015290565b8160005b811561317c578061316681614df8565b91506131759050600a83614c58565b9150613156565b6000816001600160401b038111156131a457634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156131ce576020820181803683370190505b5090505b8415610c3b576131e3600183614c6c565b91506131f0600a86614e13565b6131fb906030614c40565b60f81b81838151811061321e57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350613240600a86614c58565b94506131d2565b61dead6001600160a01b0383161480159061327957506001600160a01b03821660009081526101356020526040902054155b15610fd957610fd982826128c4565b613291816125d4565b610dcd8585858585612d4b565b6001600160a01b03811660008181526101356020526040808220829055517ffcf5eec0cfa3e6332f5f0e63ec242d71f866a61d121d6cdf5c2eb3b668a26c4f9190a250565b600054610100900460ff1661330a5760405162461bcd60e51b815260040161095c90614b1c565b815161331d906065906020850190613d21565b50805161097d906066906020840190613d21565b600054610100900460ff166133585760405162461bcd60e51b815260040161095c90614b1c565b565b600054610100900460ff166133815760405162461bcd60e51b815260040161095c90614b1c565b6111b881613ac7565b600054610100900460ff166133b15760405162461bcd60e51b815260040161095c90614b1c565b6111b881613b20565b600081815260696020526040902080546001600160a01b0319166001600160a01b03841690811790915581906133ef8261121b565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60003033141561343f575060331936013560601c90565b503390565b6000818152610137602052604090205460ff16158061346b57506001600160a01b03821615155b6134b75760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a20544f4b454e5f55504752414445440000000000000000604482015260640161095c565b6001600160a01b0383166000908152610135602052604090205481141561097d5761097d8361329e565b60606134ec82612c92565b15613506575060408051602081019091526000815261086e565b60ca60006135138461362c565b81526020019081526020016000206000848152602001908152602001600020805461353d90614dc3565b80601f016020809104026020016040519081016040528092919081815260200182805461356990614dc3565b80156135b65780601f1061358b576101008083540402835291602001916135b6565b820191906000526020600020905b81548152906001019060200180831161359957829003601f168201915b5050505050905092915050565b60608285856040516020016135da9392919061484d565b6040516020818303038152906040529050949350505050565b60608315613602575081610d47565b8251156136125782518084602001fd5b8160405162461bcd60e51b815260040161095c91906149cb565b600081815260cb60205260408120541561365457600082815260cb602052604090205461086e565b5090565b60008151600014156136a45760405162461bcd60e51b815260206004820152601560248201527452656769737472793a204c4142454c5f454d50545960581b604482015260640161095c565b82826040516020016136b69190614831565b604051602081830303815290604052805190602001206040516020016136e6929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b60ca60006137128361362c565b81526020019081526020016000206000858152602001908152602001600020805461373c90614dc3565b1515905061379357826040516137529190614831565b6040518091039020817f7ae4f661958fbecc2f77be6b0eb280d2a6f604b29e1e7221c82b9da0c4af7f868560405161378a91906149cb565b60405180910390a35b8160ca60006137a18461362c565b8152602001908152602001600020600086815260200190815260200160002090805190602001906137d3929190613d21565b50816040516137e29190614831565b6040518091039020836040516137f89190614831565b6040518091039020827f851ffe8e74d5015261dba0a1f9e1b0e5d42c5af5d2ad1908fee897c7d80a0d9286866040516138329291906149de565b60405180910390a450505050565b600081815260c960205260408120805482919061385c90614dc3565b9050119050919050565b60008060006138758585613b6e565b9092509050600081600481111561389c57634e487b7160e01b600052602160045260246000fd5b1480156138ba5750856001600160a01b0316826001600160a01b0316145b156138ca57600192505050610d47565b600080876001600160a01b0316631626ba7e60e01b88886040516024016138f292919061499e565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516139309190614831565b600060405180830381855afa9150503d806000811461396b576040519150601f19603f3d011682016040523d82523d6000602084013e613970565b606091505b5091509150818015613983575080516020145b80156139aa57508051630b135d3f60e11b906139a89083016020908101908401614489565b145b98975050505050505050565b60006001600160a01b0384163b15613abf57836001600160a01b031663150b7a026139df61222a565b8786866040518563ffffffff1660e01b8152600401613a019493929190614933565b602060405180830381600087803b158015613a1b57600080fd5b505af1925050508015613a4b575060408051601f3d908101601f19168201909252613a48918101906144bd565b60015b613aa5573d808015613a79576040519150601f19603f3d011682016040523d82523d6000602084013e613a7e565b606091505b508051613a9d5760405162461bcd60e51b815260040161095c90614a4c565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610c3b565b506001610c3b565b600054610100900460ff16613aee5760405162461bcd60e51b815260040161095c90614b1c565b80600080516020614e958339815191525b80546001600160a01b0319166001600160a01b039290921691909117905550565b600054610100900460ff16613b475760405162461bcd60e51b815260040161095c90614b1c565b807f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87613aff565b600080825160411415613ba55760208301516040840151606085015160001a613b9987828585613bb4565b94509450505050613bad565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613beb5750600090506003613c98565b8460ff16601b14158015613c0357508460ff16601c14155b15613c145750600090506004613c98565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613c68573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613c9157600060019250925050613c98565b9150600090505b94509492505050565b828054613cad90614dc3565b90600052602060002090601f016020900481019282613ccf5760008555613d15565b82601f10613ce85782800160ff19823516178555613d15565b82800160010185558215613d15579182015b82811115613d15578235825591602001919060010190613cfa565b50613654929150613d95565b828054613d2d90614dc3565b90600052602060002090601f016020900481019282613d4f5760008555613d15565b82601f10613d6857805160ff1916838001178555613d15565b82800160010185558215613d15579182015b82811115613d15578251825591602001919060010190613d7a565b5b808211156136545760008155600101613d96565b60008083601f840112613dbb578182fd5b5081356001600160401b03811115613dd1578182fd5b6020830191508360208260051b8501011115613bad57600080fd5b80358015158114613dfc57600080fd5b919050565b60008083601f840112613e12578182fd5b5081356001600160401b03811115613e28578182fd5b602083019150836020828501011115613bad57600080fd5b600082601f830112613e50578081fd5b81356001600160401b03811115613e6957613e69614e53565b613e7c601f8201601f1916602001614bed565b818152846020838601011115613e90578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215613ebb578081fd5b8135610d4781614e69565b600060208284031215613ed7578081fd5b8151610d4781614e69565b60008060408385031215613ef4578081fd5b8235613eff81614e69565b91506020830135613f0f81614e69565b809150509250929050565b60008060008060808587031215613f2f578182fd5b8435613f3a81614e69565b93506020850135613f4a81614e69565b92506040850135613f5a81614e69565b91506060850135613f6a81614e69565b939692955090935050565b600080600060608486031215613f89578081fd5b8335613f9481614e69565b92506020840135613fa481614e69565b929592945050506040919091013590565b600080600080600060808688031215613fcc578283fd5b8535613fd781614e69565b94506020860135613fe781614e69565b93506040860135925060608601356001600160401b03811115614008578182fd5b61401488828901613e01565b969995985093965092949392505050565b6000806000806080858703121561403a578182fd5b843561404581614e69565b9350602085013561405581614e69565b92506040850135915060608501356001600160401b03811115614076578182fd5b61408287828801613e40565b91505092959194509250565b60008060008060008060008060a0898b0312156140a9578586fd5b88356140b481614e69565b975060208901356001600160401b03808211156140cf578788fd5b6140db8c838d01613daa565b909950975060408b01359150808211156140f3578485fd5b6140ff8c838d01613daa565b909750955060608b0135915080821115614117578485fd5b506141248b828c01613daa565b9094509250614137905060808a01613dec565b90509295985092959890939650565b60008060408385031215614158578182fd5b823561416381614e69565b9150612c8960208401613dec565b600080600060408486031215614185578081fd5b833561419081614e69565b925060208401356001600160401b038111156141aa578182fd5b6141b686828701613e01565b9497909650939450505050565b600080604083850312156141d5578182fd5b82356141e081614e69565b946020939093013593505050565b600080600080600080600060a0888a031215614208578081fd5b873561421381614e69565b96506020880135955060408801356001600160401b0380821115614235578283fd5b6142418b838c01613daa565b909750955060608a0135915080821115614259578283fd5b506142668a828b01613daa565b9094509250614279905060808901613dec565b905092959891949750929550565b6000806000806060858703121561429c578182fd5b84356142a781614e69565b93506020850135925060408501356001600160401b038111156142c8578283fd5b6142d487828801613e01565b95989497509550505050565b600080602083850312156142f2578182fd5b82356001600160401b03811115614307578283fd5b61431385828601613daa565b90969095509350505050565b600080600080600060608688031215614336578283fd5b85356001600160401b038082111561434c578485fd5b61435889838a01613daa565b90975095506020880135915080821115614370578485fd5b5061437d88828901613daa565b96999598509660400135949350505050565b6000806000604084860312156143a3578081fd5b83356001600160401b038111156143b8578182fd5b6143c486828701613daa565b909790965060209590950135949350505050565b600060208083850312156143ea578182fd5b82356001600160401b038111156143ff578283fd5b8301601f8101851361440f578283fd5b803561442261441d82614c1d565b614bed565b80828252848201915084840188868560051b8701011115614441578687fd5b8694505b83851015614463578035835260019490940193918501918501614445565b50979650505050505050565b600060208284031215614480578081fd5b610d4782613dec565b60006020828403121561449a578081fd5b5051919050565b6000602082840312156144b2578081fd5b8135610d4781614e7e565b6000602082840312156144ce578081fd5b8151610d4781614e7e565b60008060008060008060006080888a0312156144f3578081fd5b87356001600160401b0380821115614509578283fd5b6145158b838c01613e01565b909950975060208a0135965060408a0135915080821115614534578283fd5b6145408b838c01613daa565b909650945060608a0135915080821115614558578283fd5b506145658a828b01613daa565b989b979a50959850939692959293505050565b6000806020838503121561458a578182fd5b82356001600160401b0381111561459f578283fd5b61431385828601613e01565b6000806000806000606086880312156145c2578283fd5b85356001600160401b03808211156145d8578485fd5b6145e489838a01613e01565b909750955060208801359150808211156145fc578485fd5b5061437d88828901613e01565b60008060006040848603121561461d578081fd5b83356001600160401b03811115614632578182fd5b6143c486828701613e01565b60006020828403121561464f578081fd5b81356001600160401b03811115614664578182fd5b610c3b84828501613e40565b600080600060408486031215614684578081fd5b83356001600160401b038082111561469a578283fd5b90850190608082880312156146ad578283fd5b909350602085013590808211156146c2578283fd5b506141b686828701613e01565b6000602082840312156146e0578081fd5b5035919050565b6000806000604084860312156146fb578081fd5b8335925060208401356001600160401b038111156141aa578182fd5b6000806000806060858703121561472c578182fd5b8435935060208501356001600160401b03811115614748578283fd5b61475487828801613e01565b9598909750949560400135949350505050565b60008060408385031215614779578182fd5b50508035926020909101359150565b600081518084526020808501808196508360051b81019150828601855b858110156147cf5782840389526147bd848351614805565b988501989350908401906001016147a5565b5091979650505050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6000815180845261481d816020860160208601614d80565b601f01601f19169290920160200192915050565b60008251614843818460208701614d80565b9190910192915050565b6000845161485f818460208901614d80565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b6000835161489e818460208801614d80565b601760f91b90830190815283516148bc816001840160208801614d80565b01600101949350505050565b8183823760009101908152919050565b600083516148ea818460208801614d80565b8351908301906148fe818360208801614d80565b01949350505050565b6001600160a01b03848116825283166020820152606060408201819052600090610acf90830184614805565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090612ff290830184614805565b602081526000610d476020830184614788565b60408152600061498c6040830185614788565b8281036020840152610d438185614788565b828152604060208201526000610c3b6040830184614805565b602081526000610c3b6020830184866147dc565b602081526000610d476020830184614805565b6040815260006149f16040830185614805565b8281036020840152610d438185614805565b60208082526029908201527f52656769737472793a2053454e4445525f49535f4e4f545f415050524f5645446040820152682fa7a92fa7aba722a960b91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526027908201527f52656769737472793a2053454e4445525f49535f4e4f545f4d494e54494e475f60408201526626a0a720a3a2a960c91b606082015260800190565b60208082526017908201527f52656769737472793a20544f4b454e5f494e56414c4944000000000000000000604082015260600190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60208082526022908201527f52656769737472793a20494e53554646494349454e545f5045524d495353494f6040820152614e5360f01b606082015260800190565b6000808335601e19843603018112614bbf578283fd5b8301803591506001600160401b03821115614bd8578283fd5b602001915036819003821315613bad57600080fd5b604051601f8201601f191681016001600160401b0381118282101715614c1557614c15614e53565b604052919050565b60006001600160401b03821115614c3657614c36614e53565b5060051b60200190565b60008219821115614c5357614c53614e27565b500190565b600082614c6757614c67614e3d565b500490565b600082821015614c7e57614c7e614e27565b500390565b6000614c9161441d84614c1d565b808482526020808301925084368760051b87011115614cae578485fd5b845b87811015614cec5781356001600160401b03811115614ccd578687fd5b614cd936828a01613e40565b8652509382019390820190600101614cb0565b50919695505050505050565b600060808236031215614d09578081fd5b604051608081016001600160401b038282108183111715614d2c57614d2c614e53565b8160405284359150614d3d82614e69565b81835260208501356020840152604085013560408401526060850135915080821115614d67578384fd5b50614d7436828601613e40565b60608301525092915050565b60005b83811015614d9b578181015183820152602001614d83565b838111156113de5750506000910152565b600081614dbb57614dbb614e27565b506000190190565b600181811c90821680614dd757607f821691505b6020821081141561138f57634e487b7160e01b600052602260045260246000fd5b6000600019821415614e0c57614e0c614e27565b5060010190565b600082614e2257614e22614e3d565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146111b857600080fd5b6001600160e01b0319811681146111b857600080fdfebe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafea164736f6c6343000804000a";
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
