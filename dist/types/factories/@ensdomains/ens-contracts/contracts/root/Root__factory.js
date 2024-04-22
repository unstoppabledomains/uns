"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract ENS",
                name: "_ens",
                type: "address",
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
                name: "controller",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "enabled",
                type: "bool",
            },
        ],
        name: "ControllerChanged",
        type: "event",
    },
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
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "label",
                type: "bytes32",
            },
        ],
        name: "TLDLocked",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "controllers",
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
        name: "ens",
        outputs: [
            {
                internalType: "contract ENS",
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
                name: "label",
                type: "bytes32",
            },
        ],
        name: "lock",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "locked",
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
                name: "controller",
                type: "address",
            },
            {
                internalType: "bool",
                name: "enabled",
                type: "bool",
            },
        ],
        name: "setController",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
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
        outputs: [],
        stateMutability: "nonpayable",
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
        stateMutability: "pure",
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405161073e38038061073e83398101604081905261002f916100ad565b6100383361005d565b600280546001600160a01b0319166001600160a01b03929092169190911790556100dd565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100bf57600080fd5b81516001600160a01b03811681146100d657600080fd5b9392505050565b610652806100ec6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80638cb8ecec116100715780638cb8ecec146101425780638da5cb5b14610155578063cbe9e76414610166578063da8c229e14610189578063e0dba60f146101ac578063f2fde38b146101bf57600080fd5b806301670ba9146100ae57806301ffc9a7146100c35780633f15457f146100fc5780634e543b2614610127578063715018a61461013a575b600080fd5b6100c16100bc366004610543565b6101d2565b005b6100e76100d136600461055c565b6001600160e01b0319166301ffc9a760e01b1490565b60405190151581526020015b60405180910390f35b60025461010f906001600160a01b031681565b6040516001600160a01b0390911681526020016100f3565b6100c16101353660046105a9565b610220565b6100c1610291565b6100c16101503660046105c4565b6102a5565b6000546001600160a01b031661010f565b6100e7610174366004610543565b60036020526000908152604090205460ff1681565b6100e76101973660046105a9565b60016020526000908152604090205460ff1681565b6100c16101ba3660046105f0565b6103b9565b6100c16101cd3660046105a9565b610420565b6101da610499565b60405181907f1764176cfa565853ba1ded547a830a9f9bff95231ef6fd228b3ddd617577756990600090a26000908152600360205260409020805460ff19166001179055565b610228610499565b600254604051630c4b7b8560e11b8152600060048201526001600160a01b03838116602483015290911690631896f70a90604401600060405180830381600087803b15801561027657600080fd5b505af115801561028a573d6000803e3d6000fd5b5050505050565b610299610499565b6102a360006104f3565b565b3360009081526001602052604090205460ff1661031a5760405162461bcd60e51b815260206004820152602860248201527f436f6e74726f6c6c61626c653a2043616c6c6572206973206e6f74206120636f604482015267373a3937b63632b960c11b60648201526084015b60405180910390fd5b60008281526003602052604090205460ff161561033657600080fd5b6002546040516306ab592360e01b815260006004820152602481018490526001600160a01b038381166044830152909116906306ab5923906064016020604051808303816000875af1158015610390573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103b4919061062c565b505050565b6103c1610499565b6001600160a01b038216600081815260016020908152604091829020805460ff191685151590811790915591519182527f4c97694570a07277810af7e5669ffd5f6a2d6b74b6e9a274b8b870fd5114cf87910160405180910390a25050565b610428610499565b6001600160a01b03811661048d5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610311565b610496816104f3565b50565b6000546001600160a01b031633146102a35760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610311565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020828403121561055557600080fd5b5035919050565b60006020828403121561056e57600080fd5b81356001600160e01b03198116811461058657600080fd5b9392505050565b80356001600160a01b03811681146105a457600080fd5b919050565b6000602082840312156105bb57600080fd5b6105868261058d565b600080604083850312156105d757600080fd5b823591506105e76020840161058d565b90509250929050565b6000806040838503121561060357600080fd5b61060c8361058d565b91506020830135801515811461062157600080fd5b809150509250929050565b60006020828403121561063e57600080fd5b505191905056fea164736f6c6343000811000a";
const isSuperArgs = (xs) => xs.length > 1;
class Root__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(_ens, overrides) {
        return super.getDeployTransaction(_ens, overrides || {});
    }
    deploy(_ens, overrides) {
        return super.deploy(_ens, overrides || {});
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
exports.Root__factory = Root__factory;
Root__factory.bytecode = _bytecode;
Root__factory.abi = _abi;
