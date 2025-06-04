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
                internalType: "struct IWorkerSmartAccount.Call[]",
                name: "calls",
                type: "tuple[]",
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
                internalType: "struct IWorkerSmartAccount.Call[]",
                name: "calls",
                type: "tuple[]",
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
const _bytecode = "0x60a060405234801561000f575f80fd5b506040516104f93803806104f983398101604081905261002e9161003f565b6001600160a01b031660805261006c565b5f6020828403121561004f575f80fd5b81516001600160a01b0381168114610065575f80fd5b9392505050565b6080516104686100915f395f818160740152818161022701526102ae01526104685ff3fe608060405260043610610034575f3560e01c806363b5176c1461003d5780638a89b44b14610050578063de5f72fd1461006357005b3661003b57005b005b61003b61004b36600461031d565b6100b2565b61003b61005e36600461031d565b6100e8565b34801561006e575f80fd5b506100967f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200160405180910390f35b3330146100d2576040516314e1dbf760e11b815260040160405180910390fd5b6100dc82826100e8565b6100e4610225565b5050565b333014610108576040516314e1dbf760e11b815260040160405180910390fd5b5f5b81811015610220575f8383838181106101255761012561038c565b905060200281019061013791906103a0565b6101459060208101906103be565b6001600160a01b03168484848181106101605761016061038c565b905060200281019061017291906103a0565b604001358585858181106101885761018861038c565b905060200281019061019a91906103a0565b6101a89060208101906103eb565b6040516101b6929190610435565b5f6040518083038185875af1925050503d805f81146101f0576040519150601f19603f3d011682016040523d82523d5f602084013e6101f5565b606091505b50509050806102175760405163d6bed87360e01b815260040160405180910390fd5b5060010161010a565b505050565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316639e6c39926040518163ffffffff1660e01b8152600401602060405180830381865afa158015610281573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906102a59190610444565b47101561031b577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166386cb61c26040518163ffffffff1660e01b81526004015f604051808303815f87803b158015610304575f80fd5b505af1158015610316573d5f803e3d5ffd5b505050505b565b5f806020838503121561032e575f80fd5b823567ffffffffffffffff80821115610345575f80fd5b818501915085601f830112610358575f80fd5b813581811115610366575f80fd5b8660208260051b850101111561037a575f80fd5b60209290920196919550909350505050565b634e487b7160e01b5f52603260045260245ffd5b5f8235605e198336030181126103b4575f80fd5b9190910192915050565b5f602082840312156103ce575f80fd5b81356001600160a01b03811681146103e4575f80fd5b9392505050565b5f808335601e19843603018112610400575f80fd5b83018035915067ffffffffffffffff82111561041a575f80fd5b60200191503681900382131561042e575f80fd5b9250929050565b818382375f9101908152919050565b5f60208284031215610454575f80fd5b505191905056fea164736f6c6343000818000a";
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
