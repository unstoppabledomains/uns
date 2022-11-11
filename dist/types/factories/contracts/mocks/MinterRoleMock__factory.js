"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinterRoleMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
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
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32",
            },
        ],
        name: "RoleAdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleRevoked",
        type: "event",
    },
    {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
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
        inputs: [],
        name: "MINTER_ROLE",
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
                name: "account",
                type: "address",
            },
        ],
        name: "addMinter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "accounts",
                type: "address[]",
            },
        ],
        name: "addMinters",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "receiver",
                type: "address",
            },
        ],
        name: "closeMinter",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleAdmin",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "hasRole",
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
        ],
        name: "isMinter",
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
        name: "olnyMinterFunc",
        outputs: [],
        stateMutability: "nonpayable",
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
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "removeMinter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "accounts",
                type: "address[]",
            },
        ],
        name: "removeMinters",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceMinter",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "receiver",
                type: "address",
            },
        ],
        name: "rotateMinter",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
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
const _bytecode = "0x608060405234801561001057600080fd5b5061118e806100206000396000f3fe60806040526004361061012a5760003560e01c806381c81d35116100ab578063a217fddf1161006f578063a217fddf14610311578063aa271e1a14610326578063d539139314610346578063d547741f14610368578063ecfdcfb814610388578063f2fde38b1461039d57600080fd5b806381c81d35146102815780638da5cb5b1461029457806391d14854146102bc578063983b2d56146102dc57806398650275146102fc57600080fd5b80635fc1964f116100f25780635fc1964f14610204578063634486da14610224578063715018a61461023757806371e2a6571461024c5780638129fc1c1461026c57600080fd5b806301ffc9a71461012f578063248a9ca3146101645780632f2ff15d146101a25780633092afd5146101c457806336568abe146101e4575b600080fd5b34801561013b57600080fd5b5061014f61014a366004610f37565b6103bd565b60405190151581526020015b60405180910390f35b34801561017057600080fd5b5061019461017f366004610ef0565b60009081526097602052604090206001015490565b60405190815260200161015b565b3480156101ae57600080fd5b506101c26101bd366004610f08565b6103f4565b005b3480156101d057600080fd5b506101c26101df366004610e0d565b61041e565b3480156101f057600080fd5b506101c26101ff366004610f08565b610432565b34801561021057600080fd5b506101c261021f366004610e29565b6104b5565b6101c2610232366004610e0d565b61050b565b34801561024357600080fd5b506101c26105cc565b34801561025857600080fd5b506101c2610267366004610e29565b6105e0565b34801561027857600080fd5b506101c2610636565b6101c261028f366004610e0d565b610746565b3480156102a057600080fd5b506033546040516001600160a01b03909116815260200161015b565b3480156102c857600080fd5b5061014f6102d7366004610f08565b6107c1565b3480156102e857600080fd5b506101c26102f7366004610e0d565b6107ec565b34801561030857600080fd5b506101c26107fd565b34801561031d57600080fd5b50610194600081565b34801561033257600080fd5b5061014f610341366004610e0d565b610815565b34801561035257600080fd5b5061019460008051602061116283398151915281565b34801561037457600080fd5b506101c2610383366004610f08565b61082f565b34801561039457600080fd5b506101c2610854565b3480156103a957600080fd5b506101c26103b8366004610e0d565b610879565b60006001600160e01b03198216637965db0b60e01b14806103ee57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60008281526097602052604090206001015461040f81610895565b610419838361089f565b505050565b610426610925565b61042f8161097f565b50565b6001600160a01b03811633146104a75760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6104b18282610997565b5050565b6104bd610925565b60005b81518110156104b1576104f98282815181106104ec57634e487b7160e01b600052603260045260246000fd5b602002602001015161097f565b8061050381611105565b9150506104c0565b61051433610815565b6105305760405162461bcd60e51b815260040161049e90611007565b6001600160a01b0381166105865760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d505459000000604482015260640161049e565b61058f816109fe565b6105976107fd565b6040516001600160a01b038216903480156108fc02916000818181858888f193505050501580156104b1573d6000803e3d6000fd5b6105d4610925565b6105de6000610a16565b565b6105e8610925565b60005b81518110156104b15761062482828151811061061757634e487b7160e01b600052603260045260246000fd5b60200260200101516109fe565b8061062e81611105565b9150506105eb565b600054610100900460ff16158080156106565750600054600160ff909116105b806106705750303b158015610670575060005460ff166001145b6106d35760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161049e565b6000805460ff1916600117905580156106f6576000805461ff0019166101001790555b6106fe610a68565b801561042f576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150565b61074f33610815565b61076b5760405162461bcd60e51b815260040161049e90611007565b6001600160a01b03811661058f5760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d505459000000604482015260640161049e565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6107f4610925565b61042f816109fe565b6105de60008051602061116283398151915233610432565b60006103ee600080516020611162833981519152836107c1565b60008281526097602052604090206001015461084a81610895565b6104198383610997565b61085d33610815565b6105de5760405162461bcd60e51b815260040161049e90611007565b610881610925565b61088a81610aa7565b61042f600082610b1d565b61042f8133610b27565b6108a982826107c1565b6104b15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff191660011790556108e13390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6033546001600160a01b031633146105de5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161049e565b61042f6000805160206111628339815191528261082f565b6109a182826107c1565b156104b15760008281526097602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b61042f60008051602061116283398151915282610b1d565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff16610a8f5760405162461bcd60e51b815260040161049e9061103c565b610a97610b8b565b610a9f610bbb565b6105de610be2565b610aaf610925565b6001600160a01b038116610b145760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161049e565b61042f81610a16565b6104b1828261089f565b610b3182826107c1565b6104b157610b49816001600160a01b03166014610c14565b610b54836020610c14565b604051602001610b65929190610f5f565b60408051601f198184030181529082905262461bcd60e51b825261049e91600401610fd4565b600054610100900460ff16610bb25760405162461bcd60e51b815260040161049e9061103c565b6105de33610a16565b600054610100900460ff166105de5760405162461bcd60e51b815260040161049e9061103c565b600054610100900460ff16610c095760405162461bcd60e51b815260040161049e9061103c565b6105de600033610b1d565b60606000610c2383600261109f565b610c2e906002611087565b67ffffffffffffffff811115610c5457634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610c7e576020820181803683370190505b509050600360fc1b81600081518110610ca757634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110610ce457634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000610d0884600261109f565b610d13906001611087565b90505b6001811115610da7576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110610d5557634e487b7160e01b600052603260045260246000fd5b1a60f81b828281518110610d7957634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c93610da0816110ee565b9050610d16565b508315610df65760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161049e565b9392505050565b8035610e088161114c565b919050565b600060208284031215610e1e578081fd5b8135610df68161114c565b60006020808385031215610e3b578182fd5b823567ffffffffffffffff80821115610e52578384fd5b818501915085601f830112610e65578384fd5b813581811115610e7757610e77611136565b8060051b604051601f19603f83011681018181108582111715610e9c57610e9c611136565b604052828152858101935084860182860187018a1015610eba578788fd5b8795505b83861015610ee357610ecf81610dfd565b855260019590950194938601938601610ebe565b5098975050505050505050565b600060208284031215610f01578081fd5b5035919050565b60008060408385031215610f1a578081fd5b823591506020830135610f2c8161114c565b809150509250929050565b600060208284031215610f48578081fd5b81356001600160e01b031981168114610df6578182fd5b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351610f978160178501602088016110be565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351610fc88160288401602088016110be565b01602801949350505050565b6020815260008251806020840152610ff38160408501602087016110be565b601f01601f19169190910160400192915050565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6000821982111561109a5761109a611120565b500190565b60008160001904831182151516156110b9576110b9611120565b500290565b60005b838110156110d95781810151838201526020016110c1565b838111156110e8576000848401525b50505050565b6000816110fd576110fd611120565b506000190190565b600060001982141561111957611119611120565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461042f57600080fdfe9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000804000a";
const isSuperArgs = (xs) => xs.length > 1;
class MinterRoleMock__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.MinterRoleMock__factory = MinterRoleMock__factory;
MinterRoleMock__factory.bytecode = _bytecode;
MinterRoleMock__factory.abi = _abi;
