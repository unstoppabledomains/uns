"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerSmartAccount__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract IFaucet",
                name: "_faucet",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "targets",
                type: "address[]",
            },
            {
                internalType: "bytes[]",
                name: "datas",
                type: "bytes[]",
            },
            {
                internalType: "uint256[]",
                name: "values",
                type: "uint256[]",
            },
        ],
        name: "executeBatch",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "targets",
                type: "address[]",
            },
            {
                internalType: "bytes[]",
                name: "datas",
                type: "bytes[]",
            },
            {
                internalType: "uint256[]",
                name: "values",
                type: "uint256[]",
            },
        ],
        name: "executeBatchAndEnsureBalance",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "faucet",
        outputs: [
            {
                internalType: "contract IFaucet",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];
const _bytecode = "0x60a060405234801561000f575f80fd5b5060405161061938038061061983398101604081905261002e9161003f565b6001600160a01b031660805261006c565b5f6020828403121561004f575f80fd5b81516001600160a01b0381168114610065575f80fd5b9392505050565b6080516105886100915f395f81816074015281816102b0015261033701526105885ff3fe608060405260043610610034575f3560e01c8063b77ce5641461003d578063d075a8c814610050578063de5f72fd1461006357005b3661003b57005b005b61003b61004b3660046103ee565b6100b2565b61003b61005e3660046103ee565b610271565b34801561006e575f80fd5b506100967f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200160405180910390f35b3330146100da5760405162461bcd60e51b81526004016100d190610481565b60405180910390fd5b84831480156100e857508481145b61013e5760405162461bcd60e51b815260206004820152602160248201527f576f726b6572536d6172744163636f756e743a20496e76616c69642063616c6c6044820152607360f81b60648201526084016100d1565b5f5b85811015610268575f87878381811061015b5761015b6104d1565b905060200201602081019061017091906104e5565b6001600160a01b031684848481811061018b5761018b6104d1565b905060200201358787858181106101a4576101a46104d1565b90506020028101906101b69190610512565b6040516101c4929190610555565b5f6040518083038185875af1925050503d805f81146101fe576040519150601f19603f3d011682016040523d82523d5f602084013e610203565b606091505b505090508061025f5760405162461bcd60e51b815260206004820152602260248201527f576f726b6572536d6172744163636f756e743a2045786563757465206661696c604482015261195960f21b60648201526084016100d1565b50600101610140565b50505050505050565b3330146102905760405162461bcd60e51b81526004016100d190610481565b61029e8686868686866100b2565b6102a66102ae565b505050505050565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316639e6c39926040518163ffffffff1660e01b8152600401602060405180830381865afa15801561030a573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061032e9190610564565b4710156103a4577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166386cb61c26040518163ffffffff1660e01b81526004015f604051808303815f87803b15801561038d575f80fd5b505af115801561039f573d5f803e3d5ffd5b505050505b565b5f8083601f8401126103b6575f80fd5b50813567ffffffffffffffff8111156103cd575f80fd5b6020830191508360208260051b85010111156103e7575f80fd5b9250929050565b5f805f805f8060608789031215610403575f80fd5b863567ffffffffffffffff8082111561041a575f80fd5b6104268a838b016103a6565b9098509650602089013591508082111561043e575f80fd5b61044a8a838b016103a6565b90965094506040890135915080821115610462575f80fd5b5061046f89828a016103a6565b979a9699509497509295939492505050565b60208082526030908201527f576f726b6572536d6172744163636f756e743a2043616e206265206f6e6c792060408201526f31b0b63632b210333937b69039b2b63360811b606082015260800190565b634e487b7160e01b5f52603260045260245ffd5b5f602082840312156104f5575f80fd5b81356001600160a01b038116811461050b575f80fd5b9392505050565b5f808335601e19843603018112610527575f80fd5b83018035915067ffffffffffffffff821115610541575f80fd5b6020019150368190038213156103e7575f80fd5b818382375f9101908152919050565b5f60208284031215610574575f80fd5b505191905056fea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class WorkerSmartAccount__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(_faucet, overrides) {
        return super.getDeployTransaction(_faucet, overrides || {});
    }
    deploy(_faucet, overrides) {
        return super.deploy(_faucet, overrides || {});
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
exports.WorkerSmartAccount__factory = WorkerSmartAccount__factory;
WorkerSmartAccount__factory.bytecode = _bytecode;
WorkerSmartAccount__factory.abi = _abi;
