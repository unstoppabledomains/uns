import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { BaseRoutingForwarderMock, BaseRoutingForwarderMockInterface } from "../../../contracts/mocks/BaseRoutingForwarderMock";
declare type BaseRoutingForwarderMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class BaseRoutingForwarderMock__factory extends ContractFactory {
    constructor(...args: BaseRoutingForwarderMockConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<BaseRoutingForwarderMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): BaseRoutingForwarderMock__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b50610083604051806060016040528060258152602001610d06602591396040518060600160405280602e8152602001610d2b602e913980516020918201208251928201929092206001600160e01b0319165f9081529081905260409020805463ffffffff191660e09290921c919091179055565b6100f160405180604001604052806011815260200170707574537472696e6728737472696e672960781b8152506040518060400160405280601a81526020017f707574537472696e67466f7228737472696e672c6279746573290000000000008152506101dd60201b60201c565b61015e6040518060400160405280601081526020016f70757455696e742875696e743235362960801b8152506040518060400160405280601981526020017f70757455696e74466f722875696e743235362c627974657329000000000000008152506101dd60201b60201c565b6101d86040518060400160405280601581526020017f70757455696e744172722875696e743235365b5d2900000000000000000000008152506040518060400160405280601e81526020017f70757455696e74417272466f722875696e743235365b5d2c62797465732900008152506101dd60201b60201c565b61021b565b80516020918201208251928201929092206001600160e01b0319165f9081529081905260409020805463ffffffff191660e09290921c919091179055565b610ade806102285f395ff3fe608060405234801561000f575f80fd5b506004361061009b575f3560e01c8063a424740011610063578063a42474001461011f578063ab3ca71b14610142578063cdec3fe314610155578063da5703c214610163578063daa948aa14610171575f80fd5b806302c7ff771461009f5780631bf7e13e146100b457806332065ca7146100dd5780633b526333146100f05780636ccbae5f146100fe575b5f80fd5b6100b26100ad36600461053b565b61017f565b005b6100c76100c23660046105b8565b6101a0565b6040516100d49190610670565b60405180910390f35b6100c76100eb3660046105b8565b6101ba565b6100b26100ad366004610682565b61011161010c3660046106b5565b505f90565b6040519081526020016100d4565b61013261012d3660046105b8565b610254565b60405190151581526020016100d4565b6100b26101503660046106cc565b61026d565b6100b26100ad3660046106b5565b6100b2610150366004610733565b6100b2610150366004610769565b60405162461bcd60e51b8152600401610197906107a4565b60405180910390fd5b606060405162461bcd60e51b8152600401610197906107a4565b606061024a6101cc60208601866107d9565b60408601356101de60608801886107f4565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525050604080516020601f8b0181900481028201810190925289815292508991508890819084018382808284375f9201919091525061029f92505050565b90505b9392505050565b5f60405162461bcd60e51b8152600401610197906107a4565b60405162461bcd60e51b815260206004820152600760248201526636b7b1b5a337b960c91b6044820152606401610197565b6020808301516001600160e01b0319165f9081529081905260408120546060919060e01b90506001600160e01b031981165f0361032a5760405162461bcd60e51b815260206004820152602360248201527f42617365526f7574696e67466f727761726465723a20524f5554455f554e4b4e60448201526227aba760e91b6064820152608401610197565b8351600319016004850190815261034282828661034d565b979650505050505050565b606063021a79ef60e31b6001600160e01b03198516016103d9575f805f8580602001905181019061037e9190610837565b925092509250868383838860405160240161039c9493929190610877565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152935061024d92505050565b6312d47e1f60e11b6001600160e01b0319851601610457575f8380602001905181019061040691906108f8565b905084818460405160240161041c929190610987565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152915061024d9050565b6312ab5bab60e11b6001600160e01b031985160161049a575f8380602001905181019061048491906109b4565b905084818460405160240161041c9291906109cb565b6354c358e560e01b6001600160e01b03198516016104dd575f838060200190518101906104c791906109e3565b905084818460405160240161041c929190610a84565b5060408051602081019091525f81529392505050565b5f8083601f840112610503575f80fd5b50813567ffffffffffffffff81111561051a575f80fd5b6020830191508360208260051b8501011115610534575f80fd5b9250929050565b5f806020838503121561054c575f80fd5b823567ffffffffffffffff811115610562575f80fd5b61056e858286016104f3565b90969095509350505050565b5f8083601f84011261058a575f80fd5b50813567ffffffffffffffff8111156105a1575f80fd5b602083019150836020828501011115610534575f80fd5b5f805f604084860312156105ca575f80fd5b833567ffffffffffffffff808211156105e1575f80fd5b90850190608082880312156105f4575f80fd5b90935060208501359080821115610609575f80fd5b506106168682870161057a565b9497909650939450505050565b5f5b8381101561063d578181015183820152602001610625565b50505f910152565b5f815180845261065c816020860160208601610623565b601f01601f19169290920160200192915050565b602081525f61024d6020830184610645565b5f8060208385031215610693575f80fd5b823567ffffffffffffffff8111156106a9575f80fd5b61056e8582860161057a565b5f602082840312156106c5575f80fd5b5035919050565b5f805f80604085870312156106df575f80fd5b843567ffffffffffffffff808211156106f6575f80fd5b610702888389016104f3565b9096509450602087013591508082111561071a575f80fd5b506107278782880161057a565b95989497509550505050565b5f805f8060408587031215610746575f80fd5b843567ffffffffffffffff8082111561075d575f80fd5b6107028883890161057a565b5f805f6040848603121561077b575f80fd5b83359250602084013567ffffffffffffffff811115610798575f80fd5b6106168682870161057a565b6020808252600490820152636d6f636b60e01b604082015260600190565b6001600160a01b03811681146107d6575f80fd5b50565b5f602082840312156107e9575f80fd5b813561024d816107c2565b5f808335601e19843603018112610809575f80fd5b83018035915067ffffffffffffffff821115610823575f80fd5b602001915036819003821315610534575f80fd5b5f805f60608486031215610849575f80fd5b8351610854816107c2565b6020850151909350610865816107c2565b80925050604084015190509250925092565b6001600160a01b03858116825284166020820152604081018390526080606082018190525f906108a990830184610645565b9695505050505050565b634e487b7160e01b5f52604160045260245ffd5b604051601f8201601f1916810167ffffffffffffffff811182821017156108f0576108f06108b3565b604052919050565b5f60208284031215610908575f80fd5b815167ffffffffffffffff8082111561091f575f80fd5b818401915084601f830112610932575f80fd5b815181811115610944576109446108b3565b610957601f8201601f19166020016108c7565b915080825285602082850101111561096d575f80fd5b61097e816020840160208601610623565b50949350505050565b604081525f6109996040830185610645565b82810360208401526109ab8185610645565b95945050505050565b5f602082840312156109c4575f80fd5b5051919050565b828152604060208201525f61024a6040830184610645565b5f60208083850312156109f4575f80fd5b825167ffffffffffffffff80821115610a0b575f80fd5b818501915085601f830112610a1e575f80fd5b815181811115610a3057610a306108b3565b8060051b9150610a418483016108c7565b8181529183018401918481019088841115610a5a575f80fd5b938501935b83851015610a7857845182529385019390850190610a5f565b98975050505050505050565b604080825283519082018190525f906020906060840190828701845b82811015610abc57815184529284019290840190600101610aa0565b50505083810360208501526108a9818661064556fea164736f6c6343000818000a7472616e7366657246726f6d28616464726573732c616464726573732c75696e74323536297472616e7366657246726f6d466f7228616464726573732c616464726573732c75696e743235362c627974657329";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "from";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "tokenId";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "data";
                readonly type: "bytes";
            }];
            readonly internalType: "struct IForwarder.ForwardRequest";
            readonly name: "req";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly name: "buildRouteData";
        readonly outputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "from";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "tokenId";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "data";
                readonly type: "bytes";
            }];
            readonly internalType: "struct IForwarder.ForwardRequest";
            readonly name: "";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly name: "execute";
        readonly outputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "nonceOf";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly name: "putString";
        readonly outputs: readonly [];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly name: "putStringFor";
        readonly outputs: readonly [];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "putUint";
        readonly outputs: readonly [];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256[]";
            readonly name: "";
            readonly type: "uint256[]";
        }];
        readonly name: "putUintArr";
        readonly outputs: readonly [];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256[]";
            readonly name: "";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly name: "putUintArrFor";
        readonly outputs: readonly [];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly name: "putUintFor";
        readonly outputs: readonly [];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "from";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "tokenId";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "data";
                readonly type: "bytes";
            }];
            readonly internalType: "struct IForwarder.ForwardRequest";
            readonly name: "";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly name: "verify";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }];
    static createInterface(): BaseRoutingForwarderMockInterface;
    static connect(address: string, runner?: ContractRunner | null): BaseRoutingForwarderMock;
}
export {};
//# sourceMappingURL=BaseRoutingForwarderMock__factory.d.ts.map