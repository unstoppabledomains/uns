"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReverseClaimer__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract ENS",
                name: "ens",
                type: "address",
            },
            {
                internalType: "address",
                name: "claimant",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506040516101e63803806101e683398101604081905261002f9161014b565b6040516302571be360e01b81527f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e260048201526000906001600160a01b038416906302571be390602401602060405180830381865afa158015610096573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100ba9190610185565b604051630f41a04d60e11b81526001600160a01b03848116600483015291925090821690631e83409a906024016020604051808303816000875af1158015610106573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061012a91906101a9565b505050506101c2565b6001600160a01b038116811461014857600080fd5b50565b6000806040838503121561015e57600080fd5b825161016981610133565b602084015190925061017a81610133565b809150509250929050565b60006020828403121561019757600080fd5b81516101a281610133565b9392505050565b6000602082840312156101bb57600080fd5b5051919050565b6016806101d06000396000f3fe6080604052600080fdfea164736f6c6343000811000a";
const isSuperArgs = (xs) => xs.length > 1;
class ReverseClaimer__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(ens, claimant, overrides) {
        return super.getDeployTransaction(ens, claimant, overrides || {});
    }
    deploy(ens, claimant, overrides) {
        return super.deploy(ens, claimant, overrides || {});
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
exports.ReverseClaimer__factory = ReverseClaimer__factory;
ReverseClaimer__factory.bytecode = _bytecode;
ReverseClaimer__factory.abi = _abi;
