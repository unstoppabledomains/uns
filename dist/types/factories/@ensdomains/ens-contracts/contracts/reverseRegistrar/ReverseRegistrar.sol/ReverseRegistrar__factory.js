"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReverseRegistrar__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract ENS",
                name: "ensAddr",
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
                internalType: "contract NameResolver",
                name: "resolver",
                type: "address",
            },
        ],
        name: "DefaultResolverChanged",
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
                internalType: "address",
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "ReverseClaimed",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "claim",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
        ],
        name: "claimForAddr",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
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
                name: "resolver",
                type: "address",
            },
        ],
        name: "claimWithResolver",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
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
        name: "defaultResolver",
        outputs: [
            {
                internalType: "contract NameResolver",
                name: "",
                type: "address",
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
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "node",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "pure",
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
        name: "setDefaultResolver",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
        ],
        name: "setName",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
        ],
        name: "setNameForAddr",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
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
const _bytecode = "0x60a060405234801561000f575f80fd5b50604051610e14380380610e1483398101604081905261002e916101ab565b61003733610145565b6001600160a01b03811660808190526040516302571be360e01b81527f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e260048201525f91906302571be390602401602060405180830381865afa1580156100a0573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906100c491906101ab565b90506001600160a01b0381161561013e57604051630f41a04d60e11b81523360048201526001600160a01b03821690631e83409a906024016020604051808303815f875af1158015610118573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061013c91906101cd565b505b50506101e4565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03811681146101a8575f80fd5b50565b5f602082840312156101bb575f80fd5b81516101c681610194565b9392505050565b5f602082840312156101dd575f80fd5b5051919050565b608051610c0a61020a5f395f8181610127015281816102cb01526104c40152610c0a5ff3fe608060405234801561000f575f80fd5b50600436106100e5575f3560e01c80638da5cb5b11610088578063c66485b211610063578063c66485b2146101da578063da8c229e146101ed578063e0dba60f1461021f578063f2fde38b14610232575f80fd5b80638da5cb5b146101a4578063bffbe61c146101b4578063c47f0027146101c7575f80fd5b806365669631116100c35780636566963114610161578063715018a6146101745780637a806d6b1461017e578063828eab0e14610191575f80fd5b80630f5a5466146100e95780631e83409a1461010f5780633f15457f14610122575b5f80fd5b6100fc6100f7366004610958565b610245565b6040519081526020015b60405180910390f35b6100fc61011d36600461098f565b610258565b6101497f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610106565b6100fc61016f3660046109aa565b610279565b61017c610526565b005b6100fc61018c366004610a8f565b610539565b600254610149906001600160a01b031681565b5f546001600160a01b0316610149565b6100fc6101c236600461098f565b6105ae565b6100fc6101d5366004610b00565b610608565b61017c6101e836600461098f565b610624565b61020f6101fb36600461098f565b60016020525f908152604090205460ff1681565b6040519015158152602001610106565b61017c61022d366004610b47565b6106e4565b61017c61024036600461098f565b61074a565b5f610251338484610279565b9392505050565b6002545f9061027390339084906001600160a01b0316610279565b92915050565b5f836001600160a01b0381163314806102a05750335f9081526001602052604090205460ff165b80610334575060405163e985e9c560e01b81526001600160a01b0382811660048301523360248301527f0000000000000000000000000000000000000000000000000000000000000000169063e985e9c590604401602060405180830381865afa158015610310573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103349190610b73565b806103435750610343816107c3565b6103e05760405162461bcd60e51b815260206004820152605b60248201527f526576657273655265676973747261723a2043616c6c6572206973206e6f742060448201527f6120636f6e74726f6c6c6572206f7220617574686f726973656420627920616460648201527f6472657373206f7220746865206164647265737320697473656c660000000000608482015260a4015b60405180910390fd5b5f6103ea8661083a565b604080517f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2602080830191909152818301849052825180830384018152606090920192839052815191012091925081906001600160a01b038916907f6ada868dd3058cf77a48a74489fd7963688e5464b2b0fa957ace976243270e92905f90a36040516305ef2c7f60e41b81527f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e26004820152602481018390526001600160a01b03878116604483015286811660648301525f60848301527f00000000000000000000000000000000000000000000000000000000000000001690635ef2c7f09060a4015f604051808303815f87803b158015610505575f80fd5b505af1158015610517573d5f803e3d5ffd5b50929998505050505050505050565b61052e61089c565b6105375f6108f5565b565b5f80610546868686610279565b604051637737221360e01b81529091506001600160a01b038516906377372213906105779084908790600401610b8e565b5f604051808303815f87803b15801561058e575f80fd5b505af11580156105a0573d5f803e3d5ffd5b509298975050505050505050565b5f7f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e26105d98361083a565b604080516020810193909352820152606001604051602081830303815290604052805190602001209050919050565b6002545f9061027390339081906001600160a01b031685610539565b61062c61089c565b6001600160a01b03811661069b5760405162461bcd60e51b815260206004820152603060248201527f526576657273655265676973747261723a205265736f6c76657220616464726560448201526f07373206d757374206e6f7420626520360841b60648201526084016103d7565b600280546001600160a01b0319166001600160a01b0383169081179091556040517feae17a84d9eb83d8c8eb317f9e7d64857bc363fa51674d996c023f4340c577cf905f90a250565b6106ec61089c565b6001600160a01b0382165f81815260016020908152604091829020805460ff191685151590811790915591519182527f4c97694570a07277810af7e5669ffd5f6a2d6b74b6e9a274b8b870fd5114cf87910160405180910390a25050565b61075261089c565b6001600160a01b0381166107b75760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103d7565b6107c0816108f5565b50565b5f816001600160a01b0316638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801561081e575060408051601f3d908101601f1916820190925261081b91810190610be2565b60015b61082957505f919050565b6001600160a01b0316331492915050565b5f60285b8015610891575f19016f181899199a1a9b1b9c1cb0b131b232b360811b600f84161a81536010909204915f19016f181899199a1a9b1b9c1cb0b131b232b360811b600f84161a815360108304925061083e565b505060285f20919050565b5f546001600160a01b031633146105375760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103d7565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03811681146107c0575f80fd5b5f8060408385031215610969575f80fd5b823561097481610944565b9150602083013561098481610944565b809150509250929050565b5f6020828403121561099f575f80fd5b813561025181610944565b5f805f606084860312156109bc575f80fd5b83356109c781610944565b925060208401356109d781610944565b915060408401356109e781610944565b809150509250925092565b634e487b7160e01b5f52604160045260245ffd5b5f82601f830112610a15575f80fd5b813567ffffffffffffffff80821115610a3057610a306109f2565b604051601f8301601f19908116603f01168101908282118183101715610a5857610a586109f2565b81604052838152866020858801011115610a70575f80fd5b836020870160208301375f602085830101528094505050505092915050565b5f805f8060808587031215610aa2575f80fd5b8435610aad81610944565b93506020850135610abd81610944565b92506040850135610acd81610944565b9150606085013567ffffffffffffffff811115610ae8575f80fd5b610af487828801610a06565b91505092959194509250565b5f60208284031215610b10575f80fd5b813567ffffffffffffffff811115610b26575f80fd5b610b3284828501610a06565b949350505050565b80151581146107c0575f80fd5b5f8060408385031215610b58575f80fd5b8235610b6381610944565b9150602083013561098481610b3a565b5f60208284031215610b83575f80fd5b815161025181610b3a565b8281525f60206040602084015283518060408501525f5b81811015610bc157858101830151858201606001528201610ba5565b505f606082860101526060601f19601f830116850101925050509392505050565b5f60208284031215610bf2575f80fd5b81516102518161094456fea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class ReverseRegistrar__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(ensAddr, overrides) {
        return super.getDeployTransaction(ensAddr, overrides || {});
    }
    deploy(ensAddr, overrides) {
        return super.deploy(ensAddr, overrides || {});
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
exports.ReverseRegistrar__factory = ReverseRegistrar__factory;
ReverseRegistrar__factory.bytecode = _bytecode;
ReverseRegistrar__factory.abi = _abi;
