"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRoutingForwarderMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
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
        name: "buildRouteData",
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
                name: "",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "",
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
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
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
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        name: "putString",
        outputs: [],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "putStringFor",
        outputs: [],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "putUint",
        outputs: [],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        name: "putUintArr",
        outputs: [],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "putUintArrFor",
        outputs: [],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
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
        name: "putUintFor",
        outputs: [],
        stateMutability: "pure",
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
                name: "",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "",
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
        stateMutability: "pure",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50610085604051806060016040528060258152602001610d67602591396040518060600160405280602e8152602001610d8c602e913980516020918201208251928201929092206001600160e01b03191660009081529081905260409020805463ffffffff191660e09290921c919091179055565b6100f360405180604001604052806011815260200170707574537472696e6728737472696e672960781b8152506040518060400160405280601a81526020017f707574537472696e67466f7228737472696e672c6279746573290000000000008152506101df60201b60201c565b6101606040518060400160405280601081526020016f70757455696e742875696e743235362960801b8152506040518060400160405280601981526020017f70757455696e74466f722875696e743235362c627974657329000000000000008152506101df60201b60201c565b6101da6040518060400160405280601581526020017f70757455696e744172722875696e743235365b5d2900000000000000000000008152506040518060400160405280601e81526020017f70757455696e74417272466f722875696e743235365b5d2c62797465732900008152506101df60201b60201c565b61021e565b80516020918201208251928201929092206001600160e01b03191660009081529081905260409020805463ffffffff191660e09290921c919091179055565b610b3a8061022d6000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c8063a424740011610066578063a424740014610124578063ab3ca71b14610147578063cdec3fe31461015a578063da5703c214610168578063daa948aa1461017657600080fd5b806302c7ff77146100a35780631bf7e13e146100b857806332065ca7146100e15780633b526333146100f45780636ccbae5f14610102575b600080fd5b6100b66100b13660046105ec565b610184565b005b6100cb6100c6366004610851565b6101a5565b6040516100d891906109e1565b60405180910390f35b6100cb6100ef366004610851565b6101bf565b6100b66100b136600461073d565b6101166101103660046108be565b50600090565b6040519081526020016100d8565b610137610132366004610851565b61025b565b60405190151581526020016100d8565b6100b661015536600461062c565b610275565b6100b66100b13660046108be565b6100b6610155366004610771565b6100b66101553660046108ee565b60405162461bcd60e51b815260040161019c90610a22565b60405180910390fd5b606060405162461bcd60e51b815260040161019c90610a22565b60606102516101d1602086018661058e565b60408601356101e36060880188610a59565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b0181900481028201810190925289815292508991508890819084018382808284376000920191909152506102a792505050565b90505b9392505050565b600060405162461bcd60e51b815260040161019c90610a22565b60405162461bcd60e51b815260206004820152600760248201526636b7b1b5a337b960c91b604482015260640161019c565b6020808301516001600160e01b03191660009081529081905260408120546060919060e01b90506001600160e01b031981166103315760405162461bcd60e51b815260206004820152602360248201527f42617365526f7574696e67466f727761726465723a20524f5554455f554e4b4e60448201526227aba760e91b606482015260840161019c565b83516003190160048501908152610349828286610354565b979650505050505050565b60606001600160e01b03198416631de5861160e31b14156103e35760008060008580602001905181019061038891906105aa565b92509250925086838383886040516024016103a69493929190610957565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152935061025492505050565b6001600160e01b03198416636d2b81e160e11b14156104635760008380602001905181019061041291906107c1565b90508481846040516024016104289291906109f4565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915291506102549050565b6001600160e01b03198416636d54a45560e11b14156104a85760008380602001905181019061049291906108d6565b9050848184604051602401610428929190610a40565b6001600160e01b0319841663ab3ca71b60e01b14156104ed576000838060200190518101906104d79190610695565b9050848184604051602401610428929190610994565b506040805160208101909152600081529392505050565b60008083601f840112610515578182fd5b50813567ffffffffffffffff81111561052c578182fd5b6020830191508360208260051b850101111561054757600080fd5b9250929050565b60008083601f84011261055f578182fd5b50813567ffffffffffffffff811115610576578182fd5b60208301915083602082850101111561054757600080fd5b60006020828403121561059f578081fd5b813561025481610b15565b6000806000606084860312156105be578182fd5b83516105c981610b15565b60208501519093506105da81610b15565b80925050604084015190509250925092565b600080602083850312156105fe578182fd5b823567ffffffffffffffff811115610614578283fd5b61062085828601610504565b90969095509350505050565b60008060008060408587031215610641578081fd5b843567ffffffffffffffff80821115610658578283fd5b61066488838901610504565b9096509450602087013591508082111561067c578283fd5b506106898782880161054e565b95989497509550505050565b600060208083850312156106a7578182fd5b825167ffffffffffffffff808211156106be578384fd5b818501915085601f8301126106d1578384fd5b8151818111156106e3576106e3610aff565b8060051b91506106f4848301610a9e565b8181528481019084860184860187018a101561070e578788fd5b8795505b83861015610730578051835260019590950194918601918601610712565b5098975050505050505050565b6000806020838503121561074f578182fd5b823567ffffffffffffffff811115610765578283fd5b6106208582860161054e565b60008060008060408587031215610786578384fd5b843567ffffffffffffffff8082111561079d578586fd5b6107a98883890161054e565b9096509450602087013591508082111561067c578384fd5b6000602082840312156107d2578081fd5b815167ffffffffffffffff808211156107e9578283fd5b818401915084601f8301126107fc578283fd5b81518181111561080e5761080e610aff565b610821601f8201601f1916602001610a9e565b9150808252856020828501011115610837578384fd5b610848816020840160208601610acf565b50949350505050565b600080600060408486031215610865578283fd5b833567ffffffffffffffff8082111561087c578485fd5b908501906080828803121561088f578485fd5b909350602085013590808211156108a4578384fd5b506108b18682870161054e565b9497909650939450505050565b6000602082840312156108cf578081fd5b5035919050565b6000602082840312156108e7578081fd5b5051919050565b600080600060408486031215610902578283fd5b83359250602084013567ffffffffffffffff81111561091f578283fd5b6108b18682870161054e565b60008151808452610943816020860160208601610acf565b601f01601f19169290920160200192915050565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061098a9083018461092b565b9695505050505050565b604080825283519082018190526000906020906060840190828701845b828110156109cd578151845292840192908401906001016109b1565b5050508381038285015261098a818661092b565b602081526000610254602083018461092b565b604081526000610a07604083018561092b565b8281036020840152610a19818561092b565b95945050505050565b6020808252600490820152636d6f636b60e01b604082015260600190565b828152604060208201526000610251604083018461092b565b6000808335601e19843603018112610a6f578283fd5b83018035915067ffffffffffffffff821115610a89578283fd5b60200191503681900382131561054757600080fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610ac757610ac7610aff565b604052919050565b60005b83811015610aea578181015183820152602001610ad2565b83811115610af9576000848401525b50505050565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610b2a57600080fd5b5056fea164736f6c6343000804000a7472616e7366657246726f6d28616464726573732c616464726573732c75696e74323536297472616e7366657246726f6d466f7228616464726573732c616464726573732c75696e743235362c627974657329";
const isSuperArgs = (xs) => xs.length > 1;
class BaseRoutingForwarderMock__factory extends ethers_1.ContractFactory {
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
exports.BaseRoutingForwarderMock__factory = BaseRoutingForwarderMock__factory;
BaseRoutingForwarderMock__factory.bytecode = _bytecode;
BaseRoutingForwarderMock__factory.abi = _abi;
