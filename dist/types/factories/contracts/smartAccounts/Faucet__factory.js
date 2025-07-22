"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faucet__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "NotAuthorizedWorker",
        type: "error",
    },
    {
        inputs: [],
        name: "NotSelf",
        type: "error",
    },
    {
        inputs: [],
        name: "TransferFailed",
        type: "error",
    },
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "workers",
                type: "address[]",
            },
        ],
        name: "addAuthorizedWorkers",
        outputs: [],
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
        name: "authorizedWorkers",
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
                internalType: "address[]",
                name: "workers",
                type: "address[]",
            },
        ],
        name: "removeAuthorizedWorkers",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "requestFunding",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "threshold",
                type: "uint256",
            },
        ],
        name: "setWorkerBalanceThreshold",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "setWorkerFundingAmount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "workerBalanceThreshold",
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
        name: "workerFundingAmount",
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
        stateMutability: "payable",
        type: "receive",
    },
];
const _bytecode = "0x608060405234801561000f575f80fd5b506104ae8061001d5f395ff3fe608060405260043610610078575f3560e01c80639e6c39921161004a5780639e6c399214610125578063af9b818714610139578063c2352bbb1461014d578063eee517061461016c57005b80631ebf770c146100815780638b6d5fb7146100a05780638f5bdbb9146100bf578063919f4ca3146100e757005b3661007f57005b005b34801561008c575f80fd5b5061007f61009b3660046103da565b61018b565b3480156100ab575f80fd5b5061007f6100ba3660046103f1565b6101b0565b3480156100ca575f80fd5b506100d460015481565b6040519081526020015b60405180910390f35b3480156100f2575f80fd5b50610115610101366004610460565b60026020525f908152604090205460ff1681565b60405190151581526020016100de565b348015610130575f80fd5b506100d45f5481565b348015610144575f80fd5b5061007f610239565b348015610158575f80fd5b5061007f6101673660046103da565b6102d2565b348015610177575f80fd5b5061007f6101863660046103f1565b6102f6565b3330146101ab576040516314e1dbf760e11b815260040160405180910390fd5b600155565b3330146101d0576040516314e1dbf760e11b815260040160405180910390fd5b5f5b81811015610234575f60025f8585858181106101f0576101f061048d565b90506020020160208101906102059190610460565b6001600160a01b0316815260208101919091526040015f20805460ff19169115159190911790556001016101d2565b505050565b335f9081526002602052604090205460ff166102685760405163738e2b6d60e11b815260040160405180910390fd5b6001546040515f9133918381818185875af1925050503d805f81146102a8576040519150601f19603f3d011682016040523d82523d5f602084013e6102ad565b606091505b50509050806102cf576040516312171d8360e31b815260040160405180910390fd5b50565b3330146102f2576040516314e1dbf760e11b815260040160405180910390fd5b5f55565b333014610316576040516314e1dbf760e11b815260040160405180910390fd5b5f5b8181101561023457600160025f8585858181106103375761033761048d565b905060200201602081019061034c9190610460565b6001600160a01b0316815260208101919091526040015f20805460ff19169115159190911790558282828181106103855761038561048d565b905060200201602081019061039a9190610460565b6001600160a01b03166108fc60015490811502906040515f60405180830381858888f193505050501580156103d1573d5f803e3d5ffd5b50600101610318565b5f602082840312156103ea575f80fd5b5035919050565b5f8060208385031215610402575f80fd5b823567ffffffffffffffff80821115610419575f80fd5b818501915085601f83011261042c575f80fd5b81358181111561043a575f80fd5b8660208260051b850101111561044e575f80fd5b60209290920196919550909350505050565b5f60208284031215610470575f80fd5b81356001600160a01b0381168114610486575f80fd5b9392505050565b634e487b7160e01b5f52603260045260245ffdfea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class Faucet__factory extends ethers_1.ContractFactory {
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
exports.Faucet__factory = Faucet__factory;
Faucet__factory.bytecode = _bytecode;
Faucet__factory.abi = _abi;
