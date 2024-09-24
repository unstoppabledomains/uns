import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { Multicall3, Multicall3Interface } from "../../../contracts/mocks/Multicall3";
declare type Multicall3ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Multicall3__factory extends ContractFactory {
    constructor(...args: Multicall3ConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Multicall3 & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Multicall3__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b50610c4f8061001d5f395ff3fe6080604052600436106100ef575f3560e01c80634d2301cc11610087578063a8b0574e11610057578063a8b0574e14610221578063bce38bd71461023b578063c3077fa91461024e578063ee82ac5e14610261575f80fd5b80634d2301cc146101c357806372425d9d146101ea57806382ad56cb146101fc57806386d516e81461020f575f80fd5b80633408e470116100c25780633408e4701461016b578063399542e91461017d5780633e64a6961461019f57806342cbb15c146101b1575f80fd5b80630f28c97d146100f3578063174dea7114610114578063252dba421461013457806327e86d6e14610155575b5f80fd5b3480156100fe575f80fd5b50425b6040519081526020015b60405180910390f35b610127610122366004610958565b61027f565b60405161010b9190610a46565b610147610142366004610958565b610464565b60405161010b929190610a5f565b348015610160575f80fd5b50435f190140610101565b348015610176575f80fd5b5046610101565b61019061018b366004610ac9565b6105d2565b60405161010b93929190610b1e565b3480156101aa575f80fd5b5048610101565b3480156101bc575f80fd5b5043610101565b3480156101ce575f80fd5b506101016101dd366004610b45565b6001600160a01b03163190565b3480156101f5575f80fd5b5044610101565b61012761020a366004610958565b6105ed565b34801561021a575f80fd5b5045610101565b34801561022c575f80fd5b5060405141815260200161010b565b610127610249366004610ac9565b610766565b61019061025c366004610958565b6108f2565b34801561026c575f80fd5b5061010161027b366004610b6b565b4090565b60605f828067ffffffffffffffff81111561029c5761029c610b82565b6040519080825280602002602001820160405280156102e157816020015b604080518082019091525f8152606060208201528152602001906001900390816102ba5790505b509250365f5b82811015610406575f85828151811061030257610302610b96565b6020026020010151905087878381811061031e5761031e610b96565b90506020028101906103309190610baa565b6040810135958601959093506103496020850185610b45565b6001600160a01b0316816103606060870187610bc8565b60405161036e929190610c0b565b5f6040518083038185875af1925050503d805f81146103a8576040519150601f19603f3d011682016040523d82523d5f602084013e6103ad565b606091505b5060208085019190915290151580845290850135176103fc5762461bcd60e51b5f526020600452601760245276135d5b1d1a58d85b1b0cce8818d85b1b0819985a5b1959604a1b60445260845ffd5b50506001016102e7565b5082341461045b5760405162461bcd60e51b815260206004820152601a60248201527f4d756c746963616c6c333a2076616c7565206d69736d6174636800000000000060448201526064015b60405180910390fd5b50505092915050565b436060828067ffffffffffffffff81111561048157610481610b82565b6040519080825280602002602001820160405280156104b457816020015b606081526020019060019003908161049f5790505b509150365f5b828110156105c8575f8787838181106104d5576104d5610b96565b90506020028101906104e79190610c1a565b92506104f66020840184610b45565b6001600160a01b031661050c6020850185610bc8565b60405161051a929190610c0b565b5f604051808303815f865af19150503d805f8114610553576040519150601f19603f3d011682016040523d82523d5f602084013e610558565b606091505b5086848151811061056b5761056b610b96565b60209081029190910101529050806105bf5760405162461bcd60e51b8152602060048201526017602482015276135d5b1d1a58d85b1b0cce8818d85b1b0819985a5b1959604a1b6044820152606401610452565b506001016104ba565b5050509250929050565b43804060606105e2868686610766565b905093509350939050565b6060818067ffffffffffffffff81111561060957610609610b82565b60405190808252806020026020018201604052801561064e57816020015b604080518082019091525f8152606060208201528152602001906001900390816106275790505b509150365f5b8281101561045b575f84828151811061066f5761066f610b96565b6020026020010151905086868381811061068b5761068b610b96565b905060200281019061069d9190610c2e565b92506106ac6020840184610b45565b6001600160a01b03166106c26040850185610bc8565b6040516106d0929190610c0b565b5f604051808303815f865af19150503d805f8114610709576040519150601f19603f3d011682016040523d82523d5f602084013e61070e565b606091505b50602080840191909152901515808352908401351761075d5762461bcd60e51b5f526020600452601760245276135d5b1d1a58d85b1b0cce8818d85b1b0819985a5b1959604a1b60445260645ffd5b50600101610654565b6060818067ffffffffffffffff81111561078257610782610b82565b6040519080825280602002602001820160405280156107c757816020015b604080518082019091525f8152606060208201528152602001906001900390816107a05790505b509150365f5b828110156108e8575f8482815181106107e8576107e8610b96565b6020026020010151905086868381811061080457610804610b96565b90506020028101906108169190610c1a565b92506108256020840184610b45565b6001600160a01b031661083b6020850185610bc8565b604051610849929190610c0b565b5f604051808303815f865af19150503d805f8114610882576040519150601f19603f3d011682016040523d82523d5f602084013e610887565b606091505b5060208301521515815287156108df5780516108df5760405162461bcd60e51b8152602060048201526017602482015276135d5b1d1a58d85b1b0cce8818d85b1b0819985a5b1959604a1b6044820152606401610452565b506001016107cd565b5050509392505050565b5f806060610902600186866105d2565b919790965090945092505050565b5f8083601f840112610920575f80fd5b50813567ffffffffffffffff811115610937575f80fd5b6020830191508360208260051b8501011115610951575f80fd5b9250929050565b5f8060208385031215610969575f80fd5b823567ffffffffffffffff81111561097f575f80fd5b61098b85828601610910565b90969095509350505050565b5f81518084525f5b818110156109bb5760208185018101518683018201520161099f565b505f602082860101526020601f19601f83011685010191505092915050565b5f82825180855260208086019550808260051b8401018186015f5b84811015610a3957858303601f1901895281518051151584528401516040858501819052610a2581860183610997565b9a86019a94505050908301906001016109f5565b5090979650505050505050565b602081525f610a5860208301846109da565b9392505050565b5f6040820184835260206040602085015281855180845260608601915060608160051b8701019350602087015f5b82811015610abb57605f19888703018452610aa9868351610997565b95509284019290840190600101610a8d565b509398975050505050505050565b5f805f60408486031215610adb575f80fd5b83358015158114610aea575f80fd5b9250602084013567ffffffffffffffff811115610b05575f80fd5b610b1186828701610910565b9497909650939450505050565b838152826020820152606060408201525f610b3c60608301846109da565b95945050505050565b5f60208284031215610b55575f80fd5b81356001600160a01b0381168114610a58575f80fd5b5f60208284031215610b7b575f80fd5b5035919050565b634e487b7160e01b5f52604160045260245ffd5b634e487b7160e01b5f52603260045260245ffd5b5f8235607e19833603018112610bbe575f80fd5b9190910192915050565b5f808335601e19843603018112610bdd575f80fd5b83018035915067ffffffffffffffff821115610bf7575f80fd5b602001915036819003821315610951575f80fd5b818382375f9101908152919050565b5f8235603e19833603018112610bbe575f80fd5b5f8235605e19833603018112610bbe575f80fdfea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Call[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }];
        readonly name: "aggregate";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "blockNumber";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes[]";
            readonly name: "returnData";
            readonly type: "bytes[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bool";
                readonly name: "allowFailure";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Call3[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }];
        readonly name: "aggregate3";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "bool";
                readonly name: "success";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes";
                readonly name: "returnData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Result[]";
            readonly name: "returnData";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bool";
                readonly name: "allowFailure";
                readonly type: "bool";
            }, {
                readonly internalType: "uint256";
                readonly name: "value";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Call3Value[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }];
        readonly name: "aggregate3Value";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "bool";
                readonly name: "success";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes";
                readonly name: "returnData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Result[]";
            readonly name: "returnData";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Call[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }];
        readonly name: "blockAndAggregate";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "blockNumber";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "blockHash";
            readonly type: "bytes32";
        }, {
            readonly components: readonly [{
                readonly internalType: "bool";
                readonly name: "success";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes";
                readonly name: "returnData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Result[]";
            readonly name: "returnData";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getBasefee";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "basefee";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "blockNumber";
            readonly type: "uint256";
        }];
        readonly name: "getBlockHash";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "blockHash";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getBlockNumber";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "blockNumber";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getChainId";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "chainid";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getCurrentBlockCoinbase";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "coinbase";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getCurrentBlockDifficulty";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "difficulty";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getCurrentBlockGasLimit";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "gaslimit";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getCurrentBlockTimestamp";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "timestamp";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "addr";
            readonly type: "address";
        }];
        readonly name: "getEthBalance";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "balance";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getLastBlockHash";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "blockHash";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bool";
            readonly name: "requireSuccess";
            readonly type: "bool";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Call[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }];
        readonly name: "tryAggregate";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "bool";
                readonly name: "success";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes";
                readonly name: "returnData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Result[]";
            readonly name: "returnData";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bool";
            readonly name: "requireSuccess";
            readonly type: "bool";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Call[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }];
        readonly name: "tryBlockAndAggregate";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "blockNumber";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "blockHash";
            readonly type: "bytes32";
        }, {
            readonly components: readonly [{
                readonly internalType: "bool";
                readonly name: "success";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes";
                readonly name: "returnData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Result[]";
            readonly name: "returnData";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }];
    static createInterface(): Multicall3Interface;
    static connect(address: string, runner?: ContractRunner | null): Multicall3;
}
export {};
//# sourceMappingURL=Multicall3__factory.d.ts.map