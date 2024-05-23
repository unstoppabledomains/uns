"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicResolver__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract ENS",
                name: "_ens",
                type: "address",
            },
            {
                internalType: "contract INameWrapper",
                name: "wrapperAddress",
                type: "address",
            },
            {
                internalType: "address",
                name: "_trustedETHController",
                type: "address",
            },
            {
                internalType: "address",
                name: "_trustedReverseRegistrar",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "contentType",
                type: "uint256",
            },
        ],
        name: "ABIChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "a",
                type: "address",
            },
        ],
        name: "AddrChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "coinType",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "newAddress",
                type: "bytes",
            },
        ],
        name: "AddressChanged",
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
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "delegate",
                type: "address",
            },
            {
                indexed: true,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "Approved",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "hash",
                type: "bytes",
            },
        ],
        name: "ContenthashChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "name",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "uint16",
                name: "resource",
                type: "uint16",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "record",
                type: "bytes",
            },
        ],
        name: "DNSRecordChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "name",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "uint16",
                name: "resource",
                type: "uint16",
            },
        ],
        name: "DNSRecordDeleted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "lastzonehash",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "zonehash",
                type: "bytes",
            },
        ],
        name: "DNSZonehashChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes4",
                name: "interfaceID",
                type: "bytes4",
            },
            {
                indexed: false,
                internalType: "address",
                name: "implementer",
                type: "address",
            },
        ],
        name: "InterfaceChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "string",
                name: "name",
                type: "string",
            },
        ],
        name: "NameChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "x",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "y",
                type: "bytes32",
            },
        ],
        name: "PubkeyChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "string",
                name: "indexedKey",
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
        name: "TextChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint64",
                name: "newVersion",
                type: "uint64",
            },
        ],
        name: "VersionChanged",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "contentTypes",
                type: "uint256",
            },
        ],
        name: "ABI",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "addr",
        outputs: [
            {
                internalType: "address payable",
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
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "coinType",
                type: "uint256",
            },
        ],
        name: "addr",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "delegate",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
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
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "clearRecords",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "contenthash",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "name",
                type: "bytes32",
            },
            {
                internalType: "uint16",
                name: "resource",
                type: "uint16",
            },
        ],
        name: "dnsRecord",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "name",
                type: "bytes32",
            },
        ],
        name: "hasDNSRecords",
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
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "bytes4",
                name: "interfaceID",
                type: "bytes4",
            },
        ],
        name: "interfaceImplementer",
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
                name: "owner",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "delegate",
                type: "address",
            },
        ],
        name: "isApprovedFor",
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
                name: "account",
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
        inputs: [
            {
                internalType: "bytes32",
                name: "nodehash",
                type: "bytes32",
            },
            {
                internalType: "bytes[]",
                name: "data",
                type: "bytes[]",
            },
        ],
        name: "multicallWithNodeCheck",
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
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
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
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "pubkey",
        outputs: [
            {
                internalType: "bytes32",
                name: "x",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "y",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "recordVersions",
        outputs: [
            {
                internalType: "uint64",
                name: "",
                type: "uint64",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "contentType",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "setABI",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "coinType",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "a",
                type: "bytes",
            },
        ],
        name: "setAddr",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "a",
                type: "address",
            },
        ],
        name: "setAddr",
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
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "hash",
                type: "bytes",
            },
        ],
        name: "setContenthash",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "setDNSRecords",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "bytes4",
                name: "interfaceID",
                type: "bytes4",
            },
            {
                internalType: "address",
                name: "implementer",
                type: "address",
            },
        ],
        name: "setInterface",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "string",
                name: "newName",
                type: "string",
            },
        ],
        name: "setName",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "x",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "y",
                type: "bytes32",
            },
        ],
        name: "setPubkey",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
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
        name: "setText",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "hash",
                type: "bytes",
            },
        ],
        name: "setZonehash",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceID",
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
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "string",
                name: "key",
                type: "string",
            },
        ],
        name: "text",
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
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "zonehash",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x61010060405234801562000011575f80fd5b5060405162002ef638038062002ef6833981016040819052620000349162000172565b6040516302571be360e01b81527f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e26004820152849033905f906001600160a01b038416906302571be390602401602060405180830381865afa1580156200009d573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190620000c39190620001d7565b604051630f41a04d60e11b81526001600160a01b03848116600483015291925090821690631e83409a906024016020604051808303815f875af11580156200010d573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190620001339190620001fc565b5050506001600160a01b039485166080525091831660a052821660c0521660e05262000214565b6001600160a01b03811681146200016f575f80fd5b50565b5f805f806080858703121562000186575f80fd5b845162000193816200015a565b6020860151909450620001a6816200015a565b6040860151909350620001b9816200015a565b6060860151909250620001cc816200015a565b939692955090935050565b5f60208284031215620001e8575f80fd5b8151620001f5816200015a565b9392505050565b5f602082840312156200020d575f80fd5b5051919050565b60805160a05160c05160e051612ca76200024f5f395f6116c801525f61169601525f818161178401526117d101525f61170f0152612ca75ff3fe608060405234801561000f575f80fd5b50600436106101d1575f3560e01c80638b95dd71116100fe578063c86902331161009e578063e32954eb1161006e578063e32954eb146104f2578063e59d895d14610505578063e985e9c514610518578063f1cb7e0614610553575f80fd5b8063c869023314610435578063ce3decdc1461048c578063d5fa2b001461049f578063d700ff33146104b2575f80fd5b8063a8fa5682116100d9578063a8fa5682146103ac578063a9784b3e146103bf578063ac9650d814610402578063bc1c58d114610422575f80fd5b80638b95dd7114610373578063a22cb46514610386578063a4b91a0114610399575f80fd5b80633603d758116101745780635c98042b116101445780635c98042b14610327578063623195b01461033a578063691f34311461034d5780637737221314610360575f80fd5b80633603d758146102975780633b3b57de146102aa5780634cbf6ba4146102bd57806359d1d43c14610307575f80fd5b8063124a319c116101af578063124a319c146102255780632203ab561461025057806329cd62ea14610271578063304e6ade14610284575f80fd5b806301ffc9a7146101d55780630af179d7146101fd57806310f13a8c14610212575b5f80fd5b6101e86101e3366004612267565b610566565b60405190151581526020015b60405180910390f35b61021061020b3660046122bd565b610576565b005b610210610220366004612304565b610778565b610238610233366004612377565b610842565b6040516001600160a01b0390911681526020016101f4565b61026361025e3660046123a1565b610a87565b6040516101f492919061240e565b61021061027f366004612426565b610bb5565b6102106102923660046122bd565b610c4d565b6102106102a536600461244f565b610cc6565b6102386102b836600461244f565b610d64565b6101e86102cb3660046123a1565b5f82815260208181526040808320546001600160401b031683526006825280832094835293815283822092825291909152205461ffff16151590565b61031a6103153660046122bd565b610d93565b6040516101f49190612466565b61031a61033536600461244f565b610e6f565b610210610348366004612478565b610f2a565b61031a61035b36600461244f565b610fc2565b61021061036e3660046122bd565b610ffa565b6102106103813660046124da565b611073565b6102106103943660046125b9565b611150565b6102106103a73660046125e3565b61122a565b61031a6103ba36600461261e565b6112f6565b6101e86103cd36600461265a565b6001600160a01b039283165f908152600c60209081526040808320948352938152838220929094168152925290205460ff1690565b6104156104103660046126ce565b611342565b6040516101f4919061270c565b61031a61043036600461244f565b61134f565b61047761044336600461244f565b5f81815260208181526040808320546001600160401b03168352600982528083209383529290522080546001909101549091565b604080519283526020830191909152016101f4565b61021061049a3660046122bd565b611387565b6102106104ad36600461276e565b6114c3565b6104da6104c036600461244f565b5f602081905290815260409020546001600160401b031681565b6040516001600160401b0390911681526020016101f4565b61041561050036600461279c565b6114e9565b6102106105133660046127d6565b6114fe565b6101e8610526366004612808565b6001600160a01b039182165f908152600b6020908152604080832093909416825291909152205460ff1690565b61031a6105613660046123a1565b6115a2565b5f61057082611666565b92915050565b826105808161168a565b610588575f80fd5b5f84815260208181526040808320548151601f87018490048402810184019092528582528392606092839285926001600160401b039091169183916105eb9183918d908d90819084018382808284375f9201919091525092939250506118b79050565b90505b80515160208201511015610712578661ffff165f03610652578060400151965061061781611912565b94508460405160200161062a9190612834565b60405160208183030381529060405280519060200120925061064b81611933565b9350610704565b5f61065c82611912565b9050816040015161ffff168861ffff16141580610680575061067e868261194f565b155b15610702576106db8c878a8e8e8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f92019190915250505060208801518d91506106d2908290612863565b8b51158a61196a565b8160400151975081602001519650809550858051906020012093506106ff82611933565b94505b505b61070d81611bc9565b6105ee565b5083511561076c5761076c8a85888c8c8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152508c925061076391508290508f612863565b8951158861196a565b50505050505050505050565b846107828161168a565b61078a575f80fd5b5f86815260208181526040808320546001600160401b03168352600a8252808320898452909152908190209051849184916107c89089908990612876565b908152602001604051809103902091826107e3929190612901565b5084846040516107f4929190612876565b6040518091039020867f448bc014f1536726cf8d54ff3d6481ed3cbc683c2591ca204274009afa09b1a18787878760405161083294939291906129e2565b60405180910390a3505050505050565b5f82815260208181526040808320546001600160401b031683526007825280832085845282528083206001600160e01b0319851684529091528120546001600160a01b03168015610894579050610570565b5f61089e85610d64565b90506001600160a01b0381166108b8575f92505050610570565b6040516301ffc9a760e01b60248201525f9081906001600160a01b0384169060440160408051601f198184030181529181526020820180516001600160e01b03166301ffc9a760e01b1790525161090f9190612834565b5f60405180830381855afa9150503d805f8114610947576040519150601f19603f3d011682016040523d82523d5f602084013e61094c565b606091505b509150915081158061095f575060208151105b80610989575080601f8151811061097857610978612a13565b01602001516001600160f81b031916155b1561099a575f945050505050610570565b6040516001600160e01b0319871660248201526001600160a01b0384169060440160408051601f198184030181529181526020820180516001600160e01b03166301ffc9a760e01b179052516109f09190612834565b5f60405180830381855afa9150503d805f8114610a28576040519150601f19603f3d011682016040523d82523d5f602084013e610a2d565b606091505b509092509050811580610a41575060208151105b80610a6b575080601f81518110610a5a57610a5a612a13565b01602001516001600160f81b031916155b15610a7c575f945050505050610570565b509095945050505050565b5f82815260208181526040808320546001600160401b03168352600180835281842086855290925282206060915b848111610b975780851615801590610ae457505f8181526020839052604081208054610ae090612885565b9050115b15610b8f5780825f8381526020019081526020015f20808054610b0690612885565b80601f0160208091040260200160405190810160405280929190818152602001828054610b3290612885565b8015610b7d5780601f10610b5457610100808354040283529160200191610b7d565b820191905f5260205f20905b815481529060010190602001808311610b6057829003601f168201915b50505050509050935093505050610bae565b60011b610ab5565b505f60405180602001604052805f81525092509250505b9250929050565b82610bbf8161168a565b610bc7575f80fd5b60408051808201825284815260208082018581525f888152808352848120546001600160401b031681526009835284812089825283528490209251835551600190920191909155815185815290810184905285917f1d6f5e03d3f63eb58751986629a5439baee5079ff04f345becb66e23eb154e4691015b60405180910390a250505050565b82610c578161168a565b610c5f575f80fd5b5f84815260208181526040808320546001600160401b03168352600382528083208784529091529020610c93838583612901565b50837fe379c1624ed7e714cc0937528a32359d69d5281337765313dba4e081b72d75788484604051610c3f929190612a27565b80610cd08161168a565b610cd8575f80fd5b5f82815260208190526040812080546001600160401b031691610cfa83612a3a565b82546101009290920a6001600160401b038181021990931691831602179091555f84815260208181526040918290205491519190921681528492507fc6621ccb8f3f5a04bb6502154b2caf6adf5983fe76dfef1cfc9c42e3579db444910160405180910390a25050565b5f80610d7183603c6115a2565b905080515f03610d8357505f92915050565b610d8c81611cae565b9392505050565b5f83815260208181526040808320546001600160401b03168352600a825280832086845290915290819020905160609190610dd19085908590612876565b90815260200160405180910390208054610dea90612885565b80601f0160208091040260200160405190810160405280929190818152602001828054610e1690612885565b8015610e615780601f10610e3857610100808354040283529160200191610e61565b820191905f5260205f20905b815481529060010190602001808311610e4457829003601f168201915b505050505090509392505050565b5f81815260208181526040808320546001600160401b03168352600482528083208484529091529020805460609190610ea790612885565b80601f0160208091040260200160405190810160405280929190818152602001828054610ed390612885565b8015610f1e5780601f10610ef557610100808354040283529160200191610f1e565b820191905f5260205f20905b815481529060010190602001808311610f0157829003601f168201915b50505050509050919050565b83610f348161168a565b610f3c575f80fd5b83610f48600182612863565b1615610f52575f80fd5b5f85815260208181526040808320546001600160401b031683526001825280832088845282528083208784529091529020610f8e838583612901565b50604051849086907faa121bbeef5f32f5961a2a28966e769023910fc9479059ee3495d4c1a696efe3905f90a35050505050565b5f81815260208181526040808320546001600160401b03168352600882528083208484529091529020805460609190610ea790612885565b826110048161168a565b61100c575f80fd5b5f84815260208181526040808320546001600160401b03168352600882528083208784529091529020611040838583612901565b50837fb7d29e911041e8d9b843369e890bcb72c9388692ba48b65ac54e7214c4c348f78484604051610c3f929190612a27565b8261107d8161168a565b611085575f80fd5b837f65412581168e88a1e60c6459d7f44ae83ad0832e670826c05a4e2476b57af75284846040516110b792919061240e565b60405180910390a2603c830361110e57837f52d7d861f09ab3d26239d492e8968629f95e9e318cf0b73bfddc441522a15fd26110f284611cae565b6040516001600160a01b03909116815260200160405180910390a25b5f84815260208181526040808320546001600160401b0316835260028252808320878452825280832086845290915290206111498382612a5f565b5050505050565b6001600160a01b03821633036111bf5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c20737461747573604482015268103337b91039b2b63360b91b60648201526084015b60405180910390fd5b335f818152600b602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6001600160a01b03821633036112825760405162461bcd60e51b815260206004820181905260248201527f53657474696e672064656c65676174652073746174757320666f722073656c6660448201526064016111b6565b335f818152600c6020908152604080832087845282528083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519384529286917ff0ddb3b04746704017f9aa8bd728fcc2c1d11675041205350018915f5e4750a0910160405180910390a4505050565b5f83815260208181526040808320546001600160401b03168352600582528083208684528252808320858452825280832061ffff851684529091529020805460609190610dea90612885565b6060610d8c5f8484611ccb565b5f81815260208181526040808320546001600160401b03168352600382528083208484529091529020805460609190610ea790612885565b826113918161168a565b611399575f80fd5b5f84815260208181526040808320546001600160401b031680845260048352818420888552909252822080549192916113d190612885565b80601f01602080910402602001604051908101604052809291908181526020018280546113fd90612885565b80156114485780601f1061141f57610100808354040283529160200191611448565b820191905f5260205f20905b81548152906001019060200180831161142b57829003601f168201915b505050506001600160401b0384165f9081526004602090815260408083208b8452909152902091925061147e9050858783612901565b50857f8f15ed4b723ef428f250961da8315675b507046737e19319fc1a4d81bfe87f858287876040516114b393929190612b1e565b60405180910390a2505050505050565b816114cd8161168a565b6114d5575f80fd5b6114e483603c61038185611e88565b505050565b60606114f6848484611ccb565b949350505050565b826115088161168a565b611510575f80fd5b5f84815260208181526040808320546001600160401b031683526007825280832087845282528083206001600160e01b031987168085529083529281902080546001600160a01b0319166001600160a01b038716908117909155905190815286917f7c69f06bea0bdef565b709e93a147836b0063ba2dd89f02d0b7e8d931e6a6daa910160405180910390a350505050565b5f82815260208181526040808320546001600160401b0316835260028252808320858452825280832084845290915290208054606091906115e290612885565b80601f016020809104026020016040519081016040528092919081815260200182805461160e90612885565b80156116595780601f1061163057610100808354040283529160200191611659565b820191905f5260205f20905b81548152906001019060200180831161163c57829003601f168201915b5050505050905092915050565b5f6001600160e01b03198216631674750f60e21b1480610570575061057082611eb8565b5f336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614806116ea5750336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016145b156116f757506001919050565b6040516302571be360e01b8152600481018390525f907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906302571be390602401602060405180830381865afa15801561175c573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906117809190612b4d565b90507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316816001600160a01b031603611845576040516331a9108f60e11b8152600481018490527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690636352211e90602401602060405180830381865afa15801561181e573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906118429190612b4d565b90505b6001600160a01b03811633148061187e57506001600160a01b0381165f908152600b6020908152604080832033845290915290205460ff165b80610d8c57506001600160a01b0381165f908152600c60209081526040808320868452825280832033845290915290205460ff16610d8c565b6118ff6040518060e00160405280606081526020015f81526020015f61ffff1681526020015f61ffff1681526020015f63ffffffff1681526020015f81526020015f81525090565b82815260c0810182905261057081611bc9565b602081015181516060916105709161192a9082611edc565b84519190611f33565b60a081015160c08201516060916105709161192a908290612863565b5f81518351148015610d8c5750610d8c835f845f8751611fa7565b865160208801205f61197d878787611f33565b90508315611aa1576001600160401b0383165f9081526005602090815260408083208d84528252808320858452825280832061ffff8c168452909152902080546119c690612885565b159050611a23576001600160401b0383165f9081526006602090815260408083208d845282528083208584529091528120805461ffff1691611a0783612b68565b91906101000a81548161ffff021916908361ffff160217905550505b6001600160401b0383165f9081526005602090815260408083208d84528252808320858452825280832061ffff8c1684529091528120611a62916121f9565b897f03528ed0c2a3ebc993b12ce3c16bb382f9c7d88ef7d8a1bf290eaf35955a12078a8a604051611a94929190612b84565b60405180910390a261076c565b6001600160401b0383165f9081526005602090815260408083208d84528252808320858452825280832061ffff8c16845290915290208054611ae290612885565b90505f03611b40576001600160401b0383165f9081526006602090815260408083208d845282528083208584529091528120805461ffff1691611b2483612ba9565b91906101000a81548161ffff021916908361ffff160217905550505b6001600160401b0383165f9081526005602090815260408083208d84528252808320858452825280832061ffff8c1684529091529020611b808282612a5f565b50897f52a608b3303a48862d07a73d82fa221318c0027fbbcfb1b2329bface3f19ff2b8a8a84604051611bb593929190612bbf565b60405180910390a250505050505050505050565b60c08101516020820181905281515111611be05750565b5f611bf2825f01518360200151611edc565b8260200151611c019190612bed565b8251909150611c109082611fc9565b61ffff166040830152611c24600282612bed565b8251909150611c339082611fc9565b61ffff166060830152611c47600282612bed565b8251909150611c569082611fef565b63ffffffff166080830152611c6c600482612bed565b82519091505f90611c7d9083611fc9565b61ffff169050611c8e600283612bed565b60a084018190529150611ca18183612bed565b60c0909301929092525050565b5f8151601414611cbc575f80fd5b5060200151600160601b900490565b6060816001600160401b03811115611ce557611ce56124c6565b604051908082528060200260200182016040528015611d1857816020015b6060815260200190600190039081611d035790505b5090505f5b82811015611e80578415611dd8575f848483818110611d3e57611d3e612a13565b9050602002810190611d509190612c00565b611d5f91602491600491612c42565b611d6891612c69565b9050858114611dd65760405162461bcd60e51b815260206004820152603460248201527f6d756c746963616c6c3a20416c6c207265636f726473206d7573742068617665604482015273040c240dac2e8c6d0d2dcce40dcc2dacad0c2e6d60631b60648201526084016111b6565b505b5f8030868685818110611ded57611ded612a13565b9050602002810190611dff9190612c00565b604051611e0d929190612876565b5f60405180830381855af49150503d805f8114611e45576040519150601f19603f3d011682016040523d82523d5f602084013e611e4a565b606091505b509150915081611e58575f80fd5b80848481518110611e6b57611e6b612a13565b60209081029190910101525050600101611d1d565b509392505050565b604080516014808252818301909252606091602082018180368337505050600160601b9290920260208301525090565b5f6001600160e01b0319821663c869023360e01b1480610570575061057082612017565b5f815b83518110611eef57611eef612c86565b5f611efa858361203b565b60ff169050611f0a816001612bed565b611f149083612bed565b9150805f03611f235750611f29565b50611edf565b6114f68382612863565b8251606090611f428385612bed565b1115611f4c575f80fd5b5f826001600160401b03811115611f6557611f656124c6565b6040519080825280601f01601f191660200182016040528015611f8f576020820181803683370190505b50905060208082019086860101610a7c82828761205e565b5f611fb38484846120b3565b611fbe8787856120b3565b149695505050505050565b81515f90611fd8836002612bed565b1115611fe2575f80fd5b50016002015161ffff1690565b81515f90611ffe836004612bed565b1115612008575f80fd5b50016004015163ffffffff1690565b5f6001600160e01b0319821663691f343160e01b14806105705750610570826120d5565b5f82828151811061204e5761204e612a13565b016020015160f81c905092915050565b602081106120965781518352612075602084612bed565b9250612082602083612bed565b915061208f602082612863565b905061205e565b905182516020929092036101000a5f190180199091169116179052565b82515f906120c18385612bed565b11156120cb575f80fd5b5091016020012090565b5f6001600160e01b031982166304928c6760e21b14806105705750610570825f6001600160e01b0319821663547d2b4160e11b148061212457506001600160e01b03198216635c98042b60e01b145b806105705750610570825f6001600160e01b0319821663bc1c58d160e01b14806105705750610570825f6001600160e01b03198216631d9dabef60e11b148061217d57506001600160e01b031982166378e5bf0360e11b145b806105705750610570825f6001600160e01b03198216631101d5ab60e11b14806105705750610570825f6001600160e01b0319821663d700ff3360e01b14806105705750610570825f6001600160e01b03198216634fbf043360e01b148061057057506301ffc9a760e01b6001600160e01b0319831614610570565b50805461220590612885565b5f825580601f10612214575050565b601f0160209004905f5260205f20908101906122309190612233565b50565b5b80821115612247575f8155600101612234565b5090565b80356001600160e01b031981168114612262575f80fd5b919050565b5f60208284031215612277575f80fd5b610d8c8261224b565b5f8083601f840112612290575f80fd5b5081356001600160401b038111156122a6575f80fd5b602083019150836020828501011115610bae575f80fd5b5f805f604084860312156122cf575f80fd5b8335925060208401356001600160401b038111156122eb575f80fd5b6122f786828701612280565b9497909650939450505050565b5f805f805f60608688031215612318575f80fd5b8535945060208601356001600160401b0380821115612335575f80fd5b61234189838a01612280565b90965094506040880135915080821115612359575f80fd5b5061236688828901612280565b969995985093965092949392505050565b5f8060408385031215612388575f80fd5b823591506123986020840161224b565b90509250929050565b5f80604083850312156123b2575f80fd5b50508035926020909101359150565b5f5b838110156123db5781810151838201526020016123c3565b50505f910152565b5f81518084526123fa8160208601602086016123c1565b601f01601f19169290920160200192915050565b828152604060208201525f6114f660408301846123e3565b5f805f60608486031215612438575f80fd5b505081359360208301359350604090920135919050565b5f6020828403121561245f575f80fd5b5035919050565b602081525f610d8c60208301846123e3565b5f805f806060858703121561248b575f80fd5b843593506020850135925060408501356001600160401b038111156124ae575f80fd5b6124ba87828801612280565b95989497509550505050565b634e487b7160e01b5f52604160045260245ffd5b5f805f606084860312156124ec575f80fd5b833592506020840135915060408401356001600160401b0380821115612510575f80fd5b818601915086601f830112612523575f80fd5b813581811115612535576125356124c6565b604051601f8201601f19908116603f0116810190838211818310171561255d5761255d6124c6565b81604052828152896020848701011115612575575f80fd5b826020860160208301375f6020848301015280955050505050509250925092565b6001600160a01b0381168114612230575f80fd5b80358015158114612262575f80fd5b5f80604083850312156125ca575f80fd5b82356125d581612596565b9150612398602084016125aa565b5f805f606084860312156125f5575f80fd5b83359250602084013561260781612596565b9150612615604085016125aa565b90509250925092565b5f805f60608486031215612630575f80fd5b8335925060208401359150604084013561ffff8116811461264f575f80fd5b809150509250925092565b5f805f6060848603121561266c575f80fd5b833561267781612596565b925060208401359150604084013561264f81612596565b5f8083601f84011261269e575f80fd5b5081356001600160401b038111156126b4575f80fd5b6020830191508360208260051b8501011115610bae575f80fd5b5f80602083850312156126df575f80fd5b82356001600160401b038111156126f4575f80fd5b6127008582860161268e565b90969095509350505050565b5f60208083016020845280855180835260408601915060408160051b8701019250602087015f5b8281101561276157603f1988860301845261274f8583516123e3565b94509285019290850190600101612733565b5092979650505050505050565b5f806040838503121561277f575f80fd5b82359150602083013561279181612596565b809150509250929050565b5f805f604084860312156127ae575f80fd5b8335925060208401356001600160401b038111156127ca575f80fd5b6122f78682870161268e565b5f805f606084860312156127e8575f80fd5b833592506127f86020850161224b565b9150604084013561264f81612596565b5f8060408385031215612819575f80fd5b823561282481612596565b9150602083013561279181612596565b5f82516128458184602087016123c1565b9190910192915050565b634e487b7160e01b5f52601160045260245ffd5b818103818111156105705761057061284f565b818382375f9101908152919050565b600181811c9082168061289957607f821691505b6020821081036128b757634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156114e457805f5260205f20601f840160051c810160208510156128e25750805b601f840160051c820191505b81811015611149575f81556001016128ee565b6001600160401b03831115612918576129186124c6565b61292c836129268354612885565b836128bd565b5f601f84116001811461295d575f85156129465750838201355b5f19600387901b1c1916600186901b178355611149565b5f83815260208120601f198716915b8281101561298c578685013582556020948501946001909201910161296c565b50868210156129a8575f1960f88860031b161c19848701351681555b505060018560011b0183555050505050565b81835281816020850137505f828201602090810191909152601f909101601f19169091010190565b604081525f6129f56040830186886129ba565b8281036020840152612a088185876129ba565b979650505050505050565b634e487b7160e01b5f52603260045260245ffd5b602081525f6114f66020830184866129ba565b5f6001600160401b03808316818103612a5557612a5561284f565b6001019392505050565b81516001600160401b03811115612a7857612a786124c6565b612a8c81612a868454612885565b846128bd565b602080601f831160018114612abf575f8415612aa85750858301515b5f19600386901b1c1916600185901b178555612b16565b5f85815260208120601f198616915b82811015612aed57888601518255948401946001909101908401612ace565b5085821015612b0a57878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b604081525f612b3060408301866123e3565b8281036020840152612b438185876129ba565b9695505050505050565b5f60208284031215612b5d575f80fd5b8151610d8c81612596565b5f61ffff821680612b7b57612b7b61284f565b5f190192915050565b604081525f612b9660408301856123e3565b905061ffff831660208301529392505050565b5f61ffff808316818103612a5557612a5561284f565b606081525f612bd160608301866123e3565b61ffff851660208401528281036040840152612b4381856123e3565b808201808211156105705761057061284f565b5f808335601e19843603018112612c15575f80fd5b8301803591506001600160401b03821115612c2e575f80fd5b602001915036819003821315610bae575f80fd5b5f8085851115612c50575f80fd5b83861115612c5c575f80fd5b5050820193919092039150565b80356020831015610570575f19602084900360031b1b1692915050565b634e487b7160e01b5f52600160045260245ffdfea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class PublicResolver__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(_ens, wrapperAddress, _trustedETHController, _trustedReverseRegistrar, overrides) {
        return super.getDeployTransaction(_ens, wrapperAddress, _trustedETHController, _trustedReverseRegistrar, overrides || {});
    }
    deploy(_ens, wrapperAddress, _trustedETHController, _trustedReverseRegistrar, overrides) {
        return super.deploy(_ens, wrapperAddress, _trustedETHController, _trustedReverseRegistrar, overrides || {});
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
exports.PublicResolver__factory = PublicResolver__factory;
PublicResolver__factory.bytecode = _bytecode;
PublicResolver__factory.abi = _abi;
