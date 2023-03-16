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
const _bytecode = "0x608060405234801561001057600080fd5b50614ded806100206000396000f3fe608060405234801561001057600080fd5b506004361061038e5760003560e01c80637e37479e116101de578063ba5d40b71161010f578063e985e9c5116100ad578063f5c1f76e1161007c578063f5c1f76e14610842578063f7df5c6014610855578063f8c8765e14610868578063ffa1ad741461087b57600080fd5b8063e985e9c5146107e4578063ebf0c71714610820578063ec129eea14610827578063f25eb5c11461083a57600080fd5b8063c87b56dd116100e9578063c87b56dd14610798578063ce92b33e146107ab578063cf2c52cb146107be578063dbe16c07146107d157600080fd5b8063ba5d40b71461075f578063bb5b27e114610772578063bebec6b41461078557600080fd5b8063a3f4df7e1161017c578063ae31844a11610156578063ae31844a14610705578063b3f9e4cb14610718578063b85afd281461072b578063b88d4fde1461074c57600080fd5b8063a3f4df7e146106b3578063a4247400146106df578063ab3b87fe146106f257600080fd5b80639559c0bd116101b85780639559c0bd1461067d57806395d89b411461068557806399e0dd7c1461068d578063a22cb465146106a057600080fd5b80637e37479e1461064457806394d008ef146106575780639508b1c41461066a57600080fd5b806342842e0e116102c35780635096023911610261578063663f7b2a11610230578063663f7b2a146105dc578063672b9f81146105ef5780636ccbae5f1461061057806370a082311461063157600080fd5b80635096023914610587578063572b6c051461059a5780636352211e146105b6578063638e5c78146105c957600080fd5b806347c816991161029d57806347c816991461053b5780634a72584d1461054e5780634f558e791461056157806350382c1a1461057457600080fd5b806342842e0e1461050257806342966c6814610515578063430c20811461052857600080fd5b80631bf7e13e11610330578063276fabb11161030a578063276fabb1146104a857806327f18975146104c9578063310bd74b146104dc57806340c10f19146104ef57600080fd5b80631bf7e13e1461046f5780631f71be061461048257806323b872dd1461049557600080fd5b8063095ea7b31161036c578063095ea7b3146103fb578063150b7a02146104105780631bd8cc1a1461043c5780631be5e7ed1461045c57600080fd5b806301ffc9a71461039357806306fdde03146103bb578063081812fc146103d0575b600080fd5b6103a66103a136600461446c565b61089f565b60405190151581526020015b60405180910390f35b6103c36108b0565b6040516103b29190614996565b6103e36103de36600461469a565b610942565b6040516001600160a01b0390911681526020016103b2565b61040e6104093660046141e7565b610969565b005b61042361041e366004613fd9565b610982565b6040516001600160e01b031990911681526020016103b2565b61044f61044a36600461431a565b610add565b6040516103b29190614931565b6103c361046a3660046145d4565b610bfd565b6103c361047d36600461463b565b610c48565b61040e6104903660046140b2565b610d53565b61040e6104a3366004613f99565b610dfa565b6104bb6104b636600461426b565b610e4d565b6040519081526020016103b2565b61040e6104d73660046142aa565b610e5c565b61040e6104ea36600461469a565b610ea4565b61040e6104fd3660046141e7565b610edf565b61040e610510366004613f99565b610f2c565b61040e61052336600461469a565b610f47565b6103a66105363660046141e7565b610f8b565b61040e610549366004614576565b610f97565b61040e61055c3660046146e2565b610fd6565b6103a661056f36600461469a565b61101c565b61040e610582366004614609565b61103b565b61040e610595366004613ece565b611071565b6103a66105a8366004613ece565b6001600160a01b0316301490565b6103e36105c436600461469a565b6110d1565b61040e6105d736600461469a565b611131565b61040e6105ea366004614363565b61117c565b6106026105fd366004614732565b6111b5565b6040516103b29291906149a9565b6104bb61061e36600461469a565b6000908152610100602052604090205490565b6104bb61063f366004613ece565b6111cd565b6104bb610652366004613ece565b611253565b61040e610665366004614212565b611284565b61040e6106783660046144a4565b6112d3565b6104bb601481565b6103c361135a565b61040e61069b366004614543565b611369565b61040e6106ae36600461416a565b6113ef565b6103c36040518060400160405280600d81526020016c554e533a20526567697374727960981b81525081565b6103a66106ed36600461463b565b611401565b61040e6107003660046141e7565b61144c565b61040e61071336600461426b565b611491565b6103e361072636600461469a565b61153d565b61073e61073936600461431a565b611567565b6040516103b2929190614944565b61040e61075a366004614049565b6116cf565b61040e61076d3660046140b2565b611716565b6103c361078036600461469a565b611787565b6103c3610793366004613ece565b611829565b6103c36107a636600461469a565b6118f3565b61040e6107b93660046142aa565b611959565b61040e6107cc366004614195565b611998565b6103c36107df36600461469a565b611a75565b6103a66107f2366004613f06565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006104bb565b61040e6108353660046142aa565b611a93565b61040e611ad2565b61044f61085036600461426b565b611b58565b61040e6108633660046146b2565b611c35565b61040e610876366004613f3e565b611cc6565b6103c360405180604001604052806005815260200164302e372e3160d81b81525081565b60006108aa82611e9c565b92915050565b6060606580546108bf90614cef565b80601f01602080910402602001604051908101604052809291908181526020018280546108eb90614cef565b80156109385780601f1061090d57610100808354040283529160200191610938565b820191906000526020600020905b81548152906001019060200180831161091b57829003601f168201915b5050505050905090565b600061094d82611eec565b506000908152606960205260409020546001600160a01b031690565b8061097381611f4b565b61097d8383611fb2565b505050565b60007f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378546001600160a01b03166109b76120d5565b6001600160a01b03161415610a79576109ce6120d5565b6001600160a01b03166342966c68856040518263ffffffff1660e01b81526004016109fb91815260200190565b600060405180830381600087803b158015610a1557600080fd5b505af1158015610a29573d6000803e3d6000fd5b505050821580159150610a435750610a438284018461443a565b15610a6157610a5230856120e4565b610a5c8585612232565b610a6b565b610a6b85856120e4565b50630a85bd0160e11b610ad4565b60405162461bcd60e51b815260206004820152602560248201527f52656769737472793a204552433732315f524543454956494e475f50524f4849604482015264109255115160da1b60648201526084015b60405180910390fd5b95945050505050565b6060826001600160401b03811115610b0557634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610b3857816020015b6060815260200190600190039081610b235790505b50905060005b83811015610bf557610bb7858583818110610b6957634e487b7160e01b600052603260045260246000fd5b9050602002810190610b7b9190614b3d565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508792506122dd915050565b828281518110610bd757634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080610bed90614d24565b915050610b3e565b509392505050565b6060610c4084848080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508692506122dd915050565b949350505050565b606060005a9050610c5a858585611401565b610cb65760405162461bcd60e51b815260206004820152602760248201527f554e535265676973747279466f727761726465723a205349474e41545552455f6044820152661253959053125160ca1b6064820152608401610acb565b610d48610cc66020870187613ece565b30604088013584610cda60608b018b614b3d565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8e018190048102820181019092528c815292508c91508b908190840183828082843760009201919091525061231292505050565b9150505b9392505050565b610134546001600160a01b0316610d686120d5565b6001600160a01b031614610d8e5760405162461bcd60e51b8152600401610acb90614a69565b6000610da2610d9d888a614c17565b612401565b9050610dad8161245e565b610dc0610db9826110d1565b8a836124cb565b610dcd8686868685612672565b8115610def57610def8982610dea610de58b8d614c17565b6126fc565b612799565b505050505050505050565b80610e0c610e066120d5565b826127db565b610e285760405162461bcd60e51b8152600401610acb906149ce565b81610e3281611f4b565b610e3b8361245e565b610e468585856124cb565b5050505050565b6000610d4c610d9d8385614c17565b80610e68610e066120d5565b610e845760405162461bcd60e51b8152600401610acb906149ce565b81610e8e81611f4b565b610e9b8787878787612859565b50505050505050565b80610eb0610e066120d5565b610ecc5760405162461bcd60e51b8152600401610acb906149ce565b81610ed681611f4b565b61097d8361245e565b610ee76128d8565b6001600160a01b0316610ef86120d5565b6001600160a01b031614610f1e5760405162461bcd60e51b8152600401610acb90614afb565b610f2882826120e4565b5050565b61097d838383604051806020016040528060008152506116cf565b80610f53610e066120d5565b610f6f5760405162461bcd60e51b8152600401610acb906149ce565b81610f7981611f4b565b610f828361245e565b61097d836129eb565b6000610d4c83836127db565b80610fa3610e066120d5565b610fbf5760405162461bcd60e51b8152600401610acb906149ce565b81610fc981611f4b565b610e9b8787878787612a92565b80610fe2610e066120d5565b610ffe5760405162461bcd60e51b8152600401610acb906149ce565b8161100881611f4b565b61101486868686612b71565b505050505050565b6000818152606760205260408120546001600160a01b031615156108aa565b61106e8160405160200161104f91906147fc565b6040516020818303038152906040528051906020012060001c82612c11565b50565b610134546001600160a01b03166110866120d5565b6001600160a01b0316146110ac5760405162461bcd60e51b8152600401610acb90614a69565b6001600160a01b0316600090815261013660205260409020805460ff19166001179055565b6000818152606760205260408120546001600160a01b0316806108aa5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610acb565b8061113d610e066120d5565b6111595760405162461bcd60e51b8152600401610acb906149ce565b61116b6111646120d5565b30846124cb565b610f286111766120d5565b83612232565b600061118782612401565b905061119281612c3d565b61119b81611f4b565b610f286111a66120d5565b826111b0856126fc565b612cad565b6060806111c28484612d3a565b909590945092505050565b60006001600160a01b0382166112375760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610acb565b506001600160a01b031660009081526068602052604090205490565b6001600160a01b0381166000908152610135602052604081205461127681612d5b565b61127e578091505b50919050565b61128c6128d8565b6001600160a01b031661129d6120d5565b6001600160a01b0316146112c35760405162461bcd60e51b8152600401610acb90614afb565b6112cd84846120e4565b50505050565b6112dd8787612da5565b6112e56120d5565b6001600160a01b03166112f7866110d1565b6001600160a01b03161461134d5760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610acb565b610e9b8484848489612672565b6060606680546108bf90614cef565b610134546001600160a01b031661137e6120d5565b6001600160a01b0316146113a45760405162461bcd60e51b8152600401610acb90614a69565b6113b16101338383613c46565b507f4b120d6a959a84a520fa48f5f937cca0e79129423487af7901213b5d2e89313b82826040516113e3929190614982565b60405180910390a15050565b610f286113fa6120d5565b8383612e14565b6000610c4061140f85614c24565b3085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612ee392505050565b80611458610e066120d5565b6114745760405162461bcd60e51b8152600401610acb906149ce565b8161147e81611f4b565b6112cd61148a846110d1565b85856124cb565b610134546001600160a01b03166114a66120d5565b6001600160a01b0316146114cc5760405162461bcd60e51b8152600401610acb90614a69565b60005b8181101561097d57600161013760008585858181106114fe57634e487b7160e01b600052603260045260246000fd5b90506020020135815260200190815260200160002060006101000a81548160ff021916908315150217905550808061153590614d24565b9150506114cf565b6000818152606760205260408120546001600160a01b03166115605760006108aa565b3092915050565b606080836001600160401b0381111561159057634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156115c357816020015b60608152602001906001900390816115ae5790505b509150836001600160401b038111156115ec57634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561161f57816020015b606081526020019060019003908161160a5790505b50905060005b848110156116c65761165d86868381811061165057634e487b7160e01b600052603260045260246000fd5b9050602002013585612d3a565b84838151811061167d57634e487b7160e01b600052603260045260246000fd5b602002602001018484815181106116a457634e487b7160e01b600052603260045260246000fd5b60200260200101829052829052505080806116be90614d24565b915050611625565b50935093915050565b816116db610e066120d5565b6116f75760405162461bcd60e51b8152600401610acb906149ce565b8261170181611f4b565b61170a8461245e565b6110148686868661303b565b610134546001600160a01b031661172b6120d5565b6001600160a01b0316146117515760405162461bcd60e51b8152600401610acb90614a69565b6000611760610d9d888a614c17565b905061177a8982611774610de58b8d614c17565b8561306e565b610def8686868685612672565b600081815260c9602052604090208054606091906117a490614cef565b80601f01602080910402602001604051908101604052809291908181526020018280546117d090614cef565b801561181d5780601f106117f25761010080835404028352916020019161181d565b820191906000526020600020905b81548152906001019060200180831161180057829003601f168201915b50505050509050919050565b6001600160a01b0381166000908152610135602052604090205460609061184f81612d5b565b61127e57600081815261013860205260409020805461186d90614cef565b80601f016020809104026020016040519081016040528092919081815260200182805461189990614cef565b80156118e65780601f106118bb576101008083540402835291602001916118e6565b820191906000526020600020905b8154815290600101906020018083116118c957829003601f168201915b5050505050915050919050565b60606118fe82611eec565b60006119086130c1565b905060008151116119285760405180602001604052806000815250610d4c565b80611932846130d1565b6040516020016119439291906148a3565b6040516020818303038152906040529392505050565b80611965610e066120d5565b6119815760405162461bcd60e51b8152600401610acb906149ce565b8161198b81611f4b565b610e9b8787878787612672565b7f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87546001600160a01b03166119cb6120d5565b6001600160a01b0316146119f15760405162461bcd60e51b8152600401610acb90614afb565b6020811415611a14576000611a088284018461469a565b90506112cd84826120e4565b6000611a22828401846143a8565b805190915060005b8181101561101457611a6386848381518110611a5657634e487b7160e01b600052603260045260246000fd5b60200260200101516120e4565b80611a6d81614d24565b915050611a2a565b6000818152610138602052604090208054606091906117a490614cef565b80611a9f610e066120d5565b611abb5760405162461bcd60e51b8152600401610acb906149ce565b81611ac581611f4b565b610e9b87878787876131ea565b6000611adc6120d5565b6001600160a01b03811660009081526101356020526040902054909150611b4f5760405162461bcd60e51b815260206004820152602160248201527f52656769737472793a20524556455253455f5245434f52445f49535f454d50546044820152605960f81b6064820152608401610acb565b61106e81613200565b6060816001600160401b03811115611b8057634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015611bb357816020015b6060815260200190600190039081611b9e5790505b50905060005b82811015611c2e57611bf0848483818110611be457634e487b7160e01b600052603260045260246000fd5b90506020020135611787565b828281518110611c1057634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080611c2690614d24565b915050611bb9565b5092915050565b610134546001600160a01b0316611c4a6120d5565b6001600160a01b031614611c705760405162461bcd60e51b8152600401610acb90614a69565b61013454611c87906001600160a01b0316846120e4565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39528383604051611cb9929190614982565b60405180910390a2505050565b600054610100900460ff1615808015611ce65750600054600160ff909116105b80611d005750303b158015611d00575060005460ff166001145b611d635760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610acb565b6000805460ff191660011790558015611d86576000805461ff0019166101001790555b61013480546001600160a01b0319166001600160a01b038716179055837f8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec9237880546001600160a01b0319166001600160a01b03929092169190911790556040805180820182526013815272556e73746f707061626c6520446f6d61696e7360681b60208083019190915282518084019093526002835261155160f21b90830152611e2e91613245565b611e36613293565b611e3e613293565b611e47836132bc565b611e50826132ec565b8015610e46576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050505050565b60006001600160e01b031982166380ac58cd60e01b1480611ecd57506001600160e01b03198216635b5e139f60e01b145b806108aa57506301ffc9a760e01b6001600160e01b03198316146108aa565b6000818152606760205260409020546001600160a01b031661106e5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610acb565b30331415611fa957611f5b61331c565b811461106e5760405162461bcd60e51b815260206004820152601760248201527f52656769737472793a20544f4b454e5f494e56414c49440000000000000000006044820152606401610acb565b61106e81613331565b6000611fbd826110d1565b9050806001600160a01b0316836001600160a01b0316141561202b5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610acb565b806001600160a01b031661203d6120d5565b6001600160a01b031614806120595750612059816107f26120d5565b6120cb5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610acb565b61097d838361335f565b60006120df6133cd565b905090565b6001600160a01b03821661213a5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610acb565b6000818152606760205260409020546001600160a01b03161561219f5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610acb565b6121ab600083836133e9565b6001600160a01b03821660009081526068602052604081208054600192906121d4908490614bd4565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600061223c6128d8565b9050612248818361335f565b600080516020614dc183398151915254604080516020808201869052825180830390910181528183019283905263e3dec8fb60e01b9092526001600160a01b0390921691829163e3dec8fb916122a59188913091906044016148d2565b600060405180830381600087803b1580156122bf57600080fd5b505af11580156122d3573d6000803e3d6000fd5b5050505050505050565b6060610d4c836040516020016122f391906147fc565b6040516020818303038152906040528051906020012060001c83613486565b606061231d85613331565b600080876001600160a01b0316866123378b8a8989613568565b60405161234491906147fc565b60006040518083038160008787f1925050503d8060008114612382576040519150601f19603f3d011682016040523d82523d6000602084013e612387565b606091505b509092509050612398603f87614bec565b5a116123b457634e487b7160e01b600052600160045260246000fd5b6123f482826040518060400160405280601a81526020017f42617365466f727761726465723a2043414c4c5f4641494c4544000000000000815250613598565b9998505050505050505050565b805160009081905b8015611c2e5761244a828561241f600185614c00565b8151811061243d57634e487b7160e01b600052603260045260246000fd5b60200260200101516135d1565b91508061245681614cd8565b915050612409565b6124678161367e565b60405160200161247991815260200190565b60408051601f198184030181528282528051602091820120600085815260cb9092529181209190915582917f185c30856dadb58bf097c1f665a52ada7029752dbcad008ea3fefc73bee8c9fe9190a250565b826001600160a01b03166124de826110d1565b6001600160a01b0316146125425760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610acb565b6001600160a01b0382166125a45760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610acb565b6125af8383836133e9565b6125ba60008261335f565b6001600160a01b03831660009081526068602052604081208054600192906125e3908490614c00565b90915550506001600160a01b0382166000908152606860205260408120805460019290612611908490614bd4565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60005b84811015611014576126ea8686838181106126a057634e487b7160e01b600052603260045260246000fd5b90506020028101906126b29190614b3d565b8686858181106126d257634e487b7160e01b600052603260045260246000fd5b90506020028101906126e49190614b3d565b86612a92565b806126f481614d24565b915050612675565b606060008260008151811061272157634e487b7160e01b600052603260045260246000fd5b602002602001015190506000600190505b8351811015611c2e578184828151811061275c57634e487b7160e01b600052603260045260246000fd5b6020026020010151604051602001612775929190614857565b6040516020818303038152906040529150808061279190614d24565b915050612732565b61dead6001600160a01b038416148015906127cb57506001600160a01b03831660009081526101356020526040902054155b1561097d5761097d838383612cad565b6000806127e7836110d1565b9050806001600160a01b0316846001600160a01b0316148061282e57506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b80610c405750836001600160a01b031661284784610942565b6001600160a01b031614949350505050565b60005b84811015611014576128c686868381811061288757634e487b7160e01b600052603260045260246000fd5b905060200201358585848181106128ae57634e487b7160e01b600052603260045260246000fd5b90506020028101906128c09190614b3d565b85612b71565b806128d081614d24565b91505061285c565b600080600080516020614dc18339815191525460405163721804d360e11b81523060048201526001600160a01b039091169150600090829063e43009a69060240160206040518083038186803b15801561293157600080fd5b505afa158015612945573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129699190614454565b60405163e66f960360e01b8152600481018290529091506001600160a01b0383169063e66f96039060240160206040518083038186803b1580156129ac57600080fd5b505afa1580156129c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129e49190613eea565b9250505090565b60006129f6826110d1565b9050612a04816000846133e9565b612a0f60008361335f565b6001600160a01b0381166000908152606860205260408120805460019290612a38908490614c00565b909155505060008281526067602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60008585604051602001612aa7929190614893565b60408051601f198184030181528282528051602091820120601f8901829004820284018201909252878352909250612afb9183918990899081908401838280828437600092019190915250612c1192505050565b6110148187878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b0181900481028201810190925289815292508991508890819084018382808284376000920191909152508892506136aa915050565b612b7a846137e5565b612bc65760405162461bcd60e51b815260206004820152601c60248201527f5265636f726453746f726167653a204b45595f4e4f545f464f554e44000000006044820152606401610acb565b6112cd84612bd386611787565b85858080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508792506136aa915050565b612c1a826137e5565b610f2857600082815260c960209081526040909120825161097d92840190613cc6565b612c456120d5565b6001600160a01b0316612c57826110d1565b6001600160a01b03161461106e5760405162461bcd60e51b815260206004820152601d60248201527f52656769737472793a2053454e4445525f49535f4e4f545f4f574e45520000006044820152606401610acb565b6000828152610138602052604090208054612cc790614cef565b15159050612cf1576000828152610138602090815260409091208251612cef92840190613cc6565b505b6001600160a01b03831660008181526101356020526040808220859055518492917feb76a21470988c474a21f690cc28fee1ed511bd812dc3c21fd0f49c5e5d4708a91a3505050565b606080612d4684611787565b9150612d528484613486565b90509250929050565b6000818152610137602052604081205460ff1680156108aa57506101366000612d826120d5565b6001600160a01b0316815260208101919091526040016000205460ff1692915050565b600080516020614dc183398151915254604051633805550f60e01b81526001600160a01b03909116908190633805550f90612de69086908690600401614982565b600060405180830381600087803b158015612e0057600080fd5b505af1158015610e9b573d6000803e3d6000fd5b816001600160a01b0316836001600160a01b03161415612e765760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610acb565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6040838101519051636ccbae5f60e01b8152600481019190915260009081903090636ccbae5f9060240160206040518083038186803b158015612f2557600080fd5b505afa158015612f39573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612f5d9190614454565b9050600061300b866060015180519060200120868860200151604051602001612fab9392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b905081866020015114801561303157508551613031906001600160a01b0316828661380b565b9695505050505050565b6130468484846124cb565b6130528484848461395b565b6112cd5760405162461bcd60e51b8152600401610acb90614a17565b61307884846120e4565b827fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c3952836040516130a89190614996565b60405180910390a280156112cd576112cd848484612799565b606061013380546108bf90614cef565b6060816130f55750506040805180820190915260018152600360fc1b602082015290565b8160005b811561311f578061310981614d24565b91506131189050600a83614bec565b91506130f9565b6000816001600160401b0381111561314757634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015613171576020820181803683370190505b5090505b8415610c4057613186600183614c00565b9150613193600a86614d3f565b61319e906030614bd4565b60f81b8183815181106131c157634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506131e3600a86614bec565b9450613175565b6131f38161245e565b610e468585858585612672565b6001600160a01b03811660008181526101356020526040808220829055517ffcf5eec0cfa3e6332f5f0e63ec242d71f866a61d121d6cdf5c2eb3b668a26c4f9190a250565b600054610100900460ff1661326c5760405162461bcd60e51b8152600401610acb90614ab0565b815161327f906065906020850190613cc6565b50805161097d906066906020840190613cc6565b600054610100900460ff166132ba5760405162461bcd60e51b8152600401610acb90614ab0565b565b600054610100900460ff166132e35760405162461bcd60e51b8152600401610acb90614ab0565b61106e81613a6c565b600054610100900460ff166133135760405162461bcd60e51b8152600401610acb90614ab0565b61106e81613ac5565b60003033141561332e5750601f193601355b90565b6000818152610100602052604090205461334c906001614bd4565b6000918252610100602052604090912055565b600081815260696020526040902080546001600160a01b0319166001600160a01b0384169081179091558190613394826110d1565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000303314156133e4575060331936013560601c90565b503390565b6000818152610137602052604090205460ff16158061341057506001600160a01b03821615155b61345c5760405162461bcd60e51b815260206004820152601860248201527f52656769737472793a20544f4b454e5f555047524144454400000000000000006044820152606401610acb565b6001600160a01b0383166000908152610135602052604090205481141561097d5761097d83613200565b606061349182612d5b565b156134ab57506040805160208101909152600081526108aa565b60ca60006134b88461367e565b8152602001908152602001600020600084815260200190815260200160002080546134e290614cef565b80601f016020809104026020016040519081016040528092919081815260200182805461350e90614cef565b801561355b5780601f106135305761010080835404028352916020019161355b565b820191906000526020600020905b81548152906001019060200180831161353e57829003601f168201915b5050505050905092915050565b606082858560405160200161357f93929190614818565b6040516020818303038152906040529050949350505050565b606083156135a7575081610d4c565b8251156135b75782518084602001fd5b8160405162461bcd60e51b8152600401610acb9190614996565b600081516000141561361d5760405162461bcd60e51b815260206004820152601560248201527452656769737472793a204c4142454c5f454d50545960581b6044820152606401610acb565b828260405160200161362f91906147fc565b6040516020818303038152906040528051906020012060405160200161365f929190918252602082015260400190565b60408051601f1981840301815291905280516020909101209392505050565b600081815260cb6020526040812054156136a657600082815260cb60205260409020546108aa565b5090565b60ca60006136b78361367e565b8152602001908152602001600020600085815260200190815260200160002080546136e190614cef565b1515905061373857826040516136f791906147fc565b6040518091039020817f7ae4f661958fbecc2f77be6b0eb280d2a6f604b29e1e7221c82b9da0c4af7f868560405161372f9190614996565b60405180910390a35b8160ca60006137468461367e565b815260200190815260200160002060008681526020019081526020016000209080519060200190613778929190613cc6565b508160405161378791906147fc565b60405180910390208360405161379d91906147fc565b6040518091039020827f851ffe8e74d5015261dba0a1f9e1b0e5d42c5af5d2ad1908fee897c7d80a0d9286866040516137d79291906149a9565b60405180910390a450505050565b600081815260c960205260408120805482919061380190614cef565b9050119050919050565b600080600061381a8585613b13565b9092509050600081600481111561384157634e487b7160e01b600052602160045260246000fd5b14801561385f5750856001600160a01b0316826001600160a01b0316145b1561386f57600192505050610d4c565b600080876001600160a01b0316631626ba7e60e01b8888604051602401613897929190614969565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516138d591906147fc565b600060405180830381855afa9150503d8060008114613910576040519150601f19603f3d011682016040523d82523d6000602084013e613915565b606091505b5091509150818015613928575080516020145b801561394f57508051630b135d3f60e11b9061394d9083016020908101908401614454565b145b98975050505050505050565b60006001600160a01b0384163b15613a6457836001600160a01b031663150b7a026139846120d5565b8786866040518563ffffffff1660e01b81526004016139a694939291906148fe565b602060405180830381600087803b1580156139c057600080fd5b505af19250505080156139f0575060408051601f3d908101601f191682019092526139ed91810190614488565b60015b613a4a573d808015613a1e576040519150601f19603f3d011682016040523d82523d6000602084013e613a23565b606091505b508051613a425760405162461bcd60e51b8152600401610acb90614a17565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610c40565b506001610c40565b600054610100900460ff16613a935760405162461bcd60e51b8152600401610acb90614ab0565b80600080516020614dc18339815191525b80546001600160a01b0319166001600160a01b039290921691909117905550565b600054610100900460ff16613aec5760405162461bcd60e51b8152600401610acb90614ab0565b807f8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87613aa4565b600080825160411415613b4a5760208301516040840151606085015160001a613b3e87828585613b59565b94509450505050613b52565b506000905060025b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115613b905750600090506003613c3d565b8460ff16601b14158015613ba857508460ff16601c14155b15613bb95750600090506004613c3d565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613c0d573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613c3657600060019250925050613c3d565b9150600090505b94509492505050565b828054613c5290614cef565b90600052602060002090601f016020900481019282613c745760008555613cba565b82601f10613c8d5782800160ff19823516178555613cba565b82800160010185558215613cba579182015b82811115613cba578235825591602001919060010190613c9f565b506136a6929150613d3a565b828054613cd290614cef565b90600052602060002090601f016020900481019282613cf45760008555613cba565b82601f10613d0d57805160ff1916838001178555613cba565b82800160010185558215613cba579182015b82811115613cba578251825591602001919060010190613d1f565b5b808211156136a65760008155600101613d3b565b6000613d62613d5d84614bb1565b614b81565b9050808382526020808301915083868660051b86011115613d8257600080fd5b6000805b87811015613dc25782356001600160401b03811115613da3578283fd5b613daf8a828a01613e64565b8652509383019391830191600101613d86565b50505050509392505050565b60008083601f840112613ddf578182fd5b5081356001600160401b03811115613df5578182fd5b6020830191508360208260051b8501011115613b5257600080fd5b80358015158114613e2057600080fd5b919050565b60008083601f840112613e36578182fd5b5081356001600160401b03811115613e4c578182fd5b602083019150836020828501011115613b5257600080fd5b600082601f830112613e74578081fd5b81356001600160401b03811115613e8d57613e8d614d7f565b613ea0601f8201601f1916602001614b81565b818152846020838601011115613eb4578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215613edf578081fd5b8135610d4c81614d95565b600060208284031215613efb578081fd5b8151610d4c81614d95565b60008060408385031215613f18578081fd5b8235613f2381614d95565b91506020830135613f3381614d95565b809150509250929050565b60008060008060808587031215613f53578182fd5b8435613f5e81614d95565b93506020850135613f6e81614d95565b92506040850135613f7e81614d95565b91506060850135613f8e81614d95565b939692955090935050565b600080600060608486031215613fad578081fd5b8335613fb881614d95565b92506020840135613fc881614d95565b929592945050506040919091013590565b600080600080600060808688031215613ff0578283fd5b8535613ffb81614d95565b9450602086013561400b81614d95565b93506040860135925060608601356001600160401b0381111561402c578182fd5b61403888828901613e25565b969995985093965092949392505050565b6000806000806080858703121561405e578182fd5b843561406981614d95565b9350602085013561407981614d95565b92506040850135915060608501356001600160401b0381111561409a578182fd5b6140a687828801613e64565b91505092959194509250565b60008060008060008060008060a0898b0312156140cd578586fd5b88356140d881614d95565b975060208901356001600160401b03808211156140f3578788fd5b6140ff8c838d01613dce565b909950975060408b0135915080821115614117578485fd5b6141238c838d01613dce565b909750955060608b013591508082111561413b578485fd5b506141488b828c01613dce565b909450925061415b905060808a01613e10565b90509295985092959890939650565b6000806040838503121561417c578182fd5b823561418781614d95565b9150612d5260208401613e10565b6000806000604084860312156141a9578081fd5b83356141b481614d95565b925060208401356001600160401b038111156141ce578182fd5b6141da86828701613e25565b9497909650939450505050565b600080604083850312156141f9578182fd5b823561420481614d95565b946020939093013593505050565b60008060008060608587031215614227578182fd5b843561423281614d95565b93506020850135925060408501356001600160401b03811115614253578283fd5b61425f87828801613e25565b95989497509550505050565b6000806020838503121561427d578182fd5b82356001600160401b03811115614292578283fd5b61429e85828601613dce565b90969095509350505050565b6000806000806000606086880312156142c1578283fd5b85356001600160401b03808211156142d7578485fd5b6142e389838a01613dce565b909750955060208801359150808211156142fb578485fd5b5061430888828901613dce565b96999598509660400135949350505050565b60008060006040848603121561432e578081fd5b83356001600160401b03811115614343578182fd5b61434f86828701613dce565b909790965060209590950135949350505050565b600060208284031215614374578081fd5b81356001600160401b03811115614389578182fd5b8201601f81018413614399578182fd5b610c4084823560208401613d4f565b600060208083850312156143ba578182fd5b82356001600160401b038111156143cf578283fd5b8301601f810185136143df578283fd5b80356143ed613d5d82614bb1565b80828252848201915084840188868560051b870101111561440c578687fd5b8694505b8385101561442e578035835260019490940193918501918501614410565b50979650505050505050565b60006020828403121561444b578081fd5b610d4c82613e10565b600060208284031215614465578081fd5b5051919050565b60006020828403121561447d578081fd5b8135610d4c81614daa565b600060208284031215614499578081fd5b8151610d4c81614daa565b60008060008060008060006080888a0312156144be578081fd5b87356001600160401b03808211156144d4578283fd5b6144e08b838c01613e25565b909950975060208a0135965060408a01359150808211156144ff578283fd5b61450b8b838c01613dce565b909650945060608a0135915080821115614523578283fd5b506145308a828b01613dce565b989b979a50959850939692959293505050565b60008060208385031215614555578182fd5b82356001600160401b0381111561456a578283fd5b61429e85828601613e25565b60008060008060006060868803121561458d578283fd5b85356001600160401b03808211156145a3578485fd5b6145af89838a01613e25565b909750955060208801359150808211156145c7578485fd5b5061430888828901613e25565b6000806000604084860312156145e8578081fd5b83356001600160401b038111156145fd578182fd5b61434f86828701613e25565b60006020828403121561461a578081fd5b81356001600160401b0381111561462f578182fd5b610c4084828501613e64565b60008060006040848603121561464f578081fd5b83356001600160401b0380821115614665578283fd5b9085019060808288031215614678578283fd5b9093506020850135908082111561468d578283fd5b506141da86828701613e25565b6000602082840312156146ab578081fd5b5035919050565b6000806000604084860312156146c6578081fd5b8335925060208401356001600160401b038111156141ce578182fd5b600080600080606085870312156146f7578182fd5b8435935060208501356001600160401b03811115614713578283fd5b61471f87828801613e25565b9598909750949560400135949350505050565b60008060408385031215614744578182fd5b50508035926020909101359150565b600081518084526020808501808196508360051b81019150828601855b8581101561479a5782840389526147888483516147d0565b98850198935090840190600101614770565b5091979650505050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b600081518084526147e8816020860160208601614cac565b601f01601f19169290920160200192915050565b6000825161480e818460208701614cac565b9190910192915050565b6000845161482a818460208901614cac565b60609490941b6bffffffffffffffffffffffff191691909301908152601481019190915260340192915050565b60008351614869818460208801614cac565b601760f91b9083019081528351614887816001840160208801614cac565b01600101949350505050565b8183823760009101908152919050565b600083516148b5818460208801614cac565b8351908301906148c9818360208801614cac565b01949350505050565b6001600160a01b03848116825283166020820152606060408201819052600090610ad4908301846147d0565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090613031908301846147d0565b602081526000610d4c6020830184614753565b6040815260006149576040830185614753565b8281036020840152610d488185614753565b828152604060208201526000610c4060408301846147d0565b602081526000610c406020830184866147a7565b602081526000610d4c60208301846147d0565b6040815260006149bc60408301856147d0565b8281036020840152610d4881856147d0565b60208082526029908201527f52656769737472793a2053454e4445525f49535f4e4f545f415050524f5645446040820152682fa7a92fa7aba722a960b91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526027908201527f52656769737472793a2053454e4445525f49535f4e4f545f4d494e54494e475f60408201526626a0a720a3a2a960c91b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60208082526022908201527f52656769737472793a20494e53554646494349454e545f5045524d495353494f6040820152614e5360f01b606082015260800190565b6000808335601e19843603018112614b53578283fd5b8301803591506001600160401b03821115614b6c578283fd5b602001915036819003821315613b5257600080fd5b604051601f8201601f191681016001600160401b0381118282101715614ba957614ba9614d7f565b604052919050565b60006001600160401b03821115614bca57614bca614d7f565b5060051b60200190565b60008219821115614be757614be7614d53565b500190565b600082614bfb57614bfb614d69565b500490565b600082821015614c1257614c12614d53565b500390565b6000610d4c368484613d4f565b600060808236031215614c35578081fd5b604051608081016001600160401b038282108183111715614c5857614c58614d7f565b8160405284359150614c6982614d95565b81835260208501356020840152604085013560408401526060850135915080821115614c93578384fd5b50614ca036828601613e64565b60608301525092915050565b60005b83811015614cc7578181015183820152602001614caf565b838111156112cd5750506000910152565b600081614ce757614ce7614d53565b506000190190565b600181811c90821680614d0357607f821691505b6020821081141561127e57634e487b7160e01b600052602260045260246000fd5b6000600019821415614d3857614d38614d53565b5060010190565b600082614d4e57614d4e614d69565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461106e57600080fd5b6001600160e01b03198116811461106e57600080fdfebe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafea164736f6c6343000804000a";
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
