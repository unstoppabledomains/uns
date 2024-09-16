"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20UnsafeMock__factory = void 0;
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
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
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
                name: "value",
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
                name: "value",
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
const _bytecode = "0x608060405234801561000f575f80fd5b5060408051602080820183525f808352835191820190935291825290600361003783826100e4565b50600461004482826100e4565b5050506101a3565b634e487b7160e01b5f52604160045260245ffd5b600181811c9082168061007457607f821691505b60208210810361009257634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156100df57805f5260205f20601f840160051c810160208510156100bd5750805b601f840160051c820191505b818110156100dc575f81556001016100c9565b50505b505050565b81516001600160401b038111156100fd576100fd61004c565b6101118161010b8454610060565b84610098565b602080601f831160018114610144575f841561012d5750858301515b5f19600386901b1c1916600185901b17855561019b565b5f85815260208120601f198616915b8281101561017257888601518255948401946001909101908401610153565b508582101561018f57878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b61091c806101b05f395ff3fe608060405234801561000f575f80fd5b50600436106100b1575f3560e01c806340c10f191161006e57806340c10f191461013d57806370a082311461015257806395d89b411461017a578063a457c2d714610182578063a9059cbb14610195578063dd62ed3e146101a8575f80fd5b806306fdde03146100b5578063095ea7b3146100d357806318160ddd146100f657806323b872dd14610108578063313ce5671461011b578063395093511461012a575b5f80fd5b6100bd6101bb565b6040516100ca919061079f565b60405180910390f35b6100e66100e1366004610806565b61024b565b60405190151581526020016100ca565b6002545b6040519081526020016100ca565b6100e661011636600461082e565b610264565b604051601281526020016100ca565b6100e6610138366004610806565b61027a565b61015061014b366004610806565b61029b565b005b6100fa610160366004610867565b6001600160a01b03165f9081526020819052604090205490565b6100bd6102a9565b6100e6610190366004610806565b6102b8565b6100e66101a3366004610806565b610342565b6100fa6101b6366004610887565b610356565b6060600380546101ca906108b8565b80601f01602080910402602001604051908101604052809291908181526020018280546101f6906108b8565b80156102415780601f1061021857610100808354040283529160200191610241565b820191905f5260205f20905b81548152906001019060200180831161022457829003601f168201915b5050505050905090565b5f33610258818585610380565b60019150505b92915050565b5f6102708484846104a3565b505f949350505050565b5f3361025881858561028c8383610356565b61029691906108f0565b610380565b6102a582826104bb565b5050565b6060600480546101ca906108b8565b5f33816102c58286610356565b90508381101561032a5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6103378286868403610380565b506001949350505050565b5f61034d8383610578565b505f9392505050565b6001600160a01b039182165f90815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166103e25760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610321565b6001600160a01b0382166104435760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610321565b6001600160a01b038381165f8181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b5f336104b0858285610585565b6103378585856105fd565b6001600160a01b0382166105115760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610321565b8060025f82825461052291906108f0565b90915550506001600160a01b0382165f81815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b5f336102588185856105fd565b5f6105908484610356565b90505f1981146105f757818110156105ea5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610321565b6105f78484848403610380565b50505050565b6001600160a01b0383166106615760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610321565b6001600160a01b0382166106c35760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610321565b6001600160a01b0383165f908152602081905260409020548181101561073a5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610321565b6001600160a01b038481165f81815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36105f7565b5f602080835283518060208501525f5b818110156107cb578581018301518582016040015282016107af565b505f604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b0381168114610801575f80fd5b919050565b5f8060408385031215610817575f80fd5b610820836107eb565b946020939093013593505050565b5f805f60608486031215610840575f80fd5b610849846107eb565b9250610857602085016107eb565b9150604084013590509250925092565b5f60208284031215610877575f80fd5b610880826107eb565b9392505050565b5f8060408385031215610898575f80fd5b6108a1836107eb565b91506108af602084016107eb565b90509250929050565b600181811c908216806108cc57607f821691505b6020821081036108ea57634e487b7160e01b5f52602260045260245ffd5b50919050565b8082018082111561025e57634e487b7160e01b5f52601160045260245ffdfea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class ERC20UnsafeMock__factory extends ethers_1.ContractFactory {
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
exports.ERC20UnsafeMock__factory = ERC20UnsafeMock__factory;
ERC20UnsafeMock__factory.bytecode = _bytecode;
ERC20UnsafeMock__factory.abi = _abi;
