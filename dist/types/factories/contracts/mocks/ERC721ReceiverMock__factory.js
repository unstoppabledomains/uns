"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC721ReceiverMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "onERC721Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561000f575f80fd5b506101798061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063150b7a021461002d575b5f80fd5b61004b61003b366004610097565b630a85bd0160e11b949350505050565b6040516001600160e01b0319909116815260200160405180910390f35b80356001600160a01b038116811461007e575f80fd5b919050565b634e487b7160e01b5f52604160045260245ffd5b5f805f80608085870312156100aa575f80fd5b6100b385610068565b93506100c160208601610068565b925060408501359150606085013567ffffffffffffffff808211156100e4575f80fd5b818701915087601f8301126100f7575f80fd5b81358181111561010957610109610083565b604051601f8201601f19908116603f0116810190838211818310171561013157610131610083565b816040528281528a6020848701011115610149575f80fd5b826020860160208301375f6020848301015280955050505050509295919450925056fea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class ERC721ReceiverMock__factory extends ethers_1.ContractFactory {
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
exports.ERC721ReceiverMock__factory = ERC721ReceiverMock__factory;
ERC721ReceiverMock__factory.bytecode = _bytecode;
ERC721ReceiverMock__factory.abi = _abi;
