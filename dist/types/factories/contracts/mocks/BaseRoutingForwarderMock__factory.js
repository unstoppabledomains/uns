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
const _bytecode = "0x608060405234801561001057600080fd5b50610085604051806060016040528060258152602001610d5d602591396040518060600160405280602e8152602001610d82602e913980516020918201208251928201929092206001600160e01b03191660009081529081905260409020805463ffffffff191660e09290921c919091179055565b6100f360405180604001604052806011815260200170707574537472696e6728737472696e672960781b8152506040518060400160405280601a81526020017f707574537472696e67466f7228737472696e672c6279746573290000000000008152506101df60201b60201c565b6101606040518060400160405280601081526020016f70757455696e742875696e743235362960801b8152506040518060400160405280601981526020017f70757455696e74466f722875696e743235362c627974657329000000000000008152506101df60201b60201c565b6101da6040518060400160405280601581526020017f70757455696e744172722875696e743235365b5d2900000000000000000000008152506040518060400160405280601e81526020017f70757455696e74417272466f722875696e743235365b5d2c62797465732900008152506101df60201b60201c565b61021e565b80516020918201208251928201929092206001600160e01b03191660009081529081905260409020805463ffffffff191660e09290921c919091179055565b610b308061022d6000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c8063a424740011610066578063a424740014610124578063ab3ca71b14610147578063cdec3fe31461015a578063da5703c214610168578063daa948aa1461017657600080fd5b806302c7ff77146100a35780631bf7e13e146100b857806332065ca7146100e15780633b526333146100f45780636ccbae5f14610102575b600080fd5b6100b66100b136600461054f565b610184565b005b6100cb6100c63660046105d3565b6101a5565b6040516100d89190610694565b60405180910390f35b6100cb6100ef3660046105d3565b6101bf565b6100b66100b13660046106a7565b6101166101103660046106dd565b50600090565b6040519081526020016100d8565b6101376101323660046105d3565b61025b565b60405190151581526020016100d8565b6100b66101553660046106f6565b610275565b6100b66100b13660046106dd565b6100b6610155366004610762565b6100b661015536600461079c565b60405162461bcd60e51b815260040161019c906107db565b60405180910390fd5b606060405162461bcd60e51b815260040161019c906107db565b60606102516101d16020860186610811565b60408601356101e3606088018861082e565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8b0181900481028201810190925289815292508991508890819084018382808284376000920191909152506102a792505050565b90505b9392505050565b600060405162461bcd60e51b815260040161019c906107db565b60405162461bcd60e51b815260206004820152600760248201526636b7b1b5a337b960c91b604482015260640161019c565b6020808301516001600160e01b03191660009081529081905260408120546060919060e01b90506001600160e01b031981166000036103345760405162461bcd60e51b815260206004820152602360248201527f42617365526f7574696e67466f727761726465723a20524f5554455f554e4b4e60448201526227aba760e91b606482015260840161019c565b8351600319016004850190815261034c828286610357565b979650505050505050565b606063021a79ef60e31b6001600160e01b03198516016103e55760008060008580602001905181019061038a9190610875565b92509250925086838383886040516024016103a894939291906108b8565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152935061025492505050565b6312d47e1f60e11b6001600160e01b031985160161046457600083806020019051810190610413919061093c565b90508481846040516024016104299291906109d0565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915291506102549050565b6312ab5bab60e11b6001600160e01b03198516016104a85760008380602001905181019061049291906109fe565b9050848184604051602401610429929190610a17565b6354c358e560e01b6001600160e01b03198516016104ec576000838060200190518101906104d69190610a30565b9050848184604051602401610429929190610ad6565b506040805160208101909152600081529392505050565b60008083601f84011261051557600080fd5b50813567ffffffffffffffff81111561052d57600080fd5b6020830191508360208260051b850101111561054857600080fd5b9250929050565b6000806020838503121561056257600080fd5b823567ffffffffffffffff81111561057957600080fd5b61058585828601610503565b90969095509350505050565b60008083601f8401126105a357600080fd5b50813567ffffffffffffffff8111156105bb57600080fd5b60208301915083602082850101111561054857600080fd5b6000806000604084860312156105e857600080fd5b833567ffffffffffffffff8082111561060057600080fd5b908501906080828803121561061457600080fd5b9093506020850135908082111561062a57600080fd5b5061063786828701610591565b9497909650939450505050565b60005b8381101561065f578181015183820152602001610647565b50506000910152565b60008151808452610680816020860160208601610644565b601f01601f19169290920160200192915050565b6020815260006102546020830184610668565b600080602083850312156106ba57600080fd5b823567ffffffffffffffff8111156106d157600080fd5b61058585828601610591565b6000602082840312156106ef57600080fd5b5035919050565b6000806000806040858703121561070c57600080fd5b843567ffffffffffffffff8082111561072457600080fd5b61073088838901610503565b9096509450602087013591508082111561074957600080fd5b5061075687828801610591565b95989497509550505050565b6000806000806040858703121561077857600080fd5b843567ffffffffffffffff8082111561079057600080fd5b61073088838901610591565b6000806000604084860312156107b157600080fd5b83359250602084013567ffffffffffffffff8111156107cf57600080fd5b61063786828701610591565b6020808252600490820152636d6f636b60e01b604082015260600190565b6001600160a01b038116811461080e57600080fd5b50565b60006020828403121561082357600080fd5b8135610254816107f9565b6000808335601e1984360301811261084557600080fd5b83018035915067ffffffffffffffff82111561086057600080fd5b60200191503681900382131561054857600080fd5b60008060006060848603121561088a57600080fd5b8351610895816107f9565b60208501519093506108a6816107f9565b80925050604084015190509250925092565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906108eb90830184610668565b9695505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610934576109346108f5565b604052919050565b60006020828403121561094e57600080fd5b815167ffffffffffffffff8082111561096657600080fd5b818401915084601f83011261097a57600080fd5b81518181111561098c5761098c6108f5565b61099f601f8201601f191660200161090b565b91508082528560208285010111156109b657600080fd5b6109c7816020840160208601610644565b50949350505050565b6040815260006109e36040830185610668565b82810360208401526109f58185610668565b95945050505050565b600060208284031215610a1057600080fd5b5051919050565b8281526040602082015260006102516040830184610668565b60006020808385031215610a4357600080fd5b825167ffffffffffffffff80821115610a5b57600080fd5b818501915085601f830112610a6f57600080fd5b815181811115610a8157610a816108f5565b8060051b9150610a9284830161090b565b8181529183018401918481019088841115610aac57600080fd5b938501935b83851015610aca57845182529385019390850190610ab1565b98975050505050505050565b604080825283519082018190526000906020906060840190828701845b82811015610b0f57815184529284019290840190600101610af3565b505050838103828501526108eb818661066856fea164736f6c6343000811000a7472616e7366657246726f6d28616464726573732c616464726573732c75696e74323536297472616e7366657246726f6d466f7228616464726573732c616464726573732c75696e743235362c627974657329";
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
