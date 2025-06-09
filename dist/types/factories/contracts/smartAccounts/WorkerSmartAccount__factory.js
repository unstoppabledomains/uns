"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerSmartAccount__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract IFaucet",
                name: "_faucet",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "ExecuteFailed",
        type: "error",
    },
    {
        inputs: [],
        name: "NotSelf",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "callIndex",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "returnData",
                type: "bytes",
            },
        ],
        name: "InternalCallFailed",
        type: "event",
    },
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "target",
                        type: "address",
                    },
                    {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                    },
                    {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                    },
                ],
                internalType: "struct ISmartAccount.Call[]",
                name: "calls",
                type: "tuple[]",
            },
            {
                internalType: "bool",
                name: "revertOnError",
                type: "bool",
            },
        ],
        name: "executeBatch",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "target",
                        type: "address",
                    },
                    {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                    },
                    {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                    },
                ],
                internalType: "struct ISmartAccount.Call[]",
                name: "calls",
                type: "tuple[]",
            },
            {
                internalType: "bool",
                name: "revertOnError",
                type: "bool",
            },
        ],
        name: "executeBatchAndEnsureBalance",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "faucet",
        outputs: [
            {
                internalType: "contract IFaucet",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];
const _bytecode = "0x60a060405234801561000f575f80fd5b506040516105a93803806105a983398101604081905261002e9161003f565b6001600160a01b031660805261006c565b5f6020828403121561004f575f80fd5b81516001600160a01b0381168114610065575f80fd5b9392505050565b6080516105186100915f395f818160610152818161027c015261030301526105185ff3fe608060405260043610610034575f3560e01c80638d2d0f731461003d578063de5f72fd14610050578063e45be2511461009f57005b3661003b57005b005b61003b61004b36600461036d565b6100b2565b34801561005b575f80fd5b506100837f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200160405180910390f35b61003b6100ad36600461036d565b610242565b3330146100d2576040516314e1dbf760e11b815260040160405180910390fd5b5f5b8281101561023c575f808585848181106100f0576100f06103f0565b90506020028101906101029190610404565b610110906020810190610422565b6001600160a01b031686868581811061012b5761012b6103f0565b905060200281019061013d9190610404565b60400135878786818110610153576101536103f0565b90506020028101906101659190610404565b61017390602081019061044f565b604051610181929190610499565b5f6040518083038185875af1925050503d805f81146101bb576040519150601f19603f3d011682016040523d82523d5f602084013e6101c0565b606091505b5091509150816102325783156101f95780515f036101f15760405163d6bed87360e01b815260040160405180910390fd5b805160208201fd5b827f4f1728acffcf163e98c16d5beb0f11297d0048266b9b63e931217cb20a49e16f8260405161022991906104a8565b60405180910390a25b50506001016100d4565b50505050565b333014610262576040516314e1dbf760e11b815260040160405180910390fd5b61026d8383836100b2565b61027561027a565b505050565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316639e6c39926040518163ffffffff1660e01b8152600401602060405180830381865afa1580156102d6573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906102fa91906104f4565b47101561036b577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166386cb61c26040518163ffffffff1660e01b81526004015f604051808303815f87803b158015610359575f80fd5b505af115801561023c573d5f803e3d5ffd5b565b5f805f6040848603121561037f575f80fd5b833567ffffffffffffffff80821115610396575f80fd5b818601915086601f8301126103a9575f80fd5b8135818111156103b7575f80fd5b8760208260051b85010111156103cb575f80fd5b6020928301955093505084013580151581146103e5575f80fd5b809150509250925092565b634e487b7160e01b5f52603260045260245ffd5b5f8235605e19833603018112610418575f80fd5b9190910192915050565b5f60208284031215610432575f80fd5b81356001600160a01b0381168114610448575f80fd5b9392505050565b5f808335601e19843603018112610464575f80fd5b83018035915067ffffffffffffffff82111561047e575f80fd5b602001915036819003821315610492575f80fd5b9250929050565b818382375f9101908152919050565b5f602080835283518060208501525f5b818110156104d4578581018301518582016040015282016104b8565b505f604082860101526040601f19601f8301168501019250505092915050565b5f60208284031215610504575f80fd5b505191905056fea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class WorkerSmartAccount__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(_faucet, overrides) {
        return super.getDeployTransaction(_faucet, overrides || {});
    }
    deploy(_faucet, overrides) {
        return super.deploy(_faucet, overrides || {});
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
exports.WorkerSmartAccount__factory = WorkerSmartAccount__factory;
WorkerSmartAccount__factory.bytecode = _bytecode;
WorkerSmartAccount__factory.abi = _abi;
