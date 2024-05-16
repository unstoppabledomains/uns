"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StablePriceOracle__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract AggregatorInterface",
                name: "_usdOracle",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "_rentPrices",
                type: "uint256[]",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256[]",
                name: "prices",
                type: "uint256[]",
            },
        ],
        name: "RentPriceChanged",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "expires",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
        ],
        name: "premium",
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
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "expires",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
        ],
        name: "price",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "base",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "premium",
                        type: "uint256",
                    },
                ],
                internalType: "struct IPriceOracle.Price",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "price1Letter",
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
        name: "price2Letter",
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
        name: "price3Letter",
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
        name: "price4Letter",
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
        name: "price5Letter",
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
        inputs: [],
        name: "usdOracle",
        outputs: [
            {
                internalType: "contract AggregatorInterface",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x61014060405234801561001157600080fd5b506040516109e63803806109e683398101604081905261003091610106565b6001600160a01b0382166101205280518190600090610051576100516101e6565b60200260200101516080818152505080600181518110610073576100736101e6565b602002602001015160a0818152505080600281518110610095576100956101e6565b602002602001015160c08181525050806003815181106100b7576100b76101e6565b602002602001015160e08181525050806004815181106100d9576100d96101e6565b6020026020010151610100818152505050506101fc565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561011957600080fd5b82516001600160a01b038116811461013057600080fd5b602084810151919350906001600160401b038082111561014f57600080fd5b818601915086601f83011261016357600080fd5b815181811115610175576101756100f0565b8060051b604051601f19603f8301168101818110858211171561019a5761019a6100f0565b6040529182528482019250838101850191898311156101b857600080fd5b938501935b828510156101d6578451845293850193928501926101bd565b8096505050505050509250929050565b634e487b7160e01b600052603260045260246000fd5b60805160a05160c05160e051610100516101205161077261027460003960008181610189015261056701526000818161012801526102af0152600081816101ef01526102e801526000818161014f015261031a0152600081816101c8015261034c01526000818160c5015261037601526107726000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063a200e15311610066578063a200e1531461014a578063a34e359614610171578063c8a4271f14610184578063cd5d2c74146101c3578063d820ed42146101ea57600080fd5b806301ffc9a7146100985780632c0fd74c146100c057806350e9a715146100f557806359b6b86c14610123575b600080fd5b6100ab6100a6366004610612565b610211565b60405190151581526020015b60405180910390f35b6100e77f000000000000000000000000000000000000000000000000000000000000000081565b6040519081526020016100b7565b61010861010336600461063c565b610248565b604080518251815260209283015192810192909252016100b7565b6100e77f000000000000000000000000000000000000000000000000000000000000000081565b6100e77f000000000000000000000000000000000000000000000000000000000000000081565b6100e761017f36600461063c565b61040e565b6101ab7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020016100b7565b6100e77f000000000000000000000000000000000000000000000000000000000000000081565b6100e77f000000000000000000000000000000000000000000000000000000000000000081565b60006001600160e01b031982166301ffc9a760e01b148061024257506001600160e01b031982166350e9a71560e01b145b92915050565b6040805180820190915260008082526020820152600061029d86868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061045f92505050565b90506000600582106102da576102d3847f00000000000000000000000000000000000000000000000000000000000000006106d1565b905061039d565b8160040361030c576102d3847f00000000000000000000000000000000000000000000000000000000000000006106d1565b8160030361033e576102d3847f00000000000000000000000000000000000000000000000000000000000000006106d1565b81600203610370576102d3847f00000000000000000000000000000000000000000000000000000000000000006106d1565b61039a847f00000000000000000000000000000000000000000000000000000000000000006106d1565b90505b60405180604001604052806103b183610562565b81526020016104016103fc8a8a8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508c92508b91506106099050565b610562565b9052979650505050505050565b60006104566103fc86868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508892508791506106099050565b95945050505050565b8051600090819081905b80821015610559576000858381518110610485576104856106e8565b01602001516001600160f81b0319169050600160ff1b8110156104b4576104ad6001846106fe565b9250610546565b600760fd1b6001600160f81b0319821610156104d5576104ad6002846106fe565b600f60fc1b6001600160f81b0319821610156104f6576104ad6003846106fe565b601f60fb1b6001600160f81b031982161015610517576104ad6004846106fe565b603f60fa1b6001600160f81b031982161015610538576104ad6005846106fe565b6105436006846106fe565b92505b508261055181610711565b935050610469565b50909392505050565b6000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166350d25bcd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105e7919061072a565b9050806105f8846305f5e1006106d1565b6106029190610743565b9392505050565b60009392505050565b60006020828403121561062457600080fd5b81356001600160e01b03198116811461060257600080fd5b6000806000806060858703121561065257600080fd5b843567ffffffffffffffff8082111561066a57600080fd5b818701915087601f83011261067e57600080fd5b81358181111561068d57600080fd5b88602082850101111561069f57600080fd5b6020928301999098509187013596604001359550909350505050565b634e487b7160e01b600052601160045260246000fd5b8082028115828204841417610242576102426106bb565b634e487b7160e01b600052603260045260246000fd5b80820180821115610242576102426106bb565b600060018201610723576107236106bb565b5060010190565b60006020828403121561073c57600080fd5b5051919050565b60008261076057634e487b7160e01b600052601260045260246000fd5b50049056fea164736f6c6343000811000a";
const isSuperArgs = (xs) => xs.length > 1;
class StablePriceOracle__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(_usdOracle, _rentPrices, overrides) {
        return super.getDeployTransaction(_usdOracle, _rentPrices, overrides || {});
    }
    deploy(_usdOracle, _rentPrices, overrides) {
        return super.deploy(_usdOracle, _rentPrices, overrides || {});
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
exports.StablePriceOracle__factory = StablePriceOracle__factory;
StablePriceOracle__factory.bytecode = _bytecode;
StablePriceOracle__factory.abi = _abi;
