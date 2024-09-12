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
        inputs: [],
        name: "DOMAIN_SEPARATOR",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
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
        name: "initialize",
        outputs: [],
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
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "nonces",
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
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
            },
            {
                internalType: "uint8",
                name: "v",
                type: "uint8",
            },
            {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
            },
        ],
        name: "permit",
        outputs: [],
        stateMutability: "nonpayable",
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
const _bytecode = "0x608060405234801561000f575f80fd5b5061130f8061001d5f395ff3fe608060405234801561000f575f80fd5b50600436106100fb575f3560e01c806370a0823111610093578063a457c2d711610063578063a457c2d7146101ef578063a9059cbb14610202578063d505accf14610215578063dd62ed3e14610228575f80fd5b806370a08231146101a45780637ecebe00146101cc5780638129fc1c146101df57806395d89b41146101e7575f80fd5b8063313ce567116100ce578063313ce567146101655780633644e51514610174578063395093511461017c57806340c10f191461018f575f80fd5b806306fdde03146100ff578063095ea7b31461011d57806318160ddd1461014057806323b872dd14610152575b5f80fd5b61010761023b565b6040516101149190610fad565b60405180910390f35b61013061012b366004611014565b6102cb565b6040519015158152602001610114565b6035545b604051908152602001610114565b61013061016036600461103c565b6102e4565b60405160128152602001610114565b6101446102fa565b61013061018a366004611014565b610308565b6101a261019d366004611014565b610329565b005b6101446101b2366004611075565b6001600160a01b03165f9081526033602052604090205490565b6101446101da366004611075565b610337565b6101a2610354565b610107610499565b6101306101fd366004611014565b6104a8565b610130610210366004611014565b61052d565b6101a2610223366004611095565b610541565b610144610236366004611102565b6106a2565b60606036805461024a90611133565b80601f016020809104026020016040519081016040528092919081815260200182805461027690611133565b80156102c15780601f10610298576101008083540402835291602001916102c1565b820191905f5260205f20905b8154815290600101906020018083116102a457829003601f168201915b5050505050905090565b5f336102d88185856106cc565b60019150505b92915050565b5f6102f08484846107ef565b505f949350505050565b5f610303610807565b905090565b5f336102d881858561031a83836106a2565b6103249190611165565b6106cc565b6103338282610880565b5050565b6001600160a01b0381165f908152609960205260408120546102de565b5f54610100900460ff161580801561037257505f54600160ff909116105b8061038b5750303b15801561038b57505f5460ff166001145b6103f35760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b5f805460ff191660011790558015610414575f805461ff0019166101001790555b61042b60405180602001604052805f81525061095c565b61045160405180602001604052805f81525060405180602001604052805f8152506109a5565b8015610496575f805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50565b60606037805461024a90611133565b5f33816104b582866106a2565b9050838110156105155760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016103ea565b61052282868684036106cc565b506001949350505050565b5f61053883836109e9565b505f9392505050565b834211156105915760405162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e6500000060448201526064016103ea565b5f7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98888886105bf8c6109f6565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e0016040516020818303038152906040528051906020012090505f61061982610a1d565b90505f61062882878787610a69565b9050896001600160a01b0316816001600160a01b03161461068b5760405162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e6174757265000060448201526064016103ea565b6106968a8a8a6106cc565b50505050505050505050565b6001600160a01b039182165f90815260346020908152604080832093909416825291909152205490565b6001600160a01b03831661072e5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016103ea565b6001600160a01b03821661078f5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016103ea565b6001600160a01b038381165f8181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b5f336107fc858285610a8f565b610522858585610b07565b5f6103037f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f61083560655490565b6066546040805160208101859052908101839052606081018290524660808201523060a08201525f9060c0016040516020818303038152906040528051906020012090509392505050565b6001600160a01b0382166108d65760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016103ea565b8060355f8282546108e79190611165565b90915550506001600160a01b0382165f9081526033602052604081208054839290610913908490611165565b90915550506040518181526001600160a01b038316905f907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b5f54610100900460ff166109825760405162461bcd60e51b81526004016103ea90611184565b61049681604051806040016040528060018152602001603160f81b815250610cd3565b5f54610100900460ff166109cb5760405162461bcd60e51b81526004016103ea90611184565b60366109d7838261122e565b5060376109e4828261122e565b505050565b5f336102d8818585610b07565b6001600160a01b0381165f9081526099602052604090208054600181018255905b50919050565b5f6102de610a29610807565b8360405161190160f01b602082015260228101839052604281018290525f9060620160405160208183030381529060405280519060200120905092915050565b5f805f610a7887878787610d13565b91509150610a8581610df8565b5095945050505050565b5f610a9a84846106a2565b90505f198114610b015781811015610af45760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016103ea565b610b0184848484036106cc565b50505050565b6001600160a01b038316610b6b5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016103ea565b6001600160a01b038216610bcd5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016103ea565b6001600160a01b0383165f9081526033602052604090205481811015610c445760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016103ea565b6001600160a01b038085165f90815260336020526040808220858503905591851681529081208054849290610c7a908490611165565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610cc691815260200190565b60405180910390a3610b01565b5f54610100900460ff16610cf95760405162461bcd60e51b81526004016103ea90611184565b815160209283012081519190920120606591909155606655565b5f807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115610d4857505f90506003610def565b8460ff16601b14158015610d6057508460ff16601c14155b15610d7057505f90506004610def565b604080515f8082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015610dc1573d5f803e3d5ffd5b5050604051601f1901519150506001600160a01b038116610de9575f60019250925050610def565b91505f90505b94509492505050565b5f816004811115610e0b57610e0b6112ee565b03610e135750565b6001816004811115610e2757610e276112ee565b03610e745760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016103ea565b6002816004811115610e8857610e886112ee565b03610ed55760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016103ea565b6003816004811115610ee957610ee96112ee565b03610f415760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016103ea565b6004816004811115610f5557610f556112ee565b036104965760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b60648201526084016103ea565b5f602080835283518060208501525f5b81811015610fd957858101830151858201604001528201610fbd565b505f604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461100f575f80fd5b919050565b5f8060408385031215611025575f80fd5b61102e83610ff9565b946020939093013593505050565b5f805f6060848603121561104e575f80fd5b61105784610ff9565b925061106560208501610ff9565b9150604084013590509250925092565b5f60208284031215611085575f80fd5b61108e82610ff9565b9392505050565b5f805f805f805f60e0888a0312156110ab575f80fd5b6110b488610ff9565b96506110c260208901610ff9565b95506040880135945060608801359350608088013560ff811681146110e5575f80fd5b9699959850939692959460a0840135945060c09093013592915050565b5f8060408385031215611113575f80fd5b61111c83610ff9565b915061112a60208401610ff9565b90509250929050565b600181811c9082168061114757607f821691505b602082108103610a1757634e487b7160e01b5f52602260045260245ffd5b808201808211156102de57634e487b7160e01b5f52601160045260245ffd5b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b634e487b7160e01b5f52604160045260245ffd5b601f8211156109e457805f5260205f20601f840160051c810160208510156112085750805b601f840160051c820191505b81811015611227575f8155600101611214565b5050505050565b815167ffffffffffffffff811115611248576112486111cf565b61125c816112568454611133565b846111e3565b602080601f83116001811461128f575f84156112785750858301515b5f19600386901b1c1916600185901b1785556112e6565b5f85815260208120601f198616915b828110156112bd5788860151825594840194600190910190840161129e565b50858210156112da57878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b634e487b7160e01b5f52602160045260245ffdfea164736f6c6343000818000a";
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
