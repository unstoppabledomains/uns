import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { ERC20Mock, ERC20MockInterface } from "../../../contracts/mocks/ERC20Mock";
declare type ERC20MockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC20Mock__factory extends ContractFactory {
    constructor(...args: ERC20MockConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ERC20Mock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ERC20Mock__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b5060408051602080820183525f808352835191820190935291825290600361003783826100e4565b50600461004482826100e4565b5050506101a3565b634e487b7160e01b5f52604160045260245ffd5b600181811c9082168061007457607f821691505b60208210810361009257634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156100df57805f5260205f20601f840160051c810160208510156100bd5750805b601f840160051c820191505b818110156100dc575f81556001016100c9565b50505b505050565b81516001600160401b038111156100fd576100fd61004c565b6101118161010b8454610060565b84610098565b602080601f831160018114610144575f841561012d5750858301515b5f19600386901b1c1916600185901b17855561019b565b5f85815260208120601f198616915b8281101561017257888601518255948401946001909101908401610153565b508582101561018f57878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b6108f2806101b05f395ff3fe608060405234801561000f575f80fd5b50600436106100b1575f3560e01c806340c10f191161006e57806340c10f191461013d57806370a082311461015257806395d89b411461017a578063a457c2d714610182578063a9059cbb14610195578063dd62ed3e146101a8575f80fd5b806306fdde03146100b5578063095ea7b3146100d357806318160ddd146100f657806323b872dd14610108578063313ce5671461011b578063395093511461012a575b5f80fd5b6100bd6101bb565b6040516100ca9190610775565b60405180910390f35b6100e66100e13660046107dc565b61024b565b60405190151581526020016100ca565b6002545b6040519081526020016100ca565b6100e6610116366004610804565b610264565b604051601281526020016100ca565b6100e66101383660046107dc565b610287565b61015061014b3660046107dc565b6102a8565b005b6100fa61016036600461083d565b6001600160a01b03165f9081526020819052604090205490565b6100bd6102b6565b6100e66101903660046107dc565b6102c5565b6100e66101a33660046107dc565b610344565b6100fa6101b636600461085d565b610351565b6060600380546101ca9061088e565b80601f01602080910402602001604051908101604052809291908181526020018280546101f69061088e565b80156102415780601f1061021857610100808354040283529160200191610241565b820191905f5260205f20905b81548152906001019060200180831161022457829003601f168201915b5050505050905090565b5f3361025881858561037b565b60019150505b92915050565b5f3361027185828561049e565b61027c858585610516565b506001949350505050565b5f336102588185856102998383610351565b6102a391906108c6565b61037b565b6102b282826106b8565b5050565b6060600480546101ca9061088e565b5f33816102d28286610351565b9050838110156103375760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b61027c828686840361037b565b5f33610258818585610516565b6001600160a01b039182165f90815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166103dd5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840161032e565b6001600160a01b03821661043e5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840161032e565b6001600160a01b038381165f8181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b5f6104a98484610351565b90505f19811461051057818110156105035760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604482015260640161032e565b610510848484840361037b565b50505050565b6001600160a01b03831661057a5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b606482015260840161032e565b6001600160a01b0382166105dc5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b606482015260840161032e565b6001600160a01b0383165f90815260208190526040902054818110156106535760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b606482015260840161032e565b6001600160a01b038481165f81815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a3610510565b6001600160a01b03821661070e5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640161032e565b8060025f82825461071f91906108c6565b90915550506001600160a01b0382165f81815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b5f602080835283518060208501525f5b818110156107a157858101830151858201604001528201610785565b505f604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b03811681146107d7575f80fd5b919050565b5f80604083850312156107ed575f80fd5b6107f6836107c1565b946020939093013593505050565b5f805f60608486031215610816575f80fd5b61081f846107c1565b925061082d602085016107c1565b9150604084013590509250925092565b5f6020828403121561084d575f80fd5b610856826107c1565b9392505050565b5f806040838503121561086e575f80fd5b610877836107c1565b9150610885602084016107c1565b90509250929050565b600181811c908216806108a257607f821691505b6020821081036108c057634e487b7160e01b5f52602260045260245ffd5b50919050565b8082018082111561025e57634e487b7160e01b5f52601160045260245ffdfea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Approval";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Transfer";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }];
        readonly name: "allowance";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "approve";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "balanceOf";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "decimals";
        readonly outputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "";
            readonly type: "uint8";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "subtractedValue";
            readonly type: "uint256";
        }];
        readonly name: "decreaseAllowance";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "addedValue";
            readonly type: "uint256";
        }];
        readonly name: "increaseAllowance";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "mint";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "name";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "symbol";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "totalSupply";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "transfer";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "transferFrom";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ERC20MockInterface;
    static connect(address: string, runner?: ContractRunner | null): ERC20Mock;
}
export {};
//# sourceMappingURL=ERC20Mock__factory.d.ts.map