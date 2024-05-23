"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENSRegistry__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
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
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "label",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "NewOwner",
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
                name: "resolver",
                type: "address",
            },
        ],
        name: "NewResolver",
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
                name: "ttl",
                type: "uint64",
            },
        ],
        name: "NewTTL",
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
                name: "owner",
                type: "address",
            },
        ],
        name: "Transfer",
        type: "event",
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
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "owner",
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
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "recordExists",
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
        ],
        name: "resolver",
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
                internalType: "address",
                name: "owner",
                type: "address",
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
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "uint64",
                name: "ttl",
                type: "uint64",
            },
        ],
        name: "setRecord",
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
                name: "resolver",
                type: "address",
            },
        ],
        name: "setResolver",
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
                name: "label",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "setSubnodeOwner",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
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
            {
                internalType: "bytes32",
                name: "label",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "uint64",
                name: "ttl",
                type: "uint64",
            },
        ],
        name: "setSubnodeRecord",
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
                internalType: "uint64",
                name: "ttl",
                type: "uint64",
            },
        ],
        name: "setTTL",
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
        name: "ttl",
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
];
const _bytecode = "0x608060405234801561000f575f80fd5b505f8080526020527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb580546001600160a01b03191633179055610956806100555f395ff3fe608060405234801561000f575f80fd5b50600436106100b1575f3560e01c80635b0fc9c31161006e5780635b0fc9c3146101a55780635ef2c7f0146101b8578063a22cb465146101cb578063cf408823146101de578063e985e9c5146101f1578063f79fe5381461023c575f80fd5b80630178b8bf146100b557806302571be3146100fd57806306ab59231461011057806314ab90381461013157806316a25cbd146101465780631896f70a14610192575b5f80fd5b6100e06100c3366004610785565b5f908152602081905260409020600101546001600160a01b031690565b6040516001600160a01b0390911681526020015b60405180910390f35b6100e061010b366004610785565b610266565b61012361011e3660046107b7565b610292565b6040519081526020016100f4565b61014461013f366004610800565b61035f565b005b610179610154366004610785565b5f90815260208190526040902060010154600160a01b900467ffffffffffffffff1690565b60405167ffffffffffffffff90911681526020016100f4565b6101446101a036600461082a565b61042e565b6101446101b336600461082a565b6104ef565b6101446101c636600461084b565b61058e565b6101446101d936600461089e565b6105af565b6101446101ec3660046108d7565b61061a565b61022c6101ff366004610921565b6001600160a01b039182165f90815260016020908152604080832093909416825291909152205460ff1690565b60405190151581526020016100f4565b61022c61024a366004610785565b5f908152602081905260409020546001600160a01b0316151590565b5f818152602081905260408120546001600160a01b031630810361028c57505f92915050565b92915050565b5f8381526020819052604081205484906001600160a01b0316338114806102db57506001600160a01b0381165f90815260016020908152604080832033845290915290205460ff165b6102e3575f80fd5b604080516020808201899052818301889052825180830384018152606090920190925280519101206103158186610635565b6040516001600160a01b0386168152869088907fce0457fe73731f824cc272376169235128c118b49d344817417c6d108d155e829060200160405180910390a39695505050505050565b5f8281526020819052604090205482906001600160a01b0316338114806103a857506001600160a01b0381165f90815260016020908152604080832033845290915290205460ff165b6103b0575f80fd5b60405167ffffffffffffffff8416815284907f1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa689060200160405180910390a250505f91825260208290526040909120600101805467ffffffffffffffff909216600160a01b0267ffffffffffffffff60a01b19909216919091179055565b5f8281526020819052604090205482906001600160a01b03163381148061047757506001600160a01b0381165f90815260016020908152604080832033845290915290205460ff165b61047f575f80fd5b6040516001600160a01b038416815284907f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a09060200160405180910390a250505f9182526020829052604090912060010180546001600160a01b0319166001600160a01b03909216919091179055565b5f8281526020819052604090205482906001600160a01b03163381148061053857506001600160a01b0381165f90815260016020908152604080832033845290915290205460ff165b610540575f80fd5b61054a8484610635565b6040516001600160a01b038416815284907fd4735d920b0f87494915f556dd9b54c8f309026070caea5c737245152564d2669060200160405180910390a250505050565b5f61059a868686610292565b90506105a7818484610662565b505050505050565b335f8181526001602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b61062484846104ef565b61062f848383610662565b50505050565b5f9182526020829052604090912080546001600160a01b0319166001600160a01b03909216919091179055565b5f838152602081905260409020600101546001600160a01b038381169116146106e6575f838152602081815260409182902060010180546001600160a01b0319166001600160a01b038616908117909155915191825284917f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a0910160405180910390a25b5f8381526020819052604090206001015467ffffffffffffffff828116600160a01b9092041614610780575f8381526020818152604091829020600101805467ffffffffffffffff60a01b1916600160a01b67ffffffffffffffff861690810291909117909155915191825284917f1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa68910160405180910390a25b505050565b5f60208284031215610795575f80fd5b5035919050565b80356001600160a01b03811681146107b2575f80fd5b919050565b5f805f606084860312156107c9575f80fd5b83359250602084013591506107e06040850161079c565b90509250925092565b803567ffffffffffffffff811681146107b2575f80fd5b5f8060408385031215610811575f80fd5b82359150610821602084016107e9565b90509250929050565b5f806040838503121561083b575f80fd5b823591506108216020840161079c565b5f805f805f60a0868803121561085f575f80fd5b85359450602086013593506108766040870161079c565b92506108846060870161079c565b9150610892608087016107e9565b90509295509295909350565b5f80604083850312156108af575f80fd5b6108b88361079c565b9150602083013580151581146108cc575f80fd5b809150509250929050565b5f805f80608085870312156108ea575f80fd5b843593506108fa6020860161079c565b92506109086040860161079c565b9150610916606086016107e9565b905092959194509250565b5f8060408385031215610932575f80fd5b61093b8361079c565b91506108216020840161079c56fea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class ENSRegistry__factory extends ethers_1.ContractFactory {
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
exports.ENSRegistry__factory = ENSRegistry__factory;
ENSRegistry__factory.bytecode = _bytecode;
ENSRegistry__factory.abi = _abi;
