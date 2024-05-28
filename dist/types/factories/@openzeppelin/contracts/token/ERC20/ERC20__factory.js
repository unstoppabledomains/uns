"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "name_",
                type: "string",
            },
            {
                internalType: "string",
                name: "symbol_",
                type: "string",
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
const _bytecode = "0x608060405234801562000010575f80fd5b5060405162000aeb38038062000aeb83398101604081905262000033916200011a565b60036200004183826200020a565b5060046200005082826200020a565b505050620002d6565b634e487b7160e01b5f52604160045260245ffd5b5f82601f8301126200007d575f80fd5b81516001600160401b03808211156200009a576200009a62000059565b604051601f8301601f19908116603f01168101908282118183101715620000c557620000c562000059565b8160405283815260209250866020858801011115620000e2575f80fd5b5f91505b83821015620001055785820183015181830184015290820190620000e6565b5f602085830101528094505050505092915050565b5f80604083850312156200012c575f80fd5b82516001600160401b038082111562000143575f80fd5b62000151868387016200006d565b9350602085015191508082111562000167575f80fd5b5062000176858286016200006d565b9150509250929050565b600181811c908216806200019557607f821691505b602082108103620001b457634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156200020557805f5260205f20601f840160051c81016020851015620001e15750805b601f840160051c820191505b8181101562000202575f8155600101620001ed565b50505b505050565b81516001600160401b0381111562000226576200022662000059565b6200023e8162000237845462000180565b84620001ba565b602080601f83116001811462000274575f84156200025c5750858301515b5f19600386901b1c1916600185901b178555620002ce565b5f85815260208120601f198616915b82811015620002a45788860151825594840194600190910190840162000283565b5085821015620002c257878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b61080780620002e45f395ff3fe608060405234801561000f575f80fd5b50600436106100a6575f3560e01c8063395093511161006e578063395093511461011f57806370a082311461013257806395d89b411461015a578063a457c2d714610162578063a9059cbb14610175578063dd62ed3e14610188575f80fd5b806306fdde03146100aa578063095ea7b3146100c857806318160ddd146100eb57806323b872dd146100fd578063313ce56714610110575b5f80fd5b6100b261019b565b6040516100bf919061068a565b60405180910390f35b6100db6100d63660046106f1565b61022b565b60405190151581526020016100bf565b6002545b6040519081526020016100bf565b6100db61010b366004610719565b610244565b604051601281526020016100bf565b6100db61012d3660046106f1565b610267565b6100ef610140366004610752565b6001600160a01b03165f9081526020819052604090205490565b6100b2610288565b6100db6101703660046106f1565b610297565b6100db6101833660046106f1565b610316565b6100ef610196366004610772565b610323565b6060600380546101aa906107a3565b80601f01602080910402602001604051908101604052809291908181526020018280546101d6906107a3565b80156102215780601f106101f857610100808354040283529160200191610221565b820191905f5260205f20905b81548152906001019060200180831161020457829003601f168201915b5050505050905090565b5f3361023881858561034d565b60019150505b92915050565b5f33610251858285610470565b61025c8585856104e8565b506001949350505050565b5f336102388185856102798383610323565b61028391906107db565b61034d565b6060600480546101aa906107a3565b5f33816102a48286610323565b9050838110156103095760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b61025c828686840361034d565b5f336102388185856104e8565b6001600160a01b039182165f90815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166103af5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610300565b6001600160a01b0382166104105760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610300565b6001600160a01b038381165f8181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b5f61047b8484610323565b90505f1981146104e257818110156104d55760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610300565b6104e2848484840361034d565b50505050565b6001600160a01b03831661054c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610300565b6001600160a01b0382166105ae5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610300565b6001600160a01b0383165f90815260208190526040902054818110156106255760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610300565b6001600160a01b038481165f81815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36104e2565b5f602080835283518060208501525f5b818110156106b65785810183015185820160400152820161069a565b505f604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b03811681146106ec575f80fd5b919050565b5f8060408385031215610702575f80fd5b61070b836106d6565b946020939093013593505050565b5f805f6060848603121561072b575f80fd5b610734846106d6565b9250610742602085016106d6565b9150604084013590509250925092565b5f60208284031215610762575f80fd5b61076b826106d6565b9392505050565b5f8060408385031215610783575f80fd5b61078c836106d6565b915061079a602084016106d6565b90509250929050565b600181811c908216806107b757607f821691505b6020821081036107d557634e487b7160e01b5f52602260045260245ffd5b50919050565b8082018082111561023e57634e487b7160e01b5f52601160045260245ffdfea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class ERC20__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(name_, symbol_, overrides) {
        return super.getDeployTransaction(name_, symbol_, overrides || {});
    }
    deploy(name_, symbol_, overrides) {
        return super.deploy(name_, symbol_, overrides || {});
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
exports.ERC20__factory = ERC20__factory;
ERC20__factory.bytecode = _bytecode;
ERC20__factory.abi = _abi;
