"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DotCoinBurner__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract IUNSRegistry",
                name: "unsRegistry",
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
                internalType: "uint256",
                name: "first",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "last",
                type: "uint256",
            },
        ],
        name: "BatchCompleted",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "labelHashes",
                type: "uint256[]",
            },
        ],
        name: "burnAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60a060405234801561000f575f80fd5b5060405161043238038061043283398101604081905261002e9161003f565b6001600160a01b031660805261006c565b5f6020828403121561004f575f80fd5b81516001600160a01b0381168114610065575f80fd5b9392505050565b6080516103af6100835f395f60cf01526103af5ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063100cdd911461002d575b5f80fd5b61004061003b3660046102cd565b610042565b005b5f5b818110156101b8575f7f7674e7282552c15f203b9c4a6025aeaf28176ef7f5451b280f9bada3f8bc98e28484848181106100805761008061033c565b905060200201356040516020016100a1929190918252602082015260400190565b60408051808303601f190181529082905280516020909101206331a9108f60e11b82526004820181905291507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906323b872dd908290636352211e90602401602060405180830381865afa158015610124573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906101489190610350565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015261dead6024820152604481018490526064015f604051808303815f87803b158015610195575f80fd5b505af11580156101a7573d5f803e3d5ffd5b505060019093019250610044915050565b5080156102c9577f7674e7282552c15f203b9c4a6025aeaf28176ef7f5451b280f9bada3f8bc98e282826101ed60018261037d565b8181106101fc576101fc61033c565b9050602002013560405160200161021d929190918252602082015260400190565b604051602081830303815290604052805190602001205f1c7f7674e7282552c15f203b9c4a6025aeaf28176ef7f5451b280f9bada3f8bc98e283835f8181106102685761026861033c565b90506020020135604051602001610289929190918252602082015260400190565b60408051601f19818403018152908290528051602090910120907fdf423376f9b0ab363b1b4d6f0b4cb6821921ec30f491555a97236a8a38ce095a905f90a35b5050565b5f80602083850312156102de575f80fd5b823567ffffffffffffffff808211156102f5575f80fd5b818501915085601f830112610308575f80fd5b813581811115610316575f80fd5b8660208260051b850101111561032a575f80fd5b60209290920196919550909350505050565b634e487b7160e01b5f52603260045260245ffd5b5f60208284031215610360575f80fd5b81516001600160a01b0381168114610376575f80fd5b9392505050565b8181038181111561039c57634e487b7160e01b5f52601160045260245ffd5b9291505056fea164736f6c6343000818000a";
const isSuperArgs = (xs) => xs.length > 1;
class DotCoinBurner__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(unsRegistry, overrides) {
        return super.getDeployTransaction(unsRegistry, overrides || {});
    }
    deploy(unsRegistry, overrides) {
        return super.deploy(unsRegistry, overrides || {});
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
exports.DotCoinBurner__factory = DotCoinBurner__factory;
DotCoinBurner__factory.bytecode = _bytecode;
DotCoinBurner__factory.abi = _abi;
