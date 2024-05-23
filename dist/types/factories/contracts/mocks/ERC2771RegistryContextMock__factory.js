"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC2771RegistryContextMock__factory = void 0;
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
        inputs: [
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "execute",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
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
                name: "forwarder",
                type: "address",
            },
        ],
        name: "isTrustedForwarder",
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
        name: "msgData",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "msgSender",
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
        name: "msgToken",
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
];
const _bytecode = "0x608060405234801561000f575f80fd5b506105388061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610060575f3560e01c806309c5eabe14610064578063572b6c051461008e5780638129fc1c146100ba578063c4c2bfdc146100c4578063d737d0c7146100da578063f4b06cd8146100fa575b5f80fd5b610077610072366004610368565b610110565b6040516100859291906103d4565b60405180910390f35b6100aa61009c36600461042a565b6001600160a01b0316301490565b6040519015158152602001610085565b6100c2610177565b005b6100cc610287565b604051610085929190610457565b6100e2610299565b6040516001600160a01b039091168152602001610085565b6101026102a7565b604051908152602001610085565b5f6060306001600160a01b0316848460405161012d929190610485565b5f604051808303815f865af19150503d805f8114610166576040519150601f19603f3d011682016040523d82523d5f602084013e61016b565b606091505b50915091509250929050565b5f54610100900460ff161580801561019557505f54600160ff909116105b806101ae5750303b1580156101ae57505f5460ff166001145b6102165760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b5f805460ff191660011790558015610237575f805461ff0019166101001790555b61023f6102b0565b8015610284575f805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50565b365f6102916102e8565b915091509091565b5f6102a2610313565b905090565b5f6102a2610330565b5f54610100900460ff166102d65760405162461bcd60e51b815260040161020d90610494565b6102de610342565b6102e6610342565b565b365f30330361030c575f80366102ff6034826104df565b9261029193929190610504565b5f36610291565b5f303303610328575060331936013560601c90565b503390565b90565b5f30330361032d5750601f1936013590565b5f54610100900460ff166102e65760405162461bcd60e51b815260040161020d90610494565b5f8060208385031215610379575f80fd5b823567ffffffffffffffff80821115610390575f80fd5b818501915085601f8301126103a3575f80fd5b8135818111156103b1575f80fd5b8660208285010111156103c2575f80fd5b60209290920196919550909350505050565b82151581525f60206040602084015283518060408501525f5b81811015610409578581018301518582016060015282016103ed565b505f606082860101526060601f19601f830116850101925050509392505050565b5f6020828403121561043a575f80fd5b81356001600160a01b0381168114610450575f80fd5b9392505050565b60208152816020820152818360408301375f818301604090810191909152601f909201601f19160101919050565b818382375f9101908152919050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b818103818111156104fe57634e487b7160e01b5f52601160045260245ffd5b92915050565b5f8085851115610512575f80fd5b8386111561051e575f80fd5b505082019391909203915056fea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class ERC2771RegistryContextMock__factory extends ethers_1.ContractFactory {
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
exports.ERC2771RegistryContextMock__factory = ERC2771RegistryContextMock__factory;
ERC2771RegistryContextMock__factory.bytecode = _bytecode;
ERC2771RegistryContextMock__factory.abi = _abi;
