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
const _bytecode = "0x608060405234801561001057600080fd5b50614e68806100206000396000f3fe608060405234801561001057600080fd5b50600436106103785760003560e01c806370a08231116101d3578063b85afd2811610104578063ebf0c717116100a2578063f5c1f76e1161007c578063f5c1f76e14610806578063f7df5c6014610819578063f8c8765e1461082c578063ffa1ad741461083f57600080fd5b8063ebf0c717146107e4578063ec129eea146107eb578063f25eb5c1146107fe57600080fd5b8063c87b56dd116100de578063c87b56dd1461076f578063ce92b33e14610782578063cf2c52cb14610795578063e985e9c5146107a857600080fd5b8063b85afd2814610728578063b88d4fde14610749578063bb5b27e11461075c57600080fd5b806399e0dd7c11610171578063a42474001161014b578063a4247400146106dc578063ab3b87fe146106ef578063ae31844a14610702578063b3f9e4cb1461071557600080fd5b806399e0dd7c1461068a578063a22cb4651461069d578063a3f4df7e146106b057600080fd5b806394d008ef116101ad57806394d008ef146106545780639508b1c4146106675780639559c0bd1461067a57806395d89b411461068257600080fd5b806370a082311461061b5780637d67df631461062e5780637e37479e1461064157600080fd5b806340c10f19116102ad57806350382c1a1161024b5780636352211e116102255780636352211e146105b3578063638e5c78146105c6578063672b9f81146105d95780636ccbae5f146105fa57600080fd5b806350382c1a146105715780635096023914610584578063572b6c051461059757600080fd5b8063430c208111610287578063430c20811461052557806347c81699146105385780634a72584d1461054b5780634f558e791461055e57600080fd5b806340c10f19146104ec57806342842e0e146104ff57806342966c681461051257600080fd5b80631be5e7ed1161031a578063276fabb1116102f4578063276fabb11461049257806327f18975146104b3578063310bd74b146104c6578063384e9a55146104d957600080fd5b80631be5e7ed146104595780631bf7e13e1461046c57806323b872dd1461047f57600080fd5b8063095ea7b311610356578063095ea7b3146103e55780630dee3b5c146103fa578063150b7a021461040d5780631bd8cc1a1461043957600080fd5b806301ffc9a71461037d57806306fdde03146103a5578063081812fc146103ba575b600080fd5b61039061038b366004614468565b610863565b60405190151581526020015b60405180910390f35b6103ad610874565b60405161039c9190614972565b6103cd6103c8366004614676565b610906565b6040516001600160a01b03909116815260200161039c565b6103f86103f336600461419b565b61092d565b005b6103f86104083660046141c6565b610982565b61042061041b366004613f9d565b6109f8565b6040516001600160e01b0319909116815260200161039c565b61044c610447366004614356565b610b4e565b60405161039c919061490d565b6103ad6104673660046145b0565b610c6e565b6103ad61047a366004614617565b610cb9565b6103f861048d366004613f5d565b610dc4565b6104a56104a03660046142a7565b610e4a565b60405190815260200161039c565b6103f86104c13660046142e6565b610e5e565b6103f86104d4366004614676565b610ed9565b6103f86104e7366004614676565b610f47565b6103f86104fa36600461419b565b611006565b6103f861050d366004613f5d565b611053565b6103f8610520366004614676565b61106e565b61039061053336600461419b565b6110e5565b6103f8610546366004614552565b6110f1565b6103f86105593660046146be565b611163565b61039061056c366004614676565b6111d4565b6103f861057f3660046145e5565b6111f3565b6103f8610592366004613e92565b611229565b6103906105a5366004613e92565b6001600160a01b0316301490565b6103cd6105c1366004614676565b611289565b6103f86105d4366004614676565b6112e9565b6105ec6105e736600461470e565b611334565b60405161039c929190614985565b6104a5610608366004614676565b6000908152610100602052604090205490565b6104a5610629366004613e92565b61134c565b6103f861063c366004614076565b6113d2565b6104a561064f366004613e92565b611451565b6103f861066236600461424e565b611482565b6103f86106753660046144a0565b6114d1565b6104a5601481565b6103ad611558565b6103f861069836600461451f565b611567565b6103f86106ab36600461411e565b6115ed565b6103ad6040518060400160405280600d81526020016c554e533a20526567697374727960981b81525081565b6103906106ea366004614617565b6115ff565b6103f86106fd36600461419b565b61164a565b6103f86107103660046142a7565b6116c2565b6103cd610723366004614676565b61176e565b61073b610736366004614356565b611798565b60405161039c929190614920565b6103f861075736600461400d565b611900565b6103ad61076a366004614676565b61197a565b6103ad61077d366004614676565b611a1c565b6103f86107903660046142e6565b611a82565b6103f86107a3366004614149565b611af4565b6103906107b6366004613eca565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006104a5565b6103f86107f93660046142e6565b611bd1565b6103f8611c43565b61044c6108143660046142a7565b611cc9565b6103f861082736600461468e565b611da6565b6103f861083a366004613f02565b611e37565b6103ad60405180604001604052806005815260200164302e362e3160d81b81525081565b600061086e8261200d565b92915050565b60606065805461088390614d6a565b80601f01602080910402602001604051908101604052809291908181526020018280546108af90614d6a565b80156108fc5780601f106108d1576101008083540402835291602001916108fc565b820191906000526020600020905b8154815290600101906020018083116108df57829003601f168201915b5050505050905090565b60006109118261205d565b506000908152606960205260409020546001600160a01b031690565b803033141561096a5761093e6120bc565b81146109655760405162461bcd60e51b815260040161095c90614a8c565b60405180910390fd5b610973565b610973816120d1565b61097d83836120ff565b505050565b610134546001600160a01b0316610997612222565b6001600160a01b0316146109bd5760405162461bcd60e51b815260040161095c90614a45565b6109c685612231565b6109d96109d286611289565b878761229e565b6109e68484848489612445565b6109f086866124cf565b505050505050565b60007f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378546001600160a01b0316610a2d612222565b6001600160a01b03161415610aef57610a44612222565b6001600160a01b03166342966c68856040518263ffffffff1660e01b8152600401610a7191815260200190565b600060405180830381600087803b158015610a8b57600080fd5b505af1158015610a9f573d6000803e3d6000fd5b505050821580159150610ab95750610ab982840184614436565b15610ad757610ac83085612510565b610ad2858561265e565b610ae1565b610ae18585612510565b50630a85bd0160e11b610b45565b60405162461bcd60e51b815260206004820152602560248201527f52656769737472793a204552433732315f524543454956494e475f50524f4849604482015264109255115160da1b606482015260840161095c565b95945050505050565b6060826001600160401b03811115610b7657634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610ba957816020015b6060815260200190600190039081610b945790505b50905060005b83811015610c6657610c28858583818110610bda57634e487b7160e01b600052603260045260246000fd5b9050602002810190610bec9190614b50565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508792506126ff915050565b828281518110610c4857634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080610c5e90614d9f565b915050610baf565b509392505050565b6060610cb184848080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508692506126ff915050565b949350505050565b606060005a9050610ccb8585856115ff565b610d275760405162461bcd60e51b815260206004820152602760248201527f554e535265676973747279466f727761726465723a205349474e41545552455f6044820152661253959053125160ca1b606482015260840161095c565b610db9610d376020870187613e92565b30604088013584610d4b60608b018b614b50565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b908190840183828082843760009201919091525061273492505050565b9150505b9392505050565b80610dd6610dd0612222565b82612823565b610df25760405162461bcd60e51b815260040161095c906149aa565b8130331415610e2657610e036120bc565b8114610e215760405162461bcd60e51b815260040161095c90614a8c565b610e2f565b610e2f816120d1565b610e3883612231565b610e4385858561229e565b5050505050565b6000610dbd610e598385614c2a565b6128a1565b80610e6a610dd0612222565b610e865760405162461bcd60e51b815260040161095c906149aa565b8130331415610eba57610e976120bc565b8114610eb55760405162461bcd60e51b815260040161095c90614a8c565b610ec3565b610ec3816120d1565b610ed087878787876128fe565b50505050505050565b80610ee5610dd0612222565b610f015760405162461bcd60e51b815260040161095c906149aa565b8130331415610f3557610f126120bc565b8114610f305760405162461bcd60e51b815260040161095c90614a8c565b610f3e565b610f3e816120d1565b61097d83612231565b80610f50612222565b6001600160a01b0316610f6282611289565b6001600160a01b031614610fb85760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e4552000000604482015260640161095c565b8130331415610fec57610fc96120bc565b8114610fe75760405162461bcd60e51b815260040161095c90614a8c565b610ff5565b610ff5816120d1565b61097d611000612222565b8461297d565b61100e6129c5565b6001600160a01b031661101f612222565b6001600160a01b0316146110455760405162461bcd60e51b815260040161095c90614b0e565b61104f8282612510565b5050565b61097d83838360405180602001604052806000815250611900565b8061107a610dd0612222565b6110965760405162461bcd60e51b815260040161095c906149aa565b81303314156110ca576110a76120bc565b81146110c55760405162461bcd60e51b815260040161095c90614a8c565b6110d3565b6110d3816120d1565b6110dc83612231565b61097d83612ad8565b6000610dbd8383612823565b806110fd610dd0612222565b6111195760405162461bcd60e51b815260040161095c906149aa565b813033141561114d5761112a6120bc565b81146111485760405162461bcd60e51b815260040161095c90614a8c565b611156565b611156816120d1565b610ed08787878787612b7f565b8061116f610dd0612222565b61118b5760405162461bcd60e51b815260040161095c906149aa565b81303314156111bf5761119c6120bc565b81146111ba5760405162461bcd60e51b815260040161095c90614a8c565b6111c8565b6111c8816120d1565b6109f086868686612c5e565b6000818152606760205260408120546001600160a01b0316151561086e565b6112268160405160200161120791906147d8565b6040516020818303038152906040528051906020012060001c82612cfe565b50565b610134546001600160a01b031661123e612222565b6001600160a01b0316146112645760405162461bcd60e51b815260040161095c90614a45565b6001600160a01b0316600090815261013660205260409020805460ff19166001179055565b6000818152606760205260408120546001600160a01b03168061086e5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161095c565b806112f5610dd0612222565b6113115760405162461bcd60e51b815260040161095c906149aa565b61132361131c612222565b308461229e565b61104f61132e612222565b8361265e565b6060806113418484612d2a565b909590945092505050565b60006001600160a01b0382166113b65760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b606482015260840161095c565b506001600160a01b031660009081526068602052604090205490565b610134546001600160a01b03166113e7612222565b6001600160a01b03161461140d5760405162461bcd60e51b815260040161095c90614a45565b600061141c610e598789614c2a565b905061143a88826114356114308a8c614c2a565b612d4b565b612de8565b6114478585858585612445565b5050505050505050565b6001600160a01b0381166000908152610135602052604081205461147481612e34565b61147c578091505b50919050565b61148a6129c5565b6001600160a01b031661149b612222565b6001600160a01b0316146114c15760405162461bcd60e51b815260040161095c90614b0e565b6114cb8484612510565b50505050565b6114db8787612e7e565b6114e3612222565b6001600160a01b03166114f586611289565b6001600160a01b03161461154b5760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e4552000000604482015260640161095c565b610ed08484848489612445565b60606066805461088390614d6a565b610134546001600160a01b031661157c612222565b6001600160a01b0316146115a25760405162461bcd60e51b815260040161095c90614a45565b6115af6101338383613c89565b507f4b120d6a959a84a520fa48f5f937cca0e79129423487af7901213b5d2e89313b82826040516115e192919061495e565b60405180910390a15050565b61104f6115f8612222565b8383612eed565b6000610cb161160d85614c9f565b3085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612fbc92505050565b80611656610dd0612222565b6116725760405162461bcd60e51b815260040161095c906149aa565b81303314156116a6576116836120bc565b81146116a15760405162461bcd60e51b815260040161095c90614a8c565b6116af565b6116af816120d1565b6114cb6116bb84611289565b858561229e565b610134546001600160a01b03166116d7612222565b6001600160a01b0316146116fd5760405162461bcd60e51b815260040161095c90614a45565b60005b8181101561097d576001610137600085858581811061172f57634e487b7160e01b600052603260045260246000fd5b90506020020135815260200190815260200160002060006101000a81548160ff021916908315150217905550808061176690614d9f565b915050611700565b6000818152606760205260408120546001600160a01b031661179157600061086e565b3092915050565b606080836001600160401b038111156117c157634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156117f457816020015b60608152602001906001900390816117df5790505b509150836001600160401b0381111561181d57634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561185057816020015b606081526020019060019003908161183b5790505b50905060005b848110156118f75761188e86868381811061188157634e487b7160e01b600052603260045260246000fd5b9050602002013585612d2a565b8483815181106118ae57634e487b7160e01b600052603260045260246000fd5b602002602001018484815181106118d557634e487b7160e01b600052603260045260246000fd5b60200260200101829052829052505080806118ef90614d9f565b915050611856565b50935093915050565b8161190c610dd0612222565b6119285760405162461bcd60e51b815260040161095c906149aa565b823033141561195c576119396120bc565b81146119575760405162461bcd60e51b815260040161095c90614a8c565b611965565b611965816120d1565b61196e84612231565b6109f086868686613114565b600081815260c96020526040902080546060919061199790614d6a565b80601f01602080910402602001604051908101604052809291908181526020018280546119c390614d6a565b8015611a105780601f106119e557610100808354040283529160200191611a10565b820191906000526020600020905b8154815290600101906020018083116119f357829003601f168201915b50505050509050919050565b6060611a278261205d565b6000611a31613147565b90506000815111611a515760405180602001604052806000815250610dbd565b80611a5b84613157565b604051602001611a6c92919061487f565b6040516020818303038152906040529392505050565b80611a8e610dd0612222565b611aaa5760405162461bcd60e51b815260040161095c906149aa565b8130331415611ade57611abb6120bc565b8114611ad95760405162461bcd60e51b815260040161095c90614a8c565b611ae7565b611ae7816120d1565b610ed08787878787612445565b7f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87546001600160a01b0316611b27612222565b6001600160a01b031614611b4d5760405162461bcd60e51b815260040161095c90614b0e565b6020811415611b70576000611b6482840184614676565b90506114cb8482612510565b6000611b7e8284018461439f565b805190915060005b818110156109f057611bbf86848381518110611bb257634e487b7160e01b600052603260045260246000fd5b6020026020010151612510565b80611bc981614d9f565b915050611b86565b80611bdd610dd0612222565b611bf95760405162461bcd60e51b815260040161095c906149aa565b8130331415611c2d57611c0a6120bc565b8114611c285760405162461bcd60e51b815260040161095c90614a8c565b611c36565b611c36816120d1565b610ed08787878787613270565b6000611c4d612222565b6001600160a01b03811660009081526101356020526040902054909150611cc05760405162461bcd60e51b815260206004820152602160248201527f52656769737472793a20524556455253455f5245434f52445f49535f454d50546044820152605960f81b606482015260840161095c565b61122681613286565b6060816001600160401b03811115611cf157634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015611d2457816020015b6060815260200190600190039081611d0f5790505b50905060005b82811015611d9f57611d61848483818110611d5557634e487b7160e01b600052603260045260246000fd5b9050602002013561197a565b828281518110611d8157634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080611d9790614d9f565b915050611d2a565b5092915050565b610134546001600160a01b0316611dbb612222565b6001600160a01b031614611de15760405162461bcd60e51b815260040161095c90614a45565b61013454611df8906001600160a01b031684612510565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39528383604051611e2a92919061495e565b60405180910390a2505050565b600054610100900460ff1615808015611e575750600054600160ff909116105b80611e715750303b158015611e71575060005460ff166001145b611ed45760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161095c565b6000805460ff191660011790558015611ef7576000805461ff0019166101001790555b61013480546001600160a01b0319166001600160a01b038716179055837f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec9237880546001600160a01b0319166001600160a01b03929092169190911790556040805180820182526013815272556e73746f707061626c6520446f6d61696e7360681b60208083019190915282518084019093526002835261155160f21b90830152611f9f916132cb565b611fa7613319565b611faf613319565b611fb883613342565b611fc182613372565b8015610e43576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050505050565b60006001600160e01b031982166380ac58cd60e01b148061203e57506001600160e01b03198216635b5e139f60e01b145b8061086e57506301ffc9a760e01b6001600160e01b031983161461086e565b6000818152606760205260409020546001600160a01b03166112265760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161095c565b6000303314156120ce5750601f193601355b90565b600081815261010060205260409020546120ec906001614be7565b6000918252610100602052604090912055565b600061210a82611289565b9050806001600160a01b0316836001600160a01b031614156121785760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b606482015260840161095c565b806001600160a01b031661218a612222565b6001600160a01b031614806121a657506121a6816107b6612222565b6122185760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c0000606482015260840161095c565b61097d83836133a2565b600061222c613410565b905090565b61223a8161342c565b60405160200161224c91815260200190565b60408051601f198184030181528282528051602091820120600085815260cb9092529181209190915582917f185c30856dadb58bf097c1f665a52ada7029752dbcad008ea3fefc73bee8c9fe9190a250565b826001600160a01b03166122b182611289565b6001600160a01b0316146123155760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b606482015260840161095c565b6001600160a01b0382166123775760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161095c565b612382838383613458565b61238d6000826133a2565b6001600160a01b03831660009081526068602052604081208054600192906123b6908490614c13565b90915550506001600160a01b03821660009081526068602052604081208054600192906123e4908490614be7565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60005b848110156109f0576124bd86868381811061247357634e487b7160e01b600052603260045260246000fd5b90506020028101906124859190614b50565b8686858181106124a557634e487b7160e01b600052603260045260246000fd5b90506020028101906124b79190614b50565b86612b7f565b806124c781614d9f565b915050612448565b61dead6001600160a01b0383161480159061250157506001600160a01b03821660009081526101356020526040902054155b1561104f5761104f828261297d565b6001600160a01b0382166125665760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161095c565b6000818152606760205260409020546001600160a01b0316156125cb5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161095c565b6125d760008383613458565b6001600160a01b0382166000908152606860205260408120805460019290612600908490614be7565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60006126686129c5565b905061267481836133a2565b600080516020614e3c83398151915254604080516020808201869052825180830390910181528183019283905263e3dec8fb60e01b9092526001600160a01b0390921691829163e3dec8fb916126d19188913091906044016148ae565b600060405180830381600087803b1580156126eb57600080fd5b505af1158015611447573d6000803e3d6000fd5b6060610dbd8360405160200161271591906147d8565b6040516020818303038152906040528051906020012060001c836134f5565b606061273f856120d1565b600080876001600160a01b0316866127598b8a89896135d7565b60405161276691906147d8565b60006040518083038160008787f1925050503d80600081146127a4576040519150601f19603f3d011682016040523d82523d6000602084013e6127a9565b606091505b5090925090506127ba603f87614bff565b5a116127d657634e487b7160e01b600052600160045260246000fd5b61281682826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c4544000000000000815250613607565b9998505050505050505050565b60008061282f83611289565b9050806001600160a01b0316846001600160a01b0316148061287657506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b80610cb15750836001600160a01b031661288f84610906565b6001600160a01b031614949350505050565b805160009081905b8015611d9f576128ea82856128bf600185614c13565b815181106128dd57634e487b7160e01b600052603260045260246000fd5b6020026020010151613640565b9150806128f681614d53565b9150506128a9565b60005b848110156109f05761296b86868381811061292c57634e487b7160e01b600052603260045260246000fd5b9050602002013585858481811061295357634e487b7160e01b600052603260045260246000fd5b90506020028101906129659190614b50565b85612c5e565b8061297581614d9f565b915050612901565b6001600160a01b03821660008181526101356020526040808220849055518392917feb76a21470988c474a21f690cc28fee1ed511bd812dc3c21fd0f49c5e5d4708a91a35050565b600080600080516020614e3c8339815191525460405163721804d360e11b81523060048201526001600160a01b039091169150600090829063e43009a69060240160206040518083038186803b158015612a1e57600080fd5b505afa158015612a32573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a569190614450565b60405163e66f960360e01b8152600481018290529091506001600160a01b0383169063e66f96039060240160206040518083038186803b158015612a9957600080fd5b505afa158015612aad573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ad19190613eae565b9250505090565b6000612ae382611289565b9050612af181600084613458565b612afc6000836133a2565b6001600160a01b0381166000908152606860205260408120805460019290612b25908490614c13565b909155505060008281526067602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60008585604051602001612b9492919061486f565b60408051601f198184030181528282528051602091820120601f8901829004820284018201909252878352909250612be89183918990899081908401838280828437600092019190915250612cfe92505050565b6109f08187878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b0181900481028201810190925289815292508991508890819084018382808284376000920191909152508892506136ed915050565b612c6784613828565b612cb35760405162461bcd60e51b815260206004820152601c60248201527f5265636f726453746f726167653a204b45595f4e4f545f464f554e4400000000604482015260640161095c565b6114cb84612cc08661197a565b85858080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508792506136ed915050565b612d0782613828565b61104f57600082815260c960209081526040909120825161097d92840190613d09565b606080612d368461197a565b9150612d4284846134f5565b90509250929050565b6060600082600081518110612d7057634e487b7160e01b600052603260045260246000fd5b602002602001015190506000600190505b8351811015611d9f5781848281518110612dab57634e487b7160e01b600052603260045260246000fd5b6020026020010151604051602001612dc4929190614833565b60405160208183030381529060405291508080612de090614d9f565b915050612d81565b612df28383612510565b817fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c395282604051612e229190614972565b60405180910390a261097d83836124cf565b6000818152610137602052604081205460ff16801561086e57506101366000612e5b612222565b6001600160a01b0316815260208101919091526040016000205460ff1692915050565b600080516020614e3c83398151915254604051633805550f60e01b81526001600160a01b03909116908190633805550f90612ebf908690869060040161495e565b600060405180830381600087803b158015612ed957600080fd5b505af1158015610ed0573d6000803e3d6000fd5b816001600160a01b0316836001600160a01b03161415612f4f5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161095c565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f9060240160206040518083038186803b158015612ffe57600080fd5b505afa158015613012573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906130369190614450565b905060006130e48660600151805190602001208688602001516040516020016130849392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b905081866020015114801561310a5750855161310a906001600160a01b0316828661384e565b9695505050505050565b61311f84848461229e565b61312b8484848461399e565b6114cb5760405162461bcd60e51b815260040161095c906149f3565b6060610133805461088390614d6a565b60608161317b5750506040805180820190915260018152600360fc1b602082015290565b8160005b81156131a5578061318f81614d9f565b915061319e9050600a83614bff565b915061317f565b6000816001600160401b038111156131cd57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156131f7576020820181803683370190505b5090505b8415610cb15761320c600183614c13565b9150613219600a86614dba565b613224906030614be7565b60f81b81838151811061324757634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350613269600a86614bff565b94506131fb565b61327981612231565b610e438585858585612445565b6001600160a01b03811660008181526101356020526040808220829055517ffcf5eec0cfa3e6332f5f0e63ec242d71f866a61d121d6cdf5c2eb3b668a26c4f9190a250565b600054610100900460ff166132f25760405162461bcd60e51b815260040161095c90614ac3565b8151613305906065906020850190613d09565b50805161097d906066906020840190613d09565b600054610100900460ff166133405760405162461bcd60e51b815260040161095c90614ac3565b565b600054610100900460ff166133695760405162461bcd60e51b815260040161095c90614ac3565b61122681613aaf565b600054610100900460ff166133995760405162461bcd60e51b815260040161095c90614ac3565b61122681613b08565b600081815260696020526040902080546001600160a01b0319166001600160a01b03841690811790915581906133d782611289565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600030331415613427575060331936013560601c90565b503390565b600081815260cb60205260408120541561345457600082815260cb602052604090205461086e565b5090565b6000818152610137602052604090205460ff16158061347f57506001600160a01b03821615155b6134cb5760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a20544f4b454e5f55504752414445440000000000000000604482015260640161095c565b6001600160a01b0383166000908152610135602052604090205481141561097d5761097d83613286565b606061350082612e34565b1561351a575060408051602081019091526000815261086e565b60ca60006135278461342c565b81526020019081526020016000206000848152602001908152602001600020805461355190614d6a565b80601f016020809104026020016040519081016040528092919081815260200182805461357d90614d6a565b80156135ca5780601f1061359f576101008083540402835291602001916135ca565b820191906000526020600020905b8154815290600101906020018083116135ad57829003601f168201915b5050505050905092915050565b60608285856040516020016135ee939291906147f4565b6040516020818303038152906040529050949350505050565b60608315613616575081610dbd565b8251156136265782518084602001fd5b8160405162461bcd60e51b815260040161095c9190614972565b600081516000141561368c5760405162461bcd60e51b815260206004820152601560248201527452656769737472793a204c4142454c5f454d50545960581b604482015260640161095c565b828260405160200161369e91906147d8565b604051602081830303815290604052805190602001206040516020016136ce929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b60ca60006136fa8361342c565b81526020019081526020016000206000858152602001908152602001600020805461372490614d6a565b1515905061377b578260405161373a91906147d8565b6040518091039020817f7ae4f661958fbecc2f77be6b0eb280d2a6f604b29e1e7221c82b9da0c4af7f86856040516137729190614972565b60405180910390a35b8160ca60006137898461342c565b8152602001908152602001600020600086815260200190815260200160002090805190602001906137bb929190613d09565b50816040516137ca91906147d8565b6040518091039020836040516137e091906147d8565b6040518091039020827f851ffe8e74d5015261dba0a1f9e1b0e5d42c5af5d2ad1908fee897c7d80a0d92868660405161381a929190614985565b60405180910390a450505050565b600081815260c960205260408120805482919061384490614d6a565b9050119050919050565b600080600061385d8585613b56565b9092509050600081600481111561388457634e487b7160e01b600052602160045260246000fd5b1480156138a25750856001600160a01b0316826001600160a01b0316145b156138b257600192505050610dbd565b600080876001600160a01b0316631626ba7e60e01b88886040516024016138da929190614945565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252905161391891906147d8565b600060405180830381855afa9150503d8060008114613953576040519150601f19603f3d011682016040523d82523d6000602084013e613958565b606091505b509150915081801561396b575080516020145b801561399257508051630b135d3f60e11b906139909083016020908101908401614450565b145b98975050505050505050565b60006001600160a01b0384163b15613aa757836001600160a01b031663150b7a026139c7612222565b8786866040518563ffffffff1660e01b81526004016139e994939291906148da565b602060405180830381600087803b158015613a0357600080fd5b505af1925050508015613a33575060408051601f3d908101601f19168201909252613a3091810190614484565b60015b613a8d573d808015613a61576040519150601f19603f3d011682016040523d82523d6000602084013e613a66565b606091505b508051613a855760405162461bcd60e51b815260040161095c906149f3565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610cb1565b506001610cb1565b600054610100900460ff16613ad65760405162461bcd60e51b815260040161095c90614ac3565b80600080516020614e3c8339815191525b80546001600160a01b0319166001600160a01b039290921691909117905550565b600054610100900460ff16613b2f5760405162461bcd60e51b815260040161095c90614ac3565b807f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87613ae7565b600080825160411415613b8d5760208301516040840151606085015160001a613b8187828585613b9c565b94509450505050613b95565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613bd35750600090506003613c80565b8460ff16601b14158015613beb57508460ff16601c14155b15613bfc5750600090506004613c80565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613c50573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613c7957600060019250925050613c80565b9150600090505b94509492505050565b828054613c9590614d6a565b90600052602060002090601f016020900481019282613cb75760008555613cfd565b82601f10613cd05782800160ff19823516178555613cfd565b82800160010185558215613cfd579182015b82811115613cfd578235825591602001919060010190613ce2565b50613454929150613d7d565b828054613d1590614d6a565b90600052602060002090601f016020900481019282613d375760008555613cfd565b82601f10613d5057805160ff1916838001178555613cfd565b82800160010185558215613cfd579182015b82811115613cfd578251825591602001919060010190613d62565b5b808211156134545760008155600101613d7e565b60008083601f840112613da3578182fd5b5081356001600160401b03811115613db9578182fd5b6020830191508360208260051b8501011115613b9557600080fd5b80358015158114613de457600080fd5b919050565b60008083601f840112613dfa578182fd5b5081356001600160401b03811115613e10578182fd5b602083019150836020828501011115613b9557600080fd5b600082601f830112613e38578081fd5b81356001600160401b03811115613e5157613e51614dfa565b613e64601f8201601f1916602001614b94565b818152846020838601011115613e78578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215613ea3578081fd5b8135610dbd81614e10565b600060208284031215613ebf578081fd5b8151610dbd81614e10565b60008060408385031215613edc578081fd5b8235613ee781614e10565b91506020830135613ef781614e10565b809150509250929050565b60008060008060808587031215613f17578182fd5b8435613f2281614e10565b93506020850135613f3281614e10565b92506040850135613f4281614e10565b91506060850135613f5281614e10565b939692955090935050565b600080600060608486031215613f71578081fd5b8335613f7c81614e10565b92506020840135613f8c81614e10565b929592945050506040919091013590565b600080600080600060808688031215613fb4578283fd5b8535613fbf81614e10565b94506020860135613fcf81614e10565b93506040860135925060608601356001600160401b03811115613ff0578182fd5b613ffc88828901613de9565b969995985093965092949392505050565b60008060008060808587031215614022578182fd5b843561402d81614e10565b9350602085013561403d81614e10565b92506040850135915060608501356001600160401b0381111561405e578182fd5b61406a87828801613e28565b91505092959194509250565b60008060008060008060006080888a031215614090578485fd5b873561409b81614e10565b965060208801356001600160401b03808211156140b6578687fd5b6140c28b838c01613d92565b909850965060408a01359150808211156140da578384fd5b6140e68b838c01613d92565b909650945060608a01359150808211156140fe578384fd5b5061410b8a828b01613d92565b989b979a50959850939692959293505050565b60008060408385031215614130578182fd5b823561413b81614e10565b9150612d4260208401613dd4565b60008060006040848603121561415d578081fd5b833561416881614e10565b925060208401356001600160401b03811115614182578182fd5b61418e86828701613de9565b9497909650939450505050565b600080604083850312156141ad578182fd5b82356141b881614e10565b946020939093013593505050565b600080600080600080608087890312156141de578384fd5b86356141e981614e10565b95506020870135945060408701356001600160401b038082111561420b578586fd5b6142178a838b01613d92565b9096509450606089013591508082111561422f578384fd5b5061423c89828a01613d92565b979a9699509497509295939492505050565b60008060008060608587031215614263578182fd5b843561426e81614e10565b93506020850135925060408501356001600160401b0381111561428f578283fd5b61429b87828801613de9565b95989497509550505050565b600080602083850312156142b9578182fd5b82356001600160401b038111156142ce578283fd5b6142da85828601613d92565b90969095509350505050565b6000806000806000606086880312156142fd578283fd5b85356001600160401b0380821115614313578485fd5b61431f89838a01613d92565b90975095506020880135915080821115614337578485fd5b5061434488828901613d92565b96999598509660400135949350505050565b60008060006040848603121561436a578081fd5b83356001600160401b0381111561437f578182fd5b61438b86828701613d92565b909790965060209590950135949350505050565b600060208083850312156143b1578182fd5b82356001600160401b038111156143c6578283fd5b8301601f810185136143d6578283fd5b80356143e96143e482614bc4565b614b94565b80828252848201915084840188868560051b8701011115614408578687fd5b8694505b8385101561442a57803583526001949094019391850191850161440c565b50979650505050505050565b600060208284031215614447578081fd5b610dbd82613dd4565b600060208284031215614461578081fd5b5051919050565b600060208284031215614479578081fd5b8135610dbd81614e25565b600060208284031215614495578081fd5b8151610dbd81614e25565b60008060008060008060006080888a0312156144ba578081fd5b87356001600160401b03808211156144d0578283fd5b6144dc8b838c01613de9565b909950975060208a0135965060408a01359150808211156144fb578283fd5b6145078b838c01613d92565b909650945060608a01359150808211156140fe578283fd5b60008060208385031215614531578182fd5b82356001600160401b03811115614546578283fd5b6142da85828601613de9565b600080600080600060608688031215614569578283fd5b85356001600160401b038082111561457f578485fd5b61458b89838a01613de9565b909750955060208801359150808211156145a3578485fd5b5061434488828901613de9565b6000806000604084860312156145c4578081fd5b83356001600160401b038111156145d9578182fd5b61438b86828701613de9565b6000602082840312156145f6578081fd5b81356001600160401b0381111561460b578182fd5b610cb184828501613e28565b60008060006040848603121561462b578081fd5b83356001600160401b0380821115614641578283fd5b9085019060808288031215614654578283fd5b90935060208501359080821115614669578283fd5b5061418e86828701613de9565b600060208284031215614687578081fd5b5035919050565b6000806000604084860312156146a2578081fd5b8335925060208401356001600160401b03811115614182578182fd5b600080600080606085870312156146d3578182fd5b8435935060208501356001600160401b038111156146ef578283fd5b6146fb87828801613de9565b9598909750949560400135949350505050565b60008060408385031215614720578182fd5b50508035926020909101359150565b600081518084526020808501808196508360051b81019150828601855b858110156147765782840389526147648483516147ac565b9885019893509084019060010161474c565b5091979650505050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b600081518084526147c4816020860160208601614d27565b601f01601f19169290920160200192915050565b600082516147ea818460208701614d27565b9190910192915050565b60008451614806818460208901614d27565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b60008351614845818460208801614d27565b601760f91b9083019081528351614863816001840160208801614d27565b01600101949350505050565b8183823760009101908152919050565b60008351614891818460208801614d27565b8351908301906148a5818360208801614d27565b01949350505050565b6001600160a01b03848116825283166020820152606060408201819052600090610b45908301846147ac565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061310a908301846147ac565b602081526000610dbd602083018461472f565b604081526000614933604083018561472f565b8281036020840152610db9818561472f565b828152604060208201526000610cb160408301846147ac565b602081526000610cb1602083018486614783565b602081526000610dbd60208301846147ac565b60408152600061499860408301856147ac565b8281036020840152610db981856147ac565b60208082526029908201527f52656769737472793a2053454e4445525f49535f4e4f545f415050524f5645446040820152682fa7a92fa7aba722a960b91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526027908201527f52656769737472793a2053454e4445525f49535f4e4f545f4d494e54494e475f60408201526626a0a720a3a2a960c91b606082015260800190565b60208082526017908201527f52656769737472793a20544f4b454e5f494e56414c4944000000000000000000604082015260600190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60208082526022908201527f52656769737472793a20494e53554646494349454e545f5045524d495353494f6040820152614e5360f01b606082015260800190565b6000808335601e19843603018112614b66578283fd5b8301803591506001600160401b03821115614b7f578283fd5b602001915036819003821315613b9557600080fd5b604051601f8201601f191681016001600160401b0381118282101715614bbc57614bbc614dfa565b604052919050565b60006001600160401b03821115614bdd57614bdd614dfa565b5060051b60200190565b60008219821115614bfa57614bfa614dce565b500190565b600082614c0e57614c0e614de4565b500490565b600082821015614c2557614c25614dce565b500390565b6000614c386143e484614bc4565b808482526020808301925084368760051b87011115614c55578485fd5b845b87811015614c935781356001600160401b03811115614c74578687fd5b614c8036828a01613e28565b8652509382019390820190600101614c57565b50919695505050505050565b600060808236031215614cb0578081fd5b604051608081016001600160401b038282108183111715614cd357614cd3614dfa565b8160405284359150614ce482614e10565b81835260208501356020840152604085013560408401526060850135915080821115614d0e578384fd5b50614d1b36828601613e28565b60608301525092915050565b60005b83811015614d42578181015183820152602001614d2a565b838111156114cb5750506000910152565b600081614d6257614d62614dce565b506000190190565b600181811c90821680614d7e57607f821691505b6020821081141561147c57634e487b7160e01b600052602260045260246000fd5b6000600019821415614db357614db3614dce565b5060010190565b600082614dc957614dc9614de4565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461122657600080fd5b6001600160e01b03198116811461122657600080fdfebe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafea164736f6c6343000804000a";
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
