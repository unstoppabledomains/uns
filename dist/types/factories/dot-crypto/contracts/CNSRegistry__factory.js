"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CNSRegistry__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "Resolve",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "updateId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Sync",
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
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "addController",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
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
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
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
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "burn",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
        ],
        name: "burnChild",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "label",
                type: "string",
            },
        ],
        name: "childIdOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "pure",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "controlledBurn",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
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
                internalType: "string",
                name: "label",
                type: "string",
            },
        ],
        name: "controlledMintChild",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
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
        name: "controlledResolveTo",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
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
                internalType: "string",
                name: "label",
                type: "string",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "controlledSafeMintChild",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
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
                name: "_data",
                type: "bytes",
            },
        ],
        name: "controlledSafeTransferFrom",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "string",
                name: "prefix",
                type: "string",
            },
        ],
        name: "controlledSetTokenURIPrefix",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
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
        name: "controlledTransferFrom",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
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
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
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
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
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
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "isController",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
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
                internalType: "string",
                name: "label",
                type: "string",
            },
        ],
        name: "mintChild",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
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
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "renounceController",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
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
        name: "resolveTo",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
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
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "root",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "pure",
        type: "function",
    },
    {
        constant: false,
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
                internalType: "string",
                name: "label",
                type: "string",
            },
        ],
        name: "safeMintChild",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
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
                internalType: "string",
                name: "label",
                type: "string",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "safeMintChild",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
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
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
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
                name: "_data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
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
                internalType: "string",
                name: "label",
                type: "string",
            },
        ],
        name: "safeTransferFromChild",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
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
                internalType: "string",
                name: "label",
                type: "string",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "safeTransferFromChild",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "to",
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
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
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
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
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
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "updateId",
                type: "uint256",
            },
        ],
        name: "sync",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
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
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
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
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
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
                internalType: "string",
                name: "label",
                type: "string",
            },
        ],
        name: "transferFromChild",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60806040523480156200001157600080fd5b50620000467f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03620001cf16565b6200005a336001600160e01b036200029e16565b6200008e7f80ac58cd000000000000000000000000000000000000000000000000000000006001600160e01b03620001cf16565b620000b461dead6000805160206200300b8339815191526001600160e01b03620002bc16565b620000e87f5b5e139f000000000000000000000000000000000000000000000000000000006001600160e01b03620001cf16565b6040805180820190915260068082527f63727970746f000000000000000000000000000000000000000000000000000060208301526000620001326001600160e01b036200043916565b81526020019081526020016000209080519060200190620001559291906200059d565b50620001696001600160e01b036200043916565b6040805160208082526006908201527f63727970746f00000000000000000000000000000000000000000000000000008183015290517fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c39529181900360600190a26200063f565b7fffffffff0000000000000000000000000000000000000000000000000000000080821614156200026157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b7fffffffff00000000000000000000000000000000000000000000000000000000166000908152602081905260409020805460ff19166001179055565b620002b98160016200044d60201b6200228e1790919060201c565b50565b6001600160a01b0382166200033257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015290519081900360640190fd5b62000346816001600160e01b03620004f416565b15620003b357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015290519081900360640190fd5b600081815260026020908152604080832080546001600160a01b0319166001600160a01b038716908117909155835260048252909120620003fd9162000511811b6200236117901c565b60405181906001600160a01b038416906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000805160206200300b8339815191525b90565b6200046282826001600160e01b036200051a16565b15620004cf57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b6000908152600260205260409020546001600160a01b0316151590565b80546001019055565b60006001600160a01b0382166200057d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602281526020018062002fe96022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620005e057805160ff191683800117855562000610565b8280016001018555821562000610579182015b8281111562000610578251825591602001919060010190620005f3565b506200061e92915062000622565b5090565b6200044a91905b808211156200061e576000815560010162000629565b61299a806200064f6000396000f3fe608060405234801561001057600080fd5b50600436106102325760003560e01c80637c69eae211610130578063b5466669116100b8578063d284d97a1161007c578063d284d97a14610d4e578063d8d3cc6e14610dbc578063e67ca8a314610e3f578063e985e9c514610e5c578063ebf0c71714610e8a57610232565b8063b5466669146109ce578063b88d4fde14610a51578063c29b52f914610b15578063c87b56dd14610c5e578063ce9fb82b14610c7b57610232565b8063a22cb465116100ff578063a22cb4651461090b578063a7fc7a0714610939578063ab3b87fe1461095f578063b3f9e4cb1461098b578063b429afeb146109a857610232565b80637c69eae21461076457806395d89b41146107e75780639d743989146107ef5780639e5be9a51461087d57610232565b806342842e0e116101be5780635cbe1112116101825780635cbe11121461061d5780636352211e1461069257806366ac3b68146106af57806368b62d32146106b757806370a082311461073e57610232565b806342842e0e146104ed57806342966c6814610523578063430c208114610540578063538361a71461056c57806357aac5741461058f57610232565b8063081812fc11610205578063081812fc146103fa578063095ea7b3146104335780632392c1891461045f57806323b872dd1461048b5780632525d06a146104c157610232565b806301ffc9a71461023757806302759c37146102725780630467e014146102aa57806306fdde031461037d575b600080fd5b61025e6004803603602081101561024d57600080fd5b50356001600160e01b031916610e92565b604080519115158252519081900360200190f35b6102a86004803603606081101561028857600080fd5b506001600160a01b03813581169160208101359091169060400135610eb1565b005b6102a8600480360360808110156102c057600080fd5b6001600160a01b0382351691602081013591810190606081016040820135600160201b8111156102ef57600080fd5b82018360208201111561030157600080fd5b803590602001918460018302840111600160201b8311171561032257600080fd5b919390929091602081019035600160201b81111561033f57600080fd5b82018360208201111561035157600080fd5b803590602001918460018302840111600160201b8311171561037257600080fd5b509092509050610ed3565b610385610f62565b6040805160208082528351818301528351919283929083019185019080838360005b838110156103bf5781810151838201526020016103a7565b50505050905090810190601f1680156103ec5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6104176004803603602081101561041057600080fd5b5035610f84565b604080516001600160a01b039092168252519081900360200190f35b6102a86004803603604081101561044957600080fd5b506001600160a01b038135169060200135610fe6565b6102a86004803603604081101561047557600080fd5b506001600160a01b0381351690602001356110f7565b6102a8600480360360608110156104a157600080fd5b506001600160a01b03813581169160208101359091169060400135611115565b6102a8600480360360408110156104d757600080fd5b506001600160a01b03813516906020013561115a565b6102a86004803603606081101561050357600080fd5b506001600160a01b0381358116916020810135909116906040013561117a565b6102a86004803603602081101561053957600080fd5b5035611195565b61025e6004803603604081101561055657600080fd5b506001600160a01b0381351690602001356111e6565b6102a86004803603604081101561058257600080fd5b50803590602001356111f9565b6102a8600480360360808110156105a557600080fd5b6001600160a01b03823581169260208101359091169160408201359190810190608081016060820135600160201b8111156105df57600080fd5b8201836020820111156105f157600080fd5b803590602001918460018302840111600160201b8311171561061257600080fd5b50909250905061124f565b6102a86004803603604081101561063357600080fd5b81359190810190604081016020820135600160201b81111561065457600080fd5b82018360208201111561066657600080fd5b803590602001918460018302840111600160201b8311171561068757600080fd5b5090925090506112be565b610417600480360360208110156106a857600080fd5b5035611320565b6102a861137a565b61072c600480360360408110156106cd57600080fd5b81359190810190604081016020820135600160201b8111156106ee57600080fd5b82018360208201111561070057600080fd5b803590602001918460018302840111600160201b8311171561072157600080fd5b509092509050611385565b60408051918252519081900360200190f35b61072c6004803603602081101561075457600080fd5b50356001600160a01b03166113cf565b6102a86004803603606081101561077a57600080fd5b6001600160a01b0382351691602081013591810190606081016040820135600160201b8111156107a957600080fd5b8201836020820111156107bb57600080fd5b803590602001918460018302840111600160201b831117156107dc57600080fd5b509092509050611437565b61038561149a565b6102a86004803603608081101561080557600080fd5b6001600160a01b03823581169260208101359091169160408201359190810190608081016060820135600160201b81111561083f57600080fd5b82018360208201111561085157600080fd5b803590602001918460018302840111600160201b8311171561087257600080fd5b5090925090506114b6565b6102a86004803603608081101561089357600080fd5b6001600160a01b03823581169260208101359091169160408201359190810190608081016060820135600160201b8111156108cd57600080fd5b8201836020820111156108df57600080fd5b803590602001918460018302840111600160201b8311171561090057600080fd5b509092509050611506565b6102a86004803603604081101561092157600080fd5b506001600160a01b0381351690602001351515611564565b6102a86004803603602081101561094f57600080fd5b50356001600160a01b0316611630565b6102a86004803603604081101561097557600080fd5b506001600160a01b03813516906020013561164b565b610417600480360360208110156109a157600080fd5b5035611672565b61025e600480360360208110156109be57600080fd5b50356001600160a01b0316611694565b6102a8600480360360608110156109e457600080fd5b6001600160a01b0382351691602081013591810190606081016040820135600160201b811115610a1357600080fd5b820183602082011115610a2557600080fd5b803590602001918460018302840111600160201b83111715610a4657600080fd5b5090925090506116a7565b6102a860048036036080811015610a6757600080fd5b6001600160a01b03823581169260208101359091169160408201359190810190608081016060820135600160201b811115610aa157600080fd5b820183602082011115610ab357600080fd5b803590602001918460018302840111600160201b83111715610ad457600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506116fa945050505050565b6102a8600480360360a0811015610b2b57600080fd5b6001600160a01b03823581169260208101359091169160408201359190810190608081016060820135600160201b811115610b6557600080fd5b820183602082011115610b7757600080fd5b803590602001918460018302840111600160201b83111715610b9857600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b811115610bea57600080fd5b820183602082011115610bfc57600080fd5b803590602001918460018302840111600160201b83111715610c1d57600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061174c945050505050565b61038560048036036020811015610c7457600080fd5b5035611797565b6102a860048036036080811015610c9157600080fd5b6001600160a01b0382351691602081013591810190606081016040820135600160201b811115610cc057600080fd5b820183602082011115610cd257600080fd5b803590602001918460018302840111600160201b83111715610cf357600080fd5b919390929091602081019035600160201b811115610d1057600080fd5b820183602082011115610d2257600080fd5b803590602001918460018302840111600160201b83111715610d4357600080fd5b509092509050611892565b6102a860048036036020811015610d6457600080fd5b810190602081018135600160201b811115610d7e57600080fd5b820183602082011115610d9057600080fd5b803590602001918460018302840111600160201b83111715610db157600080fd5b50909250905061191b565b6102a860048036036060811015610dd257600080fd5b6001600160a01b0382351691602081013591810190606081016040820135600160201b811115610e0157600080fd5b820183602082011115610e1357600080fd5b803590602001918460018302840111600160201b83111715610e3457600080fd5b50909250905061199e565b6102a860048036036020811015610e5557600080fd5b50356119f3565b61025e60048036036040811015610e7257600080fd5b506001600160a01b0381358116916020013516611a05565b61072c611a33565b6001600160e01b03191660009081526020819052604090205460ff1690565b610eba33611694565b610ec357600080fd5b610ece838383611a57565b505050565b610edc33611694565b610ee557600080fd5b610f5a868686868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8a018190048102820181019092528881529250889150879081908401838280828437600092019190915250611a9f92505050565b505050505050565b6040805180820190915260078152662e63727970746f60c81b60208201525b90565b6000610f8f82611ac9565b610fca5760405162461bcd60e51b815260040180806020018281038252602c815260200180612848602c913960400191505060405180910390fd5b506000908152600360205260409020546001600160a01b031690565b6000610ff182611320565b9050806001600160a01b0316836001600160a01b031614156110445760405162461bcd60e51b81526004018080602001828103825260218152602001806128bf6021913960400191505060405180910390fd5b336001600160a01b038216148061106057506110608133611a05565b61109b5760405162461bcd60e51b815260040180806020018281038252603881526020018061279c6038913960400191505060405180910390fd5b60008281526003602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b806111023382611ae6565b61110b57600080fd5b610ece8383611b82565b61111f3382611ae6565b610ec35760405162461bcd60e51b81526004018080602001828103825260318152602001806128e06031913960400191505060405180910390fd5b61116333611694565b61116c57600080fd5b6111768282611b82565b5050565b610ece838383604051806020016040528060008152506116fa565b61119f3382611ae6565b6111da5760405162461bcd60e51b81526004018080602001828103825260308152602001806129366030913960400191505060405180910390fd5b6111e381611bf8565b50565b60006111f28383611ae6565b9392505050565b6000828152600860205260409020546001600160a01b0316331461121c57600080fd5b6040518290829033907ff10fc780c78f994a214c79a2ae8d8b7bfe7cc3f0f935a8f05a29525e71d7f12790600090a45050565b61125833611694565b61126157600080fd5b61126c858585611a57565b6112ae85858585858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611c7992505050565b6112b757600080fd5b5050505050565b826112c93382611ae6565b6112d257600080fd5b61131a6113158585858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611dac92505050565b611bf8565b50505050565b6000818152600260205260408120546001600160a01b0316806113745760405162461bcd60e51b81526004018080602001828103825260298152602001806127fe6029913960400191505060405180910390fd5b92915050565b61138333611e64565b565b60006113c78484848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611dac92505050565b949350505050565b60006001600160a01b0382166114165760405162461bcd60e51b815260040180806020018281038252602a8152602001806127d4602a913960400191505060405180910390fd5b6001600160a01b038216600090815260046020526040902061137490611e75565b826114423382611ae6565b61144b57600080fd5b6112b7858585858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525060408051602081019091529081529250611a9f915050565b604080518082019091526002815261155160f21b602082015290565b6112b785858585858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052506040805160208101909152908152925061174c915050565b826115113382611ae6565b61151a57600080fd5b610f5a868661155f8787878080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611dac92505050565b611a57565b6001600160a01b0382163314156115c2576040805162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015290519081900360640190fd5b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff1916861515908117909155815190815290519293927f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31929181900390910190a35050565b61163933611694565b61164257600080fd5b6111e381611e79565b806116563382611ae6565b61165f57600080fd5b610ece61166b83611320565b8484611e8a565b6000818152600860205260408120546001600160a01b03168061137457600080fd5b600061137460018363ffffffff611fce16565b6116b033611694565b6116b957600080fd5b61131a848484848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061203592505050565b611705848484611115565b61171184848484611c79565b61131a5760405162461bcd60e51b815260040180806020018281038252603281526020018061271a6032913960400191505060405180910390fd5b826117573382611ae6565b61176057600080fd5b600061176c8585611dac565b9050611779878783611a57565b61178587878386611c79565b61178e57600080fd5b50505050505050565b60606117a282611ac9565b6117ab57600080fd5b600760066000848152602001908152602001600020604051602001808380546001816001161561010002031660029004801561181e5780601f106117fc57610100808354040283529182019161181e565b820191906000526020600020905b81548152906001019060200180831161180a575b5050828054600181600116156101000203166002900480156118775780601f10611855576101008083540402835291820191611877565b820191906000526020600020905b815481529060010190602001808311611863575b505060408051601f1981840301815291905295945050505050565b8461189d3382611ae6565b6118a657600080fd5b61178e878787878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b018190048102820181019092528981529250899150889081908401838280828437600092019190915250611a9f92505050565b61192433611694565b61192d57600080fd5b611939600783836125cf565b507f4b120d6a959a84a520fa48f5f937cca0e79129423487af7901213b5d2e89313b828260405180806020018281038252848482818152602001925080828437600083820152604051601f909101601f19169092018290039550909350505050a15050565b826119a93382611ae6565b6119b257600080fd5b6112b7858585858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061203592505050565b6119fc33611694565b6111da57600080fd5b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b7f0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f90565b611a62838383611e8a565b6000818152600860205260409020546001600160a01b031615610ece57600090815260086020526040902080546001600160a01b03191690555050565b611aaa848484612035565b611ac0600085611aba8686611dac565b84611c79565b61131a57600080fd5b6000908152600260205260409020546001600160a01b0316151590565b6000611af182611ac9565b611b2c5760405162461bcd60e51b815260040180806020018281038252602c815260200180612770602c913960400191505060405180910390fd5b6000611b3783611320565b9050806001600160a01b0316846001600160a01b03161480611b725750836001600160a01b0316611b6784610f84565b6001600160a01b0316145b806113c757506113c78185611a05565b611b8b81611ac9565b611b9457600080fd5b6040516001600160a01b0383169082907fb1b34e6d89e1c584527d447f4b29ffad55635a37edeeb564939a6483401b31a590600090a3600090815260086020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b611c018161220f565b6000818152600860205260409020546001600160a01b031615611c3b57600081815260086020526040902080546001600160a01b03191690555b60008181526006602052604090205460026000196101006001841615020190911604156111e35760008181526006602052604081206111e39161264d565b6000611c8d846001600160a01b0316612221565b611c99575060016113c7565b604051630a85bd0160e11b815233600482018181526001600160a01b03888116602485015260448401879052608060648501908152865160848601528651600095928a169463150b7a029490938c938b938b939260a4019060208501908083838e5b83811015611d13578181015183820152602001611cfb565b50505050905090810190601f168015611d405780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b158015611d6257600080fd5b505af1158015611d76573d6000803e3d6000fd5b505050506040513d6020811015611d8c57600080fd5b50516001600160e01b031916630a85bd0160e11b14915050949350505050565b6000815160001415611dbd57600080fd5b82826040516020018082805190602001908083835b60208310611df15780518252601f199092019160209182019101611dd2565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040516020818303038152906040528051906020012060405160200180838152602001828152602001925050506040516020818303038152906040528051906020012060001c905092915050565b6111e360018263ffffffff61222716565b5490565b6111e360018263ffffffff61228e16565b826001600160a01b0316611e9d82611320565b6001600160a01b031614611ee25760405162461bcd60e51b81526004018080602001828103825260298152602001806128966029913960400191505060405180910390fd5b6001600160a01b038216611f275760405162461bcd60e51b815260040180806020018281038252602481526020018061274c6024913960400191505060405180910390fd5b611f308161230f565b6001600160a01b0383166000908152600460205260409020611f519061234a565b6001600160a01b0382166000908152600460205260409020611f7290612361565b60008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60006001600160a01b0382166120155760405162461bcd60e51b81526004018080602001828103825260228152602001806128746022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b60006120418383611dac565b905061204d848261236a565b815161205857600080fd5b61206181611ac9565b61206a57600080fd5b606082600660008681526020019081526020016000206040516020018083805190602001908083835b602083106120b25780518252601f199092019160209182019101612093565b6001836020036101000a03801982511681845116808217855250505050505090500180601760f91b815250600101828054600181600116156101000203166002900480156121375780601f10612115576101008083540402835291820191612137565b820191906000526020600020905b815481529060010190602001808311612123575b505060408051601f19818403018152918152600087815260066020908152919020825192965061216d9550935085019150612691565b50817fc5beef08f693b11c316c0c8394a377a0033c9cf701b8cd8afd79cecef60c3952826040518080602001828103825283818151815260200191508051906020019080838360005b838110156121ce5781810151838201526020016121b6565b50505050905090810190601f1680156121fb5780820380516001836020036101000a031916815260200191505b509250505060405180910390a25050505050565b6111e361221b82611320565b8261249b565b3b151590565b6122318282611fce565b61226c5760405162461bcd60e51b81526004018080602001828103825260218152602001806128276021913960400191505060405180910390fd5b6001600160a01b0316600090815260209190915260409020805460ff19169055565b6122988282611fce565b156122ea576040805162461bcd60e51b815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b6000818152600360205260409020546001600160a01b0316156111e357600090815260036020526040902080546001600160a01b0319169055565b805461235d90600163ffffffff61257216565b9055565b80546001019055565b6001600160a01b0382166123c5576040805162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015290519081900360640190fd5b6123ce81611ac9565b15612420576040805162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015290519081900360640190fd5b600081815260026020908152604080832080546001600160a01b0319166001600160a01b03871690811790915583526004909152902061245f90612361565b60405181906001600160a01b038416906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b816001600160a01b03166124ae82611320565b6001600160a01b0316146124f35760405162461bcd60e51b81526004018080602001828103825260258152602001806129116025913960400191505060405180910390fd5b6124fc8161230f565b6001600160a01b038216600090815260046020526040902061251d9061234a565b60008181526002602052604080822080546001600160a01b0319169055518291906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6000828211156125c9576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106126105782800160ff1982351617855561263d565b8280016001018555821561263d579182015b8281111561263d578235825591602001919060010190612622565b506126499291506126ff565b5090565b50805460018160011615610100020316600290046000825580601f1061267357506111e3565b601f0160209004906000526020600020908101906111e391906126ff565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106126d257805160ff191683800117855561263d565b8280016001018555821561263d579182015b8281111561263d5782518255916020019190600101906126e4565b610f8191905b80821115612649576000815560010161270556fe4552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724552433732313a207472616e7366657220746f20746865207a65726f20616464726573734552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c654552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e526f6c65733a206163636f756e7420697320746865207a65726f20616464726573734552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f7665644552433732313a206275726e206f6620746f6b656e2074686174206973206e6f74206f776e4552433732314275726e61626c653a2063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564a265627a7a72315820fb6a1b26cc352dbb05e6627fd530bbb44114ac3a349f30d1f071136c656d20dc64736f6c634300050c0032526f6c65733a206163636f756e7420697320746865207a65726f20616464726573730f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f";
const isSuperArgs = (xs) => xs.length > 1;
class CNSRegistry__factory extends ethers_1.ContractFactory {
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
exports.CNSRegistry__factory = CNSRegistry__factory;
CNSRegistry__factory.bytecode = _bytecode;
CNSRegistry__factory.abi = _abi;
