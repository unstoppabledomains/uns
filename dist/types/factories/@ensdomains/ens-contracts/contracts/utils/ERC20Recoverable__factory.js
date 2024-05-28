"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20Recoverable__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        inputs: [],
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
                internalType: "address",
                name: "_token",
                type: "address",
            },
            {
                internalType: "address",
                name: "_to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "recoverFunds",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561000f575f80fd5b506100193361001e565b61006d565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6102f38061007a5f395ff3fe608060405234801561000f575f80fd5b506004361061004a575f3560e01c80635d3590d51461004e578063715018a6146100635780638da5cb5b1461006b578063f2fde38b14610089575b5f80fd5b61006161005c36600461026e565b61009c565b005b61006161011a565b5f54604080516001600160a01b039092168252519081900360200190f35b6100616100973660046102a7565b61012d565b6100a46101ab565b60405163a9059cbb60e01b81526001600160a01b0383811660048301526024820183905284169063a9059cbb906044016020604051808303815f875af11580156100f0573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061011491906102c7565b50505050565b6101226101ab565b61012b5f610204565b565b6101356101ab565b6001600160a01b03811661019f5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b6101a881610204565b50565b5f546001600160a01b0316331461012b5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610196565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80356001600160a01b0381168114610269575f80fd5b919050565b5f805f60608486031215610280575f80fd5b61028984610253565b925061029760208501610253565b9150604084013590509250925092565b5f602082840312156102b7575f80fd5b6102c082610253565b9392505050565b5f602082840312156102d7575f80fd5b815180151581146102c0575f80fdfea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class ERC20Recoverable__factory extends ethers_1.ContractFactory {
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
exports.ERC20Recoverable__factory = ERC20Recoverable__factory;
ERC20Recoverable__factory.bytecode = _bytecode;
ERC20Recoverable__factory.abi = _abi;
