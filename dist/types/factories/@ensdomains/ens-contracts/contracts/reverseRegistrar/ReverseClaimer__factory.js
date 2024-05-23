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
const _bytecode = "0x608060405234801561000f575f80fd5b506040516101d53803806101d583398101604081905261002e91610143565b6040516302571be360e01b81527f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e260048201525f906001600160a01b038416906302571be390602401602060405180830381865afa158015610092573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906100b6919061017b565b604051630f41a04d60e11b81526001600160a01b03848116600483015291925090821690631e83409a906024016020604051808303815f875af11580156100ff573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610123919061019d565b505050506101b4565b6001600160a01b0381168114610140575f80fd5b50565b5f8060408385031215610154575f80fd5b825161015f8161012c565b60208401519092506101708161012c565b809150509250929050565b5f6020828403121561018b575f80fd5b81516101968161012c565b9392505050565b5f602082840312156101ad575f80fd5b5051919050565b6015806101c05f395ff3fe60806040525f80fdfea164736f6c6343000818000a";
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
