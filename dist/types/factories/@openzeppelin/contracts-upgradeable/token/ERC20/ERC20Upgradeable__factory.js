"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20Upgradeable__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
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
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
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
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
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
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
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
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
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
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
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
                name: "subtractedValue",
                type: "uint256",
            },
        ],
        name: "decreaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
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
                name: "addedValue",
                type: "uint256",
            },
        ],
        name: "increaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
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
        inputs: [],
        name: "totalSupply",
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
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
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
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561000f575f80fd5b506108318061001d5f395ff3fe608060405234801561000f575f80fd5b50600436106100a6575f3560e01c8063395093511161006e578063395093511461011f57806370a082311461013257806395d89b411461015a578063a457c2d714610162578063a9059cbb14610175578063dd62ed3e14610188575f80fd5b806306fdde03146100aa578063095ea7b3146100c857806318160ddd146100eb57806323b872dd146100fd578063313ce56714610110575b5f80fd5b6100b261019b565b6040516100bf91906106b4565b60405180910390f35b6100db6100d636600461071b565b61022b565b60405190151581526020016100bf565b6035545b6040519081526020016100bf565b6100db61010b366004610743565b610244565b604051601281526020016100bf565b6100db61012d36600461071b565b610267565b6100ef61014036600461077c565b6001600160a01b03165f9081526033602052604090205490565b6100b2610288565b6100db61017036600461071b565b610297565b6100db61018336600461071b565b610316565b6100ef61019636600461079c565b610323565b6060603680546101aa906107cd565b80601f01602080910402602001604051908101604052809291908181526020018280546101d6906107cd565b80156102215780601f106101f857610100808354040283529160200191610221565b820191905f5260205f20905b81548152906001019060200180831161020457829003601f168201915b5050505050905090565b5f3361023881858561034d565b60019150505b92915050565b5f33610251858285610470565b61025c8585856104e8565b506001949350505050565b5f336102388185856102798383610323565b6102839190610805565b61034d565b6060603780546101aa906107cd565b5f33816102a48286610323565b9050838110156103095760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b61025c828686840361034d565b5f336102388185856104e8565b6001600160a01b039182165f90815260346020908152604080832093909416825291909152205490565b6001600160a01b0383166103af5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610300565b6001600160a01b0382166104105760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610300565b6001600160a01b038381165f8181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b5f61047b8484610323565b90505f1981146104e257818110156104d55760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610300565b6104e2848484840361034d565b50505050565b6001600160a01b03831661054c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610300565b6001600160a01b0382166105ae5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610300565b6001600160a01b0383165f90815260336020526040902054818110156106255760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610300565b6001600160a01b038085165f9081526033602052604080822085850390559185168152908120805484929061065b908490610805565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516106a791815260200190565b60405180910390a36104e2565b5f602080835283518060208501525f5b818110156106e0578581018301518582016040015282016106c4565b505f604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b0381168114610716575f80fd5b919050565b5f806040838503121561072c575f80fd5b61073583610700565b946020939093013593505050565b5f805f60608486031215610755575f80fd5b61075e84610700565b925061076c60208501610700565b9150604084013590509250925092565b5f6020828403121561078c575f80fd5b61079582610700565b9392505050565b5f80604083850312156107ad575f80fd5b6107b683610700565b91506107c460208401610700565b90509250929050565b600181811c908216806107e157607f821691505b6020821081036107ff57634e487b7160e01b5f52602260045260245ffd5b50919050565b8082018082111561023e57634e487b7160e01b5f52601160045260245ffdfea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class ERC20Upgradeable__factory extends ethers_1.ContractFactory {
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
exports.ERC20Upgradeable__factory = ERC20Upgradeable__factory;
ERC20Upgradeable__factory.bytecode = _bytecode;
ERC20Upgradeable__factory.abi = _abi;